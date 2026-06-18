import { test, expect } from '@playwright/test';

import { BASE_URL } from '../constants';

test.describe('Checkboxes page', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/checkboxes`);
    });

    test('начальное состояние чекбоксов', async ({ page }) => {
      await test.step('Checkbox 1 снят по умолчанию', async () => {
        await expect(page.getByLabel('Checkbox 1')).not.toBeChecked();
      });

      await test.step('Checkbox 2 отмечен по умолчанию', async () => {
        await expect(page.getByLabel('Checkbox 2')).toBeChecked();
      });

    });

    test('можно отметить Checkbox 1', async ({ page }) => {
      await test.step('Кликнуть по Checkbox 1', async () => {
        await page.getByLabel('Checkbox 1').check();
      });

      await test.step('Checkbox 1 должен быть отмечен', async () => {
        await expect(page.getByLabel('Checkbox 1')).toBeChecked();
      });

    });

    test('можно снять Checkbox 2', async ({ page }) => {
      await test.step('Кликнуть по Checkbox 2', async () => {
        await page.getByLabel('Checkbox 2').uncheck();
      });

      await test.step('Checkbox 2 должен быть снят', async () => {
        await expect(page.getByLabel('Checkbox 2')).not.toBeChecked();
      });

    });

    test('можно отметить все чекбоксы', async ({ page }) => {
      await test.step('Отметить все чекбоксы', async () => {
        await page.getByLabel('Checkbox 1').check();
        await page.getByLabel('Checkbox 2').check();
      });

      await test.step('Все чекбоксы должны быть отмечены', async () => {
        await expect(page.getByLabel('Checkbox 1')).toBeChecked();
        await expect(page.getByLabel('Checkbox 2')).toBeChecked();
      });

    });

    test('можно снять все чекбоксы', async ({ page }) => {
      await test.step('Снять все чекбоксы', async () => {
        await page.getByLabel('Checkbox 1').uncheck();
        await page.getByLabel('Checkbox 2').uncheck();
      });

      await test.step('Все чекбоксы должны быть сняты', async () => {
        await expect(page.getByLabel('Checkbox 1')).not.toBeChecked();
        await expect(page.getByLabel('Checkbox 2')).not.toBeChecked();
      });

    });
    
    test('повторный клик снимает отметку', async ({ page }) => {
      await test.step('Отметить Checkbox 1', async () => {
        await page.getByLabel('Checkbox 1').check();
        await expect(page.getByLabel('Checkbox 1')).toBeChecked();
      });

      await test.step('Снять Checkbox 1 повторным кликом', async () => {
        await page.getByLabel('Checkbox 1').uncheck();
        await expect(page.getByLabel('Checkbox 1')).not.toBeChecked();
      });
    });
  });