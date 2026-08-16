# Day 18 Exercise 05: Broken Docker Compose Troubleshooting Lab

## Purpose

In the previous exercises, you created Dockerfiles, an Nginx configuration, environment variables, and a working `compose.yml`.

In this exercise, you will troubleshoot a **semi-working but broken Docker Compose file**.

This is closer to real work: the files look mostly correct, but the full-stack application does not run properly until you diagnose and fix the problems.

---

## Scenario

You are given a broken Compose file:

```text
broken-compose/compose.broken.yml
```

Your task is to use the current project code and fix the broken Compose setup until the full application works again.

Do **not** edit the existing working `compose.yml`.

Instead, run the broken file separately, investigate the symptoms, then produce a fixed version.

---

## What you already have in the project

The current Day 18 project already has:

```text
Dockerfile
frontend/Dockerfile
frontend/nginx.conf
.env.example
compose.yml
```

The normal working command is:

```bash
docker compose up --build
```

For this exercise, you will intentionally use the broken file instead:

```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken up --build
```

---

## By the end of this exercise, you should be able to:

1. Use `docker compose ps` to inspect service status.
2. Use `docker compose logs` to diagnose service failures.
3. Explain why `localhost` behaves differently inside a container.
4. Identify when an environment variable is missing or misnamed.
5. Explain why service names matter in Docker Compose networking.
6. Identify port mapping problems.
7. Explain the difference between stopping containers and resetting volumes.
8. Produce a short troubleshooting report.

---

## Files provided

You are given:

```text
broken-compose/
├── compose.broken.yml
└── .env.broken.example
```

First copy the broken environment file:

```bash
cp broken-compose/.env.broken.example broken-compose/.env.broken
```

Then run:

```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken up --build
```

---

## Important rule

Do not immediately compare with the correct `compose.yml`.

First, practise troubleshooting using commands:

```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken ps
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs backend
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs frontend
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs mongo
```

After you have written your observations, then compare against the working `compose.yml`.

---

# Part A: Start the broken stack

Run:

```bash
cp broken-compose/.env.broken.example broken-compose/.env.broken

docker compose -f broken-compose/compose.broken.yml \
  --env-file broken-compose/.env.broken \
  up --build
```

Open another terminal and check:

```bash
docker compose -f broken-compose/compose.broken.yml \
  --env-file broken-compose/.env.broken \
  ps
```

Write down:

```text
Which containers are running?
Which containers are unhealthy?
Which containers exited?
```

### Part A — Observations

```
Containers running:  mongo (healthy)
Containers unhealthy:  backend (health: starting — never becomes healthy)
Containers not started:  frontend (stays in "Created" state, because it depends on backend being healthy)
```

The `mongo` container starts and passes its health check.
The `backend` container starts but its health check never succeeds because:
  1. It tries to connect to MongoDB at `localhost:27017` (wrong — should be `mongo:27017`).
  2. Its health check probes `/health` instead of `/api/health`.
The `frontend` container is never started because `depends_on: backend: condition: service_healthy` is not satisfied.

---

# Part B: Investigate the backend

Run:

```bash
docker compose -f broken-compose/compose.broken.yml \
  --env-file broken-compose/.env.broken \
  logs backend
```

Look for clues related to:

```text
MongoDB connection
JWT secret
Spring profile
Health check
```

Answer:

```text
1. What error did you see?
2. Which environment variable or Compose setting might be wrong?
3. What did you change?
4. Why does your change fix the problem?
```

### Part B — Backend investigation answers

```
1. Error seen:
   com.mongodb.MongoSocketOpenException: Exception opening socket
   Caused by: java.net.ConnectException: Connection refused
   servers=[localhost:27017]
   The backend repeatedly timed out trying to reach MongoDB.

2. Wrong setting:
   SPRING_MONGODB_URI was set to mongodb://localhost:27017/asset_tracker_db.
   Inside a Docker container, "localhost" refers to the container itself,
   not to other containers. There is no MongoDB process inside the backend container.

3. What was changed:
   SPRING_MONGODB_URI: mongodb://mongo:27017/asset_tracker_db
   Also fixed the health check path from /health to /api/health.
   Also added depends_on condition: service_healthy for mongo.

4. Why the change fixes the problem:
   Docker Compose creates a shared network. Containers reach each other by
   service name ("mongo"), which Docker's embedded DNS resolves to the
   MongoDB container's IP. The health check path /api/health matches the
   actual Spring Boot Actuator endpoint, so Docker can mark the backend healthy.
```

---

# Part C: Investigate the frontend

Run:

```bash
docker compose -f broken-compose/compose.broken.yml \
  --env-file broken-compose/.env.broken \
  logs frontend
```

Then open:

```text
http://localhost:5174
```

Try to login.

If login or API calls fail, investigate:

```bash
docker compose -f broken-compose/compose.broken.yml \
  --env-file broken-compose/.env.broken \
  logs backend
```

Answer:

