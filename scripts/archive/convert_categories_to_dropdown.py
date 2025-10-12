#!/usr/bin/env python3
"""
Convert category pills to dropdown menu on same line as Tamanho and Cor
"""

# Read the file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the old categories section
old_categories_section = """      </div>

      {/* Categories */}
      <div className="p-2 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-1 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap
                transition-all duration-150
                ${selectedCategory === category.id
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>"""

new_categories_section = """      </div>"""

# Replace old size & color controls with new 3-column layout
old_controls = """        {/* Size & Color Controls */}
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Tamanho</label>
            <select
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={24}>Pequeno (24px)</option>
              <option value={48}>Médio (48px)</option>
              <option value={72}>Grande (72px)</option>
              <option value={96}>Extra Grande (96px)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Cor</label>
            <input
              type="color"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>
        </div>"""

new_controls = """        {/* Size, Color & Category Controls */}
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Categoria</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Tamanho</label>
            <select
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={24}>Pequeno (24px)</option>
              <option value={48}>Médio (48px)</option>
              <option value={72}>Grande (72px)</option>
              <option value={96}>Extra Grande (96px)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600 block mb-1">Cor</label>
            <input
              type="color"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>
        </div>"""

content = content.replace(old_categories_section, new_categories_section)
content = content.replace(old_controls, new_controls)

# Write updated file
with open('services/frontend/src/components/Builder/sessions/IconsSessionEnhanced.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Converted category pills to dropdown menu")
