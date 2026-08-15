# D17 Exercise 08 — .dockerignore, Secrets and Run

## Goal

Run your backend container safely.

## Tasks

1. Create `.dockerignore`.
2. Create `.env.example` with placeholder values.
3. Create local `.env` but do not commit it.
4. Run your backend container.
5. Check health/readiness.
6. Inspect Docker logs.

## Required exclusions in `.dockerignore`

```dockerignore
.env
.env.*
!.env.example
secrets/
target/
node_modules/
*.log
```

## Run example

```bash
docker run --rm --name support-desk-api-day17 \
  --env-file .env \
  -e SPRING_PROFILES_ACTIVE=docker \
  -p 8080:8080 \
  support-desk-api:day17
```

## Submission

Submit:

1. `.dockerignore`
2. `.env.example`
3. Docker run evidence
4. Safe log example
5. Short explanation of why real secrets are not committed
