-- =====================================================
-- FIX EVENTS RLS POLICIES
-- This fixes the "new row violates row-level security policy for table events" error
-- =====================================================

-- Drop old restrictive policies (if they exist)
DROP POLICY IF EXISTS "Allow authenticated insert on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated update on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated delete on events" ON events;

-- Create new public policies for CMS
CREATE POLICY IF NOT EXISTS "Allow public insert on events"
  ON events FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public update on events"
  ON events FOR UPDATE
  TO public
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow public delete on events"
  ON events FOR DELETE
  TO public
  USING (true);

-- Verify
SELECT '✅ Events policies fixed! You can now create events.' as status;

-- Check policies
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'events';
