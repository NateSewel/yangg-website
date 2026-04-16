-- Fix Storage Bucket Policies for Gallery and Event Images
-- Run this in Supabase SQL Editor to allow uploads

-- ============================================
-- GALLERY IMAGES BUCKET POLICIES
-- ============================================

-- 1. Allow anyone to upload to gallery-images bucket
CREATE POLICY "Allow public uploads to gallery-images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'gallery-images');

-- 2. Allow anyone to read from gallery-images bucket
CREATE POLICY "Allow public access to gallery-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'gallery-images');

-- 3. Allow anyone to update files in gallery-images bucket
CREATE POLICY "Allow public updates to gallery-images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'gallery-images');

-- 4. Allow anyone to delete from gallery-images bucket
CREATE POLICY "Allow public deletes from gallery-images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'gallery-images');

-- ============================================
-- EVENT IMAGES BUCKET POLICIES
-- ============================================

-- 1. Allow anyone to upload to event-images bucket
CREATE POLICY "Allow public uploads to event-images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'event-images');

-- 2. Allow anyone to read from event-images bucket
CREATE POLICY "Allow public access to event-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'event-images');

-- 3. Allow anyone to update files in event-images bucket
CREATE POLICY "Allow public updates to event-images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'event-images');

-- 4. Allow anyone to delete from event-images bucket
CREATE POLICY "Allow public deletes from event-images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'event-images');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if policies were created successfully
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- Expected output should show all 8 policies created above
