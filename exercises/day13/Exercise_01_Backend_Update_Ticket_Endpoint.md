# Day 13 Exercise 1 - Add Backend Update Endpoint

## Scenario

Your Support Desk Ticket API already has protected ticket endpoints. Today you will add an update endpoint so the frontend can edit an existing ticket.

## Task

Create an `UpdateTicketRequest` DTO with:

- title
- description
- category
- priority
- status

Add a service method:

```java
public TicketResponse updateTicket(String id, UpdateTicketRequest request)
```

Add a controller endpoint:

```http
PUT /api/v1/tickets/{id}
```

## Validation

- title is required
- description is required
- category is required
- priority must be LOW, MEDIUM or HIGH
- status must be OPEN, IN_PROGRESS or CLOSED

## Expected result

A valid PUT request updates a ticket and returns the updated ticket response.
