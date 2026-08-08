import { test, expect } from '@playwright/test';

test('admin can login and create an asset through the protected UI', async ({ page }) => {
  const uniqueSuffix = Date.now();
  const assetTag = `E2E-${uniqueSuffix}`;

  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Login to Asset Tracker' })).toBeVisible();

  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Password').fill('Admin@12345');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/app\/dashboard/);
  await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();

  const mainNav = page.getByRole('navigation', { name: 'Main navigation' });

  await mainNav.getByRole('link', { name: 'Assets', exact: true }).click();
  await expect(page.getByText('Server pagination and cache controls')).toBeVisible();

  await mainNav.getByRole('link', { name: 'Asset Form', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Create a new asset' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Asset Tag', exact: true }).fill(assetTag);
  await page.getByRole('textbox', { name: 'Asset Name', exact: true }).fill('E2E Test Camera');
  await page.getByRole('textbox', { name: 'Category', exact: true }).fill('Camera');
  await page.getByRole('textbox', { name: 'Serial Number', exact: true }).fill(`SN-${uniqueSuffix}`);

  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('textbox', { name: 'Location', exact: true }).fill('Testing Room');

  await page.getByRole('button', { name: 'Continue' }).click();

  await page
    .getByLabel('I have reviewed the asset details and they are ready to submit.', { exact: true })
    .check();

  await page.getByRole('button', { name: 'Create Asset' }).click();

  await expect(page.getByText('Asset created successfully.')).toBeVisible();
});
