'use client';

import { useState } from 'react';
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  KeyIcon,
  ClockIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'owner' | 'admin' | 'manager' | 'user' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  department?: string;
  lastLogin?: string;
  createdAt: string;
  permissions: string[];
}

interface Role {
  id: string;
  name: string;
  label: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Carlos Silva',
      email: 'carlos.silva@arquiteturasilva.com.br',
      phone: '(11) 98765-4321',
      role: 'owner',
      status: 'active',
      department: 'Direção',
      lastLogin: '2025-01-15T14:30:00',
      createdAt: '2024-01-10T10:00:00',
      permissions: ['all'],
    },
    {
      id: '2',
      name: 'Ana Santos',
      email: 'ana.santos@arquiteturasilva.com.br',
      phone: '(11) 98765-4322',
      role: 'admin',
      status: 'active',
      department: 'Administração',
      lastLogin: '2025-01-15T13:45:00',
      createdAt: '2024-02-15T09:00:00',
      permissions: ['users.manage', 'proposals.manage', 'clients.manage', 'reports.view'],
    },
    {
      id: '3',
      name: 'Roberto Oliveira',
      email: 'roberto.oliveira@arquiteturasilva.com.br',
      phone: '(11) 98765-4323',
      role: 'manager',
      status: 'active',
      department: 'Projetos',
      lastLogin: '2025-01-15T11:20:00',
      createdAt: '2024-03-20T14:00:00',
      permissions: ['proposals.create', 'proposals.edit', 'clients.view', 'clients.create'],
    },
    {
      id: '4',
      name: 'Juliana Costa',
      email: 'juliana.costa@arquiteturasilva.com.br',
      phone: '(11) 98765-4324',
      role: 'user',
      status: 'active',
      department: 'Design',
      lastLogin: '2025-01-15T10:15:00',
      createdAt: '2024-05-10T11:30:00',
      permissions: ['proposals.view', 'clients.view'],
    },
    {
      id: '5',
      name: 'Pedro Almeida',
      email: 'pedro.almeida@arquiteturasilva.com.br',
      phone: '(11) 98765-4325',
      role: 'user',
      status: 'active',
      department: 'Arquitetura',
      lastLogin: '2025-01-14T16:40:00',
      createdAt: '2024-06-05T13:00:00',
      permissions: ['proposals.view', 'clients.view'],
    },
    {
      id: '6',
      name: 'Mariana Ferreira',
      email: 'mariana.ferreira@gmail.com',
      role: 'guest',
      status: 'pending',
      department: 'Consultoria',
      createdAt: '2025-01-10T09:00:00',
      permissions: ['proposals.view'],
    },
    {
      id: '7',
      name: 'Lucas Mendes',
      email: 'lucas.mendes@arquiteturasilva.com.br',
      phone: '(11) 98765-4326',
      role: 'user',
      status: 'inactive',
      department: 'Comercial',
      lastLogin: '2024-12-20T15:30:00',
      createdAt: '2024-04-15T10:00:00',
      permissions: ['clients.view', 'proposals.view'],
    },
  ]);

  // Mock roles data
  const roles: Role[] = [
    {
      id: 'owner',
      name: 'owner',
      label: 'Proprietário',
      description: 'Acesso total ao sistema com permissões irrestritas',
      userCount: 1,
      permissions: ['all'],
    },
    {
      id: 'admin',
      name: 'admin',
      label: 'Administrador',
      description: 'Gerenciamento completo de usuários, configurações e dados',
      userCount: 1,
      permissions: ['users.manage', 'proposals.manage', 'clients.manage', 'settings.manage', 'reports.view'],
    },
    {
      id: 'manager',
      name: 'manager',
      label: 'Gerente',
      description: 'Gerenciamento de propostas, clientes e equipe',
      userCount: 1,
      permissions: ['proposals.create', 'proposals.edit', 'clients.manage', 'users.view', 'reports.view'],
    },
    {
      id: 'user',
      name: 'user',
      label: 'Usuário',
      description: 'Acesso básico para visualização e edição limitada',
      userCount: 3,
      permissions: ['proposals.view', 'proposals.create', 'clients.view'],
    },
    {
      id: 'guest',
      name: 'guest',
      label: 'Convidado',
      description: 'Acesso somente leitura a recursos específicos',
      userCount: 1,
      permissions: ['proposals.view'],
    },
  ];

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      owner: 'bg-purple-100 text-purple-700 border-purple-200',
      admin: 'bg-blue-100 text-blue-700 border-blue-200',
      manager: 'bg-green-100 text-green-700 border-green-200',
      user: 'bg-gray-100 text-gray-700 border-gray-200',
      guest: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return colors[role] || colors.user;
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    return colors[status] || colors.active;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: 'Ativo',
      inactive: 'Inativo',
      pending: 'Pendente',
    };
    return labels[status] || status;
  };

  const getRoleLabel = (role: string) => {
    const roleObj = roles.find((r) => r.name === role);
    return roleObj?.label || role;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} minuto${diffMins > 1 ? 's' : ''} atrás`;
    if (diffHours < 24) return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 30) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'active').length,
    pendingInvites: users.filter((u) => u.status === 'pending').length,
    totalRoles: roles.length,
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
              <p className="text-sm text-gray-600 mt-1">
                Gerencie membros da equipe, funções e permissões
              </p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              <PlusIcon className="w-5 h-5" />
              Convidar Usuário
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Usuários</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <UserGroupIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Usuários Ativos</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Convites Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingInvites}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <ClockIcon className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Funções Definidas</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalRoles}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <ShieldCheckIcon className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'users', label: 'Usuários', count: stats.totalUsers },
            { id: 'roles', label: 'Funções e Permissões', count: stats.totalRoles },
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
              <span className={`ml-2 px-2 py-0.5 rounded-lg text-xs ${
                activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nome ou e-mail..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todas as Funções</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="pending">Pendente</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Função
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Departamento
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Último Acesso
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{user.department || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                          {getStatusLabel(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {user.lastLogin ? getTimeAgo(user.lastLogin) : 'Nunca'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar usuário"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          {user.role !== 'owner' && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remover usuário"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <UserCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhum usuário encontrado</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Funções e Permissões</h2>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{role.label}</h3>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium border ${getRoleBadgeColor(role.name)}`}>
                            {role.userCount} {role.userCount === 1 ? 'usuário' : 'usuários'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Permissões:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {role.permissions.map((permission) => (
                          <div key={permission} className="flex items-center gap-2 text-sm">
                            <CheckIcon className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700">
                              {permission === 'all' ? 'Todas as permissões' : permission.replace('.', ' - ').replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Permissions Legend */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-4">Legenda de Permissões</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-blue-900 mb-2">Usuários (users)</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• <strong>view:</strong> Visualizar lista de usuários</li>
                    <li>• <strong>manage:</strong> Criar, editar e remover usuários</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-900 mb-2">Propostas (proposals)</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• <strong>view:</strong> Visualizar propostas</li>
                    <li>• <strong>create:</strong> Criar novas propostas</li>
                    <li>• <strong>edit:</strong> Editar propostas existentes</li>
                    <li>• <strong>manage:</strong> Controle total sobre propostas</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-900 mb-2">Clientes (clients)</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• <strong>view:</strong> Visualizar clientes</li>
                    <li>• <strong>create:</strong> Cadastrar novos clientes</li>
                    <li>• <strong>manage:</strong> Gerenciar todos os clientes</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-900 mb-2">Outros</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• <strong>settings.manage:</strong> Gerenciar configurações</li>
                    <li>• <strong>reports.view:</strong> Visualizar relatórios</li>
                    <li>• <strong>all:</strong> Acesso irrestrito ao sistema</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Convidar Novo Usuário</h2>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="João Silva"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    placeholder="joao.silva@empresa.com.br"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    placeholder="(11) 98765-4321"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <input
                    type="text"
                    placeholder="Projetos"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Função *
                </label>
                <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {roles.filter((r) => r.name !== 'owner').map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Importante:</strong> Um e-mail de convite será enviado para o endereço informado com instruções para criar a senha e acessar a plataforma.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Convite enviado com sucesso!');
                  setShowInviteModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Enviar Convite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
