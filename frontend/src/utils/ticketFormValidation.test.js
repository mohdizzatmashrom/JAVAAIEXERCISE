import { describe, it, expect } from 'vitest';
import {
  validateTicketFormStep,
  normalizeTicketFormPayload,
  formatTicketFormLabel
} from './ticketFormValidation';

// ---------------------------------------------------------------------------
// validateTicketFormStep
// ---------------------------------------------------------------------------
describe('validateTicketFormStep', () => {
  it('returns an error for every required field when all values are empty', () => {
    const errors = validateTicketFormStep({
      title: '',
      description: '',
      category: '',
      priority: '',
      status: ''
    });

    expect(Object.keys(errors)).toHaveLength(5);
    expect(errors.title).toBe('Title is required.');
    expect(errors.description).toBe('Description is required.');
    expect(errors.category).toBe('Category is required.');
    expect(errors.priority).toBe('Priority is required.');
    expect(errors.status).toBe('Status is required.');
  });

  it('returns an empty object when all fields have valid values', () => {
    const errors = validateTicketFormStep({
      title: 'Login bug',
      description: 'Cannot log in',
      category: 'Software',
      priority: 'HIGH',
      status: 'OPEN'
    });

    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('treats whitespace-only strings as empty', () => {
    const errors = validateTicketFormStep({
      title: '   ',
      description: '\t',
      category: 'Software',
      priority: 'HIGH',
      status: 'OPEN'
    });

    expect(errors.title).toBe('Title is required.');
    expect(errors.description).toBe('Description is required.');
    expect(errors.category).toBeUndefined();
    expect(errors.priority).toBeUndefined();
    expect(errors.status).toBeUndefined();
  });

  it('validates only the specified step when stepToValidate is provided', () => {
    const errors = validateTicketFormStep(
      { title: '', description: '', category: '', priority: '', status: '' },
      'title'
    );

    // Only the title field should be checked
    expect(Object.keys(errors)).toHaveLength(1);
    expect(errors.title).toBe('Title is required.');
    expect(errors.description).toBeUndefined();
  });

  it('returns no errors for a valid single step', () => {
    const errors = validateTicketFormStep(
      { title: 'Fix crash', description: '', category: '', priority: '', status: '' },
      'title'
    );

    expect(Object.keys(errors)).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// normalizeTicketFormPayload
// ---------------------------------------------------------------------------
describe('normalizeTicketFormPayload', () => {
  it('trims whitespace from title and description', () => {
    const payload = normalizeTicketFormPayload({
      title: '  Login bug  ',
      description: '  Details here  ',
      category: 'Software',
      priority: 'HIGH',
      status: 'OPEN'
    });

    expect(payload.title).toBe('Login bug');
    expect(payload.description).toBe('Details here');
    expect(payload.category).toBe('Software');
    expect(payload.priority).toBe('HIGH');
    expect(payload.status).toBe('OPEN');
  });

  it('handles missing or undefined values gracefully', () => {
    const payload = normalizeTicketFormPayload({});

    expect(payload.title).toBe('');
    expect(payload.description).toBe('');
    expect(payload.category).toBe('');
    expect(payload.priority).toBe('');
    expect(payload.status).toBe('');
  });

  it('returns only the expected keys even if extra fields are present', () => {
    const payload = normalizeTicketFormPayload({
      title: 'Bug',
      description: 'Desc',
      category: 'Email',
      priority: 'LOW',
      status: 'OPEN',
      extraField: 'should not appear'
    });

    expect(Object.keys(payload)).toEqual(['title', 'description', 'category', 'priority', 'status']);
    expect(payload.extraField).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// formatTicketFormLabel
// ---------------------------------------------------------------------------
describe('formatTicketFormLabel', () => {
  it('returns the human-readable label for known field keys', () => {
    expect(formatTicketFormLabel('title')).toBe('Title');
    expect(formatTicketFormLabel('description')).toBe('Description');
    expect(formatTicketFormLabel('category')).toBe('Category');
    expect(formatTicketFormLabel('priority')).toBe('Priority');
    expect(formatTicketFormLabel('status')).toBe('Status');
  });

  it('returns the raw key when the field is not recognised', () => {
    expect(formatTicketFormLabel('unknownField')).toBe('unknownField');
  });
});
