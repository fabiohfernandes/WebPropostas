#!/usr/bin/env node
/**
 * ============================================================================
 * Color Schema Audit & Auto-Update Script
 * ============================================================================
 *
 * This script automatically:
 * 1. Scans all palette images in color_paletes/ folder
 * 2. Extracts colors from each image
 * 3. Compares with existing COLOR_SCALES and schemas
 * 4. Generates a report of missing colors
 * 5. Optionally auto-updates COLOR_SCALES and schema definitions
 *
 * Usage:
 *   node scripts/audit-color-schemas.js              # Audit only (report)
 *   node scripts/audit-color-schemas.js --update     # Audit + auto-update
 *   node scripts/audit-color-schemas.js --report     # Generate detailed report
 *
 * @author Claude Code
 * @date 2025-10-13
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  PALETTE_DIR: path.join(__dirname, '..', 'color_paletes'),
  COLOR_SCALES_FILE: path.join(__dirname, '..', 'services', 'frontend', 'src', 'types', 'bulletSystemV2.ts'),
  SCHEMA_FILES: [
    path.join(__dirname, '..', 'services', 'frontend', 'src', 'components', 'Builder', 'sessions', 'ColorsSessionEnhanced.tsx'),
    path.join(__dirname, '..', 'services', 'frontend', 'src', 'components', 'Builder', 'sessions', 'IconsSessionEnhanced.tsx'),
    path.join(__dirname, '..', 'services', 'frontend', 'src', 'components', 'Builder', 'sessions', 'IndividualBulletsSession.tsx'),
  ],
  OUTPUT_REPORT: path.join(__dirname, '..', 'COLOR_AUDIT_REPORT.md'),
  MIN_COLOR_DIFFERENCE: 30, // Minimum color difference threshold (0-442)
  SAMPLE_POINTS_PER_BAND: 10, // How many points to sample in each color band
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert RGB to Hex
 */
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

/**
 * Calculate color distance (Euclidean distance in RGB space)
 */
function colorDistance(rgb1, rgb2) {
  const r = rgb1[0] - rgb2[0];
  const g = rgb1[1] - rgb2[1];
  const b = rgb1[2] - rgb2[2];
  return Math.sqrt(r * r + g * g + b * b);
}

/**
 * Check if color is too similar to existing colors
 */
function isSimilarToExisting(newColor, existingColors, threshold) {
  return existingColors.some(existingColor =>
    colorDistance(newColor, existingColor) < threshold
  );
}

/**
 * Extract colors from palette image
 */
async function extractColorsFromImage(imagePath) {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const colors = [];
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const width = image.width;
    const height = image.height;

    // Divide image into vertical bands (assuming colors are arranged horizontally)
    const numBands = Math.min(12, width / 50); // Estimate max 12 color bands
    const bandWidth = width / numBands;

    for (let band = 0; band < numBands; band++) {
      const x = Math.floor(band * bandWidth + bandWidth / 2);
      const colorSamples = [];

      // Sample multiple points in this band (middle section of image)
      for (let i = 0; i < CONFIG.SAMPLE_POINTS_PER_BAND; i++) {
        const y = Math.floor((height * (i + 1)) / (CONFIG.SAMPLE_POINTS_PER_BAND + 1));
        const idx = (y * width + x) * 4;
        colorSamples.push([
          imageData.data[idx],
          imageData.data[idx + 1],
          imageData.data[idx + 2]
        ]);
      }

      // Average the color samples for this band
      const avgColor = colorSamples.reduce((acc, color) => {
        return [acc[0] + color[0], acc[1] + color[1], acc[2] + color[2]];
      }, [0, 0, 0]).map(v => Math.round(v / colorSamples.length));

      // Only add if not too similar to existing colors
      if (!isSimilarToExisting(avgColor, colors, CONFIG.MIN_COLOR_DIFFERENCE)) {
        colors.push(avgColor);
      }
    }

    return colors.map(rgb => rgbToHex(rgb[0], rgb[1], rgb[2]));
  } catch (error) {
    console.error(`Error extracting colors from ${imagePath}:`, error.message);
    return [];
  }
}

/**
 * Parse existing COLOR_SCALES from bulletSystemV2.ts
 */
