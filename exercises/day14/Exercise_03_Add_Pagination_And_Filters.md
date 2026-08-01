# Day 14 Exercise 3 - Add Pagination And Filters

## Scenario

The ticket list should not load every record at once.

## Task

Add support for a paged ticket endpoint such as:

```http
GET /api/v1/tickets/paged?page=0&size=5&sortBy=createdAt&direction=desc
```

Add controls for:

- page size
- next page
- previous page
- sort field
- sort direction
- search text
- status filter

## Expected result

The ticket page displays a paged list and still allows filtering the visible records.
