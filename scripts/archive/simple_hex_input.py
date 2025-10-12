#!/usr/bin/env python3
"""
Simple solution:
- Color button
- Hex input box (when visible)
- Espessura slider
All in a row, no complicated positioning
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the entire color picker section with simple layout
old_section = """      {/* Color Picker and Stroke Width */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor
        </label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={element.properties.color}
              onChange={(e) =>
                updateElement(element.id, {
                  properties: { ...element.properties, color: e.target.value },
                } as Partial<IconElement>)
              }
              onClick={(e) => {
                if (colorDropdownOpen) {
                  e.preventDefault();
                  e.stopPropagation();
                }
                setColorDropdownOpen(!colorDropdownOpen);
              }}
              className="w-12 h-8 rounded border border-gray-200 cursor-pointer"
            />
            {colorDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-[9999]"
                  onClick={() => setColorDropdownOpen(false)}
                  style={{ background: 'transparent' }}
                />
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-[10000] w-48">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Código Hexadecimal
                  </label>
                  <input
                    type="text"
                    value={element.properties.color}
                    onChange={(e) =>
                      updateElement(element.id, {
                        properties: { ...element.properties, color: e.target.value },
                      } as Partial<IconElement>)
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="#000000"
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex-1">
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
        </div>
      </div>"""

new_section = """      {/* Color Picker and Stroke Width */}
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
            onClick={(e) => {
              if (colorDropdownOpen) {
                e.preventDefault();
                e.stopPropagation();
              }
              setColorDropdownOpen(!colorDropdownOpen);
            }}
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />
          {colorDropdownOpen && (
            <input
              type="text"
              value={element.properties.color}
              onChange={(e) =>
                updateElement(element.id, {
                  properties: { ...element.properties, color: e.target.value },
                } as Partial<IconElement>)
              }
              className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="#000000"
            />
          )}
          <div className="flex-1">
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
        </div>
      </div>"""

content = content.replace(old_section, new_section)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Simple layout:")
print("- Color button | Hex input (when visible) | Espessura slider")
print("- All in one row, no dropdowns, no complicated positioning")
