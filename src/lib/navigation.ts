import {
  LayoutDashboard,
  Route,
  PencilRuler,
  LibraryBig,
  ChartNoAxesCombined,
  ContactRound,
  School,
  LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  label: string;
  path: string;
  description?: string;
}

export interface NavSection {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  items: NavSubItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "inicio",
    label: "Início",
    icon: LayoutDashboard,
    path: "/dashboard",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Explorar", path: "/explorar" },
    ],
  },
  {
    id: "jornadas",
    label: "Jornadas",
    icon: Route,
    path: "/jornada",
    items: [
      { label: "Visão geral", path: "/jornada" },
      { label: "Diagnóstico de jornada", path: "/diagnostico-jornada" },
      { label: "Fundamentação teórica", path: "/fundamentacao" },
    ],
  },
  {
    id: "ferramentas",
    label: "Ferramentas PCH",
    icon: PencilRuler,
    path: "/ferramentas",
    items: [
      { label: "Todas as ferramentas", path: "/ferramentas" },
      { label: "Poema-diagnóstico", path: "/ferramentas/poemadiagnostico" },
      { label: "Poema-Funil", path: "/ferramentas/poema-funil" },
      { label: "Verso-Gatilho", path: "/ferramentas/verso-gatilho" },
      { label: "Reescrita Poética", path: "/ferramentas/reescrita-poetica" },
      { label: "Encenação Poética", path: "/ferramentas/encenacao-poetica" },
      { label: "Poesia Hipnótica", path: "/ferramentas/poesia-hipnotica" },
      { label: "Ritual do Silêncio", path: "/ferramentas/ritual-silencio" },
      { label: "Caderno da Voz Interna", path: "/ferramentas/caderno-voz-interna" },
    ],
  },
  {
    id: "biblioteca",
    label: "Biblioteca",
    icon: LibraryBig,
    path: "/explorar",
    items: [
      { label: "Explorar conteúdo", path: "/explorar" },
      { label: "Biblioteca de exercícios", path: "/biblioteca-exercicios" },
      { label: "Recursos clínicos", path: "/recursos-clinicos" },
      { label: "Ciência & Poesia", path: "/ciencia-da-poesia" },
      { label: "Mapa cerebral", path: "/mapa-cerebral" },
      { label: "Aula exclusiva", path: "/aula-exclusiva" },
      { label: "Livro do curso", path: "/livro-curso" },
    ],
  },
  {
    id: "formacao",
    label: "Formação",
    icon: School,
    path: "/formacao",
    items: [
      { label: "Visão geral", path: "/formacao" },
      { label: "Módulo 1 — Base Teórica", path: "/formacao/modulo/modulo-1" },
      { label: "Módulo 2 — Reestruturação de Crenças", path: "/formacao/modulo/modulo-2" },
      { label: "Módulo 3 — Linguagem Hipnótica", path: "/formacao/modulo/modulo-3" },
      { label: "Módulo 4 — Poemas Hipnóticos", path: "/formacao/modulo/modulo-4" },
      { label: "Módulo 5 — Metáforas Curativas", path: "/formacao/modulo/modulo-5" },
      { label: "Módulo 6 — Poesia Terapêutica", path: "/formacao/modulo/modulo-6" },
      { label: "Módulo 7 — Sessão P.A.D.H.", path: "/formacao/modulo/modulo-7" },
      { label: "Módulo 8 — Práticas Avançadas", path: "/formacao/modulo/modulo-8" },
    ],
  },
  {
    id: "evolucao",
    label: "Minha Evolução",
    icon: ChartNoAxesCombined,
    path: "/dashboard",
    items: [
      { label: "Progresso", path: "/dashboard" },
      { label: "Prontuário", path: "/prontuario-pch" },
      { label: "Histórico de consciência", path: "/consciencia/historico" },
      { label: "Diagnóstico", path: "/diagnostico" },
    ],
  },
  {
    id: "perfil",
    label: "Perfil",
    icon: ContactRound,
    path: "/meu-produto",
    items: [
      { label: "Meu produto", path: "/meu-produto" },
      { label: "Planos", path: "/planos" },
      { label: "Sobre", path: "/sobre" },
      { label: "Contato", path: "/contato" },
      { label: "Changelog", path: "/changelog" },
    ],
  },
];
