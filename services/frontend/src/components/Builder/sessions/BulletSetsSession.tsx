// ============================================================================
// Bullet Sets Session
// Browse and use pre-composed bullet groups
// ============================================================================

'use client';

import { useState } from 'react';
import { Layers, Search, Sparkles, Workflow, GitCompare, TrendingUp, ChevronDown } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { BULLET_SETS_LIBRARY } from '@/data/bulletSetsLibrary';
import type { BulletSet, ColorScaleName } from '@/types/bulletSystemV2';
import { COLOR_SCALES } from '@/types/bulletSystemV2';
import type { Element } from '@/types/builder';

const CATEGORIES: { id: BulletSet['category'] | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Todos', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'process', label: 'Processos', icon: <Workflow className="w-4 h-4" /> },
  { id: 'flow', label: 'Fluxos', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'comparison', label: 'Comparação', icon: <GitCompare className="w-4 h-4" /> },
  { id: 'data-viz', label: 'Visualização', icon: <Layers className="w-4 h-4" /> },
];

interface DraggableBulletSetProps {
  bulletSet: BulletSet;
  colorScheme: ColorScaleName[];
}

function DraggableBulletSet({ bulletSet, colorScheme }: DraggableBulletSetProps) {
  const { addElement, currentCanvasSize } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bullet-set-${bulletSet.id}-${Date.now()}`,
    data: {
      type: 'bullet-set',
      setId: bulletSet.id,
      colorScheme,
    },
  });

  const svgContent = bulletSet.generateSVG({
    width: bulletSet.width,
    height: bulletSet.height,
    colorScheme,
  });

  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

  // Handle click to insert
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvasSize = currentCanvasSize();

    const newElement: Element = {
      id: `bullet-set-${Date.now()}`,
      type: 'bullet',
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      width: bulletSet.width,
      height: bulletSet.height,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        bulletSetId: bulletSet.id,
        bulletName: bulletSet.name,
        colorScheme: colorScheme,
        svgDataUrl: svgDataUrl,
      },
    } as Element;

    addElement(newElement);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`
        relative group cursor-pointer
        bg-white rounded-lg border-2 border-gray-200
        hover:border-orange-400 hover:shadow-lg
        transition-all duration-200
        p-4
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-102'}
      `}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Preview */}
      <div className="w-full aspect-[2/1] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden mb-3">
        <img
          src={svgDataUrl}
          alt={bulletSet.name}
          className="max-w-full max-h-full object-contain p-2"
          draggable={false}
        />
      </div>

      {/* Info */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-1">{bulletSet.name}</h4>
        <p className="text-xs text-gray-500 mb-2">{bulletSet.description}</p>

        {/* Best used for tags */}
        <div className="flex flex-wrap gap-1">
          {bulletSet.bestUsedFor.slice(0, 2).map((use, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-violet-50 text-violet-700 text-xs rounded-full"
            >
              {use}
            </span>
          ))}
        </div>
      </div>

      {/* Premium badge */}
      {bulletSet.isPremium && (
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full">
          PRO
        </div>
      )}

      {/* Element count badge */}
      <div className="absolute top-3 left-3 px-2 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded-full">
        {bulletSet.elements.length} elementos
      </div>
    </div>
  );
}

export function BulletSetsSession() {
  const [selectedCategory, setSelectedCategory] = useState<BulletSet['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [colorScheme, setColorScheme] = useState<ColorScaleName[]>(['limeGreen', 'teal', 'navy']);

  // Filter bullet sets
  const filteredSets = BULLET_SETS_LIBRARY.filter((bulletSet) => {
    const matchesCategory = selectedCategory === 'all' || bulletSet.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      bulletSet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bulletSet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bulletSet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      bulletSet.bestUsedFor.some((use) => use.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Color scheme presets - EXPANDED
  const colorSchemePresets: { name: string; colors: ColorScaleName[] }[] = [
    { name: 'Clássico', colors: ['limeGreen', 'teal', 'navy'] },
    { name: 'Quente', colors: ['orange', 'pink', 'purple'] },
    { name: 'Frio', colors: ['lightBlue', 'teal', 'navy'] },
    { name: 'Vibrante', colors: ['emerald', 'purple', 'pink'] },
    { name: 'Pastel', colors: ['lightBlue', 'pink', 'purple'] },
    { name: 'Terra', colors: ['orange', 'emerald', 'navy'] },
    { name: 'Oceano', colors: ['lightBlue', 'teal', 'emerald'] },
    { name: 'Pôr do Sol', colors: ['orange', 'pink', 'limeGreen'] },
    { name: 'Floresta', colors: ['emerald', 'limeGreen', 'teal'] },
    { name: 'Ametista', colors: ['purple', 'pink', 'lightBlue'] },
    { name: 'Tropical', colors: ['limeGreen', 'orange', 'pink'] },
    { name: 'Profissional', colors: ['navy', 'teal', 'emerald'] },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Layers className="w-4 h-4 text-violet-600" strokeWidth={2.5} />
          Conjuntos de Bullets
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Grupos pré-compostos prontos para usar</p>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar conjuntos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="p-3 border-b border-gray-200">
        <label className="text-xs font-semibold text-gray-700 mb-2 block">Categoria</label>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as BulletSet['category'] | 'all')}
            className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Color Scheme Dropdown */}
      <div className="p-3 border-b border-gray-200">
        <label className="text-xs font-semibold text-gray-700 mb-2 block">Esquema de Cores</label>
        <div className="relative">
          <select
            value={colorSchemePresets.findIndex(p => JSON.stringify(p.colors) === JSON.stringify(colorScheme))}
            onChange={(e) => setColorScheme(colorSchemePresets[parseInt(e.target.value)].colors)}
            className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {colorSchemePresets.map((preset, idx) => (
              <option key={preset.name} value={idx}>
                {preset.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

          {/* Color preview dots */}
          <div className="flex gap-1 mt-2">
            {colorScheme.map((color, idx) => (
              <div
                key={idx}
                className="flex-1 h-6 rounded-md"
                style={{ backgroundColor: COLOR_SCALES[color].medium }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bullet sets list */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredSets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Layers className="w-12 h-12 text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600">Nenhum conjunto encontrado</p>
            <p className="text-xs text-gray-500 mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSets.map((bulletSet) => (
              <DraggableBulletSet
                key={bulletSet.id}
                bulletSet={bulletSet}
                colorScheme={colorScheme}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">{filteredSets.length}</span> conjuntos disponíveis
        </p>
      </div>
    </div>
  );
}
