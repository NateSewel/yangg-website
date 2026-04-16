import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiPlus, HiPencil, HiTrash, HiEye } from 'react-icons/hi'
import { getAllEvents, deleteEvent } from '../services/eventsService'

const AdminEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await getAllEvents()
    if (!error && data) {
      setEvents(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const { error } = await deleteEvent(id)
      if (!error) {
        setEvents(events.filter(e => e.id !== id))
      } else {
        console.error('Failed to delete event:', error)
      }
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.theme?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status) => {
    const colors = {
      completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      upcoming: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      ongoing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    }
    return colors[status] || colors.completed
  }

  const getCategoryBadge = (category) => {
    const colors = {
      conference: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      training: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      workshop: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      campaign: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    }
    return colors[category] || colors.conference
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Events Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your events and programs
          </p>
        </div>
        <Link to="/admin/events/new">
          <button className="mt-4 md:mt-0 bg-[#32a8ed] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2a8bc4] transition-colors flex items-center gap-2">
            <HiPlus className="w-5 h-5" />
            Create New Event
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
              placeholder="Search events..."
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
            <option value="campaign">Campaign</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32a8ed]"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No events found. Create your first event!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
                      {event.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadge(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {event.theme}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/events/${event.id}`} target="_blank">
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#32a8ed] dark:hover:text-[#32a8ed] transition-colors">
                      <HiEye className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link to={`/admin/events/edit/${event.id}`}>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <HiPencil className="w-5 h-5" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id, event.title)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredEvents.length} of {events.length} events
      </div>
    </div>
  )
}

export default AdminEvents
