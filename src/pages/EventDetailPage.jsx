import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import { FaCalendar, FaMapMarkerAlt, FaArrowLeft, FaUsers, FaBullseye, FaTrophy } from 'react-icons/fa'
import { HiX } from 'react-icons/hi'
import { eventsData } from '../data/eventsData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const EventDetailPage = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const event = eventsData.find(e => e.id === eventId)
  const [showImageModal, setShowImageModal] = useState(false)

  if (!event) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h1>
          <Link to="/events" className="text-[#32a8ed] dark:text-[#32a8ed] hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const statusColors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    ongoing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors font-['Montserrat']">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.button
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          whileInView="show"
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-[#32a8ed] dark:text-[#32a8ed] hover:gap-3 transition-all mb-6 md:mb-8 cursor-pointer font-['Montserrat']"
        >
          <FaArrowLeft />
          <span>Back to Events</span>
        </motion.button>

        {/* Event Header */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          className="mb-8"
        >
          {/* Event Image */}
          {event.image && (
            <motion.div
              variants={fadeIn('up', 0.4)}
              className="mb-6 md:mb-8 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              onClick={() => setShowImageModal(true)}
            >
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusColors[event.status]} font-['Montserrat']`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 font-['Montserrat']">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
          
          <motion.h1
            variants={textVariant(0.4)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-['Montserrat']"
          >
            {event.title}
          </motion.h1>

          <motion.p
            variants={fadeIn('up', 0.5)}
            className="text-lg sm:text-xl text-[#32a8ed] dark:text-[#32a8ed] font-semibold mb-4 md:mb-6 font-['Montserrat']"
          >
            {event.theme}
          </motion.p>

          <motion.div
            variants={fadeIn('up', 0.6)}
            className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-300 font-['Montserrat']"
          >
            <div className="flex items-center gap-2">
              <FaCalendar className="text-[#32a8ed] dark:text-[#32a8ed]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
              <span>{event.location}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Overview */}
        <motion.section
          variants={fadeIn('up', 0.7)}
          initial="hidden"
          whileInView="show"
          className="mb-8 md:mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 font-['Montserrat']">Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base font-['Montserrat']">
            {event.overview}
          </p>
        </motion.section>

        {/* Objectives */}
        {event.objectives && (
          <motion.section
            variants={fadeIn('up', 0.8)}
            initial="hidden"
            whileInView="show"
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <FaBullseye className="text-[#32a8ed] dark:text-[#32a8ed] text-xl md:text-2xl" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-['Montserrat']">Objectives</h2>
            </div>
            <ul className="space-y-2 md:space-y-3">
              {event.objectives.map((objective, index) => (
                <motion.li
                  key={index}
                  variants={fadeIn('right', 0.1 * index)}
                  className="flex items-start gap-2 md:gap-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base font-['Montserrat']"
                >
                  <span className="text-[#32a8ed] dark:text-[#32a8ed] mt-1">•</span>
                  <span>{objective}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Speakers/Panelists */}
        {(event.speakers || event.panelists || event.facilitators) && (
          <motion.section
            variants={fadeIn('up', 0.9)}
            initial="hidden"
            whileInView="show"
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <FaUsers className="text-green-600 dark:text-green-400 text-xl md:text-2xl" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-['Montserrat']">
                {event.speakers ? 'Speakers' : event.panelists ? 'Panelists' : 'Facilitators'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(event.speakers || event.panelists || event.facilitators)?.map((speaker, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 0.1 * index)}
                  className="p-3 md:p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow border-2 border-[#f0c630] dark:border-[#f0c630]"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base font-['Montserrat']">
                    {speaker.name}
                  </h3>
                  {speaker.title && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-['Montserrat']">
                      {speaker.title}
                    </p>
                  )}
                  {speaker.country && (
                    <p className="text-sm text-[#32a8ed] dark:text-[#32a8ed] font-['Montserrat']">
                      {speaker.country}
                    </p>
                  )}
                  {speaker.topic && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic font-['Montserrat']">
                      Topic: {speaker.topic}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Topics */}
        {event.topics && (
          <motion.section
            variants={fadeIn('up', 1.0)}
            initial="hidden"
            whileInView="show"
            className="mb-8 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 font-['Montserrat']">Topics Covered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.topics.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 0.1 * index)}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border-2 border-[#f0c630] dark:border-[#f0c630]"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-['Montserrat']">
                    {item.topic}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-['Montserrat']">
                    {item.speaker} ({item.country})
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Highlights */}
        {event.highlights && (
          <motion.section
            variants={fadeIn('up', 1.1)}
            initial="hidden"
            whileInView="show"
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <FaTrophy className="text-yellow-600 dark:text-yellow-400 text-xl md:text-2xl" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-['Montserrat']">Highlights</h2>
            </div>
            <ul className="space-y-2 md:space-y-3">
              {event.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  variants={fadeIn('right', 0.1 * index)}
                  className="flex items-start gap-2 md:gap-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base font-['Montserrat']"
                >
                  <span className="text-yellow-600 dark:text-yellow-400 mt-1">★</span>
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Focus Areas */}
        {event.focusAreas && (
          <motion.section
            variants={fadeIn('up', 1.2)}
            initial="hidden"
            whileInView="show"
            className="mb-8 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 font-['Montserrat']">Focus Areas</h2>
            <ul className="space-y-2 md:space-y-3">
              {event.focusAreas.map((area, index) => (
                <motion.li
                  key={index}
                  variants={fadeIn('right', 0.1 * index)}
                  className="flex items-start gap-2 md:gap-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base font-['Montserrat']"
                >
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>{area}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Participants */}
        {event.participants && (
          <motion.section
            variants={fadeIn('up', 1.3)}
            initial="hidden"
            whileInView="show"
            className="mb-8 md:mb-12"
          >
            <div className="p-4 md:p-6 rounded-xl bg-[#32a8ed]/10 dark:bg-[#32a8ed]/20 border border-[#32a8ed]/30 dark:border-[#32a8ed]/50">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 font-['Montserrat']">
                Participation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-['Montserrat']">{event.participants}</p>
            </div>
          </motion.section>
        )}

        {/* Impact */}
        {event.impact && (
          <motion.section
            variants={fadeIn('up', 1.4)}
            initial="hidden"
            whileInView="show"
            className="mb-8 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 font-['Montserrat']">Impact</h2>
            <div className="p-4 md:p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base font-['Montserrat']">
                {event.impact}
              </p>
            </div>
          </motion.section>
        )}

        {/* Back to Events Button */}
        <motion.div
          variants={fadeIn('up', 1.5)}
          initial="hidden"
          whileInView="show"
          className="text-center"
        >
          <button
            onClick={() => navigate('/events')}
            className="bg-[#32a8ed] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:bg-[#2a8bc4] transition-colors cursor-pointer text-sm sm:text-base font-['Montserrat']"
          >
            View All Events
          </button>
        </motion.div>
      </div>

      <Footer />

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {showImageModal && event.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm cursor-pointer"
            >
              <HiX className="w-6 h-6" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-white text-center">
                <h3 className="text-2xl font-bold mb-2 font-['Montserrat']">{event.title}</h3>
                <p className="text-gray-300 font-['Montserrat']">{event.theme}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventDetailPage
