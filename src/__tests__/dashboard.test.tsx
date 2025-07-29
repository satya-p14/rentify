import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';

test('renders Login form', () => {
  render(<Dashboard />);
  expect(screen.getByText('Welcome to the dashboard')).toBeInTheDocument();
});
