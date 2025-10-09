// ============================================================================
// Image Library Component - Upload and manage reusable images
// ============================================================================

'use client';

import { useState } from 'react';
import { PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { UploadedImage } from '@/types/builder';

interface ImageLibraryProps {
  images: UploadedImage[];
  onImageClick: (imageSrc: string, width: number, height: number) => void;
  onImageUpload: (image: UploadedImage) => void;
  onImageDelete: (imageId: string) => void;
}

export function ImageLibrary({ images, onImageClick, onImageUpload, onImageDelete }: ImageLibraryProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Create full-size base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const src = event.target?.result as string;

        // Load image to get dimensions
        const img = new Image();
        img.onload = () => {
          // Create thumbnail (max 100px)
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          const maxSize = 100;
          const ratio = Math.min(maxSize / img.width, maxSize / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL('image/jpeg', 0.7);

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

          onImageUpload(uploadedImage);
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
    <div>
      {/* Upload Button */}
      <div className="mb-2">
        <label className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors text-xs font-medium">
          <PlusIcon className="w-3.5 h-3.5" />
          {uploading ? 'Carregando...' : 'Carregar Imagem'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <button
              onClick={() => onImageClick(image.src, image.width, image.height)}
              className="w-full aspect-square rounded border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors bg-white"
              title={image.name}
            >
              <img
                src={image.thumbnail}
                alt={image.name}
                className="w-full h-full object-cover"
              />
            </button>
            <button
              onClick={() => onImageDelete(image.id)}
              className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
              title="Excluir"
            >
              <TrashIcon className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {images.length === 0 && !uploading && (
        <div className="text-center py-6 text-gray-400">
          <PhotoIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-xs">Nenhuma imagem carregada</p>
        </div>
      )}
    </div>
  );
}
