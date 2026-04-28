// Route prefetch map - matches App.tsx lazy imports
const routeImports: Record<string, () => Promise<unknown>> = {
  "/": () => import("@/pages/Index"),
  "/livro-curso": () => import("@/pages/LivroCurso"),
  "/formacao": () => import("@/pages/Formacao"),
  "/mapa-cerebral": () => import("@/pages/MapaCerebral"),
  "/aula-exclusiva": () => import("@/pages/AulaExclusiva"),
  "/sobre": () => import("@/pages/Sobre"),
  "/contato": () => import("@/pages/Contato"),
  "/ferramentas": () => import("@/pages/ferramentas/FerramentasIndex"),
  "/ferramentas/poema-funil": () => import("@/pages/ferramentas/PoemaFunil"),
  "/ferramentas/verso-gatilho": () =>
    import("@/pages/ferramentas/VersoGatilho"),
  "/ferramentas/poemadiagnostico": () =>
    import("@/pages/ferramentas/Poemadiagnostico"),
  "/ferramentas/caderno-voz-interna": () =>
    import("@/pages/ferramentas/CadernoVozInterna"),
  "/ferramentas/encenacao-poetica": () =>
    import("@/pages/ferramentas/EncenacaoPoetica"),
  "/ferramentas/reescrita-poetica": () =>
    import("@/pages/ferramentas/ReescritaPoetica"),
  "/ferramentas/ritual-silencio": () =>
    import("@/pages/ferramentas/RitualSilencio"),
  "/ferramentas/poesia-hipnotica": () =>
    import("@/pages/ferramentas/PoesiaHipnotica"),
  "/venda/poema-funil": () => import("@/pages/venda/VendaPoemaFunil"),
  "/venda/verso-gatilho": () => import("@/pages/venda/VendaVersoGatilho"),
  "/venda/poemadiagnostico": () =>
    import("@/pages/venda/VendaPoemadiagnostico"),
  "/venda/caderno-voz-interna": () =>
    import("@/pages/venda/VendaCadernoVozInterna"),
  "/venda/encenacao-poetica": () =>
    import("@/pages/venda/VendaEncenacaoPoetica"),
  "/venda/reescrita-poetica": () =>
    import("@/pages/venda/VendaReescritaPoetica"),
  "/venda/ritual-silencio": () => import("@/pages/venda/VendaRitualSilencio"),
  "/venda/poesia-hipnotica": () => import("@/pages/venda/VendaPoesiaHipnotica"),
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
