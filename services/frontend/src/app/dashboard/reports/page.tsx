// ============================================================================
// Reports Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { Card, Button } from '@/components/UI';
import { FeatureInDevelopment } from '@/components/Development';
import { DocumentChartBarIcon, CurrencyDollarIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ReportsPage() {
  const reports = [
    {
      icon: <DocumentChartBarIcon className="w-6 h-6" />,
      title: 'Pipeline de Vendas',
      description: 'Visualize todas as propostas em andamento',
    },
    {
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      title: 'Previsão de Receita',
      description: 'Projeção baseada em propostas abertas',
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: 'Insights de Clientes',
      description: 'Análise de comportamento e engajamento',
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: 'Tempo até Fechamento',
      description: 'Média de dias para converter propostas',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600 mt-1">Análises e insights do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, idx) => (
          <Card key={idx} variant="glass" hoverable>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-100 rounded-lg text-primary-600 flex-shrink-0">
                {report.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <FeatureInDevelopment
                  title={`Relatório: ${report.title}`}
                  description="Gráficos e métricas detalhadas"
                  size="sm"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Custom Report Builder */}
      <Card variant="glass" className="mt-8">
        <div className="text-center py-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Construtor de Relatórios Personalizado</h3>
          <p className="text-gray-600 mb-6">Crie relatórios sob medida para suas necessidades</p>
          <FeatureInDevelopment
            title="Report Builder"
            description="Escolha métricas, períodos, visualizações e exporte"
            size="lg"
            eta="Fase 40-41"
          />
        </div>
      </Card>
    </div>
  );
}
