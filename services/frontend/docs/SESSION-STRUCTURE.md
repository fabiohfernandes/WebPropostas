# Template Builder - Session Structure

**Document Purpose:** Define the structure and organization of the Builder's left sidebar sessions to provide a cleaner, more intuitive user experience with rich features.

**Last Updated:** 2025-10-09

---

## Design Philosophy

**REMOVE:** "Todas as Categorias" - too messy, shows too much information with few features
**IMPLEMENT:** Dedicated sessions with unique cards, each focused on specific content types
**GOAL:** Clean, organized, feature-rich interface similar to Canva's approach

---

## Session Breakdown

### 1. 📋 Templates Examples Session
**Purpose:** Pre-made template library for quick starts

**Features:**
- Thumbnail previews of complete templates
- Categories: Real Estate, Car Selling, Services Hiring, Product Catalogs, etc.
- One-click load into builder environment
- Fully editable after loading
- Pre-configured with titles, images, layouts, forms, etc.

**Implementation Notes:**
- Templates will be created and saved by user after all builder features are complete
- Requires functional template save/load system
- JSON-based template storage with preview thumbnails
- Metadata: category, name, description, thumbnail_url, template_data

**UI Components:**
- Grid layout with large thumbnails (150x200px)
- Hover preview with template name
- Filter by category dropdown
- Search functionality

---

### 2. ✍️ Text Session
**Purpose:** Rich text presets with pre-configured styling

**Text Types:**
- **Title** - Large, bold, attention-grabbing (48px, bold, various colors)
- **Subtitle** - Medium emphasis (32px, semi-bold)
- **Paragraph** - Body text (16px, regular, justified)
- **Alert** - Warning/notice text (red/yellow background, bold)
- **Reminder** - Highlighted callout (blue background, icon)
- **Price Tag** - Currency formatting (large, bold, colored, with currency symbol)
- **Quote** - Stylized quotations (italic, with quote marks)
- **Label** - Small descriptive text (12px, uppercase)
- **Call-to-Action** - Action-oriented text (bold, colored, with effects)

**Pre-made Configurations:**
- Bold variations
- Italic/scripted fonts
- Colored text (primary, secondary, accent colors)
- Outlined text (stroke effect)
- Glowed text (shadow/glow effects)
- Gradient text fills
- Text with background boxes

**Interaction:**
- Click to insert at canvas center
- Drag and drop to specific position
- Instant preview of style

---

### 3. 🎨 Forms and Icons Session
**Purpose:** Visual elements for design enrichment

**Icon Categories:**
- **Arrows** - Directional, curved, dashed, 3D arrows
- **Balloons/Bubbles** - Speech bubbles, thought clouds, callout shapes
- **Stars** - Rating stars, decorative stars, badges
- **Clouds** - Weather icons, decorative clouds
- **Checkmarks/X marks** - Approval/rejection icons
- **Geometric Shapes** - Triangles, hexagons, pentagons
- **Business Icons** - Charts, graphs, briefcase, handshake
- **Real Estate Icons** - House, key, location pin, ruler
- **Decorative Elements** - Flourishes, dividers, corners

**Icon Libraries to Integrate:**
- **Lucide React** (already installed) - 1000+ icons
- **Heroicons** - UI-focused icons
- **Font Awesome** (consider) - Extensive icon library
- **Flaticon** (API integration) - Millions of icons
- **The Noun Project** (API integration) - Custom illustrations
- **Undraw** - Customizable illustrations
- **Humaaans** - Mix-and-match character illustrations

**Forms Sub-category:**
- Pre-styled form bullets (current functionality)
- Expandable form templates
- Contact forms, quote request forms, etc.

**UI Organization:**
- Tabbed interface: Icons | Forms | Illustrations
- Search icons by keyword
- Filter by style (line, solid, duotone)
- Color picker to customize icon color on insertion

---

### 4. 🖼️ Frames Session
**Purpose:** Image framing and emphasis tools (Canva-style)

