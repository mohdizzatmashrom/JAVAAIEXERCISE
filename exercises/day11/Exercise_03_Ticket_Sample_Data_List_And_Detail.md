# D11 Exercise 03 — Ticket Sample Data, List and Detail

## Goal

Create a list/detail UI using local ticket data.

## Create sample data

Create:

```text
src/data/sampleTickets.js
```

Example ticket:

```js
{
  id: 'ticket-1',
  title: 'Cannot access email',
  category: 'Email',
  priority: 'HIGH',
  status: 'OPEN',
  createdBy: 'ferran@example.com',
  createdAt: '2026-07-09'
}
```

Create at least 5 tickets.

## Create components

```text
src/components/TicketList.jsx
src/components/TicketDetail.jsx
src/components/PriorityBadge.jsx
src/components/StatusBadge.jsx
```

## Requirements

- Display all tickets in a list
- Click a ticket to select it
- Show the selected ticket details
- Use badge components for priority and status

## Submit

Screenshot showing the list and selected ticket detail.
