with open('D:/WebPropostas/services/frontend/src/components/Builder/LayersPanelNew.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and remove lines 285-328 (the dropdown section)
new_lines = []
skip = False
for i, line in enumerate(lines, 1):
    if i == 285:
        skip = True
    if i == 329:
        skip = False
        continue
    if not skip:
        new_lines.append(line)

with open('D:/WebPropostas/services/frontend/src/components/Builder/LayersPanelNew.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Removed dropdown lines 285-328")
