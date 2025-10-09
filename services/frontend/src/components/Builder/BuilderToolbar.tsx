// ============================================================================
// Template Builder - Toolbar Component
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBuilderStore, useHistoryState } from '@/store/builder';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  TableCellsIcon,
  ChevronDownIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/UI';
import { appConfig } from '@/config';

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
    toggleOrientation,
    currentCanvasSize,
    currentPageId,
    updatePageBackground,
    pages,
    setCurrentPage,
    addPage,
  } = useBuilderStore();
  const { canUndo, canRedo } = useHistoryState();
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const currentPage = pages.find(p => p.id === currentPageId);
  const currentPageIndex = pages.findIndex(p => p.id === currentPageId);

  const canvasSize = currentCanvasSize();
  const isPortrait = canvasSize.orientation === 'portrait';

  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1);
  const handleResetZoom = () => setZoom(1); // Reset to 100% zoom

  return (
    <div className="h-10 bg-white border-b border-gray-200 flex items-center justify-between px-3">
      {/* Left Section - Logo and File Actions */}
      <div className="flex items-center gap-3">
        {/* Logo with Link to Dashboard */}
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/favicon-16x16.png" alt="WebPropostas" className="h-6 w-6" />
          <span className="text-sm font-semibold text-gray-900">{appConfig.appName}</span>
        </Link>

        <div className="w-px h-6 bg-gray-300" />

        <h1 className="text-sm font-medium text-gray-700">Template Builder</h1>

        {/* Pages Dropdown */}
        <div className="relative">
          <button
            onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-50 hover:bg-gray-100 rounded transition-colors"
          >
            <span className="text-gray-700">Página {currentPageIndex + 1} / {pages.length}</span>
            <ChevronDownIcon className="w-3 h-3 text-gray-500" />
          </button>

          {pagesDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setPagesDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                {pages.map((page, index) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      setCurrentPage(page.id);
                      setPagesDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
                      page.id === currentPageId ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    Página {index + 1}
                  </button>
                ))}
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <button
                    onClick={() => {
                      addPage();
                      setPagesDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1"
                  >
                    <PlusIcon className="w-3 h-3" />
                    Nova Página
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {templateId && (
          <span className="text-xs text-gray-500">
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

        {/* Page Size Display */}
        <div className="px-3 py-1 text-xs text-gray-600 bg-gray-50 rounded-lg">
          {canvasSize.preset === 'A4-portrait' && 'A4 (210×297mm)'}
          {canvasSize.preset === 'A4-landscape' && 'A4 (297×210mm)'}
          {!canvasSize.preset.startsWith('A4') && `${canvasSize.width} × ${canvasSize.height}px`}
        </div>

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

        {/* Grid Toggle */}
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

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Canvas Background */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600">Fundo:</span>
          <input
            type="color"
            value={currentPage?.background || '#FFFFFF'}
            onChange={(e) => updatePageBackground(currentPageId, e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border border-gray-300"
            title="Cor do Fundo"
          />
        </div>
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
