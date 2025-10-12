// ============================================================================
// Editable Bullet Templates
// SVG-based customizable bullets for infographics and presentations
// ============================================================================

import { ENRICHED_BULLET_TEMPLATES } from './bulletTemplatesEnriched';
import { CHART_BULLET_TEMPLATES } from './bulletTemplatesCharts';
import { PREMIUM_BULLET_TEMPLATES } from './bulletTemplatesPremiumCollection';

export interface BulletTemplate {
  id: string;
  name: string;
  category: 'steps' | 'process' | 'timeline' | 'comparison' | 'hierarchy' | 'arrows' | 'badges' | '3d' | 'modern' | 'ribbons' | 'presentation' | 'charts';
  description: string;
  maxSteps: number; // Maximum number of steps supported
  defaultSteps: number; // Default number to show
  // Customizable properties
  customizable: {
    numbers: boolean;
    colors: boolean;
    text: boolean;
    size: boolean;
  };
  // SVG generator function
  generateSVG: (options: BulletTemplateOptions) => string;
  // Thumbnail preview
  thumbnailSVG: string;
}

export interface BulletTemplateOptions {
  stepNumber: number; // Which step (1, 2, 3, 4, etc.)
  totalSteps: number; // Total steps in sequence
  color: string; // Primary color
  secondaryColor?: string; // Secondary color for gradients
  text?: string; // Custom text instead of number
  size: 'small' | 'medium' | 'large'; // Size preset
  showConnector?: boolean; // Show connector to next element
}

// Size presets in pixels
const SIZES = {
  small: { width: 80, height: 80 },
  medium: { width: 120, height: 120 },
  large: { width: 160, height: 160 },
};

// ============================================================================
// STYLE 1: Triangle Steps (from reference image - top left)
// ============================================================================
export const TRIANGLE_STEPS: BulletTemplate = {
  id: 'triangle-steps',
  name: 'Passos Triangulares',
  category: 'steps',
  description: 'Triângulos conectados para processos sequenciais',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: {
    numbers: true,
    colors: true,
    text: true,
    size: true,
  },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium', showConnector = true } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradient for 3D depth -->
          <linearGradient id="triangleGrad${stepNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
          </linearGradient>

          <!-- Glassmorphism backdrop blur -->
          <filter id="glassBlur${stepNumber}">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          <!-- 3D Shadow -->
          <filter id="shadow3d${stepNumber}">
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
          </filter>

          <!-- Inner glow for highlight -->
          <filter id="innerGlow${stepNumber}">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="-2" result="offsetblur"/>
            <feFlood flood-color="white" flood-opacity="0.5"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- 3D Base Shadow Layer -->
        <path d="M60 24 L102 102 L18 102 Z"
              fill="rgba(0,0,0,0.15)"
              filter="url(#glassBlur${stepNumber})"/>

        <!-- Triangle background with gradient -->
        <path d="M60 20 L100 100 L20 100 Z"
              fill="url(#triangleGrad${stepNumber})"
              stroke="${color}"
              stroke-width="1"
              filter="url(#shadow3d${stepNumber})"
              opacity="0.95"/>

        <!-- Glassmorphism overlay -->
        <path d="M60 20 L100 100 L20 100 Z"
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.3)"
              stroke-width="2"/>

        <!-- Top highlight (3D reflex) -->
        <path d="M60 20 L90 70 L30 70 Z"
              fill="url(#topHighlight${stepNumber})"
              opacity="0.4"/>
        <linearGradient id="topHighlight${stepNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:white;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:white;stop-opacity:0" />
        </linearGradient>

        <!-- 3D Text with extrusion -->
        <text x="60" y="77"
              font-family="Arial, sans-serif"
              font-size="32"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="75"
              font-family="Arial, sans-serif"
              font-size="32"
              font-weight="bold"
              fill="white"
              text-anchor="middle"
              filter="url(#innerGlow${stepNumber})">
          ${displayText}
        </text>

        ${showConnector ? `
          <!-- Connector line with glow -->
          <line x1="100" y1="100" x2="130" y2="100"
                stroke="#9ca3af"
                stroke-width="4"
                stroke-linecap="round"
                filter="url(#shadow3d${stepNumber})"/>
          <circle cx="115" cy="100" r="4" fill="#9ca3af" filter="url(#shadow3d${stepNumber})"/>
        ` : ''}
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20 L100 100 L20 100 Z" fill="#10b981" opacity="0.9"/>
      <path d="M60 20 L100 100 L20 100 Z" fill="none" stroke="white" stroke-width="3" opacity="0.3"/>
      <text x="60" y="75" font-family="Arial" font-size="32" font-weight="bold" fill="white" text-anchor="middle">01</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 2: Hexagon Flow (from reference image - top right)
