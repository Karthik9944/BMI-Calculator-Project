import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategoryColor, getHealthTips } from '../../utils/calculations';
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bmi, category, weight, height } = location.state || {};

  // If no data, redirect to calculator
  if (!bmi) {
    navigate('/calculator');
    return null;
  }

  const color = getCategoryColor(category);
  const healthTips = getHealthTips(category);

  const getBMIDescription = () => {
    switch(category) {
      case 'Underweight':
        return 'You are underweight. Consider gaining some healthy weight.';
      case 'Normal weight':
        return 'Great! You have a healthy body weight.';
      case 'Overweight':
        return 'You are overweight. Consider making some lifestyle changes.';
      case 'Obese':
        return 'You are in the obese range. Consult a healthcare provider.';
      default:
        return '';
    }
  };

  const getIdealRange = () => {
    switch(category) {
      case 'Underweight':
        return 'Aim for BMI between 18.5 - 24.9';
      case 'Normal weight':
        return 'Maintain BMI between 18.5 - 24.9';
      case 'Overweight':
        return 'Target BMI: 18.5 - 24.9';
      case 'Obese':
        return 'Goal BMI: 18.5 - 24.9';
      default:
        return '';
    }
  };

  const handleGoBack = () => {
    navigate('/calculator');  // Goes back to calculator, not login
  };

  const handleCheckAgain = () => {
    navigate('/calculator');  // Goes to calculator, not login
  };

  return (
    <div className="result-page">
      <div className="result-card">
        <button onClick={handleGoBack} className="back-button">
          ← Back
        </button>

        <h1 className="result-title">Your BMI Result</h1>
        
        <div className="bmi-circle" style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}>
          <span className="bmi-number" style={{ color: color }}>{bmi}</span>
          <span className="bmi-unit">kg/m²</span>
        </div>

        <div className="category-badge" style={{ backgroundColor: color }}>
          {category}
        </div>

        <p className="bmi-description">{getBMIDescription()}</p>

        <div className="measurements-box">
          <div className="measurement-item">
            <span className="measurement-label">Weight</span>
            <span className="measurement-value">{weight} kg</span>
          </div>
          <div className="measurement-item">
            <span className="measurement-label">Height</span>
            <span className="measurement-value">{height} cm</span>
          </div>
        </div>

        <div className="range-info">
          <h3>{getIdealRange()}</h3>
        </div>

        <div className="bmi-scale-container">
          <h3>BMI Scale</h3>
          <div className="scale-bar">
            <div className="scale-section underweight">Under<br/>18.5</div>
            <div className="scale-section normal">Normal<br/>18.5-25</div>
            <div className="scale-section overweight">Over<br/>25-30</div>
            <div className="scale-section obese">Obese<br/>{'>30'}</div>
            <div 
              className="scale-indicator" 
              style={{ 
                left: `${Math.min((bmi / 40) * 100, 95)}%`,
                backgroundColor: color 
              }}
            >
              <span className="indicator-label">You</span>
            </div>
          </div>
        </div>

        <div className="health-tips">
          <h3>💪 Health Tips</h3>
          <ul className="tips-list">
            {healthTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <button onClick={handleCheckAgain} className="check-again-btn">
          Check Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;