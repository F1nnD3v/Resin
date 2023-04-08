import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeEditor from './Pages/CodeEditor';

test('renders learn react link', () => {
  render(<CodeEditor />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
