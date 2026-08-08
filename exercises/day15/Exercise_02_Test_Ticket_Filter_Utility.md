# Day 15 Exercise 2 - Test Ticket Filter Utility

## Scenario

Your Ticket UI allows users to search and filter tickets. This logic should be tested separately from the UI.

## Files to add or edit

```text
frontend/src/utils/tickets.js
frontend/src/utils/tickets.test.js
```

## Task

Create or identify a function similar to:

```js
filterTickets(tickets, searchText, statusFilter)
```

Write tests for:

1. Filtering by search text.
2. Filtering by status.
3. Filtering by search text and status together.
4. Returning all tickets when search is empty and status is `ALL`.

## Sample ticket data

```js
const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', category: 'Email', status: 'OPEN', priority: 'HIGH' },
  { id: 'T002', title: 'Laptop running slowly', category: 'Hardware', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: 'T003', title: 'Password reset request', category: 'Account', status: 'CLOSED', priority: 'LOW' }
];
```

## Expected result

The utility tests should pass without rendering any React component.
