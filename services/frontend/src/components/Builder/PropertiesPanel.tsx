// ============================================================================
// Template Builder - Properties Panel (Right Sidebar)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useSelectedElement } from '@/store/builder';
import { useBuilderStore } from '@/store/builder';
import { useImageLibrary } from '@/store/imageLibrary';
import { AVAILABLE_FONTS, getFontsByCategory, getFontFamily } from '@/utils/fonts';
import type { TextElement, ShapeElement, ImageElement, FormElement } from '@/types/builder';
import { useState } from 'react';
import {
  AdjustmentsHorizontalIcon,
  SwatchIcon,
  PaintBrushIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  LockClosedIcon,
  LockOpenIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { FormProperties } from './FormProperties';

function TextProperties({ element }: { element: TextElement }) {
  const { updateElement } = useBuilderStore();

  return (
    <div className="space-y-2">
      {/* Content */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
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
          className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          rows={2}
        />
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Fonte
        </label>
        <select
          value={element.properties.fontFamily}
          onChange={(e) =>
            updateElement(element.id, {
              properties: { ...element.properties, fontFamily: e.target.value },
            } as Partial<TextElement>)
          }
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
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
            onFocus={(e) => e.target.select()}
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Peso
          </label>
          <select
            value={element.properties.fontWeight}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fontWeight: e.target.value },
              } as Partial<TextElement>)
            }
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        <label className="block text-xs font-medium text-gray-700 mb-1">
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
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<TextElement>)
            }
            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Text Align */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
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
              className={`flex-1 px-2 py-1 text-xs font-medium rounded border transition-colors ${
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
    <div className="space-y-2">
      {/* Shape Type */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
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
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="rectangle">Retângulo</option>
          <option value="circle">Círculo</option>
          <option value="triangle">Triângulo</option>
          <option value="line">Linha</option>
        </select>
      </div>

      {/* Fill Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
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
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<ShapeElement>)
            }
            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Stroke */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Borda
        </label>
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
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
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
            onFocus={(e) => e.target.select()}
            placeholder="Largura"
            className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

function ImageProperties({ element }: { element: ImageElement }) {
  const { updateElement } = useBuilderStore();
  const { images } = useImageLibrary();
  const [showLibrary, setShowLibrary] = useState(false);

  const handleLibraryImageSelect = (imageSrc: string, width: number, height: number) => {
    updateElement(element.id, {
      width,
      height,
      properties: {
        ...element.properties,
        src: imageSrc,
      },
    } as Partial<ImageElement>);
    setShowLibrary(false);
  };

  return (
    <div className="space-y-2">
      {/* Image Library */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Escolher Imagem
        </label>
        <button
          onClick={() => setShowLibrary(!showLibrary)}
          className="w-full flex items-center justify-center gap-2 px-2 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          <PhotoIcon className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-xs text-gray-700">
            {showLibrary ? 'Fechar Biblioteca' : 'Abrir Biblioteca'}
          </span>
        </button>

        {showLibrary && (
          <div className="mt-1.5 grid grid-cols-3 gap-1.5 p-1.5 border border-gray-200 rounded max-h-48 overflow-y-auto">
            {images.length === 0 ? (
              <div className="col-span-3 text-center py-4 text-xs text-gray-500">
                Nenhuma imagem na biblioteca
              </div>
            ) : (
              images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => handleLibraryImageSelect(image.src, image.width, image.height)}
                  className="aspect-square rounded border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors bg-white"
                  title={image.name}
                >
                  <img
                    src={image.thumbnail}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Image Fit */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
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
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="cover">Preencher (Cover)</option>
          <option value="contain">Conter (Contain)</option>
          <option value="fill">Esticar (Fill)</option>
          <option value="none">Original</option>
        </select>
      </div>

      {/* Alpha Border (Moldura que respeita transparência PNG) */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-gray-700">
            Moldura PNG
          </label>
          <input
            type="checkbox"
            checked={element.properties.alphaBorder?.enabled || false}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  alphaBorder: {
                    enabled: e.target.checked,
                    size: element.properties.alphaBorder?.size || 5,
                    color: element.properties.alphaBorder?.color || '#000000',
                  },
                },
              } as Partial<ImageElement>)
            }
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        {element.properties.alphaBorder?.enabled && (
          <div className="space-y-1.5 pl-2 mt-1.5">
            {/* Border Size */}
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Espessura</label>
                <span className="text-xs text-gray-500">{element.properties.alphaBorder.size}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={element.properties.alphaBorder.size}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      alphaBorder: {
                        ...element.properties.alphaBorder!,
                        size: parseInt(e.target.value),
                      },
                    },
                  } as Partial<ImageElement>)
                }
                className="w-full h-1.5"
              />
            </div>

            {/* Border Color */}
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">
                Cor
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={element.properties.alphaBorder.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        alphaBorder: {
                          ...element.properties.alphaBorder!,
                          color: e.target.value,
                        },
                      },
                    } as Partial<ImageElement>)
                  }
                  className="w-10 h-7 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={element.properties.alphaBorder.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        alphaBorder: {
                          ...element.properties.alphaBorder!,
                          color: e.target.value,
                        },
                      },
                    } as Partial<ImageElement>)
                  }
                  className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 italic">
              ✨ A moldura segue o contorno da imagem PNG
            </p>
          </div>
        )}
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
    <div className="space-y-1.5">
      {/* Position - Label and inputs on same line */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-gray-700 w-16 flex-shrink-0">
          Posição
        </label>
        <input
          type="number"
          value={Math.round(element.x)}
          onChange={(e) =>
            updateElement(element.id, { x: parseInt(e.target.value) })
          }
          onFocus={(e) => e.target.select()}
          placeholder="X"
          className="w-16 px-1.5 py-0.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="number"
          value={Math.round(element.y)}
          onChange={(e) =>
            updateElement(element.id, { y: parseInt(e.target.value) })
          }
          onFocus={(e) => e.target.select()}
          placeholder="Y"
          className="w-16 px-1.5 py-0.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Size - Label, inputs, and lock on same line */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-gray-700 w-16 flex-shrink-0">
          Tamanho
        </label>
        <input
          type="number"
          value={Math.round(element.width)}
          onChange={(e) => handleWidthChange(parseInt(e.target.value))}
          onFocus={(e) => e.target.select()}
          placeholder="L"
          className="w-16 px-1.5 py-0.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="number"
          value={Math.round(element.height)}
          onChange={(e) => handleHeightChange(parseInt(e.target.value))}
          onFocus={(e) => e.target.select()}
          placeholder="A"
          className="w-16 px-1.5 py-0.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
          className={`p-0.5 rounded transition-colors flex-shrink-0 ${
            aspectRatioLocked
              ? 'bg-blue-50 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={aspectRatioLocked ? 'Desbloquear proporção' : 'Bloquear proporção'}
        >
          {aspectRatioLocked ? (
            <LockClosedIcon className="w-3 h-3" />
          ) : (
            <LockOpenIcon className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Rotation & Opacity - Labels and inputs on same line */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-gray-700 w-16 flex-shrink-0">
          Rotação
        </label>
        <input
          type="number"
          value={Math.round(element.rotation)}
          onChange={(e) =>
            updateElement(element.id, { rotation: parseInt(e.target.value) })
          }
          onFocus={(e) => e.target.select()}
          placeholder="°"
          className="w-16 px-1.5 py-0.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label className="text-xs font-medium text-gray-700 flex-shrink-0">
          Opacidade
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
          onFocus={(e) => e.target.select()}
          placeholder="%"
          className="w-16 px-1.5 py-0.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Shadow Controls */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-gray-700">
            Sombra
          </label>
          <input
            type="checkbox"
            checked={!!element.properties?.shadow}
            onChange={(e) => {
              if (e.target.checked) {
                updateElement(element.id, {
                  properties: {
                    ...element.properties,
                    shadow: {
                      blur: 10,
                      color: 'rgba(0, 0, 0, 0.5)',
                      offsetX: 5,
                      offsetY: 5,
                    },
                  },
                });
              } else {
                const { shadow, ...restProperties } = element.properties;
                updateElement(element.id, {
                  properties: restProperties,
                });
              }
            }}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        {element.properties?.shadow && (
          <div className="space-y-1.5 pl-2 mt-1.5">
            {/* Shadow Blur */}
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Desfoque</label>
                <span className="text-xs text-gray-500">{element.properties.shadow.blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={element.properties.shadow.blur}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        blur: parseInt(e.target.value),
                      },
                    },
                  })
                }
                className="w-full h-1.5"
              />
            </div>

            {/* Shadow Offsets Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-xs text-gray-600">Offset X</label>
                  <span className="text-xs text-gray-500">{element.properties.shadow.offsetX}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={element.properties.shadow.offsetX}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        shadow: {
                          ...element.properties.shadow,
                          offsetX: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                  className="w-full h-1.5"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-xs text-gray-600">Offset Y</label>
                  <span className="text-xs text-gray-500">{element.properties.shadow.offsetY}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={element.properties.shadow.offsetY}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        shadow: {
                          ...element.properties.shadow,
                          offsetY: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                  className="w-full h-1.5"
                />
              </div>
            </div>

            {/* Shadow Color */}
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">
                Cor
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={element.properties.shadow.color.startsWith('rgba')
                    ? '#000000'
                    : element.properties.shadow.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        shadow: {
                          ...element.properties.shadow,
                          color: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-10 h-7 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={element.properties.shadow.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        shadow: {
                          ...element.properties.shadow,
                          color: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="rgba(0, 0, 0, 0.5)"
                  className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PropertiesPanel() {
  const selectedElement = useSelectedElement();
  const { deleteElement, duplicateElement, currentPageId, updatePageBackground, pages } = useBuilderStore();
  const { images } = useImageLibrary();
  const [showBgLibrary, setShowBgLibrary] = useState(false);
  const currentPage = pages.find(p => p.id === currentPageId);

  if (!selectedElement) {
    const bg = currentPage?.background;
    const isObject = typeof bg === 'object';
    const bgType = isObject ? bg.type : 'color';
    const bgColor = isObject && bg.color ? bg.color : (typeof bg === 'string' ? bg : '#FFFFFF');
    const bgImage = isObject && bg.image ? bg.image : '';
    const bgOpacity = isObject && bg.opacity !== undefined ? bg.opacity : 1;

    return (
      <div className="h-full flex flex-col">
        <div className="p-2 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Fundo da Página</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {/* Background Type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tipo de Fundo
            </label>
            <select
              value={bgType}
              onChange={(e) => {
                const type = e.target.value as 'color' | 'image';
                if (type === 'color') {
                  updatePageBackground(currentPageId, {
                    type: 'color',
                    color: bgColor,
                    opacity: bgOpacity,
                  });
                } else {
                  updatePageBackground(currentPageId, {
                    type: 'image',
                    image: bgImage || '',
                    opacity: bgOpacity,
                  });
                }
              }}
              className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="color">Cor Sólida</option>
              <option value="image">Imagem</option>
            </select>
          </div>

          {/* Color Background */}
          {bgType === 'color' && (
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Cor
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) =>
                    updatePageBackground(currentPageId, {
                      type: 'color',
                      color: e.target.value,
                      opacity: bgOpacity,
                    })
                  }
                  className="w-10 h-8 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) =>
                    updatePageBackground(currentPageId, {
                      type: 'color',
                      color: e.target.value,
                      opacity: bgOpacity,
                    })
                  }
                  className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* Image Background */}
          {bgType === 'image' && (
            <div className="space-y-2">
              {/* Image Library */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Escolher Imagem
                </label>
                <button
                  onClick={() => setShowBgLibrary(!showBgLibrary)}
                  className="w-full flex items-center justify-center gap-2 px-2 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  <PhotoIcon className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs text-gray-700">
                    {showBgLibrary ? 'Fechar Biblioteca' : 'Abrir Biblioteca'}
                  </span>
                </button>

                {showBgLibrary && (
                  <div className="mt-1.5 grid grid-cols-3 gap-1.5 p-1.5 border border-gray-200 rounded max-h-48 overflow-y-auto">
                    {images.length === 0 ? (
                      <div className="col-span-3 text-center py-4 text-xs text-gray-500">
                        Nenhuma imagem na biblioteca
                      </div>
                    ) : (
                      images.map((image) => (
                        <button
                          key={image.id}
                          onClick={() => {
                            updatePageBackground(currentPageId, {
                              type: 'image',
                              image: image.src,
                              opacity: bgOpacity,
                            });
                            setShowBgLibrary(false);
                          }}
                          className="aspect-square rounded border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors bg-white"
                          title={image.name}
                        >
                          <img
                            src={image.thumbnail}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Opacity */}
          <div>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-gray-700">
                Opacidade
              </label>
              <span className="text-xs text-gray-500">{Math.round(bgOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={bgOpacity * 100}
              onChange={(e) => {
                const opacity = parseInt(e.target.value) / 100;
                if (bgType === 'color') {
                  updatePageBackground(currentPageId, {
                    type: 'color',
                    color: bgColor,
                    opacity,
                  });
                } else {
                  updatePageBackground(currentPageId, {
                    type: 'image',
                    image: bgImage,
                    opacity,
                  });
                }
              }}
              className="w-full h-1.5"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-2 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-semibold text-gray-900">Propriedades</h3>
          <div className="flex gap-0.5">
            <button
              onClick={() => duplicateElement(selectedElement.id)}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
              title="Duplicar"
            >
              <DocumentDuplicateIcon className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="p-1 rounded hover:bg-red-50 transition-colors"
              title="Excluir"
            >
              <TrashIcon className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded">
            {selectedElement.type === 'text' && 'Texto'}
            {selectedElement.type === 'image' && 'Imagem'}
            {selectedElement.type === 'shape' && 'Forma'}
            {selectedElement.type === 'icon' && 'Ícone'}
            {selectedElement.type === 'chart' && 'Gráfico'}
            {selectedElement.type === 'form' && 'Forma'}
          </span>
          <span className="text-[10px] text-gray-500">
            ID: {selectedElement.id.slice(0, 8)}...
          </span>
        </div>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {/* Element-specific properties */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-gray-200">
            <PaintBrushIcon className="w-3 h-3 text-gray-500" />
            <h4 className="text-xs font-semibold text-gray-700">Aparência</h4>
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
          {selectedElement.type === 'form' && (
            <FormProperties element={selectedElement as FormElement} />
          )}
        </div>

        {/* Common properties */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-gray-200">
            <SwatchIcon className="w-3 h-3 text-gray-500" />
            <h4 className="text-xs font-semibold text-gray-700">Transformação</h4>
          </div>
          <CommonProperties element={selectedElement} />
        </div>
      </div>
    </div>
  );
}
