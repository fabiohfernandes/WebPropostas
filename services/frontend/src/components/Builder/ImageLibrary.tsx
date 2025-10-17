// ============================================================================
// Image Library Component - Upload and manage reusable images
// ============================================================================

'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Plus, Trash2, Upload, MousePointerClick } from 'lucide-react';
import type { UploadedImage } from '@/types/builder';

interface ImageLibraryProps {
  images: UploadedImage[];
  onImageClick: (imageSrc: string, width: number, height: number) => void;
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
  const [pointerDownPos, setPointerDownPos] = useState<{ x: number; y: number } | null>(null);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `image-${image.id}`,
    data: {
      type: 'image',
      imageSrc: image.src,
      width: image.width,
      height: image.height,
    },
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setPointerDownPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerDownPos) return;

    // Calculate distance moved
    const deltaX = Math.abs(e.clientX - pointerDownPos.x);
    const deltaY = Math.abs(e.clientY - pointerDownPos.y);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // If moved less than 5 pixels, treat as click
    if (distance < 5) {
      onImageClick(image.src, image.width, image.height);
    }

    setPointerDownPos(null);
  };

  return (
    <div
      ref={setNodeRef}
      className="relative group"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Draggable Image Thumbnail - Canva-style */}
      <div
        {...listeners}
        {...attributes}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="w-full rounded border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors cursor-pointer"
        style={{
          // Checkerboard pattern for transparent images (like Canva/Photoshop)
          backgroundImage:
            'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), ' +
            'linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), ' +
            'linear-gradient(45deg, transparent 75%, #f0f0f0 75%), ' +
            'linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
          backgroundColor: '#ffffff'
        }}
        title={`${image.name} - Clique para inserir ou arraste para moldura`}
      >
        <img
          src={image.thumbnail}
          alt={image.name}
          className="w-full h-auto object-contain pointer-events-none select-none"
          draggable="false"
        />
      </div>

      {/* Delete Button */}
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

export function ImageLibrary({ images, onImageClick, onImageDelete }: ImageLibraryProps) {
  return (
    <div>

      {/* Image Grid - Row-based layout with uniform heights */}
      <div className="p-3 space-y-2">
        {images.reduce<UploadedImage[][]>((rows, image, index) => {
          // Group images into rows of 2
          const rowIndex = Math.floor(index / 2);
          if (!rows[rowIndex]) {
            rows[rowIndex] = [];
          }
          rows[rowIndex].push(image);
          return rows;
        }, []).map((rowImages, rowIndex) => {
          // Calculate uniform height for this row
          // Find the minimum aspect ratio in the row to determine height
          const aspectRatios = rowImages.map(img => img.width / img.height);
          const totalAspectRatio = aspectRatios.reduce((sum, ratio) => sum + ratio, 0);

          // If only one image in row, make it full width
          if (rowImages.length === 1) {
            return (
              <div key={rowIndex} className="w-full">
                <DraggableImageItem
                  image={rowImages[0]}
                  onImageClick={onImageClick}
                  onImageDelete={onImageDelete}
                />
              </div>
            );
          }

          // For 2 images, distribute width based on aspect ratios to maintain same height
          return (
            <div key={rowIndex} className="flex gap-2">
              {rowImages.map((image, imageIndex) => {
                const imageAspectRatio = image.width / image.height;
                const widthPercentage = (imageAspectRatio / totalAspectRatio) * 100;

                return (
                  <div key={image.id} style={{ width: `${widthPercentage}%` }}>
                    <DraggableImageItem
                      image={image}
                      onImageClick={onImageClick}
                      onImageDelete={onImageDelete}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {images.length === 0 && (
        <div className="text-center py-6 text-gray-400">
          <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" strokeWidth={2} />
          <p className="text-xs">Nenhuma imagem carregada</p>
        </div>
      )}
    </div>
  );
}
