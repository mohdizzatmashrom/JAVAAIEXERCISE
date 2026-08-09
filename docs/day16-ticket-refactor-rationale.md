# Day 16 – Ticket Refactor Rationale

## Files changed

### Backend
- `src/main/java/com/example/supportdesk/service/TicketService.java`

### Frontend
- `frontend/src/utils/ticketFormValidation.js` (new)
- `frontend/src/utils/ticketFormValidation.test.js` (new)
- `frontend/src/components/TicketFormWizard.jsx` (updated – inline validation removed)

---

## What behaviour was preserved

- All public REST endpoint URLs remain unchanged (`/api/v1/tickets`).
- Request and response DTOs (`CreateTicketRequest`, `UpdateTicketRequest`, `TicketResponse`) are identical.
- HTTP status codes for every path (201 Created, 200 OK, 400 Bad Request, 404 Not Found) are unchanged.
- The ticket form UI looks the same – same fields, same steps, same validation messages.
- Create and edit ticket flows still work end-to-end.
- Authentication and authorisation are unaffected.

---

## What logic was extracted

### Backend – `TicketService.java`

| Helper method | Purpose |
|---|---|
| `findTicketOrThrow(String id)` | Consolidated duplicate `findById` + 404 throw logic that was repeated in `getTicketById()` and `updateTicket()`. |
| `normalizeRequired(String value)` | Trims whitespace from required string fields (title, description, category, createdBy). Applied in both `createTicket()` and `updateTicket()`. |
| `normalizePriority(String priority)` | Trims, uppercases, and validates priority against `ALLOWED_PRIORITIES`. Applied in both `createTicket()` and `updateTicket()`. |
| `normalizeStatus(String status)` | Trims, uppercases, and validates status against `ALLOWED_STATUSES`. Applied in `updateTicket()`. |
| `validatePriority(String priority)` | Rejects values outside LOW, MEDIUM, HIGH with `InvalidRequestException`. |
| `validateStatus(String status)` | Rejects values outside OPEN, IN_PROGRESS, CLOSED with `InvalidRequestException`. |

**Bug fixed during refactor:** `createTicket()` previously skipped priority validation and trimming. After the refactor, priority is consistently normalised and validated on both create and update.

### Frontend – `ticketFormValidation.js`

| Exported function | Purpose |
|---|---|
| `validateTicketFormStep(formValues, stepToValidate, reviewConfirmed)` | Validates required fields either for a single step or the entire form. Returns an errors object. |
| `normalizeTicketFormPayload(formValues)` | Builds a clean, trimmed payload with only the expected keys ready to send to the backend. |
| `formatTicketFormLabel(key)` | Converts a field key (e.g. `"title"`) into a human-readable label (e.g. `"Title"`). |

---

## Why the new version is easier to maintain

1. **Single source of truth for validation rules** – priority/status allowed values and required-field checks live in one place. Changing an allowed status value now requires editing only one line.
2. **Smaller public methods** – `createTicket()` and `updateTicket()` now read as high-level business workflows rather than mixing validation, normalisation, and persistence in the same block.
3. **Testable without the UI** – front-end validation can be verified with fast unit tests instead of manually clicking through the form wizard.
4. **Consistent behaviour** – both create and update paths now apply identical normalisation and validation, eliminating a class of data-inconsistency bugs.
5. **Easier onboarding** – a new developer can read the helper method names and immediately understand what the service does.

---

## Tests and HTTP requests run

### Backend – HTTP integration tests (9 tests, all passed)

| # | Test | Expected | Path | Result |
|---|------|----------|------|--------|
| 1 | CREATE ticket with whitespace-padded fields | 201, fields trimmed | Happy | PASS |
| 2 | GET ticket by ID | 200 | Happy | PASS |
| 3 | GET nonexistent ticket | 404 | Error | PASS |
| 4 | UPDATE ticket with whitespace-padded fields | 200, fields trimmed | Happy | PASS |
| 5 | UPDATE with invalid priority (`URGENT`) | 400 | Error | PASS |
| 6 | UPDATE with invalid status (`RESOLVED`) | 400 | Error | PASS |
| 7 | UPDATE nonexistent ticket | 404 | Error | PASS |
| 8 | CREATE with invalid priority (`CRITICAL`) | 400 | Error | PASS |
| 9 | GET all tickets – data integrity check | 200 | Happy | PASS |

Evidence file: `requests/day16-refactor-evidence.md`
HTTP file: `requests/day16-refactor.http`

### Frontend – Vitest unit tests (22 tests, all passed)

| Suite | Tests |
|---|---|
| `validateTicketFormStep` | 10 tests – required fields, null/undefined, whitespace-only, step-scoped validation, unrecognised priority/status |
| `normalizeTicketFormPayload` | 6 tests – trimming, internal whitespace, missing values, extra keys filtered, immutability, whitespace-only strings |
| `formatTicketFormLabel` | 3 tests – known labels, unknown keys, empty string |

Test file: `frontend/src/utils/ticketFormValidation.test.js`

---

## Remaining risks

| Risk | Mitigation |
|---|---|
| Older tickets in MongoDB may have inconsistent casing (e.g. `"Medium"`, `"Closed"`) from before the refactor | A one-time migration script could normalise existing records. For now, filtering by exact match may miss legacy data. |
| Front-end validation only checks presence, not value correctness (e.g. `"CRITICAL"` passes the form but is rejected by the backend) | This is by design – backend is the authority. Could add client-side enum validation for better UX. |
| No backend unit tests for `TicketService` helper methods yet – coverage relies on HTTP integration tests | Add JUnit tests for `normalizePriority`, `normalizeStatus`, and `findTicketOrThrow` to get faster feedback. |
| `normalizeRequired` currently only trims; it does not reject blank strings (the backend relies on the front-end to prevent empty submissions) | Add explicit blank-string rejection in `normalizeRequired` or a `@NotBlank` annotation on the DTO. |
