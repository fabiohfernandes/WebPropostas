// ============================================================================
// Financial Management Module - Provider Portal
// Invoicing, NFe, payments and financial reports
// ============================================================================

import { ModulePlaceholder } from '@/components/Development';

export default function FinanceiroPage() {
  return (
    <ModulePlaceholder
      title="Gestão Financeira"
      description="Controle completo de recebimentos, emissão de notas fiscais e relatórios financeiros"
      portal="provider"
      category="Financeiro & Contabilidade"
      eta="Q1 2025"
      features={[
        'Dashboard financeiro com visão de receitas, despesas e lucro',
        'Emissão automatizada de Nota Fiscal Eletrônica (NFe e NFS-e)',
        'Integração com prefeituras municipais para emissão de NFS-e',
        'Controle de recebimentos com status (pendente, pago, atrasado)',
        'Gestão de despesas e categorização de custos',
        'Reconciliação bancária automática via Open Banking',
        'Relatórios de fluxo de caixa mensal e projeções',
        'Análise de lucratividade por cliente e por projeto',
        'Lembretes de cobranças e faturas vencidas',
        'Exportação de dados para sistemas contábeis (XML/CSV)',
        'Integração com gateways de pagamento (Stripe, Mercado Pago, PagSeguro)',
        'Relatórios fiscais para declaração de impostos (IR, INSS)',
      ]}
      relatedModules={[
        { name: 'Propostas', path: '/proposals' },
        { name: 'Contratos', path: '/contracts' },
        { name: 'CRM de Clientes', path: '/clients' },
        { name: 'Relatórios', path: '/reports' },
      ]}
      backLink="/dashboard"
      backLabel="Voltar ao Dashboard"
    />
  );
}
