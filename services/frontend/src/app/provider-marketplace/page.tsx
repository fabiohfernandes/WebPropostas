// ============================================================================
// Provider Marketplace Listings - Provider Portal
// Manage marketplace profile, visibility, and service listings
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  GlobeAltIcon,
  MapPinIcon,
  ChartBarIcon,
  TrendingUpIcon,
  UserGroupIcon,
  StarIcon,
  DocumentTextIcon,
  PhotoIcon,
  TagIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BoltIcon,
  ShieldCheckIcon,
  MagnifyingGlassCircleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Card, Button, Badge, StatCard, Input, Select, Tabs, Progress, Avatar } from '@/components/UI';

export default function ProviderMarketplacePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileStatus, setProfileStatus] = useState<'active' | 'inactive'>('active');

  // Mock data - In production, this would come from API
  const stats = {
    profileViews: 2450,
    contactRequests: 87,
    proposalRequests: 45,
    conversionRate: 18.4,
    averageRating: 4.8,
    totalReviews: 124,
    responseRate: 95,
    responseTime: 2.5, // hours
  };

  const listing = {
    id: '1',
    isActive: true,
    profile: {
      name: 'Construtora Silva & Arquitetura',
      company: 'Silva Construções Ltda',
      description:
        'Somos especialistas em construção civil, reforma e projetos arquitetônicos com mais de 15 anos de experiência. Nossa equipe é formada por profissionais qualificados e certificados.',
      logo: '',
      coverImage: '',
      phone: '(11) 98765-4321',
      email: 'contato@silvaconstrucoes.com.br',
      website: 'www.silvaconstrucoes.com.br',
    },
    services: {
      categories: ['Construção', 'Reforma', 'Arquitetura', 'Projeto Estrutural'],
      offerings: [
        'Construção de casas e edifícios',
        'Reformas residenciais e comerciais',
        'Projetos arquitetônicos',
        'Regularização de obras',
        'Laudos técnicos',
      ],
      priceRange: { min: 5000, max: 500000 },
    },
    serviceArea: {
      cities: ['São Paulo', 'Guarulhos', 'Osasco', 'Santo André', 'São Bernardo do Campo'],
      states: ['SP'],
      nationwide: false,
    },
    portfolio: [
      {
        id: '1',
        title: 'Casa Moderna em Condomínio Fechado',
        images: [''],
        description: '350m² de área construída com design contemporâneo',
        category: 'Construção',
        year: 2024,
      },
      {
        id: '2',
        title: 'Reforma Apartamento Alto Padrão',
        images: [''],
        description: 'Reforma completa de apartamento 180m² em Moema',
        category: 'Reforma',
        year: 2024,
      },
      {
        id: '3',
        title: 'Projeto Arquitetônico Residencial',
        images: [''],
        description: 'Casa térrea com 280m² em terreno de esquina',
        category: 'Arquitetura',
        year: 2023,
      },
    ],
    analytics: {
      viewsThisMonth: 450,
      viewsLastMonth: 380,
      contactRequestsThisMonth: 18,
      contactRequestsLastMonth: 15,
      proposalRequestsThisMonth: 9,
      proposalRequestsLastMonth: 7,
      conversionRate: 18.4,
      topSearchKeywords: ['reforma', 'construção', 'projeto arquitetônico', 'casa', 'construção são paulo'],
    },
    rating: {
      average: 4.8,
      total: 124,
      breakdown: {
        5: 92,
        4: 24,
        3: 6,
        2: 1,
        1: 1,
      },
    },
    badges: [
      { id: '1', name: 'Verificado', icon: <ShieldCheckIcon className="w-4 h-4" />, color: 'bg-green-100 text-green-700' },
      { id: '2', name: 'Resposta Rápida', icon: <BoltIcon className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700' },
      { id: '3', name: 'Top Rated', icon: <StarIcon className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-700' },
    ],
    seoKeywords: ['construção são paulo', 'reforma residencial', 'projeto arquitetônico', 'construtora zona sul'],
    lastUpdated: '2025-01-10T14:30:00',
  };

  const recentLeads = [
    { id: '1', name: 'João Silva', service: 'Reforma de Cozinha', value: 35000, receivedAt: '2025-01-15T10:00:00', status: 'pending' },
    { id: '2', name: 'Maria Santos', service: 'Construção de Casa', value: 450000, receivedAt: '2025-01-14T15:30:00', status: 'responded' },
    { id: '3', name: 'Carlos Oliveira', service: 'Projeto Arquitetônico', value: 18000, receivedAt: '2025-01-13T09:45:00', status: 'responded' },
    { id: '4', name: 'Ana Costa', service: 'Reforma Banheiro', value: 22000, receivedAt: '2025-01-12T14:20:00', status: 'converted' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getLeadStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'warning' as const, label: 'Pendente' },
      responded: { variant: 'info' as const, label: 'Respondido' },
      converted: { variant: 'success' as const, label: 'Convertido' },
      lost: { variant: 'danger' as const, label: 'Perdido' },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const viewsGrowth = ((listing.analytics.viewsThisMonth - listing.analytics.viewsLastMonth) / listing.analytics.viewsLastMonth) * 100;
  const contactsGrowth = ((listing.analytics.contactRequestsThisMonth - listing.analytics.contactRequestsLastMonth) / listing.analytics.contactRequestsLastMonth) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Anúncios no Marketplace</h1>
              <p className="text-gray-600 mt-1">Gerencie seu perfil profissional e visibilidade no marketplace</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge
                  variant={listing.isActive ? 'success' : 'neutral'}
                  icon={listing.isActive ? <CheckCircleIcon className="w-4 h-4" /> : <XCircleIcon className="w-4 h-4" />}
                >
                  {listing.isActive ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <Button
                variant="outline"
                leftIcon={<EyeIcon className="w-5 h-5" />}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Visualizar Perfil Público
              </Button>
              <Button
                leftIcon={<PencilIcon className="w-5 h-5" />}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              >
                Editar Perfil
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Visualizações"
              value={stats.profileViews.toString()}
              icon={<EyeIcon className="w-6 h-6" />}
              variant="info"
              trend={viewsGrowth}
            />
            <StatCard
              label="Solicitações de Contato"
              value={stats.contactRequests.toString()}
              icon={<EnvelopeIcon className="w-6 h-6" />}
              variant="success"
              trend={contactsGrowth}
            />
            <StatCard
              label="Pedidos de Proposta"
              value={stats.proposalRequests.toString()}
              icon={<DocumentTextIcon className="w-6 h-6" />}
              variant="warning"
            />
            <StatCard
              label="Taxa de Conversão"
              value={`${stats.conversionRate}%`}
              icon={<TrendingUpIcon className="w-6 h-6" />}
              variant="success"
              trend={2.3}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'profile', label: 'Perfil' },
            { id: 'portfolio', label: 'Portfólio', badge: listing.portfolio.length },
            { id: 'analytics', label: 'Analytics' },
            { id: 'reviews', label: 'Avaliações', badge: listing.rating.total },
            { id: 'leads', label: 'Leads', badge: recentLeads.filter((l) => l.status === 'pending').length },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="mb-6"
        />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="glass" className="border-l-4 border-green-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Taxa de Resposta</h3>
                    <BoltIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.responseRate}%</p>
                  <p className="text-sm text-gray-500 mt-1">Média da plataforma: 75%</p>
                  <Progress value={stats.responseRate} variant="provider" className="mt-3" />
                </div>
              </Card>

              <Card variant="glass" className="border-l-4 border-yellow-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Tempo de Resposta</h3>
                    <ChartBarIcon className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.responseTime}h</p>
                  <p className="text-sm text-gray-500 mt-1">Média da plataforma: 8h</p>
                  <Badge variant="success" size="sm" className="mt-3">Excelente</Badge>
                </div>
              </Card>

              <Card variant="glass" className="border-l-4 border-blue-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Avaliação Média</h3>
                    <StarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(stats.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{stats.totalReviews} avaliações</p>
                </div>
              </Card>
            </div>

            {/* Badges */}
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seus Badges</h3>
                <div className="flex flex-wrap gap-3">
                  {listing.badges.map((badge) => (
                    <div key={badge.id} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${badge.color}`}>
                      {badge.icon}
                      <span className="font-medium">{badge.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Badges aumentam sua credibilidade e melhoram seu rankeamento nas buscas.
                </p>
              </div>
            </Card>

            {/* Service Areas */}
            <Card variant="glass">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Áreas de Atendimento</h3>
                  <Button variant="ghost" size="sm" leftIcon={<PencilIcon className="w-4 h-4" />}>
                    Editar
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Cidades atendidas:</p>
                      <p className="text-sm text-gray-600">{listing.serviceArea.cities.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GlobeAltIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Estados:</p>
                      <p className="text-sm text-gray-600">{listing.serviceArea.states.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card variant="glass">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Informações do Perfil</h3>
                  <Button variant="outline" leftIcon={<PencilIcon className="w-4 h-4" />}>
                    Editar
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nome/Empresa</label>
                    <p className="text-gray-900 mt-1">{listing.profile.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Razão Social</label>
                    <p className="text-gray-900 mt-1">{listing.profile.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Descrição</label>
                    <p className="text-gray-700 mt-1">{listing.profile.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Telefone</label>
                      <p className="text-gray-900 mt-1">{listing.profile.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900 mt-1">{listing.profile.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Website</label>
                    <p className="text-gray-900 mt-1">{listing.profile.website}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Serviços Oferecidos</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Categorias</label>
                    <div className="flex flex-wrap gap-2">
                      {listing.services.categories.map((category, index) => (
                        <Badge key={index} variant="info">{category}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Serviços</label>
                    <ul className="space-y-2">
                      {listing.services.offerings.map((service, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircleIcon className="w-4 h-4 text-green-600" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Faixa de Preço</label>
                    <p className="text-gray-900 mt-1">
                      {formatCurrency(listing.services.priceRange.min)} - {formatCurrency(listing.services.priceRange.max)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">{listing.portfolio.length} projetos no portfólio</p>
              <Button leftIcon={<PlusIcon className="w-5 h-5" />} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                Adicionar Projeto
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listing.portfolio.map((project) => (
                <Card key={project.id} variant="glass" hoverable>
                  <div className="p-6">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                      <PhotoIcon className="w-16 h-16 text-blue-400" />
                    </div>
                    <Badge variant="info" size="sm" className="mb-2">{project.category}</Badge>
                    <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{project.year}</span>
                      <Button variant="ghost" size="sm" leftIcon={<EyeIcon className="w-4 h-4" />}>Ver</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Este Mês</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Visualizações</p>
                    <p className="text-2xl font-bold text-gray-900">{listing.analytics.viewsThisMonth}</p>
                    <p className="text-sm text-green-600 mt-1">+{viewsGrowth.toFixed(1)}% vs mês passado</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Contatos</p>
                    <p className="text-2xl font-bold text-gray-900">{listing.analytics.contactRequestsThisMonth}</p>
                    <p className="text-sm text-green-600 mt-1">+{contactsGrowth.toFixed(1)}% vs mês passado</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Propostas</p>
                    <p className="text-2xl font-bold text-gray-900">{listing.analytics.proposalRequestsThisMonth}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Palavras-chave Mais Buscadas</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.analytics.topSearchKeywords.map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Essas são as palavras-chave que mais trouxeram clientes para seu perfil.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <Card variant="glass">
              <div className="p-6">
                <div className="flex items-start gap-8">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-900">{listing.rating.average}</p>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`w-6 h-6 ${i < Math.floor(listing.rating.average) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{listing.rating.total} avaliações</p>
                  </div>
                  <div className="flex-1">
                    {Object.entries(listing.rating.breakdown)
                      .reverse()
                      .map(([stars, count]) => (
                        <div key={stars} className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-600 w-8">{stars} ★</span>
                          <Progress value={(count / listing.rating.total) * 100} variant="provider" className="flex-1" />
                          <span className="text-sm text-gray-600 w-8">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Solicitações Recentes</h3>
                <div className="space-y-3">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 glass-card rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar name={lead.name} size="md" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-600">{lead.service}</p>
                          <p className="text-sm text-gray-500">{formatDateTime(lead.receivedAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(lead.value)}</p>
                          <Badge {...getLeadStatusBadge(lead.status)} size="sm" className="mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {lead.status === 'pending' && (
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                            Responder
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" leftIcon={<EyeIcon className="w-4 h-4" />}>
                          Ver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