**Frame Types:**
- **Rounded Frames** - Circular, rounded corners (various radius)
- **Rectangle Frames** - Standard photo frames
- **Photo-like Frames** - Polaroid style, film strip, vintage frames
- **Side Frames** - Vertical/horizontal accent frames for page edges
- **Shape Masks** - Heart, star, cloud, custom shape frames
- **Decorative Borders** - Ornate, minimal, modern borders
- **Split Frames** - Before/after, comparison frames
- **Grid Frames** - Multiple images in one frame (collage)

**Frame Features:**
- Drop images into frames to apply mask
- Adjust frame size independent of image
- Frame color customization
- Border width and style options
- Shadow and depth effects
- Rotate and position frames

**Use Cases:**
- Emphasize specific house details in real estate
- Highlight car features in automotive sales
- Showcase service details with framed images
- Create professional photo galleries

**UI Components:**
- Thumbnail previews of frame styles
- Drag frame onto canvas, then drop image into it
- Quick swap between frame styles
- Frame + image management as grouped element

---

### 5. 📸 Images Session (Optimized)
**Purpose:** User image library with advanced organization

**Current Issues:**
- Users typically have MANY images (50-500+)
- Current thumbnail size too large
- No organization system
- Scrolling becomes difficult

**Improvements:**

#### Smaller Thumbnails
- Reduce from current size to 80x80px or 100x100px
- Grid layout: 3-4 columns
- Lazy loading for performance

#### Subsession Organization
**User-Created Subsessions:**
- Houses
- Apartments
- Commercial Properties
- Activities
- Amenities
- Before/After
- Custom categories (user-defined)

**UI for Subsessions:**
- Expandable accordion for each subsession
- "Create Subsession" button next to "Load Image"
- Drag images between subsessions
- Rename/delete subsessions
- Color-code subsessions

**Bulk Operations:**
- Multi-select images
- Move multiple to subsession
- Delete multiple
- Download selected

**Metadata & Search:**
- Image tags/keywords
- Search across all images
- Filter by subsession
- Sort by: date uploaded, name, size, usage count

**UI Layout:**
```
┌─────────────────────────────────┐
│ [+ Create Subsession] [Upload]  │
├─────────────────────────────────┤
│ 🔍 Search images...              │
├─────────────────────────────────┤
│ ▼ 🏠 Houses (24)                 │
│   [img][img][img][img]           │
│   [img][img][img][img]           │
├─────────────────────────────────┤
│ ▶ 🏢 Apartments (12)             │
├─────────────────────────────────┤
│ ▶ 🎯 Activities (8)              │
├─────────────────────────────────┤
│ ▶ ⭐ Featured (5)                │
└─────────────────────────────────┘
```

---

### 6. 🎥 Videos Session
**Purpose:** Embed YouTube-hosted videos in templates

**Features:**
- YouTube URL insertion
- Automatic thumbnail generation from YouTube API
- Video preview in library
- Drag and drop video placeholders onto canvas
- Video metadata: title, duration, channel

**Video Management:**
- Thumbnail grid (similar to images)
- Store video URL + thumbnail
- Edit video URL
- Delete video from library
- Organize in subsessions (optional)

**Canvas Representation:**
- Video placeholder with play icon overlay
- Thumbnail preview
- Click to open video settings (URL, size, autoplay, controls)
- Export as embedded iframe or link

**UI Components:**
- "Add YouTube Video" button with URL input modal
- Video thumbnail grid (120x90px - 16:9 ratio)
- Quick preview on hover
- Copy embed code option

**YouTube API Integration:**
- Fetch video metadata from URL
- Generate thumbnail automatically
- Validate video availability
- Handle private/unlisted videos

---

### 7. 📝 Bullets Session (Enhanced Forms)
**Purpose:** Pre-styled form bullets and layout patterns

