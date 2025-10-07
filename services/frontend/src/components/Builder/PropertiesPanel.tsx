// ============================================================================
// Template Builder - Properties Panel (Right Sidebar)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useSelectedElement } from '@/store/builder';
import { useBuilderStore } from '@/store/builder';
import { AVAILABLE_FONTS, getFontsByCategory, getFontFamily } from '@/utils/fonts';
import type { TextElement, ShapeElement, ImageElement } from '@/types/builder';
import { useState } from 'react';
import {
  AdjustmentsHorizontalIcon,
  SwatchIcon,
  PaintBrushIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline';

function TextProperties({ element }: { element: TextElement }) {
  const { updateElement } = useBuilderStore();

  return (
    <div className="space-y-4">
      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conteúdo
        </label>
        <textarea
          value={element.properties.content}
          onChange={(e) =>
            updateElement(element.id, {
              properties: { ...element.properties, content: e.target.value },
            } as Partial<TextElement>)
          }
          onFocus={(e) => e.target.select()}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fonte
        </label>
        <select
          value={element.properties.fontFamily}
          onChange={(e) =>
            updateElement(element.id, {
              properties: { ...element.properties, fontFamily: e.target.value },
            } as Partial<TextElement>)
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ fontFamily: getFontFamily(element.properties.fontFamily) }}
        >
          <optgroup label="Sans-serif">
            {getFontsByCategory('sans-serif').map((font) => (
              <option
                key={font.name}
                value={font.name}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Serif">
            {getFontsByCategory('serif').map((font) => (
              <option
                key={font.name}
                value={font.name}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Monospace">
            {getFontsByCategory('monospace').map((font) => (
              <option
                key={font.name}
                value={font.name}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Font Size & Weight */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanho
          </label>
          <input
            type="number"
            value={element.properties.fontSize}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  fontSize: parseInt(e.target.value),
                },
              } as Partial<TextElement>)
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Peso
          </label>
          <select
            value={element.properties.fontWeight}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fontWeight: e.target.value },
              } as Partial<TextElement>)
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="bold">Negrito</option>
            <option value="600">Semi-bold</option>
            <option value="300">Light</option>
          </select>
        </div>
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cor
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<TextElement>)
            }
            className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<TextElement>)
            }
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
      </div>

      {/* Text Align */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alinhamento
        </label>
        <div className="flex gap-2">
          {['left', 'center', 'right', 'justify'].map((align) => (
            <button
              key={align}
              onClick={() =>
                updateElement(element.id, {
                  properties: {
                    ...element.properties,
                    textAlign: align as any,
                  },
                } as Partial<TextElement>)
              }
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                element.properties.textAlign === align
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {align === 'left' && 'Esq'}
              {align === 'center' && 'Centro'}
              {align === 'right' && 'Dir'}
              {align === 'justify' && 'Just'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShapeProperties({ element }: { element: ShapeElement }) {
  const { updateElement } = useBuilderStore();

  return (
    <div className="space-y-4">
      {/* Shape Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Forma
        </label>
        <select
          value={element.properties.shapeType}
          onChange={(e) =>
            updateElement(element.id, {
              properties: {
                ...element.properties,
                shapeType: e.target.value as any,
              },
            } as Partial<ShapeElement>)
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="rectangle">Retângulo</option>
          <option value="circle">Círculo</option>
          <option value="triangle">Triângulo</option>
          <option value="line">Linha</option>
        </select>
      </div>

      {/* Fill Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cor de Preenchimento
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<ShapeElement>)
            }
            className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<ShapeElement>)
            }
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
      </div>

      {/* Stroke */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Borda
        </label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="color"
              value={element.properties.stroke?.color || '#000000'}
              onChange={(e) =>
                updateElement(element.id, {
                  properties: {
                    ...element.properties,
                    stroke: {
                      ...element.properties.stroke,
                      color: e.target.value,
                      width: element.properties.stroke?.width || 1,
                    },
                  },
                } as Partial<ShapeElement>)
              }
              className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="number"
              value={element.properties.stroke?.width || 0}
              onChange={(e) =>
                updateElement(element.id, {
                  properties: {
                    ...element.properties,
                    stroke: {
                      ...element.properties.stroke,
                      color: element.properties.stroke?.color || '#000000',
                      width: parseInt(e.target.value),
                    },
                  },
                } as Partial<ShapeElement>)
              }
              placeholder="Largura"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageProperties({ element }: { element: ImageElement }) {
  const { updateElement } = useBuilderStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target?.result as string;

        // Load image to get natural dimensions
        const img = new Image();
        img.onload = () => {
          updateElement(element.id, {
            width: img.naturalWidth,
            height: img.naturalHeight,
            properties: {
              ...element.properties,
              src: dataURL,
            },
          } as Partial<ImageElement>);
        };
        img.src = dataURL;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleURLChange = (url: string) => {
    // Convert Google Drive sharing URLs to direct image URLs
    let imageUrl = url;

    // Google Drive format: https://drive.google.com/file/d/FILE_ID/view
    // Convert to: https://drive.google.com/uc?export=view&id=FILE_ID
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        imageUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
      }
    }

    // Load image to get natural dimensions
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      updateElement(element.id, {
        width: img.naturalWidth,
        height: img.naturalHeight,
        properties: {
          ...element.properties,
          src: imageUrl,
        },
      } as Partial<ImageElement>);
    };
    img.onerror = () => {
      // If image fails to load, just update URL without resizing
      updateElement(element.id, {
        properties: { ...element.properties, src: imageUrl },
      } as Partial<ImageElement>);
    };
    img.src = imageUrl;
  };

  return (
    <div className="space-y-4">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagem
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL da Imagem
        </label>
        <input
          type="text"
          value={element.properties.src}
          onChange={(e) => handleURLChange(e.target.value)}
          onBlur={(e) => handleURLChange(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
        />
      </div>

      {/* Image Fit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ajuste
        </label>
        <select
          value={element.properties.fit}
          onChange={(e) =>
            updateElement(element.id, {
              properties: {
                ...element.properties,
                fit: e.target.value as 'cover' | 'contain' | 'fill' | 'none',
              },
            } as Partial<ImageElement>)
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="cover">Preencher (Cover)</option>
          <option value="contain">Conter (Contain)</option>
          <option value="fill">Esticar (Fill)</option>
          <option value="none">Original</option>
        </select>
      </div>
    </div>
  );
}

function CommonProperties({ element }: { element: any }) {
  const { updateElement } = useBuilderStore();
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const aspectRatio = element.width / element.height;

  const handleWidthChange = (newWidth: number) => {
    if (aspectRatioLocked) {
      const newHeight = newWidth / aspectRatio;
      updateElement(element.id, { width: newWidth, height: newHeight });
    } else {
      updateElement(element.id, { width: newWidth });
    }
  };

  const handleHeightChange = (newHeight: number) => {
    if (aspectRatioLocked) {
      const newWidth = newHeight * aspectRatio;
      updateElement(element.id, { width: newWidth, height: newHeight });
    } else {
      updateElement(element.id, { height: newHeight });
    }
  };

  return (
    <div className="space-y-4">
      {/* Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Posição
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={Math.round(element.x)}
            onChange={(e) =>
              updateElement(element.id, { x: parseInt(e.target.value) })
            }
            placeholder="X"
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={Math.round(element.y)}
            onChange={(e) =>
              updateElement(element.id, { y: parseInt(e.target.value) })
            }
            placeholder="Y"
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Size with Lock */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Tamanho
          </label>
          <button
            onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
            className={`p-1.5 rounded-lg transition-colors ${
              aspectRatioLocked
                ? 'bg-blue-50 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={aspectRatioLocked ? 'Desbloquear proporção' : 'Bloquear proporção'}
          >
            {aspectRatioLocked ? (
              <LockClosedIcon className="w-4 h-4" />
            ) : (
              <LockOpenIcon className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={Math.round(element.width)}
            onChange={(e) => handleWidthChange(parseInt(e.target.value))}
            placeholder="Largura"
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={Math.round(element.height)}
            onChange={(e) => handleHeightChange(parseInt(e.target.value))}
            placeholder="Altura"
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Rotation & Opacity */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rotação
          </label>
          <input
            type="number"
            value={Math.round(element.rotation)}
            onChange={(e) =>
              updateElement(element.id, { rotation: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opacidade (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={Math.round(element.opacity * 100)}
            onChange={(e) =>
              updateElement(element.id, { opacity: parseInt(e.target.value) / 100 })
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export function PropertiesPanel() {
  const selectedElement = useSelectedElement();
  const { deleteElement, duplicateElement } = useBuilderStore();

  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Propriedades</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <AdjustmentsHorizontalIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              Selecione um elemento para editar suas propriedades
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Propriedades</h3>
          <div className="flex gap-1">
            <button
              onClick={() => duplicateElement(selectedElement.id)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Duplicar"
            >
              <DocumentDuplicateIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
              title="Excluir"
            >
              <TrashIcon className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            {selectedElement.type === 'text' && 'Texto'}
            {selectedElement.type === 'image' && 'Imagem'}
            {selectedElement.type === 'shape' && 'Forma'}
            {selectedElement.type === 'icon' && 'Ícone'}
            {selectedElement.type === 'chart' && 'Gráfico'}
          </span>
          <span className="text-xs text-gray-500">
            ID: {selectedElement.id.slice(0, 8)}...
          </span>
        </div>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Element-specific properties */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PaintBrushIcon className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-900">Aparência</h4>
          </div>
          {selectedElement.type === 'text' && (
            <TextProperties element={selectedElement as TextElement} />
          )}
          {selectedElement.type === 'shape' && (
            <ShapeProperties element={selectedElement as ShapeElement} />
          )}
          {selectedElement.type === 'image' && (
            <ImageProperties element={selectedElement as ImageElement} />
          )}
        </div>

        {/* Common properties */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <SwatchIcon className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-900">Transformação</h4>
          </div>
          <CommonProperties element={selectedElement} />
        </div>
      </div>
    </div>
  );
}
