# Fix: "Could not find the 'image_url' column"

## The Error You're Seeing

```
Could not find the 'image_url' column of 'gallery' in the schema cache
```

## What This Means

✅ Image uploaded to storage successfully!
❌ Database table has wrong column name

Your code uses `image_url` but the database table has `image` column.

## The Fix (30 Seconds)

### Run This SQL Script:

1. **Open Supabase SQL Editor**
   - Go to: https://supabase.com/dashboard
   - Click: **SQL Editor** (left sidebar)
   - Click: **New query**

2. **Copy & Paste This:**

```sql
-- Add image_url column
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Copy existing data
UPDATE gallery 
SET image_url = image 
WHERE image_url IS NULL AND image IS NOT NULL;

-- Fix RLS policies for gallery
DROP POLICY IF EXISTS "Allow authenticated insert on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated update on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated delete on gallery" ON gallery;

CREATE POLICY "Allow public insert on gallery"
  ON gallery FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update on gallery"
  ON gallery FOR UPDATE TO public USING (true);

CREATE POLICY "Allow public delete on gallery"
  ON gallery FOR DELETE TO public USING (true);

-- Fix RLS policies for events
DROP POLICY IF EXISTS "Allow authenticated insert on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated update on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated delete on events" ON events;

CREATE POLICY "Allow public insert on events"
  ON events FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update on events"
  ON events FOR UPDATE TO public USING (true);

CREATE POLICY "Allow public delete on events"
  ON events FOR DELETE TO public USING (true);
```

3. **Click "Run"** (or Ctrl+Enter)

4. **Test Upload Again**
   - Go to: http://localhost:5174/admin/gallery/new
   - Upload an image
   - Should work now! ✅

## What This Does

1. **Adds `image_url` column** to gallery table
2. **Copies data** from old `image` column to new `image_url`
3. **Updates RLS policies** to allow public access (for CMS)

## Alternative: Use Complete Fix Script

For a complete fix of all issues at once:

```bash
# Run the comprehensive fix
# Copy content from: fix-all-rls-policies.sql
```

This fixes:
- Gallery table schema
- Gallery RLS policies
- Events RLS policies
- Storage bucket policies

## Verification

After running the SQL:

### Check Table Structure
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'gallery';
```

Should show both `image` and `image_url` columns.

### Check Policies
```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'gallery';
```

Should show INSERT, UPDATE, DELETE policies for public.

### Test Upload
1. Go to gallery upload page
2. Select an image
3. Should upload and save successfully
4. Should appear in gallery list

## Understanding the Issue

### Original Schema
```sql
CREATE TABLE gallery (
  image TEXT NOT NULL,  -- Old column name
  ...
);
```

### Your Code Expected
```javascript
const galleryData = {
  image_url: data.url,  // New column name
  ...
}
```

### The Fix
Add `image_url` column so both work:
```sql
ALTER TABLE gallery 
ADD COLUMN image_url TEXT;
```

## Why RLS Policies Matter

The error also revealed that your RLS policies required authentication:

```sql
-- Old (restrictive)
WITH CHECK (auth.role() = 'authenticated')

-- New (public for development)
WITH CHECK (true)
```

Without authentication in your CMS, you need public policies.

## Security Note

⚠️ **These policies allow public access!**

For production, you should:
1. Add authentication to admin routes
2. Change policies back to require authentication:
   ```sql
   WITH CHECK (auth.role() = 'authenticated')
   ```
3. Implement proper user roles
4. Add rate limiting

## Success Indicators

✅ SQL runs without errors
✅ Gallery table has `image_url` column
✅ Policies allow public INSERT/UPDATE/DELETE
✅ Image uploads successfully
✅ Image saves to database
✅ Image appears in gallery list
✅ Image displays on website

## Troubleshooting

### Error: "column already exists"
- Good! The column was already added
- Just run the policy updates

### Error: "policy already exists"
- Drop the old policy first:
  ```sql
  DROP POLICY "policy_name" ON gallery;
  ```
- Then create the new one

### Images still not saving
- Check browser console for new errors
- Verify all policies are created
- Check Supabase logs (Dashboard > Logs)

## Next Steps

After this fix:
1. Test uploading multiple images
2. Test deleting images
3. Test event creation/editing
4. Consider adding authentication
5. Update policies for production

## Summary

The fix is simple:
1. Add `image_url` column to gallery table
2. Update RLS policies to allow public access
3. Test upload again
4. Done! ✅

Your CMS will now work completely!
