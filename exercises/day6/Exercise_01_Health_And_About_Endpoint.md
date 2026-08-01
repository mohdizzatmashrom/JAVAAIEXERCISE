# Day 6 Exercise 1: Health and About Endpoints

## Objective

In this exercise, you will create your first Spring Boot REST endpoints for the Support Desk API.

You have seen how the trainer's Asset Tracker API exposes a simple health endpoint. Now you will create similar starter endpoints for your own Support Desk API.

---

## Scenario

You are building a backend API for an IT support ticket system.

The system will eventually allow users to create and manage support tickets.

Before building ticket endpoints, you need to prove that your Spring Boot application is running and responding to HTTP requests.

---

## Project

Use project:

```text
support-desk-api
```

Recommended package:

```text
com.example.supportdesk
```

---

## Your Task

Create a controller that provides two endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check whether the API is running |
| GET | `/api/about` | Return basic information about the API |

---

## Requirements

### 1. Health Endpoint

The health endpoint should return a JSON response containing:

- `status`
- `service`

Example response shape:

```json
{
  "status": "UP",
  "service": "support-desk-api"
}
```

---

### 2. About Endpoint

The about endpoint should return a JSON response containing:

- `appName`
- `version`
- `description`

Example response shape:

```json
{
  "appName": "Support Desk API",
  "version": "1.0.0",
  "description": "API for managing IT support tickets"
}
```

You may choose your own wording for the values.

---

## Testing

Test your endpoints using the browser or a `.http` file.

```http
GET http://localhost:8080/api/health
```

```http
GET http://localhost:8080/api/about
```

---

## Submission

Submit:

1. Your controller file.
2. Screenshot or copied response output for both endpoints.

---

## Completion Checklist

- [ ] Application runs successfully.
- [ ] `GET /api/health` returns JSON.
- [ ] `GET /api/about` returns JSON.
- [ ] No error is shown in the terminal.
