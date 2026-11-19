import {test, expect} from "@playwright/test";

import { LoginPage } from "../pages/login.page"

test('Login exitoso con standard_user', async ({page}) => {
    //1. Ir a la pagina

    await page.goto('https://www.saucedemo.com');

    //2. Probar el titulo de la página (existe y es visible)
    await expect(page.getByText('Swag Labs')).toBeVisible();

    /*3. Llenar el formulario
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    */
   //Llenar formulario opcion 2
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 4. Hacer clic en el botón
    await page.getByRole('button', { name: 'Login' }).click();
})