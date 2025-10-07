// ============================================================================
// Template Builder - TypeScript Type Definitions
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

/**
 * Element Types supported in the builder
 */
export type ElementType = 'text' | 'image' | 'shape' | 'icon' | 'chart';

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
 * Frame/Border style presets for images
 */
export type FrameStyle = 'none' | 'simple' | 'classic' | 'modern' | 'vintage' | 'polaroid' | 'double' | 'ornate';

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
    // Frame/Moldura configuration
    frame?: {
      style: FrameStyle;
      width: number;
      color: string;
      innerColor?: string; // For double frames
      shadowEnabled?: boolean;
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
  };
}

/**
 * Chart element properties
 */
export interface ChartElement extends BaseElement {
  type: 'chart';
  properties: {
    chartType: 'bar' | 'line' | 'pie' | 'area';
    data: any; // Will be strongly typed in Phase 31
    colorScheme: string[];
    legend: {
      visible: boolean;
      position: 'top' | 'bottom' | 'left' | 'right';
    };
  };
}

/**
 * Union type for all element types
 */
export type Element = TextElement | ImageElement | ShapeElement | IconElement | ChartElement;

/**
 * Canvas size configuration
 */
export interface CanvasSize {
  width: number;
  height: number;
  preset: 'A4-portrait' | 'A4-landscape' | 'Letter' | '16:9' | '4:3' | 'custom';
  orientation?: 'portrait' | 'landscape';
}

/**
 * Page in multi-page document
 */
export interface Page {
  id: string;
  name: string;
  elements: Element[];
  background: string;
  canvasSize: CanvasSize;
  createdAt: number;
}

/**
 * Element category for the Elements Panel
 */
export interface ElementCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  elements: ElementDefinition[];
}

/**
 * Element definition for drag sources
 */
export interface ElementDefinition {
  id: string;
  type: ElementType;
  label: string;
  icon: React.ReactNode;
  defaultProps: Partial<Element>;
  tier?: 'freemium' | 'standard' | 'professional';
}

/**
 * Builder history state for undo/redo
 */
export interface HistoryState {
  elements: Element[];
  timestamp: number;
}

/**
 * Builder state interface (for Zustand store)
 */
export interface BuilderState {
  // Pages (multi-page support)
  pages: Page[];
  currentPageId: string;

  // Selected element
  selectedElementId: string | null;

  // Canvas
  zoom: number;
  gridVisible: boolean;
  snapToGrid: boolean;

  // History (undo/redo)
  history: HistoryState[];
  historyIndex: number;

  // UI State
  elementsPanel: {
    searchQuery: string;
    selectedCategory: string | null;
  };

  // Actions - Pages
  addPage: () => void;
  deletePage: (pageId: string) => void;
  setCurrentPage: (pageId: string) => void;
  duplicatePage: (pageId: string) => void;
  reorderPages: (startIndex: number, endIndex: number) => void;

  // Actions - Elements
  addElement: (element: Element) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  selectElement: (id: string | null) => void;

  // Actions - Canvas
  setCanvasSize: (size: CanvasSize) => void;
  toggleOrientation: () => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;

  // Actions - History
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;

  // Actions - UI
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;

  // Actions - Utility
  clearCanvas: () => void;
  loadTemplate: (pages: Page[]) => void;

  // Computed getters
  currentPage: () => Page | undefined;
  currentElements: () => Element[];
  currentCanvasSize: () => CanvasSize;
}

/**
 * Drag and drop data transfer
 */
export interface DragData {
  elementType: ElementType;
  defaultProps: Partial<Element>;
}

/**
 * Export options
 */
export interface ExportOptions {
  format: 'pdf' | 'png' | 'json' | 'html';
  quality?: number; // For images
  scale?: number; // For images
  includeBackground?: boolean;
}

/**
 * Template metadata
 */
export interface TemplateMetadata {
  id: string;
  name: string;
  category: string;
  sector: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

/**
 * Complete template structure
 */
export interface Template {
  metadata: TemplateMetadata;
  canvasSize: CanvasSize;
  elements: Element[];
}
