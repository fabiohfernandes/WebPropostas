// ============================================================================
// Bullet Templates - SVG Generators for Custom Bullets
// Including Post-it Note Templates
// ============================================================================

export interface BulletTemplate {
  id: string;
  name: string;
  description: string;
  maxSteps: number;
  thumbnailSVG: string;
  generator: (step: number, total: number, color: string, size: 'small' | 'medium' | 'large', options?: any) => string;
}

// Size configurations
const SIZES = {
  small: { base: 60, text: 24 },
  medium: { base: 80, text: 32 },
  large: { base: 100, text: 40 },
};

// ============================================================================
// POST-IT NOTE TEMPLATES
// ============================================================================

/**
 * Square Post-it Note
 * Classic square sticky note with shadow and optional pin
 */
function generateSquarePostit(
  step: number,
  total: number,
  color: string,
  size: 'small' | 'medium' | 'large',
  options?: { showPin?: boolean; text?: string }
): string {
  const { base, text: textSize } = SIZES[size];
  const showPin = options?.showPin ?? false;
  const text = options?.text || (step + 1).toString();

  return `
    <svg width="${base}" height="${base}" viewBox="0 0 ${base} ${base}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow-${step}">
          <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.25"/>
        </filter>
      </defs>

      <!-- Post-it paper -->
      <rect
        x="0"
        y="0"
        width="${base}"
        height="${base}"
        fill="${color}"
        filter="url(#shadow-${step})"
      />

      ${showPin ? `
        <!-- Pin -->
        <circle cx="${base - 12}" cy="12" r="4" fill="#DC2626"/>
        <circle cx="${base - 12}" cy="12" r="2.5" fill="#991B1B"/>
      ` : ''}

      <!-- Text -->
      <text
        x="${base / 2}"
        y="${base / 2 + textSize * 0.35}"
        font-family="'Caveat', 'Patrick Hand', 'Indie Flower', cursive"
        font-size="${textSize}"
        font-weight="600"
        fill="#374151"
        text-anchor="middle"
      >${text}</text>
    </svg>
  `;
}

/**
 * Rectangle Post-it Note (Horizontal)
 * Wide rectangular sticky note perfect for titles
 */
