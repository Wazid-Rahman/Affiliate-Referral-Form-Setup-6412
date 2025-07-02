import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDollarSign, FiTrendingUp, FiCreditCard, FiClock, FiCheck, FiAlertCircle, FiCalendar } = FiIcons;

const PaymentAnalytics = ({ dateRange }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalPaid: 0,
    pendingPayments: 0,
    averagePayment: 0,
    paymentGrowth: 0,
    totalReferrals: 0
  });

  useEffect(() => {
    // Generate mock payment data
    const days = parseInt(dateRange);
    const data = [];
    let totalPaid = 0;
    let pendingPayments = 0;

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const paidAmount = Math.floor(Math.random() * 5000) + 1000;
      const pendingAmount = Math.floor(Math.random() * 2000) + 500;
      
      totalPaid += paidAmount;
      pendingPayments += pendingAmount;

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        paid: paidAmount,
        pending: pendingAmount,
        referrals: Math.floor((paidAmount + pendingAmount) / 50) // Assuming $50 average per referral
      });
    }

    setPaymentData(data);
    setMetrics({
      totalPaid,
      pendingPayments,
      averagePayment: totalPaid / data.reduce((sum, d) => sum + d.referrals, 0),
      paymentGrowth: Math.random() * 20 + 5,
      totalReferrals: data.reduce((sum, d) => sum + d.referrals, 0)
    });
  }, [dateRange]);

  const maxAmount = Math.max(...paymentData.map(d => Math.max(d.paid, d.pending)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Payment Analytics</h3>
          <p className="text-gray-600 text-sm">Referral payments breakdown</p>
        </div>
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <SafeIcon icon={FiDollarSign} className="text-green-600" />
        </div>
      </div>

      {/* Payment Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <SafeIcon icon={FiCheck} className="text-green-600 text-sm" />
            <span className="text-sm font-medium text-green-800">Total Paid</span>
          </div>
          <div className="text-xl font-bold text-green-900">
            ${metrics.totalPaid.toLocaleString()}
          </div>
          <div className="text-xs text-green-600">
            +{metrics.paymentGrowth.toFixed(1)}% vs last period
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <SafeIcon icon={FiClock} className="text-yellow-600 text-sm" />
            <span className="text-sm font-medium text-yellow-800">Pending</span>
          </div>
          <div className="text-xl font-bold text-yellow-900">
            ${metrics.pendingPayments.toLocaleString()}
          </div>
          <div className="text-xs text-yellow-600">
            {Math.floor(metrics.pendingPayments / metrics.averagePayment)} referrals
          </div>
        </div>
      </div>

      {/* Payment Chart */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Daily Payments</span>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Paid</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-32">
          <svg className="w-full h-full" viewBox="0 0 400 100">
            {/* Paid amounts */}
            {paymentData.slice(-14).map((d, i) => (
              <motion.rect
                key={`paid-${i}`}
                x={i * 28 + 5}
                y={100 - (d.paid / maxAmount) * 80}
                width="10"
                height={(d.paid / maxAmount) * 80}
                fill="#10b981"
                initial={{ height: 0, y: 100 }}
                animate={{ 
                  height: (d.paid / maxAmount) * 80, 
                  y: 100 - (d.paid / maxAmount) * 80 
                }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            ))}
            
            {/* Pending amounts */}
            {paymentData.slice(-14).map((d, i) => (
              <motion.rect
                key={`pending-${i}`}
                x={i * 28 + 17}
                y={100 - (d.pending / maxAmount) * 80}
                width="10"
                height={(d.pending / maxAmount) * 80}
                fill="#f59e0b"
                initial={{ height: 0, y: 100 }}
                animate={{ 
                  height: (d.pending / maxAmount) * 80, 
                  y: 100 - (d.pending / maxAmount) * 80 
                }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Payment Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 text-sm">Payment Breakdown by Program</h4>
        {[
          { name: 'SAT Prep Programs', amount: metrics.totalPaid * 0.4, percentage: 40, color: 'green' },
          { name: 'ACT Prep Programs', amount: metrics.totalPaid * 0.28, percentage: 28, color: 'blue' },
          { name: 'AP Subject Tutoring', amount: metrics.totalPaid * 0.20, percentage: 20, color: 'purple' },
          { name: 'College Essay Help', amount: metrics.totalPaid * 0.12, percentage: 12, color: 'yellow' }
        ].map((program, index) => (
          <motion.div
            key={program.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 bg-${program.color}-500 rounded-full`}></div>
              <span className="text-sm text-gray-700">{program.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                ${program.amount.toFixed(0)}
              </span>
              <span className="text-xs text-gray-500">
                {program.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Average Payment per Referral */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <div className="text-2xl font-bold text-gray-800">
          ${metrics.averagePayment.toFixed(2)}
        </div>
        <p className="text-sm text-gray-600">Average Payment per Referral</p>
      </div>
    </motion.div>
  );
};

export default PaymentAnalytics;