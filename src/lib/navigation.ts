import {
  Home,
  Compass,
  Wrench,
  BookOpen,
  TrendingUp,
  UserCircle,
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
    icon: Home,
    path: "/dashboard",
    items: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Explorar", path: "/explorar" },
    ],
  },
  {
    id: "jornadas",
    label: "Jornadas",
    icon: Compass,
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
    icon: Wrench,
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
    icon: BookOpen,
    path: "/explorar",
    items: [
      { label: "Explorar conteúdo", path: "/explorar" },
      { label: "Biblioteca de exercícios", path: "/biblioteca-exercicios" },
      { label: "Recursos clínicos", path: "/recursos-clinicos" },
      { label: "Ciência & Poesia", path: "/ciencia-poesia" },
      { label: "Mapa cerebral", path: "/mapa-cerebral" },
      { label: "Aula exclusiva", path: "/aula-exclusiva" },
      { label: "Livro do curso", path: "/livro-curso" },
    ],
  },
  {
    id: "evolucao",
    label: "Minha Evolução",
    icon: TrendingUp,
    path: "/dashboard",
    items: [
      { label: "Progresso", path: "/dashboard" },
      { label: "Prontuário", path: "/prontuario" },
      { label: "Histórico de consciência", path: "/consciencia-historico" },
      { label: "Diagnóstico", path: "/diagnostico" },
    ],
  },
  {
    id: "perfil",
    label: "Perfil",
    icon: UserCircle,
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
