// Validation functions
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return re.test(password);
};

export const validateName = (name) => {
  return name.length >= 2;
};

export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 6) strength += 1;
  if (password.length >= 8) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  
  if (strength <= 2) return { text: 'Weak', color: '#ff4444' };
  if (strength <= 4) return { text: 'Medium', color: '#ffa700' };
  return { text: 'Strong', color: '#00C851' };
};