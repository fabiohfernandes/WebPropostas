#!/usr/bin/env python3
"""
Fix color picker:
- Remove hex code display from button
- Keep only the native color input (which has built-in dropdown)
- Put Espessura slider in place of where hex code was
- Remove custom dropdown
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove colorDropdownOpen state
old_state = """  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);"""
new_state = "  const [iconPickerOpen, setIconPickerOpen] = useState(false);"

content = content.replace(old_state, new_state)

# Replace the entire Color Picker + Stroke Width section
# Now we want: Color input only, then Espessura slider right after in same section
old_section = """      {/* Color Picker */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Cor
        </label>
        <div className="relative">
          <button
            onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
            className="w-full px-2 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <div
              className="w-8 h-8 rounded border border-gray-200"
              style={{ backgroundColor: element.properties.color }}
            />
            <span className="text-gray-700">{element.properties.color}</span>
          </button>

          {colorDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setColorDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-20">
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Seletor de Cor
                    </label>
                    <input
                      type="color"
                      value={element.properties.color}
                      onChange={(e) =>
                        updateElement(element.id, {
                          properties: { ...element.properties, color: e.target.value },
                        } as Partial<IconElement>)
                      }
                      className="w-full h-12 rounded border border-gray-200 cursor-pointer"
                    />
                  </div>
                  <div>
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
                      className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stroke Width */}
      <div>
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
      </div>"""

content = content.replace(old_section, new_section)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Color picker fixed:")
print("- Removed hex code display")
print("- Removed custom dropdown")
print("- Kept native color input only (has built-in browser dropdown)")
print("- Moved Espessura slider next to color input to save space")
