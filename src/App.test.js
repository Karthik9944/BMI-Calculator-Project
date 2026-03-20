import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page brand', () => {
  render(<App />);
  expect(screen.getByText(/BMI Sphere/i)).toBeInTheDocument();
});