function generateRectanglePostit(
  step: number,
  total: number,
  color: string,
  size: 'small' | 'medium' | 'large',
  options?: { showPin?: boolean; text?: string }
): string {
  const { base, text: textSize } = SIZES[size];
  const width = base * 1.5;
  const height = base;
  const showPin = options?.showPin ?? false;
  const text = options?.text || (step + 1).toString();

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow-rect-${step}">
          <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.25"/>
        </filter>
      </defs>

      <!-- Post-it paper -->
      <rect
        x="0"
        y="0"
        width="${width}"
        height="${height}"
        fill="${color}"
        filter="url(#shadow-rect-${step})"
      />

      ${showPin ? `
        <!-- Pin -->
        <circle cx="${width - 15}" cy="15" r="4" fill="#DC2626"/>
        <circle cx="${width - 15}" cy="15" r="2.5" fill="#991B1B"/>
      ` : ''}

      <!-- Text -->
      <text
        x="${width / 2}"
        y="${height / 2 + textSize * 0.35}"
        font-family="'Caveat', 'Patrick Hand', 'Indie Flower', cursive"
        font-size="${textSize}"
        font-weight="600"
        fill="#374151"
        text-anchor="middle"
      >${text}</text>
    </svg>
  `;
}

/**
 * Rounded Square Post-it Note
 * Square sticky note with rounded corners
 */
function generateRoundedPostit(
  step: number,
  total: number,
  color: string,
  size: 'small' | 'medium' | 'large',
  options?: { showPin?: boolean; text?: string }
): string {
  const { base, text: textSize } = SIZES[size];
  const showPin = options?.showPin ?? false;
  const text = options?.text || (step + 1).toString();
  const radius = base * 0.15;

  return `
    <svg width="${base}" height="${base}" viewBox="0 0 ${base} ${base}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow-rounded-${step}">
          <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.25"/>
        </filter>
      </defs>

      <!-- Post-it paper with rounded corners -->
      <rect
        x="0"
        y="0"
        width="${base}"
        height="${base}"
        rx="${radius}"
        ry="${radius}"
        fill="${color}"
        filter="url(#shadow-rounded-${step})"
      />

      ${showPin ? `
        <!-- Pin -->
        <circle cx="${base - 12}" cy="12" r="4" fill="#DC2626"/>
        <circle cx="${base - 12}" cy="12" r="2.5" fill="#991B1B"/>
      ` : ''}

      <!-- Text -->
      <text
        x="${base / 2}"
        y="${base / 2 + textSize * 0.35}"
        font-family="'Caveat', 'Patrick Hand', 'Indie Flower', cursive"
        font-size="${textSize}"
        font-weight="600"
        fill="#374151"
        text-anchor="middle"
      >${text}</text>
    </svg>
  `;
}

/**
 * Circle Post-it Note
 * Circular sticky note
 */
function generateCirclePostit(
  step: number,
  total: number,
  color: string,
  size: 'small' | 'medium' | 'large',
  options?: { showPin?: boolean; text?: string }
): string {
  const { base, text: textSize } = SIZES[size];
  const radius = base / 2;
  const showPin = options?.showPin ?? false;
  const text = options?.text || (step + 1).toString();

  return `
    <svg width="${base}" height="${base}" viewBox="0 0 ${base} ${base}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow-circle-${step}">
          <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.25"/>
        </filter>
      </defs>

      <!-- Post-it paper circle -->
      <circle
        cx="${radius}"
        cy="${radius}"
        r="${radius}"
        fill="${color}"
        filter="url(#shadow-circle-${step})"
      />

      ${showPin ? `
        <!-- Pin -->
        <circle cx="${base - 12}" cy="12" r="4" fill="#DC2626"/>
        <circle cx="${base - 12}" cy="12" r="2.5" fill="#991B1B"/>
      ` : ''}

      <!-- Text -->
      <text
        x="${radius}"
        y="${radius + textSize * 0.35}"
        font-family="'Caveat', 'Patrick Hand', 'Indie Flower', cursive"
        font-size="${textSize}"
        font-weight="600"
        fill="#374151"
        text-anchor="middle"
      >${text}</text>
    </svg>
  `;
}

/**
 * Vertical Rectangle Post-it Note
 * Tall rectangular sticky note
 */
function generateVerticalPostit(
  step: number,
  total: number,
  color: string,
  size: 'small' | 'medium' | 'large',
  options?: { showPin?: boolean; text?: string }
): string {
  const { base, text: textSize } = SIZES[size];
  const width = base;
  const height = base * 1.5;
  const showPin = options?.showPin ?? false;
  const text = options?.text || (step + 1).toString();

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow-vert-${step}">
          <feDropShadow dx="2" dy="3" stdDeviation="4" flood-opacity="0.25"/>
        </filter>
      </defs>

      <!-- Post-it paper -->
      <rect
        x="0"
        y="0"
        width="${width}"
        height="${height}"
        fill="${color}"
        filter="url(#shadow-vert-${step})"
      />

      ${showPin ? `
        <!-- Pin -->
        <circle cx="${width - 12}" cy="12" r="4" fill="#DC2626"/>
        <circle cx="${width - 12}" cy="12" r="2.5" fill="#991B1B"/>
      ` : ''}

      <!-- Text -->
      <text
        x="${width / 2}"
        y="${height / 2 + textSize * 0.35}"
        font-family="'Caveat', 'Patrick Hand', 'Indie Flower', cursive"
        font-size="${textSize}"
        font-weight="600"
        fill="#374151"
        text-anchor="middle"
      >${text}</text>
    </svg>
  `;
}

// ============================================================================
// CLASSIC BULLET TEMPLATES (Numbered, Checkmarks, etc.)
// ============================================================================

/**
 * Classic numbered circle bullets
 */
