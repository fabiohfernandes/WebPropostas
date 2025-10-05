// ============================================================================
// Template Creation Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/UI';
import { FeatureInDevelopment } from '@/components/Development';
import {
  DocumentTextIcon,
  PhotoIcon,
  PaintBrushIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function TemplateCreatePage() {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: 'Informações Básicas', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { id: 2, name: 'Design & Estrutura', icon: <PaintBrushIcon className="w-5 h-5" /> },
    { id: 3, name: 'Conteúdo Padrão', icon: <PhotoIcon className="w-5 h-5" /> },
    { id: 4, name: 'Revisão & Publicar', icon: <CheckCircleIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Criar Novo Template</h1>
        <p className="text-gray-600 mt-1">Configure seu template personalizado</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    step >= s.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s.icon}
                </div>
                <p className="text-sm font-medium text-gray-700 mt-2">{s.name}</p>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 transition-colors ${
                    step > s.id ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <Card variant="glass">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informações do Template</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Template
              </label>
              <input
                type="text"
                placeholder="Ex: Proposta de Desenvolvimento Web"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                rows={3}
                placeholder="Descreva quando usar este template..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
                  <option>Serviços</option>
                  <option>Produtos</option>
                  <option>Consultoria</option>
                  <option>Projetos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Setor
                </label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
                  <option>Tecnologia</option>
                  <option>Marketing</option>
                  <option>Construção</option>
                  <option>Design</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="public" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="public" className="text-sm text-gray-700">
                Tornar este template público (outros usuários poderão usar)
              </label>
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <FeatureInDevelopment
          title="Editor de Design & Estrutura"
          description="Defina seções, cores, fontes e layout do template"
          size="lg"
          eta="Fase 33-35"
        />
      )}

      {step === 3 && (
        <FeatureInDevelopment
          title="Conteúdo Padrão com IA"
          description="Use IA para gerar conteúdo de exemplo para cada seção"
          size="lg"
          eta="Fase 36-37"
          icon="sparkles"
        />
      )}

      {step === 4 && (
        <Card variant="glass">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revisão Final</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Informações completas</p>
                <p className="text-sm text-gray-600">Nome, descrição e categoria definidos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Design configurado</p>
                <p className="text-sm text-gray-600">Layout e estilo personalizados</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Conteúdo padrão adicionado</p>
                <p className="text-sm text-gray-600">Seções com texto de exemplo</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
        >
          Voltar
        </Button>
        <div className="flex items-center gap-3">
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)}>
              Próximo
            </Button>
          ) : (
            <>
              <Button variant="outline">Salvar como Rascunho</Button>
              <Button leftIcon={<SparklesIcon className="w-5 h-5" />}>
                Publicar Template
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
