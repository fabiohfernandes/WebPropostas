// ============================================================================
// Bullet Sets Library
// Pre-composed groups based on 4110.jpg compositions
// ============================================================================

import {
  BulletSet,
  SetRenderOptions,
  COLOR_SCALES,
  ColorScaleName,
} from '@/types/bulletSystemV2';

// ============================================================================
// HELPER: Get color from scale
// ============================================================================
function getColor(colorName: ColorScaleName | string, shade: 'light' | 'medium' | 'dark' = 'medium'): string {
  if (colorName in COLOR_SCALES) {
    return COLOR_SCALES[colorName as ColorScaleName][shade];
  }
  return colorName;
}

// ============================================================================
// SET 01: Horizontal Process Steps (A → B → C)
// Based on: Main section from 4110.jpg with 3 horizontal pills
// ============================================================================
export const HORIZONTAL_PROCESS_3STEPS: BulletSet = {
  id: 'horizontal-process-3steps',
  name: 'Processo Horizontal (3 Etapas)',
  description: 'Três etapas conectadas horizontalmente com letras A, B, C',
  category: 'process',
  layout: 'horizontal-sequence',
  width: 800,
  height: 280,
  elements: [
    {
      bulletId: 'pill-badge-v2',
      position: { x: 50, y: 20 },
      size: { width: 220, height: 80 },
      numberOverride: 1,
      colorOverride: 'limeGreen',
      zIndex: 1,
    },
    {
      bulletId: 'pill-badge-v2',
      position: { x: 50, y: 100 },
      size: { width: 220, height: 80 },
      numberOverride: 2,
      colorOverride: 'teal',
      zIndex: 1,
    },
    {
      bulletId: 'pill-badge-v2',
      position: { x: 50, y: 180 },
      size: { width: 220, height: 80 },
      numberOverride: 3,
      colorOverride: 'navy',
      zIndex: 1,
    },
  ],
  connectors: [
    {
      type: 'double-arrow',
      from: { elementIndex: 0, anchor: 'right' },
      to: { elementIndex: 1, anchor: 'left' },
      style: {
        strokeWidth: 3,
        strokeColor: '#999',
        arrowSize: 8,
      },
    },
    {
      type: 'double-arrow',
      from: { elementIndex: 1, anchor: 'right' },
      to: { elementIndex: 2, anchor: 'left' },
      style: {
        strokeWidth: 3,
        strokeColor: '#999',
        arrowSize: 8,
      },
    },
  ],
  customizable: {
    elementCount: true,
    elementColors: true,
    elementText: true,
    layout: false,
  },
  generateSVG: (options: SetRenderOptions) => {
    const { width, height, colorScheme = ['limeGreen', 'teal', 'navy'], texts = [], numbers = [1, 2, 3] } = options;

    const colors = colorScheme.map(c => getColor(c, 'medium'));
    const stepLabels = ['A', 'B', 'C'];

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${colors.map((color, i) => `
            <linearGradient id="pillGrad_${i}" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.9" />
            </linearGradient>
            <filter id="shadow_${i}">
              <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.25"/>
            </filter>
          `).join('')}
        </defs>

        ${[0, 1, 2].map((idx) => {
          const yPos = 20 + (idx * 80);
          const color = colors[idx];

          return `
            <!-- Step ${idx + 1} -->
            <g transform="translate(0, ${yPos})">
              <!-- Letter label (left) -->
              <text x="20" y="45"
                    font-family="Arial, sans-serif"
                    font-size="48"
                    font-weight="bold"
                    fill="${color}"
                    opacity="0.9">
                ${stepLabels[idx]}
              </text>

              <!-- Pill shape -->
              <rect x="70" y="7" width="500" height="66" rx="33"
                    fill="url(#pillGrad_${idx})"
                    filter="url(#shadow_${idx})"/>

              <!-- Glass border -->
              <rect x="70" y="7" width="500" height="66" rx="33"
                    fill="none"
                    stroke="white"
                    stroke-width="3"
                    stroke-opacity="0.6"/>

              <!-- Step circle (left) -->
              <circle cx="105" cy="40" r="22"
                      fill="white"
                      opacity="0.95"/>

              <text x="105" y="34"
                    font-family="Arial, sans-serif"
                    font-size="9"
                    font-weight="600"
                    fill="${color}"
                    opacity="0.7"
                    text-anchor="middle">
                Step
              </text>
              <text x="105" y="51"
                    font-family="Arial, sans-serif"
                    font-size="20"
                    font-weight="bold"
                    fill="${color}"
                    text-anchor="middle">
                ${numbers[idx].toString().padStart(2, '0')}
              </text>

              <!-- Text content -->
              <text x="150" y="45"
                    font-family="Arial, sans-serif"
                    font-size="14"
                    font-weight="500"
                    fill="white">
                ${texts[idx] || `Nam pretium turpis et arcu. Duis arcu tortor, suscipit...`}
              </text>

              <!-- Icon circle (right) -->
              <circle cx="530" cy="40" r="22"
                      fill="white"
                      opacity="0.95"/>

              <!-- Icon placeholder -->
              <circle cx="530" cy="40" r="10"
                      fill="${color}"
                      opacity="0.7"/>

              <!-- "Your Title" text (right) -->
              <text x="600" y="45"
                    font-family="Arial, sans-serif"
                    font-size="18"
                    font-weight="600"
                    fill="#4A5B7F"
                    opacity="0.8">
                Your Title
              </text>
            </g>

            <!-- Connecting arrows (if not last) -->
            ${idx < 2 ? `
            <g opacity="0.5">
              <!-- Down arrow -->
              <line x1="300" y1="${yPos + 73}" x2="300" y2="${yPos + 87}"
                    stroke="#999" stroke-width="3"/>
              <path d="M 300 ${yPos + 87} L 295 ${yPos + 82} L 305 ${yPos + 82} Z"
                    fill="#999"/>

              <!-- Up arrow -->
              <line x1="350" y1="${yPos + 87}" x2="350" y2="${yPos + 73}"
                    stroke="#999" stroke-width="3"/>
              <path d="M 350 ${yPos + 73} L 345 ${yPos + 78} L 355 ${yPos + 78} Z"
                    fill="#999"/>
            </g>
            ` : ''}
          `;
        }).join('')}
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="200" height="70" viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="70" y="20" width="500" height="66" rx="33" fill="#B4D432" opacity="0.9"/>
      <rect x="70" y="100" width="500" height="66" rx="33" fill="#5ABAA5" opacity="0.9"/>
      <rect x="70" y="180" width="500" height="66" rx="33" fill="#4A5B7F" opacity="0.9"/>
      <text x="20" y="65" font-family="Arial" font-size="48" font-weight="bold" fill="#B4D432">A</text>
      <text x="20" y="145" font-family="Arial" font-size="48" font-weight="bold" fill="#5ABAA5">B</text>
      <text x="20" y="225" font-family="Arial" font-size="48" font-weight="bold" fill="#4A5B7F">C</text>
    </svg>
  `,
  tags: ['process', 'horizontal', '3-steps', 'sequential', 'workflow'],
  isPremium: false,
  usageCount: 0,
  createdAt: new Date(),
  bestUsedFor: ['3-step process', 'Sequential workflow', 'Process explanation'],
};

// ============================================================================
// SET 02: Hexagon Cluster (3 horizontal)
// Based on: Slide 5 from 4110.jpg with 3 hexagons side by side
// ============================================================================
export const HEXAGON_CLUSTER_3: BulletSet = {
  id: 'hexagon-cluster-3',
  name: 'Cluster Hexagonal (3)',
  description: 'Três hexágonos lado a lado com gradiente de cor',
  category: 'comparison',
  layout: 'grid',
  width: 400,
  height: 180,
  elements: [
    {
      bulletId: 'hexagon-badge-v2',
      position: { x: 20, y: 20 },
      size: { width: 120, height: 140 },
      numberOverride: 1,
      colorOverride: 'limeGreen',
      textOverride: 'Strategy',
      zIndex: 1,
    },
    {
      bulletId: 'hexagon-badge-v2',
      position: { x: 140, y: 20 },
      size: { width: 120, height: 140 },
      numberOverride: 2,
      colorOverride: 'teal',
      textOverride: 'Planning',
      zIndex: 1,
    },
    {
      bulletId: 'hexagon-badge-v2',
      position: { x: 260, y: 20 },
      size: { width: 120, height: 140 },
      numberOverride: 3,
      colorOverride: 'navy',
      textOverride: 'Analysis',
      zIndex: 1,
    },
  ],
  connectors: [],
  customizable: {
    elementCount: true,
    elementColors: true,
    elementText: true,
    layout: false,
  },
  generateSVG: (options: SetRenderOptions) => {
    const { width, height, colorScheme = ['limeGreen', 'teal', 'navy'], texts = ['Title One', 'Title Two', 'Title Three'], numbers = [1, 2, 3] } = options;

    const colors = colorScheme.map(c => getColor(c, 'medium'));

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${colors.map((color, i) => `
            <linearGradient id="hexGrad_${i}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${color};stop-opacity:0.85" />
            </linearGradient>
            <filter id="hexShadow_${i}">
              <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.25"/>
            </filter>
          `).join('')}
        </defs>

        ${[0, 1, 2].map((idx) => {
          const xPos = 20 + (idx * 120);
          const color = colors[idx];
          const hexPoints = `${xPos + 60},10 ${xPos + 100},30 ${xPos + 100},70 ${xPos + 60},90 ${xPos + 20},70 ${xPos + 20},30`;

          return `
            <!-- Hexagon ${idx + 1} -->
            <g>
              <!-- Shadow -->
              <polygon points="${xPos + 60},12 ${xPos + 100},32 ${xPos + 100},72 ${xPos + 60},92 ${xPos + 20},72 ${xPos + 20},32"
                       fill="rgba(0,0,0,0.12)"
                       filter="url(#hexShadow_${idx})"/>

              <!-- Main hexagon -->
              <polygon points="${hexPoints}"
                       fill="url(#hexGrad_${idx})"
                       filter="url(#hexShadow_${idx})"/>

              <!-- Glass border -->
              <polygon points="${hexPoints}"
                       fill="none"
                       stroke="white"
                       stroke-width="3"
                       stroke-opacity="0.6"/>

              <!-- Icon circle -->
              <circle cx="${xPos + 60}" cy="50" r="22"
                      fill="white"
                      opacity="0.95"/>

              <!-- Number -->
              <text x="${xPos + 60}" y="60"
                    font-family="Arial, sans-serif"
                    font-size="24"
                    font-weight="bold"
                    fill="${color}"
                    text-anchor="middle">
                ${numbers[idx].toString().padStart(2, '0')}
              </text>

              <!-- Title text -->
              <text x="${xPos + 60}" y="115"
                    font-family="Arial, sans-serif"
                    font-size="13"
                    font-weight="bold"
                    fill="#333"
                    text-anchor="middle">
                ${texts[idx]}
              </text>

              <!-- Underline -->
              <line x1="${xPos + 30}" y1="122" x2="${xPos + 90}" y2="122"
                    stroke="#ddd"
                    stroke-width="2"
                    stroke-linecap="round"/>

              <!-- Description -->
              <text x="${xPos + 60}" y="140"
                    font-family="Arial, sans-serif"
                    font-size="9"
                    fill="#666"
                    text-anchor="middle">
                Etiam rhoncus. Maecenas
              </text>
              <text x="${xPos + 60}" y="152"
                    font-family="Arial, sans-serif"
                    font-size="9"
                    fill="#666"
                    text-anchor="middle">
                tempus, tellus eget
              </text>
              <text x="${xPos + 60}" y="164"
                    font-family="Arial, sans-serif"
                    font-size="9"
                    fill="#666"
                    text-anchor="middle">
                condimentum rhoncus
              </text>
            </g>
          `;
        }).join('')}
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="200" height="90" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,10 120,30 120,70 80,90 40,70 40,30" fill="#B4D432" opacity="0.9"/>
      <polygon points="200,10 240,30 240,70 200,90 160,70 160,30" fill="#5ABAA5" opacity="0.9"/>
      <polygon points="320,10 360,30 360,70 320,90 280,70 280,30" fill="#4A5B7F" opacity="0.9"/>
    </svg>
  `,
  tags: ['hexagon', 'cluster', '3-items', 'comparison', 'features'],
  isPremium: false,
  usageCount: 0,
  createdAt: new Date(),
  bestUsedFor: ['Feature comparison', 'Three pillars', 'Service categories'],
};

// ============================================================================
// Export library
// ============================================================================
export const BULLET_SETS_LIBRARY: BulletSet[] = [
  HORIZONTAL_PROCESS_3STEPS,
  HEXAGON_CLUSTER_3,
];