**Bullet Styles:**
- **Standard Rectangles** - Basic title boxes
- **Rounded Corners** - Soft, modern look
- **One-Sided Rounded** - Left/right/top/bottom rounded only
- **Bookmark Style** - Angled corner cut-off
- **Ribbon Style** - Folded ribbon effect
- **Tag Style** - Price tag with hole/string
- **Badge Style** - Circular/shield badges
- **Callout Boxes** - With pointer/arrow
- **Torn Paper** - Rough edges effect

**Layout Patterns:**
- Vertical lists (numbered, bulleted)
- Horizontal timelines
- Grid layouts (2x2, 3x3)
- Comparison tables
- Feature highlights
- Step-by-step guides

**Customization:**
- Pre-made color schemes
- Gradient backgrounds
- Border styles (solid, dashed, double)
- Shadow and depth
- Icon integration (checkmarks, stars, numbers)

**UI Organization:**
- Filter by style: Simple | Decorative | Professional | Creative
- Preview with sample text
- Click to insert, auto-sized to content

---

### 8. 🤖 AI Assistant Session (ChatGPT Integration)
**Purpose:** AI-powered content creation and improvement

**Core Features:**

#### Image Generation
- Text-to-image with DALL-E integration
- Style presets (photorealistic, illustration, abstract)
- Size selection (square, landscape, portrait)
- Insert directly into canvas

#### Text Creation
- Generate proposal titles
- Write property descriptions
- Create compelling headlines
- Product descriptions
- Call-to-action copy

#### Translation
- Multi-language support
- Translate selected text elements
- Preserve formatting
- Support for: EN, ES, PT, FR, DE, IT

#### Content Correction
- Grammar and spelling check
- Tone adjustment (professional, casual, formal)
- Clarity improvements
- Brevity optimization

#### Idea Generation
- "Improve this design" suggestions
- Layout recommendations
- Color scheme suggestions
- Content structure ideas

**UI Components:**
```
┌─────────────────────────────────┐
│ 🤖 AI Assistant                  │
├─────────────────────────────────┤
│ [Generate Image]                 │
│ [Write Text]                     │
│ [Translate Content]              │
│ [Fix Grammar]                    │
│ [Get Ideas]                      │
├─────────────────────────────────┤
│ Chat Interface:                  │
│ ┌─────────────────────────────┐ │
│ │ User: Create a title for... │ │
│ │ AI: "Luxury Waterfront..."  │ │
│ └─────────────────────────────┘ │
│ [Type message...]        [Send] │
└─────────────────────────────────┘
```

**Context Awareness:**
- Knows current template type (real estate, automotive, etc.)
- Accesses selected element for context
- Learns from user preferences
- Suggests improvements based on design principles

**API Integration:**
- OpenAI GPT-4 for text generation
- DALL-E 3 for image generation
- Streaming responses for real-time feedback
- Token usage tracking

---

### 9. 💡 Ideas & Tips Session
**Purpose:** Contextual guidance for better designs

**Dynamic Content Based on Template Type:**

#### Real Estate Templates
- "Add a location map to increase engagement"
- "Use before/after images to show renovations"
- "Include neighborhood amenities"
- "Highlight square footage prominently"

#### Automotive Templates
- "Show multiple angles of the vehicle"
- "Include maintenance history"
- "Use comparison charts for features"
- "Add warranty information clearly"

#### Services Templates
- "Use customer testimonials"
- "Show step-by-step process"
- "Include pricing tiers"
- "Add FAQ section"

**Tutorial Types:**
- Quick tips (single sentence)
- Mini tutorials (3-5 steps)
- Video tutorials (embedded)
- Best practice articles

**UI Components:**
```
┌─────────────────────────────────┐
│ 💡 Tips for Your Design          │
├─────────────────────────────────┤
│ ⭐ Featured Tip                  │
│ "Add a clear call-to-action     │
│  button to increase conversions" │
│ [Apply This Tip]                 │
├─────────────────────────────────┤
│ 📚 Tutorials                     │
│ • How to choose colors           │
│ • Image placement best practices │
│ • Typography hierarchy           │
├─────────────────────────────────┤
│ 🎯 Template-Specific Tips        │
│ Based on: Real Estate Template   │
│ • Add virtual tour link          │
│ • Include contact info above fold│
└─────────────────────────────────┘
```

