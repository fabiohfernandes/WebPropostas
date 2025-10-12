#!/usr/bin/env python3
"""
Fix: NO dropdown inside dropdown
- Native color input opens its own browser picker
- When clicked, also show hex input field below
- Click again to hide hex input
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Keep colorDropdownOpen state for hex input visibility
# Replace the color picker section - simpler approach
old_section = """      {/* Color Picker and Stroke Width */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor
        </label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
              className="w-12 h-8 rounded border border-gray-200 cursor-pointer"
              style={{ backgroundColor: element.properties.color }}
            />
            {colorDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setColorDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20 w-48">
                  <div className="space-y-2">
                    <input
                      type="color"
                      value={element.properties.color}
                      onChange={(e) =>
                        updateElement(element.id, {
                          properties: { ...element.properties, color: e.target.value },
                        } as Partial<IconElement>)
                      }
                      className="w-full h-10 rounded border border-gray-200 cursor-pointer"
                    />
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
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<IconElement>)
            }
            onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
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

content = content.replace(old_section, new_section)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed - NO nested dropdowns:")
print("- Native color input opens browser's own color picker")
print("- Click also toggles hex input field visibility below")
print("- Click again hides hex input")
print("- Simple, clean, no nested dropdowns")
