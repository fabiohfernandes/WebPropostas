#!/usr/bin/env python3
"""
Remove arrow characters from Diagonal icon labels
"""

# Fix PropertiesPanel.tsx
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("label: 'Diagonal ↗'", "label: 'Diagonal'")
content = content.replace("label: 'Diagonal ↙'", "label: 'Diagonal'")

with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Fix IconsSessionEnhanced.tsx
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("label: 'Diagonal ↗'", "label: 'Diagonal'")
content = content.replace("label: 'Diagonal ↙'", "label: 'Diagonal'")

with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed arrow characters from Diagonal icon labels")
