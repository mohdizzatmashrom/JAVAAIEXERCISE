# Day 8 Exercise 2: Add Ticket Pagination and Sorting

## Objective

Add a paginated endpoint to your Support Desk Ticket API.

## Required endpoint

Add:

```text
GET /api/tickets/paged
```

It should support these query parameters:

```text
page
size
sortBy
direction
```

## Example requests

```http
GET http://localhost:8080/api/tickets/paged?page=0&size=5
```

```http
GET http://localhost:8080/api/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc
```

## Requirements

1. Create a new controller method for paged tickets.
2. Use `Page`, `Pageable`, `PageRequest`, and `Sort`.
3. Return a page of ticket response DTOs.
4. Use sensible default values:
   - `page = 0`
   - `size = 5`
   - `sortBy = createdAt`
   - `direction = desc`
5. Test at least two different pages.

## Reminder

Page number starts from `0`, not `1`.

## Submission

Submit the updated controller, service, and `.http` test file.
