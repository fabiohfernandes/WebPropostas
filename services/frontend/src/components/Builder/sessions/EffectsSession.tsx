// ============================================================================
// Effects Session - Image Effects Library
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useState } from 'react';
import {
  Sparkles,
  Droplet,
  Zap,
  Sun,
  Moon,
  Film,
  Palette,
  Wind,
  Wand2,
  Image as ImageIcon,
  Circle,
  Layers,
} from 'lucide-react';

interface Effect {
  id: string;
  name: string;
  category: 'glow' | 'glass' | 'light' | 'animation' | 'artistic' | 'texture';
  icon: React.ReactNode;
  description: string;
  gradient: string;
  preview: string;
  isPremium?: boolean;
}

const effects: Effect[] = [
  // Glow Effects
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'glow',
    icon: <Zap className="w-5 h-5" />,
    description: 'Efeito de brilho neon vibrante',
    gradient: 'from-cyan-400 to-blue-600',
    preview: 'shadow-[0_0_30px_rgba(34,211,238,0.8)]',
  },
  {
    id: 'soft-glow',
    name: 'Soft Glow',
    category: 'glow',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Brilho suave e difuso',
    gradient: 'from-yellow-300 to-orange-400',
    preview: 'shadow-[0_0_20px_rgba(251,191,36,0.6)]',
  },
  {
    id: 'rainbow-glow',
    name: 'Rainbow Glow',
    category: 'glow',
    icon: <Palette className="w-5 h-5" />,
    description: 'Brilho multicolorido',
    gradient: 'from-pink-400 via-purple-400 to-indigo-400',
    preview: 'shadow-[0_0_25px_rgba(168,85,247,0.7)]',
    isPremium: true,
  },

  // Glass/Frosted Effects
  {
    id: 'frosted-glass',
    name: 'Vidro Fosco',
    category: 'glass',
    icon: <Droplet className="w-5 h-5" />,
    description: 'Efeito de vidro fosco translúcido',
    gradient: 'from-blue-200 to-blue-300',
    preview: 'backdrop-blur-md bg-white/30',
  },
  {
    id: 'glass-morphism',
    name: 'Glassmorphism',
    category: 'glass',
    icon: <Circle className="w-5 h-5" />,
    description: 'Efeito de vidro moderno com blur',
    gradient: 'from-purple-200 to-pink-200',
    preview: 'backdrop-blur-xl bg-white/20',
  },
  {
    id: 'crystal-glass',
    name: 'Cristal',
    category: 'glass',
    icon: <Layers className="w-5 h-5" />,
    description: 'Efeito de cristal brilhante',
    gradient: 'from-cyan-200 to-blue-200',
    preview: 'backdrop-blur-sm bg-gradient-to-br from-white/40 to-blue-100/30',
    isPremium: true,
  },

  // Light Effects
  {
    id: 'spotlight',
    name: 'Spotlight',
    category: 'light',
    icon: <Sun className="w-5 h-5" />,
    description: 'Iluminação focal dramática',
    gradient: 'from-yellow-400 to-orange-500',
    preview: 'brightness-125 contrast-110',
  },
  {
    id: 'moonlight',
    name: 'Luz Lunar',
    category: 'light',
    icon: <Moon className="w-5 h-5" />,
    description: 'Iluminação suave azulada',
    gradient: 'from-blue-300 to-indigo-400',
    preview: 'brightness-90 contrast-95 hue-rotate-15',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    category: 'light',
    icon: <Sun className="w-5 h-5" />,
    description: 'Luz dourada do pôr do sol',
    gradient: 'from-amber-400 to-orange-500',
    preview: 'brightness-105 saturate-110 hue-rotate-[-10deg]',
    isPremium: true,
  },

  // Animation Effects
  {
    id: 'pulse',
    name: 'Pulse',
    category: 'animation',
    icon: <Zap className="w-5 h-5" />,
    description: 'Animação de pulsação',
    gradient: 'from-purple-400 to-purple-600',
    preview: 'animate-pulse',
  },
  {
    id: 'float',
    name: 'Flutuação',
    category: 'animation',
    icon: <Wind className="w-5 h-5" />,
    description: 'Efeito de flutuação suave',
    gradient: 'from-teal-400 to-cyan-500',
    preview: 'animate-bounce',
  },

  // Artistic Effects
  {
    id: 'cartoon',
    name: 'Cartoon',
    category: 'artistic',
    icon: <Film className="w-5 h-5" />,
    description: 'Efeito de desenho animado',
    gradient: 'from-pink-400 to-rose-500',
    preview: 'saturate-150 contrast-125',
    isPremium: true,
  },
  {
    id: 'oil-painting',
    name: 'Pintura a Óleo',
    category: 'artistic',
    icon: <Palette className="w-5 h-5" />,
    description: 'Efeito de pintura a óleo',
    gradient: 'from-amber-500 to-orange-600',
    preview: 'blur-[0.5px] saturate-125',
    isPremium: true,
  },
  {
    id: 'watercolor',
    name: 'Aquarela',
    category: 'artistic',
    icon: <Droplet className="w-5 h-5" />,
    description: 'Efeito de aquarela suave',
    gradient: 'from-blue-400 to-purple-500',
    preview: 'blur-[0.3px] saturate-90 opacity-90',
    isPremium: true,
  },

  // Texture Effects
  {
    id: 'paper-texture',
    name: 'Textura de Papel',
    category: 'texture',
    icon: <ImageIcon className="w-5 h-5" />,
    description: 'Textura de papel vintage',
    gradient: 'from-amber-100 to-amber-200',
    preview: 'grayscale-[10%] sepia-[20%]',
  },
  {
    id: 'grain',
    name: 'Grão de Filme',
    category: 'texture',
    icon: <Film className="w-5 h-5" />,
    description: 'Textura granulada de filme',
    gradient: 'from-gray-400 to-gray-600',
    preview: 'contrast-110 brightness-95',
  },
  {
    id: 'vignette',
    name: 'Vinheta',
    category: 'texture',
    icon: <Circle className="w-5 h-5" />,
    description: 'Escurecimento nas bordas',
    gradient: 'from-gray-700 to-gray-900',
    preview: 'brightness-90',
  },
];

