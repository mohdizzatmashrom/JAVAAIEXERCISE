# Day 12 Troubleshooting and Common Mistakes

## 1. `Cannot find module 'react-router'`

### Cause

React Router dependency was not installed.

### Fix

Check `frontend/package.json` contains:

```json
"react-router": "latest"
```

Then run:

```bash
cd frontend
npm install
```

## 2. Browser shows blank page after adding routes

### Cause

Usually one of these:

- missing import
- typo in component filename
- wrong export name
- syntax error in JSX

### Fix

Open browser console and Vite terminal.

Check imports in `App.jsx`:

```jsx
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
```

## 3. `useNavigate() may be used only in the context of a Router`

### Cause

The component using `useNavigate` is not inside `BrowserRouter`.

### Fix

Make sure `main.jsx` wraps the app:

```jsx
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>
```

## 4. AppShell appears but page content is missing

### Cause

`<Outlet />` is missing.

### Fix

Add this inside `AppShell`:

```jsx
<main>
  <Outlet />
</main>
```

## 5. Navigation changes URL but child page does not render

### Cause

Nested route structure and `Outlet` do not match.

### Fix

Make sure AppShell is the parent route element and child routes are inside it:

```jsx
<Route path="/app" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
  <Route path="dashboard" element={<DashboardPage />} />
</Route>
```

## 6. Protected pages always redirect to login

### Cause

Auth state is empty.

Possible reasons:

- user has not logged in
- login failed
- localStorage key was cleared
- login response shape does not match frontend expectation

### Fix

Open browser devtools and inspect localStorage.

Look for:

```text
assetTrackerAuth
```

It should contain token and user information.

## 7. Login works but assets/reports return 401

### Cause

The token is not being sent to the backend.

### Fix

Check API helper includes:

```js
headers: {
  Authorization: `Bearer ${token}`
}
```

Then inspect Network tab to confirm the request header appears.

## 8. Login works but assets/reports return 403

### Cause

The user is logged in but does not have the required role.

### Fix

Use seeded admin account for trainer demo:

```text
admin@example.com
Admin@12345
```

Explain:

```text
401 means not authenticated.
403 means authenticated but not authorised.
```

## 9. Login request fails with network error

### Cause

Backend is not running, or Vite proxy is not configured.

### Fix

Start backend:

```bash
mvn spring-boot:run
```

Check Vite proxy in `vite.config.js` points `/api` to backend port 8080.

## 10. Login redirects to dashboard instead of original page

### Cause

`state={{ from: location }}` may be missing from `ProtectedRoute`.

### Fix

Use:

```jsx
return <Navigate to="/login" replace state={{ from: location }} />;
```

Then in LoginPage:

```jsx
const redirectTo = location.state?.from?.pathname || '/app/dashboard';
```

## 11. Logout works but browser Back returns to protected page

### Cause

Navigation may have pushed a history entry instead of replacing it.

### Fix

Use:

```jsx
navigate('/login', { replace: true });
```

Also remember:

```text
The real protection is ProtectedRoute. Even if the browser goes back, ProtectedRoute should redirect again if auth state is cleared.
```

## 12. Confusion between frontend routes and backend APIs

### Explain clearly

Frontend route:

```text
/login
/app/assets
```

Backend API:

```text
/api/auth/login
/api/v1/assets
```

Main takeaway:

```text
Frontend routes show screens. Backend API routes return data.
```
