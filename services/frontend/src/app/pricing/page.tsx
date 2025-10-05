// ============================================================================
// Pricing Page - Complete Plans Comparison
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import { Button, Card, Badge } from '@/components/UI';

export default function PricingPage() {
  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Perfeito para começar',
      cta: 'Começar Grátis',
      variant: 'outline' as const,
      features: {
        proposals: '3 propostas/mês',
        clients: '1 cliente (nome apenas)',
        templates: '3 templates pré-prontos',
        ai: false,
        hosting: 'Download PDF apenas (10/mês)',
        analytics: false,
        images: false,
        videos: false,
        charts: false,
        support: 'Email',
        customBranding: false,
        teamMembers: false,
      },
    },
    {
      name: 'Padrão',
      price: 'R$ 97',
      period: '/mês',
      description: 'Para pequenas empresas',
      popular: true,
      cta: 'Teste Grátis 14 Dias',
      variant: 'primary' as const,
      features: {
        proposals: '100 propostas/mês',
        clients: '10 clientes (nome + contato)',
        templates: '10 templates + criar (sem salvar)',
        ai: 'Com limite de tokens',
        hosting: 'Hospedagem WebPropostas',
        analytics: 'Analytics básico',
        images: true,
        videos: false,
        charts: false,
        support: 'Email + Chat',
        customBranding: false,
        teamMembers: false,
      },
    },
    {
      name: 'Profissional',
      price: 'R$ 247',
      period: '/mês',
      description: 'Para empresas em crescimento',
      cta: 'Falar com Vendas',
      variant: 'secondary' as const,
      features: {
        proposals: 'Ilimitadas',
        clients: 'Ilimitados (nome + contato + logo)',
        templates: 'Ilimitados + salvar/carregar',
        ai: 'IA ilimitada com contador de tokens',
        hosting: 'Hospedagem personalizada',
        analytics: 'Analytics avançado',
        images: true,
        videos: true,
        charts: true,
        support: 'Prioritário + Telefone',
        customBranding: true,
        teamMembers: 'Membros ilimitados',
      },
    },
  ];

  const comparisonFeatures = [
    { category: 'Propostas', key: 'proposals' },
    { category: 'Clientes', key: 'clients' },
    { category: 'Templates', key: 'templates' },
    { category: 'Edição com IA', key: 'ai' },
    { category: 'Hospedagem', key: 'hosting' },
    { category: 'Analytics', key: 'analytics' },
    { category: 'Imagens', key: 'images' },
    { category: 'Vídeos', key: 'videos' },
    { category: 'Gráficos', key: 'charts' },
    { category: 'Suporte', key: 'support' },
    { category: 'Marca Personalizada', key: 'customBranding' },
    { category: 'Membros da Equipe', key: 'teamMembers' },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planos que Crescem com Seu Negócio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Comece grátis e faça upgrade quando precisar. Sem surpresas.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 shadow-lg">
            <button className="px-6 py-2 rounded-full bg-primary-600 text-white font-medium">
              Mensal
            </button>
            <button className="px-6 py-2 rounded-full text-gray-600 font-medium hover:text-gray-900">
              Anual
              <Badge variant="success" size="sm" className="ml-2">
                -20%
              </Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <Card
                key={index}
                variant={plan.popular ? 'elevated' : 'glass'}
                className={plan.popular ? 'ring-2 ring-primary-500 relative scale-105' : ''}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" size="md">
                      ⭐ Mais Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <Link href="/auth/register">
                  <Button variant={plan.variant} fullWidth size="lg">
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Comparação Completa de Recursos
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Recurso
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.name} className="text-center py-4 px-6">
                        <div className="font-semibold text-gray-900">{plan.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {feature.category}
                      </td>
                      {plans.map((plan) => {
                        const value = plan.features[feature.key as keyof typeof plan.features];
                        return (
                          <td key={plan.name} className="py-4 px-6 text-center">
                            {typeof value === 'boolean' ? (
                              value ? (
                                <CheckCircleIcon className="w-6 h-6 text-green-600 mx-auto" />
                              ) : (
                                <XCircleIcon className="w-6 h-6 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-700">{value}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Posso mudar de plano a qualquer momento?',
                a: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente.',
              },
              {
                q: 'O que acontece se eu exceder o limite do meu plano?',
                a: 'Notificaremos você quando estiver próximo do limite. Você pode fazer upgrade ou aguardar o próximo ciclo de renovação.',
              },
              {
                q: 'Vocês oferecem desconto para pagamento anual?',
                a: 'Sim! Ao optar pelo pagamento anual, você recebe 20% de desconto no valor total.',
              },
              {
                q: 'Posso cancelar minha assinatura?',
                a: 'Sim, você pode cancelar a qualquer momento. Seu acesso continua até o final do período pago.',
              },
            ].map((faq, idx) => (
              <Card key={idx} variant="glass">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Fale com nosso time de vendas para encontrar o melhor plano para você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg">Começar Teste Grátis</Button>
            </Link>
            <Button size="lg" variant="outline">
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
