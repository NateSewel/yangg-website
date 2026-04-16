-- =====================================================
-- FINAL FIX - Run this in Supabase SQL Editor
-- =====================================================
-- This fixes the "null value in column image" error
-- =====================================================

-- 1. Make the 'image' column nullable (allow NULL)
ALTER TABLE gallery 
ALTER COLUMN image DROP NOT NULL;

-- 2. Add image_url column if it doesn't exist
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 3. Copy existing data from image to image_url
UPDATE gallery 
SET image_url = image 
WHERE image_url IS NULL AND image IS NOT NULL;

-- 4. Fix Gallery RLS Policies (allow public access for CMS)
DROP POLICY IF EXISTS "Allow authenticated insert on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated update on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery" ON gallery;

CREATE POLICY "Allow public insert on gallery"
  ON gallery FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update on gallery"
  ON gallery FOR UPDATE TO public USING (true);

CREATE POLICY "Allow public delete on gallery"
  ON gallery FOR DELETE TO public USING (true);

-- 5. Fix Events RLS Policies (allow public access for CMS)
DROP POLICY IF EXISTS "Allow authenticated insert on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated update on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated delete on events" ON events;

CREATE POLICY "Allow public insert on events"
  ON events FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update on events"
  ON events FOR UPDATE TO public USING (true);

CREATE POLICY "Allow public delete on events"
  ON events FOR DELETE TO public USING (true);

-- 6. Fix Storage Policies for Gallery Images
DROP POLICY IF EXISTS "Allow public uploads to gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to gallery-images" ON storage.objects;

CREATE POLICY "Allow public uploads to gallery-images"
  ON storage.objects FOR INSERT TO public
  WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Allow public access to gallery-images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow public deletes from gallery-images"
  ON storage.objects FOR DELETE TO public
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow public updates to gallery-images"
  ON storage.objects FOR UPDATE TO public
  USING (bucket_id = 'gallery-images');

-- 7. Fix Storage Policies for Event Images
DROP POLICY IF EXISTS "Allow public uploads to event-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to event-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from event-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates to event-images" ON storage.objects;

CREATE POLICY "Allow public uploads to event-images"
  ON storage.objects FOR INSERT TO public
  WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Allow public access to event-images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'event-images');

CREATE POLICY "Allow public deletes from event-images"
  ON storage.objects FOR DELETE TO public
  USING (bucket_id = 'event-images');

CREATE POLICY "Allow public updates to event-images"
  ON storage.objects FOR UPDATE TO public
  USING (bucket_id = 'event-images');

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check gallery table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'gallery'
ORDER BY ordinal_position;

-- Check gallery policies
SELECT 
  policyname, 
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'gallery';

-- Check storage policies
SELECT 
  policyname, 
  cmd
FROM pg_policies
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND (policyname LIKE '%gallery%' OR policyname LIKE '%event%')
ORDER BY policyname;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
SELECT '✅ ALL FIXES APPLIED SUCCESSFULLY!' as status;
SELECT '📸 You can now upload gallery images!' as message;
SELECT '🎉 You can now create and edit events!' as message2;
SELECT '⚠️  Remember: These are PUBLIC policies for development.' as warning;
SELECT '🔒 For production, add authentication and restrict access.' as security_note;
