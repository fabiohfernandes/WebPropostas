// ============================================================================
// Template Builder - Zustand State Management
// AURELIA (Design System) + NOVA (Frontend)
// A4 FORMAT + MULTI-PAGE SUPPORT
// ============================================================================

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  BuilderState,
  Element,
  CanvasSize,
  HistoryState,
  Page,
} from '@/types/builder';

const HISTORY_LIMIT = 50;

// A4 dimensions at 72 DPI (screen resolution)
const A4_PORTRAIT: CanvasSize = {
  width: 595,  // 210mm at 72dpi
  height: 842, // 297mm at 72dpi
  preset: 'A4-portrait',
  orientation: 'portrait',
};

const A4_LANDSCAPE: CanvasSize = {
  width: 842,  // 297mm at 72dpi
  height: 595, // 210mm at 72dpi
  preset: 'A4-landscape',
  orientation: 'landscape',
};

// Create initial page
function createInitialPage(): Page {
  return {
    id: `page-${Date.now()}`,
    name: 'Página 1',
    elements: [],
    background: '#FFFFFF',
    canvasSize: A4_PORTRAIT,
    createdAt: Date.now(),
  };
}

export const useBuilderStore = create<BuilderState>()(
  devtools(
    (set, get) => ({
      // Initial State - Pages
      pages: [createInitialPage()],
      currentPageId: createInitialPage().id,

      // Initial State - Selection
      selectedElementId: null,

      // Initial State - Canvas
      zoom: 1, // 100% zoom for 72dpi A4
      gridVisible: true,
      snapToGrid: true,

      // Initial State - History
      history: [],
      historyIndex: -1,

      // Initial State - UI
      elementsPanel: {
        searchQuery: '',
        selectedCategory: null,
      },

      // Computed Getters
      currentPage: () => {
        const state = get();
        return state.pages.find((p) => p.id === state.currentPageId);
      },

      currentElements: () => {
        const page = get().currentPage();
        return page?.elements || [];
      },

      currentCanvasSize: () => {
        const page = get().currentPage();
        return page?.canvasSize || A4_PORTRAIT;
      },

      // Actions - Pages
      addPage: () => {
        set((state) => {
          const newPage: Page = {
            id: `page-${Date.now()}`,
            name: `Página ${state.pages.length + 1}`,
            elements: [],
            background: '#FFFFFF',
            canvasSize: state.pages[state.pages.length - 1]?.canvasSize || A4_PORTRAIT,
            createdAt: Date.now(),
          };
          return {
            pages: [...state.pages, newPage],
            currentPageId: newPage.id,
          };
        });
        get().saveHistory();
      },

      deletePage: (pageId: string) => {
        set((state) => {
          if (state.pages.length === 1) return state; // Can't delete last page

          const newPages = state.pages.filter((p) => p.id !== pageId);
          const newCurrentPageId = state.currentPageId === pageId
            ? newPages[0].id
            : state.currentPageId;

          return {
            pages: newPages,
            currentPageId: newCurrentPageId,
          };
        });
        get().saveHistory();
      },

      setCurrentPage: (pageId: string) => {
        set({ currentPageId: pageId, selectedElementId: null });
      },

      duplicatePage: (pageId: string) => {
        set((state) => {
          const pageToDuplicate = state.pages.find((p) => p.id === pageId);
          if (!pageToDuplicate) return state;

          const duplicatedPage: Page = {
            ...pageToDuplicate,
            id: `page-${Date.now()}`,
            name: `${pageToDuplicate.name} (cópia)`,
            elements: pageToDuplicate.elements.map((el) => ({
              ...el,
              id: `${el.type}-${Date.now()}-${Math.random()}`,
            })),
            createdAt: Date.now(),
          };

          const pageIndex = state.pages.findIndex((p) => p.id === pageId);
          const newPages = [
            ...state.pages.slice(0, pageIndex + 1),
            duplicatedPage,
            ...state.pages.slice(pageIndex + 1),
          ];

          return {
            pages: newPages,
            currentPageId: duplicatedPage.id,
          };
        });
        get().saveHistory();
      },

      reorderPages: (startIndex: number, endIndex: number) => {
        set((state) => {
          const newPages = Array.from(state.pages);
          const [removed] = newPages.splice(startIndex, 1);
          newPages.splice(endIndex, 0, removed);
          return { pages: newPages };
        });
        get().saveHistory();
      },

      // Actions - Elements
      addElement: (element: Element) => {
        set((state) => {
          const page = state.pages.find((p) => p.id === state.currentPageId);
          if (!page) return state;

          const updatedPage = {
            ...page,
            elements: [...page.elements, element],
          };

          return {
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
            selectedElementId: element.id,
          };
        });
        get().saveHistory();
      },

      updateElement: (id: string, updates: Partial<Element>) => {
        set((state) => {
          const page = state.pages.find((p) => p.id === state.currentPageId);
          if (!page) return state;

          const updatedPage = {
            ...page,
            elements: page.elements.map((el) =>
              el.id === id ? { ...el, ...updates } : el
            ),
          };

          return {
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
          };
        });
        get().saveHistory();
      },

      deleteElement: (id: string) => {
        set((state) => {
          const page = state.pages.find((p) => p.id === state.currentPageId);
          if (!page) return state;

          const updatedPage = {
            ...page,
            elements: page.elements.filter((el) => el.id !== id),
          };

          return {
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
            selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
          };
        });
        get().saveHistory();
      },

      duplicateElement: (id: string) => {
        const page = get().currentPage();
        if (!page) return;

        const element = page.elements.find((el) => el.id === id);
        if (!element) return;

        const duplicated: Element = {
          ...element,
          id: `${element.type}-${Date.now()}`,
          x: element.x + 20,
          y: element.y + 20,
        };

        set((state) => {
          const updatedPage = {
            ...page,
            elements: [...page.elements, duplicated],
          };

          return {
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
            selectedElementId: duplicated.id,
          };
        });
        get().saveHistory();
      },

      selectElement: (id: string | null) => {
        set({ selectedElementId: id });
      },

      // Actions - Canvas
      setCanvasSize: (size: CanvasSize) => {
        set((state) => {
          const page = state.pages.find((p) => p.id === state.currentPageId);
          if (!page) return state;

          const updatedPage = {
            ...page,
            canvasSize: size,
          };

          return {
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
          };
        });
        get().saveHistory();
      },

      toggleOrientation: () => {
        set((state) => {
          const page = state.pages.find((p) => p.id === state.currentPageId);
          if (!page) return state;

          const newCanvasSize: CanvasSize =
            page.canvasSize.orientation === 'portrait'
              ? A4_LANDSCAPE
              : A4_PORTRAIT;

          const updatedPage = {
            ...page,
            canvasSize: newCanvasSize,
          };

          return {
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
          };
        });
        get().saveHistory();
      },

      setZoom: (zoom: number) => {
        set({ zoom: Math.max(0.1, Math.min(4, zoom)) });
      },

      toggleGrid: () => {
        set((state) => ({ gridVisible: !state.gridVisible }));
      },

      toggleSnapToGrid: () => {
        set((state) => ({ snapToGrid: !state.snapToGrid }));
      },

      // Actions - History
      saveHistory: () => {
        const state = get();
        const newHistoryState: HistoryState = {
          elements: state.currentElements(),
          timestamp: Date.now(),
        };

        // Remove any future history if we're not at the end
        const newHistory = state.history.slice(0, state.historyIndex + 1);

        // Add new state
        newHistory.push(newHistoryState);

        // Limit history size
        const limitedHistory = newHistory.slice(-HISTORY_LIMIT);

        set({
          history: limitedHistory,
          historyIndex: limitedHistory.length - 1,
        });
      },

      undo: () => {
        const state = get();
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          const historyState = state.history[newIndex];

          const page = state.pages.find((p) => p.id === state.currentPageId);
          if (!page) return;

          const updatedPage = {
            ...page,
            elements: historyState.elements,
          };

          set({
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
            historyIndex: newIndex,
            selectedElementId: null,
          });
        }
      },

      redo: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          const historyState = state.history[newIndex];

          const page = state.pages.find((p) => p.id === state.currentPageId);
          if (!page) return;

          const updatedPage = {
            ...page,
            elements: historyState.elements,
          };

          set({
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
            historyIndex: newIndex,
            selectedElementId: null,
          });
        }
      },

      // Actions - UI
      setSearchQuery: (query: string) => {
        set((state) => ({
          elementsPanel: {
            ...state.elementsPanel,
            searchQuery: query,
          },
        }));
      },

      setSelectedCategory: (category: string | null) => {
        set((state) => ({
          elementsPanel: {
            ...state.elementsPanel,
            selectedCategory: category,
          },
        }));
      },

      // Actions - Utility
      clearCanvas: () => {
        set((state) => {
          const page = state.pages.find((p) => p.id === state.currentPageId);
          if (!page) return state;

          const updatedPage = {
            ...page,
            elements: [],
          };

          return {
            pages: state.pages.map((p) =>
              p.id === state.currentPageId ? updatedPage : p
            ),
            selectedElementId: null,
            history: [],
            historyIndex: -1,
          };
        });
      },

      loadTemplate: (pages: Page[]) => {
        set({
          pages,
          currentPageId: pages[0]?.id || '',
          selectedElementId: null,
          history: [],
          historyIndex: -1,
        });
        get().saveHistory();
      },
    }),
    { name: 'BuilderStore' }
  )
);

/**
 * Utility hook to get selected element
 */
export const useSelectedElement = () => {
  const currentElements = useBuilderStore((state) => state.currentElements());
  const selectedId = useBuilderStore((state) => state.selectedElementId);

  return currentElements.find((el) => el.id === selectedId) || null;
};

/**
 * Utility hook to check if can undo/redo
 */
export const useHistoryState = () => {
  const historyIndex = useBuilderStore((state) => state.historyIndex);
  const historyLength = useBuilderStore((state) => state.history.length);

  return {
    canUndo: historyIndex > 0,
    canRedo: historyIndex < historyLength - 1,
  };
};
