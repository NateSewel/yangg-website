-- Fix Gallery Table Schema
-- This adds the missing image_url column and updates existing data
-- Run this in Supabase SQL Editor

-- =====================================================
-- OPTION 1: Add image_url column (keeps existing data)
-- =====================================================

-- Add image_url column if it doesn't exist
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Copy data from 'image' column to 'image_url' if image_url is null
UPDATE gallery 
SET image_url = image 
WHERE image_url IS NULL AND image IS NOT NULL;

-- Make image_url NOT NULL after copying data
ALTER TABLE gallery 
ALTER COLUMN image_url SET NOT NULL;

-- =====================================================
-- OPTION 2: Rename 'image' to 'image_url' (cleaner)
-- =====================================================
-- Uncomment these lines if you prefer to rename instead:

-- ALTER TABLE gallery 
-- RENAME COLUMN image TO image_url;

-- =====================================================
-- Update RLS Policies to allow public insert/delete
-- (Needed for CMS to work without authentication)
-- =====================================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated insert on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated update on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery" ON gallery;

-- Create new public policies (for development/testing)
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
-- Verification
-- =====================================================

-- Check the gallery table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'gallery'
ORDER BY ordinal_position;

-- Check policies
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'gallery';

-- Expected columns:
-- id, title, description, image, image_path, image_url, category, created_at, updated_at

-- Expected policies:
-- Allow public read access on gallery (SELECT)
-- Allow public insert on gallery (INSERT)
-- Allow public update on gallery (UPDATE)
-- Allow public delete on gallery (DELETE)
