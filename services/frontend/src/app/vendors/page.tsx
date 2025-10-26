// ============================================================================
// Vendors Management - Client Portal
// Manage vendor relationships, favorites, and communication history
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  ClockIcon,
  CalendarIcon,
  CheckCircleIcon,
  TagIcon,
  HeartIcon,
  EyeIcon,
  Squares2X2Icon,
  ListBulletIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Card, Button, Badge, StatCard, Input, Select, Avatar } from '@/components/UI';

export default function VendorsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Mock data - In production, this would come from API
  const stats = {
    totalVendors: 15,
    activeProjects: 8,
    favorites: 6,
    averageRating: 4.7,
  };

  const vendors = [
    {
      id: '1',
      providerId: 'prov-001',
      name: 'Arquitetura Silva & Santos',
      company: 'Silva & Santos Ltda',
      category: ['Arquitetura', 'Urbanismo'],
      email: 'contato@silvasantos.com.br',
      phone: '(11) 98765-4321',
      whatsapp: '(11) 98765-4321',
      location: 'São Paulo, SP',
      rating: 4.8,
      totalProjects: 5,
      activeProjects: 2,
      totalProposals: 8,
      isFavorite: true,
      lastContact: '2025-01-12T14:30:00',
      addedAt: '2024-08-15',
      tags: ['Confiável', 'Bom Preço', 'Pontual'],
      notes: 'Excelente trabalho no projeto da casa. Muito atencioso e profissional.',
      avatar: '',
    },
    {
      id: '2',
      providerId: 'prov-002',
      name: 'Construtora Oliveira',
      company: 'Oliveira Construções e Reformas',
      category: ['Construção', 'Reforma'],
      email: 'orcamentos@oliveiraconstrucoes.com',
      phone: '(11) 3456-7890',
      whatsapp: '(11) 98123-4567',
      location: 'São Paulo, SP',
      rating: 4.6,
      totalProjects: 3,
      activeProjects: 1,
      totalProposals: 5,
      isFavorite: true,
      lastContact: '2025-01-10T09:00:00',
      addedAt: '2024-09-20',
      tags: ['Qualidade', 'Prazo'],
      notes: 'Reforma da cozinha ficou perfeita. Cumpriram o prazo.',
      avatar: '',
    },
    {
      id: '3',
      providerId: 'prov-003',
      name: 'Design Interiores Premium',
      company: 'Premium Design Studio',
      category: ['Design de Interiores', 'Decoração'],
      email: 'hello@premiumdesign.com.br',
      phone: '(11) 91234-5678',
      whatsapp: '(11) 91234-5678',
      location: 'São Paulo, SP',
      rating: 5.0,
      totalProjects: 2,
      activeProjects: 1,
      totalProposals: 3,
      isFavorite: true,
      lastContact: '2025-01-13T16:00:00',
      addedAt: '2024-10-05',
      tags: ['Criativo', 'Sofisticado'],
      notes: 'Design impecável, atenção aos detalhes.',
      avatar: '',
    },
    {
      id: '4',
      providerId: 'prov-004',
      name: 'Jardins Verdes Paisagismo',
      company: 'Jardins Verdes Paisagismo e Jardinagem',
      category: ['Paisagismo', 'Jardinagem'],
      email: 'contato@jardinsverdes.com',
      phone: '(11) 99876-5432',
      whatsapp: '(11) 99876-5432',
      location: 'Cotia, SP',
      rating: 4.7,
      totalProjects: 1,
      activeProjects: 0,
      totalProposals: 2,
      isFavorite: true,
      lastContact: '2024-12-28T11:00:00',
      addedAt: '2024-11-15',
      tags: ['Sustentável', 'Criativo'],
      notes: 'Projeto de paisagismo ficou lindo. Sistema de irrigação funcionando perfeitamente.',
      avatar: '',
    },
    {
      id: '5',
      providerId: 'prov-005',
      name: 'Elétrica Pro Instalações',
      company: 'Elétrica Pro Ltda',
      category: ['Elétrica', 'Energia Solar'],
      email: 'orcamento@eletricapro.com',
      phone: '(11) 3789-4561',
      whatsapp: '(11) 98456-7890',
      location: 'São Paulo, SP',
      rating: 4.5,
      totalProjects: 1,
      activeProjects: 1,
      totalProposals: 2,
      isFavorite: false,
      lastContact: '2025-01-08T14:00:00',
      addedAt: '2024-12-10',
      tags: ['Técnico', 'Certificado'],
      notes: 'Instalação do sistema solar em andamento. Muito profissionais.',
      avatar: '',
    },
    {
      id: '6',
      providerId: 'prov-006',
      name: 'Marcenaria Artesanal Premium',
      company: 'Premium Marcenaria',
      category: ['Marcenaria', 'Móveis Planejados'],
      email: 'vendas@premiummarcenaria.com',
      phone: '(11) 3654-9870',
      whatsapp: '(11) 99654-3210',
      location: 'Osasco, SP',
      rating: 4.9,
      totalProjects: 1,
      activeProjects: 1,
      totalProposals: 2,
      isFavorite: true,
      lastContact: '2025-01-12T10:00:00',
      addedAt: '2024-12-20',
      tags: ['Artesanal', 'Qualidade Premium'],
      notes: 'Móveis do home office em produção. Acabamento impecável.',
      avatar: '',
    },
    {
      id: '7',
      providerId: 'prov-007',
      name: 'Pisos & Revestimentos Ltda',
      company: 'Pisos e Revestimentos São Paulo',
      category: ['Acabamentos', 'Pisos'],
      email: 'vendas@pisosrevestimentos.com',
      phone: '(11) 3987-6543',
      whatsapp: '(11) 98321-6547',
      location: 'São Paulo, SP',
      rating: 4.4,
      totalProjects: 0,
      activeProjects: 0,
      totalProposals: 1,
      isFavorite: false,
      lastContact: '2025-01-03T10:00:00',
      addedAt: '2025-01-02',
      tags: ['Variedade'],
      notes: 'Proposta rejeitada por valor alto.',
      avatar: '',
    },
    {
      id: '8',
      providerId: 'prov-008',
      name: 'Pintura Profissional Express',
      company: 'Express Pinturas',
      category: ['Pintura', 'Textura'],
      email: 'atendimento@expresspinturas.com',
      phone: '(11) 3123-4567',
      whatsapp: '(11) 97456-1230',
      location: 'São Paulo, SP',
      rating: 4.6,
      totalProjects: 0,
      activeProjects: 0,
      totalProposals: 1,
      isFavorite: false,
      lastContact: '2025-01-15T08:00:00',
      addedAt: '2025-01-14',
      tags: ['Rápido'],
      notes: 'Proposta nova recebida hoje.',
      avatar: '',
    },
    {
      id: '9',
      providerId: 'prov-009',
      name: 'Hidráulica & Aquecimento',
      company: 'Hidráulica Master Ltda',
      category: ['Hidráulica', 'Aquecimento'],
      email: 'contato@hidraulicamaster.com',
      phone: '(11) 3789-0123',
      whatsapp: '(11) 98765-0123',
      location: 'Barueri, SP',
      rating: 4.5,
      totalProjects: 1,
      activeProjects: 0,
      totalProposals: 2,
      isFavorite: true,
      lastContact: '2024-11-20T15:30:00',
      addedAt: '2024-09-10',
      tags: ['Especializado', 'Pontual'],
      notes: 'Instalação de aquecedor a gás feita com perfeição.',
      avatar: '',
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Arquitetura': 'bg-blue-100 text-blue-700',
      'Construção': 'bg-orange-100 text-orange-700',
      'Design de Interiores': 'bg-purple-100 text-purple-700',
      'Paisagismo': 'bg-green-100 text-green-700',
      'Elétrica': 'bg-yellow-100 text-yellow-700',
      'Marcenaria': 'bg-amber-100 text-amber-700',
      'Acabamentos': 'bg-cyan-100 text-cyan-700',
      'Pintura': 'bg-pink-100 text-pink-700',
      'Hidráulica': 'bg-teal-100 text-teal-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths > 0) return `${diffMonths} mês${diffMonths > 1 ? 'es' : ''} atrás`;
    if (diffDays > 0) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    return 'Hoje';
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory = filterCategory === 'all' || vendor.category.includes(filterCategory);
    const matchesRating = filterRating === 'all' || vendor.rating >= parseFloat(filterRating);
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || vendor.isFavorite;
    return matchesCategory && matchesRating && matchesSearch && matchesFavorite;
  });

  const categories = [...new Set(vendors.flatMap((v) => v.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Fornecedores</h1>
              <p className="text-gray-600 mt-1">
                Gerencie seus fornecedores favoritos e histórico de colaborações
              </p>
            </div>
            <Link href="/marketplace">
              <Button
                leftIcon={<PlusIcon className="w-5 h-5" />}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
              >
                Adicionar Fornecedor
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total de Fornecedores"
              value={stats.totalVendors.toString()}
              icon={<UserGroupIcon className="w-6 h-6" />}
              variant="info"
            />
            <StatCard
              label="Projetos Ativos"
              value={stats.activeProjects.toString()}
              icon={<BriefcaseIcon className="w-6 h-6" />}
              variant="success"
            />
            <StatCard
              label="Favoritos"
              value={stats.favorites.toString()}
              icon={<HeartIcon className="w-6 h-6" />}
              variant="warning"
            />
            <StatCard
              label="Avaliação Média"
              value={stats.averageRating.toString()}
              icon={<StarIcon className="w-6 h-6" />}
              variant="success"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
            <Input
              placeholder="Buscar por nome, empresa, categoria ou localização..."
              leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="glass"
              className="flex-1 md:w-96"
            />
            <Select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              variant="glass"
              className="w-48"
            >
              <option value="all">Todas as Categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <Select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              variant="glass"
              className="w-40"
            >
              <option value="all">Todas Avaliações</option>
              <option value="4.5">4.5+ ⭐</option>
              <option value="4.0">4.0+ ⭐</option>
              <option value="3.5">3.5+ ⭐</option>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={showFavoritesOnly ? 'primary' : 'outline'}
              leftIcon={showFavoritesOnly ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
              className={showFavoritesOnly ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' : 'border-green-600 text-green-600 hover:bg-green-50'}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              Favoritos
            </Button>
            <div className="flex items-center gap-2 glass-card p-1 rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' : ''}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' : ''}
              >
                <ListBulletIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Vendors Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              variant="glass"
              hoverable
              className={viewMode === 'list' ? 'p-6' : ''}
            >
              <div className={viewMode === 'grid' ? 'p-6' : ''}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar name={vendor.name} size="lg" theme="client" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{vendor.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{vendor.company}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <StarIconSolid className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{vendor.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{vendor.totalProjects} projetos</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    onClick={() => {/* Toggle favorite */}}
                  >
                    {vendor.isFavorite ? (
                      <HeartIconSolid className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {vendor.category.map((cat, index) => (
                    <span key={index} className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(cat)}`}>
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{vendor.location}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-2 bg-green-50 rounded text-center">
                    <p className="text-xs text-gray-600">Projetos</p>
                    <p className="text-lg font-bold text-gray-900">{vendor.totalProjects}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded text-center">
                    <p className="text-xs text-gray-600">Ativos</p>
                    <p className="text-lg font-bold text-gray-900">{vendor.activeProjects}</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded text-center">
                    <p className="text-xs text-gray-600">Propostas</p>
                    <p className="text-lg font-bold text-gray-900">{vendor.totalProposals}</p>
                  </div>
                </div>

                {/* Tags */}
                {vendor.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {vendor.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Notes */}
                {vendor.notes && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 italic">
                    "{vendor.notes}"
                  </p>
                )}

                {/* Last Contact */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <ClockIcon className="w-4 h-4" />
                  <span>Último contato: {getTimeAgo(vendor.lastContact)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<EyeIcon className="w-4 h-4" />}
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Ver Perfil
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    leftIcon={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white"
                  >
                    Mensagem
                  </Button>
                </div>

                {/* Contact Info (List View Only) */}
                {viewMode === 'list' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <EnvelopeIcon className="w-4 h-4" />
                      <span className="truncate">{vendor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <PhoneIcon className="w-4 h-4" />
                      <span>{vendor.phone}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <Card variant="glass">
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                <UserGroupIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum fornecedor encontrado</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterCategory !== 'all' || showFavoritesOnly
                  ? 'Tente ajustar os filtros de busca'
                  : 'Você ainda não adicionou nenhum fornecedor'}
              </p>
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  Buscar Fornecedores no Marketplace
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
