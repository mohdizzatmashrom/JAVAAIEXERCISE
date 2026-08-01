# Day 7 Exercise 4: Save New Tickets to MongoDB

## Objective

In this exercise, you will update your ticket creation endpoint so new tickets are saved into MongoDB.

---

## Endpoint to Update

```text
POST /api/tickets
```

---

## Scenario

A user submits a support ticket.

The API should receive the request, validate it, create a Ticket document, save it into MongoDB, and return a response.

---

## Task 1: Use the Existing Request DTO

Use your existing create-ticket request DTO.

It should contain fields such as:

```text
title
description
category
priority
createdBy
```

Do not ask the user to provide the ticket status.

The backend should set the default status.

---

## Task 2: Create a Ticket Model Object

Inside your service, create a Ticket model object using the request data.

Set default values where needed.

For example:

```text
status = OPEN
```

You may use a simple date string for `createdAt` for now.

---

## Task 3: Save the Ticket

Save the ticket using your repository.

After saving, return a response DTO.

---

## Requirements

Your endpoint must:

1. Accept a JSON request body.
2. Validate required fields.
3. Save the ticket into MongoDB.
4. Return `201 Created` when successful.
5. Return `400 Bad Request` for invalid input.
6. Return a response DTO, not the raw database model.

---

## Testing

Test a valid request:

```http
POST http://localhost:8080/api/tickets
Content-Type: application/json

{
  "title": "Cannot access email",
  "description": "User cannot login to company email account.",
  "category": "Email",
  "priority": "HIGH",
  "createdBy": "amir@example.com"
}
```

Test an invalid request:

```http
POST http://localhost:8080/api/tickets
Content-Type: application/json

{
  "title": "",
  "description": "",
  "category": "",
  "priority": "",
  "createdBy": ""
}
```

Then verify using:

```http
GET http://localhost:8080/api/tickets
```

Also check MongoDB Compass.

---

## Submission

Submit:

1. Updated `TicketService.java`
2. Updated `TicketController.java` if changed
3. Updated `.http` file
4. Screenshot or note showing the new ticket in MongoDB Compass
