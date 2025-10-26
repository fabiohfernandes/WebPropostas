'use client';

import { useState } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChartBarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CalendarIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'pix';
  isDefault: boolean;
  cardBrand?: 'visa' | 'mastercard' | 'amex' | 'elo';
  lastFourDigits?: string;
  expiryMonth?: number;
  expiryYear?: number;
  holderName?: string;
  bankName?: string;
  accountType?: 'checking' | 'savings';
  pixKey?: string;
  pixKeyType?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
}

interface Invoice {
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  description: string;
  paymentMethod?: string;
  downloadUrl?: string;
}

interface Subscription {
  id: string;
  plan: 'free' | 'basic' | 'professional' | 'enterprise';
  planName: string;
  status: 'active' | 'cancelled' | 'trial' | 'expired';
  startDate: string;
  renewalDate: string;
  amount: number;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  features: string[];
  users: number;
  storage: string;
  proposals: number;
}

export default function BillingSettingsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  // Mock subscription data
  const subscription: Subscription = {
    id: '1',
    plan: 'professional',
    planName: 'Profissional',
    status: 'active',
    startDate: '2024-01-15',
    renewalDate: '2025-02-15',
    amount: 299.90,
    billingCycle: 'monthly',
    features: [
      'Até 10 usuários',
      '500 propostas/mês',
      '100 GB de armazenamento',
      'Geração de AI ilimitada',
      'Assinatura eletrônica (50/mês)',
      'Suporte prioritário',
      'API avançada',
      'Relatórios personalizados',
    ],
    users: 7,
    storage: '100 GB',
    proposals: 500,
  };

  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      isDefault: true,
      cardBrand: 'visa',
      lastFourDigits: '4532',
      expiryMonth: 12,
      expiryYear: 2026,
      holderName: 'Carlos Silva',
    },
    {
      id: '2',
      type: 'credit_card',
      isDefault: false,
      cardBrand: 'mastercard',
      lastFourDigits: '8765',
      expiryMonth: 8,
      expiryYear: 2025,
      holderName: 'Carlos Silva',
    },
    {
      id: '3',
      type: 'pix',
      isDefault: false,
      pixKey: '12.345.678/0001-90',
      pixKeyType: 'cnpj',
    },
  ]);

  // Mock invoices
  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2025-001',
      issueDate: '2025-01-15',
      dueDate: '2025-01-25',
      paidDate: '2025-01-16',
      amount: 299.90,
      status: 'paid',
      description: 'Assinatura Profissional - Janeiro 2025',
      paymentMethod: 'Visa •••• 4532',
      downloadUrl: '/invoices/2025-001.pdf',
    },
    {
      id: '2',
      number: 'INV-2024-012',
      issueDate: '2024-12-15',
      dueDate: '2024-12-25',
      paidDate: '2024-12-18',
      amount: 299.90,
      status: 'paid',
      description: 'Assinatura Profissional - Dezembro 2024',
      paymentMethod: 'Visa •••• 4532',
      downloadUrl: '/invoices/2024-012.pdf',
    },
    {
      id: '3',
      number: 'INV-2024-011',
      issueDate: '2024-11-15',
      dueDate: '2024-11-25',
      paidDate: '2024-11-20',
      amount: 299.90,
      status: 'paid',
      description: 'Assinatura Profissional - Novembro 2024',
      paymentMethod: 'Mastercard •••• 8765',
      downloadUrl: '/invoices/2024-011.pdf',
    },
    {
      id: '4',
      number: 'INV-2024-010',
      issueDate: '2024-10-15',
      dueDate: '2024-10-25',
      paidDate: '2024-10-17',
      amount: 299.90,
      status: 'paid',
      description: 'Assinatura Profissional - Outubro 2024',
      paymentMethod: 'Visa •••• 4532',
      downloadUrl: '/invoices/2024-010.pdf',
    },
    {
      id: '5',
      number: 'INV-2024-009',
      issueDate: '2024-09-15',
      dueDate: '2024-09-25',
      paidDate: '2024-09-19',
      amount: 299.90,
      status: 'paid',
      description: 'Assinatura Profissional - Setembro 2024',
      paymentMethod: 'Visa •••• 4532',
      downloadUrl: '/invoices/2024-009.pdf',
    },
  ]);

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 0,
      billingCycle: 'monthly',
      features: [
        '1 usuário',
        '10 propostas/mês',
        '1 GB de armazenamento',
        'Templates básicos',
        'Suporte por e-mail',
      ],
      current: false,
      recommended: false,
    },
    {
      id: 'basic',
      name: 'Básico',
      price: 99.90,
      billingCycle: 'monthly',
      features: [
        'Até 3 usuários',
        '100 propostas/mês',
        '10 GB de armazenamento',
        'Geração de AI (limite)',
        'Templates premium',
        'Suporte por chat',
      ],
      current: false,
      recommended: false,
    },
    {
      id: 'professional',
      name: 'Profissional',
      price: 299.90,
      billingCycle: 'monthly',
      features: [
        'Até 10 usuários',
        '500 propostas/mês',
        '100 GB de armazenamento',
        'Geração de AI ilimitada',
        'Assinatura eletrônica (50/mês)',
        'Suporte prioritário',
        'API avançada',
        'Relatórios personalizados',
      ],
      current: true,
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 999.90,
      billingCycle: 'monthly',
      features: [
        'Usuários ilimitados',
        'Propostas ilimitadas',
        '1 TB de armazenamento',
        'Geração de AI ilimitada',
        'Assinatura eletrônica ilimitada',
        'Suporte 24/7',
        'API dedicada',
        'Onboarding personalizado',
        'SLA garantido',
      ],
      current: false,
      recommended: false,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      overdue: 'bg-red-100 text-red-700',
      cancelled: 'bg-gray-100 text-gray-700',
      active: 'bg-green-100 text-green-700',
      trial: 'bg-blue-100 text-blue-700',
      expired: 'bg-red-100 text-red-700',
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      paid: 'Pago',
      pending: 'Pendente',
      overdue: 'Vencido',
      cancelled: 'Cancelado',
      active: 'Ativo',
      trial: 'Trial',
      expired: 'Expirado',
    };
    return labels[status] || status;
  };

  const getCardBrandIcon = (brand: string) => {
    // In real app, would use actual brand logos
    return brand.toUpperCase();
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    if (method.type === 'credit_card' || method.type === 'debit_card') {
      return `${getCardBrandIcon(method.cardBrand || '')} •••• ${method.lastFourDigits}`;
    }
    if (method.type === 'pix') {
      return `PIX - ${method.pixKey}`;
    }
    return 'Outro';
  };

  const handleDeletePaymentMethod = (id: string) => {
    if (confirm('Tem certeza que deseja remover este método de pagamento?')) {
      setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
    }
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const stats = {
    currentPlan: subscription.planName,
    nextBilling: subscription.renewalDate,
    monthlySpend: subscription.amount,
    totalSpent: invoices.filter((inv) => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
  };

  const getDaysUntilRenewal = () => {
    const renewalDate = new Date(subscription.renewalDate);
    const today = new Date();
    const diffDays = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cobrança e Faturamento</h1>
              <p className="text-sm text-gray-600 mt-1">
                Gerencie sua assinatura, métodos de pagamento e faturas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Plano Atual</p>
                <p className="text-2xl font-bold text-blue-600">{stats.currentPlan}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <ChartBarIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Próxima Cobrança</p>
                <p className="text-lg font-bold text-gray-900">
                  {getDaysUntilRenewal()} dias
                </p>
                <p className="text-xs text-gray-500">{formatDate(stats.nextBilling)}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <CalendarIcon className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Valor Mensal</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(stats.monthlySpend)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <BanknotesIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Gasto</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalSpent)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <DocumentTextIcon className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'subscription', label: 'Assinatura' },
            { id: 'payment-methods', label: 'Métodos de Pagamento', count: paymentMethods.length },
            { id: 'invoices', label: 'Faturas', count: invoices.length },
            { id: 'plans', label: 'Planos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/80 backdrop-blur-md text-blue-600 border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-2 px-2 py-0.5 rounded-lg text-xs ${
                  activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Current Subscription Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Plano {subscription.planName}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${getStatusBadgeColor(subscription.status)}`}>
                      {getStatusLabel(subscription.status)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Renovação em {getDaysUntilRenewal()} dias ({formatDate(subscription.renewalDate)})
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(subscription.amount)}
                  </p>
                  <p className="text-sm text-gray-600">por mês</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 mb-1">Usuários</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {subscription.users} / 10
                  </p>
                  <div className="mt-2 bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${(subscription.users / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-green-600 mb-1">Armazenamento</p>
                  <p className="text-2xl font-bold text-green-900">45 GB / 100 GB</p>
                  <div className="mt-2 bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 rounded-full h-2" style={{ width: '45%' }} />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 mb-1">Propostas (este mês)</p>
                  <p className="text-2xl font-bold text-purple-900">234 / 500</p>
                  <div className="mt-2 bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 rounded-full h-2" style={{ width: '47%' }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors">
                  Alterar Plano
                </button>
                <button className="px-6 py-3 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors">
                  Cancelar Assinatura
                </button>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Método de Pagamento Padrão
              </h2>
              {paymentMethods.find((pm) => pm.isDefault) && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCardIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {getPaymentMethodLabel(paymentMethods.find((pm) => pm.isDefault)!)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {paymentMethods.find((pm) => pm.isDefault)?.holderName}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    Alterar
                  </button>
                </div>
              )}
            </div>

            {/* Recent Invoices */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Faturas Recentes</h2>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver todas
                </button>
              </div>
              <div className="space-y-3">
                {invoices.slice(0, 3).map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{invoice.number}</p>
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <p className="text-xs text-gray-600">{formatDate(invoice.issueDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Detalhes da Assinatura</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plano</label>
                  <p className="text-lg font-semibold text-gray-900">{subscription.planName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${getStatusBadgeColor(subscription.status)}`}>
                    {getStatusLabel(subscription.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Início
                  </label>
                  <p className="text-gray-900">{formatDate(subscription.startDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Próxima Renovação
                  </label>
                  <p className="text-gray-900">{formatDate(subscription.renewalDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciclo de Cobrança
                  </label>
                  <p className="text-gray-900">Mensal</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Recursos Inclusos
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {subscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <InformationCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900 mb-1">
                      Renovação Automática Ativada
                    </p>
                    <p className="text-sm text-yellow-700">
                      Sua assinatura será renovada automaticamente em {formatDate(subscription.renewalDate)} usando o método de pagamento padrão cadastrado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payment-methods' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Métodos de Pagamento</h2>
                <button
                  onClick={() => setShowAddPaymentModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  <PlusIcon className="w-5 h-5" />
                  Adicionar Método
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-6 border-2 rounded-xl transition-all ${
                      method.isDefault
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          method.isDefault ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <CreditCardIcon className={`w-7 h-7 ${
                            method.isDefault ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">
                              {getPaymentMethodLabel(method)}
                            </p>
                            {method.isDefault && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
                                Padrão
                              </span>
                            )}
                          </div>
                          {method.holderName && (
                            <p className="text-sm text-gray-600 mb-2">{method.holderName}</p>
                          )}
                          {method.expiryMonth && method.expiryYear && (
                            <p className="text-sm text-gray-600">
                              Validade: {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefaultPayment(method.id)}
                            className="px-4 py-2 text-sm text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            Definir como Padrão
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePaymentMethod(method.id)}
                          disabled={method.isDefault}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title={method.isDefault ? 'Não é possível remover o método padrão' : 'Remover método'}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Seus dados estão seguros
                    </p>
                    <p className="text-sm text-blue-700">
                      Todos os dados de pagamento são criptografados e processados de forma segura. Não armazenamos informações completas do cartão de crédito.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Histórico de Faturas</h2>
            </div>

            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Fatura
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Emissão
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{invoice.number}</p>
                      <p className="text-xs text-gray-600">{invoice.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{invoice.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{formatDate(invoice.issueDate)}</p>
                      {invoice.paidDate && (
                        <p className="text-xs text-gray-600">
                          Pago em {formatDate(invoice.paidDate)}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${getStatusBadgeColor(invoice.status)}`}>
                        {getStatusLabel(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                        title="Baixar fatura"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Planos Disponíveis</h2>
              <div className="grid grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative border-2 rounded-2xl p-6 transition-all ${
                      plan.current
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold rounded-full">
                          Recomendado
                        </span>
                      </div>
                    )}
                    {plan.current && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                          Plano Atual
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6 mt-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">
                          {formatCurrency(plan.price)}
                        </span>
                        <span className="text-gray-600">/mês</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      disabled={plan.current}
                      className={`w-full py-3 font-medium rounded-xl transition-all ${
                        plan.current
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                      }`}
                    >
                      {plan.current ? 'Plano Atual' : 'Selecionar Plano'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Adicionar Método de Pagamento</h2>
                <button
                  onClick={() => setShowAddPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircleIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="p-6 border-2 border-blue-500 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-colors">
                  <CreditCardIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Cartão de Crédito</p>
                </button>
                <button className="p-6 border-2 border-gray-200 rounded-xl text-center hover:border-gray-300 transition-colors">
                  <div className="w-10 h-10 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold">
                    PIX
                  </div>
                  <p className="font-medium text-gray-900">PIX</p>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="João Silva"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validade (Mês)
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validade (Ano)
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {Array.from({ length: 10 }, (_, i) => 2025 + i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Método de pagamento adicionado com sucesso!');
                  setShowAddPaymentModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Adicionar Cartão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
