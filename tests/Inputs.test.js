import { test, expect } from '@playwright/test';

import { BASE_URL, INPUTS_TEST_VALUES } from '../constants';


test.describe('Inputs page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/inputs`);
  });

  test('заполнить все поля и отобразить значения', async ({ page }) => {      
      await test.step('Заполнить все поля', async () => {
        await page.getByLabel('Number').fill(INPUTS_TEST_VALUES.number);
        await page.getByLabel('Text').fill(INPUTS_TEST_VALUES.text);
        await page.getByLabel('Password').fill(INPUTS_TEST_VALUES.password);
        await page.getByLabel('Date').fill(INPUTS_TEST_VALUES.date);
      });

      await test.step('Нажать Display Inputs', async () => {
          await page.getByRole('button', { name: /Display Inputs/ }).click();
      });

      await test.step('Проверить отображение значений', async () => {
          await expect(page.locator('#output-number')).toContainText(INPUTS_TEST_VALUES.number);
          await expect(page.locator('#output-text')).toContainText(INPUTS_TEST_VALUES.text);
          await expect(page.locator('#output-password')).toContainText(INPUTS_TEST_VALUES.password);
          await expect(page.locator('#output-date')).toContainText(INPUTS_TEST_VALUES.date);
      });
  });

  test('Проверка функции очистить все поля', async ({ page }) => {

      await test.step('Заполнить все поля', async () => {
        await page.getByLabel('Number').fill(INPUTS_TEST_VALUES.number);
        await page.getByLabel('Text').fill(INPUTS_TEST_VALUES.text);
        await page.getByLabel('Password').fill(INPUTS_TEST_VALUES.password);
        await page.getByLabel('Date').fill(INPUTS_TEST_VALUES.date);
      });

      await test.step('Убедиться что поля заполнены', async () => {
        await expect(page.getByLabel('Number')).toHaveValue(INPUTS_TEST_VALUES.number);
        await expect(page.getByLabel('Text')).toHaveValue(INPUTS_TEST_VALUES.text);
        await expect(page.getByLabel('Password')).toHaveValue(INPUTS_TEST_VALUES.password);
        await expect(page.getByLabel('Date')).toHaveValue(INPUTS_TEST_VALUES.date);
      });

      await test.step('Нажать Clear Inputs', async () => {
        await page.getByRole('button', { name: 'Clear Inputs' }).click();
      });

      await test.step('Проверить что все поля пустые', async () => {
        await expect(page.getByLabel('Number')).toHaveValue('');
        await expect(page.getByLabel('Text')).toHaveValue('');
        await expect(page.getByLabel('Password')).toHaveValue('');
        await expect(page.getByLabel('Date')).toHaveValue('');
      });  
  });
})