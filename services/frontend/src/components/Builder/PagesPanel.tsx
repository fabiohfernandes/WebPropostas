// ============================================================================
// Template Builder - Pages Panel (Bottom Panel)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useBuilderStore } from '@/store/builder';
import {
  PlusIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

export function PagesPanel() {
  const {
    pages,
    currentPageId,
    setCurrentPage,
    addPage,
    deletePage,
    duplicatePage,
    reorderPages,
  } = useBuilderStore();

  const currentIndex = pages.findIndex((p) => p.id === currentPageId);

  const handleMovePage = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < pages.length) {
      const newPages = [...pages];
      const [movedPage] = newPages.splice(currentIndex, 1);
      newPages.splice(newIndex, 0, movedPage);
      reorderPages(newPages);
    }
  };

  return (
    <div className="h-32 bg-gray-50 border-t border-gray-200 flex flex-col">
      {/* Header */}
      <div className="h-10 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Páginas</span>
          <span className="text-xs text-gray-500">
            {pages.length} {pages.length === 1 ? 'página' : 'páginas'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Move Page Left */}
          <button
            onClick={() => handleMovePage('left')}
            disabled={currentIndex === 0}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Mover página para esquerda"
          >
            <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
          </button>

          {/* Move Page Right */}
          <button
            onClick={() => handleMovePage('right')}
            disabled={currentIndex === pages.length - 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Mover página para direita"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          </button>

          <div className="w-px h-4 bg-gray-300 mx-1" />

          {/* Duplicate Page */}
          <button
            onClick={() => duplicatePage(currentPageId)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Duplicar página"
          >
            <DocumentDuplicateIcon className="w-4 h-4 text-gray-600" />
          </button>

          {/* Delete Page */}
          <button
            onClick={() => {
              if (pages.length > 1 && confirm('Deseja excluir esta página?')) {
                deletePage(currentPageId);
              }
            }}
            disabled={pages.length === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Excluir página"
          >
            <TrashIcon className="w-4 h-4 text-red-600" />
          </button>

          {/* Add Page */}
          <button
            onClick={addPage}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Adicionar página"
          >
            <PlusIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Page Thumbnails */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-3">
        <div className="flex gap-3 h-full">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              className={`
                relative flex-shrink-0 w-16 h-full rounded-lg border-2 transition-all
                ${
                  page.id === currentPageId
                    ? 'border-blue-500 shadow-md'
                    : 'border-gray-300 hover:border-gray-400'
                }
              `}
              title={page.name}
            >
              {/* Page Preview Placeholder */}
              <div
                className={`w-full h-full rounded-md flex items-center justify-center text-xs font-medium ${
                  page.id === currentPageId
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-white text-gray-500'
                }`}
              >
                {index + 1}
              </div>

              {/* Page Number Badge */}
              <div
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  page.id === currentPageId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
