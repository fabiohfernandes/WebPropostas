// ============================================================================
// Template Builder - Enhanced Icons & Forms Session
// Comprehensive icon library + shapes + form elements
// ============================================================================

'use client';

import { useState } from 'react';
import { ColorDropdown } from '../ColorDropdown';
import {
  // Shapes
  Square,
  Circle,
  Triangle,
  Pentagon,
  Hexagon,
  Star,
  Heart,
  Diamond,

  // Arrows
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  MoveUpRight,
  CornerUpRight,
  TrendingUp,
  TrendingDown,

  // Business
  Briefcase,
  TrendingUp as ChartUp,
  BarChart3,
  PieChart,
  Target,
  Award,
  Users,
  Building2,
  Landmark,

  // Real Estate
  Home,
  Building,
  MapPin,
  Key,
  DoorOpen,
  Bed,
  Bath,
  Car,
  Trees,
  Warehouse,

  // Automotive
  Car as CarIcon,
  Fuel,
  Gauge,
  Settings,
  Wrench,
  Zap,
  Shield,

  // Nature
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Leaf,
  Flower2,

  // UI Elements
  Check,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  Info,
  AlertCircle,
  AlertTriangle,

  // Social & Contact
  Phone,
  Mail,
  MessageCircle,
  Share2,
  Link2,
  MapPin as Location,

  // Decorative
  Sparkles,
  Flame,
  Zap as Lightning,
  Crown,
  Tag,
  Search,
  Star as StarIcon,
} from 'lucide-react';
import { useBuilderStore } from '@/store/builder';
import { COLOR_SCALES, ColorScaleName } from '@/types/bulletSystemV2';

interface IconDefinition {
  id: string;
  category: string;
  label: string;
  icon: React.ComponentType<any>;
  tags: string[];
  defaultColor: string;
}

interface ShapeDefinition {
  id: string;
  label: string;
  icon: React.ReactNode;
  shapeType: 'rectangle' | 'circle';
  defaultColor: string;
}

