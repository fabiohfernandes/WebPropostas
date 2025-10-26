// ============================================================================
// Client Dashboard - Client Portal
// Main entry point for clients: projects overview, proposals, vendors
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  StarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Card, Button, StatCard, Badge, Progress, Avatar } from '@/components/UI';

export default function ClientDashboardPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - In production, this would come from API
  const stats = {
    activeProjects: 3,
    pendingProposals: 5,
    favoriteVendors: 8,
    totalBudget: 285000,
    totalSpent: 142500,
  };

  const recentProjects = [
    {
      id: '1',
      name: 'Reforma da Cozinha',
      type: 'Reforma',
      status: 'in-progress',
      progress: 65,
      budget: 45000,
      spent: 29250,
      vendors: 4,
      nextMilestone: 'Instalação de Armários',
      milestoneDate: '2025-01-15',
    },
    {
      id: '2',
      name: 'Casamento - Festa',
      type: 'Evento',
      status: 'planning',
      progress: 30,
      budget: 120000,
      spent: 36000,
      vendors: 8,
      nextMilestone: 'Escolha do Local',
      milestoneDate: '2025-01-20',
    },
    {
      id: '3',
      name: 'Pintura Externa',
      type: 'Manutenção',
      status: 'in-progress',
      progress: 85,
      budget: 15000,
      spent: 12750,
      vendors: 1,
      nextMilestone: 'Finalização',
      milestoneDate: '2025-01-10',
    },
  ];

  const recentProposals = [
    {
      id: '1',
      vendor: 'Arquitetura Silva',
      service: 'Projeto Arquitetônico',
      amount: 8500,
      receivedDate: '2025-01-05',
      status: 'new',
      avatar: 'AS',
    },
    {
      id: '2',
      vendor: 'Design Interiores Pro',
      service: 'Design de Interiores',
      amount: 12000,
      receivedDate: '2025-01-04',
      status: 'reviewing',
      avatar: 'DI',
    },
    {
      id: '3',
      vendor: 'Construtora Moderna',
      service: 'Execução de Obra',
      amount: 85000,
      receivedDate: '2025-01-03',
      status: 'new',
      avatar: 'CM',
    },
  ];

  const favoriteVendors = [
    { id: '1', name: 'João Arquiteto', specialty: 'Arquitetura', rating: 4.9, projects: 3, avatar: 'JA' },
    { id: '2', name: 'Maria Construtora', specialty: 'Construção', rating: 5.0, projects: 2, avatar: 'MC' },
    { id: '3', name: 'Pedro Eletricista', specialty: 'Elétrica', rating: 4.8, projects: 5, avatar: 'PE' },
    { id: '4', name: 'Ana Designer', specialty: 'Design', rating: 4.9, projects: 1, avatar: 'AD' },
  ];

  const upcomingMilestones = [
    { id: '1', project: 'Reforma da Cozinha', milestone: 'Instalação de Armários', date: '2025-01-15', daysLeft: 9 },
    { id: '2', project: 'Pintura Externa', milestone: 'Finalização', date: '2025-01-10', daysLeft: 4 },
    { id: '3', project: 'Casamento - Festa', milestone: 'Escolha do Local', date: '2025-01-20', daysLeft: 14 },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'in-progress': { variant: 'info' as const, label: 'Em Andamento' },
      'planning': { variant: 'warning' as const, label: 'Planejamento' },
      'completed': { variant: 'success' as const, label: 'Concluído' },
      'on-hold': { variant: 'neutral' as const, label: 'Pausado' },
      'new': { variant: 'success' as const, label: 'Nova' },
      'reviewing': { variant: 'warning' as const, label: 'Em Revisão' },
    };
    return variants[status as keyof typeof variants] || variants.planning;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const budgetPercentage = (stats.totalSpent / stats.totalBudget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Olá, Cliente! 👋</h1>
              <p className="text-gray-600 mt-1">
                Bem-vindo ao seu painel de projetos e fornecedores
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/marketplace">
                <Button
                  variant="outline"
                  leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Buscar Fornecedores
                </Button>
              </Link>
              <Button
                leftIcon={<PlusIcon className="w-5 h-5" />}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
              >
                Novo Projeto
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            label="Projetos Ativos"
            value={stats.activeProjects.toString()}
            icon={<BriefcaseIcon className="w-6 h-6" />}
            variant="success"
          />
          <StatCard
            label="Propostas Pendentes"
            value={stats.pendingProposals.toString()}
            icon={<DocumentTextIcon className="w-6 h-6" />}
            variant="warning"
            badge="new"
          />
          <StatCard
            label="Fornecedores Favoritos"
            value={stats.favoriteVendors.toString()}
            icon={<UserGroupIcon className="w-6 h-6" />}
            variant="info"
          />
          <StatCard
            label="Orçamento Total"
            value={formatCurrency(stats.totalBudget)}
            icon={<CurrencyDollarIcon className="w-6 h-6" />}
            variant="primary"
          />
          <StatCard
            label="Gasto Total"
            value={formatCurrency(stats.totalSpent)}
            icon={<ChartBarIcon className="w-6 h-6" />}
            variant="neutral"
          />
        </div>

        {/* Budget Overview */}
        <Card variant="glass" className="mb-8 border-l-4 border-green-500">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Visão Geral do Orçamento</h3>
                <p className="text-sm text-gray-600">Todos os projetos combinados</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{budgetPercentage.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">utilizado</p>
              </div>
            </div>
            <Progress
              value={budgetPercentage}
              variant="client"
              size="lg"
              showLabel
            />
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-gray-600">
                Gasto: <strong className="text-gray-900">{formatCurrency(stats.totalSpent)}</strong>
              </span>
              <span className="text-gray-600">
                Disponível: <strong className="text-green-600">{formatCurrency(stats.totalBudget - stats.totalSpent)}</strong>
              </span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Projects & Milestones */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Meus Projetos</h2>
                <Link href="/projects">
                  <Button variant="ghost" size="sm">Ver todos</Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <Card key={project.id} variant="glass" hoverable>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                            <Badge {...getStatusBadge(project.status)} />
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {project.type} • {project.vendors} fornecedores
                          </p>
                        </div>
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="outline" size="sm">Ver Projeto</Button>
                        </Link>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span className="text-gray-600">Progresso</span>
                          <span className="font-medium text-gray-900">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} variant="client" />
                      </div>

                      {/* Budget */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div>
                          <span className="text-gray-600">Orçamento: </span>
                          <strong className="text-gray-900">{formatCurrency(project.budget)}</strong>
                        </div>
                        <div>
                          <span className="text-gray-600">Gasto: </span>
                          <strong className="text-gray-900">{formatCurrency(project.spent)}</strong>
                        </div>
                      </div>

                      {/* Next Milestone */}
                      <div className="flex items-center gap-2 text-sm p-3 bg-green-50 rounded-lg">
                        <CalendarIcon className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">
                          <strong>Próximo marco:</strong> {project.nextMilestone}
                        </span>
                        <span className="text-gray-500 ml-auto">
                          {new Date(project.milestoneDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Milestones */}
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Próximos Marcos</h3>
                <div className="space-y-3">
                  {upcomingMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-4 p-3 glass-card rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {milestone.daysLeft}d
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{milestone.milestone}</p>
                        <p className="text-sm text-gray-600">{milestone.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(milestone.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Proposals & Vendors */}
          <div className="space-y-8">
            {/* Pending Proposals */}
            <Card variant="glass" className="border-l-4 border-green-500">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Propostas Recebidas</h3>
                  <Link href="/client-proposals">
                    <Button variant="ghost" size="sm">Ver todas</Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentProposals.map((proposal) => (
                    <div key={proposal.id} className="glass-card rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Avatar
                          name={proposal.vendor}
                          size="md"
                          theme="client"
                          className="flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-medium text-gray-900 truncate">{proposal.vendor}</p>
                            <Badge {...getStatusBadge(proposal.status)} size="sm" />
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{proposal.service}</p>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(proposal.amount)}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Recebido em {new Date(proposal.receivedDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" fullWidth>Ver Proposta</Button>
                        <Button
                          size="sm"
                          fullWidth
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white"
                        >
                          Aprovar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Favorite Vendors */}
            <Card variant="glass">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Fornecedores Favoritos</h3>
                  <Link href="/vendors">
                    <Button variant="ghost" size="sm">Ver todos</Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {favoriteVendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center gap-3 p-3 glass-card rounded-lg hover:bg-green-50/50 transition-colors cursor-pointer">
                      <Avatar
                        name={vendor.name}
                        size="sm"
                        theme="client"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{vendor.name}</p>
                        <p className="text-xs text-gray-600">{vendor.specialty}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          <StarIcon className="w-4 h-4 fill-current" />
                          <span className="text-xs font-medium">{vendor.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{vendor.projects} projetos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card variant="glass" className="bg-gradient-to-br from-green-50 to-green-100/50">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
                <div className="space-y-2">
                  <Link href="/marketplace">
                    <Button
                      variant="outline"
                      fullWidth
                      leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                      className="justify-start border-green-200 hover:border-green-400 hover:bg-green-50"
                    >
                      Buscar Fornecedores
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<PlusIcon className="w-5 h-5" />}
                    className="justify-start border-green-200 hover:border-green-400 hover:bg-green-50"
                  >
                    Criar Novo Projeto
                  </Button>
                  <Link href="/client-proposals">
                    <Button
                      variant="outline"
                      fullWidth
                      leftIcon={<DocumentTextIcon className="w-5 h-5" />}
                      className="justify-start border-green-200 hover:border-green-400 hover:bg-green-50"
                    >
                      Ver Todas as Propostas
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
