// ============================================================================
// Layer Selector - Dropdown for assigning elements to layers
// AURELIA (Design System) + NOVA (Frontend) + LYRA (UX)
// ============================================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import { useBuilderStore } from '@/store/builder';
import { ChevronDown, Edit2, Check, X, Layers } from 'lucide-react';
import type { Layer } from '@/types/builder';

interface LayerSelectorProps {
  elementId: string;
  currentLayerId?: string;
}

export function LayerSelector({ elementId, currentLayerId }: LayerSelectorProps) {
  const { layers, updateLayer, updateElement } = useBuilderStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editLayerName, setEditLayerName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditing(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get current layer info
  const currentLayer = layers.find((l) => l.id === currentLayerId);
  const displayName = currentLayer ? currentLayer.name : 'Sem Camada';

  // Handle layer assignment
  const handleSelectLayer = (layerId: string) => {
    const layer = layers.find((l) => l.id === layerId);
    if (layer) {
      updateElement(elementId, { layerId, zIndex: layer.zIndex });
    }
    setIsOpen(false);
  };

  // Handle editing layer name
  const handleEditLayer = (layerId: string) => {
    if (!editLayerName.trim()) return;

    updateLayer(layerId, { name: editLayerName.trim() });
    setIsEditing(null);
    setEditLayerName('');
  };

  // Handle removing element from layer
  const handleRemoveFromLayer = () => {
    updateElement(elementId, { layerId: undefined });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Layer Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg
                   bg-white/5 hover:bg-white/10 border border-white/10
                   transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-white">{displayName}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-white/10
                        rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {/* No Layer Option */}
          <button
            onClick={handleRemoveFromLayer}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors
                       ${!currentLayerId ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border border-gray-500" />
              <span>Sem Camada</span>
            </div>
          </button>

          <div className="border-t border-white/10 my-1" />

          {/* Existing Layers */}
          {layers.map((layer) => (
            <div key={layer.id} className="group relative">
              {isEditing === layer.id ? (
                // Edit Mode
                <div className="flex items-center gap-1 px-2 py-1">
                  <input
                    type="text"
                    value={editLayerName}
                    onChange={(e) => setEditLayerName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleEditLayer(layer.id);
                      if (e.key === 'Escape') {
                        setIsEditing(null);
                        setEditLayerName('');
                      }
                    }}
                    className="flex-1 px-2 py-1 text-sm bg-gray-800 border border-blue-500 rounded
                               text-white focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => handleEditLayer(layer.id)}
                    className="p-1 text-green-400 hover:bg-green-500/20 rounded"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(null);
                      setEditLayerName('');
                    }}
                    className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                // Normal Mode
                <button
                  onClick={() => handleSelectLayer(layer.id)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors
                             flex items-center justify-between gap-2
                             ${currentLayerId === layer.id ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'}`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-3 h-3 rounded border"
                      style={{
                        backgroundColor: layer.color || 'transparent',
                        borderColor: layer.color || '#6b7280'
                      }}
                    />
                    <span className="truncate">{layer.name}</span>
                    <span className="text-xs text-gray-500">z:{layer.zIndex}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(layer.id);
                      setEditLayerName(layer.name);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white
                               hover:bg-white/10 rounded transition-all"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </button>
              )}
            </div>
          ))}


        </div>
      )}
    </div>
  );
}
