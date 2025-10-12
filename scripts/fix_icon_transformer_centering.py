#!/usr/bin/env python3
"""
Fix icon transformer centering by offsetting the KonvaImage and Rect to match Group offset
"""

# Read the file
with open('services/frontend/src/components/Builder/BuilderCanvas.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the KonvaImage and Rect positioning inside IconElementRenderer
old_icon_image = """      {iconImage && (
        <KonvaImage
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          image={iconImage}
          shadowColor={element.properties.shadow?.color}
          shadowBlur={element.properties.shadow?.blur}
          shadowOffsetX={element.properties.shadow?.offsetX}
          shadowOffsetY={element.properties.shadow?.offsetY}
        />
      )}
      {isSelected && (
        <Rect
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          stroke="#3B82F6"
          strokeWidth={2}
          listening={false}
        />
      )}"""

new_icon_image = """      {iconImage && (
        <KonvaImage
          x={-element.width / 2}
          y={-element.height / 2}
          width={element.width}
          height={element.height}
          image={iconImage}
          shadowColor={element.properties.shadow?.color}
          shadowBlur={element.properties.shadow?.blur}
          shadowOffsetX={element.properties.shadow?.offsetX}
          shadowOffsetY={element.properties.shadow?.offsetY}
        />
      )}
      {isSelected && (
        <Rect
          x={-element.width / 2}
          y={-element.height / 2}
          width={element.width}
          height={element.height}
          stroke="#3B82F6"
          strokeWidth={2}
          listening={false}
        />
      )}"""

content = content.replace(old_icon_image, new_icon_image)

# Write updated file
with open('services/frontend/src/components/Builder/BuilderCanvas.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed icon transformer centering - icons now properly centered in selection box")
