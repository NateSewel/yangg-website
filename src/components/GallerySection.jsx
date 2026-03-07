import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

const GallerySection = () => {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const galleryItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      title: "Africa The Future Conference 2024",
      category: "conference",
      description: "Young leaders gathering in Lagos"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
      title: "Leadership Academy Training",
      category: "training",
      description: "Cohort 1 participants in action"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
      title: "She Leads Workshop",
      category: "workshop",
      description: "Women empowerment session"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      title: "Team Collaboration",
      category: "training",
      description: "Youth working on SDG projects"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
      title: "Afripreneur Pitch Day",
      category: "conference",
      description: "Young innovators presenting ideas"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
      title: "Community Outreach",
      category: "workshop",
      description: "Engaging with local communities"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      title: "Digital Skills Training",
      category: "training",
      description: "Technology workshop in Nairobi"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800",
      title: "Youth Summit 2024",
      category: "conference",
      description: "Pan-African youth gathering"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
      title: "Mentorship Session",
      category: "workshop",
      description: "One-on-one guidance for young leaders"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
      title: "Innovation Hub Launch",
      category: "conference",
      description: "Opening of new tech hub in Accra"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
      title: "Coding Workshop",
      category: "training",
      description: "Teaching programming to young Africans"
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
      title: "Networking Event",
      category: "conference",
      description: "Connecting entrepreneurs and investors"
    },
    {
      id: 13,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
      title: "Business Strategy Workshop",
      category: "workshop",
      description: "Strategic planning for startups"
    },
    {
      id: 14,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
      title: "Leadership Retreat",
      category: "training",
      description: "Intensive leadership development program"
    },
    {
      id: 15,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
      title: "Panel Discussion",
      category: "conference",
      description: "Industry experts sharing insights"
    }
  ]

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
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
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
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          {t('gallery.title')}
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
        >
          {t('gallery.subtitle')}
        </motion.p>

        {/* Filter Buttons */}
        <motion.div 
          variants={fadeIn('up', 0.5)}
          className="flex flex-wrap justify-center gap-3"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              variants={fadeIn('up', 0.1 * (index + 1))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all cursor-pointer ${
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
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <AnimatePresence>
          {currentItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(item)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 cursor-pointer shadow-md'
            }`}
          >
            <HiChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1
              return (
                <motion.button
                  key={pageNum}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageClick(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 shadow-md'
                  }`}
                >
                  {pageNum}
                </motion.button>
              )
            })}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-all ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 cursor-pointer shadow-md'
            }`}
          >
            <HiChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400"
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
