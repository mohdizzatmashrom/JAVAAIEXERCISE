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
3. Why is a health check not the same as “the container is running”?
4. Why should we use `docker compose logs` before randomly changing files?
5. Why is this troubleshooting skill useful before Day 19 and Day 20 capstone demos?