function generateNumberedCircle(
  step: number,
  total: number,
  color: string,
  size: 'small' | 'medium' | 'large'
): string {
  const { base, text: textSize } = SIZES[size];
  const radius = base / 2;

  return `
    <svg width="${base}" height="${base}" viewBox="0 0 ${base} ${base}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="${color}"/>
      <text
        x="${radius}"
        y="${radius + textSize * 0.35}"
        font-family="Arial, sans-serif"
        font-size="${textSize}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
      >${step + 1}</text>
    </svg>
  `;
}

/**
 * Square bullets with numbers
 */
function generateNumberedSquare(
  step: number,
  total: number,
  color: string,
  size: 'small' | 'medium' | 'large'
): string {
  const { base, text: textSize } = SIZES[size];

  return `
    <svg width="${base}" height="${base}" viewBox="0 0 ${base} ${base}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${base}" height="${base}" fill="${color}"/>
      <text
        x="${base / 2}"
        y="${base / 2 + textSize * 0.35}"
        font-family="Arial, sans-serif"
        font-size="${textSize}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
      >${step + 1}</text>
    </svg>
  `;
}

// ============================================================================
// TEMPLATE REGISTRY
// ============================================================================

export const BULLET_TEMPLATES: BulletTemplate[] = [
  // Post-it Templates
  {
    id: 'postit-square',
    name: 'Post-it Quadrado',
    description: 'Nota adesiva quadrada clássica com fonte manuscrita',
    maxSteps: 10,
    thumbnailSVG: generateSquarePostit(0, 1, '#FFEB3B', 'medium', { showPin: false, text: '1' }),
    generator: generateSquarePostit,
  },
  {
    id: 'postit-rectangle',
    name: 'Post-it Retângulo',
    description: 'Nota adesiva retangular horizontal, ideal para títulos',
    maxSteps: 10,
    thumbnailSVG: generateRectanglePostit(0, 1, '#FF80AB', 'medium', { showPin: false, text: '1' }),
    generator: generateRectanglePostit,
  },
  {
    id: 'postit-rounded',
    name: 'Post-it Arredondado',
    description: 'Nota adesiva com cantos arredondados',
    maxSteps: 10,
    thumbnailSVG: generateRoundedPostit(0, 1, '#4FC3F7', 'medium', { showPin: false, text: '1' }),
    generator: generateRoundedPostit,
  },
  {
    id: 'postit-circle',
    name: 'Post-it Circular',
    description: 'Nota adesiva circular',
    maxSteps: 10,
    thumbnailSVG: generateCirclePostit(0, 1, '#CDDC39', 'medium', { showPin: false, text: '1' }),
    generator: generateCirclePostit,
  },
  {
    id: 'postit-vertical',
    name: 'Post-it Vertical',
    description: 'Nota adesiva retangular vertical',
    maxSteps: 10,
    thumbnailSVG: generateVerticalPostit(0, 1, '#80CBC4', 'medium', { showPin: false, text: '1' }),
    generator: generateVerticalPostit,
  },
  // Classic Bullet Templates
  {
    id: 'numbered-circle',
    name: 'Círculo Numerado',
    description: 'Bullets circulares com números sequenciais',
    maxSteps: 20,
    thumbnailSVG: generateNumberedCircle(0, 1, '#10b981', 'medium'),
    generator: generateNumberedCircle,
  },
  {
    id: 'numbered-square',
    name: 'Quadrado Numerado',
    description: 'Bullets quadrados com números sequenciais',
    maxSteps: 20,
    thumbnailSVG: generateNumberedSquare(0, 1, '#3b82f6', 'medium'),
    generator: generateNumberedSquare,
  },
];

/**
 * Generate a sequence of bullets based on a template
 */
export function generateBulletSequence(
  templateId: string,
  steps: number,
  color: string,
  size: 'small' | 'medium' | 'large',
  options?: any
): string[] {
  const template = BULLET_TEMPLATES.find((t) => t.id === templateId);
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  return Array.from({ length: steps }, (_, i) => template.generator(i, steps, color, size, options));
}
