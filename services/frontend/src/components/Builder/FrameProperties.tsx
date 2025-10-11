// ============================================================================
// Template Builder - Frame Properties Component
// Allows loading images into frames from image library
// ============================================================================

'use client';

import { useState } from 'react';
import { useBuilderStore } from '@/store/builder';
import { useImageLibrary } from '@/store/imageLibrary';
import type { FrameElement } from '@/types/builder';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function FrameProperties({ element }: { element: FrameElement }) {
  const { updateElement } = useBuilderStore();
  const { images } = useImageLibrary();
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleSelectImage = (imageSrc: string) => {
    updateElement(element.id, {
      properties: {
        ...element.properties,
        image: {
          src: imageSrc,
          fit: 'cover',
          offsetX: 0,
          offsetY: 0,
          scale: 1,
        },
      },
    } as Partial<FrameElement>);
    setShowImagePicker(false);
  };

  const handleRemoveImage = () => {
    updateElement(element.id, {
      properties: {
        ...element.properties,
        image: undefined,
      },
    } as Partial<FrameElement>);
  };

  return (
    <div className="space-y-2">
      {/* Fill Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor de Fundo
        </label>
        <div className="flex gap-1.5">
          <input
            type="color"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<FrameElement>)
            }
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<FrameElement>)
            }
            onFocus={(e) => e.target.select()}
            className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Imagem
        </label>

        {element.properties.image ? (
          <div className="space-y-2">
            {/* Current Image Preview */}
            <div className="relative aspect-video w-full rounded border border-gray-200 overflow-hidden bg-gray-50">
              <img
                src={element.properties.image.src}
                alt="Frame"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                title="Remover imagem"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </div>

            {/* Image Fit Mode */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Ajuste
              </label>
              <select
                value={element.properties.image.fit}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      image: {
                        ...element.properties.image!,
                        fit: e.target.value as 'cover' | 'contain' | 'fill',
                      },
                    },
                  } as Partial<FrameElement>)
                }
                className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="cover">Preencher (cobrir)</option>
                <option value="contain">Ajustar (conter)</option>
                <option value="fill">Esticar</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => setShowImagePicker(!showImagePicker)}
              className="w-full px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
            >
              <PhotoIcon className="w-4 h-4" />
              Escolher da Biblioteca
            </button>

            {/* Image Picker Modal */}
            {showImagePicker && (
              <div className="border border-gray-200 rounded p-2 bg-white max-h-60 overflow-y-auto">
                {/* Library Images */}
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => handleSelectImage(img.src)}
                        className="aspect-square rounded border border-gray-200 overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                      >
                        <img
                          src={img.thumbnail}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 text-center py-2">
                    Nenhuma imagem na biblioteca.
                    <br />
                    Use a sessão "Imagens" para fazer upload.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
