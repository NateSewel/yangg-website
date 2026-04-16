-- =====================================================
-- SIMPLE FIX - Only fixes the schema issue
-- Run this if you get "policy already exists" errors
-- =====================================================

-- 1. Make 'image' column optional (this is the key fix!)
ALTER TABLE gallery ALTER COLUMN image DROP NOT NULL;

-- 2. Add 'image_url' column if it doesn't exist
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 3. Copy existing data
UPDATE gallery 
SET image_url = image 
WHERE image_url IS NULL AND image IS NOT NULL;

-- Done!
SELECT '✅ Schema fixed! Try uploading now.' as status;

-- Verify the fix
SELECT column_name, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'gallery' 
AND column_name IN ('image', 'image_url');

-- Expected result:
-- image      | YES  (nullable)
-- image_url  | YES  (nullable)
