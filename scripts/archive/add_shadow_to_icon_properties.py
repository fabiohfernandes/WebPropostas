#!/usr/bin/env python3
"""
Add shadow section back to IconProperties
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the end of Icon Picker section and add shadow before closing IconProperties
icon_picker_end = """        </div>
      </div>

    </div>
  );
}


function TextProperties({ element }: { element: TextElement }) {"""

# Add shadow section
icon_picker_with_shadow = """        </div>
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
                    } as Partial<IconElement>['properties'],
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
                      } as Partial<IconElement>['properties'],
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
                    } as Partial<IconElement>['properties'],
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


function TextProperties({ element }: { element: TextElement }) {"""

content = content.replace(icon_picker_end, icon_picker_with_shadow)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Shadow section added to IconProperties:")
print("- Shadow controls now in Aparência section")
print("- Appears after Icon Picker")
