// Route prefetch map - matches App.tsx lazy imports
const routeImports: Record<string, () => Promise<unknown>> = {
  '/': () => import('@/pages/Index'),
  '/livro-curso': () => import('@/pages/LivroCurso'),
  '/formacao': () => import('@/pages/Formacao'),
  '/mapa-cerebral': () => import('@/pages/MapaCerebral'),
  '/aula-exclusiva': () => import('@/pages/AulaExclusiva'),
  '/sobre': () => import('@/pages/Sobre'),
  '/contato': () => import('@/pages/Contato'),
  '/ferramentas': () => import('@/pages/ferramentas/FerramentasIndex'),
  '/ferramentas/poema-funil': () => import('@/pages/ferramentas/PoemaFunil'),
  '/ferramentas/verso-gatilho': () => import('@/pages/ferramentas/VersoGatilho'),
  '/ferramentas/poemadiagnostico': () => import('@/pages/ferramentas/Poemadiagnostico'),
  '/ferramentas/caderno-voz-interna': () => import('@/pages/ferramentas/CadernoVozInterna'),
  '/ferramentas/encenacao-poetica': () => import('@/pages/ferramentas/EncenacaoPoetica'),
  '/ferramentas/reescrita-poetica': () => import('@/pages/ferramentas/ReescritaPoetica'),
  '/ferramentas/ritual-silencio': () => import('@/pages/ferramentas/RitualSilencio'),
  '/ferramentas/poesia-hipnotica': () => import('@/pages/ferramentas/PoesiaHipnotica'),
};

const prefetched = new Set<string>();

export const prefetchRoute = (path: string) => {
  if (prefetched.has(path)) return;
  const importer = routeImports[path];
  if (importer) {
    prefetched.add(path);
    importer();
  }
};
