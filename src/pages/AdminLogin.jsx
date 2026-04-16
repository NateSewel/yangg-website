import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const AdminLogin = () => {
  const { isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin', { replace: true })
    }
  }, [isAdmin, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()

    const result = login({ username, password })
    if (result.success) {
      const from = location.state?.from?.pathname || '/admin'
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <motion.div variants={textVariant(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Secure access to the dashboard. Enter your admin credentials to continue.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32a8ed]"
                  placeholder="admin"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32a8ed]"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#32a8ed] px-4 py-3 text-white font-semibold hover:bg-[#2a8bc4] transition-colors"
              >
                Log in
              </button>
            </form>

            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
              <p>Use the admin route button to open the secure login page.</p>
              <p className="mt-2">Default credentials: <strong>admin / password123</strong></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminLogin
