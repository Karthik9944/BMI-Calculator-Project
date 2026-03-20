import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Auth = ({ initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { login, signup } = useAuth();

  useEffect(() => {
    setMode(initialMode === 'signup' ? 'signup' : 'login');
  }, [initialMode]);

  const validateLoginForm = () => {
    const newErrors = {};

    if (!loginEmail) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
      newErrors.email = 'Invalid email format';
    }

    if (!loginPassword) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateLoginForm();
    if (Object.keys(newErrors).length > 0) {
      setLoginErrors(newErrors);
      return;
    }

    const result = login(loginEmail, loginPassword);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setLoginErrors({ general: result.message });
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (signupErrors[name]) {
      setSignupErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateSignupForm = () => {
    const newErrors = {};

    if (!signupData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (signupData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(signupData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(signupData.password)) {
      newErrors.password = 'Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number';
    }

    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateSignupForm();
    if (Object.keys(newErrors).length > 0) {
      setSignupErrors(newErrors);
      return;
    }

    const result = signup(signupData.name, signupData.email, signupData.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setSignupErrors({ general: result.message });
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return null;

    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { text: 'Weak', color: '#ef4444' };
    if (strength <= 4) return { text: 'Medium', color: '#f59e0b' };
    return { text: 'Strong', color: '#10b981' };
  };

  const passwordStrength = getPasswordStrength(signupData.password);
  const errors = mode === 'login' ? loginErrors : signupErrors;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{mode === 'login' ? 'Welcome Back!' : 'Create Account'}</h2>
        <p className="subtitle">
          {mode === 'login'
            ? 'Please login to your account'
            : 'Sign up to start tracking your BMI'}
        </p>

        {errors.general && <div className="error-message">{errors.general}</div>}

        <form onSubmit={mode === 'login' ? handleLoginSubmit : handleSignupSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleSignupChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={mode === 'login' ? loginEmail : signupData.email}
              onChange={(e) => {
                if (mode === 'login') {
                  setLoginEmail(e.target.value);
                  setLoginErrors({});
                } else {
                  handleSignupChange(e);
                }
              }}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type={
                  mode === 'login'
                    ? showLoginPassword
                      ? 'text'
                      : 'password'
                    : showSignupPassword
                    ? 'text'
                    : 'password'
                }
                name="password"
                value={mode === 'login' ? loginPassword : signupData.password}
                onChange={(e) => {
                  if (mode === 'login') {
                    setLoginPassword(e.target.value);
                    setLoginErrors({});
                  } else {
                    handleSignupChange(e);
                  }
                }}
                placeholder={mode === 'login' ? 'Enter your password' : 'Create a password'}
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => {
                  if (mode === 'login') {
                    setShowLoginPassword(!showLoginPassword);
                  } else {
                    setShowSignupPassword(!showSignupPassword);
                  }
                }}
                title={mode === 'login' ? (showLoginPassword ? 'Hide password' : 'Show password') : (showSignupPassword ? 'Hide password' : 'Show password')}
              >
                {mode === 'login'
                  ? showLoginPassword
                    ? '🔒'
                    : '👁️'
                  : showSignupPassword
                  ? '🔒'
                  : '👁️'}
              </button>
            </div>

            {mode === 'signup' && signupData.password && (
              <div className="strength-indicator">
                <div
                  className="strength-bar"
                  style={{
                    width:
                      passwordStrength?.text === 'Weak'
                        ? '33%'
                        : passwordStrength?.text === 'Medium'
                        ? '66%'
                        : '100%',
                    backgroundColor: passwordStrength?.color
                  }}
                />
                <span style={{ color: passwordStrength?.color }}>{passwordStrength?.text}</span>
              </div>
            )}

            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-field">
                <input
                  type={showSignupConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                  title={showSignupConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showSignupConfirmPassword ? '🔒' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" className="auth-btn">
            {mode === 'login' ? 'Login Now' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
