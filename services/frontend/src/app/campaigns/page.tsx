// ============================================================================
// Campaigns Module - Provider Portal
// Automated marketing campaign management with email, WhatsApp, and SMS
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon,
  EyeIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { Card, Button, Badge, StatCard, Input, Select, Tabs, Table, Progress, Avatar } from '@/components/UI';

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - In production, this would come from API
  const stats = {
    activeCampaigns: 8,
    scheduledCampaigns: 5,
    completedCampaigns: 42,
    totalReach: 12450,
    avgOpenRate: 24.3,
    avgClickRate: 3.8,
    totalConversions: 156,
    roi: 345.2,
  };

  const campaigns = [
    {
      id: '1',
      name: 'Campanha de Boas-Vindas 2025',
      type: 'email',
      status: 'active',
      audience: 450,
      schedule: {
        type: 'immediate',
        sendDate: '2025-01-06T10:00:00',
      },
      analytics: {
        sent: 450,
        delivered: 447,
        opened: 112,
        clicked: 18,
        converted: 3,
      },
      createdAt: '2025-01-05',
      lastSent: '2025-01-06T10:15:00',
    },
    {
      id: '2',
      name: 'Follow-up Propostas Abertas',
      type: 'whatsapp',
      status: 'active',
      audience: 28,
      schedule: {
        type: 'recurring',
        recurrence: 'weekly',
      },
      analytics: {
        sent: 84,
        delivered: 82,
        opened: 71,
        clicked: 12,
        converted: 5,
      },
      createdAt: '2024-12-15',
      lastSent: '2025-01-03T09:00:00',
    },
    {
      id: '3',
      name: 'Promoção Verão - Desconto 15%',
      type: 'email',
      status: 'scheduled',
      audience: 1250,
      schedule: {
        type: 'scheduled',
        sendDate: '2025-01-15T14:00:00',
      },
      analytics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
      },
      createdAt: '2025-01-04',
    },
    {
      id: '4',
      name: 'Recuperação de Clientes Inativos',
      type: 'email',
      status: 'active',
      audience: 320,
      schedule: {
        type: 'immediate',
        sendDate: '2024-12-28T11:00:00',
      },
      analytics: {
        sent: 320,
        delivered: 318,
        opened: 95,
        clicked: 22,
        converted: 8,
      },
      createdAt: '2024-12-27',
      lastSent: '2024-12-28T11:05:00',
    },
    {
      id: '5',
      name: 'Novidades do Mês - Newsletter',
      type: 'email',
      status: 'completed',
      audience: 2100,
      schedule: {
        type: 'scheduled',
        sendDate: '2024-12-01T08:00:00',
      },
      analytics: {
        sent: 2100,
        delivered: 2085,
        opened: 512,
        clicked: 87,
        converted: 14,
      },
      createdAt: '2024-11-28',
      lastSent: '2024-12-01T08:03:00',
    },
    {
      id: '6',
      name: 'Lembrete de Reunião',
      type: 'sms',
      status: 'completed',
      audience: 15,
      schedule: {
        type: 'scheduled',
        sendDate: '2024-12-20T09:00:00',
      },
      analytics: {
        sent: 15,
        delivered: 15,
        opened: 15,
        clicked: 0,
        converted: 12,
      },
      createdAt: '2024-12-19',
      lastSent: '2024-12-20T09:00:00',
    },
  ];

  const recentActivity = [
    { campaign: 'Campanha de Boas-Vindas 2025', action: 'Enviada para 450 contatos', time: '2 horas atrás' },
    { campaign: 'Follow-up Propostas Abertas', action: '5 conversões registradas', time: '1 dia atrás' },
    { campaign: 'Recuperação de Clientes Inativos', action: '8 clientes reativados', time: '2 dias atrás' },
    { campaign: 'Novidades do Mês - Newsletter', action: 'Campanha concluída com sucesso', time: '1 semana atrás' },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'success' as const, label: 'Ativa' },
      scheduled: { variant: 'warning' as const, label: 'Agendada' },
      paused: { variant: 'neutral' as const, label: 'Pausada' },
      completed: { variant: 'info' as const, label: 'Concluída' },
      draft: { variant: 'neutral' as const, label: 'Rascunho' },
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      email: <EnvelopeIcon className="w-5 h-5 text-blue-600" />,
      whatsapp: <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600" />,
      sms: <DevicePhoneMobileIcon className="w-5 h-5 text-purple-600" />,
    };
    return icons[type as keyof typeof icons] || icons.email;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      email: 'Email',
      whatsapp: 'WhatsApp',
      sms: 'SMS',
    };
    return labels[type as keyof typeof labels] || 'Email';
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateOpenRate = (campaign: typeof campaigns[0]) => {
    if (campaign.analytics.delivered === 0) return 0;
    return ((campaign.analytics.opened / campaign.analytics.delivered) * 100).toFixed(1);
  };

  const calculateClickRate = (campaign: typeof campaigns[0]) => {
    if (campaign.analytics.opened === 0) return 0;
    return ((campaign.analytics.clicked / campaign.analytics.opened) * 100).toFixed(1);
  };

  const calculateConversionRate = (campaign: typeof campaigns[0]) => {
    if (campaign.analytics.sent === 0) return 0;
    return ((campaign.analytics.converted / campaign.analytics.sent) * 100).toFixed(1);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesType = filterType === 'all' || campaign.type === filterType;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const performanceData = [
    { month: 'Ago', campaigns: 8, conversions: 24, openRate: 22.1 },
    { month: 'Set', campaigns: 12, conversions: 31, openRate: 23.5 },
    { month: 'Out', campaigns: 10, conversions: 28, openRate: 21.8 },
    { month: 'Nov', campaigns: 15, conversions: 42, openRate: 24.7 },
    { month: 'Dez', campaigns: 14, conversions: 38, openRate: 25.2 },
    { month: 'Jan', campaigns: 8, conversions: 18, openRate: 24.3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Campanhas Automatizadas</h1>
              <p className="text-gray-600 mt-1">
                Gerencie campanhas de email, WhatsApp e SMS para engajar seus clientes
              </p>
            </div>
            <Button
              leftIcon={<PlusIcon className="w-5 h-5" />}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
            >
              Nova Campanha
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Campanhas Ativas"
              value={stats.activeCampaigns.toString()}
              icon={<PlayIcon className="w-6 h-6" />}
              variant="success"
            />
            <StatCard
              label="Agendadas"
              value={stats.scheduledCampaigns.toString()}
              icon={<CalendarIcon className="w-6 h-6" />}
              variant="warning"
            />
            <StatCard
              label="Alcance Total"
              value={stats.totalReach.toLocaleString('pt-BR')}
              icon={<UserGroupIcon className="w-6 h-6" />}
              variant="info"
            />
            <StatCard
              label="Conversões"
              value={stats.totalConversions.toString()}
              icon={<ChartBarIcon className="w-6 h-6" />}
              variant="success"
              trend={15.3}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'campaigns', label: 'Campanhas', badge: stats.activeCampaigns },
            { id: 'analytics', label: 'Analytics' },
            { id: 'audience', label: 'Audiência' },
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
              <Card variant="glass" className="border-l-4 border-blue-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Taxa de Abertura</h3>
                    <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgOpenRate}%</p>
                  <p className="text-sm text-gray-500 mt-1">Média das campanhas ativas</p>
                </div>
              </Card>

              <Card variant="glass" className="border-l-4 border-green-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Taxa de Cliques</h3>
                    <ChartBarIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgClickRate}%</p>
                  <p className="text-sm text-gray-500 mt-1">CTR médio das campanhas</p>
                </div>
              </Card>

              <Card variant="glass" className="border-l-4 border-purple-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">ROI</h3>
                    <ChartBarIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.roi}%</p>
                  <p className="text-sm text-gray-500 mt-1">Retorno sobre investimento</p>
                </div>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Desempenho nos Últimos 6 Meses</h3>
                <div className="space-y-4">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                              style={{ width: `${(data.campaigns / 15) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-16">{data.campaigns} camp.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                              style={{ width: `${(data.conversions / 42) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-16">{data.conversions} conv.</span>
                        </div>
                      </div>
                      <div className="w-20 text-right">
                        <span className="text-sm font-semibold text-blue-600">{data.openRate}%</span>
                        <p className="text-xs text-gray-500">abertura</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 glass-card rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.campaign}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
                <Input
                  placeholder="Buscar campanhas..."
                  leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="glass"
                  className="flex-1 md:w-80"
                />
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  variant="glass"
                  className="w-40"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativas</option>
                  <option value="scheduled">Agendadas</option>
                  <option value="paused">Pausadas</option>
                  <option value="completed">Concluídas</option>
                  <option value="draft">Rascunhos</option>
                </Select>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  variant="glass"
                  className="w-40"
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                </Select>
              </div>
            </div>

            {/* Campaigns Table */}
            <Card variant="glass">
              <Table>
                <thead>
                  <tr>
                    <th className="text-left">Campanha</th>
                    <th className="text-left">Tipo</th>
                    <th className="text-left">Status</th>
                    <th className="text-center">Audiência</th>
                    <th className="text-center">Enviados</th>
                    <th className="text-center">Abertos</th>
                    <th className="text-center">Cliques</th>
                    <th className="text-center">Conversões</th>
                    <th className="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td>
                        <div>
                          <p className="font-medium text-gray-900">{campaign.name}</p>
                          {campaign.lastSent && (
                            <p className="text-sm text-gray-500">
                              Último envio: {formatDateTime(campaign.lastSent)}
                            </p>
                          )}
                          {campaign.schedule.type === 'scheduled' && campaign.schedule.sendDate && (
                            <p className="text-sm text-gray-500">
                              Agendado: {formatDateTime(campaign.schedule.sendDate)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(campaign.type)}
                          <span className="text-sm font-medium text-gray-700">
                            {getTypeLabel(campaign.type)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <Badge {...getStatusBadge(campaign.status)} size="sm" />
                      </td>
                      <td className="text-center">
                        <span className="font-medium text-gray-900">
                          {campaign.audience.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="text-gray-700">{campaign.analytics.sent.toLocaleString('pt-BR')}</span>
                      </td>
                      <td className="text-center">
                        <div>
                          <span className="font-medium text-gray-900">{campaign.analytics.opened}</span>
                          <p className="text-xs text-gray-500">{calculateOpenRate(campaign)}%</p>
                        </div>
                      </td>
                      <td className="text-center">
                        <div>
                          <span className="font-medium text-gray-900">{campaign.analytics.clicked}</span>
                          <p className="text-xs text-gray-500">{calculateClickRate(campaign)}%</p>
                        </div>
                      </td>
                      <td className="text-center">
                        <div>
                          <span className="font-medium text-green-600">{campaign.analytics.converted}</span>
                          <p className="text-xs text-gray-500">{calculateConversionRate(campaign)}%</p>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" leftIcon={<EyeIcon className="w-4 h-4" />}>
                            Ver
                          </Button>
                          <Button variant="ghost" size="sm" leftIcon={<PencilIcon className="w-4 h-4" />}>
                            Editar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Detalhado</h3>
                <p className="text-gray-600">
                  Relatórios completos de performance, ROI por campanha, e análise de engajamento em breve.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === 'audience' && (
          <div className="space-y-6">
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gerenciamento de Audiência</h3>
                <p className="text-gray-600">
                  Crie segmentos personalizados, importe listas de contatos, e gerencie tags em breve.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
