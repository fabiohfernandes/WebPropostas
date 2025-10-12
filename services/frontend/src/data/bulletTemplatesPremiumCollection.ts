// ============================================================================
// PREMIUM BULLET COLLECTION - 30+ Professional Templates
// Based on comprehensive analysis of professional infographic patterns
// ============================================================================

import { BulletTemplate, BulletTemplateOptions } from './bulletTemplates';

const SIZES = {
  small: { width: 80, height: 80 },
  medium: { width: 120, height: 120 },
  large: { width: 160, height: 160 },
};

// ============================================================================
// CATEGORY 1: CIRCULAR & BADGE STYLES (6 templates)
// ============================================================================

// STYLE 18: Double Ring Badge with Icon Center
export const DOUBLE_RING_BADGE: BulletTemplate = {
  id: 'double-ring-badge',
  name: 'Badge Anel Duplo',
  category: '3d',
  description: 'Badge com anéis duplos e centro de ícone',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || stepNumber.toString().padStart(2, '0');

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Outer ring gradient -->
          <linearGradient id="outerRing${stepNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
          </linearGradient>

          <!-- Inner ring gradient (lighter) -->
          <radialGradient id="innerRing${stepNumber}" cx="50%" cy="50%">
            <stop offset="0%" style="stop-color:white;stop-opacity:1" />
            <stop offset="80%" style="stop-color:${color};stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
          </radialGradient>

          <!-- 3D Shadow -->
          <filter id="badgeShadow${stepNumber}">
            <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.3"/>
          </filter>

          <!-- Glossy overlay -->
          <radialGradient id="glossy${stepNumber}" cx="35%" cy="30%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:white;stop-opacity:0" />
          </radialGradient>
        </defs>

        <!-- Shadow base -->
        <circle cx="60" cy="62" r="48" fill="rgba(0,0,0,0.15)" filter="url(#badgeShadow${stepNumber})"/>

        <!-- Outer ring -->
        <circle cx="60" cy="60" r="48"
                fill="url(#outerRing${stepNumber})"
                filter="url(#badgeShadow${stepNumber})"/>

        <!-- Glassmorphism overlay on outer ring -->
        <circle cx="60" cy="60" r="48"
                fill="rgba(255,255,255,0.15)"
                stroke="rgba(255,255,255,0.4)"
                stroke-width="2"/>

        <!-- Middle ring (white) -->
        <circle cx="60" cy="60" r="38"
                fill="white"
                filter="url(#badgeShadow${stepNumber})"/>

        <!-- Middle ring glass border -->
        <circle cx="60" cy="60" r="38"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                stroke-width="2"/>

        <!-- Inner badge circle -->
        <circle cx="60" cy="60" r="30"
                fill="url(#innerRing${stepNumber})"
                filter="url(#badgeShadow${stepNumber})"/>

        <!-- Inner badge glass overlay -->
        <circle cx="60" cy="60" r="30"
                fill="rgba(255,255,255,0.2)"
                stroke="rgba(255,255,255,0.5)"
                stroke-width="2"/>

        <!-- Glossy highlight -->
        <ellipse cx="48" cy="45" rx="18" ry="14"
                 fill="url(#glossy${stepNumber})"/>

        <!-- Number/Text with 3D effect -->
        <text x="60" y="69"
              font-family="Arial, sans-serif"
              font-size="24"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="68"
              font-family="Arial, sans-serif"
              font-size="24"
              font-weight="bold"
              fill="${color}"
              text-anchor="middle"
              style="text-shadow: 0 1px 3px rgba(255,255,255,0.6);">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="48" fill="#10b981" opacity="0.9"/>
      <circle cx="60" cy="60" r="38" fill="white"/>
      <circle cx="60" cy="60" r="30" fill="#10b981" opacity="0.3"/>
      <text x="60" y="68" font-family="Arial" font-size="24" font-weight="bold" fill="#10b981" text-anchor="middle">01</text>
    </svg>
  `,
};

// STYLE 19: Icon Circle Badge (Settings/Marketing/Time style)
export const ICON_CIRCLE_BADGE: BulletTemplate = {
  id: 'icon-circle-badge',
  name: 'Badge Círculo Ícone',
  category: 'badges',
  description: 'Círculo com ícone e texto abaixo',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || `STEP ${stepNumber}`;

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Circle gradient -->
          <radialGradient id="iconCircleGrad${stepNumber}" cx="40%" cy="35%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.3" />
            <stop offset="60%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
          </radialGradient>

          <!-- Shadow -->
          <filter id="iconCircleShadow${stepNumber}">
            <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.35"/>
          </filter>

          <!-- White ring gradient -->
          <radialGradient id="whiteRing${stepNumber}" cx="50%" cy="50%">
            <stop offset="0%" style="stop-color:white;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f9fafb;stop-opacity:1" />
          </radialGradient>
        </defs>

        <!-- Shadow base -->
        <circle cx="60" cy="42" r="32" fill="rgba(0,0,0,0.15)" filter="url(#iconCircleShadow${stepNumber})"/>

        <!-- Outer circle with gradient -->
        <circle cx="60" cy="40" r="32"
                fill="url(#iconCircleGrad${stepNumber})"
                filter="url(#iconCircleShadow${stepNumber})"/>

        <!-- Glass overlay -->
        <circle cx="60" cy="40" r="32"
                fill="rgba(255,255,255,0.15)"
                stroke="rgba(255,255,255,0.4)"
                stroke-width="2"/>

        <!-- White ring border (enhanced 3D) -->
        <circle cx="60" cy="40" r="28"
                fill="url(#whiteRing${stepNumber})"
                stroke="rgba(200,200,200,0.3)"
                stroke-width="2"
                filter="url(#iconCircleShadow${stepNumber})"/>

        <!-- Inner circle for icon -->
        <circle cx="60" cy="40" r="22"
                fill="rgba(255,255,255,0.95)"
                stroke="${color}"
                stroke-width="2"/>

        <!-- Number inside icon circle -->
        <text x="60" y="49"
              font-family="Arial, sans-serif"
              font-size="20"
              font-weight="bold"
              fill="${color}"
              text-anchor="middle">
          ${stepNumber}
        </text>

        <!-- Glossy highlight -->
        <ellipse cx="52" cy="30" rx="12" ry="10"
                 fill="white"
                 opacity="0.5"/>

        <!-- Text label below -->
        <text x="60" y="95"
              font-family="Arial, sans-serif"
              font-size="14"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${displayText}
        </text>
        <text x="60" y="94"
              font-family="Arial, sans-serif"
              font-size="14"
              font-weight="bold"
              fill="#333"
              text-anchor="middle">
          ${displayText}
        </text>

        <!-- Separator line -->
        <line x1="30" y1="102" x2="90" y2="102"
              stroke="#ddd"
              stroke-width="2"
              stroke-linecap="round"/>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="40" r="32" fill="#10b981" opacity="0.9"/>
      <circle cx="60" cy="40" r="22" fill="white"/>
      <text x="60" y="49" font-family="Arial" font-size="20" font-weight="bold" fill="#10b981" text-anchor="middle">1</text>
    </svg>
  `,
};

