#!/usr/bin/env python3
"""
Add toggle behavior to color picker:
- First click: opens color picker
- Second click: closes color picker (preventDefault)
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add state back for tracking if color picker is open
old_state = """  const [iconPickerOpen, setIconPickerOpen] = useState(false);"""
new_state = """  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);"""

content = content.replace(old_state, new_state)

# Add onClick handler to toggle and prevent default on second click
old_input = """          <input
            type="color"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<IconElement>)
            }
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />"""

new_input = """          <input
            type="color"
            value={element.properties.color}
            onChange={(e) =>
              updateElement(element.id, {
                properties: { ...element.properties, color: e.target.value },
              } as Partial<IconElement>)
            }
            onClick={(e) => {
              if (colorPickerOpen) {
                e.preventDefault();
              }
              setColorPickerOpen(!colorPickerOpen);
            }}
            className="w-10 h-8 rounded border border-gray-200 cursor-pointer"
          />"""

content = content.replace(old_input, new_input)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Color picker toggle added:")
print("- First click: opens color picker")
print("- Second click: prevents default, closes picker")