// Icon Library
const iconLibrary: IconDefinition[] = [
  // ARROWS
  { id: 'arrow-up', category: 'arrows', label: 'Seta Cima', icon: ArrowUp, tags: ['seta', 'cima', 'acima'], defaultColor: '#3B82F6' },
  { id: 'arrow-down', category: 'arrows', label: 'Seta Baixo', icon: ArrowDown, tags: ['seta', 'baixo', 'abaixo'], defaultColor: '#3B82F6' },
  { id: 'arrow-left', category: 'arrows', label: 'Seta Esquerda', icon: ArrowLeft, tags: ['seta', 'esquerda'], defaultColor: '#3B82F6' },
  { id: 'arrow-right', category: 'arrows', label: 'Seta Direita', icon: ArrowRight, tags: ['seta', 'direita'], defaultColor: '#3B82F6' },
  { id: 'arrow-up-right', category: 'arrows', label: 'Diagonal', icon: ArrowUpRight, tags: ['diagonal', 'crescimento'], defaultColor: '#059669' },
  { id: 'arrow-down-left', category: 'arrows', label: 'Diagonal', icon: ArrowDownLeft, tags: ['diagonal', 'queda'], defaultColor: '#DC2626' },
  { id: 'trending-up', category: 'arrows', label: 'Tendência Alta', icon: TrendingUp, tags: ['crescimento', 'alta', 'sucesso'], defaultColor: '#059669' },
  { id: 'trending-down', category: 'arrows', label: 'Tendência Baixa', icon: TrendingDown, tags: ['queda', 'baixa'], defaultColor: '#DC2626' },

  // BUSINESS
  { id: 'briefcase', category: 'business', label: 'Maleta', icon: Briefcase, tags: ['trabalho', 'negócio', 'profissional'], defaultColor: '#1F2937' },
  { id: 'chart-bar', category: 'business', label: 'Gráfico Barras', icon: BarChart3, tags: ['gráfico', 'estatística', 'dados'], defaultColor: '#3B82F6' },
  { id: 'chart-pie', category: 'business', label: 'Gráfico Pizza', icon: PieChart, tags: ['gráfico', 'estatística', 'percentual'], defaultColor: '#8B5CF6' },
  { id: 'target', category: 'business', label: 'Alvo', icon: Target, tags: ['objetivo', 'meta', 'foco'], defaultColor: '#DC2626' },
  { id: 'award', category: 'business', label: 'Prêmio', icon: Award, tags: ['prêmio', 'medalha', 'conquista'], defaultColor: '#F59E0B' },
  { id: 'users', category: 'business', label: 'Pessoas', icon: Users, tags: ['pessoas', 'equipe', 'grupo'], defaultColor: '#6366F1' },
  { id: 'building', category: 'business', label: 'Prédio', icon: Building2, tags: ['empresa', 'escritório', 'corporativo'], defaultColor: '#475569' },

  // REAL ESTATE
  { id: 're-home', category: 'real-estate', label: 'Casa', icon: Home, tags: ['casa', 'residência', 'moradia'], defaultColor: '#059669' },
  { id: 're-building', category: 'real-estate', label: 'Prédio', icon: Building, tags: ['prédio', 'apartamento', 'edifício'], defaultColor: '#3B82F6' },
  { id: 're-location', category: 'real-estate', label: 'Localização', icon: MapPin, tags: ['localização', 'endereço', 'mapa'], defaultColor: '#DC2626' },
  { id: 're-key', category: 'real-estate', label: 'Chave', icon: Key, tags: ['chave', 'acesso', 'entrada'], defaultColor: '#F59E0B' },
  { id: 're-door', category: 'real-estate', label: 'Porta', icon: DoorOpen, tags: ['porta', 'entrada'], defaultColor: '#8B5CF6' },
  { id: 're-bed', category: 'real-estate', label: 'Quarto', icon: Bed, tags: ['quarto', 'dormitório', 'cama'], defaultColor: '#6366F1' },
  { id: 're-bath', category: 'real-estate', label: 'Banheiro', icon: Bath, tags: ['banheiro', 'lavabo'], defaultColor: '#14B8A6' },
  { id: 're-car', category: 'real-estate', label: 'Garagem', icon: Car, tags: ['garagem', 'vaga', 'estacionamento'], defaultColor: '#475569' },
  { id: 're-trees', category: 'real-estate', label: 'Área Verde', icon: Trees, tags: ['jardim', 'área verde', 'natureza'], defaultColor: '#059669' },
  { id: 're-warehouse', category: 'real-estate', label: 'Armazém', icon: Warehouse, tags: ['armazém', 'galpão', 'comercial'], defaultColor: '#64748B' },

  // AUTOMOTIVE
  { id: 'auto-car', category: 'automotive', label: 'Carro', icon: CarIcon, tags: ['carro', 'veículo', 'auto'], defaultColor: '#1F2937' },
  { id: 'auto-fuel', category: 'automotive', label: 'Combustível', icon: Fuel, tags: ['combustível', 'gasolina', 'tanque'], defaultColor: '#059669' },
  { id: 'auto-gauge', category: 'automotive', label: 'Velocímetro', icon: Gauge, tags: ['velocímetro', 'velocidade', 'painel'], defaultColor: '#3B82F6' },
  { id: 'auto-settings', category: 'automotive', label: 'Configurações', icon: Settings, tags: ['configurações', 'ajustes', 'mecânica'], defaultColor: '#6B7280' },
  { id: 'auto-wrench', category: 'automotive', label: 'Chave Inglesa', icon: Wrench, tags: ['ferramenta', 'manutenção', 'reparo'], defaultColor: '#F59E0B' },
  { id: 'auto-zap', category: 'automotive', label: 'Elétrico', icon: Zap, tags: ['elétrico', 'bateria', 'energia'], defaultColor: '#F59E0B' },
  { id: 'auto-shield', category: 'automotive', label: 'Proteção', icon: Shield, tags: ['proteção', 'segurança', 'garantia'], defaultColor: '#3B82F6' },

  // NATURE
  { id: 'sun', category: 'nature', label: 'Sol', icon: Sun, tags: ['sol', 'dia', 'luz'], defaultColor: '#F59E0B' },
  { id: 'moon', category: 'nature', label: 'Lua', icon: Moon, tags: ['lua', 'noite'], defaultColor: '#6366F1' },
  { id: 'cloud', category: 'nature', label: 'Nuvem', icon: Cloud, tags: ['nuvem', 'céu'], defaultColor: '#94A3B8' },
  { id: 'rain', category: 'nature', label: 'Chuva', icon: CloudRain, tags: ['chuva', 'tempo'], defaultColor: '#3B82F6' },
  { id: 'leaf', category: 'nature', label: 'Folha', icon: Leaf, tags: ['folha', 'natureza', 'eco'], defaultColor: '#059669' },
  { id: 'flower', category: 'nature', label: 'Flor', icon: Flower2, tags: ['flor', 'jardim', 'decoração'], defaultColor: '#EC4899' },

  // UI ELEMENTS
  { id: 'check', category: 'ui', label: 'Check', icon: Check, tags: ['check', 'correto', 'ok', 'sim'], defaultColor: '#059669' },
  { id: 'x-mark', category: 'ui', label: 'X', icon: X, tags: ['x', 'fechar', 'não', 'cancelar'], defaultColor: '#DC2626' },
  { id: 'plus', category: 'ui', label: 'Mais', icon: Plus, tags: ['mais', 'adicionar', 'novo'], defaultColor: '#3B82F6' },
  { id: 'minus', category: 'ui', label: 'Menos', icon: Minus, tags: ['menos', 'remover', 'subtrair'], defaultColor: '#DC2626' },
  { id: 'info', category: 'ui', label: 'Informação', icon: Info, tags: ['informação', 'ajuda', 'dica'], defaultColor: '#3B82F6' },
  { id: 'alert', category: 'ui', label: 'Alerta', icon: AlertCircle, tags: ['alerta', 'atenção', 'aviso'], defaultColor: '#F59E0B' },
  { id: 'warning', category: 'ui', label: 'Perigo', icon: AlertTriangle, tags: ['perigo', 'cuidado', 'atenção'], defaultColor: '#DC2626' },

  // SOCIAL & CONTACT
  { id: 'phone', category: 'contact', label: 'Telefone', icon: Phone, tags: ['telefone', 'ligar', 'contato'], defaultColor: '#3B82F6' },
  { id: 'mail', category: 'contact', label: 'Email', icon: Mail, tags: ['email', 'mensagem', 'correio'], defaultColor: '#DC2626' },
  { id: 'message', category: 'contact', label: 'Mensagem', icon: MessageCircle, tags: ['mensagem', 'chat', 'conversa'], defaultColor: '#059669' },
  { id: 'share', category: 'contact', label: 'Compartilhar', icon: Share2, tags: ['compartilhar', 'enviar', 'dividir'], defaultColor: '#6366F1' },
  { id: 'link', category: 'contact', label: 'Link', icon: Link2, tags: ['link', 'url', 'conexão'], defaultColor: '#3B82F6' },

  // DECORATIVE
  { id: 'sparkles', category: 'decorative', label: 'Brilho', icon: Sparkles, tags: ['brilho', 'estrela', 'destaque'], defaultColor: '#F59E0B' },
  { id: 'flame', category: 'decorative', label: 'Fogo', icon: Flame, tags: ['fogo', 'quente', 'oferta'], defaultColor: '#DC2626' },
  { id: 'crown', category: 'decorative', label: 'Coroa', icon: Crown, tags: ['coroa', 'premium', 'vip'], defaultColor: '#F59E0B' },
  { id: 'tag', category: 'decorative', label: 'Etiqueta', icon: Tag, tags: ['etiqueta', 'tag', 'preço'], defaultColor: '#8B5CF6' },

  // SHAPES (as icons)
  { id: 'rectangle', category: 'shapes', label: 'Retângulo', icon: Square, tags: ['retângulo', 'quadrado', 'forma'], defaultColor: '#3B82F6' },
  { id: 'circle', category: 'shapes', label: 'Círculo', icon: Circle, tags: ['círculo', 'forma', 'redondo'], defaultColor: '#10B981' },
];

