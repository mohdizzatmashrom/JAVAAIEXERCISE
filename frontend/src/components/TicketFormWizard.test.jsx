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

  it('rejects whitespace-only values for title and description', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<TicketFormWizard onSubmit={handleSubmit} />);

    // Type only spaces into text fields
    await user.type(screen.getByLabelText(/title/i), '   ');
    await user.type(screen.getByLabelText(/description/i), '   ');

    // Fill the dropdowns so they are not the reason validation fails
    await user.selectOptions(screen.getByLabelText(/category/i), 'Software');
    await user.selectOptions(screen.getByLabelText(/priority/i), 'HIGH');
    await user.selectOptions(screen.getByLabelText(/status/i), 'OPEN');

    await user.click(screen.getByRole('button', { name: /create ticket/i }));

    // Whitespace-only strings should be treated as empty
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Description is required.')).toBeInTheDocument();
  });

  it('clears the inline error when the user starts typing in a field', async () => {
    const user = userEvent.setup();
    render(<TicketFormWizard onSubmit={vi.fn()} />);

    // Trigger all validation errors first
    await user.click(screen.getByRole('button', { name: /create ticket/i }));
    expect(screen.getByText('Title is required.')).toBeInTheDocument();

    // Start typing in the title field
    await user.type(screen.getByLabelText(/title/i), 'Fix');

    // The title error should disappear while other errors remain
    expect(screen.queryByText('Title is required.')).not.toBeInTheDocument();
    expect(screen.getByText('Description is required.')).toBeInTheDocument();
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

describe('TicketFormWizard – initialValues', () => {
  it('pre-populates form fields when initialValues are provided', () => {
    render(
      <TicketFormWizard
        onSubmit={vi.fn()}
        initialValues={{
          title: 'Existing bug',
          description: 'Details here',
          category: 'Network',
          priority: 'LOW',
          status: 'CLOSED'
        }}
      />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue('Existing bug');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Details here');
    expect(screen.getByLabelText(/category/i)).toHaveValue('Network');
    expect(screen.getByLabelText(/priority/i)).toHaveValue('LOW');
    expect(screen.getByLabelText(/status/i)).toHaveValue('CLOSED');
  });
});

describe('TicketFormWizard – custom submitLabel', () => {
  it('renders a custom submit label when submitLabel prop is provided', () => {
    render(<TicketFormWizard submitLabel="Update Ticket" />);
    expect(screen.getByRole('button', { name: /update ticket/i })).toBeInTheDocument();
  });
});

describe('TicketFormWizard – missing onSubmit', () => {
  it('does not crash when onSubmit is not provided and form is submitted', async () => {
    const user = userEvent.setup();
    render(<TicketFormWizard />);

    // Fill all required fields
    await user.type(screen.getByLabelText(/title/i), 'Test');
    await user.type(screen.getByLabelText(/description/i), 'Test desc');
    await user.selectOptions(screen.getByLabelText(/category/i), 'Email');
    await user.selectOptions(screen.getByLabelText(/priority/i), 'LOW');
    await user.selectOptions(screen.getByLabelText(/status/i), 'OPEN');

    // Should not throw even though no onSubmit handler was provided
    await user.click(screen.getByRole('button', { name: /create ticket/i }));
  });
});
