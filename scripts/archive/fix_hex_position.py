#!/usr/bin/env python3
"""
Fix hex input positioning:
- Wrap color input in relative container
- Position hex input absolutely with high z-index
- Place it near the color picker but visible
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the color picker section with better positioning
old_section = """      {/* Color Picker and Stroke Width */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor
        </label>
        <div className="flex items-center gap-3">
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
        {colorDropdownOpen && (
          <div className="mt-2">
            <input
              type="text"
              value={element.properties.color}
              onChange={(e) =>
                updateElement(element.id, {
                  properties: { ...element.properties, color: e.target.value },
                } as Partial<IconElement>)
              }
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="#000000"
            />
          </div>
        )}
      </div>"""

new_section = """      {/* Color Picker and Stroke Width */}
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

content = content.replace(old_section, new_section)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed hex input positioning:")
print("- Positioned absolutely below color picker")
print("- z-index 10000 to appear above everything")
print("- Click outside to close")
print("- Clean dropdown-style box")
