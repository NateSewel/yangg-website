# Supabase Database Seeding Guide

This guide will help you populate your Supabase database with all existing events and gallery data.

## Files Created

1. **supabase-seed-events.sql** - Contains all 14 events from your static data
2. **supabase-seed-gallery.sql** - Sample gallery items (placeholders for images)

## Step 1: Seed Events Data

### Run Events Seed Script

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/mxcltagaqodkbdtauqvu
2. Click on **SQL Editor** in the left sidebar
3. Click **"New query"**
4. Open the file `supabase-seed-events.sql` from your project
5. Copy the entire content
6. Paste it into the SQL Editor
7. Click **"Run"** or press `Ctrl+Enter`

### What This Does

- Inserts all 14 events with complete data:
  - Event details (title, theme, description, overview)
  - Dates and locations
  - Categories (conference, training, workshop, campaign)
  - Status (all completed)
  - Objectives (as JSON arrays)
  - Speakers/facilitators (as JSON arrays)
  - Highlights (as JSON arrays)
  - Impact statements
  - Participant counts

### Verify Events Were Added

After running the script, you should see output showing:
```
total_events: 14
```

And a list of all events with their IDs, titles, categories, and status.

## Step 2: Handle Gallery Images

Gallery images require a different approach since they're local files. You have two options:

### Option A: Upload Images to Supabase Storage (Recommended)

This is the proper way to handle images for production:

#### 1. Create Storage Buckets (if not done yet)

- Go to **Storage** in Supabase dashboard
- Create bucket: `gallery-images` (public)

#### 2. Upload Images

You can upload images in two ways:

**Method 1: Manual Upload via Dashboard**
1. Go to Storage > gallery-images bucket
2. Click "Upload file"
3. Select images from `src/assets/gallery/` folder
4. Upload in batches (Supabase allows multiple files)

**Method 2: Bulk Upload Script (Advanced)**

Create a Node.js script to upload all images:

```javascript
// upload-gallery-images.js
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

const galleryDir = './src/assets/gallery'

async function uploadImages() {
  const files = fs.readdirSync(galleryDir)
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      const filePath = path.join(galleryDir, file)
      const fileBuffer = fs.readFileSync(filePath)
      
      const { data, error } = await supabase.storage
        .from('gallery-images')
        .upload(`gallery/${file}`, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true
        })
      
      if (error) {
        console.error(`Error uploading ${file}:`, error.message)
      } else {
        console.log(`✓ Uploaded: ${file}`)
      }
    }
  }
  
  console.log('Upload complete!')
}

uploadImages()
```

Run with: `node upload-gallery-images.js`

#### 3. Create Gallery Items with Real URLs

After uploading images, create a script to generate gallery items:

```javascript
// create-gallery-items.js
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

const categories = ['conference', 'training', 'workshop']
const titles = [
  'Africa The Future Conference',
  'Leadership Training Session',
  'Community Workshop',
  'Youth Empowerment Program',
  'SDG Implementation Training',
  'She Leads Initiative',
  'Afripreneur Summit',
  'Capacity Building Workshop',
  'Virtual Conference',
  'Team Collaboration',
  'International Youth Day',
  'Women Leadership Forum',
  'Innovation Hub Launch',
  'Networking Event',
  'Panel Discussion'
]

async function createGalleryItems() {
  const galleryDir = './src/assets/gallery'
  const files = fs.readdirSync(galleryDir)
    .filter(f => f.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/))
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const category = categories[i % 3]
    const title = titles[i % titles.length]
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(`gallery/${file}`)
    
    // Insert gallery item
    const { data, error } = await supabase
      .from('gallery')
      .insert([{
        title: title,
        description: 'YANGG event and program activities',
        image_url: publicUrl,
        image_path: `gallery/${file}`,
        category: category
      }])
    
    if (error) {
      console.error(`Error creating item for ${file}:`, error.message)
    } else {
      console.log(`✓ Created: ${title} (${file})`)
    }
  }
  
  console.log('Gallery items created!')
}

createGalleryItems()
```

