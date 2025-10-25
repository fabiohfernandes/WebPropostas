'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  StarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CheckBadgeIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import {
  Button,
  Card,
  Badge,
  Avatar,
  Tabs,
  TabPanel,
  Progress,
  Skeleton,
  Input,
  Textarea,
  Modal
} from '@/components/UI';

// Types
interface ProviderProfile {
  id: string;
  name: string;
  company: string;
  logo?: string;
  cover?: string;
  tagline: string;
  description: string;
  category: string;
  subcategory: string;
  location: {
    city: string;
    state: string;
    address: string;
  };
  rating: number;
  reviewCount: number;
  projectCount: number;
  responseTime: string;
  memberSince: string;
  verified: boolean;
  featured: boolean;
  tags: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  stats: {
    onTimeDelivery: number;
    budgetAccuracy: number;
    communication: number;
    quality: number;
  };
}

interface Review {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
}

interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  completedDate: string;
}

// Mock data
const mockProvider: ProviderProfile = {
  id: '1',
  name: 'João Silva',
  company: 'Silva Construções',
  tagline: 'Especialistas em construção residencial e comercial',
  description: 'Com mais de 15 anos de experiência no mercado, a Silva Construções se destaca pela qualidade, pontualidade e excelência em todos os projetos. Nossa equipe altamente qualificada está pronta para transformar seus sonhos em realidade.',
  category: 'Construção',
  subcategory: 'Construção Civil',
  location: {
    city: 'São Paulo',
    state: 'SP',
    address: 'Av. Paulista, 1000 - Bela Vista'
  },
  rating: 4.8,
  reviewCount: 42,
  projectCount: 87,
  responseTime: '2 horas',
  memberSince: '2018-03-15',
  verified: true,
  featured: true,
  tags: ['Residencial', 'Comercial', 'Reforma', 'Obra Nova'],
  contact: {
    phone: '(11) 98765-4321',
    email: 'contato@silvaconstrucoes.com.br',
    website: 'www.silvaconstrucoes.com.br'
  },
  stats: {
    onTimeDelivery: 95,
    budgetAccuracy: 92,
    communication: 98,
    quality: 96
  }
};

