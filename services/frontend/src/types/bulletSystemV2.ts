// ============================================================================
// Bullet System V2 - Type Definitions
// Complete rewrite with Individual Bullets and Bullet Sets architecture
// ============================================================================

// ============================================================================
// COLOR SYSTEM - Based on 4110.jpg Analysis
// ============================================================================

export interface ColorScale {
  light: string;   // Lightest shade (for highlights)
  medium: string;  // Medium shade (main color)
  dark: string;    // Darkest shade (for depth)
}

export const COLOR_SCALES = {
  black: {
    light: '#4A4A4A',
    medium: '#000000',
    dark: '#000000',
  },
  limeGreen: {
    light: '#C3D82E',
    medium: '#B4D432',
    dark: '#A6C639',
  },
  teal: {
    light: '#5ABAA5',
    medium: '#4FA896',
    dark: '#3D8977',
  },
  navy: {
    light: '#4A5B7F',
    medium: '#3D4D6B',
    dark: '#2E3A52',
  },
  lightBlue: {
    light: '#95C7E0',
    medium: '#7DAFCE',
    dark: '#4A90C0',
  },
  orange: {
    light: '#FF9A56',
    medium: '#FF7F3E',
    dark: '#E66A2C',
  },
  purple: {
    light: '#B794F6',
    medium: '#9F7AEA',
    dark: '#805AD5',
  },
  pink: {
    light: '#FBB6CE',
    medium: '#F687B3',
    dark: '#ED64A6',
  },
  emerald: {
    light: '#6EE7B7',
    medium: '#34D399',
    dark: '#10B981',
  },
  // Fresh palette - earthy natural tones
  sageGreen: {
    light: '#8FA670',
    medium: '#6E8658',
    dark: '#557048',
  },
  steelBlue: {
    light: '#8BB7C9',
    medium: '#73A1B2',
    dark: '#5C8392',
  },
  warmBrown: {
    light: '#6F5F51',
    medium: '#57473A',
    dark: '#3F322A',
  },
  lightGray: {
    light: '#E3E7E2',
    medium: '#D0D5CE',
    dark: '#B8BDB8',
  },
  // Haze Sunset palette - warm gradient tones
  peach: {
    light: '#FAC8AE',
    medium: '#F8B195',
    dark: '#F69A7C',
  },
  coral: {
    light: '#F98B99',
    medium: '#F67280',
    dark: '#F35967',
  },
  dustyRose: {
    light: '#CF859C',
    medium: '#C06C84',
    dark: '#A8576C',
  },
  purpleGray: {
    light: '#847191',
    medium: '#6C5B7B',
    dark: '#564965',
  },
  slateBlue: {
    light: '#4D7694',
    medium: '#355C7D',
    dark: '#2A4A66',
  },
  // Studio palette - professional contrast
  goldenYellow: {
    light: '#F5C635',
    medium: '#F2B408',
    dark: '#C99206',
  },
  iceBlue: {
    light: '#F5FCFE',
    medium: '#ECF8FD',
    dark: '#D4E9F2',
  },
  powderBlue: {
    light: '#C5DAE2',
    medium: '#AFCBD5',
    dark: '#8FB2C0',
  },
  charcoal: {
    light: '#3F4251',
    medium: '#272838',
    dark: '#1A1C27',
  },
  mauve: {
    light: '#9A686A',
    medium: '#815355',
    dark: '#664244',
  },
  // Tropical palette - coastal warm tones
  harvestGold: {
    light: '#E8B687',
    medium: '#E1A36F',
    dark: '#D89057',
  },
  calico: {
    light: '#E7D19C',
    medium: '#DEC484',
    dark: '#D5B76C',
  },
  hampton: {
    light: '#ECE4BB',
    medium: '#E2D8A5',
    dark: '#D8CC8D',
  },
  seaNymph: {
    light: '#8AB5B2',
    medium: '#6F9F9C',
    dark: '#588986',
  },
  smaltBlue: {
    light: '#7198A1',
    medium: '#577E89',
    dark: '#466671',
  },
  // Sinopsys - sunset gradient
  softPeach: { light: '#FFD7C3', medium: '#FFB997', dark: '#F67E7D' },
  vintagePlum: { light: '#9B5A77', medium: '#843B62', dark: '#621940' },
  midnightNavy: { light: '#1E1647', medium: '#0B032D', dark: '#050118' },
  // Aesthetic - bold minimalist
  maroonRed: { light: '#C73428', medium: '#A41F13', dark: '#7A1610' },
  shadowGray: { light: '#425160', medium: '#292F36', dark: '#1A1F25' },
  // Coconut - warm earth
  tangerine: { light: '#F4A43A', medium: '#DC6D18', dark: '#A84D0F' },
  espresso: { light: '#413E3A', medium: '#2B1A12', dark: '#1B0F08' },
  khaki: { light: '#D4CDB2', medium: '#B1AA81', dark: '#8E8661' },
  // Dreamer - soft pastels
  aquaMist: { light: '#DCF5F8', medium: '#B8E3E9', dark: '#93B1B5' },
  sandBeige: { light: '#F5EADC', medium: '#D9C4A9', dark: '#C19F7C' },
  lilacMist: { light: '#E8DEF0', medium: '#D4C2E0', dark: '#B39BC8' },
  // Officer - professional blues
  slateGray: { light: '#557D94', medium: '#2F4858', dark: '#1D2E3A' },
  periwinkle: { light: '#729BD8', medium: '#3E96F4', dark: '#2B6BB0' },
  // Golden - warm luxe
  antiqueBronze: { light: '#F4D7A1', medium: '#D9B061', dark: '#8D6F57' },
  darkChocolate: { light: '#5E3825', medium: '#3F0D0C', dark: '#2A0808' },
  // Dusk - muted earth
  darkBrown: { light: '#5C422D', medium: '#401B1B', dark: '#2A1212' },
  rosewood: { light: '#A6617D', medium: '#72383D', dark: '#4E2428' },
  // Winter - cool blues
  winterSky: { light: '#D7EBEF', medium: '#B8E3E9', dark: '#4F7C82' },
  deepOcean: { light: '#2A4B66', medium: '#0B2E33', dark: '#051821' },
  // Bubblegum - playful brights
  amethyst: { light: '#9B7FC4', medium: '#7F58AF', dark: '#5D3F7A' },
  skyBlue: { light: '#8FD5EB', medium: '#64C5EB', dark: '#3A9FBF' },
  hotPink: { light: '#F59DBD', medium: '#E84D8A', dark: '#C23768' },
  sunflower: { light: '#FFE060', medium: '#FEB326', dark: '#D89019' },
  // Summer Vibes - pastel gradient
  mintGreen: { light: '#D4F1E8', medium: '#A8E6CE', dark: '#7DCBA6' },
  lemonChiffon: { light: '#FFFACD', medium: '#FFF8B8', dark: '#F5E99E' },
  blushPink: { light: '#FFD4D4', medium: '#FFC1C1', dark: '#F5A0A0' },
  coralPink: { light: '#FFB4A8', medium: '#FF9B8A', dark: '#E87A6A' },
  // Nude - neutral sophistication
  deepCharcoal: { light: '#5A4E47', medium: '#3A2D28', dark: '#241A16' },
  rosyBrown: { light: '#C9A091', medium: '#A48374', dark: '#7B5D4F' },
  sandyBeige: { light: '#E6D0B8', medium: '#CBAD8D', dark: '#A8896B' },
  // Officer2 - corporate blues
  tealBlue: { light: '#5FA3BB', medium: '#33658A', dark: '#204A5D' },
  amber: { light: '#FFCD5C', medium: '#F6AE2D', dark: '#D68F1D' },
  // Blackberry - soft muted
  softBlue: { light: '#BDD8DB', medium: '#A3CBD5', dark: '#80B5BF' },
  mutedPurple: { light: '#9B94B8', medium: '#7B7399', dark: '#5C5571' },
  // Officer3 - dusk professional
  darkSlate: { light: '#4B5771', medium: '#323E56', dark: '#1F273A' },
  royalPurple: { light: '#6C6B9E', medium: '#4B4A78', dark: '#33325A' },
  silverGray: { light: '#C7C5D0', medium: '#A5A3B5', dark: '#7E7C8E' },
  // Classic - timeless neutrals
  forestGreen: { light: '#466C62', medium: '#2E4053', dark: '#1D2934' },
  mustardYellow: { light: '#FFD64D', medium: '#F1C40F', dark: '#C29D0A' },
  // Greenwich - coastal sophistication
  yaleBlue: { light: '#3D6894', medium: '#1B4079', dark: '#0F2A4D' },
  cambridgeBlue: { light: '#A5CEBD', medium: '#7F9C96', dark: '#5A7A71' },
  mindaro: { light: '#E5F4A8', medium: '#CBDF90', dark: '#A8BD6E' },
  // Hazy - sage minimalist
  deepForest: { light: '#2A4B44', medium: '#192524', dark: '#0E1615' },
  dustyTeal: { light: '#6A8583', medium: '#3C5759', dark: '#263B3D' },
  sageGray: { light: '#BCBFB8', medium: '#959D90', dark: '#6E776C' },
  seafoam: { light: '#E8F5F4', medium: '#D1EBDB', dark: '#B0D5CE' },
  // Miami - vibrant sunset
  deepPurple: { light: '#6B4D7A', medium: '#4A2D5A', dark: '#2F1B3A' },
  crimson: { light: '#B54666', medium: '#8B2847', dark: '#5F1A2F' },
  rubyRed: { light: '#E95976', medium: '#D62D4F', dark: '#A52038' },
  tangerineDream: { light: '#FF9E6D', medium: '#FF7F50', dark: '#E6633A' },
  goldenSun: { light: '#FFD98E', medium: '#FFC85A', dark: '#F5B338' },
  // Pastel - soft rainbow
  softLavender: { light: '#E8DEF8', medium: '#D4C2E8', dark: '#B39BD0' },
  softCoral: { light: '#FFD4D4', medium: '#FFA8A8', dark: '#F28080' },
  buttercream: { light: '#FFF8E1', medium: '#FFF0C1', dark: '#F5E090' },
  // Mediterranean - warm coastal
  deepTeal: { light: '#3A7A7C', medium: '#192524', dark: '#0C1514' },
  eucalyptus: { light: '#C4D7CE', medium: '#959D90', dark: '#6A7770' },
  // Terrace - sunset warmth
  deepViolet: { light: '#6B4D7A', medium: '#4A2D5A', dark: '#2F1B3A' },
  burgundy: { light: '#A5466B', medium: '#7B2D4A', dark: '#521C31' },
  // Lullaby - soft neutrals
  paleRose: { light: '#F5E8E8', medium: '#E8DEDE', dark: '#D4C2C2' },
  dustyPink: { light: '#F5C8C8', medium: '#E8A8A8', dark: '#D48888' },
  warmGray: { light: '#C8C0B8', medium: '#A8988C', dark: '#857568' },
  // Viola - purple sunset
  deepAmethyst: { light: '#9357A8', medium: '#752092', dark: '#52156B' },
  orchid: { light: '#E4A8D8', medium: '#C957BC', dark: '#A03B94' },
  goldCream: { light: '#FFF5E1', medium: '#FFC872', dark: '#F5B050' },
  // Mocha - rich earth
  espressoDark: { light: '#5A4D40', medium: '#332820', dark: '#1F1810' },
  caramel: { light: '#8D7B68', medium: '#5A4D40', dark: '#3F362E' },
  latte: { light: '#D4C8BD', medium: '#98867B', dark: '#6F5F54' },
  // Earth - deep forest
  charcoalBlack: { light: '#3F4844', medium: '#223030', dark: '#121A1A' },
  forestBrown: { light: '#7A6858', medium: '#523D35', dark: '#362620' },
  doveGray: { light: '#C8BFB8', medium: '#959D90', dark: '#6E7770' },
  sandstone: { light: '#E6D8C8', medium: '#BBA58F', dark: '#8F7D6A' },
  // Frosted - cool slate
  midnightSlate: { light: '#4A5B6D', medium: '#29353C', dark: '#181F24' },
  steelSlate: { light: '#6F8AA6', medium: '#44576D', dark: '#2C3A48' },
  mistyBlue: { light: '#BFD5E8', medium: '#AAC7D8', dark: '#8AACBF' },
  // Sensual - deep romance
  nero: { light: '#1F1A16', medium: '#050505', dark: '#000000' },
  wineRed: { light: '#8F3B4E', medium: '#610C27', dark: '#3F081A' },
  desertSand: { light: '#D9C8B8', medium: '#AC9C8D', dark: '#8A7A6A' },
  blushBeige: { light: '#F8D8C4', medium: '#E3C1B4', dark: '#C8A090' },
  // Regal - dark luxury
  jetBlack: { light: '#3A3530', medium: '#11100F', dark: '#050505' },
  plumWine: { light: '#8F4457', medium: '#5D1C34', dark: '#3A1120' },
  bronze: { light: '#D4A76A', medium: '#A67D44', dark: '#7A5A2F' },
  mintJade: { light: '#B5CEB8', medium: '#899481', dark: '#61695E' },
  // Spiced - warm spice
  obsidian: { light: '#3F3630', medium: '#17222B', dark: '#0A1014' },
  cayenne: { light: '#B8606A', medium: '#86373E', dark: '#5A2328' },
  cinnamon: { light: '#7A6050', medium: '#44332D', dark: '#2A1F1A' },
  goldenHoney: { light: '#FFD498', medium: '#F1BD78', dark: '#D49A50' },
  // Luxor - elegant earth
  onyxBlack: { light: '#4A4038', medium: '#322D29', dark: '#1A1714' },
  mahogany: { light: '#9C5E6B', medium: '#72383D', dark: '#4A2328' },
  taupeBrown: { light: '#D4C8B8', medium: '#AC9C8D', dark: '#7A6A5A' },
  // Missing colors from palette schemes - systematic naming
  coconutCream: { light: '#FFFEF8', medium: '#FFF4E4', dark: '#F8E0C9' },
  ivoryWhite: { light: '#FFFFFF', medium: '#FAF5F1', dark: '#E5DDD5' },
  beigeTan: { light: '#F0E2DA', medium: '#E3DCD2', dark: '#CC8B65' },

  // Chicago - 4 colors from palette
  lightCream: { light: '#F5F2ED', medium: '#E3DCCD', dark: '#D1C8B5' },
  warmTerracottaRust: { light: '#E5BCA8', medium: '#CC8B65', dark: '#A86642' },
  darkForestGreen: { light: '#2A5F54', medium: '#013328', dark: '#00211A' },
  deepCharcoalBlack: { light: '#3E3738', medium: '#100C0D', dark: '#000000' },

  lavenderGray: { light: '#C4B8D3', medium: '#93B1B5', dark: '#6A7B8A' },
  vanillaCream: { light: '#FFF9E6', medium: '#F5F0D8', dark: '#E2D8A5' },
  lightTan: { light: '#F3E8DF', medium: '#D1C7BD', dark: '#ADA095' },
  creamBeige: { light: '#FBF5ED', medium: '#EBE3DB', dark: '#D4C9BE' },
  ivoryCream: { light: '#FFFEF9', medium: '#F1EDE6', dark: '#E0D9CF' },
  paleGray: { light: '#F8F5F0', medium: '#F2F2EB', dark: '#D2DECE' },
  navyDepth: { light: '#4B6B94', medium: '#1B4079', dark: '#0F2647' },
  vanillaIce: { light: '#FFFEF8', medium: '#FFE3B3', dark: '#F5D090' },
  milkCream: { light: '#F5F0E8', medium: '#D0C6BD', dark: '#B0A598' },
  parchment: { light: '#FCF5E8', medium: '#E8D9CD', dark: '#CFBDAD' },
  ivory: { light: '#FFFEF9', medium: '#EFEFE9', dark: '#D9D9D4' },
  frostBlue: { light: '#F0F7FB', medium: '#DFEBF6', dark: '#C8DCEA' },
  paleIce: { light: '#F8FAFB', medium: '#E6E6E6', dark: '#CFCFCF' },
  porcelain: { light: '#F8F0E8', medium: '#DDD9CE', dark: '#C5BFB4' },
  paleAlmond: { light: '#F3E0C8', medium: '#CDBCAB', dark: '#A8958A' },
  champagne: { light: '#FFFAE8', medium: '#EFD9C7', dark: '#D4BFA5' },
  champagneGold: { light: '#E8D8C8', medium: '#D1C7BD', dark: '#B0A090' },
  paleChampagne: { light: '#F5F0E8', medium: '#D9D9D9', dark: '#BFBFBF' },
  creamWhite: { light: '#FFFEF9', medium: '#EFE9E1', dark: '#D9D4CB' },
  mintCream: { light: '#F7FBFB', medium: '#D0D5CE', dark: '#B0B8B4' },
  // Suvinil - Amarelos (Yellows)
  luzDeInverno: { light: '#F5F0D8', medium: '#EDE5C8', dark: '#D8CCAA' },
  gengibre: { light: '#F5E8B8', medium: '#ECD9A0', dark: '#D8C580' },
  cacauDaBahia: { light: '#FFD880', medium: '#F5C860', dark: '#E0B040' },
  amareloReal: { light: '#FFE860', medium: '#F5D840', dark: '#E0C020' },
  poDeGengibre: { light: '#D8C8A0', medium: '#C8B080', dark: '#A89860' },
  bananada: { light: '#A89870', medium: '#988860', dark: '#786840' },
  // Suvinil - Laranjas (Oranges)
  areia: { light: '#E8D8C0', medium: '#D8C8A8', dark: '#C0A888' },
  naturale: { light: '#F0D0B0', medium: '#E0C0A0', dark: '#C8A880' },
  maraca: { light: '#F0B890', medium: '#E0A870', dark: '#C89050' },
  vitaminaDePapaia: { light: '#F09860', medium: '#E08840', dark: '#C87020' },
  castanhaPortuguesa: { light: '#B89878', medium: '#A88860', dark: '#887040' },
  viraLataCaramelo: { light: '#C8B088', medium: '#B8A078', dark: '#988058' },
  // Suvinil - Vermelhos e Rosas (Reds & Pinks)
  rosaPastel: { light: '#F0D8D8', medium: '#E8C8C8', dark: '#D0A8A8' },
  contoDeFadas: { light: '#E8C0D0', medium: '#D8A8C0', dark: '#C088A0' },
  rosaNeon: { light: '#FF9BB0', medium: '#F080A0', dark: '#D86080' },
  valentino: { light: '#C83838', medium: '#B82020', dark: '#981010' },
  saiaJusta: { light: '#B88880', medium: '#A87870', dark: '#886050' },
  tapecaria: { light: '#A08080', medium: '#907070', dark: '#705050' },
  // Suvinil - Violetas (Purples)
  chaDeRosas: { light: '#E8D8E8', medium: '#D8C8D8', dark: '#C0A8C0' },
  chuvaDePetalas: { light: '#D8C0D8', medium: '#C8A8C8', dark: '#A888A8' },
  florDeGeranio: { light: '#C8A0C8', medium: '#B888B8', dark: '#986898' },
  maravilha: { light: '#C86898', medium: '#B85088', dark: '#983868' },
  violetaQueimado: { light: '#988898', medium: '#887888', dark: '#685868' },
  roxoRustico: { light: '#584878', medium: '#483868', dark: '#382848' },
  // Suvinil - Azuis (Blues)
  aguaFresca: { light: '#D8E8E8', medium: '#C8D8D8', dark: '#A8C0C0' },
  ceuSereno: { light: '#C8D8E8', medium: '#B0C8D8', dark: '#90A8C0' },
  ilhasGregas: { light: '#88B8D8', medium: '#70A8C8', dark: '#5088A8' },
  nevoaIntensa: { light: '#A8A8B8', medium: '#9898A8', dark: '#787888' },
  jeansLavado: { light: '#708898', medium: '#607888', dark: '#486068' },
  azulMarinho: { light: '#485870', medium: '#384860', dark: '#283848' },
  // Suvinil - Azuis Esverdeados (Teal/Turquoise)
  luzDaManha: { light: '#D8E8E8', medium: '#C8D8D8', dark: '#A8C0C0' },
  calmaria: { light: '#C0D8D8', medium: '#A8C8C8', dark: '#88B0B0' },
  marMediterraneo: { light: '#88B8B8', medium: '#70A8A8', dark: '#588888' },
  martimPescador: { light: '#489898', medium: '#388888', dark: '#286868' },
  vasoDeCeramica: { light: '#689898', medium: '#588888', dark: '#486868' },
  marVerde: { light: '#387870', medium: '#286860', dark: '#185048' },
  // Suvinil - Verdes (Greens)
  verdeLavado: { light: '#D8E8D8', medium: '#C8D8C8', dark: '#A8C0A8' },
  igarape: { light: '#B8D8B8', medium: '#A0C8A0', dark: '#80B080' },
  rioLimpido: { light: '#88C888', medium: '#70B870', dark: '#58A058' },
  verdeTrevo: { light: '#60A860', medium: '#509850', dark: '#408040' },
  verdePastel: { light: '#90A890', medium: '#809880', dark: '#687868' },
  trilhaNaMata: { light: '#607860', medium: '#506850', dark: '#405040' },
  // Suvinil - Verdes Amarelados (Yellow-Greens)
  rioPaine: { light: '#C8D0C0', medium: '#B8C0A8', dark: '#98A888' },
  capimSanto: { light: '#D8E0B8', medium: '#C8D0A0', dark: '#B0B880' },
  chenile: { light: '#D8E0A8', medium: '#C8D088', dark: '#B0B868' },
  cheiroVerde: { light: '#B8C078', medium: '#A8B060', dark: '#889848' },
  temperoSirio: { light: '#989858', medium: '#888848', dark: '#687038' },
  capimSeco: { light: '#788860', medium: '#687850', dark: '#586840' },
  // Suvinil - Cinzas (Grays)
  fotoRetro: { light: '#C8C0B8', medium: '#B8B0A8', dark: '#989088' },
  banhoDePlatina: { light: '#B8B0A8', medium: '#A8A098', dark: '#888078' },
  fantasiaPrateada: { light: '#A89890', medium: '#988878', dark: '#786860' },
  cinzaNatural: { light: '#988888', medium: '#887878', dark: '#685858' },
  cinzaTecnologico: { light: '#787878', medium: '#686868', dark: '#484848' },
  aventurinaPreta: { light: '#484848', medium: '#383838', dark: '#282828' },
  // Suvinil - Beges e Marrons (Beiges & Browns)
  gelo: { light: '#E8E0D8', medium: '#D8D0C8', dark: '#C0B0A8' },
  calopsita: { light: '#D0C8C0', medium: '#C0B8B0', dark: '#A89888' },
  cromio: { light: '#B8B0A8', medium: '#A8A098', dark: '#888078' },
  algodaoEgipcio: { light: '#E8D8C8', medium: '#D8C8B8', dark: '#C0A898' },
  rafia: { light: '#D0C0A8', medium: '#C0B098', dark: '#A89078' },
  invernoGelado: { light: '#C8B8A0', medium: '#B8A888', dark: '#988868' },

  // ============================================================================
  // MISSING COLORS FROM PALETTE AUDIT - Added 2025-10-13
  // ============================================================================

  // Deep Water - Navy blues gradient (5 colors total)
  deepNavy: { light: '#3B5A7C', medium: '#1B2A3D', dark: '#0A1220' },
  mediumNavy: { light: '#5681A8', medium: '#3B5A7C', dark: '#1B2A3D' },
  softNavy: { light: '#8EACBD', medium: '#5681A8', dark: '#3B5A7C' },
  lightNavyGray: { light: '#C7D4E0', medium: '#8EACBD', dark: '#5681A8' },
  paleNavyBlue: { light: '#E8EFF5', medium: '#C7D4E0', dark: '#8EACBD' },

  // Blackberry - Complete palette (5 colors total)
  paleBeige: { light: '#F5F0E8', medium: '#EDE2C8', dark: '#D8C8A8' },
  dustyTealGray: { light: '#BFD4D8', medium: '#A5BEC9', dark: '#7A98A8' },
  charcoalPurple: { light: '#6A6678', medium: '#3D3B47', dark: '#1F1E25' },

  // Aesthetic - Complete palette
  lightGrayBeige: { light: '#F0EDEA', medium: '#E0DBD8', dark: '#C8BFB8' },

  // Blackberry Additional (from audit - dusty teal was close but not exact)
  // Note: softBlue and mutedPurple already exist, charcoalPurple added above

  // ============================================================================
  // AUDIT REPORT BATCH - 2025-10-13 (39 missing colors)
  // ============================================================================

  // Terrace - 5 missing colors (most incomplete)
  slateBlueGray: { light: '#6B7D9D', medium: '#40506D', dark: '#2A3548' },
  dustyLavender: { light: '#C4BEC8', medium: '#9E98A4', dark: '#6E6878' },
  mutedPlum: { light: '#9178A0', medium: '#695B77', dark: '#443850' },
  dustyMauve: { light: '#C89DA8', medium: '#A56977', dark: '#7A4854' },
  softTerracotta: { light: '#EDB8A8', medium: '#D3807E', dark: '#B05854' },

  // Mocha - 3 missing colors
  deepMocha: { light: '#6A6158', medium: '#403B34', dark: '#282520' },
  mediumMocha: { light: '#7F766D', medium: '#57524B', dark: '#37342E' },
  lightMochaCream: { light: '#FDFCF8', medium: '#FEFDF8', dark: '#E8E5E0' },

  // Sinopsys - 2 missing colors
  coralPeach: { light: '#F5D4BD', medium: '#EEBB9C', dark: '#D9986F' },
  deepPlum: { light: '#7F5560', medium: '#551F3E', dark: '#35132A' },

  // Viola - 2 missing colors
  lightViolet: { light: '#D9C8E5', medium: '#B394C5', dark: '#8968A0' },
  paleVioletCream: { light: '#FCF8E8', medium: '#F9EFD5', dark: '#E8D8B8' },

  // Dusk - 2 missing colors
  mediumRosewood: { light: '#C59078', medium: '#9C6750', dark: '#6E4838' },
  softLavenderGray: { light: '#E8EFF5', medium: '#D5DCE5', dark: '#B0BBC8' },

  // Bubblegum - 2 missing colors
  paleYellowCream: { light: '#F9F5E8', medium: '#EEC97D', dark: '#D8AC50' },
  paleLavenderWhite: { light: '#FEFDFB', medium: '#F7F6F4', dark: '#E0DDD8' },

  // Single missing colors (1 each)
  // Aesthetic
  darkTaupe: { light: '#AE9A84', medium: '#897B70', dark: '#5F5448' },

  // Blackberry
  darkPlum: { light: '#5F4865', medium: '#322039', dark: '#1A1120' },

  // Classic
  mediumSteelBlue: { light: '#8A98A8', medium: '#5D6776', dark: '#3A4550' },

  // Coconut
  mediumKhaki: { light: '#C8C4A8', medium: '#AEAA86', dark: '#888460' },

  // Fresh
  darkWarmBrown: { light: '#584A3E', medium: '#53483C', dark: '#35302A' },

  // Lullaby
  warmTerracotta: { light: '#E8A878', medium: '#D88542', dark: '#B06028' },

  // Mediterranean
  richGold: { light: '#C4A860', medium: '#977833', dark: '#6A5220' },

  // Officer
  mediumCharcoal: { light: '#6F7578', medium: '#474D4F', dark: '#2A2F30' },

  // Officer2
  mediumSlate: { light: '#96A8B8', medium: '#6B819B', dark: '#475A70' },

  // Officer3
  lightSilver: { light: '#F8F8F8', medium: '#ECECEC', dark: '#C8C8C8' },

  // Pastel
  mediumGrayBrown: { light: '#A8A0A0', medium: '#847B7A', dark: '#5A5454' },

  // Summer Vibes
  softCoralPink: { light: '#F5C4C8', medium: '#E79196', dark: '#C85E68' },

  // Winter
  mediumSlateGray: { light: '#A8B8C0', medium: '#8EA3A6', dark: '#677A7E' },
} as const;

