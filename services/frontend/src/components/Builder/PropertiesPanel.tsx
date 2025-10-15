// ============================================================================
// Template Builder - Properties Panel (Right Sidebar)
// AURELIA (Design System) + NOVA (Frontend)
// ============================================================================

'use client';

import { useSelectedElement } from '@/store/builder';
import { useBuilderStore } from '@/store/builder';
import { useImageLibrary } from '@/store/imageLibrary';
import { AVAILABLE_FONTS, getFontsByCategory, getFontFamily } from '@/utils/fonts';
import type { TextElement, ShapeElement, ImageElement, FormElement, FrameElement, IconElement, VideoElement, BulletElement } from '@/types/builder';
import { useState } from 'react';
import {
  AdjustmentsHorizontalIcon,
  SwatchIcon,
  PaintBrushIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  LockClosedIcon,
  LockOpenIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { FormProperties } from './FormProperties';
import { FrameProperties } from './FrameProperties';
import { ColorDropdown } from './ColorDropdown';
import { COLOR_SCHEMAS } from './sessions/ColorsSessionEnhanced';
import { COLOR_SCALES, type ColorScaleName } from '@/types/bulletSystemV2';
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

  // Decorative
  Sparkles,
  Flame,
  Crown,
  Tag,
  Search,
} from 'lucide-react';




// Icon Library Definition (same as IconsSessionEnhanced)
const iconLibrary = [
  // ARROWS (8)
  { id: 'arrow-up', label: 'Seta Cima', icon: ArrowUp },
  { id: 'arrow-down', label: 'Seta Baixo', icon: ArrowDown },
  { id: 'arrow-left', label: 'Seta Esquerda', icon: ArrowLeft },
  { id: 'arrow-right', label: 'Seta Direita', icon: ArrowRight },
  { id: 'arrow-up-right', label: 'Diagonal', icon: ArrowUpRight },
  { id: 'arrow-down-left', label: 'Diagonal', icon: ArrowDownLeft },
  { id: 'trending-up', label: 'Tendência Alta', icon: TrendingUp },
  { id: 'trending-down', label: 'Tendência Baixa', icon: TrendingDown },

  // BUSINESS (7)
  { id: 'briefcase', label: 'Maleta', icon: Briefcase },
  { id: 'chart-bar', label: 'Gráfico Barras', icon: BarChart3 },
  { id: 'chart-pie', label: 'Gráfico Pizza', icon: PieChart },
  { id: 'target', label: 'Alvo', icon: Target },
  { id: 'award', label: 'Prêmio', icon: Award },
  { id: 'users', label: 'Pessoas', icon: Users },
  { id: 'building', label: 'Prédio', icon: Building2 },

  // REAL ESTATE (10)
  { id: 're-home', label: 'Casa', icon: Home },
  { id: 're-building', label: 'Prédio', icon: Building },
  { id: 're-location', label: 'Localização', icon: MapPin },
  { id: 're-key', label: 'Chave', icon: Key },
  { id: 're-door', label: 'Porta', icon: DoorOpen },
  { id: 're-bed', label: 'Quarto', icon: Bed },
  { id: 're-bath', label: 'Banheiro', icon: Bath },
  { id: 're-car', label: 'Garagem', icon: Car },
  { id: 're-trees', label: 'Área Verde', icon: Trees },
  { id: 're-warehouse', label: 'Armazém', icon: Warehouse },

  // AUTOMOTIVE (7)
  { id: 'auto-car', label: 'Carro', icon: Car },
  { id: 'auto-fuel', label: 'Combustível', icon: Fuel },
  { id: 'auto-gauge', label: 'Velocímetro', icon: Gauge },
  { id: 'auto-settings', label: 'Configurações', icon: Settings },
  { id: 'auto-wrench', label: 'Chave Inglesa', icon: Wrench },
  { id: 'auto-zap', label: 'Elétrico', icon: Zap },
  { id: 'auto-shield', label: 'Proteção', icon: Shield },

  // NATURE (6)
  { id: 'sun', label: 'Sol', icon: Sun },
  { id: 'moon', label: 'Lua', icon: Moon },
  { id: 'cloud', label: 'Nuvem', icon: Cloud },
  { id: 'rain', label: 'Chuva', icon: CloudRain },
  { id: 'leaf', label: 'Folha', icon: Leaf },
  { id: 'flower', label: 'Flor', icon: Flower2 },

  // UI ELEMENTS (7)
  { id: 'check', label: 'Check', icon: Check },
  { id: 'x-mark', label: 'X', icon: X },
  { id: 'plus', label: 'Mais', icon: Plus },
  { id: 'minus', label: 'Menos', icon: Minus },
  { id: 'info', label: 'Informação', icon: Info },
  { id: 'alert', label: 'Alerta', icon: AlertCircle },
  { id: 'warning', label: 'Perigo', icon: AlertTriangle },

  // SOCIAL & CONTACT (5)
  { id: 'phone', label: 'Telefone', icon: Phone },
  { id: 'mail', label: 'Email', icon: Mail },
  { id: 'message', label: 'Mensagem', icon: MessageCircle },
  { id: 'share', label: 'Compartilhar', icon: Share2 },
  { id: 'link', label: 'Link', icon: Link2 },

  // DECORATIVE (4)
  { id: 'sparkles', label: 'Brilho', icon: Sparkles },
  { id: 'flame', label: 'Fogo', icon: Flame },
  { id: 'crown', label: 'Coroa', icon: Crown },
  { id: 'tag', label: 'Etiqueta', icon: Tag },
];

