// ============================================================================
// Templates Gallery Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import { Button, Card, Badge } from '@/components/UI';
import { InDevelopmentInline } from '@/components/Development';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos', count: 24 },
    { id: 'services', name: 'Serviços', count: 8 },
    { id: 'products', name: 'Produtos', count: 6 },
    { id: 'consulting', name: 'Consultoria', count: 5 },
    { id: 'projects', name: 'Projetos', count: 5 },
  ];

  const sectors = [
    { id: 'all', name: 'Todos os Setores' },
    { id: 'tech', name: 'Tecnologia' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'construction', name: 'Construção' },
    { id: 'design', name: 'Design' },
    { id: 'consulting', name: 'Consultoria' },
    { id: 'education', name: 'Educação' },
  ];

  const templates = [
    { id: 1, name: 'Desenvolvimento de Software', category: 'services', sector: 'tech', style: 'modern', color: 'from-blue-500 to-cyan-500', featured: true },
    { id: 2, name: 'Campanha de Marketing Digital', category: 'services', sector: 'marketing', style: 'creative', color: 'from-purple-500 to-pink-500', featured: true },
    { id: 3, name: 'Consultoria Empresarial', category: 'consulting', sector: 'consulting', style: 'classic', color: 'from-green-500 to-emerald-500', featured: false },
    { id: 4, name: 'Design de Identidade Visual', category: 'services', sector: 'design', style: 'minimal', color: 'from-orange-500 to-red-500', featured: true },
    { id: 5, name: 'Plataforma E-commerce', category: 'products', sector: 'tech', style: 'modern', color: 'from-indigo-500 to-blue-500', featured: false },
    { id: 6, name: 'Projeto de Construção', category: 'projects', sector: 'construction', style: 'classic', color: 'from-yellow-500 to-orange-500', featured: false },
    { id: 7, name: 'App Mobile', category: 'products', sector: 'tech', style: 'modern', color: 'from-teal-500 to-green-500', featured: false },
    { id: 8, name: 'Curso Online', category: 'services', sector: 'education', style: 'minimal', color: 'from-pink-500 to-rose-500', featured: false },
    { id: 9, name: 'Reforma Residencial', category: 'projects', sector: 'construction', style: 'classic', color: 'from-amber-500 to-yellow-500', featured: false },
    { id: 10, name: 'SEO e Analytics', category: 'services', sector: 'marketing', style: 'modern', color: 'from-violet-500 to-purple-500', featured: true },
    { id: 11, name: 'Website Corporativo', category: 'products', sector: 'tech', style: 'minimal', color: 'from-sky-500 to-blue-500', featured: false },
    { id: 12, name: 'Consultoria Financeira', category: 'consulting', sector: 'consulting', style: 'classic', color: 'from-emerald-500 to-teal-500', featured: false },
  ];

  const filteredTemplates = templates.filter((template) => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const sectorMatch = selectedSector === 'all' || template.sector === selectedSector;
    return categoryMatch && sectorMatch;
  });

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
                  {filteredTemplates.length} templates encontrados
                </p>
                <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none">
                  <option>Mais Recentes</option>
                  <option>Mais Populares</option>
                  <option>A-Z</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="group cursor-pointer"
                  >
                    <div className={`relative aspect-[4/5] rounded-xl bg-gradient-to-br ${template.color} p-1 overflow-hidden transition-transform group-hover:scale-105`}>
                      {template.featured && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge variant="warning" size="sm">
                            ⭐ Destaque
                          </Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors" />
                      <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                        <DocumentTextIcon className="w-16 h-16 mb-4 opacity-80" />
                        <h3 className="text-xl font-semibold text-center">{template.name}</h3>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" fullWidth>
                        Visualizar Template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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