const categories = [
  { id: 'all', name: 'Todos', icon: <Wand2 className="w-4 h-4" /> },
  { id: 'glow', name: 'Brilho', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'glass', name: 'Vidro', icon: <Droplet className="w-4 h-4" /> },
  { id: 'light', name: 'Luz', icon: <Sun className="w-4 h-4" /> },
  { id: 'animation', name: 'Animação', icon: <Zap className="w-4 h-4" /> },
  { id: 'artistic', name: 'Artístico', icon: <Palette className="w-4 h-4" /> },
  { id: 'texture', name: 'Textura', icon: <ImageIcon className="w-4 h-4" /> },
];

export function EffectsSession() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);

  const filteredEffects = effects.filter((effect) => {
    const matchesCategory = selectedCategory === 'all' || effect.category === selectedCategory;
    const matchesSearch =
      effect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      effect.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Efeitos</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Adicione efeitos visuais às suas imagens
        </p>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 p-3 border-b border-gray-200">
        <input
          type="text"
          placeholder="Buscar efeitos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Category Pills */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-1.5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all
                ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Effects Grid - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredEffects.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredEffects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setSelectedEffect(effect.id)}
                className={`
                  group relative p-3 rounded-xl border-2 transition-all duration-200
                  ${
                    selectedEffect === effect.id
                      ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-102'
                  }
                `}
              >
                {/* Premium Badge */}
                {effect.isPremium && (
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold rounded shadow">
                    PRO
                  </div>
                )}

                {/* Preview Box */}
                <div
                  className={`w-full h-16 rounded-lg mb-2 bg-gradient-to-br ${effect.gradient} ${effect.preview}`}
                />

                {/* Icon & Name */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-gray-600">{effect.icon}</div>
                  <p className="text-xs font-semibold text-gray-800 text-left flex-1">
                    {effect.name}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[10px] text-gray-500 text-left line-clamp-2">
                  {effect.description}
                </p>

                {/* Active Indicator */}
                {selectedEffect === effect.id && (
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Wand2 className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">Nenhum efeito encontrado</p>
            <p className="text-xs text-gray-400 mt-1">Tente ajustar a busca</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
        {selectedEffect ? (
          <div>
            <p className="text-xs text-gray-600 mb-2 text-center">
              Efeito: <strong>{effects.find((e) => e.id === selectedEffect)?.name}</strong>
            </p>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
              Aplicar Efeito
            </button>
          </div>
        ) : (
          <p className="text-xs text-gray-500 text-center">
            Selecione uma imagem e escolha um efeito para aplicar
          </p>
        )}
      </div>
    </div>
  );
}
