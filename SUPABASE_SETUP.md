# Supabase Setup Guide for YANGG Website

This guide will help you set up Supabase for managing events and gallery images dynamically.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in the project details:
   - Name: `yangg-website` (or your preferred name)
   - Database Password: Create a strong password (save this!)
   - Region: Choose the closest to your users
4. Click "Create new project" and wait for setup to complete

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Important**: Add `.env` to your `.gitignore` file to keep credentials secure

## Step 4: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire content from `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the SQL commands

This will create:
- `events` table with all necessary columns
- `gallery` table for gallery images
- Indexes for better performance
- Row Level Security (RLS) policies
- Automatic `updated_at` triggers

## Step 5: Create Storage Buckets

### For Event Images:
1. Go to **Storage** in your Supabase dashboard
2. Click "Create a new bucket"
3. Name: `event-images`
4. **Public bucket**: Toggle ON (to allow public access to images)
5. Click "Create bucket"

### For Gallery Images:
1. Click "Create a new bucket" again
2. Name: `gallery-images`
3. **Public bucket**: Toggle ON
4. Click "Create bucket"

### Configure Storage Policies:
For each bucket, you may need to add policies:

1. Click on the bucket name
2. Go to "Policies" tab
3. Add these policies:

**For Public Read Access:**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'event-images' );
```

**For Authenticated Upload:**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'event-images' 
  AND auth.role() = 'authenticated'
);
```

Repeat for `gallery-images` bucket.

## Step 6: Test the Connection

Create a test file to verify your setup:

```javascript
// test-supabase.js
import { supabase } from './src/lib/supabase.js'

async function testConnection() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .limit(1)
  
  if (error) {
    console.error('Connection failed:', error)
  } else {
    console.log('Connection successful!', data)
  }
}

testConnection()
```

## Step 7: Integration Complete! 🎉

The website components have been updated to automatically use Supabase when available:

### What's Been Integrated:

1. **EventsSection Component** (`src/components/EventsSection.jsx`)
   - Fetches events from Supabase on page load
   - Falls back to static data if Supabase is not configured
   - Shows loading spinner while fetching data

2. **GallerySection Component** (`src/components/GallerySection.jsx`)
   - Fetches gallery items from Supabase
   - Falls back to static gallery data if needed
   - Displays loading state during fetch

3. **EventsPage** (`src/pages/EventsPage.jsx`)
   - Uses Supabase for all events listing
   - Maintains all filtering and pagination features
   - Graceful fallback to static data

4. **EventDetailPage** (`src/pages/EventDetailPage.jsx`)
   - Fetches individual event details from Supabase
   - Falls back to static data if event not found in database
   - Shows loading state while fetching

### How It Works:

The integration uses a **graceful fallback strategy**:
- When the page loads, it attempts to fetch data from Supabase
- If Supabase is not configured (no `.env` file) or returns no data, it automatically uses the static data from `src/data/`
- This means your website works immediately, even before setting up Supabase!

### Current Behavior:

**Without Supabase Setup:**
- Website displays all static events and gallery images
- Everything works normally using local data files

**With Supabase Setup:**
- Website fetches dynamic content from your database
- You can add/edit/delete events and gallery items via Supabase dashboard
- Changes appear immediately on the website

## Step 8: Using the API Services

### Events CRUD Operations

```javascript
import { 
  createEvent, 
  getAllEvents, 
  updateEvent, 
  deleteEvent,
  uploadEventImage 
} from './src/services/eventsService'

// Create a new event
const newEvent = {
  title: "Youth Leadership Summit",
  theme: "Empowering Tomorrow's Leaders",
  short_description: "A summit for young African leaders",
  overview: "Detailed overview here...",
  date: "June 15, 2024",
  location: "Nairobi, Kenya",
  category: "conference",
  status: "upcoming",
  objectives: ["Build leadership skills", "Network with peers"],
  highlights: ["500+ attendees", "Expert speakers"]
}

const { data, error } = await createEvent(newEvent)

// Get all events
const { data: events } = await getAllEvents()

// Update an event
await updateEvent(eventId, { status: 'completed' })

// Delete an event
await deleteEvent(eventId)

// Upload event image
const file = event.target.files[0]
const { data: imageData } = await uploadEventImage(file, eventId)
```

### Gallery CRUD Operations

