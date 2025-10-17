// ============================================================================
// Individual Bullets Session
// Browse and use single bullet elements
// ============================================================================

'use client';

import { useState } from 'react';
import { Circle, Hexagon, Diamond, Pill, Search, Sparkles, ChevronDown } from 'lucide-react';
import { ColorDropdown } from '../ColorDropdown';
import { useDraggable } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { INDIVIDUAL_BULLETS_LIBRARY } from '@/data/individualBulletsLibrary';
import type { IndividualBullet, BulletCategory, ColorScaleName } from '@/types/bulletSystemV2';
import { COLOR_SCALES } from '@/types/bulletSystemV2';
import type { Element } from '@/types/builder';
import { COLOR_SCHEMAS } from './ColorsSessionEnhanced';

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
  number?: number;
  text?: string;
}

function DraggableBullet({ bullet, color, number, text }: DraggableBulletProps) {
  const { addElement, currentCanvasSize } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bullet-${bullet.id}-${Date.now()}`,
    data: {
      type: 'individual-bullet',
      bulletId: bullet.id,
      color,
      number,
      text,
    },
  });

  const svgContent = bullet.generateSVG({
    width: bullet.defaultWidth,
    height: bullet.defaultHeight,
    color,
    number,
    text,
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
        text: text,
        svgDataUrl: svgDataUrl,
      },
    } as Element;

    addElement(newElement);
  };

  return (
    <div
      ref={setNodeRef}
      onClick={handleClick}
      className={`
        relative group cursor-pointer
        bg-white rounded-lg border-2 border-gray-200
        hover:border-violet-400 hover:shadow-lg
        transition-all duration-200
        p-3
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'}
      `}
    >
      {/* Drag handle (top-left corner) */}
      <div
        {...listeners}
        {...attributes}
        className="absolute top-1 left-1 p-1.5 bg-violet-100 hover:bg-violet-200 rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10"
        style={{ touchAction: 'none' }}
        title="Arrastar"
      >
        <svg className="w-3 h-3 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </div>

      {/* Preview */}
      <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={svgDataUrl}
          alt={bullet.name}
          className="max-w-full max-h-full object-contain pointer-events-none"
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
  const [currentText, setCurrentText] = useState('Note');
  const [selectedColorSchema, setSelectedColorSchema] = useState<string>('all');

  // Filter bullets
  const filteredBullets = INDIVIDUAL_BULLETS_LIBRARY.filter((bullet) => {
    const matchesCategory = selectedCategory === 'all' || bullet.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      bullet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bullet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Check if any filtered bullet uses text (like Post-its)
  const usesText = filteredBullets.some(b => b.customizable?.text && !b.customizable?.number);

  return (
    <div className="flex flex-col h-full">
      <style jsx global>{`
        /* Option 2: Add visible white border/outline on hover (shows over blue) */
        select[style*="backgroundImage"] option,
        select[style*="backgroundColor"] option {
          background: inherit !important;
          padding: 8px !important;
        }

        /* Strong visual indicator on hover - white border shows over blue */
        select[style*="backgroundImage"] option:hover,
        select[style*="backgroundColor"] option:hover {
          outline: 3px solid white !important;
          outline-offset: -3px !important;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.2) !important;
          cursor: pointer !important;
        }

        select[style*="backgroundImage"] option:focus,
        select[style*="backgroundImage"] option:active,
        select[style*="backgroundColor"] option:focus,
        select[style*="backgroundColor"] option:active {
          background: inherit !important;
          outline: 2px solid rgba(255, 255, 255, 0.8) !important;
          outline-offset: -2px !important;
        }

        select[style*="backgroundImage"] option:checked,
        select[style*="backgroundColor"] option:checked {
          background: inherit !important;
          font-weight: bold !important;
          border-left: 4px solid #10b981 !important;
        }
      `}</style>
      {/* Compact Header */}
      <div className="px-2 py-1.5 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-800">Bullets Individuais</h3>
      </div>

      {/* Compact Controls */}
      <div className="p-2 border-b border-gray-200 space-y-1.5">
        {/* Search + Number/Text input */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex-[3]">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* Conditional: Text input for Post-its, Number selector for bullets */}
          {usesText ? (
            <div className="flex-1">
              <input
                type="text"
                placeholder="Texto..."
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-500"
                maxLength={30}
              />
            </div>
          ) : (
            <div className="flex items-center gap-1 flex-1">
              <button
                onClick={() => setCurrentNumber(Math.max(1, currentNumber - 1))}
                className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
              >
                −
              </button>
              <input
                type="number"
                value={currentNumber}
                onChange={(e) => setCurrentNumber(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-10 px-1 py-1 text-center border border-gray-300 rounded text-xs"
                min="1"
                max="99"
              />
              <button
                onClick={() => setCurrentNumber(Math.min(99, currentNumber + 1))}
                className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as BulletCategory | 'all')}
            className="w-full px-2 py-1.5 pr-6 text-xs border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer"
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        {/* Color Schema + Color in one row */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="relative">
            <select
              value={selectedColorSchema}
              onChange={(e) => {
                setSelectedColorSchema(e.target.value);
                // Reset to first valid color of selected schema
                const schema = COLOR_SCHEMAS.find(s => s.id === e.target.value);
                if (schema && schema.colors.length > 0) {
                  const validColors = schema.colors.filter(c => COLOR_SCALES[c]);
                  if (validColors.length > 0) {
                    setSelectedColor(validColors[0]);
                  }
                }
              }}
              className="w-full px-2 py-1.5 pr-6 text-xs border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer"
            >
              {COLOR_SCHEMAS.map((schema) => (
                <option key={schema.id} value={schema.id}>
                  {schema.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          <ColorDropdown
            value={selectedColor}
            onChange={setSelectedColor}
            colors={(() => {
              const schema = COLOR_SCHEMAS.find(s => s.id === selectedColorSchema);
              const availableColors = schema ? schema.colors : Object.keys(COLOR_SCALES) as ColorScaleName[];
              return availableColors.filter(colorKey => COLOR_SCALES[colorKey]);
            })()}
          />
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
                number={bullet.customizable?.number ? currentNumber : undefined}
                text={bullet.customizable?.text ? currentText : undefined}
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
