# Color Schema Audit System

## Overview

This document describes the automated color schema audit system that ensures all color palettes from design images are properly integrated into the WebPropostas color system.

## Problem Statement

Professional color palettes from architects and designers contained 100+ colors that were missing from our system:
- **Deep Water**: Had 1 color, image showed 5 (80% incomplete)
- **Blackberry**: Had 3 colors, image showed 5 (40% incomplete)
- **All Suvinil palettes**: Had 4 colors each, images showed 6 (33% incomplete per palette)
- **Total**: 63% of palettes were incomplete

## Solution

### 1. Automated Audit Script (`audit-color-schemas.js`)

Located in `scripts/audit-color-schemas.js`, this script:

**Features:**
- Scans all palette images in `color_paletes/` folder
- Extracts colors from each image using computer vision
- Compares with existing COLOR_SCALES and schema definitions
- Generates detailed markdown reports
- Identifies missing colors and new schemas

**Usage:**
```bash
# Audit only (generate report)
node scripts/audit-color-schemas.js

# Audit with detailed report
node scripts/audit-color-schemas.js --report

# Audit + auto-update (planned feature)
node scripts/audit-color-schemas.js --update
```

**Dependencies:**
```bash
npm install canvas
```

### 2. Color System Architecture

**File Structure:**
```
services/frontend/src/types/bulletSystemV2.ts
  └── COLOR_SCALES object (master color definitions)

services/frontend/src/components/Builder/sessions/
  ├── ColorsSessionEnhanced.tsx (DEFAULT_SCHEMAS)
  ├── IconsSessionEnhanced.tsx (COLOR_SCHEMAS)
  └── IndividualBulletsSession.tsx (COLOR_SCHEMAS)
```

**Color Definition Format:**
```typescript
colorName: {
  light: '#HEXCODE',   // Lightest shade (30% lighter)
  medium: '#HEXCODE',  // Main color from palette
  dark: '#HEXCODE',    // Darkest shade (30% darker)
}
```

### 3. Manual Color Addition Process

When the audit script identifies missing colors:

**Step 1: Add to COLOR_SCALES** (`bulletSystemV2.ts`)
```typescript
// Deep Water palette
deepNavy: { light: '#3B5A7C', medium: '#1B2A3D', dark: '#0A1220' },
mediumNavy: { light: '#5681A8', medium: '#3B5A7C', dark: '#1B2A3D' },
// ... etc
```

**Step 2: Update Schema Definitions** (all 3 files)
```typescript
{
  id: 'deep-water',
  name: 'Deep Water',
  colors: ['deepNavy', 'mediumNavy', 'softNavy', 'lightNavyGray', 'paleNavyBlue'],
  isDefault: true
},
```

## Current Status (2025-10-13)

### ✅ Completed
- Deep Water palette: Added 4 missing colors → Now complete (5 colors)
- Blackberry palette: Added 2 missing colors → Now complete (5 colors)
- Aesthetic palette: Added 1 missing color → Now complete (5 colors)
- Automation script created and documented

### 🔄 In Progress
- Suvinil palettes: 26 colors across 13 palettes (2 per palette)
- Other incomplete palettes: ~70 additional colors

### 📊 Audit Statistics
- **Total Palettes:** 47
- **Complete:** 18 (37%)
- **Incomplete:** 29 (63%)
- **Estimated Missing Colors:** 100+

## Adding New Color Palettes (Future)

### Process
1. **Add palette image** to `color_paletes/` folder
   - Supported formats: PNG, JPG, JPEG
   - Naming: use lowercase with hyphens (e.g., `my-palette.png`)

2. **Run audit script**
   ```bash
   node scripts/audit-color-schemas.js --report
   ```

3. **Review generated report** (`COLOR_AUDIT_REPORT.md`)
   - Check detected colors
   - Review suggested color names
   - Verify hex codes

4. **Add colors to system**
   - Add to COLOR_SCALES in `bulletSystemV2.ts`
   - Add schema definitions to all 3 schema files
   - Follow existing naming conventions (camelCase)

5. **Test color display**
   - Check color count matches image
   - Verify colors appear in dropdown selectors
   - Confirm visual accuracy

## Color Naming Conventions

### Guidelines
- Use camelCase (e.g., `deepNavy`, `lightGrayBeige`)
- Be descriptive but concise
- Include palette name prefix for unique colors (e.g., `suvinil...`)
- Avoid generic names if color is palette-specific
- Use standard color terms when appropriate (navy, teal, beige, etc.)

### Examples
```typescript
// Good
deepNavy: { ... }           // Clear, descriptive
paleNavyBlue: { ... }       // Descriptive with shade
luzDeInverno: { ... }       // Original Portuguese name (Suvinil)

// Avoid
color1: { ... }             // Too generic
theNavyOne: { ... }         // Unclear
Deep_Navy: { ... }          // Wrong case
```

## Troubleshooting

### Issue: Audit script fails to extract colors
**Cause:** Image format not supported or corrupted
**Solution:**
- Verify image is PNG/JPG
- Re-export image from design tool
- Check image has clear color bands

### Issue: Color count mismatch after update
**Cause:** Color name doesn't exist in COLOR_SCALES
**Solution:**
- Check for typos in color names
- Verify color was added to COLOR_SCALES
- Restart development server to reload types

### Issue: Colors don't display in UI
**Cause:** TypeScript types not regenerated
**Solution:**
```bash
docker-compose restart frontend
# or
npm run type-check
```

## Future Enhancements

### Planned Features
1. **Auto-Update Mode**: Script automatically adds colors to files
2. **Hex Code OCR**: Extract hex codes directly from palette images
3. **Color Name AI**: Suggest semantic color names using AI
4. **Duplicate Detection**: Identify similar colors across palettes
5. **Web Interface**: Visual tool to review and approve color additions
6. **CI/CD Integration**: Run audit on every palette image commit

### Improvement Ideas
- Better color clustering algorithms
- Support for horizontal and grid-based palettes
- Color accessibility scoring
- Palette harmony analysis
- Export to other formats (CSS variables, SCSS, etc.)

## Maintenance

### Regular Tasks
- **Weekly**: Run audit script to check for new palettes
- **Monthly**: Review incomplete palettes and prioritize additions
- **Quarterly**: Audit color usage and remove unused colors

### Performance Considerations
- COLOR_SCALES object size: Monitor TypeScript compilation time
- Image processing: Optimize for large palette sets
- Schema file sync: Ensure all 3 files stay synchronized

## Contact & Support

For questions or issues with the color audit system:
- Check this documentation first
- Review the audit script comments
- Consult the main CLAUDE.md file
- Check audit report for specific palette issues

---

**Last Updated:** 2025-10-13
**Script Version:** 1.0.0
**Total Colors in System:** 226 (and growing)
