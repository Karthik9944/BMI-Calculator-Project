import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { calculateBMI, getBMICategory } from '../../utils/calculations';
import './BMIcalculator.css';

const BMIcalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    user,
    logout,
    addBMIHistory
  } = useAuth();

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setWeight(value);
      setError('');
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setHeight(value);
      setError('');
    }
  };

  const handleCalculate = () => {
    if (!weight || !height) {
      setError('Please enter both weight and height');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (weightNum <= 0 || heightNum <= 0) {
      setError('Weight and height must be positive numbers');
      return;
    }

    if (weightNum > 300) {
      setError('Weight seems too high (max 300 kg)');
      return;
    }

    if (heightNum > 300) {
      setError('Height seems too high (max 300 cm)');
      return;
    }

    const bmiValue = calculateBMI(weightNum, heightNum);
    const bmiCategory = getBMICategory(bmiValue);

    addBMIHistory({
      bmi: bmiValue,
      category: bmiCategory,
      weight: weightNum,
      height: heightNum
    });

    navigate('/result', {
      state: {
        bmi: bmiValue,
        category: bmiCategory,
        weight: weightNum,
        height: heightNum
      }
    });
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setError('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const history = user?.bmiHistory || [];

  const formatDateTime = (iso) => {
    if (!iso) return '-';
    return new Date(iso).toLocaleString();
  };

  return (
    <div className="bmi-calculator">
      <div className="header-with-logout">
        <h1 className="bmi-title">BMI Calculator</h1>
        <div className="user-info">
          <span className="user-name">Hi, {user?.name || 'User'}!</span>
          <div className="user-actions">
            <button
              onClick={handleLogout}
              className="logout-btn icon-btn"
              aria-label="Logout"
              title="Logout"
            >
              <svg
                className="logout-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M10 7H7.75C6.78 7 6 7.78 6 8.75v6.5C6 16.22 6.78 17 7.75 17H10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 8l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12h8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p className="bmi-subtitle">Check your Body Mass Index</p>

      <div className="input-group">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="text"
          id="weight"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Enter your weight"
          className="bmi-input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="height">Height (cm):</label>
        <input
          type="text"
          id="height"
          value={height}
          onChange={handleHeightChange}
          placeholder="Enter your height"
          className="bmi-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="button-group">
        <button onClick={handleCalculate} className="calculate-btn">
          Check Your BMI
        </button>
        <button onClick={handleReset} className="reset-btn">
          Clear
        </button>
      </div>

      <div className="info-box">
        <p>Enter your details to get instant results.</p>
        <p>Get personalized health tips based on your BMI category.</p>
      </div>

      {history.length > 0 && (
        <div className="history-box">
          <h3 className="history-title">Your BMI History</h3>
          <div className="history-list">
            {history.slice(0, 10).map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-row">
                  <span className="history-label">BMI</span>
                  <span className="history-value">{item.bmi}</span>
                </div>
                <div className="history-row">
                  <span className="history-label">Category</span>
                  <span className="history-value">{item.category}</span>
                </div>
                <div className="history-row">
                  <span className="history-label">Weight / Height</span>
                  <span className="history-value">
                    {item.weight} kg / {item.height} cm
                  </span>
                </div>
                <div className="history-row">
                  <span className="history-label">Date</span>
                  <span className="history-value">{formatDateTime(item.calculatedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BMIcalculator;
