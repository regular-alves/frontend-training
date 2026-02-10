import { test, expect } from '@playwright/test';

test('visual regression test of the landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.05 });
});
