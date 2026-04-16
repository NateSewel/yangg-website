-- =====================================================
-- YANGG Website Database Schema
-- =====================================================
-- Run these SQL commands in your Supabase SQL Editor
-- =====================================================

-- 1. CREATE EVENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  theme TEXT,
  short_description TEXT,
  overview TEXT,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('conference', 'training', 'workshop', 'campaign')),
  status TEXT NOT NULL CHECK (status IN ('completed', 'upcoming', 'ongoing')),
  image TEXT,
  image_path TEXT,
  objectives JSONB,
  speakers JSONB,
  panelists JSONB,
  facilitators JSONB,
  topics JSONB,
  highlights JSONB,
  focus_areas JSONB,
  participants TEXT,
  impact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS events_category_idx ON events(category);
CREATE INDEX IF NOT EXISTS events_status_idx ON events(status);
CREATE INDEX IF NOT EXISTS events_created_at_idx ON events(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on events"
  ON events FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on events"
  ON events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update on events"
  ON events FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete on events"
  ON events FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- 2. CREATE GALLERY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  image_path TEXT,
  category TEXT NOT NULL CHECK (category IN ('conference', 'training', 'workshop', 'all')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS gallery_category_idx ON gallery(category);
CREATE INDEX IF NOT EXISTS gallery_created_at_idx ON gallery(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on gallery"
  ON gallery FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on gallery"
  ON gallery FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update on gallery"
  ON gallery FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete on gallery"
  ON gallery FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- 3. CREATE STORAGE BUCKETS
-- =====================================================
-- Run these commands in Supabase Dashboard > Storage

-- Create event-images bucket
-- Go to Storage > Create a new bucket
-- Name: event-images
-- Public: Yes (for public access to images)

-- Create gallery-images bucket
-- Go to Storage > Create a new bucket
-- Name: gallery-images
-- Public: Yes (for public access to images)

-- =====================================================
-- 4. CREATE UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for events table
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for gallery table
CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. SAMPLE DATA (OPTIONAL)
-- =====================================================
-- Insert sample event
INSERT INTO events (
  title,
  theme,
  short_description,
  overview,
  date,
  location,
  category,
  status,
  objectives,
  highlights
) VALUES (
  'Africa The Future Conference 2024',
  'Digital Innovation for Sustainable Development',
  'A groundbreaking conference bringing together young African leaders to discuss digital transformation.',
  'The Africa The Future Conference is our flagship annual event that brings together over 500 young African leaders, innovators, and changemakers.',
  'March 15-17, 2024',
  'Lagos, Nigeria',
  'conference',
  'upcoming',
  ARRAY['Foster digital innovation', 'Build partnerships', 'Share best practices'],
  ARRAY['500+ participants from 17 countries', 'Panel discussions with industry leaders', 'Networking opportunities']
);

-- Insert sample gallery item
INSERT INTO gallery (
  title,
  description,
  image,
  category
) VALUES (
  'Leadership Training Workshop',
  'Young leaders participating in capacity building session',
  'https://via.placeholder.com/800x600',
  'training'
);
