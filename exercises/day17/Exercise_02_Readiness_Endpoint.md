# D17 Exercise 02 — Readiness Endpoint

## Goal

Add a readiness endpoint to your Support Desk API.

## Endpoint

```http
GET /api/readiness
```

## Required response when ready

```json
{
  "service": "support-desk-api",
  "status": "READY",
  "database": "CONNECTED"
}
```

## Required response when not ready

Return status `503 Service Unavailable` and explain that the database readiness check failed.

## Submission

Submit the controller file and test evidence.
