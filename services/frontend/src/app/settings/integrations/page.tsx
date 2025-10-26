'use client';

import { useState } from 'react';
import {
  PuzzlePieceIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  KeyIcon,
  LinkIcon,
  BoltIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  ChartBarIcon,
  CloudIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface Integration {
  id: string;
  name: string;
  category: 'communication' | 'design' | 'signature' | 'storage' | 'analytics' | 'payment' | 'crm';
  description: string;
  icon: React.ComponentType<any>;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  lastSync?: string;
  apiKey?: string;
  webhookUrl?: string;
  config?: Record<string, any>;
  features: string[];
  setupRequired: boolean;
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  lastTriggered?: string;
  successRate: number;
}

export default function IntegrationsSettingsPage() {
  const [activeTab, setActiveTab] = useState('integrations');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  // Mock integrations data
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'openai',
      name: 'OpenAI GPT-4',
      category: 'design',
      description: 'Geração de conteúdo com IA para propostas e textos comerciais',
      icon: BoltIcon,
      status: 'connected',
      lastSync: '2025-01-15T14:30:00',
      apiKey: 'sk-••••••••••••••••••••••••••••••••4532',
      features: ['Geração de texto', 'Reescrita', 'Tradução', 'Resumos'],
      setupRequired: false,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      category: 'communication',
      description: 'Notificações e comunicação via WhatsApp com clientes',
      icon: ChatBubbleLeftRightIcon,
      status: 'connected',
      lastSync: '2025-01-15T13:45:00',
      apiKey: 'whatsapp_••••••••••••••••••••8765',
      features: ['Envio de mensagens', 'Notificações automáticas', 'Templates'],
      setupRequired: false,
    },
    {
      id: 'docusign',
      name: 'DocuSign',
      category: 'signature',
      description: 'Assinatura eletrônica de contratos e documentos',
      icon: DocumentTextIcon,
      status: 'connected',
      lastSync: '2025-01-15T12:20:00',
      apiKey: 'ds_••••••••••••••••••••••••1234',
      features: ['Assinatura eletrônica', 'Rastreamento', 'Templates'],
      setupRequired: false,
    },
    {
      id: 'clicksign',
      name: 'Clicksign',
      category: 'signature',
      description: 'Assinatura digital de documentos e contratos (alternativa)',
      icon: PencilSquareIcon,
      status: 'disconnected',
      features: ['Assinatura digital', 'Certificado ICP-Brasil', 'API REST'],
      setupRequired: true,
    },
    {
      id: 'gmail',
      name: 'Gmail SMTP',
      category: 'communication',
      description: 'Envio de e-mails transacionais e notificações',
      icon: EnvelopeIcon,
      status: 'connected',
      lastSync: '2025-01-15T11:00:00',
      config: { smtp: 'smtp.gmail.com', port: 587 },
      features: ['E-mails transacionais', 'Templates HTML', 'Anexos'],
      setupRequired: false,
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      category: 'communication',
      description: 'Notificações via Telegram para equipe e clientes',
      icon: ChatBubbleLeftRightIcon,
      status: 'disconnected',
      features: ['Mensagens automáticas', 'Comandos personalizados', 'Grupos'],
      setupRequired: true,
    },
    {
      id: 'aws-s3',
      name: 'AWS S3',
      category: 'storage',
      description: 'Armazenamento de arquivos e imagens em nuvem',
      icon: CloudIcon,
      status: 'connected',
      lastSync: '2025-01-15T14:00:00',
      apiKey: 'AKIA••••••••••••••••ABCD',
      config: { region: 'sa-east-1', bucket: 'webpropostas-files' },
      features: ['Upload de arquivos', 'CDN', 'Backup automático'],
      setupRequired: false,
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      category: 'analytics',
      description: 'Rastreamento e análise de comportamento de usuários',
      icon: ChartBarIcon,
      status: 'connected',
      lastSync: '2025-01-15T10:30:00',
      apiKey: 'G-••••••••••',
      features: ['Eventos personalizados', 'Conversões', 'Funil de vendas'],
      setupRequired: false,
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'payment',
      description: 'Processamento de pagamentos com cartão de crédito',
      icon: BoltIcon,
      status: 'disconnected',
      features: ['Cartões internacionais', 'Assinaturas recorrentes', 'Webhooks'],
      setupRequired: true,
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      category: 'payment',
      description: 'Gateway de pagamento brasileiro (PIX, boleto, cartão)',
      icon: BoltIcon,
      status: 'error',
      lastSync: '2025-01-14T16:20:00',
      apiKey: 'APP_USR••••••••••••••••••',
      features: ['PIX', 'Boleto', 'Cartões nacionais', 'Parcelamento'],
      setupRequired: true,
    },
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      category: 'crm',
      description: 'Sincronização de contatos e oportunidades',
      icon: LinkIcon,
      status: 'disconnected',
      features: ['Sync de contatos', 'Deals', 'Automação de marketing'],
      setupRequired: true,
    },
    {
      id: 'zapier',
      name: 'Zapier',
      category: 'design',
      description: 'Automações e integrações com 5000+ apps',
      icon: WrenchScrewdriverIcon,
      status: 'disconnected',
      features: ['Workflows personalizados', '5000+ integrações', 'Triggers'],
      setupRequired: true,
    },
  ]);

  // Mock webhooks data
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      name: 'Notificação de Nova Proposta',
      url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX',
      events: ['proposal.created', 'proposal.updated'],
      status: 'active',
      createdAt: '2024-12-01T10:00:00',
      lastTriggered: '2025-01-15T14:30:00',
      successRate: 98.5,
    },
    {
      id: '2',
      name: 'Webhook de Assinatura de Contrato',
      url: 'https://api.example.com/webhooks/contract-signed',
      events: ['contract.signed', 'contract.cancelled'],
      status: 'active',
      createdAt: '2024-11-15T14:00:00',
      lastTriggered: '2025-01-14T16:45:00',
      successRate: 100,
    },
    {
      id: '3',
      name: 'Sincronização com CRM',
      url: 'https://crm.empresa.com/api/sync',
      events: ['client.created', 'client.updated', 'proposal.closed'],
      status: 'inactive',
      createdAt: '2024-10-20T09:00:00',
      lastTriggered: '2024-12-28T11:20:00',
      successRate: 75.2,
    },
  ]);

  const categories = [
    { id: 'all', label: 'Todas', count: integrations.length },
    { id: 'communication', label: 'Comunicação', count: integrations.filter((i) => i.category === 'communication').length },
    { id: 'signature', label: 'Assinatura Digital', count: integrations.filter((i) => i.category === 'signature').length },
    { id: 'storage', label: 'Armazenamento', count: integrations.filter((i) => i.category === 'storage').length },
    { id: 'payment', label: 'Pagamentos', count: integrations.filter((i) => i.category === 'payment').length },
    { id: 'analytics', label: 'Analytics', count: integrations.filter((i) => i.category === 'analytics').length },
    { id: 'crm', label: 'CRM', count: integrations.filter((i) => i.category === 'crm').length },
    { id: 'design', label: 'Design & IA', count: integrations.filter((i) => i.category === 'design').length },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredIntegrations = selectedCategory === 'all'
    ? integrations
    : integrations.filter((i) => i.category === selectedCategory);

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      connected: 'bg-green-100 text-green-700 border-green-200',
      disconnected: 'bg-gray-100 text-gray-700 border-gray-200',
      error: 'bg-red-100 text-red-700 border-red-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || colors.disconnected;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      connected: 'Conectado',
      disconnected: 'Desconectado',
      error: 'Erro',
      pending: 'Pendente',
      active: 'Ativo',
      inactive: 'Inativo',
    };
    return labels[status] || status;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 30) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowApiKeyModal(true);
  };

  const handleDisconnect = (integrationId: string) => {
    if (confirm('Tem certeza que deseja desconectar esta integração?')) {
      setIntegrations(
        integrations.map((i) =>
          i.id === integrationId ? { ...i, status: 'disconnected' as const } : i
        )
      );
    }
  };

  const handleToggleWebhook = (webhookId: string) => {
    setWebhooks(
      webhooks.map((w) =>
        w.id === webhookId
          ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' }
          : w
      )
    );
  };

  const handleDeleteWebhook = (webhookId: string) => {
    if (confirm('Tem certeza que deseja remover este webhook?')) {
      setWebhooks(webhooks.filter((w) => w.id !== webhookId));
    }
  };

  const stats = {
    totalIntegrations: integrations.length,
    connectedIntegrations: integrations.filter((i) => i.status === 'connected').length,
    activeWebhooks: webhooks.filter((w) => w.status === 'active').length,
    errorCount: integrations.filter((i) => i.status === 'error').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Integrações</h1>
              <p className="text-sm text-gray-600 mt-1">
                Conecte serviços externos e automatize processos
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
                <p className="text-sm text-gray-600 mb-1">Total de Integrações</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalIntegrations}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <PuzzlePieceIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Conectadas</p>
                <p className="text-3xl font-bold text-green-600">{stats.connectedIntegrations}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Webhooks Ativos</p>
                <p className="text-3xl font-bold text-purple-600">{stats.activeWebhooks}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <CodeBracketIcon className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Com Erro</p>
                <p className="text-3xl font-bold text-red-600">{stats.errorCount}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'integrations', label: 'Integrações Disponíveis', count: stats.totalIntegrations },
            { id: 'webhooks', label: 'Webhooks', count: webhooks.length },
            { id: 'api', label: 'API' },
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

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                      selectedCategory === category.id
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Integrations Grid */}
            <div className="grid grid-cols-2 gap-6">
              {filteredIntegrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={integration.id}
                    className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {integration.name}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium border ${getStatusBadgeColor(integration.status)}`}>
                            {getStatusLabel(integration.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Recursos:</p>
                      <div className="flex flex-wrap gap-2">
                        {integration.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                        {integration.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                            +{integration.features.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Last Sync */}
                    {integration.lastSync && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                        <ClockIcon className="w-4 h-4" />
                        <span>Última sincronização: {getTimeAgo(integration.lastSync)}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {integration.status === 'connected' ? (
                        <>
                          <button className="flex-1 px-4 py-2 text-sm text-gray-700 font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Configurar
                          </button>
                          <button
                            onClick={() => handleDisconnect(integration.id)}
                            className="flex-1 px-4 py-2 text-sm text-red-600 font-medium bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Desconectar
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleConnect(integration)}
                          className="w-full px-4 py-2 text-sm text-white font-medium bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                          Conectar
                        </button>
                      )}
                    </div>

                    {integration.status === 'error' && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xs text-red-700">
                          ⚠️ Erro na sincronização. Verifique suas credenciais.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Webhooks Configurados</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Envie notificações para URLs externas quando eventos ocorrerem
                  </p>
                </div>
                <button
                  onClick={() => setShowWebhookModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  <LinkIcon className="w-5 h-5" />
                  Novo Webhook
                </button>
              </div>

              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${getStatusBadgeColor(webhook.status)}`}>
                            {getStatusLabel(webhook.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded-lg">
                          {webhook.url}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Eventos</p>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded"
                            >
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Taxa de Sucesso</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                webhook.successRate >= 95
                                  ? 'bg-green-600'
                                  : webhook.successRate >= 80
                                  ? 'bg-yellow-600'
                                  : 'bg-red-600'
                              }`}
                              style={{ width: `${webhook.successRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {webhook.successRate}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Último Disparo</p>
                        <p className="text-sm text-gray-900">
                          {webhook.lastTriggered
                            ? getTimeAgo(webhook.lastTriggered)
                            : 'Nunca'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleWebhook(webhook.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          webhook.status === 'active'
                            ? 'text-yellow-700 bg-yellow-50 hover:bg-yellow-100'
                            : 'text-green-700 bg-green-50 hover:bg-green-100'
                        }`}
                      >
                        {webhook.status === 'active' ? 'Desativar' : 'Ativar'}
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-700 font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Editar
                      </button>
                      <button className="px-4 py-2 text-sm text-blue-700 font-medium bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        Testar
                      </button>
                      <button
                        onClick={() => handleDeleteWebhook(webhook.id)}
                        className="px-4 py-2 text-sm text-red-600 font-medium bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Eventos Disponíveis para Webhooks
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[
                        'proposal.created',
                        'proposal.updated',
                        'proposal.closed',
                        'client.created',
                        'client.updated',
                        'contract.signed',
                        'contract.cancelled',
                        'payment.received',
                        'user.invited',
                      ].map((event) => (
                        <span
                          key={event}
                          className="px-2 py-1 bg-white text-blue-700 text-xs rounded font-mono"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Acesso à API</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chave de API (API Key)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value="wp_live_••••••••••••••••••••••••••••••••4532"
                      readOnly
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-mono text-sm"
                    />
                    <button className="px-4 py-3 text-blue-600 font-medium bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      Copiar
                    </button>
                    <button className="px-4 py-3 text-gray-700 font-medium bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Use esta chave para autenticar requisições à API. Mantenha-a em segredo.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900 mb-1">
                        Importante sobre Segurança
                      </p>
                      <p className="text-sm text-yellow-700">
                        Nunca compartilhe sua API key publicamente ou em código cliente. Use variáveis de ambiente em produção.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Documentação da API
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CodeBracketIcon className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Referência da API</p>
                          <p className="text-sm text-gray-600">
                            Documentação completa de endpoints
                          </p>
                        </div>
                      </div>
                      <span className="text-blue-600">→</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Guia de Início Rápido</p>
                          <p className="text-sm text-gray-600">
                            Tutorial para começar a usar a API
                          </p>
                        </div>
                      </div>
                      <span className="text-blue-600">→</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Exemplo de Requisição
                  </h3>
                  <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400 font-mono">
{`curl -X GET https://api.webpropostas.com/v1/proposals \\
  -H "Authorization: Bearer wp_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Rate Limits
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-blue-600 mb-1">Plano Profissional</p>
                      <p className="text-2xl font-bold text-blue-900">10,000</p>
                      <p className="text-xs text-blue-700">requisições/hora</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-sm text-green-600 mb-1">Uso Atual</p>
                      <p className="text-2xl font-bold text-green-900">2,450</p>
                      <p className="text-xs text-green-700">requisições esta hora</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <p className="text-sm text-purple-600 mb-1">Disponível</p>
                      <p className="text-2xl font-bold text-purple-900">7,550</p>
                      <p className="text-xs text-purple-700">requisições restantes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Conectar {selectedIntegration.name}
                </h2>
                <button
                  onClick={() => setShowApiKeyModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircleIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chave de API *
                </label>
                <input
                  type="text"
                  placeholder="Cole sua API key aqui..."
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Você pode encontrar sua API key no painel de desenvolvedor do {selectedIntegration.name}.
                </p>
              </div>

              {selectedIntegration.category === 'communication' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook URL (opcional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://sua-empresa.com/webhook"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Recursos que serão habilitados:</strong>
                </p>
                <ul className="mt-2 space-y-1">
                  {selectedIntegration.features.map((feature, index) => (
                    <li key={index} className="text-sm text-blue-700 flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert(`${selectedIntegration.name} conectado com sucesso!`);
                  setIntegrations(
                    integrations.map((i) =>
                      i.id === selectedIntegration.id
                        ? { ...i, status: 'connected' as const, lastSync: new Date().toISOString() }
                        : i
                    )
                  );
                  setShowApiKeyModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Conectar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Webhook Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Criar Novo Webhook</h2>
                <button
                  onClick={() => setShowWebhookModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircleIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Webhook *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Notificação de Nova Proposta"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Webhook *
                </label>
                <input
                  type="url"
                  placeholder="https://api.exemplo.com/webhook"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eventos *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'proposal.created',
                    'proposal.updated',
                    'proposal.closed',
                    'client.created',
                    'client.updated',
                    'contract.signed',
                  ].map((event) => (
                    <label key={event} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm text-gray-900 font-mono">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowWebhookModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Webhook criado com sucesso!');
                  setShowWebhookModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Criar Webhook
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
