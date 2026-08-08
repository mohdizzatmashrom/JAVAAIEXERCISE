# Day 15 Exercise 5 - Test Ticket Form Validation

## Scenario

The ticket form should block incomplete data before sending a request to the backend.

## Files to test

```text
frontend/src/components/TicketFormWizard.jsx
```

## Task

Write tests for:

1. Empty required fields show inline errors.
2. A valid form calls the submit handler with clean payload data.
3. The save button shows a saving state when the form is submitting.

## Suggested tools

Use:

```js
import userEvent from '@testing-library/user-event';
```

`userEvent` lets your test behave more like a real user by typing into inputs and clicking buttons.

## Expected result

The form should not call `onSubmit` when required fields are missing. It should call `onSubmit` when all required fields are valid.
This test protects one of the most important frontend flows: user input → validation → submit.
