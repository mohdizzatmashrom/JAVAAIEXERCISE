# Day 16 Exercise 2 - Backend Ticket Service Refactor

## Scenario

Your `TicketService` works, but the create and update logic may contain repeated validation, status handling or lookup code.

## Task

Use the Generate → Explain → Test pattern to refactor your `TicketService`.

## Rules

- Do not change public endpoint URLs.
- Do not change DTO names unless approved by the instructor.
- Do not change response shape.
- Extract repeated logic into private helper methods.
- Keep the refactor small.

## Suggested helper methods

```java
private Ticket findTicketOrThrow(String id)
private String normalizeRequired(String value)
private String normalizeStatus(String status)
private String normalizePriority(String priority)
```

## Expected output

- Updated `TicketService.java`
- Before/after explanation
- HTTP evidence that create, update and error paths still work
