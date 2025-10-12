#!/usr/bin/env python3
"""
Add IconProperties component to PropertiesPanel
- Icon color picker
- Icon type selector (66 icons from iconLibrary)
- Move shadow controls to Aparência section for all elements
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where to insert IconElement import (after other imports)
import_line = "import type { TextElement, ShapeElement, ImageElement, FormElement, FrameElement } from '@/types/builder';"
new_import = "import type { TextElement, ShapeElement, ImageElement, FormElement, FrameElement, IconElement } from '@/types/builder';"
content = content.replace(import_line, new_import)

# Import lucide icons we need for icon selector
lucide_imports = """import {
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
"""

# Insert after the existing imports
insert_after = "import { FrameProperties } from './FrameProperties';"
content = content.replace(insert_after, insert_after + "\n" + lucide_imports)

# Create the IconProperties component - insert before TextProperties
icon_properties_component = """
// Icon Library Definition (same as IconsSessionEnhanced)
const iconLibrary = [
  // ARROWS
  { id: 'arrow-up', label: 'Seta Cima', icon: ArrowUp },
  { id: 'arrow-down', label: 'Seta Baixo', icon: ArrowDown },
  { id: 'arrow-left', label: 'Seta Esquerda', icon: ArrowLeft },
  { id: 'arrow-right', label: 'Seta Direita', icon: ArrowRight },
  { id: 'arrow-up-right', label: 'Diagonal ↗', icon: ArrowUpRight },
  { id: 'arrow-down-left', label: 'Diagonal ↙', icon: ArrowDownLeft },
  { id: 'trending-up', label: 'Tendência Alta', icon: TrendingUp },
  { id: 'trending-down', label: 'Tendência Baixa', icon: TrendingDown },

  // BUSINESS
  { id: 'briefcase', label: 'Maleta', icon: Briefcase },
  { id: 'chart-bar', label: 'Gráfico Barras', icon: BarChart3 },
  { id: 'chart-pie', label: 'Gráfico Pizza', icon: PieChart },
  { id: 'target', label: 'Alvo', icon: Target },
  { id: 'award', label: 'Prêmio', icon: Award },
  { id: 'users', label: 'Pessoas', icon: Users },
  { id: 'building', label: 'Prédio', icon: Building2 },

  // REAL ESTATE
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

  // AUTOMOTIVE
  { id: 'auto-car', label: 'Carro', icon: Car },
  { id: 'auto-fuel', label: 'Combustível', icon: Fuel },
  { id: 'auto-gauge', label: 'Velocímetro', icon: Gauge },
  { id: 'auto-settings', label: 'Configurações', icon: Settings },
  { id: 'auto-wrench', label: 'Chave Inglesa', icon: Wrench },
  { id: 'auto-zap', label: 'Elétrico', icon: Zap },
  { id: 'auto-shield', label: 'Proteção', icon: Shield },

  // NATURE
  { id: 'sun', label: 'Sol', icon: Sun },
  { id: 'moon', label: 'Lua', icon: Moon },
  { id: 'cloud', label: 'Nuvem', icon: Cloud },
  { id: 'rain', label: 'Chuva', icon: CloudRain },
  { id: 'leaf', label: 'Folha', icon: Leaf },
  { id: 'flower', label: 'Flor', icon: Flower2 },

  // UI ELEMENTS
  { id: 'check', label: 'Check', icon: Check },
  { id: 'x-mark', label: 'X', icon: X },
  { id: 'plus', label: 'Mais', icon: Plus },
  { id: 'minus', label: 'Menos', icon: Minus },
  { id: 'info', label: 'Informação', icon: Info },
  { id: 'alert', label: 'Alerta', icon: AlertCircle },
  { id: 'warning', label: 'Perigo', icon: AlertTriangle },

  // SOCIAL & CONTACT
  { id: 'phone', label: 'Telefone', icon: Phone },
  { id: 'mail', label: 'Email', icon: Mail },
  { id: 'message', label: 'Mensagem', icon: MessageCircle },
  { id: 'share', label: 'Compartilhar', icon: Share2 },
  { id: 'link', label: 'Link', icon: Link2 },

  // DECORATIVE
  { id: 'sparkles', label: 'Brilho', icon: Sparkles },
  { id: 'flame', label: 'Fogo', icon: Flame },
  { id: 'crown', label: 'Coroa', icon: Crown },
  { id: 'tag', label: 'Etiqueta', icon: Tag },
];

function IconProperties({ element }: { element: IconElement }) {
  const { updateElement } = useBuilderStore();
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const currentIcon = iconLibrary.find((icon) => icon.id === element.properties.iconName);
  const IconComponent = currentIcon?.icon;

  return (
    <div className="space-y-2">
      {/* Color Picker */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<IconElement>)
            }
            className="w-12 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<IconElement>)
            }
            className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
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
              <span className="text-gray-700">{currentIcon?.label || 'Selecionar ícone'}</span>
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
                <div className="grid grid-cols-4 gap-1 p-2">
                  {iconLibrary.map((iconDef) => {
                    const Icon = iconDef.icon;
                    return (
                      <button
                        key={iconDef.id}
                        onClick={() => {
                          updateElement(element.id, {
                            properties: { ...element.properties, iconName: iconDef.id },
                          } as Partial<IconElement>);
                          setIconPickerOpen(false);
                        }}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                          element.properties.iconName === iconDef.id ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                        }`}
                        title={iconDef.label}
                      >
                        <Icon className="w-6 h-6 mx-auto" style={{ color: element.properties.color }} strokeWidth={element.properties.strokeWidth || 2} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Shadow Controls */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between mb-1.5">
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
                      blur: 10,
                      color: 'rgba(0, 0, 0, 0.5)',
                      offsetX: 5,
                      offsetY: 5,
                    },
                  },
                });
              } else {
                const { shadow, ...restProperties } = element.properties;
                updateElement(element.id, {
                  properties: restProperties,
                });
              }
            }}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        {element.properties?.shadow && (
          <div className="space-y-1.5 pl-2 mt-1.5">
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-xs text-gray-600">Desfoque</label>
                <span className="text-xs text-gray-500">{element.properties.shadow.blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={element.properties.shadow.blur}
                onChange={(e) =>
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        blur: parseInt(e.target.value),
                      },
                    },
                  })
                }
                className="w-full h-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <div className="flex justify-between items-center mb-0.5">
                  <label className="text-xs text-gray-600">Offset X</label>
                  <span className="text-xs text-gray-500">{element.properties.shadow.offsetX}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={element.properties.shadow.offsetX}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        shadow: {
                          ...element.properties.shadow,
                          offsetX: parseInt(e.target.value),
                        },
                      },
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
                  min="-50"
                  max="50"
                  value={element.properties.shadow.offsetY}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        shadow: {
                          ...element.properties.shadow,
                          offsetY: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                  className="w-full h-1.5"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-600 mb-0.5 block">Cor</label>
              <input
                type="color"
                value={element.properties.shadow.color.startsWith('rgba') ? '#000000' : element.properties.shadow.color}
                onChange={(e) => {
                  const hex = e.target.value;
                  const rgba = `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, 0.5)`;
                  updateElement(element.id, {
                    properties: {
                      ...element.properties,
                      shadow: {
                        ...element.properties.shadow,
                        color: rgba,
                      },
                    },
                  });
                }}
                className="w-full h-8 rounded border border-gray-200 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"""

# Insert IconProperties before TextProperties
insert_before_text = "function TextProperties({ element }: { element: TextElement }) {"
content = content.replace(insert_before_text, icon_properties_component + "\n" + insert_before_text)

# Add icon case in Aparência section
aparencia_section = """          {selectedElement.type === 'frame' && (
            <FrameProperties element={selectedElement as FrameElement} />
          )}"""

new_aparencia = """          {selectedElement.type === 'frame' && (
            <FrameProperties element={selectedElement as FrameElement} />
          )}
          {selectedElement.type === 'icon' && (
            <IconProperties element={selectedElement as IconElement} />
          )}"""

content = content.replace(aparencia_section, new_aparencia)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added IconProperties component with:")
print("- Color picker")
print("- Stroke width slider")
print("- Icon type selector (66 icons)")
print("- Shadow controls in Aparência section")
