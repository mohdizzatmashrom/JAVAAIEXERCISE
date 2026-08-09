# Day 16 Exercise 7 - AI Regression Check

## Scenario

You used AI to refactor part of the Support Desk Ticket project. The code looks cleaner, but you must prove it did not break existing behaviour.

## Task

Create a regression checklist for your refactor.

Include checks for:

```text
1. Login
2. Protected ticket list
3. Create ticket form
4. Edit ticket form
5. API request headers
6. Validation rules
7. 401 handling
8. 403 handling
9. Unit tests
10. E2E smoke test or manual smoke test
```

## AI prompt to use

```text
Review this refactor as a regression risk.

Compare the old and new behaviour. List anything that might have changed accidentally, especially route paths, request payloads, auth headers, validation, error handling and UI states.

Do not rewrite the code yet. First produce a risk checklist.
```

## Submission

Submit:

```text
- your regression checklist
- one example of a risk AI identified
- one test or manual check you used to confirm behaviour still works
```
