// ============================================================================
// Template Builder - TypeScript Type Definitions
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

/**
 * Element Types supported in the builder
 */
export type ElementType = 'text' | 'image' | 'shape' | 'icon' | 'chart' | 'form' | 'frame' | 'video' | 'bullet';

/**
 * Shape Types for shape elements
 */
export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'line' | 'arrow';

/**
 * Text alignment options
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Text style presets
 */
export type TextStyle = 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption' | 'quote';

/**
 * Layer definition for grouping elements
 */
export interface Layer {
  id: string;
  name: string;
  zIndex: number;
  visible: boolean;
  locked: boolean;
  color?: string; // Optional color for layer identification
}

/**
 * Base element properties shared by all element types
 */
export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  layerId?: string; // Optional layer ID for grouping elements
  locked: boolean;
  visible: boolean;
}

/**
 * Text element properties
 */
export interface TextElement extends BaseElement {
  type: 'text';
  properties: {
    content: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: number | string;
    fontStyle: 'normal' | 'italic';
    textAlign: TextAlign;
    lineHeight: number;
    letterSpacing: number;
    color: string;
    backgroundColor?: string;
    textDecoration?: 'none' | 'underline' | 'line-through';
    textStyle?: TextStyle;
    // Text effects
    shadow?: {
      blur: number;
      color: string;
      offsetX: number;
      offsetY: number;
    };
    glow?: {
      color: string;
      intensity: number;
    };
  };
}

/**
 * Image element properties
 */
export interface ImageElement extends BaseElement {
  type: 'image';
  properties: {
    src: string;
    alt?: string;
    fit: 'cover' | 'contain' | 'fill' | 'none';
    // Image effects
    filter?: 'none' | 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast';
    filterValue?: number;
    border?: {
      width: number;
      color: string;
      radius: number;
    };
    // Alpha-respecting border (follows transparent contours)
    alphaBorder?: {
      enabled: boolean;
      size: number;
      color: string;
    };
    shadow?: {
      blur: number;
      color: string;
      offsetX: number;
      offsetY: number;
    };
  };
}

/**
 * Shape element properties
 */
export interface ShapeElement extends BaseElement {
  type: 'shape';
  properties: {
    shapeType: ShapeType;
    fill: string;
    stroke?: {
      color: string;
      width: number;
      dashArray?: number[];
    };
    gradient?: {
      type: 'linear' | 'radial';
      colors: string[];
      stops: number[];
    };
    shadow?: {
      blur: number;
      color: string;
      offsetX: number;
      offsetY: number;
    };
  };
}

/**
 * Icon element properties
 */
export interface IconElement extends BaseElement {
  type: 'icon';
  properties: {
    iconName: string;
    iconSet: 'heroicons' | 'lucide' | 'custom';
    color: string;
    strokeWidth?: number;
    shadow?: {
      blur: number;
      color: string;
      offsetX: number;
      offsetY: number;
    };
  };
}

/**
 * Frame element properties - Container with clip-path for image masking
 */
export interface FrameElement extends BaseElement {
  type: 'frame';
  properties: {
    clipPath: string; // SVG clip-path or CSS clip-path value
    borderStyle?: {
      width: number;
      color: string;
      offset: number;
    };
    fill: string; // Background color when no image
    image?: {
      src: string;
      fit: 'cover' | 'contain' | 'fill';
      offsetX: number; // For repositioning image within frame
      offsetY: number;
      scale: number; // For zooming image within frame
      pivotX: number; // Center pivot point relative to frame (0-1 normalized)
      pivotY: number; // Center pivot point relative to frame (0-1 normalized)
      rotation?: number; // Image rotation within frame (degrees)
    };
    editMode?: boolean; // Double-click to enable image repositioning
  };
}

/**
 * Video element properties - Supports YouTube and direct video URLs
 */
export interface VideoElement extends BaseElement {
  type: 'video';
  properties: {
    src: string; // YouTube URL or direct video URL
    videoType: 'youtube' | 'direct'; // Source type
    autoPlay: boolean;
    loop: boolean;
    muted: boolean;
    controls: boolean;
    thumbnail?: string; // Custom thumbnail image URL
    border?: {
      width: number;
      color: string;
      radius: number;
    };
    shadow?: {
      blur: number;
      color: string;
      offsetX: number;
      offsetY: number;
    };
  };
}

/**
 * Bullet element for decorative bullets (graphics-based)
 */
export interface BulletElement extends BaseElement {
  type: 'bullet';
  properties: {
    bulletId?: string;           // ID from bullet library (for individual bullets)
    bulletSetId?: string;        // ID from bullet sets library
    bulletName?: string;         // Bullet name for reference
    color?: string;              // Color for individual bullets
    number?: number;             // Number for individual bullets
    text?: string;               // Text content for bullets that support text
    icon?: string;               // Icon identifier for bullets that support icons
    colorScheme?: string[];      // Color scheme for bullet sets
    itemCount?: number;          // Number of items in the set (for bullet sets)
    imageUrl?: string;           // Legacy: URL or base64 data URL of bullet graphic
    svgDataUrl?: string;         // SVG data URL for rendering
    shadow?: {
      blur: number;
      color: string;
      offsetX: number;
      offsetY: number;
    };
  };
}

/**
 * Union type of all element types
 */
export type Element = TextElement | ImageElement | ShapeElement | IconElement | ChartElement | FormElement | FrameElement | VideoElement | BulletElement;
