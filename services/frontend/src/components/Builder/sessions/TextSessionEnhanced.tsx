// ============================================================================
// Template Builder - Enhanced Text Session
// Comprehensive text presets with categories, effects, and industry-specific options
// ============================================================================

'use client';

import { useState } from 'react';
import {
  Type,
  Heading1,
  Heading2,
  AlignLeft,
  DollarSign,
  AlertCircle,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Award,
  Tag,
  MapPin,
  Home,
  Car,
  Star,
  Clock,
  Users,
  Search,
  X,
} from 'lucide-react';
import { useBuilderStore } from '@/store/builder';

interface TextPreset {
  id: string;
  category: string;
  label: string;
  icon: React.ReactNode;
  tags: string[];
  example: string;
  defaultProps: {
    width: number;
    height: number;
    properties: {
      content: string;
      fontFamily: string;
      fontSize: number;
      fontWeight: string | number;
      fontStyle: 'normal' | 'italic';
      textAlign: 'left' | 'center' | 'right' | 'justify';
      lineHeight: number;
      letterSpacing: number;
      color: string;
      backgroundColor?: string;
      textDecoration?: 'none' | 'underline' | 'line-through';
      shadow?: {
        blur: number;
        color: string;
        offsetX: number;
        offsetY: number;
      };
      glow?: {
        color: string;
        intensity: number;
      };
    };
  };
}

