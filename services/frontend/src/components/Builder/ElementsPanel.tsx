// ============================================================================
// Template Builder - Elements Panel (Left Sidebar)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  DocumentTextIcon,
  PhotoIcon,
  Squares2X2Icon,
  SparklesIcon,
  ChartBarIcon,
  RectangleGroupIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useBuilderStore } from '@/store/builder';
import { useImageLibrary } from '@/store/imageLibrary';
import { ImageLibrary } from './ImageLibrary';
import type { ElementCategory, ElementDefinition } from '@/types/builder';

const elementCategories: ElementCategory[] = [
  {
    id: 'text',
    label: 'Texto',
    icon: <DocumentTextIcon className="w-5 h-5" />,
    elements: [
      {
        id: 'text-heading',
        type: 'text',
        label: 'Título',
        icon: <DocumentTextIcon className="w-4 h-4" />,
        defaultProps: {
          properties: {
            content: 'Título da Proposta',
            fontFamily: 'Inter',
            fontSize: 48,
            fontWeight: 'bold',
            fontStyle: 'normal',
            textAlign: 'left',
            lineHeight: 1.2,
            letterSpacing: 0,
            color: '#1F2937',
          },
        },
      },
      {
        id: 'text-body',
        type: 'text',
        label: 'Parágrafo',
        icon: <DocumentTextIcon className="w-4 h-4" />,
        defaultProps: {
          properties: {
            content: 'Adicione seu texto aqui...',
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            lineHeight: 1.5,
            letterSpacing: 0,
            color: '#6B7280',
          },
        },
      },
    ],
  },
  {
    id: 'media',
    label: 'Mídia',
    icon: <PhotoIcon className="w-5 h-5" />,
    elements: [
      {
        id: 'image-placeholder',
        type: 'image',
        label: 'Imagem',
        icon: <PhotoIcon className="w-4 h-4" />,
        defaultProps: {
          properties: {
            src: '/placeholder.png',
            alt: 'Placeholder Image',
            fit: 'contain',
          },
        },
      },
    ],
  },
  {
    id: 'shapes',
    label: 'Formas',
    icon: <Squares2X2Icon className="w-5 h-5" />,
    elements: [
      {
        id: 'shape-rectangle',
        type: 'shape',
        label: 'Retângulo',
        icon: <Squares2X2Icon className="w-4 h-4" />,
        defaultProps: {
          properties: {
            shapeType: 'rectangle',
            fill: '#3B82F6',
          },
        },
      },
      {
        id: 'shape-circle',
        type: 'shape',
        label: 'Círculo',
        icon: <Squares2X2Icon className="w-4 h-4" />,
        defaultProps: {
          properties: {
            shapeType: 'circle',
            fill: '#10B981',
          },
        },
      },
    ],
  },
  {
    id: 'forms',
    label: 'Formulários',
    icon: <RectangleGroupIcon className="w-5 h-5" />,
    elements: [
      {
        id: 'form-bullet',
        type: 'form',
        label: 'Caixa de Título',
        icon: <RectangleGroupIcon className="w-4 h-4" />,
        defaultProps: {
          width: 400,
          height: 80,
          properties: {
            backgroundColor: '#3B82F6',
            backgroundOpacity: 1,
            border: {
              enabled: true,
              color: '#1E3A8A',
              width: 3,
              opacity: 1,
            },
            cornerRadius: 12,
            text: {
              content: 'Título da Seção',
              fontFamily: 'Inter',
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FFFFFF',
              align: 'center',
              verticalAlign: 'middle',
              padding: 16,
            },
          },
        },
      },
    ],
  },
];

