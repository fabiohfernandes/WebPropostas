// ============================================================================
// Template Builder - Main Layout Component
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import { DndContext, DragEndEvent, useDndMonitor, DragOverlay } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { SessionNav } from './SessionNav';
import { ElementsPanelNew } from './ElementsPanelNew';
import { BuilderCanvas } from './BuilderCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { BuilderToolbar } from './BuilderToolbar';
import type { Element, FrameElement } from '@/types/builder';
import Image from 'next/image';

interface BuilderLayoutProps {
  templateId?: string;
}

// Inner component that uses useDndMonitor (must be inside DndContext)
function BuilderLayoutInner({
  templateId,
  canvasContainerRef,
  draggedOverFrame,
  setDraggedOverFrame,
  lastMousePosRef
}: {
  templateId?: string;
  canvasContainerRef: React.RefObject<HTMLDivElement>;
  draggedOverFrame: string | null;
  setDraggedOverFrame: (id: string | null) => void;
  lastMousePosRef: React.MutableRefObject<{ x: number; y: number } | null>;
}) {
  const { addElement, currentCanvasSize, setZoom, zoom, currentElements, updateElement } = useBuilderStore();
  const [rightPanelWidth, setRightPanelWidth] = useState(320);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [currentDragData, setCurrentDragData] = useState<any>(null);

  // Monitor drag start/end from DndKit
  useDndMonitor({
    onDragStart(event) {
      const dragData = event.active.data.current;
      const isImageDrag = dragData?.type === 'image' && dragData?.imageSrc;

      if (isImageDrag) {
        setIsDraggingImage(true);
        setCurrentDragData(dragData);
        console.log('🟢 Drag started from library:', dragData);
      }
    },
    onDragEnd() {
      setIsDraggingImage(false);
      setCurrentDragData(null);
      setDraggedOverFrame(null);
      console.log('🔴 Drag ended');
    },
  });

  // Track mouse movement globally to detect frame hover during drag
  useEffect(() => {
    if (!isDraggingImage) return;

    let lastLogTime = 0;
    const LOG_THROTTLE = 100; // Log every 100ms

    const handleMouseMove = (e: MouseEvent) => {
      // Get canvas container
      const canvasContainer = canvasContainerRef.current;
      if (!canvasContainer) {
        console.warn('⚠️ No canvas container ref');
        return;
      }

      // Find the actual Konva stage element inside the canvas container
      const stage = canvasContainer.querySelector('.konvajs-content');
      if (!stage) {
        console.warn('⚠️ No .konvajs-content found in canvas container');
        return;
      }

      const stageRect = stage.getBoundingClientRect();
      const canvasSize = currentCanvasSize();

      // Mouse position relative to the Konva stage (in screen pixels, accounting for CSS zoom)
      const stageX = e.clientX - stageRect.left;
      const stageY = e.clientY - stageRect.top;

      // Convert to canvas coordinates
      // The stage is scaled with CSS transform, so divide by zoom
      // Stage uses top-left origin (0,0 = top-left corner)
      const canvasX = stageX / zoom;
      const canvasY = stageY / zoom;

      // Store last mouse position for drop calculation
      lastMousePosRef.current = { x: canvasX, y: canvasY };

      const now = Date.now();
      const shouldLog = now - lastLogTime > LOG_THROTTLE;

      if (shouldLog) {
        console.log('🔍 Mouse tracking:', {
          screenMouse: { x: e.clientX, y: e.clientY },
          stagePos: { x: stageX, y: stageY },
          canvasPos: { x: canvasX, y: canvasY },
          zoom,
          stageRect: { left: stageRect.left, top: stageRect.top, width: stageRect.width, height: stageRect.height }
        });
        lastLogTime = now;
      }

      // Check collision with frames (BIGGER drop zone)
      const DROP_ZONE_PADDING = 50;
      let hoveredFrame: string | null = null;

      const frames = currentElements().filter(el => el.type === 'frame');

      if (shouldLog) {
        console.log(`🔍 Checking ${frames.length} frames`);
      }

      for (const el of frames) {
        const frame = el as FrameElement;

        // Frame uses center registration (offsetX/offsetY = width/2, height/2)
        // So frame.x and frame.y are the CENTER of the frame
        const frameLeft = frame.x - frame.width / 2 - DROP_ZONE_PADDING;
        const frameRight = frame.x + frame.width / 2 + DROP_ZONE_PADDING;
        const frameTop = frame.y - frame.height / 2 - DROP_ZONE_PADDING;
        const frameBottom = frame.y + frame.height / 2 + DROP_ZONE_PADDING;

        const isInside = canvasX >= frameLeft && canvasX <= frameRight && canvasY >= frameTop && canvasY <= frameBottom;

        if (shouldLog) {
          console.log('🔍 Frame check:', {
            frameId: frame.id,
            frameCenter: { x: frame.x, y: frame.y },
            frameSize: { w: frame.width, h: frame.height },
            frameBounds: { left: frameLeft, right: frameRight, top: frameTop, bottom: frameBottom },
            mouseCanvas: { x: canvasX, y: canvasY },
            isInside
          });
        }

        if (isInside) {
          hoveredFrame = frame.id;
          console.log('✅ FRAME HIT:', frame.id);
          break;
        }
      }

      if (!hoveredFrame && shouldLog) {
        console.log('❌ No frame hit');
      }

      setDraggedOverFrame(hoveredFrame);
    };

    console.log('🎯 Mouse move listener attaching...');
    document.addEventListener('mousemove', handleMouseMove);
    console.log('✅ Mouse move listener attached');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      console.log('🧹 Mouse move listener removed');
    };
  }, [isDraggingImage, currentDragData, canvasContainerRef, currentCanvasSize, zoom, currentElements, setDraggedOverFrame]);

  return (
    <>
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
          <BuilderCanvas
            onFrameHover={setDraggedOverFrame}
            hoveredFrameFromLibrary={draggedOverFrame}
          />
        </div>

        {/* Right Panel - Properties */}
        <div
          className="flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto"
          style={{ width: `${rightPanelWidth}px` }}
        >
          <PropertiesPanel />
        </div>
      </div>
    </>
  );
}

