# Day 13 Exercise 5 - Add Edit Ticket Flow

## Scenario

Users should be able to select a ticket and edit it.

## Task

Add an edit route:

```text
/app/tickets/:ticketId/edit
```

When the page opens:

1. Fetch the selected ticket.
2. Pre-fill the form.
3. Submit changes using PUT.

## Expected result

The edit page loads an existing ticket, allows changes, and saves them to the backend.
