import { test, expect } from '@playwright/test';

test('Debe cargar la página de inicio', async ({ page }) => {
  await page.goto('/');
  // Ajusta esto según el título real de tu web
  await expect(page).toHaveTitle(/Alquiler/);
});

test('Debe navegar a la página de login', async ({ page }) => {
  await page.goto('/');
  const loginLink = page.getByRole('link', { name: /Ingresar/i });
  if (await loginLink.isVisible()) {
    await loginLink.click();
    await expect(page).toHaveURL(/.*login/);
  }
});

test('Debe poder iniciar sesión con credenciales válidas', async ({ page }) => {
  await page.goto('/login');
  
  // Usando placeholders reales
  await page.getByPlaceholder('tu@email.com').fill('cabreracristhian662@gmail.com');
  await page.getByPlaceholder('••••••••').fill('admin2026_secure');
  
  await page.getByRole('button', { name: /Entrar al Panel/i }).click();
  
  // Debería redirigir a /dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  const panelLink = page.getByRole('link', { name: /Panel/i });
  await expect(panelLink).toBeVisible();
});
