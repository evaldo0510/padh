import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png', 'logo-pwa.svg'],
      manifest: {
        name: 'P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano',
        short_name: 'P.A.D.H.',
        description: 'Metodologia que une neurociência, hipnose ericksoniana e linguagem poética para transformação interior.',
        theme_color: '#8B5CF6',
        icons: [
          {
            src: 'logo-pwa.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ].filter(Boolean),
  optimizeDeps: {
    force: true,
    include: ["react", "react-dom", "react-dom/client", "@tanstack/react-query"],
  },
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
