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
  "/ferramentas/verso-gatilho": () => import("@/pages/ferramentas/VersoGatilho"),
  "/ferramentas/poemadiagnostico": () => import("@/pages/ferramentas/Poemadiagnostico"),
  "/ferramentas/caderno-voz-interna": () => import("@/pages/ferramentas/CadernoVozInterna"),
  "/ferramentas/encenacao-poetica": () => import("@/pages/ferramentas/EncenacaoPoetica"),
  "/ferramentas/reescrita-poetica": () => import("@/pages/ferramentas/ReescritaPoetica"),
  "/ferramentas/ritual-silencio": () => import("@/pages/ferramentas/RitualSilencio"),
  "/ferramentas/poesia-hipnotica": () => import("@/pages/ferramentas/PoesiaHipnotica"),
  "/venda/poema-funil": () => import("@/pages/venda/VendaPoemaFunil"),
  "/venda/verso-gatilho": () => import("@/pages/venda/VendaVersoGatilho"),
  "/venda/poemadiagnostico": () => import("@/pages/venda/VendaPoemadiagnostico"),
  "/venda/caderno-voz-interna": () => import("@/pages/venda/VendaCadernoVozInterna"),
  "/venda/encenacao-poetica": () => import("@/pages/venda/VendaEncenacaoPoetica"),
  "/venda/reescrita-poetica": () => import("@/pages/venda/ReescritaPoetica"),
  "/venda/ritual-silencio": () => import("@/pages/venda/VendaRitualSilencio"),
  "/venda/poesia-hipnotica": () => import("@/pages/venda/VendaPoesiaHipnotica"),
  "/jornada": () => import("@/pages/JornadaHome"),
  sessao: () => import("@/pages/SessaoView"),
  "/formacao/modulo/*": () => import("@/pages/formacao/ModuloFormacao"),
};

const prefetched = new Set<string>();
const pendingPrefetches = new Map<string, Promise<unknown>>();

export const prefetchRoute = (path: string, priority: "high" | "low" = "high") => {
  if (prefetched.has(path) || pendingPrefetches.has(path)) return;

  if (priority === "low") {
    window.setTimeout(() => {
      if (!prefetched.has(path) && !pendingPrefetches.has(path)) {
        triggerPrefetch(path);
      }
    }, 100);
    return;
  }

  triggerPrefetch(path);
};

const triggerPrefetch = (path: string) => {
  if (prefetched.has(path) || pendingPrefetches.has(path)) return;

  const importer = path.startsWith("/jornada/")
    ? routeImports.sessao
    : path.startsWith("/formacao/modulo/")
      ? routeImports["/formacao/modulo/*"]
      : routeImports[path];

  if (!importer) return;

  const promise = importer();
  pendingPrefetches.set(path, promise);
  promise
    .then(() => prefetched.add(path))
    .catch(() => {
      // A later navigation can retry a failed prefetch.
    })
    .finally(() => pendingPrefetches.delete(path));
};

export const cancelAllPrefetches = () => {
  // Dynamic imports cannot be canceled. Keep their promises tracked so the
  // route can reuse the same in-flight module load after navigation.
};
