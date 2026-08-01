# Day 10 Exercise 2: Create a Ticket Report by Status

## Scenario

A support manager wants a quick summary of how many tickets are currently open, in progress, or closed.

Instead of returning all tickets, your API should return a grouped count.

## Learning Objective

Use MongoDB aggregation to group documents and count records.

## Required Endpoint

```http
GET /api/v1/reports/tickets-by-status
```

## Example Response

```json
[
  {
    "label": "OPEN",
    "count": 5
  },
  {
    "label": "IN_PROGRESS",
    "count": 3
  },
  {
    "label": "CLOSED",
    "count": 2
  }
]
```

## Suggested Files

```text
ReportCountResponse.java
TicketReportService.java
ReportController.java
```

## Hint

The in-class demo used this pattern:

```java
Aggregation.group("status").count().as("count")
```

## Security Rule

Only logged-in users should be able to call report endpoints.

## Expected Evidence

Add this request to your `.http` file:

```http
GET http://localhost:8080/api/v1/reports/tickets-by-status
Authorization: Bearer {{token}}
```

## Reflection Question

Why is a grouped report endpoint better than asking the frontend to download all tickets and count them manually?
