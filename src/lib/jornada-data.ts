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
            conteudo: "Imagine que cada verso que você lê é uma chave. Nesta aula, descobriremos como a poesia age como agente neuroplástico, redesenhando a mente com símbolos.",
          },
          {
            id: "ae-b2",
            tipo: "reflection",
            titulo: "Reflexão Técnica",
            conteudo: "Qual parte do seu cérebro você mais usa para se esconder de si mesmo? E se o verso for o bisturi mais gentil que o inconsciente aceita?",
          },
          {
            id: "ae-b3",
            tipo: "action",
            titulo: "Aplicação Prática",
            conteudo: "Assista à aula completa para entender como construir poemas com intenção terapêutica precisa.",
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
            titulo: "A Ciência do Olhar",
            conteudo: "Ao ler poesia, não estamos só decifrando versos — estamos reencenando vivências emocionais em teatro simbólico interno. A alma tem razões que o cérebro pode explicar se soubermos escutar os dois em uníssono.",
          },
          {
            id: "b2-percepcao",
            tipo: "reflection",
            titulo: "Momento de Presença",
            conteudo: "Feche os olhos por um momento. Respire fundo e sinta o peso do seu corpo. Como você se sente agora, neste exato segundo?",
          },
          {
            id: "ex1-s1-f1",
            tipo: "exercise",
            titulo: "O Observador Silencioso",
            conteudo: "Um exercício para se distanciar do caos mental.",
            instrucao: "Feche os olhos por 2 minutos. Ao abrir, descreva 3 pensamentos que passaram pela sua mente como se fossem nuvens no céu.",
            placeholder: "Escreva seus pensamentos aqui...",
          },
          {
            id: "ex2-s1-f1",
            tipo: "exercise",
            titulo: "Inventário de Energia",
            conteudo: "Descubra o que drena e o que nutre você.",
            instrucao: "Liste 3 atividades que sugam sua energia e 3 que te revigoram.",
            placeholder: "Sugas: ... | Revigoram: ...",
          },
          {
            id: "a1-percepcao",
            tipo: "action",
            titulo: "Compromisso de Observação",
            conteudo: "Durante o dia de hoje, toda vez que você se sentir ansioso, pare e descreva a sensação em uma metáfora poética.",
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
            titulo: "O Mapa do Cárcere",
            conteudo: "Muitas vezes, nossas maiores limitações não vêm do mundo externo, mas das grades invisíveis que construímos com o tempo — crenças, medos e narrativas repetitivas.",
          },
          {
            id: "ex1-s1-fpi",
            tipo: "exercise",
            titulo: "O Inventário das Correntes",
            conteudo: "Identificando o que te aprisiona hoje.",
            instrucao: "Liste 3 situações, pessoas ou pensamentos que funcionam como 'celas' na sua vida atual. Não julgue — apenas observe.",
            placeholder: "1. ... \n2. ... \n3. ...",
          },
          {
            id: "ex2-s1-fpi",
            tipo: "exercise",
            titulo: "O Espelho Honesto",
            conteudo: "Encontrando-se com a própria imagem.",
            instrucao: "Olhe no espelho por 1 minuto em silêncio. Depois escreva: o que é que você vê? O que mora do outro lado de você?",
            placeholder: "Quando me olhei, vi...",
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
            titulo: "A Área de Broca e as Sombras",
            conteudo: "O cérebro tenta decodificar metáforas como puzzles emocionais. Quando personificamos nossa sombra, damos ao córtex pré-frontal as ferramentas para reinterpretar dores antigas.",
          },
          {
            id: "ex1-s1-f2",
            tipo: "exercise",
            titulo: "Dando Nome ao Crítico",
            conteudo: "Personificando a voz que julga.",
            instrucao: "Se o seu crítico interno fosse um personagem de um livro, como ele seria? Qual o nome dele?",
            placeholder: "Descrição do personagem...",
          },
          {
            id: "ex3-s2-fpi",
            tipo: "exercise",
            titulo: "Carta ao Carcereiro",
            conteudo: "Dialogando com o que aprisiona.",
            instrucao: "Escreva uma carta curta para essa voz interna. Não para destruí-la — para entendê-la. Comece com: 'Eu te escuto, mas...'",
            placeholder: "Eu te escuto, mas...",
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
            titulo: "Neuroplasticidade Poética",
            conteudo: "Ao reescrevermos um verso que toca uma dor, estamos na verdade criando novos caminhos neurais. A poesia facilita o 'insight' terapêutico ao contornar as defesas lógicas.",
          },
          {
            id: "ex1-s1-f3",
            tipo: "exercise",
            titulo: "O Verso de Poder",
            conteudo: "Criando uma afirmação poética.",
            instrucao: "Transforme um medo seu em uma metáfora de força.",
            placeholder: "Ex: Meu medo é um muro, minha coragem é a hera que o escala.",
          },
          {
            id: "ex3-s3-fpi",
            tipo: "exercise",
            titulo: "O Verso da Fenda",
            conteudo: "Transformando a fresta em poesia.",
            instrucao: "Escreva 2 versos curtos que descrevam a fenda na sua parede interior — o lugar por onde a luz já consegue entrar.",
            placeholder: "Há uma fenda em mim,\npor onde...",
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
        titulo: "O Primeiro Respiro Livre",
        descricao: "Integrando o aprendizado ao cotidiano e vivendo em fluxo.",
        blocos: [
          {
            id: "b1-exp",
            tipo: "text",
            titulo: "Viver em Fluxo",
            conteudo: "A expansão acontece quando a linguagem poética deixa de ser um exercício e se torna seu estado natural de consciência. Você agora é o autor da sua própria narrativa.",
          },
          {
            id: "ex1-s5-fpi",
            tipo: "exercise",
            titulo: "A Porta Aberta",
            conteudo: "Visualizando a saída.",
            instrucao: "Feche os olhos por 2 minutos e imagine a porta da sua cela interior se abrindo lentamente. O que existe do lado de fora? Descreva a paisagem.",
            placeholder: "Do outro lado da porta eu vejo...",
          },
          {
            id: "ex3-s5-fpi",
            tipo: "exercise",
            titulo: "O Poema da Liberdade",
            conteudo: "Selando a jornada com a sua voz.",
            instrucao: "Escreva um poema curto (4 a 8 versos) que celebra esse novo começo. Esta é a sua voz livre falando.",
            placeholder: "Hoje eu...",
          },
        ],
      },
    ],
  },
];
