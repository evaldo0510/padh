import { test, expect } from '@playwright/test';

test.describe('PWA Cache Strategies', () => {
  const targetUrl = process.env.TARGET_URL;
  if (!targetUrl) throw new Error('TARGET_URL must point to an isolated test or staging deployment.');

  test('validate Stale-While-Revalidate for /changelog', async ({ page, context }) => {
    // 1. Visit page to populate cache
    await page.goto(`${targetUrl}/changelog`);
    await expect(page.getByText(/Changelog/i)).toBeVisible();

    // 2. Intercept and slow down the next request for /changelog
    // We want to simulate the "Stale" part being served before "Revalidate"
    await context.route(`${targetUrl}/changelog`, async (route) => {
      // Delay the network response significantly
      await new Promise(resolve => setTimeout(resolve, 3000));
      await route.continue();
    });

    // 3. Reload the page
    // If it's Stale-While-Revalidate, it should load almost instantly from cache
    const startTime = Date.now();
    await page.reload();
    const loadTime = Date.now() - startTime;

    // Check that it loaded faster than the 3s network delay
    console.log(`Reload time with SWR: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(2500); 

    await expect(page.getByText(/Changelog/i)).toBeVisible();
  });

  test('validate Stale-While-Revalidate for /sobre', async ({ page, context }) => {
    // 1. Visit page to populate cache
    await page.goto(`${targetUrl}/sobre`);
    // Check for some content unique to /sobre
    await expect(page.getByText(/Sobre/i)).toBeVisible();

    // 2. Intercept and slow down the next request for /sobre
    await context.route(`${targetUrl}/sobre`, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await route.continue();
    });

    // 3. Reload the page
    // Must load immediately from cache
    const startTime = Date.now();
    await page.reload();
    const loadTime = Date.now() - startTime;

    console.log(`Reload time with SWR (/sobre): ${loadTime}ms`);
    expect(loadTime).toBeLessThan(2500); 

    await expect(page.getByText(/Sobre/i)).toBeVisible();
  });

  test('validate Network-First for main application', async ({ page, context }) => {
    // 1. Visit home
    await page.goto(targetUrl);
    
    // 2. Go offline
    await context.setOffline(true);
    
    // 3. Reload - should still work because of cache fallback in NetworkFirst
    await page.reload();
    await expect(page.locator('#root')).toBeVisible();
    
    // 4. Check for offline indicator (if app has one)
    // We can also verify that APP_VERSION is still readable
    const version = await page.evaluate(() => (window as any).APP_VERSION);
    expect(version).toBeDefined();
    console.log(`Verified APP_VERSION: ${version}`);
    
    // If we passed an expected version, verify it
    if (process.env.EXPECTED_VERSION) {
      expect(version).toBe(process.env.EXPECTED_VERSION);
    }
  });

  test('validate Cache-First for static assets', async ({ page, context }) => {
    const assetUrl = `${targetUrl}/logo-pwa.svg`;
    
    // 1. Request asset to cache it
    await page.goto(assetUrl);
    
    // 2. Intercept and block the network for this asset
    await context.route(assetUrl, route => route.abort('failed'));
    
    // 3. Reload - should still work if it's Cache-First
    const response = await page.goto(assetUrl);
    expect(response?.status()).toBe(200);
    console.log('✅ Cache-First asset served despite network failure');
  });
});
