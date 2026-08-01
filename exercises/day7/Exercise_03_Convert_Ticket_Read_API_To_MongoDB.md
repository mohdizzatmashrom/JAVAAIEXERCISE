# Day 7 Exercise 3: Convert Ticket Read API to MongoDB

## Objective

In this exercise, you will update your Support Desk API so the ticket read endpoints use MongoDB instead of an in-memory list.

---

## Current Situation

Your Day 6 API used a Java list to store ticket data temporarily.

Now your API should read ticket data from MongoDB.

---

## Endpoints to Update

Update these endpoints:

```text
GET /api/tickets
GET /api/tickets/{id}
```

---

## Task 1: Update TicketService

Update your `TicketService` so it uses `TicketRepository`.

The service should no longer depend on an in-memory list for reading tickets.

---

## Task 2: Return All Tickets from MongoDB

Update the method that returns all tickets.

It should retrieve ticket documents from MongoDB, then convert them into response DTOs.

---

## Task 3: Return One Ticket by ID

Update the method that returns one ticket by ID.

If the ticket exists, return the ticket response.

If the ticket does not exist, return a clear `404 Not Found` response using your existing exception-handling approach.

---

## Requirements

Your API must:

1. Read ticket data from MongoDB.
2. Return ticket response DTOs.
3. Keep the controller structure similar to Day 6.
4. Return `404 Not Found` for missing tickets.

---

## Testing

Use your `.http` file or API client to test:

```http
GET http://localhost:8080/api/tickets
```

Then test one existing ticket ID:

```http
GET http://localhost:8080/api/tickets/{id}
```

Then test a missing ticket ID:

```http
GET http://localhost:8080/api/tickets/000000000000000000000000
```

---

## Submission

Submit:

1. Updated `TicketService.java`
2. Updated `.http` test file
3. Short note explaining how you confirmed the data came from MongoDB

---

## Reminder

The controller should not contain database logic.

The controller receives requests.

The service handles application logic.

The repository talks to MongoDB.
