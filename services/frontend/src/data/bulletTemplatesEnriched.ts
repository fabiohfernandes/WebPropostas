// ============================================================================
// ENRICHED Bullet Templates - Based on Downloaded Collections
// 20+ Professional Bullet Styles from Freepik Collections
// ============================================================================

import { BulletTemplate, BulletTemplateOptions } from './bulletTemplates';

const SIZES = {
  small: { width: 80, height: 80 },
  medium: { width: 120, height: 120 },
  large: { width: 160, height: 160 },
};

// ============================================================================
// STYLE 5: Chevron Arrows (ADKAR style - connected chevrons)
// ============================================================================
export const CHEVRON_ARROWS: BulletTemplate = {
  id: 'chevron-arrows',
  name: 'Setas Chevron',
  category: 'process',
  description: 'Setas conectadas estilo ADKAR para fluxos sequenciais',
  maxSteps: 6,
  defaultSteps: 5,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    // Color progression for ADKAR style
    const colors = ['#FFA500', '#FF8C00', '#8B4513', '#800080', '#4B0082'];
    const stepColor = colors[(stepNumber - 1) % colors.length];

    return `
      <svg width="${dims.width + 20}" height="${dims.height}" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Chevron arrow shape -->
        <polygon points="10,30 90,30 110,60 90,90 10,90 30,60"
                 fill="${stepColor}"
                 opacity="0.9"/>

        <!-- Letter/Number -->
        <text x="60" y="70"
              font-family="Arial, sans-serif"
              font-size="36"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,30 90,30 110,60 90,90 10,90 30,60" fill="#FFA500" opacity="0.9"/>
      <text x="60" y="70" font-family="Arial" font-size="36" font-weight="bold" fill="white" text-anchor="middle">A</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 6: Numbered Circles (Simple numbered badges)
// ============================================================================
export const NUMBERED_CIRCLES: BulletTemplate = {
  id: 'numbered-circles',
  name: 'Círculos Numerados',
  category: 'steps',
  description: 'Círculos simples com bordas para numeração',
  maxSteps: 8,
  defaultSteps: 5,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer circle -->
        <circle cx="60" cy="60" r="45"
                fill="none"
                stroke="${color}"
                stroke-width="4"/>

        <!-- Inner circle with color -->
        <circle cx="60" cy="60" r="38"
                fill="${color}"
                opacity="0.1"/>

        <!-- Number -->
        <text x="60" y="75"
              font-family="Arial, sans-serif"
              font-size="32"
              font-weight="bold"
              fill="${color}"
              text-anchor="middle">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" stroke-width="4"/>
      <circle cx="60" cy="60" r="38" fill="#10b981" opacity="0.1"/>
      <text x="60" y="75" font-family="Arial" font-size="32" font-weight="bold" fill="#10b981" text-anchor="middle">01</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 7: Tag Labels (Price tag / label style)
// ============================================================================
export const TAG_LABELS: BulletTemplate = {
  id: 'tag-labels',
  name: 'Etiquetas Tag',
  category: 'badges',
  description: 'Etiquetas com chanfro lateral',
  maxSteps: 6,
  defaultSteps: 5,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width + 20}" height="${dims.height}" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Tag shape with rounded corners -->
        <path d="M 20 20 L 100 20 L 120 60 L 100 100 L 20 100 L 20 20 Z"
              fill="${color}"
              opacity="0.9"
              rx="5"/>

        <!-- Top label area -->
        <rect x="20" y="20" width="100" height="30"
              fill="white"
              opacity="0.2"/>

        <!-- Letter/Number -->
        <text x="60" y="72"
              font-family="Arial, sans-serif"
              font-size="28"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 20 L 100 20 L 120 60 L 100 100 L 20 100 L 20 20 Z" fill="#10b981" opacity="0.9"/>
      <rect x="20" y="20" width="100" height="30" fill="white" opacity="0.2"/>
      <text x="60" y="72" font-family="Arial" font-size="28" font-weight="bold" fill="white" text-anchor="middle">A</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 8: Double Chevrons (Flat design - layered chevrons)
// ============================================================================
export const DOUBLE_CHEVRONS: BulletTemplate = {
  id: 'double-chevrons',
  name: 'Chevron Duplo',
  category: 'arrows',
  description: 'Setas chevron em camadas com forma interna',
  maxSteps: 6,
  defaultSteps: 5,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || `DATA ${stepNumber.toString().padStart(2, '0')}`;

    // Shapes: circle, square, diamond rotation
    const shapes = ['circle', 'square', 'diamond'];
    const shape = shapes[(stepNumber - 1) % shapes.length];

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer chevron -->
        <path d="M 10 30 L 50 30 L 70 60 L 50 90 L 10 90 L 30 60 Z"
              fill="${color}"
              opacity="0.9"/>

        <!-- Inner chevron (white) -->
        <path d="M 40 40 L 60 40 L 70 60 L 60 80 L 40 80 L 50 60 Z"
              fill="white"
              opacity="0.9"/>

        <!-- Shape in center -->
        ${shape === 'circle' ? `<circle cx="60" cy="60" r="12" fill="${color}"/>` : ''}
        ${shape === 'square' ? `<rect x="48" y="48" width="24" height="24" fill="${color}"/>` : ''}
        ${shape === 'diamond' ? `<rect x="48" y="48" width="24" height="24" fill="${color}" transform="rotate(45 60 60)"/>` : ''}

        <!-- Text label -->
        <text x="95" y="35"
              font-family="Arial, sans-serif"
              font-size="10"
              font-weight="bold"
              fill="${color}">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 30 L 50 30 L 70 60 L 50 90 L 10 90 L 30 60 Z" fill="#10b981" opacity="0.9"/>
      <path d="M 40 40 L 60 40 L 70 60 L 60 80 L 40 80 L 50 60 Z" fill="white" opacity="0.9"/>
      <circle cx="60" cy="60" r="12" fill="#10b981"/>
    </svg>
  `,
};

