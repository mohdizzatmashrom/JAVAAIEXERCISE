import { describe, it, expect } from 'vitest';
import { filterTickets, countByStatus } from './tickets';

const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', category: 'Email', status: 'OPEN', priority: 'HIGH' },
  { id: 'T002', title: 'Laptop running slowly', category: 'Hardware', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: 'T003', title: 'Password reset request', category: 'Account', status: 'CLOSED', priority: 'LOW' }
];

describe('ticket utility functions', () => {
  it('filters tickets by search text', () => {
    const result = filterTickets(sampleTickets, 'email', 'ALL');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T001');
  });

  it('filters tickets by status', () => {
    const result = filterTickets(sampleTickets, '', 'CLOSED');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T003');
  });

  it('filters tickets by both search text and status', () => {
    const result = filterTickets(sampleTickets, 'laptop', 'IN_PROGRESS');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T002');
  });

  it('returns all tickets when search is empty and status is ALL', () => {
    const result = filterTickets(sampleTickets, '', 'ALL');

    expect(result).toHaveLength(3);
  });

  it('counts tickets by status', () => {
    expect(countByStatus(sampleTickets, 'OPEN')).toBe(1);
    expect(countByStatus(sampleTickets, 'IN_PROGRESS')).toBe(1);
    expect(countByStatus(sampleTickets, 'CLOSED')).toBe(1);
  });
});
