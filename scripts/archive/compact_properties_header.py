with open('D:/WebPropostas/services/frontend/src/components/Builder/PropertiesPanel.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the entire header section
old_header = '''      {/* Header */}
      <div className="p-2 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-semibold text-gray-900">Propriedades</h3>
          <div className="flex gap-0.5">
            <button
              onClick={() => duplicateElement(selectedElement.id)}
              className="p-1 rounded hover:bg-gray-100 transition-colors"
              title="Duplicar"
            >
              <DocumentDuplicateIcon className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="p-1 rounded hover:bg-red-50 transition-colors"
              title="Excluir"
            >
              <TrashIcon className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded">
            {selectedElement.type === 'text' && 'Texto'}
            {selectedElement.type === 'image' && 'Imagem'}
            {selectedElement.type === 'shape' && 'Forma'}
            {selectedElement.type === 'icon' && 'Ícone'}
            {selectedElement.type === 'chart' && 'Gráfico'}
            {selectedElement.type === 'form' && 'Forma'}
            {selectedElement.type === 'frame' && 'Moldura'}
          </span>
          <span className="text-[10px] text-gray-500">
            ID: {selectedElement.id.slice(0, 8)}...
          </span>
        </div>
      </div>'''

new_header = '''      {/* Header */}
      <div className="px-2 py-1 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-900">Propriedades</h3>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded">
              {selectedElement.type === 'text' && 'Texto'}
              {selectedElement.type === 'image' && 'Imagem'}
              {selectedElement.type === 'shape' && 'Forma'}
              {selectedElement.type === 'icon' && 'Ícone'}
              {selectedElement.type === 'chart' && 'Gráfico'}
              {selectedElement.type === 'form' && 'Forma'}
              {selectedElement.type === 'frame' && 'Moldura'}
            </span>
            <span className="text-[10px] text-gray-500">
              {selectedElement.id.slice(0, 8)}...
            </span>
            <button
              onClick={() => duplicateElement(selectedElement.id)}
              className="p-0.5 rounded hover:bg-gray-100 transition-colors"
              title="Duplicar"
            >
              <DocumentDuplicateIcon className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="p-0.5 rounded hover:bg-red-50 transition-colors"
              title="Excluir"
            >
              <TrashIcon className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>
        </div>
      </div>'''

content = content.replace(old_header, new_header)

with open('D:/WebPropostas/services/frontend/src/components/Builder/PropertiesPanel.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Properties header compacted - icon and ID on same line")