export function BuilderLayout({ templateId }: BuilderLayoutProps) {
  const { addElement, currentCanvasSize, setZoom, zoom, currentElements, updateElement } = useBuilderStore();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const hasAutoFitted = useRef(false);
  const [draggedOverFrame, setDraggedOverFrame] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeDragData, setActiveDragData] = useState<any>(null);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

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

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveDragData(active.data.current);
    console.log('🟢 DragStart:', active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;

    // Clear drag overlay
    setActiveId(null);
    setActiveDragData(null);

    if (!over) return;

    const dragData = active.data.current as any;

    // Check if dragging an image from library
    const isImageDrag = dragData?.type === 'image' && dragData?.imageSrc;

    // CASE 1: Image dropped on canvas - check if it was over a frame
    if (isImageDrag && over.id === 'canvas-drop-zone') {
      // If we tracked which frame was being hovered, load image into that frame
      if (draggedOverFrame) {
        console.log('✓ Image dropped on frame:', draggedOverFrame, dragData.imageSrc);

        const frameElement = currentElements().find(el => el.id === draggedOverFrame) as FrameElement;
        if (frameElement && frameElement.type === 'frame') {
          // Use the last known mouse position from mousemove tracking
          const lastMousePos = lastMousePosRef.current;
          if (!lastMousePos) {
            console.warn('⚠️ No last mouse position available');
            return;
          }

          const dropCanvasX = lastMousePos.x;
          const dropCanvasY = lastMousePos.y;

          // Calculate pivot point (0-1 normalized relative to frame)
          // Frame uses center registration, so frame.x and frame.y are the center
          const frameCenterX = frameElement.x;
          const frameCenterY = frameElement.y;

          const relativeX = dropCanvasX - frameCenterX;
          const relativeY = dropCanvasY - frameCenterY;

          const pivotX = 0.5 + (relativeX / frameElement.width);
          const pivotY = 0.5 + (relativeY / frameElement.height);

          console.log('📐 Calculated pivot from library drop:', { pivotX, pivotY, dropCanvasX, dropCanvasY, frameCenterX, frameCenterY });

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
                pivotX: pivotX,
                pivotY: pivotY,
              },
              editMode: false,
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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-gray-50">
        <BuilderLayoutInner
          templateId={templateId}
          canvasContainerRef={canvasContainerRef}
          draggedOverFrame={draggedOverFrame}
          setDraggedOverFrame={setDraggedOverFrame}
          lastMousePosRef={lastMousePosRef}
        />
      </div>

      {/* Drag Overlay - shows preview while dragging */}
      <DragOverlay dropAnimation={null}>
        {activeId && activeDragData?.type === 'image' && activeDragData?.imageSrc ? (
          <div className="bg-white rounded-lg shadow-2xl border-2 border-blue-400 p-2 opacity-90">
            <img
              src={activeDragData.imageSrc}
              alt="Dragging"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