// Shapes Library
const shapesLibrary: ShapeDefinition[] = [
  { id: 'rectangle', label: 'Retângulo', icon: <Square className="w-6 h-6" strokeWidth={2.5} />, shapeType: 'rectangle', defaultColor: '#3B82F6' },
  { id: 'circle', label: 'Círculo', icon: <Circle className="w-6 h-6" strokeWidth={2.5} />, shapeType: 'circle', defaultColor: '#10B981' },
];

const categories = [
  { id: 'all', label: 'Todos os Ícones' },
  { id: 'favorites', label: 'Favoritos' },
  { id: 'shapes', label: 'Formas' },
  { id: 'arrows', label: 'Setas' },
  { id: 'business', label: 'Negócios' },
  { id: 'real-estate', label: 'Imóveis' },
  { id: 'automotive', label: 'Veículos' },
  { id: 'nature', label: 'Natureza' },
  { id: 'ui', label: 'UI' },
  { id: 'contact', label: 'Contato' },
  { id: 'decorative', label: 'Decorativo' },
];

interface ColorSchema {
  id: string;
  name: string;
  colors: ColorScaleName[];
}

// Color Schemas (matching ColorsSessionEnhanced) - SORTED ALPHABETICALLY
const COLOR_SCHEMAS: ColorSchema[] = [
  { id: 'all', name: 'Todas as Cores', colors: Object.keys(COLOR_SCALES) as ColorScaleName[] },
  { id: 'aesthetic', name: 'Aesthetic', colors: ['maroonRed', 'ivoryWhite', 'lightGrayBeige', 'shadowGray', 'taupeBrown'] },
  { id: 'blackberry', name: 'Blackberry', colors: ['paleBeige', 'dustyTealGray', 'softBlue', 'mutedPurple', 'charcoalPurple'] },
  { id: 'bubblegum', name: 'Bubblegum', colors: ['amethyst', 'skyBlue', 'hotPink', 'sunflower', 'electricBlue', 'brightFuchsia'] },
  { id: 'chicago', name: 'Chicago', colors: ['lightCream', 'warmTerracottaRust', 'darkForestGreen', 'deepCharcoalBlack'] },
  { id: 'classic', name: 'Classic', colors: ['forestGreen', 'silverGray', 'lightGray', 'mustardYellow', 'mediumSteelBlue'] },
  { id: 'coconut', name: 'Coconut', colors: ['tangerine', 'coconutCream', 'espresso', 'khaki', 'mediumKhaki'] },
  { id: 'deep-water', name: 'Deep Water', colors: ['deepNavy', 'mediumNavy', 'softNavy', 'lightNavyGray', 'paleNavyBlue'] },
  { id: 'dreamer', name: 'Dreamer', colors: ['aquaMist', 'lavenderGray', 'sandBeige', 'lilacMist'] },
  { id: 'dusk', name: 'Dusk', colors: ['darkBrown', 'rosewood', 'dustySage', 'paleGray', 'softTaupe', 'paleSand'] },
  { id: 'earth', name: 'Earth', colors: ['charcoalBlack', 'forestBrown', 'doveGray', 'sandstone', 'parchment', 'ivory'] },
  { id: 'fresh', name: 'Fresh', colors: ['warmBrown', 'sageGreen', 'steelBlue', 'lightGray', 'coconutCream', 'darkWarmBrown'] },
  { id: 'frosted', name: 'Frosted', colors: ['midnightSlate', 'steelSlate', 'sageGray', 'mistyBlue', 'frostBlue', 'paleIce'] },
  { id: 'golden', name: 'Golden', colors: ['antiqueBronze', 'sandyBeige', 'lightGray', 'khaki', 'darkChocolate'] },
  { id: 'greenwich', name: 'Greenwich', colors: ['yaleBlue', 'dustyTeal', 'cambridgeBlue', 'mindaro'] },
  { id: 'haze-sunset', name: 'Haze Sunset', colors: ['peach', 'coral', 'dustyRose', 'purpleGray', 'slateBlue'] },
  { id: 'hazy', name: 'Hazy', colors: ['deepForest', 'dustyTeal', 'sageGray', 'seafoam', 'lightGray', 'mintCream'] },
  { id: 'lullaby', name: 'Lullaby', colors: ['paleRose', 'dustyPink', 'lightGray', 'warmGray', 'warmTerracotta'] },
  { id: 'luxor', name: 'Luxor', colors: ['onyxBlack', 'mahogany', 'taupeBrown', 'champagneGold', 'paleChampagne', 'creamWhite'] },
  { id: 'mediterranean', name: 'Mediterranean', colors: ['deepTeal', 'skyBlue', 'lightBlue', 'coconutCream', 'tangerine', 'richGold'] },
  { id: 'miami', name: 'Miami', colors: ['deepPurple', 'crimson', 'rubyRed', 'tangerineDream', 'goldenSun'] },
  { id: 'mocha', name: 'Mocha', colors: ['espressoDark', 'caramel', 'latte', 'milkCream', 'ivoryCream', 'deepChocolate', 'mediumBrown', 'softBeige'] },
  { id: 'nude', name: 'Nude', colors: ['deepCharcoal', 'rosyBrown', 'sandyBeige', 'lightTan', 'creamBeige', 'ivoryCream'] },
  { id: 'officer', name: 'Officer', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine', 'mediumCharcoal'] },
  { id: 'officer2', name: 'Officer 2', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine', 'mediumSlate'] },
  { id: 'officer3', name: 'Officer 3', colors: ['darkSlate', 'royalPurple', 'silverGray', 'lightSilver'] },
  { id: 'pastel', name: 'Pastel', colors: ['softLavender', 'blushPink', 'softCoral', 'warmGray', 'mediumGrayBrown'] },
  { id: 'regal', name: 'Regal', colors: ['jetBlack', 'plumWine', 'bronze', 'mintJade', 'paleAlmond', 'ivoryCream'] },
  { id: 'sensual', name: 'Sensual', colors: ['nero', 'wineRed', 'desertSand', 'blushBeige', 'porcelain', 'ivoryCream'] },
  { id: 'sinopsys', name: 'Sinopsys', colors: ['softPeach', 'vintagePlum', 'midnightNavy', 'darkTeal', 'mutedMauve'] },
  { id: 'spiced', name: 'Spiced', colors: ['obsidian', 'cayenne', 'cinnamon', 'goldenHoney', 'champagne', 'ivoryCream'] },
  { id: 'studio', name: 'Studio', colors: ['goldenYellow', 'iceBlue', 'powderBlue', 'charcoal', 'mauve'] },
  { id: 'summer-vibes', name: 'Summer Vibes', colors: ['mintGreen', 'lemonChiffon', 'blushPink', 'coralPink', 'softCoralPink'] },
  { id: 'suvinil-amarelos', name: 'Suvinil Amarelos', colors: ['luzDeInverno', 'gengibre', 'cacauDaBahia', 'amareloReal', 'poDeGengibre', 'bananada'] },
  { id: 'suvinil-laranjas', name: 'Suvinil Laranjas', colors: ['areia', 'naturale', 'maraca', 'vitaminaDePapaia', 'castanhaPortuguesa', 'viraLataCaramelo'] },
  { id: 'suvinil-rosas', name: 'Suvinil Rosas', colors: ['rosaPastel', 'contoDeFadas', 'rosaNeon', 'valentino', 'saiaJusta', 'tapecaria'] },
  { id: 'suvinil-violetas', name: 'Suvinil Violetas', colors: ['chaDeRosas', 'chuvaDePetalas', 'florDeGeranio', 'roxoRustico', 'maravilha', 'violetaQueimado'] },
  { id: 'suvinil-azuis', name: 'Suvinil Azuis', colors: ['aguaFresca', 'ceuSereno', 'ilhasGregas', 'azulMarinho', 'nevoaIntensa', 'jeansLavado'] },
  { id: 'suvinil-teals', name: 'Suvinil Teals', colors: ['luzDaManha', 'calmaria', 'marMediterraneo', 'marVerde', 'martimPescador', 'vasoDeCeramica'] },
  { id: 'suvinil-verdes', name: 'Suvinil Verdes', colors: ['verdeLavado', 'igarape', 'rioLimpido', 'trilhaNaMata', 'verdeTrevo', 'verdePastel'] },
  { id: 'suvinil-verde-amarelo', name: 'Suvinil Verde-Amarelo', colors: ['rioPaine', 'capimSanto', 'cheiroVerde', 'capimSeco', 'temperoSirio', 'chenile'] },
  { id: 'suvinil-cinzas', name: 'Suvinil Cinzas', colors: ['fotoRetro', 'banhoDePlatina', 'cinzaNatural', 'aventurinaPreta', 'fantasiaPrateada', 'cinzaTecnologico'] },
  { id: 'suvinil-beges', name: 'Suvinil Beges', colors: ['gelo', 'calopsita', 'algodaoEgipcio', 'invernoGelado', 'cromio', 'rafia'] },
  { id: 'terrace', name: 'Terrace', colors: ['deepViolet', 'burgundy', 'darkPlum', 'deepWine', 'darkPurpleGray', 'charcoalGray', 'lightStone'] },
  { id: 'tropical', name: 'Tropical', colors: ['harvestGold', 'calico', 'hampton', 'seaNymph', 'smaltBlue'] },
  { id: 'viola', name: 'Viola', colors: ['deepAmethyst', 'orchid', 'goldCream', 'vanillaIce', 'richPurple', 'lightLavender'] },
  { id: 'winter', name: 'Winter', colors: ['winterSky', 'steelBlue', 'deepOcean', 'mediumSlateGray'] },
];

export function IconsSessionEnhanced() {
  const { addElement, currentPage, favoriteIcons, toggleFavoriteIcon } = useBuilderStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSize, setIconSize] = useState(48);
  const [selectedColor, setSelectedColor] = useState<ColorScaleName>('limeGreen');
  const [selectedColorSchema, setSelectedColorSchema] = useState<string>('all');

  const handleInsertIcon = (iconDef: IconDefinition) => {
    const page = currentPage();
    if (!page) return;

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    // Insert as proper icon element
    addElement({
      id: `icon-${Date.now()}`,
      type: 'icon',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: iconSize,
      height: iconSize,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        iconName: iconDef.id,
        iconSet: 'lucide',
        color: COLOR_SCALES[selectedColor].medium,
        strokeWidth: 2,
      },
    });
  };

  const handleInsertShape = (shapeDef: ShapeDefinition) => {
    const page = currentPage();
    if (!page) return;

    const canvasCenter = {
      x: page.canvasSize.width / 2,
      y: page.canvasSize.height / 2,
    };

    addElement({
      id: `shape-${Date.now()}`,
      type: 'shape',
      x: canvasCenter.x,
      y: canvasCenter.y,
      width: 200,
      height: 200,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        shapeType: shapeDef.shapeType,
        fill: COLOR_SCALES[selectedColor].medium,
      },
    });
  };

  // Filter icons
  const filteredIcons = iconLibrary.filter((icon) => {
    // If favorites selected, only show favorited icons
    if (selectedCategory === 'favorites') {
      return favoriteIcons.includes(icon.id);
    }

    // Otherwise apply normal category filtering
    if (selectedCategory !== 'all' && selectedCategory !== 'shapes' && icon.category !== selectedCategory) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        icon.label.toLowerCase().includes(query) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  const showShapes = selectedCategory === 'all' || selectedCategory === 'shapes';
  const showIcons = selectedCategory !== 'shapes' && selectedCategory !== 'favorites';
  const showOnlyFavorites = selectedCategory === 'favorites';

  return (
    <div className="flex flex-col h-full">
      <style jsx global>{`
        /* Option 3: Nuclear approach - force everything to not be blue */
        select[style*="backgroundImage"],
        select[style*="backgroundColor"] {
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
        }

        select[style*="backgroundImage"] option,
        select[style*="backgroundColor"] option {
          background: inherit !important;
          background-color: inherit !important;
          color: inherit !important;
          padding: 8px !important;

          /* Force no highlight color */
          -webkit-tap-highlight-color: transparent !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          user-select: none !important;
        }

        /* Override ALL possible hover/focus states */
        select[style*="backgroundImage"] option:hover,
        select[style*="backgroundImage"] option:focus,
        select[style*="backgroundImage"] option:active,
        select[style*="backgroundImage"] option::selection,
        select[style*="backgroundImage"] option::-moz-selection,
        select[style*="backgroundColor"] option:hover,
        select[style*="backgroundColor"] option:focus,
        select[style*="backgroundColor"] option:active,
        select[style*="backgroundColor"] option::selection,
        select[style*="backgroundColor"] option::-moz-selection {
          background: inherit !important;
          background-color: inherit !important;
          background-image: none !important;
          color: inherit !important;
          outline: none !important;
          border: none !important;
          box-shadow: none !important;

          /* Try to prevent OS-level highlighting */
          -webkit-tap-highlight-color: transparent !important;
          -webkit-touch-callout: none !important;
        }

        /* Remove any possible selection/highlight pseudo-elements */
        select[style*="backgroundImage"] option::-webkit-selection,
        select[style*="backgroundColor"] option::-webkit-selection {
          background: transparent !important;
          color: inherit !important;
        }

        select[style*="backgroundImage"] option:checked,
        select[style*="backgroundColor"] option:checked {
          background: inherit !important;
          background-color: inherit !important;
          font-weight: bold !important;
        }
      `}</style>
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
          Ícones & Formas
        </h3>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar ícones..."
            className="w-full pl-8 pr-8 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

        {/* Category & Size Controls */}
        <div className="flex gap-2 items-center mb-2">
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Categoria</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Tamanho</label>
            <select
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={24}>Pequeno (24px)</option>
              <option value={48}>Médio (48px)</option>
              <option value={72}>Grande (72px)</option>
              <option value={96}>Extra Grande (96px)</option>
            </select>
          </div>
        </div>

        {/* Color Schema & Color Controls */}
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Esquema de Cores</label>
            <select
              value={selectedColorSchema}
              onChange={(e) => {
                setSelectedColorSchema(e.target.value);
                // Reset to first valid color of selected schema
                const schema = COLOR_SCHEMAS.find(s => s.id === e.target.value);
                if (schema && schema.colors.length > 0) {
                  const validColors = schema.colors.filter(c => COLOR_SCALES[c]);
                  if (validColors.length > 0) {
                    setSelectedColor(validColors[0]);
                  }
                }
              }}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {COLOR_SCHEMAS.map((schema) => (
                <option key={schema.id} value={schema.id}>
                  {schema.name}
                </option>
              ))}
            </select>
          </div>
          <ColorDropdown
            value={selectedColor}
            onChange={setSelectedColor}
            colors={(() => {
              const schema = COLOR_SCHEMAS.find(s => s.id === selectedColorSchema);
              const availableColors = schema ? schema.colors : Object.keys(COLOR_SCALES) as ColorScaleName[];
              return availableColors.filter(colorKey => COLOR_SCALES[colorKey]);
            })()}
            label="Cor"
            className="flex-1"
          />
        </div>

      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Favorites Section */}
        {showShapes && favoriteIcons.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Favoritos</h4>
            <div className="grid grid-cols-3 gap-2">
              {iconLibrary.filter(icon => favoriteIcons.includes(icon.id)).map((iconDef) => {
                const IconComponent = iconDef.icon;
                return (
                  <button
                    key={iconDef.id}
                    onClick={() => handleInsertIcon(iconDef)}
                    className="
                      p-2 rounded-lg border border-gray-200 bg-white
                      hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm
                      transition-all duration-150 flex flex-col items-center gap-1
                      group relative
                    "
                    title={iconDef.label}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteIcon(iconDef.id);
                      }}
                      className="absolute top-1 right-1 p-0.5 rounded hover:bg-yellow-100 transition-colors"
                    >
                      <StarIcon
                        className="w-3 h-3 text-yellow-500 fill-yellow-500"
                        strokeWidth={2}
                      />
                    </button>
                    <IconComponent
                      className="w-6 h-6"
                      strokeWidth={2.5}
                      style={{ color: COLOR_SCALES[selectedColor].medium }}
                    />
                    <span className="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-2">
                      {iconDef.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Icons Section */}
        {showIcons && (
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2">
              {selectedCategory === 'all' ? 'Todos os Ícones' : categories.find(c => c.id === selectedCategory)?.label}
            </h4>
            {filteredIcons.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                <Search className="w-12 h-12 text-gray-300 mb-2" strokeWidth={2} />
                <p className="text-sm font-medium text-gray-600">Nenhum ícone encontrado</p>
                <p className="text-xs text-gray-500 mt-1">Tente outro termo de busca</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {filteredIcons.map((iconDef) => {
                  const IconComponent = iconDef.icon;
                  return (
                    <button
                      key={iconDef.id}
                      onClick={() => handleInsertIcon(iconDef)}
                      className="
                        p-2 rounded-lg border border-gray-200 bg-white
                        hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm
                        transition-all duration-150 flex flex-col items-center gap-1
                        group relative
                      "
                      title={iconDef.label}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (favoriteIcons.includes(iconDef.id)) {
                            toggleFavoriteIcon(iconDef.id);
                          } else {
                            toggleFavoriteIcon(iconDef.id);
                          }
                        }}
                        className="absolute top-1 right-1 p-0.5 rounded hover:bg-yellow-100 transition-colors"
                      >
                        <StarIcon
                          className={`w-3 h-3 ${favoriteIcons.includes(iconDef.id) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          strokeWidth={2}
                        />
                      </button>
                      <IconComponent
                        className="w-6 h-6"
                        strokeWidth={2.5}
                        style={{ color: COLOR_SCALES[selectedColor].medium }}
                      />
                      <span className="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-2">
                        {iconDef.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
