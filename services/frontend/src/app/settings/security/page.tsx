'use client';

import { useState } from 'react';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  ComputerDesktopIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  MapPinIcon,
  InformationCircleIcon,
  BellAlertIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

interface Session {
  id: string;
  device: string;
  browser: string;
  os: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

interface LoginHistory {
  id: string;
  timestamp: string;
  device: string;
  location: string;
  ipAddress: string;
  status: 'success' | 'failed' | 'blocked';
  method: 'password' | '2fa' | 'sso';
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'password_change' | 'email_change' | '2fa_enabled' | '2fa_disabled' | 'session_revoked';
  timestamp: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export default function SecuritySettingsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Mock sessions data
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      device: 'Windows Desktop',
      browser: 'Chrome 120',
      os: 'Windows 11',
      location: 'São Paulo, SP - Brasil',
      ipAddress: '177.138.45.123',
      lastActive: '2025-01-15T14:30:00',
      isCurrent: true,
    },
    {
      id: '2',
      device: 'iPhone 15 Pro',
      browser: 'Safari 17',
      os: 'iOS 17.2',
      location: 'São Paulo, SP - Brasil',
      ipAddress: '177.138.45.124',
      lastActive: '2025-01-15T10:15:00',
      isCurrent: false,
    },
    {
      id: '3',
      device: 'MacBook Pro',
      browser: 'Chrome 120',
      os: 'macOS 14',
      location: 'Rio de Janeiro, RJ - Brasil',
      ipAddress: '179.185.22.67',
      lastActive: '2025-01-14T16:45:00',
      isCurrent: false,
    },
  ]);

  // Mock login history
  const loginHistory: LoginHistory[] = [
    {
      id: '1',
      timestamp: '2025-01-15T14:30:00',
      device: 'Windows Desktop - Chrome',
      location: 'São Paulo, SP',
      ipAddress: '177.138.45.123',
      status: 'success',
      method: 'password',
    },
    {
      id: '2',
      timestamp: '2025-01-15T10:15:00',
      device: 'iPhone 15 Pro - Safari',
      location: 'São Paulo, SP',
      ipAddress: '177.138.45.124',
      status: 'success',
      method: 'password',
    },
    {
      id: '3',
      timestamp: '2025-01-14T16:45:00',
      device: 'MacBook Pro - Chrome',
      location: 'Rio de Janeiro, RJ',
      ipAddress: '179.185.22.67',
      status: 'success',
      method: 'password',
    },
    {
      id: '4',
      timestamp: '2025-01-13T09:20:00',
      device: 'Unknown - Firefox',
      location: 'Manaus, AM',
      ipAddress: '189.45.78.234',
      status: 'failed',
      method: 'password',
    },
    {
      id: '5',
      timestamp: '2025-01-12T18:30:00',
      device: 'Windows Desktop - Chrome',
      location: 'São Paulo, SP',
      ipAddress: '177.138.45.123',
      status: 'success',
      method: 'password',
    },
  ];

  // Mock security events
  const securityEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'login',
      timestamp: '2025-01-15T14:30:00',
      description: 'Login realizado de Windows Desktop em São Paulo, SP',
      severity: 'low',
    },
    {
      id: '2',
      type: 'password_change',
      timestamp: '2025-01-10T11:20:00',
      description: 'Senha alterada com sucesso',
      severity: 'medium',
    },
    {
      id: '3',
      type: 'session_revoked',
      timestamp: '2025-01-08T15:45:00',
      description: 'Sessão no dispositivo iPad Pro foi revogada',
      severity: 'low',
    },
    {
      id: '4',
      type: 'email_change',
      timestamp: '2024-12-28T10:00:00',
      description: 'E-mail alterado de carlos@email.com para carlos.silva@arquiteturasilva.com.br',
      severity: 'high',
    },
  ];

  const [securitySettings, setSecuritySettings] = useState({
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
    requireStrongPassword: true,
    allowMultipleSessions: true,
    emailNotifications: {
      newLogin: true,
      passwordChange: true,
      emailChange: true,
      suspiciousActivity: true,
    },
    ipWhitelist: [] as string[],
  });

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
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      success: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
      blocked: 'bg-yellow-100 text-yellow-700',
    };
    return colors[status] || colors.success;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      success: 'Sucesso',
      failed: 'Falhou',
      blocked: 'Bloqueado',
    };
    return labels[status] || status;
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700',
    };
    return colors[severity] || colors.low;
  };

  const getSeverityLabel = (severity: string) => {
    const labels: Record<string, string> = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
    };
    return labels[severity] || severity;
  };

  const handleRevokeSession = (sessionId: string) => {
    if (confirm('Tem certeza que deseja encerrar esta sessão?')) {
      setSessions(sessions.filter((s) => s.id !== sessionId));
    }
  };

  const handleRevokeAllSessions = () => {
    if (confirm('Tem certeza que deseja encerrar todas as outras sessões? Você precisará fazer login novamente em todos os dispositivos.')) {
      setSessions(sessions.filter((s) => s.isCurrent));
    }
  };

  const stats = {
    activeSessions: sessions.length,
    lastPasswordChange: 36,
    failedLogins: loginHistory.filter((l) => l.status === 'failed').length,
    twoFactorStatus: twoFactorEnabled ? 'Ativo' : 'Inativo',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Segurança</h1>
              <p className="text-sm text-gray-600 mt-1">
                Gerencie autenticação, sessões e configurações de segurança
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
                <p className="text-sm text-gray-600 mb-1">Sessões Ativas</p>
                <p className="text-3xl font-bold text-blue-600">{stats.activeSessions}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <ComputerDesktopIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Última Troca de Senha</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lastPasswordChange} dias</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <KeyIcon className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tentativas Falhadas</p>
                <p className="text-3xl font-bold text-red-600">{stats.failedLogins}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Autenticação 2FA</p>
                <p className={`text-2xl font-bold ${twoFactorEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                  {stats.twoFactorStatus}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${twoFactorEnabled ? 'bg-green-50' : 'bg-gray-50'}`}>
                <ShieldCheckIcon className={`w-8 h-8 ${twoFactorEnabled ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'password', label: 'Senha e Autenticação' },
            { id: 'sessions', label: 'Sessões Ativas', count: stats.activeSessions },
            { id: 'activity', label: 'Atividade Recente' },
            { id: 'settings', label: 'Configurações' },
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
            {/* Security Score */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Nível de Segurança</h2>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Pontuação Geral</span>
                    <span className="text-2xl font-bold text-yellow-600">65/100</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full h-4" style={{ width: '65%' }} />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Nível: Médio - Algumas melhorias recomendadas</p>
                </div>
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recomendações de Segurança</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-900">Ative a Autenticação em Dois Fatores (2FA)</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Adicione uma camada extra de segurança exigindo um código do celular além da senha.
                    </p>
                    <button
                      onClick={() => setShow2FAModal(true)}
                      className="mt-2 px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Ativar 2FA
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <InformationCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">Troque sua senha regularmente</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Sua senha não é alterada há {stats.lastPasswordChange} dias. Recomendamos trocar a cada 90 dias.
                    </p>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Alterar Senha
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">Notificações de segurança ativas</p>
                    <p className="text-sm text-green-700 mt-1">
                      Você está recebendo alertas por e-mail sobre atividades suspeitas e novos logins.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Summary */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Atividade Recente</h2>
                <button
                  onClick={() => setActiveTab('activity')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver tudo
                </button>
              </div>
              <div className="space-y-3">
                {securityEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{event.description}</p>
                      <p className="text-xs text-gray-600">{getTimeAgo(event.timestamp)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getSeverityColor(event.severity)}`}>
                      {getSeverityLabel(event.severity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Password & Authentication Tab */}
        {activeTab === 'password' && (
          <div className="space-y-6">
            {/* Password Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Senha</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Senha Atual</p>
                    <p className="text-sm text-gray-600">
                      Última alteração há {stats.lastPasswordChange} dias
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Alterar Senha
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-blue-900 mb-2">Requisitos de Senha Forte</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Mínimo de 8 caracteres
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Pelo menos uma letra maiúscula
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Pelo menos um número
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Pelo menos um caractere especial (@, #, $, etc.)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Autenticação em Dois Fatores (2FA)
              </h2>
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      twoFactorEnabled ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                      <DevicePhoneMobileIcon className={`w-6 h-6 ${
                        twoFactorEnabled ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Aplicativo Autenticador</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {twoFactorEnabled
                          ? 'Use um código do seu aplicativo autenticador para fazer login'
                          : 'Adicione uma camada extra de segurança com autenticação de dois fatores'}
                      </p>
                      {twoFactorEnabled && (
                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                          <CheckCircleIcon className="w-4 h-4" />
                          Configurado e ativo
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (twoFactorEnabled) {
                        if (confirm('Tem certeza que deseja desativar a autenticação em dois fatores?')) {
                          setTwoFactorEnabled(false);
                        }
                      } else {
                        setShow2FAModal(true);
                      }
                    }}
                    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                      twoFactorEnabled
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {twoFactorEnabled ? 'Desativar' : 'Ativar 2FA'}
                  </button>
                </div>

                {!twoFactorEnabled && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900 mb-1">
                          Recomendação de Segurança
                        </p>
                        <p className="text-sm text-yellow-700">
                          Ative a autenticação em dois fatores para proteger sua conta contra acessos não autorizados, mesmo que sua senha seja comprometida.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Sessões Ativas</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Gerencie os dispositivos onde sua conta está conectada
                  </p>
                </div>
                <button
                  onClick={handleRevokeAllSessions}
                  className="px-4 py-2 text-red-600 font-medium bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Encerrar Todas as Sessões
                </button>
              </div>

              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-6 border-2 rounded-xl ${
                      session.isCurrent
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          session.isCurrent ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <ComputerDesktopIcon className={`w-7 h-7 ${
                            session.isCurrent ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">{session.device}</p>
                            {session.isCurrent && (
                              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-lg">
                                Sessão Atual
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {session.browser} • {session.os}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{session.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <ClockIcon className="w-4 h-4" />
                              <span>Ativo {getTimeAgo(session.lastActive)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">IP: {session.ipAddress}</p>
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <button
                          onClick={() => handleRevokeSession(session.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Encerrar sessão"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Login History */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Histórico de Login</h2>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Data/Hora
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Dispositivo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Localização
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      IP
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loginHistory.map((login) => (
                    <tr key={login.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {new Date(login.timestamp).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(login.timestamp).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{login.device}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{login.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 font-mono">{login.ipAddress}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${getStatusBadgeColor(login.status)}`}>
                          {getStatusLabel(login.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Security Events */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Eventos de Segurança</h2>
              <div className="space-y-3">
                {securityEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900">{event.description}</p>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getSeverityColor(event.severity)}`}>
                          {getSeverityLabel(event.severity)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{getTimeAgo(event.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notificações de Segurança</h2>
              <div className="space-y-4">
                {[
                  { key: 'newLogin', label: 'Novo login detectado', description: 'Receba um e-mail quando houver login de um novo dispositivo' },
                  { key: 'passwordChange', label: 'Senha alterada', description: 'Seja notificado quando sua senha for alterada' },
                  { key: 'emailChange', label: 'E-mail alterado', description: 'Receba alerta quando o e-mail da conta for modificado' },
                  { key: 'suspiciousActivity', label: 'Atividade suspeita', description: 'Notificações sobre tentativas de login suspeitas' },
                ].map((notification) => (
                  <label
                    key={notification.key}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={securitySettings.emailNotifications[notification.key as keyof typeof securitySettings.emailNotifications]}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          emailNotifications: {
                            ...securitySettings.emailNotifications,
                            [notification.key]: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{notification.label}</p>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Configurações Avançadas</h2>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={securitySettings.requireStrongPassword}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireStrongPassword: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="font-medium text-gray-900">Exigir senha forte</span>
                  </label>
                  <p className="text-sm text-gray-600 ml-8">
                    Força os usuários a criarem senhas com requisitos mínimos de segurança
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={securitySettings.allowMultipleSessions}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          allowMultipleSessions: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="font-medium text-gray-900">Permitir múltiplas sessões</span>
                  </label>
                  <p className="text-sm text-gray-600 ml-8">
                    Permite login simultâneo em vários dispositivos
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo de expiração de sessão (minutos)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeoutMinutes}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeoutMinutes: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={5}
                    max={1440}
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Usuários serão desconectados automaticamente após este período de inatividade
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiração de senha (dias)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.passwordExpiryDays}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        passwordExpiryDays: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={30}
                    max={365}
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Usuários serão solicitados a trocar a senha após este período
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all">
                Salvar Configurações
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Alterar Senha</h2>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Atual *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="Digite sua senha atual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="Digite sua nova senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha *
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite novamente a nova senha"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">Requisitos de Senha</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Mínimo de 8 caracteres</li>
                  <li>• Pelo menos uma letra maiúscula</li>
                  <li>• Pelo menos um número</li>
                  <li>• Pelo menos um caractere especial</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Senha alterada com sucesso!');
                  setShowPasswordModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Alterar Senha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enable 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Ativar Autenticação em Dois Fatores</h2>
                <button
                  onClick={() => setShow2FAModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Escaneie este QR Code com seu aplicativo autenticador
                </p>
                <div className="w-64 h-64 bg-gray-100 rounded-xl mx-auto flex items-center justify-center">
                  <p className="text-gray-400">[QR Code Placeholder]</p>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Recomendamos Google Authenticator ou Microsoft Authenticator
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Ou insira este código manualmente:
                </label>
                <input
                  type="text"
                  value="ABCD EFGH IJKL MNOP"
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-center font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Digite o código de 6 dígitos do app:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="000000"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShow2FAModal(false)}
                className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setTwoFactorEnabled(true);
                  alert('Autenticação em dois fatores ativada com sucesso!');
                  setShow2FAModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Ativar 2FA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
