// ============================================================================
// Image Library Component - Upload and manage reusable images
// ============================================================================

'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Plus, Trash2, Upload } from 'lucide-react';
import type { UploadedImage } from '@/types/builder';

interface ImageLibraryProps {
  images: UploadedImage[];
  onImageClick: (imageSrc: string, width: number, height: number) => void;
  onImageUpload: (image: UploadedImage) => void;
  onImageDelete: (imageId: string) => void;
}

function DraggableImageItem({
  image,
  onImageClick,
  onImageDelete
}: {
  image: UploadedImage;
  onImageClick: (src: string, width: number, height: number) => void;
  onImageDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `image-${image.id}`,
    data: {
      type: 'image',
      imageSrc: image.src,
      width: image.width,
      height: image.height,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="relative group"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <button
        onClick={() => onImageClick(image.src, image.width, image.height)}
        className="w-full aspect-square rounded border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors bg-white cursor-grab active:cursor-grabbing"
        title={`${image.name} - Clique para inserir ou arraste para moldura`}
      >
        <img
          src={image.thumbnail}
          alt={image.name}
          className="w-full h-full object-cover pointer-events-none"
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageDelete(image.id);
        }}
        className="absolute top-0.5 right-0.5 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
        title="Excluir"
      >
        <Trash2 className="w-3 h-3" strokeWidth={2.5} />
      </button>
    </div>
  );
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
        <label className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm text-xs font-medium">
          <Upload className="w-4 h-4" strokeWidth={2.5} />
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
          <DraggableImageItem
            key={image.id}
            image={image}
            onImageClick={onImageClick}
            onImageDelete={onImageDelete}
          />
        ))}
      </div>

      {images.length === 0 && !uploading && (
        <div className="text-center py-6 text-gray-400">
          <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" strokeWidth={2} />
          <p className="text-xs">Nenhuma imagem carregada</p>
        </div>
      )}
    </div>
  );
}
