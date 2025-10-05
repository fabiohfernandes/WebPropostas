// ============================================================================
// Settings Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/UI';
import { InDevelopmentInline } from '@/components/Development';
import {
  UserIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  UserGroupIcon,
  LinkIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'company', name: 'Empresa', icon: <BuildingOfficeIcon className="w-5 h-5" /> },
    { id: 'billing', name: 'Cobrança', icon: <CreditCardIcon className="w-5 h-5" /> },
    { id: 'team', name: 'Equipe', icon: <UserGroupIcon className="w-5 h-5" />, badge: 'Pro' },
    { id: 'integrations', name: 'Integrações', icon: <LinkIcon className="w-5 h-5" /> },
    { id: 'preferences', name: 'Preferências', icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie sua conta e preferências</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <Card variant="glass">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    <span className="font-medium">{tab.name}</span>
                  </div>
                  {tab.badge && (
                    <Badge variant="warning" size="sm">{tab.badge}</Badge>
                  )}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card variant="glass">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informações Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    defaultValue="João Silva"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="joao@example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    defaultValue="(11) 98765-4321"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <Button>Salvar Alterações</Button>
              </div>
            </Card>
          )}

          {activeTab === 'company' && (
            <Card variant="glass">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Dados da Empresa</h2>
              <InDevelopmentInline
                title="Configurações da Empresa"
                description="Logo, cores da marca, domínio personalizado"
              />
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card variant="glass">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Cobrança e Plano</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">Plano Atual: Padrão</p>
                    <p className="text-sm text-gray-600">R$ 97/mês • Renova em 30 dias</p>
                  </div>
                  <Button variant="outline">Alterar Plano</Button>
                </div>
                <InDevelopmentInline
                  title="Histórico de Pagamentos"
                  description="Faturas e comprovantes"
                />
              </div>
            </Card>
          )}

          {activeTab === 'team' && (
            <Card variant="glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Membros da Equipe</h2>
                <Button size="sm">Convidar Membro</Button>
              </div>
              <InDevelopmentInline
                title="Gerenciamento de Equipe"
                description="Disponível no Plano Profissional"
              />
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card variant="glass">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Integrações</h2>
              <InDevelopmentInline
                title="Conecte suas Ferramentas"
                description="Zapier, Webhooks, API, CRM, etc."
              />
            </Card>
          )}

          {activeTab === 'preferences' && (
            <Card variant="glass">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Preferências</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idioma
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
                    <option>Português (Brasil)</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuso Horário
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
                    <option>América/São_Paulo (GMT-3)</option>
                  </select>
                </div>
                <Button>Salvar Preferências</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