function VideoProperties({ element }: { element: VideoElement }) {
  const { updateElement } = useBuilderStore();

  return (
    <div className="space-y-2">
      {/* Video URL */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          URL do Vídeo
        </label>
        <input
          type="text"
          value={element.properties.src}
          onChange={(e) => {
            const url = e.target.value;
            // Auto-detect YouTube URLs and convert to embed format
            const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = url.match(youtubeRegex);

            if (match && match[1]) {
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  src: `https://www.youtube.com/embed/${match[1]}`,
                  videoType: 'youtube',
                },
              } as Partial<VideoElement>);
            } else {
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  src: url,
                  videoType: 'direct',
                },
              } as Partial<VideoElement>);
            }
          }}
          className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-rose-500"
          placeholder="Cole o link do YouTube ou URL do vídeo"
        />
        {element.properties.videoType === 'youtube' && (
          <p className="text-xs text-rose-600 mt-1">✓ YouTube detectado</p>
        )}
      </div>

      {/* Custom Thumbnail */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Miniatura Personalizada
        </label>
        {element.properties.thumbnail ? (
          <div className="space-y-2">
            <div className="relative w-full aspect-video rounded border border-gray-200 overflow-hidden">
              <img
                src={element.properties.thumbnail}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <label className="flex-1 px-2 py-1.5 text-xs bg-rose-50 text-rose-700 rounded hover:bg-rose-100 transition-colors cursor-pointer text-center font-medium">
                Alterar
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        updateElement(element.id, {
                          properties: { ...element.properties, thumbnail: result },
                        } as Partial<VideoElement>);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => {
                  updateElement(element.id, {
                    properties: { ...element.properties, thumbnail: undefined },
                  } as Partial<VideoElement>);
                }}
                className="px-2 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors font-medium"
              >
                Remover
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-rose-400 transition-colors cursor-pointer bg-gray-50 hover:bg-rose-50">
            <div className="flex flex-col items-center justify-center">
              <PhotoIcon className="w-8 h-8 text-gray-400 mb-1" />
              <p className="text-xs text-gray-600 font-medium">Carregar miniatura</p>
              <p className="text-xs text-gray-400">PNG, JPG até 5MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const result = event.target?.result as string;
                    updateElement(element.id, {
                      properties: { ...element.properties, thumbnail: result },
                    } as Partial<VideoElement>);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
          </label>
        )}
        <p className="text-xs text-gray-500 mt-1">
          A miniatura aparecerá apenas na visualização do canvas
        </p>
      </div>

      {/* Playback Controls */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-700">
          Controles de Reprodução
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={element.properties.autoPlay}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, autoPlay: e.target.checked },
              } as Partial<VideoElement>)
            }
            className="w-3.5 h-3.5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
          />
          <span className="text-xs text-gray-700">Reproduzir automaticamente</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={element.properties.loop}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, loop: e.target.checked },
              } as Partial<VideoElement>)
            }
            className="w-3.5 h-3.5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
          />
          <span className="text-xs text-gray-700">Repetir em loop</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={element.properties.muted}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, muted: e.target.checked },
              } as Partial<VideoElement>)
            }
            className="w-3.5 h-3.5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
          />
          <span className="text-xs text-gray-700">Sem áudio (mudo)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={element.properties.controls}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, controls: e.target.checked },
              } as Partial<VideoElement>)
            }
            className="w-3.5 h-3.5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
          />
          <span className="text-xs text-gray-700">Mostrar controles</span>
        </label>
      </div>

      {/* Border */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Borda
        </label>
        <div className="space-y-1.5">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-0.5 block">Espessura</label>
              <input
                type="number"
                min="0"
                max="20"
                value={element.properties.border?.width || 0}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      border: {
                        ...element.properties.border,
                        width: parseInt(e.target.value) || 0,
                        color: element.properties.border?.color || '#000000',
                        radius: element.properties.border?.radius || 12,
                      },
                    },
                  } as Partial<VideoElement>)
                }
                className="w-full px-2 py-1 text-xs border border-gray-200 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-0.5 block">Cor</label>
              <input
                type="color"
                value={element.properties.border?.color || '#000000'}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      border: {
                        ...element.properties.border,
                        width: element.properties.border?.width || 2,
                        color: e.target.value,
                        radius: element.properties.border?.radius || 12,
                      },
                    },
                  } as Partial<VideoElement>)
                }
                className="w-full h-8 rounded border border-gray-200 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-0.5 block">Raio</label>
              <input
                type="number"
                min="0"
                max="50"
                value={element.properties.border?.radius || 12}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      border: {
                        ...element.properties.border,
                        width: element.properties.border?.width || 0,
                        color: element.properties.border?.color || '#000000',
                        radius: parseInt(e.target.value) || 12,
                      },
                    },
                  } as Partial<VideoElement>)
                }
                className="w-full px-2 py-1 text-xs border border-gray-200 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BulletProperties({ element }: { element: BulletElement }) {
  const { updateElement } = useBuilderStore();
  const { INDIVIDUAL_BULLETS_LIBRARY } = require('@/data/individualBulletsLibrary');
  const [selectedColorSchema, setSelectedColorSchema] = useState('todas');

  // Check if this is an individual bullet or a set
  const isIndividualBullet = !!element.properties.bulletId;
  const bullet = isIndividualBullet ? INDIVIDUAL_BULLETS_LIBRARY.find((b: any) => b.id === element.properties.bulletId) : null;

  // Find color name from hex value or return the color name if it's already a name
  const getCurrentColorName = (): ColorScaleName => {
    const colorProp = element.properties.color || 'limeGreen';
    // If it's already a color name, return it
    if (COLOR_SCALES[colorProp as ColorScaleName]) {
      return colorProp as ColorScaleName;
    }
    // If it's a hex, find the matching color name
    const colorEntry = Object.entries(COLOR_SCALES).find(
      ([_, scale]) => scale.medium === colorProp
    );
    return (colorEntry?.[0] as ColorScaleName) || 'limeGreen';
  };

  // Regenerate SVG when color, number, text, or icon changes
  const regenerateSVG = (colorName: ColorScaleName, number?: number, text?: string, icon?: string) => {
    if (!bullet) return;

    const colorValue = COLOR_SCALES[colorName].medium;

    const svgContent = bullet.generateSVG({
      width: bullet.defaultWidth,
      height: bullet.defaultHeight,
      color: colorValue,
      number: number !== undefined ? number : element.properties.number,
      text: text !== undefined ? text : element.properties.text,
      icon: icon !== undefined ? icon : element.properties.icon,
    });
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

    updateElement(element.id, {
      properties: {
        ...element.properties,
        color: colorName,
        number: number !== undefined ? number : element.properties.number,
        text: text !== undefined ? text : element.properties.text,
        icon: icon !== undefined ? icon : element.properties.icon,
        svgDataUrl,
      },
    } as Partial<BulletElement>);
  };

  return (
    <div className="space-y-2">
      {/* Bullet Preview */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Visualização
        </label>
        <div className="w-full aspect-square bg-slate-50 rounded-lg border border-gray-200 flex items-center justify-center p-4">
          <img
            src={element.properties.svgDataUrl || element.properties.imageUrl}
            alt={element.properties.bulletName || 'Bullet'}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <p className="text-xs text-gray-600 mt-1 text-center font-medium">
          {element.properties.bulletName}
        </p>
        <p className="text-[10px] text-gray-500 mt-0.5 text-center">
          ID: {element.properties.bulletId || element.properties.bulletSetId}
        </p>
      </div>

      {/* Color Control (only for individual bullets) - STANDARDIZED SCHEMA + DROPDOWN */}
      {isIndividualBullet && bullet && (
        <div className="grid grid-cols-2 gap-1.5">
          {/* Schema Selection */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Esquema de Cores
            </label>
            <select
              value={selectedColorSchema}
              onChange={(e) => setSelectedColorSchema(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {COLOR_SCHEMAS.map((schema) => (
                <option key={schema.id} value={schema.id}>
                  {schema.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color Dropdown */}
          <ColorDropdown
            value={getCurrentColorName()}
            onChange={(colorName) => {
              regenerateSVG(colorName, element.properties.number);
            }}
            colors={(() => {
              const schema = COLOR_SCHEMAS.find(s => s.id === selectedColorSchema);
              const availableColors = schema ? schema.colors : Object.keys(COLOR_SCALES) as ColorScaleName[];
              return availableColors.filter(colorKey => COLOR_SCALES[colorKey]);
            })()}
            label="Cor"
          />
        </div>
      )}

      {/* Text Editing Section - COMPACT LAYOUT */}
      {isIndividualBullet && bullet && (bullet.customizable.number || bullet.customizable.text || bullet.customizable.icon) && (
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700">Conteúdo do Bullet</h4>

          {/* Number + Text in same row (25% + 75%) */}
          {(bullet.customizable.number || bullet.customizable.text) && (
            <div className="grid grid-cols-4 gap-1.5">
              {/* Number Field (25% - if bullet supports number) */}
              {bullet.customizable.number && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Número
                  </label>
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => {
                        const newNumber = Math.max(1, (element.properties.number || 1) - 1);
                        regenerateSVG(getCurrentColorName(), newNumber);
                      }}
                      className="px-1 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={element.properties.number || 1}
                      onChange={(e) => {
                        const newNumber = Math.max(1, Math.min(99, parseInt(e.target.value) || 1));
                        regenerateSVG(getCurrentColorName(), newNumber);
                      }}
                      className="w-10 px-1 py-1 text-center border border-gray-300 rounded text-xs"
                      min="1"
                      max="99"
                    />
                    <button
                      onClick={() => {
                        const newNumber = Math.min(99, (element.properties.number || 1) + 1);
                        regenerateSVG(getCurrentColorName(), newNumber);
                      }}
                      className="px-1 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Text Field (75% - if bullet supports text) */}
              {bullet.customizable.text && (
                <div className={bullet.customizable.number ? "col-span-3" : "col-span-4"}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Texto
                  </label>
                  <input
                    type="text"
                    value={element.properties.text || ''}
                    onChange={(e) => {
                      regenerateSVG(
                        getCurrentColorName(),
                        element.properties.number,
                        e.target.value,
                        element.properties.icon
                      );
                    }}
                    placeholder="Digite o texto..."
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Icon/Label Field (full width if present) */}
          {bullet.customizable.icon && (
            <div>
              {/* Check if bullet uses icon for graphical icons or text labels */}
              {bullet.id === 'diamond-badge-v2' ? (
                // DIAMOND: Icon selector dropdown
                <>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Ícone
                  </label>
                  <select
                    value={element.properties.icon || 'arrow-up'}
                    onChange={(e) => {
                      regenerateSVG(
                        getCurrentColorName(),
                        element.properties.number,
                        element.properties.text,
                        e.target.value
                      );
                    }}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Nenhum</option>
                    <optgroup label="Setas">
                      <option value="arrow-up">↑ Seta Cima</option>
                      <option value="arrow-down">↓ Seta Baixo</option>
                      <option value="arrow-left">← Seta Esquerda</option>
                      <option value="arrow-right">→ Seta Direita</option>
                    </optgroup>
                    <optgroup label="Símbolos">
                      <option value="check">✓ Check</option>
                      <option value="x">✗ X</option>
                      <option value="plus">+ Mais</option>
                      <option value="minus">− Menos</option>
                    </optgroup>
                    <optgroup label="Formas">
                      <option value="star">★ Estrela</option>
                      <option value="heart">♥ Coração</option>
                      <option value="circle">● Círculo</option>
                      <option value="square">■ Quadrado</option>
                      <option value="triangle">▲ Triângulo</option>
                      <option value="diamond">◆ Diamante</option>
                    </optgroup>
                  </select>
                  <p className="text-[10px] text-gray-500 mt-0.5">Ícone exibido no bullet</p>
                </>
              ) : (
                // Other bullets: Text label input
                <>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Rótulo
                  </label>
                  <input
                    type="text"
                    value={element.properties.icon || ''}
                    onChange={(e) => {
                      regenerateSVG(
                        getCurrentColorName(),
                        element.properties.number,
                        element.properties.text,
                        e.target.value
                      );
                    }}
                    placeholder="Ex: STEP, ETAPA, FASE..."
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[10px] text-gray-500 mt-0.5">Texto do rótulo</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Shadow Controls - COPIED FROM ICONPROPERTIES */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-1.5">
          <label className="text-xs font-medium text-gray-700">
            Sombra
          </label>
          <input
            type="checkbox"
            checked={!!element.properties?.shadow}
            onChange={(e) => {
              if (e.target.checked) {
                updateElement(element.id, {
                  properties: {
                    ...element.properties,
                    shadow: {
                      blur: 2,
                      color: 'rgba(0, 0, 0, 0.5)',
                      offsetX: 2,
                      offsetY: 2,
                    },
                  } as Partial<BulletElement>['properties'],
                });
              } else {
                const { shadow, ...restProperties } = element.properties;
                updateElement(element.id, {
                  properties: restProperties,
                } as Partial<BulletElement>);
              }
            }}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <input
            type="color"
            value={element.properties?.shadow?.color.startsWith('rgba') ? '#000000' : (element.properties?.shadow?.color || '#000000')}
            onChange={(e) => {
              if (!element.properties?.shadow) return;
              const hex = e.target.value;
              const rgba = `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, 0.5)`;
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  shadow: {
                    ...element.properties.shadow,
                    color: rgba,
                  },
                } as Partial<BulletElement>['properties'],
              });
            }}
            disabled={!element.properties?.shadow}
            className="w-8 h-6 rounded border border-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="text"
            value={element.properties?.shadow?.color.startsWith('rgba') ? '#000000' : (element.properties?.shadow?.color || '#000000')}
            onChange={(e) => {
              if (!element.properties?.shadow) return;
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  shadow: {
                    ...element.properties.shadow,
                    color: e.target.value,
                  },
                } as Partial<BulletElement>['properties'],
              });
            }}
            onFocus={(e) => e.target.select()}
            disabled={!element.properties?.shadow}
            placeholder="#000000"
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          />
        </div>

        {element.properties?.shadow && (
          <div className="grid grid-cols-3 gap-1.5 pl-2">
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Desfoque</label>
                <span className="text-xs text-gray-500">{element.properties.shadow.blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.blur}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        blur: parseInt(e.target.value),
                      },
                    } as Partial<BulletElement>['properties'],
                  })
                }
                className="w-full h-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Offset X</label>
                <span className="text-xs text-gray-500">{element.properties.shadow.offsetX}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.offsetX}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        offsetX: parseInt(e.target.value),
                      },
                    } as Partial<BulletElement>['properties'],
                  })
                }
                className="w-full h-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Offset Y</label>
                <span className="text-xs text-gray-500">{element.properties.shadow.offsetY}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.offsetY}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        offsetY: parseInt(e.target.value),
                      },
                    } as Partial<BulletElement>['properties'],
                  })
                }
                className="w-full h-1.5"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function IconProperties({ element }: { element: IconElement }) {
  const { updateElement, favoriteIcons, toggleFavoriteIcon } = useBuilderStore();
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [favoritesPickerOpen, setFavoritesPickerOpen] = useState(false);
  const [selectedColorSchema, setSelectedColorSchema] = useState('todas');

  // Find color name from hex value
  const getCurrentColorName = (): ColorScaleName => {
    const colorEntry = Object.entries(COLOR_SCALES).find(
      ([_, scale]) => scale.medium === element.properties.color
    );
    return (colorEntry?.[0] as ColorScaleName) || 'limeGreen';
  };

  const currentIcon = iconLibrary.find((icon) => icon.id === element.properties.iconName);
  const IconComponent = currentIcon?.icon;

  return (
    <div className="space-y-2">
      {/* Color Control - STANDARDIZED WITH SCHEMA + DROPDOWN */}
      <div className="grid grid-cols-2 gap-1.5">
        {/* Schema Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Esquema de Cores
          </label>
          <select
            value={selectedColorSchema}
            onChange={(e) => setSelectedColorSchema(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {COLOR_SCHEMAS.map((schema) => (
              <option key={schema.id} value={schema.id}>
                {schema.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color Dropdown */}
        <ColorDropdown
          value={getCurrentColorName()}
          onChange={(colorName) => {
            updateElement(element.id, {
              properties: { ...element.properties, color: COLOR_SCALES[colorName].medium },
            } as Partial<IconElement>);
          }}
          colors={(() => {
            const schema = COLOR_SCHEMAS.find(s => s.id === selectedColorSchema);
            const availableColors = schema ? schema.colors : Object.keys(COLOR_SCALES) as ColorScaleName[];
            return availableColors.filter(colorKey => COLOR_SCALES[colorKey]);
          })()}
          label="Cor"
        />
      </div>

      {/* Stroke Width */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-medium text-gray-700">Espessura</label>
          <span className="text-xs text-gray-500">{element.properties.strokeWidth || 2}px</span>
        </div>
        <input
          type="range"
          min="1"
          max="6"
          step="0.5"
          value={element.properties.strokeWidth || 2}
          onChange={(e) =>
            updateElement(element.id, {
              properties: { ...element.properties, strokeWidth: parseFloat(e.target.value) },
            } as Partial<IconElement>)
          }
          className="w-full h-1.5"
        />
      </div>

      {/* Icon & Favorites Pickers */}
      <div className="grid grid-cols-2 gap-2">
        {/* Icon Picker */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Ícone
          </label>
          <div className="relative">
            <button
              onClick={() => setIconPickerOpen(!iconPickerOpen)}
              className="w-full px-2 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {IconComponent && <IconComponent className="w-5 h-5" style={{ color: element.properties.color }} strokeWidth={element.properties.strokeWidth || 2} />}
                <span className="text-gray-700 truncate text-xs">{currentIcon?.label || 'Selecionar'}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${iconPickerOpen ? 'rotate-90' : ''}`} />
            </button>

            {iconPickerOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIconPickerOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1 max-h-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto z-20">
                  <div className="grid grid-cols-5 gap-1 p-2">
                    {iconLibrary.map((iconDef) => {
                      const Icon = iconDef.icon;
                      const isFavorite = favoriteIcons.includes(iconDef.id);
                      return (
                        <button
                          key={iconDef.id}
                          onClick={() => {
                            updateElement(element.id, {
                              properties: { ...element.properties, iconName: iconDef.id },
                            } as Partial<IconElement>);
                            setIconPickerOpen(false);
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            toggleFavoriteIcon(iconDef.id);
                          }}
                          className={`relative p-1.5 rounded hover:bg-gray-100 transition-colors flex justify-center items-center ${
                            element.properties.iconName === iconDef.id ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                          }`}
                          title={`${iconDef.label} (clique direito para favoritar)`}
                        >
                          {isFavorite && (
                            <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></div>
                          )}
                          <Icon className="w-5 h-5 flex-shrink-0" style={{ color: element.properties.color }} strokeWidth={element.properties.strokeWidth || 2} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Favorites Picker */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Favoritos
          </label>
          <div className="relative">
            <button
              onClick={() => setFavoritesPickerOpen(!favoritesPickerOpen)}
              className="w-full px-2 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors flex items-center justify-between"
              disabled={favoriteIcons.length === 0}
            >
              <span className="text-gray-700 text-xs truncate">
                {favoriteIcons.length === 0 ? 'Sem favoritos' : `${favoriteIcons.length} favoritos`}
              </span>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${favoritesPickerOpen ? 'rotate-90' : ''}`} />
            </button>

            {favoritesPickerOpen && favoriteIcons.length > 0 && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setFavoritesPickerOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1 max-h-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto z-20">
                  <div className="grid grid-cols-5 gap-1 p-2">
                    {iconLibrary.filter(iconDef => favoriteIcons.includes(iconDef.id)).map((iconDef) => {
                      const Icon = iconDef.icon;
                      return (
                        <button
                          key={iconDef.id}
                          onClick={() => {
                            updateElement(element.id, {
                              properties: { ...element.properties, iconName: iconDef.id },
                            } as Partial<IconElement>);
                            setFavoritesPickerOpen(false);
                          }}
                          className={`p-1.5 rounded hover:bg-gray-100 transition-colors flex justify-center items-center ${
                            element.properties.iconName === iconDef.id ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                          }`}
                          title={iconDef.label}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" style={{ color: element.properties.color }} strokeWidth={element.properties.strokeWidth || 2} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Shadow Controls */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-1.5">
          <label className="text-xs font-medium text-gray-700">
            Sombra
          </label>
          <input
            type="checkbox"
            checked={!!element.properties?.shadow}
            onChange={(e) => {
              if (e.target.checked) {
                updateElement(element.id, {
                  properties: {
                    ...element.properties,
                    shadow: {
                      blur: 2,
                      color: 'rgba(0, 0, 0, 0.5)',
                      offsetX: 2,
                      offsetY: 2,
                    },
                  } as Partial<IconElement>['properties'],
                });
              } else {
                const { shadow, ...restProperties } = element.properties;
                updateElement(element.id, {
                  properties: restProperties,
                } as Partial<IconElement>);
              }
            }}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <input
            type="color"
            value={element.properties?.shadow?.color.startsWith('rgba') ? '#000000' : (element.properties?.shadow?.color || '#000000')}
            onChange={(e) => {
              if (!element.properties?.shadow) return;
              const hex = e.target.value;
              const rgba = `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, 0.5)`;
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  shadow: {
                    ...element.properties.shadow,
                    color: rgba,
                  },
                } as Partial<IconElement>['properties'],
              });
            }}
            disabled={!element.properties?.shadow}
            className="w-8 h-6 rounded border border-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="text"
            value={element.properties?.shadow?.color.startsWith('rgba') ? '#000000' : (element.properties?.shadow?.color || '#000000')}
            onChange={(e) => {
              if (!element.properties?.shadow) return;
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  shadow: {
                    ...element.properties.shadow,
                    color: e.target.value,
                  },
                } as Partial<IconElement>['properties'],
              });
            }}
            onFocus={(e) => e.target.select()}
            disabled={!element.properties?.shadow}
            placeholder="#000000"
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          />
        </div>

        {element.properties?.shadow && (
          <div className="grid grid-cols-3 gap-1.5 pl-2">
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Desfoque</label>
                <span className="text-xs text-gray-500">{element.properties.shadow.blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.blur}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        blur: parseInt(e.target.value),
                      },
                    } as Partial<IconElement>['properties'],
                  })
                }
                className="w-full h-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Offset X</label>
                <span className="text-xs text-gray-500">{element.properties.shadow.offsetX}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.offsetX}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        offsetX: parseInt(e.target.value),
                      },
                    } as Partial<IconElement>['properties'],
                  })
                }
                className="w-full h-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Offset Y</label>
                <span className="text-xs text-gray-500">{element.properties.shadow.offsetY}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.offsetY}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        offsetY: parseInt(e.target.value),
                      },
                    } as Partial<IconElement>['properties'],
                  })
                }
                className="w-full h-1.5"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function TextProperties({ element }: { element: TextElement }) {
  const { updateElement } = useBuilderStore();

  return (
    <div className="space-y-2">
      {/* Content */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Conteúdo
        </label>
        <textarea
          value={element.properties.content}
          onChange={(e) =>
            updateElement(element.id, {
              properties: { ...element.properties, content: e.target.value },
            } as Partial<TextElement>)
          }
          onFocus={(e) => e.target.select()}
          className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          rows={2}
        />
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Fonte
        </label>
        <select
          value={element.properties.fontFamily}
          onChange={(e) =>
            updateElement(element.id, {
              properties: { ...element.properties, fontFamily: e.target.value },
            } as Partial<TextElement>)
          }
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{ fontFamily: getFontFamily(element.properties.fontFamily) }}
        >
          <optgroup label="Sans-serif">
            {getFontsByCategory('sans-serif').map((font) => (
              <option
                key={font.name}
                value={font.name}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Serif">
            {getFontsByCategory('serif').map((font) => (
              <option
                key={font.name}
                value={font.name}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Monospace">
            {getFontsByCategory('monospace').map((font) => (
              <option
                key={font.name}
                value={font.name}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Font Size & Weight */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Tamanho
          </label>
          <input
            type="number"
            value={element.properties.fontSize}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  fontSize: parseInt(e.target.value),
                },
              } as Partial<TextElement>)
            }
            onFocus={(e) => e.target.select()}
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Peso
          </label>
          <select
            value={element.properties.fontWeight}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fontWeight: e.target.value },
              } as Partial<TextElement>)
            }
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="bold">Negrito</option>
            <option value="600">Semi-bold</option>
            <option value="300">Light</option>
          </select>
        </div>
      </div>

      {/* Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<TextElement>)
            }
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<TextElement>)
            }
            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Text Align */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Alinhamento
        </label>
        <div className="flex gap-2">
          {['left', 'center', 'right', 'justify'].map((align) => (
            <button
              key={align}
              onClick={() =>
                updateElement(element.id, {
                  properties: {
                    ...element.properties,
                    textAlign: align as any,
                  },
                } as Partial<TextElement>)
              }
              className={`flex-1 px-2 py-1 text-xs font-medium rounded border transition-colors ${
                element.properties.textAlign === align
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {align === 'left' && 'Esq'}
              {align === 'center' && 'Centro'}
              {align === 'right' && 'Dir'}
              {align === 'justify' && 'Just'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShapeProperties({ element }: { element: ShapeElement }) {
  const { updateElement } = useBuilderStore();

  return (
    <div className="space-y-2">
      {/* Shape Type */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Forma
        </label>
        <select
          value={element.properties.shapeType}
          onChange={(e) =>
            updateElement(element.id, {
              properties: {
                ...element.properties,
                shapeType: e.target.value as any,
              },
            } as Partial<ShapeElement>)
          }
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="rectangle">Retângulo</option>
          <option value="circle">Círculo</option>
          <option value="triangle">Triângulo</option>
          <option value="line">Linha</option>
        </select>
      </div>

      {/* Fill Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor de Preenchimento
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<ShapeElement>)
            }
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<ShapeElement>)
            }
            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Stroke */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Borda
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.properties.stroke?.color || '#000000'}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  stroke: {
                    ...element.properties.stroke,
                    color: e.target.value,
                    width: element.properties.stroke?.width || 1,
                  },
                },
              } as Partial<ShapeElement>)
            }
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="number"
            value={element.properties.stroke?.width || 0}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  stroke: {
                    ...element.properties.stroke,
                    color: element.properties.stroke?.color || '#000000',
                    width: parseInt(e.target.value),
                  },
                },
              } as Partial<ShapeElement>)
            }
            onFocus={(e) => e.target.select()}
            placeholder="Largura"
            className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

function ImageProperties({ element }: { element: ImageElement }) {
  const { updateElement } = useBuilderStore();
  const { images } = useImageLibrary();
  const [showLibrary, setShowLibrary] = useState(false);

  const handleLibraryImageSelect = (imageSrc: string, width: number, height: number) => {
    updateElement(element.id, {
      width,
      height,
      properties: {
        ...element.properties,
        src: imageSrc,
      },
    } as Partial<ImageElement>);
    setShowLibrary(false);
  };

  return (
    <div className="space-y-2">
      {/* Image Library */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Escolher Imagem
        </label>
        <button
          onClick={() => setShowLibrary(!showLibrary)}
          className="w-full flex items-center justify-center gap-2 px-2 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          <PhotoIcon className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-xs text-gray-700">
            {showLibrary ? 'Fechar Biblioteca' : 'Abrir Biblioteca'}
          </span>
        </button>

        {showLibrary && (
          <div className="mt-1.5 grid grid-cols-3 gap-1.5 p-1.5 border border-gray-200 rounded max-h-48 overflow-y-auto">
            {images.length === 0 ? (
              <div className="col-span-3 text-center py-4 text-xs text-gray-500">
                Nenhuma imagem na biblioteca
              </div>
            ) : (
              images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => handleLibraryImageSelect(image.src, image.width, image.height)}
                  className="aspect-square rounded border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors bg-white"
                  title={image.name}
                >
                  <img
                    src={image.thumbnail}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Image Fit */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Ajuste
        </label>
        <select
          value={element.properties.fit}
          onChange={(e) =>
            updateElement(element.id, {
              properties: {
                ...element.properties,
                fit: e.target.value as 'cover' | 'contain' | 'fill' | 'none',
              },
            } as Partial<ImageElement>)
          }
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="cover">Preencher (Cover)</option>
          <option value="contain">Conter (Contain)</option>
          <option value="fill">Esticar (Fill)</option>
          <option value="none">Original</option>
        </select>
      </div>

      {/* Alpha Border (Moldura que respeita transparência PNG) */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-gray-700">
            Moldura PNG
          </label>
          <input
            type="checkbox"
            checked={element.properties.alphaBorder?.enabled || false}
            onChange={(e) =>
              updateElement(element.id, {
                properties: {
                  ...element.properties,
                  alphaBorder: {
                    enabled: e.target.checked,
                    size: element.properties.alphaBorder?.size || 5,
                    color: element.properties.alphaBorder?.color || '#000000',
                  },
                },
              } as Partial<ImageElement>)
            }
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        {element.properties.alphaBorder?.enabled && (
          <div className="space-y-1.5 pl-2 mt-1.5">
            {/* Border Size */}
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Espessura</label>
                <span className="text-xs text-gray-500">{element.properties.alphaBorder.size}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={element.properties.alphaBorder.size}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      alphaBorder: {
                        ...element.properties.alphaBorder!,
                        size: parseInt(e.target.value),
                      },
                    },
                  } as Partial<ImageElement>)
                }
                className="w-full h-1.5"
              />
            </div>

            {/* Border Color */}
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">
                Cor
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={element.properties.alphaBorder.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        alphaBorder: {
                          ...element.properties.alphaBorder!,
                          color: e.target.value,
                        },
                      },
                    } as Partial<ImageElement>)
                  }
                  className="w-10 h-7 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={element.properties.alphaBorder.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        alphaBorder: {
                          ...element.properties.alphaBorder!,
                          color: e.target.value,
                        },
                      },
                    } as Partial<ImageElement>)
                  }
                  className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 italic">
              ✨ A moldura segue o contorno da imagem PNG
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CommonProperties({ element }: { element: any }) {
  const { updateElement } = useBuilderStore();
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const aspectRatio = element.width / element.height;

  const handleWidthChange = (newWidth: number) => {
    if (aspectRatioLocked) {
      const newHeight = newWidth / aspectRatio;
      updateElement(element.id, { width: newWidth, height: newHeight });
    } else {
      updateElement(element.id, { width: newWidth });
    }
  };

  const handleHeightChange = (newHeight: number) => {
    if (aspectRatioLocked) {
      const newWidth = newHeight * aspectRatio;
      updateElement(element.id, { width: newWidth, height: newHeight });
    } else {
      updateElement(element.id, { height: newHeight });
    }
  };

  return (
    <div className="space-y-1.5">
      {/* Position - Label and inputs on same line */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-gray-700 w-16 flex-shrink-0">
          Posição
        </label>
        <input
          type="number"
          value={Math.round(element.x)}
          onChange={(e) =>
            updateElement(element.id, { x: parseInt(e.target.value) })
          }
          onFocus={(e) => e.target.select()}
          placeholder="X"
          className="w-16 px-1.5 py-0.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="number"
          value={Math.round(element.y)}
          onChange={(e) =>
            updateElement(element.id, { y: parseInt(e.target.value) })
          }
          onFocus={(e) => e.target.select()}
          placeholder="Y"
          className="w-16 px-1.5 py-0.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Size - Label, inputs, and lock on same line */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-gray-700 w-16 flex-shrink-0">
          Tamanho
        </label>
        <input
          type="number"
          value={Math.round(element.width)}
          onChange={(e) => handleWidthChange(parseInt(e.target.value))}
          onFocus={(e) => e.target.select()}
          placeholder="L"
          className="w-16 px-1.5 py-0.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="number"
          value={Math.round(element.height)}
          onChange={(e) => handleHeightChange(parseInt(e.target.value))}
          onFocus={(e) => e.target.select()}
          placeholder="A"
          className="w-16 px-1.5 py-0.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
          className={`p-0.5 rounded transition-colors flex-shrink-0 ${
            aspectRatioLocked
              ? 'bg-blue-50 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={aspectRatioLocked ? 'Desbloquear proporção' : 'Bloquear proporção'}
        >
          {aspectRatioLocked ? (
            <LockClosedIcon className="w-3 h-3" />
          ) : (
            <LockOpenIcon className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Rotation & Opacity - Labels and inputs on same line */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-gray-700 w-16 flex-shrink-0">
          Rotação
        </label>
        <input
          type="number"
          value={Math.round(element.rotation)}
          onChange={(e) =>
            updateElement(element.id, { rotation: parseInt(e.target.value) })
          }
          onFocus={(e) => e.target.select()}
          placeholder="°"
          className="w-16 px-1.5 py-0.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label className="text-xs font-medium text-gray-700 flex-shrink-0">
          Opacidade
        </label>
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          value={Math.round(element.opacity * 100)}
          onChange={(e) =>
            updateElement(element.id, { opacity: parseInt(e.target.value) / 100 })
          }
          onFocus={(e) => e.target.select()}
          placeholder="%"
          className="w-16 px-1.5 py-0.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

    </div>
  );
}

export function PropertiesPanel() {
  const selectedElement = useSelectedElement();
  const { deleteElement, duplicateElement, currentPageId, updatePageBackground, pages } = useBuilderStore();
  const { images } = useImageLibrary();
  const [showBgLibrary, setShowBgLibrary] = useState(false);
  const [selectedColorSchema, setSelectedColorSchema] = useState('todas');
  const [selectedColor, setSelectedColor] = useState<ColorScaleName>('ivoryWhite');
  const currentPage = pages.find(p => p.id === currentPageId);

  if (!selectedElement) {
    const bg = currentPage?.background;
    const isObject = typeof bg === 'object';
    const bgType = isObject ? bg.type : 'color';
    const bgColor = isObject && bg.color ? bg.color : (typeof bg === 'string' ? bg : '#FFFFFF');
    const bgImage = isObject && bg.image ? bg.image : '';
    const bgOpacity = isObject && bg.opacity !== undefined ? bg.opacity : 1;

    return (
      <div className="h-full flex flex-col">
        <div className="p-2 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Fundo da Página</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {/* Background Type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tipo de Fundo
            </label>
            <select
              value={bgType}
              onChange={(e) => {
                const type = e.target.value as 'color' | 'image';
                if (type === 'color') {
                  updatePageBackground(currentPageId, {
                    type: 'color',
                    color: bgColor,
                    opacity: bgOpacity,
                  });
                } else {
                  updatePageBackground(currentPageId, {
                    type: 'image',
                    image: bgImage || '',
                    opacity: bgOpacity,
                  });
                }
              }}
              className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="color">Cor Sólida</option>
              <option value="image">Imagem</option>
            </select>
          </div>

          {/* Color Background */}
          {bgType === 'color' && (
            <div className="grid grid-cols-2 gap-1.5">
              {/* Schema Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Esquema de Cores
                </label>
                <select
                  value={selectedColorSchema}
                  onChange={(e) => setSelectedColorSchema(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {COLOR_SCHEMAS.map((schema) => (
                    <option key={schema.id} value={schema.id}>
                      {schema.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Dropdown */}
              <ColorDropdown
                value={selectedColor}
                onChange={(colorName) => {
                  setSelectedColor(colorName);
                  updatePageBackground(currentPageId, {
                    type: 'color',
                    color: COLOR_SCALES[colorName].medium,
                    opacity: bgOpacity,
                  });
                }}
                colors={(() => {
                  const schema = COLOR_SCHEMAS.find(s => s.id === selectedColorSchema);
                  const availableColors = schema ? schema.colors : Object.keys(COLOR_SCALES) as ColorScaleName[];
                  return availableColors.filter(colorKey => COLOR_SCALES[colorKey]);
                })()}
                label="Cor"
              />
            </div>
          )}

          {/* Image Background */}
          {bgType === 'image' && (
            <div className="space-y-2">
              {/* Image Library */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Escolher Imagem
                </label>
                <button
                  onClick={() => setShowBgLibrary(!showBgLibrary)}
                  className="w-full flex items-center justify-center gap-2 px-2 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  <PhotoIcon className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs text-gray-700">
                    {showBgLibrary ? 'Fechar Biblioteca' : 'Abrir Biblioteca'}
                  </span>
                </button>

                {showBgLibrary && (
                  <div className="mt-1.5 grid grid-cols-3 gap-1.5 p-1.5 border border-gray-200 rounded max-h-48 overflow-y-auto">
                    {images.length === 0 ? (
                      <div className="col-span-3 text-center py-4 text-xs text-gray-500">
                        Nenhuma imagem na biblioteca
                      </div>
                    ) : (
                      images.map((image) => (
                        <button
                          key={image.id}
                          onClick={() => {
                            updatePageBackground(currentPageId, {
                              type: 'image',
                              image: image.src,
                              opacity: bgOpacity,
                            });
                            setShowBgLibrary(false);
                          }}
                          className="aspect-square rounded border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors bg-white"
                          title={image.name}
                        >
                          <img
                            src={image.thumbnail}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Opacity */}
          <div>
            <div className="flex justify-between items-center mb-0.5">
              <label className="text-xs font-medium text-gray-700">
                Opacidade
              </label>
              <span className="text-xs text-gray-500">{Math.round(bgOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={bgOpacity * 100}
              onChange={(e) => {
                const opacity = parseInt(e.target.value) / 100;
                if (bgType === 'color') {
                  updatePageBackground(currentPageId, {
                    type: 'color',
                    color: bgColor,
                    opacity,
                  });
                } else {
                  updatePageBackground(currentPageId, {
                    type: 'image',
                    image: bgImage,
                    opacity,
                  });
                }
              }}
              className="w-full h-1.5"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-2 py-1 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-900">Propriedades</h3>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded">
              {selectedElement.type === 'text' && 'Texto'}
              {selectedElement.type === 'image' && 'Imagem'}
              {selectedElement.type === 'shape' && 'Forma'}
              {selectedElement.type === 'icon' && 'Ícone'}
              {selectedElement.type === 'chart' && 'Gráfico'}
              {selectedElement.type === 'form' && 'Forma'}
              {selectedElement.type === 'frame' && 'Moldura'}
              {selectedElement.type === 'video' && 'Vídeo'}
              {selectedElement.type === 'bullet' && 'Bullet'}
            </span>
            <span className="text-[10px] text-gray-500">
              {selectedElement.id.slice(0, 8)}...
            </span>
            <button
              onClick={() => duplicateElement(selectedElement.id)}
              className="p-0.5 rounded hover:bg-gray-100 transition-colors"
              title="Duplicar"
            >
              <DocumentDuplicateIcon className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="p-0.5 rounded hover:bg-red-50 transition-colors"
              title="Excluir"
            >
              <TrashIcon className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {/* Element-specific properties */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-gray-200">
            <PaintBrushIcon className="w-3 h-3 text-gray-500" />
            <h4 className="text-xs font-semibold text-gray-700">Aparência</h4>
          </div>
          {selectedElement.type === 'text' && (
            <TextProperties element={selectedElement as TextElement} />
          )}
          {selectedElement.type === 'shape' && (
            <ShapeProperties element={selectedElement as ShapeElement} />
          )}
          {selectedElement.type === 'image' && (
            <ImageProperties element={selectedElement as ImageElement} />
          )}
          {selectedElement.type === 'form' && (
            <FormProperties element={selectedElement as FormElement} />
          )}
          {selectedElement.type === 'frame' && (
            <FrameProperties element={selectedElement as FrameElement} />
          )}
          {selectedElement.type === 'icon' && (
            <IconProperties element={selectedElement as IconElement} />
          )}
          {selectedElement.type === 'video' && (
            <VideoProperties element={selectedElement as VideoElement} />
          )}
          {selectedElement.type === 'bullet' && (
            <BulletProperties element={selectedElement as BulletElement} />
          )}
        </div>

{/* Common properties */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-gray-200">
            <SwatchIcon className="w-3 h-3 text-gray-500" />
            <h4 className="text-xs font-semibold text-gray-700">Transformação</h4>
          </div>
          <CommonProperties element={selectedElement} />
        </div>
      </div>
    </div>
  );
}
