import { test, expect } from '@playwright/test';
import { BASE_URL } from '../constants';

test.describe('Forgot Password page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/forgot-password`);
    });

    test('успешная отправка валидного email', async ({ page }) => {

    await test.step('Ввести валидный email', async () => {
      await page.getByLabel('E-mail').fill('test@example.com');
    });

    await test.step('Нажать Retrieve password', async () => {
      await page.getByRole('button', { name: 'Retrieve password' }).click();
    });

    await test.step('Проверить успешный результат', async () => {
      await expect(page.locator('#confirmation-alert')).toBeVisible();
      await expect(page.locator('#confirmation-alert')).toContainText(
        'An e-mail has been sent to you which explains how to reset your password.'
      );
    });

    await test.step('Проверить заголовок страницы', async () => {
      await expect(page.locator('h1')).toContainText('Password reset page for Automation Testing Practice');
    });

  });

    test('нельзя отправить форму с пустым полем', async ({ page }) => {
        await test.step('Оставить поле пустым и нажать кнопку', async () => {
        await page.getByRole('button', { name: 'Retrieve password' }).click();
        });

        await test.step('Появляется сообщение об ошибке под полем', async () => {
        await expect(page.locator('.invalid-feedback')).toBeVisible();
        await expect(page.locator('.invalid-feedback')).toContainText('Please enter a valid email address.');
        });

        await test.step('Форма не отправлена, остались на странице', async () => {
        await expect(page).toHaveURL(`${BASE_URL}/forgot-password`);
        });

  });

    test('невалидный email показывает ошибку', async ({ page }) => {
      await test.step('Ввести строку без @', async () => {
        await page.getByLabel('E-mail').fill('notanemail');
      });

      await test.step('Нажать Retrieve password', async () => {
        await page.getByRole('button', { name: 'Retrieve password' }).click();
      });

      await test.step('Форма не отправлена, пользователь остался на странице', async () => {
        await expect(page).toHaveURL(`${BASE_URL}/forgot-password`);
      });

    });

    test('email без домена не принимается', async ({ page }) => {
      await test.step('Ввести email без домена', async () => {
        await page.getByLabel('E-mail').fill('test@');
      });

      await test.step('Нажать Retrieve password', async () => {
        await page.getByRole('button', { name: 'Retrieve password' }).click();
      });

      await test.step('Форма не отправлена', async () => {
        await expect(page).toHaveURL(`${BASE_URL}/forgot-password`);
      });

    });

    test('поле принимает только тип email', async ({ page }) => {
      await test.step('Проверить атрибут type у поля', async () => {
        await expect(page.getByLabel('E-mail')).toHaveAttribute('type', 'email');
      });

    });

  });
