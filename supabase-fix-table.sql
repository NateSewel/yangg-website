-- ============================================
-- Fix Events Table ID Column Type
-- ============================================
-- This script changes the id column from UUID to TEXT
-- Run this BEFORE running the seed script
-- ============================================

-- Step 1: Drop the existing events table (if you have test data you don't need)
DROP TABLE IF EXISTS events CASCADE;

-- Step 2: Recreate the events table with TEXT id
CREATE TABLE events (
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

-- Step 3: Create indexes for faster queries
CREATE INDEX events_category_idx ON events(category);
CREATE INDEX events_status_idx ON events(status);
CREATE INDEX events_created_at_idx ON events(created_at DESC);

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Step 5: Create policy to allow public read access
CREATE POLICY "Allow public read access on events"
  ON events FOR SELECT
  USING (true);

-- Step 6: Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on events"
  ON events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Step 7: Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update on events"
  ON events FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Step 8: Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete on events"
  ON events FOR DELETE
  USING (auth.role() = 'authenticated');

-- Step 9: Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify the table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events' 
ORDER BY ordinal_position;
