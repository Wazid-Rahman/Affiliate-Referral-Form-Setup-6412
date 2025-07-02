import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import questConfig from './config/questConfig';
import LoginPage from './components/auth/LoginPage';
import OnboardingPage from './components/auth/OnboardingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AffiliateForm from './components/AffiliateForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AffiliateList from './components/AffiliateList';
import LandingPage from './components/LandingPage';
import UserManagement from './components/users/UserManagement';
import Navigation from './components/Navigation';
import './App.css';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {isAuthenticated && <Navigation />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/analytics" replace /> : <LoginPage />} />
        
        {/* Public Landing Page */}
        <Route path="/landing" element={<LandingPage />} />
        
        {/* Public Affiliate Form - accessible without login */}
        <Route path="/signup" element={<AffiliateForm />} />
        <Route path="/ref/:affiliateId" element={<AffiliateForm />} />
        
        {/* Protected Routes */}
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <AnalyticsDashboard />
          </ProtectedRoute>
        } />
        <Route path="/affiliates" element={
          <ProtectedRoute>
            <AffiliateList />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        } />
        
        {/* Default redirects */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/analytics" replace /> : <Navigate to="/landing" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;