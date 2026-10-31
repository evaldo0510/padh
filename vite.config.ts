import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
const BUILD_ID = `${Date.now()}`;

export default defineConfig(() => ({
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID),
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
      injectManifest: {
        injectionPoint: 'self.__WB_MANIFEST',
      },
      includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png', 'logo-pwa.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'maskable-icon-512x512.png', 'og-image.png', 'og-image.svg', 'pch-logo-180.png', 'pch-logo-192.png', 'pch-logo-32.png', 'pch-logo-48.png', 'pch-logo-512.png', 'pch-logo-96.png', 'pch-logo.svg', 'placeholder.svg'],
      manifest: {
        id: '/',
        name: 'PADH — Poesia Aplicada ao Desenvolvimento Humano',
        short_name: 'PADH',
        description: 'A palavra como instrumento de consciência, expressão e transformação.',
        lang: 'pt-BR',
        theme_color: '#170D2B',
        background_color: '#170D2B',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        cacheId: `padh-v${Date.now()}`, // Versioned cache name on every build
        globPatterns: ['**/*.{js,c...[truncated]