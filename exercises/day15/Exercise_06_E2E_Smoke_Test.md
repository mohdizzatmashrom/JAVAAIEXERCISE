# Day 15 Exercise 6 - End-to-End Smoke Test

## Scenario

Now you will test the main Support Desk flow in a real browser.

## Tools

Use Playwright.

Install:

```bash
npm install -D @playwright/test
npx playwright install
```

## Files to add

```text
frontend/playwright.config.js
frontend/e2e/day15-smoke.spec.js
```

## Test flow

Your smoke test should:

1. Open `/login`.
2. Login as the seeded admin or test user.
3. Confirm the dashboard opens.
4. Open the Tickets page.
5. Open the Create Ticket form.
6. Submit one valid ticket.
7. Confirm a success message or the ticket appears in the list.

## Important setup

Start the Spring Boot backend before running Playwright:

```bash
mvn spring-boot:run
```

Then run:

```bash
npm run test:e2e
```

## Expected result

The browser test should prove that the React UI, protected routes and backend API work together.
