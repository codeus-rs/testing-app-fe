const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should display articles', async ({ page }) => {
    await expect(page.locator('[data-testid=article-0]')).toBeVisible();
    await expect(page.locator('[data-testid=article-1]')).toBeVisible();
    await expect(page.locator('[data-testid=article-2]')).toBeVisible();
  });
});
