import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'line',
  use: {
    // CAMBIO: URL corregida de tu web real
    baseURL: 'https://alquilernc.vercel.app', 
    browserName: 'chromium', // Usaremos Chromium/Chrome
    channel: 'chrome',       // Le dice a Playwright que intente usar el Chrome oficial instalado
    // Capturar fotos si falla (sin video para evitar problemas de ffmpeg)
    screenshot: 'only-on-failure',
    video: 'off',
  },
  // Desactivamos el servidor local porque vamos a probar la web ya subida
});
