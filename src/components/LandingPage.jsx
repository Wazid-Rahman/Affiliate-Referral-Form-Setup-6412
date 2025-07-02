import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGraduationCap, FiTrendingUp, FiUsers, FiAward, FiCheck, FiEdit3, FiSave, FiX, FiEye, FiSettings, FiArrowRight, FiStar, FiTarget, FiDollarSign } = FiIcons;

const EditableText = ({ text, onSave, className, multiline = false, placeholder = "Click to edit..." }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline) {
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleSave = () => {
    onSave(editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${className} border-2 border-blue-500 rounded-lg p-2 resize-none`}
            rows={3}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${className} border-2 border-blue-500 rounded-lg p-2`}
            placeholder={placeholder}
          />
        )}
        <div className="absolute -top-8 right-0 flex gap-1">
          <button
            onClick={handleSave}
            className="p-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
          >
            <SafeIcon icon={FiSave} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          >
            <SafeIcon icon={FiX} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${className} cursor-pointer hover:bg-blue-50 hover:bg-opacity-50 rounded-lg p-2 -m-2 relative group transition-all`}
      onClick={() => setIsEditing(true)}
    >
      {text || <span className="text-gray-400">{placeholder}</span>}
      <SafeIcon 
        icon={FiEdit3} 
        className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-0.5 shadow-sm" 
      />
    </div>
  );
};

const LandingPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState({
    hero: {
      title: "Transform Your Academic Success",
      subtitle: "Join Our Elite Referral Network",
      description: "Connect with top-tier test prep programs and earn rewards while helping students achieve their academic goals. Our proven system has helped thousands reach their potential.",
      ctaText: "Start Earning Today"
    },
    stats: [
      { number: "10,000+", label: "Students Helped" },
      { number: "500+", label: "Active Affiliates" },
      { number: "$2M+", label: "Rewards Paid" },
      { number: "98%", label: "Success Rate" }
    ],
    features: [
      {
        icon: FiTrendingUp,
        title: "High Conversion Rates",
        description: "Our proven programs convert at industry-leading rates, maximizing your earning potential."
      },
      {
        icon: FiDollarSign,
        title: "Competitive Rewards",
        description: "Earn substantial commissions for every successful referral with our tiered reward system."
      },
      {
        icon: FiUsers,
        title: "Dedicated Support",
        description: "Get personalized support from our team to help you succeed in your referral journey."
      },
      {
        icon: FiTarget,
        title: "Real-Time Tracking",
        description: "Monitor your referrals and earnings with our advanced analytics dashboard."
      }
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Top Affiliate",
        content: "I've earned over $50,000 in my first year. The support team is incredible and the programs really work!",
        rating: 5
      },
      {
        name: "Michael Chen",
        role: "Affiliate Partner",
        content: "The conversion rates are amazing. Students love the programs and my earnings keep growing every month.",
        rating: 5
      },
      {
        name: "Emily Rodriguez",
        role: "Success Coach",
        content: "Not only do I earn great commissions, but I'm genuinely helping students achieve their dreams.",
        rating: 5
      }
    ],
    cta: {
      title: "Ready to Start Your Success Story?",
      description: "Join thousands of successful affiliates earning substantial rewards while making a real difference in students' lives.",
      buttonText: "Join the Program",
      secondaryText: "Learn More"
    }
  });

  const updateContent = (section, field, value, index = null) => {
    setContent(prev => {
      const newContent = { ...prev };
      if (index !== null) {
        newContent[section][index] = { ...newContent[section][index], [field]: value };
      } else if (field) {
        newContent[section][field] = value;
      } else {
        newContent[section] = value;
      }
      return newContent;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Edit Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-4 py-2 rounded-lg font-medium transition-all shadow-lg ${
            isEditMode 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <SafeIcon icon={isEditMode ? FiEye : FiSettings} className="mr-2" />
          {isEditMode ? 'Preview Mode' : 'Edit Mode'}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <SafeIcon icon={FiGraduationCap} className="text-white text-2xl" />
                </div>
              </div>
              
              {isEditMode ? (
                <EditableText
                  text={content.hero.title}
                  onSave={(value) => updateContent('hero', 'title', value)}
                  className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6"
                  placeholder="Enter hero title..."
                />
              ) : (
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                  {content.hero.title}
                </h1>
              )}

              {isEditMode ? (
                <EditableText
                  text={content.hero.subtitle}
                  onSave={(value) => updateContent('hero', 'subtitle', value)}
                  className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold mb-6"
                  placeholder="Enter hero subtitle..."
                />
              ) : (
                <h2 className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold mb-6">
                  {content.hero.subtitle}
                </h2>
              )}

              {isEditMode ? (
                <EditableText
                  text={content.hero.description}
                  onSave={(value) => updateContent('hero', 'description', value)}
                  className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
                  multiline={true}
                  placeholder="Enter hero description..."
                />
              ) : (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                  {content.hero.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  {isEditMode ? (
                    <EditableText
                      text={content.hero.ctaText}
                      onSave={(value) => updateContent('hero', 'ctaText', value)}
                      className="text-white"
                      placeholder="CTA text..."
                    />
                  ) : (
                    <>
                      {content.hero.ctaText}
                      <SafeIcon icon={FiArrowRight} className="ml-2 inline" />
                    </>
                  )}
                </motion.button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {isEditMode ? (
                    <EditableText
                      text={stat.number}
                      onSave={(value) => updateContent('stats', 'number', value, index)}
                      className="text-4xl font-bold text-gray-900"
                      placeholder="Number..."
                    />
                  ) : (
                    stat.number
                  )}
                </div>
                <div className="text-gray-600 font-medium">
                  {isEditMode ? (
                    <EditableText
                      text={stat.label}
                      onSave={(value) => updateContent('stats', 'label', value, index)}
                      className="text-gray-600 font-medium"
                      placeholder="Label..."
                    />
                  ) : (
                    stat.label
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Program?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed as an affiliate partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <SafeIcon icon={feature.icon} className="text-blue-600 text-xl" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {isEditMode ? (
                    <EditableText
                      text={feature.title}
                      onSave={(value) => updateContent('features', 'title', value, index)}
                      className="text-xl font-semibold text-gray-900"
                      placeholder="Feature title..."
                    />
                  ) : (
                    feature.title
                  )}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {isEditMode ? (
                    <EditableText
                      text={feature.description}
                      onSave={(value) => updateContent('features', 'description', value, index)}
                      className="text-gray-600 leading-relaxed"
                      multiline={true}
                      placeholder="Feature description..."
                    />
                  ) : (
                    feature.description
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our top-performing affiliates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  {isEditMode ? (
                    <EditableText
                      text={testimonial.content}
                      onSave={(value) => updateContent('testimonials', 'content', value, index)}
                      className="text-gray-700 leading-relaxed"
                      multiline={true}
                      placeholder="Testimonial content..."
                    />
                  ) : (
                    `"${testimonial.content}"`
                  )}
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {isEditMode ? (
                        <EditableText
                          text={testimonial.name}
                          onSave={(value) => updateContent('testimonials', 'name', value, index)}
                          className="font-semibold text-gray-900"
                          placeholder="Name..."
                        />
                      ) : (
                        testimonial.name
                      )}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {isEditMode ? (
                        <EditableText
                          text={testimonial.role}
                          onSave={(value) => updateContent('testimonials', 'role', value, index)}
                          className="text-gray-600 text-sm"
                          placeholder="Role..."
                        />
                      ) : (
                        testimonial.role
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              {isEditMode ? (
                <EditableText
                  text={content.cta.title}
                  onSave={(value) => updateContent('cta', 'title', value)}
                  className="text-4xl sm:text-5xl font-bold text-white"
                  placeholder="CTA title..."
                />
              ) : (
                content.cta.title
              )}
            </h2>
            
            <p className="text-xl mb-12 text-blue-100 leading-relaxed">
              {isEditMode ? (
                <EditableText
                  text={content.cta.description}
                  onSave={(value) => updateContent('cta', 'description', value)}
                  className="text-xl text-blue-100 leading-relaxed"
                  multiline={true}
                  placeholder="CTA description..."
                />
              ) : (
                content.cta.description
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                {isEditMode ? (
                  <EditableText
                    text={content.cta.buttonText}
                    onSave={(value) => updateContent('cta', 'buttonText', value)}
                    className="text-blue-600 font-semibold"
                    placeholder="Button text..."
                  />
                ) : (
                  <>
                    {content.cta.buttonText}
                    <SafeIcon icon={FiArrowRight} className="ml-2 inline" />
                  </>
                )}
              </motion.button>
              
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
                {isEditMode ? (
                  <EditableText
                    text={content.cta.secondaryText}
                    onSave={(value) => updateContent('cta', 'secondaryText', value)}
                    className="font-semibold"
                    placeholder="Secondary button text..."
                  />
                ) : (
                  content.cta.secondaryText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiGraduationCap} className="text-white text-xl" />
            </div>
          </div>
          <p className="text-gray-400 mb-4">© 2024 EduRefer. All rights reserved.</p>
          <p className="text-gray-500 text-sm">
            Empowering students and affiliates to achieve academic excellence together.
          </p>
        </div>
      </footer>

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <SafeIcon icon={FiEdit3} className="mr-2 inline" />
          Edit Mode Active - Click any text to edit
        </div>
      )}
    </div>
  );
};

export default LandingPage;