// ============================================================================
// STYLE 9: Numbered Text Boxes (Flat design - boxes with numbers)
// ============================================================================
export const NUMBERED_BOXES: BulletTemplate = {
  id: 'numbered-boxes',
  name: 'Caixas Numeradas',
  category: 'presentation',
  description: 'Caixas de texto com número destacado',
  maxSteps: 6,
  defaultSteps: 5,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width + 60}" height="${dims.height}" viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Angled box background -->
        <path d="M 20 20 L 160 20 L 170 40 L 170 100 L 30 100 L 20 80 Z"
              fill="white"
              stroke="${color}"
              stroke-width="2"/>

        <!-- Number section -->
        <rect x="20" y="20" width="50" height="80"
              fill="${color}"/>

        <!-- Number -->
        <text x="45" y="72"
              font-family="Arial, sans-serif"
              font-size="32"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 20 L 160 20 L 170 40 L 170 100 L 30 100 L 20 80 Z" fill="white" stroke="#10b981" stroke-width="2"/>
      <rect x="20" y="20" width="50" height="80" fill="#10b981"/>
      <text x="45" y="72" font-family="Arial" font-size="32" font-weight="bold" fill="white" text-anchor="middle">01</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 10: 3D Badges (Gradient style - numbered badges with depth)
