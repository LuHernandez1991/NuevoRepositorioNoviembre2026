import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly campoNombre: Locator;
  readonly campoApellido: Locator;
  readonly campoCodigoPostal: Locator;
  readonly botonContinuar: Locator;
  readonly botonFinalizar: Locator;
  readonly total: Locator;
  readonly mensajeCompletado: Locator;
  readonly mensajeError: Locator;

  constructor(page: Page) {
    //Info de checkout step-one
    this.page = page;
    this.campoNombre = page.getByPlaceholder('First Name');
    this.campoApellido = page.getByPlaceholder('Last Name');
    this.campoCodigoPostal = page.getByPlaceholder('Zip/Postal Code');
    this.botonContinuar = page.getByRole('button', {name : 'Continue'});
    
    //avance a checkout step-two
    this.botonFinalizar = page.getByRole('button', {name : 'Finish'});
    this.total = page.locator('.summary_subtotal_label');
    this.mensajeCompletado = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.mensajeError = page.locator('[data-test="error"]');
  }

  async llenarDatos(nombre: string, apellido: string, codigoPostal: string) {
    await this.campoNombre.fill(nombre);
    await this.campoApellido.fill(apellido);
    await this.campoCodigoPostal.fill(codigoPostal);
    await this.botonContinuar.click();
  }

  async continuar() {
    await this.botonContinuar.click();
  }

  async finalizar() {
    await this.botonFinalizar.click();
  }
}