**Intelligence Features:**
- Analyze current design
- Detect missing elements (no CTA, no images, etc.)
- Suggest improvements based on industry standards
- A/B testing recommendations

---

## Session Navigation UI

### Compact Icon Navigation
Replace current "Todas as Categorias" with icon-based navigation:

```
┌─────┐
│ 📋  │ Templates
│ ✍️  │ Text
│ 🎨  │ Icons
│ 🖼️  │ Frames
│ 📸  │ Images
│ 🎥  │ Videos
│ 📝  │ Bullets
│ 🤖  │ AI
│ 💡  │ Tips
└─────┘
```

**Behavior:**
- Click icon to expand session
- Active session highlighted
- Tooltip on hover with session name
- Collapsible for more canvas space
- Remember last active session

---

## Implementation Priorities

### Phase 1 - Foundation (Week 1-2)
1. ✅ Rebuild left sidebar navigation structure
2. ✅ Implement session switching logic
3. ✅ Create base UI for each session (empty states)
4. ✅ Migrate existing functionality (text, images, forms)

### Phase 2 - Core Sessions (Week 3-4)
5. Optimize Images session with subsessions
6. Build Text presets library
7. Implement Bullets/Forms variations
8. Create Frames system

### Phase 3 - Rich Content (Week 5-6)
9. Integrate icon libraries (Lucide, Flaticon, etc.)
10. Add YouTube video integration
11. Build template save/load system
12. Create initial template library

### Phase 4 - AI Features (Week 7-8)
13. OpenAI GPT-4 integration for text
14. DALL-E 3 for image generation
15. Translation and correction features
16. Build AI chat interface

### Phase 5 - Intelligence (Week 9-10)
17. Ideas & Tips session with contextual suggestions
18. Template analysis and recommendations
19. Industry-specific tip database
20. Tutorial content creation

---

## Technical Considerations

### State Management
- Zustand store for each session
- Separate stores: `useTemplatesStore`, `useImagesStore`, `useVideosStore`, etc.
- Persist user subsession organization
- Cache AI responses

### Performance
- Lazy load session content
- Virtualized lists for large libraries
- Image optimization (WebP, lazy loading)
- Debounced search inputs

### Data Storage
- Images: Base64 with metadata in PostgreSQL
- Videos: URL + thumbnail URL storage
- Templates: JSON with preview thumbnail
- User preferences: Session organization, favorites

### API Integrations
- OpenAI API (GPT-4, DALL-E 3)
- YouTube Data API v3
- Flaticon API (optional)
- The Noun Project API (optional)

---

## Future Enhancements

### Advanced Features (Post-Launch)
- AI-powered auto-layout suggestions
- Template marketplace (share/sell templates)
- Collaborative editing (multiple users)
- Version history and rollback
- Export to multiple formats (PDF, PNG, HTML)
- Integration with CRM systems
- Analytics on template performance
- Custom font uploads
- Advanced animation effects

### Session Ideas for Consideration
- **Charts & Graphs Session** - Data visualization elements
- **Maps Session** - Interactive location maps
- **Social Media Session** - Pre-sized templates for Instagram, Facebook, etc.
- **Branding Session** - Logo, color palette, brand guidelines
- **Animation Session** - Motion effects and transitions
- **3D Elements Session** - 3D objects and effects

---

## Success Metrics

### User Experience
- Time to create first template: < 5 minutes
- Session switch speed: < 200ms
- Image search results: < 1 second
- AI response time: < 3 seconds

### Content Library
- Text presets: 50+ variations
- Icon library: 5000+ icons
- Frame styles: 100+ options
- Template examples: 20+ across 5 categories

### Engagement
- Sessions used per template creation: avg 4-5
- AI assistant usage: 30%+ of users
- Template reuse rate: 60%+
- Subsession creation: avg 3-4 per user

---

**Note:** This document is a living specification. Update as features are developed, user feedback is received, and new ideas emerge.
