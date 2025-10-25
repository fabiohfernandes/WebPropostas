// ============================================================================
// Campaigns Module - Provider Portal
// Automated campaign management and email marketing
// ============================================================================

import { ModulePlaceholder } from '@/components/Development';

export default function CampaignsPage() {
  return (
    <ModulePlaceholder
      title="Campanhas Automatizadas"
      description="Crie e gerencie campanhas de email marketing automatizadas para nutrir leads e aumentar suas conversões"
      portal="provider"
      category="Marketing & Vendas"
      eta="Q2 2025"
      features={[
        'Editor visual de emails com templates profissionais',
        'Segmentação avançada de clientes por tags, estágio do funil e comportamento',
        'Automação de follow-up baseada em eventos (proposta enviada, visualizada, etc)',
        'Campanha de drip emails com sequências personalizadas',
        'A/B testing de subject lines, conteúdo e CTAs',
        'Analytics detalhado: taxa de abertura, cliques, conversões',
        'Integração com CRM para sincronização de contatos',
        'Templates pré-configurados para diferentes cenários (welcome, follow-up, win-back)',
        'Agendamento inteligente baseado no melhor horário de abertura',
        'Relatórios de ROI por campanha',
      ]}
      relatedModules={[
        { name: 'CRM de Clientes', path: '/clients' },
        { name: 'Propostas', path: '/proposals' },
        { name: 'Analytics', path: '/reports' },
      ]}
      backLink="/dashboard"
      backLabel="Voltar ao Dashboard"
    />
  );
}
