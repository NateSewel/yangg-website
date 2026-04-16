-- Fix All RLS Policies for CMS
-- This allows public access for development/testing
-- Run this in Supabase SQL Editor

-- =====================================================
-- 1. FIX GALLERY TABLE
-- =====================================================

-- Add image_url column if missing
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Copy existing image data to image_url
UPDATE gallery 
SET image_url = image 
WHERE image_url IS NULL AND image IS NOT NULL;

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Allow authenticated insert on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated update on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery" ON gallery;

-- Create new public policies
CREATE POLICY "Allow public insert on gallery"
  ON gallery FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on gallery"
  ON gallery FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow public delete on gallery"
  ON gallery FOR DELETE
  TO public
  USING (true);

-- =====================================================
-- 2. FIX EVENTS TABLE
-- =====================================================

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Allow authenticated insert on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated update on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated delete on events" ON events;

-- Create new public policies
CREATE POLICY "Allow public insert on events"
  ON events FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on events"
  ON events FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow public delete on events"
  ON events FOR DELETE
  TO public
  USING (true);

-- =====================================================
-- 3. FIX STORAGE POLICIES
-- =====================================================

-- Gallery Images Storage
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

-- Event Images Storage
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
-- 4. VERIFICATION
-- =====================================================

-- Check gallery table structure
SELECT 'Gallery Columns:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'gallery'
ORDER BY ordinal_position;

-- Check gallery policies
SELECT 'Gallery Policies:' as info;
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'gallery';

-- Check events policies
SELECT 'Events Policies:' as info;
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'events';

-- Check storage policies
SELECT 'Storage Policies:' as info;
SELECT policyname, cmd
FROM pg_policies
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
SELECT '✅ All policies updated successfully!' as status;
SELECT '⚠️  Remember: These are PUBLIC policies for development.' as warning;
SELECT '🔒 For production, add authentication and restrict to authenticated users.' as security_note;
