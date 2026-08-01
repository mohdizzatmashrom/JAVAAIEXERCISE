# Day 13 Exercise 4 - Submit Ticket To Backend

## Scenario

The form should send ticket data to the protected backend API.

## Task

Add API helper functions:

```js
createTicket(token, payload)
updateTicket(id, token, payload)
```

Use the logged-in token from `AuthContext`.

## Requirements

- Show loading state while saving.
- Show success message when saved.
- Show backend error message if the request fails.

## Expected result

A valid ticket form creates or updates a ticket in MongoDB.
