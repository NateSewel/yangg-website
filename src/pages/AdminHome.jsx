import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiCalendar, HiPhotograph, HiUsers, HiTrendingUp } from 'react-icons/hi'
import { getAllEvents } from '../services/eventsService'
import { getAllGalleryItems } from '../services/galleryService'

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalGallery: 0,
    upcomingEvents: 0,
    completedEvents: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { data: events } = await getAllEvents()
      const { data: gallery } = await getAllGalleryItems()

      if (events) {
        setStats({
          totalEvents: events.length,
          totalGallery: gallery?.length || 0,
          upcomingEvents: events.filter(e => e.status === 'upcoming').length,
          completedEvents: events.filter(e => e.status === 'completed').length
        })
      }
      setLoading(false)
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      name: 'Total Events',
      value: stats.totalEvents,
      icon: HiCalendar,
      color: 'bg-blue-500',
      link: '/admin/events'
    },
    {
      name: 'Gallery Items',
      value: stats.totalGallery,
      icon: HiPhotograph,
      color: 'bg-purple-500',
      link: '/admin/gallery'
    },
    {
      name: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: HiTrendingUp,
      color: 'bg-green-500',
      link: '/admin/events'
    },
    {
      name: 'Completed Events',
      value: stats.completedEvents,
      icon: HiUsers,
      color: 'bg-orange-500',
      link: '/admin/events'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to YANGG Content Management System
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32a8ed]"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={stat.link}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {stat.name}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/admin/events/new">
                <button className="w-full bg-[#32a8ed] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2a8bc4] transition-colors flex items-center justify-center gap-2">
                  <HiCalendar className="w-5 h-5" />
                  Create New Event
                </button>
              </Link>
              <Link to="/admin/gallery/new">
                <button className="w-full bg-[#f0c630] text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-[#d4af2a] transition-colors flex items-center justify-center gap-2">
                  <HiPhotograph className="w-5 h-5" />
                  Add Gallery Images
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminHome
