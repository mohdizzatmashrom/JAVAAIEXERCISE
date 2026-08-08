import { test, expect } from '@playwright/test';

test('admin can login, view dashboard, and create a ticket through the protected UI', async ({ page }) => {
  const uniqueSuffix = Date.now();
  const ticketTitle = `E2E Test Ticket ${uniqueSuffix}`;

  // ── Step 1: Open /login ──────────────────────────────────────────────
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Login to Support Desk' })).toBeVisible();

  // ── Step 2: Login as the seeded admin ────────────────────────────────
  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Password').fill('Admin@12345');
  await page.getByRole('button', { name: 'Login' }).click();

  // ── Step 3: Confirm the dashboard opens ──────────────────────────────
  await expect(page).toHaveURL(/\/app\/dashboard/);
  await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();

  // ── Step 4: Open the Tickets page ────────────────────────────────────
  const mainNav = page.getByRole('navigation', { name: 'Main navigation' });
  await mainNav.getByRole('link', { name: 'Tickets' }).click();
  await expect(page.getByRole('heading', { name: 'Tickets' })).toBeVisible();

  // ── Step 5: Open the Create Ticket form ──────────────────────────────
  await mainNav.getByRole('link', { name: 'New Ticket' }).click();
  await expect(page.getByRole('heading', { name: 'New Ticket' })).toBeVisible();

  // ── Step 6: Fill in and submit a valid ticket ───────────────────────
  await page.getByLabel('Title').fill(ticketTitle);
  await page.getByLabel('Description').fill('Automated E2E smoke-test ticket description.');

  await page.getByLabel('Category').selectOption('Software');
  await page.getByLabel('Priority').selectOption('MEDIUM');
  await page.getByLabel('Status').selectOption('OPEN');

  await page.getByRole('button', { name: 'Create Ticket' }).click();

  // ── Step 7: Confirm success message appears ──────────────────────────
  await expect(page.getByText('Ticket created successfully:')).toBeVisible();
  await expect(page.getByText(ticketTitle)).toBeVisible();
});
