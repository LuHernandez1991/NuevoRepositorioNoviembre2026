import { test, expect } from "../fixtures/fixtures.ts";
import { statusLogin } from "../fixtures/data/login.ts";


test.describe('Ordenamiento de productos en Saucedemo', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(statusLogin.loginOk.username, statusLogin.loginOk.password);
    });

    test('Ordenar por "Low to high"', async ({inventoryPage}) => {
        //texto visible exacto del desplegable
        await inventoryPage.ordenarPor('Price (low to high)');

        //Se verifica el nombre corresponda
        await expect(inventoryPage.primerNombreProducto).toHaveText('Sauce Labs Onesie');
    });

    test('Ordenar de Z a A', async ({inventoryPage}) => {
        //texto visible exacto del desplegable
        await inventoryPage.ordenarPor('Name (Z to A)');

        //Se verifica el nombre corresponda
        await expect(inventoryPage.primerNombreProducto).toHaveText('Test.allTheThings() T-Shirt (Red)');
    });

});