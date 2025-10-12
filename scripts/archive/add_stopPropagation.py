#!/usr/bin/env python3
"""
Add stopPropagation to onClick to ensure toggle works properly
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace onClick handler
old_click = """            onClick={() => setColorDropdownOpen(!colorDropdownOpen)}"""
new_click = """            onClick={(e) => {
              e.stopPropagation();
              setColorDropdownOpen(!colorDropdownOpen);
            }}"""

content = content.replace(old_click, new_click)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added stopPropagation to color input onClick")
print("Toggle should work properly now - click once opens, click again closes")
