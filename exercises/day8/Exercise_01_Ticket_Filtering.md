# Day 8 Exercise 1: Add Ticket Filtering

## Objective

Add query parameter filtering to your Support Desk Ticket API.

## Background

Your API already has:

```text
GET /api/tickets
GET /api/tickets/{id}
POST /api/tickets
```

Now improve `GET /api/tickets` so that users can filter tickets.

## Required filters

Your API must support:

```text
GET /api/tickets?status=OPEN
GET /api/tickets?priority=HIGH
GET /api/tickets?category=Email
```

## Requirements

1. Add repository query methods for status, priority, and category.
2. Update the controller to accept optional query parameters.
3. Update the service to call the correct repository method.
4. Return all tickets when no query parameter is provided.
5. Test all endpoints using a `.http` file.

## Restrictions

Do not hardcode filtered lists manually.

Do not create separate endpoints such as:

```text
/api/tickets/status/OPEN
/api/tickets/priority/HIGH
```

Use query parameters.

## Expected behaviour

This request:

```http
GET http://localhost:8080/api/tickets?status=OPEN
```

should return only tickets with status `OPEN`.

## Submission

Submit the updated repository, controller, service, and `.http` test file.
