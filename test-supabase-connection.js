import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...\n')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'NOT SET')
console.log('')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Environment variables not set!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('1️⃣ Testing basic connection...')
    const { data: healthCheck, error: healthError } = await supabase
      .from('events')
      .select('count')
      .limit(1)
    
    if (healthError) {
      console.error('❌ Connection failed:', healthError.message)
      return false
    }
    console.log('✅ Connection successful!\n')

    // Test events table
    console.log('2️⃣ Checking events table...')
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .limit(5)
    
    if (eventsError) {
      console.error('❌ Events table error:', eventsError.message)
      console.log('   Hint: Run the SQL schema in Supabase SQL Editor\n')
    } else {
      console.log(`✅ Events table exists! Found ${events?.length || 0} events`)
      if (events && events.length > 0) {
        console.log('   Sample event:', events[0].title)
      } else {
        console.log('   ⚠️  Table is empty - add some events!')
      }
      console.log('')
    }

    // Test gallery table
    console.log('3️⃣ Checking gallery table...')
    const { data: gallery, error: galleryError } = await supabase
      .from('gallery')
      .select('*')
      .limit(5)
    
    if (galleryError) {
      console.error('❌ Gallery table error:', galleryError.message)
      console.log('   Hint: Run the SQL schema in Supabase SQL Editor\n')
    } else {
      console.log(`✅ Gallery table exists! Found ${gallery?.length || 0} items`)
      if (gallery && gallery.length > 0) {
        console.log('   Sample item:', gallery[0].title)
      } else {
        console.log('   ⚠️  Table is empty - add some gallery items!')
      }
      console.log('')
    }

    // Test storage buckets
    console.log('4️⃣ Checking storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) {
      console.error('❌ Storage error:', bucketsError.message)
    } else {
      console.log(`✅ Storage accessible! Found ${buckets?.length || 0} buckets`)
      
      const eventImagesBucket = buckets?.find(b => b.name === 'event-images')
      const galleryImagesBucket = buckets?.find(b => b.name === 'gallery-images')
      
      if (eventImagesBucket) {
        console.log('   ✅ event-images bucket exists')
      } else {
        console.log('   ⚠️  event-images bucket missing - create it!')
      }
      
      if (galleryImagesBucket) {
        console.log('   ✅ gallery-images bucket exists')
      } else {
        console.log('   ⚠️  gallery-images bucket missing - create it!')
      }
      console.log('')
    }

    console.log('✅ All tests completed!\n')
    return true

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    return false
  }
}

testConnection()
