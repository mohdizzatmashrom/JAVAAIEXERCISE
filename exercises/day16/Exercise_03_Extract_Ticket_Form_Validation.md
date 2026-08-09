# Day 16 Exercise 3 - Extract Ticket Form Validation

## Scenario

Your ticket form validation is currently inside the form component. This makes the component harder to read and harder to test.

## Task

Create a new file:

```text
frontend/src/utils/ticketFormValidation.js
```

Move validation rules into functions.

## Suggested functions

```js
validateTicketFormStep(formValues, stepToValidate, reviewConfirmed)
normalizeTicketFormPayload(formValues)
formatTicketFormLabel(key)
```

## Requirements

- The ticket form should look the same after refactoring.
- Validation messages should stay the same.
- Create and edit should still work.
- Add at least three unit tests for the validation utility.

## Expected output

- Updated ticket form component
- New validation utility
- Unit tests for validation