const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'Maria Oliveira',
    rating: 5,
    date: '2024-01-15',
    projectTitle: 'Construção de Casa 200m²',
    comment: 'Excelente trabalho! Muito profissional e pontual. Recomendo!'
  },
  {
    id: '2',
    clientName: 'Carlos Santos',
    rating: 4,
    date: '2024-01-10',
    projectTitle: 'Reforma Comercial',
    comment: 'Ótimo serviço, entregue dentro do prazo e orçamento.'
  }
];

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<ProviderProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProvider(mockProvider);
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton variant="rectangular" width="100%" height={400} />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton variant="rectangular" width="100%" height={600} />
            </div>
            <div>
              <Skeleton variant="rectangular" width="100%" height={400} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50 flex items-center justify-center">
        <Card variant="glass-client" theme="client">
          <div className="text-center py-12 px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profissional não encontrado</h2>
            <Button variant="primary" theme="client" onClick={() => router.push('/marketplace')}>
              Voltar ao Marketplace
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
      {/* Cover Section */}
      <div className="glass-card-client border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" theme="client" onClick={() => router.push('/marketplace')}>
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Voltar
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar and Basic Info */}
            <div className="flex gap-6 items-start">
              <Avatar
                src={provider.logo}
                fallback={provider.name.charAt(0)}
                size="2xl"
                theme="client"
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                  {provider.verified && (
                    <CheckBadgeIcon className="h-7 w-7 text-client-600" title="Verificado" />
                  )}
                </div>
                <p className="text-xl text-gray-700 mb-2">{provider.company}</p>
                <p className="text-gray-600 mb-4">{provider.tagline}</p>

                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex items-center gap-1">
                    <StarIconSolid className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{provider.rating}</span>
                    <span className="text-gray-600">({provider.reviewCount} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPinIcon className="h-5 w-5" />
                    <span>{provider.location.city}, {provider.location.state}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <BuildingOfficeIcon className="h-5 w-5" />
                    <span>{provider.projectCount} projetos</span>
                  </div>
                </div>

                {provider.featured && (
                  <div className="mt-4">
                    <Badge variant="success">Profissional em Destaque</Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 ml-auto">
              <Button
                variant="ghost"
                theme="client"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <HeartIconSolid className="h-5 w-5 text-client-600" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" theme="client">
                <ShareIcon className="h-5 w-5" />
              </Button>
              <Button variant="primary" theme="client" size="lg" onClick={() => setShowContactModal(true)}>
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card variant="glass-client" theme="client">
              <Tabs
                tabs={[
                  { id: 'overview', label: 'Visão Geral' },
                  { id: 'reviews', label: 'Avaliações', badge: provider.reviewCount },
                  { id: 'portfolio', label: 'Portfólio' },
                  { id: 'about', label: 'Sobre' }
                ]}
                variant="underline"
                theme="client"
                defaultTab="overview"
                onChange={setActiveTab}
              />

              <div className="mt-6">
                <TabPanel tabId="overview" activeTab={activeTab}>
                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Sobre o Profissional</h3>
                    <p className="text-gray-700 leading-relaxed">{provider.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas de Desempenho</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700">Entrega no Prazo</span>
                          <span className="font-semibold text-gray-900">{provider.stats.onTimeDelivery}%</span>
                        </div>
                        <Progress value={provider.stats.onTimeDelivery} variant="client" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700">Precisão de Orçamento</span>
                          <span className="font-semibold text-gray-900">{provider.stats.budgetAccuracy}%</span>
                        </div>
                        <Progress value={provider.stats.budgetAccuracy} variant="client" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700">Comunicação</span>
                          <span className="font-semibold text-gray-900">{provider.stats.communication}%</span>
                        </div>
                        <Progress value={provider.stats.communication} variant="client" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700">Qualidade</span>
                          <span className="font-semibold text-gray-900">{provider.stats.quality}%</span>
                        </div>
                        <Progress value={provider.stats.quality} variant="client" />
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel tabId="reviews" activeTab={activeTab}>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} variant="default" padding="md">
                        <div className="flex items-start gap-4">
                          <Avatar
                            fallback={review.clientName.charAt(0)}
                            size="lg"
                            theme="client"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-semibold text-gray-900">{review.clientName}</p>
                                <p className="text-sm text-gray-600">{review.projectTitle}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <StarIconSolid
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('pt-BR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabPanel>

                <TabPanel tabId="portfolio" activeTab={activeTab}>
                  <div className="text-center py-12">
                    <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">Portfólio em breve</p>
                  </div>
                </TabPanel>

                <TabPanel tabId="about" activeTab={activeTab}>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Endereço</h4>
                      <p className="text-gray-700">{provider.location.address}</p>
                      <p className="text-gray-700">{provider.location.city}, {provider.location.state}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Membro desde</h4>
                      <p className="text-gray-700">
                        {new Date(provider.memberSince).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </Card>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card variant="glass-client" theme="client" title="Informações de Contato">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <ClockIcon className="h-5 w-5 text-client-600" />
                  <div>
                    <p className="text-sm text-gray-600">Tempo de Resposta</p>
                    <p className="font-medium">{provider.responseTime}</p>
                  </div>
                </div>

                {provider.contact.phone && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <PhoneIcon className="h-5 w-5 text-client-600" />
                    <div>
                      <p className="text-sm text-gray-600">Telefone</p>
                      <p className="font-medium">{provider.contact.phone}</p>
                    </div>
                  </div>
                )}

                {provider.contact.email && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <EnvelopeIcon className="h-5 w-5 text-client-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium break-all">{provider.contact.email}</p>
                    </div>
                  </div>
                )}

                {provider.contact.website && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <GlobeAltIcon className="h-5 w-5 text-client-600" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a
                        href={`https://${provider.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-client-600 hover:text-client-700"
                      >
                        {provider.contact.website}
                      </a>
                    </div>
                  </div>
                )}

                <Button
                  variant="primary"
                  theme="client"
                  fullWidth
                  size="lg"
                  onClick={() => setShowContactModal(true)}
                >
                  Solicitar Orçamento
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card variant="glass-client" theme="client" title="Estatísticas Rápidas">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Projetos Concluídos</span>
                  <span className="text-2xl font-bold text-client-600">{provider.projectCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Avaliação Média</span>
                  <span className="text-2xl font-bold text-client-600">{provider.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total de Avaliações</span>
                  <span className="text-2xl font-bold text-client-600">{provider.reviewCount}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Solicitar Orçamento"
        size="lg"
      >
        <form className="space-y-4">
          <Input
            label="Seu Nome"
            placeholder="Digite seu nome completo"
            variant="glass-client"
            theme="client"
          />
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            variant="glass-client"
            theme="client"
          />
          <Input
            label="Telefone"
            type="tel"
            placeholder="(11) 98765-4321"
            variant="glass-client"
            theme="client"
          />
          <Textarea
            label="Descreva seu Projeto"
            rows={5}
            placeholder="Conte-nos sobre seu projeto e suas necessidades..."
            variant="glass-client"
            showCount
            maxLength={500}
          />
          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              theme="client"
              fullWidth
              onClick={() => setShowContactModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" theme="client" fullWidth>
              Enviar Solicitação
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
