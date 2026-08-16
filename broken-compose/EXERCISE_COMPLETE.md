# Day 18 Exercise 05: Broken Docker Compose Troubleshooting Lab - COMPLETED

## Exercise Summary

Successfully completed all parts of the Docker Compose troubleshooting exercise. This exercise simulated a real-world scenario where a semi-working but broken Docker Compose setup needed to be diagnosed and fixed.

---

## Files Created

### 1. Exercise Files
- **broken-compose/compose.broken.yml** - Intentionally broken Docker Compose file with 5 bugs
- **broken-compose/.env.broken.example** - Example environment file (template)
- **broken-compose/.env.broken** - Working environment file with JWT secret added

### 2. Solution Files
- **broken-compose/compose.fixed.yml** - Corrected Docker Compose file with all bugs fixed
- **broken-compose/troubleshooting-report.md** - Detailed troubleshooting report documenting all 5 problems
- **broken-compose/reflection-answers.md** - Comprehensive answers to all 5 reflection questions

---

## Bugs Introduced and Fixed

### Bug 1: Missing APP_JWT_SECRET
- **Symptom:** Docker Compose fails to start with variable interpolation error
- **Root cause:** Required environment variable not provided in .env file
- **Fix:** Added `APP_JWT_SECRET` to `.env.broken`
- **Learning:** Understanding required variable syntax `${VAR:?error}`

### Bug 2: Wrong MongoDB Hostname
- **Symptom:** Backend fails to connect to MongoDB with "Connection refused"
- **Root cause:** Using `localhost:27017` instead of `mongo:27017`
- **Fix:** Changed MongoDB URI to use Docker service name
- **Learning:** Docker container networking and service discovery

### Bug 3: Wrong Health Check Path
- **Symptom:** Backend shows `health: starting` indefinitely
- **Root cause:** Health check hitting `/health` instead of `/api/health`
- **Fix:** Corrected health check endpoint path
- **Learning:** Spring Boot Actuator endpoints and Docker health checks

### Bug 4: Wrong Frontend Port
- **Symptom:** Frontend accessible on port 5174 instead of 5173
- **Root cause:** Hardcoded port mapping instead of using environment variable
- **Fix:** Changed to `${FRONTEND_PORT:-5173}:80`
- **Learning:** Environment variable usage and port configuration

### Bug 5: Missing Health Check Condition
- **Symptom:** Backend starts before MongoDB is ready, causing connection timeouts
- **Root cause:** `depends_on` without `service_healthy` condition
- **Fix:** Added `condition: service_healthy` to depends_on
- **Learning:** Service dependency management and startup ordering

---

## Skills Demonstrated

### 1. Docker Compose Troubleshooting
- Using `docker compose ps` to inspect container status
- Using `docker compose logs` to diagnose failures
- Understanding container states (Created, Running, Healthy, Unhealthy)

### 2. Docker Networking
- Understanding container isolation and network namespaces
- Using service names for inter-container communication
- Difference between localhost (container-scoped) and service names (network-scoped)

### 3. Health Checks vs Running State
- Configuring health checks for different services
- Understanding the difference between process running and application healthy
- Using health checks for service dependency ordering

### 4. Environment Variable Management
- Using `${VAR:-default}` for optional variables with defaults
- Using `${VAR:?error}` for required variables
- Managing secrets and configuration through .env files

### 5. Systematic Debugging
- Observing symptoms before making changes
- Reading and interpreting logs
- Forming hypotheses based on evidence
- Making targeted fixes and verifying results

---

## Verification Results

All final checks passed:
- ✅ Frontend loads at http://localhost:5173
- ✅ Backend health check works at http://localhost:8080/api/health
- ✅ MongoDB container is running and healthy
- ✅ Backend successfully connects to MongoDB
- ✅ Frontend can proxy API requests to backend
- ✅ Data can be reset with `docker compose down -v`
- ✅ Stack can be stopped and restarted successfully

---

## Commands Reference

### Starting the broken stack (for practice):
```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken up --build
```

### Starting the fixed stack:
```bash
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken up --build
```

### Checking status:
```bash
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken ps
```

### Viewing logs:
```bash
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken logs backend
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken logs frontend
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken logs mongo
```

### Stopping and resetting:
```bash
# Stop containers (preserves volumes)
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken down

# Stop and remove volumes (fresh start)
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken down -v
```

---

## Key Learnings

1. **Docker containers are isolated:** Each container has its own network namespace. `localhost` inside a container is not the same as `localhost` on the host.

2. **Service names are DNS hostnames:** In Docker Compose, use service names (e.g., `mongo`, `backend`) to communicate between containers.

3. **Health checks matter:** A running container isn't necessarily a working container. Health checks verify actual application readiness.

4. **Logs are your friend:** Always check logs before making changes. They provide evidence, not guesses.

5. **Environment variables are critical:** Missing or misconfigured environment variables are a common source of failures. Use required variable syntax to catch errors early.

6. **Systematic troubleshooting saves time:** Observe → Hypothesize → Verify → Fix → Verify is more efficient than random changes.

---

## Preparation for Capstone

This exercise directly prepares for Day 19 and Day 20 capstone projects by:

- Building confidence in debugging Docker issues
- Teaching how to read and interpret container logs
- Demonstrating common Docker Compose pitfalls
- Practicing systematic troubleshooting methodology
- Understanding service dependencies and health checks
- Learning to manage environment variables and secrets

These skills are essential for successfully demoing and troubleshooting capstone projects.

---

## Exercise Status: ✅ COMPLETE

All parts (A through F) completed successfully:
- ✅ Part A: Started broken stack and observed status
- ✅ Part B: Investigated backend logs and identified MongoDB connection issue
- ✅ Part C: Investigated frontend logs and identified dependency issues
- ✅ Part D: Created compose.fixed.yml with all bugs corrected
- ✅ Part E: Verified reset and rerun functionality
- ✅ Part F: Wrote comprehensive troubleshooting report
- ✅ Reflection: Answered all 5 reflection questions with detailed explanations
