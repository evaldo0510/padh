import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

test('login permanece acessível na primeira visita sem apresentação bloqueante', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Acesse os estudos PCH' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'E-mail', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Pular', exact: true })).toHaveCount(0);
  await page.getByRole('textbox', { name: 'E-mail', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Senha', { exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('textbox', { name: 'E-mail', exact: true })).toBeFocused();
});

test('menu navega para Formação por teclado e restaura o foco ao fechar', async ({ page }) => {
  await page.goto('/login');
  const trigger = page.getByRole('button', { name: 'Abrir menu de navegação' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: /Formação/ }).click();
  const overview = dialog.getByRole('link', { name: 'Visão geral', exact: true });
  await overview.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/formacao$/);
  await expect(dialog).toHaveCount(0);
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});