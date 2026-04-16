# Supabase Storage Bucket Setup Guide

## Issue: Images Not Uploading in Gallery

If images are not uploading when you click "Upload Images" in the Gallery CMS, it's likely because the storage buckets don't exist or don't have the correct permissions.

## Solution: Create Storage Buckets

### Step 1: Go to Supabase Dashboard

1. Open your browser and go to: https://supabase.com/dashboard
2. Select your project: `mxcltagaqodkbdtauqvu`

### Step 2: Create Gallery Images Bucket

1. In the left sidebar, click on **Storage**
2. Click the **"New bucket"** button (green button at top right)
3. Fill in the details:
   - **Name**: `gallery-images`
   - **Public bucket**: ✅ **CHECK THIS BOX** (Very Important!)
   - **File size limit**: 50 MB (or your preferred limit)
   - **Allowed MIME types**: Leave empty or add: `image/jpeg, image/jpg, image/png, image/webp`
4. Click **"Create bucket"**

### Step 3: Create Event Images Bucket (if not exists)

1. Click the **"New bucket"** button again
2. Fill in the details:
   - **Name**: `event-images`
   - **Public bucket**: ✅ **CHECK THIS BOX** (Very Important!)
   - **File size limit**: 50 MB
   - **Allowed MIME types**: Leave empty or add: `image/jpeg, image/jpg, image/png, image/webp`
3. Click **"Create bucket"**

### Step 4: Verify Bucket Permissions

For each bucket (`gallery-images` and `event-images`):

1. Click on the bucket name
2. Click on **"Policies"** tab at the top
3. You should see policies for:
   - **SELECT** (read/download)
   - **INSERT** (upload)
   - **UPDATE** (update)
   - **DELETE** (delete)

If no policies exist, create them:

#### Create INSERT Policy (Upload)

1. Click **"New Policy"**
2. Choose **"For full customization"** or use template
3. Fill in:
   - **Policy name**: `Allow public uploads`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `public` or `anon`
   - **Policy definition**: 
   ```sql
   true
   ```
   OR for more security (authenticated users only):
   ```sql
   auth.role() = 'authenticated'
   ```
4. Click **"Review"** then **"Save policy"**

#### Create SELECT Policy (Read/Download)

1. Click **"New Policy"**
2. Fill in:
   - **Policy name**: `Allow public access`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `public`
   - **Policy definition**: 
   ```sql
   true
   ```
3. Click **"Review"** then **"Save policy"**

#### Create DELETE Policy (Optional - for admin)

1. Click **"New Policy"**
2. Fill in:
   - **Policy name**: `Allow public deletes`
   - **Allowed operation**: `DELETE`
   - **Target roles**: `public` or `anon`
   - **Policy definition**: 
   ```sql
   true
   ```
3. Click **"Review"** then **"Save policy"**

### Step 5: Test the Upload

1. Go back to your app: http://localhost:5174/admin/gallery/new
2. Try uploading an image
3. Check the browser console (F12) for any error messages
4. If successful, you should see:
   - "Uploading file: [filename]"
   - "Upload success for [filename]: { url: ..., path: ... }"
   - Alert: "X image(s) uploaded successfully!"

## Common Issues and Solutions

### Issue 1: "Bucket not found" error
**Solution**: Make sure the bucket name is exactly `gallery-images` (with hyphen, not underscore)

### Issue 2: "Permission denied" error
**Solution**: 
- Make sure the bucket is set to **Public**
- Check that INSERT and SELECT policies exist
- Verify the policies allow `public` or `anon` role

### Issue 3: "File too large" error
**Solution**: 
- Check the file size limit in bucket settings
- Increase the limit if needed (default is 50MB)
- Compress your images before uploading

### Issue 4: Images upload but don't display
**Solution**:
- Make sure the bucket is **Public**
- Verify SELECT policy exists and allows public access
- Check the image URL in the database matches the storage URL

## Quick Test Script

You can test your storage connection by running this in the browser console on your admin page:

```javascript
// Test upload
const testFile = new File(['test'], 'test.txt', { type: 'text/plain' })
const { data, error } = await supabase.storage
  .from('gallery-images')
  .upload(`test/${Date.now()}.txt`, testFile)

console.log('Upload result:', { data, error })

// If successful, get public URL
if (data) {
  const { data: { publicUrl } } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(data.path)
  console.log('Public URL:', publicUrl)
}
```

## Verification Checklist

- [ ] Storage bucket `gallery-images` exists
- [ ] Storage bucket `event-images` exists
- [ ] Both buckets are set to **Public**
- [ ] INSERT policy exists for uploads
- [ ] SELECT policy exists for public access
- [ ] DELETE policy exists (optional)
- [ ] File size limit is appropriate (50MB recommended)
- [ ] Browser console shows no errors when uploading
- [ ] Uploaded images appear in the bucket
- [ ] Public URLs are accessible

## After Setup

Once the buckets are created and configured:

1. Refresh your admin page
2. Try uploading images again
3. Images should upload successfully
4. You should see them in the gallery list
5. They should display on your public website

## Need Help?

If you're still having issues:

1. Check the browser console (F12) for detailed error messages
2. Check the Supabase dashboard logs (Logs section in sidebar)
3. Verify your `.env` file has the correct credentials
4. Make sure you've restarted your dev server after creating buckets

## Security Note

For production, you should:
- Add authentication to your admin routes
- Restrict upload policies to authenticated users only
- Add file type validation
- Add file size limits
- Implement rate limiting
- Add virus scanning for uploaded files