function parseExistingColorScales(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const colorScalesMatch = content.match(/export const COLOR_SCALES = \{([\s\S]*?)\} as const;/);

    if (!colorScalesMatch) {
      throw new Error('Could not find COLOR_SCALES in file');
    }

    const scalesText = colorScalesMatch[1];
    const colorNames = scalesText.match(/(\w+):\s*\{/g) || [];

    return colorNames.map(match => match.replace(':', '').replace('{', '').trim());
  } catch (error) {
    console.error('Error parsing COLOR_SCALES:', error.message);
    return [];
  }
}

/**
 * Parse existing schemas from schema files
 */
function parseExistingSchemas(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const schemasMatch = content.match(/const (?:DEFAULT_SCHEMAS|COLOR_SCHEMAS)[^=]*= \[([\s\S]*?)\];/);

    if (!schemasMatch) {
      return {};
    }

    const schemasText = schemasMatch[1];
    const schemaObjects = {};

    // Extract each schema object
    const schemaMatches = schemasText.matchAll(/\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*colors:\s*\[([^\]]+)\]/g);

    for (const match of schemaMatches) {
      const id = match[1];
      const name = match[2];
      const colors = match[3].match(/'([^']+)'/g).map(c => c.replace(/'/g, ''));
      schemaObjects[id] = { id, name, colors };
    }

    return schemaObjects;
  } catch (error) {
    console.error(`Error parsing schemas from ${filePath}:`, error.message);
    return {};
  }
}

/**
 * Generate color name from hex code
 */
function generateColorName(hex, paletteName) {
  // Convert palette name to camelCase prefix
  const prefix = paletteName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .split('_')
    .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Simple color name based on RGB values
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  let colorType = 'gray';
  if (r > g && r > b) colorType = 'red';
  else if (g > r && g > b) colorType = 'green';
  else if (b > r && b > g) colorType = 'blue';
  else if (r > 200 && g > 200 && b > 200) colorType = 'light';
  else if (r < 50 && g < 50 && b < 50) colorType = 'dark';

  return `${prefix}${colorType.charAt(0).toUpperCase() + colorType.slice(1)}`;
}

/**
 * Generate light and dark variants of a hex color
 */
function generateColorVariants(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Light variant (30% lighter)
  const lightR = Math.min(255, Math.round(r + (255 - r) * 0.3));
  const lightG = Math.min(255, Math.round(g + (255 - g) * 0.3));
  const lightB = Math.min(255, Math.round(b + (255 - b) * 0.3));

  // Dark variant (30% darker)
  const darkR = Math.max(0, Math.round(r * 0.7));
  const darkG = Math.max(0, Math.round(g * 0.7));
  const darkB = Math.max(0, Math.round(b * 0.7));

  return {
    light: rgbToHex(lightR, lightG, lightB),
    medium: hex,
    dark: rgbToHex(darkR, darkG, darkB)
  };
}

// ============================================================================
// MAIN AUDIT FUNCTION
// ============================================================================

