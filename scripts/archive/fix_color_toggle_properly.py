#!/usr/bin/env python3
"""
Fix color toggle properly:
- First click: open color picker AND show hex input
- Second click: close hex input AND prevent color picker from reopening
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the onClick handler to prevent default when closing
old_click = """            onClick={(e) => {
              e.stopPropagation();
              setColorDropdownOpen(!colorDropdownOpen);
            }}"""

new_click = """            onClick={(e) => {
              if (colorDropdownOpen) {
                e.preventDefault();
                e.stopPropagation();
              }
              setColorDropdownOpen(!colorDropdownOpen);
            }}"""

content = content.replace(old_click, new_click)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed color toggle:")
print("- First click: opens browser color picker + shows hex input")
print("- Second click: prevents color picker, just closes hex input")
