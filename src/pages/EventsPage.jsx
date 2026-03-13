import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import { FaCalendar, FaMapMarkerAlt, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { eventsData } from '../data/eventsData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const EventsPage = () => {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6 // Changed from 9 to 6 for 3x2 grid

  const filteredEvents = filter === 'all' 
    ? eventsData 
    : eventsData.filter(event => event.category === filter)

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const endIndex = startIndex + eventsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  const statusColors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    ongoing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors font-['Montserrat']">
      <Navbar />
      
      <div className="pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          className="text-center mb-8 md:mb-12"
        >
          <motion.h1
            variants={textVariant(0.3)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 font-['Montserrat']"
          >
            Our Events & Programs
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 0.4)}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-['Montserrat']"
          >
            Explore our comprehensive collection of events, training programs, and initiatives that have empowered thousands of young African leaders
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
        >
          {['all', 'conference', 'training', 'workshop', 'campaign'].map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium transition-all cursor-pointer text-sm md:text-base font-['Montserrat'] ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {currentEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg font-['Montserrat']">
                No events found in this category. Try selecting a different filter.
              </p>
            </div>
          ) : (
            currentEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
            >
              {/* Event Image */}
              {event.image && (
                <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              )}

              <div className="p-4 md:p-6">
                {/* Status and Category Badges */}
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <span className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium ${statusColors[event.status]} font-['Montserrat']`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  <span className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 font-['Montserrat']">
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-['Montserrat']">
                  {event.title}
                </h3>

                {/* Theme */}
                <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2 md:mb-3 font-['Montserrat']">
                  {event.theme}
                </p>

                {/* Date and Location */}
                <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-['Montserrat']">
                    <FaCalendar className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="line-clamp-1">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-['Montserrat']">
                    <FaMapMarkerAlt className="text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-3 font-['Montserrat']">
                  {event.shortDescription}
                </p>

                {/* Learn More Button */}
                <Link
                  to={`/events/${event.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all cursor-pointer text-xs sm:text-sm font-['Montserrat']"
                >
                  <span>Learn More</span>
                  <FaArrowRight />
                </Link>
              </div>
            </motion.div>
          ))
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                }`}
              >
                <FaChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                }`}
              >
                <FaChevronRight />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-['Montserrat']">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} events
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default EventsPage
