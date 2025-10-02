'use client';

/**
 * Proposal Wizard Component
 *
 * 4-step wizard for collecting proposal information:
 * 1. Client Information
 * 2. Proposal Type
 * 3. Project Context (interactive chat)
 * 4. Settings & Preferences
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WizardData {
  clientInfo: {
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    sector: string;
  };
  proposalType: string;
  projectContext: string;
  settings: {
    tone: string;
    detail: string;
    includeMarketResearch: boolean;
    aiModel: string;
  };
}

interface Props {
  onComplete: (data: WizardData) => void;
  initialData?: WizardData | null;
}

const SECTORS = [
  'Imobiliário - Venda de Imóveis',
  'Imobiliário - Locação',
  'Imobiliário - Administração de Condomínios',
  'Tecnologia - Software/SaaS',
  'Tecnologia - Hardware',
  'Consultoria - Gestão Empresarial',
  'Consultoria - Marketing Digital',
  'Consultoria - Financeira',
  'Serviços - Arquitetura',
  'Serviços - Design',
  'Serviços - Advocacia',
  'Outro (especificar)',
];

const PROPOSAL_TYPES = [
  {
    value: 'venda-imovel',
    icon: '🏠',
    title: 'Venda de Imóvel',
    description: 'Proposta para vender casa, apartamento, terreno, etc.',
  },
  {
    value: 'servico',
    icon: '💼',
    title: 'Prestação de Serviço',
    description: 'Consultoria, desenvolvimento, manutenção, etc.',
  },
  {
    value: 'parceria',
    icon: '🤝',
    title: 'Proposta de Parceria',
    description: 'Joint venture, co-marketing, distribuição, etc.',
  },
  {
    value: 'investimento',
    icon: '💰',
    title: 'Captação de Investimento',
    description: 'Pitch deck, business plan, roadshow, etc.',
  },
];

export function ProposalWizard({ onComplete, initialData }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<WizardData>>(
    initialData || {
      clientInfo: {
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        sector: '',
      },
      proposalType: '',
      projectContext: '',
      settings: {
        tone: 'profissional',
        detail: 'completo',
        includeMarketResearch: true,
        aiModel: 'gpt-4o',
      },
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Validate current step
   */
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.clientInfo?.companyName?.trim()) {
        newErrors.companyName = 'Nome da empresa é obrigatório';
      }
      if (!formData.clientInfo?.email?.trim()) {
        newErrors.email = 'Email é obrigatório';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientInfo.email)) {
        newErrors.email = 'Email inválido';
      }
      if (!formData.clientInfo?.sector) {
        newErrors.sector = 'Selecione o setor de atuação';
      }
    }

    if (step === 2) {
      if (!formData.proposalType) {
        newErrors.proposalType = 'Selecione o tipo de proposta';
      }
    }

    if (step === 3) {
      if (!formData.projectContext?.trim()) {
        newErrors.projectContext = 'Descreva o contexto do projeto';
      } else if (formData.projectContext.trim().length < 50) {
        newErrors.projectContext = 'Descrição muito curta (mínimo 50 caracteres)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle next step
   */
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // Final step - submit
        onComplete(formData as WizardData);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  /**
   * Handle previous step
   */
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  /**
   * Update form data
   */
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev[keys[0] as keyof typeof prev] as any),
            [keys[1]]: value,
          },
        };
      }
    });

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-2">
          🤖 Assistente de Proposta com IA
        </h1>
        <p className="text-secondary-600">
          Crie propostas profissionais em minutos com ajuda da Inteligência Artificial
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-12">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-full font-semibold
                transition-all duration-300
                ${
                  step === currentStep
                    ? 'bg-primary-600 text-white scale-110 shadow-lg'
                    : step < currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-200 text-secondary-500'
                }
              `}
            >
              {step < currentStep ? '✓' : step}
            </div>
            {step < 4 && (
              <div
                className={`
                  h-1 w-16 mx-2 transition-all duration-300
                  ${step < currentStep ? 'bg-primary-500' : 'bg-secondary-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px]">
        <AnimatePresence mode="wait">
          {/* Step 1: Client Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                1. Informações do Cliente
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    value={formData.clientInfo?.companyName || ''}
                    onChange={(e) => updateFormData('clientInfo.companyName', e.target.value)}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${errors.companyName ? 'border-red-500' : 'border-secondary-300'}
                    `}
                    placeholder="Ex: Imobiliária Silva & Costa"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Nome do Responsável
                  </label>
                  <input
                    type="text"
                    value={formData.clientInfo?.contactName || ''}
                    onChange={(e) => updateFormData('clientInfo.contactName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Ex: João Silva - Diretor Comercial"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.clientInfo?.email || ''}
                      onChange={(e) => updateFormData('clientInfo.email', e.target.value)}
                      className={`
                        w-full px-4 py-3 rounded-lg border-2
                        focus:outline-none focus:ring-2 focus:ring-primary-500
                        ${errors.email ? 'border-red-500' : 'border-secondary-300'}
                      `}
                      placeholder="joao@empresa.com.br"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={formData.clientInfo?.phone || ''}
                      onChange={(e) => updateFormData('clientInfo.phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="(48) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Setor de Atuação *
                  </label>
                  <select
                    value={formData.clientInfo?.sector || ''}
                    onChange={(e) => updateFormData('clientInfo.sector', e.target.value)}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${errors.sector ? 'border-red-500' : 'border-secondary-300'}
                    `}
                  >
                    <option value="">Selecione...</option>
                    {SECTORS.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <p className="text-red-500 text-sm mt-1">{errors.sector}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Proposal Type */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                2. Tipo de Proposta
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {PROPOSAL_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateFormData('proposalType', type.value)}
                    className={`
                      p-6 rounded-xl border-2 text-left transition-all duration-200
                      hover:shadow-lg hover:scale-105
                      ${
                        formData.proposalType === type.value
                          ? 'border-primary-600 bg-primary-50 shadow-md'
                          : 'border-secondary-300 hover:border-primary-300'
                      }
                    `}
                  >
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <h3 className="font-semibold text-lg text-secondary-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-secondary-600">{type.description}</p>
                  </button>
                ))}
              </div>

              {errors.proposalType && (
                <p className="text-red-500 text-sm mt-4 text-center">{errors.proposalType}</p>
              )}
            </motion.div>
          )}

          {/* Step 3: Project Context */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                3. Contexto do Projeto
              </h2>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6">
                <p className="text-sm text-primary-900">
                  <strong>🤖 Dica da IA:</strong> Quanto mais detalhes você fornecer, melhor será a proposta gerada!
                  Inclua: o que está oferecendo, benefícios principais, prazo e valor estimado (se souber).
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Descreva o projeto que você está propondo *
                </label>
                <textarea
                  value={formData.projectContext || ''}
                  onChange={(e) => updateFormData('projectContext', e.target.value)}
                  rows={10}
                  className={`
                    w-full px-4 py-3 rounded-lg border-2
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${errors.projectContext ? 'border-red-500' : 'border-secondary-300'}
                  `}
                  placeholder="Ex: Estou propondo a venda de um apartamento de 3 quartos no Centro de Florianópolis, com 120m², 2 vagas de garagem, frente mar. O cliente é investidor e quer alugar. Imóvel reformado em 2024, condomínio com piscina e academia. Preço: R$ 850.000."
                />
                {errors.projectContext && (
                  <p className="text-red-500 text-sm mt-1">{errors.projectContext}</p>
                )}
                <p className="text-xs text-secondary-500 mt-2">
                  {formData.projectContext?.length || 0} caracteres (mínimo 50)
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Settings */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                4. Configurações Finais
              </h2>

              <div className="space-y-6">
                {/* Tone */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-3">
                    Tom da Proposta
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['formal', 'profissional', 'amigavel'].map((tone) => (
                      <button
                        key={tone}
                        onClick={() => updateFormData('settings.tone', tone)}
                        className={`
                          px-4 py-3 rounded-lg border-2 transition-all
                          ${
                            formData.settings?.tone === tone
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-secondary-300 hover:border-primary-300'
                          }
                        `}
                      >
                        {tone === 'formal' && 'Formal'}
                        {tone === 'profissional' && 'Profissional'}
                        {tone === 'amigavel' && 'Amigável'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail Level */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-3">
                    Nível de Detalhamento
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateFormData('settings.detail', 'executivo')}
                      className={`
                        px-4 py-3 rounded-lg border-2 transition-all text-left
                        ${
                          formData.settings?.detail === 'executivo'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-secondary-300 hover:border-primary-300'
                        }
                      `}
                    >
                      <div className="font-semibold">Executivo</div>
                      <div className="text-xs text-secondary-600">2-4 páginas</div>
                    </button>
                    <button
                      onClick={() => updateFormData('settings.detail', 'completo')}
                      className={`
                        px-4 py-3 rounded-lg border-2 transition-all text-left
                        ${
                          formData.settings?.detail === 'completo'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-secondary-300 hover:border-primary-300'
                        }
                      `}
                    >
                      <div className="font-semibold">Completo</div>
                      <div className="text-xs text-secondary-600">8-12 páginas</div>
                    </button>
                  </div>
                </div>

                {/* Market Research */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.settings?.includeMarketResearch ?? true}
                      onChange={(e) =>
                        updateFormData('settings.includeMarketResearch', e.target.checked)
                      }
                      className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    <div>
                      <div className="font-medium text-secondary-900">
                        Incluir Pesquisa de Mercado
                      </div>
                      <div className="text-sm text-secondary-600">
                        A IA buscará dados e estatísticas do setor para fundamentar a proposta
                      </div>
                    </div>
                  </label>
                </div>

                {/* AI Model */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-3">
                    Modelo de IA
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateFormData('settings.aiModel', 'gpt-4o')}
                      className={`
                        px-4 py-3 rounded-lg border-2 transition-all text-left
                        ${
                          formData.settings?.aiModel === 'gpt-4o'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-secondary-300 hover:border-primary-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold">GPT-4o</div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Recomendado
                        </span>
                      </div>
                      <div className="text-xs text-secondary-600">Rápido (45-60s)</div>
                    </button>
                    <button
                      onClick={() => updateFormData('settings.aiModel', 'gpt-o1')}
                      className={`
                        px-4 py-3 rounded-lg border-2 transition-all text-left
                        ${
                          formData.settings?.aiModel === 'gpt-o1'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-secondary-300 hover:border-primary-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold">GPT-o1</div>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          Premium
                        </span>
                      </div>
                      <div className="text-xs text-secondary-600">
                        Raciocínio Profundo (75-90s)
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-secondary-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all
              ${
                currentStep === 1
                  ? 'text-secondary-400 cursor-not-allowed'
                  : 'text-secondary-700 hover:bg-secondary-100'
              }
            `}
          >
            ← Voltar
          </button>

          <div className="text-sm text-secondary-500">
            Passo {currentStep} de 4
          </div>

          <button
            onClick={handleNext}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all hover:shadow-lg"
          >
            {currentStep === 4 ? '🤖 Gerar Proposta com IA' : 'Próximo →'}
          </button>
        </div>
      </div>
    </div>
  );
}
