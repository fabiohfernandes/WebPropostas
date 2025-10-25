// ============================================================================
// Vendors Management - Client Portal
// Manage favorite vendors and contact history
// ============================================================================

import { ModulePlaceholder } from '@/components/Development';

export default function VendorsPage() {
  return (
    <ModulePlaceholder
      title="Meus Fornecedores"
      description="Gerencie seus fornecedores favoritos e o histórico de colaborações"
      portal="client"
      category="Fornecedores & Contatos"
      eta="Q2 2025"
      features={[
        'Lista de fornecedores salvos como favoritos',
        'Perfis completos com informações de contato e especialidades',
        'Histórico de propostas recebidas de cada fornecedor',
        'Avaliações e notas dadas aos fornecedores',
        'Projetos realizados com cada fornecedor',
        'Comunicação centralizada por fornecedor',
        'Tags personalizadas para organização (ex: confiável, bom preço)',
        'Comparação de fornecedores por critérios (preço, qualidade, prazo)',
        'Recomendações de fornecedores baseadas em preferências',
        'Exportação de lista de contatos',
        'Acesso rápido para solicitar novo orçamento',
        'Notificações de disponibilidade de fornecedores favoritos',
        'Histórico de pagamentos e faturas por fornecedor',
      ]}
      relatedModules={[
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'Propostas Recebidas', path: '/client-proposals' },
        { name: 'Projetos', path: '/projects' },
        { name: 'Dashboard', path: '/client-dashboard' },
      ]}
      backLink="/client-dashboard"
      backLabel="Voltar ao Dashboard"
    />
  );
}
