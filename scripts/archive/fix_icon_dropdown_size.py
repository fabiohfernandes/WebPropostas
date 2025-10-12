#!/usr/bin/env python3
"""
Fix icon dropdown: reduce icon size and increase grid columns
"""

# Read the file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Icon Picker dropdown - reduce size and increase columns
old_icon_grid = """                <div className="absolute top-full left-0 right-0 mt-1 max-h-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto z-20">
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
                </div>"""

new_icon_grid = """                <div className="absolute top-full left-0 right-0 mt-1 max-h-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto z-20">
                  <div className="grid grid-cols-5 gap-1 p-2">
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
                          className={`relative p-1.5 rounded hover:bg-gray-100 transition-colors ${
                            element.properties.iconName === iconDef.id ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                          }`}
                          title={`${iconDef.label} (clique direito para favoritar)`}
                        >
                          {isFavorite && (
                            <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></div>
                          )}
                          <Icon className="w-4 h-4 mx-auto" style={{ color: element.properties.color }} strokeWidth={element.properties.strokeWidth || 2} />
                        </button>
                      );
                    })}
                  </div>
                </div>"""

# Fix Favorites Picker dropdown - reduce size and increase columns
old_favorites_grid = """                <div className="absolute top-full left-0 right-0 mt-1 max-h-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto z-20">
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
                </div>"""

new_favorites_grid = """                <div className="absolute top-full left-0 right-0 mt-1 max-h-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto z-20">
                  <div className="grid grid-cols-5 gap-1 p-2">
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
                          className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${
                            element.properties.iconName === iconDef.id ? 'bg-blue-50 ring-2 ring-blue-500' : ''
                          }`}
                          title={iconDef.label}
                        >
                          <Icon className="w-4 h-4 mx-auto" style={{ color: element.properties.color }} strokeWidth={element.properties.strokeWidth || 2} />
                        </button>
                      );
                    })}
                  </div>
                </div>"""

content = content.replace(old_icon_grid, new_icon_grid)
content = content.replace(old_favorites_grid, new_favorites_grid)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed icon dropdown size and grid layout")
