// ============================================================================
// Template Builder - Canvas Component (Konva.js)
// AURELIA (Design System) + NOVA (Frontend)
// A4 + TRANSFORMER + IMAGE PLACEHOLDER + FIT MODES
// ============================================================================

'use client';

import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Text as KonvaText, Image as KonvaImage, Transformer } from 'react-konva';
import { useDroppable } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { getFontFamily } from '@/utils/fonts';
import { useElasticAnimation } from '@/hooks/useElasticAnimation';
import type { Element, TextElement, ShapeElement, ImageElement } from '@/types/builder';

// Image element with fit modes (cover, contain, fill, none)
function ImageElement({ element }: { element: ImageElement }) {
  const { selectElement, updateElement, selectedElementId } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const imageRef = useRef<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  // Apply elastic animation
  useElasticAnimation(imageRef, isSelected, {
    stiffness: 0.05,
    damping: 0.5,
    mass: 1,
  });

  useEffect(() => {
    const img = new window.Image();
    // Don't use crossOrigin for Google Drive (causes CORS issues)
    if (!element.properties.src.includes('drive.google.com')) {
      img.crossOrigin = 'anonymous';
    }
    img.src = element.properties.src;
    img.onload = () => {
      setImageLoaded(true);
      setLoadedImage(img);
      if (imageRef.current) {
        imageRef.current.image(img);
        imageRef.current.getLayer()?.batchDraw();
      }
    };
    img.onerror = () => {
      console.error('Failed to load image in canvas:', element.properties.src);
      setImageLoaded(false);
      setLoadedImage(null);
    };
  }, [element.properties.src]);

  const handleDragEnd = (e: any) => {
    updateElement(element.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    updateElement(element.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
    });
  };

  // Calculate image rendering based on fit mode
  const getImageConfig = () => {
    if (!loadedImage) return {};

    const imgWidth = loadedImage.naturalWidth;
    const imgHeight = loadedImage.naturalHeight;
    const boxWidth = element.width;
    const boxHeight = element.height;
    const imgRatio = imgWidth / imgHeight;
    const boxRatio = boxWidth / boxHeight;

    const baseConfig = {
      id: element.id,
      x: element.x,
      y: element.y,
      rotation: element.rotation,
      opacity: element.opacity,
      draggable: !element.locked,
      onClick: () => selectElement(element.id),
      onTap: () => selectElement(element.id),
      onDragEnd: handleDragEnd,
      onTransformEnd: handleTransformEnd,
      stroke: isSelected ? '#3B82F6' : undefined,
      strokeWidth: isSelected ? 2 : 0,
    };

    switch (element.properties.fit) {
      case 'cover': {
        // Scale to cover, crop overflow
        if (imgRatio > boxRatio) {
          const scale = boxHeight / imgHeight;
          const scaledWidth = imgWidth * scale;
          const cropX = (scaledWidth - boxWidth) / 2 / scale;
          return {
            ...baseConfig,
            width: boxWidth,
            height: boxHeight,
            crop: {
              x: cropX,
              y: 0,
              width: imgWidth - cropX * 2,
              height: imgHeight,
            },
          };
        } else {
          const scale = boxWidth / imgWidth;
          const scaledHeight = imgHeight * scale;
          const cropY = (scaledHeight - boxHeight) / 2 / scale;
          return {
            ...baseConfig,
            width: boxWidth,
            height: boxHeight,
            crop: {
              x: 0,
              y: cropY,
              width: imgWidth,
              height: imgHeight - cropY * 2,
            },
          };
        }
      }

      case 'contain': {
        // Fit inside box
        if (imgRatio > boxRatio) {
          const scale = boxWidth / imgWidth;
          const scaledHeight = imgHeight * scale;
          const offsetY = (boxHeight - scaledHeight) / 2;
          return {
            ...baseConfig,
            x: element.x,
            y: element.y + offsetY,
            width: boxWidth,
            height: scaledHeight,
          };
        } else {
          const scale = boxHeight / imgHeight;
          const scaledWidth = imgWidth * scale;
          const offsetX = (boxWidth - scaledWidth) / 2;
          return {
            ...baseConfig,
            x: element.x + offsetX,
            y: element.y,
            width: scaledWidth,
            height: boxHeight,
          };
        }
      }

      case 'none': {
        // Original size, centered
        const displayWidth = Math.min(imgWidth, boxWidth);
        const displayHeight = Math.min(imgHeight, boxHeight);
        const offsetX = (boxWidth - displayWidth) / 2;
        const offsetY = (boxHeight - displayHeight) / 2;
        const cropX = imgWidth > boxWidth ? (imgWidth - boxWidth) / 2 : 0;
        const cropY = imgHeight > boxHeight ? (imgHeight - boxHeight) / 2 : 0;

        return {
          ...baseConfig,
          x: element.x + offsetX,
          y: element.y + offsetY,
          width: displayWidth,
          height: displayHeight,
          crop: {
            x: cropX,
            y: cropY,
            width: displayWidth,
            height: displayHeight,
          },
        };
      }

      case 'fill':
      default:
        // Stretch to fill
        return {
          ...baseConfig,
          width: boxWidth,
          height: boxHeight,
        };
    }
  };

  // Calculate frame dimensions
  const frameConfig = element.properties.frame;
  const hasFrame = frameConfig && frameConfig.style !== 'none';
  const frameWidth = hasFrame ? frameConfig.width : 0;
  const totalWidth = element.width + (frameWidth * 2);
  const totalHeight = element.height + (frameWidth * 2);

  return (
    <>
      {/* Frame/Border Background */}
      {hasFrame && imageLoaded && (
        <>
          {/* Outer frame */}
          <Rect
            x={element.x - frameWidth}
            y={element.y - frameWidth}
            width={totalWidth}
            height={totalHeight}
            fill={frameConfig.color}
            rotation={element.rotation}
            listening={false}
            shadowColor={frameConfig.shadowEnabled ? 'rgba(0,0,0,0.3)' : undefined}
            shadowBlur={frameConfig.shadowEnabled ? 10 : 0}
            shadowOffsetX={frameConfig.shadowEnabled ? 2 : 0}
            shadowOffsetY={frameConfig.shadowEnabled ? 2 : 0}
          />

          {/* Inner frame for double frame style */}
          {frameConfig.style === 'double' && frameConfig.innerColor && (
            <Rect
              x={element.x - frameWidth * 0.5}
              y={element.y - frameWidth * 0.5}
              width={element.width + frameWidth}
              height={element.height + frameWidth}
              fill={frameConfig.innerColor}
              rotation={element.rotation}
              listening={false}
            />
          )}

          {/* Ornate corners for ornate style */}
          {frameConfig.style === 'ornate' && (
            <>
              {/* Top-left corner decoration */}
              <Circle
                x={element.x - frameWidth}
                y={element.y - frameWidth}
                radius={frameWidth * 0.4}
                fill={frameConfig.innerColor || '#FFD700'}
                rotation={element.rotation}
                listening={false}
              />
              {/* Top-right corner decoration */}
              <Circle
                x={element.x + element.width + frameWidth}
                y={element.y - frameWidth}
                radius={frameWidth * 0.4}
                fill={frameConfig.innerColor || '#FFD700'}
                rotation={element.rotation}
                listening={false}
              />
              {/* Bottom-left corner decoration */}
              <Circle
                x={element.x - frameWidth}
                y={element.y + element.height + frameWidth}
                radius={frameWidth * 0.4}
                fill={frameConfig.innerColor || '#FFD700'}
                rotation={element.rotation}
                listening={false}
              />
              {/* Bottom-right corner decoration */}
              <Circle
                x={element.x + element.width + frameWidth}
                y={element.y + element.height + frameWidth}
                radius={frameWidth * 0.4}
                fill={frameConfig.innerColor || '#FFD700'}
                rotation={element.rotation}
                listening={false}
              />
            </>
          )}
        </>
      )}

      {/* Placeholder */}
      {!imageLoaded && (
        <>
          <Rect
            id={element.id}
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            rotation={element.rotation}
            opacity={element.opacity}
            fill="#F3F4F6"
            stroke={isSelected ? '#3B82F6' : '#D1D5DB'}
            strokeWidth={isSelected ? 2 : 1}
            dash={[5, 5]}
            draggable={!element.locked}
            onClick={() => selectElement(element.id)}
            onTap={() => selectElement(element.id)}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
          <KonvaText
            x={element.x}
            y={element.y + element.height / 2 - 10}
            width={element.width}
            height={20}
            text="📷 Imagem"
            fontSize={14}
            fontFamily="Arial"
            fill="#9CA3AF"
            align="center"
            verticalAlign="middle"
            listening={false}
          />
        </>
      )}

      {/* Image with fit mode applied */}
      {imageLoaded && (
        <KonvaImage
          ref={imageRef}
          {...getImageConfig()}
        />
      )}
    </>
  );
}

