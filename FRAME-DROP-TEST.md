# Frame Drop Detection - Manual Logic Test

## Test Scenario

**Canvas Setup:**
- Canvas size: 1920x1080
- Zoom: 0.5 (50%)
- Frame: Circle at center (960, 540) with size 300x300

**Frame Properties:**
- frame.x = 960 (center X)
- frame.y = 540 (center Y)
- frame.width = 300
- frame.height = 300
- Uses center registration (offsetX = 150, offsetY = 150)

**Expected Frame Bounds (with 50px padding):**
- frameLeft = 960 - 150 - 50 = 760
- frameRight = 960 + 150 + 50 = 1160
- frameTop = 540 - 150 - 50 = 340
- frameBottom = 540 + 150 + 50 = 690

## Mouse Position Test Cases

### Test 1: Mouse over frame center
**Screen position:** Assuming stage is at (100, 200) on screen
- Mouse screen X: 580 (100 + 960*0.5)
- Mouse screen Y: 470 (200 + 540*0.5)

**Calculation:**
```
stageX = 580 - 100 = 480
stageY = 470 - 200 = 270

canvasX = 480 / 0.5 = 960 ✅
canvasY = 270 / 0.5 = 540 ✅

Check: 960 >= 760 && 960 <= 1160 && 540 >= 340 && 540 <= 690
Result: TRUE ✅ - Frame should be detected!
```

### Test 2: Mouse at frame edge (left side)
**Canvas position:** 760, 540
**Screen position (with zoom 0.5):**
```
stageX = 760 * 0.5 = 380
stageY = 540 * 0.5 = 270

canvasX = 380 / 0.5 = 760 ✅
canvasY = 270 / 0.5 = 540 ✅

Check: 760 >= 760 && 760 <= 1160 && 540 >= 340 && 540 <= 690
Result: TRUE ✅ - Frame should be detected!
```

### Test 3: Mouse outside frame (to the left)
**Canvas position:** 750, 540 (10px outside padding)
**Screen position (with zoom 0.5):**
```
stageX = 750 * 0.5 = 375
stageY = 540 * 0.5 = 270

canvasX = 375 / 0.5 = 750 ✅
canvasY = 270 / 0.5 = 540 ✅

Check: 750 >= 760 && 750 <= 1160 && 540 >= 340 && 540 <= 690
Result: FALSE ❌ - Frame should NOT be detected!
```

## ISSUE FOUND!

Wait - I need to check the actual Stage rendering. Let me check BuilderCanvas again...
