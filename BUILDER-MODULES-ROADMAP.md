# Builder Modules Roadmap - Advanced Features

**Status:** Planned for future implementation
**Priority:** After core bullet library completion
**Target:** Enhanced Canvas Builder functionality

---

## 🎯 Overview

These modules will enhance the Canvas Builder with professional design tools inspired by Canva, focusing on margins, decorative elements, and frame systems.

---

## 📏 Module 1: Drawing Margins System

**Purpose:** Professional document layout control with precision margin management

### Core Features

#### 1. Preset Margin Templates
- **Document types:** Resume, Letter, Book Page, Poster, Business Card, Flyer
- **Industry standards:** APA format, MLA format, Legal documents
- **International sizes:** A4, Letter, Tabloid, A3, etc.
- **One-click application** with instant visual feedback

#### 2. Visual Margin Guides
- **Draggable lines** with live measurements (px/in/cm/mm)
- **Real-time preview** showing affected content areas
- **Snap-to-grid** functionality for precise alignment
- **Color-coded zones** for different margin types

#### 3. Asymmetric Controls
- **Independent controls:** Top, Right, Bottom, Left margins
- **Link/unlink toggle:** Chain icon to sync all sides
- **Numeric inputs** with +/- buttons for precision
- **Slider controls** for quick visual adjustments
- **Unit conversion:** Auto-convert between px/in/cm/mm

#### 4. Bleed Settings (Print-Ready)
- **Bleed zones** outside margins (typically 3mm/0.125in)
- **Visual indicators** showing bleed areas
- **Print guidelines** showing safe zone vs bleed zone
- **Export options** with/without bleed marks

#### 5. Safe Zones
- **Inner margins** where critical content should stay
- **Visual warnings** when elements enter unsafe areas
- **Auto-adjust** mode to keep content within safe zones
- **Custom safe zone** sizing for specific needs

#### 6. Custom Presets
- **Save favorite configurations** with descriptive names
- **Share presets** with team/organization
- **Import/export** preset collections
- **Default preset** per project type

#### 7. Smart Guides
- **Visual indicators** when elements approach margins
- **Snap-to-margin** functionality with configurable threshold
- **Distance measurements** from nearest margin
- **Highlight violations** in red when content crosses margins

#### 8. Margin Locking
- **Lock margins** to prevent accidental edits
- **Password protection** for critical document templates
- **Visual lock indicator** on canvas
- **Unlock confirmation** dialog for safety

### UI/UX Design

```typescript
interface MarginControls {
  presets: MarginPreset[];
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    linked: boolean;
  };
  bleed: {
    enabled: boolean;
    size: number;
  };
  safeZone: {
    enabled: boolean;
    innerMargin: number;
  };
  unit: 'px' | 'in' | 'cm' | 'mm';
  locked: boolean;
}
```

**Visual Elements:**
- Numeric inputs with +/- steppers
- Slider for quick adjustments (0-200px range)
- Visual preview panel showing colored zones
- Chain icon to link/unlink margin sides
- Unit dropdown selector
- Lock/unlock toggle button

**Color Coding:**
- Margin area: Light blue (rgba(59, 130, 246, 0.1))
- Bleed area: Light red (rgba(239, 68, 68, 0.1))
- Safe zone: Light green (rgba(34, 197, 94, 0.1))
- Content area: White/transparent

---

## 🌿 Module 2: Plant Stamps Library

**Purpose:** Rich decorative botanical elements for designs

### Core Features

#### 1. Categorized Library
- **Trees:** Oak, Pine, Palm, Maple, Cherry Blossom, Bonsai
- **Flowers:** Rose, Tulip, Sunflower, Daisy, Orchid, Lily
- **Succulents:** Cacti, Aloe, Jade, Echeveria
- **Leaves:** Monstera, Fern, Eucalyptus, Ivy
- **Vines:** Climbing plants, hanging vines, decorative tendrils
- **Herbs:** Basil, Rosemary, Lavender, Mint

