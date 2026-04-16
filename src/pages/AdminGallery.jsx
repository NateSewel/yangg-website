import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiPlus, HiTrash, HiEye } from 'react-icons/hi'
import { getAllGalleryItems, deleteGalleryItem, deleteGalleryImage } from '../services/galleryService'

const AdminGallery = () => {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, title: '', imagePath: '' })

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    setLoading(true)
    const { data, error } = await getAllGalleryItems()
    if (!error && data) {
      setGallery(data)
    }
    setLoading(false)
  }

  const handleDeleteRequest = (id, title, imagePath) => {
    setDeleteConfirm({ open: true, id, title, imagePath })
  }

  const handleCancelDelete = () => {
    setDeleteConfirm({ open: false, id: null, title: '', imagePath: '' })
  }

  const handleConfirmDelete = async () => {
    const { id, imagePath } = deleteConfirm
    if (!id) return

    const { error } = await deleteGalleryItem(id)

    if (imagePath) {
      await deleteGalleryImage(imagePath)
    }

    if (!error) {
      setGallery(gallery.filter(item => item.id !== id))
    } else {
      console.error('Failed to delete gallery item:', error)
    }

    handleCancelDelete()
  }

  const filteredGallery = gallery.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getCategoryBadge = (category) => {
    const colors = {
      conference: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      training: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      workshop: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
    }
    return colors[category] || colors.conference
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gallery Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your gallery images and albums
          </p>
        </div>
        <Link to="/admin/gallery/new">
          <button className="mt-4 md:mt-0 bg-[#32a8ed] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2a8bc4] transition-colors flex items-center gap-2">
            <HiPlus className="w-5 h-5" />
            Upload Images
          </button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="conference">Conference</option>
            <option value="training">Training</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32a8ed]"></div>
        </div>
      ) : filteredGallery.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No gallery items found. Upload your first images!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadge(item.category)}`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={item.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <HiEye className="w-4 h-4" />
                    View
                  </a>
                  <button
                    onClick={() => handleDeleteRequest(item.id, item.title, item.image_path)}
                    className="px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredGallery.length} of {gallery.length} items
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Confirm delete
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-5">
              Are you sure you want to delete <span className="font-semibold">{deleteConfirm.title}</span>?
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminGallery
