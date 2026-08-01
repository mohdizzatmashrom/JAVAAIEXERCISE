# Day 8 Exercise 3: Add Ticket Indexes and Logging

## Objective

Add useful MongoDB indexes and basic service logging to your Ticket API.

## Part A: Add indexes

Add indexes to fields that are commonly used for filtering or sorting.

Suggested fields:

```text
status
priority
category
createdBy
createdAt
```

You may also make a field unique only if it truly should not have duplicates.

## Part B: Enable auto index creation

In your local application properties, add:

```properties
spring.data.mongodb.auto-index-creation=true
```

## Part C: Add service logging

Add logs in your `TicketService` for at least:

1. Fetching tickets with filters
2. Fetching paginated tickets
3. Creating a ticket

## Requirements

Your logs should show useful information, such as filter values or created ticket ID.

Do not log passwords, tokens, or sensitive information.

## Submission

Submit:

1. Updated `Ticket` model
2. Updated `TicketService`
3. Screenshot or note showing logs in the terminal
