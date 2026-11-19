import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly titulo: Locator;
    readonly selectorOrdenar: Locator;
    readonly linkCarrito: Locator;
    readonly badgeCarrito: Locator;
    readonly itemName : Locator;
    readonly primerNombreProducto: Locator;

    constructor(page: Page){
        this.page = page;
        this.titulo = page.getByText('Products')
        this.selectorOrdenar = page.locator('[data-test="product-sort-container"]');
        this.linkCarrito = page.locator('[data-test="shopping-cart-link"]');
        this.badgeCarrito = page.locator('[data-test="shopping-cart-badge"]');
        this.itemName = page.locator('.inventory_item_name');
        this.primerNombreProducto = page.locator('.inventory_item_name').first();

    }

    producto(nombre: string): Locator{
        return this.page.locator('.inventory_item').filter({hasText: nombre})
    }

    async agregarAlCarrito(nombre:string){
        const productoAgregado = this.producto(nombre);
        await productoAgregado.getByRole('button', {name: 'Add to cart'}).click();

    }
    async quitarCarrito(nombre:string){
        const eliminarProducto = this.producto(nombre);
        await eliminarProducto.getByRole('button', {name: 'Remove'}).click();

    }
    async ordenarPor(etiqueta: string){
        await this.selectorOrdenar.selectOption({label: etiqueta});
    }
    async irAlCarrito(){
        await this.linkCarrito.click()
    }


}