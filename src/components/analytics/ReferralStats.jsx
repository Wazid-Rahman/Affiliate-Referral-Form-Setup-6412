import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiUserPlus, FiUserCheck, FiTrendingUp } = FiIcons;

const ReferralStats = ({ dateRange }) => {
  const [stats, setStats] = useState({
    newReferrals: 0,
    activeReferrals: 0,
    convertedReferrals: 0,
    totalValue: 0
  });

  useEffect(() => {
    // Mock data based on date range
    const multiplier = parseInt(dateRange) / 30;
    setStats({
      newReferrals: Math.floor(89 * multiplier),
      activeReferrals: Math.floor(156 * multiplier),
      convertedReferrals: Math.floor(67 * multiplier),
      totalValue: Math.floor(12450 * multiplier)
    });
  }, [dateRange]);

  const referralCategories = [
    {
      label: 'New Referrals',
      value: stats.newReferrals,
      icon: FiUserPlus,
      color: 'blue',
      change: '+23%'
    },
    {
      label: 'Active Referrals',
      value: stats.activeReferrals,
      icon: FiUsers,
      color: 'green',
      change: '+12%'
    },
    {
      label: 'Converted',
      value: stats.convertedReferrals,
      icon: FiUserCheck,
      color: 'purple',
      change: '+8%'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Referral Statistics</h3>
          <p className="text-gray-600 text-sm">Breakdown of referral performance</p>
        </div>
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <SafeIcon icon={FiUsers} className="text-blue-600" />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {referralCategories.map((category, index) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={category.icon} className={`text-${category.color}-600`} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{category.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {category.value.toLocaleString()}
                  </span>
                  <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                    <SafeIcon icon={FiTrendingUp} className="text-xs" />
                    {category.change}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conversion Rate Circle */}
      <div className="text-center">
        <div className="relative inline-block">
          <svg width="120" height="120" className="transform -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={`${(stats.convertedReferrals / stats.activeReferrals) * 314} 314`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {Math.round((stats.convertedReferrals / stats.activeReferrals) * 100)}%
              </div>
              <div className="text-xs text-gray-600">Conversion</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Overall conversion rate</p>
      </div>
    </motion.div>
  );
};

export default ReferralStats;