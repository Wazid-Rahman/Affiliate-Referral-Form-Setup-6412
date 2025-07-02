import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEye, FiMousePointer, FiUserPlus, FiCreditCard, FiTrendingDown } = FiIcons;

const ConversionFunnel = () => {
  const funnelData = [
    {
      stage: 'Link Views',
      count: 5420,
      percentage: 100,
      icon: FiEye,
      color: 'blue'
    },
    {
      stage: 'Page Visits',
      count: 3890,
      percentage: 71.8,
      icon: FiMousePointer,
      color: 'indigo'
    },
    {
      stage: 'Form Started',
      count: 2156,
      percentage: 39.8,
      icon: FiUserPlus,
      color: 'purple'
    },
    {
      stage: 'Form Completed',
      count: 1247,
      percentage: 23.0,
      icon: FiCreditCard,
      color: 'green'
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
          <h3 className="text-lg font-semibold text-gray-800">Conversion Funnel</h3>
          <p className="text-gray-600 text-sm">Track user journey from link to conversion</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <SafeIcon icon={FiTrendingDown} className="text-gray-500" />
          <span className="text-gray-600">Drop-off Analysis</span>
        </div>
      </div>

      <div className="space-y-4">
        {funnelData.map((stage, index) => (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-${stage.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <SafeIcon icon={stage.icon} className={`text-${stage.color}-600`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{stage.stage}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {stage.percentage.toFixed(1)}%
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {stage.count.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-3 bg-gradient-to-r from-${stage.color}-400 to-${stage.color}-600 rounded-full`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Drop-off indicator */}
            {index < funnelData.length - 1 && (
              <div className="ml-6 mt-2 flex items-center gap-2 text-xs text-red-500">
                <SafeIcon icon={FiTrendingDown} />
                <span>
                  -{(funnelData[index].percentage - funnelData[index + 1].percentage).toFixed(1)}% drop-off
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">23.0%</div>
          <p className="text-sm text-gray-600">Overall Conversion</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">3.4x</div>
          <p className="text-sm text-gray-600">Improvement Potential</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversionFunnel;