#!/usr/bin/env python3
"""
Add Rectangle and Circle to iconLibrary array
"""

# Read the file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Rectangle and Circle at the end of iconLibrary
old_end = """  { id: 'tag', category: 'decorative', label: 'Etiqueta', icon: Tag, tags: ['etiqueta', 'tag', 'preço'], defaultColor: '#8B5CF6' },
];"""

new_end = """  { id: 'tag', category: 'decorative', label: 'Etiqueta', icon: Tag, tags: ['etiqueta', 'tag', 'preço'], defaultColor: '#8B5CF6' },

  // SHAPES (as icons)
  { id: 'rectangle', category: 'shapes', label: 'Retângulo', icon: Square, tags: ['retângulo', 'quadrado', 'forma'], defaultColor: '#3B82F6' },
  { id: 'circle', category: 'shapes', label: 'Círculo', icon: Circle, tags: ['círculo', 'forma', 'redondo'], defaultColor: '#10B981' },
];"""

content = content.replace(old_end, new_end)

# Write updated file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Rectangle and Circle to iconLibrary")
