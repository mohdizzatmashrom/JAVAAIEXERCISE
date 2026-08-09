# Day 16 Exercise 7 - AI Regression Check (Answer)

## AI Prompt Used

```text
Review this refactor as a regression risk.

Compare the old and new behaviour. List anything that might have changed accidentally, especially route paths, request payloads, auth headers, validation, error handling and UI states.

Do not rewrite the code yet. First produce a risk checklist.
```

---

## Part 1 - Regression Checklist

The refactor touched two areas:
- **Backend**: `TicketService.java` — extracted helper methods (`findTicketOrThrow`, `normalizeRequired`, `normalizePriority`, `normalizeStatus`, `validatePriority`, `validateStatus`)
- **Frontend**: `TicketFormWizard.jsx` — inline validation moved to `ticketFormValidation.js` utility

### 1. Login

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 1.1 | `POST /api/auth/login` with valid credentials returns a JWT | 200 + token in response body | PASS |
| 1.2 | Login with wrong password returns an error | 401 or 403 with error message | PASS |
| 1.3 | Frontend `LoginPage.jsx` stores the token in `localStorage` under `assetTrackerAuth` | Token persists after page reload | PASS |
| 1.4 | Auth flow (`AuthContext.login`) is completely untouched by the refactor | No code changes in `AuthContext.jsx` or `LoginPage.jsx` | PASS |

### 2. Protected Ticket List

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 2.1 | `GET /api/v1/tickets` with a valid Bearer token returns all tickets | 200 + JSON array | PASS |
| 2.2 | `GET /api/v1/tickets` without a token returns 401 or 403 | Unauthenticated request is rejected | PASS |
| 2.3 | `ProtectedRoute` component still redirects unauthenticated users to `/login` | `<Navigate to="/login" replace>` fires when `isAuthenticated` is false | PASS |
| 2.4 | Ticket list data shape is unchanged — same fields (`id`, `title`, `description`, `category`, `priority`, `status`, `createdBy`, `createdAt`) | `TicketResponse` DTO was not modified | PASS |

### 3. Create Ticket Form

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 3.1 | Form renders all fields: title, description, category, priority, status | Same UI as before refactor | PASS |
| 3.2 | Submitting with empty fields shows inline error messages | `"Title is required."`, etc. — same messages as before | PASS |
| 3.3 | Submitting with valid data calls the API and creates a ticket | 201 Created, ticket appears in list | PASS |
| 3.4 | `normalizeTicketFormPayload` trims whitespace before sending | `"  hello  "` → `"hello"` in the request body | PASS |
| 3.5 | The form component imports `validateTicketFormStep` and `normalizeTicketFormPayload` from the new utility | Import path is correct; no broken imports | PASS |

### 4. Edit Ticket Form

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 4.1 | Edit form pre-fills with existing ticket data | `initialValues` prop is spread into `formValues` state | PASS |
| 4.2 | Validation rules are identical for create and edit | Same `validateTicketFormStep` function is used for both flows | PASS |
| 4.3 | `PUT /api/v1/tickets/:id` with valid data returns 200 | Ticket is updated in MongoDB | PASS |
| 4.4 | Backend `updateTicket` uses the same `normalizeRequired` / `normalizePriority` / `normalizeStatus` helpers as `createTicket` | Consistent trimming and validation on both paths | PASS |

### 5. API Request Headers

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 5.1 | Every authenticated request includes `Authorization: Bearer <token>` | `httpClient.js` sets the header when `token` is provided | PASS |
| 5.2 | Every request with a body includes `Content-Type: application/json` | `httpClient.js` sets the header when `body !== undefined` | PASS |
| 5.3 | Login request (`POST /api/auth/login`) does NOT include an Authorization header | No token is passed for the login call | PASS |
| 5.4 | No request headers were changed by the refactor | `httpClient.js` was not modified during Day 16 | PASS |

### 6. Validation Rules

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 6.1 | Backend rejects invalid priority (`"CRITICAL"`, `"URGENT"`) with 400 | `validatePriority` throws `InvalidRequestException` | PASS |
| 6.2 | Backend rejects invalid status (`"RESOLVED"`) with 400 | `validateStatus` throws `InvalidRequestException` | PASS |
| 6.3 | Allowed priorities are exactly `LOW`, `MEDIUM`, `HIGH` (case-insensitive input) | `normalizePriority` trims and uppercases before checking | PASS |
| 6.4 | Allowed statuses are exactly `OPEN`, `IN_PROGRESS`, `CLOSED` (case-insensitive input) | `normalizeStatus` trims and uppercases before checking | PASS |
| 6.5 | Frontend validation checks required fields only (not value correctness) | `"CRITICAL"` passes the form but is rejected by the backend — by design | PASS |
| 6.6 | Whitespace-only strings are treated as empty by the frontend validator | `"   "` → `errors.title = "Title is required."` | PASS |
| 6.7 | **NEW**: `createTicket` now validates priority (was missing before refactor) | `normalizePriority` is called in `createTicket` — this is a bug fix, not a regression | PASS |

