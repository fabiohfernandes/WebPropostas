'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import {
  Input,
  Select,
  Button,
  Card,
  Badge,
  Avatar,
  Skeleton,
  Tabs,
  TabPanel
} from '@/components/UI';

// Types
interface ServiceProvider {
  id: string;
  name: string;
  company: string;
  logo?: string;
  tagline: string;
  category: string;
  subcategory: string;
  location: {
    city: string;
    state: string;
  };
  rating: number;
  reviewCount: number;
  projectCount: number;
  responseTime: string;
  startingPrice?: number;
  verified: boolean;
  featured: boolean;
  tags: string[];
}

interface FilterOptions {
  category?: string;
  location?: string;
  priceRange?: string;
  rating?: number;
}

// Mock data - replace with API call
const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'João Silva',
    company: 'Silva Construções',
    tagline: 'Especialistas em construção residencial e comercial',
    category: 'Construção',
    subcategory: 'Construção Civil',
    location: { city: 'São Paulo', state: 'SP' },
    rating: 4.8,
    reviewCount: 42,
    projectCount: 87,
    responseTime: '2 horas',
    startingPrice: 50000,
    verified: true,
    featured: true,
    tags: ['Residencial', 'Comercial', 'Reforma']
  },
  {
    id: '2',
    name: 'Maria Santos',
    company: 'Design & Interiores MS',
    tagline: 'Design de interiores personalizado para seu espaço',
    category: 'Design',
    subcategory: 'Design de Interiores',
    location: { city: 'Rio de Janeiro', state: 'RJ' },
    rating: 4.9,
    reviewCount: 68,
    projectCount: 124,
    responseTime: '1 hora',
    startingPrice: 15000,
    verified: true,
    featured: true,
    tags: ['Residencial', 'Corporativo', '3D']
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    company: 'Tech Solutions Pro',
    tagline: 'Desenvolvimento de software e aplicativos móveis',
    category: 'Tecnologia',
    subcategory: 'Desenvolvimento de Software',
    location: { city: 'Florianópolis', state: 'SC' },
    rating: 4.7,
    reviewCount: 31,
    projectCount: 56,
    responseTime: '4 horas',
    startingPrice: 25000,
    verified: true,
    featured: false,
    tags: ['Web', 'Mobile', 'Cloud']
  }
];

const categories = [
  { value: '', label: 'Todas as Categorias' },
  { value: 'construcao', label: 'Construção' },
  { value: 'design', label: 'Design' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'consultoria', label: 'Consultoria' }
];

const locations = [
  { value: '', label: 'Todas as Localizações' },
  { value: 'sp', label: 'São Paulo - SP' },
  { value: 'rj', label: 'Rio de Janeiro - RJ' },
  { value: 'sc', label: 'Florianópolis - SC' },
  { value: 'mg', label: 'Belo Horizonte - MG' }
];

