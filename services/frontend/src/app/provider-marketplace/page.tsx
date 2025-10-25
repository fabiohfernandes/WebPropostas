// ============================================================================
// Provider Marketplace Listings - Provider Portal
// Manage marketplace profile and service listings
// ============================================================================

import { ModulePlaceholder } from '@/components/Development';

export default function ProviderMarketplacePage() {
  return (
    <ModulePlaceholder
      title="Meus Anúncios no Marketplace"
      description="Gerencie seu perfil profissional e anúncios de serviços no marketplace de clientes"
      portal="provider"
      category="Marketplace & Visibilidade"
      eta="Q2 2025"
      features={[
        'Perfil profissional completo com portfólio e avaliações',
        'Criação e edição de anúncios de serviços',
        'Upload de fotos e vídeos de trabalhos realizados',
        'Definição de categorias e especialidades',
        'Configuração de áreas de atendimento geográfico',
        'Precificação dinâmica por tipo de serviço',
        'Gestão de disponibilidade e calendário',
        'Resposta a solicitações de orçamento recebidas',
        'Analytics de visualizações e conversões do perfil',
        'SEO do perfil para melhor rankeamento nas buscas',
        'Badges e certificações profissionais',
        'Sistema de reputação baseado em avaliações de clientes',
      ]}
      relatedModules={[
        { name: 'Marketplace (Visão Cliente)', path: '/marketplace' },
        { name: 'Propostas', path: '/proposals' },
        { name: 'CRM de Clientes', path: '/clients' },
        { name: 'Analytics', path: '/reports' },
      ]}
      backLink="/dashboard"
      backLabel="Voltar ao Dashboard"
    />
  );
}