#### 2. Search and Filter
- **By color:** Green, red, yellow, multicolor, monochrome
- **By season:** Spring blooms, Summer growth, Autumn leaves, Winter evergreens
- **By style:** Realistic, Minimalist, Watercolor, Line art, Silhouette
- **By size:** Small accents, Medium elements, Large focal points
- **By orientation:** Upright, Horizontal, Radial

#### 3. Stamp Variations
- **Different angles:** 0°, 45°, 90°, 180° rotations
- **Sizes:** Small, Medium, Large, Extra Large
- **Growth stages:** Seedling, Growing, Mature, Blooming
- **Health states:** Fresh, Dried, Wilted (for artistic effect)

#### 4. Brush Mode
- **Click repeatedly** to scatter plants naturally
- **Density control:** Sparse to Dense (1-100)
- **Random placement** within brush radius
- **Collision detection:** Avoid overlapping (optional)
- **Paint along path** functionality

#### 5. Randomization Options
- **Size variation:** ±0-50% from base size
- **Rotation randomization:** ±0-180°
- **Opacity variation:** ±0-30%
- **Color tint variation:** Slight hue shifts
- **Flip horizontal/vertical:** Random mirroring

#### 6. Seasonal Collections
- **Spring:** Cherry blossoms, tulips, daffodils, fresh greens
- **Summer:** Sunflowers, tropical leaves, bright blooms
- **Autumn:** Orange/red leaves, acorns, harvest plants
- **Winter:** Evergreens, holly, pinecones, snow-dusted plants

#### 7. Custom Plant Upload
- **User uploads:** SVG/PNG with transparent background
- **Auto-categorization:** AI-suggested categories and tags
- **Stamp preprocessing:** Auto-generate variations
- **Library management:** Personal collection organization

#### 8. Arrangement Presets
- **Bouquet:** Circular arrangement with center focal point
- **Wreath:** Circular border with plants facing outward
- **Border:** Linear arrangement along edges
- **Corner decorations:** L-shaped arrangements for corners
- **Scattered:** Random natural placement
- **Symmetrical:** Mirrored arrangements

### Special Tools

#### Scatter Brush
```typescript
interface ScatterBrush {
  enabled: boolean;
  radius: number;           // Brush size in pixels
  density: number;          // 1-100, plants per brush stroke
  randomRotation: boolean;
  randomSize: boolean;
  sizeVariation: number;    // ±percentage
  opacityVariation: number; // ±percentage
}
```

#### Growth Animation (Digital Use)
- **Animate from seed to full size**
- **Duration control:** 1-10 seconds
- **Easing options:** Linear, Ease-in, Ease-out, Bounce
- **Loop settings:** Once, Loop, Ping-pong

#### Color Tinting
- **Palette integration:** Apply current color schema
- **Hue shift:** -180° to +180°
- **Saturation:** -100% (grayscale) to +100%
- **Brightness:** -50% to +50%
- **Duotone mode:** Two-color stylization

#### Shadow/Depth Effects
- **Drop shadow:** Offset, blur, opacity
- **Long shadow:** Flat design style
- **3D depth:** Layer stacking effect
- **Ground shadow:** Realistic plant shadow

---

## 🖼️ Module 3: Document Frames System

**Purpose:** Professional borders and decorative frames for content

### Core Features

#### 1. Frame Styles Library
- **Classic:** Traditional rectangular borders, elegant lines
- **Modern:** Clean geometric, minimalist, asymmetric
- **Ornate:** Baroque, Victorian, Art Nouveau flourishes
- **Minimal:** Hairline borders, subtle accents
- **Hand-drawn:** Sketchy, artistic, imperfect lines
- **Geometric:** Hexagons, circles, polygons, abstract shapes

#### 2. Corner Decorations
- **Flourishes:** Curved decorative elements
- **Adaptive sizing:** Scale with frame dimensions
- **Independent control:** Customize each corner separately
- **Corner styles:** Sharp, rounded, ornamental, cut
- **Position offset:** Move corners in/out from edges

#### 3. Border Thickness Control
- **Hairline:** 1px ultra-thin
- **Thin:** 2-4px
- **Medium:** 5-8px
- **Thick:** 9-15px
- **Bold:** 16-30px
- **Custom:** Manual pixel input

