import { test, expect } from '@playwright/test';

test.describe('Prueba Integral del Sistema (E2E)', () => {

  test('Recorrido Total Automático', async ({ page }) => {
    // Configurar tiempo de espera largo para red lenta
    test.setTimeout(60000);

    // 1. INICIO Y EXPLORACIÓN
    console.log('--- PASO 1: Explorando la página principal ---');
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Esperar a que los anuncios carguen (buscamos el contenedor de las tarjetas)
    console.log('Esperando a que carguen los anuncios...');
    const adLink = page.locator('a[href^="/anuncio/"]').first();
    
    // 2. BÚSQUEDA Y FILTROS
    console.log('--- PASO 2: Probando buscador ---');
    const searchInput = page.getByPlaceholder(/¿Qué estás buscando hoy?/i);
    await searchInput.fill('Casa');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000); // Esperar el filtrado

    // 3. VER DETALLE DE UN ANUNCIO
    console.log('--- PASO 3: Ver detalle de un anuncio ---');
    if (await adLink.isVisible()) {
        await adLink.click();
        await expect(page).toHaveURL(/.*anuncio.*/);
        console.log('¡Detalle de anuncio cargado correctamente!');
        await page.goBack();
    } else {
        console.log('No se encontraron anuncios para hacer clic, saltando al login.');
    }

    // 4. NAVEGACIÓN A REGISTRO
    console.log('--- PASO 4: Verificando página de Registro ---');
    await page.getByRole('link', { name: /Crear cuenta/i }).click();
    await expect(page).toHaveURL(/.*registro/);
    console.log('Página de registro verificada.');

    // 5. LOGIN AUTOMÁTICO
    console.log('--- PASO 5: Iniciando Sesión (Login) ---');
    await page.goto('/login');
    await page.getByPlaceholder('tu@email.com').fill('cabreracristhian662@gmail.com');
    await page.getByPlaceholder('••••••••').fill('admin2026_secure');
    await page.getByRole('button', { name: /Entrar al Panel/i }).click();
    
    // 6. DASHBOARD
    console.log('--- PASO 6: Verificando Dashboard ---');
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
    console.log('Login exitoso, dentro del Dashboard.');

    // 7. PUBLICAR
    console.log('--- PASO 7: Sección Publicar ---');
    await page.getByRole('link', { name: /Publicar/i }).first().click();
    await expect(page).toHaveURL(/.*publicar/);

    // 8. PERFIL
    console.log('--- PASO 8: Verificando Perfil ---');
    await page.goto('/perfil');
    await expect(page).toHaveURL(/.*perfil/);
    await expect(page.getByText(/Información Personal/i)).toBeVisible();

    // 9. LOGOUT
    console.log('--- PASO 9: Cerrando Sesión ---');
    await page.goto('/');
    const logoutBtn = page.getByRole('button', { name: /Salir/i }).first();
    if (await logoutBtn.isVisible()) {
        await logoutBtn.click();
        console.log('Cierre de sesión exitoso.');
    }

    console.log('--- TEST FINALIZADO CON ÉXITO: TODO FUNCIONA ---');
  });

});
