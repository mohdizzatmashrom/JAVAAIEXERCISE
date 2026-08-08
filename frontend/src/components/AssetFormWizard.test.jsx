import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssetFormWizard from './AssetFormWizard';

describe('AssetFormWizard', () => {
  it('shows inline validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<AssetFormWizard onSubmit={vi.fn()} />);

    // Click the "Next" button to trigger validation for step 1
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Asset tag is required.')).toBeInTheDocument();
    expect(screen.getByText('Asset name is required.')).toBeInTheDocument();
    expect(screen.getByText('Category is required.')).toBeInTheDocument();
    expect(screen.getByText('Serial number is required.')).toBeInTheDocument();
  });

  it('submit valid form data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<AssetFormWizard onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Asset Tag'), 'AT-123');
    await user.type(screen.getByLabelText('Asset Name'), 'Test Asset');
    await user.type(screen.getByLabelText('Category'), 'Electronics');
    await user.type(screen.getByLabelText('Serial Number'), 'SN-456');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    // Fill in the second step
    await user.type(screen.getByLabelText('Location'), 'HQ Level 1');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    // Fill in the third step
    await user.click(screen.getByLabelText('I have reviewed the asset details and they are ready to submit.'));
    await user.click(screen.getByRole('button', { name: 'Create Asset' }));

    expect(onSubmit).toHaveBeenCalledWith({
      assetTag: 'AT-123',
      name: 'Test Asset',
      category: 'Electronics',
      serialNumber: 'SN-456',
      status: 'AVAILABLE',
      location: 'HQ Level 1',
      assignedTo: null
    });
  });
});