// ============================================================================
export const HEXAGON_FLOW: BulletTemplate = {
  id: 'hexagon-flow',
  name: 'Fluxo Hexagonal',
  category: 'process',
  description: 'Hexágonos com setas curvas para fluxos de processo',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: {
    numbers: true,
    colors: true,
    text: true,
    size: true,
  },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium', showConnector = true } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Radial gradient for 3D volume -->
          <radialGradient id="hexGrad${stepNumber}" cx="50%" cy="30%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
          </radialGradient>

          <!-- 3D extrusion shadow -->
          <filter id="hexShadow${stepNumber}">
            <feDropShadow dx="3" dy="6" stdDeviation="4" flood-opacity="0.4"/>
          </filter>

          <!-- Glassmorphism frosted glass -->
          <filter id="hexGlass${stepNumber}">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0.8" />
            </feComponentTransfer>
          </filter>

          <!-- Metallic shine -->
          <linearGradient id="hexShine${stepNumber}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.6" />
            <stop offset="50%" style="stop-color:white;stop-opacity:0" />
            <stop offset="100%" style="stop-color:white;stop-opacity:0.3" />
          </linearGradient>
        </defs>

        <!-- 3D base shadow for depth -->
        <polygon points="60,18 96,38 96,78 60,98 24,78 24,38"
                 fill="rgba(0,0,0,0.2)"
                 filter="url(#hexGlass${stepNumber})"/>

        <!-- Hexagon with gradient fill -->
        <polygon points="60,15 95,35 95,75 60,95 25,75 25,35"
                 fill="url(#hexGrad${stepNumber})"
                 filter="url(#hexShadow${stepNumber})"
                 opacity="0.95"/>

        <!-- Glassmorphism overlay -->
        <polygon points="60,15 95,35 95,75 60,95 25,75 25,35"
                 fill="rgba(255,255,255,0.2)"
                 stroke="rgba(255,255,255,0.5)"
                 stroke-width="2"/>

        <!-- Metallic highlight on top edges -->
        <polygon points="60,15 95,35 85,40 60,25"
                 fill="url(#hexShine${stepNumber})"
                 opacity="0.7"/>

        <!-- Inner hexagon with glass effect -->
        <polygon points="60,25 85,40 85,70 60,85 35,70 35,40"
                 fill="none"
                 stroke="rgba(255,255,255,0.4)"
                 stroke-width="2"/>

        <!-- Bright highlight spot (3D reflex) -->
        <ellipse cx="50" cy="30" rx="12" ry="8"
                 fill="white"
                 opacity="0.4"
                 filter="url(#hexGlass${stepNumber})"/>

        <!-- 3D extruded text -->
        <text x="60" y="67"
              font-family="Arial, sans-serif"
              font-size="28"
              font-weight="bold"
              fill="rgba(0,0,0,0.25)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="65"
              font-family="Arial, sans-serif"
              font-size="28"
              font-weight="bold"
              fill="white"
              text-anchor="middle"
              style="text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          ${displayText}
        </text>

        ${showConnector ? `
          <!-- Curved arrow connector with glow -->
          <defs>
            <filter id="arrowGlow${stepNumber}">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 95 55 Q 115 45, 125 55"
                stroke="#9ca3af"
                stroke-width="5"
                fill="none"
                stroke-linecap="round"
                filter="url(#arrowGlow${stepNumber})"/>
          <polygon points="125,55 118,50 118,60" fill="#9ca3af" filter="url(#arrowGlow${stepNumber})"/>
        ` : ''}
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,15 95,35 95,75 60,95 25,75 25,35" fill="#10b981" opacity="0.9"/>
      <polygon points="60,15 95,35 95,75 60,95 25,75 25,35" fill="none" stroke="white" stroke-width="3" opacity="0.4"/>
      <text x="60" y="65" font-family="Arial" font-size="28" font-weight="bold" fill="white" text-anchor="middle">01</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 3: Pin Markers (from reference image - bottom left)
// ============================================================================
export const PIN_MARKERS: BulletTemplate = {
  id: 'pin-markers',
  name: 'Marcadores Pin',
  category: 'timeline',
  description: 'Pins de localização para marcos temporais',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: {
    numbers: true,
    colors: true,
    text: true,
    size: true,
  },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium', showConnector = true } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Radial gradient for pin volume -->
          <radialGradient id="pinGrad${stepNumber}" cx="40%" cy="30%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.4" />
            <stop offset="40%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
          </radialGradient>

          <!-- 3D shadow for depth -->
          <filter id="pinShadow${stepNumber}">
            <feDropShadow dx="2" dy="5" stdDeviation="4" flood-opacity="0.4"/>
          </filter>

          <!-- Glossy highlight -->
          <radialGradient id="pinGloss${stepNumber}" cx="35%" cy="25%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:white;stop-opacity:0" />
          </radialGradient>

          <!-- Inner circle gradient -->
          <radialGradient id="pinInner${stepNumber}" cx="50%" cy="50%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:white;stop-opacity:0.4" />
          </radialGradient>
        </defs>

        <!-- 3D base shadow -->
        <path d="M60 23 C45 23, 35 33, 35 48 C35 63, 60 88, 60 88 C60 88, 85 63, 85 48 C85 33, 75 23, 60 23 Z"
              fill="rgba(0,0,0,0.2)"
              filter="url(#pinShadow${stepNumber})"/>

        <!-- Pin body with gradient -->
        <path d="M60 20 C45 20, 35 30, 35 45 C35 60, 60 85, 60 85 C60 85, 85 60, 85 45 C85 30, 75 20, 60 20 Z"
              fill="url(#pinGrad${stepNumber})"
              filter="url(#pinShadow${stepNumber})"
              opacity="0.95"/>

        <!-- Glassmorphism overlay -->
        <path d="M60 20 C45 20, 35 30, 35 45 C35 60, 60 85, 60 85 C60 85, 85 60, 85 45 C85 30, 75 20, 60 20 Z"
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.4)"
              stroke-width="2"/>

        <!-- Glossy highlight on top -->
        <ellipse cx="52" cy="32" rx="15" ry="12"
                 fill="url(#pinGloss${stepNumber})"
                 opacity="0.6"/>

        <!-- Inner circle with gradient -->
        <circle cx="60" cy="45" r="18"
                fill="url(#pinInner${stepNumber})"/>

        <!-- Inner circle border -->
        <circle cx="60" cy="45" r="18"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                stroke-width="2"/>

        <!-- 3D extruded text -->
        <text x="60" y="53"
              font-family="Arial, sans-serif"
              font-size="20"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="52"
              font-family="Arial, sans-serif"
              font-size="20"
              font-weight="bold"
              fill="${color}"
              text-anchor="middle"
              style="text-shadow: 0 1px 3px rgba(255,255,255,0.5);">
          ${displayText}
        </text>

        ${showConnector ? `
          <!-- Timeline connector with glow -->
          <defs>
            <filter id="timelineGlow${stepNumber}">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <line x1="85" y1="100" x2="135" y2="100"
                stroke="#9ca3af"
                stroke-width="3"
                filter="url(#timelineGlow${stepNumber})"/>
          <circle cx="110" cy="100" r="3" fill="#9ca3af" filter="url(#timelineGlow${stepNumber})"/>
        ` : ''}
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20 C45 20, 35 30, 35 45 C35 60, 60 85, 60 85 C60 85, 85 60, 85 45 C85 30, 75 20, 60 20 Z" fill="#10b981" opacity="0.9"/>
      <circle cx="60" cy="45" r="18" fill="white" opacity="0.3"/>
      <text x="60" y="52" font-family="Arial" font-size="20" font-weight="bold" fill="white" text-anchor="middle">01</text>
    </svg>
  `,
};

// ============================================================================
// STYLE 4: Stepped Boxes (from reference image - bottom right)
// ============================================================================
export const STEPPED_BOXES: BulletTemplate = {
  id: 'stepped-boxes',
  name: 'Caixas Escalonadas',
  category: 'process',
  description: 'Caixas em escada com setas para processos ascendentes',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: {
    numbers: true,
    colors: true,
    text: true,
    size: true,
  },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium', showConnector = true } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    // Calculate step offset for staircase effect
    const yOffset = (stepNumber - 1) * -15;

    return `
      <svg width="${dims.width}" height="${dims.height + 60}" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Linear gradient for tab -->
          <linearGradient id="tabGrad${stepNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
          </linearGradient>

          <!-- Linear gradient for box with depth -->
          <linearGradient id="boxGrad${stepNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.7" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
          </linearGradient>

          <!-- 3D shadow filter -->
          <filter id="boxShadow${stepNumber}">
            <feDropShadow dx="3" dy="5" stdDeviation="4" flood-opacity="0.35"/>
          </filter>

          <!-- Glassmorphism frosted effect -->
          <filter id="boxGlass${stepNumber}">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>

          <!-- Circle shine -->
          <radialGradient id="circleShine${stepNumber}" cx="35%" cy="35%">
            <stop offset="0%" style="stop-color:white;stop-opacity:1" />
            <stop offset="100%" style="stop-color:white;stop-opacity:0.7" />
          </radialGradient>
        </defs>

        <!-- Box with tab -->
        <g transform="translate(0, ${60 + yOffset})">
          <!-- 3D Shadow base -->
          <rect x="12" y="27" width="100" height="70"
                fill="rgba(0,0,0,0.2)"
                rx="8"
                filter="url(#boxGlass${stepNumber})"/>

          <!-- Tab with gradient -->
          <rect x="15" y="0" width="90" height="25"
                fill="url(#tabGrad${stepNumber})"
                rx="5"
                filter="url(#boxShadow${stepNumber})"/>

          <!-- Tab glassmorphism overlay -->
          <rect x="15" y="0" width="90" height="25"
                fill="rgba(255,255,255,0.2)"
                stroke="rgba(255,255,255,0.4)"
                stroke-width="1.5"
                rx="5"/>

          <!-- Tab highlight -->
          <rect x="20" y="3" width="80" height="8"
                fill="white"
                opacity="0.3"
                rx="3"/>

          <!-- Main box with gradient -->
          <rect x="10" y="25" width="100" height="70"
                fill="url(#boxGrad${stepNumber})"
                rx="8"
                filter="url(#boxShadow${stepNumber})"/>

          <!-- Box glassmorphism overlay -->
          <rect x="10" y="25" width="100" height="70"
                fill="rgba(255,255,255,0.15)"
                stroke="rgba(255,255,255,0.3)"
                stroke-width="2"
                rx="8"/>

          <!-- Top edge highlight -->
          <rect x="15" y="28" width="90" height="15"
                fill="white"
                opacity="0.15"
                rx="5"/>

          <!-- Number circle shadow -->
          <circle cx="60" cy="47" r="18"
                  fill="rgba(0,0,0,0.1)"/>

          <!-- Number circle with shine -->
          <circle cx="60" cy="45" r="18"
                  fill="url(#circleShine${stepNumber})"
                  filter="url(#boxShadow${stepNumber})"/>

          <!-- Circle border -->
          <circle cx="60" cy="45" r="18"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  stroke-width="2"/>

          <!-- 3D extruded text -->
          <text x="60" y="53"
                font-family="Arial, sans-serif"
                font-size="20"
                font-weight="bold"
                fill="rgba(0,0,0,0.2)"
                text-anchor="middle">
            ${displayText}
          </text>
          <text x="60" y="52"
                font-family="Arial, sans-serif"
                font-size="20"
                font-weight="bold"
                fill="${color}"
                text-anchor="middle"
                style="text-shadow: 0 1px 3px rgba(255,255,255,0.6);">
            ${displayText}
          </text>
        </g>

        ${showConnector ? `
          <!-- Arrow connector with glow -->
          <defs>
            <filter id="arrowGlowStep${stepNumber}">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(0, ${60 + yOffset})">
            <path d="M 110 30 L 130 10"
                  stroke="${color}"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="round"
                  opacity="0.8"
                  filter="url(#arrowGlowStep${stepNumber})"/>
            <polygon points="130,10 125,15 135,15"
                     fill="${color}"
                     opacity="0.8"
                     filter="url(#arrowGlowStep${stepNumber})"/>
          </g>
        ` : ''}
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="20" width="90" height="20" fill="#10b981" opacity="0.7" rx="5"/>
      <rect x="10" y="40" width="100" height="60" fill="#10b981" opacity="0.5" rx="8"/>
      <circle cx="60" cy="55" r="15" fill="white" opacity="0.9"/>
      <text x="60" y="61" font-family="Arial" font-size="18" font-weight="bold" fill="#10b981" text-anchor="middle">01</text>
    </svg>
  `,
};

// ============================================================================
// Export all templates
// ============================================================================
export const BULLET_TEMPLATES: BulletTemplate[] = [
  TRIANGLE_STEPS,
  HEXAGON_FLOW,
  PIN_MARKERS,
  STEPPED_BOXES,
  ...ENRICHED_BULLET_TEMPLATES,  // Add 8 more professional templates
  ...CHART_BULLET_TEMPLATES,     // Add 5 chart visualization templates
  ...PREMIUM_BULLET_TEMPLATES,   // Add 6 premium collection templates
];

// Helper function to generate a complete sequence
export function generateBulletSequence(
  templateId: string,
  totalSteps: number,
  baseColor: string = '#10b981',
  size: 'small' | 'medium' | 'large' = 'medium'
): string[] {
  const template = BULLET_TEMPLATES.find((t) => t.id === templateId);
  if (!template) return [];

  const svgs: string[] = [];
  for (let i = 1; i <= totalSteps; i++) {
    svgs.push(
      template.generateSVG({
        stepNumber: i,
        totalSteps,
        color: baseColor,
        size,
        showConnector: i < totalSteps,
      })
    );
  }
  return svgs;
}
