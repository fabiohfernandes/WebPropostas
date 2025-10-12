#!/usr/bin/env python3
"""
Update shadow controls:
- Color picker always visible (remove conditional)
- Change slider defaults to 2
- Change slider ranges to 0-10 (no negative values)
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Change default shadow values from 10/5/5 to 2/2/2
content = content.replace(
    """                    shadow: {
                      blur: 10,
                      color: 'rgba(0, 0, 0, 0.5)',
                      offsetX: 5,
                      offsetY: 5,
                    },""",
    """                    shadow: {
                      blur: 2,
                      color: 'rgba(0, 0, 0, 0.5)',
                      offsetX: 2,
                      offsetY: 2,
                    },"""
)

# 2. Remove conditional from color picker - make it always visible
old_title_line = """        <div className="flex items-center gap-2 mb-1.5">
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
                      blur: 2,
                      color: 'rgba(0, 0, 0, 0.5)',
                      offsetX: 2,
                      offsetY: 2,
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
          {element.properties?.shadow && (
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
              className="ml-auto w-8 h-6 rounded border border-gray-200 cursor-pointer"
            />
          )}
        </div>"""

new_title_line = """        <div className="flex items-center gap-2 mb-1.5">
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
                      blur: 2,
                      color: 'rgba(0, 0, 0, 0.5)',
                      offsetX: 2,
                      offsetY: 2,
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
          {element.properties?.shadow && (
            <>
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
                className="ml-auto w-8 h-6 rounded border border-gray-200 cursor-pointer"
              />
            </>
          )}
        </div>"""

content = content.replace(old_title_line, new_title_line)

# 3. Change blur slider range from 0-50 to 0-10
content = content.replace(
    """              <input
                type="range"
                min="0"
                max="50"
                value={element.properties.shadow.blur}""",
    """              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.blur}"""
)

# 4. Change offsetX slider range from -50-50 to 0-10
content = content.replace(
    """              <input
                type="range"
                min="-50"
                max="50"
                value={element.properties.shadow.offsetX}""",
    """              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.offsetX}"""
)

# 5. Change offsetY slider range from -50-50 to 0-10
content = content.replace(
    """              <input
                type="range"
                min="-50"
                max="50"
                value={element.properties.shadow.offsetY}""",
    """              <input
                type="range"
                min="0"
                max="10"
                value={element.properties.shadow.offsetY}"""
)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Shadow controls updated:")
print("- Color picker now always visible")
print("- Default values changed to 2 (blur, offsetX, offsetY)")
print("- Slider ranges changed to 0-10 (no negative values)")
