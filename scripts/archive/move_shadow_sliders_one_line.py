#!/usr/bin/env python3
"""
Move all three shadow sliders to the same line (grid-cols-3)
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the shadow sliders section
old_sliders = """          <div className="space-y-1.5 pl-2 mt-1.5">
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
            </div>"""

new_sliders = """          <div className="space-y-1.5 pl-2 mt-1.5">
            <div className="grid grid-cols-3 gap-1.5">
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
            </div>"""

content = content.replace(old_sliders, new_sliders)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Shadow sliders layout updated:")
print("- All three sliders (Desfoque, Offset X, Offset Y) now on same line")
print("- Grid with 3 equal columns")
