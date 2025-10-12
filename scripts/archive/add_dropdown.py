with open('D:/WebPropostas/services/frontend/src/components/Builder/LayersPanelNew.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line after the Remove button closing tag (before Visibility toggle)
insert_at = None
for i, line in enumerate(lines):
    if i > 280 and i < 290 and '{/* Visibility toggle */}' in line:
        insert_at = i
        break

if insert_at:
    dropdown = '''
        {/* Element Picker Dropdown */}
        {showElementPicker && unassignedElements.length > 0 && (
          <div 
            className="absolute top-full left-0 mt-1 bg-white border border-gray-200
                       rounded-lg shadow-xl z-50 min-w-[200px] max-h-60 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <p className="text-xs font-semibold text-gray-700">Adicionar à {layer.name}</p>
            </div>
            {unassignedElements.map((element) => {
              const getIcon = () => {
                switch (element.type) {
                  case 'image': return <ImageIcon className="w-3 h-3" />;
                  case 'text': return <Type className="w-3 h-3" />;
                  case 'frame': return <Square className="w-3 h-3" />;
                  case 'shape': return <Circle className="w-3 h-3" />;
                  default: return <Square className="w-3 h-3" />;
                }
              };
              const getName = () => {
                if (element.type === 'text' && 'properties' in element) {
                  const c = (element as any).properties?.content;
                  return c && c.length > 20 ? c.substring(0, 20) + '...' : c || 'Text';
                }
                return element.type.charAt(0).toUpperCase() + element.type.slice(1);
              };
              return (
                <button
                  key={element.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddElement(element.id);
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 transition-colors
                             flex items-center gap-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-500">{getIcon()}</span>
                  <span className="truncate text-gray-700">{getName()}</span>
                </button>
              );
            })}
          </div>
        )}

'''
    lines.insert(insert_at, dropdown)
    
    with open('D:/WebPropostas/services/frontend/src/components/Builder/LayersPanelNew.tsx', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print(f"Dropdown inserted at line {insert_at}")
else:
    print("Could not find insertion point")
