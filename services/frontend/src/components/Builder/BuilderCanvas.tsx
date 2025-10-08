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
import Konva from 'konva';

// Background component that handles both color and image backgrounds
function BackgroundRect({ background, width, height }: { background: any; width: number; height: number }) {
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const isObject = typeof background === 'object';
    if (isObject && background.type === 'image' && background.image) {
      const img = new window.Image();
      if (!background.image.includes('drive.google.com')) {
        img.crossOrigin = 'anonymous';
      }
      img.src = background.image;
      img.onload = () => setBgImage(img);
    } else {
      setBgImage(null);
    }
  }, [background]);

  const isObject = typeof background === 'object';

  if (isObject && background.type === 'image' && bgImage) {
    return (
      <KonvaImage
        x={0}
        y={0}
        width={width}
        height={height}
        image={bgImage}
        opacity={background.opacity || 1}
        listening={false}
      />
    );
  }

  const color = isObject && background.color ? background.color : (typeof background === 'string' ? background : '#FFFFFF');
  const opacity = isObject && background.opacity !== undefined ? background.opacity : 1;

  return (
    <Rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill={color}
      opacity={opacity}
      listening={false}
    />
  );
}

// Custom Konva filter for image border that respects alpha channel
// Based on: https://konvajs.org/docs/sandbox/Image_Border.html
// Source: https://gist.github.com/lavrton/abbf1878e95033020bc47536736e634e
function BorderFilter(this: any, imageData: ImageData) {
  const canvas = document.createElement('canvas');
  const tempCanvas = document.createElement('canvas');

  // Helper function to remove partial transparency
  function removeTransparency(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const nPixels = imageData.data.length;

    for (let i = 3; i < nPixels; i += 4) {
      if (imageData.data[i] > 0) {
        imageData.data[i] = 255;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  const nPixels = imageData.data.length;
  const ratio = this._cache?.canvas?.scene?.pixelRatio || 1;
  const size = (this.getAttr('borderSize') || 5) * ratio;

  canvas.width = imageData.width;
  canvas.height = imageData.height;
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;

  tempCanvas.getContext('2d')!.putImageData(imageData, 0, 0);
  removeTransparency(tempCanvas);

  const ctx = canvas.getContext('2d')!;
  const color = this.getAttr('borderColor') || '#000000';

  // Create border using shadow
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = size;
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();

  // Get processed data
  const shadowData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Blend shadow with original image
  const threshold1 = 50;
  const threshold2 = 100;

  for (let i = 3; i < nPixels; i += 4) {
    const alpha = shadowData.data[i];

    if (alpha > threshold1 && alpha < threshold2) {
      // Border area - apply border color
      const hex = color.replace('#', '');
      shadowData.data[i - 3] = parseInt(hex.slice(0, 2), 16);
      shadowData.data[i - 2] = parseInt(hex.slice(2, 4), 16);
      shadowData.data[i - 1] = parseInt(hex.slice(4, 6), 16);
      shadowData.data[i] = 255;
    } else if (alpha >= threshold2) {
      // Inside image - keep original
      shadowData.data[i - 3] = imageData.data[i - 3];
      shadowData.data[i - 2] = imageData.data[i - 2];
      shadowData.data[i - 1] = imageData.data[i - 1];
      shadowData.data[i] = imageData.data[i];
    } else {
      // Outside - transparent
      shadowData.data[i] = 0;
    }
  }

  // Write processed data back
  for (let i = 0; i < nPixels; i++) {
    imageData.data[i] = shadowData.data[i];
  }
}

// Image element with fit modes (cover, contain, fill, none)
function ImageElement({ element }: { element: ImageElement }) {
  const { selectElement, updateElement, selectedElementId } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const imageRef = useRef<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  // Apply elastic animation after image loads
  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      const node = imageRef.current;

      const handleDragStart = () => {
        const currentScaleX = node.scaleX() || 1;
        const currentScaleY = node.scaleY() || 1;

        node.to({
          scaleX: currentScaleX * 1.1,
          scaleY: currentScaleY * 1.1,
          shadowOffsetX: 15,
          shadowOffsetY: 15,
          duration: 0.1,
        });

        node.setAttr('__originalScaleX', currentScaleX);
        node.setAttr('__originalScaleY', currentScaleY);
      };

      const handleDragEnd = () => {
        const originalScaleX = node.getAttr('__originalScaleX') || 1;
        const originalScaleY = node.getAttr('__originalScaleY') || 1;

        new Konva.Tween({
          node: node,
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          scaleX: originalScaleX,
          scaleY: originalScaleY,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
        }).play();
      };

      node.on('dragstart', handleDragStart);
      node.on('dragend', handleDragEnd);

      return () => {
        node.off('dragstart', handleDragStart);
        node.off('dragend', handleDragEnd);
      };
    }
  }, [imageLoaded]);

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

        // Apply alpha border filter if enabled
        if (element.properties.alphaBorder?.enabled) {
          imageRef.current.cache();
          imageRef.current.filters([BorderFilter]);
          imageRef.current.setAttrs({
            borderSize: element.properties.alphaBorder.size,
            borderColor: element.properties.alphaBorder.color,
          });
        }

        imageRef.current.getLayer()?.batchDraw();
      }
    };
    img.onerror = () => {
      console.error('Failed to load image in canvas:', element.properties.src);
      setImageLoaded(false);
      setLoadedImage(null);
    };
  }, [element.properties.src, element.properties.alphaBorder]);

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
      // Shadow support
      shadowColor: element.properties.shadow?.color,
      shadowBlur: element.properties.shadow?.blur,
      shadowOffsetX: element.properties.shadow?.offsetX,
      shadowOffsetY: element.properties.shadow?.offsetY,
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

  return (
    <>
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
    scaleFactor: 1.1,
    duration: 0.5,
    shadowOffset: 15,
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
  const currentPage = useBuilderStore((state) => state.pages.find(p => p.id === state.currentPageId));
  const { zoom, gridVisible, selectElement, selectedElementId, deleteElement } = useBuilderStore();

  const { setNodeRef } = useDroppable({ id: 'canvas-drop-zone' });

  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-scroll when dragging near edges
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const EDGE_OFFSET = 50;
    const SCROLL_SPEED = 5;

    const handleDragStart = (e: any) => {
      scrollIntervalRef.current = setInterval(() => {
        const pos = stage.getPointerPosition();
        if (!pos) return;

        const stageWidth = stage.width();
        const stageHeight = stage.height();
        const container = stage.container().parentElement;
        if (!container) return;

        let scrollX = 0;
        let scrollY = 0;

        if (pos.x < EDGE_OFFSET) {
          scrollX = -SCROLL_SPEED;
        } else if (pos.x > stageWidth - EDGE_OFFSET) {
          scrollX = SCROLL_SPEED;
        }

        if (pos.y < EDGE_OFFSET) {
          scrollY = -SCROLL_SPEED;
        } else if (pos.y > stageHeight - EDGE_OFFSET) {
          scrollY = SCROLL_SPEED;
        }

        if (scrollX !== 0 || scrollY !== 0) {
          container.scrollLeft += scrollX;
          container.scrollTop += scrollY;

          const target = e.target;
          target.x(target.x() - scrollX);
          target.y(target.y() - scrollY);
        }
      }, 16);
    };

    const handleDragEnd = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    stage.on('dragstart', handleDragStart);
    stage.on('dragend', handleDragEnd);

    return () => {
      stage.off('dragstart', handleDragStart);
      stage.off('dragend', handleDragEnd);
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

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
            {/* Canvas Background */}
            <BackgroundRect
              background={currentPage?.background || '#FFFFFF'}
              width={currentCanvasSize.width}
              height={currentCanvasSize.height}
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
