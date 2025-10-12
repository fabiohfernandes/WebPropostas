#!/usr/bin/env python3
"""
Add Favoritos option to categories and update filtering logic
"""

# Read the file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update categories array to include Favoritos at the beginning
old_categories = """const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'shapes', label: 'Formas' },
  { id: 'arrows', label: 'Setas' },
  { id: 'business', label: 'Negócios' },
  { id: 'real-estate', label: 'Imóveis' },
  { id: 'automotive', label: 'Veículos' },
  { id: 'nature', label: 'Natureza' },
  { id: 'ui', label: 'UI' },
  { id: 'contact', label: 'Contato' },
  { id: 'decorative', label: 'Decorativo' },
];"""

new_categories = """const categories = [
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
];"""

# Update filtering logic to handle favorites
old_filter = """  // Filter icons
  const filteredIcons = iconLibrary.filter((icon) => {
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
  const showIcons = selectedCategory !== 'shapes';"""

new_filter = """  // Filter icons
  const filteredIcons = iconLibrary.filter((icon) => {
    // If favorites selected, only show favorited icons
    if (selectedCategory === 'favorites') {
      return favorites.includes(icon.id);
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
  const showOnlyFavorites = selectedCategory === 'favorites';"""

# Remove the old Favorites Section since it will be integrated into main flow
old_favorites_section = """        {/* Favorites Section */}
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
                    className="group relative flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
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
                      style={{ color: iconDef.defaultColor }}
                      strokeWidth={2.5}
                    />
                    <span className="text-[10px] text-gray-600 text-center leading-tight">
                      {iconDef.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* All Icons Section */}"""

new_favorites_section = """        {/* Icons Section */}"""

content = content.replace(old_categories, new_categories)
content = content.replace(old_filter, new_filter)
content = content.replace(old_favorites_section, new_favorites_section)

# Write updated file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Favoritos to dropdown and updated filtering logic")
