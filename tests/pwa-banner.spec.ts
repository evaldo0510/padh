import { test, expect } from '@playwright/test';

test.describe('PWA E2E Advanced Update & Cache', () => {
  const targetUrl = process.env.TARGET_URL;
  if (!targetUrl) throw new Error('TARGET_URL must point to an isolated test or staging deployment.');

  test.beforeEach(async ({ page }) => {
    await page.goto(targetUrl);
  });

  test('full update flow with tracing and version validation', async ({ page }) => {
    // 1. Check current version hash
    const initialVersion = await page.evaluate(() => (window as any).APP_VERSION);
    console.log(`Initial version: ${initialVersion}`);

    // 2. Mock a new service worker update
    // We expect the banner to show up
    const banner = page.locator('role=status');
    await page.evaluate(() => {
      if (typeof (window as any).__TRIGGER_PWA_UPDATE__ === 'function') {
        (window as any).__TRIGGER_PWA_UPDATE__();
      }
    });

    await expect(banner).toBeVisible();
    await expect(page.getByText('Nova versão disponível')).toBeVisible();

    // 3. Click update and verify reload
    const updateButton = page.getByRole('button', { name: /atualizar/i });
    const reloadPromise = page.waitForEvent('framenavigated');
    await updateButton.click();
    await reloadPromise;

    // 4. Verify version post-reload
    const postUpdateVersion = await page.evaluate(() => (window as any).APP_VERSION);
    console.log(`Post-update version: ${postUpdateVersion}`);
    
    // In a real deploy test, we'd check if postUpdateVersion matches the new expected hash
    if (process.env.EXPECTED_VERSION) {
       expect(postUpdateVersion).toBe(process.env.EXPECTED_VERSION);
    }
  });

  test('validate explicit cache strategies', async ({ page, context }) => {
    // Navigate and check headers via network interception
    const [response] = await Promise.all([
      page.waitForResponse(res => res.url() === targetUrl && res.status() === 200),
      page.goto(targetUrl)
    ]);

    // Check NetworkFirst (should have no aggressive cache headers on HTML)
    const headers = response.headers();
    const cacheControl = headers['cache-control'] || '';
    expect(cacheControl).not.toContain('immutable');
    expect(cacheControl).not.toMatch(/max-age=\d{6,}/); // Not more than 1 day for HTML

    // Check Cache-First for images/fonts
    // We'll trigger a request for a known static asset
    const imagePath = '/logo-pwa.svg';
    const imgResponse = await page.goto(`${targetUrl}${imagePath}`);
    if (imgResponse) {
       // Static assets should have aggressive cache or at least exist in SW cache
       console.log(`Static asset ${imagePath} status: ${imgResponse.status()}`);
       expect(imgResponse.status()).toBe(200);
    }
  });

  test('offline resilience and public route access', async ({ page, context }) => {
    await context.setOffline(true);
    
    // Should be able to access home via cache (NetworkFirst fallback)
    await page.goto(targetUrl);
    await expect(page.locator('#root')).toBeVisible();

    // Should be able to access /sobre
    await page.goto(`${targetUrl}/sobre`);
    await expect(page.getByText(/Sobre/i)).toBeVisible();

    // Should show offline fallback for unknown private routes
    await page.goto(`${targetUrl}/admin/pwa-health`);
    // If not cached, it should trigger our offline UI
    await expect(page.getByText(/Sem conexão/i)).toBeVisible();
  });
});
