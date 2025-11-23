// ============================================================================
// Clients List Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusIcon, MagnifyingGlassIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Card, Badge, EmptyState } from '@/components/UI';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import toast from 'react-hot-toast';

interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  phone_formatted?: string;
  created_at: string;
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    conversionRate: 0,
    newThisMonth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchClients();
    fetchStats();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/clients');

      if (response.data.success) {
        setClients(response.data.data.clients || []);
      }
    } catch (err: any) {
      console.error('Error fetching clients:', err);
      setError(err.response?.data?.message || 'Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');

      if (response.data.success) {
        const data = response.data.data;
        setStats({
          total: data.totalClients || 0,
          active: data.totalClients || 0, // We'll calculate active based on recent activity later
          conversionRate: data.conversionRate || 0,
          newThisMonth: 0, // We'll calculate this from created_at dates
        });
      }
    } catch (err: any) {
      console.error('Error fetching stats:', err);
    }
  };

  // Calculate new clients this month
  useEffect(() => {
    if (clients.length > 0) {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const newThisMonth = clients.filter(client =>
        new Date(client.created_at) >= firstDayOfMonth
      ).length;

      setStats(prev => ({ ...prev, newThisMonth }));
    }
  }, [clients]);

  // Format phone number
  const formatPhone = (phone?: string) => {
    if (!phone) return '-';
    if (phone.length === 11) {
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    }
    return phone;
  };

  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Hoje';
    if (diffInDays === 1) return 'Ontem';
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semanas atrás`;
    return `${Math.floor(diffInDays / 30)} meses atrás`;
  };

  const handleDeleteClient = async () => {
    if (!deleteConfirm) return;

    setIsDeleting(true);
    try {
      const response = await api.clients.delete(deleteConfirm.id);
      // Check for success - API returns 200 with success: true
      if (response.status === 200 || response.data.success) {
        toast.success('Cliente excluído com sucesso!');
        setClients(clients.filter(c => c.id !== deleteConfirm.id));
        setStats(prev => ({ ...prev, total: prev.total - 1 }));
        return;
      } else {
        throw new Error(response.data.error || 'Erro ao excluir cliente');
      }
    } catch (err: any) {
      // If delete was actually successful (200 status), update the UI anyway
      if (err.response?.status === 200) {
        toast.success('Cliente excluído com sucesso!');
        setClients(clients.filter(c => c.id !== deleteConfirm.id));
        setStats(prev => ({ ...prev, total: prev.total - 1 }));
        return;
      }
      console.error('Error deleting client:', err);
      const message = err.response?.data?.error || err.message || 'Erro ao excluir cliente';
      toast.error(message);
    } finally {
      setIsDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const statsData = [
    { label: 'Total de Clientes', value: stats.total.toString(), trend: { value: 12, isPositive: true } },
    { label: 'Clientes Ativos', value: stats.active.toString(), trend: { value: 8, isPositive: true } },
    { label: 'Taxa de Conversão Média', value: `${Math.round(stats.conversionRate)}%`, trend: { value: 5, isPositive: true } },
    { label: 'Novos este Mês', value: stats.newThisMonth.toString(), trend: { value: 15, isPositive: true } },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie seus clientes e relacionamentos</p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button leftIcon={<PlusIcon className="w-5 h-5" />}>
            Novo Cliente
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, idx) => (
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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando clientes...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card variant="glass" className="p-6">
          <p className="text-red-600 text-center">{error}</p>
          <Button variant="outline" onClick={fetchClients} className="mt-4 mx-auto">
            Tentar Novamente
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && clients.length === 0 && (
        <EmptyState
          icon={<BuildingOfficeIcon className="w-16 h-16" />}
          title="Nenhum cliente cadastrado"
          description="Comece adicionando seu primeiro cliente para gerenciar propostas"
          action={{
            label: 'Adicionar Primeiro Cliente',
            onClick: () => window.location.href = '/dashboard/clients/new',
            icon: <PlusIcon className="w-5 h-5" />
          }}
        />
      )}

      {/* Clients Grid */}
      {!loading && !error && clients.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clients
            .filter(client =>
              client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((client) => (
            <Card key={client.id} variant="glass" hoverable>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-bold">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <BuildingOfficeIcon className="w-4 h-4" />
                        {client.company}
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  Ativo
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{client.phone_formatted || formatPhone(client.phone)}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-600">Propostas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">-</p>
                  <p className="text-xs text-gray-600">Conversão</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-900 font-medium">{getRelativeTime(client.created_at)}</p>
                  <p className="text-xs text-gray-600">Criado</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Link href={`/dashboard/clients/${client.id}`} className="flex-1">
                  <Button variant="outline" size="sm" fullWidth>Ver Detalhes</Button>
                </Link>
                <Link href={`/dashboard/proposals/new?client=${client.id}`}>
                  <Button size="sm">Nova Proposta</Button>
                </Link>
                <button
                  onClick={() => setDeleteConfirm({ id: client.id, name: client.name })}
                  className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-300 rounded-lg transition-all duration-200"
                  title="Excluir cliente"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Excluir Cliente</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir <strong>{deleteConfirm.name}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteClient}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
