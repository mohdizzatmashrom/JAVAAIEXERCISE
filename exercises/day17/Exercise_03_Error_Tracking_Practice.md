# D17 Exercise 03 — Error Tracking

## Goal

Trace errors using HTTP status and logs.

## Tasks

Trigger and document:

1. `401 Unauthorized`
2. `403 Forbidden`
3. `400 Bad Request`
4. `404 Not Found`
5. `409 Conflict`

## For each error, record

### 1. 401 Unauthorized

| Field | Detail |
|---|---|
| **Request made** | `GET /api/v1/tickets` (no `Authorization` header) |
| **Why it happened** | No JWT token was provided. The endpoint is protected by Spring Security's OAuth2 resource server, so unauthenticated requests are rejected by `BearerTokenAuthenticationFilter`. |
| **Where in logs** | Spring Security debug log: `BearerTokenAuthenticationFilter` rejects the request. No application-level log entry — the security filter chain short-circuits before the controller is reached. Response body is empty (handled at the filter level, not by `GlobalExceptionHandler`). |

### 2. 403 Forbidden

| Field | Detail |
|---|---|
| **Request made** | `POST /api/v1/assets` with a valid JWT token having role `USER` |
| **Why it happened** | The `SecurityConfig` requires `hasRole("ADMIN")` for `POST /api/v1/assets`. The user token carries `ROLE_USER`, so `AuthorizationFilter` denies access. |
| **Where in logs** | Spring Security debug log: `AuthorizationFilter` denies access (`AccessDeniedException`). No application-level log entry — the denial occurs in the security filter chain. Response body is empty (handled at the filter level). |

### 3. 400 Bad Request

| Field | Detail |
|---|---|
| **Request made** | `POST /api/v1/tickets` with empty required fields (`title`, `description`, `category`, `priority`, `createdBy` all blank) |
| **Why it happened** | The `@Valid` annotation on `CreateTicketRequest` triggers Jakarta Bean Validation. All five `@NotBlank` constraints fail. `GlobalExceptionHandler.handleValidationErrors()` catches `MethodArgumentNotValidException` and returns a structured error response with per-field details. |
| **Where in logs** | `GlobalExceptionHandler` handles `MethodArgumentNotValidException` → HTTP 400. The response body contains `"message": "Validation failed"` with an `errors` array listing each field and its validation message (e.g. `"title": "Title is required"`). Visible in the server console via the request-timing filter log for the `POST /api/v1/tickets` request. |

### 4. 404 Not Found

| Field | Detail |
|---|---|
| **Request made** | `GET /api/v1/tickets/000000000000000000000000` (valid MongoDB ObjectId format, but does not exist) |
| **Why it happened** | `TicketService.findTicketOrThrow()` calls `ticketRepository.findById(id)` which returns `Optional.empty()`. The method throws `ResourceNotFoundException("Ticket 000000000000000000000000 was not found")`. `GlobalExceptionHandler.handleResourceNotFound()` maps it to HTTP 404. |
| **Where in logs** | `GlobalExceptionHandler` handles `ResourceNotFoundException` → HTTP 404. The response body contains `"message": "Ticket 000000000000000000000000 was not found"`. The request-timing filter logs the `GET /api/v1/tickets/000000000000000000000000` request with status 404. |

### 5. 409 Conflict

| Field | Detail |
|---|---|
| **Request made** | `POST /api/auth/register` with `{"email": "testuser@example.com", ...}` (email already in database) |
| **Why it happened** | `AuthService.register()` calls `appUserRepository.existsByEmailIgnoreCase(email)` which returns `true`. The method throws `DuplicateResourceException("Email already exists: testuser@example.com")`. `GlobalExceptionHandler.handleDuplicateResource()` maps it to HTTP 409. |
| **Where in logs** | `GlobalExceptionHandler` handles `DuplicateResourceException` → HTTP 409. The response body contains `"message": "Email already exists: testuser@example.com"`. The request-timing filter logs the `POST /api/auth/register` request with status 409. |

## Submission

Submit your completed table.
