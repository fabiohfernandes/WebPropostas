// ============================================================================
// Template Builder - Canvas Component (Konva.js)
// AURELIA (Design System) + NOVA (Frontend)
// A4 + TRANSFORMER + IMAGE PLACEHOLDER + FIT MODES
// ============================================================================

'use client';

import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Text as KonvaText, Image as KonvaImage, Transformer, Group, Shape } from 'react-konva';
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { getFontFamily } from '@/utils/fonts';
import { useElasticAnimation } from '@/hooks/useElasticAnimation';
import type { Element, TextElement, ShapeElement, ImageElement, FormElement, IconElement, FrameElement } from '@/types/builder';
import Konva from 'konva';
import { renderToString } from 'react-dom/server';
import * as LucideIcons from 'lucide-react';

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
  const { selectElement, updateElement, selectedElementId, currentElements } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const imageRef = useRef<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  // Check if this is a temporary image (created during frame transform)
  const isTemporaryImage = element.id.startsWith('temp-image-');

  // Check if any frame is in edit mode - if so, temp images should be interactive
  const frameInEditMode = currentElements().find(el =>
    el.type === 'frame' && (el as FrameElement).properties.editMode
  );
  const isEditModeImage = isTemporaryImage && frameInEditMode;

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

  // Calculate image rendering based on fit mode (relative to Group at 0,0)
  const getImageConfig = () => {
    if (!loadedImage) return {};

    const imgWidth = loadedImage.naturalWidth;
    const imgHeight = loadedImage.naturalHeight;
    const boxWidth = element.width;
    const boxHeight = element.height;
    const imgRatio = imgWidth / imgHeight;
    const boxRatio = boxWidth / boxHeight;

    const baseConfig = {
      listening: false,
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
            x: 0,
            y: 0,
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
            x: 0,
            y: 0,
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
            x: 0,
            y: offsetY,
            width: boxWidth,
            height: scaledHeight,
          };
        } else {
          const scale = boxHeight / imgHeight;
          const scaledWidth = imgWidth * scale;
          const offsetX = (boxWidth - scaledWidth) / 2;
          return {
            ...baseConfig,
            x: offsetX,
            y: 0,
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
          x: offsetX,
          y: offsetY,
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
          x: 0,
          y: 0,
          width: boxWidth,
          height: boxHeight,
        };
    }
  };

  return (
    <Group
      id={element.id}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      offsetX={element.width / 2}
      offsetY={element.height / 2}
      rotation={element.rotation}
      opacity={element.opacity}
      draggable={!element.locked && (!isTemporaryImage || isEditModeImage)}
      listening={!isTemporaryImage || isEditModeImage} // Edit mode images ARE interactive
      onClick={() => (!isTemporaryImage || isEditModeImage) && selectElement(element.id)}
      onTap={() => (!isTemporaryImage || isEditModeImage) && selectElement(element.id)}
      onDragStart={() => (!isTemporaryImage || isEditModeImage) && selectElement(element.id)}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    >
      {/* Placeholder */}
      {!imageLoaded && (
        <>
          <Rect
            x={0}
            y={0}
            width={element.width}
            height={element.height}
            fill="#F3F4F6"
            stroke={isSelected ? '#3B82F6' : '#D1D5DB'}
            strokeWidth={isSelected ? 2 : 1}
            dash={[5, 5]}
          />
          <KonvaText
            x={0}
            y={element.height / 2 - 10}
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
        <>
          {/* Hit area for click detection */}
          <Rect
            x={0}
            y={0}
            width={element.width}
            height={element.height}
            fill="transparent"
          />
          <KonvaImage
            ref={imageRef}
            {...getImageConfig()}
          />
        </>
      )}
    </Group>
  );
}

// Icon SVG path data
function getIconPath(iconName: string): string {
  const paths: Record<string, string> = {
    // Arrows
    'arrow-up': '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    'arrow-down': '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
    'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    'arrow-up-right': '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
    'arrow-down-left': '<line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/>',
    'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    'trending-down': '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',

    // Real Estate
    're-home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    're-building': '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    're-map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    're-key': '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
    're-bed': '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
    're-car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',

    // Automotive
    'auto-car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    'auto-fuel': '<line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
    'auto-gauge': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    'auto-zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',

    // Business
    'briefcase': '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'award': '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',

    // UI
    'check': '<polyline points="20 6 9 17 4 12"/>',
    'x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    'heart': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',

    // Nature
    'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    'leaf': '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  };

  return paths[iconName] || '<circle cx="12" cy="12" r="10"/>';
}

