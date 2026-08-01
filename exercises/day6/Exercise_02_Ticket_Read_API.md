# Day 6 Exercise 2: Build the Ticket Read API

## Objective

In this exercise, you will create the first real resource endpoint for the Support Desk API.

You have seen how the Asset Tracker API returns a list of assets. Now you will apply the same structure to support tickets.

---

## Scenario

An IT support desk receives tickets from users who need help with technical problems.

Each ticket represents one issue reported by a user.

Example issues:

- Cannot access email
- Laptop is slow
- VPN connection not working
- Printer not responding

---

## Your Task

Create an endpoint that returns a list of support tickets.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tickets` | Return all support tickets |

---

## Required Files

Create the following files in your Support Desk project:

```text
dto/TicketResponse.java
service/TicketService.java
controller/TicketController.java
```

---

## Ticket Fields

Each ticket response should include:

| Field | Example |
|---|---|
| `id` | `T001` |
| `title` | `Cannot access email` |
| `description` | `User cannot login to company email account.` |
| `category` | `Email` |
| `priority` | `HIGH` |
| `status` | `OPEN` |
| `createdBy` | `amir@example.com` |
| `createdAt` | `2026-07-03` |

---

## Requirements

Your API must:

1. Return a list of at least three hardcoded tickets.
2. Use a response DTO for ticket data.
3. Use a service class to store and return the ticket list.
4. Use a controller class to expose the endpoint.
5. Return JSON when `GET /api/tickets` is called.

---

## Important Restriction

Do not put the hardcoded ticket list directly inside the controller.

The controller should call the service.

---

## Testing

Test using:

```http
GET http://localhost:8080/api/tickets
```

Expected response type:

```text
JSON array
```

Example shape:

```json
[
  {
    "id": "T001",
    "title": "Cannot access email",
    "description": "User cannot login to company email account.",
    "category": "Email",
    "priority": "HIGH",
    "status": "OPEN",
    "createdBy": "amir@example.com",
    "createdAt": "2026-07-03"
  }
]
```

You may create your own ticket examples.

---

## Submission

Submit:

1. `TicketResponse.java`
2. `TicketService.java`
3. `TicketController.java`
4. Test output from `GET /api/tickets`

---

## Completion Checklist

- [ ] Ticket response DTO created.
- [ ] Ticket service created.
- [ ] Ticket controller created.
- [ ] `GET /api/tickets` works.
- [ ] Response is a JSON array.
- [ ] Ticket list is not stored directly in the controller.
