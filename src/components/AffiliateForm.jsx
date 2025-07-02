import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiMail, FiPhone, FiMapPin, FiGraduationCap, FiShare2, FiCopy, FiCheck, FiExternalLink, FiUsers } = FiIcons;

const AffiliateForm = () => {
  const { affiliateId } = useParams();
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    studentName: '',
    studentGrade: '',
    studentEmail: '',
    studentPhone: '',
    schoolName: '',
    districtName: '',
    city: '',
    state: '',
    referredBy: affiliateId || '',
    program: ''
  });

  const [shareableLink, setShareableLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const programs = [
    'SAT Prep',
    'PSAT Prep',
    'ACT Prep',
    'AP Subjects',
    'College Essay Writing',
    'Other'
  ];

  const grades = [
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade',
    'Other'
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  useEffect(() => {
    // Generate shareable link based on form data
    const affiliateCode = formData.parentEmail ? 
      btoa(formData.parentEmail).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8) : 
      'new';
    setShareableLink(`${window.location.origin}/#/ref/${affiliateCode}`);
  }, [formData.parentEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareLink = async (platform) => {
    const text = `Join our Academic Excellence Program! Use my referral link to get started: ${shareableLink}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Join Academic Excellence Program&body=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      default:
        copyToClipboard();
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiCheck} className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for joining our Academic Excellence Program. We'll contact you soon with next steps!</p>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <SafeIcon icon={FiUsers} className="text-blue-600" />
              <h3 className="font-semibold text-gray-800">Start Earning Referral Rewards!</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Share your personalized link and earn rewards for every successful referral.</p>
            
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <SafeIcon icon={copied ? FiCheck : FiCopy} className="text-sm" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => shareLink('whatsapp')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
              >
                WhatsApp
              </button>
              <button
                onClick={() => shareLink('email')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                Email
              </button>
              <button
                onClick={() => shareLink('sms')}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors"
              >
                SMS
              </button>
              <button
                onClick={() => shareLink('facebook')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                Facebook
              </button>
            </div>
          </div>
          
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Submit Another Registration
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Academic Excellence Program
          </h1>
          <p className="text-gray-600">
            Join our comprehensive test prep and academic support programs
          </p>
          {affiliateId && (
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <SafeIcon icon={FiUser} className="text-sm" />
              <span className="text-sm font-medium">Referred by: {affiliateId}</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Parent Information */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <SafeIcon icon={FiUser} className="text-blue-600" />
                    Parent Information
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter parent's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Email *
                  </label>
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="parent@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Student Information */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <SafeIcon icon={FiGraduationCap} className="text-green-600" />
                    Student Information
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter student's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade *
                  </label>
                  <select
                    name="studentGrade"
                    value={formData.studentGrade}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select grade</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Email
                  </label>
                  <input
                    type="email"
                    name="studentEmail"
                    value={formData.studentEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="student@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Phone Number
                  </label>
                  <input
                    type="tel"
                    name="studentPhone"
                    value={formData.studentPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* School Information */}
            <div className="mt-8 space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <SafeIcon icon={FiMapPin} className="text-purple-600" />
                  School & Location Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter school name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District Name *
                  </label>
                  <input
                    type="text"
                    name="districtName"
                    value={formData.districtName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter district name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select state</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Program Information */}
            <div className="mt-8 space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <SafeIcon icon={FiGraduationCap} className="text-orange-600" />
                  Program Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Who Referred You?
                  </label>
                  <input
                    type="text"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Referrer name or ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program You Want to Join *
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select program</option>
                    {programs.map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>

        {/* Enhanced Shareable Link Section */}
        {formData.parentEmail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <SafeIcon icon={FiShare2} className="text-xl" />
                <h3 className="text-xl font-bold">Your Personal Referral Link</h3>
              </div>
              <p className="text-blue-100">
                Share this link and earn rewards for every successful referral!
              </p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
                >
                  <SafeIcon icon={copied ? FiCheck : FiCopy} />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <SafeIcon icon={FiExternalLink} className="text-blue-600" />
                  Share Your Link
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <button
                    onClick={() => shareLink('whatsapp')}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiPhone} className="text-white text-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                  </button>

                  <button
                    onClick={() => shareLink('email')}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiMail} className="text-white text-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Email</span>
                  </button>

                  <button
                    onClick={() => shareLink('sms')}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiPhone} className="text-white text-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">SMS</span>
                  </button>

                  <button
                    onClick={() => shareLink('facebook')}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiShare2} className="text-white text-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                  </button>

                  <button
                    onClick={() => shareLink('twitter')}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiShare2} className="text-white text-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Twitter</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h5 className="font-semibold text-gray-800 mb-2">💰 Referral Rewards Program</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Earn rewards for every successful referral</li>
                  <li>• Track your referrals and earnings in real-time</li>
                  <li>• Get bonus rewards for multiple referrals</li>
                  <li>• Withdraw earnings or use them for program discounts</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AffiliateForm;