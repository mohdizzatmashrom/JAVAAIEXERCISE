# Day 15 Exercise 4 - Test Protected Ticket Route

## Scenario

Your Support Desk app should prevent unauthenticated users from opening protected ticket pages.

## Files to test

```text
frontend/src/components/ProtectedRoute.jsx
frontend/src/context/AuthContext.jsx
```

## Task

Write tests for two cases:

1. A user without a token is redirected to `/login`.
2. A user with stored authentication can view the protected ticket page.

## Suggested route setup

Create a small test router:

```jsx
<Routes>
  <Route path="/login" element={<h1>Login Page</h1>} />
  <Route
    path="/app/tickets"
    element={
      <ProtectedRoute>
        <h1>Protected Tickets</h1>
      </ProtectedRoute>
    }
  />
</Routes>
```

## Expected result

Unauthenticated users see the login page. Authenticated users see the protected ticket page.

This test proves frontend route guarding. It does not replace backend security. The backend must still check the JWT and role.
