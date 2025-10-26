// ============================================================================
// Contracts Module - Provider Portal
// Contract generation, management, and e-signature workflow
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  PencilIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Card, Button, Badge, StatCard, Input, Select, Tabs, Table, Avatar } from '@/components/UI';

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - In production, this would come from API
  const stats = {
    activeContracts: 12,
    pendingSignature: 5,
    signedContracts: 48,
    expiringThisMonth: 3,
    totalValue: 485000,
    monthlyRecurring: 28500,
    completedThisMonth: 8,
  };

  const contracts = [
    {
      id: '1',
      number: 'CTR-2025-001',
      title: 'Reforma Completa - Residência Silva',
      clientName: 'João Silva',
      clientEmail: 'joao.silva@email.com',
      status: 'signed',
      proposalId: 'PROP-2024-089',
      value: 45000,
      template: 'Contrato de Reforma Residencial',
      validFrom: '2025-01-10',
      validUntil: '2025-04-10',
      signatures: {
        provider: { signed: true, date: '2025-01-10T14:30:00', name: 'Construtora ABC' },
        client: { signed: true, date: '2025-01-10T16:45:00', name: 'João Silva' },
      },
      createdAt: '2025-01-08',
      signedAt: '2025-01-10T16:45:00',
    },
    {
      id: '2',
      number: 'CTR-2025-002',
      title: 'Projeto Arquitetônico Comercial',
      clientName: 'Empresa XYZ Ltda',
      clientEmail: 'contato@empresaxyz.com',
      status: 'pending_signature',
      proposalId: 'PROP-2024-095',
      value: 28000,
      template: 'Contrato de Serviços Arquitetônicos',
      validFrom: '2025-01-15',
      validUntil: '2025-05-15',
      signatures: {
        provider: { signed: true, date: '2025-01-12T10:00:00', name: 'Arquitetura Design Studio' },
        client: { signed: false, name: 'Empresa XYZ Ltda' },
      },
      createdAt: '2025-01-11',
      sentAt: '2025-01-12T10:05:00',
    },
    {
      id: '3',
      number: 'CTR-2025-003',
      title: 'Manutenção Predial Anual',
      clientName: 'Condomínio Residencial Sol',
      clientEmail: 'sindico@condominiosol.com',
      status: 'active',
      proposalId: 'PROP-2024-102',
      value: 156000,
      template: 'Contrato de Prestação de Serviços Continuados',
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
      signatures: {
        provider: { signed: true, date: '2024-12-20T09:00:00', name: 'Manutenção Pro' },
        client: { signed: true, date: '2024-12-20T11:30:00', name: 'Condomínio Residencial Sol' },
      },
      createdAt: '2024-12-18',
      signedAt: '2024-12-20T11:30:00',
    },
    {
      id: '4',
      number: 'CTR-2024-087',
      title: 'Instalação de Sistema Solar Fotovoltaico',
      clientName: 'Maria Santos',
      clientEmail: 'maria.santos@email.com',
      status: 'active',
      proposalId: 'PROP-2024-078',
      value: 68000,
      template: 'Contrato de Instalação de Sistemas Elétricos',
      validFrom: '2024-11-15',
      validUntil: '2025-02-15',
      signatures: {
        provider: { signed: true, date: '2024-11-10T14:00:00', name: 'Solar Energy Solutions' },
        client: { signed: true, date: '2024-11-12T16:20:00', name: 'Maria Santos' },
      },
      createdAt: '2024-11-08',
      signedAt: '2024-11-12T16:20:00',
    },
    {
      id: '5',
      number: 'CTR-2025-004',
      title: 'Design de Interiores - Apartamento Luxo',
      clientName: 'Roberto Oliveira',
      clientEmail: 'roberto.oliveira@email.com',
      status: 'draft',
      proposalId: 'PROP-2025-003',
      value: 38000,
      template: 'Contrato de Design de Interiores',
      validFrom: '2025-02-01',
      validUntil: '2025-05-30',
      signatures: {
        provider: { signed: false, name: 'Interior Design Pro' },
        client: { signed: false, name: 'Roberto Oliveira' },
      },
      createdAt: '2025-01-14',
    },
    {
      id: '6',
      number: 'CTR-2024-092',
      title: 'Paisagismo Residencial',
      clientName: 'Ana Costa',
      clientEmail: 'ana.costa@email.com',
      status: 'completed',
      proposalId: 'PROP-2024-091',
      value: 22000,
      template: 'Contrato de Paisagismo',
      validFrom: '2024-10-01',
      validUntil: '2024-12-31',
      signatures: {
        provider: { signed: true, date: '2024-09-28T10:00:00', name: 'Jardins Verdes Ltda' },
        client: { signed: true, date: '2024-09-28T15:30:00', name: 'Ana Costa' },
      },
      createdAt: '2024-09-25',
      signedAt: '2024-09-28T15:30:00',
      completedAt: '2024-12-28',
    },
  ];

  const templates = [
    { id: '1', name: 'Contrato de Reforma Residencial', category: 'Construção', uses: 15 },
    { id: '2', name: 'Contrato de Serviços Arquitetônicos', category: 'Arquitetura', uses: 8 },
    { id: '3', name: 'Contrato de Prestação de Serviços Continuados', category: 'Manutenção', uses: 6 },
    { id: '4', name: 'Contrato de Instalação de Sistemas Elétricos', category: 'Elétrica', uses: 12 },
    { id: '5', name: 'Contrato de Design de Interiores', category: 'Design', uses: 10 },
    { id: '6', name: 'Contrato de Paisagismo', category: 'Paisagismo', uses: 7 },
  ];

  const recentActivity = [
    { contract: 'CTR-2025-001', action: 'Contrato assinado pelo cliente', client: 'João Silva', time: '4 dias atrás' },
    { contract: 'CTR-2025-002', action: 'Enviado para assinatura do cliente', client: 'Empresa XYZ', time: '1 semana atrás' },
    { contract: 'CTR-2025-003', action: 'Renovação automática ativada', client: 'Condomínio Sol', time: '2 semanas atrás' },
    { contract: 'CTR-2024-092', action: 'Contrato concluído com sucesso', client: 'Ana Costa', time: '1 mês atrás' },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: { variant: 'neutral' as const, label: 'Rascunho', icon: <DocumentTextIcon className="w-4 h-4" /> },
      pending_signature: { variant: 'warning' as const, label: 'Aguardando Assinatura', icon: <ClockIcon className="w-4 h-4" /> },
      signed: { variant: 'info' as const, label: 'Assinado', icon: <CheckBadgeIcon className="w-4 h-4" /> },
      active: { variant: 'success' as const, label: 'Ativo', icon: <CheckCircleIcon className="w-4 h-4" /> },
      completed: { variant: 'success' as const, label: 'Concluído', icon: <CheckCircleIcon className="w-4 h-4" /> },
      cancelled: { variant: 'danger' as const, label: 'Cancelado', icon: <XCircleIcon className="w-4 h-4" /> },
      expiring_soon: { variant: 'warning' as const, label: 'Vence em Breve', icon: <ExclamationTriangleIcon className="w-4 h-4" /> },
    };
    return variants[status as keyof typeof variants] || variants.draft;
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDaysUntilExpiry = (validUntil: string) => {
    const today = new Date();
    const expiryDate = new Date(validUntil);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus;
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contratos e Assinatura Eletrônica</h1>
              <p className="text-gray-600 mt-1">
                Gerencie contratos, assinaturas digitais e documentos legais
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                leftIcon={<FolderIcon className="w-5 h-5" />}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Templates
              </Button>
              <Button
                leftIcon={<PlusIcon className="w-5 h-5" />}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              >
                Novo Contrato
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Contratos Ativos"
              value={stats.activeContracts.toString()}
              icon={<CheckCircleIcon className="w-6 h-6" />}
              variant="success"
            />
            <StatCard
              label="Aguardando Assinatura"
              value={stats.pendingSignature.toString()}
              icon={<ClockIcon className="w-6 h-6" />}
              variant="warning"
            />
            <StatCard
              label="Contratos Assinados"
              value={stats.signedContracts.toString()}
              icon={<CheckBadgeIcon className="w-6 h-6" />}
              variant="info"
            />
            <StatCard
              label="Valor Total"
              value={formatCurrency(stats.totalValue)}
              icon={<CurrencyDollarIcon className="w-6 h-6" />}
              variant="success"
              trend={12.5}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'contracts', label: 'Contratos', badge: stats.activeContracts },
            { id: 'templates', label: 'Templates', badge: templates.length },
            { id: 'signatures', label: 'Assinaturas', badge: stats.pendingSignature },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="mb-6"
        />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="glass" className="border-l-4 border-green-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Receita Recorrente</h3>
                    <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.monthlyRecurring)}</p>
                  <p className="text-sm text-gray-500 mt-1">Por mês</p>
                </div>
              </Card>

              <Card variant="glass" className="border-l-4 border-blue-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Concluídos Este Mês</h3>
                    <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.completedThisMonth}</p>
                  <p className="text-sm text-gray-500 mt-1">Contratos finalizados</p>
                </div>
              </Card>

              <Card variant="glass" className="border-l-4 border-orange-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Vencendo Este Mês</h3>
                    <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.expiringThisMonth}</p>
                  <p className="text-sm text-gray-500 mt-1">Requerem atenção</p>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 glass-card rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.contract}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">Cliente: {activity.client}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Expiring Contracts Alert */}
            {stats.expiringThisMonth > 0 && (
              <Card variant="glass" className="border-l-4 border-orange-500">
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="w-6 h-6 text-orange-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Atenção: {stats.expiringThisMonth} Contratos Vencendo Este Mês
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Alguns contratos estão próximos do vencimento. Considere renovar ou finalizar estes projetos.
                      </p>
                      <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                        Ver Contratos Vencendo
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
                <Input
                  placeholder="Buscar por número, título ou cliente..."
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
                  <option value="draft">Rascunhos</option>
                  <option value="pending_signature">Aguardando Assinatura</option>
                  <option value="signed">Assinados</option>
                  <option value="active">Ativos</option>
                  <option value="completed">Concluídos</option>
                  <option value="cancelled">Cancelados</option>
                </Select>
              </div>
            </div>

            {/* Contracts Table */}
            <Card variant="glass">
              <Table>
                <thead>
                  <tr>
                    <th className="text-left">Contrato</th>
                    <th className="text-left">Cliente</th>
                    <th className="text-left">Status</th>
                    <th className="text-center">Valor</th>
                    <th className="text-center">Vigência</th>
                    <th className="text-center">Assinatura</th>
                    <th className="text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((contract) => {
                    const daysUntilExpiry = getDaysUntilExpiry(contract.validUntil);
                    const isExpiringSoon = daysUntilExpiry > 0 && daysUntilExpiry <= 30;

                    return (
                      <tr key={contract.id}>
                        <td>
                          <div>
                            <p className="font-medium text-gray-900">{contract.number}</p>
                            <p className="text-sm text-gray-600">{contract.title}</p>
                            <p className="text-xs text-gray-500 mt-1">Proposta: {contract.proposalId}</p>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Avatar name={contract.clientName} size="sm" />
                            <div>
                              <p className="font-medium text-gray-900">{contract.clientName}</p>
                              <p className="text-xs text-gray-500">{contract.clientEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Badge {...getStatusBadge(contract.status)} size="sm" />
                          {isExpiringSoon && contract.status === 'active' && (
                            <p className="text-xs text-orange-600 mt-1">Vence em {daysUntilExpiry} dias</p>
                          )}
                        </td>
                        <td className="text-center">
                          <span className="font-semibold text-gray-900">{formatCurrency(contract.value)}</span>
                        </td>
                        <td className="text-center">
                          <div className="text-sm">
                            <p className="text-gray-700">{formatDate(contract.validFrom)}</p>
                            <p className="text-gray-500">até {formatDate(contract.validUntil)}</p>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="space-y-1">
                            <div className="flex items-center justify-center gap-2 text-sm">
                              {contract.signatures.provider.signed ? (
                                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                              ) : (
                                <ClockIcon className="w-4 h-4 text-gray-400" />
                              )}
                              <span className="text-gray-600">Prestador</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm">
                              {contract.signatures.client.signed ? (
                                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                              ) : (
                                <ClockIcon className="w-4 h-4 text-gray-400" />
                              )}
                              <span className="text-gray-600">Cliente</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" leftIcon={<EyeIcon className="w-4 h-4" />}>
                              Ver
                            </Button>
                            {contract.status === 'draft' && (
                              <Button variant="ghost" size="sm" leftIcon={<PencilIcon className="w-4 h-4" />}>
                                Editar
                              </Button>
                            )}
                            {(contract.status === 'signed' || contract.status === 'active') && (
                              <Button variant="ghost" size="sm" leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}>
                                PDF
                              </Button>
                            )}
                            {contract.status === 'pending_signature' && (
                              <Button variant="ghost" size="sm" leftIcon={<PaperAirplaneIcon className="w-4 h-4" />}>
                                Reenviar
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} variant="glass" hoverable>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <Badge variant="neutral" size="sm">{template.uses} usos</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{template.category}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" fullWidth leftIcon={<EyeIcon className="w-4 h-4" />}>
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" fullWidth leftIcon={<DocumentDuplicateIcon className="w-4 h-4" />}>
                        Usar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Signatures Tab */}
        {activeTab === 'signatures' && (
          <div className="space-y-6">
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrações de Assinatura Eletrônica</h3>
                <p className="text-gray-600 mb-6">
                  Configure integrações com plataformas de assinatura eletrônica para automatizar o fluxo de assinatura de contratos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 glass-card rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                        <CheckBadgeIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">DocuSign</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Líder global em assinatura eletrônica</p>
                    <Badge variant="neutral" size="sm">Em breve</Badge>
                  </div>

                  <div className="p-4 glass-card rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                        <CheckBadgeIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Clicksign</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Solução brasileira ICP-Brasil</p>
                    <Badge variant="neutral" size="sm">Em breve</Badge>
                  </div>

                  <div className="p-4 glass-card rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                        <CheckBadgeIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Autentique</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Assinatura digital certificada</p>
                    <Badge variant="neutral" size="sm">Em breve</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pending Signatures */}
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contratos Aguardando Assinatura ({stats.pendingSignature})
                </h3>
                <div className="space-y-3">
                  {contracts
                    .filter((c) => c.status === 'pending_signature')
                    .map((contract) => (
                      <div key={contract.id} className="flex items-center justify-between p-4 glass-card rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar name={contract.clientName} size="md" />
                          <div>
                            <p className="font-medium text-gray-900">{contract.number}</p>
                            <p className="text-sm text-gray-600">{contract.title}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Enviado em {formatDateTime(contract.sentAt || contract.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" leftIcon={<PaperAirplaneIcon className="w-4 h-4" />}>
                            Reenviar
                          </Button>
                          <Button variant="primary" size="sm">Acompanhar</Button>
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
