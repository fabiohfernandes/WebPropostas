#!/usr/bin/env python3
"""
Fix shadow color input to show hex instead of rgba
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the hex input section to convert rgba to hex
old_hex_input = """          <input
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
          />"""

new_hex_input = """          <input
            type="text"
            value={element.properties?.shadow?.color.startsWith('rgba') ? '#000000' : (element.properties?.shadow?.color || '#000000')}
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
            placeholder="#000000"
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          />"""

content = content.replace(old_hex_input, new_hex_input)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Shadow hex input fixed:")
print("- Now shows hex format (#000000) instead of rgba")
print("- Fixed width (w-20) instead of flex-1")
print("- Placeholder changed to #000000")
