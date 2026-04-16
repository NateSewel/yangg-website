-- =====================================================
-- COMPLETE SAFE FIX - Handles "already exists" errors
-- Run this in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. FIX GALLERY TABLE SCHEMA
-- =====================================================

-- Make 'image' column optional
DO $$ 
BEGIN
  ALTER TABLE gallery ALTER COLUMN image DROP NOT NULL;
  RAISE NOTICE '✅ Gallery image column is now nullable';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE '⚠️  Image column already nullable or error: %', SQLERRM;
END $$;

-- Add 'image_url' column
DO $$ 
BEGIN
  ALTER TABLE gallery ADD COLUMN image_url TEXT;
  RAISE NOTICE '✅ Added image_url column to gallery';
EXCEPTION
  WHEN duplicate_column THEN
    RAISE NOTICE '⚠️  image_url column already exists';
END $$;

-- Copy existing data
UPDATE gallery 
SET image_url = image 
WHERE image_url IS NULL AND image IS NOT NULL;

-- =====================================================
-- 2. FIX GALLERY RLS POLICIES
-- =====================================================

-- Drop old policies
DROP POLICY IF EXISTS "Allow authenticated insert on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated update on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery" ON gallery;

-- Create new policies (with IF NOT EXISTS equivalent)
DO $$ 
BEGIN
  CREATE POLICY "Allow public insert on gallery"
    ON gallery FOR INSERT TO public WITH CHECK (true);
  RAISE NOTICE '✅ Created gallery INSERT policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Gallery INSERT policy already exists';
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Allow public update on gallery"
    ON gallery FOR UPDATE TO public USING (true);
  RAISE NOTICE '✅ Created gallery UPDATE policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Gallery UPDATE policy already exists';
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Allow public delete on gallery"
    ON gallery FOR DELETE TO public USING (true);
  RAISE NOTICE '✅ Created gallery DELETE policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Gallery DELETE policy already exists';
END $$;

-- =====================================================
-- 3. FIX EVENTS RLS POLICIES
-- =====================================================

-- Drop old policies
DROP POLICY IF EXISTS "Allow authenticated insert on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated update on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated delete on events" ON events;

-- Create new policies
DO $$ 
BEGIN
  CREATE POLICY "Allow public insert on events"
    ON events FOR INSERT TO public WITH CHECK (true);
  RAISE NOTICE '✅ Created events INSERT policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Events INSERT policy already exists';
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Allow public update on events"
    ON events FOR UPDATE TO public USING (true);
  RAISE NOTICE '✅ Created events UPDATE policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Events UPDATE policy already exists';
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Allow public delete on events"
    ON events FOR DELETE TO public USING (true);
  RAISE NOTICE '✅ Created events DELETE policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Events DELETE policy already exists';
END $$;

-- =====================================================
-- 4. FIX STORAGE POLICIES
-- =====================================================

-- Gallery Images Storage
DO $$ 
BEGIN
  CREATE POLICY "Allow public uploads to gallery-images"
    ON storage.objects FOR INSERT TO public
    WITH CHECK (bucket_id = 'gallery-images');
  RAISE NOTICE '✅ Created gallery-images INSERT policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Gallery-images INSERT policy already exists';
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Allow public access to gallery-images"
    ON storage.objects FOR SELECT TO public
    USING (bucket_id = 'gallery-images');
  RAISE NOTICE '✅ Created gallery-images SELECT policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Gallery-images SELECT policy already exists';
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Allow public deletes from gallery-images"
    ON storage.objects FOR DELETE TO public
    USING (bucket_id = 'gallery-images');
  RAISE NOTICE '✅ Created gallery-images DELETE policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Gallery-images DELETE policy already exists';
END $$;

-- Event Images Storage
DO $$ 
BEGIN
  CREATE POLICY "Allow public uploads to event-images"
    ON storage.objects FOR INSERT TO public
    WITH CHECK (bucket_id = 'event-images');
  RAISE NOTICE '✅ Created event-images INSERT policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Event-images INSERT policy already exists';
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Allow public access to event-images"
    ON storage.objects FOR SELECT TO public
    USING (bucket_id = 'event-images');
  RAISE NOTICE '✅ Created event-images SELECT policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Event-images SELECT policy already exists';
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Allow public deletes from event-images"
    ON storage.objects FOR DELETE TO public
    USING (bucket_id = 'event-images');
  RAISE NOTICE '✅ Created event-images DELETE policy';
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE '⚠️  Event-images DELETE policy already exists';
END $$;

-- =====================================================
-- 5. VERIFICATION
-- =====================================================

-- Check gallery table structure
SELECT '=== GALLERY TABLE STRUCTURE ===' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'gallery'
AND column_name IN ('image', 'image_url')
ORDER BY column_name;

-- Check gallery policies
SELECT '=== GALLERY POLICIES ===' as info;
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'gallery'
ORDER BY cmd, policyname;

-- Check events policies
SELECT '=== EVENTS POLICIES ===' as info;
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'events'
ORDER BY cmd, policyname;

-- Check storage policies
SELECT '=== STORAGE POLICIES ===' as info;
SELECT policyname, cmd
FROM pg_policies
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND (policyname LIKE '%gallery%' OR policyname LIKE '%event%')
ORDER BY policyname;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
SELECT '✅ ALL FIXES COMPLETED!' as status;
SELECT '📸 Gallery uploads should work now' as gallery_status;
SELECT '📅 Event creation should work now' as events_status;
SELECT '⚠️  These are PUBLIC policies for development' as warning;
SELECT '🔒 Add authentication for production' as security_note;
