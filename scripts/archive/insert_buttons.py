with open('D:/WebPropostas/services/frontend/src/components/Builder/LayersPanelNew.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with Visibility toggle comment (line 251)
insert_at = None
for i, line in enumerate(lines):
    if i > 200 and '{/* Visibility toggle */}' in line:
        insert_at = i
        break

if insert_at:
    # Insert the +/- buttons before the Visibility toggle
    buttons = '''        {/* Add element button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowElementPicker(!showElementPicker);
          }}
          disabled={unassignedElements.length === 0}
          className={`p-0.5 rounded transition-colors ${
            unassignedElements.length === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-green-600 hover:text-green-700 hover:bg-green-50'
          }`}
          title="Adicionar elemento"
        >
          <Plus className="w-3 h-3" />
        </button>

        {/* Remove elements button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            elements.forEach(el => handleRemoveElement(el.id));
          }}
          disabled={elements.length === 0}
          className={`p-0.5 rounded transition-colors ${
            elements.length === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
          }`}
          title="Remover todos"
        >
          <Minus className="w-3 h-3" />
        </button>

'''

    lines.insert(insert_at, buttons)

    with open('D:/WebPropostas/services/frontend/src/components/Builder/LayersPanelNew.tsx', 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print(f"Buttons inserted at line {insert_at}")
else:
    print("Could not find insertion point")
