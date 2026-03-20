export const calculateBMI = (weight, height) => {
  if (!weight || !height || weight <= 0 || height <= 0) {
    return 0;
  }
  
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  return Math.round(bmi * 10) / 10;
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi < 25) return 'Normal weight';
  if (bmi >= 25 && bmi < 30) return 'Overweight';
  if (bmi >= 30) return 'Obese';
  return 'Invalid';
};

export const getCategoryColor = (category) => {
  switch(category) {
    case 'Underweight':
      return '#FFA500';
    case 'Normal weight':
      return '#4CAF50';
    case 'Overweight':
      return '#FFD700';
    case 'Obese':
      return '#FF4444';
    default:
      return '#000000';
  }
};

export const getHealthTips = (category) => {
  switch(category) {
    case 'Underweight':
      return [
        'Eat more frequently throughout the day',
        'Choose nutrient-rich foods',
        'Add healthy snacks between meals',
        'Include protein with every meal',
        'Consult a dietitian for personalized advice'
      ];
    case 'Normal weight':
      return [
        'Maintain your current eating habits',
        'Exercise regularly (150 mins/week)',
        'Stay hydrated with 8 glasses of water',
        'Get adequate sleep (7-9 hours)',
        'Continue regular health check-ups'
      ];
    case 'Overweight':
      return [
        'Incorporate more vegetables into meals',
        'Start with 30 minutes of daily walking',
        'Reduce sugary drinks and processed foods',
        'Practice portion control',
        'Consider consulting a nutritionist'
      ];
    case 'Obese':
      return [
        'Consult healthcare provider for guidance',
        'Start with low-impact exercises (swimming, walking)',
        'Keep a food diary',
        'Focus on gradual, sustainable changes',
        'Join a support group for motivation'
      ];
    default:
      return ['Enter valid measurements to get tips'];
  }
};