import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing authentication on app load
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('currentUser')

    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        const tokenData = authService.validateToken(token)
        
        if (tokenData) {
          setUser(user)
          setIsAuthenticated(true)
        } else {
          // Token expired, clear storage
          localStorage.removeItem('authToken')
          localStorage.removeItem('currentUser')
        }
      } catch (error) {
        console.error('Auth restoration error:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUser')
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password)
      
      if (result.success) {
        localStorage.setItem('authToken', result.token)
        localStorage.setItem('currentUser', JSON.stringify(result.user))
        
        setUser(result.user)
        setIsAuthenticated(true)
        
        return { success: true, user: result.user }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    isAdmin: user?.isAdmin || false,
    token: localStorage.getItem('authToken')
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}