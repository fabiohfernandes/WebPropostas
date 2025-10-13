// ============================================================================
// Template Builder - Enhanced Colors Session
// Color Schema Manager with Favorites system and Modal for Color Management
// ============================================================================

'use client';

import React, { useState, useEffect } from 'react';
import {
  Palette,
  Plus,
  Trash2,
  Star,
  Edit2,
  Check,
  X,
  Search,
  Grid3x3
} from 'lucide-react';
import { COLOR_SCALES, ColorScaleName } from '@/types/bulletSystemV2';

interface ColorSchema {
  id: string;
  name: string;
  colors: ColorScaleName[];
  isDefault?: boolean;
}

// ALL 44 Color Schemas from palette images
const DEFAULT_SCHEMAS: ColorSchema[] = [
  { id: 'fresh', name: 'Fresh', colors: ['warmBrown', 'sageGreen', 'steelBlue', 'lightGray', 'coconutCream'], isDefault: true },
  { id: 'haze-sunset', name: 'Haze Sunset', colors: ['peach', 'coral', 'dustyRose', 'purpleGray', 'slateBlue'], isDefault: true },
  { id: 'studio', name: 'Studio', colors: ['goldenYellow', 'iceBlue', 'powderBlue', 'charcoal', 'mauve'], isDefault: true },
  { id: 'tropical', name: 'Tropical', colors: ['harvestGold', 'calico', 'hampton', 'seaNymph', 'smaltBlue'], isDefault: true },
  { id: 'sinopsys', name: 'Sinopsys', colors: ['softPeach', 'vintagePlum', 'midnightNavy'], isDefault: true },
  { id: 'aesthetic', name: 'Aesthetic', colors: ['maroonRed', 'ivoryWhite', 'shadowGray', 'taupe'], isDefault: true },
  { id: 'coconut', name: 'Coconut', colors: ['tangerine', 'coconutCream', 'espresso', 'khaki'], isDefault: true },
  { id: 'chicago', name: 'Chicago', colors: ['beigeTan'], isDefault: true },
  { id: 'dreamer', name: 'Dreamer', colors: ['aquaMist', 'lavenderGray', 'sandBeige', 'lilacMist'], isDefault: true },
  { id: 'officer', name: 'Officer', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine'], isDefault: true },
  { id: 'golden', name: 'Golden', colors: ['antiqueBronze', 'sandyBeige', 'lightGray', 'khaki', 'darkChocolate'], isDefault: true },
  { id: 'dusk', name: 'Dusk', colors: ['darkBrown', 'rosewood', 'dustySage', 'paleGray'], isDefault: true },
  { id: 'winter', name: 'Winter', colors: ['winterSky', 'steelBlue', 'deepOcean'], isDefault: true },
  { id: 'deep-water', name: 'Deep Water', colors: ['navyDepth'], isDefault: true },
  { id: 'bubblegum', name: 'Bubblegum', colors: ['amethyst', 'skyBlue', 'hotPink', 'sunflower'], isDefault: true },
  { id: 'summer-vibes', name: 'Summer Vibes', colors: ['mintGreen', 'lemonChiffon', 'blushPink', 'coralPink'], isDefault: true },
  { id: 'nude', name: 'Nude', colors: ['deepCharcoal', 'rosyBrown', 'sandyBeige', 'lightTan', 'creamBeige', 'ivoryCream'], isDefault: true },
  { id: 'officer2', name: 'Officer 2', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine'], isDefault: true },
  { id: 'blackberry', name: 'Blackberry', colors: ['vanillaCream', 'softBlue', 'mutedPurple'], isDefault: true },
  { id: 'officer3', name: 'Officer 3', colors: ['darkSlate', 'royalPurple', 'silverGray'], isDefault: true },
  { id: 'classic', name: 'Classic', colors: ['forestGreen', 'silverGray', 'lightGray', 'mustardYellow'], isDefault: true },
  { id: 'greenwich', name: 'Greenwich', colors: ['yaleBlue', 'dustyTeal', 'cambridgeBlue', 'mindaro'], isDefault: true },
  { id: 'hazy', name: 'Hazy', colors: ['deepForest', 'dustyTeal', 'sageGray', 'seafoam', 'lightGray', 'mintCream'], isDefault: true },
  { id: 'miami', name: 'Miami', colors: ['deepPurple', 'crimson', 'rubyRed', 'tangerineDream', 'goldenSun'], isDefault: true },
  { id: 'pastel', name: 'Pastel', colors: ['softLavender', 'blushPink', 'softCoral', 'warmGray'], isDefault: true },
  { id: 'mediterranean', name: 'Mediterranean', colors: ['deepTeal', 'skyBlue', 'lightBlue', 'coconutCream', 'tangerine'], isDefault: true },
  { id: 'terrace', name: 'Terrace', colors: ['deepViolet', 'burgundy'], isDefault: true },
  { id: 'lullaby', name: 'Lullaby', colors: ['paleRose', 'dustyPink', 'lightGray', 'warmGray'], isDefault: true },
  { id: 'viola', name: 'Viola', colors: ['deepAmethyst', 'orchid', 'goldCream', 'vanillaIce'], isDefault: true },
  { id: 'mocha', name: 'Mocha', colors: ['espressoDark', 'caramel', 'latte', 'milkCream', 'ivoryCream'], isDefault: true },
  { id: 'earth', name: 'Earth', colors: ['charcoalBlack', 'forestBrown', 'doveGray', 'sandstone', 'parchment', 'ivory'], isDefault: true },
  { id: 'frosted', name: 'Frosted', colors: ['midnightSlate', 'steelSlate', 'sageGray', 'mistyBlue', 'frostBlue', 'paleIce'], isDefault: true },
  { id: 'sensual', name: 'Sensual', colors: ['nero', 'wineRed', 'desertSand', 'blushBeige', 'porcelain', 'ivoryCream'], isDefault: true },
  { id: 'regal', name: 'Regal', colors: ['jetBlack', 'plumWine', 'bronze', 'mintJade', 'paleAlmond', 'ivoryCream'], isDefault: true },
  { id: 'spiced', name: 'Spiced', colors: ['obsidian', 'cayenne', 'cinnamon', 'goldenHoney', 'champagne', 'ivoryCream'], isDefault: true },
  { id: 'luxor', name: 'Luxor', colors: ['onyxBlack', 'mahogany', 'taupeBrown', 'champagneGold', 'paleChampagne', 'creamWhite'], isDefault: true },
  { id: 'suvinil-amarelos', name: 'Suvinil Amarelos', colors: ['luzDeInverno', 'gengibre', 'cacauDaBahia', 'amareloReal'], isDefault: true },
  { id: 'suvinil-laranjas', name: 'Suvinil Laranjas', colors: ['areia', 'naturale', 'maraca', 'vitaminaDePapaia'], isDefault: true },
  { id: 'suvinil-rosas', name: 'Suvinil Rosas', colors: ['rosaPastel', 'contoDeFadas', 'rosaNeon', 'valentino'], isDefault: true },
  { id: 'suvinil-violetas', name: 'Suvinil Violetas', colors: ['chaDeRosas', 'chuvaDePetalas', 'florDeGeranio', 'roxoRustico'], isDefault: true },
  { id: 'suvinil-azuis', name: 'Suvinil Azuis', colors: ['aguaFresca', 'ceuSereno', 'ilhasGregas', 'azulMarinho'], isDefault: true },
  { id: 'suvinil-teals', name: 'Suvinil Teals', colors: ['luzDaManha', 'calmaria', 'marMediterraneo', 'marVerde'], isDefault: true },
  { id: 'suvinil-verdes', name: 'Suvinil Verdes', colors: ['verdeLavado', 'igarape', 'rioLimpido', 'trilhaNaMata'], isDefault: true },
  { id: 'suvinil-verde-amarelo', name: 'Suvinil Verde-Amarelo', colors: ['rioPaine', 'capimSanto', 'cheiroVerde', 'capimSeco'], isDefault: true },
  { id: 'suvinil-cinzas', name: 'Suvinil Cinzas', colors: ['fotoRetro', 'banhoDePlatina', 'cinzaNatural', 'aventurinaPreta'], isDefault: true },
  { id: 'suvinil-beges', name: 'Suvinil Beges', colors: ['gelo', 'calopsita', 'algodaoEgipcio', 'invernoGelado'], isDefault: true },
];

export function ColorsSessionEnhanced() {
  const [schemas, setSchemas] = useState<ColorSchema[]>(DEFAULT_SCHEMAS);
  const [favorites, setFavorites] = useState<ColorScaleName[]>(['limeGreen', 'teal', 'coral', 'amethyst']);
  const [selectedSchema, setSelectedSchema] = useState<ColorSchema | null>(null);
  const [editingSchema, setEditingSchema] = useState<string | null>(null);
  const [newSchemaName, setNewSchemaName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const COLORS_PER_PAGE = 50;

  // Get all available colors
  const allColors = Object.keys(COLOR_SCALES) as ColorScaleName[];

  // Filter colors based on search
  const filteredColors = allColors.filter(colorKey =>
    colorKey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Add color to schema
  const addColorToSchema = (schemaId: string, color: ColorScaleName) => {
    setSchemas(schemas.map(schema => {
      if (schema.id === schemaId && !schema.colors.includes(color)) {
        return { ...schema, colors: [...schema.colors, color] };
      }
      return schema;
    }));
  };

  // Remove color from schema
  const removeColorFromSchema = (schemaId: string, color: ColorScaleName) => {
    setSchemas(schemas.map(schema => {
      if (schema.id === schemaId) {
        return { ...schema, colors: schema.colors.filter(c => c !== color) };
      }
      return schema;
    }));
  };

  // Create new schema
  const createNewSchema = () => {
    if (!newSchemaName.trim()) return;

    const newSchema: ColorSchema = {
      id: `custom-${Date.now()}`,
      name: newSchemaName,
      colors: [],
      isDefault: false
    };

    setSchemas([...schemas, newSchema]);
    setSelectedSchema(newSchema);
    setNewSchemaName('');
    setIsCreatingNew(false);
  };

  // Delete schema
  const deleteSchema = (schemaId: string) => {
    setSchemas(schemas.filter(s => s.id !== schemaId));
    if (selectedSchema?.id === schemaId) {
      setSelectedSchema(null);
    }
  };

  // Rename schema
  const renameSchema = (schemaId: string, newName: string) => {
    setSchemas(schemas.map(schema => {
      if (schema.id === schemaId) {
        return { ...schema, name: newName };
      }
      return schema;
    }));
    setEditingSchema(null);
  };

  // Toggle favorite color
  const toggleFavorite = (color: ColorScaleName) => {
    setFavorites(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-fuchsia-600" />
          <h3 className="text-sm font-semibold text-gray-800">Esquemas de Cores</h3>
        </div>
        <p className="text-xs text-gray-500">
          Organize suas cores em esquemas personalizados
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">

        {/* Favoritos Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h4 className="text-xs font-semibold text-gray-700">Favoritos</h4>
              <span className="text-xs text-gray-400">({favorites.length})</span>
            </div>
            <button
              onClick={() => setShowColorModal(true)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-fuchsia-600 hover:bg-fuchsia-50 rounded transition-colors"
              title="Adicionar aos favoritos"
            >
              <Grid3x3 className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {favorites.filter(color => COLOR_SCALES[color]).map(color => (
              <button
                key={color}
                onClick={() => toggleFavorite(color)}
                className="group relative"
                title={`${color} - Clique para remover`}
              >
                <div
                  className="w-8 h-8 rounded border-2 border-amber-400 transition-transform hover:scale-110"
                  style={{ backgroundColor: COLOR_SCALES[color].medium }}
                />
                <X className="absolute -top-1 -right-1 w-3 h-3 text-white bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
            {favorites.length === 0 && (
              <p className="text-xs text-gray-400 italic">Nenhuma cor favoritada. Clique no ícone ao lado para adicionar.</p>
            )}
          </div>
        </div>

        {/* Schemas List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-gray-700">Esquemas ({schemas.length})</h4>
            <button
              onClick={() => setIsCreatingNew(true)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-fuchsia-600 hover:bg-fuchsia-50 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
              Novo
            </button>
          </div>

          {/* Create New Schema Form */}
          {isCreatingNew && (
            <div className="p-2 bg-fuchsia-50 rounded border border-fuchsia-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSchemaName}
                  onChange={(e) => setNewSchemaName(e.target.value)}
                  placeholder="Nome do esquema..."
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && createNewSchema()}
                />
                <button
                  onClick={createNewSchema}
                  disabled={!newSchemaName.trim()}
                  className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsCreatingNew(false);
                    setNewSchemaName('');
                  }}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Schemas List */}
          <div className="space-y-1.5">
            {schemas.map(schema => (
              <div
                key={schema.id}
                className={`p-2 rounded border-2 transition-all ${
                  selectedSchema?.id === schema.id
                    ? 'border-fuchsia-500 bg-fuchsia-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Schema Header */}
                <div className="flex items-center justify-between mb-2">
                  {editingSchema === schema.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        defaultValue={schema.name}
                        onBlur={(e) => renameSchema(schema.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            renameSchema(schema.id, e.currentTarget.value);
                          }
                        }}
                        className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingSchema(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedSchema(selectedSchema?.id === schema.id ? null : schema)}
                        className="flex-1 text-left text-xs font-medium text-gray-800 hover:text-fuchsia-600"
                      >
                        {schema.name}
                        {schema.isDefault && (
                          <span className="ml-1 text-[10px] text-gray-400">(padrão)</span>
                        )}
                      </button>
                      <div className="flex items-center gap-1">
                        {!schema.isDefault && (
                          <>
                            <button
                              onClick={() => setEditingSchema(schema.id)}
                              className="p-1 text-gray-400 hover:text-fuchsia-600 rounded"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteSchema(schema.id)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </>
                        )}
                        {selectedSchema?.id === schema.id && !schema.isDefault && (
                          <button
                            onClick={() => setShowColorModal(true)}
                            className="p-1 text-fuchsia-600 hover:bg-fuchsia-100 rounded"
                            title="Gerenciar cores"
                          >
                            <Grid3x3 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Schema Colors */}
                <div className="flex flex-wrap gap-1">
                  {schema.colors.filter(color => COLOR_SCALES[color]).map(color => (
                    <div key={color} className="relative group">
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: COLOR_SCALES[color].medium }}
                        title={color}
                      />
                      {!schema.isDefault && selectedSchema?.id === schema.id && (
                        <button
                          onClick={() => removeColorFromSchema(schema.id, color)}
                          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      )}
                    </div>
                  ))}
                  <span className="flex items-center text-[10px] text-gray-400">
                    {schema.colors.length} {schema.colors.length === 1 ? 'cor' : 'cores'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color Selector Modal */}
      {showColorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowColorModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden m-4" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {selectedSchema ? `Gerenciar Cores: ${selectedSchema.name}` : 'Adicionar aos Favoritos'}
                </h3>
                <p className="text-xs text-gray-500">
                  Clique para {selectedSchema ? 'adicionar/remover do esquema' : 'adicionar/remover dos favoritos'}
                </p>
              </div>
              <button
                onClick={() => setShowColorModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar cores..."
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>
            </div>

            {/* Colors Grid with Pagination */}
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  Mostrando {Math.min((currentPage - 1) * COLORS_PER_PAGE + 1, filteredColors.length)}-{Math.min(currentPage * COLORS_PER_PAGE, filteredColors.length)} de {filteredColors.length} cores
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <span className="px-2 py-1 text-xs text-gray-600">
                    {currentPage} / {Math.ceil(filteredColors.length / COLORS_PER_PAGE)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(Math.ceil(filteredColors.length / COLORS_PER_PAGE), currentPage + 1))}
                    disabled={currentPage >= Math.ceil(filteredColors.length / COLORS_PER_PAGE)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próxima
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-10 gap-2 overflow-y-auto max-h-[calc(80vh-220px)]">
                {filteredColors
                  .slice((currentPage - 1) * COLORS_PER_PAGE, currentPage * COLORS_PER_PAGE)
                  .map(color => {
                    const colorData = COLOR_SCALES[color];
                    if (!colorData) return null;

                    const isInSchema = selectedSchema?.colors.includes(color);
                    const isFavorite = favorites.includes(color);
                    const isActive = selectedSchema ? isInSchema : isFavorite;

                    return (
                      <button
                        key={color}
                        onClick={() => {
                          if (selectedSchema) {
                            if (isInSchema) {
                              removeColorFromSchema(selectedSchema.id, color);
                            } else {
                              addColorToSchema(selectedSchema.id, color);
                            }
                          } else {
                            toggleFavorite(color);
                          }
                        }}
                        className={`relative w-full aspect-square rounded border-2 transition-all hover:scale-110 ${
                          isActive
                            ? 'border-fuchsia-500 ring-2 ring-fuchsia-200'
                            : 'border-gray-300 hover:border-fuchsia-400'
                        }`}
                        style={{
                          backgroundColor: colorData.medium,
                          minHeight: '32px',
                          minWidth: '32px'
                        }}
                        title={color}
                      >
                        {isFavorite && (
                          <Star className="absolute top-0 right-0 w-3 h-3 text-amber-500 fill-amber-500 drop-shadow" />
                        )}
                        {isActive && (
                          <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg" />
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
