# Docker Troubleshooting Report

## Problem 1
**Symptom:**  
Docker Compose fails to start with error: `required variable APP_JWT_SECRET is missing a value`

**Command used:**  
```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken up --build
```

**Log or evidence:**  
```
error while interpolating services.backend.environment.APP_JWT_SECRET: required variable APP_JWT_SECRET is missing a value: Set APP_JWT_SECRET in .env.broken file
```

**Root cause:**  
The `compose.broken.yml` file requires `APP_JWT_SECRET` using the `${VAR:?error}` syntax, but the `.env.broken` file did not provide this variable. The backend application requires a JWT secret for token signing.

**Fix:**  
Added `APP_JWT_SECRET` to `.env.broken`:
```yaml
APP_JWT_SECRET=broken-compose-local-dev-secret-at-least-32-characters-long
```

**Why the fix works:**  
The `${VAR:?error}` syntax in Docker Compose requires the variable to be defined. By adding it to the environment file, Docker Compose can successfully interpolate the value and pass it to the backend container.

---

## Problem 2
**Symptom:**  
Backend container starts but fails to connect to MongoDB. The backend health check never passes, and the frontend container never starts because it depends on a healthy backend.

**Command used:**  
```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs backend
```

**Log or evidence:**  
```
com.mongodb.MongoSocketOpenException: Exception opening socket
Caused by: java.net.ConnectException: Connection refused
servers=[localhost:27017]
```

**Root cause:**  
The `SPRING_MONGODB_URI` was set to `mongodb://localhost:27017/asset_tracker_db`. Inside a Docker container, `localhost` refers to the container itself, not other containers. The backend container was trying to connect to MongoDB running inside itself, which doesn't exist.

**Fix:**  
Changed the MongoDB URI to use the Docker Compose service name:
```yaml
SPRING_MONGODB_URI: mongodb://mongo:27017/asset_tracker_db
```

**Why the fix works:**  
Docker Compose creates a default network where containers can reach each other using their service names as hostnames. The `mongo` service name resolves to the MongoDB container's IP address within the Docker network.

---

## Problem 3
**Symptom:**  
Backend container is running but shows `health: starting` indefinitely. The frontend container never starts.

**Command used:**  
```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken ps
```

**Log or evidence:**  
```
NAME                         STATUS
asset-tracker-api-broken     Up (health: starting)
asset-tracker-ui-broken      Created
```

**Root cause:**  
The backend health check was configured to check `/health` instead of `/api/health`:
```yaml
test: ["CMD", "wget", "-q", "--spider", "http://localhost:8080/health"]
```
The Spring Boot Actuator health endpoint is actually at `/api/health`, so the health check always failed.

**Fix:**  
Corrected the health check path:
```yaml
test: ["CMD", "wget", "-q", "--spider", "http://localhost:8080/api/health"]
```

**Why the fix works:**  
The health check now hits the correct endpoint that returns HTTP 200 when the application is ready. Docker marks the container as healthy, allowing dependent services (frontend) to start.

---

## Problem 4
**Symptom:**  
Frontend is accessible on port 5174 instead of the expected port 5173.

**Command used:**  
```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken ps
```

**Log or evidence:**  
```
NAME                        PORTS
asset-tracker-ui-broken     0.0.0.0:5174->80/tcp
```

**Root cause:**  
The port mapping was hardcoded to `5174:80` instead of using the `FRONTEND_PORT` environment variable or defaulting to 5173:
```yaml
ports:
  - "5174:80"
```

**Fix:**  
Changed to use the environment variable with a default:
```yaml
ports:
  - "${FRONTEND_PORT:-5173}:80"
```

**Why the fix works:**  
The frontend now uses the expected port 5173 (or whatever is specified in `FRONTEND_PORT`), matching the documentation and user expectations.

---

## Problem 5
**Symptom:**  
Backend starts before MongoDB is ready, causing connection timeouts and restarts.

**Command used:**  
```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs backend
```

**Log or evidence:**  
```
Waiting for server to become available for operation createIndexes
Timed out while waiting for a server that matches WritableServerSelector
```

**Root cause:**  
The `depends_on` directive only waited for the MongoDB container to start, not for it to be healthy:
```yaml
depends_on:
  - mongo
```

**Fix:**  
Added the `service_healthy` condition:
```yaml
depends_on:
  mongo:
    condition: service_healthy
```

**Why the fix works:**  
Docker Compose now waits for MongoDB's health check to pass before starting the backend. This ensures MongoDB is ready to accept connections when the backend tries to connect.

---

## Final verification
- [x] Frontend loads at http://localhost:5173
- [x] Login works (API proxy functioning)
- [x] Backend health check works at http://localhost:8080/api/health
- [x] Backend readiness check works
- [x] MongoDB container is running and healthy
- [x] Backend can connect to MongoDB using service name `mongo:27017`
- [x] Data can be reset with `docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken down -v`

---

## Summary of all fixes applied in compose.fixed.yml

1. **MongoDB connection**: Changed `localhost:27017` to `mongo:27017`
2. **Health check path**: Changed `/health` to `/api/health`
3. **Port mapping**: Changed `5174:80` to `${FRONTEND_PORT:-5173}:80`
4. **Dependency condition**: Added `condition: service_healthy` to backend's depends_on
5. **Environment variable**: Added `APP_JWT_SECRET` to `.env.broken` file

All fixes ensure the three-tier application (MongoDB → Backend → Frontend) starts correctly and communicates properly within the Docker Compose network.
