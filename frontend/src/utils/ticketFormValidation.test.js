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
  // -- Required-field tests --------------------------------------------------

  it('returns an error for every required field when all values are empty strings', () => {
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

  it('returns an error when required fields are null or undefined', () => {
    const errors = validateTicketFormStep({
      title: null,
      description: undefined,
      category: null,
      priority: undefined,
      status: null
    });

    expect(Object.keys(errors)).toHaveLength(5);
    expect(errors.title).toBe('Title is required.');
    expect(errors.description).toBe('Description is required.');
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

  it('reports errors only for the empty fields among a mixed set', () => {
    const errors = validateTicketFormStep({
      title: 'Fix crash',
      description: '',
      category: 'Network',
      priority: '',
      status: 'OPEN'
    });

    expect(Object.keys(errors)).toHaveLength(2);
    expect(errors.description).toBe('Description is required.');
    expect(errors.priority).toBe('Priority is required.');
    expect(errors.title).toBeUndefined();
    expect(errors.category).toBeUndefined();
  });

  // -- Step-scoped validation ------------------------------------------------

  it('validates only the specified step when stepToValidate is provided', () => {
    const errors = validateTicketFormStep(
      { title: '', description: '', category: '', priority: '', status: '' },
      'title'
    );

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

  // -- Invalid priority / status tests ---------------------------------------

  it('does not reject an unrecognised priority value because only presence is validated', () => {
    const errors = validateTicketFormStep({
      title: 'Bug report',
      description: 'Details',
      category: 'Software',
      priority: 'CRITICAL',   // not in the allowed LOW/MEDIUM/HIGH list
      status: 'OPEN'
    });

    // The front-end validation checks "required" only, so "CRITICAL" passes.
    // This documents the current behaviour – value-level validation is the
    // backend's responsibility.
    expect(errors.priority).toBeUndefined();
  });

  it('does not reject an unrecognised status value because only presence is validated', () => {
    const errors = validateTicketFormStep({
      title: 'Bug report',
      description: 'Details',
      category: 'Software',
      priority: 'HIGH',
      status: 'RESOLVED'     // not in the allowed OPEN/IN_PROGRESS/CLOSED list
    });

    // Same rationale as priority – front-end only checks non-empty.
    expect(errors.status).toBeUndefined();
  });

  it('rejects empty priority and empty status even when other fields are valid', () => {
    const errors = validateTicketFormStep({
      title: 'Bug report',
      description: 'Details',
      category: 'Software',
      priority: '',
      status: ''
    });

    expect(errors.priority).toBe('Priority is required.');
    expect(errors.status).toBe('Status is required.');
  });
});

// ---------------------------------------------------------------------------
// normalizeTicketFormPayload
// ---------------------------------------------------------------------------
describe('normalizeTicketFormPayload', () => {
  it('trims leading and trailing whitespace from title and description', () => {
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

  it('preserves internal whitespace while trimming edges', () => {
    const payload = normalizeTicketFormPayload({
      title: '  fix   login   crash  ',
      description: '  users   cannot   log   in  ',
      category: 'Software',
      priority: 'HIGH',
      status: 'OPEN'
    });

    expect(payload.title).toBe('fix   login   crash');
    expect(payload.description).toBe('users   cannot   log   in');
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
      extraField: 'should not appear',
      anotherExtra: 42
    });

    expect(Object.keys(payload)).toEqual(['title', 'description', 'category', 'priority', 'status']);
    expect(payload.extraField).toBeUndefined();
    expect(payload.anotherExtra).toBeUndefined();
  });

  it('does not mutate the original form values object', () => {
    const original = {
      title: '  Login bug  ',
      description: '  Details  ',
      category: 'Software',
      priority: 'HIGH',
      status: 'OPEN'
    };

    normalizeTicketFormPayload(original);

    // The source object must remain untouched
    expect(original.title).toBe('  Login bug  ');
    expect(original.description).toBe('  Details  ');
  });

  it('converts whitespace-only strings to empty strings in the payload', () => {
    const payload = normalizeTicketFormPayload({
      title: '   ',
      description: '\t\n',
      category: '',
      priority: '',
      status: ''
    });

    expect(payload.title).toBe('');
    expect(payload.description).toBe('');
  });
});

// ---------------------------------------------------------------------------
// formatTicketFormLabel
// ---------------------------------------------------------------------------
describe('formatTicketFormLabel', () => {
  it('returns the human-readable label for every known field key', () => {
    expect(formatTicketFormLabel('title')).toBe('Title');
    expect(formatTicketFormLabel('description')).toBe('Description');
    expect(formatTicketFormLabel('category')).toBe('Category');
    expect(formatTicketFormLabel('priority')).toBe('Priority');
    expect(formatTicketFormLabel('status')).toBe('Status');
  });

  it('returns the raw key when the field is not recognised', () => {
    expect(formatTicketFormLabel('unknownField')).toBe('unknownField');
    expect(formatTicketFormLabel('id')).toBe('id');
  });

  it('returns the raw key for an empty string', () => {
    expect(formatTicketFormLabel('')).toBe('');
  });
});
