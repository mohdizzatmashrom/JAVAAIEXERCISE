import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketFormWizard from '../components/TicketFormWizard.jsx';

describe('TicketFormWizard – client-side validation', () => {
  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<TicketFormWizard onSubmit={handleSubmit} />);

    // Click the submit button without filling any fields
    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    // All required field errors should appear
    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Description is required.')).toBeInTheDocument();
    expect(screen.getByText('Category is required.')).toBeInTheDocument();
    expect(screen.getByText('Priority is required.')).toBeInTheDocument();
    expect(screen.getByText('Status is required.')).toBeInTheDocument();

    // onSubmit should NOT have been called because validation failed
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with form data when all fields are valid', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<TicketFormWizard onSubmit={handleSubmit} />);

    // Fill in all required fields
    await user.type(screen.getByLabelText(/title/i), 'Login broken');
    await user.type(screen.getByLabelText(/description/i), 'Cannot log in at all');

    await user.selectOptions(screen.getByLabelText(/category/i), 'Software');
    await user.selectOptions(screen.getByLabelText(/priority/i), 'HIGH');
    await user.selectOptions(screen.getByLabelText(/status/i), 'OPEN');

    // Submit the form
    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    // onSubmit should be called with the correct payload
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Login broken',
      description: 'Cannot log in at all',
      category: 'Software',
      priority: 'HIGH',
      status: 'OPEN'
    });
  });
});
