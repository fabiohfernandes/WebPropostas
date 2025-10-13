// ============================================================================
// Individual Bullets Session
// Browse and use single bullet elements
// ============================================================================

'use client';

import { useState } from 'react';
import { Circle, Hexagon, Diamond, Pill, Search, Sparkles, ChevronDown } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { useBuilderStore } from '@/store/builder';
import { INDIVIDUAL_BULLETS_LIBRARY } from '@/data/individualBulletsLibrary';
import type { IndividualBullet, BulletCategory, ColorScaleName } from '@/types/bulletSystemV2';
import { COLOR_SCALES } from '@/types/bulletSystemV2';
import type { Element } from '@/types/builder';

const CATEGORIES: { id: BulletCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Todos', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'basic-shapes', label: 'Formas', icon: <Circle className="w-4 h-4" /> },
  { id: 'process-steps', label: 'Processos', icon: <Pill className="w-4 h-4" /> },
  { id: 'icons', label: 'Ícones', icon: <Hexagon className="w-4 h-4" /> },
  { id: 'decorative', label: 'Decorativo', icon: <Diamond className="w-4 h-4" /> },
];

interface ColorSchema {
  id: string;
  name: string;
  colors: ColorScaleName[];
}

// Color Schemas (matching ColorsSessionEnhanced)
const COLOR_SCHEMAS: ColorSchema[] = [
  { id: 'all', name: 'Todas as Cores', colors: Object.keys(COLOR_SCALES) as ColorScaleName[] },
  { id: 'fresh', name: 'Fresh', colors: ['warmBrown', 'sageGreen', 'steelBlue', 'lightGray', 'coconutCream'] },
  { id: 'haze-sunset', name: 'Haze Sunset', colors: ['peach', 'coral', 'dustyRose', 'purpleGray', 'slateBlue'] },
  { id: 'studio', name: 'Studio', colors: ['goldenYellow', 'iceBlue', 'powderBlue', 'charcoal', 'mauve'] },
  { id: 'tropical', name: 'Tropical', colors: ['harvestGold', 'calico', 'hampton', 'seaNymph', 'smaltBlue'] },
  { id: 'sinopsys', name: 'Sinopsys', colors: ['softPeach', 'vintagePlum', 'midnightNavy'] },
  { id: 'aesthetic', name: 'Aesthetic', colors: ['maroonRed', 'ivoryWhite', 'shadowGray', 'taupe'] },
  { id: 'coconut', name: 'Coconut', colors: ['tangerine', 'coconutCream', 'espresso', 'khaki'] },
  { id: 'chicago', name: 'Chicago', colors: ['beigeTan'] },
  { id: 'dreamer', name: 'Dreamer', colors: ['aquaMist', 'lavenderGray', 'sandBeige', 'lilacMist'] },
  { id: 'officer', name: 'Officer', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine'] },
  { id: 'golden', name: 'Golden', colors: ['antiqueBronze', 'sandyBeige', 'lightGray', 'khaki', 'darkChocolate'] },
  { id: 'dusk', name: 'Dusk', colors: ['darkBrown', 'rosewood', 'dustySage', 'paleGray'] },
  { id: 'winter', name: 'Winter', colors: ['winterSky', 'steelBlue', 'deepOcean'] },
  { id: 'deep-water', name: 'Deep Water', colors: ['navyDepth'] },
  { id: 'bubblegum', name: 'Bubblegum', colors: ['amethyst', 'skyBlue', 'hotPink', 'sunflower'] },
  { id: 'summer-vibes', name: 'Summer Vibes', colors: ['mintGreen', 'lemonChiffon', 'blushPink', 'coralPink'] },
  { id: 'nude', name: 'Nude', colors: ['deepCharcoal', 'rosyBrown', 'sandyBeige', 'lightTan', 'creamBeige', 'ivoryCream'] },
  { id: 'officer2', name: 'Officer 2', colors: ['slateGray', 'tealBlue', 'softBlue', 'amber', 'tangerine'] },
  { id: 'blackberry', name: 'Blackberry', colors: ['vanillaCream', 'softBlue', 'mutedPurple'] },
  { id: 'officer3', name: 'Officer 3', colors: ['darkSlate', 'royalPurple', 'silverGray'] },
  { id: 'classic', name: 'Classic', colors: ['forestGreen', 'silverGray', 'lightGray', 'mustardYellow'] },
  { id: 'greenwich', name: 'Greenwich', colors: ['yaleBlue', 'dustyTeal', 'cambridgeBlue', 'mindaro'] },
  { id: 'hazy', name: 'Hazy', colors: ['deepForest', 'dustyTeal', 'sageGray', 'seafoam', 'lightGray', 'mintCream'] },
  { id: 'miami', name: 'Miami', colors: ['deepPurple', 'crimson', 'rubyRed', 'tangerineDream', 'goldenSun'] },
  { id: 'pastel', name: 'Pastel', colors: ['softLavender', 'blushPink', 'softCoral', 'warmGray'] },
  { id: 'mediterranean', name: 'Mediterranean', colors: ['deepTeal', 'skyBlue', 'lightBlue', 'coconutCream', 'tangerine'] },
  { id: 'terrace', name: 'Terrace', colors: ['deepViolet', 'burgundy'] },
  { id: 'lullaby', name: 'Lullaby', colors: ['paleRose', 'dustyPink', 'lightGray', 'warmGray'] },
  { id: 'viola', name: 'Viola', colors: ['deepAmethyst', 'orchid', 'goldCream', 'vanillaIce'] },
  { id: 'mocha', name: 'Mocha', colors: ['espressoDark', 'caramel', 'latte', 'milkCream', 'ivoryCream'] },
  { id: 'earth', name: 'Earth', colors: ['charcoalBlack', 'forestBrown', 'doveGray', 'sandstone', 'parchment', 'ivory'] },
  { id: 'frosted', name: 'Frosted', colors: ['midnightSlate', 'steelSlate', 'sageGray', 'mistyBlue', 'frostBlue', 'paleIce'] },
  { id: 'sensual', name: 'Sensual', colors: ['nero', 'wineRed', 'desertSand', 'blushBeige', 'porcelain', 'ivoryCream'] },
  { id: 'regal', name: 'Regal', colors: ['jetBlack', 'plumWine', 'bronze', 'mintJade', 'paleAlmond', 'ivoryCream'] },
  { id: 'spiced', name: 'Spiced', colors: ['obsidian', 'cayenne', 'cinnamon', 'goldenHoney', 'champagne', 'ivoryCream'] },
  { id: 'luxor', name: 'Luxor', colors: ['onyxBlack', 'mahogany', 'taupeBrown', 'champagneGold', 'paleChampagne', 'creamWhite'] },
  { id: 'suvinil-amarelos', name: 'Suvinil Amarelos', colors: ['luzDeInverno', 'gengibre', 'cacauDaBahia', 'amareloReal'] },
  { id: 'suvinil-laranjas', name: 'Suvinil Laranjas', colors: ['areia', 'naturale', 'maraca', 'vitaminaDePapaia'] },
  { id: 'suvinil-rosas', name: 'Suvinil Rosas', colors: ['rosaPastel', 'contoDeFadas', 'rosaNeon', 'valentino'] },
  { id: 'suvinil-violetas', name: 'Suvinil Violetas', colors: ['chaDeRosas', 'chuvaDePetalas', 'florDeGeranio', 'roxoRustico'] },
  { id: 'suvinil-azuis', name: 'Suvinil Azuis', colors: ['aguaFresca', 'ceuSereno', 'ilhasGregas', 'azulMarinho'] },
  { id: 'suvinil-teals', name: 'Suvinil Teals', colors: ['luzDaManha', 'calmaria', 'marMediterraneo', 'marVerde'] },
  { id: 'suvinil-verdes', name: 'Suvinil Verdes', colors: ['verdeLavado', 'igarape', 'rioLimpido', 'trilhaNaMata'] },
  { id: 'suvinil-verde-amarelo', name: 'Suvinil Verde-Amarelo', colors: ['rioPaine', 'capimSanto', 'cheiroVerde', 'capimSeco'] },
  { id: 'suvinil-cinzas', name: 'Suvinil Cinzas', colors: ['fotoRetro', 'banhoDePlatina', 'cinzaNatural', 'aventurinaPreta'] },
  { id: 'suvinil-beges', name: 'Suvinil Beges', colors: ['gelo', 'calopsita', 'algodaoEgipcio', 'invernoGelado'] },
];

interface DraggableBulletProps {
  bullet: IndividualBullet;
  color: ColorScaleName;
  number: number;
}

function DraggableBullet({ bullet, color, number }: DraggableBulletProps) {
  const { addElement, currentCanvasSize } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bullet-${bullet.id}-${Date.now()}`,
    data: {
      type: 'individual-bullet',
      bulletId: bullet.id,
      color,
      number,
    },
  });

  const svgContent = bullet.generateSVG({
    width: bullet.defaultWidth,
    height: bullet.defaultHeight,
    color,
    number,
  });

  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

  // Handle click to insert
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvasSize = currentCanvasSize();

    const newElement: Element = {
      id: `bullet-${Date.now()}`,
      type: 'bullet',
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      width: bullet.defaultWidth,
      height: bullet.defaultHeight,
      rotation: 0,
      opacity: 1,
      zIndex: 0,
      locked: false,
      visible: true,
      properties: {
        bulletId: bullet.id,
        bulletName: bullet.name,
        color: color,
        number: number,
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
        hover:border-violet-400 hover:shadow-lg
        transition-all duration-200
        p-3
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'}
      `}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Preview */}
      <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={svgDataUrl}
          alt={bullet.name}
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Info */}
      <div className="mt-2">
        <p className="text-xs font-semibold text-gray-800 truncate">{bullet.name}</p>
        <p className="text-xs text-gray-500 truncate">{bullet.description}</p>
      </div>

      {/* Premium badge */}
      {bullet.isPremium && (
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full">
          PRO
        </div>
      )}
    </div>
  );
}

