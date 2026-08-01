# Day 12 Exercise 4: Protect Ticket Pages

## Goal

Prevent logged-out users from viewing ticket pages.

## Task

1. Create `ProtectedRoute.jsx`.
2. Check whether the user has a token.
3. If no token exists, redirect to `/login`.
4. Protect these routes:

```text
/app/dashboard
/app/tickets
/app/reports
```

## Expected result

Opening `/app/tickets` while logged out redirects to `/login`.
