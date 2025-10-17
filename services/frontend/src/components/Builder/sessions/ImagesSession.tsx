// ============================================================================
// Template Builder - Images Session
// User image library with advanced organization
// ============================================================================

'use client';

import { useState } from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { ImageLibrary } from '../ImageLibrary';
import { useImageLibrary } from '@/store/imageLibrary';
import { useBuilderStore } from '@/store/builder';
import type { UploadedImage } from '@/types/builder';

export function ImagesSession() {
  const { images, addImage, deleteImage } = useImageLibrary();
  const { addElement, currentPage } = useBuilderStore();
  const [uploading, setUploading] = useState(false);

  const handleImageClick = (imageSrc: string, width?: number, height?: number) => {
    const page = currentPage();
    if (!page) return;

    console.log('🖱️ Image clicked - Received dimensions:', width, 'x', height);

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    const imageWidth = width || 300;
    const imageHeight = height || 200;

    console.log('📌 Inserting image with dimensions:', imageWidth, 'x', imageHeight);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const src = event.target?.result as string;

        const img = new Image();
        img.crossOrigin = 'anonymous'; // Enable CORS for images
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', {
            alpha: true,
            willReadFrequently: false,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
          })!;

          const maxSize = 300;
          const ratio = Math.min(maxSize / img.width, maxSize / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;

          // CRITICAL: Explicitly clear canvas to transparent BEFORE drawing
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Enable high-quality smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw image with alpha channel preserved
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const thumbnail = canvas.toDataURL('image/png', 1.0);

          const uploadedImage: UploadedImage = {
            id: `img-${Date.now()}`,
            name: file.name,
            src,
            thumbnail,
            width: img.width,
            height: img.height,
            size: file.size,
            uploadedAt: Date.now(),
          };

          addImage(uploadedImage);
          setUploading(false);
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Title and Upload Button */}
      <div className="px-2 py-1.5 border-b border-gray-200">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-pink-600" strokeWidth={2.5} />
              Imagens
            </h3>
            <p className="text-xs text-gray-500">Biblioteca de imagens</p>
          </div>

          {/* Upload Button - Compact */}
          <label className="flex items-center gap-1 px-2 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm text-xs font-medium whitespace-nowrap">
            <Upload className="w-3.5 h-3.5" strokeWidth={2.5} />
            {uploading ? 'Carregando...' : 'Carregar'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <ImageLibrary
          images={images}
          onImageClick={handleImageClick}
          onImageDelete={deleteImage}
        />
      </div>
    </div>
  );
}
