#!/usr/bin/env python3
"""
Update Icons & Forms session:
1. Remove 'elementos disponíveis' count
2. Move Rectangle and Circle to 'Todos os Ícones' section
3. Rename 'Formas Básicas' to 'Favoritos'
4. Implement star icon for favorites functionality
"""

# Read the file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the elementos disponíveis line
old_header = """      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
          Ícones & Formas
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {filteredIcons.length + (showShapes ? shapesLibrary.length : 0)} elementos disponíveis
        </p>
      </div>"""

new_header = """      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
          Ícones & Formas
        </h3>
      </div>"""

content = content.replace(old_header, new_header)

# 2. Add Star import to Lucide imports
old_imports = """  // Decorative
  Sparkles,
  Flame,
  Zap as Lightning,
  Crown,
  Tag,
  Search,
} from 'lucide-react';"""

new_imports = """  // Decorative
  Sparkles,
  Flame,
  Zap as Lightning,
  Crown,
  Tag,
  Search,
  Star as StarIcon,
} from 'lucide-react';"""

content = content.replace(old_imports, new_imports)

# 3. Add useState for favorites after other state hooks
old_state = """export function IconsSessionEnhanced() {
  const { addElement, currentPage } = useBuilderStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSize, setIconSize] = useState(48);
  const [iconColor, setIconColor] = useState('#3B82F6');"""

new_state = """export function IconsSessionEnhanced() {
  const { addElement, currentPage } = useBuilderStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSize, setIconSize] = useState(48);
  const [iconColor, setIconColor] = useState('#3B82F6');
  const [favorites, setFavorites] = useState<string[]>([]);"""

content = content.replace(old_state, new_state)

# 4. Add Rectangle and Circle as icons to iconLibrary (after decorative section)
old_icon_library_end = """  { id: 'tag', category: 'decorative', label: 'Etiqueta', icon: Tag, tags: ['tag', 'etiqueta', 'marcador'], defaultColor: '#6366F1' },
];"""

new_icon_library_end = """  { id: 'tag', category: 'decorative', label: 'Etiqueta', icon: Tag, tags: ['tag', 'etiqueta', 'marcador'], defaultColor: '#6366F1' },

  // Shapes (as icons)
  { id: 'rectangle', category: 'shapes', label: 'Retângulo', icon: Square, tags: ['retângulo', 'quadrado', 'forma'], defaultColor: '#3B82F6' },
  { id: 'circle', category: 'shapes', label: 'Círculo', icon: Circle, tags: ['círculo', 'forma', 'redondo'], defaultColor: '#10B981' },
];"""

content = content.replace(old_icon_library_end, new_icon_library_end)

# 5. Rename "Formas Básicas" to "Favoritos"
content = content.replace(
    '<h4 className="text-xs font-semibold text-gray-700 mb-2">Formas Básicas</h4>',
    '<h4 className="text-xs font-semibold text-gray-700 mb-2">Favoritos</h4>'
)

# 6. Replace shapes section with favorites section showing starred icons
old_shapes_section = """        {/* Shapes Section */}
        {showShapes && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Favoritos</h4>
            <div className="grid grid-cols-3 gap-2">
              {shapesLibrary.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleInsertShape(shape)}
                  className="
                    p-3 rounded-lg border border-gray-200 bg-white
                    hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm
                    transition-all duration-150 flex flex-col items-center gap-1.5
                  "
                  style={{ color: iconColor }}
                >
                  {shape.icon}
                  <span className="text-xs font-medium text-gray-700">{shape.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}"""

new_favorites_section = """        {/* Favorites Section */}
        {showShapes && favorites.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Favoritos</h4>
            <div className="grid grid-cols-3 gap-2">
              {iconLibrary.filter(icon => favorites.includes(icon.id)).map((iconDef) => {
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
                        setFavorites(favorites.filter(id => id !== iconDef.id));
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
                      style={{ color: iconColor }}
                    />
                    <span className="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-2">
                      {iconDef.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}"""

content = content.replace(old_shapes_section, new_favorites_section)

# 7. Add star icon to all icon cards for toggling favorites
old_icon_button = """                    <button
                      key={iconDef.id}
                      onClick={() => handleInsertIcon(iconDef)}
                      className="
                        p-2 rounded-lg border border-gray-200 bg-white
                        hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm
                        transition-all duration-150 flex flex-col items-center gap-1
                        group
                      "
                      title={iconDef.label}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        strokeWidth={2.5}
                        style={{ color: iconColor }}
                      />
                      <span className="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-2">
                        {iconDef.label}
                      </span>
                    </button>"""

new_icon_button = """                    <button
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
                          if (favorites.includes(iconDef.id)) {
                            setFavorites(favorites.filter(id => id !== iconDef.id));
                          } else {
                            setFavorites([...favorites, iconDef.id]);
                          }
                        }}
                        className="absolute top-1 right-1 p-0.5 rounded hover:bg-yellow-100 transition-colors"
                      >
                        <StarIcon
                          className={`w-3 h-3 ${favorites.includes(iconDef.id) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          strokeWidth={2}
                        />
                      </button>
                      <IconComponent
                        className="w-6 h-6"
                        strokeWidth={2.5}
                        style={{ color: iconColor }}
                      />
                      <span className="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-2">
                        {iconDef.label}
                      </span>
                    </button>"""

content = content.replace(old_icon_button, new_icon_button)

# Write updated file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Icons & Forms session updated:")
print("✓ Removed 'elementos disponíveis' count")
print("✓ Moved Rectangle and Circle to icon library")
print("✓ Renamed 'Formas Básicas' to 'Favoritos'")
print("✓ Implemented star icon for favorites functionality")
