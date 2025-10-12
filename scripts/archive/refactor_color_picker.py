#!/usr/bin/env python3
"""
Refactor IconProperties color picker:
- Remove hex text input from main view
- Move hex code to dropdown menu
- Add toggle behavior (click once opens, click twice closes)
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the IconProperties function
# We need to add colorDropdownOpen state and refactor the color picker section

# First, find the line with iconPickerOpen state
old_state = "  const [iconPickerOpen, setIconPickerOpen] = useState(false);"
new_state = """  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);"""

content = content.replace(old_state, new_state)

# Now replace the color picker section (lines 198-225)
old_color_picker = """      {/* Color Picker */}
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
            className="w-12 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<IconElement>)
            }
            className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>"""

new_color_picker = """      {/* Color Picker */}
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
      </div>"""

content = content.replace(old_color_picker, new_color_picker)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Color picker refactored:")
print("- Removed hex input from main view")
print("- Added toggle dropdown with color picker and hex input inside")
print("- Click once opens, click twice closes")
print("- Click outside closes dropdown")
