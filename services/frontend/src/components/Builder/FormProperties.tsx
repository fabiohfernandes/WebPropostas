// ============================================================================
// Form Element Properties Component - COMPACT VERSION
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useState } from 'react';
import { useBuilderStore } from '@/store/builder';
import { useImageLibrary } from '@/store/imageLibrary';
import { PhotoIcon } from '@heroicons/react/24/outline';
import type { FormElement } from '@/types/builder';

export function FormProperties({ element }: { element: FormElement }) {
  const { updateElement } = useBuilderStore();
  const { images } = useImageLibrary();
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div className="space-y-2">
      {/* Text Content */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Texto</label>
        <textarea
          value={element.properties.text.content}
          onChange={(e) =>
            updateElement(element.id, {
              properties: {
                ...element.properties,
                text: { ...element.properties.text, content: e.target.value },
              },
            } as Partial<FormElement>)
          }
          onFocus={(e) => e.target.select()}
          className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          rows={2}
        />
      </div>

      {/* Font Settings - Compact Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Tamanho</label>
          <input
            type="number"
            value={element.properties.text.fontSize}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  text: { ...element.properties.text, fontSize: parseInt(e.target.value) },
                },
              } as Partial<FormElement>)
            }
            onFocus={(e) => e.target.select()}
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-gray-600 mb-1">Peso</label>
          <select
            value={element.properties.text.fontWeight}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  text: { ...element.properties.text, fontWeight: e.target.value },
                },
              } as Partial<FormElement>)
            }
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="bold">Negrito</option>
          </select>
        </div>
      </div>

      {/* Text Color - Compact */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Cor do Texto</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.properties.text.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  text: { ...element.properties.text, color: e.target.value },
                },
              } as Partial<FormElement>)
            }
            className="w-10 h-8 rounded cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.text.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  text: { ...element.properties.text, color: e.target.value },
                },
              } as Partial<FormElement>)
            }
            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Text Alignment - Compact */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Alinhamento</label>
          <select
            value={element.properties.text.align}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  text: { ...element.properties.text, align: e.target.value as any },
                },
              } as Partial<FormElement>)
            }
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="left">Esquerda</option>
            <option value="center">Centro</option>
            <option value="right">Direita</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Vertical</label>
          <select
            value={element.properties.text.verticalAlign}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  text: { ...element.properties.text, verticalAlign: e.target.value as any },
                },
              } as Partial<FormElement>)
            }
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="top">Topo</option>
            <option value="middle">Meio</option>
            <option value="bottom">Base</option>
          </select>
        </div>
      </div>

      {/* Background Color - Compact */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Cor de Fundo</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.properties.backgroundColor}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  backgroundColor: e.target.value,
                },
              } as Partial<FormElement>)
            }
            className="w-10 h-8 rounded cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.backgroundColor}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  backgroundColor: e.target.value,
                },
              } as Partial<FormElement>)
            }
            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Sliders - Compact */}
      <div className="space-y-2">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-600">Opacidade Fundo</label>
            <span className="text-xs text-gray-500">{Math.round(element.properties.backgroundOpacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={element.properties.backgroundOpacity * 100}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  backgroundOpacity: parseInt(e.target.value) / 100,
                },
              } as Partial<FormElement>)
            }
            className="w-full h-1.5"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-600">Raio dos Cantos</label>
            <span className="text-xs text-gray-500">{element.properties.cornerRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            value={element.properties.cornerRadius}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  cornerRadius: parseInt(e.target.value),
                },
              } as Partial<FormElement>)
            }
            className="w-full h-1.5"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-600">Padding</label>
            <span className="text-xs text-gray-500">{element.properties.text.padding}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            value={element.properties.text.padding}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  text: { ...element.properties.text, padding: parseInt(e.target.value) },
                },
              } as Partial<FormElement>)
            }
            className="w-full h-1.5"
          />
        </div>
      </div>

      {/* Border - Collapsible */}
      <div className="border-t border-gray-200 pt-2">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={element.properties.border.enabled}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  border: { ...element.properties.border, enabled: e.target.checked },
                },
              } as Partial<FormElement>)
            }
            className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500"
          />
          Borda
        </label>

        {element.properties.border.enabled && (
          <div className="space-y-2 mt-2 pl-5">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Cor</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={element.properties.border.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        border: { ...element.properties.border, color: e.target.value },
                      },
                    } as Partial<FormElement>)
                  }
                  className="w-10 h-7 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={element.properties.border.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        border: { ...element.properties.border, color: e.target.value },
                      },
                    } as Partial<FormElement>)
                  }
                  className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-gray-600">Largura</label>
                <span className="text-xs text-gray-500">{element.properties.border.width}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={element.properties.border.width}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      border: { ...element.properties.border, width: parseInt(e.target.value) },
                    },
                  } as Partial<FormElement>)
                }
                className="w-full h-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-gray-600">Opacidade</label>
                <span className="text-xs text-gray-500">{Math.round(element.properties.border.opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={element.properties.border.opacity * 100}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      border: { ...element.properties.border, opacity: parseInt(e.target.value) / 100 },
                    },
                  } as Partial<FormElement>)
                }
                className="w-full h-1.5"
              />
            </div>
          </div>
        )}
      </div>

      {/* Background Image - Collapsible */}
      <div className="border-t border-gray-200 pt-2">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={element.properties.image?.enabled || false}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  image: {
                    enabled: e.target.checked,
                    src: element.properties.image?.src || '',
                    fit: element.properties.image?.fit || 'cover',
                    opacity: element.properties.image?.opacity || 0.5,
                    position: element.properties.image?.position || 'background',
                  },
                },
              } as Partial<FormElement>)
            }
            className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500"
          />
          Imagem de Fundo
        </label>

        {element.properties.image?.enabled && (
          <div className="space-y-2 mt-2 pl-5">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Escolher Imagem</label>
              <button
                onClick={() => setShowLibrary(!showLibrary)}
                className="w-full flex items-center justify-center gap-2 px-2 py-1.5 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <PhotoIcon className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-xs text-gray-700">
                  {showLibrary ? 'Fechar' : 'Abrir Biblioteca'}
                </span>
              </button>

              {showLibrary && (
                <div className="mt-1.5 grid grid-cols-2 gap-1.5 p-1.5 border border-gray-200 rounded max-h-48 overflow-y-auto">
                  {images.length === 0 ? (
                    <div className="col-span-2 text-center py-3 text-xs text-gray-500">
                      Nenhuma imagem na biblioteca
                    </div>
                  ) : (
                    images.map((image) => (
                      <button
                        key={image.id}
                        onClick={() => {
                          updateElement(element.id, {
                            properties: {
                              ...element.properties,
                              image: { ...element.properties.image!, src: image.src },
                            },
                          } as Partial<FormElement>);
                          setShowLibrary(false);
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

            <div>
              <label className="block text-xs text-gray-600 mb-1">Posição</label>
              <select
                value={element.properties.image?.position || 'background'}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      image: { ...element.properties.image!, position: e.target.value as any },
                    },
                  } as Partial<FormElement>)
                }
                className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="background">Atrás do Texto</option>
                <option value="overlay">Sobre o Texto</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-gray-600">Opacidade</label>
                <span className="text-xs text-gray-500">{Math.round((element.properties.image?.opacity || 1) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={(element.properties.image?.opacity || 1) * 100}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      image: { ...element.properties.image!, opacity: parseInt(e.target.value) / 100 },
                    },
                  } as Partial<FormElement>)
                }
                className="w-full h-1.5"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
