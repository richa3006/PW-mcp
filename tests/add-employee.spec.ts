import { expect, test } from '@playwright/test';

test('add a new employee', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('link', { name: 'Add Employee' }).click();
  await page.getByPlaceholder('First Name').fill('John123');
  await page.getByPlaceholder('Last Name').fill('Doe456');
  await Promise.all([
    page.waitForURL(/\\/pim\\/viewPersonalDetails\\/empNumber\\/\\d+/),
    page.getByRole('button', { name: 'Save' }).click(),
  ]);

  await expect(page.getByText('John123 Doe456', { exact: true })).toBeVisible();
});
