# Day 16 Exercise 2 - Backend Ticket Service Refactor Evidence

## Test Execution Results

Date: 2026-08-09 12:08:47

### Test 1: CREATE ticket (happy path)
- **Expected:** 201 Created, all fields trimmed, priority=HIGH, status=OPEN
- **Result:** PASS (201 Created)
- **Ticket ID:** 6a77fd4fadee2cae32bf9837
```json
{
    "id":  "6a77fd4fadee2cae32bf9837",
    "title":  "Refactor Test Ticket",
    "description":  "Testing normalization of input fields",
    "category":  "BUG",
    "priority":  "HIGH",
    "status":  "OPEN",
    "createdBy":  "admin",
    "createdAt":  "2026-08-09T12:08:47.9822686"
}
```

### Test 2: GET ticket by ID (happy path)
- **Expected:** 200 OK, ticket returned with trimmed fields
- **Result:** PASS (200 OK)
```json
{
    "id":  "6a77fd4fadee2cae32bf9837",
    "title":  "Refactor Test Ticket",
    "description":  "Testing normalization of input fields",
    "category":  "BUG",
    "priority":  "HIGH",
    "status":  "OPEN",
    "createdBy":  "admin",
    "createdAt":  "2026-08-09T12:08:47.982"
}
```

### Test 3: GET nonexistent ticket (404 path)
- **Expected:** 404 Not Found, error message "Ticket nonexistent-id-999 was not found"
- **Result:** PASS (404)
```json
{
  "message": "Ticket nonexistent-id-999 was not found",
  "status": 404,
  "errors": [],
  "timestamp": "2026-08-09T12:09:49.9609104"
}
```

### Test 4: UPDATE ticket (happy path)
- **Expected:** 200 OK, priority=LOW, status=IN_PROGRESS, fields trimmed
- **Result:** PASS (200 OK)
```json
{
    "id":  "6a77fd4fadee2cae32bf9837",
    "title":  "Updated Refactor Test Ticket",
    "description":  "Updated description after refactor",
    "category":  "FEATURE",
    "priority":  "LOW",
    "status":  "IN_PROGRESS",
    "createdBy":  "admin",
    "createdAt":  "2026-08-09T12:08:47.982"
}
```

### Test 5: UPDATE with invalid priority (error path)
- **Expected:** 400 Bad Request, error message about invalid priority
- **Result:** PASS (400)
```json
{
  "message": "Invalid priority: URGENT. Allowed priorities are: [LOW, MEDIUM, HIGH]",
  "status": 400,
  "errors": [],
  "timestamp": "2026-08-09T12:09:49.9957991"
}
```

### Test 6: UPDATE with invalid status (error path)
- **Expected:** 400 Bad Request, error message about invalid status
- **Result:** PASS (400)
```json
{
  "message": "Invalid status: RESOLVED. Allowed statuses are: [IN_PROGRESS, OPEN, CLOSED]",
  "status": 400,
  "errors": [],
  "timestamp": "2026-08-09T12:09:50.0257098"
}
```

### Test 7: UPDATE nonexistent ticket (error path)
- **Expected:** 404 Not Found, error message "Ticket nonexistent-id-999 was not found"
- **Result:** PASS (404)
```json
{
  "message": "Ticket nonexistent-id-999 was not found",
  "status": 404,
  "errors": [],
  "timestamp": "2026-08-09T12:10:01.3880216"
}
```

### Test 8: CREATE with invalid priority (error path)
- **Expected:** 400 Bad Request, error message about invalid priority
- **Result:** PASS (400)
```json
{
  "message": "Invalid priority: CRITICAL. Allowed priorities are: [LOW, MEDIUM, HIGH]",
  "status": 400,
  "errors": [],
  "timestamp": "2026-08-09T12:10:01.4274424"
}
```