export function IndividualBulletsSession() {
  const [selectedCategory, setSelectedCategory] = useState<BulletCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState<ColorScaleName>('limeGreen');
  const [currentNumber, setCurrentNumber] = useState(1);
  const [selectedColorSchema, setSelectedColorSchema] = useState<string>('all');

  // Filter bullets
  const filteredBullets = INDIVIDUAL_BULLETS_LIBRARY.filter((bullet) => {
    const matchesCategory = selectedCategory === 'all' || bullet.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      bullet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bullet.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <div className="px-2 py-1.5 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-800">Bullets Individuais</h3>
      </div>

      {/* Compact Controls */}
      <div className="p-2 border-b border-gray-200 space-y-1.5">
        {/* Search (75%) + Number (25%) */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex-[3]">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* Compact Number selector (25%) */}
          <div className="flex items-center gap-1 flex-1">
            <button
              onClick={() => setCurrentNumber(Math.max(1, currentNumber - 1))}
              className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
            >
              −
            </button>
            <input
              type="number"
              value={currentNumber}
              onChange={(e) => setCurrentNumber(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-10 px-1 py-1 text-center border border-gray-300 rounded text-xs"
              min="1"
              max="99"
            />
            <button
              onClick={() => setCurrentNumber(Math.min(99, currentNumber + 1))}
              className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
            >
              +
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as BulletCategory | 'all')}
            className="w-full px-2 py-1.5 pr-6 text-xs border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer"
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        {/* Color Schema + Color in one row */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="relative">
            <select
              value={selectedColorSchema}
              onChange={(e) => {
                setSelectedColorSchema(e.target.value);
                // Reset to first valid color of selected schema
                const schema = COLOR_SCHEMAS.find(s => s.id === e.target.value);
                if (schema && schema.colors.length > 0) {
                  const validColors = schema.colors.filter(c => COLOR_SCALES[c]);
                  if (validColors.length > 0) {
                    setSelectedColor(validColors[0]);
                  }
                }
              }}
              className="w-full px-2 py-1.5 pr-6 text-xs border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer"
            >
              {COLOR_SCHEMAS.map((schema) => (
                <option key={schema.id} value={schema.id}>
                  {schema.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value as ColorScaleName)}
              className="w-full px-2 py-1.5 pr-6 text-xs border border-gray-300 rounded appearance-none focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(90deg, ${COLOR_SCALES[selectedColor].light} 0%, ${COLOR_SCALES[selectedColor].medium} 50%, ${COLOR_SCALES[selectedColor].dark} 100%)`,
                color: ['navy', 'emerald'].includes(selectedColor) ? 'white' : 'black',
                fontWeight: '600'
              }}
            >
              {(() => {
                const schema = COLOR_SCHEMAS.find(s => s.id === selectedColorSchema);
                const availableColors = schema ? schema.colors : Object.keys(COLOR_SCALES) as ColorScaleName[];
                return availableColors
                  .filter(colorKey => COLOR_SCALES[colorKey]) // Filter out invalid colors
                  .map((colorKey) => (
                    <option
                      key={colorKey}
                      value={colorKey}
                      style={{
                        backgroundColor: COLOR_SCALES[colorKey].medium,
                        color: ['navy', 'emerald', 'darkBrown', 'espresso', 'darkChocolate', 'deepOcean', 'deepForest', 'deepTeal', 'deepPurple', 'deepViolet', 'nero', 'jetBlack', 'obsidian', 'onyxBlack', 'charcoalBlack', 'midnightNavy', 'midnightSlate', 'aventurinaPreta', 'azulMarinho', 'marVerde', 'trilhaNaMata', 'capimSeco', 'cinzaTecnologico', 'roxoRustico'].includes(colorKey) ? '#FFFFFF' : '#000000'
                      }}
                    >
                      {colorKey === 'limeGreen' ? 'Verde Limão' :
                       colorKey === 'teal' ? 'Verde Água' :
                       colorKey === 'navy' ? 'Azul Marinho' :
                       colorKey === 'lightBlue' ? 'Azul Claro' :
                       colorKey === 'emerald' ? 'Esmeralda' :
                       colorKey === 'orange' ? 'Laranja' :
                       colorKey === 'pink' ? 'Rosa' :
                       colorKey === 'purple' ? 'Roxo' : colorKey}
                    </option>
                  ));
              })()}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
              style={{ color: ['navy', 'emerald'].includes(selectedColor) ? 'white' : 'rgba(0,0,0,0.4)' }} />
          </div>
        </div>
      </div>

      {/* Bullets grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredBullets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Circle className="w-12 h-12 text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600">Nenhum bullet encontrado</p>
            <p className="text-xs text-gray-500 mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredBullets.map((bullet) => (
              <DraggableBullet
                key={bullet.id}
                bullet={bullet}
                color={selectedColor}
                number={currentNumber}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">{filteredBullets.length}</span> bullets disponíveis
        </p>
      </div>
    </div>
  );
}
