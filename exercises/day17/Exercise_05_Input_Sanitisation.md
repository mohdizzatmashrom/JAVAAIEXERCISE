# D17 Exercise 05 — Input Sanitisation

## Goal

Explain and apply simple input sanitisation.

## Tasks

Create a small utility or helper method that can:

1. Trim leading/trailing spaces.
2. Convert empty strings to null where appropriate.
3. Remove control characters from simple text.
4. Normalise code-like fields if needed.

## Important

Do not use sanitisation to hide invalid input. Some input should still be rejected.

## Implementation

### Utility class: `InputSanitizer`

Located at `com.example.assettracker.util.InputSanitizer`.

| Method               | Purpose                                                         | Example input               | Example output        |
|----------------------|-----------------------------------------------------------------|-----------------------------|-----------------------|
| `trimToNull`         | Trim whitespace; return `null` when blank                       | `"  hello  "`               | `"hello"`             |
|                      |                                                                 | `"   "`                     | `null`                |
| `cleanText`          | Trim + remove control chars + strip unsafe chars + collapse ws  | `" Hello\u0001 World "`       | `"Hello World"`       |
|                      |                                                                 | `"<script>alert(1)</script>"` | `"scriptalert1script"` |
| `upperCode`          | `cleanText` then upper-case (for tags, serial numbers, enums)   | `" sn-lap-a1b2 "`           | `"SN-LAP-A1B2"`       |
| `normalizeOptional`  | Trim only; return `null` when blank (keeps special chars)       | `" user@example.com "`      | `"user@example.com"`  |

### Integration points

- **AssetService** — `createAsset()` and `updateAsset()` now call:
  - `InputSanitizer.upperCode(...)` for `assetTag`, `serialNumber`, `status`
  - `InputSanitizer.cleanText(...)` for `name`, `category`, `location`
  - `InputSanitizer.normalizeOptional(...)` for `assignedTo`
  - `InputSanitizer.trimToNull(...)` for query parameters in `getAssets()`

- **TicketService** — `createTicket()` and `updateTicket()` now call:
  - `InputSanitizer.cleanText(...)` for `title`, `description`, `category`, `createdBy`
  - `InputSanitizer.upperCode(...)` (via `normalizePriority` / `normalizeStatus`) for `priority` and `status`

### Tests

23 unit tests in `InputSanitizerTest` — all passing.

## Reflection

### 1. What is validation?

**Validation** is the process of checking whether input meets a set of rules or constraints *before* it is accepted by the system. If the input does not satisfy the rules, it is **rejected** with an error message. Validation answers the question: *“Is this input allowed?”*

Examples in this project:
- `@NotBlank` on `CreateAssetRequest.assetTag` rejects empty or blank values (HTTP 400).
- `validateStatus()` in `AssetService` rejects any status that is not `AVAILABLE`, `ASSIGNED`, or `MAINTENANCE`.
- `ALLOWED_PRIORITIES` in `TicketService` rejects priorities other than `LOW`, `MEDIUM`, `HIGH`.

### 2. What is sanitisation?

**Sanitisation** is the process of *cleaning* input so that it is safe and consistent before it is stored or processed. Rather than rejecting the input, sanitisation transforms it into an acceptable form. Sanitisation answers the question: *“Can I safely clean this input before saving?”*

Examples in this project:
- Trimming leading/trailing whitespace: `"  SN-LAP-001  "` → `"SN-LAP-001"`.
- Removing control characters: `"Hello\u0001World"` → `"HelloWorld"`.
- Upper-casing code-like fields: `"available"` → `"AVAILABLE"`.
- Collapsing multiple spaces: `"foo   bar"` → `"foo bar"`.

### 3. Give one example where input should be cleaned.

**Asset tag with accidental whitespace and mixed case.**

A user scans a barcode that produces `"  sn-lap-a1b2c3d4\t"`. The intent is clearly the asset tag `SN-LAP-A1B2C3D4`. Instead of rejecting the request, we **clean** the input:
1. `trimToNull` removes leading/trailing whitespace and the trailing tab.
2. `upperCode` converts to upper case.

Result: `"SN-LAP-A1B2C3D4"` — the same asset tag the user intended, stored consistently.

### 4. Give one example where input should be rejected.

**Invalid enum value for ticket priority.**

A client sends `{ "priority": "URGENT" }`. The system only allows `LOW`, `MEDIUM`, or `HIGH`. No amount of trimming, casing, or character removal can turn `"URGENT"` into a valid priority. This input must be **rejected** with a clear error message:

```
Invalid priority: URGENT. Allowed priorities are: [LOW, MEDIUM, HIGH]
```

Returning HTTP 400 tells the client exactly what went wrong so they can fix their request.
