// ============================================================================
// Template Builder - Text Session
// Rich text presets with pre-configured styling
// ============================================================================

'use client';

import { Type, Heading1, AlignLeft, DollarSign, AlertCircle, MessageSquare } from 'lucide-react';
import { useBuilderStore } from '@/store/builder';

interface TextPreset {
  id: string;
  label: string;
  icon: React.ReactNode;
  example: string;
  defaultProps: {
    width: number;
    height: number;
    properties: {
      content: string;
      fontFamily: string;
      fontSize: number;
      fontWeight: string | number;
      fontStyle: 'normal' | 'italic';
      textAlign: 'left' | 'center' | 'right' | 'justify';
      lineHeight: number;
      letterSpacing: number;
      color: string;
      backgroundColor?: string;
    };
  };
}

const textPresets: TextPreset[] = [
  {
    id: 'title',
    label: 'Título',
    icon: <Heading1 className="w-4 h-4" strokeWidth={2.5} />,
    example: 'Título Principal',
    defaultProps: {
      width: 400,
      height: 60,
      properties: {
        content: 'Título Principal',
        fontFamily: 'Inter',
        fontSize: 48,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 0,
        color: '#1F2937',
      },
    },
  },
  {
    id: 'subtitle',
    label: 'Subtítulo',
    icon: <Type className="w-4 h-4" strokeWidth={2.5} />,
    example: 'Subtítulo',
    defaultProps: {
      width: 350,
      height: 40,
      properties: {
        content: 'Subtítulo',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        letterSpacing: 0,
        color: '#374151',
      },
    },
  },
  {
    id: 'paragraph',
    label: 'Parágrafo',
    icon: <AlignLeft className="w-4 h-4" strokeWidth={2.5} />,
    example: 'Lorem ipsum dolor sit amet...',
    defaultProps: {
      width: 400,
      height: 100,
      properties: {
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'justify',
        lineHeight: 1.6,
        letterSpacing: 0,
        color: '#4B5563',
      },
    },
  },
  {
    id: 'price',
    label: 'Preço',
    icon: <DollarSign className="w-4 h-4" strokeWidth={2.5} />,
    example: 'R$ 999.999',
    defaultProps: {
      width: 200,
      height: 60,
      properties: {
        content: 'R$ 999.999',
        fontFamily: 'Inter',
        fontSize: 42,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: -1,
        color: '#059669',
      },
    },
  },
  {
    id: 'alert',
    label: 'Alerta',
    icon: <AlertCircle className="w-4 h-4" strokeWidth={2.5} />,
    example: 'Atenção!',
    defaultProps: {
      width: 300,
      height: 50,
      properties: {
        content: 'Atenção: Informação Importante',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.4,
        letterSpacing: 0,
        color: '#FFFFFF',
        backgroundColor: '#DC2626',
      },
    },
  },
  {
    id: 'quote',
    label: 'Citação',
    icon: <MessageSquare className="w-4 h-4" strokeWidth={2.5} />,
    example: '"Citação..."',
    defaultProps: {
      width: 400,
      height: 80,
      properties: {
        content: '"Esta é uma citação importante que destaca algo especial."',
        fontFamily: 'Georgia',
        fontSize: 20,
        fontWeight: 'normal',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 1.5,
        letterSpacing: 0,
        color: '#6B7280',
      },
    },
  },
];

export function TextSession() {
  const { addElement, currentPage } = useBuilderStore();

  const handleInsertText = (preset: TextPreset) => {
    const page = currentPage();
    if (!page) return;

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    addElement({
      id: `text-${Date.now()}`,
      type: 'text',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: preset.defaultProps.width,
      height: preset.defaultProps.height,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: preset.defaultProps.properties,
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
          Texto
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Presets de texto estilizados</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {textPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleInsertText(preset)}
            className="
              w-full p-3 rounded-lg border border-gray-200 bg-white
              hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm
              transition-all duration-150 text-left
              group
            "
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="text-indigo-600">{preset.icon}</div>
              <span className="text-xs font-semibold text-gray-700">{preset.label}</span>
            </div>
            <div
              className="text-xs truncate"
              style={{
                fontFamily: preset.defaultProps.properties.fontFamily,
                fontSize: '11px',
                fontWeight: preset.defaultProps.properties.fontWeight,
                fontStyle: preset.defaultProps.properties.fontStyle,
                color: preset.defaultProps.properties.color,
                backgroundColor: preset.defaultProps.properties.backgroundColor,
                padding: preset.defaultProps.properties.backgroundColor ? '4px 8px' : '0',
                borderRadius: preset.defaultProps.properties.backgroundColor ? '4px' : '0',
              }}
            >
              {preset.example}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
