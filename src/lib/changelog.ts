// Bump VERSION on each meaningful release. Used by the PWA update banner
// to link the user to the matching entry below.
export const APP_VERSION = "2026.05.01";

export interface ChangelogEntry {
  version: string;
  date: string;
  highlights: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "2026.05.01",
    date: "01 Mai 2026",
    highlights: [
      "Atualização automática do PWA: nova versão é aplicada e a página recarrega sozinha sem precisar clicar em nada.",
      "Polling de atualização reduzido para 15s para detectar deploys mais rápido.",
      "Estratégia network-first reforçada para HTML, JS e CSS — sem cache obsoleto.",
    ],
  },
  {
    version: "2026.04.29",
    date: "29 Abr 2026",
    highlights: [
      "Sistema de hábitos diários com check-in emocional e micro-exercícios.",
      "Histórico de consciência e lembretes diários personalizáveis.",
      "Atualização automática do PWA com banner de nova versão.",
      "Fallback offline para páginas públicas autorizadas.",
    ],
  },
  {
    version: "2026.04.20",
    date: "20 Abr 2026",
    highlights: [
      "Experiência streaming na Home com 'Continuar de onde parei'.",
      "Modo imersivo nas sessões e barra de progresso global.",
      "Sequência de dias consecutivos (streak) com Flame.",
    ],
  },
];
