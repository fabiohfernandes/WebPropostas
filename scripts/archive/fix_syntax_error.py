#!/usr/bin/env python3
"""
Fix syntax error - remove orphaned shadow code from CommonProperties
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the orphaned shadow code fragment
orphaned_code = """

            {/* Shadow Color */}
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">
                Cor
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={element.properties.shadow.color.startsWith('rgba')
                    ? '#000000'
                    : element.properties.shadow.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        shadow: {
                          ...element.properties.shadow,
                          color: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-10 h-7 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={element.properties.shadow.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        shadow: {
                          ...element.properties.shadow,
                          color: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="rgba(0, 0, 0, 0.5)"
                  className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>"""

content = content.replace(orphaned_code, "")

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed syntax error:")
print("- Removed orphaned shadow code from CommonProperties")
print("- Shadow section is now only in IconProperties (Aparência)")
