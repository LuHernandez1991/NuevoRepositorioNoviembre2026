import { Page, expect } from '@playwright/test';

/**
 * Función helper para iniciar sesión en SauceDemo
 */
export async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Validar que el inicio de sesión fue exitoso
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}