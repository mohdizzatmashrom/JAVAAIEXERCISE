# Day 16 Exercise 1 - AI Refactor Safety Checklist (Answer)

## AI Refactor Safety Checklist — Support Desk Ticket Project

### Files SAFE to share with AI

- ✅ **Java source files** under `src/main/java/com/example/` — controllers, services, models, DTOs, repositories, and exception handlers contain no secrets and are the primary refactor targets.
- ✅ **React frontend source files** under `frontend/src/` and `support-desk-ui/src/` — components, pages, services, utils, and context files are safe to share.
- ✅ **Exercise markdown files** (`exercises/`) and **HTTP request files** (`requests/*.http`) — documentation and API test scripts contain no sensitive data.

### Files that should NOT be shared

- ❌ **`application.properties`** — contains the MongoDB credentials (`appuser` / `appuser123`), the JWT signing secret (`supersecretkey_for_hmac_…`), and database connection details. Never share this file as-is.
- ❌ **Any `.env`, `.env.*`, or `*-secrets.properties` file** — these hold environment-specific secrets and must always be excluded.
- ❌ **`node_modules/`, `target/`, build output, and MongoDB data directories** — these are generated artifacts, not source code, and may contain cached credentials or binary data.

### Secrets that MUST be removed before sharing

- 🔒 **MongoDB password** — `spring.mongodb.password=appuser123` in `application.properties` (line 13).
- 🔒 **JWT secret key** — `app.jwt.secret=supersecretkey_for_hmac_…` in `application.properties` (line 23).
- 🔒 **MongoDB connection URI** (commented out) — `mongodb://app_user:pwd12345@localhost:27017/?authSource=asset_tracker_db` (line 7).
- 🔒 **Any hardcoded admin username or password** in seeder classes (e.g. `UserDataSeeder.java`) — replace with placeholders before sharing.

### Behaviour that must NOT change during the refactor

- 🔐 **Authentication & authorisation flow** — JWT generation, validation, Spring Security filter chain, and role-based endpoint protection must remain intact.
- 🔐 **API contract** — all existing REST endpoints (`/api/tickets`, `/api/v1/tickets`, `/api/auth/login`, `/api/auth/register`, health, reports) must keep the same URL paths, HTTP methods, request bodies, and response shapes.
- 🔐 **Validation rules** — ticket and user input validation (required fields, allowed values, status transitions) must not be weakened.

### Tests and HTTP requests that prove the refactor is safe

- ✔ Run the **Vitest unit tests** in `frontend/src/test/` — ticket filter utilities, summary cards, protected route, and form validation tests must all pass.
- ✔ Run the **Playwright E2E smoke test** (`e2e/day15-smoke.spec.js`) — admin login and navigation through the protected UI must succeed.
- ✔ Execute the **HTTP request files** in `requests/` (e.g. `day14.http`, `day09-auth.http`, `day10-api-quality.http`) — all requests should return the same status codes and response structures as before the refactor.
- ✔ Verify **MongoDB data integrity** — after the refactor, existing tickets in the database must still be readable and no data corruption should occur.
