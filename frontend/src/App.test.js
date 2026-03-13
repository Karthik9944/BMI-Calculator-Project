import { render, screen } from '@testing-library/react';
import App from './App';

test('renders theme toggle button', () => {
  render(<App />);
  const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
  expect(toggleButton).toBeInTheDocument();
});
