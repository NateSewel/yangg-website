# Fix: "new row violates row-level security policy"

## The Error You're Seeing

```
StorageApiError: new row violates row-level security policy
```

This means:
- ✅ The storage bucket exists
- ✅ Supabase connection works
- ❌ The bucket doesn't have policies to allow uploads

## Quick Fix (2 Methods)

### Method 1: Using SQL Editor (FASTEST - 30 seconds)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click **"SQL Editor"** in the left sidebar
   - Click **"New query"** button

3. **Run the Fix Script**
   - Copy ALL the content from `fix-storage-policies.sql`
   - Paste it into the SQL editor
   - Click **"Run"** button (or press Ctrl+Enter)
   - You should see: "Success. No rows returned"

4. **Verify**
   - Scroll down in the results
   - You should see a table showing 8 policies created
   - Look for policies like "Allow public uploads to gallery-images"

5. **Test Upload**
   - Go back to your app: http://localhost:5174/admin/gallery/new
   - Try uploading an image again
   - It should work now! ✅

### Method 2: Using Storage UI (Manual - 5 minutes)

#### For gallery-images bucket:

1. **Go to Storage**
   - Supabase Dashboard > Storage
   - Click on `gallery-images` bucket

2. **Open Policies Tab**
   - Click the **"Policies"** tab at the top

3. **Create INSERT Policy (Upload)**
   - Click **"New Policy"**
   - Click **"For full customization"**
   - Fill in:
     - **Policy name**: `Allow public uploads`
     - **Policy definition**: Select **INSERT**
     - **Target roles**: `public`
     - **WITH CHECK expression**: `bucket_id = 'gallery-images'`
   - Click **"Review"** → **"Save policy"**

4. **Create SELECT Policy (Read)**
   - Click **"New Policy"** again
   - Click **"For full customization"**
   - Fill in:
     - **Policy name**: `Allow public access`
     - **Policy definition**: Select **SELECT**
     - **Target roles**: `public`
     - **USING expression**: `bucket_id = 'gallery-images'`
   - Click **"Review"** → **"Save policy"**

5. **Create DELETE Policy (Optional)**
   - Click **"New Policy"** again
   - Click **"For full customization"**
   - Fill in:
     - **Policy name**: `Allow public deletes`
     - **Policy definition**: Select **DELETE**
     - **Target roles**: `public`
     - **USING expression**: `bucket_id = 'gallery-images'`
   - Click **"Review"** → **"Save policy"**

6. **Repeat for event-images bucket**
   - Go back to Storage
   - Click on `event-images` bucket
   - Repeat steps 2-5 but use `bucket_id = 'event-images'`

## What These Policies Do

### INSERT Policy
- Allows uploading new files to the bucket
- Without this: "new row violates row-level security policy" error

### SELECT Policy
- Allows reading/downloading files from the bucket
- Without this: Images won't display on your website

### DELETE Policy
- Allows deleting files from the bucket
- Without this: Can't delete images from CMS

### UPDATE Policy
- Allows updating existing files
- Optional but recommended

## Verification

After running the SQL script or creating policies manually:

### Test 1: Check Policies Exist
1. Go to Storage > gallery-images > Policies
2. You should see at least 2 policies:
   - One for INSERT (uploads)
   - One for SELECT (viewing)

### Test 2: Try Upload
1. Go to http://localhost:5174/admin/gallery/new
2. Select an image
3. Open browser console (F12)
4. You should see:
   ```
   Uploading file: [filename]
   Upload success for [filename]: { url: "...", path: "..." }
   ✅ 1 image(s) uploaded successfully!
   ```

### Test 3: Run Storage Test
1. On the gallery upload page
2. Click "🧪 Test Storage Connection" button
3. Console should show: "✅ All storage tests passed!"

## Understanding the Error

**Row Level Security (RLS)** is Supabase's security feature that controls who can:
- INSERT (upload)
- SELECT (view)
- UPDATE (modify)
- DELETE (remove)

By default, RLS blocks everything. You need to create policies to allow specific actions.

The error "new row violates row-level security policy" means:
- You tried to INSERT (upload) a file
- But no policy exists to allow it
- So Supabase blocked the action

## Why This Happened

When you create a storage bucket in Supabase:
- The bucket is created ✅
- But NO policies are created by default ❌
- You must manually add policies

Even if you check "Public bucket":
- It makes the bucket publicly accessible
- But doesn't create the RLS policies
- You still need to add policies for uploads

## Alternative: Disable RLS (NOT RECOMMENDED)

You can disable RLS entirely, but this is NOT recommended for production:

```sql
-- DANGER: This disables all security on storage.objects table
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

Instead, use proper policies as shown above.

## Troubleshooting

### Error: "policy already exists"
- This means policies are already created
- Check Storage > Policies to see existing policies
- You might need to modify existing policies instead

### Error: "permission denied for table objects"
- You need admin/service role access
- Make sure you're logged in as project owner
- Try using the SQL Editor instead of API

### Policies exist but still getting error
- Check the policy definition matches your bucket name exactly
- Verify `bucket_id = 'gallery-images'` (with quotes)
- Make sure target role is `public` or `anon`
- Try deleting and recreating the policies

### Images upload but don't display
- You need SELECT policy in addition to INSERT
- Run the full SQL script to add all policies

## Success Indicators

✅ SQL script runs without errors
✅ Policies tab shows INSERT and SELECT policies
✅ Test upload works in browser
✅ Console shows "Upload success"
✅ Images appear in preview grid
✅ Images save to gallery
✅ Images display on website

## Next Steps

After fixing the policies:
1. Test uploading multiple images
2. Test deleting images
3. Test event image uploads
4. Consider adding authentication for admin routes
5. Add file type and size validation

## Summary

The fix is simple:
1. Run `fix-storage-policies.sql` in Supabase SQL Editor
2. Or manually create INSERT and SELECT policies
3. Test upload again
4. Done! ✅

The key is: **Storage buckets need RLS policies to allow uploads, even if marked as "Public".**