// Icon name mapping utility
function getIconComponentName(iconName: string): string {
  // Handle special cases and aliases
  const iconMap: Record<string, string> = {
    'trending-up': 'TrendingUp',
    'trending-down': 'TrendingDown',
    'arrow-up': 'ArrowUp',
    'arrow-down': 'ArrowDown',
    'arrow-left': 'ArrowLeft',
    'arrow-right': 'ArrowRight',
    'arrow-up-right': 'ArrowUpRight',
    'arrow-down-left': 'ArrowDownLeft',
    'move-up-right': 'MoveUpRight',
    'corner-up-right': 'CornerUpRight',
    'bar-chart': 'BarChart3',
    'pie-chart': 'PieChart',
    'alert-circle': 'AlertCircle',
    're-home': 'Home',
    're-building': 'Building',
    're-map-pin': 'MapPin',
    're-key': 'Key',
    're-door-open': 'DoorOpen',
    're-bed': 'Bed',
    're-bath': 'Bath',
    're-car': 'Car',
    're-trees': 'Trees',
    're-warehouse': 'Warehouse',
    'auto-car': 'Car',
    'auto-fuel': 'Fuel',
    'auto-gauge': 'Gauge',
    'auto-wrench': 'Wrench',
    'auto-zap': 'Zap',
    'auto-shield': 'Shield',
  };

  if (iconMap[iconName]) {
    return iconMap[iconName];
  }

  // Convert kebab-case to PascalCase
  return iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function IconElementRenderer({ element }: { element: IconElement }) {
  const { selectElement, updateElement, selectedElementId } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const groupRef = useRef<any>(null);
  const [iconImage, setIconImage] = useState<HTMLImageElement | null>(null);

  // Apply elastic animation
  useElasticAnimation(groupRef, isSelected, {
    scaleFactor: 1.05,
    duration: 0.5,
    shadowOffset: 10,
  });

  // Convert SVG icon to image
  useEffect(() => {
    const iconComponentName = getIconComponentName(element.properties.iconName);
    const IconComponent = (LucideIcons as any)[iconComponentName];

    if (!IconComponent) {
      console.warn(`Icon ${element.properties.iconName} (${iconComponentName}) not found in lucide-react`);
      return;
    }

    const size = Math.min(element.width, element.height);

    // Create SVG manually instead of using renderToString
    const svgString = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${size}"
        height="${size}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="${element.properties.color}"
        stroke-width="${element.properties.strokeWidth || 2}"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        ${getIconPath(element.properties.iconName)}
      </svg>
    `;

    // Convert SVG to data URL
    const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svg);

    // Load as image
    const img = new window.Image();
    img.onload = () => {
      setIconImage(img);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      console.error('Failed to load icon image:', element.properties.iconName);
      URL.revokeObjectURL(url);
    };
    img.src = url;

    return () => {
      if (iconImage) {
        URL.revokeObjectURL(url);
      }
    };
  }, [element.properties.iconName, element.properties.color, element.properties.strokeWidth, element.width, element.height]);

  const handleDragEnd = (e: any) => {
    updateElement(element.id, {
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Calculate new dimensions based on current element dimensions (not node.width/height)
    const newWidth = Math.max(5, element.width * scaleX);
    const newHeight = Math.max(5, element.height * scaleY);

    // Reset scale to 1
    node.scaleX(1);
    node.scaleY(1);

    updateElement(element.id, {
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
      x: node.x(),
      y: node.y(),
      width: newWidth,
      height: newHeight,
      rotation: node.rotation(),
    });
  };

  return (
    <Group
      ref={groupRef}
      id={element.id}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      offsetX={element.width / 2}
      offsetY={element.height / 2}
      rotation={element.rotation}
      opacity={element.opacity}
      draggable={!element.locked}
      onClick={() => selectElement(element.id)}
      onTap={() => selectElement(element.id)}
      onDragStart={() => selectElement(element.id)}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      onDragStart={() => selectElement(element.id)}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    >
      {iconImage && (
        <KonvaImage
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          image={iconImage}
          shadowColor={element.properties.shadow?.color}
          shadowBlur={element.properties.shadow?.blur}
          shadowOffsetX={element.properties.shadow?.offsetX}
          shadowOffsetY={element.properties.shadow?.offsetY}
        />
      )}
      {isSelected && (
        <Rect
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          stroke="#3B82F6"
          strokeWidth={2}
          listening={false}
        />
      )}
    </Group>
  );
}

function FormElementRenderer({ element }: { element: FormElement }) {
  const { selectElement, updateElement, selectedElementId } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const groupRef = useRef<any>(null);
  const [formImage, setFormImage] = useState<HTMLImageElement | null>(null);

  // Apply elastic animation
  useElasticAnimation(groupRef, isSelected, {
    scaleFactor: 1.05,
    duration: 0.5,
    shadowOffset: 10,
  });

  // Load optional image
  useEffect(() => {
    if (element.properties.image?.enabled && element.properties.image?.src) {
      const img = new window.Image();
      if (!element.properties.image.src.includes('drive.google.com')) {
        img.crossOrigin = 'anonymous';
      }
      img.src = element.properties.image.src;
      img.onload = () => setFormImage(img);
      img.onerror = () => setFormImage(null);
    } else {
      setFormImage(null);
    }
  }, [element.properties.image?.enabled, element.properties.image?.src]);

  const handleDragEnd = (e: any) => {
    updateElement(element.id, {
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
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
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
    });
  };

  const textProps = element.properties.text;
  const border = element.properties.border;
  const shadow = element.properties.shadow;

  // Calculate text Y position based on vertical alignment
  const getTextY = () => {
    const totalPadding = textProps.padding * 2;
    const availableHeight = element.height - totalPadding;

    switch (textProps.verticalAlign) {
      case 'top':
        return textProps.padding;
      case 'bottom':
        return element.height - textProps.padding - textProps.fontSize;
      case 'middle':
      default:
        return (element.height - textProps.fontSize) / 2;
    }
  };

  return (
    <Group
      ref={groupRef}
      id={element.id}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      offsetX={element.width / 2}  // Center pivot for rotation/transform
      offsetY={element.height / 2} // Center pivot for rotation/transform
      rotation={element.rotation}
      opacity={element.opacity}
      draggable={!element.locked}
      onDragStart={() => selectElement(element.id)}  // Select on drag start
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    >
      {/* Hit Area - invisible rectangle to capture clicks */}
      <Rect
        x={0}
        y={0}
        width={element.width}
        height={element.height}
        fill="transparent"
        onClick={() => selectElement(element.id)}
        onTap={() => selectElement(element.id)}
      />

      {/* Background Image (if enabled and position is background) */}
      {formImage && element.properties.image?.position === 'background' && (
        <Rect
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          fillPatternImage={formImage}
          fillPatternScaleX={element.width / formImage.naturalWidth}
          fillPatternScaleY={element.height / formImage.naturalHeight}
          opacity={element.properties.image?.opacity || 1}
          cornerRadius={element.properties.cornerRadius}
          listening={false}
        />
      )}

      {/* Background Rectangle */}
      <Rect
        x={0}
        y={0}
        width={element.width}
        height={element.height}
        fill={element.properties.backgroundColor}
        opacity={element.properties.backgroundOpacity}
        cornerRadius={element.properties.cornerRadius}
        shadowEnabled={shadow?.enabled}
        shadowColor={shadow?.color}
        shadowBlur={shadow?.blur}
        shadowOffsetX={shadow?.offsetX}
        shadowOffsetY={shadow?.offsetY}
        listening={false}
      />

      {/* Border */}
      {border.enabled && (
        <Rect
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          stroke={border.color}
          strokeWidth={border.width}
          opacity={border.opacity}
          cornerRadius={element.properties.cornerRadius}
          listening={false}
        />
      )}

      {/* Text Content */}
      <KonvaText
        x={textProps.padding}
        y={getTextY()}
        width={element.width - (textProps.padding * 2)}
        text={textProps.content}
        fontSize={textProps.fontSize}
        fontFamily={getFontFamily(textProps.fontFamily)}
        fontStyle={typeof textProps.fontWeight === 'string' && textProps.fontWeight === 'bold' ? 'bold' : 'normal'}
        fill={textProps.color}
        align={textProps.align}
        listening={false}
      />

      {/* Overlay Image (if enabled and position is overlay) */}
      {formImage && element.properties.image?.position === 'overlay' && (
        <Rect
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          fillPatternImage={formImage}
          fillPatternScaleX={element.width / formImage.naturalWidth}
          fillPatternScaleY={element.height / formImage.naturalHeight}
          opacity={element.properties.image?.opacity || 1}
          cornerRadius={element.properties.cornerRadius}
          listening={false}
        />
      )}

      {/* Selection Border */}
      {isSelected && (
        <Rect
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          stroke="#3B82F6"
          strokeWidth={2}
          cornerRadius={element.properties.cornerRadius}
          listening={false}
        />
      )}
    </Group>
  );
}



function FrameElementRenderer({ element, isDropTarget }: { element: FrameElement; isDropTarget?: boolean }) {
  const { selectElement, updateElement, selectedElementId, elements, addElement, deleteElement } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const groupRef = useRef<any>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const tempImageIdRef = useRef<string | null>(null);

  // Load image if present
  useEffect(() => {
    if (element.properties.image?.src) {
      console.log('🖼️ Loading image for frame:', element.id, element.properties.image.src);
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = element.properties.image.src;
      img.onload = () => {
        console.log('✅ Image loaded:', element.id, { width: img.width, height: img.height });
        setImageObj(img);
      };
      img.onerror = (e) => {
        console.error('❌ Image failed to load:', element.id, element.properties.image.src, e);
      };
    } else {
      setImageObj(null);
    }
  }, [element.properties.image?.src]);

  const handleDragEnd = (e: any) => {
    const newX = e.target.x();
    const newY = e.target.y();

    // Update frame position
    updateElement(element.id, {
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
      x: newX,
      y: newY,
    });

    // Pivot stays in normalized coordinates (0-1), so no recalculation needed
  };

  const handleTransformStart = (e: any) => {
    console.log('🔄 Transform started - extracting image to canvas');

    if (!element.properties.image || !imageObj) {
      console.log('⚠️ No image to extract');
      return;
    }

    setIsTransforming(true);

    const img = element.properties.image;

    // Calculate absolute canvas position of image
    const pivotAbsoluteX = element.x - element.width / 2 + (img.pivotX * element.width);
    const pivotAbsoluteY = element.y - element.height / 2 + (img.pivotY * element.height);

    const imageCenterX = pivotAbsoluteX;
    const imageCenterY = pivotAbsoluteY;

    const imageWidth = imageObj.width * img.scale;
    const imageHeight = imageObj.height * img.scale;

    console.log('📤 Extracting image:', {
      frameCenter: { x: element.x, y: element.y },
      frameSize: { w: element.width, h: element.height },
      pivot: { x: img.pivotX, y: img.pivotY },
      imageCenterOnCanvas: { x: imageCenterX, y: imageCenterY },
      imageSize: { w: imageWidth, h: imageHeight }
    });

    // Create temporary standalone image element at same position
    const tempImageId = `temp-image-${Date.now()}`;
    tempImageIdRef.current = tempImageId;

    const tempImageElement: ImageElement = {
      id: tempImageId,
      type: 'image',
      x: imageCenterX,
      y: imageCenterY,
      width: imageWidth,
      height: imageHeight,
      rotation: element.rotation,
      opacity: 0.5, // Semi-transparent to show it's temporary
      zIndex: element.zIndex - 1, // Place BELOW frame so frame border is visible // Way above everything else
      locked: true, // Lock it so user can't drag it
      visible: true,
      properties: {
        src: img.src,
        fit: img.fit,
      },
    };

    addElement(tempImageElement);

    // IMPORTANT: Re-select the frame immediately so transformer stays on frame
    selectElement(element.id);

    console.log('✅ Temporary image created on canvas:', tempImageId);
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const newWidth = Math.max(5, node.width() * scaleX);
    const newHeight = Math.max(5, node.height() * scaleY);
    const newX = node.x();
    const newY = node.y();

    console.log('✅ Transform ended - re-inserting image into frame');

    // Get temporary image element from store
    if (tempImageIdRef.current) {
      const { currentElements } = useBuilderStore.getState();
      const tempImage = currentElements().find(el => el.id === tempImageIdRef.current) as ImageElement | undefined;

      if (tempImage) {
        // Calculate new pivot based on temp image's absolute position
        const imageCenterX = tempImage.x;
        const imageCenterY = tempImage.y;

        // New frame bounds (center-registered)
        const newFrameCenterX = newX;
        const newFrameCenterY = newY;

        // Relative position from new frame center
        const relativeX = imageCenterX - newFrameCenterX;
        const relativeY = imageCenterY - newFrameCenterY;

        // Convert to normalized coordinates (0-1)
        const newPivotX = 0.5 + (relativeX / newWidth);
        const newPivotY = 0.5 + (relativeY / newHeight);

        console.log('📐 Re-calculated pivot:', {
          newFrameCenter: { x: newFrameCenterX, y: newFrameCenterY },
          newFrameSize: { w: newWidth, h: newHeight },
          imageCenter: { x: imageCenterX, y: imageCenterY },
          newPivot: { x: newPivotX, y: newPivotY }
        });

        // Update frame with new size and updated pivot
        updateElement(element.id, {
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
          rotation: node.rotation(),
          properties: {
            ...element.properties,
            image: {
              ...element.properties.image!,
              pivotX: newPivotX,
              pivotY: newPivotY,
            },
          },
        });

        // Delete temporary image
        deleteElement(tempImageIdRef.current);
        console.log('🗑️ Deleted temporary image:', tempImageIdRef.current);
        tempImageIdRef.current = null;
      }
    } else {
      // No image, just update frame
      updateElement(element.id, {
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
        rotation: node.rotation(),
      });
    }

    setIsTransforming(false);
  };

  // Handle double-click to enter edit mode (extract image for repositioning)
  const handleClick = () => {
    selectElement(element.id);

    // Detect double-click
    setClickCount(prev => prev + 1);

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      if (clickCount >= 1) {
        // Double-click detected - extract image for editing
        if (element.properties.image && imageObj && !element.properties.editMode) {
          console.log('🖊️ Double-click detected - entering edit mode');
          enterEditMode();
        }
      }
      setClickCount(0);
    }, 300);
  };

  // Enter edit mode: extract image to canvas for repositioning/scaling
  const enterEditMode = () => {
    if (!element.properties.image || !imageObj) return;

    const img = element.properties.image;

    // Calculate absolute canvas position of image
    const pivotAbsoluteX = element.x - element.width / 2 + (img.pivotX * element.width);
    const pivotAbsoluteY = element.y - element.height / 2 + (img.pivotY * element.height);

    const imageCenterX = pivotAbsoluteX;
    const imageCenterY = pivotAbsoluteY;

    const imageWidth = imageObj.width * img.scale;
    const imageHeight = imageObj.height * img.scale;

    console.log('📤 Extracting image for editing:', {
      frameCenter: { x: element.x, y: element.y },
      frameSize: { w: element.width, h: element.height },
      pivot: { x: img.pivotX, y: img.pivotY },
      imageCenterOnCanvas: { x: imageCenterX, y: imageCenterY },
      imageSize: { w: imageWidth, h: imageHeight }
    });

    // Create temporary editable image element
    const tempImageId = `temp-image-${Date.now()}`;
    tempImageIdRef.current = tempImageId;

    const tempImageElement: ImageElement = {
      id: tempImageId,
      type: 'image',
      x: imageCenterX,
      y: imageCenterY,
      width: imageWidth,
      height: imageHeight,
      rotation: element.rotation,
      opacity: 1, // Full opacity for editing
      zIndex: element.zIndex - 1, // Place BELOW frame so frame border is visible
      locked: false, // NOT locked - user can drag and scale
      visible: true,
      properties: {
        src: img.src,
        fit: 'fill', // Use fill mode for editing to show full image
      },
    };

    addElement(tempImageElement);

    // IMPORTANT: Need to wait for next frame to select the temp image
    // Otherwise the frame steals the selection
    setTimeout(() => {
      selectElement(tempImageId);
      console.log('🎯 Selected temporary image for editing:', tempImageId);
    }, 50);

    // Mark frame as in edit mode and boost its z-index
    updateElement(element.id, {
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
      properties: {
        ...element.properties,
        editMode: true,
      },
    });

    console.log('✅ Edit mode activated - image extracted:', tempImageId);
  };

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  // Exit edit mode when ESC pressed or canvas clicked
  useEffect(() => {
    if (!element.properties.editMode || !tempImageIdRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('⌨️ ESC pressed - exiting edit mode');
        exitEditMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [element.properties.editMode, tempImageIdRef.current]);

  // Exit edit mode: re-insert image into frame
  const exitEditMode = () => {
    if (!tempImageIdRef.current) return;

    console.log('📥 Exiting edit mode - re-inserting image');

    const { currentElements } = useBuilderStore.getState();
    const tempImage = currentElements().find(el => el.id === tempImageIdRef.current) as ImageElement | undefined;

    if (tempImage) {
      // Calculate new pivot based on temp image's position
      const imageCenterX = tempImage.x;
      const imageCenterY = tempImage.y;

      const frameCenterX = element.x;
      const frameCenterY = element.y;

      // Relative position from frame center
      const relativeX = imageCenterX - frameCenterX;
      const relativeY = imageCenterY - frameCenterY;

      // Convert to normalized coordinates (0-1)
      const newPivotX = 0.5 + (relativeX / element.width);
      const newPivotY = 0.5 + (relativeY / element.height);

      // Calculate new scale based on temp image size
      const newScale = tempImage.width / imageObj!.width;

      console.log('📐 Re-calculated for edit mode:', {
        frameCenter: { x: frameCenterX, y: frameCenterY },
        imageCenter: { x: imageCenterX, y: imageCenterY },
        newPivot: { x: newPivotX, y: newPivotY },
        newScale: newScale
      });

      // Update frame with new image position and scale
      updateElement(element.id, {
      zIndex: element.zIndex - 10000, // Restore original z-index
        properties: {
          ...element.properties,
          image: {
            ...element.properties.image!,
            pivotX: newPivotX,
            pivotY: newPivotY,
            scale: newScale,
          },
          editMode: false,
        },
      });

      // Delete temporary image
      deleteElement(tempImageIdRef.current);
      console.log('🗑️ Deleted temporary image:', tempImageIdRef.current);
      tempImageIdRef.current = null;

      // Re-select the frame
      selectElement(element.id);
    }
  };

  // Apply clip-path shape to canvas context
  const applyClipPath = (ctx: any, width: number, height: number) => {
    const clipPath = element.properties.clipPath;

    if (clipPath.startsWith('circle')) {
      const radius = Math.min(width, height) / 2;
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
    }
    else if (clipPath.startsWith('inset')) {
      const insetMatch = clipPath.match(/inset\(([^)]+)\)/);
      if (insetMatch) {
        const parts = insetMatch[1].split(/\s+/);
        let top = 0, right = 0, bottom = 0, left = 0;
        let cornerRadius = 0;

        const values = parts.filter(p => p.includes('%'));
        if (values.length >= 1) top = parseFloat(values[0]) / 100 * height;
        if (values.length >= 2) right = parseFloat(values[1]) / 100 * width;
        if (values.length >= 3) bottom = parseFloat(values[2]) / 100 * height;
        if (values.length >= 4) left = parseFloat(values[3]) / 100 * width;

        if (values.length === 1) {
          right = parseFloat(values[0]) / 100 * width;
          bottom = top;
          left = right;
        }

        const roundMatch = clipPath.match(/round\s+(\d+)px/);
        cornerRadius = roundMatch ? parseInt(roundMatch[1]) : 0;

        const insetWidth = width - left - right;
        const insetHeight = height - top - bottom;
        const maxRadius = Math.min(insetWidth, insetHeight) / 2;

        if (cornerRadius >= 999 || cornerRadius > maxRadius) {
          cornerRadius = maxRadius;
        }

        const x1 = left;
        const y1 = top;
        const x2 = width - right;
        const y2 = height - bottom;

        if (cornerRadius > 0) {
          ctx.moveTo(x1 + cornerRadius, y1);
          ctx.lineTo(x2 - cornerRadius, y1);
          ctx.quadraticCurveTo(x2, y1, x2, y1 + cornerRadius);
          ctx.lineTo(x2, y2 - cornerRadius);
          ctx.quadraticCurveTo(x2, y2, x2 - cornerRadius, y2);
          ctx.lineTo(x1 + cornerRadius, y2);
          ctx.quadraticCurveTo(x1, y2, x1, y2 - cornerRadius);
          ctx.lineTo(x1, y1 + cornerRadius);
          ctx.quadraticCurveTo(x1, y1, x1 + cornerRadius, y1);
        } else {
          ctx.rect(x1, y1, x2 - x1, y2 - y1);
        }
      }
    }
    else if (clipPath.startsWith('polygon')) {
      const pointsMatch = clipPath.match(/polygon\(([^)]+)\)/);
      if (pointsMatch) {
        const points = pointsMatch[1].split(',').map(p => {
          const [x, y] = p.trim().split(/\s+/);
          return {
            x: parseFloat(x) / 100 * width,
            y: parseFloat(y) / 100 * height,
          };
        });

        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.closePath();
        }
      }
    }
    else if (clipPath.startsWith('path')) {
      if (clipPath.includes('21.35')) {
        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height) / 24;

        ctx.moveTo(cx, cy + 9 * scale);
        ctx.bezierCurveTo(
          cx - 5 * scale, cy + 5 * scale,
          cx - 10 * scale, cy + 1 * scale,
          cx - 10 * scale, cy - 3 * scale
        );
        ctx.bezierCurveTo(
          cx - 10 * scale, cy - 7 * scale,
          cx - 7.5 * scale, cy - 9 * scale,
          cx - 5 * scale, cy - 9 * scale
        );
        ctx.bezierCurveTo(
          cx - 2.5 * scale, cy - 9 * scale,
          cx, cy - 7 * scale,
          cx, cy - 5 * scale
        );
        ctx.bezierCurveTo(
          cx, cy - 7 * scale,
          cx + 2.5 * scale, cy - 9 * scale,
          cx + 5 * scale, cy - 9 * scale
        );
        ctx.bezierCurveTo(
          cx + 7.5 * scale, cy - 9 * scale,
          cx + 10 * scale, cy - 7 * scale,
          cx + 10 * scale, cy - 3 * scale
        );
        ctx.bezierCurveTo(
          cx + 10 * scale, cy + 1 * scale,
          cx + 5 * scale, cy + 5 * scale,
          cx, cy + 9 * scale
        );
        ctx.closePath();
      } else {
        ctx.rect(0, 0, width, height);
      }
    }
    else {
      ctx.rect(0, 0, width, height);
    }
  };

  return (
    <Group
      ref={groupRef}
      id={element.id}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      offsetX={element.width / 2}
      offsetY={element.height / 2}
      rotation={element.rotation}
      opacity={element.opacity}
      draggable={!element.locked && !element.properties.editMode}
      listening={!element.properties.editMode}
      onClick={handleClick}
      onTap={handleClick}
      onDragStart={() => selectElement(element.id)}
      onDragEnd={handleDragEnd}
      onTransformStart={handleTransformStart}
      onTransformEnd={handleTransformEnd}
    >
      <Shape
        x={0}
        y={0}
        width={element.width}
        height={element.height}
        sceneFunc={(ctx, shape) => {
          const frameWidth = element.width;
          const frameHeight = element.height;

          ctx.save();

          ctx.beginPath();
          applyClipPath(ctx, frameWidth, frameHeight);
          ctx.closePath();
          ctx.clip();

          // Only render image if NOT transforming AND NOT in edit mode
          if (element.properties.image && imageObj && !isTransforming && !element.properties.editMode) {
            const img = element.properties.image;

            const pivotAbsoluteX = img.pivotX * frameWidth;
            const pivotAbsoluteY = img.pivotY * frameHeight;

            const imgX = pivotAbsoluteX - (imageObj.width * img.scale) / 2 + img.offsetX;
            const imgY = pivotAbsoluteY - (imageObj.height * img.scale) / 2 + img.offsetY;

            console.log('🎨 Drawing image in frame:', {
              frameId: element.id,
              frameSize: { w: frameWidth, h: frameHeight },
              pivot: { x: img.pivotX, y: img.pivotY },
              pivotAbsolute: { x: pivotAbsoluteX, y: pivotAbsoluteY },
              imageSize: { w: imageObj.width, h: imageObj.height },
              scale: img.scale,
              offset: { x: img.offsetX, y: img.offsetY },
              drawPos: { x: imgX, y: imgY },
              drawSize: { w: imageObj.width * img.scale, h: imageObj.height * img.scale }
            });

            ctx.drawImage(
              imageObj,
              imgX,
              imgY,
              imageObj.width * img.scale,
              imageObj.height * img.scale
            );
          }

          ctx.restore();

          ctx.beginPath();
          applyClipPath(ctx, frameWidth, frameHeight);
          ctx.closePath();

          if (!element.properties.image) {
            ctx.fillStyle = element.properties.fill;
            ctx.fill();
          }

          if (element.properties.borderStyle) {
            ctx.strokeStyle = element.properties.borderStyle.color;
            ctx.lineWidth = element.properties.borderStyle.width;
            ctx.stroke();
          }
        }}
        hitFunc={(ctx, shape) => {
          const frameWidth = element.width;
          const frameHeight = element.height;
          ctx.beginPath();
          applyClipPath(ctx, frameWidth, frameHeight);
          ctx.closePath();
          ctx.fillStrokeShape(shape);
        }}
      />

      {/* Frame overlay during edit mode - always visible */}
      {element.properties.editMode && (
        <Shape
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          listening={false}
          sceneFunc={(ctx, shape) => {
            const frameWidth = element.width;
            const frameHeight = element.height;

            ctx.beginPath();
            applyClipPath(ctx, frameWidth, frameHeight);
            ctx.closePath();

            // Semi-transparent frame border
            ctx.strokeStyle = "#F59E0B";
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 4]);
            ctx.stroke();
          }}
        />
      )}

      {isSelected && (
        <Rect
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          stroke={element.properties.editMode ? "#F59E0B" : "#3B82F6"}
          strokeWidth={2}
          dash={element.properties.editMode ? [5, 5] : undefined}
          listening={false}
        />
      )}

      {isDropTarget && (
        <Rect
          x={-10}
          y={-10}
          width={element.width + 20}
          height={element.height + 20}
          stroke="#10B981"
          strokeWidth={3}
          dash={[10, 5]}
          listening={false}
        />
      )}

      {isSelected && element.properties.editMode && (
        <KonvaText
          x={-element.width / 2}
          y={-element.height / 2 - 20}
          text="Edit Mode: Double-click to exit"
          fontSize={12}
          fill="#F59E0B"
          listening={false}
        />
      )}
    </Group>
  );
}

function CanvasElement({ element, onFrameHover, hoverFrameId }: { element: Element; onFrameHover?: (frameId: string | null) => void; hoverFrameId?: string | null }) {
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
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
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
      zIndex: element.zIndex + 10000, // Move frame above to stay visible
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
    offsetX: element.width / 2,  // Center pivot for rotation/transform
    offsetY: element.height / 2, // Center pivot for rotation/transform
    rotation: element.rotation,
    opacity: element.opacity,
    draggable: !element.locked,
    onClick: () => selectElement(element.id),
    onTap: () => selectElement(element.id),
    onDragStart: () => selectElement(element.id),  // Select on drag start
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

  if (element.type === 'form') {
    return <FormElementRenderer element={element as FormElement} />;
  }

  if (element.type === 'frame') {
    return (
      <FrameElementRenderer
        element={element as FrameElement}
        isDropTarget={hoverFrameId === element.id}
      />
    );
  }
  if (element.type === 'icon') {
    return <IconElementRenderer element={element as IconElement} />;
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
      // Circle uses x,y as center by default in Konva, so NO offset needed
      const { offsetX, offsetY, ...circleProps } = commonProps;
      return (
        <Circle
          {...circleProps}
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

interface BuilderCanvasProps {
  onFrameHover?: (frameId: string | null) => void;
  hoveredFrameFromLibrary?: string | null;
}

export function BuilderCanvas({ onFrameHover, hoveredFrameFromLibrary }: BuilderCanvasProps) {
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const justDraggedRef = useRef(false);

  const currentElements = useBuilderStore((state) => state.currentElements());
  const currentCanvasSize = useBuilderStore((state) => state.currentCanvasSize());
  const currentPage = useBuilderStore((state) => state.pages.find(p => p.id === state.currentPageId));
  const { zoom, gridVisible, selectElement, selectedElementId, deleteElement, addElement, insertionMode, setInsertionMode } = useBuilderStore();

  const { setNodeRef } = useDroppable({ id: 'canvas-drop-zone' });

  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hoverFrameId, setHoverFrameId] = useState<string | null>(null);
  const [draggingImageId, setDraggingImageId] = useState<string | null>(null);

  // Merge hover state from library drag and canvas element drag
  const activeHoverFrameId = hoveredFrameFromLibrary || hoverFrameId;

  // Pan state - using refs to avoid effect re-runs
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const spacePressedRef = useRef(false);
  const [cursorState, setCursorState] = useState<'default' | 'grab' | 'grabbing' | 'crosshair'>('default');

  // KEYBOARD SHORTCUTS - Track Ctrl key for touchpad pan
  const ctrlPressedRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true';

      // DELETE/BACKSPACE
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId && !isTyping) {
        e.preventDefault();
        deleteElement(selectedElementId);
      }

      // SPACE KEY for panning
      if (e.code === 'Space' && !isTyping) {
        e.preventDefault();
        spacePressedRef.current = true;
        setCursorState(isPanningRef.current ? 'grabbing' : 'grab');
      }

      // CTRL KEY for touchpad pan (better for notebooks)
      if (e.ctrlKey && !isTyping) {
        ctrlPressedRef.current = true;
        if (!isPanningRef.current) {
          setCursorState('grab');
        }
      }

      // ESC to cancel insertion mode
      if (e.key === 'Escape' && insertionMode) {
        setInsertionMode(null);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        spacePressedRef.current = false;
        isPanningRef.current = false;
        setCursorState(insertionMode ? 'crosshair' : 'default');
      }

      if (e.key === 'Control') {
        ctrlPressedRef.current = false;
        if (!isPanningRef.current) {
          setCursorState(insertionMode ? 'crosshair' : 'default');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectedElementId, deleteElement, insertionMode, setInsertionMode]);

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

          // Configure transformer to handle offset correctly
          transformer.boundBoxFunc(function(oldBox: any, newBox: any) {
            // Prevent negative or zero dimensions
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          });

          // Force update after render to account for offsetX/offsetY
          requestAnimationFrame(() => {
            transformer.forceUpdate();
            transformer.getLayer().batchDraw();
          });
        }
      } else {
        transformer.nodes([]);
        transformer.getLayer().batchDraw();
      }
    }
  }, [selectedElementId]);

  // IMAGE DROP ON FRAME DETECTION
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      console.log('⚠️ No stage ref available');
      return;
    }

    console.log('✅ Setting up drag event listeners on stage');

    const DROP_ZONE_PADDING = 50; // Bigger drop zone
    let currentDraggingImageId: string | null = null;

    const handleElementDragStart = (e: any) => {
      console.log('🟢 DRAG START EVENT FIRED', e);
      const draggedNode = e.target;
      const elementId = draggedNode.id();
      console.log('🟢 Element ID:', elementId);
      const element = currentElements.find(el => el.id === elementId);
      console.log('🟢 Found element:', element);

      if (element && element.type === 'image') {
        currentDraggingImageId = elementId;
        setDraggingImageId(elementId);
        console.log('✅ Started dragging IMAGE:', elementId);
      } else {
        console.log('❌ Not an image, ignoring. Type:', element?.type);
      }
    };

    const handleElementDragMove = (e: any) => {
      if (!currentDraggingImageId) {
        console.log('⚠️ No currentDraggingImageId set, skipping');
        return;
      }

      const draggedNode = e.target;
      const imageX = draggedNode.x();
      const imageY = draggedNode.y();

      // Check which frame we're hovering over
      let hoveredFrame: string | null = null;

      for (const el of currentElements) {
        if (el.type === 'frame') {
          const frame = el as FrameElement;

          // Calculate frame bounds with BIGGER drop zone
          const frameLeft = frame.x - frame.width / 2 - DROP_ZONE_PADDING;
          const frameRight = frame.x + frame.width / 2 + DROP_ZONE_PADDING;
          const frameTop = frame.y - frame.height / 2 - DROP_ZONE_PADDING;
          const frameBottom = frame.y + frame.height / 2 + DROP_ZONE_PADDING;

          // Check if image center is within expanded frame bounds
          if (imageX >= frameLeft && imageX <= frameRight &&
              imageY >= frameTop && imageY <= frameBottom) {
            hoveredFrame = frame.id;
            break;
          }
        }
      }

      setHoverFrameId(hoveredFrame);
    };

    const handleElementDragEnd = (e: any) => {
      console.log('🔴 DRAG END EVENT FIRED', e);
      const draggedNode = e.target;

      // Check if dragged element is an image
      const elementId = draggedNode.id();
      const element = currentElements.find(el => el.id === elementId);

      console.log('🔴 Drag end:', { elementId, elementType: element?.type });

      currentDraggingImageId = null;
      setDraggingImageId(null);
      setHoverFrameId(null);

      if (!element || element.type !== 'image') {
        console.log('❌ Not an image element, skipping');
        return;
      }

      const imageElement = element as ImageElement;

      // Skip frame insertion if this is a temporary edit-mode image
      if (imageElement.id.startsWith("temp-image-")) {
        console.log("⏭️ Skipping frame insertion for temporary edit-mode image");
        // Set flag to prevent immediate click-to-exit
        justDraggedRef.current = true;
        setTimeout(() => {
          justDraggedRef.current = false;
        }, 100);
        return;
      }

      // Get final position of dragged image
      const imageX = draggedNode.x();
      const imageY = draggedNode.y();

      console.log('📍 Image dropped at:', { imageX, imageY });

      // Check collision with all frames (using bigger drop zone)
      let targetFrame: FrameElement | null = null;

      for (const el of currentElements) {
        if (el.type === 'frame') {
          const frame = el as FrameElement;

          // Calculate frame bounds with BIGGER drop zone
          const frameLeft = frame.x - frame.width / 2 - DROP_ZONE_PADDING;
          const frameRight = frame.x + frame.width / 2 + DROP_ZONE_PADDING;
          const frameTop = frame.y - frame.height / 2 - DROP_ZONE_PADDING;
          const frameBottom = frame.y + frame.height / 2 + DROP_ZONE_PADDING;

          console.log('🔍 Checking frame:', {
            frameId: frame.id,
            bounds: { frameLeft, frameRight, frameTop, frameBottom },
            imagePos: { imageX, imageY },
            padding: DROP_ZONE_PADDING
          });

          // Check if image center is within expanded frame bounds
          if (imageX >= frameLeft && imageX <= frameRight &&
              imageY >= frameTop && imageY <= frameBottom) {
            targetFrame = frame;
            console.log('✅ Found target frame:', frame.id);
            break;
          }
        }
      }

      if (targetFrame) {
        console.log('🎯 Inserting image into frame:', targetFrame.id);

        // Calculate pivot point (normalized 0-1 relative to frame)
        const imageCenterX = imageX;
        const imageCenterY = imageY;
        const frameCenterX = targetFrame.x;
        const frameCenterY = targetFrame.y;

        // Relative position from frame center
        const relativeX = imageCenterX - frameCenterX;
        const relativeY = imageCenterY - frameCenterY;

        // Convert to normalized coordinates (0 to 1)
        // Center of frame is 0.5, 0.5
        const pivotX = 0.5 + (relativeX / targetFrame.width);
        const pivotY = 0.5 + (relativeY / targetFrame.height);

        console.log('📐 Calculated pivot:', { pivotX, pivotY, relativeX, relativeY });

        // Update frame with image
        const { updateElement, deleteElement } = useBuilderStore.getState();

        updateElement(targetFrame.id, {
          properties: {
            ...targetFrame.properties,
            image: {
              src: imageElement.properties.src,
              fit: imageElement.properties.fit || 'cover',
              offsetX: 0,
              offsetY: 0,
              scale: 1,
              pivotX: pivotX,
              pivotY: pivotY,
            },
            editMode: false,
          },
        });

        // Delete the original image element
        deleteElement(imageElement.id);

        // Select the frame
        selectElement(targetFrame.id);

        console.log('✅ Image inserted successfully');
      } else {
        console.log('❌ No frame found at drop position');
      }
    };

    stage.on('dragstart', handleElementDragStart);
    stage.on('dragmove', handleElementDragMove);
    stage.on('dragend', handleElementDragEnd);

    console.log('✅ Drag event listeners attached');

    return () => {
      console.log('🧹 Cleaning up drag event listeners');
      stage.off('dragstart', handleElementDragStart);
      stage.off('dragmove', handleElementDragMove);
      stage.off('dragend', handleElementDragEnd);
    };
  }, [currentElements, selectElement]);

  // Helper function to exit edit mode and re-insert image
  const exitEditModeViaClick = () => {
    const frameInEditMode = currentElements.find(el =>
      el.type === 'frame' && (el as FrameElement).properties.editMode
    ) as FrameElement | undefined;

    if (!frameInEditMode) return false;
    // Prevent immediate exit after drag ends (clicks get triggered on drag end)
    if (justDraggedRef.current) {
      console.log("🚫 Ignoring click - drag just ended");
      return false;
    }


    console.log('🖱️ Click detected - exiting edit mode for frame:', frameInEditMode.id);

    const tempImages = currentElements.filter(el => el.id.startsWith('temp-image-'));

    if (tempImages.length > 0) {
      const tempImage = tempImages[0] as ImageElement;
      const frameElement = frameInEditMode;

      // Calculate new pivot based on temp image's position
      const imageCenterX = tempImage.x;
      const imageCenterY = tempImage.y;
      const frameCenterX = frameElement.x;
      const frameCenterY = frameElement.y;

      const relativeX = imageCenterX - frameCenterX;
      const relativeY = imageCenterY - frameCenterY;

      const newPivotX = 0.5 + (relativeX / frameElement.width);
      const newPivotY = 0.5 + (relativeY / frameElement.height);

      // Calculate scale: temp image width divided by original image natural width
      const img = new window.Image();
      img.src = tempImage.properties.src;
      img.onload = () => {
        const newScale = tempImage.width / img.naturalWidth;

        console.log('📐 Click - re-calculated:', {
          frameCenter: { x: frameCenterX, y: frameCenterY },
          imageCenter: { x: imageCenterX, y: imageCenterY },
          newPivot: { x: newPivotX, y: newPivotY },
          newScale: newScale,
          tempImageWidth: tempImage.width,
          naturalWidth: img.naturalWidth
        });

        const { updateElement, deleteElement, selectElement } = useBuilderStore.getState();

        updateElement(frameElement.id, {
          zIndex: frameElement.zIndex - 10000, // Restore original z-index
          properties: {
            ...frameElement.properties,
            image: {
              ...frameElement.properties.image!,
              pivotX: newPivotX,
              pivotY: newPivotY,
              scale: newScale,
            },
            editMode: false,
          },
        });

        deleteElement(tempImage.id);
        selectElement(frameElement.id);
        console.log('✅ Edit mode exited via click');
      };
    }

    return true; // Indicate that edit mode was active
  };

  // PAN & CLICK-TO-INSERT HANDLERS
  const handleStageClick = (e: any) => {
    console.log('Stage click:', { target: e.target, insertionMode });

    // Check if any frame is in edit mode and exit it when clicking on stage
    const frameInEditMode = currentElements.find(el =>
      el.type === 'frame' && (el as FrameElement).properties.editMode
    ) as FrameElement | undefined;

    if (frameInEditMode) {
      const clickedElementId = e.target.id();
      const isTempImage = clickedElementId && clickedElementId.startsWith('temp-image-');
      const isFrame = clickedElementId === frameInEditMode.id;

      // Only exit edit mode if NOT clicking on temp image or frame
      if (isTempImage || isFrame) {
        console.log('🚫 Clicked on temp image or frame - staying in edit mode');
        return;
      }

      // Exit edit mode using helper function
      exitEditModeViaClick();
      return;
    }

    if (insertionMode) {
      // In insertion mode, insert element anywhere clicked (even over other elements)
      console.log('Insertion mode active, creating element');

      const stage = e.target.getStage();
      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) {
        console.log('No pointer position');
        return;
      }

      // Get element dimensions
      const width = insertionMode.defaultProps.width || 200;
      const height = insertionMode.defaultProps.height || 200;

      // With offsetX/offsetY set to width/2, height/2:
      // x,y represents the CENTER, so we use click position directly
      const x = pointerPos.x;
      const y = pointerPos.y;

      console.log('Creating element at:', { x, y, width, height, zoom });
      console.log('Insertion mode config:', insertionMode);

      // Create new element with proper structure
      const newElement = {
        id: `element-${Date.now()}`,
        type: insertionMode.type,
        x,
        y,
        width,
        height,
        rotation: insertionMode.defaultProps.rotation || 0,
        opacity: insertionMode.defaultProps.opacity || 1,
        zIndex: insertionMode.defaultProps.zIndex || 0,
        locked: insertionMode.defaultProps.locked || false,
        visible: insertionMode.defaultProps.visible !== false,
        properties: insertionMode.defaultProps.properties || {},
      } as Element;

      console.log('Element being created:', newElement);
      addElement(newElement);
      selectElement(newElement.id);
      setInsertionMode(null);
      console.log('Element created:', newElement.id);
    } else {
      // Normal mode - only deselect if clicking on stage (not on elements)
      if (e.target === e.target.getStage()) {
        selectElement(null);
      }
    }
  };

  // Update cursor when insertion mode changes
  useEffect(() => {
    if (insertionMode && !spacePressedRef.current && !isPanningRef.current) {
      setCursorState('crosshair');
    } else if (!insertionMode && !spacePressedRef.current && !isPanningRef.current) {
      setCursorState('default');
    }
  }, [insertionMode]);

  // Pan functionality via DOM events on container (not Konva events)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const container = stage.container();
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      const isMiddleButton = e.button === 1;
      const ctrlPressed = e.ctrlKey || ctrlPressedRef.current;

      console.log('Pan mousedown:', {
        spacePressed: spacePressedRef.current,
        ctrlPressed,
        isMiddleButton
      });

      // Pan mode: Space+Drag OR Ctrl+Drag OR Middle Mouse Button
      if (spacePressedRef.current || ctrlPressed || isMiddleButton) {
        e.preventDefault();
        e.stopPropagation();
        isPanningRef.current = true;
        setCursorState('grabbing');

        const scrollContainer = container.parentElement;
        if (scrollContainer) {
          panStartRef.current = {
            x: e.clientX + scrollContainer.scrollLeft,
            y: e.clientY + scrollContainer.scrollTop,
          };
          console.log('Pan started with:', {
            space: spacePressedRef.current,
            ctrl: ctrlPressed,
            middle: isMiddleButton,
            start: panStartRef.current
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanningRef.current) return;

      console.log('Pan moving');
      e.preventDefault();
      const scrollContainer = container.parentElement;
      if (scrollContainer) {
        scrollContainer.scrollLeft = panStartRef.current.x - e.clientX;
        scrollContainer.scrollTop = panStartRef.current.y - e.clientY;
      }
    };

    const handleMouseUp = () => {
      if (isPanningRef.current) {
        console.log('Pan ended');
        isPanningRef.current = false;
        setCursorState(spacePressedRef.current ? 'grab' : (insertionMode ? 'crosshair' : 'default'));
      }
    };

    // Attach mousedown to container, but mousemove/mouseup to window
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [insertionMode]);

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
      style={{
        position: 'relative',
        overflow: 'auto',
        cursor: cursorState
      }}
      onClick={(e) => {
        // Exit edit mode when clicking outside canvas
        const editModeExited = exitEditModeViaClick();
        
        // Deselect when clicking outside canvas (on gray background) if not in edit mode
        if (!editModeExited && e.target === e.currentTarget) {
          selectElement(null);
        }
      }}
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
          style={{
            cursor: cursorState
          }}
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
                <CanvasElement key={element.id} element={element} onFrameHover={onFrameHover} hoverFrameId={activeHoverFrameId} />
              ))}
          </Layer>
          <Layer>
            <Transformer
              onTransformEnd={(e) => {
                // Check if transforming a temp image
                const node = e.target;
                const elementId = node.id();
                if (elementId && elementId.startsWith("temp-image-")) {
                  console.log("🔄 Transform ended on temp image - preventing immediate exit");
                  justDraggedRef.current = true;
                  setTimeout(() => {
                    justDraggedRef.current = false;
                  }, 100);
                }
              }}
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
              ignoreStroke={true}
              keepRatio={selectedElementId?.startsWith("temp-image-") || false}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
