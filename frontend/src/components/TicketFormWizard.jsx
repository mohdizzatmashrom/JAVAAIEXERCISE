import { useState } from 'react';
import InlineFieldError from './InlineFieldError.jsx';

const CATEGORY_OPTIONS = ['Email', 'Hardware', 'Software', 'Network', 'Account'];
const PRIORITY_OPTIONS = ['HIGH', 'MEDIUM', 'LOW'];
// Must match the statuses accepted by the backend TicketService
const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

export const emptyTicketForm = {
  title: '',
  description: '',
  category: '',
  priority: '',
  status: ''
};

export default function TicketFormWizard({
  initialValues = emptyTicketForm,
  onSubmit,
  saving = false,
  submitLabel = 'Create Ticket'
}) {
  const [formValues, setFormValues] = useState({ ...emptyTicketForm, ...initialValues });
  const [fieldErrors, setFieldErrors] = useState({});

  function updateField(fieldName, value) {
    setFormValues((current) => ({
      ...current,
      [fieldName]: value
    }));

    // Clear the error for a field as soon as the user edits it
    setFieldErrors((current) => ({
      ...current,
      [fieldName]: ''
    }));
  }

  function validateForm() {
    const errors = {};

    if (!formValues.title.trim()) {
      errors.title = 'Title is required.';
    }

    if (!formValues.description.trim()) {
      errors.description = 'Description is required.';
    }

    if (!formValues.category) {
      errors.category = 'Category is required.';
    }

    if (!formValues.priority) {
      errors.priority = 'Priority is required.';
    }

    if (!formValues.status) {
      errors.status = 'Status is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Block submission when any required field is empty
    if (!validateForm()) {
      return;
    }

    const payload = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      category: formValues.category,
      priority: formValues.priority,
      status: formValues.status
    };

    if (onSubmit) {
      onSubmit(payload);
    }
  }

  return (
    <form className="card ticket-form" onSubmit={handleSubmit} noValidate>
      <div className="section-heading">
        <p className="eyebrow">Day 13 form</p>
        <h2>Ticket Details</h2>
        <p>Controlled inputs backed by React state, with client-side validation and inline errors.</p>
      </div>

      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          value={formValues.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Short summary of the issue"
          aria-invalid={Boolean(fieldErrors.title)}
        />
        <InlineFieldError message={fieldErrors.title} />
      </label>

      <label htmlFor="description">
        Description
        <textarea
          id="description"
          rows={4}
          value={formValues.description}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder="Describe the problem in more detail"
          aria-invalid={Boolean(fieldErrors.description)}
        />
        <InlineFieldError message={fieldErrors.description} />
      </label>

      <label htmlFor="category">
        Category
        <select
          id="category"
          value={formValues.category}
          onChange={(event) => updateField('category', event.target.value)}
          aria-invalid={Boolean(fieldErrors.category)}
        >
          <option value="">Select a category...</option>
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <InlineFieldError message={fieldErrors.category} />
      </label>

      <label htmlFor="priority">
        Priority
        <select
          id="priority"
          value={formValues.priority}
          onChange={(event) => updateField('priority', event.target.value)}
          aria-invalid={Boolean(fieldErrors.priority)}
        >
          <option value="">Select a priority...</option>
          {PRIORITY_OPTIONS.map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>
        <InlineFieldError message={fieldErrors.priority} />
      </label>

      <label htmlFor="status">
        Status
        <select
          id="status"
          value={formValues.status}
          onChange={(event) => updateField('status', event.target.value)}
          aria-invalid={Boolean(fieldErrors.status)}
        >
          <option value="">Select a status...</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <InlineFieldError message={fieldErrors.status} />
      </label>

      <div className="form-actions">
        <button type="submit" className="button-link" disabled={saving}>
          {saving ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
