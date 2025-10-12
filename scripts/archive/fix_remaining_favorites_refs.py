#!/usr/bin/env python3
"""
Fix remaining favorites references in IconsSessionEnhanced
"""

# Read the file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all remaining "favorites" with "favoriteIcons"
content = content.replace('favorites.length', 'favoriteIcons.length')
content = content.replace('favorites.includes', 'favoriteIcons.includes')

# Write updated file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed remaining favorites references")
