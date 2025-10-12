#!/usr/bin/env python3
"""
Add onFocus auto-select to all hex/color text inputs
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all color/hex text inputs and add onFocus={(e) => e.target.select()}

# 1. Icon color hex input (line ~223)
content = content.replace(
    """          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<IconElement>)
            }
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="#000000"
          />""",
    """          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<IconElement>)
            }
            onFocus={(e) => e.target.select()}
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="#000000"
          />"""
)

# 2. Shadow color hex input (line ~360)
content = content.replace(
    """          <input
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
          />""",
    """          <input
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
            onFocus={(e) => e.target.select()}
            disabled={!element.properties?.shadow}
            placeholder="#000000"
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
          />"""
)

# 3. Text color hex input (line ~597)
content = content.replace(
    """          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<TextElement>)
            }
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="#000000"
          />""",
    """          <input
            type="text"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<TextElement>)
            }
            onFocus={(e) => e.target.select()}
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="#000000"
          />"""
)

# 4. Shape fill hex input (line ~690)
content = content.replace(
    """          <input
            type="text"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<ShapeElement>)
            }
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="#000000"
          />""",
    """          <input
            type="text"
            value={element.properties.fill}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, fill: e.target.value },
              } as Partial<ShapeElement>)
            }
            onFocus={(e) => e.target.select()}
            className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="#000000"
          />"""
)

# 5. Frame border color hex input (line ~910)
content = content.replace(
    """                <input
                  type="text"
                  value={element.properties.alphaBorder.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        alphaBorder: {
                          ...element.properties.alphaBorder,
                          color: e.target.value,
                        },
                      },
                    } as Partial<FrameElement>)
                  }
                  className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="#000000"
                />""",
    """                <input
                  type="text"
                  value={element.properties.alphaBorder.color}
                  onChange={(e) =>
                    updateElement(element.id, {
                      properties: {
                        ...element.properties,
                        alphaBorder: {
                          ...element.properties.alphaBorder,
                          color: e.target.value,
                        },
                      },
                    } as Partial<FrameElement>)
                  }
                  onFocus={(e) => e.target.select()}
                  className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="#000000"
                />"""
)

# 6. Background color hex input (line ~1136)
content = content.replace(
    """                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => updatePageBackground({ type: 'solid', value: e.target.value })}
                  className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="#FFFFFF"
                />""",
    """                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => updatePageBackground({ type: 'solid', value: e.target.value })}
                  onFocus={(e) => e.target.select()}
                  className="w-20 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="#FFFFFF"
                />"""
)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added auto-select to all hex input boxes:")
print("- Icon color hex input")
print("- Shadow color hex input")
print("- Text color hex input")
print("- Shape fill hex input")
print("- Frame border color hex input")
print("- Background color hex input")
print("All values now auto-select on focus!")
