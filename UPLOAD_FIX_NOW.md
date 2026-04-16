# 🚀 Fix Gallery Upload NOW (30 Seconds)

## Your Error:
```
StorageApiError: new row violates row-level security policy
```

## The Fix:

### 1. Open Supabase SQL Editor
- Go to: https://supabase.com/dashboard
- Click: **SQL Editor** (left sidebar)
- Click: **New query**

### 2. Copy & Paste This SQL:

```sql
-- Allow uploads to gallery-images
CREATE POLICY "Allow public uploads to gallery-images"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'gallery-images');

-- Allow viewing gallery-images
CREATE POLICY "Allow public access to gallery-images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'gallery-images');

-- Allow deletes from gallery-images
CREATE POLICY "Allow public deletes from gallery-images"
ON storage.objects FOR DELETE TO public
USING (bucket_id = 'gallery-images');

-- Allow uploads to event-images
CREATE POLICY "Allow public uploads to event-images"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'event-images');

-- Allow viewing event-images
CREATE POLICY "Allow public access to event-images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'event-images');

-- Allow deletes from event-images
CREATE POLICY "Allow public deletes from event-images"
ON storage.objects FOR DELETE TO public
USING (bucket_id = 'event-images');
```

### 3. Run It
- Click: **Run** button (or press Ctrl+Enter)
- Wait for: "Success. No rows returned"

### 4. Test Upload
- Go to: http://localhost:5174/admin/gallery/new
- Upload an image
- Should work now! ✅

---

## That's It!

Your gallery upload should now work perfectly.

## What This Does:
- Allows anyone to upload files to your storage buckets
- Allows anyone to view the uploaded files
- Allows anyone to delete files (for CMS management)

## For Production:
Later, you should add authentication and restrict these policies to authenticated users only.

## Still Not Working?

1. Make sure buckets exist:
   - Storage > Check for `gallery-images` and `event-images`
   
2. Make sure buckets are public:
   - Click bucket > Should show "Public" badge
   
3. Check browser console:
   - Press F12
   - Try upload
   - Look for different error message

4. See detailed guides:
   - `FIX_RLS_POLICY_ERROR.md` - Full explanation
   - `STORAGE_BUCKET_SETUP.md` - Complete setup guide