### Test 9: GET all tickets (data integrity)
- **Expected:** 200 OK, all tickets returned with correct shape
- **Result:** PASS (200 OK, 9 tickets)
```json
[
    {
        "id":  "6a77fd03adee2cae32bf982f",
        "title":  "Login page not loading",
        "description":  "Users report the login page shows a blank screen on Chrome.",
        "category":  "Bug",
        "priority":  "HIGH",
        "status":  "OPEN",
        "createdBy":  "ali@example.com",
        "createdAt":  "2026-08-06T12:07:31.067"
    },
    {
        "id":  "6a77fd03adee2cae32bf9830",
        "title":  "Add dark mode",
        "description":  "Request to add dark mode theme for the dashboard.",
        "category":  "Feature Request",
        "priority":  "Medium",
        "status":  "OPEN",
        "createdBy":  "sit@example.com",
        "createdAt":  "2026-08-08T12:07:31.135"
    },
    {
        "id":  "6a77fd03adee2cae32bf9831",
        "title":  "Update user guide",
        "description":  "User guide needs to reflect the latest UI changes.",
        "category":  "Documentation",
        "priority":  "Low",
        "status":  "Closed",
        "createdBy":  "mutu@example.com",
        "createdAt":  "2026-08-02T12:07:31.143"
    },
    {
        "id":  "6a77fd03adee2cae32bf9832",
        "title":  "Email server down",
        "description":  "Outgoing emails are bouncing with SMTP timeout error.",
        "category":  "Email",
        "priority":  "HIGH",
        "status":  "OPEN",
        "createdBy":  "admin@example.com",
        "createdAt":  "2026-08-07T12:07:31.148"
    },
    {
        "id":  "6a77fd03adee2cae32bf9833",
        "title":  "Email notifications not sent",
        "description":  "Password reset emails are not being delivered.",
        "category":  "Email",
        "priority":  "HIGH",
        "status":  "OPEN",
        "createdBy":  "support@example.com",
        "createdAt":  "2026-08-09T00:07:31.157"
    },
    {
        "id":  "6a77fd03adee2cae32bf9834",
        "title":  "Slow dashboard loading",
        "description":  "Dashboard takes over 10 seconds to load with large datasets.",
        "category":  "Bug",
        "priority":  "Medium",
        "status":  "OPEN",
        "createdBy":  "bob@example.com",
        "createdAt":  "2026-08-04T12:07:31.162"
    },
    {
        "id":  "6a77fd03adee2cae32bf9835",
        "title":  "Add export to CSV",
        "description":  "Users need to export ticket data to CSV format.",
        "category":  "Feature Request",
        "priority":  "Low",
        "status":  "OPEN",
        "createdBy":  "carol@example.com",
        "createdAt":  "2026-08-05T12:07:31.171"
    },
    {
        "id":  "6a77fd28adee2cae32bf9836",
        "title":  "Refactor Test Ticket",
        "description":  "Testing normalization of input fields",
        "category":  "BUG",
        "priority":  "HIGH",
        "status":  "OPEN",
        "createdBy":  "admin",
        "createdAt":  "2026-08-09T12:08:08.882"
    },
    {
        "id":  "6a77fd4fadee2cae32bf9837",
        "title":  "Updated Refactor Test Ticket",
        "description":  "Updated description after refactor",
        "category":  "FEATURE",
        "priority":  "LOW",
        "status":  "IN_PROGRESS",
        "createdBy":  "admin",
        "createdAt":  "2026-08-09T12:08:47.982"
    }
]
```

## Summary

| # | Test | Expected | Path |
|---|------|----------|------|
| 1 | CREATE ticket (trim + normalize) | 201 | Happy |
| 2 | GET ticket by ID | 200 | Happy |
| 3 | GET nonexistent ticket | 404 | Error |
| 4 | UPDATE ticket (trim + normalize) | 200 | Happy |
| 5 | UPDATE invalid priority | 400 | Error |
| 6 | UPDATE invalid status | 400 | Error |
| 7 | UPDATE nonexistent ticket | 404 | Error |
| 8 | CREATE invalid priority | 400 | Error |
| 9 | GET all tickets | 200 | Happy |

