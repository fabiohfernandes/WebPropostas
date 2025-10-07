// ============================================================================
// Templates Management Page (Authenticated)
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, FunnelIcon, DocumentTextIcon, PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button, Card, Badge } from '@/components/UI';
import { api } from '@/lib/api';

interface Template {
  id: string;
  name: string;
  category: string;
  sector: string;
  description: string;
  thumbnail: string;
  hero_image?: string;
  fields: any[];
  content_template: any;
  created_at?: string;
}

export default function DashboardTemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [sectors, setSectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/templates');

      if (response.data.success) {
        setTemplates(response.data.data.templates || []);
      }
    } catch (err: any) {
      console.error('Error fetching templates:', err);
      setError(err.response?.data?.message || 'Erro ao carregar templates');
    } finally {
      setLoading(false);
    }
  };

  // Calculate category counts when templates change
  useEffect(() => {
    if (templates.length > 0) {
      const uniqueCategories = Array.from(new Set(templates.map(t => t.category)));

      const categoriesWithCount = uniqueCategories.map((cat) => ({
        id: cat,
        name: cat,
        count: templates.filter(t => t.category === cat).length
      }));

      setCategories([
        { id: 'all', name: 'Todos', count: templates.length },
        ...categoriesWithCount
      ]);

      const uniqueSectors = Array.from(new Set(templates.map(t => t.sector)));
      setSectors([
        { id: 'all', name: 'Todos os Setores' },
        ...uniqueSectors.map(sector => ({ id: sector, name: sector }))
      ]);
    }
  }, [templates]);

  const filteredTemplates = templates.filter((template) => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const sectorMatch = selectedSector === 'all' || template.sector === selectedSector;
    const searchMatch = searchTerm === '' ||
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && sectorMatch && searchMatch;
  });

  const handleUseTemplate = (templateId: string) => {
    router.push(`/builder?template=${templateId}`);
  };

  const handleEditTemplate = (templateId: string) => {
    router.push(`/dashboard/templates/${templateId}/edit`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Templates</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gerencie e utilize templates de propostas
          </p>
        </div>
        <Button
          leftIcon={<PlusIcon className="w-5 h-5" />}
          onClick={() => router.push('/dashboard/templates/create')}
        >
          Novo Template
        </Button>
      </div>

      {/* Filters */}
      <Card variant="glass">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar templates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full lg:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} {category.count !== undefined && `(${category.count})`}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div className="w-full lg:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card variant="glass">
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchTemplates} className="mt-4">
              Tentar Novamente
            </Button>
          </div>
        </Card>
      )}

      {/* Templates Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} variant="glass" hoverable>
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg overflow-hidden mb-4">
                  {template.thumbnail ? (
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <DocumentTextIcon className="w-20 h-20 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant="primary">{template.category}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{template.sector}</Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      leftIcon={<DocumentTextIcon className="w-4 h-4" />}
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Usar Template
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<PencilSquareIcon className="w-4 h-4" />}
                      onClick={() => handleEditTemplate(template.id)}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && templates.length > 0 && (
            <Card variant="glass">
              <div className="text-center py-12">
                <FunnelIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum template encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros de busca
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedSector('all');
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </Card>
          )}

          {filteredTemplates.length === 0 && templates.length === 0 && (
            <Card variant="glass">
              <div className="text-center py-12">
                <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum template disponível
                </h3>
                <p className="text-gray-600 mb-4">
                  Comece criando seu primeiro template personalizado
                </p>
                <Button
                  leftIcon={<PlusIcon className="w-5 h-5" />}
                  onClick={() => router.push('/dashboard/templates/create')}
                >
                  Criar Novo Template
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
