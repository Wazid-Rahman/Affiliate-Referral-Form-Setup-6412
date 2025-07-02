import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../../context/AuthContext';
import questConfig from '../../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGraduationCap, FiUsers, FiTrendingUp, FiAward } = FiIcons;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (userData) => {
    const isNewUser = login(userData);
    
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/analytics');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiGraduationCap} className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold">EduRefer</h1>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Welcome Back to Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Success Journey
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Continue building your academic excellence network and track your referral success with powerful analytics and insights.
            </p>
            
            {/* Feature Highlights */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTrendingUp} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Real-time Analytics</h3>
                  <p className="text-blue-200">Track performance and optimize your referral strategy</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiUsers} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Affiliate Network</h3>
                  <p className="text-blue-200">Manage and grow your referral community</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiAward} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Reward System</h3>
                  <p className="text-blue-200">Earn and track rewards for successful referrals</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiGraduationCap} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">EduRefer</h1>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Quest Login Component */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <QuestLogin
              onSubmit={handleLogin}
              email={true}
              google={false}
              accent={questConfig.PRIMARY_COLOR}
            />
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              New to EduRefer?{' '}
              <span className="text-blue-600 font-medium">
                Create an account to get started
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;