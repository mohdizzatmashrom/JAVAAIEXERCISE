# Day 16 Exercise 4 - Generate Then Harden Tests (Answer)

## AI Draft vs Hardened Tests

The tests in `frontend/src/utils/ticketFormValidation.test.js` were initially drafted by an AI assistant and then manually hardened. The final file contains **19 tests** across three `describe` blocks.

---

## What the AI Draft Covered

The AI-generated draft included 10 basic tests:

| # | Area | What it tested |
|---|------|----------------|
| 1 | `validateTicketFormStep` | All empty fields produce 5 errors |
| 2 | `validateTicketFormStep` | All valid fields produce 0 errors |
| 3 | `validateTicketFormStep` | Whitespace-only strings treated as empty |
| 4 | `validateTicketFormStep` | Step-scoped validation (only one field checked) |
| 5 | `validateTicketFormStep` | Valid single step produces 0 errors |
| 6 | `normalizeTicketFormPayload` | Trims whitespace from title/description |
| 7 | `normalizeTicketFormPayload` | Handles missing/undefined values |
| 8 | `normalizeTicketFormPayload` | Strips extra keys from payload |
| 9 | `formatTicketFormLabel` | Known keys return human-readable labels |
| 10 | `formatTicketFormLabel` | Unknown key returns raw key |

---

## Improvements Made During Hardening

### 1. Added required-field edge cases (+2 tests)

- **null/undefined values** — The AI draft only tested empty strings. Added a test that passes `null` and `undefined` for every required field, proving the validator handles all "empty-like" inputs.
- **Mixed valid/invalid fields** — Added a test where some fields are filled and others are empty, verifying that errors are reported *only* for the empty fields (not a blanket failure).

### 2. Added invalid priority and status tests (+3 tests)

The AI draft completely missed this area. Three new tests document the current behaviour:

- **Unrecognised priority value (`"CRITICAL"`)** — The front-end validator only checks presence, not allowed values. The test asserts that `"CRITICAL"` passes validation, documenting that value-level enforcement is the backend's responsibility.
- **Unrecognised status value (`"RESOLVED"`)** — Same rationale; the test proves the front-end does not reject unknown statuses.
- **Empty priority and empty status** — Confirms that while invalid values pass, *missing* values are still rejected. This pins down the exact boundary of the validator.

### 3. Strengthened payload normalization tests (+3 tests)

- **Internal whitespace preservation** — The AI draft only tested simple trim. Added a test with `"  fix   login   crash  "` to verify that internal spaces are preserved while edges are trimmed.
- **Immutability** — Added a test that verifies `normalizeTicketFormPayload` does **not** mutate the original input object. The AI draft missed this side-effect check.
- **Whitespace-only → empty string** — Added a test confirming that whitespace-only strings (`"   "`, `"\t\n"`) are converted to `""` in the payload, not left as-is.

### 4. Strengthened formatTicketFormLabel (+1 test)

- **Empty string key** — Added a test for `formatTicketFormLabel('')` to cover the boundary case.
- **Additional unknown key** — Added a second unknown key (`'id'`) to avoid over-fitting to a single example.

### 5. Hardening checklist applied

| Checklist item | How it was applied |
|----------------|--------------------|
| **Clear test names** | Every `it()` block uses a full sentence describing the exact scenario and expected outcome, e.g. *"does not reject an unrecognised priority value because only presence is validated"* |
| **Avoid testing implementation details** | Tests assert on the *output* (error messages, payload shape) rather than internal variables or loop counts. No test checks how many iterations the validator performed. |
| **Test behaviour, not structure** | Tests verify *what* the function does (returns errors, trims strings, strips keys) not *how* it does it (no checks on object key order beyond the expected-key test, which verifies the public contract). |
| **Specific assertions** | Each test uses precise assertions: `toBe('Title is required.')` instead of just `toBeTruthy()`, `toBeUndefined()` for absent keys, `toHaveLength(2)` for exact error counts. |

---

## Final Test Count

| Function | Tests |
|----------|-------|
| `validateTicketFormStep` | 10 |
| `normalizeTicketFormPayload` | 6 |
| `formatTicketFormLabel` | 3 |
| **Total** | **19** |

All 19 tests pass with `npx vitest run`.
