import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const swPath = path.join(root, 'src/sw.js');
const manifestPath = path.join(root, 'public/manifest.webmanifest');
const viteConfigPath = path.join(root, 'vite.config.ts');
const appPath = path.join(root, 'src/App.tsx');
const promptPath = path.join(root, 'src/components/layout/PWAPrompt.tsx');
const errors = [];
const requireFile = (file) => {
  if (!fs.existsSync(file)) errors.push(`Arquivo PWA ausente: ${path.relative(root, file)}`);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
};

const sw = requireFile(swPath);
const viteConfig = requireFile(viteConfigPath);
const app = requireFile(appPath);
const prompt = requireFile(promptPath);
let manifest;
try {
  manifest = JSON.parse(requireFile(manifestPath));
} catch (error) {
  errors.push(`Manifesto inválido: ${error instanceof Error ? error.message : String(error)}`);
}

if (!sw.includes("import { precacheAndRoute, cleanupOutdatedCaches, PrecacheFallbackPlugin }")) {
  errors.push('O service worker deve importar o fallback offline do Workbox.');
}
if (!sw.includes("fallbackURL: '/index.html'")) {
  errors.push('O service worker deve usar /index.html como fallback offline precacheado.');
}
const infoRoutePosition = sw.indexOf("url.pathname === '/changelog' || url.pathname === '/sobre'");
const navigationRoutePosition = sw.indexOf('navigationDenylist');
if (infoRoutePosition < 0 || navigationRoutePosition < 0 || infoRoutePosition > navigationRoutePosition) {
  errors.push('Rotas informativas precisam preceder a regra genérica de navegação.');
}
if (!sw.includes('self.skipWaiting()') || !sw.includes('clientsClaim()') || !sw.includes('cleanupOutdatedCaches()')) {
  errors.push('O ciclo de vida deve ativar o worker, controlar clientes e limpar precache antigo.');
}
if (!sw.includes('ExpirationPlugin') || !sw.includes('CacheableResponsePlugin')) {
  errors.push('As caches runtime precisam limitar entradas/idade e filtrar respostas cacheáveis.');
}

if (!viteConfig.includes("strategies: 'injectManifest'")) {
  errors.push('vite-plugin-pwa deve usar a estratégia injectManifest.');
}
if (!viteConfig.includes("globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}']")) {
  errors.push('injectManifest deve declarar os padrões de arquivos precacheados.');
}
if (/\n\s*workbox\s*:\s*\{/.test(viteConfig)) {
  errors.push('Remova opções workbox ignoradas pela estratégia injectManifest; configure-as em src/sw.js.');
}
if (!prompt.includes('useRegisterSW') || !app.includes('<PWAPrompt />')) {
  errors.push('O componente global PWAPrompt deve registrar o service worker.');
}

if (manifest) {
  if (manifest.display !== 'standalone') errors.push('manifest.display deve ser standalone.');
  if (manifest.id !== '/' || manifest.start_url !== '/' || manifest.scope !== '/') {
    errors.push('manifest id, start_url e scope devem manter a aplicação na raiz.');
  }
  if (!Array.isArray(manifest.icons) || manifest.icons.length < 2) {
    errors.push('O manifesto precisa declarar pelo menos dois ícones PWA.');
  } else {
    for (const icon of manifest.icons) {
      const localPath = path.join(root, 'public', icon.src.replace(/^\//, ''));
      if (!fs.existsSync(localPath)) errors.push(`Ícone do manifesto não encontrado: ${icon.src}`);
    }
    if (!manifest.icons.some((icon) => icon.sizes === '192x192' && icon.type === 'image/png')) {
      errors.push('O manifesto precisa incluir um ícone PNG 192×192.');
    }
    if (!manifest.icons.some((icon) => icon.sizes === '512x512' && icon.purpose?.includes('maskable'))) {
      errors.push('O manifesto precisa incluir um ícone maskable 512×512.');
    }
  }
}

if (errors.length) {
  console.error('PWA prebuild verification failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('PWA prebuild verification passed: manifest, icons, injectManifest, update lifecycle and offline fallback.');
