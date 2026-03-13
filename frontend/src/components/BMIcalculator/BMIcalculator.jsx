import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { calculateBMI, getBMICategory } from '../../utils/calculations';
import './BMIcalculator.css';

const BMIcalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [visibleToastIds, setVisibleToastIds] = useState([]);
  const [dismissedToastIds, setDismissedToastIds] = useState([]);
  const navigate = useNavigate();
  const {
    user,
    logout,
    addBMIHistory,
    markNotificationAsRead,
    markAllNotificationsAsRead
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
  const notifications = useMemo(() => user?.notifications || [], [user?.notifications]);
  const unreadCount = notifications.filter((item) => !item.read).length;

  const activeToasts = useMemo(
    () => notifications.filter((item) => visibleToastIds.includes(item.id)),
    [notifications, visibleToastIds]
  );

  useEffect(() => {
    const latestUnread = notifications.find(
      (item) => !item.read && !dismissedToastIds.includes(item.id)
    );

    if (!latestUnread || visibleToastIds.includes(latestUnread.id)) {
      return undefined;
    }

    setVisibleToastIds((current) => [latestUnread.id, ...current].slice(0, 3));

    const timeoutId = window.setTimeout(() => {
      setVisibleToastIds((current) => current.filter((id) => id !== latestUnread.id));
      setDismissedToastIds((current) => [latestUnread.id, ...current].slice(0, 20));
    }, 3500);

    return () => window.clearTimeout(timeoutId);
  }, [dismissedToastIds, notifications, visibleToastIds]);

  useEffect(() => {
    if (isNotificationOpen && unreadCount > 0) {
      markAllNotificationsAsRead();
    }
  }, [isNotificationOpen, unreadCount, markAllNotificationsAsRead]);

  useEffect(() => {
    setDismissedToastIds((current) =>
      current.filter((id) => notifications.some((item) => item.id === id))
    );
  }, [notifications]);

  const formatDateTime = (iso) => {
    if (!iso) return '-';
    return new Date(iso).toLocaleString();
  };

  return (
    <div className="bmi-calculator">
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {activeToasts.map((item) => (
          <div key={item.id} className="notification-toast">
            <div className="notification-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  d="M12 5.25a4 4 0 0 0-4 4v1.22c0 .76-.23 1.5-.66 2.13L6 14.5h12l-1.34-1.9a3.72 3.72 0 0 1-.66-2.13V9.25a4 4 0 0 0-4-4Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 17.5a1.75 1.75 0 0 0 3 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="notification-copy">
              <span className="notification-tag">{item.title}</span>
              <strong>{item.message}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="header-with-logout">
        <h1 className="bmi-title">BMI Calculator</h1>
        <div className="user-info">
          <span className="user-name">Hi, {user?.name || 'User'}!</span>
          <div className="user-actions">
            <div className="notification-anchor">
              <button
                type="button"
                className="notification-btn icon-btn"
                aria-label="Notifications"
                title="Notifications"
                onClick={() => setIsNotificationOpen((current) => !current)}
              >
                <svg className="bell-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M12 5.25a4 4 0 0 0-4 4v1.22c0 .76-.23 1.5-.66 2.13L6 14.5h12l-1.34-1.9a3.72 3.72 0 0 1-.66-2.13V9.25a4 4 0 0 0-4-4Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 17.5a1.75 1.75 0 0 0 3 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>

              {isNotificationOpen && (
                <div className="notification-panel">
                  <div className="notification-panel-header">
                    <h3>Notifications</h3>
                    <span>{notifications.length}</span>
                  </div>
                  <div className="notification-list">
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`notification-item ${item.read ? 'is-read' : 'is-unread'}`}
                          onClick={() => markNotificationAsRead(item.id)}
                        >
                          <div className="notification-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                              <path
                                d="M12 5.25a4 4 0 0 0-4 4v1.22c0 .76-.23 1.5-.66 2.13L6 14.5h12l-1.34-1.9a3.72 3.72 0 0 1-.66-2.13V9.25a4 4 0 0 0-4-4Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.5 17.5a1.75 1.75 0 0 0 3 0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="notification-copy">
                            <span className="notification-tag">{item.title}</span>
                            <strong>{item.message}</strong>
                            <small>{formatDateTime(item.createdAt)}</small>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="notification-empty">No notifications yet.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

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
