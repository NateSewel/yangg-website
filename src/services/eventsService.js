import { supabase, isSupabaseAvailable } from '../lib/supabase'

// CREATE - Add a new event
export const createEvent = async (eventData) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating event:', error)
    return { data: null, error }
  }
}

// READ - Get all events
export const getAllEvents = async () => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching events:', error)
    return { data: null, error }
  }
}

// READ - Get single event by ID
export const getEventById = async (id) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching event:', error)
    return { data: null, error }
  }
}

// READ - Get events by category
export const getEventsByCategory = async (category) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching events by category:', error)
    return { data: null, error }
  }
}

// READ - Get events by status
export const getEventsByStatus = async (status) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching events by status:', error)
    return { data: null, error }
  }
}

// UPDATE - Update an event
export const updateEvent = async (id, updates) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating event:', error)
    return { data: null, error }
  }
}

// DELETE - Delete an event
export const deleteEvent = async (id) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error deleting event:', error)
    return { data: null, error }
  }
}

// UPLOAD - Upload event image
export const uploadEventImage = async (file, eventId) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${eventId}-${Date.now()}.${fileExt}`
    const filePath = `events/${fileName}`

    const { data, error } = await supabase.storage
      .from('event-images')
      .upload(filePath, file)

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('event-images')
      .getPublicUrl(filePath)

    return { data: { path: filePath, url: publicUrl }, error: null }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { data: null, error }
  }
}

// DELETE - Delete event image from storage
export const deleteEventImage = async (filePath) => {
  if (!isSupabaseAvailable()) {
    return { data: null, error: { message: 'Supabase not configured' } }
  }
  
  try {
    const { data, error } = await supabase.storage
      .from('event-images')
      .remove([filePath])

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { data: null, error }
  }
}