async function auditColorSchemas(options = {}) {
  console.log('🎨 Starting Color Schema Audit...\n');

  // 1. Get all palette images
  const paletteFiles = fs.readdirSync(CONFIG.PALETTE_DIR)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
    .sort();

  console.log(`Found ${paletteFiles.length} palette images\n`);

  // 2. Parse existing data
  const existingColorScales = parseExistingColorScales(CONFIG.COLOR_SCALES_FILE);
  const existingSchemas = parseExistingSchemas(CONFIG.SCHEMA_FILES[0]);

  console.log(`Existing COLOR_SCALES: ${existingColorScales.length} colors`);
  console.log(`Existing Schemas: ${Object.keys(existingSchemas).length} schemas\n`);

  // 3. Audit each palette
  const auditResults = [];
  const missingColors = [];
  const newSchemas = [];

  for (const file of paletteFiles) {
    const paletteName = path.basename(file, path.extname(file));
    const imagePath = path.join(CONFIG.PALETTE_DIR, file);

    console.log(`Analyzing ${file}...`);

    const colors = await extractColorsFromImage(imagePath);
    const schemaId = paletteName.replace(/_/g, '-');
    const existingSchema = existingSchemas[schemaId];

    const result = {
      name: paletteName,
      file: file,
      colorsFound: colors.length,
      colors: colors,
      schemaExists: !!existingSchema,
      schemaColors: existingSchema ? existingSchema.colors.length : 0,
      missing: existingSchema ? colors.length - existingSchema.colors.length : colors.length,
      status: 'unknown'
    };

    if (!existingSchema) {
      result.status = 'NEW_SCHEMA';
      newSchemas.push({
        id: schemaId,
        name: paletteName.split(/[_\s-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        colors: colors.map(hex => generateColorName(hex, paletteName))
      });
    } else if (result.missing > 0) {
      result.status = 'INCOMPLETE';
    } else if (result.missing < 0) {
      result.status = 'SCHEMA_HAS_MORE';
    } else {
      result.status = 'COMPLETE';
    }

    // Identify missing color hex codes
    if (result.missing > 0 && existingSchema) {
      // TODO: More sophisticated color matching
      result.missingColors = colors.slice(existingSchema.colors.length);
    }

    auditResults.push(result);
  }

  // 4. Generate report
  const report = generateReport(auditResults, newSchemas, missingColors);

  if (options.report || options.update) {
    fs.writeFileSync(CONFIG.OUTPUT_REPORT, report, 'utf8');
    console.log(`\n✅ Report saved to: ${CONFIG.OUTPUT_REPORT}`);
  }

  // 5. Auto-update if requested
  if (options.update) {
    console.log('\n🔄 Auto-updating color definitions...');
    // TODO: Implement auto-update logic
    console.log('⚠️  Auto-update not yet implemented. Please review the report and add colors manually.');
  }

  return auditResults;
}

/**
 * Generate markdown report
 */
function generateReport(auditResults, newSchemas, missingColors) {
  const timestamp = new Date().toISOString();
  let report = `# Color Schema Audit Report\n\n`;
  report += `**Generated:** ${timestamp}\n`;
  report += `**Total Palettes:** ${auditResults.length}\n\n`;

  // Summary
  const complete = auditResults.filter(r => r.status === 'COMPLETE').length;
  const incomplete = auditResults.filter(r => r.status === 'INCOMPLETE').length;
  const newCount = auditResults.filter(r => r.status === 'NEW_SCHEMA').length;

  report += `## Summary\n\n`;
  report += `- ✅ **Complete:** ${complete} palettes\n`;
  report += `- ⚠️  **Incomplete:** ${incomplete} palettes\n`;
  report += `- 🆕 **New Schemas:** ${newCount} palettes\n\n`;

  // Incomplete palettes
  if (incomplete > 0) {
    report += `## Incomplete Palettes\n\n`;
    auditResults.filter(r => r.status === 'INCOMPLETE').forEach(result => {
      report += `### ${result.name}\n`;
      report += `- **File:** ${result.file}\n`;
      report += `- **Colors in Image:** ${result.colorsFound}\n`;
      report += `- **Colors in Schema:** ${result.schemaColors}\n`;
      report += `- **Missing:** ${result.missing}\n`;
      report += `- **Hex Codes:** ${result.colors.join(', ')}\n\n`;
    });
  }

  // New schemas
  if (newCount > 0) {
    report += `## New Schemas Detected\n\n`;
    newSchemas.forEach(schema => {
      report += `### ${schema.name}\n`;
      report += `- **ID:** ${schema.id}\n`;
      report += `- **Suggested Colors:** ${schema.colors.length}\n`;
      report += `\`\`\`typescript\n`;
      report += `{ id: '${schema.id}', name: '${schema.name}', colors: ${JSON.stringify(schema.colors)} }\n`;
      report += `\`\`\`\n\n`;
    });
  }

  return report;
}

// ============================================================================
// CLI EXECUTION
// ============================================================================

if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    update: args.includes('--update'),
    report: args.includes('--report') || args.length === 0,
  };

  auditColorSchemas(options)
    .then(() => {
      console.log('\n✅ Audit complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Audit failed:', error);
      process.exit(1);
    });
}

module.exports = { auditColorSchemas, extractColorsFromImage };
