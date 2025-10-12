#!/usr/bin/env python3
"""
Add Favoritos dropdown next to Ícone dropdown in Properties Panel
"""

# Read the file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where IconProperties component is defined and add favorites state
old_icon_properties_start = """const IconProperties = ({ element }: { element: IconElement }) => {
  const { updateElement } = useBuilderStore();
  const [iconPickerOpen, setIconPickerOpen] = useState(false);"""

new_icon_properties_start = """const IconProperties = ({ element }: { element: IconElement }) => {
  const { updateElement } = useBuilderStore();
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [favoritesPickerOpen, setFavoritesPickerOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);"""

# Replace the Icon Picker section to add Favoritos dropdown next to it
old_icon_picker = """      {/* Icon Picker */}
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
      </div>"""

new_icon_picker = """      {/* Icon & Favorites Pickers */}
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
                  <div className="grid grid-cols-4 gap-1 p-2">
                    {iconLibrary.map((iconDef) => {
                      const Icon = iconDef.icon;
                      const isFavorite = favorites.includes(iconDef.id);
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
                            if (isFavorite) {
                              setFavorites(favorites.filter(id => id !== iconDef.id));
                            } else {
                              setFavorites([...favorites, iconDef.id]);
                            }
                          }}
                          className={`relative p-2 rounded hover:bg-gray-100 transition-colors ${
                            element.properties.iconName === iconDef.id ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                          }`}
                          title={`${iconDef.label} (clique direito para favoritar)`}
                        >
                          {isFavorite && (
                            <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></div>
                          )}
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

        {/* Favorites Picker */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Favoritos
          </label>
          <div className="relative">
            <button
              onClick={() => setFavoritesPickerOpen(!favoritesPickerOpen)}
              className="w-full px-2 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors flex items-center justify-between"
              disabled={favorites.length === 0}
            >
              <span className="text-gray-700 text-xs truncate">
                {favorites.length === 0 ? 'Sem favoritos' : `${favorites.length} favoritos`}
              </span>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${favoritesPickerOpen ? 'rotate-90' : ''}`} />
            </button>

            {favoritesPickerOpen && favorites.length > 0 && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setFavoritesPickerOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1 max-h-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto z-20">
                  <div className="grid grid-cols-4 gap-1 p-2">
                    {iconLibrary.filter(iconDef => favorites.includes(iconDef.id)).map((iconDef) => {
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
      </div>"""

content = content.replace(old_icon_properties_start, new_icon_properties_start)
content = content.replace(old_icon_picker, new_icon_picker)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Favoritos dropdown next to Icone dropdown in Properties Panel")
