#!/bin/bash

# Read the 5 new bullet definitions (lines 64-389) from newBullets4266.ts
# and insert before the export line in individualBulletsLibrary.ts

# Extract the bullets (skip helper functions and exports at top/bottom)
sed -n '64,389p' newBullets4266.ts > bullets_to_insert.txt

# Insert before line 574 (before "// ============ Export library")
head -n 573 individualBulletsLibrary.ts > individualBulletsLibrary_new.ts
cat bullets_to_insert.txt >> individualBulletsLibrary_new.ts
tail -n +574 individualBulletsLibrary.ts >> individualBulletsLibrary_new.ts

# Backup and replace
cp individualBulletsLibrary.ts individualBulletsLibrary.backup
mv individualBulletsLibrary_new.ts individualBulletsLibrary.ts

echo "✅ Inserted 5 new bullets into individualBulletsLibrary.ts"
