// ============================================================================
// ModulePlaceholder Component
// Reusable placeholder for modules under development
// ============================================================================

'use client';

import React from 'react';
import Link from 'next/link';
import {
  SparklesIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowLeftIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { Card, Button } from '@/components/UI';

export interface ModulePlaceholderProps {
  /** Module title */
  title: string;
  /** Module description */
  description: string;
  /** Portal type */
  portal: 'provider' | 'client';
  /** Module category */
  category?: string;
  /** Planned features list */
  features?: string[];
  /** Expected implementation quarter */
  eta?: string;
  /** Related modules */
  relatedModules?: Array<{
    name: string;
    path: string;
  }>;
  /** Back link */
  backLink?: string;
  /** Back link label */
  backLabel?: string;
}

export function ModulePlaceholder({
  title,
  description,
  portal,
  category,
  features = [],
  eta = 'Q1 2025',
  relatedModules = [],
  backLink = '/dashboard',
  backLabel = 'Voltar ao Dashboard',
}: ModulePlaceholderProps) {
  const themeColors = portal === 'provider'
    ? {
        gradient: 'from-blue-600 to-blue-700',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
      }
    : {
        gradient: 'from-green-600 to-green-700',
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-700',
      };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-${portal === 'provider' ? 'blue' : 'green'}-50/30 to-gray-50`}>
      {/* Navigation */}
      <div className="glass-card border-b border-gray-200/50 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={backLink}>
            <Button variant="ghost" leftIcon={<ArrowLeftIcon className="w-4 h-4" />}>
              {backLabel}
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-semibold mb-6 shadow-lg">
            <CodeBracketIcon className="w-5 h-5" />
            <span>EM DESENVOLVIMENTO</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>

          {category && (
            <div className={`inline-flex items-center gap-2 px-3 py-1 ${themeColors.badge} rounded-full text-sm font-medium mb-6`}>
              {category}
            </div>
          )}

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <ClockIcon className="w-5 h-5" />
              <span>Previsão de lançamento: <strong>{eta}</strong></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Features */}
          <div className="lg:col-span-2 space-y-6">
            {features.length > 0 && (
              <Card variant="glass" className={`border-l-4 ${themeColors.border}`}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${themeColors.gradient} rounded-xl flex items-center justify-center`}>
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Funcionalidades Planejadas
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className={`w-6 h-6 ${themeColors.text} flex-shrink-0 mt-0.5`} />
                        <p className="text-gray-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Module Preview */}
            <Card variant="glass">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Visualização do Módulo
                </h3>
                <div className={`aspect-video ${themeColors.bg} rounded-lg border-2 border-dashed ${themeColors.border} flex items-center justify-center`}>
                  <div className="text-center p-8">
                    <RocketLaunchIcon className={`w-16 h-16 ${themeColors.text} mx-auto mb-4 opacity-50`} />
                    <p className="text-gray-600">
                      Interface em desenvolvimento
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card variant="elevated" className="border-2 border-yellow-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Status do Desenvolvimento
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-semibold text-yellow-600">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Este módulo está em fase de planejamento. As funcionalidades listadas são baseadas na documentação do produto.
                  </p>
                </div>
              </div>
            </Card>

            {/* Related Modules */}
            {relatedModules.length > 0 && (
              <Card variant="glass">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Módulos Relacionados
                  </h3>
                  <div className="space-y-2">
                    {relatedModules.map((module, index) => (
                      <Link key={index} href={module.path}>
                        <Button variant="ghost" fullWidth className="justify-start">
                          {module.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Portal Badge */}
            <Card variant="glass" className={`border-2 ${themeColors.border}`}>
              <div className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${themeColors.gradient} rounded-2xl flex items-center justify-center`}>
                  <span className="text-2xl text-white font-bold">
                    {portal === 'provider' ? 'P' : 'C'}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Portal do {portal === 'provider' ? 'Prestador' : 'Cliente'}
                </h4>
                <p className="text-sm text-gray-600">
                  {portal === 'provider'
                    ? 'Ferramentas profissionais para gestão de negócios'
                    : 'Recursos para gerenciar projetos e fornecedores'}
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card variant="glass" className={`border-2 ${themeColors.border}`}>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quer saber quando este módulo estará pronto?
              </h3>
              <p className="text-gray-600 mb-6">
                Acompanhe nosso roadmap e receba notificações sobre novos lançamentos
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/help">
                  <Button size="lg" variant="outline">
                    Ver Roadmap Completo
                  </Button>
                </Link>
                <Link href={backLink}>
                  <Button size="lg" className={`bg-gradient-to-r ${themeColors.gradient} text-white`}>
                    {backLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ModulePlaceholder;
