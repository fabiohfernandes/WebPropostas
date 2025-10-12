#!/usr/bin/env python3
"""
Update shadow color picker:
- Remove conditional (always visible)
- Add hex input box next to color picker
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the shadow title line with color picker
old_section = """        <div className="flex items-center gap-2 mb-1.5">
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
          {element.properties?.shadow && (
            <>
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
                    } as Partial<IconElement>['properties'],
                  });
                }}
                className="ml-auto w-8 h-6 rounded border border-gray-200 cursor-pointer"
              />
            </>
          )}
        </div>"""

new_section = """        <div className="flex items-center gap-2 mb-1.5">
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
            value={element.properties?.shadow?.color || 'rgba(0, 0, 0, 0.5)'}
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
            disabled={!element.properties?.shadow}
            placeholder="rgba(0, 0, 0, 0.5)"
            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          />
        </div>"""

content = content.replace(old_section, new_section)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Shadow color picker updated:")
print("- Color picker always visible (disabled when shadow off)")
print("- Hex/rgba input box added next to color picker")
print("- Both on same line with Sombra label and checkbox")
