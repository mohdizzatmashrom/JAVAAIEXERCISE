# Day 12 Exercise 6: Protected Route Reflection

## Goal

Explain what you built.

## Answer these questions

### 1. What is the role of `BrowserRouter`?

`BrowserRouter` (in `src/main.jsx`) wraps the whole app and uses the HTML5 History
API to sync the address bar with the UI without full page reloads. It enables
client-side navigation, deep links and back/forward buttons.

### 2. What is the difference between `Routes` and `Route`?

- `Routes` — the container that matches the current URL and renders only the best match.
- `Route` — a single route definition (`path` + `element`).

In `App.jsx`, `<Routes>` holds every `<Route>` (root redirect, `/login`, `/docs`,
protected `/app`, and the `*` fallback).

### 3. Why do we use `Outlet`?

`Outlet` marks where nested child routes render inside a layout route. `AppShell`
renders the shared header + nav and an `<Outlet />`; when visiting `/app/assets`,
the `AssetsPage` fills that outlet while the layout stays on screen.

### 4. What does `Navigate` do?

`Navigate` is a declarative redirect component. We use it to:

- send `/` to `/app/dashboard`,
- send unauthenticated users from `ProtectedRoute` to `/login` (storing the
  original page in `state.from`),
- send already-logged-in users away from `LoginPage`, and after a successful
  login `navigate(state.from || '/app/dashboard')`.

`replace` avoids leaving the redirect page in history.

### 5. Why is frontend route protection not enough by itself?

`ProtectedRoute` only hides UI based on a `localStorage` token. That can be faked
in DevTools, the backend can be called directly (curl/Postman) skipping React,
and the client cannot truly verify a JWT. So the frontend guard is just UX —
real authorization must happen on the server.

### 6. Which backend endpoints still need to enforce security?

Per our `SecurityConfig`:

- **Public:** `/api/health`, `/api/auth/**`, `/api/docs/**`, `/api/v1/info`
- **USER/ADMIN (read):** `GET /api/assets`, `GET /api/v1/assets`, `GET /api/v1/reports/**`
- **ADMIN only (write):** `POST /api/assets`, `POST /api/v1/assets`
- **Everything else:** `anyRequest().authenticated()`

The server is the final authority on what a user may do.

## Routing Flow in Code

The flow lives across these `frontend/src` files:

1. **`main.jsx`** — wraps app in `BrowserRouter` + `AuthProvider`.
2. **`App.jsx`** — declares all routes.
3. **`ProtectedRoute.jsx`** — redirects to `/login` if not authenticated.
4. **`AppShell.jsx`** — shared layout with `<Outlet />` for child routes.
5. **`LoginPage.jsx`** — logs in, then redirects to `state.from` or `/app/dashboard`.
6. **`AuthContext.jsx`** — provides `isAuthenticated`, `login`, `logout`.

```
User visits /app/assets
   ->  App.jsx matches /app  ->  renders <ProtectedRoute>
   ->  not authenticated?  ->  Navigate to /login (state.from = location)
   ->  LoginPage submit  ->  login() stores JWT
   ->  navigate(state.from || /app/dashboard)
   ->  authenticated?  ->  <AppShell> + <Outlet> -> AssetsPage
```

## Submit

A short written answer and screenshots of your routing flow.
