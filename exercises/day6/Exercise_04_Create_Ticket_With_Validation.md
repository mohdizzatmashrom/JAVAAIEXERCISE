# Day 6 Exercise 4: Create Ticket with Validation

## Objective

In this exercise, you will add a `POST` endpoint to create a new support ticket.

You will also apply validation so that invalid ticket data is rejected.

---

## Scenario

A user wants to submit a new IT support ticket.

The frontend will send ticket details as JSON.

The backend should validate the request, create the ticket, and return the created ticket with a new ID and default status.

---

## Your Task

Add this endpoint:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tickets` | Create a new support ticket |

---

## Request Body Fields

The client should send:

| Field | Required? | Example |
|---|---|---|
| `title` | Yes | `Cannot access email` |
| `description` | Yes | `User cannot login to email account.` |
| `category` | Yes | `Email` |
| `priority` | Yes | `HIGH` |
| `createdBy` | Yes | `amir@example.com` |

---

## Fields Set by the Backend

The backend should set these values:

| Field | Example |
|---|---|
| `id` | `T004` |
| `status` | `OPEN` |
| `createdAt` | Current date or a fixed date string |

---

## Required Files

Create or update:

```text
dto/CreateTicketRequest.java
service/TicketService.java
controller/TicketController.java
exception/GlobalExceptionHandler.java
```

---

## Validation Rules

Reject the request if any of these fields are blank:

- `title`
- `description`
- `category`
- `priority`
- `createdBy`

Use validation annotations where appropriate.

---

## Successful Request Example

```http
POST http://localhost:8080/api/tickets
Content-Type: application/json

{
  "title": "VPN connection not working",
  "description": "User cannot connect to company VPN from home.",
  "category": "Network",
  "priority": "MEDIUM",
  "createdBy": "siti@example.com"
}
```

Expected status:

```text
201 Created
```

Expected response shape:

```json
{
  "id": "T004",
  "title": "VPN connection not working",
  "description": "User cannot connect to company VPN from home.",
  "category": "Network",
  "priority": "MEDIUM",
  "status": "OPEN",
  "createdBy": "siti@example.com",
  "createdAt": "2026-07-03"
}
```

---

## Invalid Request Example

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

Expected status:

```text
400 Bad Request
```

Expected response should clearly explain the validation problem.

---

## Requirements

Your implementation must:

1. Use a request DTO for the incoming JSON body.
2. Use validation annotations for required fields.
3. Use `@Valid` in the controller.
4. Return `201 Created` for successful creation.
5. Add the new ticket to the in-memory ticket list.
6. Return `400 Bad Request` for invalid input.

---

## Submission

Submit:

1. `CreateTicketRequest.java`
2. Updated `TicketService.java`
3. Updated `TicketController.java`
4. Updated validation error handling if needed
5. Test output for valid and invalid requests

---

## Completion Checklist

- [ ] `POST /api/tickets` works.
- [ ] Valid request returns 201.
- [ ] Created ticket has an ID.
- [ ] Created ticket has status `OPEN`.
- [ ] Invalid request returns 400.
- [ ] Validation response is understandable.
