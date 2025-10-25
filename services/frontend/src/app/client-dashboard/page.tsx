// ============================================================================
// Client Dashboard - Client Portal
// Main dashboard for clients managing their projects and vendors
// ============================================================================

import { ModulePlaceholder } from '@/components/Development';

export default function ClientDashboardPage() {
  return (
    <ModulePlaceholder
      title="Dashboard do Cliente"
      description="Visão geral dos seus projetos, propostas recebidas e fornecedores favoritos"
      portal="client"
      category="Dashboard & Visão Geral"
      eta="Q1 2025"
      features={[
        'Visão unificada de todos os projetos ativos e concluídos',
        'Resumo de propostas recebidas, pendentes e aprovadas',
        'Calendário de marcos e entregas dos projetos',
        'Dashboard financeiro com orçamentos e gastos',
        'Notificações de novas propostas e atualizações',
        'Quick actions: solicitar orçamento, criar projeto, buscar fornecedores',
        'Widget de fornecedores favoritos com acesso rápido',
        'Timeline de atividades recentes',
        'Cartões de projetos com progresso visual',
        'Alertas de prazos e pendências',
        'Gráficos de gastos por categoria de serviço',
        'Acesso rápido a documentos importantes',
      ]}
      relatedModules={[
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'Projetos', path: '/projects' },
        { name: 'Propostas Recebidas', path: '/client-proposals' },
        { name: 'Fornecedores', path: '/vendors' },
      ]}
      backLink="/marketplace"
      backLabel="Voltar ao Marketplace"
    />
  );
}
