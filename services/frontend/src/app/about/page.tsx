// ============================================================================
// About Page
// NOVA Agent - Frontend Development Specialist
// ============================================================================

'use client';

import { UserGroupIcon, RocketLaunchIcon, HeartIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { PublicLayout } from '@/components/Layout/PublicLayout';
import { Card } from '@/components/UI';
import { InDevelopment } from '@/components/Development';

export default function AboutPage() {
  const values = [
    { icon: <RocketLaunchIcon className="w-6 h-6" />, title: 'Inovação', description: 'Sempre buscando novas formas de melhorar' },
    { icon: <HeartIcon className="w-6 h-6" />, title: 'Paixão', description: 'Amamos o que fazemos e isso se reflete no produto' },
    { icon: <UserGroupIcon className="w-6 h-6" />, title: 'Clientes Primeiro', description: 'Seu sucesso é o nosso sucesso' },
    { icon: <GlobeAmericasIcon className="w-6 h-6" />, title: 'Acessibilidade', description: 'Tecnologia para todos, em qualquer lugar' },
  ];

  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre o WebPropostas
          </h1>
          <p className="text-xl text-gray-600">
            Transformando a forma como empresas criam e gerenciam propostas comerciais
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa História</h2>
              <p className="text-gray-600 mb-4">
                O WebPropostas nasceu da frustração de criar propostas comerciais manualmente.
                Sabíamos que havia uma forma melhor, mais rápida e mais inteligente.
              </p>
              <p className="text-gray-600">
                Hoje, ajudamos centenas de empresas a economizar tempo, aumentar conversões
                e fechar mais negócios com propostas profissionais e personalizadas.
              </p>
            </div>
            <div>
              <InDevelopment
                title="Imagem da Equipe"
                description="Foto da equipe WebPropostas"
                size="md"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <Card key={idx} variant="glass" className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
