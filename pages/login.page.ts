import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly campoUsuario: Locator;
    readonly campoClave : Locator;
    readonly botonLogin: Locator;
    readonly mensajeError: Locator;

    constructor(page: Page){
        this.page = page;
        this.campoUsuario = page.getByPlaceholder('Username');
        this.campoClave = page.getByPlaceholder('Password');
        this.botonLogin = page.getByRole('button', {name: 'Login'});
        this.mensajeError = page.locator('[data-test = "error"]')
    }
    async goto(){
        await this.page.goto('https://www.saucedemo.com');
    }
    async login(usuario:string, clave = 'secret_sauce'){
        await this.campoUsuario.fill(usuario);
        await this.campoClave.fill(clave);
        await this.botonLogin.click();
    }
}