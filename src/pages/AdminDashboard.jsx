import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHome, HiCalendar, HiPhotograph, HiMenu, HiX } from 'react-icons/hi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HiHome },
    { name: 'Events', href: '/admin/events', icon: HiCalendar },
    { name: 'Gallery', href: '/admin/gallery', icon: HiPhotograph },
  ]

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-24 left-4 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
          >
            {sidebarOpen ? (
              <HiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-30 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <nav className="p-4 space-y-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white px-3">
                  Admin CMS
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 px-3 mt-1">
                  Content Management System
                </p>
              </div>

              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-[#32a8ed] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminDashboard
