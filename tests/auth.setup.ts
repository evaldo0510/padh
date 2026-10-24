import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;
  if (!email || !password) {
    throw new Error('Set TEST_USER_EMAIL and TEST_USER_PASSWORD for the isolated test environment.');
  }

  await page.goto('/login');
  
  // Fill login form
  await page.getByLabel('E-mail').fill(email);
  await page.getByLabel('Senha').fill(password);
  await page.getByRole('button', { name: 'Entrar e continuar', exact: true }).click();

  // Wait for redirect to dashboard or index
  await page.waitForURL((url) => url.pathname !== '/login');
  
  // Verify we are logged in (e.g., check for a specific element or just the URL)
  await expect(page).not.toHaveURL(/\/login/);

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
