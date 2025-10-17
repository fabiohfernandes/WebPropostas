// ============================================================================
// Drawing Session - Freehand Drawing Tools
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useState } from 'react';
import { Pencil, Pen, Paintbrush, Highlighter, Eraser, Palette, Minus } from 'lucide-react';

interface DrawingTool {
  id: 'pencil' | 'pen' | 'marker' | 'brush' | 'eraser' | 'line';
  name: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
  color: string;
}

const drawingTools: DrawingTool[] = [
  {
    id: 'pencil',
    name: 'Lápis',
    icon: <Pencil className="w-6 h-6" />,
    description: 'Traço fino e preciso para esboços',
    gradient: 'from-gray-400 to-gray-600',
    color: '#6B7280',
  },
  {
    id: 'pen',
    name: 'Caneta',
    icon: <Pen className="w-6 h-6" />,
    description: 'Traço uniforme e definido',
    gradient: 'from-blue-500 to-blue-700',
    color: '#3B82F6',
  },
  {
    id: 'marker',
    name: 'Marca-texto',
    icon: <Highlighter className="w-6 h-6" />,
    description: 'Traço largo e semi-transparente',
    gradient: 'from-yellow-400 to-yellow-600',
    color: '#FBBF24',
  },
  {
    id: 'brush',
    name: 'Pincel',
    icon: <Paintbrush className="w-6 h-6" />,
    description: 'Traço artístico com variação',
    gradient: 'from-purple-500 to-purple-700',
    color: '#8B5CF6',
  },
  {
    id: 'line',
    name: 'Linha Reta',
    icon: <Minus className="w-6 h-6" />,
    description: 'Desenha linhas retas perfeitas',
    gradient: 'from-emerald-500 to-emerald-700',
    color: '#10B981',
  },
  {
    id: 'eraser',
    name: 'Borracha',
    icon: <Eraser className="w-6 h-6" />,
    description: 'Apaga desenhos e traços',
    gradient: 'from-rose-400 to-rose-600',
    color: '#FB7185',
  },
];

const brushSizes = [
  { value: 2, label: 'Fino', width: 'w-1' },
  { value: 5, label: 'Médio', width: 'w-1.5' },
  { value: 10, label: 'Grosso', width: 'w-2' },
  { value: 20, label: 'Muito Grosso', width: 'w-3' },
];

const colors = [
  { name: 'Preto', hex: '#000000' },
  { name: 'Branco', hex: '#FFFFFF' },
  { name: 'Vermelho', hex: '#EF4444' },
  { name: 'Azul', hex: '#3B82F6' },
  { name: 'Verde', hex: '#10B981' },
  { name: 'Amarelo', hex: '#F59E0B' },
  { name: 'Roxo', hex: '#8B5CF6' },
  { name: 'Rosa', hex: '#EC4899' },
  { name: 'Laranja', hex: '#F97316' },
  { name: 'Ciano', hex: '#06B6D4' },
  { name: 'Cinza', hex: '#6B7280' },
  { name: 'Marrom', hex: '#92400E' },
];

export function DrawingSession() {
  const [selectedTool, setSelectedTool] = useState<string>('pencil');
  const [brushSize, setBrushSize] = useState(5);
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [opacity, setOpacity] = useState(100);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Ferramentas de Desenho</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Desenhe livremente sobre sua proposta
        </p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Drawing Tools Grid */}
        <div className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Ferramentas</h4>
          <div className="grid grid-cols-2 gap-2">
            {drawingTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`
                  group relative p-3 rounded-xl border-2 transition-all duration-200
                  ${
                    selectedTool === tool.id
                      ? `border-transparent bg-gradient-to-br ${tool.gradient} shadow-lg scale-105`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-102'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={selectedTool === tool.id ? 'text-white' : 'text-gray-600'}>
                    {tool.icon}
                  </div>
                  <p
                    className={`text-xs font-medium ${
                      selectedTool === tool.id ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {tool.name}
                  </p>
                </div>

                {/* Active indicator */}
                {selectedTool === tool.id && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-green-500" />
                )}
              </button>
            ))}
          </div>

          {/* Tool Description */}
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-900">
              <strong className="font-semibold">
                {drawingTools.find((t) => t.id === selectedTool)?.name}:
              </strong>{' '}
              {drawingTools.find((t) => t.id === selectedTool)?.description}
            </p>
          </div>
        </div>

        {/* Brush Size */}
        {selectedTool !== 'eraser' && (
          <div className="px-4 pb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Espessura</h4>
            <div className="grid grid-cols-2 gap-2">
              {brushSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setBrushSize(size.value)}
                  className={`
                    px-3 py-2 rounded-lg border-2 transition-all
                    ${
                      brushSize === size.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`h-${size.width} bg-gray-800 rounded-full`} style={{ width: `${size.value * 2}px` }} />
                    <span className="text-xs font-medium text-gray-700">{size.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Picker */}
        {selectedTool !== 'eraser' && (
          <div className="px-4 pb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Cor</h4>

            {/* Color Grid */}
            <div className="grid grid-cols-6 gap-2 mb-3">
              {colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setDrawingColor(color.hex)}
                  className={`
                    w-10 h-10 rounded-lg border-2 transition-all hover:scale-110
                    ${
                      drawingColor === color.hex
                        ? 'border-gray-900 shadow-lg scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }
                  `}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {drawingColor === color.hex && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Custom Color Picker */}
            <div className="flex gap-2 items-center">
              <Palette className="w-4 h-4 text-gray-500" />
              <input
                type="color"
                value={drawingColor}
                onChange={(e) => setDrawingColor(e.target.value)}
                className="flex-1 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={drawingColor}
                onChange={(e) => setDrawingColor(e.target.value)}
                className="w-24 px-2 py-1.5 text-xs font-mono border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Opacity */}
        {selectedTool !== 'eraser' && (
          <div className="px-4 pb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Opacidade: {opacity}%
            </h4>
            <input
              type="range"
              min="10"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="px-4 pb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Visualização</h4>
          <div className="p-6 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
            <div
              className="rounded-full"
              style={{
                width: `${brushSize * 2}px`,
                height: `${brushSize * 2}px`,
                backgroundColor: selectedTool === 'eraser' ? '#FB7185' : drawingColor,
                opacity: selectedTool === 'eraser' ? 0.5 : opacity / 100,
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            Clique no canvas e arraste para desenhar
          </p>
          <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
            Ativar Modo Desenho
          </button>
        </div>
      </div>
    </div>
  );
}
