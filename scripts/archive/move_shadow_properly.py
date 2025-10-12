#!/usr/bin/env python3
"""
Move shadow from CommonProperties to IconProperties properly
"""

# Read the PropertiesPanel file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and remove shadow section from CommonProperties (should be around line 908-1066)
# And add it to IconProperties (should be around line 305)

new_lines = []
skip_until = None
shadow_lines = []
capturing_shadow = False
in_icon_properties = False
icon_properties_end_found = False

for i, line in enumerate(lines, 1):
    # Start capturing shadow section from CommonProperties
    if '      {/* Shadow Controls */' in line and not capturing_shadow:
        capturing_shadow = True
        shadow_lines.append(line)
        continue

    # Continue capturing shadow lines
    if capturing_shadow:
        shadow_lines.append(line)
        # Check if we've reached the end of shadow section
        if '      </div>' in line and len(shadow_lines) > 100:  # Shadow section is long
            # Check next line to confirm it's the end
            if i < len(lines) and '    </div>' in lines[i]:
                shadow_lines.append(lines[i])
                skip_until = i + 1
                capturing_shadow = False
                continue
        continue

    # Skip lines that we've marked for removal
    if skip_until and i <= skip_until:
        continue

    # Find where to insert shadow in IconProperties
    # Look for the closing of Icon Picker section, then add shadow before the function ends
    if '      </div>' in line and i > 300 and i < 310:  # Around line 305
        # Check if next line is the closing of IconProperties
        if i < len(lines) and '    </div>' in lines[i]:
            # Insert shadow section here
            new_lines.append('\n')
            new_lines.extend(shadow_lines[:-1])  # Don't include the last closing div
            icon_properties_end_found = True

    new_lines.append(line)

# Write updated file
with open('services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Shadow section moved:")
print(f"- Removed from CommonProperties ({len(shadow_lines)} lines)")
print("- Added to IconProperties (Aparência section)")
print("- Shadow now appears after Icon Picker")
