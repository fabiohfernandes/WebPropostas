'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  PlusIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ArchiveBoxIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/auth';
import {
  Button,
  Card,
  StatCard,
  Badge,
  Table,
  TableCell,
  Modal,
  Skeleton
} from '@/components/UI';

// Types
interface DashboardStats {
  proposals: {
    total: number;
    open: number;
    closed: number;
    archived: number;
  };
  revenue: {
    total: number;
    closed: number;
  };
  activity: {
    views: number;
    uniqueVisitors: number;
    conversionRate: number;
  };
  recentComments: Array<{
    comment_text: string;
    created_at: string;
    proposal_name: string;
    client_name: string;
  }>;
}

interface Proposal {
  id: string;
  proposal_name: string;
  client_name: string;
  job_name: string;
  status: 'open' | 'closed' | 'archived';
  proposal_value: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  public_token: string;
}

interface ProposalAnalytics {
  pageAnalytics: Array<{
    page_name: string;
    views: number;
    total_time: number;
    avg_time: number;
    unique_sessions: number;
  }>;
  commentCount: number;
  summary: {
    totalViews: number;
    totalTime: number;
    uniqueSessions: number;
  };
}

const getStatusBadge = (status: string) => {
  const styles = {
    open: 'bg-blue-100 text-blue-800 border-blue-200',
    closed: 'bg-green-100 text-green-800 border-green-200',
    archived: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const labels = {
    open: 'Aberta',
    closed: 'Fechada',
    archived: 'Arquivada'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open':
      return <ClockIcon className="h-4 w-4 text-blue-500" />;
    case 'closed':
      return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
    case 'archived':
      return <ArchiveBoxIcon className="h-4 w-4 text-gray-500" />;
    default:
      return <DocumentTextIcon className="h-4 w-4 text-gray-500" />;
  }
};

export default function DashboardPage() {
  const { user, tokens } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [proposalAnalytics, setProposalAnalytics] = useState<ProposalAnalytics | null>(null);

  // Load dashboard data
  const loadDashboardData = async () => {
    if (!tokens?.accessToken) return;

    try {
      setLoading(true);

      // Get API URL from environment
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

      // Load stats
      const statsResponse = await fetch(`${apiUrl}/api/v1/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
        },
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data.stats);
      }

      // Load proposals
      const proposalsResponse = await fetch(`${apiUrl}/api/v1/proposals?limit=10`, {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
        },
      });

      if (proposalsResponse.ok) {
        const proposalsData = await proposalsResponse.json();
        setProposals(proposalsData.data.proposals);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Load proposal analytics
  const loadProposalAnalytics = async (proposalId: string) => {
    if (!tokens?.accessToken) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/v1/proposals/${proposalId}/analytics`, {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProposalAnalytics(data.data);
      }
    } catch (error) {
      console.error('Error loading proposal analytics:', error);
    }
  };

  // Delete proposal
  const deleteProposal = async (proposalId: string) => {
    if (!tokens?.accessToken) return;

    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esta proposta? Esta ação não pode ser desfeita.'
    );

    if (!confirmed) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/v1/proposals/${proposalId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
        },
      });

      if (response.ok) {
        setProposals(prev => prev.filter(p => p.id !== proposalId));
        toast.success('Proposta excluída com sucesso');
        await loadDashboardData(); // Refresh stats
      } else {
        toast.error('Erro ao excluir proposta');
      }
    } catch (error) {
      console.error('Error deleting proposal:', error);
      toast.error('Erro ao excluir proposta');
    }
  };

  // Copy proposal link
  const copyProposalLink = async (publicToken: string) => {
    const url = `${window.location.origin}/proposal/${publicToken}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copiado para a área de transferência');
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error('Erro ao copiar link');
    }
  };

  useEffect(() => {
    if (tokens?.accessToken) {
      loadDashboardData();
    }
  }, [tokens]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="glass-card-provider border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Bem-vindo de volta, {user?.name || 'Usuário'}! Gerencie suas propostas aqui.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/proposals/create">
                <Button
                  variant="primary"
                  theme="provider"
                  leftIcon={<PlusIcon className="h-5 w-5" />}
                >
                  Nova Proposta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards with Glassmorphism */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" width="100%" height={140} />
            ))}
          </div>
        ) : stats && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              label="Total de Propostas"
              value={stats.proposals.total}
              icon={<DocumentTextIcon className="h-6 w-6" />}
              variant="primary"
            />
            <StatCard
              label="Visualizações"
              value={stats.activity.views}
              icon={<EyeIcon className="h-6 w-6" />}
              variant="success"
              trend={{
                value: 12,
                isPositive: true
              }}
            />
            <StatCard
              label="Receita Total"
              value={new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(stats.revenue.total)}
              icon={<CurrencyDollarIcon className="h-6 w-6" />}
              variant="warning"
            />
            <StatCard
              label="Taxa de Conversão"
              value={`${stats.activity.conversionRate.toFixed(1)}%`}
              icon={<ChartBarIcon className="h-6 w-6" />}
              variant="default"
              trend={{
                value: 5,
                isPositive: true
              }}
            />
          </div>
        )}

        {/* Recent Comments */}
        {stats?.recentComments && stats.recentComments.length > 0 && (
          <Card
            title="Comentários Recentes"
            variant="glass-provider"
            theme="provider"
            className="mb-8"
          >
            <div className="space-y-3">
              {stats.recentComments.slice(0, 3).map((comment, index) => (
                <div key={index} className="p-3 glass-provider rounded-lg">
                  <p className="text-sm text-gray-800">{comment.comment_text}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    <span className="font-medium">{comment.client_name}</span> em {comment.proposal_name} •{' '}
                    {new Date(comment.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Proposals Table */}
        <Card
          title="Propostas Recentes"
          variant="glass-provider"
          theme="provider"
          headerAction={
            <Link href="/proposals">
              <Button variant="ghost" theme="provider" size="sm">
                Ver todas
              </Button>
            </Link>
          }
        >
          {proposals.length === 0 ? (
            <div className="p-12 text-center">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma proposta ainda</h3>
              <p className="mt-1 text-sm text-gray-500">
                Comece criando sua primeira proposta.
              </p>
              <div className="mt-6">
                <Link href="/proposals/create">
                  <Button variant="primary" theme="provider" leftIcon={<PlusIcon className="h-4 w-4" />}>
                    Criar Primeira Proposta
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Table
              columns={[
                {
                  key: 'proposal_name',
                  header: 'Proposta',
                  render: (value, row) => (
                    <div className="flex items-center">
                      {getStatusIcon(row.status)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{row.proposal_name}</div>
                        <div className="text-sm text-gray-500">{row.job_name}</div>
                      </div>
                    </div>
                  )
                },
                {
                  key: 'client_name',
                  header: 'Cliente'
                },
                {
                  key: 'proposal_value',
                  header: 'Valor',
                  align: 'right',
                  render: (value) => (
                    <TableCell.Currency value={value > 0 ? value : null} />
                  )
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (value) => getStatusBadge(value)
                },
                {
                  key: 'created_at',
                  header: 'Data',
                  render: (value) => <TableCell.Date value={value} />
                },
                {
                  key: 'actions',
                  header: 'Ações',
                  render: (_, row) => (
                    <TableCell.Actions>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyProposalLink(row.public_token);
                        }}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Copiar link"
                      >
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/proposals/${row.id}/edit`}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="Editar"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProposal(selectedProposal === row.id ? null : row.id);
                          if (selectedProposal !== row.id) {
                            loadProposalAnalytics(row.id);
                          }
                        }}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Ver analytics"
                      >
                        <ChartBarIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProposal(row.id);
                        }}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Excluir"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </TableCell.Actions>
                  )
                }
              ]}
              data={proposals}
              variant="striped"
              hoverable
              onRowClick={(row) => router.push(`/proposals/${row.id}/edit`)}
            />
          )}
        </Card>

        {/* Proposal Analytics Modal */}
        <Modal
          isOpen={!!(selectedProposal && proposalAnalytics)}
          onClose={() => {
            setSelectedProposal(null);
            setProposalAnalytics(null);
          }}
          title="Analytics da Proposta"
          size="lg"
        >
          {proposalAnalytics && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-provider-600">{proposalAnalytics.summary.totalViews}</div>
                  <div className="text-sm text-gray-500">Total de Visualizações</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{proposalAnalytics.summary.uniqueSessions}</div>
                  <div className="text-sm text-gray-500">Sessões Únicas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{proposalAnalytics.commentCount}</div>
                  <div className="text-sm text-gray-500">Comentários</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Visualizações por Página:</h4>
                {proposalAnalytics.pageAnalytics.map((page) => (
                  <div key={page.page_name} className="flex justify-between items-center p-3 glass-provider rounded-lg">
                    <span className="capitalize font-medium text-gray-900">{page.page_name}</span>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{page.views} visualizações</div>
                      <div className="text-sm text-gray-600">
                        {Math.floor(parseInt(String(page.avg_time)) / 60)}:{String(parseInt(String(page.avg_time)) % 60).padStart(2, '0')} tempo médio
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Modal>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/proposals/create">
            <Card variant="glass-provider" hoverable onClick={() => {}}>
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-provider-100 rounded-lg">
                  <PlusIcon className="h-8 w-8 text-provider-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Criar Proposta</h3>
                  <p className="text-sm text-gray-600">
                    Comece uma nova proposta do zero
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/proposals">
            <Card variant="glass-provider" hoverable onClick={() => {}}>
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-provider-100 rounded-lg">
                  <DocumentTextIcon className="h-8 w-8 text-provider-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Ver Todas as Propostas</h3>
                  <p className="text-sm text-gray-600">
                    Gerencie todas as suas propostas
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/reports">
            <Card variant="glass-provider" hoverable onClick={() => {}}>
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-provider-100 rounded-lg">
                  <ChartBarIcon className="h-8 w-8 text-provider-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Relatórios</h3>
                  <p className="text-sm text-gray-600">
                    Visualize o desempenho das propostas
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}