# Day 6 Exercise 5: Create an HTTP Test File

## Objective

In this exercise, you will create a `.http` file to test the Support Desk API endpoints you built today.

This helps you verify that your API works without needing a frontend page.

---

## Scenario

Backend APIs are usually tested by sending HTTP requests and checking:

- HTTP method
- URL
- status code
- request body
- response body

Today, you will create a repeatable test file for your Support Desk API.

---

## Your Task

Create a file:

```text
requests/day06-tickets.http
```

Add requests to test all endpoints completed today.

---

## Required Requests

Your file must include tests for:

1. Health endpoint
2. About endpoint
3. Get all tickets
4. Get one existing ticket
5. Get one missing ticket
6. Create a valid ticket
7. Create an invalid ticket

---

## Required Test Cases

### Health

```http
GET http://localhost:8080/api/health
```

### About

```http
GET http://localhost:8080/api/about
```

### Get all tickets

```http
GET http://localhost:8080/api/tickets
```

### Get one ticket

Use one valid ticket ID from your own data.

### Get missing ticket

Use an ID that does not exist.

### Create valid ticket

Send a complete JSON request body.

### Create invalid ticket

Send a JSON request body with missing or blank required fields.

---

## What to Observe

For each request, check:

| Test | Expected Status |
|---|---|
| Health | 200 |
| About | 200 |
| Get all tickets | 200 |
| Get existing ticket | 200 |
| Get missing ticket | 404 |
| Create valid ticket | 201 |
| Create invalid ticket | 400 |

---

## Submission

Submit:

1. `requests/day06-tickets.http`
2. A short note listing which endpoints worked
3. One example of a successful response
4. One example of an error response