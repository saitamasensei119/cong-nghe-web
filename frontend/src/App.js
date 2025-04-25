import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ExamPage from './pages/ExamPage/ExamPage';
import TakeExamPage from './pages/TakeExamPage/TakeExamPage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import axios from 'axios';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Set default axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Verify token and get user info
        const response = await axios.get('http://localhost:5000/api/auth/verify');
        if (response.data.success) {
          setIsAuthenticated(true);
          setUserRole(response.data.user.role);
        }
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set default axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Get user info
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/verify');
          if (response.data.success) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      };

      fetchUser();
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="content">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={
              user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
            } />
            <Route path="/register" element={
              user ? <Navigate to="/" /> : <RegisterPage />
            } />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <ExamPage />
              </ProtectedRoute>
            } />
            <Route path="/exam/:id" element={
              <ProtectedRoute>
                <TakeExamPage />
              </ProtectedRoute>
            } />
            <Route path="/statistics" element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <StatisticsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;