function CanvasElement({ element }: { element: Element }) {
  const { selectElement, updateElement, selectedElementId } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const elementRef = useRef<any>(null);

  // Apply elastic animation to all elements
  useElasticAnimation(elementRef, isSelected, {
    stiffness: 0.05,
    damping: 0.5,
    mass: 1,
  });

  const handleDragEnd = (e: any) => {
    updateElement(element.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    updateElement(element.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
    });
  };

  const commonProps = {
    ref: elementRef,
    id: element.id,
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    rotation: element.rotation,
    opacity: element.opacity,
    draggable: !element.locked,
    onClick: () => selectElement(element.id),
    onTap: () => selectElement(element.id),
    onDragEnd: handleDragEnd,
    onTransformEnd: handleTransformEnd,
  };

  if (element.type === 'text') {
    const textEl = element as TextElement;
    return (
      <KonvaText
        {...commonProps}
        text={textEl.properties.content}
        fontSize={textEl.properties.fontSize}
        fontFamily={getFontFamily(textEl.properties.fontFamily)}
        fill={textEl.properties.color}
        align={textEl.properties.textAlign}
        fontStyle={
          textEl.properties.fontStyle === 'italic'
            ? 'italic'
            : textEl.properties.fontWeight === 'bold'
            ? 'bold'
            : 'normal'
        }
        lineHeight={textEl.properties.lineHeight}
        letterSpacing={textEl.properties.letterSpacing}
        shadowColor={textEl.properties.shadow?.color}
        shadowBlur={textEl.properties.shadow?.blur}
        shadowOffsetX={textEl.properties.shadow?.offsetX}
        shadowOffsetY={textEl.properties.shadow?.offsetY}
        stroke={isSelected ? '#3B82F6' : undefined}
        strokeWidth={isSelected ? 2 : 0}
      />
    );
  }

  if (element.type === 'image') {
    return <ImageElement element={element as ImageElement} />;
  }

  if (element.type === 'shape') {
    const shapeEl = element as ShapeElement;

    if (shapeEl.properties.shapeType === 'rectangle') {
      return (
        <Rect
          {...commonProps}
          fill={shapeEl.properties.fill}
          strokeWidth={shapeEl.properties.stroke?.width || (isSelected ? 2 : 0)}
          stroke={isSelected ? '#3B82F6' : shapeEl.properties.stroke?.color}
          dash={shapeEl.properties.stroke?.dashArray}
          shadowColor={shapeEl.properties.shadow?.color}
          shadowBlur={shapeEl.properties.shadow?.blur}
          shadowOffsetX={shapeEl.properties.shadow?.offsetX}
          shadowOffsetY={shapeEl.properties.shadow?.offsetY}
        />
      );
    }

    if (shapeEl.properties.shapeType === 'circle') {
      return (
        <Circle
          {...commonProps}
          radius={Math.min(element.width, element.height) / 2}
          fill={shapeEl.properties.fill}
          strokeWidth={shapeEl.properties.stroke?.width || (isSelected ? 2 : 0)}
          stroke={isSelected ? '#3B82F6' : shapeEl.properties.stroke?.color}
          shadowColor={shapeEl.properties.shadow?.color}
          shadowBlur={shapeEl.properties.shadow?.blur}
          shadowOffsetX={shapeEl.properties.shadow?.offsetX}
          shadowOffsetY={shapeEl.properties.shadow?.offsetY}
        />
      );
    }
  }

  return (
    <Rect
      {...commonProps}
      fill="#E5E7EB"
      stroke={isSelected ? '#3B82F6' : '#9CA3AF'}
      strokeWidth={isSelected ? 2 : 1}
    />
  );
}

