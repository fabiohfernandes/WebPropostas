// ============================================================================
// Financial Management Module - Provider Portal
// Complete financial control: Invoicing, NFe, Bank Reconciliation, Reports
// ============================================================================

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BanknotesIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  FunnelIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { Card, Button, StatCard, Table, Badge, Tabs, Input, Select } from '@/components/UI';

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterPeriod, setFilterPeriod] = useState('month');

  // Mock data - In production, this would come from API
  const stats = {
    totalRevenue: 145800,
    totalExpenses: 58320,
    profit: 87480,
    cashFlow: 62150,
    pendingInvoices: 12,
    overdueInvoices: 3,
    paidInvoices: 45,
  };

  const recentInvoices = [
    {
      id: '1',
      number: 'NF-2025-001',
      client: 'Construtora Silva Ltda',
      date: '2025-01-05',
      dueDate: '2025-01-20',
      amount: 15000,
      status: 'pending',
    },
    {
      id: '2',
      number: 'NF-2025-002',
      client: 'Tech Solutions SA',
      date: '2024-12-28',
      dueDate: '2025-01-12',
      amount: 8500,
      status: 'overdue',
    },
    {
      id: '3',
      number: 'NF-2024-156',
      client: 'Marketing Pro',
      date: '2024-12-20',
      dueDate: '2025-01-05',
      amount: 12000,
      status: 'paid',
    },
    {
      id: '4',
      number: 'NF-2024-155',
      client: 'Design Studio',
      date: '2024-12-15',
      dueDate: '2024-12-30',
      amount: 9500,
      status: 'paid',
    },
  ];

  const recentExpenses = [
    { id: '1', date: '2025-01-04', category: 'Software', description: 'Adobe Creative Cloud', amount: 250 },
    { id: '2', date: '2025-01-03', category: 'Transporte', description: 'Combustível', amount: 180 },
    { id: '3', date: '2025-01-02', category: 'Equipamento', description: 'Mouse sem fio', amount: 120 },
    { id: '4', date: '2024-12-30', category: 'Aluguel', description: 'Escritório - Janeiro', amount: 2500 },
  ];

  const cashFlowData = [
    { month: 'Ago', receita: 42000, despesas: 18500 },
    { month: 'Set', receita: 48000, despesas: 21000 },
    { month: 'Out', receita: 52000, despesas: 19800 },
    { month: 'Nov', receita: 45000, despesas: 22300 },
    { month: 'Dez', receita: 58000, despesas: 24200 },
    { month: 'Jan', receita: 62000, despesas: 25100 },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: { variant: 'success' as const, label: 'Pago' },
      pending: { variant: 'warning' as const, label: 'Pendente' },
      overdue: { variant: 'danger' as const, label: 'Vencido' },
      cancelled: { variant: 'neutral' as const, label: 'Cancelado' },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestão Financeira</h1>
              <p className="text-gray-600 mt-1">
                Controle completo de recebimentos, despesas e relatórios fiscais
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                variant="glass"
              >
                <option value="week">Última semana</option>
                <option value="month">Último mês</option>
                <option value="quarter">Último trimestre</option>
                <option value="year">Último ano</option>
              </Select>
              <Button
                leftIcon={<PlusIcon className="w-5 h-5" />}
                size="lg"
              >
                Nova Fatura
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Receita Total"
            value={formatCurrency(stats.totalRevenue)}
            icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
            variant="success"
            trend={12.5}
            trendLabel="vs mês anterior"
          />
          <StatCard
            label="Despesas Totais"
            value={formatCurrency(stats.totalExpenses)}
            icon={<ArrowTrendingDownIcon className="w-6 h-6" />}
            variant="danger"
            trend={-5.2}
            trendLabel="vs mês anterior"
          />
          <StatCard
            label="Lucro Líquido"
            value={formatCurrency(stats.profit)}
            icon={<ChartBarIcon className="w-6 h-6" />}
            variant="primary"
            trend={18.3}
            trendLabel="vs mês anterior"
          />
          <StatCard
            label="Fluxo de Caixa"
            value={formatCurrency(stats.cashFlow)}
            icon={<BanknotesIcon className="w-6 h-6" />}
            variant="info"
          />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'invoices', label: 'Faturas', badge: stats.pendingInvoices },
            { id: 'expenses', label: 'Despesas' },
            { id: 'reports', label: 'Relatórios' },
            { id: 'nfe', label: 'NFe/NFS-e' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="pills"
          theme="provider"
        />

        <div className="mt-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass" className="border-l-4 border-green-500">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Faturas Pagas</h3>
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.paidInvoices}</p>
                    <p className="text-sm text-gray-600 mt-2">Este mês</p>
                  </div>
                </Card>

                <Card variant="glass" className="border-l-4 border-yellow-500">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Faturas Pendentes</h3>
                      <ClockIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingInvoices}</p>
                    <p className="text-sm text-gray-600 mt-2">Aguardando pagamento</p>
                  </div>
                </Card>

                <Card variant="glass" className="border-l-4 border-red-500">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Faturas Vencidas</h3>
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.overdueInvoices}</p>
                    <p className="text-sm text-red-600 mt-2 font-medium">Requer atenção</p>
                  </div>
                </Card>
              </div>

              {/* Cash Flow Chart Placeholder */}
              <Card variant="glass">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Fluxo de Caixa</h3>
                    <Button variant="outline" size="sm" leftIcon={<ArrowPathIcon className="w-4 h-4" />}>
                      Atualizar
                    </Button>
                  </div>

                  {/* Simple bar chart representation */}
                  <div className="space-y-4">
                    {cashFlowData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">{data.month}</span>
                          <span className="text-gray-600">
                            {formatCurrency(data.receita - data.despesas)}
                          </span>
                        </div>
                        <div className="flex gap-1 h-8">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 rounded"
                            style={{ width: `${(data.receita / 70000) * 100}%` }}
                            title={`Receita: ${formatCurrency(data.receita)}`}
                          />
                          <div
                            className="bg-gradient-to-r from-red-500 to-red-600 rounded"
                            style={{ width: `${(data.despesas / 70000) * 100}%` }}
                            title={`Despesas: ${formatCurrency(data.despesas)}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded" />
                      <span className="text-sm text-gray-600">Receita</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded" />
                      <span className="text-sm text-gray-600">Despesas</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Invoices */}
                <Card variant="glass">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Faturas Recentes</h3>
                      <Link href="/financeiro/invoices">
                        <Button variant="ghost" size="sm">Ver todas</Button>
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {recentInvoices.slice(0, 4).map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-3 glass-card rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{invoice.client}</p>
                            <p className="text-sm text-gray-600">{invoice.number} • Venc: {formatDate(invoice.dueDate)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</p>
                            <Badge {...getStatusBadge(invoice.status)} size="sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Recent Expenses */}
                <Card variant="glass">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Despesas Recentes</h3>
                      <Link href="/financeiro/expenses">
                        <Button variant="ghost" size="sm">Ver todas</Button>
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {recentExpenses.map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-3 glass-card rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{expense.description}</p>
                            <p className="text-sm text-gray-600">{expense.category} • {formatDate(expense.date)}</p>
                          </div>
                          <p className="font-semibold text-red-600">-{formatCurrency(expense.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <Card variant="glass">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Gestão de Faturas</h2>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<FunnelIcon className="w-4 h-4" />}>
                      Filtrar
                    </Button>
                    <Button leftIcon={<PlusIcon className="w-5 h-5" />}>
                      Nova Fatura
                    </Button>
                  </div>
                </div>

                <Table
                  columns={[
                    { key: 'number', label: 'Número', sortable: true },
                    { key: 'client', label: 'Cliente', sortable: true },
                    { key: 'date', label: 'Emissão', sortable: true },
                    { key: 'dueDate', label: 'Vencimento', sortable: true },
                    { key: 'amount', label: 'Valor', sortable: true },
                    { key: 'status', label: 'Status', sortable: true },
                    { key: 'actions', label: 'Ações' },
                  ]}
                  data={recentInvoices.map((invoice) => ({
                    ...invoice,
                    date: formatDate(invoice.date),
                    dueDate: formatDate(invoice.dueDate),
                    amount: formatCurrency(invoice.amount),
                    status: <Badge {...getStatusBadge(invoice.status)} />,
                    actions: (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Ver</Button>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </div>
                    ),
                  }))}
                  variant="striped"
                  hoverable
                />
              </div>
            </Card>
          )}

          {/* Expenses Tab */}
          {activeTab === 'expenses' && (
            <Card variant="glass">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Controle de Despesas</h2>
                  <Button leftIcon={<PlusIcon className="w-5 h-5" />}>
                    Nova Despesa
                  </Button>
                </div>
                <p className="text-gray-600">Módulo de despesas em desenvolvimento...</p>
              </div>
            </Card>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <Card variant="glass">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Relatórios Fiscais</h2>
                <p className="text-gray-600">Módulo de relatórios em desenvolvimento...</p>
              </div>
            </Card>
          )}

          {/* NFe Tab */}
          {activeTab === 'nfe' && (
            <Card variant="glass">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">NFe/NFS-e</h2>
                <p className="text-gray-600">Módulo de notas fiscais em desenvolvimento...</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
