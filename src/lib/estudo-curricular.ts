export interface EtapaEstudoPCH {
  numero: number;
  titulo: string;
  descricao: string;
  moduleIds: string[];
  nota?: string;
}

/**
 * Organização pedagógica sugerida para a Formação profissional.
 * A fonte dos módulos não declara pré-requisitos curriculares formais;
 * por isso a sequência organiza o estudo, sem alterar IDs ou numeração.
 */
export const ETAPAS_ESTUDO_PCH: EtapaEstudoPCH[] = [
  {
    numero: 1,
    titulo: "Fundamentos e escuta",
    descricao:
      "Comece observando como a linguagem expressa a experiência e avance para o mapeamento de crenças. O Módulo 2 pode retomar palavras recorrentes e sinais observados no Módulo 1.",
    moduleIds: ["modulo-1", "modulo-2"],
  },
  {
    numero: 2,
    titulo: "Linguagem e construção poética",
    descricao:
      "Estude recursos de linguagem sugestiva e, em seguida, a construção de poemas personalizados. O Módulo 4 indica explicitamente o vocabulário colhido nos Módulos 1 e 2 como matéria de trabalho.",
    moduleIds: ["modulo-3", "modulo-4"],
  },
  {
    numero: 3,
    titulo: "Aprofundamento e adequação",
    descricao:
      "Conheça metáforas curativas e os tipos de poesia terapêutica, relacionando recursos ao momento do processo conforme o conteúdo de cada módulo.",
    moduleIds: ["modulo-5", "modulo-6"],
    nota:
      "O Módulo 5 é descrito como avançado e traz exigências próprias de formação, estabilidade e supervisão nos seus cuidados. Consulte esses itens antes de aplicar o conteúdo.",
  },
  {
    numero: 4,
    titulo: "Condução e integração",
    descricao:
      "Integre os conteúdos em um fluxo de sessão e avance para exercícios práticos de autonomia e continuidade, respeitando a prontidão descrita no Módulo 8.",
    moduleIds: ["modulo-7", "modulo-8"],
    nota:
      "No Módulo 7, os tempos das quatro fases somam 50 minutos, enquanto a estimativa do módulo informa 80 minutos. A divergência foi preservada e não é resolvida nesta organização.",
  },
];

/** Módulos relacionados por complementaridade temática; não são pré-requisitos formais. */
export const COMPLEMENTOS_ESTUDO_PCH: Record<string, string[]> = {
  "modulo-1": ["modulo-2", "modulo-4"],
  "modulo-2": ["modulo-1", "modulo-4"],
  "modulo-3": ["modulo-4", "modulo-5"],
  "modulo-4": ["modulo-1", "modulo-2", "modulo-3", "modulo-5"],
  "modulo-5": ["modulo-3", "modulo-4", "modulo-6"],
  "modulo-6": ["modulo-4", "modulo-7"],
  "modulo-7": ["modulo-6", "modulo-8"],
  "modulo-8": ["modulo-4", "modulo-6", "modulo-7"],
};

/** Observações de estudo baseadas nos próprios dados dos módulos. */
export const NOTAS_ESTUDO_PCH: Record<string, string> = {
  "modulo-5":
    "O Módulo 5 é descrito como avançado e traz exigências próprias de formação, estabilidade e supervisão nos seus cuidados. Consulte esses itens antes de aplicar o conteúdo.",
  "modulo-7":
    "Os tempos das quatro fases somam 50 minutos, enquanto a estimativa do módulo informa 80 minutos. A divergência foi preservada e não é resolvida nesta organização.",
  "modulo-8":
    "O módulo descreve sinais de prontidão e cuidados próprios para os exercícios de autonomia; consulte esses campos junto das tarefas sugeridas ao paciente.",
};

export const ORDEM_ESTUDO_PCH = ETAPAS_ESTUDO_PCH.flatMap(
  (etapa) => etapa.moduleIds,
);

export function getEtapaEstudoPCH(moduleId: string) {
  return ETAPAS_ESTUDO_PCH.find((etapa) => etapa.moduleIds.includes(moduleId));
}
