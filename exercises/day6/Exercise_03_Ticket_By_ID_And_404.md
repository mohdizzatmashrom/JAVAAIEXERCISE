# Day 6 Exercise 3: Ticket by ID and 404 Handling

## Objective

In this exercise, you will add an endpoint to retrieve one support ticket by ID.

You will also handle the case where the ticket does not exist.

---

## Scenario

A support staff member wants to view the details of a specific ticket.

The frontend will call an endpoint such as:

```http
GET /api/tickets/T001
```

If the ticket exists, the API should return that ticket.

If the ticket does not exist, the API should return a clear `404 Not Found` response.

---

## Your Task

Add this endpoint:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tickets/{id}` | Return one support ticket by ID |

---

## Required Behaviour

### Successful request

Request:

```http
GET http://localhost:8080/api/tickets/T001
```

Expected status:

```text
200 OK
```

Expected response type:

```text
One ticket object
```

---

### Missing ticket request

Request:

```http
GET http://localhost:8080/api/tickets/T999
```

Expected status:

```text
404 Not Found
```

Expected response shape:

```json
{
  "message": "Ticket T999 was not found"
}
```

---

## Required Files

You may need to create or update:

```text
TicketService.java
TicketController.java
ResourceNotFoundException.java
GlobalExceptionHandler.java
```

---

## Requirements

Your implementation must:

1. Accept the ticket ID from the URL.
2. Search the existing ticket list.
3. Return the ticket if it exists.
4. Return a `404 Not Found` response if it does not exist.
5. Keep search logic in the service layer.
6. Keep HTTP request mapping in the controller layer.

---

## Testing

Add tests to your `.http` file:

```http
### Get existing ticket
GET http://localhost:8080/api/tickets/T001
```

```http
### Get missing ticket
GET http://localhost:8080/api/tickets/T999
```

---

## Submission

Submit:

1. Updated ticket service.
2. Updated ticket controller.
3. Exception handling files.
4. Test output for one successful request and one missing-ticket request.

---

## Completion Checklist

- [ ] `GET /api/tickets/{id}` works for existing tickets.
- [ ] Missing ticket returns 404.
- [ ] Missing ticket response contains a clear message.
- [ ] Controller does not contain search logic.
- [ ] Service handles the ticket lookup.
