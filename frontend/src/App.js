import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Intro from './Intro';
import Auth from './components/Auth/Auth';
import BMIcalculator from './components/BMIcalculator/BMIcalculator';
import ResultPage from './components/ResultPage/ResultPage';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Auth initialMode="login" />} />
      <Route path="/signup" element={<Auth initialMode="signup" />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <BMIcalculator />
          </ProtectedRoute>
        } 
      />
      <Route path="/calculator" element={<Navigate to="/dashboard" replace />} />
      <Route 
        path="/result" 
        element={
          <ProtectedRoute>
            <ResultPage />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('bmi-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bmi-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <AuthProvider>
        <div className={`App ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
