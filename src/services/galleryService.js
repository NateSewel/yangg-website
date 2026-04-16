import { supabase, isSupabaseAvailable } from '../lib/supabase'

// CREATE - Add a new gallery item
export const createGalleryItem = async (galleryData) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('gallery')
      .insert([galleryData])
      .select()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return { data: null, error }
  }
}

// READ - Get all gallery items
export const getAllGalleryItems = async () => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return { data: null, error }
  }
}

// READ - Get gallery items by category
export const getGalleryItemsByCategory = async (category) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching gallery items by category:', error)
    return { data: null, error }
  }
}

// READ - Get single gallery item by ID
export const getGalleryItemById = async (id) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching gallery item:', error)
    return { data: null, error }
  }
}

// UPDATE - Update a gallery item
export const updateGalleryItem = async (id, updates) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return { data: null, error }
  }
}

// DELETE - Delete a gallery item
export const deleteGalleryItem = async (id) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return { data: null, error }
  }
}

// UPLOAD - Upload gallery image
export const uploadGalleryImage = async (file) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `gallery/${fileName}`

    const { data, error } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, file)

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath)

    return { data: { path: filePath, url: publicUrl }, error: null }
  } catch (error) {
    console.error('Error uploading gallery image:', error)
    return { data: null, error }
  }
}

// UPLOAD - Upload multiple gallery images
export const uploadMultipleGalleryImages = async (files) => {
  if (!isSupabaseAvailable()) {
    return { data: null, errors: [], error: { message: 'Supabase not configured' } }
  }
  
  try {
    const uploadPromises = files.map(file => uploadGalleryImage(file))
    const results = await Promise.all(uploadPromises)
    
    const successfulUploads = results.filter(result => result.error === null)
    const failedUploads = results.filter(result => result.error !== null)
    
    return {
      data: successfulUploads.map(result => result.data),
      errors: failedUploads.map(result => result.error),
      error: failedUploads.length > 0 ? 'Some uploads failed' : null
    }
  } catch (error) {
    console.error('Error uploading multiple images:', error)
    return { data: null, errors: [], error }
  }
}

// DELETE - Delete gallery image from storage
export const deleteGalleryImage = async (filePath) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase.storage
      .from('gallery-images')
      .remove([filePath])

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return { data: null, error }
  }
}
