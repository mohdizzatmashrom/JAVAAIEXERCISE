# D17 Exercise 06 — Security Hardening Evidence

## Goal

Prove that your API still protects important behaviour.

---

## 1. Missing token returns 401

**Test performed:**

```http
GET http://localhost:8080/api/v1/assets
(no Authorization header)
```

**Expected result:** `401 Unauthorized`

**Evidence:**

The request above is defined in `requests/day17.http` (request #3). When sent without a Bearer token, Spring Security's `BearerTokenAuthenticationFilter` rejects the request before it reaches any controller.

Relevant config in `SecurityConfig.java`:

```java
.requestMatchers(HttpMethod.GET, "/api/v1/assets", "/api/v1/assets/**")
    .hasAnyRole("USER", "ADMIN")
.anyRequest().authenticated()
```

and:

```java
.oauth2ResourceServer(oauth2 -> oauth2
    .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter))
)
```

Because no JWT is present, the OAuth2 resource server returns **401** with an empty body (handled at the filter level, not by `GlobalExceptionHandler`).

**curl command:**

```bash
curl -s -o NUL -w "%{http_code}" http://localhost:8080/api/v1/assets
```

Expected output: `401`

---

## 2. Wrong role returns 403

**Test performed:**

```http
POST http://localhost:8080/api/v1/assets
Authorization: Bearer <USER-role-token>
Content-Type: application/json

{
  "assetTag": "TEST-403",
  "name": "Forbidden Test",
  "category": "Laptop",
  "serialNumber": "SN-403-TEST",
  "location": "Security Lab"
}
```

**Expected result:** `403 Forbidden`

**Evidence:**

A user registered via `/api/auth/register` receives role `"USER"` by default (see `AuthService.register()`):

```java
AppUser user = new AppUser(
    request.getName().trim(), email,
    passwordEncoder.encode(request.getPassword()),
    "USER"   // <-- always USER
);
```

`SecurityConfig.java` restricts write operations to ADMIN only:

```java
.requestMatchers(HttpMethod.POST, "/api/v1/assets").hasRole("ADMIN")
.requestMatchers(HttpMethod.PUT,  "/api/v1/assets/**").hasRole("ADMIN")
.requestMatchers(HttpMethod.DELETE, "/api/v1/assets/**").hasRole("ADMIN")
```

When a USER-role token is used for POST, Spring Security's `AuthorizationFilter` returns **403** with an empty body (filter-level, no application log).

**Steps to reproduce:**

1. Register a normal user: `POST /api/auth/register` with name, email, password.
2. Use the returned token in the Authorization header.
3. Send `POST /api/v1/assets` — result is `403 Forbidden`.

---

## 3. Duplicate record returns 409

**Test performed:**

```http
POST http://localhost:8080/api/v1/assets
Authorization: Bearer <ADMIN-token>
Content-Type: application/json

{
  "assetTag": "LAP-2026-001",
  "name": "Duplicate Laptop",
  "category": "Laptop",
  "serialNumber": "DUPLICATE-SN-DAY17",
  "location": "Security Lab"
}
```

**Expected result:** `409 Conflict`

**Evidence:**

`AssetService.createAsset()` checks for duplicates before saving:

```java
if (assetRepository.existsByAssetTag(assetTag)) {
    throw new DuplicateResourceException("Asset tag already exists: " + assetTag);
}
if (assetRepository.existsBySerialNumber(serialNumber)) {
    throw new DuplicateResourceException("Serial number already exists: " + serialNumber);
}
```

`GlobalExceptionHandler` maps this exception to 409:

```java
@ExceptionHandler(DuplicateResourceException.class)
@ResponseStatus(HttpStatus.CONFLICT)
public ApiErrorResponse handleDuplicateResource(DuplicateResourceException exception) {
    return new ApiErrorResponse(
        exception.getMessage(), HttpStatus.CONFLICT.value(), List.of()
    );
}
```

Response body example:

```json
{
  "message": "Asset tag already exists: LAP-2026-001",
  "status": 409,
  "errors": []
}
```

This is also available as request #10 in `requests/day17.http`.

---

## 4. Invalid input returns 400

**Test performed (a) — blank required fields:**

```http
POST http://localhost:8080/api/v1/assets
Authorization: Bearer <ADMIN-token>
Content-Type: application/json

{
  "assetTag": "",
  "name": "",
  "category": "",
  "serialNumber": "",
  "location": ""
}
```

**Expected result:** `400 Bad Request`

**Evidence:**

`CreateAssetRequest` uses Jakarta Bean Validation:

```java
@NotBlank(message = "Asset tag is required")    private String assetTag;
@NotBlank(message = "Asset name is required")   private String name;
@NotBlank(message = "Category is required")     private String category;
@NotBlank(message = "Serial number is required") private String serialNumber;
@NotBlank(message = "Location is required")     private String location;
```

The controller uses `@Valid`, so Spring throws `MethodArgumentNotValidException`, which `GlobalExceptionHandler` maps to 400:

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
@ResponseStatus(HttpStatus.BAD_REQUEST)
public ApiErrorResponse handleValidationErrors(MethodArgumentNotValidException exception) { ... }
```

Response body example:

```json
{
  "message": "Validation failed",
  "status": 400,
  "errors": [
    { "field": "assetTag",    "message": "Asset tag is required" },
    { "field": "name",        "message": "Asset name is required" },
    { "field": "category",    "message": "Category is required" },
    { "field": "serialNumber","message": "Serial number is required" },
    { "field": "location",    "message": "Location is required" }
  ]
}
```

**Test performed (b) — invalid sort field:**

```http
GET http://localhost:8080/api/v1/assets/paged?page=0&size=5&sortBy=password&direction=asc
Authorization: Bearer <ADMIN-token>
```

**Expected result:** `400 Bad Request`

**Evidence:**

`AssetService.validatePageRequest()` uses an allowlist:

```java
private static final Set<String> ALLOWED_SORT_FIELDS = Set.of(
    "assetTag", "name", "category", "serialNumber", "status", "location", "assignedTo"
);

if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
    throw new InvalidRequestException("Sort field is not allowed: " + sortBy);
}
```

`InvalidRequestException` is mapped to 400 by `GlobalExceptionHandler`. This request is also available as request #7 in `requests/day17.http`.

---

## 5. Logs do not show JWT tokens or passwords

**Audit of all `logger.*()` calls in the codebase:**

| Class | Log statement | Sensitive? |
|---|---|---|
| `AuthService` | `logger.info("Registered new user email={} role={}", ...)` | No — only email and role |
| `AuthService` | `logger.info("User logged in email={} role={}", ...)` | No — only email and role |
| `AssetService` | `logger.info("Fetching assets with status={}, category={}, location={}", ...)` | No — filter values only |
| `AssetService` | `logger.info("Found {} asset(s)", ...)` | No — count only |
| `AssetService` | `logger.info("Fetching paged assets page={}, size={}, sortBy={}, direction={}", ...)` | No — pagination params |
| `AssetService` | `logger.info("Updating asset id={}", ...)` | No — entity ID only |
| `AssetService` | `logger.info("Deleted asset id={}", ...)` | No — entity ID only |
| `TicketService` | `logger.info("Created ticket with id: '{}', title: '{}'", ...)` | No — business data |
| `UserDataSeeder` | `logger.info("Seeded user email={} role={}", ...)` | No — only email and role |
| `AssetDataSeeder` | `logger.info("Asset seeding completed.")` | No |

**Confirmed NOT logged anywhere:**

- Passwords — `AuthService.login()` passes the password to `AuthenticationManager` but never logs it.
- JWT tokens — `buildAuthResponse()` generates the token and returns it in the HTTP response, but never writes it to a log.
- Full `Authorization` headers — no controller or filter logs the raw header value.
- Secret keys — `SecurityConfig.jwtSecret` is injected from config and never logged.

**Safe log example (what you would see after a login + asset fetch):**

```text
INFO  c.e.a.s.AuthService - User logged in email=admin@example.com role=ADMIN
INFO  c.e.a.s.AssetService - Fetching paged assets page=0, size=5, sortBy=assetTag, direction=asc
INFO  c.e.a.s.AssetService - Found 3 asset(s)
```

---

## 6. `.env` is not committed

**Evidence:**

`.gitignore` explicitly excludes sensitive files (lines 71–84):

```gitignore
# Environment variables and secrets
.env
.env.*
!.env.example
*.env
*.pem
*.key
*.crt
*.p12
*.jks
*.keystore
secrets/
secret/
credentials/
credentials.json
service-account.json
```

**Verification commands and output:**

```bash
# Confirm .env is ignored by git
git check-ignore .env
# Output: .env

# Confirm .env is NOT tracked by git
git ls-files .env
# Output: (empty — file is not tracked)

# Confirm no secret files are committed
git ls-files "*.pem" "*.key" "*.jks" "*.p12"
# Output: (empty — no key files tracked)

# Confirm secrets/ directory is not committed
git ls-files secrets/
# Output: (empty — directory is not tracked)
```

No `.env` file, private key file, or `secrets/` directory exists in the Git index.

---

## Submission

All six security evidence items have been verified with code references, expected HTTP behaviour, and reproduction steps.
