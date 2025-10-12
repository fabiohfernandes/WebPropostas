// ============================================================================
// Bullet Graphics Type Definitions
// Graphics-based bullet system for presentations and charts
// ============================================================================

export type BulletCategory =
  | 'presentation'    // General presentation bullets (arrows, dots, stars)
  | 'charts'          // Chart and infographic bullets (numbered, data viz)
  | '3d'              // 3D styled bullets
  | 'ribbons'         // Ribbon and banner bullets
  | 'arrows'          // Directional arrows
  | 'badges'          // Badges and labels
  | 'modern'          // Modern flat design
  | 'gradient'        // Gradient styled
  | 'outlined'        // Outline style
  | 'filled'          // Solid fill style
  | 'custom';         // User uploaded

export interface BulletGraphic {
  id: string;
  name: string;
  category: BulletCategory;
  imageUrl: string;           // URL or base64 data URL
  thumbnailUrl?: string;       // Optional smaller preview
  tags: string[];              // Searchable tags
  isPremium: boolean;          // Free vs premium
  isActive: boolean;           // Admin can enable/disable
  uploadedBy?: string;         // User ID if custom upload
  createdAt: Date;
  updatedAt: Date;
  usageCount?: number;         // Track popularity
  // Visual properties
  defaultWidth: number;        // Suggested width
  defaultHeight: number;       // Suggested height
  aspectRatio: number;         // width/height
  // Metadata
  fileSize?: number;           // In bytes
  fileFormat?: 'png' | 'svg' | 'jpg' | 'webp';
  colorScheme?: string[];      // Dominant colors
}

export interface BulletLibrary {
  bullets: BulletGraphic[];
  categories: {
    id: BulletCategory;
    name: string;
    icon: string;
    description: string;
    count: number;
  }[];
}

// Preset bullet packs (will be replaced with database entries)
export const BULLET_CATEGORIES = [
  {
    id: 'presentation' as BulletCategory,
    name: 'Apresentação',
    icon: '📊',
    description: 'Bullets decorativos para slides e apresentações',
  },
  {
    id: 'charts' as BulletCategory,
    name: 'Gráficos',
    icon: '📈',
    description: 'Elementos para infográficos e visualização de dados',
  },
  {
    id: '3d' as BulletCategory,
    name: '3D',
    icon: '🎯',
    description: 'Bullets com efeito tridimensional',
  },
  {
    id: 'ribbons' as BulletCategory,
    name: 'Fitas',
    icon: '🎀',
    description: 'Fitas, banners e marcadores',
  },
  {
    id: 'arrows' as BulletCategory,
    name: 'Setas',
    icon: '➡️',
    description: 'Setas direcionais e ponteiros',
  },
  {
    id: 'badges' as BulletCategory,
    name: 'Badges',
    icon: '🏷️',
    description: 'Badges, etiquetas e selos',
  },
  {
    id: 'modern' as BulletCategory,
    name: 'Moderno',
    icon: '✨',
    description: 'Design flat e minimalista',
  },
  {
    id: 'gradient' as BulletCategory,
    name: 'Gradiente',
    icon: '🌈',
    description: 'Bullets com gradientes coloridos',
  },
  {
    id: 'outlined' as BulletCategory,
    name: 'Contorno',
    icon: '⭕',
    description: 'Estilo outline/contornado',
  },
  {
    id: 'filled' as BulletCategory,
    name: 'Preenchido',
    icon: '⚫',
    description: 'Estilo sólido preenchido',
  },
  {
    id: 'custom' as BulletCategory,
    name: 'Personalizado',
    icon: '🎨',
    description: 'Uploads personalizados do usuário',
  },
];

// Sample starter bullets (admin will add more via upload)
export const STARTER_BULLETS: Omit<BulletGraphic, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // These will be replaced with actual uploaded graphics
  // Just placeholders for initial empty state
];
