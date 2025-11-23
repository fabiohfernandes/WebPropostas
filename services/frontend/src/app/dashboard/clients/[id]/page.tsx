// ============================================================================
// Client Detail Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Card, Button, StatusBadge } from '@/components/UI';
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  PencilIcon,
  ArrowLeftIcon,
  IdentificationIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  document?: string;
  document_type?: string;
  proposal_count: number;
  proposals?: Array<{
    id: string;
    title: string;
    status: string;
    total_value: number;
    created_at: string;
  }>;
  created_at: string;
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clientId = params.id as string;

  useEffect(() => {
    const fetchClient = async () => {
      if (!clientId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await api.clients.get(clientId);
        if (response.data.success) {
          setClient(response.data.data.client);
        } else {
          throw new Error(response.data.error || 'Erro ao carregar cliente');
        }
      } catch (err: any) {
        console.error('Error fetching client:', err);
        const message = err.response?.data?.error || err.message || 'Erro ao carregar cliente';
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Format document (CPF/CNPJ)
  const formatDocument = (doc: string, type?: string) => {
    if (!doc) return '-';
    const cleaned = doc.replace(/\D/g, '');
    if (type === 'cpf' && cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    if (type === 'cnpj' && cleaned.length === 14) {
      return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return doc;
  };

  // Map status to StatusBadge format
  const mapStatus = (status: string): 'aberta' | 'fechada' | 'rejeitada' | 'alteracoes_solicitadas' => {
    const statusMap: Record<string, 'aberta' | 'fechada' | 'rejeitada' | 'alteracoes_solicitadas'> = {
      'draft': 'aberta',
      'open': 'aberta',
      'aberta': 'aberta',
      'closed': 'fechada',
      'fechada': 'fechada',
      'accepted': 'fechada',
      'rejected': 'rejeitada',
      'rejeitada': 'rejeitada',
      'pending_changes': 'alteracoes_solicitadas',
      'alteracoes_solicitadas': 'alteracoes_solicitadas',
    };
    return statusMap[status] || 'aberta';
  };

  // Calculate statistics
  const calculateStats = () => {
    if (!client?.proposals || client.proposals.length === 0) {
      return { total: 0, closed: 0, conversionRate: 0, totalValue: 0 };
    }

    const total = client.proposals.length;
    const closed = client.proposals.filter(p =>
      p.status === 'fechada' || p.status === 'closed' || p.status === 'accepted'
    ).length;
    const conversionRate = total > 0 ? Math.round((closed / total) * 100) : 0;
    const totalValue = client.proposals
      .filter(p => p.status === 'fechada' || p.status === 'closed' || p.status === 'accepted')
      .reduce((sum, p) => sum + (p.total_value || 0), 0);

    return { total, closed, conversionRate, totalValue };
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando cliente...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="p-6">
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Voltar para Clientes
        </Link>
        <Card variant="glass" className="text-center py-12">
          <p className="text-red-600 mb-4">{error || 'Cliente não encontrado'}</p>
          <Button onClick={() => router.push('/dashboard/clients')}>
            Voltar para lista de clientes
          </Button>
        </Card>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="p-6">
      {/* Back link */}
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Voltar para Clientes
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white text-2xl font-bold">
            {client.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
            {client.company && (
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <BuildingOfficeIcon className="w-4 h-4" />
                {client.company}
              </p>
            )}
          </div>
        </div>
        <Link href={`/dashboard/clients/${client.id}/edit`}>
          <Button leftIcon={<PencilIcon className="w-5 h-5" />} variant="outline">
            Editar Cliente
          </Button>
        </Link>
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
              {client.phone && (
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{client.phone}</span>
                </div>
              )}
              {client.document && (
                <div className="flex items-center gap-3">
                  <IdentificationIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    {client.document_type?.toUpperCase()}: {formatDocument(client.document, client.document_type)}
                  </span>
                </div>
              )}
            </div>
          </Card>

          <Card variant="glass" className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Estatísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Propostas</span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa Conversão</span>
                <span className={`font-semibold ${stats.conversionRate >= 50 ? 'text-green-600' : 'text-gray-700'}`}>
                  {stats.conversionRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor Total</span>
                <span className="font-semibold">{formatCurrency(stats.totalValue)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Proposals */}
        <div className="lg:col-span-2">
          <Card variant="glass">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Propostas</h3>
              <Link href={`/dashboard/proposals/new?client_id=${client.id}`}>
                <Button size="sm">Nova Proposta</Button>
              </Link>
            </div>

            {client.proposals && client.proposals.length > 0 ? (
              <div className="space-y-4">
                {client.proposals.map((proposal) => (
                  <Link
                    key={proposal.id}
                    href={`/dashboard/proposals/${proposal.id}`}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{proposal.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatCurrency(proposal.total_value || 0)}
                      </p>
                    </div>
                    <StatusBadge status={mapStatus(proposal.status)} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">Nenhuma proposta ainda</p>
                <Link href={`/dashboard/proposals/new?client_id=${client.id}`}>
                  <Button size="sm">Criar primeira proposta</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