function DraggableElement({ element }: { element: ElementDefinition }) {
  const { setInsertionMode, insertionMode } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      defaultProps: element.defaultProps,
    },
  });

  // Check if this element is the active insertion mode
  const isActive = insertionMode?.type === element.type && (
    // For shapes, also compare shapeType
    (element.type === 'shape'
      ? insertionMode?.defaultProps?.properties?.shapeType === element.defaultProps?.properties?.shapeType
      : true) &&
    // For text, compare content
    (element.type === 'text'
      ? insertionMode?.defaultProps?.properties?.content === element.defaultProps?.properties?.content
      : true)
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Element clicked for insertion:', element.type, element.label);

    const insertionConfig = {
      type: element.type,
      defaultProps: {
        ...element.defaultProps,
        width: element.type === 'text' ? 400 : 200,
        height: element.type === 'text' ? 100 : 200,
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        zIndex: 0,
        locked: false,
        visible: true,
      },
    };

    console.log('Setting insertion mode:', insertionConfig);
    setInsertionMode(insertionConfig);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded transition-all text-left ${
        isActive
          ? 'bg-blue-100 border border-blue-500 cursor-pointer'
          : 'hover:bg-blue-50 cursor-pointer'
      } border border-transparent`}
    >
      <div className="text-gray-600 w-3.5 h-3.5">{element.icon}</div>
      <span className="text-xs font-medium text-gray-700">{element.label}</span>
      {element.tier === 'professional' && (
        <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded">
          Pro
        </span>
      )}
    </button>
  );
}

export function ElementsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { images, addImage, deleteImage } = useImageLibrary();
  const { addElement, currentCanvasSize } = useBuilderStore();

  const displayCategories = selectedCategory
    ? elementCategories.filter((cat) => cat.id === selectedCategory)
    : elementCategories;

  const selectedCategoryData = selectedCategory
    ? elementCategories.find(cat => cat.id === selectedCategory)
    : null;

  const handleImageClick = (imageSrc: string, width: number, height: number) => {
    // Insert image element on canvas with actual image dimensions
    // Without offset, x,y is top-left - subtract half width/height to center
    const canvasSize = currentCanvasSize();
    const newElement = {
      id: `image-${Date.now()}`,
      type: 'image' as const,
      x: (canvasSize.width / 2) - (width / 2),   // Center on canvas
      y: (canvasSize.height / 2) - (height / 2), // Center on canvas
      width: width,
      height: height,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        src: imageSrc,
        alt: 'Uploaded Image',
        fit: 'cover' as const,
      },
    };
    addElement(newElement);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Category Dropdown */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-semibold text-gray-900">Elementos</h3>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-2 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              {selectedCategoryData ? (
                <>
                  <div className="text-gray-600">{selectedCategoryData.icon}</div>
                  <span className="text-gray-900">{selectedCategoryData.label}</span>
                </>
              ) : (
                <span className="text-gray-700">Todas as Categorias</span>
              )}
            </div>
            <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 max-h-64 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    selectedCategory === null ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  Todas as Categorias
                </button>
                <div className="border-t border-gray-200 my-1" />
                {elementCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      selectedCategory === cat.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <div className="text-gray-600">{cat.icon}</div>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-2">
        {displayCategories.length === 0 && !selectedCategory ? (
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">Nenhum elemento encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-1.5 mb-1.5 px-1">
                  <div className="text-gray-500 w-3.5 h-3.5">{category.icon}</div>
                  <h4 className="text-xs font-semibold text-gray-700">
                    {category.label}
                  </h4>
                </div>
                <div className="space-y-0.5">
                  {category.elements.map((element) => (
                    <DraggableElement key={element.id} element={element} />
                  ))}
                </div>
              </div>
            ))}

            {/* Image Library Section - Always visible at the end */}
            {(!selectedCategory || selectedCategory === 'media') && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 px-1">
                  <PhotoIcon className="text-gray-500 w-3.5 h-3.5" />
                  <h4 className="text-xs font-semibold text-gray-700">Imagens</h4>
                </div>
                <ImageLibrary
                  images={images}
                  onImageClick={handleImageClick}
                  onImageUpload={addImage}
                  onImageDelete={deleteImage}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Assistant CTA */}
      <div className="p-2 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded hover:from-purple-600 hover:to-blue-600 transition-all">
          <SparklesIcon className="w-4 h-4" />
          <span className="text-xs font-medium">Assistente IA</span>
        </button>
      </div>
    </div>
  );
}