### 7. 401 Handling (Unauthenticated)

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 7.1 | Request to `GET /api/v1/tickets` without a token returns 401/403 | Spring Security rejects unauthenticated requests | PASS |
| 7.2 | Frontend `httpClient.js` throws an `Error` with the server's message when `response.ok` is false | Error message is displayed to the user | PASS |
| 7.3 | An expired or invalid JWT is rejected by the backend | Spring Security filter chain returns 401 | PASS |
| 7.4 | `ProtectedRoute` prevents unauthenticated users from seeing ticket pages | Redirects to `/login` with `state.from` preserved | PASS |

### 8. 403 Handling (Forbidden / Insufficient Role)

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 8.1 | A non-admin user without the correct role receives 403 on protected endpoints | Spring Security returns 403 | PASS |
| 8.2 | The error response shape is unchanged (`message`, `status`, `errors`, `timestamp`) | `ResourceNotFoundException` and `InvalidRequestException` handlers were not modified | PASS |
| 8.3 | Frontend displays the error message from the 403 response | `httpClient.js` extracts `data.message` for all non-ok responses | PASS |

### 9. Unit Tests

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 9.1 | `validateTicketFormStep` — 10 tests pass | Covers required fields, null/undefined, whitespace, step-scoped validation, invalid priority/status | PASS |
| 9.2 | `normalizeTicketFormPayload` — 6 tests pass | Covers trimming, internal whitespace, missing values, extra keys, immutability, whitespace-only | PASS |
| 9.3 | `formatTicketFormLabel` — 3 tests pass | Covers known labels, unknown keys, empty string | PASS |
| 9.4 | All 19 tests pass with `npx vitest run` | Zero failures | PASS |
| 9.5 | Existing tests in `src/test/` still pass | `sample.test.jsx` (4 tests) unaffected by the refactor | PASS |

### 10. E2E Smoke Test / Manual Smoke Test

| # | Check | Expected result | Status |
|---|-------|-----------------|--------|
| 10.1 | Playwright smoke test: admin logs in successfully | Redirected to `/app/dashboard` | PASS |
| 10.2 | Playwright smoke test: admin navigates to the form page | Form heading is visible | PASS |
| 10.3 | Playwright smoke test: admin fills in the form and submits | "Asset created successfully." message appears | PASS |
| 10.4 | Manual check: create a ticket via the form with whitespace-padded fields | Backend trims fields; ticket displays correctly in the list | PASS |
| 10.5 | Manual check: edit an existing ticket and change its status | 200 response; updated status is reflected in the UI | PASS |
| 10.6 | Manual check: submit the form with all fields empty | Inline validation errors appear; no API call is made | PASS |

---

## Part 2 - Example of a Risk AI Identified

### Risk: `createTicket()` now rejects invalid priority values (behaviour change)

**What changed:**
Before the refactor, `createTicket()` did **not** validate the priority field. A client could send `"priority": "CRITICAL"` or `"priority": "  urgent  "` and the backend would store the value as-is — leading to inconsistent data in MongoDB (e.g. `"Medium"`, `"critical"`, `"URGENT"`).

After the refactor, `createTicket()` calls `normalizePriority()`, which trims, uppercases, and validates the value against `ALLOWED_PRIORITIES = {LOW, MEDIUM, HIGH}`. Now `"CRITICAL"` returns a `400 Bad Request`.

**Why this is a risk:**
- Any existing API client or integration test that sends non-standard priority values on create will now receive a 400 error instead of a 201.
- Older tickets already stored in MongoDB may have inconsistent casing (e.g. `"Medium"`, `"Closed"`) that would not pass the new validation if re-submitted.

**Severity:** Medium — this is actually a **bug fix**, but it changes the observable API contract for the `POST /api/v1/tickets` endpoint.

**Mitigation:**
- Documented in the rationale (`docs/day16-ticket-refactor-rationale.md`) as an intentional behaviour change.
- HTTP Test 8 (`CREATE with invalid priority "CRITICAL"` → 400) confirms the new validation works.
- A one-time MongoDB migration script could normalise legacy records to match the new rules.

---

## Part 3 - Test / Manual Check to Confirm Behaviour Still Works

### HTTP Integration Test: CREATE ticket with whitespace-padded fields (Test 1)

**Request:**
```http
POST http://localhost:8080/api/v1/tickets
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "title": "  Refactor Test Ticket  ",
  "description": "  Testing normalization of input fields  ",
  "category": "  BUG  ",
  "priority": "  high  ",
  "createdBy": "  admin  "
}
```

**Expected:** `201 Created`, all fields trimmed, `priority = "HIGH"`, `status = "OPEN"`

**Actual result:** PASS

```json
{
    "id": "6a77fd4fadee2cae32bf9837",
    "title": "Refactor Test Ticket",
    "description": "Testing normalization of input fields",
    "category": "BUG",
    "priority": "HIGH",
    "status": "OPEN",
    "createdBy": "admin",
    "createdAt": "2026-08-09T12:08:47.9822686"
}
```

**What this confirms:**
- The endpoint URL (`/api/v1/tickets`) is unchanged.
- The request body shape is unchanged (same DTO fields).
- The `Authorization: Bearer` header is still required and accepted.
- Field normalisation (trim + uppercase) works correctly.
- The response shape and HTTP status code (201) are unchanged.
- The full create flow — from authenticated request through validation, normalisation, persistence, and response mapping — works end-to-end.

Evidence file: `requests/day16-refactor-evidence.md` (9 tests, all passed)
HTTP file: `requests/day16-refactor.http`
