import { test, expect } from '@playwright/test';

test('login renders usable email and password controls without a session', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Acesse os estudos PCH' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'E-mail', exact: true })).toBeVisible();
  await expect(page.getByLabel('Senha', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Entrar e continuar', exact: true })).toBeVisible();
});

test('protected deep link redirects an unauthenticated visitor to login', async ({ page }) => {
  await page.goto('/jornada');
  await expect(page).toHaveURL(/\/login(?:\?|$)/);
  await expect(page.getByRole('heading', { name: 'Acesse os estudos PCH' })).toBeVisible();
});

test('public fundamentação route remains accessible without a session', async ({ page }) => {
  await page.goto('/fundamentacao');
  await expect(page).toHaveURL(/\/fundamentacao(?:\?|$)/);
  await expect(page.locator('h2').first()).toBeVisible();
});
