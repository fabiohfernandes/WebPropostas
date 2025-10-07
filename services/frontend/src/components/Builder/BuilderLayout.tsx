// ============================================================================
// Template Builder - Main Layout Component
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { ElementsPanel } from './ElementsPanel';
import { BuilderCanvas } from './BuilderCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { BuilderToolbar } from './BuilderToolbar';
import type { Element } from '@/types/builder';

interface BuilderLayoutProps {
  templateId?: string;
}

export function BuilderLayout({ templateId }: BuilderLayoutProps) {
  const { addElement, currentCanvasSize } = useBuilderStore();
  const [leftPanelWidth, setLeftPanelWidth] = useState(280);
  const [rightPanelWidth, setRightPanelWidth] = useState(320);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If dropped over canvas
    if (over?.id === 'canvas-drop-zone') {
      const elementData = active.data.current as {
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
          {/* Left Panel - Elements Library */}
          <div
            className="flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto"
            style={{ width: `${leftPanelWidth}px` }}
          >
            <ElementsPanel />
          </div>

          {/* Center Panel - Canvas */}
          <div className="flex-1 overflow-auto bg-gray-100 relative">
            <BuilderCanvas />
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
