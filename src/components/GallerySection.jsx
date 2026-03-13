import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { generateGalleryItems } from '../data/galleryData'

const GallerySection = () => {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [direction, setDirection] = useState(0) // Track slide direction
  const itemsPerPage = 6

  const galleryItems = generateGalleryItems()

  const filters = [
    { id: 'all', label: t('gallery.filterAll') },
    { id: 'conference', label: t('gallery.filterConferences') },
    { id: 'training', label: t('gallery.filterTraining') },
    { id: 'workshop', label: t('gallery.filterWorkshops') }
  ]

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter)

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  // Reset to page 1 when filter changes
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    setCurrentPage(1)
  }

  const handlePrevPage = () => {
    setDirection(-1) // Slide from left
    setCurrentPage(prev => Math.max(prev - 1, 1))
    // Smooth scroll to gallery section
    const gallerySection = document.querySelector('#gallery')
    if (gallerySection) {
      const offset = 80
      const elementPosition = gallerySection.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleNextPage = () => {
    setDirection(1) // Slide from right
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
    // Smooth scroll to gallery section
    const gallerySection = document.querySelector('#gallery')
    if (gallerySection) {
      const offset = 80
      const elementPosition = gallerySection.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum)
  }

  return (
    <section id="gallery" className="section-container bg-gray-50 dark:bg-gray-800">
      <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        className="text-center mb-8 md:mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white"
        >
          {t('gallery.title')}
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 text-sm sm:text-base"
        >
          {t('gallery.subtitle')}
        </motion.p>

        {/* Filter Buttons */}
        <motion.div 
          variants={fadeIn('up', 0.5)}
          className="flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              variants={fadeIn('up', 0.1 * (index + 1))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full font-medium transition-all cursor-pointer text-sm md:text-base ${
                activeFilter === filter.id
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Gallery Grid */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div 
          key={currentPage}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(item)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white">
                  <h3 className="text-base md:text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8"
        >
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 md:p-3 rounded-lg transition-all ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 cursor-pointer shadow-md'
            }`}
          >
            <HiChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 md:p-3 rounded-lg transition-all ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 cursor-pointer shadow-md'
            }`}
          >
            <HiChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-3 md:mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
        >
          Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} images
        </motion.p>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 p-2 rounded-full backdrop-blur-sm cursor-pointer"
            >
              <HiX className="w-6 h-6" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300 dark:text-gray-400">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GallerySection
