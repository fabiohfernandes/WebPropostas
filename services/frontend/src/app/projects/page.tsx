// ============================================================================
// Project Management Module - Client Portal
// Organize and manage construction/renovation projects with multiple vendors
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PhotoIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Card, Button, Badge, Progress, Input, Select, Tabs } from '@/components/UI';

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - In production, this would come from API
  const projects = [
    {
      id: '1',
      name: 'Reforma da Cozinha',
      type: 'Reforma',
      location: 'São Paulo, SP',
      status: 'in-progress',
      progress: 65,
      budget: {
        total: 45000,
        spent: 29250,
        remaining: 15750,
      },
      timeline: {
        startDate: '2024-11-15',
        endDate: '2025-02-15',
        daysRemaining: 25,
      },
      vendors: 4,
      milestones: 8,
      completedMilestones: 5,
      photos: 24,
      documents: 12,
    },
    {
      id: '2',
      name: 'Casamento - Festa Completa',
      type: 'Evento',
      location: 'Florianópolis, SC',
      status: 'planning',
      progress: 30,
      budget: {
        total: 120000,
        spent: 36000,
        remaining: 84000,
      },
      timeline: {
        startDate: '2024-12-01',
        endDate: '2025-06-20',
        daysRemaining: 165,
      },
      vendors: 8,
      milestones: 15,
      completedMilestones: 4,
      photos: 8,
      documents: 18,
    },
    {
      id: '3',
      name: 'Pintura Externa',
      type: 'Manutenção',
      location: 'Curitiba, PR',
      status: 'in-progress',
      progress: 85,
      budget: {
        total: 15000,
        spent: 12750,
        remaining: 2250,
      },
      timeline: {
        startDate: '2024-12-10',
        endDate: '2025-01-10',
        daysRemaining: 4,
      },
      vendors: 1,
      milestones: 4,
      completedMilestones: 3,
      photos: 12,
      documents: 5,
    },
    {
      id: '4',
      name: 'Instalação Solar',
      type: 'Melhoria',
      location: 'Porto Alegre, RS',
      status: 'planning',
      progress: 15,
      budget: {
        total: 65000,
        spent: 9750,
        remaining: 55250,
      },
      timeline: {
        startDate: '2025-01-05',
        endDate: '2025-03-30',
        daysRemaining: 83,
      },
      vendors: 2,
      milestones: 6,
      completedMilestones: 1,
      photos: 3,
      documents: 8,
    },
    {
      id: '5',
      name: 'Paisagismo e Jardim',
      type: 'Paisagismo',
      location: 'Rio de Janeiro, RJ',
      status: 'completed',
      progress: 100,
      budget: {
        total: 28000,
        spent: 27200,
        remaining: 800,
      },
      timeline: {
        startDate: '2024-10-01',
        endDate: '2024-12-20',
        daysRemaining: 0,
      },
      vendors: 3,
      milestones: 5,
      completedMilestones: 5,
      photos: 42,
      documents: 15,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'planning': { variant: 'warning' as const, label: 'Planejamento' },
      'in-progress': { variant: 'info' as const, label: 'Em Andamento' },
      'completed': { variant: 'success' as const, label: 'Concluído' },
      'on-hold': { variant: 'neutral' as const, label: 'Pausado' },
    };
    return variants[status as keyof typeof variants] || variants.planning;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Reforma': 'bg-blue-100 text-blue-700',
      'Evento': 'bg-purple-100 text-purple-700',
      'Manutenção': 'bg-orange-100 text-orange-700',
      'Melhoria': 'bg-green-100 text-green-700',
      'Paisagismo': 'bg-teal-100 text-teal-700',
      'Construção': 'bg-red-100 text-red-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
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

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'in-progress').length,
    planning: projects.filter(p => p.status === 'planning').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Projetos</h1>
              <p className="text-gray-600 mt-1">
                Gerencie todos os seus projetos em andamento e futuros
              </p>
            </div>
            <Button
              leftIcon={<PlusIcon className="w-5 h-5" />}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
            >
              Novo Projeto
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-lg border-l-4 border-gray-400">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="glass-card p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-600">Em Andamento</p>
              <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
            </div>
            <div className="glass-card p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600">Planejamento</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.planning}</p>
            </div>
            <div className="glass-card p-4 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
            <Input
              placeholder="Buscar projetos..."
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
              <option value="all">Todos</option>
              <option value="planning">Planejamento</option>
              <option value="in-progress">Em Andamento</option>
              <option value="completed">Concluídos</option>
              <option value="on-hold">Pausados</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<Squares2X2Icon className="w-5 h-5" />}
              onClick={() => setViewMode('grid')}
            >
              Grade
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<ListBulletIcon className="w-5 h-5" />}
              onClick={() => setViewMode('list')}
            >
              Lista
            </Button>
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <Card variant="glass">
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                <DocumentTextIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum projeto encontrado</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece criando seu primeiro projeto'}
              </p>
              <Button
                leftIcon={<PlusIcon className="w-5 h-5" />}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white"
              >
                Criar Primeiro Projeto
              </Button>
            </div>
          </Card>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredProjects.map((project) => (
              <Card key={project.id} variant="glass" hoverable>
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(project.type)}`}>
                          {project.type}
                        </span>
                        <Badge {...getStatusBadge(project.status)} size="sm" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.location}</p>
                    </div>
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
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Orçamento</span>
                      <span className="font-medium text-gray-900">{formatCurrency(project.budget.total)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Gasto</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(project.budget.spent)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1 pt-2 border-t border-green-200">
                      <span className="text-gray-600">Restante</span>
                      <span className="font-bold text-green-600">{formatCurrency(project.budget.remaining)}</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {formatDate(project.timeline.startDate)} - {formatDate(project.timeline.endDate)}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center p-2 glass-card rounded">
                      <UserGroupIcon className="w-4 h-4 mx-auto text-gray-600 mb-1" />
                      <p className="text-xs text-gray-600">{project.vendors}</p>
                    </div>
                    <div className="text-center p-2 glass-card rounded">
                      <ClockIcon className="w-4 h-4 mx-auto text-gray-600 mb-1" />
                      <p className="text-xs text-gray-600">{project.milestones}</p>
                    </div>
                    <div className="text-center p-2 glass-card rounded">
                      <PhotoIcon className="w-4 h-4 mx-auto text-gray-600 mb-1" />
                      <p className="text-xs text-gray-600">{project.photos}</p>
                    </div>
                    <div className="text-center p-2 glass-card rounded">
                      <DocumentTextIcon className="w-4 h-4 mx-auto text-gray-600 mb-1" />
                      <p className="text-xs text-gray-600">{project.documents}</p>
                    </div>
                  </div>

                  {/* Days Remaining */}
                  {project.timeline.daysRemaining > 0 && (
                    <div className="flex items-center gap-2 text-sm mb-4 p-2 bg-blue-50 rounded">
                      <ClockIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">
                        <strong>{project.timeline.daysRemaining}</strong> dias restantes
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <Link href={`/projects/${project.id}`}>
                    <Button
                      variant="outline"
                      fullWidth
                      className="border-green-600 text-green-600 hover:bg-green-50"
                    >
                      Ver Detalhes do Projeto
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