export type ColorScaleName = keyof typeof COLOR_SCALES;

// ============================================================================
// GRADIENT SYSTEM
// ============================================================================

export type GradientDirection = 'horizontal' | 'vertical' | 'radial' | 'diagonal';

export interface GradientConfig {
  type: 'linear' | 'radial';
  direction?: GradientDirection;
  stops: Array<{
    color: string;
    position: number; // 0-100
    opacity?: number; // 0-1
  }>;
}

// ============================================================================
// VISUAL EFFECTS
// ============================================================================

export interface GlassEffect {
  enabled: boolean;
  strokeWidth: number; // px
  strokeColor: string;
  strokeOpacity: number; // 0-1
  innerGlow?: {
    color: string;
    blur: number; // px
    opacity: number; // 0-1
  };
}

export interface ShadowEffect {
  enabled: boolean;
  offsetX: number; // px
  offsetY: number; // px
  blur: number; // px
  color: string;
  opacity: number; // 0-1
}

export interface VisualEffects {
  gradient?: GradientConfig;
  glass?: GlassEffect;
  shadow?: ShadowEffect;
  opacity?: number; // Overall opacity 0-1
}

// ============================================================================
// INDIVIDUAL BULLETS
// ============================================================================

export type BulletShape =
  | 'circle'
  | 'hexagon'
  | 'square'
  | 'diamond'
  | 'pill'
  | 'triangle'
  | 'pentagon'
  | 'rounded-square'
  | 'custom-path';

