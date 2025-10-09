// ============================================================================
// Template Builder - Images Session
// User image library with advanced organization
// ============================================================================

'use client';

import { Image as ImageIcon } from 'lucide-react';
import { ImageLibrary } from '../ImageLibrary';
import { useImageLibrary } from '@/store/imageLibrary';
import { useBuilderStore } from '@/store/builder';

export function ImagesSession() {
  const { images, addImage, deleteImage } = useImageLibrary();
  const { addElement, currentPage } = useBuilderStore();

  const handleImageClick = (imageSrc: string, width?: number, height?: number) => {
    const page = currentPage();
    if (!page) return;

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    const imageWidth = width || 300;
    const imageHeight = height || 200;

    addElement({
      id: `image-${Date.now()}`,
      type: 'image',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: imageWidth,
      height: imageHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        src: imageSrc,
        alt: 'Image',
        fit: 'contain',
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-pink-600" strokeWidth={2.5} />
          Imagens
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">Biblioteca de imagens</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <ImageLibrary
          images={images}
          onImageClick={handleImageClick}
          onImageUpload={addImage}
          onImageDelete={deleteImage}
        />
      </div>
    </div>
  );
}
