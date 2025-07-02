import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDollarSign, FiTrendingUp, FiTrendingDown, FiCreditCard } = FiIcons;

const RevenueAnalytics = ({ dateRange }) => {
  const [revenueData, setRevenueData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    averageOrderValue: 0,
    revenueGrowth: 0,
    conversionValue: 0
  });

  useEffect(() => {
    // Generate mock revenue data
    const days = parseInt(dateRange);
    const data = [];
    let totalRevenue = 0;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const revenue = Math.floor(Math.random() * 3000) + 1000;
      totalRevenue += revenue;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue,
        orders: Math.floor(revenue / (Math.random() * 200 + 150)),
        avgOrderValue: Math.floor(Math.random() * 200 + 150)
      });
    }
    
    setRevenueData(data);
    setMetrics({
      totalRevenue,
      averageOrderValue: totalRevenue / data.reduce((sum, d) => sum + d.orders, 0),
      revenueGrowth: Math.random() * 20 + 5,
      conversionValue: totalRevenue / 1247 // assuming 1247 total referrals
    });
  }, [dateRange]);

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Revenue Analytics</h3>
          <p className="text-gray-600 text-sm">Financial performance overview</p>
        </div>
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <SafeIcon icon={FiDollarSign} className="text-green-600" />
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Daily Revenue</span>
          <span className="text-sm font-semibold text-green-600">
            ${Math.max(...revenueData.map(d => d.revenue)).toLocaleString()} peak
          </span>
        </div>
        
        <div className="relative h-32">
          <svg className="w-full h-full" viewBox="0 0 400 100">
            {/* Revenue bars */}
            {revenueData.slice(-14).map((d, i) => (
              <motion.rect
                key={i}
                x={i * 28 + 5}
                y={100 - (d.revenue / maxRevenue) * 80}
                width="20"
                height={(d.revenue / maxRevenue) * 80}
                fill="url(#revenueGradient)"
                initial={{ height: 0, y: 100 }}
                animate={{ 
                  height: (d.revenue / maxRevenue) * 80,
                  y: 100 - (d.revenue / maxRevenue) * 80
                }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            ))}
            
            <defs>
              <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <SafeIcon icon={FiTrendingUp} className="text-green-600 text-sm" />
            <span className="text-sm font-medium text-green-800">Total Revenue</span>
          </div>
          <div className="text-xl font-bold text-green-900">
            ${metrics.totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-green-600">
            +{metrics.revenueGrowth.toFixed(1)}% vs last period
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <SafeIcon icon={FiCreditCard} className="text-blue-600 text-sm" />
            <span className="text-sm font-medium text-blue-800">Avg Order Value</span>
          </div>
          <div className="text-xl font-bold text-blue-900">
            ${metrics.averageOrderValue.toFixed(0)}
          </div>
          <div className="text-xs text-blue-600">
            +3.2% vs last period
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 text-sm">Revenue Sources</h4>
        
        {[
          { name: 'SAT Prep Programs', amount: metrics.totalRevenue * 0.4, percentage: 40 },
          { name: 'ACT Prep Programs', amount: metrics.totalRevenue * 0.28, percentage: 28 },
          { name: 'AP Subject Tutoring', amount: metrics.totalRevenue * 0.20, percentage: 20 },
          { name: 'College Essay Help', amount: metrics.totalRevenue * 0.12, percentage: 12 }
        ].map((source, index) => (
          <motion.div
            key={source.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">{source.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                ${source.amount.toFixed(0)}
              </span>
              <span className="text-xs text-gray-500">
                {source.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conversion Value */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <div className="text-2xl font-bold text-gray-800">
          ${metrics.conversionValue.toFixed(2)}
        </div>
        <p className="text-sm text-gray-600">Average Revenue per Referral</p>
      </div>
    </motion.div>
  );
};

export default RevenueAnalytics;