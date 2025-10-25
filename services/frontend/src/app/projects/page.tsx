// ============================================================================
// Project Management Module - Client Portal
// Manage construction/renovation projects with vendors
// ============================================================================

import { ModulePlaceholder } from '@/components/Development';

export default function ProjectsPage() {
  return (
    <ModulePlaceholder
      title="Gestão de Projetos"
      description="Organize e acompanhe todos os seus projetos de construção e reforma em um só lugar"
      portal="client"
      category="Projetos & Gestão"
      eta="Q1 2025"
      features={[
        'Criação de projetos com informações completas (tipo, local, orçamento, prazos)',
        'Kanban board para visualizar fases do projeto',
        'Timeline com marcos e entregas planejadas vs realizadas',
        'Galeria de fotos do antes, durante e depois',
        'Upload e organização de documentos (contratos, alvarás, plantas)',
        'Lista de fornecedores envolvidos no projeto com status',
        'Controle orçamentário: planejado vs gasto por categoria',
        'Checklist de tarefas e pendências',
        'Comunicação centralizada com fornecedores',
        'Histórico de todas as alterações e decisões',
        'Compartilhamento de progresso com familiares',
        'Relatórios de status e conclusão de projeto',
        'Integração com propostas e contratos',
      ]}
      relatedModules={[
        { name: 'Dashboard', path: '/client-dashboard' },
        { name: 'Fornecedores', path: '/vendors' },
        { name: 'Propostas Recebidas', path: '/client-proposals' },
        { name: 'Financeiro', path: '/financeiro' },
      ]}
      backLink="/client-dashboard"
      backLabel="Voltar ao Dashboard"
    />
  );
}
