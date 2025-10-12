#!/usr/bin/env python3
"""
Add favorites state and actions to builder store
"""

# Read the builder store file
with open('services/frontend/src/store/builder.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add favorites to initial state (after elementsPanel)
old_initial_state = """      // Initial State - UI
      elementsPanel: {
        searchQuery: '',
        selectedCategory: null,
      },

      // Insertion mode - for click-to-insert elements
      insertionMode: null,"""

new_initial_state = """      // Initial State - UI
      elementsPanel: {
        searchQuery: '',
        selectedCategory: null,
      },

      // Favorites state
      favoriteIcons: [],

      // Insertion mode - for click-to-insert elements
      insertionMode: null,"""

# Add favorites actions at the end before closing bracket (search for setActiveSession)
old_set_active_session = """      setActiveSession: (session: 'templates' | 'text' | 'icons' | 'frames' | 'images' | 'videos' | 'bullets' | 'ai' | 'tips') => {
        set({ activeSession: session });
      },"""

new_set_active_session = """      setActiveSession: (session: 'templates' | 'text' | 'icons' | 'frames' | 'images' | 'videos' | 'bullets' | 'ai' | 'tips') => {
        set({ activeSession: session });
      },

      // Favorites Actions
      addFavoriteIcon: (iconId: string) => {
        set((state) => ({
          favoriteIcons: [...state.favoriteIcons, iconId],
        }));
      },

      removeFavoriteIcon: (iconId: string) => {
        set((state) => ({
          favoriteIcons: state.favoriteIcons.filter((id) => id !== iconId),
        }));
      },

      toggleFavoriteIcon: (iconId: string) => {
        set((state) => {
          if (state.favoriteIcons.includes(iconId)) {
            return { favoriteIcons: state.favoriteIcons.filter((id) => id !== iconId) };
          } else {
            return { favoriteIcons: [...state.favoriteIcons, iconId] };
          }
        });
      },"""

content = content.replace(old_initial_state, new_initial_state)
content = content.replace(old_set_active_session, new_set_active_session)

# Write updated file
with open('services/frontend/src/store/builder.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added favorites state and actions to builder store")