export type BulletCategory =
  | 'basic-shapes'      // Circles, squares, hexagons
  | 'process-steps'     // Numbered steps, sequences
  | 'icons'             // Icon-based bullets
  | 'connectors'        // Arrows, lines, flow elements
  | 'decorative'        // Ornamental elements
  | 'charts'            // Data visualization elements
  | 'custom';

export interface IndividualBullet {
  id: string;
  name: string;
  category: BulletCategory;
  description: string;

  // Visual properties
  shape: BulletShape;
  baseColor: ColorScaleName | 'custom';
  customColor?: string;

  // Size (in canvas units)
  defaultWidth: number;
  defaultHeight: number;
  aspectRatio: number;

  // Visual effects
  effects: VisualEffects;

  // Content customization
  customizable: {
    text: boolean;
    number: boolean;
    icon: boolean;
    color: boolean;
    size: boolean;
  };

  // SVG generator
  generateSVG: (options: BulletRenderOptions) => string;

  // Thumbnail for UI
  thumbnailSVG: string;

  // Metadata
  tags: string[];
  isPremium: boolean;
  usageCount?: number;
  createdAt: Date;
}

export interface BulletRenderOptions {
  width: number;
  height: number;
  color?: ColorScaleName | string;
  text?: string;
  number?: number;
  icon?: string; // Icon identifier
  effects?: Partial<VisualEffects>;
  customData?: Record<string, any>;
}

