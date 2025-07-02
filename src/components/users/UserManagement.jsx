import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiShield, FiEdit3, FiTrash2, FiPlus, FiSearch, FiFilter, FiMoreVertical, FiCheck, FiX, FiEye, FiLock, FiUnlock, FiUserPlus } = FiIcons;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  useEffect(() => {
    const mockUsers = [
      {
        id: 'u_001',
        name: 'John Admin',
        email: 'john.admin@edurefer.com',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-03-21T10:30:00Z',
        createdAt: '2024-01-15T09:00:00Z',
        permissions: ['all'],
        avatar: 'JA',
        department: 'Administration'
      },
      {
        id: 'u_002',
        name: 'Sarah Manager',
        email: 'sarah.manager@edurefer.com',
        role: 'manager',
        status: 'active',
        lastLogin: '2024-03-21T08:15:00Z',
        createdAt: '2024-01-20T10:30:00Z',
        permissions: ['view_analytics', 'manage_affiliates', 'view_reports'],
        avatar: 'SM',
        department: 'Operations'
      },
      {
        id: 'u_003',
        name: 'Mike Analyst',
        email: 'mike.analyst@edurefer.com',
        role: 'analyst',
        status: 'active',
        lastLogin: '2024-03-20T16:45:00Z',
        createdAt: '2024-02-01T11:00:00Z',
        permissions: ['view_analytics', 'view_reports'],
        avatar: 'MA',
        department: 'Analytics'
      },
      {
        id: 'u_004',
        name: 'Lisa Support',
        email: 'lisa.support@edurefer.com',
        role: 'support',
        status: 'active',
        lastLogin: '2024-03-21T09:20:00Z',
        createdAt: '2024-02-10T14:15:00Z',
        permissions: ['view_affiliates', 'basic_support'],
        avatar: 'LS',
        department: 'Customer Support'
      },
      {
        id: 'u_005',
        name: 'David Viewer',
        email: 'david.viewer@edurefer.com',
        role: 'viewer',
        status: 'inactive',
        lastLogin: '2024-03-15T12:00:00Z',
        createdAt: '2024-02-20T16:30:00Z',
        permissions: ['view_basic'],
        avatar: 'DV',
        department: 'External'
      }
    ];
    
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const roles = [
    { id: 'admin', name: 'Administrator', color: 'red', permissions: ['all'] },
    { id: 'manager', name: 'Manager', color: 'blue', permissions: ['view_analytics', 'manage_affiliates', 'view_reports'] },
    { id: 'analyst', name: 'Analyst', color: 'green', permissions: ['view_analytics', 'view_reports'] },
    { id: 'support', name: 'Support', color: 'yellow', permissions: ['view_affiliates', 'basic_support'] },
    { id: 'viewer', name: 'Viewer', color: 'gray', permissions: ['view_basic'] }
  ];

  const permissions = [
    { id: 'all', name: 'Full Access', description: 'Complete system access' },
    { id: 'view_analytics', name: 'View Analytics', description: 'Access to analytics dashboard' },
    { id: 'manage_affiliates', name: 'Manage Affiliates', description: 'Create, edit, and manage affiliates' },
    { id: 'view_reports', name: 'View Reports', description: 'Access to detailed reports' },
    { id: 'view_affiliates', name: 'View Affiliates', description: 'Read-only access to affiliate data' },
    { id: 'basic_support', name: 'Basic Support', description: 'Basic customer support functions' },
    { id: 'view_basic', name: 'Basic View', description: 'Limited read-only access' }
  ];

  const getRoleColor = (role) => {
    const roleConfig = roles.find(r => r.id === role);
    return roleConfig ? roleConfig.color : 'gray';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const AddUserModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      role: 'viewer',
      department: '',
      permissions: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newUser = {
        id: `u_${Date.now()}`,
        ...formData,
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: null,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      setUsers([...users, newUser]);
      setShowAddModal(false);
      setFormData({ name: '', email: '', role: 'viewer', department: '', permissions: [] });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={() => setShowAddModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Add New User</h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <SafeIcon icon={FiX} className="text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter department"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add User
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-xl p-6 mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
                <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <SafeIcon icon={FiUserPlus} />
                Add User
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Login</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${getRoleColor(user.role)}-100 text-${getRoleColor(user.role)}-800`}>
                          <SafeIcon icon={FiShield} className="mr-1 text-xs" />
                          {roles.find(r => r.id === user.role)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.department}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              user.status === 'active' 
                                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                            title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                          >
                            <SafeIcon icon={user.status === 'active' ? FiLock : FiUnlock} className="text-sm" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditModal(true);
                            }}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Edit User"
                          >
                            <SafeIcon icon={FiEdit3} className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Delete User"
                          >
                            <SafeIcon icon={FiTrash2} className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* No Results */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiUsers} className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Users Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && <AddUserModal />}
      </AnimatePresence>
    </>
  );
};

export default UserManagement;