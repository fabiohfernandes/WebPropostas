// ============================================================================
// Template Builder - Main Layout Component
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import { DndContext, DragEndEvent, useDndMonitor } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { SessionNav } from './SessionNav';
import { ElementsPanelNew } from './ElementsPanelNew';
import { BuilderCanvas } from './BuilderCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { BuilderToolbar } from './BuilderToolbar';
import type { Element, FrameElement } from '@/types/builder';

interface BuilderLayoutProps {
  templateId?: string;
}

export function BuilderLayout({ templateId }: BuilderLayoutProps) {
  const { addElement, currentCanvasSize, setZoom, zoom, currentElements, updateElement } = useBuilderStore();
  const [leftPanelWidth, setLeftPanelWidth] = useState(280);
  const [rightPanelWidth, setRightPanelWidth] = useState(320);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const hasAutoFitted = useRef(false);
  const [draggedOverFrame, setDraggedOverFrame] = useState<string | null>(null);

  // Auto-fit zoom to screen on initial load
  useEffect(() => {
    if (hasAutoFitted.current || !canvasContainerRef.current) return;

    const calculateFitZoom = () => {
      const container = canvasContainerRef.current;
      if (!container) return;

      const canvasSize = currentCanvasSize();
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Calculate zoom to fit with padding (80px on each side for comfort)
      const padding = 160; // Total horizontal padding
      const verticalPadding = 120; // Total vertical padding

      const zoomX = (containerWidth - padding) / canvasSize.width;
      const zoomY = (containerHeight - verticalPadding) / canvasSize.height;

      // Use the smaller zoom to ensure the entire canvas fits
      const fitZoom = Math.min(zoomX, zoomY);

      // Clamp between 0.1 and 1 (don't zoom in beyond 100%)
      const finalZoom = Math.max(0.1, Math.min(1, fitZoom));

      setZoom(finalZoom);
      hasAutoFitted.current = true;
    };

    // Small delay to ensure container has rendered with correct dimensions
    const timer = setTimeout(calculateFitZoom, 100);

    return () => clearTimeout(timer);
  }, [currentCanvasSize, setZoom]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (!over) return;

    const dragData = active.data.current as any;

    // Check if dragging an image from library
    const isImageDrag = dragData?.type === 'image' && dragData?.imageSrc;

    // CASE 1: Image dropped on canvas - check if it was over a frame
    if (isImageDrag && over.id === 'canvas-drop-zone') {
      // If we tracked which frame was being hovered, load image into that frame
      if (draggedOverFrame) {
        console.log('✓ Image dropped on frame:', draggedOverFrame, dragData.imageSrc);

        const frameElement = currentElements().find(el => el.id === draggedOverFrame);
        if (frameElement && frameElement.type === 'frame') {
          // Update the frame with the image, preserving all other properties
          updateElement(draggedOverFrame, {
            properties: {
              ...frameElement.properties,
              image: {
                src: dragData.imageSrc,
                fit: 'cover',
                offsetX: 0,
                offsetY: 0,
                scale: 1,
              },
            },
          } as any);

          setDraggedOverFrame(null);
          return;
        }
      }

      console.log('✗ No frame hit, creating new image element');

      // CASE 2: No frame hit - create new image element
      const canvasSize = currentCanvasSize();

      // Calculate size maintaining aspect ratio
      const maxSize = 400;
      const imgWidth = dragData.width || 300;
      const imgHeight = dragData.height || 300;
      const ratio = Math.min(maxSize / imgWidth, maxSize / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      const newElement: Element = {
        id: `image-${Date.now()}`,
        type: 'image',
        x: canvasSize.width / 2,
        y: canvasSize.height / 2,
        width: finalWidth,
        height: finalHeight,
        rotation: 0,
        opacity: 1,
        zIndex: 0,
        locked: false,
        visible: true,
        properties: {
          src: dragData.imageSrc,
          alt: 'Imagem',
          fit: 'cover',
        },
      } as Element;

      console.log('Adding image element from drag:', newElement);
      addElement(newElement);
      return;
    }

    // CASE 3: Regular element drag (existing behavior)
    if (over.id === 'canvas-drop-zone') {
      const elementData = dragData as {
        type: string;
        defaultProps: Partial<Element>;
      };

      // Get canvas center as drop position (Canva-style)
      const canvasSize = currentCanvasSize();
      const dropX = Math.max(0, (canvasSize.width / 2) - 100);
      const dropY = Math.max(0, (canvasSize.height / 2) - 50);

      // Set default size based on element type
      let width = 200;
      let height = 100;

      if (elementData.type === 'text') {
        width = 400;
        height = 60;
      } else if (elementData.type === 'shape') {
        width = 200;
        height = 200;
      } else if (elementData.type === 'image') {
        width = 300;
        height = 300;
      }

      // Create new element
      const newElement: Element = {
        id: `${elementData.type}-${Date.now()}`,
        type: elementData.type as Element['type'],
        x: dropX,
        y: dropY,
        width,
        height,
        rotation: 0,
        opacity: 1,
        zIndex: 0,
        locked: false,
        visible: true,
        ...elementData.defaultProps,
      } as Element;

      console.log('Adding element:', newElement);
      addElement(newElement);
    }
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Top Toolbar */}
        <BuilderToolbar templateId={templateId} />

        {/* Main Builder Area - 3 Panels */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Session Navigation + Content */}
          <SessionNav />
          <ElementsPanelNew />

          {/* Center Panel - Canvas */}
          <div
            ref={canvasContainerRef}
            className="flex-1 overflow-auto bg-gray-100 relative"
          >
            <BuilderCanvas onFrameHover={setDraggedOverFrame} />
          </div>

          {/* Right Panel - Properties */}
          <div
            className="flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto"
            style={{ width: `${rightPanelWidth}px` }}
          >
            <PropertiesPanel />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
