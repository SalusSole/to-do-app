import { render, screen } from '@testing-library/react';
import App from './App';

test('unit testing', () => {
  render(<App />);
  const title = screen.getByText(/Task App/i);
  expect(title).toBeInTheDocument();
});
