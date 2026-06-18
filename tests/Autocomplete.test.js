import { test, expect } from '@playwright/test';
import { BASE_URL } from '../constants';


test.describe('Autocomplete page', () => {
    test('выбор Canada через автозаполнение и проверка submit', async ({ page }) => {

      await page.goto(`${BASE_URL}/autocomplete`);

      await test.step('Ввести "can" в поле автозаполнения', async () => {
        await page.locator('#country').pressSequentially('can', { delay: 100 });
      });

      await test.step('Дождаться появления выпадающего списка', async () => {
        await expect(page.locator('#countryautocomplete-list')).toBeVisible();
      });

      await test.step('Выбрать Canada из списка', async () => {
        await page.locator('#countryautocomplete-list input[value="Canada"]').locator('..').click();
      });

      await test.step('Проверить что поле заполнилось значением Canada', async () => {
        await expect(page.locator('#country')).toHaveValue('Canada');
      });

      await test.step('Нажать Submit', async () => {
        await page.getByRole('button', { name: 'Submit' }).click();
      });

      await test.step('Проверить что выбранная страна отображается', async () => {
        await expect(page.locator('#result')).toContainText('Canada');
      });
    });
});