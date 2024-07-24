const { test, expect } = require('@playwright/test');

test.describe('Calculator Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/calculator');
  });

  test('should render calculator buttons', async ({ page }) => {
    const buttons = await page.$$('.buttons button');
    expect(buttons.length).toBe(16); // 10 numbers + 4 operators + clear + equals
  });

  test('should perform addition', async ({ page }) => {
    await page.click('text=1');
    await page.click('text=+');
    await page.click('text=2');
    await page.click('text==');
    const result = await page.locator('.result');
    await expect(result).toHaveText('Result: 3');
  });

  test('should clear input and result', async ({ page }) => {
    await page.click('text=1');
    await page.click('text=2');
    await page.click('[data-testid=button-C]');
    const result = page.locator('.result');
    const input = page.locator('.calculator input');
    await expect(input).toHaveValue('');
    await expect(result).not.toBeVisible();
  });
});
