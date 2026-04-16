// Test Supabase Storage Upload
// Run this with: node test-storage-upload.js

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

// Load environment variables
config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Storage Connection...\n')
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? '✅ Present' : '❌ Missing')
console.log('')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testStorage() {
  try {
    console.log('📦 Step 1: Listing storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError)
      return
    }
    
    console.log('✅ Found buckets:')
    buckets.forEach(bucket => {
      console.log(`   - ${bucket.name} (${bucket.public ? 'Public' : 'Private'})`)
    })
    console.log('')
    
    // Check if gallery-images bucket exists
    const galleryBucket = buckets.find(b => b.name === 'gallery-images')
    const eventBucket = buckets.find(b => b.name === 'event-images')
    
    if (!galleryBucket) {
      console.error('❌ Bucket "gallery-images" not found!')
      console.log('   Please create it in Supabase Dashboard > Storage')
      console.log('   Make sure to check "Public bucket" when creating')
    } else {
      console.log('✅ Bucket "gallery-images" exists')
      if (!galleryBucket.public) {
        console.warn('⚠️  Warning: Bucket is not public. Images may not be accessible.')
      }
    }
    
    if (!eventBucket) {
      console.warn('⚠️  Bucket "event-images" not found (needed for events)')
    } else {
      console.log('✅ Bucket "event-images" exists')
    }
    console.log('')
    
    // Test upload to gallery-images
    if (galleryBucket) {
      console.log('📤 Step 2: Testing upload to gallery-images...')
      
      // Create a test file
      const testContent = 'This is a test file from test-storage-upload.js'
      const testFile = new Blob([testContent], { type: 'text/plain' })
      const fileName = `test/test-${Date.now()}.txt`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, testFile)
      
      if (uploadError) {
        console.error('❌ Upload failed:', uploadError.message)
        console.log('\nPossible issues:')
        console.log('   1. Bucket policies not configured')
        console.log('   2. Bucket is not public')
        console.log('   3. INSERT policy missing')
        console.log('\nTo fix:')
        console.log('   1. Go to Supabase Dashboard > Storage > gallery-images')
        console.log('   2. Click "Policies" tab')
        console.log('   3. Add INSERT policy with: true')
        return
      }
      
      console.log('✅ Upload successful!')
      console.log('   Path:', uploadData.path)
      console.log('')
      
      // Get public URL
      console.log('🔗 Step 3: Getting public URL...')
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName)
      
      console.log('✅ Public URL:', publicUrl)
      console.log('')
      
      // Test download
      console.log('⬇️  Step 4: Testing download...')
      const { data: downloadData, error: downloadError } = await supabase.storage
        .from('gallery-images')
        .download(fileName)
      
      if (downloadError) {
        console.error('❌ Download failed:', downloadError.message)
        console.log('   This means SELECT policy might be missing')
      } else {
        console.log('✅ Download successful!')
        const text = await downloadData.text()
        console.log('   Content:', text)
      }
      console.log('')
      
      // Clean up - delete test file
      console.log('🗑️  Step 5: Cleaning up test file...')
      const { error: deleteError } = await supabase.storage
        .from('gallery-images')
        .remove([fileName])
      
      if (deleteError) {
        console.warn('⚠️  Could not delete test file:', deleteError.message)
        console.log('   This is okay - DELETE policy might not be configured')
      } else {
        console.log('✅ Test file deleted')
      }
    }
    
    console.log('')
    console.log('=' .repeat(60))
    console.log('✅ Storage test complete!')
    console.log('=' .repeat(60))
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the test
testStorage()
