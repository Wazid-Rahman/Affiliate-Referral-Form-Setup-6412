import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import questConfig from '../../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGraduationCap, FiTarget, FiTrendingUp, FiUsers, FiStar, FiCheckCircle } = FiIcons;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const getAnswers = () => {
    console.log('Onboarding completed with answers:', answers);
    // Navigate to main app after completion
    navigate('/analytics');
  };

  if (!userId || !token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Onboarding Visual */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-28 h-28 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-40 right-40 w-12 h-12 bg-white rounded-full"></div>
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
              Let's Get You
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Started!
              </span>
            </h2>
            
            <p className="text-xl text-green-100 mb-12 leading-relaxed">
              We're setting up your personalized experience. This will only take a few moments to customize your dashboard and preferences.
            </p>
            
            {/* Onboarding Steps Preview */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTarget} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Set Your Goals</h3>
                  <p className="text-green-200">Define your referral and revenue targets</p>
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
                  <h3 className="font-semibold text-lg">Choose Preferences</h3>
                  <p className="text-green-200">Customize your dashboard and notifications</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiStar} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Get Started</h3>
                  <p className="text-green-200">Access your personalized referral hub</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Onboarding Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiGraduationCap} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">EduRefer</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-600">Let's set up your account</p>
          </div>

          {/* Quest Onboarding Component */}
          <div className="bg-gray-50 rounded-2xl p-6" style={{ minHeight: '400px' }}>
            <OnBoarding
              userId={userId}
              token={token}
              questId={questConfig.QUEST_ONBOARDING_QUESTID}
              answer={answers}
              setAnswer={setAnswers}
              getAnswers={getAnswers}
              accent={questConfig.PRIMARY_COLOR}
              singleChoose="modal1"
              multiChoice="modal2"
            >
              <OnBoarding.Header />
              <OnBoarding.Content />
              <OnBoarding.Footer />
            </OnBoarding>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <SafeIcon icon={FiCheckCircle} className="text-green-500" />
              <span className="text-sm text-gray-600">Setting up your personalized experience</span>
            </div>
            <p className="text-xs text-gray-500">
              This helps us customize your dashboard and recommendations
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;