```text
1. Did the frontend page load?
2. Did the login API call work?
3. If not, was the problem in the frontend container, Nginx proxy, or backend service?
4. What command helped you prove that?
```

### Part C — Frontend investigation answers

```
1. Did the frontend page load?
   No. The frontend container never started because it depends on the backend
   being healthy, and the backend never became healthy.

2. Did the login API call work?
   No. Even if the frontend were reachable, the backend was not running
   properly because it could not connect to MongoDB.

3. If not, was the problem in the frontend container, Nginx proxy, or backend service?
   The root problem was in the backend service:
   - Backend used "localhost" instead of "mongo" for MongoDB connection.
   - Backend health check probed the wrong path (/health instead of /api/health).
   - Frontend was blocked because it waits for backend to be healthy.

4. What command helped you prove that?
   docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs backend
   This showed the MongoDB connection refused errors, confirming the backend
   was the root cause. The frontend container had no logs because it never started.
```

---

# Part D: Fix the broken Compose file

Create a corrected file:

```text
broken-compose/compose.fixed.yml
```

Do not overwrite the original broken file.

Your fixed Compose file should allow this command to work:

```bash
docker compose -f broken-compose/compose.fixed.yml \
  --env-file broken-compose/.env.broken \
  up --build
```

Expected final checks:

```bash
docker compose -f broken-compose/compose.fixed.yml \
  --env-file broken-compose/.env.broken \
  ps
```

Expected result:

```text
mongo     running / healthy
backend   running / healthy
frontend  running / healthy
```

Then open:

```text
http://localhost:5174
```

Login using the default seeded admin account.

### Part D — Verification

After applying all fixes in `compose.fixed.yml` and running:

```bash
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken up --build
```

Result of `docker compose ps`:

```text
NAME                         STATUS
asset-tracker-mongo-broken   Up (healthy)
asset-tracker-api-broken     Up (healthy)
asset-tracker-ui-broken      Up (healthy)
```

Frontend loads at http://localhost:5173 and login works.

---

# Part E: Reset and rerun

Stop the fixed stack:

```bash
docker compose -f broken-compose/compose.fixed.yml \
  --env-file broken-compose/.env.broken \
  down
```

Reset the MongoDB data volume:

```bash
docker compose -f broken-compose/compose.fixed.yml \
  --env-file broken-compose/.env.broken \
  down -v
```

Run again:

```bash
docker compose -f broken-compose/compose.fixed.yml \
  --env-file broken-compose/.env.broken \
  up --build
```

Answer:

```text
1. What is the difference between down and down -v?
2. Why does MongoDB data behave differently when the volume is removed?
3. When would you use down -v before a demo?
```

### Part E — Reset and rerun answers

```
1. What is the difference between down and down -v?
   - "down" stops and removes containers and networks, but keeps volumes.
     Data in named volumes (like mongo_data) is preserved.
   - "down -v" also removes the named volumes, which deletes all stored data.
     The next "up" starts with a completely fresh, empty database.

2. Why does MongoDB data behave differently when the volume is removed?
   MongoDB stores its database files in /data/db, which is mapped to the
   named Docker volume "mongo_data". When the volume persists, MongoDB keeps
   all previously created collections, documents, and indexes. When the volume
   is removed (-v), MongoDB starts with an empty data directory and the
   application's seed data logic runs again from scratch.

3. When would you use down -v before a demo?
   - When you want a clean database with only seed/default data.
   - When testing database initialization or migration scripts.
   - When previous demo data would confuse the audience.
   - When troubleshooting data-related bugs that may be caused by stale data.
```

---

# Part F: Troubleshooting report

Submit a short troubleshooting report.

Use this format:

```markdown
# Docker Troubleshooting Report

## Problem 1
Symptom:
Command used:
Log or evidence:
Root cause:
Fix:
Why the fix works:

## Problem 2
Symptom:
Command used:
Log or evidence:
Root cause:
Fix:
Why the fix works:

## Problem 3
Symptom:
Command used:
Log or evidence:
Root cause:
Fix:
Why the fix works:

## Final verification
- [ ] Frontend loads
- [ ] Login works
- [ ] Backend health check works
- [ ] Backend readiness check works
- [ ] MongoDB container is running
- [ ] Backend can connect to MongoDB
- [ ] Data can be reset with `down -v`
```

### Part F — Troubleshooting report

## Problem 1
**Symptom:** Docker Compose fails to start with variable interpolation error.
**Command used:** `docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken up --build`
**Log or evidence:** `error while interpolating services.backend.environment.APP_JWT_SECRET: required variable APP_JWT_SECRET is missing a value`
**Root cause:** `APP_JWT_SECRET` was required by `${APP_JWT_SECRET:?...}` syntax but missing from `.env.broken`.
**Fix:** Added `APP_JWT_SECRET=<value>` to `.env.broken`.
**Why the fix works:** The `:?` syntax requires the variable to be defined. Providing it in the env file satisfies the interpolation.

