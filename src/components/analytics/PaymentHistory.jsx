import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDollarSign, FiCheck, FiClock, FiAlertCircle, FiCalendar, FiUser, FiFilter, FiDownload } = FiIcons;

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock payment history data
    const mockPayments = [
      {
        id: 'pay_001',
        affiliateId: 'sarah_j_001',
        affiliateName: 'Sarah Johnson',
        studentName: 'Emily Chen',
        program: 'SAT Prep',
        amount: 75.00,
        status: 'paid',
        referralDate: '2024-03-15',
        paymentDate: '2024-03-20',
        transactionId: 'TXN_2024_001'
      },
      {
        id: 'pay_002',
        affiliateId: 'michael_c_002',
        affiliateName: 'Michael Chen',
        studentName: 'David Rodriguez',
        program: 'ACT Prep',
        amount: 65.00,
        status: 'paid',
        referralDate: '2024-03-14',
        paymentDate: '2024-03-19',
        transactionId: 'TXN_2024_002'
      },
      {
        id: 'pay_003',
        affiliateId: 'emily_r_003',
        affiliateName: 'Emily Rodriguez',
        studentName: 'Alex Thompson',
        program: 'AP Math',
        amount: 55.00,
        status: 'pending',
        referralDate: '2024-03-18',
        paymentDate: null,
        transactionId: null
      },
      {
        id: 'pay_004',
        affiliateId: 'sarah_j_001',
        affiliateName: 'Sarah Johnson',
        studentName: 'Jessica Wang',
        program: 'College Essay',
        amount: 45.00,
        status: 'processing',
        referralDate: '2024-03-16',
        paymentDate: null,
        transactionId: null
      },
      {
        id: 'pay_005',
        affiliateId: 'david_k_004',
        affiliateName: 'David Kim',
        studentName: 'Maria Garcia',
        program: 'SAT Prep',
        amount: 75.00,
        status: 'paid',
        referralDate: '2024-03-12',
        paymentDate: '2024-03-17',
        transactionId: 'TXN_2024_003'
      },
      {
        id: 'pay_006',
        affiliateId: 'lisa_t_005',
        affiliateName: 'Lisa Thompson',
        studentName: 'James Wilson',
        program: 'ACT Prep',
        amount: 65.00,
        status: 'pending',
        referralDate: '2024-03-19',
        paymentDate: null,
        transactionId: null
      }
    ];

    setTimeout(() => {
      setPayments(mockPayments);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return FiCheck;
      case 'pending': return FiClock;
      case 'processing': return FiAlertCircle;
      case 'failed': return FiAlertCircle;
      default: return FiClock;
    }
  };

  const filteredPayments = payments.filter(payment => 
    filter === 'all' || payment.status === filter
  );

  const exportPayments = () => {
    const csvData = [
      ['Payment ID', 'Affiliate', 'Student', 'Program', 'Amount', 'Status', 'Referral Date', 'Payment Date'],
      ...filteredPayments.map(payment => [
        payment.id,
        payment.affiliateName,
        payment.studentName,
        payment.program,
        `$${payment.amount}`,
        payment.status,
        payment.referralDate,
        payment.paymentDate || 'N/A'
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payment-history-${Date.now()}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
          <p className="text-gray-600 text-sm">Recent referral payments and transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
          </select>
          <button
            onClick={exportPayments}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <SafeIcon icon={FiDownload} className="text-sm" />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredPayments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiDollarSign} className="text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">{payment.affiliateName}</span>
                    <SafeIcon icon={FiUser} className="text-gray-400 text-sm" />
                    <span className="text-gray-600">{payment.studentName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{payment.program}</span>
                    <span className="flex items-center gap-1">
                      <SafeIcon icon={FiCalendar} className="text-xs" />
                      {payment.referralDate}
                    </span>
                    {payment.transactionId && (
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {payment.transactionId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    ${payment.amount.toFixed(2)}
                  </div>
                  {payment.paymentDate && (
                    <div className="text-xs text-gray-500">
                      Paid: {payment.paymentDate}
                    </div>
                  )}
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                  <SafeIcon icon={getStatusIcon(payment.status)} className="mr-1 text-xs" />
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiDollarSign} className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Payments Found</h3>
          <p className="text-gray-600">No payments match the selected filter criteria.</p>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">
              ${filteredPayments
                .filter(p => p.status === 'paid')
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">Total Paid</p>
          </div>
          <div>
            <div className="text-xl font-bold text-yellow-600">
              ${filteredPayments
                .filter(p => p.status === 'pending')
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">
              {filteredPayments.length}
            </div>
            <p className="text-sm text-gray-600">Total Transactions</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentHistory;