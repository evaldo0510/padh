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
            conteudo: "Imagine que cada verso é uma frequência que atravessa o seu sistema nervoso. Nesta jornada, não estamos apenas lendo; estamos ativando novos caminhos neurais através da beleza e da precisão da linguagem.",
          },
          {
            id: "ae-b2",
            tipo: "reflection",
            titulo: "A Escuta Profunda",
            conteudo: "Antes de mudar o que você sente, você precisa ouvir o que a sua dor está dizendo. O que mora no silêncio entre um pensamento e outro?",
          },
          {
            id: "ae-b3",
            tipo: "action",
            titulo: "O Convite",
            conteudo: "Sua primeira tarefa é assistir à aula de fundamentos. Ela vai te dar as lentes necessárias para enxergar a poesia como uma ciência da alma.",
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
            titulo: "O Observador",
            conteudo: "Seu cérebro é um excelente contador de histórias, mas nem todas elas são verdadeiras. A primeira etapa da liberdade é perceber que você não é a história que está sendo contada, mas sim quem a observa.",
          },
          {
            id: "b2-percepcao",
            tipo: "reflection",
            titulo: "Resonância Interna",
            conteudo: "Feche os olhos. Sinta a pulsação no centro do seu peito. Há uma calma ali que nunca foi tocada pelo caos externo. Consegue senti-la por um breve segundo?",
          },
          {
            id: "ex1-s1-f1",
            tipo: "exercise",
            titulo: "Nuvens Passageiras",
            conteudo: "Aprenda a observar o fluxo mental sem se identificar com ele.",
            instrucao: "Feche os olhos por um minuto. Observe os pensamentos como se fossem nuvens cruzando o céu. Ao abrir, descreva as três 'nuvens' mais insistentes que passaram por você agora.",
            placeholder: "Identifique seus pensamentos passageiros...",
          },
          {
            id: "ex2-s1-f1",
            tipo: "exercise",
            titulo: "Fontes de Energia",
            conteudo: "Mapeie o que drena e o que nutre sua presença.",
            instrucao: "Quais são as três coisas que mais roubam sua calma hoje? E quais são as três que te devolvem ao seu centro? Seja específico nos detalhes sensoriais.",
            placeholder: "Drenos: ... | Nutrientes: ...",
          },
          {
            id: "a1-percepcao",
            tipo: "action",
            titulo: "Presença Ativa",
            conteudo: "Durante o dia, toda vez que sentir o corpo tensionar, faça uma respiração lenta e diga mentalmente: 'Eu estou aqui'.",
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
            titulo: "Muros de Ar",
            conteudo: "Muitas das nossas prisões são feitas de palavras repetidas por anos. Se as palavras construíram os muros, novas palavras podem abrir as portas.",
          },
          {
            id: "ex1-s1-fpi",
            tipo: "exercise",
            titulo: "O Mapa do Cárcere",
            conteudo: "Identifique as crenças que limitam seus passos.",
            instrucao: "Se a sua maior limitação atual fosse uma cela, do que seriam feitas as grades? Medo do julgamento? Insegurança? Escreva as três frases que compõem essas grades.",
            placeholder: "As frases que me prendem são...",
          },
          {
            id: "ex2-s1-fpi",
            tipo: "exercise",
            titulo: "Olhar Radical",
            conteudo: "Encontre-se com a sua verdade diante do espelho.",
            instrucao: "Vá ao espelho e olhe nos seus próprios olhos por um minuto inteiro. O que você vê por trás da imagem social? O que a criança que você foi quer te dizer agora?",
            placeholder: "No fundo dos meus olhos, eu percebi que...",
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
            titulo: "O Outro em Mim",
            conteudo: "Sua sombra não é um monstro; é uma parte de você que foi exilada. Na PCH, damos rosto e voz a essa sombra para que ela pare de gritar no escuro e comece a conversar na luz.",
          },
          {
            id: "ex1-s1-f2",
            tipo: "exercise",
            titulo: "Dando Nome à Voz",
            conteudo: "Personifique o seu crítico interno para diminuir o seu poder.",
            instrucao: "Se a voz que te critica fosse um personagem de teatro, como ele seria? Qual o nome dele? Descreva suas roupas, seu tom de voz e seu olhar.",
            placeholder: "O meu crítico se chama... e ele é...",
          },
          {
            id: "ex3-s2-fpi",
            tipo: "exercise",
            titulo: "Pacto de Paz",
            conteudo: "Inicie um diálogo curativo com a sua autocrítica.",
            instrucao: "Escreva uma pequena mensagem para esse personagem. Em vez de lutar, diga: 'Eu entendo que você tenta me proteger, mas agora eu escolho outro caminho'.",
            placeholder: "Minha mensagem para ele é...",
          },
        ],
      },
      {
        id: "labirinto-medos",
        titulo: "O Labirinto dos Medos",
        descricao: "Atravessando as emoções mais densas com a tocha da poesia.",
        blocos: [
          {
            id: "b1-labirinto",
            tipo: "text",
            titulo: "Frio e Luz",
            conteudo: "O medo é apenas o lugar onde a sua luz ainda não chegou. Usaremos a metáfora para iluminar os corredores mais escuros do seu labirinto interior.",
          },
          {
            id: "ex1-labirinto",
            tipo: "exercise",
            titulo: "A Imagem do Medo",
            conteudo: "Transformar o medo abstrato em uma imagem concreta.",
            instrucao: "Escolha o seu maior medo hoje. Se ele fosse um elemento da natureza (tempestade, pântano, deserto), qual seria? Descreva essa paisagem.",
            placeholder: "O meu medo se parece com um...",
          },
          {
            id: "ex2-labirinto",
            tipo: "exercise",
            titulo: "A Tocha Poética",
            conteudo: "Encontrar o recurso que dissolve o medo.",
            instrucao: "Agora, imagine um elemento que traz equilíbrio a essa paisagem. Se o medo é deserto, qual seria a chuva? Escreva um verso sobre esse encontro.",
            placeholder: "Sobre o meu deserto, eu chovo...",
          }
        ]
      }
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
        objetivos: ["reprogramacao"],
        blocos: [
          {
            id: "b1-repro",
            tipo: "text",
            titulo: "Neuro-Escrita",
            conteudo: "Cada palavra que você escolhe com intenção é um novo sinal elétrico no seu cérebro. Estamos aqui para hackear o sistema através da beleza e da rima.",
          },
          {
            id: "ex1-s1-f3",
            tipo: "exercise",
            titulo: "O Verbo Novo",
            conteudo: "Substituir palavras rígidas por metáforas fluidas.",
            instrucao: "Pegue uma frase negativa que você diz muito sobre si mesmo. Transforme-a em uma metáfora de crescimento. (Ex: 'Eu falhei' → 'Eu sou uma semente em processo de quebra').",
            placeholder: "Minha nova frase é...",
          },
          {
            id: "ex3-s3-fpi",
            tipo: "exercise",
            titulo: "O Verso da Luz",
            conteudo: "Focar na abertura por onde a mudança acontece.",
            instrucao: "Onde o seu muro interior já está rachado? Escreva dois versos curtos celebrando a luz que está entrando por essa fresta hoje.",
            placeholder: "Há uma fenda em mim,\npor onde...",
          },
        ],
      },
      {
        id: "arquitetura-amanha",
        titulo: "Arquitetura do Amanhã",
        descricao: "Projetando sua nova realidade através da palavra criadora.",
        blocos: [
          {
            id: "b1-amanha",
            tipo: "text",
            titulo: "O Arquiteto",
            conteudo: "O futuro não é algo que acontece; é algo que você escreve agora. Suas palavras de hoje são os tijolos da sua casa de amanhã.",
          },
          {
            id: "ex1-amanha",
            tipo: "exercise",
            titulo: "O Solo Sagrado",
            conteudo: "Preparar o terreno para a nova vida.",
            instrucao: "Quais são os três valores fundamentais que você quer que sustentem sua nova história? Escreva-os como se fossem as fundações de uma casa.",
            placeholder: "Minha base é feita de...",
          },
          {
            id: "ex2-amanha",
            tipo: "exercise",
            titulo: "A Janela do Possível",
            conteudo: "Visualizar e nomear o novo horizonte.",
            instrucao: "Olhando pela janela dessa nova arquitetura, o que você vê no horizonte da sua vida? Descreva um objetivo seu como se já fosse uma paisagem real.",
            placeholder: "Ao olhar para o amanhã, eu vejo...",
          }
        ]
      }
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
            titulo: "O Fluxo",
            conteudo: "A jornada não termina aqui; ela apenas muda de forma. Você agora é o autor consciente. A vida se tornou a sua poesia mais bonita.",
          },
          {
            id: "ex1-s5-fpi",
            tipo: "exercise",
            titulo: "Horizonte Aberto",
            conteudo: "Sinta a expansão da sua nova identidade.",
            instrucao: "Imagine a porta da cela completamente aberta. Você caminha para fora. Qual é a primeira coisa que você faz? Sinta o vento, o cheiro e a luz. Descreva esse momento.",
            placeholder: "Quando eu saí, eu senti...",
          },
          {
            id: "ex3-s5-fpi",
            tipo: "exercise",
            titulo: "Meu Poema de Poder",
            conteudo: "Crie um mantra poético para levar com você.",
            instrucao: "Escreva um poema curto (4 a 8 versos) que defina quem você é hoje. Esta será a sua âncora para os dias que virão.",
            placeholder: "Eu sou o vento que...",
          },
        ],
      },
    ],
  },
];