// ============================================================================
export const BADGE_3D: BulletTemplate = {
  id: 'badge-3d',
  name: 'Badges 3D',
  category: '3d',
  description: 'Badges numerados com efeito 3D e gradiente',
  maxSteps: 6,
  defaultSteps: 5,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${stepNumber}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
          </linearGradient>
        </defs>

        <!-- 3D badge base (bottom layer) -->
        <polygon points="60,10 95,30 95,90 60,110 25,90 25,30"
                 fill="#000000"
                 opacity="0.2"
                 transform="translate(3, 3)"/>

        <!-- Badge main body -->
        <polygon points="60,10 95,30 95,90 60,110 25,90 25,30"
                 fill="url(#grad${stepNumber})"/>

        <!-- White center -->
        <rect x="40" y="45" width="40" height="30"
              fill="white"
              rx="3"/>

        <!-- Number -->
        <text x="60" y="68"
              font-family="Arial, sans-serif"
              font-size="20"
              font-weight="bold"
              fill="${color}"
              text-anchor="middle">
          ${displayText}
        </text>

        <!-- Top shine effect -->
        <polygon points="60,10 95,30 95,40 60,20 25,40 25,30"
                 fill="white"
                 opacity="0.3"/>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradThumb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <polygon points="60,10 95,30 95,90 60,110 25,90 25,30" fill="url(#gradThumb)"/>
      <rect x="40" y="45" width="40" height="30" fill="white" rx="3"/>
      <text x="60" y="68" font-family="Arial" font-size="20" font-weight="bold" fill="#10b981" text-anchor="middle">01</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 11: Icon Circles (Gradient style - circles with icons)
// ============================================================================
export const ICON_CIRCLES: BulletTemplate = {
  id: 'icon-circles',
  name: 'Círculos com Ícone',
  category: 'modern',
  description: 'Círculos gradientes com ícone central',
  maxSteps: 6,
  defaultSteps: 5,
  customizable: { numbers: true, colors: true, text: false, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', size = 'medium' } = options;
    const dims = SIZES[size];

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circGrad${stepNumber}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
          </linearGradient>
        </defs>

        <!-- Shadow circle -->
        <circle cx="63" cy="63" r="48"
                fill="#000000"
                opacity="0.15"/>

        <!-- Main gradient circle -->
        <circle cx="60" cy="60" r="48"
                fill="url(#circGrad${stepNumber})"/>

        <!-- Inner white circle -->
        <circle cx="60" cy="60" r="40"
                fill="white"
                opacity="0.3"/>

        <!-- Icon placeholder (gear) -->
        <circle cx="60" cy="60" r="15"
                fill="white"
                opacity="0.9"/>
        <circle cx="60" cy="60" r="8"
                fill="${color}"/>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circGradT" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.7" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="48" fill="url(#circGradT)"/>
      <circle cx="60" cy="60" r="40" fill="white" opacity="0.3"/>
      <circle cx="60" cy="60" r="15" fill="white" opacity="0.9"/>
    </svg>
  `,
};

// ============================================================================
// STYLE 12: Banner Ribbons (Gradient style - pointed banners)
// ============================================================================
export const BANNER_RIBBONS: BulletTemplate = {
  id: 'banner-ribbons',
  name: 'Fitas Banner',
  category: 'ribbons',
  description: 'Fitas com ponta triangular',
  maxSteps: 6,
  defaultSteps: 5,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width}" height="${dims.height + 20}" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="banGrad${stepNumber}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
          </linearGradient>
        </defs>

        <!-- Banner ribbon shape -->
        <path d="M 20 20 L 100 20 L 100 100 L 60 120 L 20 100 Z"
              fill="url(#banGrad${stepNumber})"/>

        <!-- Top fold effect -->
        <rect x="20" y="20" width="80" height="15"
              fill="white"
              opacity="0.2"/>

        <!-- Border outline -->
        <path d="M 20 20 L 100 20 L 100 100 L 60 120 L 20 100 Z"
              fill="none"
              stroke="white"
              stroke-width="2"
              opacity="0.4"/>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="banGradT" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path d="M 20 20 L 100 20 L 100 100 L 60 120 L 20 100 Z" fill="url(#banGradT)"/>
      <rect x="20" y="20" width="80" height="15" fill="white" opacity="0.2"/>
    </svg>
  `,
};

// ============================================================================
// Export all enriched templates
// ============================================================================
export const ENRICHED_BULLET_TEMPLATES: BulletTemplate[] = [
  CHEVRON_ARROWS,
  NUMBERED_CIRCLES,
  TAG_LABELS,
  DOUBLE_CHEVRONS,
  NUMBERED_BOXES,
  BADGE_3D,
  ICON_CIRCLES,
  BANNER_RIBBONS,
];
