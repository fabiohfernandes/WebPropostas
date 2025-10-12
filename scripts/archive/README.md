# Archived Python Scripts

This folder contains one-time Python scripts that were used during the development of the WebPropostas Template Builder to automate file modifications and refactoring tasks.

## Purpose

These scripts were created to perform bulk text replacements, code refactoring, and component reorganization during active development. They were instrumental in:

- Moving UI components between files
- Refactoring property panels and controls
- Implementing favorites functionality
- Reorganizing shadow controls
- Fixing styling and layout issues
- Converting UI patterns (pills to dropdowns, etc.)

## Status

**These scripts are archived and no longer needed.** They were single-use tools for specific development tasks that have been completed.

## Script Categories

### Property Panel Modifications
- `add_icon_properties.py` - Added icon properties panel
- `add_shadow_to_icon_properties.py` - Added shadow controls to icon properties
- `move_shadow_*.py` - Reorganized shadow controls layout
- `compact_properties_header.py` - Made properties panel header more compact

### Color Picker Enhancements
- `fix_color_picker.py` - Fixed color picker functionality
- `add_color_toggle*.py` - Added toggle behavior for color controls
- `add_auto_select_to_hex_inputs.py` - Made hex inputs auto-select on focus
- `fix_hex_*.py` - Fixed hex input positioning and behavior

### Favorites System
- `add_favorites_to_store.py` - Added favorites to Zustand store
- `add_favorites_dropdown_properties.py` - Added favorites dropdown to properties panel
- `add_favorites_to_dropdown.py` - Added favorites to category dropdown
- `use_shared_favorites.py` - Migrated to shared favorites state
- `fix_remaining_favorites_refs.py` - Fixed remaining favorites references

### Icons & Forms Panel
- `update_icons_session.py` - Updated icons session with new features
- `add_shapes_to_iconlibrary.py` - Added shapes to icon library
- `convert_categories_to_dropdown.py` - Converted category pills to dropdown
- `fix_icon_*.py` - Various icon-related fixes

### Shadow Controls
- `move_shadow_sliders_one_line.py` - Reorganized shadow sliders layout
- `reorganize_shadow_layout.py` - Reorganized shadow section layout
- `update_shadow_*.py` - Updated shadow defaults and styling
- `remove_duplicate_shadow.py` - Removed duplicate shadow sections

### General Fixes
- `fix_input_font_size.py` - Fixed input font sizes
- `fix_syntax_error.py` - Fixed orphaned code syntax errors
- `fix_buttons_simple.py` - Simplified button styling

## Note

Do not run these scripts again - they were designed for specific file states during development and may cause errors if run on the current codebase.
