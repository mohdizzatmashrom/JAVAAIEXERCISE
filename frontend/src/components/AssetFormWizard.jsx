import { useRef, useState } from 'react';
import FormStepIndicator from './FormStepIndicator.jsx';
import InlineFieldError from './InlineFieldError.jsx';
import ErrorMessage from './ErrorMessage.jsx';

const STATUS_OPTIONS = ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE'];

export const emptyAssetForm = {
  assetTag: '',
  name: '',
  category: '',
  serialNumber: '',
  status: 'AVAILABLE',
  location: '',
  assignedTo: ''
};

export default function AssetFormWizard({
  mode = 'create',
  initialValues = emptyAssetForm,
  onSubmit,
  saving = false,
  serverError = '',
  successMessage = ''
}) {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({ ...emptyAssetForm, ...initialValues });
  const [fieldErrors, setFieldErrors] = useState({});
  const reviewCheckboxRef = useRef(null);

  const isEditMode = mode === 'edit';

  function updateField(fieldName, value) {
    setFormValues((current) => ({
      ...current,
      [fieldName]: value
    }));

    setFieldErrors((current) => ({
      ...current,
      [fieldName]: ''
    }));
  }

  function validateStep(stepToValidate) {
    const errors = {};

    if (stepToValidate === 1) {
      if (!formValues.assetTag.trim()) {
        errors.assetTag = 'Asset tag is required.';
      } else if (!/^[A-Z0-9-]+$/.test(formValues.assetTag.trim())) {
        errors.assetTag = 'Use uppercase letters, numbers and hyphens only.';
      }

      if (!formValues.name.trim()) {
        errors.name = 'Asset name is required.';
      } else if (formValues.name.trim().length < 3) {
        errors.name = 'Asset name must be at least 3 characters.';
      }

      if (!formValues.category.trim()) {
        errors.category = 'Category is required.';
      }

      if (!formValues.serialNumber.trim()) {
        errors.serialNumber = 'Serial number is required.';
      }
    }

    if (stepToValidate === 2) {
      if (!formValues.location.trim()) {
        errors.location = 'Location is required.';
      }

      if (!STATUS_OPTIONS.includes(formValues.status)) {
        errors.status = 'Choose a valid status.';
      }

      if (formValues.assignedTo.trim() && !formValues.assignedTo.includes('@')) {
        errors.assignedTo = 'Assigned user should look like an email address.';
      }
    }

    if (stepToValidate === 3 && !reviewCheckboxRef.current?.checked) {
      errors.review = 'Please confirm that you reviewed the asset details.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function goToNextStep() {
    if (validateStep(step)) {
      setStep((current) => Math.min(current + 1, 3));
    }
  }

  function goToPreviousStep() {
    setFieldErrors({});
    setStep((current) => Math.max(current - 1, 1));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    const payload = {
      assetTag: formValues.assetTag.trim(),
      name: formValues.name.trim(),
      category: formValues.category.trim(),
      serialNumber: formValues.serialNumber.trim(),
      status: formValues.status,
      location: formValues.location.trim(),
      assignedTo: formValues.assignedTo.trim() || null
    };

    await onSubmit(payload);
  }

  return (
    <form className="card asset-form" onSubmit={handleSubmit} noValidate>
      <div className="section-heading">
        <p className="eyebrow">Day 13 form wizard</p>
        <h2>{isEditMode ? 'Update Asset' : 'Create Asset'}</h2>
        <p>
          Controlled inputs, client-side validation, inline errors and an uncontrolled review checkbox.
        </p>
      </div>

      <FormStepIndicator currentStep={step} />

      {serverError && <ErrorMessage message={serverError} />}
      {successMessage && <p className="message success-message">{successMessage}</p>}

      {step === 1 && (
        <section className="form-grid" aria-label="Asset identity">
          <label htmlFor="assetTag">
            Asset Tag
            <input
              id="assetTag"
              value={formValues.assetTag}
              onChange={(event) => updateField('assetTag', event.target.value.toUpperCase())}
              aria-describedby="assetTag-error"
            />
            <InlineFieldError message={fieldErrors.assetTag} />
          </label>

          <label htmlFor="name">
            Asset Name
            <input
              id="name"
              value={formValues.name}
              onChange={(event) => updateField('name', event.target.value)}
              aria-describedby="name-error"
            />
            <InlineFieldError message={fieldErrors.name} />
          </label>

          <label htmlFor="category">
            Category
            <input
              id="category"
              value={formValues.category}
              onChange={(event) => updateField('category', event.target.value)}
              aria-describedby="category-error"
            />
            <InlineFieldError message={fieldErrors.category} />
          </label>

          <label htmlFor="serialNumber">
            Serial Number
            <input
              id="serialNumber"
              value={formValues.serialNumber}
              onChange={(event) => updateField('serialNumber', event.target.value)}
              aria-describedby="serialNumber-error"
            />
            <InlineFieldError message={fieldErrors.serialNumber} />
          </label>
        </section>
      )}

      {step === 2 && (
        <section className="form-grid" aria-label="Location and status">
          <label htmlFor="location">
            Location
            <input
              id="location"
              value={formValues.location}
              onChange={(event) => updateField('location', event.target.value)}
              aria-describedby="location-error"
            />
            <InlineFieldError message={fieldErrors.location} />
          </label>

          <label htmlFor="status">
            Status
            <select
              id="status"
              value={formValues.status}
              onChange={(event) => updateField('status', event.target.value)}
              aria-describedby="status-error"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <InlineFieldError message={fieldErrors.status} />
          </label>

          <label htmlFor="assignedTo" className="form-grid-full">
            Assigned To Optional
            <input
              id="assignedTo"
              value={formValues.assignedTo}
              onChange={(event) => updateField('assignedTo', event.target.value)}
              placeholder="user@example.com"
              aria-describedby="assignedTo-error"
            />
            <InlineFieldError message={fieldErrors.assignedTo} />
          </label>
        </section>
      )}

      {step === 3 && (
        <section aria-label="Review asset details">
          <div className="review-grid">
            {Object.entries(formValues).map(([key, value]) => (
              <div key={key} className="info-item">
                <span>{formatLabel(key)}</span>
                <strong>{value || 'Not assigned'}</strong>
              </div>
            ))}
          </div>

          <label className="review-check">
            <input ref={reviewCheckboxRef} type="checkbox" />
            I have reviewed the asset details and they are ready to submit.
          </label>
          <InlineFieldError message={fieldErrors.review} />
        </section>
      )}

      <div className="form-actions">
        {step > 1 && (
          <button type="button" className="button-link secondary" onClick={goToPreviousStep}>
            Back
          </button>
        )}

        {step < 3 && (
          <button type="button" className="button-link" onClick={goToNextStep}>
            Continue
          </button>
        )}

        {step === 3 && (
          <button type="submit" className="button-link" disabled={saving}>
            {saving ? 'Saving...' : isEditMode ? 'Update Asset' : 'Create Asset'}
          </button>
        )}
      </div>
    </form>
  );
}

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (letter) => letter.toUpperCase());
}