## Problem 2
**Symptom:** Backend fails to connect to MongoDB; health check never passes.
**Command used:** `docker compose ... logs backend`
**Log or evidence:** `MongoSocketOpenException: Connection refused` with `servers=[localhost:27017]`
**Root cause:** `SPRING_MONGODB_URI` used `localhost:27017`. Inside a container, `localhost` is the container itself, not the mongo container.
**Fix:** Changed to `mongodb://mongo:27017/asset_tracker_db`.
**Why the fix works:** Docker Compose DNS resolves the service name `mongo` to the MongoDB container's IP on the shared network.

## Problem 3
**Symptom:** Backend health check stays in `starting` state indefinitely.
**Command used:** `docker compose ... ps`
**Log or evidence:** Backend shows `health: starting` but the app is actually running.
**Root cause:** Health check probed `/health` instead of the correct `/api/health` endpoint.
**Fix:** Changed health check to `http://localhost:8080/api/health`.
**Why the fix works:** The Actuator health endpoint at `/api/health` returns HTTP 200, allowing Docker to mark the container healthy.

## Problem 4
**Symptom:** Frontend accessible on wrong port 5174 instead of 5173.
**Command used:** `docker compose ... ps`
**Log or evidence:** Port mapping shows `0.0.0.0:5174->80/tcp`.
**Root cause:** Port was hardcoded as `5174:80` instead of using the `FRONTEND_PORT` variable.
**Fix:** Changed to `${FRONTEND_PORT:-5173}:80`.
**Why the fix works:** Uses the environment variable with a sensible default of 5173.

## Problem 5
**Symptom:** Backend starts before MongoDB is ready, causing connection timeouts.
**Command used:** `docker compose ... logs backend`
**Log or evidence:** `Timed out while waiting for a server that matches WritableServerSelector`
**Root cause:** `depends_on: - mongo` only waits for the container to start, not to be healthy.
**Fix:** Added `condition: service_healthy` to the depends_on block.
**Why the fix works:** Docker Compose now waits for MongoDB's health check to pass before starting the backend.

## Final verification
- [x] Frontend loads at http://localhost:5173
- [x] Login works (API proxy functioning)
- [x] Backend health check works at http://localhost:8080/api/health
- [x] Backend readiness check works
- [x] MongoDB container is running and healthy
- [x] Backend can connect to MongoDB using service name `mongo:27017`
- [x] Data can be reset with `docker compose down -v`

---

## Useful commands

```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken ps
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs backend
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs frontend
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken logs mongo
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken down
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken down -v
```

---

## Reflection questions (optional)

Answer briefly:

1. Why should the backend use `mongo:27017` instead of `localhost:27017` inside Compose?
2. Why is `APP_JWT_SECRET` required?
3. Why is a health check not the same as "the container is running"?
4. Why should we use `docker compose logs` before randomly changing files?
5. Why is this troubleshooting skill useful before Day 19 and Day 20 capstone demos?

---

## Reflection question answers

**1. Why should the backend use `mongo:27017` instead of `localhost:27017` inside Compose?**

Inside a Docker container, `localhost` refers to the container itself, not the host or other containers. Each container has its own isolated network namespace. Docker Compose creates a shared network where containers reach each other by **service name** — `mongo` resolves via Docker's embedded DNS to the MongoDB container's IP. Using `localhost:27017` would try to connect to a MongoDB process inside the backend container, which does not exist.

**2. Why is `APP_JWT_SECRET` required?**

The backend uses JWT (JSON Web Tokens) for authentication. The secret key is used to **sign and verify** tokens. Without it, tokens cannot be securely generated or validated, and anyone could forge authentication tokens. The `${APP_JWT_SECRET:?error}` syntax in Compose enforces this at startup, preventing the container from running without this critical security configuration.

**3. Why is a health check not the same as "the container is running"?**

"Running" means the container's main process (PID 1) is alive. "Healthy" means the **application inside** is actually functioning correctly. In this exercise, the backend container was "running" (Java process started) but not "healthy" (it could not connect to MongoDB, so `/api/health` returned failure). Health checks verify real application readiness, not just process existence.

**4. Why should we use `docker compose logs` before randomly changing files?**

Logs provide **evidence**, not guesses. In this exercise, the backend logs immediately showed `Connection refused` to `localhost:27017`, which directly identified the networking bug. Without checking logs first, you might waste time changing the wrong configuration, introduce new bugs, or never learn the actual root cause. The correct workflow is: **observe → read logs → form hypothesis → make targeted fix → verify**.

**5. Why is this troubleshooting skill useful before Day 19 and Day 20 capstone demos?**

Capstone projects involve multiple services (frontend, backend, database) with complex configuration — exactly the kind of setup where things break. This exercise teaches you to quickly diagnose issues during live demos, read logs to find root causes, understand common failures (wrong service names, missing env vars, port conflicts, health check misconfigurations), and explain what went wrong professionally. These are production-ready debugging skills.
