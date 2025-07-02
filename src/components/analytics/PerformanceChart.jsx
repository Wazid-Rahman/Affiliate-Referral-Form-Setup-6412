import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp, FiTrendingDown } = FiIcons;

const PerformanceChart = ({ dateRange }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data generation
  useEffect(() => {
    const generateData = () => {
      const days = parseInt(dateRange);
      const data = [];
      
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          referrals: Math.floor(Math.random() * 50) + 20,
          conversions: Math.floor(Math.random() * 15) + 5,
          revenue: Math.floor(Math.random() * 2000) + 500
        });
      }
      
      setChartData(data);
      setLoading(false);
    };

    generateData();
  }, [dateRange]);

  const maxReferrals = Math.max(...chartData.map(d => d.referrals));
  const maxConversions = Math.max(...chartData.map(d => d.conversions));

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
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
          <h3 className="text-lg font-semibold text-gray-800">Performance Overview</h3>
          <p className="text-gray-600 text-sm">Referrals and conversions over time</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Referrals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Conversions</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 800 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="50"
              y1={40 + i * 32}
              x2="750"
              y2={40 + i * 32}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Referrals line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points={chartData.map((d, i) => 
              `${50 + (i * (700 / (chartData.length - 1)))},${180 - (d.referrals / maxReferrals) * 140}`
            ).join(' ')}
          />

          {/* Conversions line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            points={chartData.map((d, i) => 
              `${50 + (i * (700 / (chartData.length - 1)))},${180 - (d.conversions / maxConversions) * 140}`
            ).join(' ')}
          />

          {/* Data points */}
          {chartData.map((d, i) => (
            <g key={i}>
              <circle
                cx={50 + (i * (700 / (chartData.length - 1)))}
                cy={180 - (d.referrals / maxReferrals) * 140}
                r="4"
                fill="#3b82f6"
              />
              <circle
                cx={50 + (i * (700 / (chartData.length - 1)))}
                cy={180 - (d.conversions / maxConversions) * 140}
                r="4"
                fill="#10b981"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {chartData.map((d, i) => (
            i % Math.ceil(chartData.length / 6) === 0 && (
              <text
                key={i}
                x={50 + (i * (700 / (chartData.length - 1)))}
                y="195"
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {d.date}
              </text>
            )
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <SafeIcon icon={FiTrendingUp} className="text-green-500 text-sm" />
            <span className="text-sm font-semibold text-green-500">+12.3%</span>
          </div>
          <p className="text-xs text-gray-600">vs last period</p>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">
            {chartData.reduce((sum, d) => sum + d.referrals, 0)}
          </div>
          <p className="text-xs text-gray-600">Total Referrals</p>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">
            {chartData.reduce((sum, d) => sum + d.conversions, 0)}
          </div>
          <p className="text-xs text-gray-600">Total Conversions</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceChart;