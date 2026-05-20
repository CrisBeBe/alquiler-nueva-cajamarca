import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['brand-logo-nc.svg', 'qr_apoyo.jpeg', 'robots.txt'],
      manifest: {
        name: 'AlquilerNC - Nueva Cajamarca',
        short_name: 'AlquilerNC',
        description: 'Encuentra los mejores alquileres en Nueva Cajamarca',
        theme_color: '#16a34a',
        icons: [
          {
            src: 'brand-logo-nc.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'brand-logo-nc.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    open: true
  }
})
