import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import StudentDashboard from './pages/StudentDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/auth" />;
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />; // Redirect to their actual dashboard or home
  }
  return children;
};

const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Landing />;
  if (user.role === 'student') return <Navigate to="/student-dashboard" />;
  if (user.role === 'customer') return <Navigate to="/customer-dashboard" />;
  return <Landing />;
}

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardRedirect />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute roleRequired="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer-dashboard"
              element={
                <ProtectedRoute roleRequired="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
