import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiAward, FiTrendingUp, FiUsers, FiDollarSign, FiShare2, FiCopy, FiCheck, FiMail, FiPhone, FiExternalLink, FiX, FiCreditCard } = FiIcons;

const TopPerformers = ({ data }) => {
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});

  const topPerformers = [
    {
      id: 'sarah_j_001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      referrals: 89,
      conversions: 23,
      revenue: 4560,
      totalPayments: 1725, // $75 per conversion average
      pendingPayments: 225, // 3 pending payments
      conversionRate: 25.8,
      avgPaymentPerReferral: 75,
      rank: 1,
      badge: 'gold',
      joinDate: '2024-01-15'
    },
    {
      id: 'michael_c_002',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      referrals: 76,
      conversions: 19,
      revenue: 3980,
      totalPayments: 1235,
      pendingPayments: 130,
      conversionRate: 25.0,
      avgPaymentPerReferral: 65,
      rank: 2,
      badge: 'silver',
      joinDate: '2024-02-03'
    },
    {
      id: 'emily_r_003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      referrals: 68,
      conversions: 16,
      revenue: 3240,
      totalPayments: 880,
      pendingPayments: 165,
      conversionRate: 23.5,
      avgPaymentPerReferral: 55,
      rank: 3,
      badge: 'bronze',
      joinDate: '2024-01-28'
    },
    {
      id: 'david_k_004',
      name: 'David Kim',
      email: 'david.kim@email.com',
      referrals: 54,
      conversions: 12,
      revenue: 2880,
      totalPayments: 600,
      pendingPayments: 150,
      conversionRate: 22.2,
      avgPaymentPerReferral: 50,
      rank: 4,
      badge: 'none',
      joinDate: '2024-02-10'
    },
    {
      id: 'lisa_t_005',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      referrals: 47,
      conversions: 11,
      revenue: 2340,
      totalPayments: 495,
      pendingPayments: 90,
      conversionRate: 23.4,
      avgPaymentPerReferral: 45,
      rank: 5,
      badge: 'none',
      joinDate: '2024-02-15'
    }
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'text-yellow-500';
      case 'silver': return 'text-gray-400';
      case 'bronze': return 'text-amber-600';
      default: return 'text-gray-300';
    }
  };

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
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              affiliate.rank === 1 ? 'bg-yellow-500 text-white' :
              affiliate.rank === 2 ? 'bg-gray-400 text-white' :
              affiliate.rank === 3 ? 'bg-amber-600 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {affiliate.rank}
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

        {/* Payment Details */}
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
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Top Performers</h3>
            <p className="text-gray-600 text-sm">Leading affiliates with payment details</p>
          </div>
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiAward} className="text-yellow-600" />
          </div>
        </div>

        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <motion.div
              key={performer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                performer.rank <= 3 ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    performer.rank === 1 ? 'bg-yellow-500 text-white' :
                    performer.rank === 2 ? 'bg-gray-400 text-white' :
                    performer.rank === 3 ? 'bg-amber-600 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {performer.rank}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{performer.name}</h4>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <SafeIcon icon={FiUsers} />
                        {performer.referrals} referrals
                      </span>
                      <span className="flex items-center gap-1">
                        <SafeIcon icon={FiTrendingUp} />
                        {performer.conversionRate}%
                      </span>
                      <span className="flex items-center gap-1">
                        <SafeIcon icon={FiDollarSign} />
                        ${performer.avgPaymentPerReferral}/ref
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <SafeIcon icon={FiAward} className={getBadgeColor(performer.badge)} />
                      <span className="text-lg font-bold text-gray-800">
                        ${performer.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 flex gap-3">
                      <span className="text-green-600">Paid: ${performer.totalPayments}</span>
                      <span className="text-yellow-600">Pending: ${performer.pendingPayments}</span>
                    </div>
                  </div>
                  {/* Share Button */}
                  <button
                    onClick={() => setSelectedAffiliate(performer)}
                    className="ml-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                    title={`Share ${performer.name}'s referral link`}
                  >
                    <SafeIcon icon={FiShare2} className="text-blue-600 text-sm" />
                  </button>
                </div>
              </div>

              {/* Payment Performance Bar */}
              <div className="relative mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(performer.totalPayments / (performer.totalPayments + performer.pendingPayments)) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Payment Rate: {((performer.totalPayments / (performer.totalPayments + performer.pendingPayments)) * 100).toFixed(1)}%
                </div>
              </div>

              {/* Quick Link Preview */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Referral Link: /{performer.id}</span>
                  <button
                    onClick={() => copyToClipboard(generateAffiliateLink(performer), performer.id)}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    <SafeIcon icon={copiedStates[performer.id] ? FiCheck : FiCopy} />
                    {copiedStates[performer.id] ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-gray-800">
                {topPerformers.reduce((sum, p) => sum + p.referrals, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Referrals</p>
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">
                ${topPerformers.reduce((sum, p) => sum + p.totalPayments, 0).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Total Paid</p>
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-600">
                ${topPerformers.reduce((sum, p) => sum + p.pendingPayments, 0).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Pending Payments</p>
            </div>
          </div>
        </div>
      </motion.div>

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

export default TopPerformers;