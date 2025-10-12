#!/usr/bin/env python3
"""
Fix font size in CommonProperties input boxes to match labels (text-xs)
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all text-sm with text-xs in CommonProperties input boxes
# This will match the label font size (text-xs)
content = content.replace(
    'className="w-16 px-1.5 py-0.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"',
    'className="w-16 px-1.5 py-0.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"'
)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed input font sizes:")
print("- Changed from text-sm to text-xs")
print("- Now matches label font size")
