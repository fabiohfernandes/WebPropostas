// ============================================================================
// Proposal Visual Builder
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { Card, Button } from '@/components/UI';
import { FeatureInDevelopment } from '@/components/Development';
import {
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function ProposalBuilderPage() {
  const elements = [
    { icon: <DocumentTextIcon className="w-5 h-5" />, label: 'Texto' },
    { icon: <PhotoIcon className="w-5 h-5" />, label: 'Imagem' },
    { icon: <VideoCameraIcon className="w-5 h-5" />, label: 'Vídeo', badge: 'Pro' },
    { icon: <ChartBarIcon className="w-5 h-5" />, label: 'Gráfico', badge: 'Pro' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Elements */}
      <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
        <h3 className="font-semibold text-gray-900 mb-4">Elementos</h3>
        <div className="space-y-2">
          {elements.map((element, idx) => (
            <button
              key={idx}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className="text-gray-600">{element.icon}</div>
              <span className="text-sm font-medium text-gray-700">{element.label}</span>
              {element.badge && (
                <span className="ml-auto text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                  {element.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Templates</h4>
          <FeatureInDevelopment
            title="Galeria de Templates"
            description="Arraste templates prontos"
            size="sm"
          />
        </div>

        <div className="mt-6">
          <Button
            leftIcon={<SparklesIcon className="w-5 h-5" />}
            variant="outline"
            size="sm"
            fullWidth
          >
            Assistente IA
          </Button>
        </div>
      </div>

      {/* Center - Canvas */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <FeatureInDevelopment
            title="Editor Visual de Propostas"
            description="Arraste e solte elementos para criar propostas profissionais"
            size="xl"
            eta="Fase 23-25"
          >
            <Card variant="glass" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Título da Proposta</h2>
              <p className="text-gray-600 mb-4">
                Esta é uma prévia de como o editor visual funcionará.
                Você poderá adicionar textos, imagens, vídeos, gráficos e muito mais.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="w-12 h-12 text-gray-400" />
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-12 h-12 text-gray-400" />
                </div>
              </div>
            </Card>
          </FeatureInDevelopment>
        </div>
      </div>

      {/* Right Sidebar - Properties */}
      <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
        <h3 className="font-semibold text-gray-900 mb-4">Propriedades</h3>
        <FeatureInDevelopment
          title="Painel de Propriedades"
          description="Estilo, cores, fontes, espaçamento"
          size="sm"
        />

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Assistente IA</h4>
          <FeatureInDevelopment
            title="Sugestões Inteligentes"
            description="IA analisa e sugere melhorias"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
