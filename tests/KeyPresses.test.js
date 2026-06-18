import { test, expect } from '@playwright/test';
import { BASE_URL } from '../constants';


test.describe('Key Presses page', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/key-presses`);
    });

    test('нажатие Enter отображается в результате', async ({ page }) => {
        await test.step('Кликнуть по полю ввода', async () => {
        await page.locator('#target').click();
        });

        await test.step('Заблокировать сабмит формы', async () => {
        await page.evaluate(() => {
            document.querySelector('form')?.addEventListener('submit', e => e.preventDefault());
        });
        });

        await test.step('Нажать Enter', async () => {
        await page.keyboard.press('Enter');
        });

        await test.step('Проверить результат', async () => {
        await expect(page.locator('#result')).toContainText('ENTER');
        });

    });

    test('нажатие Escape отображается в результате', async ({ page }) => {
      await test.step('Кликнуть по полю ввода', async () => {
        await page.locator('#target').click();
      });

      await test.step('Нажать Escape', async () => {
        await page.keyboard.press('Escape');
      });

      await test.step('Проверить результат', async () => {
        await expect(page.locator('#result')).toContainText('ESCAPE');
      });

    });

    test('нажатие Backspace отображается в результате', async ({ page }) => {
      await test.step('Кликнуть по полю ввода', async () => {
        await page.locator('#target').click();
      });

      await test.step('Нажать Backspace', async () => {
        await page.keyboard.press('Backspace');
      });

      await test.step('Проверить результат', async () => {
        await expect(page.locator('#result')).toContainText('BACK_SPACE');
      });

    });

    test('нажатие Tab отображается в результате', async ({ page }) => {
      await test.step('Кликнуть по полю ввода', async () => {
        await page.locator('#target').click();
      });

      await test.step('Нажать Tab', async () => {
        await page.keyboard.press('Tab');
      });

      await test.step('Проверить результат', async () => {
        await expect(page.locator('#result')).toContainText('TAB');
      });

    });

    test('нажатие Ctrl отображается в результате', async ({ page }) => {
      await test.step('Кликнуть по полю ввода', async () => {
        await page.locator('#target').click();
      });

      await test.step('Нажать Ctrl', async () => {
        await page.keyboard.press('Control');
      });

      await test.step('Проверить результат', async () => {
        await expect(page.locator('#result')).toContainText('CONTROL');
      });

    });
});