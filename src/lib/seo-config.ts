export const SITE_URL = "https://padhpoesia.lovable.app";

export interface PageSEO {
  title: string;
  description: string;
  path: string;
}

export const pagesSEO: Record<string, PageSEO> = {
  home: {
    title: "PCH — Poesia Cognitiva Hipnótica | Transformação Interior",
    description:
      "Descubra a metodologia PCH — Poesia Cognitiva Hipnótica. Uma abordagem que une neurociência, hipnose ericksoniana e linguagem poética para a libertação emocional e consciência.",
    path: "/",
  },
  livroCurso: {
    title: "Livro-Curso PCH — Jornada da Consciência",
    description:
      "Experimente a Poesia Cognitiva Hipnótica na prática. O Livro-Curso PCH traz exercícios guiados e poemas terapêuticos para sua transformação interior.",
    path: "/livro-curso",
  },
  formacao: {
    title: "Formação Profissional em PCH | Certificação em Poesia Cognitiva Hipnótica",
    description:
      "Capacitação completa para terapeutas e educadores na metodologia PCH (Poesia Cognitiva Hipnótica). Certificação profissional com Evaldo de Jesus Santana.",
    path: "/formacao",
  },
  mapaCerebral: {
    title: "Mapa Cerebral PCH — Neurociência e Poesia Hipnótica",
    description:
      "Veja como a Poesia Cognitiva Hipnótica (PCH) ativa áreas específicas do cérebro. A ciência por trás da transformação através da palavra e do fluxo.",
    path: "/mapa-cerebral",
  },
  aulaExclusiva: {
    title: "Aula Exclusiva PCH — A Transformação na Prática",
    description:
      "Aprenda os fundamentos da PCH nesta aula gratuita. Descubra como a Poesia Cognitiva Hipnótica utiliza a linguagem simbólica para cura emocional e libertação.",
    path: "/aula-exclusiva",
  },
  sobre: {
    title: "Sobre Evaldo de Jesus Santana | Criador da Metodologia PCH",
    description:
      "Conheça o criador da Poesia Cognitiva Hipnótica. Evaldo de Jesus Santana desenvolveu a PCH unindo neurociência, hipnose ericksoniana e a profundidade da poesia.",
    path: "/sobre",
  },
  contato: {
    title: "Contato PCH — Inicie sua Jornada de Transformação",
    description:
      "Fale conosco sobre a Formação, Livro-Curso ou Curso PCH. Comece hoje sua transformação através da Poesia Cognitiva Hipnótica.",
    path: "/contato",
  },
  ferramentas: {
    title: "8 Ferramentas PCH — A Tecnologia da Poesia Hipnótica",
    description:
      "Explore as ferramentas práticas da PCH: do Poema-Funil ao Ritual do Silêncio. Instrumentos vivos de Poesia Cognitiva Hipnótica.",
    path: "/ferramentas",
  },
  poemaFunil: {
    title: "Poema-Funil | Ferramenta de Indução PCH",
    description:
      "Conheça o Poema-Funil, técnica da PCH que utiliza a Poesia Hipnótica para conduzir a um estado de introspecção profunda e autoconhecimento.",
    path: "/ferramentas/poema-funil",
  },
  versoGatilho: {
    title: "Verso-Gatilho | Âncora de Poesia Cognitiva PCH",
    description:
      "Aprenda a criar âncoras emocionais poderosas com o Verso-Gatilho, uma das ferramentas fundamentais da Poesia Cognitiva Hipnótica.",
    path: "/ferramentas/verso-gatilho",
  },
  poemadiagnostico: {
    title: "Poemadiagnóstico | O Espelho da Metodologia PCH",
    description:
      "Identifique bloqueios e paisagens emocionais através do Poemadiagnóstico, ferramenta diagnóstica da Poesia Cognitiva Hipnótica.",
    path: "/ferramentas/poemadiagnostico",
  },
  cadernoVozInterna: {
    title: "Caderno de Voz Interna | Escrita Terapêutica PCH",
    description:
      "Pratique a escrita poética guiada pelos pilares da PCH. O Caderno de Voz Interna é seu aliado no desenvolvimento da consciência contínua.",
    path: "/ferramentas/caderno-voz-interna",
  },
  encenacaoPoetica: {
    title: "Encenação Poética | Expressão Corporal e PCH",
    description:
      "Vá além das palavras com a Encenação Poética. Use o corpo e a voz para vivenciar a Poesia Cognitiva Hipnótica.",
    path: "/ferramentas/encenacao-poetica",
  },
  reescritaPoetica: {
    title: "Reescrita Poética | Transformando Narrativas com PCH",
    description:
      "Ressignifique sua história pessoal através da Reescrita Poética, técnica da PCH para transformar dor em beleza e libertação emocional.",
    path: "/ferramentas/reescrita-poetica",
  },
  ritualSilencio: {
    title: "Ritual do Silêncio Poético | A Pausa na PCH",
    description:
      "Descubra a importância do vácuo criativo e do silêncio na Poesia Cognitiva Hipnótica. O estado de fluxo em sua forma mais pura.",
    path: "/ferramentas/ritual-silencio",
  },
  poesiaHipnotica: {
    title: "Poesia Hipnótica | Linguagem Ericksoniana e PCH",
    description:
      "Mergulhe na essência técnica da Poesia Cognitiva Hipnótica. Como a poesia se torna um portal para facilitar a mudança interior profunda.",
    path: "/ferramentas/poesia-hipnotica",
  },
  cursoPCH: {
    title: "Curso PCH — Domínio Técnico da Metodologia",
    description:
      "O manual técnico completo da metodologia PCH (Poesia Cognitiva Hipnótica). Aprenda a base científica e os pilares estruturais da transformação.",
    path: "/curso-padh",
  },
  cienciaPoesia: {
    title: "Ciência da Poesia | Base Científica da PCH",
    description:
      "Acesse os estudos científicos que validam a PCH (Poesia Cognitiva Hipnótica) e comprovam a eficácia da poesia no cérebro e na emoção.",
    path: "/ciencia-da-poesia",
  },
  comboPADH: {
    title: "Combo PCH | A Jornada Integrada Completa",
    description:
      "Acesse o pacote completo da Poesia Cognitiva Hipnótica: Livro-Curso + Curso Técnico + Formação Profissional. Domine a arte da transformação.",
    path: "/combo-padh",
  },
};