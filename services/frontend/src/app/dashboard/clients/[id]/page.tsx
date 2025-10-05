// ============================================================================
// Client Detail Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { Card, Button, Badge, StatusBadge } from '@/components/UI';
import { InDevelopment } from '@/components/Development';
import { EnvelopeIcon, PhoneIcon, BuildingOfficeIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function ClientDetailPage() {
  const client = {
    name: 'Maria Silva',
    company: 'TechCorp Ltda',
    email: 'maria@techcorp.com',
    phone: '(11) 98765-4321',
    proposals: [
      { id: 1, title: 'Desenvolvimento Web', status: 'fechada' as const, value: 'R$ 25.000' },
      { id: 2, title: 'App Mobile', status: 'aberta' as const, value: 'R$ 35.000' },
    ],
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white text-2xl font-bold">
            {client.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <BuildingOfficeIcon className="w-4 h-4" />
              {client.company}
            </p>
          </div>
        </div>
        <Button leftIcon={<PencilIcon className="w-5 h-5" />} variant="outline">
          Editar Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div>
          <Card variant="glass">
            <h3 className="font-semibold text-gray-900 mb-4">Informações de Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{client.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{client.phone}</span>
              </div>
            </div>
          </Card>

          <Card variant="glass" className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Estatísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Propostas</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa Conversão</span>
                <span className="font-semibold text-green-600">80%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor Total</span>
                <span className="font-semibold">R$ 95.000</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Proposals & Activity */}
        <div className="lg:col-span-2">
          <Card variant="glass">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Propostas</h3>
              <Button size="sm">Nova Proposta</Button>
            </div>
            <div className="space-y-4">
              {client.proposals.map((proposal) => (
                <div key={proposal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{proposal.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{proposal.value}</p>
                  </div>
                  <StatusBadge status={proposal.status} />
                </div>
              ))}
            </div>
          </Card>

          <Card variant="glass" className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Atividade Recente</h3>
            <InDevelopment
              title="Timeline de Atividades"
              description="Interações, visualizações, comentários"
              size="sm"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
