// ============================================================================
// Contracts Module - Provider Portal
// Contract generation and e-signature management
// ============================================================================

import { ModulePlaceholder } from '@/components/Development';

export default function ContractsPage() {
  return (
    <ModulePlaceholder
      title="Contratos e Assinatura Eletrônica"
      description="Transforme propostas aprovadas em contratos legais com assinatura eletrônica integrada"
      portal="provider"
      category="Jurídico & Contratos"
      eta="Q2 2025"
      features={[
        'Geração automática de contratos a partir de propostas aprovadas',
        'Templates de contrato personalizáveis por tipo de serviço',
        'Editor de cláusulas contratuais com biblioteca jurídica',
        'Integração com DocuSign, Clicksign e Autentique para assinatura eletrônica',
        'Workflow de aprovação multi-nível (cliente → prestador → testemunhas)',
        'Validade jurídica garantida com certificação ICP-Brasil',
        'Versionamento de contratos com histórico de alterações',
        'Notificações automáticas de prazos e vencimentos',
        'Armazenamento seguro de contratos assinados',
        'Exportação em PDF com certificado digital',
        'Dashbo ard de status de assinatura em tempo real',
        'Lembretes automáticos para partes que não assinaram',
      ]}
      relatedModules={[
        { name: 'Propostas', path: '/proposals' },
        { name: 'CRM de Clientes', path: '/clients' },
        { name: 'Financeiro', path: '/financeiro' },
      ]}
      backLink="/dashboard"
      backLabel="Voltar ao Dashboard"
    />
  );
}