#### 4. Pattern Fills
- **Dots:** Single, double, gradient dots
- **Dashes:** Various dash/gap combinations
- **Double lines:** Parallel lines with spacing
- **Decorative patterns:** Waves, zigzag, chain, rope
- **Custom patterns:** User-defined SVG patterns

#### 5. Rounded Corners
- **Adjustable radius:** 0px (sharp) to full radius
- **Per-corner control:** Independent corner radii
- **Visual preview:** Real-time corner rounding
- **Presets:** Sharp, Slightly rounded, Rounded, Pill

#### 6. Multi-Layer Frames
- **Stack multiple frames** with visual depth
- **Offset control:** Space between frame layers
- **Layer ordering:** Front to back arrangement
- **Individual styling:** Different colors per layer
- **Blend modes:** Normal, Multiply, Overlay, etc.

#### 7. Smart Scaling
- **Content-aware:** Frame adapts to content size
- **Maintain proportions:** Lock aspect ratio
- **Minimum/maximum sizes:** Boundary constraints
- **Auto-padding:** Consistent spacing from content
- **Breakpoints:** Different frame styles at size thresholds

#### 8. Photo Frame Mode
- **Built-in masks/clipping:** Content clips to frame shape
- **Mat board simulation:** Inner border effect
- **Shadow effects:** Realistic photo frame shadows
- **Hanging wire:** Decorative top accent (optional)
- **Glass reflection:** Subtle shine effect

### Specialized Frame Types

#### Certificate Borders
- **Formal styles:** Academic, professional, achievement
- **Ribbon accents:** Top, bottom, corner ribbons
- **Seal placement:** Corner or center seal graphics
- **Signature lines:** Pre-formatted signature areas
- **Emblem holders:** Spaces for logos/crests

#### Polaroid/Photo Frames
- **Instant film style:** White borders, shadow effects
- **Caption area:** Bottom text space
- **Rotation:** Slight tilt for casual look
- **Tape effect:** Washi tape at corners
- **Pin/clip graphics:** Decorative attachments

#### Speech Bubbles & Callouts
- **Tail/pointer:** Adjustable position and angle
- **Bubble shapes:** Round, cloud, rectangular
- **Comic styles:** Bold outlines, halftone fills
- **Thought bubbles:** Connected circles style
- **Explosion shapes:** Dynamic action frames

#### Decorative Page Borders
- **Full page:** Frames around entire canvas
- **Title frames:** Top banner styles
- **Footer frames:** Bottom accent borders
- **Side panels:** Vertical decorative strips
- **Corner accents:** L-shaped decorations

#### Cultural/Themed Frames
- **Art Deco:** Geometric, metallic, 1920s style
- **Vintage:** Distressed, antique, retro
- **Botanical:** Leaves, vines, floral elements
- **Nautical:** Anchors, ropes, waves
- **Festive:** Holiday-specific designs
- **Regional:** Cultural motifs (Celtic, Asian, African, etc.)

### Technical Implementation

#### SVG-Based Architecture
```typescript
interface DocumentFrame {
  id: string;
  name: string;
  category: FrameCategory;
  svg: {
    outerPath: string;      // Main border path
    innerPath?: string;     // Optional inner border
    corners: CornerElement[];
    patterns: PatternElement[];
  };
  properties: {
    thickness: number;
    color: string;
    opacity: number;
    cornerRadius: number;
    pattern?: PatternType;
  };
  effects: {
    shadow: boolean;
    glow: boolean;
    gradient: boolean;
  };
}
```

#### Frame Customization System
- **Color picker:** Per-element color control
- **Transparency/opacity:** 0-100% per element
- **Pattern customization:** Spacing, size, rotation
- **Gradient editor:** Multi-stop gradients for borders
- **Effect stack:** Layer multiple effects

#### Performance Optimization
- **SVG caching:** Pre-render common frame styles
- **Lazy loading:** Load frame library on demand
- **Progressive enhancement:** Simple frames load first
- **GPU acceleration:** CSS transforms for scaling/rotating

