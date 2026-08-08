import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketFormWizard from './TicketFormWizard.jsx';

describe('TicketFormWizard – validation', () => {
  it('shows inline errors when required fields are empty and submit is clicked', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<TicketFormWizard onSubmit={handleSubmit} />);

    // Click submit without filling any fields
    await user.click(screen.getByRole('button', { name: /create ticket/i }));

    // onSubmit must NOT be called because validation should fail
    expect(handleSubmit).not.toHaveBeenCalled();

    // Each required field should display an inline error
    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Description is required.')).toBeInTheDocument();
    expect(screen.getByText('Category is required.')).toBeInTheDocument();
    expect(screen.getByText('Priority is required.')).toBeInTheDocument();
    expect(screen.getByText('Status is required.')).toBeInTheDocument();
  });
});

describe('TicketFormWizard – valid submit', () => {
  it('calls onSubmit with a clean payload when all fields are valid', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<TicketFormWizard onSubmit={handleSubmit} />);

    // Fill in text fields
    await user.type(screen.getByLabelText(/title/i), 'Login page crashes');
    await user.type(screen.getByLabelText(/description/i), 'Users cannot log in on mobile');

    // Select dropdown values
    await user.selectOptions(screen.getByLabelText(/category/i), 'Software');
    await user.selectOptions(screen.getByLabelText(/priority/i), 'HIGH');
    await user.selectOptions(screen.getByLabelText(/status/i), 'OPEN');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /create ticket/i }));

    // onSubmit should be called exactly once with trimmed, clean data
    expect(handleSubmit).toHaveBeenCalledOnce();
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Login page crashes',
      description: 'Users cannot log in on mobile',
      category: 'Software',
      priority: 'HIGH',
      status: 'OPEN'
    });
  });
});

describe('TicketFormWizard – saving state', () => {
  it('shows "Saving..." and disables the button when saving is true', () => {
    render(<TicketFormWizard saving={true} />);

    const button = screen.getByRole('button', { name: /saving/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('shows the default submit label when saving is false', () => {
    render(<TicketFormWizard saving={false} />);

    const button = screen.getByRole('button', { name: /create ticket/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
