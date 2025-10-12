// ============================================================================
// Template Builder - Save Template Modal
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useState } from 'react';
import { X, Save, Home, Car, GraduationCap, Briefcase, ShoppingBag, Heart, Users, Building2, Utensils, TrendingUp, MessageSquare, Layout } from 'lucide-react';
import { Button } from '@/components/UI';

interface SaveTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; category: string; description?: string }) => void;
  defaultTitle?: string;
}

const TEMPLATE_CATEGORIES = [
  { id: 'real-estate', label: 'Imóveis', icon: <Home className="w-4 h-4" strokeWidth={2} /> },
  { id: 'automotive', label: 'Veículos', icon: <Car className="w-4 h-4" strokeWidth={2} /> },
  { id: 'education', label: 'Educação', icon: <GraduationCap className="w-4 h-4" strokeWidth={2} /> },
  { id: 'business', label: 'Negócios', icon: <Briefcase className="w-4 h-4" strokeWidth={2} /> },
  { id: 'retail', label: 'Varejo', icon: <ShoppingBag className="w-4 h-4" strokeWidth={2} /> },
  { id: 'health', label: 'Saúde', icon: <Heart className="w-4 h-4" strokeWidth={2} /> },
  { id: 'events', label: 'Eventos', icon: <Users className="w-4 h-4" strokeWidth={2} /> },
  { id: 'construction', label: 'Construção', icon: <Building2 className="w-4 h-4" strokeWidth={2} /> },
  { id: 'food', label: 'Alimentação', icon: <Utensils className="w-4 h-4" strokeWidth={2} /> },
  { id: 'finance', label: 'Finanças', icon: <TrendingUp className="w-4 h-4" strokeWidth={2} /> },
  { id: 'marketing', label: 'Marketing', icon: <MessageSquare className="w-4 h-4" strokeWidth={2} /> },
  { id: 'general', label: 'Geral', icon: <Layout className="w-4 h-4" strokeWidth={2} /> },
];

export function SaveTemplateModal({ isOpen, onClose, onSave, defaultTitle = '' }: SaveTemplateModalProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [category, setCategory] = useState('general');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; category?: string }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { title?: string; category?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'O título é obrigatório';
    } else if (title.trim().length < 3) {
      newErrors.title = 'O título deve ter pelo menos 3 caracteres';
    }

    if (!category) {
      newErrors.category = 'Selecione uma categoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        title: title.trim(),
        category,
        description: description.trim() || undefined,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle(defaultTitle);
    setCategory('general');
    setDescription('');
    setErrors({});
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Save className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Salvar Template</h2>
              <p className="text-sm text-gray-500 mt-0.5">Defina um nome e categoria para seu template</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Fechar (ESC)"
          >
            <X className="w-5 h-5 text-gray-500" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="template-title" className="block text-sm font-medium text-gray-700 mb-2">
              Título do Template *
            </label>
            <input
              id="template-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: undefined });
              }}
              placeholder="Ex: Proposta Imobiliária Moderna"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.title
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Área de Uso *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TEMPLATE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    if (errors.category) setErrors({ ...errors, category: undefined });
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all ${
                    category === cat.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={category === cat.id ? 'text-blue-600' : 'text-gray-500'}>
                    {cat.icon}
                  </div>
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="mt-1.5 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Description (Optional) */}
          <div>
            <label htmlFor="template-description" className="block text-sm font-medium text-gray-700 mb-2">
              Descrição <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <textarea
              id="template-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva brevemente o propósito deste template..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              {description.length} / 500 caracteres
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            <kbd className="px-2 py-1 text-xs bg-white border border-gray-300 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 text-xs bg-white border border-gray-300 rounded">Enter</kbd> para salvar
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              className="px-6"
            >
              <Save className="w-4 h-4 mr-2" strokeWidth={2} />
              Salvar Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