---

## 🗓️ Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Design UI/UX for all three modules
- [ ] Create database schemas for storing configurations
- [ ] Build base component structure

### Phase 2: Margins Module (Weeks 3-4)
- [ ] Implement visual margin guides
- [ ] Build margin controls UI
- [ ] Add preset templates
- [ ] Implement bleed and safe zones
- [ ] Create smart guides system

### Phase 3: Plant Stamps Module (Weeks 5-7)
- [ ] Build plant library with categories
- [ ] Implement search and filter
- [ ] Create brush/scatter tool
- [ ] Add randomization engine
- [ ] Build arrangement presets

### Phase 4: Frames Module (Weeks 8-10)
- [ ] Build frame library with styles
- [ ] Implement SVG frame system
- [ ] Create corner decorations
- [ ] Add pattern fill engine
- [ ] Build multi-layer frame system

### Phase 5: Integration & Polish (Weeks 11-12)
- [ ] Integrate all modules with main builder
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] User documentation
- [ ] Tutorial videos

---

## 🎨 Design System Integration

All modules must integrate with existing builder systems:

### Color Schemas
- All decorative elements support color schema application
- Plant stamps can be tinted to match active schema
- Frames use schema colors by default

### Responsive Design
- Margins adapt to different canvas sizes
- Plant stamps scale appropriately
- Frames maintain proportions across sizes

### Undo/Redo Support
- All operations must be reversible
- History tracking for all module actions
- State snapshots for complex operations

### Export Compatibility
- Margins respected in PDF export
- Plant stamps exported as vectors (SVG) or rasters (PNG)
- Frames maintain quality at all export sizes

---

## 💡 Future Enhancements

### Advanced Features (Post-MVP)
- **AI-powered margin suggestions** based on content type
- **Plant arrangement AI** for natural-looking compositions
- **Custom frame creator** - User-designed frames
- **3D frame effects** - Depth and perspective
- **Animated frames** - Moving borders for digital use
- **Frame marketplace** - User-created frame sharing
- **Smart content fitting** - Auto-resize content to frames
- **Collaborative frame editing** - Real-time co-design

### Integration Possibilities
- **Template gallery** with pre-configured margins
- **Brand kit** integration for consistent margins/frames
- **Print provider** API integration for bleed requirements
- **Stock photo** integration for plant imagery
- **Font pairing** suggestions for framed text

---

## 📊 Success Metrics

### User Engagement
- Module adoption rate
- Average time spent in each module
- Most used presets and templates
- User-created content (custom plants, frames)

### Quality Metrics
- Export success rate with margins
- Print-ready document accuracy
- Frame rendering performance
- User satisfaction scores

### Business Metrics
- Premium feature conversion (if applicable)
- Reduction in support tickets about margins/frames
- User retention improvement
- Feature request fulfillment

---

## 🛠️ Technical Stack Recommendations

### Frontend
- **SVG manipulation:** SVGJS or Fabric.js for frame/plant rendering
- **Drag interactions:** React DnD or native Pointer Events
- **Visual guides:** Canvas API for margin overlays
- **Color manipulation:** Chroma.js or TinyColor

### Backend
- **Asset storage:** S3 or similar for plant/frame libraries
- **Image processing:** Sharp or ImageMagick for stamp preprocessing
- **SVG optimization:** SVGO for frame compression
- **Preset storage:** PostgreSQL for user configurations

### Performance
- **Virtual scrolling:** For large plant/frame libraries
- **Web Workers:** For heavy computation (scatter brush)
- **Service Workers:** Cache common assets
- **CDN delivery:** Fast asset loading globally

---

**Priority:** Build after completing all 35 bullet types
**Dependencies:** Requires stable Canvas Builder core
**Estimated Effort:** 12 weeks with 1-2 developers
**User Impact:** HIGH - Professional design capabilities
**Complexity:** MEDIUM-HIGH - Requires careful UX design

---

**Document Status:** ✅ Complete roadmap for future implementation
**Last Updated:** Current session
**Next Review:** After bullet library completion
