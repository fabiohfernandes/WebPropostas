with open('D:/WebPropostas/services/frontend/src/components/Builder/LayersPanelNew.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove showElementPicker state
content = content.replace(
    '  const [isExpanded, setIsExpanded] = useState(true);\n  const [showElementPicker, setShowElementPicker] = useState(false);',
    '  const [isExpanded, setIsExpanded] = useState(true);'
)

# 2. Remove unassigned elements logic
old_logic = '''
  // Get unassigned elements
  const allElements = currentElements();
  const unassignedElements = allElements.filter(el => !el.layerId);

  const handleAddElement = (elementId: string) => {
    updateElement(elementId, { layerId: layer.id, zIndex: layer.zIndex });
    setShowElementPicker(false);
  };

  const handleRemoveElement = (elementId: string) => {
    updateElement(elementId, { layerId: undefined });
  };'''

new_logic = '''
  // Simple add/remove selected element
  const handleAddSelected = () => {
    if (selectedElementId) {
      updateElement(selectedElementId, { layerId: layer.id, zIndex: layer.zIndex });
    }
  };

  const handleRemoveSelected = () => {
    if (selectedElementId) {
      updateElement(selectedElementId, { layerId: undefined });
    }
  };'''

content = content.replace(old_logic, new_logic)

# 3. Replace + button with simple add selected
old_add_button = '''        {/* Add element button */}
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
        </button>'''

new_add_button = '''        {/* Add selected element button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddSelected();
          }}
          disabled={!selectedElementId}
          className={`p-0.5 rounded transition-colors ${
            !selectedElementId
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-green-600 hover:text-green-700 hover:bg-green-50'
          }`}
          title="Adicionar elemento selecionado"
        >
          <Plus className="w-3 h-3" />
        </button>'''

content = content.replace(old_add_button, new_add_button)

# 4. Replace - button with simple remove selected
old_remove_button = '''        {/* Remove elements button */}
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
        </button>'''

new_remove_button = '''        {/* Remove selected element button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveSelected();
          }}
          disabled={!selectedElementId}
          className={`p-0.5 rounded transition-colors ${
            !selectedElementId
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
          }`}
          title="Remover elemento selecionado"
        >
          <Minus className="w-3 h-3" />
        </button>'''

content = content.replace(old_remove_button, new_remove_button)

# 5. Remove the entire dropdown section
import re
dropdown_pattern = r'\s*\{/\* Element Picker Dropdown \*/\}.*?\{showElementPicker.*?\}\s*\}\)\}\s*\}\s*\}'
content = re.sub(dropdown_pattern, '', content, flags=re.DOTALL)

# 6. Remove currentElements from destructuring since we don't need it anymore
content = content.replace(
    'const { updateLayer, deleteLayer, selectedElementId, reorderLayers, updateElement, selectElement, currentElements } = useBuilderStore();',
    'const { updateLayer, deleteLayer, selectedElementId, reorderLayers, updateElement, selectElement } = useBuilderStore();'
)

with open('D:/WebPropostas/services/frontend/src/components/Builder/LayersPanelNew.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("FIXED: Simple +/- buttons for selected element only!")
