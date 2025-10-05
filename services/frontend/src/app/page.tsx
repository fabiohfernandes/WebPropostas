// ============================================================================
// Landing Page - WebPropostas Home
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import Link from 'next/link';
import {
  SparklesIcon,
  ChartBarIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import { Button, Card } from '@/components/UI';
import { InDevelopment, FeatureInDevelopment } from '@/components/Development';

export default function LandingPage() {
  const features = [
    {
      icon: <PaintBrushIcon className="w-6 h-6" />,
      title: 'Editor Visual',
      description: 'Arraste e solte elementos para criar propostas profissionais em minutos',
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'IA Integrada',
      description: 'Conteúdo inteligente gerado automaticamente para acelerar sua criação',
    },
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: 'Analytics Avançado',
      description: 'Acompanhe cada visualização e interação do cliente em tempo real',
    },
  ];

  const templates = [
    { id: 1, name: 'Serviços de TI', category: 'Tecnologia', color: 'from-blue-500 to-cyan-500' },
    { id: 2, name: 'Marketing Digital', category: 'Marketing', color: 'from-purple-500 to-pink-500' },
    { id: 3, name: 'Consultoria', category: 'Negócios', color: 'from-green-500 to-emerald-500' },
    { id: 4, name: 'Design', category: 'Criativo', color: 'from-orange-500 to-red-500' },
    { id: 5, name: 'Desenvolvimento', category: 'Tecnologia', color: 'from-indigo-500 to-blue-500' },
    { id: 6, name: 'Construção', category: 'Engenharia', color: 'from-yellow-500 to-orange-500' },
  ];

  const pricingTiers = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        '3 propostas/mês',
        '1 cliente',
        '3 templates pré-prontos',
        'Download em PDF',
      ],
      cta: 'Começar Grátis',
      variant: 'outline' as const,
    },
    {
      name: 'Padrão',
      price: 'R$ 97',
      period: '/mês',
      description: 'Para pequenas empresas',
      popular: true,
      features: [
        '100 propostas/mês',
        '10 clientes',
        '10 templates + criar',
        'Hospedagem WebPropostas',
        'IA com limite de tokens',
        'Analytics básico',
      ],
      cta: 'Iniciar Teste Grátis',
      variant: 'primary' as const,
    },
    {
      name: 'Profissional',
      price: 'R$ 247',
      period: '/mês',
      description: 'Para empresas em crescimento',
      features: [
        'Propostas ilimitadas',
        'Clientes ilimitados',
        'Templates ilimitados',
        'Hospedagem personalizada',
        'IA ilimitada',
        'Analytics avançado',
        'Vídeos e gráficos',
        'Suporte prioritário',
      ],
      cta: 'Falar com Vendas',
      variant: 'secondary' as const,
    },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'CEO, TechSolutions',
      avatar: 'MS',
      content: 'Reduzimos o tempo de criação de propostas em 70%. Incrível!',
    },
    {
      name: 'João Santos',
      role: 'Diretor Comercial, MarketPro',
      avatar: 'JS',
      content: 'A IA nos ajuda a personalizar cada proposta. Taxa de conversão aumentou 40%.',
    },
    {
      name: 'Ana Costa',
      role: 'Fundadora, DesignStudio',
      avatar: 'AC',
      content: 'Templates lindos e profissionais. Nossos clientes adoram!',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              <span>Agora com IA integrada</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transforme Propostas em{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Contratos
              </span>
              <br />
              com Inteligência Artificial
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Plataforma completa para criar, enviar e gerenciar propostas comerciais.
              Aumente sua taxa de conversão e feche mais negócios.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/auth/register">
                <Button size="lg" leftIcon={<RocketLaunchIcon className="w-5 h-5" />}>
                  Começar Gratuitamente
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                leftIcon={<DocumentTextIcon className="w-5 h-5" />}
              >
                Ver Demonstração
              </Button>
            </div>

            {/* Hero Animation/Preview - Placeholder */}
            <div className="mt-16">
              <FeatureInDevelopment
                title="Demonstração Interativa"
                description="Visualização animada do processo de criação de propostas com IA"
                eta="Próxima atualização"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas para criar propostas profissionais em minutos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="glass"
                hoverable
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Template Gallery Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Templates Profissionais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha entre dezenas de templates prontos ou crie o seu próprio
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group cursor-pointer"
              >
                <div className={`relative aspect-[4/5] rounded-xl bg-gradient-to-br ${template.color} p-1 overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors" />
                  <div className="relative h-full flex flex-col items-center justify-center text-white">
                    <DocumentTextIcon className="w-16 h-16 mb-4 opacity-80" />
                    <h3 className="text-xl font-semibold">{template.name}</h3>
                    <p className="text-sm opacity-80">{template.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/templates">
              <Button
                size="lg"
                variant="outline"
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
              >
                Ver Todos os Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planos que Crescem com Seu Negócio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comece grátis e faça upgrade quando precisar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                variant={tier.popular ? 'elevated' : 'glass'}
                className={tier.popular ? 'ring-2 ring-primary-500 relative' : ''}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.price}
                    </span>
                    <span className="text-gray-600">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={tier.variant} fullWidth>
                  {tier.cta}
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing">
              <Button
                variant="ghost"
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
              >
                Ver Comparação Completa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empresas que Confiam
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veja o que nossos clientes dizem sobre o WebPropostas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="glass">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Company Logos Placeholder */}
          <div className="mt-16">
            <InDevelopment
              title="Logos de Clientes"
              description="Logos de empresas que confiam no WebPropostas"
              size="sm"
              variant="inline"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Transformar Suas Propostas?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Comece gratuitamente hoje. Não precisa cartão de crédito.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                leftIcon={<RocketLaunchIcon className="w-5 h-5" />}
                className="bg-white text-primary-700 hover:bg-gray-100"
              >
                Começar Agora
              </Button>
            </Link>
            <Link href="/help">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
