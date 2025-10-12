// ============================================================================
// Editable Bullet Templates
// SVG-based customizable bullets for infographics and presentations
// ============================================================================

import { ENRICHED_BULLET_TEMPLATES } from './bulletTemplatesEnriched';

export interface BulletTemplate {
  id: string;
  name: string;
  category: 'steps' | 'process' | 'timeline' | 'comparison' | 'hierarchy' | 'arrows' | 'badges' | '3d' | 'modern' | 'ribbons' | 'presentation';
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
        <!-- Triangle background -->
        <path d="M60 20 L100 100 L20 100 Z"
              fill="${color}"
              stroke="${color}"
              stroke-width="2"
              opacity="0.9"/>

        <!-- Triangle border/outline -->
        <path d="M60 20 L100 100 L20 100 Z"
              fill="none"
              stroke="white"
              stroke-width="3"
              opacity="0.3"/>

        <!-- Number/Text -->
        <text x="60" y="75"
              font-family="Arial, sans-serif"
              font-size="32"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${displayText}
        </text>

        ${showConnector ? `
          <!-- Connector line -->
          <line x1="100" y1="100" x2="130" y2="100"
                stroke="#9ca3af"
                stroke-width="4"
                stroke-linecap="round"/>
          <circle cx="115" cy="100" r="4" fill="#9ca3af"/>
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
        <!-- Hexagon background -->
        <polygon points="60,15 95,35 95,75 60,95 25,75 25,35"
                 fill="${color}"
                 opacity="0.9"/>

        <!-- Hexagon border -->
        <polygon points="60,15 95,35 95,75 60,95 25,75 25,35"
                 fill="none"
                 stroke="white"
                 stroke-width="3"
                 opacity="0.4"/>

        <!-- Inner hexagon -->
        <polygon points="60,25 85,40 85,70 60,85 35,70 35,40"
                 fill="none"
                 stroke="white"
                 stroke-width="2"
                 opacity="0.3"/>

        <!-- Number/Text -->
        <text x="60" y="65"
              font-family="Arial, sans-serif"
              font-size="28"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${displayText}
        </text>

        ${showConnector ? `
          <!-- Curved arrow connector -->
          <path d="M 95 55 Q 115 45, 125 55"
                stroke="#9ca3af"
                stroke-width="5"
                fill="none"
                stroke-linecap="round"/>
          <polygon points="125,55 118,50 118,60" fill="#9ca3af"/>
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
        <!-- Pin body -->
        <path d="M60 20 C45 20, 35 30, 35 45 C35 60, 60 85, 60 85 C60 85, 85 60, 85 45 C85 30, 75 20, 60 20 Z"
              fill="${color}"
              opacity="0.9"/>

        <!-- Pin border -->
        <path d="M60 20 C45 20, 35 30, 35 45 C35 60, 60 85, 60 85 C60 85, 85 60, 85 45 C85 30, 75 20, 60 20 Z"
              fill="none"
              stroke="white"
              stroke-width="3"
              opacity="0.4"/>

        <!-- Inner circle -->
        <circle cx="60" cy="45" r="18"
                fill="white"
                opacity="0.3"/>

        <!-- Number/Text -->
        <text x="60" y="52"
              font-family="Arial, sans-serif"
              font-size="20"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${displayText}
        </text>

        ${showConnector ? `
          <!-- Timeline connector -->
          <line x1="85" y1="100" x2="135" y2="100"
                stroke="#9ca3af"
                stroke-width="3"/>
          <circle cx="110" cy="100" r="3" fill="#9ca3af"/>
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
        <!-- Box with tab -->
        <g transform="translate(0, ${60 + yOffset})">
          <!-- Tab -->
          <rect x="15" y="0" width="90" height="25"
                fill="${color}"
                opacity="0.7"
                rx="5"/>

          <!-- Main box -->
          <rect x="10" y="25" width="100" height="70"
                fill="${color}"
                opacity="0.5"
                rx="8"/>

          <!-- Inner border -->
          <rect x="10" y="25" width="100" height="70"
                fill="none"
                stroke="white"
                stroke-width="2"
                opacity="0.3"
                rx="8"/>

          <!-- Number circle -->
          <circle cx="60" cy="45" r="18"
                  fill="white"
                  opacity="0.9"/>

          <!-- Number/Text -->
          <text x="60" y="52"
                font-family="Arial, sans-serif"
                font-size="20"
                font-weight="bold"
                fill="${color}"
                text-anchor="middle">
            ${displayText}
          </text>
        </g>

        ${showConnector ? `
          <!-- Arrow connector -->
          <g transform="translate(0, ${60 + yOffset})">
            <path d="M 110 30 L 130 10"
                  stroke="${color}"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="round"
                  opacity="0.6"/>
            <polygon points="130,10 125,15 135,15"
                     fill="${color}"
                     opacity="0.6"/>
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
  ...ENRICHED_BULLET_TEMPLATES, // Add 8 more professional templates
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