// ============================================================================
// BULLET SETS (Grouped Compositions)
// ============================================================================

export type SetLayout =
  | 'horizontal-sequence'   // A → B → C (linear flow)
  | 'vertical-stack'        // Stacked vertically
  | 'circular-flow'         // Radial/orbital arrangement
  | 'grid'                  // Grid layout (2x2, 3x3, etc.)
  | 'hexagon-cluster'       // Honeycomb arrangement
  | 'timeline'              // Timeline with dates/milestones
  | 'comparison'            // Side-by-side comparison
  | 'pyramid'               // Hierarchical pyramid
  | 'custom';

export interface SetElement {
  bulletId: string;         // Reference to IndividualBullet
  position: {
    x: number;              // Relative position in set
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  rotation?: number;        // Degrees
  colorOverride?: ColorScaleName | string;
  textOverride?: string;
  numberOverride?: number;
  zIndex?: number;          // Layering
}

export interface SetConnector {
  type: 'arrow' | 'line' | 'dashed-line' | 'curved-line' | 'double-arrow';
  from: {
    elementIndex: number;   // Index in elements array
    anchor: 'top' | 'right' | 'bottom' | 'left' | 'center';
  };
  to: {
    elementIndex: number;
    anchor: 'top' | 'right' | 'bottom' | 'left' | 'center';
  };
  style: {
    strokeWidth: number;
    strokeColor: string;
    strokeDashArray?: string; // e.g., "5,5" for dashed
    arrowSize?: number;
  };
}

export interface BulletSet {
  id: string;
  name: string;
  description: string;
  category: 'process' | 'flow' | 'comparison' | 'data-viz' | 'timeline' | 'custom';

