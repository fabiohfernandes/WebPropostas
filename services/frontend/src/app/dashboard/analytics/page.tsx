// ============================================================================
// Analytics Dashboard
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { Card, Badge } from '@/components/UI';
import { InDevelopment, FeatureInDevelopment } from '@/components/Development';
import { ChartBarIcon, EyeIcon, CursorArrowRaysIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { api } from '@/lib/api';

interface DashboardStats {
  totalProposals: number;
  totalClients: number;
  conversionRate: number;
  proposalsByStatus: {
    aberta: number;
    alteracoes_solicitadas: number;
    fechada: number;
    rejeitada: number;
  };
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProposals: 0,
    totalClients: 0,
    conversionRate: 0,
    proposalsByStatus: {
      aberta: 0,
      alteracoes_solicitadas: 0,
      fechada: 0,
      rejeitada: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/dashboard/stats');

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    {
      label: 'Total de Propostas',
      value: stats.totalProposals.toString(),
      icon: <ChartBarIcon className="w-6 h-6" />,
      change: '+' + stats.totalProposals,
      changeColor: 'success'
    },
    {
      label: 'Taxa de Conversão',
      value: `${Math.round(stats.conversionRate)}%`,
      icon: <CursorArrowRaysIcon className="w-6 h-6" />,
      change: stats.conversionRate > 0 ? '+' + Math.round(stats.conversionRate) + '%' : '0%',
      changeColor: 'success'
    },
    {
      label: 'Propostas Fechadas',
      value: stats.proposalsByStatus.fechada.toString(),
      icon: <CheckCircleIcon className="w-6 h-6" />,
      change: '+' + stats.proposalsByStatus.fechada,
      changeColor: 'success'
    },
    {
      label: 'Propostas Abertas',
      value: stats.proposalsByStatus.aberta.toString(),
      icon: <EyeIcon className="w-6 h-6" />,
      change: stats.proposalsByStatus.aberta.toString(),
      changeColor: 'info'
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Acompanhe o desempenho das suas propostas</p>
      </div>

      {/* Key Metrics */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando analytics...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, idx) => (
              <Card key={idx} variant="glass">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                    <Badge variant={metric.changeColor as any} size="sm" className="mt-2">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
                    {metric.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Status Breakdown */}
          <Card variant="glass" className="mb-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Propostas por Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <EyeIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{stats.proposalsByStatus.aberta}</p>
                <p className="text-sm text-gray-600">Abertas</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <ExclamationCircleIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">{stats.proposalsByStatus.alteracoes_solicitadas}</p>
                <p className="text-sm text-gray-600">Alterações</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircleIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{stats.proposalsByStatus.fechada}</p>
                <p className="text-sm text-gray-600">Fechadas</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <XCircleIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">{stats.proposalsByStatus.rejeitada}</p>
                <p className="text-sm text-gray-600">Rejeitadas</p>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Charts - Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <FeatureInDevelopment
          title="Gráfico de Propostas por Status"
          description="Visualização em pizza do status das propostas"
          eta="Fase 22"
        />
        <FeatureInDevelopment
          title="Tendência de Conversão"
          description="Gráfico de linha mostrando conversões ao longo do tempo"
          eta="Fase 22"
        />
      </div>

      <div className="mb-6">
        <FeatureInDevelopment
          title="Funil de Conversão"
          description="Visualização do funil completo desde visualização até fechamento"
          eta="Fase 22"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeatureInDevelopment
          title="Top Propostas por Visualizações"
          description="Ranking das propostas mais visualizadas"
          eta="Fase 22"
        />
        <FeatureInDevelopment
          title="Mapa de Calor de Seções"
          description="Quais seções recebem mais atenção dos clientes"
          eta="Fase 22"
        />
      </div>
    </div>
  );
}
