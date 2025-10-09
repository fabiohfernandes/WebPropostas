// ============================================================================
// Image Library - Zustand Store for uploaded/reusable images
// ============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UploadedImage } from '@/types/builder';

interface ImageLibraryState {
  images: UploadedImage[];
  addImage: (image: UploadedImage) => void;
  deleteImage: (id: string) => void;
  clearImages: () => void;
}

export const useImageLibrary = create<ImageLibraryState>()(
  persist(
    (set) => ({
      images: [],

      addImage: (image) =>
        set((state) => ({
          images: [...state.images, image],
        })),

      deleteImage: (id) =>
        set((state) => ({
          images: state.images.filter((img) => img.id !== id),
        })),

      clearImages: () => set({ images: [] }),
    }),
    {
      name: 'image-library-storage',
    }
  )
);
