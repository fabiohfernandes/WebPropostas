# Canvas Pan & Click-to-Insert Implementation Plan

## Features to Implement:

### 1. Canvas Panning
- **Space + Drag**: Hold Space key and drag canvas to pan
- **Middle Mouse Button**: Click & drag with middle mouse button to pan
- **Cursor Change**: Show grab/grabbing cursor when panning

### 2. Click-to-Insert Mode
- **Activation**: Click element in ElementsPanel activates insertion mode
- **Visual Feedback**: Crosshair cursor on canvas during insertion mode
- **Click-to-Place**: Click on canvas to insert element at that position
- **ESC to Cancel**: Press ESC to exit insertion mode without inserting

## Files to Modify:

### 1. types/builder.ts - Add insertion mode action
```typescript
// In BuilderState interface, add under "// Actions - UI":
setInsertionMode: (mode: { type: ElementType; defaultProps: Partial<Element> } | null) => void;
```

### 2. store/builder.ts - Implement setInsertionMode action
```typescript
// After setSelectedCategory action (~line 420):
setInsertionMode: (mode) => {
  set({ insertionMode: mode });
},
```

### 3. BuilderCanvas.tsx - Add panning & click-to-insert
- Add state for panning (isPanning, panStart, stagePosition)
- Handle Space key down/up events
- Handle middle mouse button events
- Handle click events when in insertion mode
- Add canvas click handler to insert elements
- Update cursor styles based on mode

### 4. ElementsPanel.tsx - Enable click-to-insert
- Add onClick handler to element cards
- Call setInsertionMode when element clicked
- Show visual indication when element selected for insertion

## Implementation Steps:

1. ✅ Update types/builder.ts with insertionMode state & action
2. ✅ Update store/builder.ts with initial state & action
3. ⏳ Implement panning in BuilderCanvas.tsx
4. ⏳ Implement click-to-insert in BuilderCanvas.tsx
5. ⏳ Update ElementsPanel.tsx to enable insertion mode
6. ⏳ Test both features