  // Layout configuration
  layout: SetLayout;

  // Set dimensions (bounding box)
  width: number;
  height: number;

  // Elements in the set
  elements: SetElement[];

  // Connectors between elements
  connectors?: SetConnector[];

  // Customization options
  customizable: {
    elementCount: boolean;     // Can add/remove elements
    elementColors: boolean;    // Can change colors
    elementText: boolean;      // Can change text
    layout: boolean;           // Can rearrange
  };

  // SVG generator for complete set
  generateSVG: (options: SetRenderOptions) => string;

  // Thumbnail
  thumbnailSVG: string;

  // Metadata
  tags: string[];
  isPremium: boolean;
  usageCount?: number;
  createdAt: Date;

  // Usage guidance
  bestUsedFor: string[];     // e.g., ["3-step process", "Timeline", "Comparison"]
}

export interface SetRenderOptions {
  width: number;
  height: number;
  colorScheme?: ColorScaleName[];  // Array of colors for multi-element sets
  texts?: string[];                // Text for each element
  numbers?: number[];              // Numbers for each element
  customData?: Record<string, any>;
}

// ============================================================================
// LIBRARY MANAGEMENT
// ============================================================================

export interface BulletLibrary {
  individualBullets: IndividualBullet[];
  bulletSets: BulletSet[];
  userCreated: {
    bullets: IndividualBullet[];
    sets: BulletSet[];
  };
}

// ============================================================================
// SESSION STATE
// ============================================================================

export interface BulletSessionState {
  activeTab: 'individual' | 'sets';
  selectedCategory: BulletCategory | 'all';
  searchQuery: string;
  filters: {
    isPremium: boolean | null;
    colorScheme: ColorScaleName | null;
    tags: string[];
  };
  view: 'grid' | 'list';
}

// ============================================================================
// EXPORT HELPERS
// ============================================================================

export const DEFAULT_GLASS_EFFECT: GlassEffect = {
  enabled: true,
  strokeWidth: 3,
  strokeColor: '#ffffff',
  strokeOpacity: 0.6,
  innerGlow: {
    color: '#ffffff',
    blur: 4,
    opacity: 0.3,
  },
};

export const DEFAULT_SHADOW_EFFECT: ShadowEffect = {
  enabled: true,
  offsetX: 2,
  offsetY: 4,
  blur: 6,
  color: '#000000',
  opacity: 0.25,
};
