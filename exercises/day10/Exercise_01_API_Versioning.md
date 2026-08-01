# Day 10 Exercise 1: Add Versioned Ticket API Endpoints

## Scenario

Yesterday, you protected your Support Desk Ticket API with JWT authentication.
Today, you will improve the API structure by adding a versioned route.

Current route example:

```http
GET /api/tickets
```

New route example:

```http
GET /api/v1/tickets
```

## Learning Objective

By the end of this exercise, you should be able to explain why production APIs often use versioned routes such as `/api/v1`.

## Task

Create a new controller called:

```text
TicketV1Controller
```

Use this base path:

```java
@RequestMapping("/api/v1/tickets")
```

Reuse your existing `TicketService` methods.

## Required Endpoints

```http
GET  /api/v1/tickets
GET  /api/v1/tickets/{id}
POST /api/v1/tickets
```

## Security Rule

Update your security configuration so that:

```text
GET /api/v1/tickets/** requires USER or ADMIN
POST /api/v1/tickets requires USER or ADMIN
```

## Expected Evidence

Add requests to your `.http` file showing that:

1. `/api/v1/tickets` rejects requests without a token.
2. `/api/v1/tickets` works with a valid token.
3. The old `/api/tickets` endpoint still works if you keep it.

## Reflection Question

Why might a company keep both `/api/tickets` and `/api/v1/tickets` temporarily?
