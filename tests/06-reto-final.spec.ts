import { test, expect } from "../fixtures/fixtures.ts";
import { statusLogin } from "../fixtures/data/login.ts";
import { products } from "../fixtures/data/products.ts";


test.describe('Reto final: compra de productos e intentos de login', () => {


    test.beforeEach(async ({ loginPage}) => {
        await loginPage.goto();
        await loginPage.login(statusLogin.loginOk.username, statusLogin.loginOk.password);

    });
//Carrito persistente: agrega 2 productos, navega al carrito, vuelve a la tienda con el botón "Continue Shopping", y verifica que el badge sigue mostrando "2".
    test('Añadir productos al carrito regresando a la tienda desde boton Continue Shopping', async ({ page, inventoryPage, cartPage }) => {
        await inventoryPage.agregarAlCarrito(products.backpack.name);
        await inventoryPage.irAlCarrito();
        await expect(page).toHaveURL(/.*cart/);

        // Regresar a la tienda
        await cartPage.continuarComprando(); 
        await expect(page).toHaveURL(/.*inventory/);

        // Se añade otro producto al carrito
        await inventoryPage.agregarAlCarrito(products.bikeLight.name);

        // Verificar que el carrito contiene dos productos
        await expect(inventoryPage.badgeCarrito).toHaveText('2');
    });


//Compra de 3 productos: flujo completo de compra con "Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket" y "Sauce Labs Onesie".
// En el resumen, verifica que hay 3 items (.cart_item) y que el "Item total" es la suma correcta de los tres precios (¡calcúlala mirando la página!).
    test('Flujo completo de compra, verificando que hay 3 productos y que su total es el correcto', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
        // Añadir productos al carrito usando la fixture de inventoryPage
        await inventoryPage.agregarAlCarrito(products.boltTShirt.name);
        await inventoryPage.agregarAlCarrito(products.fleeceJacket.name);
        await inventoryPage.agregarAlCarrito(products.mamelucoBaby.name);

        await inventoryPage.irAlCarrito();

        // Ir al Checkout
        await cartPage.checkout(); // O page.getByRole('button', { name: 'Checkout' }).click();
        await expect(page).toHaveURL(/.*checkout-step-one/);

        // Llenar formulario de envío
        await checkoutPage.llenarDatos('Luisa', 'Hernandez', '10007'); // O completar desde checkoutPage
        await expect(page).toHaveURL(/.*checkout-step-two/);

        // Validar cantidad de ítems
        await expect(cartPage.itemscarrito).toHaveCount(3);

        // Calcular total de precios de los items presentados
        const preciosElements = await page.locator('.inventory_item_price').all();
        let totalCarrito = 0;

        for (const el of preciosElements) {
            const textoPrecio = await el.innerText();
            totalCarrito += Number(textoPrecio.replace('$', ''));
        }

        // Comparación con el subtotal
        await expect(page.locator('.summary_subtotal_label')).toContainText(`Item total: $${totalCarrito}`);
    });


//El usuario problemático: haz login con problem_user / secret_sauce. Este usuario es un "bug andante" intencional del sitio.
// Escribe un test que agregue "Sauce Labs Backpack" y verifique el badge — y descubre por ti mismo si este usuario se comporta igual que standard_user.
// Usa el modo --ui para investigar qué pasa.

    test('Intentar agregar la mochila al carrito con problem_user', async ({ loginPage, inventoryPage }) => {
        // Re-login con el usuario problemático
        await loginPage.goto();
        await loginPage.login('problem_user', 'secret_sauce'); // O 'problem_user', 'secret_sauce'

        // Intentar agregar la mochila al carrito
        await inventoryPage.agregarAlCarrito(products.backpack.name);

        // Verificar el estado del badge
        await expect(inventoryPage.badgeCarrito).toHaveText('1');
    });


})


//Criterios de éxito: cero esperas manuales (waitForTimeout), cero selectores tipo nth-child, el helper de login reutilizado, y los tests pasan con npx playwright test.
