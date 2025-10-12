// ============================================================================
// Layer Assignment - Add/Remove element from layers
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import { useBuilderStore } from '@/store/builder';
import { Plus, Minus, Check } from 'lucide-react';
import type { Layer } from '@/types/builder';

interface LayerAssignmentProps {
  elementId: string;
  currentLayerId?: string;
}

export function LayerAssignment({ elementId, currentLayerId }: LayerAssignmentProps) {
  const { layers, updateElement } = useBuilderStore();
  const [showLayerPicker, setShowLayerPicker] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLayerPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get current layer info
  const currentLayer = layers.find((l) => l.id === currentLayerId);

  // Handle adding element to layer
  const handleAddToLayer = (layerId: string) => {
    const layer = layers.find((l) => l.id === layerId);
    if (layer) {
      updateElement(elementId, { layerId, zIndex: layer.zIndex });
    }
    setShowLayerPicker(false);
  };

  // Handle removing element from layer
  const handleRemoveFromLayer = () => {
    updateElement(elementId, { layerId: undefined });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Current Layer Display */}
      <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
        {currentLayer ? (
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded border flex-shrink-0"
              style={{
                backgroundColor: currentLayer.color || 'transparent',
                borderColor: currentLayer.color || '#9ca3af'
              }}
            />
            <span className="truncate">{currentLayer.name}</span>
          </div>
        ) : (
          <span className="text-gray-400">Sem camada</span>
        )}
      </div>

      {/* Action Buttons */}
      {currentLayerId ? (
        // Remove from layer button
        <button
          onClick={handleRemoveFromLayer}
          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          title="Remover da camada"
        >
          <Minus className="w-4 h-4" />
        </button>
      ) : (
        // Add to layer button
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowLayerPicker(!showLayerPicker)}
            disabled={layers.length === 0}
            className={`p-2 rounded transition-colors ${
              layers.length === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-green-600 hover:text-green-700 hover:bg-green-50'
            }`}
            title={layers.length === 0 ? 'Nenhuma camada disponível' : 'Adicionar à camada'}
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Layer Picker Dropdown */}
          {showLayerPicker && layers.length > 0 && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200
                            rounded-lg shadow-lg z-50 min-w-[200px] max-h-60 overflow-y-auto">
              <div className="p-2 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-600 uppercase">Escolher Camada</p>
              </div>

              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => handleAddToLayer(layer.id)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors
                             flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className="w-3 h-3 rounded border flex-shrink-0"
                      style={{
                        backgroundColor: layer.color || 'transparent',
                        borderColor: layer.color || '#9ca3af'
                      }}
                    />
                    <span className="truncate text-gray-700">{layer.name}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">z:{layer.zIndex}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
