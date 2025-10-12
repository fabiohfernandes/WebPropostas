// ============================================================================
// Layers Panel - Layer Groups with Multiple Elements
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

'use client';

import { useState } from 'react';
import { useBuilderStore } from '@/store/builder';
import type { Element, Layer } from '@/types/builder';
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
  ChevronDown,
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  Check,
  X,
} from 'lucide-react';

// Element card component (within a layer group)
function ElementCard({ element, isSelected }: { element: Element; isSelected: boolean }) {
  const { selectElement, updateElement } = useBuilderStore();

  // Get element type icon
  const getElementIcon = () => {
    switch (element.type) {
      case 'image':
        return <ImageIcon className="w-3 h-3" />;
      case 'text':
        return <Type className="w-3 h-3" />;
      case 'frame':
        return <Square className="w-3 h-3" />;
      case 'shape':
        return <Circle className="w-3 h-3" />;
      default:
        return <Square className="w-3 h-3" />;
    }
  };

  // Get element display name
  const getElementName = () => {
    if (element.type === 'text' && 'properties' in element) {
      const content = (element as any).properties?.content;
      return content && content.length > 15 ? content.substring(0, 15) + '...' : content || 'Text';
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
      className={`
        group flex items-center gap-1 p-1 pl-6 rounded
        transition-all duration-200
        ${isSelected
          ? 'bg-blue-500/20 border-l-2 border-blue-500'
          : 'hover:bg-gray-50 border-l-2 border-transparent'
        }
        ${!element.visible ? 'opacity-50' : ''}
      `}
      onClick={() => selectElement(element.id)}
    >
      {/* Element icon */}
      <div className="text-gray-400">
        {getElementIcon()}
      </div>

      {/* Element name */}
      <div className="flex-1 text-xs text-gray-700 truncate">
        {getElementName()}
      </div>

      {/* Visibility toggle */}
      <button
        onClick={toggleVisibility}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-900 transition-all"
        title={element.visible ? 'Hide' : 'Show'}
      >
        {element.visible ? (
          <Eye className="w-3 h-3" />
        ) : (
          <EyeOff className="w-3 h-3" />
        )}
      </button>

      {/* Lock toggle */}
      <button
        onClick={toggleLock}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-900 transition-all"
        title={element.locked ? 'Unlock' : 'Lock'}
      >
        {element.locked ? (
          <Lock className="w-3 h-3" />
        ) : (
          <Unlock className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}

// Layer group card component
function LayerGroupCard({ layer, elements }: { layer: Layer; elements: Element[] }) {
  const { updateLayer, deleteLayer, selectedElementId, reorderLayers, updateElement, selectElement } = useBuilderStore();
  const [isExpanded, setIsExpanded] = useState(true);

  // Simple add/remove selected element
  const handleAddSelected = () => {
    if (selectedElementId) {
      updateElement(selectedElementId, { layerId: layer.id, zIndex: layer.zIndex });
    }
  };

  const handleRemoveSelected = () => {
    if (selectedElementId) {
      updateElement(selectedElementId, { layerId: undefined });
    }
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: layer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newVisibility = !layer.visible;
    
    // Update layer visibility
    updateLayer(layer.id, { visible: newVisibility });
    
    // Update all elements in this layer to match
    elements.forEach((element) => {
      updateElement(element.id, { visible: newVisibility });
      
      // Deselect element if it's being hidden and currently selected
      if (!newVisibility && selectedElementId === element.id) {
        selectElement(null);
      }
    });
  };

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateLayer(layer.id, { locked: !layer.locked });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete layer "${layer.name}"? Elements will be moved to "Sem Camada".`)) {
      deleteLayer(layer.id);
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Layer Header */}
      <div
        {...attributes}
        {...listeners}
        className={`
          group relative flex items-center gap-1 px-2 py-1 rounded
          transition-all duration-200
          bg-gray-50 border border-gray-200 hover:bg-gray-100
          cursor-grab active:cursor-grabbing
          ${!layer.visible ? 'opacity-50' : ''}
        `}
      >
{/* Expand/Collapse */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-gray-400 hover:text-gray-900"
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Layer color indicator */}
        <div
          className="w-2.5 h-2.5 rounded-sm border"
          style={{
            backgroundColor: layer.color || 'transparent',
            borderColor: layer.color || '#6b7280'
          }}
        />

        {/* Layer name */}
        <div className="flex-1 text-xs font-medium text-gray-900 truncate">
          {layer.name}
        </div>

        {/* Add selected element button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddSelected();
          }}
          disabled={!selectedElementId}
          className={`p-0.5 rounded transition-colors ${
            !selectedElementId
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-green-600 hover:text-green-700 hover:bg-green-50'
          }`}
          title="Adicionar elemento selecionado"
        >
          <Plus className="w-3 h-3" />
        </button>

        {/* Remove selected element button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveSelected();
          }}
          disabled={!selectedElementId}
          className={`p-0.5 rounded transition-colors ${
            !selectedElementId
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
          }`}
          title="Remover elemento selecionado"
        >
          <Minus className="w-3 h-3" />
        </button>


{/* Visibility toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleVisibility(e);
          }}
          className="text-gray-400 hover:text-gray-900 transition-colors"
          title={layer.visible ? 'Hide layer' : 'Show layer'}
        >
          {layer.visible ? (
            <Eye className="w-3.5 h-3.5" />
          ) : (
            <EyeOff className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Lock toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLock(e);
          }}
          className="text-gray-400 hover:text-gray-900 transition-colors"
          title={layer.locked ? 'Unlock layer' : 'Lock layer'}
        >
          {layer.locked ? (
            <Lock className="w-3.5 h-3.5" />
          ) : (
            <Unlock className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Delete layer */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(e);
          }}
          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
          title="Delete layer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Layer Elements (collapsed) */}
      {isExpanded && elements.length > 0 && (
        <div className="mt-0.5 space-y-0.5">
          {elements.map((element) => (
            <ElementCard
              key={element.id}
              element={element}
              isSelected={selectedElementId === element.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main LayersPanel component
export function LayersPanel() {
  const { currentElements, layers, selectedElementId, reorderLayers, addLayer } = useBuilderStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newLayerName, setNewLayerName] = useState('');

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

  // Get all elements
  const elements = currentElements();

  // Group elements by layer
  const layeredElements = new Map<string, Element[]>();
  const unassignedElements: Element[] = [];

  elements.forEach((el) => {
    if (el.layerId) {
      const existing = layeredElements.get(el.layerId) || [];
      layeredElements.set(el.layerId, [...existing, el]);
    } else {
      unassignedElements.push(el);
    }
  });

  // Sort layers by z-index (high to low)
  const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  // Sort unassigned elements by z-index (high to low)
  const sortedUnassigned = [...unassignedElements].sort((a, b) => b.zIndex - a.zIndex);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sortedLayers.findIndex((l) => l.id === active.id);
    const newIndex = sortedLayers.findIndex((l) => l.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Reorder array
    const reordered = arrayMove(sortedLayers, oldIndex, newIndex);

    // Update z-index values (reverse because UI shows high-to-low but we want low-to-high z-index)
    const updates = reordered.map((layer, index) => ({
      id: layer.id,
      zIndex: reordered.length - index,
    }));

    reorderLayers(updates);
  };

  const totalElements = elements.length;

  // Handle creating new layer
  const handleCreateLayer = () => {
    if (!newLayerName.trim()) return;

    // Find highest z-index to place new layer on top
    const maxZIndex = Math.max(...layers.map((l) => l.zIndex), 0);

    addLayer({
      id: `layer-${Date.now()}`,
      name: newLayerName.trim(),
      zIndex: maxZIndex + 1,
      visible: true,
      locked: false,
    });

    setNewLayerName('');
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-2 py-1 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-900">Camadas</h3>
          
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-700
                         hover:bg-blue-50 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Criar</span>
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={newLayerName}
                onChange={(e) => setNewLayerName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateLayer();
                  if (e.key === 'Escape') {
                    setIsCreating(false);
                    setNewLayerName('');
                  }
                }}
                placeholder="Nome da camada..."
                className="px-2 py-1 text-xs border border-blue-500 rounded
                           focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ width: '120px' }}
                autoFocus
              />
              <button
                onClick={handleCreateLayer}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
                title="Criar"
              >
                <Check className="w-3 h-3" />
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewLayerName('');
                }}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
                title="Cancelar"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500">
        </p>
      </div>

      {/* Layers list */}
      <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
        {sortedLayers.length === 0 && unassignedElements.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            Nenhum elemento ainda<br />
            <span className="text-xs">Adicione elementos para ver camadas</span>
          </div>
        ) : (
          <>
            {/* Layer Groups */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortedLayers.map((l) => l.id)}
                strategy={verticalListSortingStrategy}
              >
                {sortedLayers.map((layer) => {
                  const layerElements = layeredElements.get(layer.id) || [];
                  return (
                    <LayerGroupCard
                      key={layer.id}
                      layer={layer}
                      elements={layerElements}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>

            {/* Unassigned Elements */}
            {sortedUnassigned.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide px-2 py-1">
                  Sem Camada
                </div>
                <div className="space-y-0.5 mt-1">
                  {sortedUnassigned.map((element) => (
                    <ElementCard
                      key={element.id}
                      element={element}
                      isSelected={selectedElementId === element.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
