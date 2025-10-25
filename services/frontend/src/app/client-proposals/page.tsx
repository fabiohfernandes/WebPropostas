// ============================================================================
// Client Proposals Inbox - Client Portal
// Manage received proposals from providers
// ============================================================================

import { ModulePlaceholder } from '@/components/Development';

export default function ClientProposalsPage() {
  return (
    <ModulePlaceholder
      title="Propostas Recebidas"
      description="Visualize, compare e gerencie todas as propostas recebidas de fornecedores"
      portal="client"
      category="Propostas & Orçamentos"
      eta="Q2 2025"
      features={[
        'Lista de todas as propostas recebidas com filtros e busca',
        'Status de propostas: novas, em revisão, aprovadas, rejeitadas',
        'Visualização lado a lado para comparar múltiplas propostas',
        'Comentários e solicitações de ajustes direto na proposta',
        'Aprovação ou rejeição de propostas com justificativa',
        'Notificações de novas propostas e respostas de fornecedores',
        'Histórico completo de interações com cada fornecedor',
        'Exportação de propostas em PDF',
        'Integração com gestão de projetos (converter proposta em projeto)',
        'Avaliação de fornecedores após conclusão',
        'Arquivamento de propostas antigas',
        'Compartilhamento de propostas com familiares (modo família)',
      ]}
      relatedModules={[
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'Dashboard', path: '/client-dashboard' },
        { name: 'Projetos', path: '/projects' },
        { name: 'Fornecedores', path: '/vendors' },
      ]}
      backLink="/client-dashboard"
      backLabel="Voltar ao Dashboard"
    />
  );
}
