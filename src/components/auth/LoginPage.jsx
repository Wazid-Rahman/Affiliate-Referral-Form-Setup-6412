import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiGraduationCap, FiUsers, FiTrendingUp, FiAward, FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiArrowRight } = FiIcons

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        // Check if user is new (for future onboarding)
        if (result.user.lastLogin === null) {
          navigate('/onboarding')
        } else {
          navigate('/analytics')
        }
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (role) => {
    const demoAccounts = {
      admin: { email: 'rafeeqanwar2016@gmail.com', password: 'Anwar@123' },
      manager: { email: 'sarah.manager@edurefer.com', password: 'Anwar@123' },
      analyst: { email: 'mike.analyst@edurefer.com', password: 'Anwar@123' }
    }

    const demo = demoAccounts[role]
    if (demo) {
      setFormData(demo)
      // Auto-submit after a short delay
      setTimeout(() => {
        handleSubmit({ preventDefault: () => {} })
      }, 500)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiGraduationCap} className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold">EduRefer</h1>
            </div>

            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Welcome Back to Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Success Journey
              </span>
            </h2>

            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Continue building your academic excellence network and track your referral success with powerful analytics and insights.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTrendingUp} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Real-time Analytics</h3>
                  <p className="text-blue-200">Track performance and optimize your referral strategy</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiUsers} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Affiliate Network</h3>
                  <p className="text-blue-200">Manage and grow your referral community</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiAward} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Reward System</h3>
                  <p className="text-blue-200">Earn and track rewards for successful referrals</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiGraduationCap} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">EduRefer</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <SafeIcon icon={FiLogIn} />
                  Sign In
                  <SafeIcon icon={FiArrowRight} />
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Demo Accounts</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-blue-50 transition-colors"
              >
                <span className="font-medium text-red-600">Admin:</span> rafeeqanwar2016@gmail.com
              </button>
              <button
                onClick={() => handleDemoLogin('manager')}
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-blue-50 transition-colors"
              >
                <span className="font-medium text-blue-600">Manager:</span> sarah.manager@edurefer.com
              </button>
              <button
                onClick={() => handleDemoLogin('analyst')}
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-blue-50 transition-colors"
              >
                <span className="font-medium text-green-600">Analyst:</span> mike.analyst@edurefer.com
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Password for all: Anwar@123</p>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need access?{' '}
              <Link to="/landing" className="text-blue-600 font-medium hover:underline">
                Contact Administrator
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage