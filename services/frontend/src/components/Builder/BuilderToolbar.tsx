// ============================================================================
// Template Builder - Toolbar Component
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useBuilderStore, useHistoryState } from '@/store/builder';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  Square3Stack3DIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/UI';

interface BuilderToolbarProps {
  templateId?: string;
}

export function BuilderToolbar({ templateId }: BuilderToolbarProps) {
  const {
    zoom,
    setZoom,
    undo,
    redo,
    gridVisible,
    toggleGrid,
    snapToGrid,
    toggleSnapToGrid,
    toggleOrientation,
    currentCanvasSize,
  } = useBuilderStore();
  const { canUndo, canRedo } = useHistoryState();

  const canvasSize = currentCanvasSize();
  const isPortrait = canvasSize.orientation === 'portrait';

  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1);
  const handleResetZoom = () => setZoom(1); // Reset to 100% zoom

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left Section - File Actions */}
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold text-gray-900">Template Builder</h1>
        {templateId && (
          <span className="text-sm text-gray-500">
            ID: {templateId.slice(0, 8)}...
          </span>
        )}
      </div>

      {/* Center Section - History & Tools */}
      <div className="flex items-center gap-1">
        {/* Undo/Redo */}
        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Desfazer (Ctrl+Z)"
        >
          <ArrowUturnLeftIcon className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Refazer (Ctrl+Shift+Z)"
        >
          <ArrowUturnRightIcon className="w-5 h-5 text-gray-700" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Zoom Controls */}
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.25}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Diminuir Zoom"
        >
          <MagnifyingGlassMinusIcon className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleResetZoom}
          className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Resetar Zoom (100%)"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 4}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Aumentar Zoom"
        >
          <MagnifyingGlassPlusIcon className="w-5 h-5 text-gray-700" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Orientation Toggle */}
        <button
          onClick={toggleOrientation}
          className="px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          title={`Mudar para ${isPortrait ? 'Paisagem' : 'Retrato'}`}
        >
          <div className={`flex items-center gap-1 ${isPortrait ? '' : 'rotate-90'}`}>
            <div className="w-4 h-6 border-2 border-gray-600 rounded-sm" />
          </div>
          <span className="text-xs font-medium text-gray-700">
            {isPortrait ? 'Retrato' : 'Paisagem'}
          </span>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Grid & Snap */}
        <button
          onClick={toggleGrid}
          className={`p-2 rounded-lg transition-colors ${
            gridVisible
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          title="Mostrar Grade"
        >
          <TableCellsIcon className="w-5 h-5" />
        </button>
        <button
          onClick={toggleSnapToGrid}
          className={`p-2 rounded-lg transition-colors ${
            snapToGrid
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          title="Snap to Grid"
        >
          <Square3Stack3DIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Right Section - Save/Export */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Preview
        </Button>
        <Button variant="primary" size="sm">
          Salvar Template
        </Button>
      </div>
    </div>
  );
}
