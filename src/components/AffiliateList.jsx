import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiShare2, FiCopy, FiCheck, FiMail, FiPhone, FiExternalLink, FiX, FiSearch, FiFilter, FiTrendingUp, FiCalendar, FiDollarSign, FiCreditCard } = FiIcons;

const AffiliateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});
  const [sortBy, setSortBy] = useState('revenue');
  const [filterStatus, setFilterStatus] = useState('all');

  const affiliates = [
    {
      id: 'sarah_j_001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      referrals: 89,
      conversions: 23,
      revenue: 4560,
      totalPayments: 1725,
      pendingPayments: 225,
      conversionRate: 25.8,
      avgPaymentPerReferral: 75,
      status: 'active',
      joinDate: '2024-01-15',
      lastActivity: '2024-03-20',
      avatar: 'SJ'
    },
    {
      id: 'michael_c_002',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      referrals: 76,
      conversions: 19,
      revenue: 3980,
      totalPayments: 1235,
      pendingPayments: 130,
      conversionRate: 25.0,
      avgPaymentPerReferral: 65,
      status: 'active',
      joinDate: '2024-02-03',
      lastActivity: '2024-03-19',
      avatar: 'MC'
    },
    {
      id: 'emily_r_003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      referrals: 68,
      conversions: 16,
      revenue: 3240,
      totalPayments: 880,
      pendingPayments: 165,
      conversionRate: 23.5,
      avgPaymentPerReferral: 55,
      status: 'active',
      joinDate: '2024-01-28',
      lastActivity: '2024-03-18',
      avatar: 'ER'
    },
    {
      id: 'david_k_004',
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 456-7890',
      referrals: 54,
      conversions: 12,
      revenue: 2880,
      totalPayments: 600,
      pendingPayments: 150,
      conversionRate: 22.2,
      avgPaymentPerReferral: 50,
      status: 'inactive',
      joinDate: '2024-02-10',
      lastActivity: '2024-03-10',
      avatar: 'DK'
    },
    {
      id: 'lisa_t_005',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 567-8901',
      referrals: 47,
      conversions: 11,
      revenue: 2340,
      totalPayments: 495,
      pendingPayments: 90,
      conversionRate: 23.4,
      avgPaymentPerReferral: 45,
      status: 'active',
      joinDate: '2024-02-15',
      lastActivity: '2024-03-21',
      avatar: 'LT'
    },
    {
      id: 'james_w_006',
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 678-9012',
      referrals: 42,
      conversions: 9,
      revenue: 1980,
      totalPayments: 405,
      pendingPayments: 135,
      conversionRate: 21.4,
      avgPaymentPerReferral: 60,
      status: 'active',
      joinDate: '2024-02-20',
      lastActivity: '2024-03-20',
      avatar: 'JW'
    },
    {
      id: 'maria_g_007',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 789-0123',
      referrals: 38,
      conversions: 8,
      revenue: 1760,
      totalPayments: 360,
      pendingPayments: 80,
      conversionRate: 21.1,
      avgPaymentPerReferral: 55,
      status: 'pending',
      joinDate: '2024-03-01',
      lastActivity: '2024-03-19',
      avatar: 'MG'
    },
    {
      id: 'robert_b_008',
      name: 'Robert Brown',
      email: 'robert.brown@email.com',
      phone: '+1 (555) 890-1234',
      referrals: 35,
      conversions: 7,
      revenue: 1540,
      totalPayments: 315,
      pendingPayments: 70,
      conversionRate: 20.0,
      avgPaymentPerReferral: 55,
      status: 'active',
      joinDate: '2024-03-05',
      lastActivity: '2024-03-21',
      avatar: 'RB'
    }
  ];

  const generateAffiliateLink = (affiliate) => {
    return `${window.location.origin}/#/ref/${affiliate.id}`;
  };

  const copyToClipboard = async (text, affiliateId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [affiliateId]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [affiliateId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareLink = (platform, affiliate) => {
    const link = generateAffiliateLink(affiliate);
    const text = `Join our Academic Excellence Program through ${affiliate.name}'s referral! Get personalized test prep and academic support: ${link}`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Join Academic Excellence Program - Referred by ${affiliate.name}&body=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`, '_blank');
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAffiliates = affiliates
    .filter(affiliate => {
      const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          affiliate.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || affiliate.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'revenue': return b.revenue - a.revenue;
        case 'referrals': return b.referrals - a.referrals;
        case 'payments': return b.totalPayments - a.totalPayments;
        case 'conversionRate': return b.conversionRate - a.conversionRate;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const ShareModal = ({ affiliate, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-sm text-blue-600">
              {affiliate.avatar}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{affiliate.name}</h3>
              <p className="text-sm text-gray-600">Share referral link</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <SafeIcon icon={FiX} className="text-gray-600" />
          </button>
        </div>

        {/* Affiliate Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-sm font-bold text-gray-800">{affiliate.referrals}</div>
            <div className="text-xs text-gray-600">Referrals</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-gray-800">{affiliate.conversionRate}%</div>
            <div className="text-xs text-gray-600">Conv. Rate</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">${affiliate.totalPayments}</div>
            <div className="text-xs text-gray-600">Paid</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-yellow-600">${affiliate.pendingPayments}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
        </div>

        {/* Payment Performance */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <SafeIcon icon={FiCreditCard} className="text-green-600" />
            <span className="text-sm font-semibold text-gray-800">Payment Performance</span>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>• Average payment per referral: ${affiliate.avgPaymentPerReferral}</div>
            <div>• Total earnings: ${affiliate.totalPayments + affiliate.pendingPayments}</div>
            <div>• Payment rate: {((affiliate.totalPayments / (affiliate.totalPayments + affiliate.pendingPayments)) * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* Shareable Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Referral Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={generateAffiliateLink(affiliate)}
              readOnly
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 font-mono"
            />
            <button
              onClick={() => copyToClipboard(generateAffiliateLink(affiliate), affiliate.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <SafeIcon icon={copiedStates[affiliate.id] ? FiCheck : FiCopy} className="text-sm" />
              {copiedStates[affiliate.id] ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Share via:</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => shareLink('whatsapp', affiliate)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiPhone} className="text-white text-sm" />
              </div>
              <span className="font-medium text-gray-700">WhatsApp</span>
            </button>

            <button
              onClick={() => shareLink('email', affiliate)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiMail} className="text-white text-sm" />
              </div>
              <span className="font-medium text-gray-700">Email</span>
            </button>

            <button
              onClick={() => shareLink('sms', affiliate)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiPhone} className="text-white text-sm" />
              </div>
              <span className="font-medium text-gray-700">SMS</span>
            </button>

            <button
              onClick={() => shareLink('facebook', affiliate)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiShare2} className="text-white text-sm" />
              </div>
              <span className="font-medium text-gray-700">Facebook</span>
            </button>

            <button
              onClick={() => shareLink('twitter', affiliate)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiShare2} className="text-white text-sm" />
              </div>
              <span className="font-medium text-gray-700">Twitter</span>
            </button>

            <button
              onClick={() => shareLink('linkedin', affiliate)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="text-white text-sm" />
              </div>
              <span className="font-medium text-gray-700">LinkedIn</span>
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <SafeIcon icon={FiTrendingUp} className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-800">Contact Information</span>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiMail} />
              <span>{affiliate.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiPhone} />
              <span>{affiliate.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiCalendar} />
              <span>Joined {new Date(affiliate.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Affiliate Directory
                </h1>
                <p className="text-gray-600">
                  Manage affiliates and track their payment performance
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search affiliates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="revenue">Sort by Revenue</option>
                  <option value="referrals">Sort by Referrals</option>
                  <option value="payments">Sort by Payments</option>
                  <option value="conversionRate">Sort by Conversion Rate</option>
                  <option value="name">Sort by Name</option>
                </select>

                {/* Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Affiliates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAffiliates.map((affiliate, index) => (
              <motion.div
                key={affiliate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {affiliate.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{affiliate.name}</h3>
                      <p className="text-sm text-gray-600">{affiliate.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(affiliate.status)}`}>
                    {affiliate.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{affiliate.referrals}</div>
                    <div className="text-xs text-gray-600">Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{affiliate.conversionRate}%</div>
                    <div className="text-xs text-gray-600">Conv. Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">${affiliate.revenue}</div>
                    <div className="text-xs text-gray-600">Revenue</div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <SafeIcon icon={FiCreditCard} className="text-green-600" />
                      <span className="text-green-700 font-semibold">${affiliate.totalPayments} paid</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SafeIcon icon={FiDollarSign} className="text-yellow-600" />
                      <span className="text-yellow-700 font-semibold">${affiliate.pendingPayments} pending</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 text-center">
                    Avg: ${affiliate.avgPaymentPerReferral}/referral
                  </div>
                </div>

                {/* Link Preview */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="truncate">/{affiliate.id}</span>
                    <button
                      onClick={() => copyToClipboard(generateAffiliateLink(affiliate), affiliate.id)}
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      <SafeIcon icon={copiedStates[affiliate.id] ? FiCheck : FiCopy} />
                      {copiedStates[affiliate.id] ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedAffiliate(affiliate)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <SafeIcon icon={FiShare2} className="text-sm" />
                    Share Link
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${affiliate.email}`, '_blank')}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <SafeIcon icon={FiMail} className="text-gray-600" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredAffiliates.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiUsers} className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Affiliates Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {selectedAffiliate && (
          <ShareModal
            affiliate={selectedAffiliate}
            onClose={() => setSelectedAffiliate(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AffiliateList;