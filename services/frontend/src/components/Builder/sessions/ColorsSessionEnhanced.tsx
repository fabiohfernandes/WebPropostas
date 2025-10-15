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
  Minus
} from 'lucide-react';
import { COLOR_SCALES, ColorScaleName } from '@/types/bulletSystemV2';

interface ColorSchema {
  id: string;
  name: string;
  colors: ColorScaleName[];
  isDefault?: boolean;
}

// ALL 46 Color Schemas - ORDERED: Todas as Cores, Favoritos, then Alphabetical
export const COLOR_SCHEMAS: ColorSchema[] = [
  // Special schemas first
  { id: 'todas', name: 'Todas as Cores', colors: Object.keys(COLOR_SCALES) as ColorScaleName[], isDefault: true },
  { id: 'favoritos', name: 'Favoritos', colors: ['limeGreen', 'teal', 'coral', 'amethyst', 'navy', 'orange', 'emerald', 'purple'], isDefault: true },

  // Alphabetical schemas
  { id: 'aesthetic', name: 'Aesthetic', colors: ['maroonRed', 'ivoryWhite', 'lightGrayBeige', 'shadowGray', 'taupeBrown'], isDefault: true },
  { id: 'blackberry', name: 'Blackberry', colors: ['paleBeige', 'dustyTealGray', 'softBlue', 'mutedPurple', 'charcoalPurple'], isDefault: true },
  { id: 'bubblegum', name: 'Bubblegum', colors: ['amethyst', 'skyBlue', 'hotPink', 'sunflower', 'electricBlue', 'brightFuchsia'], isDefault: true },
  { id: 'chicago', name: 'Chicago', colors: ['lightCream', 'warmTerracottaRust', 'darkForestGreen', 'deepCharcoalBlack'], isDefault: true },
  { id: 'classic', name: 'Classic', colors: ['forestGreen', 'silverGray', 'lightGray', 'mustardYellow', 'mediumSteelBlue'], isDefault: true },
  { id: 'coconut', name: 'Coconut', colors: ['tangerine', 'coconutCream', 'espresso', 'khaki', 'mediumKhaki'], isDefault: true },
  { id: 'deep-water', name: 'Deep Water', colors: ['deepNavy', 'mediumNavy', 'softNavy', 'lightNavyGray', 'paleNavyBlue'], isDefault: true },
  { id: 'dreamer', name: 'Dreamer', colors: ['aquaMist', 'lavenderGray', 'sandBeige', 'lilacMist'], isDefault: true },
  { id: 'dusk', name: 'Dusk', colors: ['darkBrown', 'rosewood', 'dustySage', 'paleGray', 'softTaupe', 'paleSand'], isDefault: true },
  { id: 'earth', name: 'Earth', colors: ['charcoalBlack', 'forestBrown', 'doveGray', 'sandstone', 'parchment', 'ivory'], isDefault: true },
  { id: 'fresh', name: 'Fresh', colors: ['warmBrown', 'sageGreen', 'steelBlue', 'lightGray', 'coconutCream', 'darkWarmBrown'], isDefault: true },
  { id: 'frosted', name: 'Frosted', colors: ['midnightSlate', 'steelSlate', 'sageGray', 'mistyBlue', 'frostBlue', 'paleIce'], isDefault: true },
  { id: 'golden', name: 'Golden', colors: ['antiqueBronze', 'sandyBeige', 'lightGray', 'khaki', 'darkChocolate'], isDefault: true },
  { id: 'greenwich', name: 'Greenwich', colors: ['yaleBlue', 'dustyTeal', 'cambridgeBlue', 'mindaro'], isDefault: true },
  { id: 'haze-sunset', name: 'Haze Sunset', colors: ['peach', 'coral', 'dustyRose', 'purpleGray', 'slateBlue'], isDefault: true },
  { id: 'hazy', name: 'Hazy', colors: ['deepForest', 'dustyTeal', 'sageGray', 'seafoam', 'lightGray', 'mintCream'], isDefault: true },
  { id: 'lullaby', name: 'Lullaby', colors: ['paleRose', 'dustyPink', 'lightGray', 'warmGray', 'warmTerracotta'], isDefault: true },
  { id: 'luxor', name: 'Luxor', colors: ['onyxBlack', 'mahogany', 'taupeBrown', 'champagneGold', 'paleChampagne', 'creamWhite'], isDefault: true },
  { id: 'mediterranean', name: 'Mediterranean', colors: ['deepTeal', 'skyBlue', 'lightBlue', 'coconutCream', 'tangerine', 'richGold'], isDefault: true },
  { id: 'miami', name: 'Miami', colors: ['deepPurple', 'crimson', 'rubyRed', 'tangerineDream', 'goldenSun'], isDefault: true },
  { id: 'mocha', name: 'Mocha', colors: ['espressoDark', 'caramel', 'latte', 'milkCream', 'ivoryCream', 'deepChocolate', 'mediumBrown', 'softBeige'], isDefault: true },
  { id: 'nude', name: 'Nude', colors: ['deepCharcoal', 'rosyBrown', 'sandyBeige', 'lightTan', 'creamBeige', 'ivoryCream'], isDefault: true },
  { id: 'officer', name: 'Officer', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine', 'mediumCharcoal'], isDefault: true },
  { id: 'officer2', name: 'Officer 2', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine', 'mediumSlate'], isDefault: true },
  { id: 'officer3', name: 'Officer 3', colors: ['darkSlate', 'royalPurple', 'silverGray', 'lightSilver'], isDefault: true },
  { id: 'pastel', name: 'Pastel', colors: ['softLavender', 'blushPink', 'softCoral', 'warmGray', 'mediumGrayBrown'], isDefault: true },
  { id: 'regal', name: 'Regal', colors: ['jetBlack', 'plumWine', 'bronze', 'mintJade', 'paleAlmond', 'ivoryCream'], isDefault: true },
  { id: 'sensual', name: 'Sensual', colors: ['nero', 'wineRed', 'desertSand', 'blushBeige', 'porcelain', 'ivoryCream'], isDefault: true },
  { id: 'sinopsys', name: 'Sinopsys', colors: ['softPeach', 'vintagePlum', 'midnightNavy', 'darkTeal', 'mutedMauve'], isDefault: true },
  { id: 'spiced', name: 'Spiced', colors: ['obsidian', 'cayenne', 'cinnamon', 'goldenHoney', 'champagne', 'ivoryCream'], isDefault: true },
  { id: 'studio', name: 'Studio', colors: ['goldenYellow', 'iceBlue', 'powderBlue', 'charcoal', 'mauve'], isDefault: true },
  { id: 'summer-vibes', name: 'Summer Vibes', colors: ['mintGreen', 'lemonChiffon', 'blushPink', 'coralPink', 'softCoralPink'], isDefault: true },
  { id: 'suvinil-amarelos', name: 'Suvinil Amarelos', colors: ['luzDeInverno', 'gengibre', 'cacauDaBahia', 'amareloReal', 'poDeGengibre', 'bananada'], isDefault: true },
  { id: 'suvinil-azuis', name: 'Suvinil Azuis', colors: ['aguaFresca', 'ceuSereno', 'ilhasGregas', 'azulMarinho', 'nevoaIntensa', 'jeansLavado'], isDefault: true },
  { id: 'suvinil-beges', name: 'Suvinil Beges', colors: ['gelo', 'calopsita', 'algodaoEgipcio', 'invernoGelado', 'cromio', 'rafia'], isDefault: true },
  { id: 'suvinil-cinzas', name: 'Suvinil Cinzas', colors: ['fotoRetro', 'banhoDePlatina', 'cinzaNatural', 'aventurinaPreta', 'fantasiaPrateada', 'cinzaTecnologico'], isDefault: true },
  { id: 'suvinil-laranjas', name: 'Suvinil Laranjas', colors: ['areia', 'naturale', 'maraca', 'vitaminaDePapaia', 'castanhaPortuguesa', 'viraLataCaramelo'], isDefault: true },
  { id: 'suvinil-rosas', name: 'Suvinil Rosas', colors: ['rosaPastel', 'contoDeFadas', 'rosaNeon', 'valentino', 'saiaJusta', 'tapecaria'], isDefault: true },
  { id: 'suvinil-teals', name: 'Suvinil Teals', colors: ['luzDaManha', 'calmaria', 'marMediterraneo', 'marVerde', 'martimPescador', 'vasoDeCeramica'], isDefault: true },
  { id: 'suvinil-verde-amarelo', name: 'Suvinil Verde-Amarelo', colors: ['rioPaine', 'capimSanto', 'cheiroVerde', 'capimSeco', 'temperoSirio', 'chenile'], isDefault: true },
  { id: 'suvinil-verdes', name: 'Suvinil Verdes', colors: ['verdeLavado', 'igarape', 'rioLimpido', 'trilhaNaMata', 'verdeTrevo', 'verdePastel'], isDefault: true },
  { id: 'suvinil-violetas', name: 'Suvinil Violetas', colors: ['chaDeRosas', 'chuvaDePetalas', 'florDeGeranio', 'roxoRustico', 'maravilha', 'violetaQueimado'], isDefault: true },
  { id: 'terrace', name: 'Terrace', colors: ['deepViolet', 'burgundy', 'darkPlum', 'deepWine', 'darkPurpleGray', 'charcoalGray', 'lightStone'], isDefault: true },
  { id: 'tropical', name: 'Tropical', colors: ['harvestGold', 'calico', 'hampton', 'seaNymph', 'smaltBlue'], isDefault: true },
  { id: 'viola', name: 'Viola', colors: ['deepAmethyst', 'orchid', 'goldCream', 'vanillaIce', 'richPurple', 'lightLavender'], isDefault: true },
  { id: 'winter', name: 'Winter', colors: ['winterSky', 'steelBlue', 'deepOcean', 'mediumSlateGray'], isDefault: true },
];

export function ColorsSessionEnhanced() {
  const [schemas, setSchemas] = useState<ColorSchema[]>(COLOR_SCHEMAS);
  const [favorites, setFavorites] = useState<ColorScaleName[]>(['limeGreen', 'teal', 'coral', 'amethyst']);
  const [editingSchema, setEditingSchema] = useState<string | null>(null);
  const [newSchemaName, setNewSchemaName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalContext, setModalContext] = useState<{ type: 'favorites' | 'schema'; schemaId?: string; schemaName?: string } | null>(null);
  const [removeMode, setRemoveMode] = useState<{ [key: string]: boolean }>({});
  const [customColorHex, setCustomColorHex] = useState('#3B82F6');
  const [customColorName, setCustomColorName] = useState('');
  const [showCustomColorSection, setShowCustomColorSection] = useState(false);
  const COLORS_PER_PAGE = 50;

  // Get all available colors
  const allColors = Object.keys(COLOR_SCALES) as ColorScaleName[];

  // Categorize colors by tone/hue
  const colorsByTone: { [key: string]: { label: string; colors: ColorScaleName[] } } = {
    reds: {
      label: 'Vermelhos & Rosas',
      colors: ['pink', 'coral', 'dustyRose', 'coralPink', 'blushPink', 'rosyBrown', 'paleRose', 'dustyPink', 'hotPink', 'crimson', 'rubyRed', 'maroonRed', 'wineRed', 'burgundy', 'cayenne', 'rosaPastel', 'contoDeFadas', 'rosaNeon', 'valentino']
    },
    oranges: {
      label: 'Laranjas & Pêssegos',
      colors: ['orange', 'tangerine', 'peach', 'softPeach', 'amber', 'harvestGold', 'tangerineDream', 'goldenSun', 'areia', 'naturale', 'maraca', 'vitaminaDePapaia']
    },
    yellows: {
      label: 'Amarelos & Dourados',
      colors: ['goldenYellow', 'sunflower', 'lemonChiffon', 'mustardYellow', 'antiqueBronze', 'goldCream', 'goldenHoney', 'champagne', 'champagneGold', 'paleChampagne', 'luzDeInverno', 'gengibre', 'cacauDaBahia', 'amareloReal']
    },
    greens: {
      label: 'Verdes',
      colors: ['limeGreen', 'emerald', 'sageGreen', 'mintGreen', 'seaNymph', 'forestGreen', 'mindaro', 'deepForest', 'seafoam', 'mintCream', 'mintJade', 'verdeLavado', 'igarape', 'rioLimpido', 'trilhaNaMata', 'rioPaine', 'capimSanto', 'cheiroVerde', 'capimSeco']
    },
    teals: {
      label: 'Verde-Água & Turquesa',
      colors: ['teal', 'dustyTeal', 'cambridgeBlue', 'aquaMist', 'deepTeal', 'luzDaManha', 'calmaria', 'marMediterraneo', 'marVerde']
    },
    blues: {
      label: 'Azuis',
      colors: ['lightBlue', 'navy', 'steelBlue', 'iceBlue', 'powderBlue', 'slateBlue', 'skyBlue', 'yaleBlue', 'tealBlue', 'softBlue', 'periwinkle', 'winterSky', 'deepOcean', 'navyDepth', 'smaltBlue', 'midnightNavy', 'frostBlue', 'paleIce', 'mistyBlue', 'aguaFresca', 'ceuSereno', 'ilhasGregas', 'azulMarinho']
    },
    purples: {
      label: 'Roxos & Violetas',
      colors: ['purple', 'amethyst', 'purpleGray', 'vintagePlum', 'mauve', 'mutedPurple', 'royalPurple', 'deepPurple', 'deepViolet', 'deepAmethyst', 'orchid', 'lavenderGray', 'lilacMist', 'softLavender', 'plumWine', 'chaDeRosas', 'chuvaDePetalas', 'florDeGeranio', 'roxoRustico']
    },
    browns: {
      label: 'Marrons & Terras',
      colors: ['warmBrown', 'darkBrown', 'rosewood', 'espresso', 'khaki', 'darkChocolate', 'sandyBeige', 'beigeTan', 'sandBeige', 'taupe', 'caramel', 'latte', 'espressoDark', 'forestBrown', 'cinnamon', 'mahogany', 'taupeBrown']
    },
    neutrals: {
      label: 'Neutros & Bege',
      colors: ['lightGray', 'coconutCream', 'calico', 'hampton', 'ivoryWhite', 'shadowGray', 'silverGray', 'sageGray', 'warmGray', 'lightTan', 'creamBeige', 'ivoryCream', 'vanillaCream', 'vanillaIce', 'milkCream', 'latte', 'sandstone', 'parchment', 'ivory', 'desertSand', 'blushBeige', 'porcelain', 'paleAlmond', 'creamWhite', 'gelo', 'calopsita', 'algodaoEgipcio', 'invernoGelado']
    },
    grays: {
      label: 'Cinzas',
      colors: ['charcoal', 'slateGray', 'darkSlate', 'paleGray', 'dustySage', 'doveGray', 'steelSlate', 'midnightSlate', 'fotoRetro', 'banhoDePlatina', 'cinzaNatural', 'aventurinaPreta']
    },
    blacks: {
      label: 'Pretos & Escuros',
      colors: ['deepCharcoal', 'charcoalBlack', 'nero', 'jetBlack', 'obsidian', 'onyxBlack']
    },
    corals: {
      label: 'Corais & Salmão',
      colors: ['softCoral']
    }
  };

  // Get colors organized by tone
  const getColorsByTone = () => {
    if (searchQuery) {
      // If searching, show filtered results without grouping
      return [{
        label: 'Resultados da Busca',
        colors: allColors.filter(colorKey =>
          colorKey.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }];
    }

    // Otherwise, return colors organized by tone
    return Object.values(colorsByTone).filter(group => group.colors.length > 0);
  };

  const colorGroups = getColorsByTone();

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Open modal for specific context
  const openModal = (type: 'favorites' | 'schema', schemaId?: string, schemaName?: string) => {
    setModalContext({ type, schemaId, schemaName });
    setShowColorModal(true);
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Close modal
  const closeModal = () => {
    setShowColorModal(false);
    setModalContext(null);
  };

  // Toggle favorite
  const toggleFavorite = (color: ColorScaleName) => {
    setFavorites(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

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
      name: newSchemaName.trim(),
      colors: [],
      isDefault: false,
    };
    setSchemas([...schemas, newSchema]);
    setNewSchemaName('');
    setIsCreatingNew(false);
  };

  // Rename schema
  const renameSchema = (schemaId: string, newName: string) => {
    if (!newName.trim()) return;
    setSchemas(schemas.map(schema =>
      schema.id === schemaId ? { ...schema, name: newName.trim() } : schema
    ));
    setEditingSchema(null);
  };

  // Delete schema
  const deleteSchema = (schemaId: string) => {
    setSchemas(schemas.filter(schema => schema.id !== schemaId));
  };

  // Toggle remove mode for a schema
  const toggleRemoveMode = (schemaId: string) => {
    setRemoveMode(prev => ({ ...prev, [schemaId]: !prev[schemaId] }));
  };

  // Handle color click in modal
  const handleColorClick = (color: ColorScaleName) => {
    if (!modalContext) return;

    if (modalContext.type === 'favorites') {
      toggleFavorite(color);
    } else if (modalContext.type === 'schema' && modalContext.schemaId) {
      const schema = schemas.find(s => s.id === modalContext.schemaId);
      if (!schema) return;

      if (schema.colors.includes(color)) {
        removeColorFromSchema(modalContext.schemaId, color);
      } else {
        addColorToSchema(modalContext.schemaId, color);
      }
    }
  };

  // Schema Card Component
  const SchemaCard = ({ schema, isFavorites = false }: { schema?: ColorSchema; isFavorites?: boolean }) => {
    const isRemoving = schema ? removeMode[schema.id] : removeMode['favorites'];
    const colors = isFavorites ? favorites : schema?.colors || [];
    const validColors = colors.filter(color => COLOR_SCALES[color]);
    const schemaId = isFavorites ? 'favorites' : schema?.id || '';
    const schemaName = isFavorites ? 'Favoritos' : schema?.name || '';

    return (
      <div className="p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-fuchsia-300 transition-all">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-2">
          {editingSchema === schemaId && !isFavorites && schema ? (
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
                className="text-green-600 hover:text-green-700"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                {isFavorites && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                <h4 className="text-xs font-semibold text-gray-800">{schemaName}</h4>
                <span className="text-[10px] text-gray-400">({validColors.length})</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Add Color Button */}
                <button
                  onClick={() => openModal(isFavorites ? 'favorites' : 'schema', schemaId, schemaName)}
                  className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                  title="Adicionar cor"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>

                {/* Toggle Remove Mode Button */}
                <button
                  onClick={() => toggleRemoveMode(schemaId)}
                  className={`p-1 rounded transition-colors ${
                    isRemoving
                      ? 'bg-red-100 text-red-600'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  title={isRemoving ? 'Modo remover ativado' : 'Ativar modo remover'}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                {/* Edit/Delete Buttons (only for custom schemas) */}
                {!isFavorites && schema && !schema.isDefault && (
                  <>
                    <button
                      onClick={() => setEditingSchema(schema.id)}
                      className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Renomear"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteSchema(schema.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Colors Grid */}
        <div className="flex flex-wrap gap-1.5">
          {colors.filter(color => COLOR_SCALES[color]).map(color => (
            <div key={color} className="relative group">
              <div
                className={`w-7 h-7 rounded border-2 transition-transform hover:scale-110 ${
                  isFavorites ? 'border-amber-400' : 'border-gray-300'
                }`}
                style={{ backgroundColor: COLOR_SCALES[color].medium }}
                title={color}
              />
              {isRemoving && (
                <button
                  onClick={() => {
                    if (isFavorites) {
                      toggleFavorite(color);
                    } else if (schema) {
                      removeColorFromSchema(schema.id, color);
                    }
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          ))}
          {colors.length === 0 && (
            <p className="text-xs text-gray-400 italic py-2">
              {isFavorites ? 'Nenhuma cor favoritada ainda.' : 'Nenhuma cor neste esquema.'}
            </p>
          )}
        </div>
      </div>
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
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Favoritos Card */}
        <SchemaCard isFavorites />

        {/* Create New Schema Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700">Esquemas ({schemas.length})</h4>
          <button
            onClick={() => setIsCreatingNew(true)}
            className="flex items-center gap-1 px-2 py-1 text-xs text-fuchsia-600 hover:bg-fuchsia-50 rounded transition-colors"
          >
            <Plus className="w-3 h-3" />
            Novo Esquema
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
        <div className="space-y-3">
          {schemas.map(schema => (
            <SchemaCard key={schema.id} schema={schema} />
          ))}
        </div>
      </div>

      {/* Color Picker Modal */}
      {showColorModal && modalContext && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {modalContext.type === 'favorites' ? 'Adicionar aos Favoritos' : `Gerenciar: ${modalContext.schemaName}`}
                </h3>
                <p className="text-xs text-gray-500">
                  Clique nas cores para adicionar/remover
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Custom Color Creator Section */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-fuchsia-50 to-purple-50">
              <button
                onClick={() => setShowCustomColorSection(!showCustomColorSection)}
                className="flex items-center gap-2 text-sm font-semibold text-fuchsia-700 hover:text-fuchsia-800 transition-colors mb-2"
              >
                <Plus className="w-4 h-4" />
                {showCustomColorSection ? 'Esconder' : 'Criar Nova Cor Personalizada'}
              </button>

              {showCustomColorSection && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    {/* Color Picker */}
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-gray-700">Cor:</label>
                      <input
                        type="color"
                        value={customColorHex}
                        onChange={(e) => setCustomColorHex(e.target.value)}
                        className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                    </div>

                    {/* Hex Input */}
                    <div className="flex-1 flex items-center gap-2">
                      <label className="text-xs font-medium text-gray-700">Hex:</label>
                      <input
                        type="text"
                        value={customColorHex}
                        onChange={(e) => {
                          let val = e.target.value.trim().toUpperCase();

                          // Remove # if present for validation
                          const withoutHash = val.replace(/^#/, '');

                          // Allow only valid hex characters (0-9, A-F)
                          if (/^[0-9A-F]{0,6}$/.test(withoutHash)) {
                            // Always add # prefix for consistency
                            setCustomColorHex(withoutHash ? `#${withoutHash}` : '#');
                          }
                        }}
                        onBlur={(e) => {
                          // Ensure # prefix on blur
                          const val = e.target.value.trim();
                          if (val && !val.startsWith('#')) {
                            setCustomColorHex(`#${val}`);
                          }
                        }}
                        placeholder="#3B82F6 ou A41F13"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-mono uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Color Name Input */}
                    <input
                      type="text"
                      value={customColorName}
                      onChange={(e) => setCustomColorName(e.target.value)}
                      placeholder="Nome da cor (ex: azulCéu)"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />

                    {/* Add Custom Color Button */}
                    <button
                      onClick={() => {
                        if (customColorName.trim() && /^#[0-9A-Fa-f]{6}$/.test(customColorHex)) {
                          // TODO: Implement adding custom color to COLOR_SCALES
                          alert(`Cor personalizada criada: ${customColorName} (${customColorHex})\n\nNota: Esta funcionalidade salvará a cor no banco de dados.`);
                          setCustomColorName('');
                          setCustomColorHex('#3B82F6');
                        }
                      }}
                      disabled={!customColorName.trim() || !/^#[0-9A-Fa-f]{6}$/.test(customColorHex)}
                      className="px-4 py-2 text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </button>
                  </div>

                  {/* Preview */}
                  <div className="flex items-center gap-3 p-2 bg-white rounded border border-gray-200">
                    <span className="text-xs font-medium text-gray-700">Preview:</span>
                    <div
                      className="w-10 h-10 rounded border-2 border-gray-300"
                      style={{ backgroundColor: customColorHex }}
                    />
                    <span className="text-xs text-gray-600 font-mono">{customColorHex}</span>
                    {customColorName && (
                      <span className="text-xs text-gray-600 italic">"{customColorName}"</span>
                    )}
                  </div>
                </div>
              )}
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

            {/* Colors Grid Organized by Tone */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-180px)]">
              <div className="space-y-4">
                {colorGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-2">
                    {/* Tone Group Header */}
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        {group.label}
                      </h4>
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <span className="text-xs text-gray-400">
                        {group.colors.filter(c => COLOR_SCALES[c]).length} cores
                      </span>
                    </div>

                    {/* Colors Grid for this Tone */}
                    <div className="grid grid-cols-10 gap-2">
                      {group.colors
                        .filter(color => COLOR_SCALES[color])
                        .map(color => {
                          const colorData = COLOR_SCALES[color];
                          if (!colorData) return null;

                          const isInFavorites = favorites.includes(color);
                          const isInSchema = modalContext.type === 'schema' && modalContext.schemaId
                            ? schemas.find(s => s.id === modalContext.schemaId)?.colors.includes(color)
                            : false;
                          const isActive = modalContext.type === 'favorites' ? isInFavorites : isInSchema;

                          return (
                            <button
                              key={color}
                              onClick={() => handleColorClick(color)}
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
                              {isInFavorites && (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