Run with: `node create-gallery-items.js`

### Option B: Use Local Image Paths (Development Only)

For development/testing, you can keep using local image paths:

1. Run the `supabase-seed-gallery.sql` script
2. Your website will continue using local images from `src/assets/gallery/`
3. The database will have placeholder entries

**Note**: This won't work in production since local files aren't accessible from deployed sites.

## Step 3: Verify Your Data

### Check Events

```sql
-- Count events
SELECT COUNT(*) FROM events;

-- View all events
SELECT id, title, category, status, date FROM events ORDER BY created_at DESC;

-- Check specific event
SELECT * FROM events WHERE id = 'africa-future-conference-2024';
```

### Check Gallery

```sql
-- Count gallery items
SELECT COUNT(*) FROM gallery;

-- View all gallery items
SELECT id, title, category, image_url FROM gallery ORDER BY created_at DESC;

-- Check by category
SELECT category, COUNT(*) as count FROM gallery GROUP BY category;
```

## Step 4: Test on Your Website

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit your website
3. Check the Events section - should show all 14 events
4. Check the Gallery section - should show gallery items
5. Open browser console - should see "Using Supabase data" (not "Using static data")

## Troubleshooting

### Events Not Showing

**Check 1: SQL Errors**
- Look for error messages in Supabase SQL Editor
- Common issues: JSON syntax errors, missing quotes

**Check 2: Database Connection**
```bash
node test-supabase-connection.js
```

**Check 3: Browser Console**
- Open DevTools > Console
- Look for Supabase errors
- Check if data is being fetched

### Gallery Images Not Loading

**Issue**: Images show broken links

**Solution 1**: Upload images to Supabase Storage (see Option A above)

**Solution 2**: Update image URLs in database:
```sql
UPDATE gallery 
SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/gallery-images/gallery/image-name.jpg'
WHERE id = 'your-gallery-item-id';
```

### Duplicate Data

If you run the seed scripts multiple times, you might get duplicates.

**Clear events table**:
```sql
DELETE FROM events;
```

**Clear gallery table**:
```sql
DELETE FROM gallery;
```

Then run the seed scripts again.

## Next Steps

After seeding your database:

1. ✅ **Events are populated** - All 14 events in database
2. ✅ **Website fetches from Supabase** - Dynamic content working
3. 🔄 **Upload gallery images** - Move images to Supabase Storage
4. 🔄 **Create gallery items** - Link images to database entries
5. 🚀 **Ready for production** - Deploy with confidence

## Advanced: Automated Seeding

For future updates, you can create a migration script:

```javascript
// migrate-all-data.js
import { createClient } from '@supabase/supabase-js'
import { eventsData } from './src/data/eventsData.js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function migrateEvents() {
  console.log('Migrating events...')
  
  for (const event of eventsData) {
    const { data, error } = await supabase
      .from('events')
      .upsert([{
        id: event.id,
        title: event.title,
        theme: event.theme,
        short_description: event.shortDescription,
        overview: event.overview,
        date: event.date,
        location: event.location,
        category: event.category,
        status: event.status,
        image: event.image,
        objectives: event.objectives,
        speakers: event.speakers || event.panelists || event.facilitators,
        highlights: event.highlights,
        impact: event.impact,
        participants: event.participants
      }], { onConflict: 'id' })
    
    if (error) {
      console.error(`Error: ${event.title}`, error.message)
    } else {
      console.log(`✓ ${event.title}`)
    }
  }
  
  console.log('Migration complete!')
}

migrateEvents()
```

## Summary

1. **Run `supabase-seed-events.sql`** in Supabase SQL Editor ✅
2. **Upload gallery images** to Supabase Storage 📸
3. **Create gallery items** with real image URLs 🖼️
4. **Test your website** to verify data loads 🧪
5. **Deploy to production** 🚀

Your database is now populated with all your existing content!