const textPresets: TextPreset[] = [
  // ===== HEADLINES =====
  {
    id: 'hero-title',
    category: 'headlines',
    label: 'Hero Title',
    icon: <Heading1 className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['título', 'hero', 'principal'],
    example: 'Título Principal',
    defaultProps: {
      width: 600,
      height: 80,
      properties: {
        content: 'Seu Título Impactante Aqui',
        fontFamily: 'Inter',
        fontSize: 64,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: -1,
        color: '#1F2937',
      },
    },
  },
  {
    id: 'title',
    category: 'headlines',
    label: 'Título',
    icon: <Heading1 className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['título', 'heading'],
    example: 'Título Principal',
    defaultProps: {
      width: 400,
      height: 60,
      properties: {
        content: 'Título Principal',
        fontFamily: 'Inter',
        fontSize: 48,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 0,
        color: '#1F2937',
      },
    },
  },
  {
    id: 'subtitle',
    category: 'headlines',
    label: 'Subtítulo',
    icon: <Heading2 className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['subtítulo', 'heading'],
    example: 'Subtítulo',
    defaultProps: {
      width: 350,
      height: 40,
      properties: {
        content: 'Subtítulo',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        letterSpacing: 0,
        color: '#374151',
      },
    },
  },
  {
    id: 'section-header',
    category: 'headlines',
    label: 'Cabeçalho de Seção',
    icon: <Type className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['seção', 'header'],
    example: 'Seção',
    defaultProps: {
      width: 300,
      height: 35,
      properties: {
        content: 'CABEÇALHO DE SEÇÃO',
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        lineHeight: 1.2,
        letterSpacing: 2,
        color: '#3B82F6',
      },
    },
  },

  // ===== BODY TEXT =====
  {
    id: 'paragraph',
    category: 'body',
    label: 'Parágrafo',
    icon: <AlignLeft className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['parágrafo', 'texto', 'corpo'],
    example: 'Lorem ipsum dolor sit amet...',
    defaultProps: {
      width: 400,
      height: 120,
      properties: {
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'justify',
        lineHeight: 1.6,
        letterSpacing: 0,
        color: '#4B5563',
      },
    },
  },
  {
    id: 'caption',
    category: 'body',
    label: 'Legenda',
    icon: <AlignLeft className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['legenda', 'caption', 'pequeno'],
    example: 'Legenda pequena',
    defaultProps: {
      width: 300,
      height: 30,
      properties: {
        content: 'Legenda ou texto auxiliar',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 1.4,
        letterSpacing: 0,
        color: '#6B7280',
      },
    },
  },
  {
    id: 'label',
    category: 'body',
    label: 'Rótulo',
    icon: <Tag className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['rótulo', 'label', 'tag'],
    example: 'RÓTULO',
    defaultProps: {
      width: 150,
      height: 25,
      properties: {
        content: 'RÓTULO',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 1.5,
        color: '#6B7280',
      },
    },
  },

  // ===== PRICING =====
  {
    id: 'price-large',
    category: 'pricing',
    label: 'Preço Grande',
    icon: <DollarSign className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['preço', 'valor', 'dinheiro'],
    example: 'R$ 999.999',
    defaultProps: {
      width: 250,
      height: 70,
      properties: {
        content: 'R$ 999.999',
        fontFamily: 'Inter',
        fontSize: 56,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: -1,
        color: '#059669',
      },
    },
  },
  {
    id: 'price-medium',
    category: 'pricing',
    label: 'Preço Médio',
    icon: <DollarSign className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['preço', 'valor'],
    example: 'R$ 99.990',
    defaultProps: {
      width: 200,
      height: 50,
      properties: {
        content: 'R$ 99.990',
        fontFamily: 'Inter',
        fontSize: 36,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 0,
        color: '#059669',
      },
    },
  },
  {
    id: 'price-from',
    category: 'pricing',
    label: 'A Partir De',
    icon: <DollarSign className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['preço', 'a partir de'],
    example: 'A partir de R$ 450K',
    defaultProps: {
      width: 250,
      height: 45,
      properties: {
        content: 'A partir de R$ 450.000',
        fontFamily: 'Inter',
        fontSize: 28,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 0,
        color: '#059669',
      },
    },
  },
  {
    id: 'price-discount',
    category: 'pricing',
    label: 'Preço com Desconto',
    icon: <TrendingUp className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['desconto', 'oferta', 'promoção'],
    example: 'DE R$ 150K POR R$ 120K',
    defaultProps: {
      width: 300,
      height: 60,
      properties: {
        content: 'De R$ 150.000\nPOR R$ 120.000',
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        letterSpacing: 0,
        color: '#DC2626',
      },
    },
  },

  // ===== CALL TO ACTIONS =====
  {
    id: 'cta-primary',
    category: 'cta',
    label: 'CTA Principal',
    icon: <Sparkles className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['botão', 'ação', 'cta'],
    example: 'CLIQUE AQUI',
    defaultProps: {
      width: 250,
      height: 60,
      properties: {
        content: 'CLIQUE AQUI',
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 1,
        color: '#FFFFFF',
        backgroundColor: '#3B82F6',
      },
    },
  },
  {
    id: 'cta-contact',
    category: 'cta',
    label: 'Entre em Contato',
    icon: <Users className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['contato', 'fale conosco'],
    example: 'ENTRE EM CONTATO',
    defaultProps: {
      width: 280,
      height: 60,
      properties: {
        content: 'ENTRE EM CONTATO',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 1.5,
        color: '#FFFFFF',
        backgroundColor: '#059669',
      },
    },
  },
  {
    id: 'cta-learn-more',
    category: 'cta',
    label: 'Saiba Mais',
    icon: <TrendingUp className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['saiba mais', 'informação'],
    example: 'SAIBA MAIS',
    defaultProps: {
      width: 200,
      height: 50,
      properties: {
        content: 'SAIBA MAIS',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 1,
        color: '#FFFFFF',
        backgroundColor: '#6B7280',
      },
    },
  },

  // ===== ALERTS & BADGES =====
  {
    id: 'alert-warning',
    category: 'alerts',
    label: 'Alerta',
    icon: <AlertCircle className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['alerta', 'atenção', 'aviso'],
    example: 'Atenção!',
    defaultProps: {
      width: 300,
      height: 50,
      properties: {
        content: 'ATENÇÃO: Informação Importante',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        letterSpacing: 0.5,
        color: '#FFFFFF',
        backgroundColor: '#DC2626',
      },
    },
  },
  {
    id: 'badge-success',
    category: 'alerts',
    label: 'Sucesso',
    icon: <Award className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['sucesso', 'confirmação'],
    example: '✓ Sucesso',
    defaultProps: {
      width: 200,
      height: 45,
      properties: {
        content: '✓ CONFIRMADO',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 1,
        color: '#FFFFFF',
        backgroundColor: '#059669',
      },
    },
  },
  {
    id: 'badge-new',
    category: 'alerts',
    label: 'Novo',
    icon: <Sparkles className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['novo', 'novidade'],
    example: 'NOVO',
    defaultProps: {
      width: 120,
      height: 40,
      properties: {
        content: 'NOVO',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 2,
        color: '#FFFFFF',
        backgroundColor: '#F59E0B',
      },
    },
  },
  {
    id: 'badge-sale',
    category: 'alerts',
    label: 'Promoção',
    icon: <Tag className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['promoção', 'oferta', 'desconto'],
    example: 'OFERTA',
    defaultProps: {
      width: 150,
      height: 45,
      properties: {
        content: '🔥 OFERTA',
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 1.5,
        color: '#FFFFFF',
        backgroundColor: '#DC2626',
      },
    },
  },

  // ===== DECORATIVE =====
  {
    id: 'quote',
    category: 'decorative',
    label: 'Citação',
    icon: <MessageSquare className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['citação', 'quote', 'aspas'],
    example: '"Citação..."',
    defaultProps: {
      width: 400,
      height: 80,
      properties: {
        content: '"Esta é uma citação importante que destaca algo especial."',
        fontFamily: 'Georgia',
        fontSize: 20,
        fontWeight: 'normal',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 1.5,
        letterSpacing: 0,
        color: '#6B7280',
      },
    },
  },
  {
    id: 'testimonial',
    category: 'decorative',
    label: 'Depoimento',
    icon: <Users className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['depoimento', 'testemunho', 'cliente'],
    example: '"Excelente serviço!"',
    defaultProps: {
      width: 350,
      height: 90,
      properties: {
        content: '"Excelente serviço! Recomendo a todos que buscam qualidade."',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 1.6,
        letterSpacing: 0,
        color: '#374151',
      },
    },
  },
  {
    id: 'number-stat',
    category: 'decorative',
    label: 'Número/Estatística',
    icon: <TrendingUp className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['número', 'estatística', 'dado'],
    example: '1.250+',
    defaultProps: {
      width: 180,
      height: 70,
      properties: {
        content: '1.250+',
        fontFamily: 'Inter',
        fontSize: 48,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: -1,
        color: '#3B82F6',
      },
    },
  },

  // ===== REAL ESTATE SPECIFIC =====
  {
    id: 're-price',
    category: 'real-estate',
    label: 'Preço Imóvel',
    icon: <Home className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['imóvel', 'casa', 'apartamento', 'preço'],
    example: 'R$ 1.250.000',
    defaultProps: {
      width: 280,
      height: 70,
      properties: {
        content: 'R$ 1.250.000',
        fontFamily: 'Inter',
        fontSize: 52,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: -1,
        color: '#059669',
      },
    },
  },
  {
    id: 're-sqft',
    category: 'real-estate',
    label: 'Metragem',
    icon: <Home className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['metragem', 'm²', 'área'],
    example: '250 m²',
    defaultProps: {
      width: 180,
      height: 50,
      properties: {
        content: '250 m²',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 0,
        color: '#1F2937',
      },
    },
  },
  {
    id: 're-bedrooms',
    category: 'real-estate',
    label: 'Quartos/Banheiros',
    icon: <Home className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['quartos', 'banheiros', 'suítes'],
    example: '3 quartos • 2 banheiros',
    defaultProps: {
      width: 300,
      height: 40,
      properties: {
        content: '3 quartos • 2 banheiros • 2 vagas',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: '500',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        letterSpacing: 0,
        color: '#4B5563',
      },
    },
  },
  {
    id: 're-location',
    category: 'real-estate',
    label: 'Localização',
    icon: <MapPin className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['localização', 'endereço', 'bairro'],
    example: 'Centro • Florianópolis',
    defaultProps: {
      width: 280,
      height: 40,
      properties: {
        content: '📍 Centro • Florianópolis/SC',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        letterSpacing: 0.5,
        color: '#3B82F6',
      },
    },
  },
  {
    id: 're-status-sold',
    category: 'real-estate',
    label: 'Status: Vendido',
    icon: <Award className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['vendido', 'status'],
    example: 'VENDIDO',
    defaultProps: {
      width: 180,
      height: 50,
      properties: {
        content: 'VENDIDO',
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 2,
        color: '#FFFFFF',
        backgroundColor: '#DC2626',
      },
    },
  },
  {
    id: 're-status-new',
    category: 'real-estate',
    label: 'Status: Novo',
    icon: <Sparkles className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['novo', 'lançamento'],
    example: 'NOVO NO MERCADO',
    defaultProps: {
      width: 250,
      height: 50,
      properties: {
        content: '✨ NOVO NO MERCADO',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 1,
        color: '#FFFFFF',
        backgroundColor: '#059669',
      },
    },
  },

  // ===== AUTOMOTIVE SPECIFIC =====
  {
    id: 'auto-title',
    category: 'automotive',
    label: 'Ano/Modelo/Marca',
    icon: <Car className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['carro', 'veículo', 'modelo'],
    example: '2024 Tesla Model S',
    defaultProps: {
      width: 350,
      height: 50,
      properties: {
        content: '2024 Tesla Model S',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 0,
        color: '#1F2937',
      },
    },
  },
  {
    id: 'auto-price',
    category: 'automotive',
    label: 'Preço Veículo',
    icon: <Car className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['preço', 'valor', 'carro'],
    example: 'R$ 89.990',
    defaultProps: {
      width: 250,
      height: 70,
      properties: {
        content: 'R$ 89.990',
        fontFamily: 'Inter',
        fontSize: 48,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: -1,
        color: '#059669',
      },
    },
  },
  {
    id: 'auto-mileage',
    category: 'automotive',
    label: 'Quilometragem',
    icon: <Clock className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['km', 'quilometragem', 'rodagem'],
    example: '12.000 km',
    defaultProps: {
      width: 180,
      height: 45,
      properties: {
        content: '12.000 km',
        fontFamily: 'Inter',
        fontSize: 28,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 0,
        color: '#1F2937',
      },
    },
  },
  {
    id: 'auto-features',
    category: 'automotive',
    label: 'Características',
    icon: <Star className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['características', 'features'],
    example: 'Automático • Flex',
    defaultProps: {
      width: 320,
      height: 40,
      properties: {
        content: 'Automático • Flex • 4 portas • Couro',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        letterSpacing: 0,
        color: '#4B5563',
      },
    },
  },
  {
    id: 'auto-zero-km',
    category: 'automotive',
    label: '0 KM',
    icon: <Sparkles className="w-4 h-4" strokeWidth={2.5} />,
    tags: ['0km', 'novo', 'zero'],
    example: '0 KM',
    defaultProps: {
      width: 150,
      height: 50,
      properties: {
        content: '0 KM',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        lineHeight: 1.2,
        letterSpacing: 2,
        color: '#FFFFFF',
        backgroundColor: '#059669',
      },
    },
  },
];

