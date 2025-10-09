// ============================================================================
// Template Builder - Icons & Forms Session
// Icons, shapes, and form elements
// ============================================================================

'use client';

import { Shapes, Square, Circle, FormInput, RectangleHorizontal } from 'lucide-react';
import { useBuilderStore } from '@/store/builder';

export function IconsSession() {
  const { addElement, currentPage } = useBuilderStore();

  const handleInsertShape = (shapeType: 'rectangle' | 'circle') => {
    const page = currentPage();
    if (!page) return;

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    addElement({
      id: `shape-${Date.now()}`,
      type: 'shape',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: 200,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        shapeType,
        fill: shapeType === 'circle' ? '#10B981' : '#3B82F6',
      },
    });
  };

  const handleInsertForm = () => {
    const page = currentPage();
    if (!page) return;

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    addElement({
      id: `form-${Date.now()}`,
      type: 'form',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: 400,
      height: 80,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        backgroundColor: '#3B82F6',
        backgroundOpacity: 1,
        border: {
          enabled: true,
          color: '#1E3A8A',
          width: 3,
          opacity: 1,
        },
        cornerRadius: 12,
        text: {
          content: 'Título da Seção',
          fontFamily: 'Inter',
          fontSize: 24,
          fontWeight: 'bold',
          color: '#FFFFFF',
          align: 'center',
          verticalAlign: 'middle',
          padding: 16,
        },
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Shapes className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
          Ícones & Formas
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Formas e elementos visuais</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Shapes Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Formas</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleInsertShape('rectangle')}
              className="
                p-3 rounded-lg border border-gray-200 bg-white
                hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm
                transition-all duration-150 flex flex-col items-center gap-2
              "
            >
              <Square className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
              <span className="text-xs font-medium text-gray-700">Retângulo</span>
            </button>

            <button
              onClick={() => handleInsertShape('circle')}
              className="
                p-3 rounded-lg border border-gray-200 bg-white
                hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm
                transition-all duration-150 flex flex-col items-center gap-2
              "
            >
              <Circle className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
              <span className="text-xs font-medium text-gray-700">Círculo</span>
            </button>
          </div>
        </div>

        {/* Forms Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Formulários</h4>
          <button
            onClick={handleInsertForm}
            className="
              w-full p-3 rounded-lg border border-gray-200 bg-white
              hover:border-amber-300 hover:bg-amber-50 hover:shadow-sm
              transition-all duration-150 flex items-center gap-2
            "
          >
            <RectangleHorizontal className="w-5 h-5 text-amber-600" strokeWidth={2.5} />
            <div className="text-left">
              <div className="text-xs font-semibold text-gray-700">Caixa de Título</div>
              <div className="text-xs text-gray-500">Seção com texto</div>
            </div>
          </button>
        </div>

        {/* Coming Soon - Icons Library */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center text-center px-4 py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <Shapes className="w-6 h-6 text-emerald-600" strokeWidth={2} />
            </div>
            <h4 className="text-xs font-semibold text-gray-800 mb-1">Biblioteca de Ícones</h4>
            <p className="text-xs text-gray-500">
              5000+ ícones disponíveis em breve
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
