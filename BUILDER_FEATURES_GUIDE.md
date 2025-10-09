# Template Builder - New Features Guide

## ✅ Implemented Features

### 1. Background Image Upload
**Location:** Properties Panel (when no element is selected)

**How to use:**
1. Click on canvas background (deselect all elements)
2. In Properties Panel → "Fundo da Página"
3. Change type to "Imagem"
4. **Option A:** Click "Escolher arquivo" button and select an image from your computer
5. **Option B:** Paste an image URL in the text field
6. Adjust opacity with slider (0-100%)

**Supported formats:** PNG, JPG, GIF (up to 10MB)

---

### 2. Canvas Panning (Space + Drag or Middle Mouse)

**Method 1: Space Key**
1. Hold **Spacebar** → cursor changes to ✋ grab icon
2. Click and drag with mouse → canvas pans/scrolls
3. Release **Spacebar** → normal mode

**Method 2: Middle Mouse Button**
1. Click and hold **Middle Mouse Button** (scroll wheel button)
2. Drag to pan canvas
3. Release button → normal mode

**Visual feedback:**
- ✋ Grab cursor when Space is pressed
- ✊ Grabbing cursor while panning

---

### 3. Click-to-Insert Mode (Alternative to Drag-and-Drop)

**Perfect for notebook touchpad users!**

**How to use:**
1. **Click** any element in the left Elements Panel:
   - Título (Heading)
   - Parágrafo (Paragraph)
   - Imagem (Image)
   - Retângulo (Rectangle)
   - Círculo (Circle)

2. Element gets **blue border** (active state)

3. Canvas cursor changes to **✚ crosshair**

4. **Click** anywhere on canvas to insert the element at that position

5. Element is automatically:
   - Inserted at clicked position
   - Selected (ready for editing)
   - Insertion mode exits

**Cancel insertion:**
- Press **ESC** key to exit without inserting

**Visual indicators:**
- Blue background + border = Element selected for insertion
- ✚ Crosshair cursor = Insertion mode active

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Space + Drag** | Pan/scroll canvas |
| **ESC** | Cancel insertion mode |
| **Delete** or **Backspace** | Delete selected element |

---

## Mouse Actions

| Action | Result |
|--------|--------|
| **Click element in panel** | Activate click-to-insert mode |
| **Click on canvas** | Insert element (if in insertion mode) or deselect |
| **Middle mouse + drag** | Pan canvas |
| **Drag element from panel** | Still works! Drag-and-drop unchanged |

---

## Tips & Tricks

### For Touchpad Users
- Use **click-to-insert** instead of drag-and-drop (much easier!)
- Use **Space + drag** for panning (more precise than scrolling)

### For Mouse Users
- **Middle mouse button** for quick panning
- **Drag-and-drop** still available if preferred
- **Click-to-insert** for precise positioning

### General
- **Insertion mode** auto-exits after placing element
- **ESC key** cancels any insertion mode
- **Blue border** shows which element will be inserted
- **Crosshair cursor** indicates insertion mode is active
- **Grab/Grabbing cursors** show panning state

---

## Troubleshooting

**Click-to-insert not working?**
- Make sure element has blue border (active state)
- Check that cursor is crosshair ✚
- Try pressing ESC and clicking element again

**Pan not working?**
- Make sure Spacebar is held down
- OR try middle mouse button instead
- Check cursor changes to grab ✋ icon

**Background upload not showing?**
- Check file size (max 10MB)
- Verify image format (PNG, JPG, GIF)
- Try using URL instead as alternative

---

## Access the Builder

Visit: **http://localhost:3001/builder**

Enjoy the improved user experience! 🎨
