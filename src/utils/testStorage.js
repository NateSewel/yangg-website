// Browser-based Storage Test Utility
// Import this in your admin page and call testStorageConnection()

import { supabase, isSupabaseAvailable } from '../lib/supabase'

export const testStorageConnection = async () => {
  console.log('🔍 Testing Supabase Storage Connection...\n')
  
  if (!isSupabaseAvailable()) {
    console.error('❌ Supabase is not configured')
    return { success: false, error: 'Supabase not configured' }
  }
  
  try {
    // Step 1: List buckets
    console.log('📦 Step 1: Listing storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError)
      return { success: false, error: bucketsError }
    }
    
    console.log('✅ Found buckets:', buckets.map(b => `${b.name} (${b.public ? 'Public' : 'Private'})`))
    
    // Check for required buckets
    const galleryBucket = buckets.find(b => b.name === 'gallery-images')
    const eventBucket = buckets.find(b => b.name === 'event-images')
    
    const issues = []
    
    if (!galleryBucket) {
      issues.push('❌ Bucket "gallery-images" not found')
      console.error('❌ Bucket "gallery-images" not found!')
    } else {
      console.log('✅ Bucket "gallery-images" exists')
      if (!galleryBucket.public) {
        issues.push('⚠️ Bucket "gallery-images" is not public')
        console.warn('⚠️ Warning: gallery-images bucket is not public')
      }
    }
    
    if (!eventBucket) {
      issues.push('⚠️ Bucket "event-images" not found')
      console.warn('⚠️ Bucket "event-images" not found')
    } else {
      console.log('✅ Bucket "event-images" exists')
      if (!eventBucket.public) {
        issues.push('⚠️ Bucket "event-images" is not public')
        console.warn('⚠️ Warning: event-images bucket is not public')
      }
    }
    
    // Step 2: Test upload if gallery bucket exists
    if (galleryBucket) {
      console.log('\n📤 Step 2: Testing upload to gallery-images...')
      
      const testContent = 'Test file from browser'
      const testBlob = new Blob([testContent], { type: 'text/plain' })
      const fileName = `test/browser-test-${Date.now()}.txt`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, testBlob)
      
      if (uploadError) {
        issues.push(`❌ Upload failed: ${uploadError.message}`)
        console.error('❌ Upload failed:', uploadError)
        console.log('\n💡 To fix:')
        console.log('   1. Go to Supabase Dashboard > Storage > gallery-images')
        console.log('   2. Click "Policies" tab')
        console.log('   3. Create INSERT policy with definition: true')
      } else {
        console.log('✅ Upload successful!')
        console.log('   Path:', uploadData.path)
        
        // Step 3: Get public URL
        console.log('\n🔗 Step 3: Getting public URL...')
        const { data: { publicUrl } } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(fileName)
        
        console.log('✅ Public URL:', publicUrl)
        
        // Step 4: Test download
        console.log('\n⬇️ Step 4: Testing download...')
        const { data: downloadData, error: downloadError } = await supabase.storage
          .from('gallery-images')
          .download(fileName)
        
        if (downloadError) {
          issues.push(`❌ Download failed: ${downloadError.message}`)
          console.error('❌ Download failed:', downloadError)
          console.log('   This means SELECT policy might be missing')
        } else {
          console.log('✅ Download successful!')
        }
        
        // Step 5: Clean up
        console.log('\n🗑️ Step 5: Cleaning up...')
        const { error: deleteError } = await supabase.storage
          .from('gallery-images')
          .remove([fileName])
        
        if (deleteError) {
          console.warn('⚠️ Could not delete test file:', deleteError.message)
        } else {
          console.log('✅ Test file deleted')
        }
      }
    }
    
    console.log('\n' + '='.repeat(60))
    if (issues.length === 0) {
      console.log('✅ All storage tests passed!')
      console.log('='.repeat(60))
      return { success: true, buckets, issues: [] }
    } else {
      console.log('⚠️ Storage test completed with issues:')
      issues.forEach(issue => console.log('   ' + issue))
      console.log('='.repeat(60))
      console.log('\n📖 See STORAGE_BUCKET_SETUP.md for detailed setup instructions')
      return { success: false, buckets, issues }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return { success: false, error }
  }
}

// Export a function to add a test button to the page
export const addStorageTestButton = () => {
  const button = document.createElement('button')
  button.textContent = '🧪 Test Storage'
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 24px;
    background: #32a8ed;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 9999;
  `
  button.onclick = async () => {
    console.clear()
    const result = await testStorageConnection()
    if (result.success) {
      alert('✅ Storage test passed! Check console for details.')
    } else {
      alert('⚠️ Storage test found issues. Check console for details and see STORAGE_BUCKET_SETUP.md')
    }
  }
  document.body.appendChild(button)
}
