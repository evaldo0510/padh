export const SITE_URL = 'https://padhpoesia.lovable.app';

export interface PageSEO {
  title: string;
  description: string;
  path: string;
}

export const pagesSEO: Record<string, PageSEO> = {
  home: {
    title: 'P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano | 4 Pilares',
    description: 'Descubra a metodologia P.A.D.H. — Poesia Aplicada ao Desenvolvimento Humano. Baseada em 4 pilares (Poesia, Aplicada, Desenvolvimento, Humano) e fundamentada em neurociência para transformação interior.',
    path: '/',
  },
  livroCurso: {
    title: 'Livro-Curso P.A.D.H. — Jornada dos 4 Pilares',
    description: 'Experimente a Poesia Aplicada ao Desenvolvimento Humano na prática. O Livro-Curso P.A.D.H. traz exercícios guiados e poemas terapêuticos fundamentados nos 4 pilares da metodologia.',
    path: '/livro-curso',
  },
  formacao: {
    title: 'Formação Profissional em P.A.D.H. | Certificação em Poesia Aplicada',
    description: 'Capacitação completa para terapeutas e educadores nos 4 pilares da P.A.D.H. (Poesia Aplicada ao Desenvolvimento Humano). Certificação profissional com Evaldo de Jesus Santana.',
    path: '/formacao',
  },
  mapaCerebral: {
    title: 'Mapa Cerebral P.A.D.H. — Neurociência e Poesia Aplicada',
    description: 'Veja como a Poesia Aplicada ao Desenvolvimento Humano (P.A.D.H.) ativa áreas específicas do cérebro. A ciência por trás da transformação através da palavra.',
    path: '/mapa-cerebral',
  },
  aulaExclusiva: {
    title: 'Aula Exclusiva P.A.D.H. — Os 4 Pilares na Prática',
    description: 'Aprenda os fundamentos da P.A.D.H. nesta aula gratuita. Descubra como a Poesia Aplicada ao Desenvolvimento Humano utiliza a linguagem simbólica para cura emocional.',
    path: '/aula-exclusiva',
  },
  sobre: {
    title: 'Sobre Evaldo de Jesus Santana | Criador da Metodologia P.A.D.H.',
    description: 'Conheça o criador da Poesia Aplicada ao Desenvolvimento Humano. Evaldo de Jesus Santana desenvolveu a P.A.D.H. unindo neurociência, hipnose ericksoniana e os 4 pilares da poesia.',
    path: '/sobre',
  },
  contato: {
    title: 'Contato P.A.D.H. — Inicie sua Jornada de Desenvolvimento Humano',
    description: 'Fale conosco sobre a Formação, Livro-Curso ou Curso P.A.D.H. Comece hoje sua transformação através da Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/contato',
  },
  ferramentas: {
    title: '8 Ferramentas P.A.D.H. — A Tecnologia da Poesia Aplicada',
    description: 'Explore as ferramentas práticas da P.A.D.H.: do Poema-Funil ao Ritual do Silêncio. Instrumentos vivos de Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/ferramentas',
  },
  poemaFunil: {
    title: 'Poema-Funil | Ferramenta de Indução P.A.D.H.',
    description: 'Conheça o Poema-Funil, técnica da P.A.D.H. que utiliza a Poesia Aplicada para conduzir a um estado de introspecção profunda e autoconhecimento.',
    path: '/ferramentas/poema-funil',
  },
  versoGatilho: {
    title: 'Verso-Gatilho | Âncora de Poesia Aplicada P.A.D.H.',
    description: 'Aprenda a criar âncoras emocionais poderosas com o Verso-Gatilho, uma das ferramentas fundamentais da Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/ferramentas/verso-gatilho',
  },
  poemadiagnostico: {
    title: 'Poemadiagnóstico | O Espelho da Metodologia P.A.D.H.',
    description: 'Identifique bloqueios e paisagens emocionais através do Poemadiagnóstico, ferramenta diagnóstica da Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/ferramentas/poemadiagnostico',
  },
  cadernoVozInterna: {
    title: 'Caderno de Voz Interna | Escrita Terapêutica P.A.D.H.',
    description: 'Pratique a escrita poética guiada pelos 4 pilares da P.A.D.H. O Caderno de Voz Interna é seu aliado no desenvolvimento humano contínuo.',
    path: '/ferramentas/caderno-voz-interna',
  },
  encenacaoPoetica: {
    title: 'Encenação Poética | Expressão Corporal e P.A.D.H.',
    description: 'Vá além das palavras com a Encenação Poética. Use o corpo e a voz para vivenciar a Poesia Aplicada ao Desenvolvimento Humano.',
    path: '/ferramentas/encenacao-poetica',
  },
  reescritaPoetica: {
    title: 'Reescrita Poética | Transformando Narrativas com P.A.D.H.',
    description: 'Ressignifique sua história pessoal através da Reescrita Poética, técnica da P.A.D.H. para transformar dor em beleza e desenvolvimento.',
    path: '/ferramentas/reescrita-poetica',
  },
  ritualSilencio: {
    title: 'Ritual do Silêncio Poético | A Pausa no P.A.D.H.',
    description: 'Descubra a importância do vácuo criativo e do silêncio na Poesia Aplicada ao Desenvolvimento Humano. O 4º pilar em sua forma mais pura.',
    path: '/ferramentas/ritual-silencio',
  },
  poesiaHipnotica: {
    title: 'Poesia Hipnótica | Linguagem Ericksoniana e P.A.D.H.',
    description: 'Mergulhe na essência técnica da Poesia Aplicada ao Desenvolvimento Humano. Como a poesia se torna hipnótica para facilitar a mudança interior.',
    path: '/ferramentas/poesia-hipnotica',
  },
  cursoPCH: {
    title: 'Curso P.A.D.H. — Domínio Técnico dos 4 Pilares',
    description: 'O manual técnico completo da metodologia P.A.D.H. (Poesia Aplicada ao Desenvolvimento Humano). Aprenda a base científica e os 4 pilares estruturais.',
    path: '/curso-padh',
  },
  cienciaPoesia: {
    title: 'Ciência da Poesia | Base Científica da P.A.D.H.',
    description: 'Acesse os estudos científicos que validam a P.A.D.H. (Poesia Aplicada ao Desenvolvimento Humano) e comprovam a eficácia da poesia no cérebro.',
    path: '/ciencia-da-poesia',
  },
  comboPADH: {
    title: 'Combo P.A.D.H. | A Jornada Integrada Completa',
    description: 'Acesse o pacote completo da Poesia Aplicada ao Desenvolvimento Humano: Livro-Curso + Curso Técnico + Formação Profissional. Domine os 4 pilares.',
    path: '/combo-padh',
  },
};