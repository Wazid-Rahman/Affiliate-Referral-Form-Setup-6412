import supabase from '../lib/supabase'
import bcrypt from 'bcryptjs'

export const authService = {
  // Login with email and password
  async login(email, password) {
    try {
      // Get user from our custom users table
      const { data: user, error } = await supabase
        .from('app_users_rf7x9m2k8a')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('is_active', true)
        .single()

      if (error || !user) {
        throw new Error('Invalid email or password')
      }

      // Verify password (in production, this should be done server-side)
      const isValidPassword = await bcrypt.compare(password, user.password_hash)
      
      if (!isValidPassword) {
        throw new Error('Invalid email or password')
      }

      // Update last login
      await supabase
        .from('app_users_rf7x9m2k8a')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id)

      // Create a session token (simplified for demo)
      const sessionToken = btoa(JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        timestamp: Date.now()
      }))

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          isAdmin: user.role === 'admin',
          lastLogin: user.last_login
        },
        token: sessionToken
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: error.message || 'Login failed'
      }
    }
  },

  // Register new user (admin only)
  async register(userData, currentUserToken) {
    try {
      // Verify admin permissions
      const currentUser = this.validateToken(currentUserToken)
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required')
      }

      // Hash password
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(userData.password, saltRounds)

      // Insert new user
      const { data: newUser, error } = await supabase
        .from('app_users_rf7x9m2k8a')
        .insert([{
          email: userData.email.toLowerCase(),
          password_hash: passwordHash,
          role: userData.role || 'user',
          first_name: userData.firstName,
          last_name: userData.lastName,
          is_active: true
        }])
        .select()
        .single()

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('User with this email already exists')
        }
        throw new Error(error.message)
      }

      return {
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          firstName: newUser.first_name,
          lastName: newUser.last_name
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        error: error.message || 'Registration failed'
      }
    }
  },

  // Get all users (admin only)
  async getUsers(token) {
    try {
      const currentUser = this.validateToken(token)
      if (!currentUser || !['admin', 'manager'].includes(currentUser.role)) {
        throw new Error('Unauthorized access')
      }

      const { data: users, error } = await supabase
        .from('app_users_rf7x9m2k8a')
        .select('id, email, role, first_name, last_name, is_active, last_login, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(error.message)
      }

      return {
        success: true,
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          isActive: user.is_active,
          lastLogin: user.last_login,
          createdAt: user.created_at,
          avatar: `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
        }))
      }
    } catch (error) {
      console.error('Get users error:', error)
      return {
        success: false,
        error: error.message || 'Failed to fetch users'
      }
    }
  },

  // Update user (admin only)
  async updateUser(userId, updates, currentUserToken) {
    try {
      const currentUser = this.validateToken(currentUserToken)
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required')
      }

      const updateData = {
        first_name: updates.firstName,
        last_name: updates.lastName,
        role: updates.role,
        is_active: updates.isActive,
        updated_at: new Date().toISOString()
      }

      // Hash new password if provided
      if (updates.password) {
        const saltRounds = 10
        updateData.password_hash = await bcrypt.hash(updates.password, saltRounds)
      }

      const { data: updatedUser, error } = await supabase
        .from('app_users_rf7x9m2k8a')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return {
        success: true,
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          role: updatedUser.role,
          firstName: updatedUser.first_name,
          lastName: updatedUser.last_name,
          isActive: updatedUser.is_active
        }
      }
    } catch (error) {
      console.error('Update user error:', error)
      return {
        success: false,
        error: error.message || 'Failed to update user'
      }
    }
  },

  // Delete user (admin only)
  async deleteUser(userId, currentUserToken) {
    try {
      const currentUser = this.validateToken(currentUserToken)
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required')
      }

      // Prevent admin from deleting themselves
      if (currentUser.userId === userId) {
        throw new Error('Cannot delete your own account')
      }

      const { error } = await supabase
        .from('app_users_rf7x9m2k8a')
        .delete()
        .eq('id', userId)

      if (error) {
        throw new Error(error.message)
      }

      return { success: true }
    } catch (error) {
      console.error('Delete user error:', error)
      return {
        success: false,
        error: error.message || 'Failed to delete user'
      }
    }
  },

  // Validate session token
  validateToken(token) {
    try {
      if (!token) return null
      
      const decoded = JSON.parse(atob(token))
      
      // Check if token is expired (24 hours)
      const tokenAge = Date.now() - decoded.timestamp
      const maxAge = 24 * 60 * 60 * 1000 // 24 hours
      
      if (tokenAge > maxAge) {
        return null
      }

      return decoded
    } catch (error) {
      console.error('Token validation error:', error)
      return null
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    return { success: true }
  }
}