export const SITE_URL = 'https://padhpoesia.lovable.app';

export interface PageSEO {
  title: string;
  description: string;
  path: string;
}

export const pagesSEO: Record<string, PageSEO> = {
  home: {
    title: 'Poesia Aplicada ao Desenvolvimento Humano',
    description: 'Descubra a Poesia Cognitiva Hipnótica (PCH) — metodologia que une neurociência, hipnose ericksoniana e linguagem poética para transformação interior.',
    path: '/',
  },
  livroCurso: {
    title: 'Livro-Curso PCH',
    description: 'Mergulhe na teoria e prática da Poesia Cognitiva Hipnótica com exercícios guiados que transformam a leitura em experiência terapêutica.',
    path: '/livro-curso',
  },
  formacao: {
    title: 'Formação em PCH',
    description: 'Capacitação completa para terapeutas, psicólogos e educadores que desejam usar poesia como ferramenta clínica de transformação.',
    path: '/formacao',
  },
  mapaCerebral: {
    title: 'Mapa Cerebral da Poesia',
    description: 'Descubra como cada verso ativa áreas específicas do cérebro — da amígdala ao córtex pré-frontal — com a neurociência da PCH.',
    path: '/mapa-cerebral',
  },
  aulaExclusiva: {
    title: 'Aula Exclusiva',
    description: 'Acesse uma aula exclusiva sobre Poesia Cognitiva Hipnótica e aprenda a usar a palavra como instrumento de cura.',
    path: '/aula-exclusiva',
  },
  sobre: {
    title: 'Sobre Evaldo PCH Master',
    description: 'Conheça Evaldo PCH Master, criador da metodologia P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/sobre',
  },
  contato: {
    title: 'Contato',
    description: 'Entre em contato com Evaldo PCH Master para formações, palestras e atendimentos com Poesia Cognitiva Hipnótica.',
    path: '/contato',
  },
  ferramentas: {
    title: '7 Ferramentas P.A.D.H.',
    description: 'Do Poema-Funil ao Ritual do Silêncio Poético — 7 instrumentos vivos para transformação interior através da poesia.',
    path: '/ferramentas',
  },
  poemaFunil: {
    title: 'Poema-Funil — A Espiral da Palavra',
    description: 'Induza uma jornada interna progressiva do externo ao mais profundo com o pré-transe poético que ativa o hemisfério direito.',
    path: '/ferramentas/poema-funil',
  },
  versoGatilho: {
    title: 'Verso-Gatilho — A Palavra-Chave que Liberta',
    description: 'Crie uma âncora emocional rápida — um verso memorável que funciona como botão de emergência emocional.',
    path: '/ferramentas/verso-gatilho',
  },
  poemadiagnostico: {
    title: 'Poemadiagnóstico — O Espelho Emocional',
    description: 'Identifique a paisagem emocional por meio da escolha espontânea entre poemas — o inconsciente revela sem constrangimento.',
    path: '/ferramentas/poemadiagnostico',
  },
  cadernoVozInterna: {
    title: 'Caderno de Voz Interna',
    description: 'Use a escrita poética como espelho terapêutico diário — um diário do oráculo que revela padrões emocionais.',
    path: '/ferramentas/caderno-voz-interna',
  },
  encenacaoPoetica: {
    title: 'Encenação Poética',
    description: 'Viva o poema com o corpo inteiro — a performance poética como ferramenta de desbloqueio emocional e expressão.',
    path: '/ferramentas/encenacao-poetica',
  },
  reescritaPoetica: {
    title: 'Reescrita Poética',
    description: 'Transforme narrativas internas limitantes em versos de empoderamento com a técnica de reescrita poética da PCH.',
    path: '/ferramentas/reescrita-poetica',
  },
  ritualSilencio: {
    title: 'Ritual do Silêncio Poético',
    description: 'Descubra o poder terapêutico do silêncio entre versos — a pausa como instrumento de integração e profundidade.',
    path: '/ferramentas/ritual-silencio',
  },
  poesiaHipnotica: {
    title: 'Poesia Hipnótica — O Poder das Palavras',
    description: 'A Poesia Cognitiva Hipnótica usa a palavra com propósito para reestruturar pensamentos e emoções, criando caminhos de transformação.',
    path: '/ferramentas/poesia-hipnotica',
  },
  cursoPCH: {
    title: 'Curso PCH — Poesia Cognitiva Hipnótica',
    description: 'Curso completo de Poesia Cognitiva Hipnótica com módulos práticos para transformação interior através da palavra.',
    path: '/curso-pch',
  },
};
