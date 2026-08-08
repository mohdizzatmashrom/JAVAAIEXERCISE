# Day 15 Testing Concepts Guide

## 1. Why test the frontend?

Frontend code breaks easily because many things interact at once:

```text
state
props
routes
forms
API calls
authentication
loading states
error states
browser behaviour
```

Manual testing is useful, but manual testing alone is slow and inconsistent. Automated tests allow students to re-check important behaviour quickly.

Use this teaching line:

```text
A test is a repeatable question we ask the application: does this behaviour still work?
```

## 2. Manual testing vs automated testing

Manual testing means a person opens the app and clicks around.

Automated testing means code checks expected behaviour.

Manual testing is good for visual checks and exploration. Automated testing is good for repeated checks.

## 3. Unit test

A unit test checks a small piece of logic.

In Day 15, this is:

```text
filterAssets()
countByStatus()
buildQueryString()
```

These tests are fast because they do not render React and do not call the backend.

## 4. Component test

A component test renders a React component and checks what appears on screen.

Examples:

```text
SummaryCards renders totals
ProtectedRoute redirects unauthenticated users
AssetFormWizard shows validation errors
AssetsPage shows paged data after mocked fetch
```

Component tests should focus on user-visible behaviour.

## 5. End-to-end smoke test

An end-to-end test uses a real browser.

In Day 15, the smoke test checks:

```text
Login → Dashboard → Assets → Asset Form → Create Asset → Success
```

It is called a smoke test because it does not test everything. It checks whether the most important path is alive.

## 6. What is mocking?

Mocking means replacing a real dependency with a controlled fake.

In component tests, we mock `fetch` so the test does not need Spring Boot.

Example idea:

```js
vi.spyOn(globalThis, 'fetch').mockResolvedValue(fakeResponse);
```

This lets the test focus on React behaviour.

## 7. Why not use the backend for every test?

If every test needs the backend, database and login token, tests become slower and harder to debug.

For component tests, use mocks.

For one or two main user flows, use E2E tests with the real backend.

## 8. What is jsdom?

React components normally run in a browser. Vitest runs in Node.js. `jsdom` provides a browser-like environment so React components can render during tests.

## 9. What is React Testing Library?

React Testing Library helps us test components the way users experience them.

Prefer this style:

```js
screen.getByRole('button', { name: 'Login' })
```

Instead of this style:

```js
document.querySelector('.login-button')
```

The first version is closer to how users and assistive technologies understand the page.

## 10. What is userEvent?

`userEvent` simulates user actions such as typing, clicking and selecting options.

Use it for form tests because forms depend on user interaction.

## 11. What is Playwright?

Playwright runs browser tests. It opens the app like a real user and performs actions.

For Day 15, Playwright is used only for a light smoke test. Do not overcomplicate it.

## 12. Good testing habits

Teach students:

```text
Test important behaviour, not every line of code.
Use clear test names.
Keep test data small.
Mock API responses in component tests.
Use real backend only for E2E smoke tests.
Read failing test messages carefully.
```

## 13. Common mistakes

### Mistake 1 - Forgetting npm install

Symptom:

```text
Cannot find module 'vitest'
```

Fix:

```bash
cd frontend
npm install
```

### Mistake 2 - Missing jsdom

Symptom:

```text
document is not defined
```

Fix: Check `vite.config.js` has:

```js
test: {
  environment: 'jsdom'
}
```

### Mistake 3 - E2E test cannot reach backend

Symptom:

```text
Request failed with status 401/500 or failed to fetch
```

Fix: Start Spring Boot and confirm backend endpoints work.

### Mistake 4 - Test depends on old database data

Fix: For E2E create unique data using a timestamp.

### Mistake 5 - Testing implementation details

Avoid testing internal state directly. Test what the user sees and does.
