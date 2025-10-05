// ============================================================================
// Clients List Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, MagnifyingGlassIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { Button, Card, Badge, EmptyState } from '@/components/UI';

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const clients = [
    {
      id: '1',
      name: 'Maria Silva',
      company: 'TechCorp Ltda',
      email: 'maria@techcorp.com',
      phone: '(11) 98765-4321',
      proposals: 5,
      conversionRate: 80,
      status: 'active',
      lastContact: '2 dias atrás',
    },
    {
      id: '2',
      name: 'João Santos',
      company: 'Marketing Pro',
      email: 'joao@marketingpro.com',
      phone: '(21) 91234-5678',
      proposals: 3,
      conversionRate: 66,
      status: 'active',
      lastContact: '1 semana atrás',
    },
    {
      id: '3',
      name: 'Ana Costa',
      company: 'Startup XYZ',
      email: 'ana@startupxyz.com',
      phone: '(31) 99876-5432',
      proposals: 2,
      conversionRate: 50,
      status: 'inactive',
      lastContact: '1 mês atrás',
    },
  ];

  const stats = [
    { label: 'Total de Clientes', value: '24', trend: { value: 12, isPositive: true } },
    { label: 'Clientes Ativos', value: '18', trend: { value: 8, isPositive: true } },
    { label: 'Taxa de Conversão Média', value: '68%', trend: { value: 5, isPositive: true } },
    { label: 'Novos este Mês', value: '6', trend: { value: 15, isPositive: true } },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie seus clientes e relacionamentos</p>
        </div>
        <Button leftIcon={<PlusIcon className="w-5 h-5" />}>
          Novo Cliente
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} variant="glass">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            {stat.trend && (
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-sm font-medium ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend.isPositive ? '↑' : '↓'} {stat.trend.value}%
                </span>
                <span className="text-xs text-gray-500">vs mês anterior</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card variant="glass" className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar clientes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <Card key={client.id} variant="glass" hoverable>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-bold">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <BuildingOfficeIcon className="w-4 h-4" />
                    {client.company}
                  </p>
                </div>
              </div>
              <Badge variant={client.status === 'active' ? 'success' : 'default'} size="sm">
                {client.status === 'active' ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <EnvelopeIcon className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <PhoneIcon className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{client.proposals}</p>
                <p className="text-xs text-gray-600">Propostas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{client.conversionRate}%</p>
                <p className="text-xs text-gray-600">Conversão</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-900 font-medium">{client.lastContact}</p>
                <p className="text-xs text-gray-600">Último contato</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Link href={`/dashboard/clients/${client.id}`} className="flex-1">
                <Button variant="outline" size="sm" fullWidth>Ver Detalhes</Button>
              </Link>
              <Link href={`/dashboard/proposals/new?client=${client.id}`}>
                <Button size="sm">Nova Proposta</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
