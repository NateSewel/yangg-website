import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiUpload, HiX } from 'react-icons/hi'
import { createGalleryItem, uploadGalleryImage } from '../services/galleryService'

const AdminGalleryForm = () => {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: 'YANGG event and program activities',
    category: 'conference'
  })

  // Test storage on mount (only in development)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('💡 Tip: Open browser console to see detailed upload logs')
    }
  }, [])

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploading(true)
    const uploaded = []
    const errors = []

    for (const file of files) {
      console.log('Uploading file:', file.name)
      const { data, error } = await uploadGalleryImage(file)
      
      if (error) {
        console.error('Upload error for', file.name, ':', error)
        errors.push({ file: file.name, error: error.message || error })
      }
      
      if (!error && data) {
        console.log('Upload success for', file.name, ':', data)
        uploaded.push({
          url: data.url,
          path: data.path,
          file: file.name
        })
      }
    }

    setUploadedImages(prev => [...prev, ...uploaded])
    setUploading(false)
    
    if (errors.length > 0) {
      console.error('Upload errors:', errors)
    }
    
    // Reset file input
    e.target.value = ''
  }

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (uploadedImages.length === 0) {
      return
    }

    setUploading(true)

    // Create gallery items for each uploaded image
    let successCount = 0
    const errors = []
    
    for (const image of uploadedImages) {
      const galleryData = {
        title: formData.title || `Gallery Image ${new Date().toLocaleDateString()}`,
        description: formData.description,
        image: image.url, // For backward compatibility
        image_url: image.url,
        image_path: image.path,
        category: formData.category
      }

      console.log('Creating gallery item:', galleryData)
      const { error } = await createGalleryItem(galleryData)
      
      if (error) {
        console.error('Error creating gallery item:', error)
        errors.push({ image: image.file, error: error.message || error })
      }
      
      if (!error) {
        successCount++
      }
    }

    setUploading(false)

    if (successCount > 0) {
      navigate('/admin/gallery')
    } else {
      console.error('Gallery creation errors:', errors)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/gallery')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#32a8ed] dark:hover:text-[#32a8ed] mb-4"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back to Gallery
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Gallery Images
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload multiple images to your gallery
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Images
          </h2>

          {/* File Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Images (Multiple)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <HiUpload className="w-12 h-12 mb-4 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG (MAX. 50MB per file)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
            {uploading && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                Uploading images...
              </p>
            )}
          </div>

          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Uploaded Images ({uploadedImages.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {image.file}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Gallery Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title (Optional)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Leave empty to auto-generate"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                If empty, will use "Gallery Image [Date]"
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              >
                <option value="conference">Conference</option>
                <option value="training">Training</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={uploading || uploadedImages.length === 0}
            className="flex-1 bg-[#32a8ed] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2a8bc4] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiUpload className="w-5 h-5" />
            {uploading ? 'Processing...' : `Add ${uploadedImages.length} Image(s) to Gallery`}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/gallery')}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 Tips:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
          <li>• You can upload multiple images at once</li>
          <li>• All uploaded images will share the same title, description, and category</li>
          <li>• Images are automatically uploaded to Supabase Storage</li>
          <li>• You can remove images before submitting by hovering and clicking the X</li>
          <li>• Recommended image size: 1920x1080px or similar aspect ratio</li>
        </ul>
      </div>

    </div>
  )
}

export default AdminGalleryForm
