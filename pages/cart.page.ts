import { Page, Locator} from 'playwright/test';

export class CartPage {
    readonly page: Page;
    readonly itemscarrito: Locator;
    readonly botonCheckout: Locator;
    readonly botonContinuarCompra: Locator;

    constructor(page: Page){
        this.page = page;
        this.itemscarrito = page.locator('.cart_item');
        this.botonCheckout = page.getByRole('button',{name: 'Checkout'});
        this.botonContinuarCompra = page.getByRole('button', {name : 'Continue Shopping'});
    }

    obtenerItem(nombre:string):Locator{
        return this.itemscarrito.filter({ hasText: nombre});
    }
    async checkout(){
        await this.botonCheckout.click();
    }
    async continuarComprando(){
        await this.botonContinuarCompra.click();
    }
}