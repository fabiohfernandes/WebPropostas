#!/usr/bin/env python3
"""
Update PropertiesPanel and IconsSessionEnhanced to use shared favorites from store
"""

# Update PropertiesPanel.tsx
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    properties_content = f.read()

# Remove local favorites state and use store instead
old_properties_state = """function IconProperties({ element }: { element: IconElement }) {
  const { updateElement } = useBuilderStore();
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [favoritesPickerOpen, setFavoritesPickerOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);"""

new_properties_state = """function IconProperties({ element }: { element: IconElement }) {
  const { updateElement, favoriteIcons, toggleFavoriteIcon } = useBuilderStore();
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [favoritesPickerOpen, setFavoritesPickerOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);"""

# Update favorites references in PropertiesPanel
properties_content = properties_content.replace(old_properties_state, new_properties_state)
properties_content = properties_content.replace('const isFavorite = favorites.includes(iconDef.id);', 'const isFavorite = favoriteIcons.includes(iconDef.id);')
properties_content = properties_content.replace('if (isFavorite) {\n                              setFavorites(favorites.filter(id => id !== iconDef.id));\n                            } else {\n                              setFavorites([...favorites, iconDef.id]);\n                            }', 'toggleFavoriteIcon(iconDef.id);')
properties_content = properties_content.replace('disabled={favorites.length === 0}', 'disabled={favoriteIcons.length === 0}')
properties_content = properties_content.replace('{favorites.length === 0 ? \'Sem favoritos\' : `${favorites.length} favoritos`}', '{favoriteIcons.length === 0 ? \'Sem favoritos\' : `${favoriteIcons.length} favoritos`}')
properties_content = properties_content.replace('{favoritesPickerOpen && favorites.length > 0 && (', '{favoritesPickerOpen && favoriteIcons.length > 0 && (')
properties_content = properties_content.replace('{iconLibrary.filter(iconDef => favorites.includes(iconDef.id)).map((iconDef) => {', '{iconLibrary.filter(iconDef => favoriteIcons.includes(iconDef.id)).map((iconDef) => {')

with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(properties_content)

# Update IconsSessionEnhanced.tsx
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'r', encoding='utf-8') as f:
    icons_content = f.read()

# Remove local favorites state and use store instead
old_icons_state = """export function IconsSessionEnhanced() {
  const { addElement, currentPage } = useBuilderStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSize, setIconSize] = useState(48);
  const [iconColor, setIconColor] = useState('#3B82F6');
  const [favorites, setFavorites] = useState<string[]>([]);"""

new_icons_state = """export function IconsSessionEnhanced() {
  const { addElement, currentPage, favoriteIcons, toggleFavoriteIcon } = useBuilderStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSize, setIconSize] = useState(48);
  const [iconColor, setIconColor] = useState('#3B82F6');"""

# Update favorites references in IconsSessionEnhanced
icons_content = icons_content.replace(old_icons_state, new_icons_state)
icons_content = icons_content.replace('return favorites.includes(icon.id);', 'return favoriteIcons.includes(icon.id);')
icons_content = icons_content.replace('favorites.includes(iconDef.id)', 'favoriteIcons.includes(iconDef.id)')
icons_content = icons_content.replace('setFavorites(favorites.filter(id => id !== iconDef.id));', 'toggleFavoriteIcon(iconDef.id);')
icons_content = icons_content.replace('setFavorites([...favorites, iconDef.id]);', 'toggleFavoriteIcon(iconDef.id);')

with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'w', encoding='utf-8') as f:
    f.write(icons_content)

print("Updated PropertiesPanel and IconsSessionEnhanced to use shared favorites")
