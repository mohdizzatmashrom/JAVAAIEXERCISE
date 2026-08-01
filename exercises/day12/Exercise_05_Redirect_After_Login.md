# Day 12 Exercise 5: Redirect After Login

## Goal

Return the user to the page they originally tried to open.

## Task

1. Use `useLocation()` inside `ProtectedRoute`.
2. Pass the current location to the login page using `state`.
3. Use `useNavigate()` after successful login.
4. Redirect back to the original protected route.

## Test

1. Log out.
2. Open `/app/tickets`.
3. Confirm you are redirected to `/login`.
4. Login.
5. Confirm you return to `/app/tickets`.
