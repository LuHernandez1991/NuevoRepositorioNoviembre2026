import { test, expect } from '../fixtures/fixtures';
import { statusLogin } from '../fixtures/data/login';

// Se usa el describe para descripción de un conjunto de pruebas de un componente específico
test.describe('Pruebas del módulo de Login - SauceDemo', () => {
  // Se ejecuta automáticamente ANTES de cada uno de los tests de abajo
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('La página tiene el título correcto', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('Debe iniciar sesión correctamente e ir al inventario', async ({ loginPage, page, isMobile }) => {

    /*if(isMobile){
      await page.getByRole('button', { name: 'Open Menu' }).click();
    }*/
    //salto de test (en este caso es el salto de este test en webkit por ejemplo)
    //test.skip(browserName == 'webkit', 'No ejecución en webkit');
    await loginPage.login(statusLogin.loginOk.username, statusLogin.loginOk.password);
    await expect(page).toHaveURL(/.*inventory/);
  });

  const casosDeError = [
    { nombre: 'contraseña incorrecta', usuario: 'standard_user', clave: 'mala', error: 'do not match' },
    { nombre: 'usuario no existente', usuario: 'Luisa_Hernandez', clave: 'no existente', error: 'Username and password do not match any user in this service' },
    { nombre: 'campos vacios', usuario: '', clave: '', error: 'Username is required' },
    { nombre: 'solo rellena usuario', usuario: 'standard_user', clave: '', error: 'Password is required' },
    { nombre: 'usuario bloqueado', usuario: 'locked_out_user', clave: 'secret_sauce', error: 'locked out' },
  ];

  for (const caso of casosDeError) {
    test(`login rechazado: ${caso.nombre}`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(caso.usuario, caso.clave);
      await expect(loginPage.mensajeError).toContainText(caso.error);
    });
  } 

});

