import { defineConfig } from '@playwright/test';
import path from 'path';

// Resolve current directory reliably
const currentDir = process.cwd();

export default defineConfig({
  testDir: './tests', // Location of the test files
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'broken',
      testMatch: /visual.spec.js/,
      use: {
        baseURL: 'file://' + path.join(currentDir, 'exercises/bug-hunt/broken/index.html'),
      },
    },
    {
      name: 'fixed',
      testMatch: /visual.spec.js/,
      use: {
        baseURL: 'file://' + path.join(currentDir, 'exercises/bug-hunt/fixed/index.html'),
      },
    },
  ],
});
