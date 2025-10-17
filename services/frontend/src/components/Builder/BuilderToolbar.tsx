// ============================================================================
// Template Builder - Toolbar Component
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBuilderStore, useHistoryState } from '@/store/builder';
import { PAPER_SIZES } from '@/store/builder';
import {
  Undo2,
  Redo2,
  ZoomOut,
  ZoomIn,
  Grid3x3,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/UI';
import { PreviewModal } from './PreviewModal';
import { SaveTemplateModal } from './SaveTemplateModal';
import { SuccessToast } from './SuccessToast';
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
    setPaperSize,
    currentCanvasSize,
    currentPageId,
    updatePageBackground,
    pages,
    setCurrentPage,
    addPage,
  } = useBuilderStore();
  const { canUndo, canRedo } = useHistoryState();
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [paperSizeDropdownOpen, setPaperSizeDropdownOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [savedTemplateName, setSavedTemplateName] = useState('');

  const currentPage = pages.find(p => p.id === currentPageId);
  const currentPageIndex = pages.findIndex(p => p.id === currentPageId);

  const canvasSize = currentCanvasSize();
  const isPortrait = canvasSize.orientation === 'portrait';

  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1);
  const handleResetZoom = () => setZoom(1); // Reset to 100% zoom

  const handleSaveTemplate = (data: { title: string; category: string; description?: string }) => {
    console.log('💾 Saving template...', { ...data, pages, templateId });
    // TODO: Implement actual API call to save template
    setSavedTemplateName(data.title);
    setShowSuccessToast(true);
  };

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
            <ChevronDown className="w-3 h-3 text-gray-500" />
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
                    <Plus className="w-3 h-3 text-blue-600" strokeWidth={2.5} />
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
          <Undo2 className="w-5 h-5 text-purple-600" strokeWidth={2.5} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Refazer (Ctrl+Shift+Z)"
        >
          <Redo2 className="w-5 h-5 text-purple-600" strokeWidth={2.5} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Zoom Controls */}
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.25}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Diminuir Zoom"
        >
          <ZoomOut className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
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
          <ZoomIn className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
        </button>

        {/* Paper Size Dropdown */}
        <div className="relative">
          <button
            onClick={() => setPaperSizeDropdownOpen(!paperSizeDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-gray-700 font-medium">
              {canvasSize.preset?.includes('A4') && `A4 (${isPortrait ? '210×297' : '297×210'}mm)`}
              {canvasSize.preset?.includes('A3') && `A3 (${isPortrait ? '297×420' : '420×297'}mm)`}
              {canvasSize.preset?.includes('A2') && `A2 (${isPortrait ? '420×594' : '594×420'}mm)`}
              {canvasSize.preset?.includes('A1') && `A1 (${isPortrait ? '594×841' : '841×594'}mm)`}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>

          {paperSizeDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setPaperSizeDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                {(['A4', 'A3', 'A2', 'A1'] as const).map((size) => {
                  const portraitPreset = `${size}-portrait` as keyof typeof PAPER_SIZES;
                  const landscapePreset = `${size}-landscape` as keyof typeof PAPER_SIZES;
                  const currentPreset = isPortrait ? portraitPreset : landscapePreset;
                  const isActive = canvasSize.preset?.startsWith(size);

                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setPaperSize(currentPreset);
                        setPaperSizeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </>
          )}
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
              ? 'bg-green-50'
              : 'hover:bg-gray-100'
          }`}
          title="Mostrar Grade"
        >
          <Grid3x3 className={`w-5 h-5 ${gridVisible ? 'text-green-600' : 'text-gray-600'}`} strokeWidth={2.5} />
        </button>

      </div>

      {/* Right Section - Save/Export */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-[86px] h-[32px]"
          onClick={() => setIsPreviewOpen(true)}
        >
          Preview
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="w-[86px] h-[32px]"
          onClick={() => setIsSaveModalOpen(true)}
        >
          Salvar
        </Button>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* Save Template Modal */}
      <SaveTemplateModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveTemplate}
        defaultTitle={`Template ${new Date().toLocaleDateString()}`}
      />

      {/* Success Toast */}
      <SuccessToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        title="Template salvo com sucesso!"
        message={`"${savedTemplateName}" foi salvo e está disponível nos seus templates.`}
        duration={5000}
      />
    </div>
  );
}
