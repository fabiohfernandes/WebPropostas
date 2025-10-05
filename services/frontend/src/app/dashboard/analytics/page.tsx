// ============================================================================
// Analytics Dashboard
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { Card, Badge } from '@/components/UI';
import { InDevelopment, FeatureInDevelopment } from '@/components/Development';
import { ChartBarIcon, EyeIcon, CursorArrowRaysIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total de Visualizações', value: '1,234', icon: <EyeIcon className="w-6 h-6" />, change: '+12%' },
    { label: 'Taxa de Conversão', value: '68%', icon: <CursorArrowRaysIcon className="w-6 h-6" />, change: '+5%' },
    { label: 'Tempo Médio de Leitura', value: '8m 34s', icon: <ClockIcon className="w-6 h-6" />, change: '+2m' },
    { label: 'Propostas Ativas', value: '24', icon: <ChartBarIcon className="w-6 h-6" />, change: '+8' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Acompanhe o desempenho das suas propostas</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <Card key={idx} variant="glass">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <Badge variant="success" size="sm" className="mt-2">
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
