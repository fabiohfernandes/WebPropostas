// ============================================================================
// Bullet System V2 - Type Definitions
// Complete rewrite with Individual Bullets and Bullet Sets architecture
// ============================================================================

// ============================================================================
// COLOR SYSTEM - Based on 4110.jpg Analysis
// ============================================================================

export interface ColorScale {
  light: string;   // Lightest shade (for highlights)
  medium: string;  // Medium shade (main color)
  dark: string;    // Darkest shade (for depth)
}

export const COLOR_SCALES = {
  limeGreen: {
    light: '#C3D82E',
    medium: '#B4D432',
    dark: '#A6C639',
  },
  teal: {
    light: '#5ABAA5',
    medium: '#4FA896',
    dark: '#3D8977',
  },
  navy: {
    light: '#4A5B7F',
    medium: '#3D4D6B',
    dark: '#2E3A52',
  },
  lightBlue: {
    light: '#95C7E0',
    medium: '#7DAFCE',
    dark: '#4A90C0',
  },
  orange: {
    light: '#FF9A56',
    medium: '#FF7F3E',
    dark: '#E66A2C',
  },
  purple: {
    light: '#B794F6',
    medium: '#9F7AEA',
    dark: '#805AD5',
  },
  pink: {
    light: '#FBB6CE',
    medium: '#F687B3',
    dark: '#ED64A6',
  },
  emerald: {
    light: '#6EE7B7',
    medium: '#34D399',
    dark: '#10B981',
  },
} as const;

export type ColorScaleName = keyof typeof COLOR_SCALES;

// ============================================================================
// GRADIENT SYSTEM
// ============================================================================

export type GradientDirection = 'horizontal' | 'vertical' | 'radial' | 'diagonal';

export interface GradientConfig {
  type: 'linear' | 'radial';
  direction?: GradientDirection;
  stops: Array<{
    color: string;
    position: number; // 0-100
    opacity?: number; // 0-1
  }>;
}

// ============================================================================
// VISUAL EFFECTS
// ============================================================================

export interface GlassEffect {
  enabled: boolean;
  strokeWidth: number; // px
  strokeColor: string;
  strokeOpacity: number; // 0-1
  innerGlow?: {
    color: string;
    blur: number; // px
    opacity: number; // 0-1
  };
}

export interface ShadowEffect {
  enabled: boolean;
  offsetX: number; // px
  offsetY: number; // px
  blur: number; // px
  color: string;
  opacity: number; // 0-1
}

export interface VisualEffects {
  gradient?: GradientConfig;
  glass?: GlassEffect;
  shadow?: ShadowEffect;
  opacity?: number; // Overall opacity 0-1
}

// ============================================================================
// INDIVIDUAL BULLETS
// ============================================================================

export type BulletShape =
  | 'circle'
  | 'hexagon'
  | 'square'
  | 'diamond'
  | 'pill'
  | 'triangle'
  | 'pentagon'
  | 'rounded-square'
  | 'custom-path';

export type BulletCategory =
  | 'basic-shapes'      // Circles, squares, hexagons
  | 'process-steps'     // Numbered steps, sequences
  | 'icons'             // Icon-based bullets
  | 'connectors'        // Arrows, lines, flow elements
  | 'decorative'        // Ornamental elements
  | 'charts'            // Data visualization elements
  | 'custom';

export interface IndividualBullet {
  id: string;
  name: string;
  category: BulletCategory;
  description: string;

  // Visual properties
  shape: BulletShape;
  baseColor: ColorScaleName | 'custom';
  customColor?: string;

  // Size (in canvas units)
  defaultWidth: number;
  defaultHeight: number;
  aspectRatio: number;

  // Visual effects
  effects: VisualEffects;

  // Content customization
  customizable: {
    text: boolean;
    number: boolean;
    icon: boolean;
    color: boolean;
    size: boolean;
  };

  // SVG generator
  generateSVG: (options: BulletRenderOptions) => string;

  // Thumbnail for UI
  thumbnailSVG: string;

  // Metadata
  tags: string[];
  isPremium: boolean;
  usageCount?: number;
  createdAt: Date;
}