const priceRanges = [
  { value: '', label: 'Qualquer Valor' },
  { value: '0-10000', label: 'Até R$ 10.000' },
  { value: '10000-50000', label: 'R$ 10.000 - R$ 50.000' },
  { value: '50000-100000', label: 'R$ 50.000 - R$ 100.000' },
  { value: '100000+', label: 'Acima de R$ 100.000' }
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('all');

  // Load providers (mock data for now)
  useEffect(() => {
    setTimeout(() => {
      setProviders(mockProviders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter providers based on search and filters
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      searchQuery === '' ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !filters.category || provider.category === filters.category;
    const matchesLocation = !filters.location || provider.location.state.toLowerCase() === filters.location;
    const matchesRating = !filters.rating || provider.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesLocation && matchesRating;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
      {/* Hero Header */}
      <div className="glass-card-client border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Encontre o Profissional Ideal para Seu Projeto
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conecte-se com prestadores de serviços verificados e qualificados em todo o Brasil
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-4xl mx-auto">
            <Card variant="glass-client" theme="client">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar por serviço, profissional ou empresa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="glass-client"
                    theme="client"
                    leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                <Button variant="primary" theme="client" size="lg">
                  <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Tabs */}
        <div className="mb-8">
          <Card variant="glass-client" theme="client">
            <Tabs
              tabs={[
                { id: 'all', label: 'Todos os Profissionais', badge: filteredProviders.length },
                { id: 'featured', label: 'Em Destaque', badge: filteredProviders.filter(p => p.featured).length },
                { id: 'verified', label: 'Verificados', badge: filteredProviders.filter(p => p.verified).length },
                { id: 'favorites', label: 'Favoritos', badge: favorites.size }
              ]}
              variant="pills"
              theme="client"
              defaultTab="all"
              onChange={setActiveTab}
            />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Categoria"
                options={categories}
                variant="glass-client"
                theme="client"
                value={filters.category || ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              />
              <Select
                label="Localização"
                options={locations}
                variant="glass-client"
                theme="client"
                value={filters.location || ''}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
              <Select
                label="Faixa de Preço"
                options={priceRanges}
                variant="glass-client"
                theme="client"
                value={filters.priceRange || ''}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              />
            </div>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-700">
            <span className="font-semibold">{filteredProviders.length}</span> profissionais encontrados
          </p>
          <Button variant="ghost" theme="client" size="sm">
            <FunnelIcon className="h-4 w-4 mr-2" />
            Mais Filtros
          </Button>
        </div>

        {/* Provider Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} variant="rectangular" width="100%" height={320} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <Card
                key={provider.id}
                variant="glass-client"
                theme="client"
                hoverable
                className="relative"
              >
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(provider.id)}
                  className="absolute top-4 right-4 p-2 rounded-full glass-client hover:scale-110 transition-transform z-10"
                >
                  {favorites.has(provider.id) ? (
                    <HeartIconSolid className="h-5 w-5 text-client-600" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>

                {/* Featured Badge */}
                {provider.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="success">Em Destaque</Badge>
                  </div>
                )}

                {/* Provider Header */}
                <div className="flex items-start gap-4 mb-4 mt-8">
                  <Avatar
                    src={provider.logo}
                    fallback={provider.name.charAt(0)}
                    size="xl"
                    theme="client"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                      {provider.verified && (
                        <CheckBadgeIcon className="h-5 w-5 text-client-600" title="Verificado" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{provider.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                      <span className="text-sm text-gray-500">({provider.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm text-gray-700 mb-4">{provider.tagline}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 glass-client rounded-lg">
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      <span>Projetos</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{provider.projectCount}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>Localização</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {provider.location.city}, {provider.location.state}
                    </p>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    {provider.startingPrice && (
                      <>
                        <p className="text-xs text-gray-600">A partir de</p>
                        <p className="text-lg font-bold text-client-600">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(provider.startingPrice)}
                        </p>
                      </>
                    )}
                  </div>
                  <Link href={`/marketplace/${provider.id}`}>
                    <Button variant="primary" theme="client" size="sm">
                      Ver Perfil
                    </Button>
                  </Link>
                </div>

                {/* Response Time */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    Tempo médio de resposta: <span className="font-medium text-gray-900">{provider.responseTime}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProviders.length === 0 && (
          <Card variant="glass-client" theme="client">
            <div className="text-center py-12">
              <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum profissional encontrado</h3>
              <p className="mt-2 text-sm text-gray-600">
                Tente ajustar seus filtros ou termos de busca.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  theme="client"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* CTA Section */}
        <div className="mt-12">
          <Card variant="glass-client" theme="client" className="text-center">
            <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-client-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Não encontrou o que procura?
            </h2>
            <p className="text-gray-600 mb-6">
              Publique seu projeto e receba propostas personalizadas de profissionais qualificados.
            </p>
            <Button variant="primary" theme="client" size="lg">
              Publicar Projeto Gratuitamente
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
