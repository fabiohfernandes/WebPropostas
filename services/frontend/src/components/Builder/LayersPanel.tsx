// ============================================================================
// Layers Panel - Z-Index Management with Drag & Drop
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

'use client';

import { useBuilderStore } from '@/store/builder';
import type { Element } from '@/types/builder';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Image as ImageIcon,
  Type,
  Square,
  Circle,
  GripVertical,
} from 'lucide-react';

// Layer card component
function LayerCard({ element, isSelected }: { element: Element; isSelected: boolean }) {
  const { selectElement, updateElement } = useBuilderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Get element type icon
  const getElementIcon = () => {
    switch (element.type) {
      case 'image':
        return <ImageIcon className="w-4 h-4" />;
      case 'text':
        return <Type className="w-4 h-4" />;
      case 'frame':
        return <Square className="w-4 h-4" />;
      case 'shape':
        return <Circle className="w-4 h-4" />;
      default:
        return <Square className="w-4 h-4" />;
    }
  };

  // Get element display name
  const getElementName = () => {
    if (element.type === 'text' && 'content' in element) {
      const content = (element as any).content;
      return content.length > 20 ? content.substring(0, 20) + '...' : content;
    }
    if (element.type === 'frame' && 'properties' in element) {
      const clipPath = (element as any).properties?.clipPath;
      if (clipPath?.includes('21.35')) return 'Heart Frame';
      if (clipPath?.includes('circle')) return 'Circle Frame';
      if (clipPath?.includes('polygon')) return 'Polygon Frame';
      return 'Frame';
    }
    return element.type.charAt(0).toUpperCase() + element.type.slice(1);
  };

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateElement(element.id, { visible: !element.visible });
  };

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateElement(element.id, { locked: !element.locked });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative flex items-center gap-2 p-2 rounded-lg
        transition-all duration-200
        ${isSelected
          ? 'bg-blue-500/20 border-2 border-blue-500'
          : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
        }
        ${!element.visible ? 'opacity-50' : ''}
      `}
      onClick={() => selectElement(element.id)}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-white"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Element icon */}
      <div className="text-blue-400">
        {getElementIcon()}
      </div>

      {/* Element name */}
      <div className="flex-1 text-sm text-white truncate">
        {getElementName()}
      </div>

      {/* Visibility toggle */}
      <button
        onClick={toggleVisibility}
        className="text-gray-400 hover:text-white transition-colors"
        title={element.visible ? 'Hide' : 'Show'}
      >
        {element.visible ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
      </button>

      {/* Lock toggle */}
      <button
        onClick={toggleLock}
        className="text-gray-400 hover:text-white transition-colors"
        title={element.locked ? 'Unlock' : 'Lock'}
      >
        {element.locked ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Unlock className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

// Main LayersPanel component
export function LayersPanel() {
  const { currentElements, selectedElementId, reorderElements } = useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Get elements sorted by z-index (top to bottom in UI = high to low z-index)
  const sortedElements = [...currentElements()].sort((a, b) => b.zIndex - a.zIndex);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sortedElements.findIndex((el) => el.id === active.id);
    const newIndex = sortedElements.findIndex((el) => el.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Reorder array
    const reordered = arrayMove(sortedElements, oldIndex, newIndex);

    // Update z-index values (reverse because UI shows high-to-low but we want low-to-high z-index)
    const updates = reordered.map((el, index) => ({
      id: el.id,
      zIndex: reordered.length - index,
    }));

    reorderElements(updates);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">Layers</h3>
        <p className="text-xs text-gray-400 mt-1">
          {sortedElements.length} {sortedElements.length === 1 ? 'layer' : 'layers'}
        </p>
      </div>

      {/* Layers list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {sortedElements.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            No layers yet<br />
            <span className="text-xs">Add elements to see layers</span>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortedElements.map((el) => el.id)}
              strategy={verticalListSortingStrategy}
            >
              {sortedElements.map((element) => (
                <LayerCard
                  key={element.id}
                  element={element}
                  isSelected={selectedElementId === element.id}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