export interface BulletRenderOptions {
  width: number;
  height: number;
  color?: ColorScaleName | string;
  text?: string;
  number?: number;
  icon?: string; // Icon identifier
  effects?: Partial<VisualEffects>;
  customData?: Record<string, any>;
}

// ============================================================================
// BULLET SETS (Grouped Compositions)
// ============================================================================

export type SetLayout =
  | 'horizontal-sequence'   // A → B → C (linear flow)
  | 'vertical-stack'        // Stacked vertically
  | 'circular-flow'         // Radial/orbital arrangement
  | 'grid'                  // Grid layout (2x2, 3x3, etc.)
  | 'hexagon-cluster'       // Honeycomb arrangement
  | 'timeline'              // Timeline with dates/milestones
  | 'comparison'            // Side-by-side comparison
  | 'pyramid'               // Hierarchical pyramid
  | 'custom';

export interface SetElement {
  bulletId: string;         // Reference to IndividualBullet
  position: {
    x: number;              // Relative position in set
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  rotation?: number;        // Degrees
  colorOverride?: ColorScaleName | string;
  textOverride?: string;
  numberOverride?: number;
  zIndex?: number;          // Layering
}

export interface SetConnector {
  type: 'arrow' | 'line' | 'dashed-line' | 'curved-line' | 'double-arrow';
  from: {
    elementIndex: number;   // Index in elements array
    anchor: 'top' | 'right' | 'bottom' | 'left' | 'center';
  };
  to: {
    elementIndex: number;
    anchor: 'top' | 'right' | 'bottom' | 'left' | 'center';
  };
  style: {
    strokeWidth: number;
    strokeColor: string;
    strokeDashArray?: string; // e.g., "5,5" for dashed
    arrowSize?: number;
  };
}

export interface BulletSet {
  id: string;
  name: string;
  description: string;
  category: 'process' | 'flow' | 'comparison' | 'data-viz' | 'timeline' | 'custom';

  // Layout configuration
  layout: SetLayout;

  // Set dimensions (bounding box)
  width: number;
  height: number;

  // Elements in the set
  elements: SetElement[];

  // Connectors between elements
  connectors?: SetConnector[];

  // Customization options
  customizable: {
    elementCount: boolean;     // Can add/remove elements
    elementColors: boolean;    // Can change colors
    elementText: boolean;      // Can change text
    layout: boolean;           // Can rearrange
  };

  // SVG generator for complete set
  generateSVG: (options: SetRenderOptions) => string;

  // Thumbnail
  thumbnailSVG: string;

  // Metadata
  tags: string[];
  isPremium: boolean;
  usageCount?: number;
  createdAt: Date;

  // Usage guidance
  bestUsedFor: string[];     // e.g., ["3-step process", "Timeline", "Comparison"]
}

export interface SetRenderOptions {
  width: number;
  height: number;
  colorScheme?: ColorScaleName[];  // Array of colors for multi-element sets
  texts?: string[];                // Text for each element
  numbers?: number[];              // Numbers for each element
  customData?: Record<string, any>;
}

// ============================================================================
// LIBRARY MANAGEMENT
// ============================================================================

export interface BulletLibrary {
  individualBullets: IndividualBullet[];
  bulletSets: BulletSet[];
  userCreated: {
    bullets: IndividualBullet[];
    sets: BulletSet[];
  };
}

// ============================================================================
// SESSION STATE
// ============================================================================

export interface BulletSessionState {
  activeTab: 'individual' | 'sets';
  selectedCategory: BulletCategory | 'all';
  searchQuery: string;
  filters: {
    isPremium: boolean | null;
    colorScheme: ColorScaleName | null;
    tags: string[];
  };
  view: 'grid' | 'list';
}

// ============================================================================
// EXPORT HELPERS
// ============================================================================

export const DEFAULT_GLASS_EFFECT: GlassEffect = {
  enabled: true,
  strokeWidth: 3,
  strokeColor: '#ffffff',
  strokeOpacity: 0.6,
  innerGlow: {
    color: '#ffffff',
    blur: 4,
    opacity: 0.3,
  },
};

export const DEFAULT_SHADOW_EFFECT: ShadowEffect = {
  enabled: true,
  offsetX: 2,
  offsetY: 4,
  blur: 6,
  color: '#000000',
  opacity: 0.25,
};
