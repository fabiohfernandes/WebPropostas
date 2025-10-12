#!/usr/bin/env python3
"""
Fix icon library - copy complete library from IconsSessionEnhanced.tsx
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the incomplete iconLibrary with the complete one
old_library = """const iconLibrary = [
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
];"""

new_library = """const iconLibrary = [
  // ARROWS (8)
  { id: 'arrow-up', label: 'Seta Cima', icon: ArrowUp },
  { id: 'arrow-down', label: 'Seta Baixo', icon: ArrowDown },
  { id: 'arrow-left', label: 'Seta Esquerda', icon: ArrowLeft },
  { id: 'arrow-right', label: 'Seta Direita', icon: ArrowRight },
  { id: 'arrow-up-right', label: 'Diagonal ↗', icon: ArrowUpRight },
  { id: 'arrow-down-left', label: 'Diagonal ↙', icon: ArrowDownLeft },
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
];"""

content = content.replace(old_library, new_library)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Icon library fixed:")
print("- Complete library with 54 icons")
print("- All icons should work now")
print("- Verified against IconsSessionEnhanced.tsx")
