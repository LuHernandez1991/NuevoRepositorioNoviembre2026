import { test, expect } from "../fixtures/fixtures.ts";
import { statusLogin } from "../fixtures/data/login.ts";
import { products } from "../fixtures/data/products.ts";

test.describe('E2E Flujo completo', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(statusLogin.loginOk.username, statusLogin.loginOk.password);
    
  });

  test('Flujo completo de compra E2E', async ({inventoryPage, cartPage, checkoutPage}) => {
    await inventoryPage.agregarAlCarrito(products.backpack.name);
    await inventoryPage.irAlCarrito();

    await expect(cartPage.obtenerItem(products.backpack.name)).toBeVisible();
    await cartPage.checkout();

    await checkoutPage.llenarDatos('Luisa', 'Hernandez', '10007');
    await checkoutPage.continuar();

    await expect(cartPage.obtenerItem(products.backpack.name)).toBeVisible();
    await expect(checkoutPage.total).toContainText('Item total: $29.99');

    await checkoutPage.finalizar();
    await expect(checkoutPage.mensajeCompletado).toBeVisible();
  });
});