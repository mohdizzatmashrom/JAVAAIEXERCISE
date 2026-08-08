# Day 15 Exercise 3 - Test Ticket Summary Cards

## Scenario

The dashboard or ticket page shows summary cards such as total tickets, open tickets and closed tickets. These values must remain correct when the ticket list changes.

## Files to add or edit

```text
frontend/src/components/TicketSummaryCards.jsx
frontend/src/components/TicketSummaryCards.test.jsx
```

## Task

Write a component test that renders `TicketSummaryCards` with sample ticket data.

Test that the page displays:

- Total Tickets
- Open
- In Progress
- Closed
- the correct count for each status

## Testing idea

Use React Testing Library:

```js
render(<TicketSummaryCards tickets={sampleTickets} />);
expect(screen.getByText('Total Tickets')).toBeInTheDocument();
```

## Expected result

The test should prove that the summary cards calculate and display the correct numbers.
