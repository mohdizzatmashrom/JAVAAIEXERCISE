# Day 9 Exercise 3 - Protect Ticket Endpoints

## Scenario

Your Ticket API should no longer be fully public.

## Task

Use Spring Security to protect your ticket endpoints.

## Public endpoints

These should remain public:

```http
GET /api/health
POST /api/auth/register
POST /api/auth/login
```

## Protected endpoints

These should require login:

```http
GET /api/tickets
GET /api/tickets/{id}
POST /api/tickets
```

## Role rule

For this exercise, use a simple rule:

```text
USER and ADMIN can view tickets.
ADMIN can create tickets.
```

## Expected behaviour

```text
GET /api/tickets without token -> 401
GET /api/tickets with USER token -> 200
POST /api/tickets with USER token -> 403
POST /api/tickets with ADMIN token -> 201
```

## Submission

Submit your `SecurityConfig.java` and HTTP test evidence.
