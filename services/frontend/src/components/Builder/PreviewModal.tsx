// ============================================================================
// Template Builder - Preview Modal (Fullscreen Presentation Mode)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useEffect, useState } from 'react';
import { useBuilderStore } from '@/store/builder';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Stage, Layer, Rect, Text as KonvaText, Image as KonvaImage, Group } from 'react-konva';
import { getFontFamily } from '@/utils/fonts';
import type { Element, TextElement, ImageElement, IconElement, FrameElement } from '@/types/builder';
import Konva from 'konva';
import { renderToString } from 'react-dom/server';
import * as LucideIcons from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  const { pages, currentPageId } = useBuilderStore();
  const [currentPreviewPageIndex, setCurrentPreviewPageIndex] = useState(0);

  // Reset to first page when opening
  useEffect(() => {
    if (isOpen) {
      const currentIndex = pages.findIndex(p => p.id === currentPageId);
      setCurrentPreviewPageIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  }, [isOpen, currentPageId, pages]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        handleNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPreviewPageIndex, pages.length]);

  if (!isOpen) return null;

  const currentPage = pages[currentPreviewPageIndex];
  if (!currentPage) return null;

  const handleNextPage = () => {
    if (currentPreviewPageIndex < pages.length - 1) {
      setCurrentPreviewPageIndex(currentPreviewPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPreviewPageIndex > 0) {
      setCurrentPreviewPageIndex(currentPreviewPageIndex - 1);
    }
  };

  const canvasSize = currentPage.canvasSize;

  // Calculate scale to fit screen while maintaining aspect ratio
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  const scale = Math.min(
    (windowWidth * 0.9) / canvasSize.width,
    (windowHeight * 0.9) / canvasSize.height
  );

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        title="Fechar (ESC)"
      >
        <X className="w-6 h-6 text-white" strokeWidth={2} />
      </button>

      {/* Page Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
        {currentPreviewPageIndex + 1} / {pages.length}
      </div>

      {/* Canvas */}
      <div className="flex items-center justify-center">
        <Stage
          width={canvasSize.width * scale}
          height={canvasSize.height * scale}
          scaleX={scale}
          scaleY={scale}
        >
          <Layer>
            {/* Background */}
            <Rect
              x={0}
              y={0}
              width={canvasSize.width}
              height={canvasSize.height}
              fill={currentPage.background || '#FFFFFF'}
            />

            {/* Elements */}
            {currentPage.elements
              .filter(el => el.visible)
              .sort((a, b) => a.zIndex - b.zIndex)
              .map(element => (
                <PreviewElement key={element.id} element={element} />
              ))}
          </Layer>
        </Stage>
      </div>

      {/* Navigation Arrows */}
      {currentPreviewPageIndex > 0 && (
        <button
          onClick={handlePrevPage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          title="Página Anterior (←)"
        >
          <ChevronLeft className="w-8 h-8 text-white" strokeWidth={2} />
        </button>
      )}

      {currentPreviewPageIndex < pages.length - 1 && (
        <button
          onClick={handleNextPage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          title="Próxima Página (→)"
        >
          <ChevronRight className="w-8 h-8 text-white" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

function PreviewElement({ element }: { element: Element }) {
  if (element.type === 'text') {
    const textEl = element as TextElement;
    const hasBackground = textEl.properties.backgroundColor;

    return (
      <Group
        x={element.x}
        y={element.y}
        rotation={element.rotation}
        opacity={element.opacity}
      >
        {hasBackground && (
          <Rect
            x={0}
            y={0}
            width={element.width}
            height={element.height}
            fill={textEl.properties.backgroundColor}
            cornerRadius={8}
          />
        )}
        <KonvaText
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          text={textEl.properties.content}
          fontSize={textEl.properties.fontSize}
          fontFamily={getFontFamily(textEl.properties.fontFamily)}
          fill={textEl.properties.color}
          align={textEl.properties.textAlign}
          verticalAlign="middle"
          padding={hasBackground ? 12 : 0}
          fontStyle={
            textEl.properties.fontStyle === 'italic'
              ? 'italic'
              : textEl.properties.fontWeight === 'bold'
              ? 'bold'
              : 'normal'
          }
          lineHeight={textEl.properties.lineHeight}
          letterSpacing={textEl.properties.letterSpacing}
        />
      </Group>
    );
  }

  // Add other element types as needed (images, icons, shapes, etc.)
  return null;
}
