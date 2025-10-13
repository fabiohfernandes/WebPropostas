// ============================================================================
// Bullet Sets Session
// Browse and use pre-composed bullet groups
// ============================================================================

'use client';

import { useState } from 'react';
import { Layers, Search, Sparkles, Workflow, GitCompare, TrendingUp, ChevronDown } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { BULLET_SETS_LIBRARY } from '@/data/bulletSetsLibrary';
import type { BulletSet, ColorScaleName } from '@/types/bulletSystemV2';
import { COLOR_SCALES } from '@/types/bulletSystemV2';
import type { Element } from '@/types/builder';

const CATEGORIES: { id: BulletSet['category'] | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Todos', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'process', label: 'Processos', icon: <Workflow className="w-4 h-4" /> },
  { id: 'flow', label: 'Fluxos', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'comparison', label: 'Comparação', icon: <GitCompare className="w-4 h-4" /> },
  { id: 'data-viz', label: 'Visualização', icon: <Layers className="w-4 h-4" /> },
];

interface DraggableBulletSetProps {
  bulletSet: BulletSet;
  colorScheme: ColorScaleName[];
  itemCount: number;
}

function DraggableBulletSet({ bulletSet, colorScheme, itemCount }: DraggableBulletSetProps) {
  const { addElement, currentCanvasSize } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bullet-set-${bulletSet.id}-${Date.now()}`,
    data: {
      type: 'bullet-set',
      setId: bulletSet.id,
      colorScheme,
      itemCount,
    },
  });

  const svgContent = bulletSet.generateSVG({
    width: bulletSet.width,
    height: bulletSet.height,
    colorScheme,
    itemCount,
  });

  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

  // Handle click to insert
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvasSize = currentCanvasSize();

    const newElement: Element = {
      id: `bullet-set-${Date.now()}`,
      type: 'bullet',
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      width: bulletSet.width,
      height: bulletSet.height,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        bulletSetId: bulletSet.id,
        bulletName: bulletSet.name,
        colorScheme: colorScheme,
        itemCount: itemCount,
        svgDataUrl: svgDataUrl,
      },
    } as Element;

    addElement(newElement);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`
        relative group cursor-pointer
        bg-white rounded-lg border-2 border-gray-200
        hover:border-orange-400 hover:shadow-lg
        transition-all duration-200
        p-4
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-102'}
      `}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Preview */}
      <div className="w-full aspect-[2/1] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden mb-3">
        <img
          src={svgDataUrl}
          alt={bulletSet.name}
          className="max-w-full max-h-full object-contain p-2"
          draggable={false}
        />
      </div>

      {/* Info */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-1">{bulletSet.name}</h4>
        <p className="text-xs text-gray-500 mb-2">{bulletSet.description}</p>

        {/* Best used for tags */}
        <div className="flex flex-wrap gap-1">
          {bulletSet.bestUsedFor.slice(0, 2).map((use, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-violet-50 text-violet-700 text-xs rounded-full"
            >
              {use}
            </span>
          ))}
        </div>
      </div>

      {/* Premium badge */}
      {bulletSet.isPremium && (
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full">
          PRO
        </div>
      )}

      {/* Element count badge */}
      <div className="absolute top-3 left-3 px-2 py-0.5 bg-gray-900 text-white text-xs font-semibold rounded-full">
        {bulletSet.elements.length} elementos
      </div>
    </div>
  );
}

export function BulletSetsSession() {
  const [selectedCategory, setSelectedCategory] = useState<BulletSet['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [colorScheme, setColorScheme] = useState<ColorScaleName[]>(['limeGreen', 'teal', 'navy']);
  const [itemCount, setItemCount] = useState(3);

  // Filter bullet sets
  const filteredSets = BULLET_SETS_LIBRARY.filter((bulletSet) => {
    const matchesCategory = selectedCategory === 'all' || bulletSet.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      bulletSet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bulletSet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bulletSet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      bulletSet.bestUsedFor.some((use) => use.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Color scheme presets - COMPLETE from all palette images (each has exact colors shown)
  const colorSchemePresets: { name: string; colors: ColorScaleName[] }[] = [
    // Fresh - 6 colors
    { name: 'Fresh', colors: ['warmBrown', 'sageGreen', 'steelBlue', 'lightGray', 'coconutCream'] },
    // Haze Sunset - 5 colors
    { name: 'Haze Sunset', colors: ['peach', 'coral', 'dustyRose', 'purpleGray', 'slateBlue'] },
    // Studio - 5 colors
    { name: 'Studio', colors: ['goldenYellow', 'iceBlue', 'powderBlue', 'charcoal', 'mauve'] },
    // Tropical - 5 colors
    { name: 'Tropical', colors: ['harvestGold', 'calico', 'hampton', 'seaNymph', 'smaltBlue'] },
    // Sinopsys - 3 colors
    { name: 'Sinopsys', colors: ['softPeach', 'vintagePlum', 'midnightNavy'] },
    // Aesthetic - 4 colors
    { name: 'Aesthetic', colors: ['maroonRed', 'ivoryWhite', 'shadowGray', 'taupe'] },
    // Coconut - 4 colors
    { name: 'Coconut', colors: ['tangerine', 'coconutCream', 'espresso', 'khaki'] },
    // Chicago - 1 color
    { name: 'Chicago', colors: ['beigeTan'] },
    // Dreamer - 4 colors
    { name: 'Dreamer', colors: ['aquaMist', 'lavenderGray', 'sandBeige', 'lilacMist'] },
    // Officer - 5 colors (#2F4858, #33658A, #86BBD8, #F6AE2D, #F26419)
    { name: 'Officer', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine'] },
    // Golden - 5 colors (#D9B061, #D9C4A9, #D8D0C5, #8D6F57, #3F0D0C)
    { name: 'Golden', colors: ['antiqueBronze', 'sandyBeige', 'lightGray', 'khaki', 'darkChocolate'] },
    // Dusk - 4 colors
    { name: 'Dusk', colors: ['darkBrown', 'rosewood', 'dustySage', 'paleGray'] },
    // Winter - 3 colors
    { name: 'Winter', colors: ['winterSky', 'steelBlue', 'deepOcean'] },
    // Deep Water - 1 color
    { name: 'Deep Water', colors: ['navyDepth'] },
    // Bubblegum - 4 colors
    { name: 'Bubblegum', colors: ['amethyst', 'skyBlue', 'hotPink', 'sunflower'] },
    // Summer Vibes - 4 colors
    { name: 'Summer Vibes', colors: ['mintGreen', 'lemonChiffon', 'blushPink', 'coralPink'] },
    // Nude - 6 colors (#3A2D28, #A48374, #CBAD8D, #D1C7BD, #EBE3DB, #F1EDE6)
    { name: 'Nude', colors: ['deepCharcoal', 'rosyBrown', 'sandyBeige', 'lightTan', 'creamBeige', 'ivoryCream'] },
    // Officer2 - 5 colors
    { name: 'Officer 2', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine'] },
    // Blackberry - 5 colors (includes vanilla cream)
    { name: 'Blackberry', colors: ['vanillaCream', 'softBlue', 'mutedPurple'] },
    // Officer3 - 3 colors
    { name: 'Officer 3', colors: ['darkSlate', 'royalPurple', 'silverGray'] },
    // Classic - 5 colors (#2E4053, #BFC9CA, #AAB7B8, #D5D8DC, #F1C40F)
    { name: 'Classic', colors: ['forestGreen', 'silverGray', 'lightGray', 'mustardYellow'] },
    // Greenwich - 5 colors (#1B4079, #4D7C8A, #7F9C96, #8FAD88, #CBDF90)
    { name: 'Greenwich', colors: ['yaleBlue', 'dustyTeal', 'cambridgeBlue', 'mindaro'] },
    // Hazy - 6 colors (#192524, #3C5759, #959D90, #D1EBDB, #D0D5CE, #EFECE9)
    { name: 'Hazy', colors: ['deepForest', 'dustyTeal', 'sageGray', 'seafoam', 'lightGray', 'mintCream'] },
    // Miami - 6 colors (complete sunset gradient)
    { name: 'Miami', colors: ['deepPurple', 'crimson', 'rubyRed', 'tangerineDream', 'goldenSun'] },
    // Pastel - 4 colors (soft rainbow)
    { name: 'Pastel', colors: ['softLavender', 'blushPink', 'softCoral', 'warmGray'] },
    // Mediterranean - 5 colors (teal to orange)
    { name: 'Mediterranean', colors: ['deepTeal', 'skyBlue', 'lightBlue', 'coconutCream', 'tangerine'] },
    // Terrace - 2 colors
    { name: 'Terrace', colors: ['deepViolet', 'burgundy'] },
    // Lullaby - 4 colors
    { name: 'Lullaby', colors: ['paleRose', 'dustyPink', 'lightGray', 'warmGray'] },
    // Viola - 4 colors (#752092, #C957BC, #FFC872, #FFE3B3)
    { name: 'Viola', colors: ['deepAmethyst', 'orchid', 'goldCream', 'vanillaIce'] },
    // Mocha - 5 colors (#332820, #5A4D40, #98867B, #D0C6BD, #EFEDEA)
    { name: 'Mocha', colors: ['espressoDark', 'caramel', 'latte', 'milkCream', 'ivoryCream'] },
    // Earth - 6 colors (#223030, #523D35, #959D90, #BBA58F, #E8D9CD, #EFEFE9)
    { name: 'Earth', colors: ['charcoalBlack', 'forestBrown', 'doveGray', 'sandstone', 'parchment', 'ivory'] },
    // Frosted - 6 colors (#29353C, #44576D, #768A96, #AAC7D8, #DFEBF6, #E6E6E6)
    { name: 'Frosted', colors: ['midnightSlate', 'steelSlate', 'sageGray', 'mistyBlue', 'frostBlue', 'paleIce'] },
    // Sensual - 6 colors (#050505, #610C27, #AC9C8D, #E3C1B4, #DDD9CE, #EFECE9)
    { name: 'Sensual', colors: ['nero', 'wineRed', 'desertSand', 'blushBeige', 'porcelain', 'ivoryCream'] },
    // Regal - 6 colors (#11100F, #5D1C34, #A67D44, #899481, #CDBCAB, #EFE9E1)
    { name: 'Regal', colors: ['jetBlack', 'plumWine', 'bronze', 'mintJade', 'paleAlmond', 'ivoryCream'] },
    // Spiced - 6 colors (#17222B, #86373E, #44332D, #F1BD78, #EFD9C7, #FBF8F0)
    { name: 'Spiced', colors: ['obsidian', 'cayenne', 'cinnamon', 'goldenHoney', 'champagne', 'ivoryCream'] },
    // Luxor - 6 colors (#322D29, #72383D, #AC9C8D, #D1C7BD, #D9D9D9, #EFE9E1)
    { name: 'Luxor', colors: ['onyxBlack', 'mahogany', 'taupeBrown', 'champagneGold', 'paleChampagne', 'creamWhite'] },
    // Suvinil color families
    { name: 'Suvinil Amarelos', colors: ['luzDeInverno', 'gengibre', 'cacauDaBahia', 'amareloReal'] },
    { name: 'Suvinil Laranjas', colors: ['areia', 'naturale', 'maraca', 'vitaminaDePapaia'] },
    { name: 'Suvinil Rosas', colors: ['rosaPastel', 'contoDeFadas', 'rosaNeon', 'valentino'] },
    { name: 'Suvinil Violetas', colors: ['chaDeRosas', 'chuvaDePetalas', 'florDeGeranio', 'roxoRustico'] },
    { name: 'Suvinil Azuis', colors: ['aguaFresca', 'ceuSereno', 'ilhasGregas', 'azulMarinho'] },
    { name: 'Suvinil Teals', colors: ['luzDaManha', 'calmaria', 'marMediterraneo', 'marVerde'] },
    { name: 'Suvinil Verdes', colors: ['verdeLavado', 'igarape', 'rioLimpido', 'trilhaNaMata'] },
    { name: 'Suvinil Verde-Amarelo', colors: ['rioPaine', 'capimSanto', 'cheiroVerde', 'capimSeco'] },
    { name: 'Suvinil Cinzas', colors: ['fotoRetro', 'banhoDePlatina', 'cinzaNatural', 'aventurinaPreta'] },
    { name: 'Suvinil Beges', colors: ['gelo', 'calopsita', 'algodaoEgipcio', 'invernoGelado'] },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <div className="px-2 py-1.5 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-800">Conjuntos de Bullets</h3>
      </div>

      {/* Compact Controls */}
      <div className="p-2 border-b border-gray-200 space-y-1.5">
        {/* Search (75%) + Number (25%) - Same layout as Bullets */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex-[3]">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Number selector (25%) */}
          <div className="flex items-center gap-1 flex-1">
            <button
              onClick={() => setItemCount(Math.max(2, itemCount - 1))}
              className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
            >
              −
            </button>
            <input
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(Math.max(2, Math.min(10, parseInt(e.target.value) || 3)))}
              className="w-10 px-1 py-1 text-center border border-gray-300 rounded text-xs"
              min="2"
              max="10"
            />
            <button
              onClick={() => setItemCount(Math.min(10, itemCount + 1))}
              className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
            >
              +
            </button>
          </div>
        </div>

        {/* Category + Color Scheme in one row */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as BulletSet['category'] | 'all')}
              className="w-full px-2 py-1.5 pr-6 text-xs border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
            >
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={colorSchemePresets.findIndex(p => JSON.stringify(p.colors) === JSON.stringify(colorScheme))}
              onChange={(e) => setColorScheme(colorSchemePresets[parseInt(e.target.value)].colors)}
              className="w-full px-2 py-1.5 pr-6 text-xs border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
            >
              {colorSchemePresets.map((preset, idx) => (
                <option key={preset.name} value={idx}>
                  {preset.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Compact Color preview bars */}
        <div className="flex gap-1">
          {colorScheme.map((color, idx) => (
            <div
              key={idx}
              className="flex-1 h-4 rounded"
              style={{ backgroundColor: COLOR_SCALES[color].medium }}
            />
          ))}
        </div>
      </div>

      {/* Bullet sets list */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredSets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Layers className="w-12 h-12 text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600">Nenhum conjunto encontrado</p>
            <p className="text-xs text-gray-500 mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSets.map((bulletSet) => (
              <DraggableBulletSet
                key={bulletSet.id}
                bulletSet={bulletSet}
                colorScheme={colorScheme}
                itemCount={itemCount}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">{filteredSets.length}</span> conjuntos disponíveis
        </p>
      </div>
    </div>
  );
}
