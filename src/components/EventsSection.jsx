import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { HiCalendar, HiLocationMarker, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

const EventsSection = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const events = [
    {
      title: "Africa The Future Conference 2025",
      category: "Conference",
      date: "January 2025",
      location: "Lagos, Nigeria",
      description: "Annual flagship conference on digital transformation and civic engagement",
      status: "completed",
      color: "blue"
    },
    {
      title: "YANGG Leadership Academy Cohort 2",
      category: "Training",
      date: "March 2025",
      location: "Multi-country",
      description: "Second cohort of our comprehensive leadership development program",
      status: "upcoming",
      color: "green"
    },
    {
      title: "She Leads Summit",
      category: "Women Empowerment",
      date: "May 2025",
      location: "Accra, Ghana",
      description: "Empowering young African women to take leadership roles",
      status: "upcoming",
      color: "pink"
    },
    {
      title: "Afripreneur Pitch Competition",
      category: "Entrepreneurship",
      date: "July 2025",
      location: "Nairobi, Kenya",
      description: "Young innovators pitch their solutions for funding and mentorship",
      status: "upcoming",
      color: "purple"
    },
    {
      title: "Youth for Sustainable Innovations",
      category: "SDG Workshop",
      date: "September 2025",
      location: "Banjul, Gambia",
      description: "Hands-on workshop on creating sustainable solutions for local challenges",
      status: "upcoming",
      color: "teal"
    },
    {
      title: "African Youths Virtual SDG Training",
      category: "Online Training",
      date: "Ongoing",
      location: "Virtual",
      description: "Comprehensive online training on Sustainable Development Goals",
      status: "ongoing",
      color: "indigo"
    },
    {
      title: "Tech Innovation Bootcamp",
      category: "Training",
      date: "November 2025",
      location: "Kigali, Rwanda",
      description: "Intensive bootcamp on emerging technologies and digital innovation",
      status: "upcoming",
      color: "blue"
    },
    {
      title: "Pan-African Youth Forum",
      category: "Conference",
      date: "December 2025",
      location: "Addis Ababa, Ethiopia",
      description: "Continental gathering of young leaders to discuss Africa's future",
      status: "upcoming",
      color: "green"
    },
    {
      title: "Climate Action Workshop",
      category: "Workshop",
      date: "February 2026",
      location: "Cape Town, South Africa",
      description: "Youth-led initiatives for climate change mitigation and adaptation",
      status: "upcoming",
      color: "teal"
    },
    {
      title: "Digital Marketing Masterclass",
      category: "Training",
      date: "April 2026",
      location: "Virtual",
      description: "Learn digital marketing strategies for African businesses",
      status: "upcoming",
      color: "purple"
    },
    {
      title: "Women in Tech Conference",
      category: "Conference",
      date: "June 2026",
      location: "Dakar, Senegal",
      description: "Celebrating and empowering women in technology across Africa",
      status: "upcoming",
      color: "pink"
    },
    {
      title: "Social Entrepreneurship Summit",
      category: "Conference",
      date: "August 2026",
      location: "Kampala, Uganda",
      description: "Connecting social entrepreneurs with investors and mentors",
      status: "upcoming",
      color: "indigo"
    }
  ]

  // Calculate pagination
  const totalPages = Math.ceil(events.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = events.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
      case 'upcoming': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
      case 'ongoing': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return t('events.completed')
      case 'upcoming': return t('events.upcoming')
      case 'ongoing': return t('events.ongoing')
      default: return status
    }
  }

  const getCardColor = (color) => {
    const colors = {
      blue: 'from-blue-50 to-blue-100/50',
      green: 'from-green-50 to-green-100/50',
      pink: 'from-pink-50 to-pink-100/50',
      purple: 'from-purple-50 to-purple-100/50',
      teal: 'from-teal-50 to-teal-100/50',
      indigo: 'from-indigo-50 to-indigo-100/50'
    }
    return colors[color] || colors.blue
  }

  return (
    <section id="events" className="section-container">
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
          {t('events.title')}
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {t('events.subtitle')}
        </motion.p>
      </motion.div>

      <motion.div 
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
      >
        <AnimatePresence>
          {currentEvents.map((event, index) => (
            <motion.div 
              key={`${event.title}-${currentPage}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`bg-gradient-to-br ${getCardColor(event.color)} dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-transparent dark:border-gray-600`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {getStatusText(event.status)}
                </span>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                  {event.category}
                </span>
              </div>

              <motion.h3 
                variants={textVariant(0.3)}
                className="text-xl font-bold text-gray-900 dark:text-white mb-3"
              >
                {event.title}
              </motion.h3>

              <motion.p 
                variants={fadeIn('up', 0.4)}
                className="text-gray-600 dark:text-gray-300 text-sm mb-4"
              >
                {event.description}
              </motion.p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <HiCalendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <HiLocationMarker className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
              >
                {t('events.learnMore')}
              </motion.button>
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
          Showing {startIndex + 1}-{Math.min(endIndex, events.length)} of {events.length} events
        </motion.p>
      )}
    </section>
  )
}

export default EventsSection
