/**
 * File: __tests__/example.test.js
 * Author: Anthony Woodward MSc
 * Description: Example test using React Testing Library.
 */

import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', {
        name: /Voyager/i,
      })
    ).toBeInTheDocument();
  });
});
