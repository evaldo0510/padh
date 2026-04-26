export const SITE_URL = 'https://padhpoesia.lovable.app';

export interface PageSEO {
  title: string;
  description: string;
  path: string;
}

export const pagesSEO: Record<string, PageSEO> = {
  home: {
    title: 'P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano',
    description: 'Conheça o P.A.D.H. (Poesia, Aplicada, Desenvolvimento, Humano) — metodologia que une neurociência, hipnose ericksoniana e linguagem poética para transformação interior.',
    path: '/',
  },
  livroCurso: {
    title: 'Livro-Curso P.A.D.H.',
    description: 'Mergulhe na teoria e prática da Poesia Aplicada ao Desenvolvimento Humano com exercícios guiados que transformam a leitura em experiência terapêutica.',
    path: '/livro-curso',
  },
  formacao: {
    title: 'Formação em P.A.D.H.',
    description: 'Capacitação completa para terapeutas, psicólogos e educadores que desejam usar a Poesia Aplicada ao Desenvolvimento Humano como ferramenta clínica.',
    path: '/formacao',
  },
  mapaCerebral: {
    title: 'Mapa Cerebral da Poesia — P.A.D.H.',
    description: 'Descubra como cada verso ativa áreas específicas do cérebro com a neurociência da Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/mapa-cerebral',
  },
  aulaExclusiva: {
    title: 'Aula Exclusiva P.A.D.H.',
    description: 'Acesse uma aula exclusiva sobre Poesia Aplicada ao Desenvolvimento Humano e aprenda a usar a palavra como instrumento de cura.',
    path: '/aula-exclusiva',
  },
  sobre: {
    title: 'Sobre Evaldo de Jesus Santana',
    description: 'Conheça Evaldo de Jesus Santana, criador da metodologia P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano e seus 4 pilares.',
    path: '/sobre',
  },
  contato: {
    title: 'Contato — P.A.D.H.',
    description: 'Entre em contato com Evaldo de Jesus Santana para formações, palestras e atendimentos com Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/contato',
  },
  ferramentas: {
    title: '7 Ferramentas P.A.D.H.',
    description: 'Do Poema-Funil ao Ritual do Silêncio Poético — instrumentos da Poesia Aplicada ao Desenvolvimento Humano para transformação interior.',
    path: '/ferramentas',
  },
  poemaFunil: {
    title: 'Poema-Funil — A Espiral da Palavra',
    description: 'Induza uma jornada interna progressiva com o pré-transe poético do P.A.D.H. que ativa o hemisfério direito.',
    path: '/ferramentas/poema-funil',
  },
  versoGatilho: {
    title: 'Verso-Gatilho — A Palavra-Chave que Liberta',
    description: 'Crie uma âncora emocional rápida com a técnica de Verso-Gatilho da Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/ferramentas/verso-gatilho',
  },
  poemadiagnostico: {
    title: 'Poemadiagnóstico — O Espelho Emocional',
    description: 'Identifique a paisagem emocional por meio da Poesia Aplicada ao Desenvolvimento Humano — o inconsciente revela sem constrangimento.',
    path: '/ferramentas/poemadiagnostico',
  },
  cadernoVozInterna: {
    title: 'Caderno de Voz Interna',
    description: 'Use a escrita poética como espelho terapêutico diário dentro da metodologia P.A.D.H.',
    path: '/ferramentas/caderno-voz-interna',
  },
  encenacaoPoetica: {
    title: 'Encenação Poética',
    description: 'Viva o poema com o corpo inteiro — a performance poética como ferramenta P.A.D.H. de desbloqueio emocional.',
    path: '/ferramentas/encenacao-poetica',
  },
  reescritaPoetica: {
    title: 'Reescrita Poética',
    description: 'Transforme narrativas internas limitantes em versos de empoderamento com a técnica de reescrita do P.A.D.H.',
    path: '/ferramentas/reescrita-poetica',
  },
  ritualSilencio: {
    title: 'Ritual do Silêncio Poético',
    description: 'Descubra o poder terapêutico do silêncio entre versos na metodologia da Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/ferramentas/ritual-silencio',
  },
  poesiaHipnotica: {
    title: 'Poesia Hipnótica — P.A.D.H.',
    description: 'A Poesia Aplicada ao Desenvolvimento Humano usa a palavra com propósito para reestruturar pensamentos e emoções.',
    path: '/ferramentas/poesia-hipnotica',
  },
  cursoPCH: {
    title: 'Curso P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano',
    description: 'Curso completo de P.A.D.H. com módulos práticos para transformação interior através da palavra.',
    path: '/curso-padh',
  },
  cienciaPoesia: {
    title: 'Ciência da Poesia — Estudos Científicos',
    description: 'Estudos que validam o uso terapêutico da poesia e fundamentam os 4 pilares do P.A.D.H.',
    path: '/ciencia-da-poesia',
  },
};
