import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    baseURL: process.env.TARGET_URL || 'http://localhost:8080',
    trace: 'on',
    screenshot: 'on',
    video: 'on-first-retry',
    storageState: 'playwright/.auth/user.json',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'ios',
      use: { ...devices['iPhone 13'] },
      dependencies: ['setup'],
    },
    {
      name: 'android',
      use: { ...devices['Pixel 5'] },
      dependencies: ['setup'],
    },
  ],
});
