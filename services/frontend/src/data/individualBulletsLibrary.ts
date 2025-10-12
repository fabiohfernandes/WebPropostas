// ============================================================================
// Individual Bullets Library
// Professional bullet elements based on 4110.jpg deep analysis
// ============================================================================

import {
  IndividualBullet,
  BulletRenderOptions,
  COLOR_SCALES,
  ColorScaleName,
  DEFAULT_GLASS_EFFECT,
  DEFAULT_SHADOW_EFFECT,
} from '@/types/bulletSystemV2';

// ============================================================================
// HELPER: Generate gradient definition
// ============================================================================
function generateGradientDef(
  id: string,
  type: 'linear' | 'radial',
  color: string,
  direction: 'horizontal' | 'vertical' | 'radial' = 'radial'
): string {
  if (type === 'radial') {
    return `
      <radialGradient id="${id}" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:white;stop-opacity:0.3" />
        <stop offset="60%" style="stop-color:${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.85" />
      </radialGradient>
    `;
  } else {
    const x1 = direction === 'horizontal' ? '0%' : '50%';
    const y1 = direction === 'horizontal' ? '50%' : '0%';
    const x2 = direction === 'horizontal' ? '100%' : '50%';
    const y2 = direction === 'horizontal' ? '50%' : '100%';

    return `
      <linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.85" />
      </linearGradient>
    `;
  }
}

// ============================================================================
// HELPER: Generate glass effect
// ============================================================================
function generateGlassEffect(uniqueId: string): string {
  return `
    <filter id="glass_${uniqueId}">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
      <feOffset dx="0" dy="-1" result="offsetblur"/>
      <feFlood flood-color="white" flood-opacity="0.3"/>
      <feComposite in2="offsetblur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `;
}

// ============================================================================
// HELPER: Generate shadow effect
// ============================================================================
function generateShadowEffect(uniqueId: string): string {
  return `
    <filter id="shadow_${uniqueId}">
      <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.25"/>
    </filter>
  `;
}

// ============================================================================
// HELPER: Get color from scale
// ============================================================================
function getColor(colorName: ColorScaleName | string, shade: 'light' | 'medium' | 'dark' = 'medium'): string {
  if (colorName in COLOR_SCALES) {
    return COLOR_SCALES[colorName as ColorScaleName][shade];
  }
  return colorName; // Return as-is if custom color
}

