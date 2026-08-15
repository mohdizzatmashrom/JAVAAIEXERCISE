# D17 Exercise 01 — Structured Logs and Request Timing

## Goal

Add request timing logs to your Support Desk API.

## Task

Create a filter that logs:

- request ID
- HTTP method
- request path
- response status
- duration in milliseconds

## Rules

Do not log:

- password
- JWT token
- request body
- Authorization header
- secret values

## Expected log example

```text
requestId=ab12cd34 method=GET path=/api/v1/tickets/paged status=200 durationMs=38
```

## Submission

Submit the filter file and one safe log example.