export function BuilderCanvas() {
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  const currentElements = useBuilderStore((state) => state.currentElements());
  const currentCanvasSize = useBuilderStore((state) => state.currentCanvasSize());
  const { zoom, gridVisible, selectElement, selectedElementId, deleteElement } = useBuilderStore();

  const { setNodeRef } = useDroppable({ id: 'canvas-drop-zone' });

  // DELETE KEY
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.contentEditable !== 'true') {
          e.preventDefault();
          deleteElement(selectedElementId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, deleteElement]);

  // Transformer
  useEffect(() => {
    if (transformerRef.current && stageRef.current) {
      const transformer = transformerRef.current;
      const stage = stageRef.current;

      if (selectedElementId) {
        const selectedNode = stage.findOne(`#${selectedElementId}`);
        if (selectedNode) {
          transformer.nodes([selectedNode]);
          transformer.getLayer().batchDraw();
        }
      } else {
        transformer.nodes([]);
        transformer.getLayer().batchDraw();
      }
    }
  }, [selectedElementId]);

  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      selectElement(null);
    }
  };

  const renderGrid = () => {
    if (!gridVisible) return null;

    const gridSize = 20;
    const lines: JSX.Element[] = [];

    for (let i = 0; i < currentCanvasSize.width / gridSize; i++) {
      lines.push(
        <Rect
          key={`v-${i}`}
          x={i * gridSize}
          y={0}
          width={1}
          height={currentCanvasSize.height}
          fill="#E5E7EB"
          listening={false}
        />
      );
    }

    for (let i = 0; i < currentCanvasSize.height / gridSize; i++) {
      lines.push(
        <Rect
          key={`h-${i}`}
          x={0}
          y={i * gridSize}
          width={currentCanvasSize.width}
          height={1}
          fill="#E5E7EB"
          listening={false}
        />
      );
    }

    return lines;
  };

  return (
    <div
      ref={setNodeRef}
      className="w-full h-full flex items-center justify-center p-8 bg-gray-200"
      style={{ position: 'relative', overflow: 'auto' }}
    >
      <div
        className="bg-white shadow-2xl"
        style={{
          width: `${currentCanvasSize.width}px`,
          height: `${currentCanvasSize.height}px`,
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out',
          position: 'relative',
        }}
      >
        <Stage
          ref={stageRef}
          width={currentCanvasSize.width}
          height={currentCanvasSize.height}
          onClick={handleStageClick}
          onTap={handleStageClick}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={currentCanvasSize.width}
              height={currentCanvasSize.height}
              fill="#FFFFFF"
              listening={false}
            />
            {renderGrid()}
            {currentElements
              .filter((el) => el.visible)
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((element) => (
                <CanvasElement key={element.id} element={element} />
              ))}
          </Layer>
          <Layer>
            <Transformer
              ref={transformerRef}
              rotateEnabled={true}
              enabledAnchors={[
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                'middle-left',
                'middle-right',
                'top-center',
                'bottom-center',
              ]}
              borderStroke="#3B82F6"
              borderStrokeWidth={2}
              anchorStroke="#3B82F6"
              anchorFill="#FFFFFF"
              anchorSize={8}
              anchorCornerRadius={4}
            />
          </Layer>
        </Stage>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span>{currentCanvasSize.width} × {currentCanvasSize.height}px</span>
          <span className="w-px h-4 bg-gray-300" />
          <span>{currentCanvasSize.preset}</span>
          <span className="w-px h-4 bg-gray-300" />
          <span>{currentElements.length} elementos</span>
          <span className="w-px h-4 bg-gray-300" />
          <span>{Math.round(zoom * 100)}% zoom</span>
        </div>
      </div>
    </div>
  );
}