// STYLE 20: Concentric Target (Bullseye)
export const CONCENTRIC_TARGET: BulletTemplate = {
  id: 'concentric-target',
  name: 'Alvo Concêntrico',
  category: 'presentation',
  description: 'Círculos concêntricos estilo alvo com setas',
  maxSteps: 4,
  defaultSteps: 3,
  customizable: { numbers: true, colors: true, text: false, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#ef4444', size = 'medium' } = options;
    const dims = SIZES[size];

    const rings = [
      { radius: 50, opacity: 1.0 },
      { radius: 38, opacity: 0.8 },
      { radius: 26, opacity: 0.6 },
      { radius: 14, opacity: 0.4 },
    ];

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="targetShadow${stepNumber}">
            <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.3"/>
          </filter>

          <radialGradient id="ringGrad${stepNumber}" cx="50%" cy="50%">
            <stop offset="0%" style="stop-color:white;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
          </radialGradient>
        </defs>

        ${rings.map((ring, i) => `
          <!-- Ring ${i + 1} shadow -->
          <circle cx="60" cy="62" r="${ring.radius}"
                  fill="rgba(0,0,0,0.12)"
                  filter="url(#targetShadow${stepNumber})"/>

          <!-- Ring ${i + 1} -->
          <circle cx="60" cy="60" r="${ring.radius}"
                  fill="${i === rings.length - 1 ? color : 'url(#ringGrad' + stepNumber + ')'}"
                  opacity="${ring.opacity}"
                  filter="url(#targetShadow${stepNumber})"/>

          <!-- Ring ${i + 1} glass overlay -->
          <circle cx="60" cy="60" r="${ring.radius}"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="2"/>
        `).join('')}

        <!-- Center crosshair -->
        <circle cx="60" cy="60" r="5"
                fill="white"
                stroke="${color}"
                stroke-width="2"
                filter="url(#targetShadow${stepNumber})"/>

        <!-- Arrow indicators (4 directions) -->
        <defs>
          <path id="arrow" d="M 0,-8 L 4,-2 L -4,-2 Z" fill="${color}" opacity="0.8"/>
        </defs>

        <use href="#arrow" x="60" y="10" />
        <use href="#arrow" x="110" y="60" transform="rotate(90 110 60)"/>
        <use href="#arrow" x="60" y="110" transform="rotate(180 60 110)"/>
        <use href="#arrow" x="10" y="60" transform="rotate(270 10 60)"/>

        <!-- Step number -->
        <text x="60" y="70"
              font-family="Arial, sans-serif"
              font-size="16"
              font-weight="bold"
              fill="white"
              text-anchor="middle"
              style="text-shadow: 0 1px 3px rgba(0,0,0,0.5);">
          ${stepNumber}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="60" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="#ef4444" opacity="1"/>
      <circle cx="60" cy="60" r="38" fill="#ef4444" opacity="0.7"/>
      <circle cx="60" cy="60" r="26" fill="#ef4444" opacity="0.5"/>
      <circle cx="60" cy="60" r="14" fill="#ef4444" opacity="0.3"/>
    </svg>
  `,
};

// ============================================================================
// CATEGORY 2: CARD & BOX LAYOUTS (8 templates)
// ============================================================================

// STYLE 21: Numbered Card with Colored Tab
export const NUMBERED_TAB_CARD: BulletTemplate = {
  id: 'numbered-tab-card',
  name: 'Card com Aba Numerada',
  category: 'modern',
  description: 'Card horizontal com aba colorida e número',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || 'YOUR TEXT HERE';

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Tab gradient -->
          <linearGradient id="tabCardGrad${stepNumber}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
          </linearGradient>

          <!-- Shadow -->
          <filter id="tabCardShadow${stepNumber}">
            <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.25"/>
          </filter>

          <!-- Card gradient -->
          <linearGradient id="cardBg${stepNumber}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:white;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f9fafb;stop-opacity:1" />
          </linearGradient>
        </defs>

        <!-- Card shadow -->
        <rect x="2" y="12" width="176" height="76"
              rx="6"
              fill="rgba(0,0,0,0.12)"
              filter="url(#tabCardShadow${stepNumber})"/>

        <!-- Main card -->
        <rect x="0" y="10" width="176" height="76"
              rx="6"
              fill="url(#cardBg${stepNumber})"
              stroke="#e5e7eb"
              stroke-width="2"
              filter="url(#tabCardShadow${stepNumber})"/>

        <!-- Glass overlay on card -->
        <rect x="0" y="10" width="176" height="76"
              rx="6"
              fill="rgba(255,255,255,0.5)"
              stroke="rgba(255,255,255,0.6)"
              stroke-width="1"/>

        <!-- Colored tab -->
        <rect x="0" y="0" width="50" height="86"
              rx="6"
              fill="url(#tabCardGrad${stepNumber})"
              filter="url(#tabCardShadow${stepNumber})"/>

        <!-- Glass overlay on tab -->
        <rect x="0" y="0" width="50" height="86"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              stroke-width="2"/>

        <!-- Tab highlight -->
        <rect x="5" y="5" width="40" height="20"
              rx="3"
              fill="white"
              opacity="0.3"/>

        <!-- Number on tab -->
        <text x="25" y="54"
              font-family="Arial, sans-serif"
              font-size="28"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${stepNumber.toString().padStart(2, '0')}
        </text>
        <text x="25" y="52"
              font-family="Arial, sans-serif"
              font-size="28"
              font-weight="bold"
              fill="white"
              text-anchor="middle"
              style="text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          ${stepNumber.toString().padStart(2, '0')}
        </text>

        <!-- Text label -->
        <text x="70" y="35"
              font-family="Arial, sans-serif"
              font-size="12"
              font-weight="bold"
              fill="${color}"
              text-anchor="start">
          ${displayText}
        </text>

        <!-- Description lines -->
        <line x1="70" y1="45" x2="165" y2="45" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
        <line x1="70" y1="55" x2="155" y2="55" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
        <line x1="70" y1="65" x2="145" y2="65" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="30" viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="10" width="176" height="76" rx="6" fill="white" stroke="#e5e7eb" stroke-width="2"/>
      <rect x="0" y="0" width="50" height="86" rx="6" fill="#10b981"/>
      <text x="25" y="52" font-family="Arial" font-size="28" font-weight="bold" fill="white" text-anchor="middle">01</text>
    </svg>
  `,
};

// STYLE 22: Pentagon Arrow Card
export const PENTAGON_ARROW_CARD: BulletTemplate = {
  id: 'pentagon-arrow-card',
  name: 'Card Seta Pentagonal',
  category: 'arrows',
  description: 'Card com seta apontando para direita',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || 'TEXT';

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Card gradient -->
          <linearGradient id="pentaGrad${stepNumber}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
          </linearGradient>

          <!-- Shadow -->
          <filter id="pentaShadow${stepNumber}">
            <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.3"/>
          </filter>
        </defs>

        <!-- Pentagon arrow shadow -->
        <path d="M 2 12 L 127 12 L 152 42 L 127 72 L 2 72 Z"
              fill="rgba(0,0,0,0.15)"
              filter="url(#pentaShadow${stepNumber})"/>

        <!-- Pentagon arrow main -->
        <path d="M 0 10 L 125 10 L 150 40 L 125 70 L 0 70 Z"
              fill="url(#pentaGrad${stepNumber})"
              filter="url(#pentaShadow${stepNumber})"/>

        <!-- Glass overlay -->
        <path d="M 0 10 L 125 10 L 150 40 L 125 70 L 0 70 Z"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              stroke-width="2"/>

        <!-- Top highlight -->
        <path d="M 5 14 L 120 14 L 125 18 L 5 18 Z"
              fill="white"
              opacity="0.4"/>

        <!-- Number circle -->
        <circle cx="35" cy="40" r="18"
                fill="white"
                opacity="0.95"
                filter="url(#pentaShadow${stepNumber})"/>

        <circle cx="35" cy="40" r="18"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                stroke-width="2"/>

        <!-- Number -->
        <text x="35" y="49"
              font-family="Arial, sans-serif"
              font-size="20"
              font-weight="bold"
              fill="${color}"
              text-anchor="middle">
          ${stepNumber.toString().padStart(2, '0')}
        </text>

        <!-- Text -->
        <text x="70" y="45"
              font-family="Arial, sans-serif"
              font-size="16"
              font-weight="bold"
              fill="white"
              text-anchor="start"
              style="text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="30" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 10 L 125 10 L 150 40 L 125 70 L 0 70 Z" fill="#10b981"/>
      <circle cx="35" cy="40" r="18" fill="white"/>
      <text x="35" y="49" font-family="Arial" font-size="20" font-weight="bold" fill="#10b981" text-anchor="middle">01</text>
    </svg>
  `,
};

// STYLE 23: Triangle with Stem (Wine Glass Style)
export const TRIANGLE_STEM: BulletTemplate = {
  id: 'triangle-stem',
  name: 'Triângulo com Haste',
  category: 'modern',
  description: 'Triângulo com número e haste de conexão',
  maxSteps: 6,
  defaultSteps: 4,
  customizable: { numbers: true, colors: true, text: true, size: true },
  generateSVG: (options) => {
    const { stepNumber, color = '#10b981', text, size = 'medium' } = options;
    const dims = SIZES[size];
    const displayText = text || 'Title';

    return `
      <svg width="${dims.width}" height="${dims.height}" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Triangle gradient -->
          <linearGradient id="triStemGrad${stepNumber}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
          </linearGradient>

          <!-- Shadow -->
          <filter id="triStemShadow${stepNumber}">
            <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.3"/>
          </filter>
        </defs>

        <!-- Stem shadow -->
        <rect x="57" y="82" width="8" height="48"
              rx="4"
              fill="rgba(0,0,0,0.15)"
              filter="url(#triStemShadow${stepNumber})"/>

        <!-- Stem -->
        <rect x="55" y="80" width="8" height="48"
              rx="4"
              fill="${color}"
              opacity="0.8"
              filter="url(#triStemShadow${stepNumber})"/>

        <!-- Stem glass overlay -->
        <rect x="55" y="80" width="8" height="48"
              rx="4"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.3)"
              stroke-width="1"/>

        <!-- Triangle shadow -->
        <path d="M 60 12 L 105 82 L 15 82 Z"
              fill="rgba(0,0,0,0.15)"
              filter="url(#triStemShadow${stepNumber})"/>

        <!-- Triangle -->
        <path d="M 60 10 L 103 80 L 17 80 Z"
              fill="url(#triStemGrad${stepNumber})"
              filter="url(#triStemShadow${stepNumber})"/>

        <!-- Glass overlay -->
        <path d="M 60 10 L 103 80 L 17 80 Z"
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.4)"
              stroke-width="2"/>

        <!-- Top highlight -->
        <path d="M 60 15 L 90 65 L 30 65 Z"
              fill="white"
              opacity="0.3"/>

        <!-- Number -->
        <text x="60" y="57"
              font-family="Arial, sans-serif"
              font-size="24"
              font-weight="bold"
              fill="rgba(0,0,0,0.2)"
              text-anchor="middle">
          ${stepNumber.toString().padStart(2, '0')}
        </text>
        <text x="60" y="55"
              font-family="Arial, sans-serif"
              font-size="24"
              font-weight="bold"
              fill="white"
              text-anchor="middle"
              style="text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          ${stepNumber.toString().padStart(2, '0')}
        </text>

        <!-- Text box with shadow -->
        <rect x="20" y="135" width="80" height="20"
              rx="4"
              fill="rgba(0,0,0,0.05)"
              filter="url(#triStemShadow${stepNumber})"/>

        <rect x="20" y="133" width="80" height="20"
              rx="4"
              fill="white"
              stroke="#e5e7eb"
              stroke-width="1.5"
              filter="url(#triStemShadow${stepNumber})"/>

        <!-- Text -->
        <text x="60" y="147"
              font-family="Arial, sans-serif"
              font-size="11"
              fill="#666"
              text-anchor="middle">
          ${displayText}
        </text>
      </svg>
    `;
  },
  thumbnailSVG: `
    <svg width="60" height="80" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="80" width="8" height="48" rx="4" fill="#10b981" opacity="0.8"/>
      <path d="M 60 10 L 103 80 L 17 80 Z" fill="#10b981"/>
      <text x="60" y="55" font-family="Arial" font-size="24" font-weight="bold" fill="white" text-anchor="middle">01</text>
    </svg>
  `,
};

// ============================================================================
// Export all premium templates
// ============================================================================
export const PREMIUM_BULLET_TEMPLATES: BulletTemplate[] = [
  DOUBLE_RING_BADGE,
  ICON_CIRCLE_BADGE,
  CONCENTRIC_TARGET,
  NUMBERED_TAB_CARD,
  PENTAGON_ARROW_CARD,
  TRIANGLE_STEM,
];
