import { PCHObjectiveId } from "@/types/objectives";

export type BlocoTipo = "text" | "reflection" | "exercise" | "action";

export interface Bloco {
  id: string;
  tipo: BlocoTipo;
  titulo?: string;
  conteudo: string;
  instrucao?: string;
  placeholder?: string;
  imagem?: string;
}

export interface SessaoJornada {
  id: string;
  titulo: string;
  descricao: string;
  blocos: Bloco[];
  objetivos?: PCHObjectiveId[];
}

export interface FaseJornada {
  id: string;
  numero: number;
  titulo: string;
  descricao: string;
  cor: string;
  sessoes: SessaoJornada[];
}

export const JORNADA_DATA: FaseJornada[] = [
  {
    id: "despertar",
    numero: 1,
    titulo: "Despertar",
    descricao: "O início da consciência. Percebendo os padrões automáticos e despertando a presença.",
    cor: "amber",
    sessoes: [
      {
        id: "aula-exclusiva-modulo",
        titulo: "Fundamentos PADH",
        descricao: "A base técnica e científica da metodologia.",
        blocos: [
          {
            id: "ae-b1",
            tipo: "text",
            titulo: "Anatomia Poética",
            conteudo: "Cada verso que você lê não é apenas informação, é uma vibração que reorganiza o tecido da sua mente. Nesta jornada, a poesia não é literatura, é uma ferramenta de intervenção neurobiológica.",
          },
          {
            id: "ae-b2",
            tipo: "reflection",
            titulo: "A Ressonância",
            conteudo: "Respire fundo por um instante. Se as suas dores fossem palavras, quais seriam as mais pesadas? E se pudéssemos, através da rima e do ritmo, dissolver esse peso e transformá-lo em luz?",
          },
          {
            id: "ae-b3",
            tipo: "action",
            titulo: "O Primeiro Passo",
            conteudo: "Assista à aula de introdução. Ela é o seu mapa técnico para entender como a Poesia Cognitiva Hipnótica (PCH) age no seu sistema nervoso.",
          }
        ],
      },
      {
        id: "percepcao-inicial",
        titulo: "O Portal da Percepção",
        descricao: "Mapeando onde você está e como seu cérebro processa a realidade.",
        objetivos: ["ansiedade", "foco"],
        blocos: [
          {
            id: "b1-percepcao",
            tipo: "text",
            titulo: "O Palco da Alma",
            conteudo: "Quando você lê, o seu cérebro não diferencia a realidade da imaginação poética. Usaremos essa 'falha' do sistema para criar um teatro simbólico onde você é, simultaneamente, o diretor e o protagonista da sua cura.",
          },
          {
            id: "b2-percepcao",
            tipo: "reflection",
            titulo: "Pausa Consciente",
            conteudo: "Sinta agora o ar entrando e saindo. Há uma parte de você que observa tudo em silêncio. Consegue percebê-la? É desse lugar de observador que nossa jornada realmente começa.",
          },
          {
            id: "ex1-s1-f1",
            tipo: "exercise",
            titulo: "Nuvens de Pensamento",
            conteudo: "Aprender a ver os pensamentos sem ser tragado por eles.",
            instrucao: "Feche os olhos por 60 segundos. Observe o que surge na mente sem julgar. Ao abrir, registre três desses pensamentos como se fossem apenas nuvens passageiras no céu da sua consciência.",
            placeholder: "Nuvem 1... Nuvem 2...",
          },
          {
            id: "ex2-s1-f1",
            tipo: "exercise",
            titulo: "Dreno vs. Nutrição",
            conteudo: "Identificar para onde sua energia vital está fugindo.",
            instrucao: "Olhe para sua rotina recente. Quais momentos te deixam 'vazio' e quais te deixam 'cheio'? Liste três de cada, focando na sensação física que eles provocam.",
            placeholder: "Momentos de Dreno: ... | Momentos de Nutrição: ...",
          },
          {
            id: "a1-percepcao",
            tipo: "action",
            titulo: "Vigília Poética",
            conteudo: "Ao longo do dia, cada vez que a ansiedade bater à porta, não tente expulsá-la. Apenas dê a ela uma cor e uma textura. Como seria essa imagem?",
          }
        ],
      },
      {
        id: "prisoes-invisiveis",
        titulo: "As Grades da Mente",
        descricao: "Identificando as prisões silenciosas que carregamos.",
        objetivos: ["reprogramacao"],
        blocos: [
          {
            id: "b1-prisoes",
            tipo: "text",
            titulo: "Arquitetura do Medo",
            conteudo: "Crenças limitantes são como paredes que construímos para nos proteger, mas que acabaram nos isolando. Para sair da cela, primeiro precisamos tocar nos seus tijolos e entender do que são feitos.",
          },
          {
            id: "ex1-s1-fpi",
            tipo: "exercise",
            titulo: "Mapeando as Celas",
            conteudo: "Identificar os padrões que bloqueiam sua liberdade.",
            instrucao: "Pense nas áreas da sua vida onde você se sente 'preso'. Quais frases repetitivas você diz a si mesmo nessas horas? Escreva-as com honestidade radical.",
            placeholder: "As frases que me prendem são...",
          },
          {
            id: "ex2-s1-fpi",
            tipo: "exercise",
            titulo: "O Encontro no Espelho",
            conteudo: "Atravessar a superfície da própria imagem.",
            instrucao: "Vá até um espelho. Olhe fixamente nos seus olhos por um minuto. O que você vê além do reflexo físico? O que a sua alma está tentando te dizer através desse olhar?",
            placeholder: "Atrás do reflexo, eu percebi que...",
          },
        ],
      },
    ],
  },
  {
    id: "sombra",
    numero: 2,
    titulo: "Encontro com a Sombra",
    descricao: "Explorando as partes negadas de si mesmo. Integrando o que foi excluído.",
    cor: "indigo",
    sessoes: [
      {
        id: "critico-interno",
        titulo: "A Voz do Carcereiro",
        descricao: "Personificando e entendendo o crítico interno.",
        blocos: [
          {
            id: "b1-sombra",
            tipo: "text",
            titulo: "A Sombra Terapêutica",
            conteudo: "Sua sombra não é sua inimiga; ela é apenas uma parte de você que foi ferida e se escondeu. Na PCH, personificamos essa voz para que ela possa, finalmente, ser ouvida e integrada.",
          },
          {
            id: "ex1-s1-f2",
            tipo: "exercise",
            titulo: "O Rosto da Crítica",
            conteudo: "Dar forma ao que antes era apenas um sentimento vago.",
            instrucao: "Se a voz que te julga fosse um personagem real, como seria o rosto dele? Quais roupas usaria? Dê a ele um nome que retire o seu poder assustador.",
            placeholder: "O nome desse personagem é... e ele se parece com...",
          },
          {
            id: "ex3-s2-fpi",
            tipo: "exercise",
            titulo: "Diálogo com o Medo",
            conteudo: "Transformar o conflito em conversa.",
            instrucao: "Escreva um parágrafo começando com: 'Eu sei que você está tentando me proteger, mas...'. Explique ao seu carcereiro interno que agora você está assumindo o comando.",
            placeholder: "Eu sei que você está tentando me proteger, mas...",
          },
        ],
      },
    ],
  },
  {
    id: "reprogramacao",
    numero: 3,
    titulo: "Reprogramação",
    descricao: "Criando novos caminhos neurais e emocionais através da intenção poética.",
    cor: "emerald",
    sessoes: [
      {
        id: "novas-narrativas",
        titulo: "A Fenda na Parede",
        descricao: "Ressignificando a história e descobrindo a liberdade.",
        objetivos: ["escrita"],
        blocos: [
          {
            id: "b1-repro",
            tipo: "text",
            titulo: "A Cura pelo Verbo",
            conteudo: "Quando você altera um verso da sua história, você altera a química do seu cérebro. A reprogramação é o ato sagrado de escolher novas palavras para definir quem você é.",
          },
          {
            id: "ex1-s1-f3",
            tipo: "exercise",
            titulo: "Alquimia Poética",
            conteudo: "Transformar a 'chumbo' da dor no 'ouro' do sentido.",
            instrucao: "Pegue uma situação difícil e transforme-a em uma metáfora de natureza. (Ex: Meu luto não é um fim, é um inverno necessário para que a semente descanse).",
            placeholder: "Minha situação se parece com... e isso significa que...",
          },
          {
            id: "ex3-s3-fpi",
            tipo: "exercise",
            titulo: "O Cântico da Fenda",
            conteudo: "Celebrar a luz que já começou a entrar.",
            instrucao: "Onde a parede da sua cela já está rachada? Escreva dois versos curtos sobre a luz que você já consegue enxergar através dessa fresta.",
            placeholder: "Pela fenda que se abriu,\neu vi...",
          },
        ],
      },
    ],
  },
  {
    id: "expansao",
    numero: 4,
    titulo: "Expansão",
    descricao: "Manifestando sua verdade no mundo. O florescimento da jornada.",
    cor: "rose",
    sessoes: [
      {
        id: "manifestacao",
        titulo: "O Respiro da Liberdade",
        descricao: "Integrando o aprendizado ao cotidiano e vivendo em fluxo.",
        blocos: [
          {
            id: "b1-exp",
            tipo: "text",
            titulo: "O Horizonte Infinito",
            conteudo: "Você atravessou o despertar, a sombra e a reprogramação. Agora, a poesia não é mais algo que você faz, é a forma como você vive. Você é o autor livre da sua própria existência.",
          },
          {
            id: "ex1-s5-fpi",
            tipo: "exercise",
            titulo: "Paisagem Pós-Cárcere",
            conteudo: "Visualizar o futuro que você está criando.",
            instrucao: "Feche os olhos e veja a porta se abrindo. Sinta o vento no rosto. O que você faz no primeiro minuto de liberdade total? Descreva essa cena com detalhes sensoriais.",
            placeholder: "No meu primeiro minuto de liberdade, eu...",
          },
          {
            id: "ex3-s5-fpi",
            tipo: "exercise",
            titulo: "O Poema da Minha Verdade",
            conteudo: "Consolidar sua nova identidade em versos eternos.",
            instrucao: "Escreva um poema curto que defina quem você se tornou hoje. Não use palavras do passado. Use apenas palavras de agora e de amanhã.",
            placeholder: "Eu sou o vento que...",
          },
        ],
      },
    ],
  },
];