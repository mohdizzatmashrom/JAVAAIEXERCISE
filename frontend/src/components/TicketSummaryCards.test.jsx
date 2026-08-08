import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import TicketSummaryCards from './TicketSummaryCards.jsx';

const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', category: 'Email', status: 'OPEN', priority: 'HIGH' },
  { id: 'T002', title: 'Laptop running slowly', category: 'Hardware', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: 'T003', title: 'Password reset request', category: 'Account', status: 'CLOSED', priority: 'LOW' },
  { id: 'T004', title: 'New monitor request', category: 'Hardware', status: 'OPEN', priority: 'LOW' },
  { id: 'T005', title: 'Software install', category: 'Software', status: 'CLOSED', priority: 'MEDIUM' }
];

describe('TicketSummaryCards', () => {
  it('renders all summary card labels', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const summary = screen.getByLabelText('Ticket summary');

    expect(within(summary).getByText('Total Tickets')).toBeInTheDocument();
    expect(within(summary).getByText('Open')).toBeInTheDocument();
    expect(within(summary).getByText('In Progress')).toBeInTheDocument();
    expect(within(summary).getByText('Closed')).toBeInTheDocument();
  });

  it('displays the correct total ticket count', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const summary = screen.getByLabelText('Ticket summary');
    expect(within(summary).getByText('5')).toBeInTheDocument();
  });

  it('displays the correct count for Open tickets', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const summary = screen.getByLabelText('Ticket summary');
    const openCard = within(summary).getByText('Open').closest('.summary-card');
    expect(within(openCard).getByText('2')).toBeInTheDocument();
  });

  it('displays the correct count for In Progress tickets', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const summary = screen.getByLabelText('Ticket summary');
    const inProgressCard = within(summary).getByText('In Progress').closest('.summary-card');
    expect(within(inProgressCard).getByText('1')).toBeInTheDocument();
  });

  it('displays the correct count for Closed tickets', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const summary = screen.getByLabelText('Ticket summary');
    const closedCard = within(summary).getByText('Closed').closest('.summary-card');
    expect(within(closedCard).getByText('2')).toBeInTheDocument();
  });

  it('shows zeros when ticket list is empty', () => {
    render(<TicketSummaryCards tickets={[]} />);

    const summary = screen.getByLabelText('Ticket summary');
    const zeros = within(summary).getAllByText('0');
    expect(zeros).toHaveLength(4);
  });
});
