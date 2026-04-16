import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
}

const AUTH_STORAGE_KEY = 'isAdminAuthenticated'

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
    setIsAdmin(savedAuth)
    setInitialized(true)
  }, [])

  const login = ({ username, password }) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      setIsAdmin(true)
      return { success: true }
    }

    return { success: false, error: 'Invalid username or password.' }
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  )
}
