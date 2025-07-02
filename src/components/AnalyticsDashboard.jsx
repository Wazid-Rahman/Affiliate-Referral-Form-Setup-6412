import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PerformanceChart from './analytics/PerformanceChart';
import ReferralStats from './analytics/ReferralStats';
import ConversionFunnel from './analytics/ConversionFunnel';
import GeographicDistribution from './analytics/GeographicDistribution';
import RevenueAnalytics from './analytics/RevenueAnalytics';
import PaymentAnalytics from './analytics/PaymentAnalytics';
import PaymentHistory from './analytics/PaymentHistory';
import TopPerformers from './analytics/TopPerformers';

const { FiBarChart3, FiTrendingUp, FiUsers, FiDollarSign, FiCalendar, FiFilter, FiDownload, FiRefreshCw, FiCreditCard } = FiIcons;

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('30');
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - replace with real API calls
  const [analyticsData, setAnalyticsData] = useState({
    totalReferrals: 1247,
    activeAffiliates: 89,
    conversionRate: 23.5,
    totalRevenue: 45680,
    totalPaymentsPaid: 18720,
    pendingPayments: 4560,
    averagePaymentPerReferral: 58.50,
    growthRate: 12.3,
    topPrograms: [
      { name: 'SAT Prep', referrals: 456, revenue: 18240, avgPayment: 75 },
      { name: 'ACT Prep', referrals: 321, revenue: 12840, avgPayment: 65 },
      { name: 'AP Subjects', referrals: 289, revenue: 11560, avgPayment: 55 },
      { name: 'College Essay', referrals: 181, revenue: 7240, avgPayment: 45 }
    ]
  });

  const metrics = [
    { id: 'all', label: 'All Metrics', icon: FiBarChart3 },
    { id: 'referrals', label: 'Referrals', icon: FiUsers },
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign },
    { id: 'payments', label: 'Payments', icon: FiCreditCard },
    { id: 'conversion', label: 'Conversion', icon: FiTrendingUp }
  ];

  const dateRanges = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExport = () => {
    // Generate CSV export
    const csvData = [
      ['Metric', 'Value'],
      ['Total Referrals', analyticsData.totalReferrals],
      ['Active Affiliates', analyticsData.activeAffiliates],
      ['Conversion Rate', `${analyticsData.conversionRate}%`],
      ['Total Revenue', `$${analyticsData.totalRevenue}`],
      ['Total Payments Paid', `$${analyticsData.totalPaymentsPaid}`],
      ['Pending Payments', `$${analyticsData.pendingPayments}`],
      ['Average Payment per Referral', `$${analyticsData.averagePaymentPerReferral}`],
      ['Growth Rate', `${analyticsData.growthRate}%`]
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${Date.now()}.csv`;
    link.click();
  };

  return (
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
                Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Comprehensive insights into your affiliate program performance and payments
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Date Range Selector */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              {/* Metric Filter */}
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {metrics.map(metric => (
                  <option key={metric.id} value={metric.id}>
                    {metric.label}
                  </option>
                ))}
              </select>

              {/* Action Buttons */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <SafeIcon icon={FiRefreshCw} className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <SafeIcon icon={FiDownload} className="text-sm" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="text-blue-600 text-xl" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +{analyticsData.growthRate}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {analyticsData.totalReferrals.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm">Total Referrals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiTrendingUp} className="text-green-600 text-xl" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +2.1%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {analyticsData.activeAffiliates}
            </h3>
            <p className="text-gray-600 text-sm">Active Affiliates</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBarChart3} className="text-purple-600 text-xl" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +5.3%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {analyticsData.conversionRate}%
            </h3>
            <p className="text-gray-600 text-sm">Conversion Rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiCreditCard} className="text-green-600 text-xl" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +15.2%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              ${analyticsData.totalPaymentsPaid.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm">Total Payments</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiDollarSign} className="text-yellow-600 text-xl" />
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +8.7%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              ${analyticsData.averagePaymentPerReferral.toFixed(2)}
            </h3>
            <p className="text-gray-600 text-sm">Avg per Referral</p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PerformanceChart dateRange={dateRange} />
          <ReferralStats dateRange={dateRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PaymentAnalytics dateRange={dateRange} />
          <RevenueAnalytics dateRange={dateRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ConversionFunnel />
          </div>
          <TopPerformers data={analyticsData.topPrograms} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GeographicDistribution />
          <PaymentHistory />
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;