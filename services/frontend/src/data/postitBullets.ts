// ============================================================================
// Pre-made Post-it Bullets
// Ready-to-use Post-it sticky notes for bullets session
// ============================================================================

import type { BulletGraphic } from '@/types/bullet';

// Helper function to generate Post-it SVG
function generatePostitSVG(
  shape: 'square' | 'rectangle' | 'rounded' | 'circle',
  color: string,
  text: string,
  showPin: boolean = false
): string {
  const size = 80;
  const textSize = 32;

  const baseProps = {
    square: `<rect x="0" y="0" width="${size}" height="${size}" fill="${color}" filter="url(#shadow)"/>`,
    rectangle: `<rect x="0" y="0" width="${size * 1.5}" height="${size}" fill="${color}" filter="url(#shadow)"/>`,
    rounded: `<rect x="0" y="0" width="${size}" height="${size}" rx="${size * 0.15}" ry="${size * 0.15}" fill="${color}" filter="url(#shadow)"/>`,
    circle: `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${color}" filter="url(#shadow)"/>`,
  };

  const width = shape === 'rectangle' ? size * 1.5 : size;
  const height = size;
  const textX = width / 2;
  const textY = height / 2 + textSize * 0.35;

  const pinSVG = showPin
    ? `
    <circle cx="${width - 12}" cy="12" r="4" fill="#DC2626"/>
    <circle cx="${width - 12}" cy="12" r="2.5" fill="#991B1B"/>
  `
    : '';

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.25"/>
        </filter>
      </defs>
      ${baseProps[shape]}
      ${pinSVG}
      <text
        x="${textX}"
        y="${textY}"
        font-family="'Caveat', 'Patrick Hand', 'Indie Flower', cursive"
        font-size="${textSize}"
        font-weight="600"
        fill="#374151"
        text-anchor="middle"
      >${text}</text>
    </svg>
  `;
}

// Create Post-it bullets with different colors and shapes
const colors = [
  { name: 'Yellow', hex: '#FFEB3B' },
  { name: 'Pink', hex: '#FF80AB' },
  { name: 'Orange', hex: '#FFB74D' },
  { name: 'Blue', hex: '#4FC3F7' },
  { name: 'Green', hex: '#CDDC39' },
  { name: 'Mint', hex: '#80CBC4' },
];

export const POSTIT_BULLETS: Omit<BulletGraphic, 'createdAt' | 'updatedAt'>[] = [];

// Generate numbered Post-its (1-6) for each color in square shape
colors.forEach((color, colorIndex) => {
  for (let num = 1; num <= 6; num++) {
    const svg = generatePostitSVG('square', color.hex, num.toString(), false);
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

    POSTIT_BULLETS.push({
      id: `postit-square-${color.name.toLowerCase()}-${num}`,
      name: `Post-it ${color.name} ${num}`,
      category: 'postit',
      imageUrl: dataUrl,
      tags: ['postit', 'nota', 'adesivo', color.name.toLowerCase(), num.toString()],
      isPremium: false,
      isActive: true,
      usageCount: 0,
      defaultWidth: 80,
      defaultHeight: 80,
      aspectRatio: 1,
      fileFormat: 'svg',
    });
  }
});

// Add some special Post-its with pins (yellow and pink only)
[colors[0], colors[1]].forEach((color) => {
  for (let num = 1; num <= 3; num++) {
    const svg = generatePostitSVG('square', color.hex, num.toString(), true);
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

    POSTIT_BULLETS.push({
      id: `postit-square-pin-${color.name.toLowerCase()}-${num}`,
      name: `Post-it ${color.name} ${num} 📌`,
      category: 'postit',
      imageUrl: dataUrl,
      tags: ['postit', 'nota', 'adesivo', 'pin', 'alfinete', color.name.toLowerCase(), num.toString()],
      isPremium: false,
      isActive: true,
      usageCount: 0,
      defaultWidth: 80,
      defaultHeight: 80,
      aspectRatio: 1,
      fileFormat: 'svg',
    });
  }
});

// Add rounded Post-its (1-3) in 3 colors
[colors[0], colors[2], colors[3]].forEach((color) => {
  for (let num = 1; num <= 3; num++) {
    const svg = generatePostitSVG('rounded', color.hex, num.toString(), false);
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

    POSTIT_BULLETS.push({
      id: `postit-rounded-${color.name.toLowerCase()}-${num}`,
      name: `Post-it Arredondado ${color.name} ${num}`,
      category: 'postit',
      imageUrl: dataUrl,
      tags: ['postit', 'nota', 'adesivo', 'arredondado', color.name.toLowerCase(), num.toString()],
      isPremium: false,
      isActive: true,
      usageCount: 0,
      defaultWidth: 80,
      defaultHeight: 80,
      aspectRatio: 1,
      fileFormat: 'svg',
    });
  }
});

// Add circle Post-its (1-3) in 2 colors
[colors[1], colors[4]].forEach((color) => {
  for (let num = 1; num <= 3; num++) {
    const svg = generatePostitSVG('circle', color.hex, num.toString(), false);
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

    POSTIT_BULLETS.push({
      id: `postit-circle-${color.name.toLowerCase()}-${num}`,
      name: `Post-it Circular ${color.name} ${num}`,
      category: 'postit',
      imageUrl: dataUrl,
      tags: ['postit', 'nota', 'adesivo', 'circular', color.name.toLowerCase(), num.toString()],
      isPremium: false,
      isActive: true,
      usageCount: 0,
      defaultWidth: 80,
      defaultHeight: 80,
      aspectRatio: 1,
      fileFormat: 'svg',
    });
  }
});
