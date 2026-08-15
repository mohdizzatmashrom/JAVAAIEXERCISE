# D17 Exercise 07 — Backend Dockerfile

## Goal

Create a Dockerfile for your Support Desk Spring Boot backend.

## Requirements

Your Dockerfile must:

1. Use a build stage.
2. Use a runtime stage.
3. Build the JAR inside Docker.
4. Copy only the final JAR into the runtime image.
5. Expose port 8080.
6. Not contain secrets.

## Build command

```bash
docker build -t support-desk-api:day17 .
```

## Submission

Submit the Dockerfile and build output.
