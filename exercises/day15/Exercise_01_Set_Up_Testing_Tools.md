# Day 15 Exercise 1 - Set Up Frontend Testing Tools

## Scenario

Your Support Desk Ticket UI already has protected routes, a ticket list, a ticket form and backend integration. Before adding more features, you need tests that prove the existing behaviour works.

## Learning target

By the end of this exercise, you should be able to explain why a React project needs a test runner, a DOM testing environment and user-event simulation.

## Files to edit

```text
frontend/package.json
frontend/vite.config.js
frontend/src/test/setup.js
```

## Task

Add the following development dependencies:

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Add scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Update `vite.config.js` with:

```js
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './src/test/setup.js',
  css: true
}
```

Create `src/test/setup.js` and import:

```js
import '@testing-library/jest-dom/vitest';
```

## Explanation

Vitest runs the tests. `jsdom` gives tests a browser-like DOM inside Node.js. React Testing Library renders React components for testing. Jest DOM adds readable assertions such as `toBeInTheDocument()`.

## Expected result

Running this command should not fail because of missing test configuration:

```bash
npm run test
```

If there are no tests yet, create a small sample test first.
