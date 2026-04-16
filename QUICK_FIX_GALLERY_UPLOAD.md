# Quick Fix: Gallery Images Not Uploading

## The Problem
When you click "Upload Images" in the Gallery CMS, images don't upload.

**Error:** `StorageApiError: new row violates row-level security policy`

This means the storage bucket exists but lacks upload permissions.

## The Solution (30 Seconds - SQL Method)

### FASTEST METHOD: Run SQL Script

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in left sidebar
4. Click **"New query"**
5. Copy ALL content from `fix-storage-policies.sql`
6. Paste into SQL editor
7. Click **"Run"** (or Ctrl+Enter)
8. Done! ✅

### Alternative: Manual Method (5 Minutes)

If you prefer UI over SQL:

#### Step 1: Create Storage Bucket (if not exists)
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Storage** in left sidebar
4. Click **"New bucket"** button
5. Enter name: `gallery-images`
6. ✅ **CHECK "Public bucket"** ← VERY IMPORTANT!
7. Click **"Create bucket"**

#### Step 2: Add Upload Policy
1. Click on the `gallery-images` bucket
2. Click **"Policies"** tab
3. Click **"New Policy"**
4. Select **"For full customization"**
5. Fill in:
   - Policy name: `Allow uploads`
   - Allowed operation: **INSERT**
   - Target roles: `public`
   - WITH CHECK: `bucket_id = 'gallery-images'`
6. Click **"Review"** → **"Save policy"**

#### Step 3: Add Read Policy
1. Click **"New Policy"** again
2. Fill in:
   - Policy name: `Allow public access`
   - Allowed operation: **SELECT**
   - Target roles: `public`
   - USING: `bucket_id = 'gallery-images'`
3. Click **"Review"** → **"Save policy"**

### Test It
1. Go to http://localhost:5174/admin/gallery/new
2. Click the **"🧪 Test Storage Connection"** button
3. Check browser console (F12)
4. If test passes ✅, try uploading images
5. If test fails ❌, follow the error messages

## Visual Checklist

In Supabase Dashboard > Storage > gallery-images:

```
✅ Bucket exists
✅ "Public" badge is visible
✅ Policies tab shows:
   - INSERT policy (for uploads)
   - SELECT policy (for viewing)
```

## Still Not Working?

### Check Browser Console
1. Press F12 to open console
2. Try uploading an image
3. Look for error messages:

**"Bucket not found"**
→ Create the bucket (Step 1)

**"Permission denied"** or **"new row violates row-level security"**
→ Add policies (Steps 2 & 3)

**"File too large"**
→ Reduce image size or increase bucket limit

### Run Diagnostic Test
```bash
node test-storage-upload.js
```

This will tell you exactly what's wrong.

## Common Mistakes

❌ Bucket name is wrong (must be exactly `gallery-images`)
❌ Forgot to check "Public bucket"
❌ Policies not created
❌ Policy definition is wrong (should be `true`)
❌ Target role is wrong (should be `public`)

## Need the Event Images Bucket Too?

Repeat the same steps but use `event-images` as the bucket name.

## After Setup

Once buckets are created:
1. Refresh your admin page
2. Images should upload successfully
3. You'll see them in the gallery list
4. They'll display on your website

## Quick Test in Browser

Open browser console on admin page and run:

```javascript
// Test if storage is working
const testFile = new Blob(['test'], { type: 'text/plain' })
const { data, error } = await supabase.storage
  .from('gallery-images')
  .upload(`test/${Date.now()}.txt`, testFile)

console.log('Result:', { data, error })
// Should show: { data: { path: "..." }, error: null }
```

## Success Indicators

✅ Browser console shows: "Upload success for [filename]"
✅ Alert says: "X image(s) uploaded successfully!"
✅ Images appear in preview grid
✅ Images show in gallery list after clicking "Add to Gallery"
✅ Images display on public website

## That's It!

Your gallery upload should now work. The key is:
1. Bucket exists
2. Bucket is public
3. Policies allow INSERT and SELECT

For detailed explanations, see `STORAGE_BUCKET_SETUP.md`