const categories = [
  { id: 'all', label: 'Todos', icon: <Type className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 'headlines', label: 'Títulos', icon: <Heading1 className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 'body', label: 'Corpo', icon: <AlignLeft className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 'pricing', label: 'Preços', icon: <DollarSign className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 'cta', label: 'CTAs', icon: <Sparkles className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 'alerts', label: 'Alertas', icon: <AlertCircle className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 'decorative', label: 'Decorativo', icon: <MessageSquare className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 'real-estate', label: 'Imóveis', icon: <Home className="w-4 h-4" strokeWidth={2.5} /> },
  { id: 'automotive', label: 'Veículos', icon: <Car className="w-4 h-4" strokeWidth={2.5} /> },
];

export function TextSessionEnhanced() {
  const { addElement, currentPage } = useBuilderStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleInsertText = (preset: TextPreset) => {
    const page = currentPage();
    if (!page) return;

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    addElement({
      id: `text-${Date.now()}`,
      type: 'text',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: preset.defaultProps.width,
      height: preset.defaultProps.height,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: preset.defaultProps.properties,
    });
  };

  // Filter presets
  const filteredPresets = textPresets.filter((preset) => {
    // Category filter
    if (selectedCategory !== 'all' && preset.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        preset.label.toLowerCase().includes(query) ||
        preset.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        preset.example.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
          Texto
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {filteredPresets.length} preset{filteredPresets.length !== 1 ? 's' : ''} disponíveis
        </p>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar presets..."
            className="w-full pl-8 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="p-2 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap
                transition-all duration-150
                ${selectedCategory === category.id
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                }
              `}
            >
              <div className={selectedCategory === category.id ? 'text-indigo-600' : 'text-gray-500'}>
                {category.icon}
              </div>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredPresets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <Search className="w-12 h-12 text-gray-300 mb-2" strokeWidth={2} />
            <p className="text-sm font-medium text-gray-600">Nenhum preset encontrado</p>
            <p className="text-xs text-gray-500 mt-1">Tente outro termo de busca</p>
          </div>
        ) : (
          filteredPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleInsertText(preset)}
              className="
                w-full p-3 rounded-lg border border-gray-200 bg-white
                hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm
                transition-all duration-150 text-left
                group
              "
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="text-indigo-600">{preset.icon}</div>
                <span className="text-xs font-semibold text-gray-700">{preset.label}</span>
              </div>
              <div
                className="text-xs truncate px-2 py-1 rounded"
                style={{
                  fontFamily: preset.defaultProps.properties.fontFamily,
                  fontSize: '11px',
                  fontWeight: preset.defaultProps.properties.fontWeight,
                  fontStyle: preset.defaultProps.properties.fontStyle,
                  color: preset.defaultProps.properties.color,
                  backgroundColor: preset.defaultProps.properties.backgroundColor || 'transparent',
                  textAlign: preset.defaultProps.properties.textAlign,
                }}
              >
                {preset.example}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
