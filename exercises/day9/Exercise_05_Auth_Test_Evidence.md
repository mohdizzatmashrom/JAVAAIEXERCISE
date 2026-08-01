# Day 9 Exercise 5 - Authentication Test Evidence

## Task

Create an HTTP test file for your Support Desk Ticket API.

## File name

```text
requests/day09-auth.http
```

## Your file should test

```text
1. Health endpoint is public
2. Ticket endpoint without token returns 401
3. Register user returns token
4. Login user returns token
5. Ticket endpoint with token returns 200
6. Create ticket with normal USER token returns 403
7. Login admin returns token
8. Create ticket with ADMIN token returns 201
```

## Short written answer

Answer these questions:

```text
1. What is authentication?
2. What is authorisation?
3. What does 401 mean?
4. What does 403 mean?
5. Why do we hash passwords?
6. Where is the JWT placed in an HTTP request?
```
