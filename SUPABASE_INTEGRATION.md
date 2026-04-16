# Supabase Integration - Quick Reference

## Overview

Your YANGG website now supports dynamic content management through Supabase! The integration is complete and uses a smart fallback system.

## How It Works

### Automatic Fallback System

```
┌─────────────────────────────────────────┐
│  Website Loads                          │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  Try to fetch from Supabase             │
└────────────┬────────────────────────────┘
             │
        ┌────┴────┐
        │         │
        ▼         ▼
   Success?    Failed?
        │         │
        │         ▼
        │    Use Static Data
        │    (from src/data/)
        │         │
        └────┬────┘
             │
             ▼
    Display Content
```

### What This Means:

1. **Before Supabase Setup**: Website works perfectly with static data
2. **After Supabase Setup**: Website automatically uses database content
3. **If Supabase Fails**: Website falls back to static data (no errors!)

## Files Modified

### Services (API Layer)
- `src/lib/supabase.js` - Supabase client configuration
- `src/services/eventsService.js` - Events CRUD operations
- `src/services/galleryService.js` - Gallery CRUD operations

### Components (Updated to use Supabase)
- `src/components/EventsSection.jsx` - Home page events section
- `src/components/GallerySection.jsx` - Gallery section
- `src/pages/EventsPage.jsx` - All events page
- `src/pages/EventDetailPage.jsx` - Single event detail page

### Configuration
- `.env.example` - Template for environment variables
- `supabase-schema.sql` - Database schema
- `SUPABASE_SETUP.md` - Complete setup guide

## Quick Start

### 1. Without Supabase (Current State)
Your website works immediately with static data. No setup needed!

### 2. With Supabase (Dynamic Content)

**Step 1**: Create Supabase project at https://supabase.com

**Step 2**: Create `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Step 3**: Run SQL schema in Supabase SQL Editor (copy from `supabase-schema.sql`)

**Step 4**: Create storage buckets:
- `event-images` (public)
- `gallery-images` (public)

**Step 5**: Restart your dev server:
```bash
npm run dev
```

That's it! Your website now uses Supabase.

## Database Schema

### Events Table
```sql
events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  theme TEXT,
  short_description TEXT,
  overview TEXT,
  date TEXT,
  location TEXT,
  category TEXT (conference, training, workshop, campaign),
  status TEXT (upcoming, ongoing, completed),
  image TEXT,
  objectives JSONB,
  speakers JSONB,
  highlights JSONB,
  impact TEXT,
  participants TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Gallery Table
```sql
gallery (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  image_path TEXT,
  category TEXT (conference, training, workshop),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## API Usage Examples

### Fetch All Events
```javascript
import { getAllEvents } from './src/services/eventsService'

const { data, error } = await getAllEvents()
if (!error) {
  console.log('Events:', data)
}
```

### Create New Event
```javascript
import { createEvent } from './src/services/eventsService'

const newEvent = {
  id: 'my-event-2024',
  title: 'Youth Summit 2024',
  theme: 'Innovation for Africa',
  short_description: 'Annual youth summit',
  date: 'December 15, 2024',
  location: 'Lagos, Nigeria',
  category: 'conference',
  status: 'upcoming',
  objectives: ['Build networks', 'Share knowledge'],
  highlights: ['500+ attendees', 'Expert speakers']
}

const { data, error } = await createEvent(newEvent)
```

### Upload Event Image
```javascript
import { uploadEventImage } from './src/services/eventsService'

const file = document.querySelector('input[type="file"]').files[0]
const { data, error } = await uploadEventImage(file, 'my-event-2024')

if (!error) {
  console.log('Image URL:', data.url)
  // Update event with image URL
  await updateEvent('my-event-2024', { image: data.url })
}
```

### Fetch Gallery Items
```javascript
import { getAllGalleryItems } from './src/services/galleryService'

const { data, error } = await getAllGalleryItems()
```

### Upload Gallery Image
```javascript
import { uploadGalleryImage, createGalleryItem } from './src/services/galleryService'

// Upload image
const file = document.querySelector('input[type="file"]').files[0]
const { data: imageData } = await uploadGalleryImage(file)

// Create gallery item
await createGalleryItem({
  title: 'Training Workshop',
  description: 'Leadership training session',
  image_url: imageData.url,
  image_path: imageData.path,
  category: 'training'
})
```

## Managing Content

### Option 1: Supabase Dashboard (Easiest)
1. Go to your Supabase project
2. Click "Table Editor"
3. Select `events` or `gallery` table
4. Click "Insert row" to add content
5. Fill in the fields and save

### Option 2: Build Admin Interface
Create a protected admin page with forms to:
- Add new events
- Upload images
- Edit existing content
- Delete items

Example admin route structure:
```
/admin
  /admin/events
    /admin/events/new
    /admin/events/:id/edit
  /admin/gallery
    /admin/gallery/new
```

### Option 3: API Calls
Use the service functions directly in your code or create scripts to bulk import data.

## Testing

### Test Supabase Connection
```javascript
// test-connection.js
import { supabase } from './src/lib/supabase.js'

async function test() {
  const { data, error } = await supabase
    .from('events')
    .select('count')
  
  if (error) {
    console.error('❌ Connection failed:', error.message)
  } else {
    console.log('✅ Connected! Events count:', data)
  }
}

test()
```

Run: `node test-connection.js`

## Troubleshooting

### "Invalid API key" Error
- Check your `.env` file has correct credentials
- Ensure you're using `VITE_` prefix
- Restart dev server after creating `.env`

### No Data Showing
- Verify tables are created (check Supabase Table Editor)
- Check browser console for errors
- Ensure RLS policies are set correctly

### Images Not Loading
- Verify storage buckets are created
- Check buckets are set to "public"
- Ensure storage policies allow public read access

### Website Shows Static Data
This is normal! It means:
- Supabase is not configured yet, OR
- Supabase returned no data (empty database)

The website automatically falls back to static data to ensure it always works.

## Environment Variables

### Development (.env)
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Production (Vercel/Netlify)
Add the same variables in your hosting platform's environment variables section.

**Important**: Never commit `.env` to Git!

## Security Notes

1. **Row Level Security (RLS)** is enabled on all tables
2. **Public read access** is allowed for events and gallery
3. **Authenticated write access** requires Supabase Auth setup
4. **Storage buckets** are public for image access
5. **API keys** are safe to expose (anon key only allows RLS-permitted operations)

## Next Steps

1. ✅ Integration complete - components ready
2. 📝 Follow `SUPABASE_SETUP.md` for detailed setup
3. 🗄️ Create Supabase project and configure
4. 📊 Populate database with your content
5. 🔐 (Optional) Add authentication for admin
6. 🚀 Deploy to production

## Resources

- [Complete Setup Guide](./SUPABASE_SETUP.md)
- [Database Schema](./supabase-schema.sql)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## Support

If you need help:
1. Check browser console for error messages
2. Review Supabase project logs
3. Verify all setup steps completed
4. Test connection with test script above

---

**Remember**: Your website works perfectly right now with static data. Supabase is optional and adds dynamic content management when you're ready!
