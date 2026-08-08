import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';

describe('LoadingMessage', () => {
  it('renders the loading text', () => {
    render(<LoadingMessage message="Loading tickets..." />);
    expect(screen.getByText('Loading tickets...')).toBeInTheDocument();
  });

  it('applies the loading-message class', () => {
    render(<LoadingMessage message="Please wait" />);
    const el = screen.getByText('Please wait');
    expect(el).toHaveClass('loading-message');
  });
});

describe('ErrorMessage', () => {
  it('renders the error text', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('applies the error-message class', () => {
    render(<ErrorMessage message="Failed to load" />);
    const el = screen.getByText('Failed to load');
    expect(el).toHaveClass('error-message');
  });
});
