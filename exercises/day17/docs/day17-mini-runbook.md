# Day 17 Mini Runbook

## Purpose

This runbook explains how to observe, troubleshoot, and containerise the backend.

## Health check

```bash
curl http://localhost:8080/api/health
```

Expected result: backend responds successfully.

## Readiness check

```bash
curl http://localhost:8080/api/readiness
```

Expected result:

```json
{
  "status": "READY",
  "database": "CONNECTED"
}
```

If the response says `NOT_READY`, check MongoDB.

## Request timing logs

Look for logs like:

```text
requestId=ab12cd34 method=GET path=/api/v1/assets/paged status=200 durationMs=42
```

Useful fields:

- `requestId`: helps trace one request
- `method`: HTTP method
- `path`: endpoint called
- `status`: HTTP response status
- `durationMs`: request duration

## Common HTTP status codes

| Code | Meaning | Common cause |
|---|---|---|
| 200 | OK | Request succeeded |
| 400 | Bad Request | Invalid input or pagination |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Logged in but wrong role |
| 404 | Not Found | ID or endpoint not found |
| 409 | Conflict | Duplicate asset tag or serial number |
| 500 | Server Error | Backend bug or unexpected failure |
| 503 | Service Unavailable | Readiness check failed |

## Sensitive data that must not be logged

- Passwords
- JWT tokens
- Full `Authorization` headers
- API keys
- Database passwords
- Private customer data
- Real secrets from `.env`

## Docker backend checks

Build image:

```bash
docker build -t asset-tracker-api:day17 .
```

Run container:

```bash
docker run --rm --name asset-tracker-api-day17 \
  --env-file .env \
  -e SPRING_PROFILES_ACTIVE=docker \
  -p 8080:8080 \
  asset-tracker-api:day17
```

View logs in another terminal:

```bash
docker logs asset-tracker-api-day17
```

## Docker localhost note

Inside a container, `localhost` means the container itself. To connect to MongoDB running on the laptop through Docker Desktop, use:

```text
host.docker.internal
```

Day 18 will solve this properly with Docker Compose service names.
