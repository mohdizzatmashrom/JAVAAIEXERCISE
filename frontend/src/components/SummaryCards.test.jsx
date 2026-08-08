import { describe, it, expect } from 'vitest';
import { render, screen, within} from '@testing-library/react';
import SummaryCards from './SummaryCards.jsx';
import { sampleAssets } from '../test/testUtils.jsx';

describe('SummaryCards component', () => {
  it('renders summary cards with correct values', () => {
    render(<SummaryCards assets={sampleAssets} />);

    const summary = screen.getByLabelText('Asset summary');

    expect(within(summary).getByText('Total Assets')).toBeInTheDocument();
    expect(within(summary).getByText('Available')).toBeInTheDocument();
    expect(within(summary).getByText('Assigned')).toBeInTheDocument();
    expect(within(summary).getByText('Maintenance')).toBeInTheDocument();
    expect(within(summary).getByText('3')).toBeInTheDocument(); // Total Assets
  });
});