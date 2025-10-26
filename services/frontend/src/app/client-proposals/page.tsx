// ============================================================================
// Client Proposals Inbox - Client Portal
// Centralized inbox for managing all received proposals from providers
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  Squares2X2Icon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CalendarIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Card, Button, Badge, StatCard, Input, Select, Avatar } from '@/components/UI';

export default function ClientProposalsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  // Mock data - In production, this would come from API
  const stats = {
    newProposals: 8,
    underReview: 5,
    approved: 12,
    totalValue: 385000,
  };

  const proposals = [
    {
      id: '1',
      providerId: 'prov-001',
      providerName: 'Arquitetura Silva & Santos',
      providerAvatar: '',
      providerRating: 4.8,
      title: 'Projeto Arquitetônico Completo - Residência',
      category: 'Arquitetura',
      description: 'Projeto arquitetônico completo incluindo plantas baixas, fachadas, cortes e detalhamentos.',
      status: 'new',
      price: 45000,
      timeline: '60-90 dias',
      receivedAt: '2025-01-14T10:30:00',
      isRead: false,
      isFavorite: false,
      hasComments: false,
      attachments: 3,
    },
    {
      id: '2',
      providerId: 'prov-002',
      providerName: 'Construtora Oliveira',
      providerAvatar: '',
      providerRating: 4.6,
      title: 'Reforma Completa de Cozinha',
      category: 'Construção',
      description: 'Demolição, alvenaria, revestimentos, instalações elétricas e hidráulicas, marcenaria planejada.',
      status: 'under_review',
      price: 58000,
      timeline: '45 dias',
      receivedAt: '2025-01-10T14:20:00',
      viewedAt: '2025-01-11T09:00:00',
      isRead: true,
      isFavorite: true,
      hasComments: true,
      commentsCount: 3,
      attachments: 5,
    },
    {
      id: '3',
      providerId: 'prov-003',
      providerName: 'Design Interiores Premium',
      providerAvatar: '',
      providerRating: 5.0,
      title: 'Projeto de Interiores - Apartamento 120m²',
      category: 'Design de Interiores',
      description: 'Projeto completo de ambientação, mobiliário, iluminação e acompanhamento de obra.',
      status: 'new',
      price: 32000,
      timeline: '30-45 dias',
      receivedAt: '2025-01-13T16:45:00',
      isRead: false,
      isFavorite: false,
      hasComments: false,
      attachments: 8,
    },
    {
      id: '4',
      providerId: 'prov-004',
      providerName: 'Jardins Verdes Paisagismo',
      providerAvatar: '',
      providerRating: 4.7,
      title: 'Paisagismo Residencial com Irrigação Automatizada',
      category: 'Paisagismo',
      description: 'Projeto paisagístico completo, plantio, sistema de irrigação automatizado e manutenção.',
      status: 'approved',
      price: 28000,
      timeline: '30 dias',
      receivedAt: '2024-12-28T11:00:00',
      viewedAt: '2024-12-28T14:30:00',
      approvedAt: '2025-01-05T10:15:00',
      isRead: true,
      isFavorite: true,
      hasComments: true,
      commentsCount: 7,
      attachments: 12,
    },
    {
      id: '5',
      providerId: 'prov-005',
      providerName: 'Elétrica Pro Instalações',
      providerAvatar: '',
      providerRating: 4.5,
      title: 'Sistema Solar Fotovoltaico 10kWp',
      category: 'Elétrica',
      description: 'Fornecimento e instalação de sistema fotovoltaico completo com inversores e monitoramento.',
      status: 'under_review',
      price: 72000,
      timeline: '20-30 dias',
      receivedAt: '2025-01-08T09:15:00',
      viewedAt: '2025-01-08T11:00:00',
      isRead: true,
      isFavorite: false,
      hasComments: true,
      commentsCount: 2,
      attachments: 4,
    },
    {
      id: '6',
      providerId: 'prov-006',
      providerName: 'Marcenaria Artesanal Premium',
      providerAvatar: '',
      providerRating: 4.9,
      title: 'Móveis Planejados para Home Office',
      category: 'Marcenaria',
      description: 'Estante, escrivaninha, armários e painel para TV em MDF revestido.',
      status: 'new',
      price: 18500,
      timeline: '25 dias',
      receivedAt: '2025-01-12T15:30:00',
      isRead: true,
      isFavorite: false,
      hasComments: false,
      attachments: 6,
    },
    {
      id: '7',
      providerId: 'prov-007',
      providerName: 'Pisos & Revestimentos Ltda',
      providerAvatar: '',
      providerRating: 4.4,
      title: 'Instalação de Porcelanato 100m²',
      category: 'Acabamentos',
      description: 'Remoção de piso antigo, nivelamento, assentamento de porcelanato 80x80cm.',
      status: 'rejected',
      price: 22000,
      timeline: '15 dias',
      receivedAt: '2025-01-03T10:00:00',
      viewedAt: '2025-01-04T09:00:00',
      rejectedAt: '2025-01-06T14:30:00',
      rejectionReason: 'Valor acima do orçamento disponível',
      isRead: true,
      isFavorite: false,
      hasComments: true,
      commentsCount: 1,
      attachments: 2,
    },
    {
      id: '8',
      providerId: 'prov-008',
      providerName: 'Pintura Profissional Express',
      providerAvatar: '',
      providerRating: 4.6,
      title: 'Pintura Interna e Externa - Casa 200m²',
      category: 'Pintura',
      description: 'Preparação de superfícies, massa corrida, duas demãos de tinta acrílica premium.',
      status: 'new',
      price: 15000,
      timeline: '12 dias',
      receivedAt: '2025-01-15T08:00:00',
      isRead: false,
      isFavorite: false,
      hasComments: false,
      attachments: 2,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      new: { variant: 'warning' as const, label: 'Nova', icon: <BellAlertIcon className="w-4 h-4" /> },
      under_review: { variant: 'info' as const, label: 'Em Revisão', icon: <EyeIcon className="w-4 h-4" /> },
      approved: { variant: 'success' as const, label: 'Aprovada', icon: <CheckCircleIcon className="w-4 h-4" /> },
      rejected: { variant: 'danger' as const, label: 'Rejeitada', icon: <XCircleIcon className="w-4 h-4" /> },
      changes_requested: { variant: 'neutral' as const, label: 'Alterações Solicitadas', icon: <PencilSquareIcon className="w-4 h-4" /> },
    };
    return variants[status as keyof typeof variants] || variants.new;
  };

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
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
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

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    if (diffHours > 0) return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    if (diffMinutes > 0) return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`;
    return 'Agora';
  };

  const filteredProposals = proposals.filter((proposal) => {
    const matchesStatus = filterStatus === 'all' || proposal.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || proposal.category === filterCategory;
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const toggleCompareSelection = (proposalId: string) => {
    if (selectedForCompare.includes(proposalId)) {
      setSelectedForCompare(selectedForCompare.filter((id) => id !== proposalId));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, proposalId]);
      }
    }
  };

  const categories = [...new Set(proposals.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Propostas Recebidas</h1>
              <p className="text-gray-600 mt-1">
                Visualize, compare e gerencie todas as propostas de fornecedores
              </p>
            </div>
            {selectedForCompare.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {selectedForCompare.length} selecionadas para comparação
                </span>
                <Button
                  leftIcon={<Squares2X2Icon className="w-5 h-5" />}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                  disabled={selectedForCompare.length < 2}
                >
                  Comparar
                </Button>
                <Button variant="outline" onClick={() => setSelectedForCompare([])}>
                  Cancelar
                </Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Novas Propostas"
              value={stats.newProposals.toString()}
              icon={<BellAlertIcon className="w-6 h-6" />}
              variant="warning"
            />
            <StatCard
              label="Em Revisão"
              value={stats.underReview.toString()}
              icon={<EyeIcon className="w-6 h-6" />}
              variant="info"
            />
            <StatCard
              label="Aprovadas"
              value={stats.approved.toString()}
              icon={<CheckCircleIcon className="w-6 h-6" />}
              variant="success"
            />
            <StatCard
              label="Valor Total"
              value={formatCurrency(stats.totalValue)}
              icon={<CurrencyDollarIcon className="w-6 h-6" />}
              variant="success"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
            <Input
              placeholder="Buscar por título, fornecedor ou categoria..."
              leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="glass"
              className="flex-1 md:w-96"
            />
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              variant="glass"
              className="w-48"
            >
              <option value="all">Todos os Status</option>
              <option value="new">Novas</option>
              <option value="under_review">Em Revisão</option>
              <option value="approved">Aprovadas</option>
              <option value="rejected">Rejeitadas</option>
              <option value="changes_requested">Alterações Solicitadas</option>
            </Select>
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
          </div>
          <Button
            variant="outline"
            leftIcon={<Squares2X2Icon className="w-5 h-5" />}
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => setCompareMode(!compareMode)}
          >
            {compareMode ? 'Cancelar Comparação' : 'Modo Comparação'}
          </Button>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProposals.map((proposal) => (
            <Card
              key={proposal.id}
              variant="glass"
              hoverable
              className={`${
                !proposal.isRead ? 'border-l-4 border-green-500' : ''
              } ${
                selectedForCompare.includes(proposal.id) ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar name={proposal.providerName} size="md" theme="client" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{proposal.providerName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <StarIconSolid className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{proposal.providerRating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{getTimeAgo(proposal.receivedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                    onClick={() => {/* Toggle favorite */}}
                  >
                    {proposal.isFavorite ? (
                      <StarIconSolid className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <StarIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Status and Category */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge {...getStatusBadge(proposal.status)} size="sm" />
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(proposal.category)}`}>
                    {proposal.category}
                  </span>
                  {!proposal.isRead && (
                    <Badge variant="warning" size="sm">Não lida</Badge>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{proposal.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{proposal.description}</p>

                {/* Price and Timeline */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Valor</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(proposal.price)}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Prazo</p>
                    <p className="text-sm font-semibold text-gray-900">{proposal.timeline}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  {proposal.hasComments && (
                    <div className="flex items-center gap-1">
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      <span>{proposal.commentsCount || 0}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <DocumentArrowDownIcon className="w-4 h-4" />
                    <span>{proposal.attachments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{formatDate(proposal.receivedAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                {compareMode ? (
                  <Button
                    variant={selectedForCompare.includes(proposal.id) ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => toggleCompareSelection(proposal.id)}
                    disabled={
                      !selectedForCompare.includes(proposal.id) && selectedForCompare.length >= 3
                    }
                  >
                    {selectedForCompare.includes(proposal.id) ? 'Selecionado' : 'Selecionar'}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    {proposal.status === 'new' || proposal.status === 'under_review' ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          leftIcon={<EyeIcon className="w-4 h-4" />}
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          Revisar
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white"
                          leftIcon={<CheckCircleIcon className="w-4 h-4" />}
                        >
                          Aprovar
                        </Button>
                      </>
                    ) : proposal.status === 'approved' ? (
                      <Button
                        variant="outline"
                        fullWidth
                        size="sm"
                        leftIcon={<EyeIcon className="w-4 h-4" />}
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Ver Detalhes
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        fullWidth
                        size="sm"
                        leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
                      >
                        Download PDF
                      </Button>
                    )}
                  </div>
                )}

                {/* Rejection Reason */}
                {proposal.status === 'rejected' && proposal.rejectionReason && (
                  <div className="mt-3 p-2 bg-red-50 rounded text-xs text-red-700">
                    <strong>Motivo:</strong> {proposal.rejectionReason}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProposals.length === 0 && (
          <Card variant="glass">
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                <DocumentArrowDownIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma proposta encontrada</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== 'all' || filterCategory !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Você ainda não recebeu nenhuma proposta'}
              </p>
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  Buscar Fornecedores
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
