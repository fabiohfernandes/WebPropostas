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
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
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
            src: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Imagem',
            alt: 'Placeholder Image',
            fit: 'cover',
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
];

function DraggableElement({ element }: { element: ElementDefinition }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      defaultProps: element.defaultProps,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'opacity-50 scale-95'
          : 'hover:bg-blue-50 hover:border-blue-200'
      } border border-transparent`}
    >
      <div className="text-gray-600">{element.icon}</div>
      <span className="text-sm font-medium text-gray-700">{element.label}</span>
      {element.tier === 'professional' && (
        <span className="ml-auto text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
          Pro
        </span>
      )}
    </div>
  );
}

export function ElementsPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = elementCategories
    .map((category) => ({
      ...category,
      elements: category.elements.filter(
        (el) =>
          el.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.type.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.elements.length > 0);

  const displayCategories = selectedCategory
    ? filteredCategories.filter((cat) => cat.id === selectedCategory)
    : filteredCategories;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Elementos</h3>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar elementos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              selectedCategory === null
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          {elementCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
              }
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-4">
        {displayCategories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">Nenhum elemento encontrado</p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-gray-500">{category.icon}</div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {category.label}
                  </h4>
                </div>
                <div className="space-y-1">
                  {category.elements.map((element) => (
                    <DraggableElement key={element.id} element={element} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Assistant CTA */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all">
          <SparklesIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Assistente IA</span>
        </button>
      </div>
    </div>
  );
}
