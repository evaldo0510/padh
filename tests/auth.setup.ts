import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Use environment variables for credentials if available, otherwise skip or use defaults
  const email = process.env.TEST_USER_EMAIL || 'test@example.com';
  const password = process.env.TEST_USER_PASSWORD || 'password123';

  await page.goto('/login');
  
  // Fill login form
  await page.getByLabel('E-mail').fill(email);
  await page.getByLabel('Senha').fill(password);
  await page.getByRole('button', { name: 'Entrar na Plataforma' }).click();

  // Wait for redirect to dashboard or index
  await page.waitForURL(/\/dashboard|\//);
  
  // Verify we are logged in (e.g., check for a specific element or just the URL)
  await expect(page).not.toHaveURL(/\/login/);

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});