/**
 * Ticket form validation utility.
 *
 * Extracted from TicketFormWizard so that validation rules are
 * easy to read, reuse, and unit-test without rendering React components.
 */

// Fields that must be non-empty before the form can be submitted.
const REQUIRED_FIELDS = ['title', 'description', 'category', 'priority', 'status'];

/**
 * Human-readable labels for each form field key.
 * Used to build user-friendly error messages.
 */
const FIELD_LABELS = {
  title: 'Title',
  description: 'Description',
  category: 'Category',
  priority: 'Priority',
  status: 'Status'
};

/**
 * Validate a single step (field) or the entire form.
 *
 * @param {Object}  formValues       Current values from the form state.
 * @param {string|null} stepToValidate  When provided, validate only this field.
 *                                      When null / undefined, validate all fields.
 * @param {boolean} [reviewConfirmed]  Reserved for multi-step wizard flows –
 *                                      when the wizard has a review/confirm step,
 *                                      pass true to indicate the user has confirmed.
 * @returns {Object} errors – An object whose keys are field names and whose
 *                            values are error message strings.  An empty object
 *                            means the form (or step) is valid.
 */
export function validateTicketFormStep(formValues, stepToValidate, reviewConfirmed) {
  const errors = {};

  const fieldsToCheck = stepToValidate ? [stepToValidate] : REQUIRED_FIELDS;

  for (const field of fieldsToCheck) {
    const value = formValues[field];

    if (typeof value === 'string' && !value.trim()) {
      errors[field] = `${FIELD_LABELS[field] || field} is required.`;
    } else if (value === undefined || value === null || value === '') {
      errors[field] = `${FIELD_LABELS[field] || field} is required.`;
    }
  }

  return errors;
}

/**
 * Build a clean, trimmed payload ready to send to the backend.
 *
 * @param {Object} formValues  Raw values from the form state.
 * @returns {Object} A new object with trimmed strings and only the expected keys.
 */
export function normalizeTicketFormPayload(formValues) {
  return {
    title: (formValues.title || '').trim(),
    description: (formValues.description || '').trim(),
    category: formValues.category || '',
    priority: formValues.priority || '',
    status: formValues.status || ''
  };
}

/**
 * Convert a form-field key into a human-readable label.
 *
 * @param {string} key  e.g. "title" or "priority"
 * @returns {string}    e.g. "Title" or "Priority"
 */
export function formatTicketFormLabel(key) {
  return FIELD_LABELS[key] || key;
}
