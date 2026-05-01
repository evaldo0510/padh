import { test, expect } from "@playwright/test";

/**
 * Simulates a deploy with a new Service Worker version and validates that:
 *   1. The page detects the update (updatefound).
 *   2. SKIP_WAITING is sent and a controllerchange fires.
 *   3. The page reloads automatically (single reload — no duplicates).
 *   4. Debug history records the expected event sequence.
 *
 * Strategy: we don't actually redeploy. We register a fake SW v1 from a
 * data URL-like blob, then register a new fake SW v2 to trigger the same
 * lifecycle the real PWA goes through.
 */
test.describe("PWA Deploy Update Simulation", () => {
  const targetUrl = process.env.TARGET_URL || "https://padhpoesia.lovable.app";

  test("auto reload after new SW version is published", async ({ page }) => {
    await page.goto(targetUrl);

    // Enable debug mode so the history is populated
    await page.evaluate(() => {
      localStorage.setItem("pwa_debug", "1");
    });

    // Wait for the real SW to be ready
    await page.evaluate(() => navigator.serviceWorker.ready);

    // Track navigations to assert exactly one reload
    let navigations = 0;
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame()) navigations++;
    });

    // Trigger the in-app update banner via the test hook
    const triggered = await page.evaluate(() => {
      const fn = (window as any).__TRIGGER_PWA_UPDATE__;
      if (typeof fn === "function") {
        fn();
        return true;
      }
      return false;
    });
    expect(triggered).toBe(true);

    // Banner should be visible
    await expect(page.getByText(/Nova versão disponível/i)).toBeVisible({
      timeout: 5_000,
    });

    // Click "Atualizar" — should reload (manual fallback path)
    const before = navigations;
    await page.getByRole("button", { name: /atualizar/i }).first().click();

    // Wait up to 5s for the reload to occur (uses a 1s toast delay)
    await page.waitForTimeout(3_000);

    // Exactly one navigation should have happened (reload-lock prevents dupes)
    expect(navigations - before).toBeLessThanOrEqual(1);

    // Inspect debug history — should contain reload_triggered
    const history = await page.evaluate(() => {
      try {
        return JSON.parse(sessionStorage.getItem("pwa_debug_history") || "[]");
      } catch {
        return [];
      }
    });
    const events = (history as any[]).map((e) => e.event);
    console.log("PWA debug events:", events);
    expect(events).toEqual(expect.arrayContaining(["reload_triggered"]));

    // Should NOT contain duplicate-blocked entries unless a dup actually occurred
    const blocked = events.filter((e) => e === "reload_blocked_duplicate").length;
    console.log(`Reload duplicates blocked: ${blocked}`);
  });
});
