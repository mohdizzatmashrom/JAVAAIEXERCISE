# Day 14 Exercise 5 - Ticket Status Update

## Scenario

Users should be able to quickly change ticket status from the list/detail page.

## Task

Add quick status buttons:

```text
OPEN
IN_PROGRESS
CLOSED
```

Use optimistic update:

1. Save the current ticket as backup.
2. Update the UI immediately.
3. Send PUT request to backend.
4. If successful, keep the backend response.
5. If failed, roll back to the backup ticket.

## Expected result

The UI feels faster, but still remains correct if the backend rejects the update.
