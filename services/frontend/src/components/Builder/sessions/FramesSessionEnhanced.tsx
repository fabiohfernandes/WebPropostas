// ============================================================================
// Template Builder - Enhanced Frames Session
// Image framing system with various frame styles
// ============================================================================

'use client';

import { useState } from 'react';
import {
  Frame,
  Square,
  Circle,
  Hexagon,
  Heart,
  Star,
  Sparkles,
  Image as ImageIcon,
  Search,
} from 'lucide-react';
import { useBuilderStore } from '@/store/builder';

interface FrameDefinition {
  id: string;
  category: 'basic' | 'rounded' | 'decorative' | 'artistic';
  label: string;
  icon: React.ReactNode;
  tags: string[];
  clipPath: string; // SVG clip-path or CSS clip-path
  borderStyle?: {
    width: number;
    color: string;
    offset: number; // Distance from edge
  };
  preview: string; // Visual representation
}

export function FramesSessionEnhanced() {
  const { addElement, currentPage } = useBuilderStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'basic' | 'rounded' | 'decorative' | 'artistic'>('all');

  const frameLibrary: FrameDefinition[] = [
    // BASIC FRAMES
    {
      id: 'frame-square',
      category: 'basic',
      label: 'Quadrado',
      icon: <Square className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['quadrado', 'básico', 'simples'],
      clipPath: 'inset(0% 0% 0% 0%)',
      preview: '⬜',
    },
    {
      id: 'frame-rectangle-h',
      category: 'basic',
      label: 'Retângulo H',
      icon: <Square className="w-5 h-3" strokeWidth={2.5} />,
      tags: ['retângulo', 'horizontal', 'básico'],
      clipPath: 'inset(0% 0% 0% 0%)',
      preview: '▬',
    },
    {
      id: 'frame-rectangle-v',
      category: 'basic',
      label: 'Retângulo V',
      icon: <Square className="w-3 h-5" strokeWidth={2.5} />,
      tags: ['retângulo', 'vertical', 'básico'],
      clipPath: 'inset(0% 0% 0% 0%)',
      preview: '▮',
    },

    // ROUNDED FRAMES
    {
      id: 'frame-rounded-sm',
      category: 'rounded',
      label: 'Arredondado Pequeno',
      icon: <Square className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['arredondado', 'suave', 'cantos'],
      clipPath: 'inset(0% 0% 0% 0% round 8px)',
      preview: '▢',
    },
    {
      id: 'frame-rounded-md',
      category: 'rounded',
      label: 'Arredondado Médio',
      icon: <Square className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['arredondado', 'médio', 'cantos'],
      clipPath: 'inset(0% 0% 0% 0% round 16px)',
      preview: '▢',
    },
    {
      id: 'frame-rounded-lg',
      category: 'rounded',
      label: 'Arredondado Grande',
      icon: <Square className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['arredondado', 'grande', 'cantos'],
      clipPath: 'inset(0% 0% 0% 0% round 32px)',
      preview: '▢',
    },
    {
      id: 'frame-pill',
      category: 'rounded',
      label: 'Pílula',
      icon: <Square className="w-5 h-3" strokeWidth={2.5} />,
      tags: ['pílula', 'cápsula', 'horizontal'],
      clipPath: 'inset(0% 0% 0% 0% round 999px)',
      preview: '⬭',
    },
    {
      id: 'frame-circle',
      category: 'rounded',
      label: 'Círculo',
      icon: <Circle className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['círculo', 'redondo', 'perfil'],
      clipPath: 'circle(50% at 50% 50%)',
      preview: '●',
    },

    // DECORATIVE FRAMES
    {
      id: 'frame-star',
      category: 'decorative',
      label: 'Estrela',
      icon: <Star className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['estrela', 'destaque', 'decorativo'],
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      preview: '★',
    },
    {
      id: 'frame-heart',
      category: 'decorative',
      label: 'Coração',
      icon: <Heart className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['coração', 'amor', 'decorativo'],
      clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
      preview: '♥',
    },
    {
      id: 'frame-hexagon',
      category: 'decorative',
      label: 'Hexágono',
      icon: <Hexagon className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['hexágono', 'geométrico', 'moderno'],
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      preview: '⬡',
    },
    {
      id: 'frame-octagon',
      category: 'decorative',
      label: 'Octógono',
      icon: <Hexagon className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['octógono', 'geométrico', 'parada'],
      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      preview: '⯃',
    },

    // ARTISTIC FRAMES
    {
      id: 'frame-polaroid',
      category: 'artistic',
      label: 'Polaroid',
      icon: <ImageIcon className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['polaroid', 'foto', 'vintage'],
      clipPath: 'inset(5% 5% 20% 5%)', // Top/sides margin, larger bottom
      borderStyle: {
        width: 16,
        color: '#FFFFFF',
        offset: 0,
      },
      preview: '📷',
    },
    {
      id: 'frame-torn-edge',
      category: 'artistic',
      label: 'Borda Rasgada',
      icon: <Sparkles className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['rasgado', 'vintage', 'papel'],
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 95% 100%, 85% 98%, 75% 100%, 65% 97%, 55% 100%, 45% 98%, 35% 100%, 25% 97%, 15% 100%, 5% 98%, 0% 95%)',
      preview: '📄',
    },
    {
      id: 'frame-stamp',
      category: 'artistic',
      label: 'Selo',
      icon: <Square className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['selo', 'postal', 'vintage'],
      clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 10%, 95% 10%, 100% 15%, 100% 20%, 95% 20%, 100% 25%, 100% 30%, 95% 30%, 100% 35%, 100% 40%, 95% 40%, 100% 45%, 100% 50%, 95% 50%, 100% 55%, 100% 60%, 95% 60%, 100% 65%, 100% 70%, 95% 70%, 100% 75%, 100% 80%, 95% 80%, 100% 85%, 100% 90%, 95% 90%, 100% 95%, 95% 100%, 0 100%, 5% 95%, 0 90%, 0 85%, 5% 85%, 0 80%, 0 75%, 5% 75%, 0 70%, 0 65%, 5% 65%, 0 60%, 0 55%, 5% 55%, 0 50%, 0 45%, 5% 45%, 0 40%, 0 35%, 5% 35%, 0 30%, 0 25%, 5% 25%, 0 20%, 0 15%, 5% 15%, 0 10%, 0 5%, 5% 5%)',
      preview: '✉',
    },
    {
      id: 'frame-diamond',
      category: 'artistic',
      label: 'Diamante',
      icon: <Sparkles className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['diamante', 'losango', 'geométrico'],
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      preview: '◆',
    },
    {
      id: 'frame-arrow-right',
      category: 'artistic',
      label: 'Seta Direita',
      icon: <Square className="w-4 h-4" strokeWidth={2.5} />,
      tags: ['seta', 'direção', 'apontar'],
      clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)',
      preview: '▶',
    },
  ];

  const categories = [
    { id: 'all' as const, label: 'Todas', count: frameLibrary.length, color: 'gray' },
    { id: 'basic' as const, label: 'Básicas', count: frameLibrary.filter(f => f.category === 'basic').length, color: 'blue' },
    { id: 'rounded' as const, label: 'Arredondadas', count: frameLibrary.filter(f => f.category === 'rounded').length, color: 'green' },
    { id: 'decorative' as const, label: 'Decorativas', count: frameLibrary.filter(f => f.category === 'decorative').length, color: 'purple' },
    { id: 'artistic' as const, label: 'Artísticas', count: frameLibrary.filter(f => f.category === 'artistic').length, color: 'pink' },
  ];

  const filteredFrames = frameLibrary.filter(frame => {
    const matchesSearch = searchQuery === '' ||
      frame.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frame.tags.some(tag => tag.includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'all' || frame.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleInsertFrame = (frame: FrameDefinition) => {
    const page = currentPage();
    if (!page) return;

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    // Insert proper Frame element
    addElement({
      id: `frame-${Date.now()}`,
      type: 'frame',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: 300,
      height: 300,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        clipPath: frame.clipPath,
        fill: '#E5E7EB',
        borderStyle: frame.borderStyle,
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Frame className="w-4 h-4 text-purple-600" strokeWidth={2.5} />
          Molduras
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Enquadre suas imagens com estilo</p>
      </div>

      {/* Search + Category Filter (50/50) */}
      <div className="p-3 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          {/* Category Dropdown */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value as typeof activeCategory)}
            className="px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Buscar molduras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Frames Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredFrames.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Search className="w-6 h-6 text-gray-400" strokeWidth={2} />
            </div>
            <p className="text-xs text-gray-500">Nenhuma moldura encontrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredFrames.map(frame => (
              <button
                key={frame.id}
                onClick={() => handleInsertFrame(frame)}
                className="group p-3 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex flex-col items-center gap-2"
              >
                {/* Preview */}
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {frame.preview}
                </div>

                {/* Label */}
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-800 group-hover:text-purple-700">
                    {frame.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-gray-200 bg-purple-50">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <p className="text-xs text-purple-800">
            <strong>Dica:</strong> Clique em uma moldura para inserir no canvas. Use a moldura como guia para recortar imagens.
          </p>
        </div>
      </div>
    </div>
  );
}
