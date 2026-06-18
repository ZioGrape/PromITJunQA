import { test, expect } from '@playwright/test';
import { TEST_USER, BASE_URL } from '../constants.js'

test.describe('Inputs page', () => {

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
});

  test('Успешный вход', async ({ page }) => {
    await test.step('Заполнить форму авторизации', async () => {
      await page.getByLabel('username').fill(TEST_USER.username);
      await page.getByLabel('password').fill(TEST_USER.password);
    });

    // падал тест на webkit из-за того что URL не успевал смениться, пришлось добавить all метод
    await test.step('Отправить форму', async () => {
      await Promise.all([
        page.waitForURL(`${BASE_URL}/secure`),
        page.locator('#submit-login').click()
      ]);
    });

    await test.step('Проверить успешную авторизацию', async () => {
      await expect(page).toHaveTitle(/Secure Page page for Automation Testing Practice/);
      await expect(page).toHaveURL(`${BASE_URL}/secure`);
      await expect(page.locator('#flash')).toHaveText('You logged into a secure area!');
    });

    await test.step('Выполнить логаут', async () => {
      await page.getByRole('link', { name: 'Logout' }).click();
    });

    await test.step('Проверить редирект после логаута', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/login`);
    });
  });

  test('Невалидный логин, валидный пароль', async ({ page }) => {
    await test.step('Заполнить форму авторизации', async () => {
      await page.getByLabel('username').fill('67');
      await page.getByLabel('password').fill(TEST_USER.password);
    });

    await test.step('Отправить форму', async () => {
      await page.locator('#submit-login').click();
    });

    await test.step('Проверить наличие текста об ошибке в поле логина', async () => {
      await expect(page.locator('#flash')).toHaveText(/Your username is invalid!/);
    });
  });

  test('Валидный логин, невалидный пароль', async ({ page }) => {
    await test.step('Заполнить форму авторизации', async () => {
      await page.getByLabel('username').fill(TEST_USER.username);
      await page.getByLabel('password').fill('67');
    });

    await test.step('Отправить форму', async () => {
      await page.locator('#submit-login').click();
    });

    await test.step('Проверить наличие текста об ошибке в поле пароля', async () => {
      await expect(page.locator('#flash')).toHaveText(/Your password is invalid!/);
    });
  });

  test('Пустые поля', async ({ page }) => {
    await test.step('Отправить форму', async () => {
      await page.locator('#submit-login').click();
    });

    await test.step('Проверить наличие текста об ошибке в поле логина', async () => {
      await expect(page.locator('#flash')).toHaveText(/Your username is invalid!/);
    });
  });

  test('Логин заполнен некорректно, пароль не заполнен', async ({ page }) => {
    await test.step('Заполнить поле логина некорректно', async () => {
      await page.getByLabel('username').fill('67');
    });

    await test.step('Отправить форму', async () => {
      await page.locator('#submit-login').click();
    });

    await test.step('Проверить наличие текста об ошибке в поле логина', async () => {
      await expect(page.locator('#flash')).toHaveText(/Your username is invalid!/);
    });
  });

  test('Логин заполнен корректно, пароль не заполнен', async ({ page }) => {
    await test.step('Заполнить поле логина корректно', async () => {
      await page.getByLabel('username').fill(TEST_USER.username);
    });

    await test.step('Отправить форму', async () => {
      await page.locator('#submit-login').click();
    });

    await test.step('Проверить наличие текста об ошибке в поле логина', async () => {
      await expect(page.locator('#flash')).toHaveText(/Your password is invalid!/);
    });
  });
})