// ============================================================================
// BULLET 01: Step Circle (Process Step)
// Based on: Main section horizontal pills from 4110.jpg
// ============================================================================
export const STEP_CIRCLE: IndividualBullet = {
  id: 'step-circle-v2',
  name: 'Círculo de Etapa',
  category: 'process-steps',
  description: 'Círculo numerado para processos e fluxos',
  shape: 'circle',
  baseColor: 'limeGreen',
  defaultWidth: 120,
  defaultHeight: 120,
  aspectRatio: 1,
  effects: {
    gradient: {
      type: 'radial',
      direction: 'radial',
      stops: [
        { color: '#ffffff', position: 0, opacity: 0.3 },
        { color: '#B4D432', position: 60, opacity: 1 },
        { color: '#B4D432', position: 100, opacity: 0.85 },
      ],
    },
    glass: DEFAULT_GLASS_EFFECT,
    shadow: DEFAULT_SHADOW_EFFECT,
  },
  customizable: {
    text: true,
    number: true,
    icon: false,
    color: true,
    size: true,
  },
  generateSVG: (options: BulletRenderOptions) => {
    const { width, height, color = 'limeGreen', number = 1, text } = options;
    const mainColor = getColor(color, 'medium');
    const uniqueId = `step_${number}_${Date.now()}`;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${generateGradientDef(`grad_${uniqueId}`, 'radial', mainColor)}
          ${generateShadowEffect(uniqueId)}
          ${generateGlassEffect(uniqueId)}
        </defs>

        <!-- Shadow base -->
        <circle cx="60" cy="62" r="48"
                fill="rgba(0,0,0,0.12)"
                filter="url(#shadow_${uniqueId})"/>

        <!-- Main circle with gradient -->
        <circle cx="60" cy="60" r="48"
                fill="url(#grad_${uniqueId})"
                filter="url(#shadow_${uniqueId})"/>

        <!-- Glass effect border -->
        <circle cx="60" cy="60" r="48"
                fill="none"
                stroke="white"
                stroke-width="3"
                stroke-opacity="0.6"
                filter="url(#glass_${uniqueId})"/>

        <!-- Inner white ring -->
        <circle cx="60" cy="60" r="42"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-opacity="0.3"/>

        <!-- Step label background -->
        ${text ? `
        <text x="60" y="45"
              font-family="Arial, sans-serif"
              font-size="11"
              font-weight="600"
              fill="white"
              fill-opacity="0.9"
              text-anchor="middle">
          STEP
        </text>
        ` : ''}

        <!-- Number (3D effect) -->
        <text x="60" y="${text ? '75' : '71'}"
              font-family="Arial, sans-serif"
              font-size="36"
              font-weight="bold"
              fill="rgba(0,0,0,0.15)"
              text-anchor="middle">
          ${number.toString().padStart(2, '0')}
        </text>
        <text x="60" y="${text ? '73' : '69'}"
              font-family="Arial, sans-serif"
              font-size="36"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${number.toString().padStart(2, '0')}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="48" fill="#B4D432" opacity="0.9"/>
      <circle cx="60" cy="60" r="48" fill="none" stroke="white" stroke-width="3" opacity="0.6"/>
      <text x="60" y="73" font-family="Arial" font-size="36" font-weight="bold" fill="white" text-anchor="middle">01</text>
    </svg>
  `,
  tags: ['process', 'step', 'numbered', 'circle'],
  isPremium: false,
  createdAt: new Date(),
};

// ============================================================================
// BULLET 02: Hexagon Badge
// Based on: Hexagon elements from slide 2 and 5 in 4110.jpg
// ============================================================================
export const HEXAGON_BADGE: IndividualBullet = {
  id: 'hexagon-badge-v2',
  name: 'Badge Hexagonal',
  category: 'basic-shapes',
  description: 'Hexágono com ícone ou número',
  shape: 'hexagon',
  baseColor: 'teal',
  defaultWidth: 120,
  defaultHeight: 140,
  aspectRatio: 120 / 140,
  effects: {
    gradient: {
      type: 'linear',
      direction: 'vertical',
      stops: [
        { color: '#5ABAA5', position: 0, opacity: 1 },
        { color: '#5ABAA5', position: 100, opacity: 0.85 },
      ],
    },
    glass: DEFAULT_GLASS_EFFECT,
    shadow: DEFAULT_SHADOW_EFFECT,
  },
  customizable: {
    text: true,
    number: true,
    icon: true,
    color: true,
    size: true,
  },
  generateSVG: (options: BulletRenderOptions) => {
    const { width, height, color = 'teal', number, text = 'Title', icon } = options;
    const mainColor = getColor(color, 'medium');
    const uniqueId = `hex_${number || Date.now()}`;

    // Hexagon points (centered at 60,50 with radius 40)
    const hexPoints = '60,10 100,30 100,70 60,90 20,70 20,30';

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${generateGradientDef(`grad_${uniqueId}`, 'linear', mainColor, 'vertical')}
          ${generateShadowEffect(uniqueId)}
          ${generateGlassEffect(uniqueId)}
        </defs>

        <!-- Shadow base -->
        <polygon points="60,12 100,32 100,72 60,92 20,72 20,32"
                 fill="rgba(0,0,0,0.12)"
                 filter="url(#shadow_${uniqueId})"/>

        <!-- Main hexagon with gradient -->
        <polygon points="${hexPoints}"
                 fill="url(#grad_${uniqueId})"
                 filter="url(#shadow_${uniqueId})"/>

        <!-- Glass effect border -->
        <polygon points="${hexPoints}"
                 fill="none"
                 stroke="white"
                 stroke-width="3"
                 stroke-opacity="0.6"
                 filter="url(#glass_${uniqueId})"/>

        <!-- Inner hexagon outline -->
        <polygon points="60,18 92,34 92,66 60,82 28,66 28,34"
                 fill="none"
                 stroke="white"
                 stroke-width="2"
                 stroke-opacity="0.25"/>

        <!-- Icon circle background -->
        <circle cx="60" cy="50" r="22"
                fill="white"
                fill-opacity="0.95"
                filter="url(#shadow_${uniqueId})"/>

        <!-- Number or Icon -->
        ${number ? `
        <text x="60" y="60"
              font-family="Arial, sans-serif"
              font-size="24"
              font-weight="bold"
              fill="${mainColor}"
              text-anchor="middle">
          ${number.toString().padStart(2, '0')}
        </text>
        ` : icon ? `
        <!-- Icon placeholder -->
        <circle cx="60" cy="50" r="12" fill="${mainColor}" opacity="0.8"/>
        ` : ''}

        <!-- Title text below -->
        <text x="60" y="115"
              font-family="Arial, sans-serif"
              font-size="13"
              font-weight="bold"
              fill="#333"
              text-anchor="middle">
          ${text}
        </text>
        <line x1="30" y1="122" x2="90" y2="122"
              stroke="#ddd"
              stroke-width="2"
              stroke-linecap="round"/>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="70" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 100,30 100,70 60,90 20,70 20,30" fill="#5ABAA5" opacity="0.9"/>
      <circle cx="60" cy="50" r="22" fill="white" opacity="0.95"/>
      <text x="60" y="60" font-family="Arial" font-size="24" font-weight="bold" fill="#5ABAA5" text-anchor="middle">01</text>
    </svg>
  `,
  tags: ['hexagon', 'badge', 'icon', 'numbered'],
  isPremium: false,
  createdAt: new Date(),
};

// ============================================================================
// BULLET 03: Diamond Shape (45° rotated square)
// Based on: Slide 1 diamond decision flow in 4110.jpg
// ============================================================================
export const DIAMOND_BADGE: IndividualBullet = {
  id: 'diamond-badge-v2',
  name: 'Badge Diamante',
  category: 'basic-shapes',
  description: 'Diamante (quadrado rotacionado 45°) com texto',
  shape: 'diamond',
  baseColor: 'navy',
  defaultWidth: 140,
  defaultHeight: 140,
  aspectRatio: 1,
  effects: {
    gradient: {
      type: 'linear',
      direction: 'diagonal',
      stops: [
        { color: '#4A5B7F', position: 0, opacity: 1 },
        { color: '#4A5B7F', position: 100, opacity: 0.85 },
      ],
    },
    glass: DEFAULT_GLASS_EFFECT,
    shadow: DEFAULT_SHADOW_EFFECT,
  },
  customizable: {
    text: true,
    number: false,
    icon: true,
    color: true,
    size: true,
  },
  generateSVG: (options: BulletRenderOptions) => {
    const { width, height, color = 'navy', text = 'UP' } = options;
    const mainColor = getColor(color, 'medium');
    const uniqueId = `diamond_${Date.now()}`;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${generateGradientDef(`grad_${uniqueId}`, 'linear', mainColor, 'diagonal')}
          ${generateShadowEffect(uniqueId)}
          ${generateGlassEffect(uniqueId)}
        </defs>

        <!-- Shadow base -->
        <path d="M 70 12 L 128 70 L 70 128 L 12 70 Z"
              fill="rgba(0,0,0,0.12)"
              filter="url(#shadow_${uniqueId})"/>

        <!-- Main diamond with gradient -->
        <path d="M 70 10 L 130 70 L 70 130 L 10 70 Z"
              fill="url(#grad_${uniqueId})"
              filter="url(#shadow_${uniqueId})"/>

        <!-- Glass effect border -->
        <path d="M 70 10 L 130 70 L 70 130 L 10 70 Z"
              fill="none"
              stroke="white"
              stroke-width="3"
              stroke-opacity="0.6"
              filter="url(#glass_${uniqueId})"/>

        <!-- Inner diamond outline -->
        <path d="M 70 25 L 115 70 L 70 115 L 25 70 Z"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-opacity="0.25"/>

        <!-- Icon circle -->
        <circle cx="70" cy="55" r="18"
                fill="white"
                fill-opacity="0.95"
                filter="url(#shadow_${uniqueId})"/>

        <!-- Icon (arrow or custom) -->
        <path d="M 70 45 L 75 50 L 70 50 L 70 65 L 65 65 L 65 50 L 60 50 Z"
              fill="${mainColor}"
              opacity="0.9"/>

        <!-- Text label -->
        <text x="70" y="95"
              font-family="Arial, sans-serif"
              font-size="18"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${text}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M 70 10 L 130 70 L 70 130 L 10 70 Z" fill="#4A5B7F" opacity="0.9"/>
      <circle cx="70" cy="55" r="18" fill="white" opacity="0.95"/>
      <text x="70" y="95" font-family="Arial" font-size="18" font-weight="bold" fill="white" text-anchor="middle">UP</text>
    </svg>
  `,
  tags: ['diamond', 'decision', 'arrow', 'flow'],
  isPremium: false,
  createdAt: new Date(),
};

// ============================================================================
// BULLET 04: Pill Shape (Horizontal Capsule)
// Based on: Main section horizontal pills (A, B, C) from 4110.jpg
// ============================================================================
export const PILL_BADGE: IndividualBullet = {
  id: 'pill-badge-v2',
  name: 'Badge Pílula',
  category: 'process-steps',
  description: 'Formato pílula horizontal para processos',
  shape: 'pill',
  baseColor: 'lightBlue',
  defaultWidth: 200,
  defaultHeight: 80,
  aspectRatio: 200 / 80,
  effects: {
    gradient: {
      type: 'linear',
      direction: 'horizontal',
      stops: [
        { color: '#7DAFCE', position: 0, opacity: 1 },
        { color: '#7DAFCE', position: 100, opacity: 0.9 },
      ],
    },
    glass: DEFAULT_GLASS_EFFECT,
    shadow: DEFAULT_SHADOW_EFFECT,
  },
  customizable: {
    text: true,
    number: true,
    icon: true,
    color: true,
    size: true,
  },
  generateSVG: (options: BulletRenderOptions) => {
    const { width, height, color = 'lightBlue', number = 1, text = 'Your description here' } = options;
    const mainColor = getColor(color, 'medium');
    const uniqueId = `pill_${number}_${Date.now()}`;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${generateGradientDef(`grad_${uniqueId}`, 'linear', mainColor, 'horizontal')}
          ${generateShadowEffect(uniqueId)}
          ${generateGlassEffect(uniqueId)}
        </defs>

        <!-- Shadow base -->
        <rect x="2" y="12" width="196" height="66" rx="33"
              fill="rgba(0,0,0,0.12)"
              filter="url(#shadow_${uniqueId})"/>

        <!-- Main pill shape with gradient -->
        <rect x="0" y="10" width="196" height="66" rx="33"
              fill="url(#grad_${uniqueId})"
              filter="url(#shadow_${uniqueId})"/>

        <!-- Glass effect border -->
        <rect x="0" y="10" width="196" height="66" rx="33"
              fill="none"
              stroke="white"
              stroke-width="3"
              stroke-opacity="0.6"
              filter="url(#glass_${uniqueId})"/>

        <!-- Inner pill outline -->
        <rect x="5" y="15" width="186" height="56" rx="28"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-opacity="0.2"/>

        <!-- Left circle (number) -->
        <circle cx="35" cy="43" r="22"
                fill="white"
                fill-opacity="0.95"
                filter="url(#shadow_${uniqueId})"/>

        <text x="35" y="37"
              font-family="Arial, sans-serif"
              font-size="9"
              font-weight="600"
              fill="${mainColor}"
              fill-opacity="0.7"
              text-anchor="middle">
          STEP
        </text>
        <text x="35" y="54"
              font-family="Arial, sans-serif"
              font-size="20"
              font-weight="bold"
              fill="${mainColor}"
              text-anchor="middle">
          ${number.toString().padStart(2, '0')}
        </text>

        <!-- Text content -->
        <text x="75" y="48"
              font-family="Arial, sans-serif"
              font-size="13"
              font-weight="500"
              fill="white"
              fill-opacity="0.95">
          ${text.substring(0, 35)}${text.length > 35 ? '...' : ''}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="100" height="40" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="10" width="196" height="66" rx="33" fill="#7DAFCE" opacity="0.9"/>
      <circle cx="35" cy="43" r="22" fill="white" opacity="0.95"/>
      <text x="35" y="54" font-family="Arial" font-size="20" font-weight="bold" fill="#7DAFCE" text-anchor="middle">01</text>
    </svg>
  `,
  tags: ['pill', 'capsule', 'process', 'horizontal', 'step'],
  isPremium: false,
  createdAt: new Date(),
};

// ============================================================================
// Export library
// ============================================================================
export const INDIVIDUAL_BULLETS_LIBRARY: IndividualBullet[] = [
  STEP_CIRCLE,
  HEXAGON_BADGE,
  DIAMOND_BADGE,
  PILL_BADGE,
];
