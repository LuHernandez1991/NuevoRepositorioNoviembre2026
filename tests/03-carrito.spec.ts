import { test, expect } from "../fixtures/fixtures.ts";
import { statusLogin } from "../fixtures/data/login.ts";
import { products } from "../fixtures/data/products.ts";

test.describe('Proceso de compra en saucedemo', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(statusLogin.loginOk.username, statusLogin.loginOk.password);
    });

    test('Agregar un producto específico al carrito', async ({ inventoryPage }) => {
        await inventoryPage.agregarAlCarrito(products.backpack.name);

        // Verificaciones de badge y cambio de botón a 'Remove'
        await expect(inventoryPage.badgeCarrito).toHaveText('1');
        await expect(inventoryPage.producto(products.backpack.name).getByRole('button', { name: 'Remove' })).toBeVisible();
    });

    test('Agregar dos productos y quitar uno', async ({ inventoryPage }) => {
        await inventoryPage.agregarAlCarrito(products.backpack.name);
        await inventoryPage.agregarAlCarrito(products.bikeLight.name);

        await expect(inventoryPage.badgeCarrito).toHaveText('2');

        await inventoryPage.quitarCarrito(products.backpack.name);

        await expect(inventoryPage.badgeCarrito).toHaveText('1');
    });

    test('El carrito muestra el producto agregado', async ({ page, inventoryPage, cartPage }) => {
        await inventoryPage.agregarAlCarrito(products.backpack.name);
        await inventoryPage.irAlCarrito();

        await expect(page).toHaveURL(/.*cart/);
        await expect(cartPage.itemscarrito).toHaveCount(1);
        await expect(cartPage.obtenerItem(products.backpack.name)).toBeVisible();
    });
    
});