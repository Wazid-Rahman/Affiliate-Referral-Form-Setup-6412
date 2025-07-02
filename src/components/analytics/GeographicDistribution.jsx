import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMapPin, FiGlobe, FiTrendingUp } = FiIcons;

const GeographicDistribution = () => {
  const [viewMode, setViewMode] = useState('states');

  const stateData = [
    { name: 'California', referrals: 234, percentage: 18.8, growth: '+12%' },
    { name: 'Texas', referrals: 189, percentage: 15.2, growth: '+8%' },
    { name: 'New York', referrals: 156, percentage: 12.5, growth: '+15%' },
    { name: 'Florida', referrals: 143, percentage: 11.5, growth: '+6%' },
    { name: 'Illinois', referrals: 98, percentage: 7.9, growth: '+9%' },
    { name: 'Pennsylvania', referrals: 87, percentage: 7.0, growth: '+4%' },
    { name: 'Ohio', referrals: 76, percentage: 6.1, growth: '+7%' },
    { name: 'Georgia', referrals: 65, percentage: 5.2, growth: '+11%' }
  ];

  const cityData = [
    { name: 'Los Angeles', referrals: 89, percentage: 7.1, growth: '+14%' },
    { name: 'New York City', referrals: 78, percentage: 6.3, growth: '+9%' },
    { name: 'Chicago', referrals: 67, percentage: 5.4, growth: '+12%' },
    { name: 'Houston', referrals: 56, percentage: 4.5, growth: '+8%' },
    { name: 'Phoenix', referrals: 45, percentage: 3.6, growth: '+15%' },
    { name: 'Philadelphia', referrals: 43, percentage: 3.4, growth: '+6%' },
    { name: 'San Antonio', referrals: 38, percentage: 3.0, growth: '+10%' },
    { name: 'San Diego', referrals: 34, percentage: 2.7, growth: '+13%' }
  ];

  const currentData = viewMode === 'states' ? stateData : cityData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Geographic Distribution</h3>
          <p className="text-gray-600 text-sm">Referrals by location</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('states')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              viewMode === 'states' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            States
          </button>
          <button
            onClick={() => setViewMode('cities')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              viewMode === 'cities' 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cities
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {currentData.map((location, index) => (
          <motion.div
            key={location.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiMapPin} className="text-blue-600 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{location.name}</p>
                <p className="text-sm text-gray-600">{location.percentage}% of total</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-gray-800">
                  {location.referrals}
                </span>
                <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                  <SafeIcon icon={FiTrendingUp} className="text-xs" />
                  {location.growth}
                </span>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${location.percentage * 5}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-gray-800">
              {viewMode === 'states' ? '50' : '150+'}
            </div>
            <p className="text-sm text-gray-600">
              {viewMode === 'states' ? 'States Covered' : 'Cities Reached'}
            </p>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">92%</div>
            <p className="text-sm text-gray-600">Coverage Rate</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GeographicDistribution;