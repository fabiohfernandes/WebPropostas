// ============================================================================
// Font Configuration - Google Fonts Mapping
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

export interface FontOption {
  name: string;
  value: string;
  category: 'sans-serif' | 'serif' | 'monospace';
  weights: number[];
}

export const AVAILABLE_FONTS: FontOption[] = [
  // Sans-serif fonts
  {
    name: 'Inter',
    value: 'Inter, sans-serif',
    category: 'sans-serif',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Roboto',
    value: 'Roboto, sans-serif',
    category: 'sans-serif',
    weights: [300, 400, 500, 700, 900],
  },
  {
    name: 'Open Sans',
    value: '"Open Sans", sans-serif',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Montserrat',
    value: 'Montserrat, sans-serif',
    category: 'sans-serif',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Poppins',
    value: 'Poppins, sans-serif',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Lato',
    value: 'Lato, sans-serif',
    category: 'sans-serif',
    weights: [300, 400, 700, 900],
  },
  {
    name: 'Raleway',
    value: 'Raleway, sans-serif',
    category: 'sans-serif',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Source Sans 3',
    value: '"Source Sans 3", sans-serif',
    category: 'sans-serif',
    weights: [200, 300, 400, 500, 600, 700, 900],
  },
  {
    name: 'Oswald',
    value: 'Oswald, sans-serif',
    category: 'sans-serif',
    weights: [200, 300, 400, 500, 600, 700],
  },

  // Serif fonts
  {
    name: 'Playfair Display',
    value: '"Playfair Display", serif',
    category: 'serif',
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Merriweather',
    value: 'Merriweather, serif',
    category: 'serif',
    weights: [300, 400, 700, 900],
  },

  // Monospace
  {
    name: 'JetBrains Mono',
    value: '"JetBrains Mono", monospace',
    category: 'monospace',
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
  },

  // System fonts
  {
    name: 'Arial',
    value: 'Arial, sans-serif',
    category: 'sans-serif',
    weights: [400, 700],
  },
  {
    name: 'Times New Roman',
    value: '"Times New Roman", serif',
    category: 'serif',
    weights: [400, 700],
  },
  {
    name: 'Courier New',
    value: '"Courier New", monospace',
    category: 'monospace',
    weights: [400, 700],
  },
];

/**
 * Get CSS font-family value from font name
 */
export function getFontFamily(fontName: string): string {
  const font = AVAILABLE_FONTS.find((f) => f.name === fontName);
  return font?.value || 'Arial, sans-serif';
}

/**
 * Get font by name
 */
export function getFont(fontName: string): FontOption | undefined {
  return AVAILABLE_FONTS.find((f) => f.name === fontName);
}

/**
 * Get all fonts by category
 */
export function getFontsByCategory(category: FontOption['category']): FontOption[] {
  return AVAILABLE_FONTS.filter((f) => f.category === category);
}
