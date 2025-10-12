// ============================================================================
// Individual Bullets Session
// Browse and use single bullet elements
// ============================================================================

'use client';

import { useState } from 'react';
import { Circle, Hexagon, Diamond, Pill, Search, Sparkles, ChevronDown } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { INDIVIDUAL_BULLETS_LIBRARY } from '@/data/individualBulletsLibrary';
import type { IndividualBullet, BulletCategory, ColorScaleName } from '@/types/bulletSystemV2';
import { COLOR_SCALES } from '@/types/bulletSystemV2';
import type { Element } from '@/types/builder';

const CATEGORIES: { id: BulletCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Todos', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'basic-shapes', label: 'Formas', icon: <Circle className="w-4 h-4" /> },
  { id: 'process-steps', label: 'Processos', icon: <Pill className="w-4 h-4" /> },
  { id: 'icons', label: 'Ícones', icon: <Hexagon className="w-4 h-4" /> },
  { id: 'decorative', label: 'Decorativo', icon: <Diamond className="w-4 h-4" /> },
];

interface DraggableBulletProps {
  bullet: IndividualBullet;
  color: ColorScaleName;
  number: number;
}

function DraggableBullet({ bullet, color, number }: DraggableBulletProps) {
  const { addElement, currentCanvasSize } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bullet-${bullet.id}-${Date.now()}`,
    data: {
      type: 'individual-bullet',
      bulletId: bullet.id,
      color,
      number,
    },
  });

  const svgContent = bullet.generateSVG({
    width: bullet.defaultWidth,
    height: bullet.defaultHeight,
    color,
    number,
  });

  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

  // Handle click to insert
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvasSize = currentCanvasSize();

    const newElement: Element = {
      id: `bullet-${Date.now()}`,
      type: 'bullet',
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      width: bullet.defaultWidth,
      height: bullet.defaultHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        bulletId: bullet.id,
        bulletName: bullet.name,
        color: color,
        number: number,
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
        hover:border-violet-400 hover:shadow-lg
        transition-all duration-200
        p-3
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'}
      `}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Preview */}
      <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={svgDataUrl}
          alt={bullet.name}
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Info */}
      <div className="mt-2">
        <p className="text-xs font-semibold text-gray-800 truncate">{bullet.name}</p>
        <p className="text-xs text-gray-500 truncate">{bullet.description}</p>
      </div>

      {/* Premium badge */}
      {bullet.isPremium && (
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full">
          PRO
        </div>
      )}
    </div>
  );
}

export function IndividualBulletsSession() {
  const [selectedCategory, setSelectedCategory] = useState<BulletCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState<ColorScaleName>('limeGreen');
  const [currentNumber, setCurrentNumber] = useState(1);

  // Filter bullets
  const filteredBullets = INDIVIDUAL_BULLETS_LIBRARY.filter((bullet) => {
    const matchesCategory = selectedCategory === 'all' || bullet.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      bullet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bullet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Circle className="w-4 h-4 text-violet-600" strokeWidth={2.5} />
          Bullets Individuais
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Elementos únicos reutilizáveis</p>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar bullets..."
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
            onChange={(e) => setSelectedCategory(e.target.value as BulletCategory | 'all')}
            className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
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

      {/* Color Picker */}
      <div className="p-3 border-b border-gray-200">
        <label className="text-xs font-semibold text-gray-700 mb-2 block">Cor do Bullet</label>
        <div className="relative">
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value as ColorScaleName)}
            className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(90deg, ${COLOR_SCALES[selectedColor].light} 0%, ${COLOR_SCALES[selectedColor].medium} 50%, ${COLOR_SCALES[selectedColor].dark} 100%)`,
              color: ['navy', 'emerald'].includes(selectedColor) ? 'white' : 'black',
              fontWeight: '600'
            }}
          >
            {(Object.keys(COLOR_SCALES) as ColorScaleName[]).map((colorKey) => (
              <option key={colorKey} value={colorKey}>
                {colorKey === 'limeGreen' ? 'Verde Limão' :
                 colorKey === 'teal' ? 'Verde Água' :
                 colorKey === 'navy' ? 'Azul Marinho' :
                 colorKey === 'lightBlue' ? 'Azul Claro' :
                 colorKey === 'emerald' ? 'Esmeralda' :
                 colorKey === 'orange' ? 'Laranja' :
                 colorKey === 'pink' ? 'Rosa' :
                 colorKey === 'purple' ? 'Roxo' : colorKey}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: ['navy', 'emerald'].includes(selectedColor) ? 'white' : 'rgba(0,0,0,0.4)' }} />
        </div>
      </div>

      {/* Number selector */}
      <div className="p-3 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2">Número</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentNumber(Math.max(1, currentNumber - 1))}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
          >
            −
          </button>
          <input
            type="number"
            value={currentNumber}
            onChange={(e) => setCurrentNumber(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg text-sm"
            min="1"
            max="99"
          />
          <button
            onClick={() => setCurrentNumber(Math.min(99, currentNumber + 1))}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
          >
            +
          </button>
        </div>
      </div>

      {/* Bullets grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredBullets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Circle className="w-12 h-12 text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600">Nenhum bullet encontrado</p>
            <p className="text-xs text-gray-500 mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredBullets.map((bullet) => (
              <DraggableBullet
                key={bullet.id}
                bullet={bullet}
                color={selectedColor}
                number={currentNumber}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">{filteredBullets.length}</span> bullets disponíveis
        </p>
      </div>
    </div>
  );
}