```javascript
import { 
  createGalleryItem, 
  getAllGalleryItems, 
  uploadGalleryImage,
  uploadMultipleGalleryImages 
} from './src/services/galleryService'

// Upload image first
const file = event.target.files[0]
const { data: imageData } = await uploadGalleryImage(file)

// Create gallery item
const newGalleryItem = {
  title: "Training Workshop 2024",
  description: "Participants at the leadership training",
  image: imageData.url,
  image_path: imageData.path,
  category: "training"
}

await createGalleryItem(newGalleryItem)

// Get all gallery items
const { data: galleryItems } = await getAllGalleryItems()

// Upload multiple images
const files = Array.from(event.target.files)
const { data: uploadedImages } = await uploadMultipleGalleryImages(files)
```

## Step 9: Populating Your Database

### Option 1: Manual Entry via Supabase Dashboard

1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. Select the `events` or `gallery` table
4. Click "Insert row" to add new entries manually

### Option 2: Migrate Existing Static Data

You can create a migration script to copy your existing static data to Supabase:

```javascript
// migrate-data.js
import { supabase } from './src/lib/supabase.js'
import { eventsData } from './src/data/eventsData.js'

async function migrateEvents() {
  console.log('Starting migration...')
  
  for (const event of eventsData) {
    const { data, error } = await supabase
      .from('events')
      .insert([{
        id: event.id,
        title: event.title,
        theme: event.theme,
        short_description: event.shortDescription,
        overview: event.overview,
        date: event.date,
        location: event.location,
        category: event.category,
        status: event.status,
        image: event.image, // Note: This uses local images, you may want to upload to storage
        objectives: event.objectives,
        speakers: event.speakers,
        highlights: event.highlights,
        impact: event.impact,
        participants: event.participants
      }])
    
    if (error) {
      console.error(`Error migrating ${event.title}:`, error)
    } else {
      console.log(`✓ Migrated: ${event.title}`)
    }
  }
  
  console.log('Migration complete!')
}

migrateEvents()
```

Run with: `node migrate-data.js`

### Option 3: Build an Admin Interface

Create a simple admin page to manage content:

```jsx
// src/pages/AdminPage.jsx
import { useState } from 'react'
import { createEvent, uploadEventImage } from '../services/eventsService'

function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    date: '',
    location: '',
    category: 'conference',
    status: 'upcoming'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await createEvent(formData)
    if (!error) {
      alert('Event created successfully!')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-2 border rounded"
        />
        {/* Add more form fields */}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  )
}
```

## Step 10: Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use Row Level Security (RLS)** - Already configured in schema
3. **Validate data** before inserting into database
4. **Limit file upload sizes** in your frontend
5. **Use authenticated routes** for admin operations

## Step 11: Admin Dashboard (Optional)

You can create an admin dashboard to manage events and gallery:

1. Create protected routes for admin users
2. Build forms for creating/editing events
3. Add image upload components
4. Implement authentication using Supabase Auth

## Troubleshooting

### Connection Issues
- Verify your `.env` file has correct credentials
- Check if your Supabase project is active
- Ensure you're using `VITE_` prefix for environment variables

### RLS Policy Errors
- Make sure RLS policies are created correctly
- For testing, you can temporarily disable RLS (not recommended for production)

### Storage Upload Errors
- Verify buckets are created and set to public
- Check storage policies allow uploads
- Ensure file size is within limits (default 50MB)

## Next Steps

1. ✅ **Integration Complete** - Components are ready to use Supabase
2. **Set up Supabase project** - Follow steps 1-6 above
3. **Populate your database** - Add events and gallery items
4. **Test the integration** - Verify data appears on your website
5. **Build admin interface** - Create forms to manage content easily
6. **Set up authentication** - Protect admin routes with Supabase Auth
7. **Deploy your application** - Push to production with environment variables

### Quick Start Checklist:

- [ ] Create Supabase project
- [ ] Get API credentials
- [ ] Create `.env` file with credentials
- [ ] Run SQL schema in Supabase SQL Editor
- [ ] Create storage buckets (`event-images`, `gallery-images`)
- [ ] Test connection by visiting your website
- [ ] Add your first event via Supabase dashboard
- [ ] Verify event appears on website
- [ ] (Optional) Build admin interface for easier management

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## Support

If you encounter any issues, check:
1. Supabase project logs in the dashboard
2. Browser console for error messages
3. Network tab to see API requests/responses
