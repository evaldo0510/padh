import { test, expect } from '@playwright/test';

test.describe('PWA Banner Update', () => {
  const targetUrl = process.env.TARGET_URL || 'https://padhpoesia.lovable.app';

  test('should show update banner and reload on click', async ({ page }) => {
    await page.goto(targetUrl);

    // 1. Verify banner is NOT visible initially
    const banner = page.locator('role=status');
    await expect(banner).not.toBeVisible();

    // 2. Trigger the mock update
    await page.evaluate(() => {
      if (typeof (window as any).__TRIGGER_PWA_UPDATE__ === 'function') {
        (window as any).__TRIGGER_PWA_UPDATE__();
      }
    });

    // 3. Confirm banner appears
    await expect(banner).toBeVisible();
    await expect(page.getByText('Nova versão disponível')).toBeVisible();

    // 4. Verify "Atualizar" button exists and click it
    const updateButton = page.getByRole('button', { name: /atualizar/i });
    await expect(updateButton).toBeVisible();

    // We expect a reload. We can monitor for navigation or a specific event.
    // Since it's window.location.reload(), we check for the page load event.
    const reloadPromise = page.waitForEvent('framenavigated');
    await updateButton.click();
    await reloadPromise;

    console.log('✅ PWA Banner Smoke Test passed: Banner appeared and trigger reload.');
  });

  test('should have a link to changelog', async ({ page }) => {
    await page.goto(targetUrl);
    
    // Trigger banner
    await page.evaluate(() => {
      if (typeof (window as any).__TRIGGER_PWA_UPDATE__ === 'function') {
        (window as any).__TRIGGER_PWA_UPDATE__();
      }
    });

    const changelogLink = page.getByRole('link', { name: /ver o que mudou/i });
    await expect(changelogLink).toBeVisible();
    await expect(changelogLink).toHaveAttribute('href', '/changelog');
  });
});
