// ============================================================================
// Templates Gallery Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import { Button, Card, Badge } from '@/components/UI';
import { InDevelopmentInline } from '@/components/Development';
import { api } from '@/lib/api';

interface Template {
  id: string;
  name: string;
  category: string;
  sector: string;
  description: string;
  thumbnail: string;
  fields: any[];
  content_template: any;
  created_at?: string;
}

export default function TemplatesPage() {
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
    fetchCategories();
    fetchSectors();
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

  const fetchCategories = async () => {
    try {
      const response = await api.get('/templates/categories');
      if (response.data.success) {
        const cats = response.data.data.categories || [];
        // Add "all" option and count templates per category
        const categoriesWithCount = cats.map((cat: string) => ({
          id: cat,
          name: cat,
          count: 0 // Will be calculated from templates
        }));
        setCategories([
          { id: 'all', name: 'Todos', count: 0 },
          ...categoriesWithCount
        ]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSectors = async () => {
    try {
      const response = await api.get('/templates/sectors');
      if (response.data.success) {
        const sects = response.data.data.sectors || [];
        setSectors([
          { id: 'all', name: 'Todos os Setores' },
          ...sects.map((s: string) => ({ id: s, name: s }))
        ]);
      }
    } catch (err) {
      console.error('Error fetching sectors:', err);
    }
  };

  // Calculate category counts
  useEffect(() => {
    if (templates.length > 0 && categories.length > 0) {
      const updatedCategories = categories.map(cat => {
        if (cat.id === 'all') {
          return { ...cat, count: templates.length };
        }
        return {
          ...cat,
          count: templates.filter(t => t.category === cat.id).length
        };
      });
      setCategories(updatedCategories);
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

  // Color mapping for template cards
  const getTemplateColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Tecnologia': 'from-blue-500 to-cyan-500',
      'Marketing': 'from-purple-500 to-pink-500',
      'Imóveis': 'from-green-500 to-emerald-500',
      'Veículos': 'from-orange-500 to-red-500',
      'Serviços Profissionais': 'from-indigo-500 to-blue-500',
      'Serviços Residenciais': 'from-yellow-500 to-orange-500',
      'Serviços Pessoais': 'from-teal-500 to-green-500',
      'Educação': 'from-pink-500 to-rose-500',
    };
    return colorMap[category] || 'from-gray-500 to-slate-500';
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Templates Profissionais
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha entre dezenas de templates prontos e comece em segundos
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar templates..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Templates */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <Card variant="glass">
                <div className="flex items-center gap-2 mb-4">
                  <FunnelIcon className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Filtros</h3>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Categoria</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <Badge variant={selectedCategory === cat.id ? 'primary' : 'default'} size="sm">
                          {cat.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sector Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Setor</h4>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                  >
                    {sectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Style Filter - Placeholder */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Estilo</h4>
                  <InDevelopmentInline
                    title="Filtro de Estilo"
                    description="Moderno, Clássico, Minimalista..."
                  />
                </div>
              </Card>
            </div>

            {/* Templates Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {loading ? 'Carregando...' : `${filteredTemplates.length} templates encontrados`}
                </p>
                <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none">
                  <option>Mais Recentes</option>
                  <option>Mais Populares</option>
                  <option>A-Z</option>
                </select>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Carregando templates...</p>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <Card variant="glass" className="p-6">
                  <p className="text-red-600 text-center">{error}</p>
                  <Button variant="outline" onClick={fetchTemplates} className="mt-4 mx-auto">
                    Tentar Novamente
                  </Button>
                </Card>
              )}

              {/* Templates Grid */}
              {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="group cursor-pointer"
                    >
                      <div className={`relative aspect-[4/5] rounded-xl bg-gradient-to-br ${getTemplateColor(template.category)} p-1 overflow-hidden transition-transform group-hover:scale-105`}>
                        <div className="absolute top-4 right-4 z-10">
                          <Badge variant="default" size="sm">
                            {template.sector}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors" />
                        <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                          <DocumentTextIcon className="w-16 h-16 mb-4 opacity-80" />
                          <h3 className="text-xl font-semibold text-center mb-2">{template.name}</h3>
                          <p className="text-sm text-white/80 text-center line-clamp-2">{template.description}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <Button variant="outline" size="sm" fullWidth>
                          Visualizar Template
                        </Button>
                        <p className="text-xs text-gray-500 text-center">{template.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && filteredTemplates.length === 0 && (
                <Card variant="glass" className="p-12 text-center">
                  <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 text-lg font-medium mb-2">Nenhum template encontrado</p>
                  <p className="text-gray-500">Tente ajustar os filtros ou buscar por outros termos</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Não encontrou o template ideal?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Crie seu próprio template personalizado com nosso editor visual
          </p>
          <Button size="lg">Criar Template Personalizado</Button>
        </div>
      </section>
    </PublicLayout>
  );
}
