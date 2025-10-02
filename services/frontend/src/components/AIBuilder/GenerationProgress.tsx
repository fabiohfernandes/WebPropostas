'use client';

/**
 * Generation Progress Component
 *
 * Shows real-time progress of AI proposal generation
 * Polls backend every 2 seconds for status updates
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';

interface WizardData {
  clientInfo: any;
  proposalType: string;
  projectContext: string;
  settings: any;
}

interface Props {
  wizardData: WizardData;
  onComplete: (proposalId: string) => void;
  onBack: () => void;
}

interface ProgressStep {
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  time?: number;
}

export function GenerationProgress({ wizardData, onComplete, onBack }: Props) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProgressStep[]>([
    { name: 'Analisando informações fornecidas', status: 'pending' },
    { name: 'Pesquisando dados de mercado', status: 'pending' },
    { name: 'Estruturando proposta de valor', status: 'pending' },
    { name: 'Detalhando escopo e entregáveis', status: 'pending' },
    { name: 'Calculando modelo de precificação', status: 'pending' },
    { name: 'Revisão final e formatação', status: 'pending' },
  ]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  /**
   * Start generation on mount
   */
  useEffect(() => {
    startGeneration();
  }, []);

  /**
   * Timer for elapsed time
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  /**
   * Start proposal generation
   */
  const startGeneration = async () => {
    try {
      const response = await api.post('/ai/proposals/generate', wizardData);

      setSessionId(response.data.sessionId);

      // Start polling
      pollStatus(response.data.sessionId);
    } catch (err: any) {
      console.error('Error starting generation:', err);
      setError(err.response?.data?.error || 'Falha ao iniciar geração');
    }
  };

  /**
   * Poll generation status
   */
  const pollStatus = async (sid: string) => {
    try {
      const response = await api.get(`/ai/proposals/generate/${sid}/status`);

      const { status, progress, result, error: apiError } = response.data;

      // Update progress
      if (progress) {
        setCurrentStep(progress.currentStep);

        // Update steps array
        setSteps((prevSteps) =>
          prevSteps.map((step, index) => {
            if (index < progress.currentStep - 1) {
              return { ...step, status: 'completed' };
            } else if (index === progress.currentStep - 1) {
              return { ...step, status: 'in-progress', time: progress.elapsedTime };
            } else {
              return { ...step, status: 'pending' };
            }
          })
        );
      }

      // Check status
      if (status === 'completed' && result) {
        // Mark all steps as completed
        setSteps((prevSteps) =>
          prevSteps.map((step) => ({ ...step, status: 'completed' }))
        );

        // Wait 1 second to show completion, then move to editor
        setTimeout(() => {
          onComplete(result.proposalId);
        }, 1000);
      } else if (status === 'failed') {
        setError(apiError || 'Erro desconhecido');
      } else if (status === 'processing') {
        // Continue polling
        setTimeout(() => pollStatus(sid), 2000); // Poll every 2 seconds
      }
    } catch (err: any) {
      console.error('Error polling status:', err);
      setError(err.response?.data?.error || 'Falha ao verificar status');
    }
  };

  /**
   * Format time as MM:SS
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="text-6xl mb-4"
          >
            🤖
          </motion.div>

          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Gerando sua proposta com Inteligência Artificial...
          </h1>

          <p className="text-secondary-600">
            Aguarde enquanto a IA cria uma proposta profissional personalizada
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>

            <button
              onClick={onBack}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              ← Voltar e Tentar Novamente
            </button>
          </div>
        )}

        {/* Progress Steps */}
        {!error && (
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex items-center p-4 rounded-lg border-2 transition-all
                  ${
                    step.status === 'completed'
                      ? 'border-green-500 bg-green-50'
                      : step.status === 'in-progress'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-secondary-200'
                  }
                `}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  {step.status === 'completed' && (
                    <div className="text-2xl">✅</div>
                  )}
                  {step.status === 'in-progress' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="text-2xl"
                    >
                      ⏳
                    </motion.div>
                  )}
                  {step.status === 'pending' && (
                    <div className="text-2xl opacity-30">⏸️</div>
                  )}
                </div>

                {/* Label */}
                <div className="ml-4 flex-1">
                  <div
                    className={`
                    font-medium
                    ${
                      step.status === 'completed'
                        ? 'text-green-900'
                        : step.status === 'in-progress'
                        ? 'text-primary-900'
                        : 'text-secondary-500'
                    }
                  `}
                  >
                    {step.name}
                  </div>

                  {step.status === 'in-progress' && step.time !== undefined && (
                    <div className="text-xs text-primary-600 mt-1">
                      {step.time}s decorridos...
                    </div>
                  )}
                </div>

                {/* Time */}
                {step.status === 'completed' && (
                  <div className="text-sm text-green-600 font-mono">
                    {step.time ? `${step.time}s` : '✓'}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Estimated Time */}
        {!error && (
          <div className="text-center mb-6">
            <div className="text-sm text-secondary-600">
              Tempo decorrido: <span className="font-mono font-semibold">{formatTime(elapsedTime)}</span>
            </div>
            <div className="text-xs text-secondary-500 mt-1">
              Tempo estimado total:{' '}
              {wizardData.settings?.aiModel === 'gpt-o1' ? '75-90 segundos' : '45-60 segundos'}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {!error && (
          <div className="relative w-full h-3 bg-secondary-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-500 to-primary-600"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {/* Fun Tip */}
        {!error && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-900">
              <strong>💡 Você sabia?</strong> Propostas com dados de mercado convertem{' '}
              <strong>40% mais</strong> que propostas genéricas (Fonte: Gartner, 2024)
            </p>
          </div>
        )}

        {/* Cancel Button */}
        {!error && (
          <div className="text-center mt-6">
            <button
              onClick={onBack}
              className="text-secondary-600 hover:text-secondary-900 text-sm underline"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
