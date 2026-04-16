import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { HiCalendar, HiLocationMarker, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { eventsData } from '../data/eventsData'
import { getAllEvents } from '../services/eventsService'

const EventsSection = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('all')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const itemsPerPage = 6

  // Fetch events from Supabase on mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const { data, error } = await getAllEvents()
      
      if (error || !data || data.length === 0) {
        // Fall back to static data if Supabase fails or returns no data
        console.log('Using static events data')
        setEvents(eventsData.slice(0, 12))
        setError(null)
      } else {
        // Map Supabase data to match static data structure
        const mappedEvents = data.map(event => ({
          ...event,
          shortDescription: event.short_description || event.shortDescription
        }))
        // Use Supabase data (limit to 12 for home page)
        setEvents(mappedEvents.slice(0, 12))
        setError(null)
      }
      
      setLoading(false)
    }

    fetchEvents()
  }, [])

  // Use real events data and take only the first 12 for the home page
  const allEvents = events
  
  // Filter events based on selected category
  const filteredEvents = filter === 'all' 
    ? allEvents 
    : allEvents.filter(event => event.category === filter)

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum)
  }
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setCurrentPage(1) // Reset to first page when filter changes
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

  const getCardColor = (category) => {
    const colors = {
      conference: 'from-blue-50 to-blue-100/50',
      training: 'from-green-50 to-green-100/50',
      workshop: 'from-pink-50 to-pink-100/50',
      campaign: 'from-purple-50 to-purple-100/50'
    }
    return colors[category] || 'from-gray-50 to-gray-100/50'
  }

  return (
    <section id="events" className="section-container font-['Montserrat']">
      <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white font-['Montserrat']"
        >
          {t('events.title')}
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-['Montserrat']"
        >
          {t('events.subtitle')}
        </motion.p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#32a8ed]"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading events...</p>
        </motion.div>
      )}

      {/* Content */}
      {!loading && (
        <>

      {/* Filter Buttons */}
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {['all', 'conference', 'training', 'workshop', 'campaign'].map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all cursor-pointer font-['Montserrat'] ${
              filter === category
                ? 'bg-[#32a8ed] text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>

      <motion.div 
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
      >
        {currentEvents.length === 0 ? (
          <motion.div 
            variants={fadeIn('up', 0.5)}
            className="col-span-full text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No events found in this category. Try selecting a different filter.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {currentEvents.map((event, index) => (
            <motion.div 
              key={`${event.id}-${currentPage}-${filter}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`bg-gradient-to-br ${getCardColor(event.category)} dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-[#f0c630] dark:border-[#f0c630]`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)} font-['Montserrat']`}>
                  {getStatusText(event.status)}
                </span>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full font-['Montserrat']">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </div>

              <h3 
                className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 font-['Montserrat']"
              >
                {event.title}
              </h3>

              <p 
                className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 font-['Montserrat']"
              >
                {event.shortDescription}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-['Montserrat']">
                  <HiCalendar className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-['Montserrat']">
                  <HiLocationMarker className="w-4 h-4 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>

              <Link to={`/events/${event.id}`}>
                <button 
                  className="mt-6 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-105 active:scale-95 transform font-['Montserrat']"
                >
                  {t('events.learnMore')}
                </button>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        )}
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
          Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} events
        </motion.p>
      )}

      {/* View All Events Button */}
      <motion.div
        variants={fadeIn('up', 0.5)}
        initial="hidden"
        whileInView="show"
        className="text-center mt-12"
      >
        <Link to="/events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#32a8ed] dark:bg-[#32a8ed] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2a8bc4] dark:hover:bg-[#2a8bc4] transition-colors shadow-lg cursor-pointer"
          >
            View All Events & Programs
          </motion.button>
        </Link>
      </motion.div>
      </>
      )}
    </section>
  )
}

export default EventsSection
