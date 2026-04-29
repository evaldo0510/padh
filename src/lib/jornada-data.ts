export interface Exercicio {
  id: string;
  titulo: string;
  descricao: string;
  instrucao: string;
  placeholder?: string;
}

export interface SessaoJornada {
  id: string;
  titulo: string;
  descricao: string;
  exercicios: Exercicio[];
  objetivos?: string[];
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
    id: "fase-1",
    numero: 1,
    titulo: "Despertar",
    descricao:
      "O início da consciência. Percebendo os padrões automáticos e despertando a presença.",
    cor: "amber",
    sessoes: [
      {
        id: "s1-f1",
        titulo: "Mapeando o Agora",
        descricao: "Identificando onde você está emocionalmente.",
        objetivo: "ansiedade",
        exercicios: [
          {
            id: "ex1-s1-f1",
            titulo: "O Observador Silencioso",
            descricao: "Um exercício para se distanciar do caos mental.",
            instrucao:
              "Feche os olhos por 2 minutos. Ao abrir, descreva 3 pensamentos que passaram pela sua mente como se fossem nuvens no céu.",
            placeholder: "Escreva seus pensamentos aqui...",
          },
          {
            id: "ex2-s1-f1",
            titulo: "Inventário de Energia",
            descricao: "Descubra o que drena e o que nutre você.",
            instrucao:
              "Liste 3 atividades que sugam sua energia e 3 que te revigoram.",
            placeholder: "Sugas: ... | Revigoram: ...",
          },
        ],
      },
      {
        id: "s1-fpi",
        titulo: "As Grades Invisíveis",
        descricao:
          "Reconhecer as prisões silenciosas que carregamos sem perceber.",
        objetivo: "reprogramacao",
        exercicios: [
          {
            id: "ex1-s1-fpi",
            titulo: "O Inventário das Correntes",
            descricao: "Identificando o que te aprisiona hoje.",
            instrucao:
              "Liste 3 situações, pessoas ou pensamentos que funcionam como 'celas' na sua vida atual. Não julgue — apenas observe.",
            placeholder: "1. ... \n2. ... \n3. ...",
          },
          {
            id: "ex2-s1-fpi",
            titulo: "O Espelho Honesto",
            descricao: "Encontrando-se com a própria imagem.",
            instrucao:
              "Olhe no espelho por 1 minuto em silêncio. Depois escreva: o que é que você vê? O que mora do outro lado de você?",
            placeholder: "Quando me olhei, vi...",
          },
          {
            id: "ex3-s1-fpi",
            titulo: "A Primeira Verdade",
            descricao: "Nomeando a prisão central.",
            instrucao:
              "Complete em uma frase: 'Minha maior prisão interior se chama ______ e ela me mantém presa(o) porque ______.'",
            placeholder: "Minha maior prisão interior se chama...",
          },
        ],
      },
    ],
  },
  {
    id: "fase-2",
    numero: 2,
    titulo: "Encontro com a Sombra",
    descricao:
      "Explorando as partes negadas de si mesmo. Integrando o que foi excluído.",
    cor: "indigo",
    sessoes: [
      {
        id: "s1-f2",
        titulo: "As Vozes Críticas",
        descricao: "Conhecendo seu crítico interno.",
        exercicios: [
          {
            id: "ex1-s1-f2",
            titulo: "Dando Nome ao Crítico",
            descricao: "Personificando a voz que julga.",
            instrucao:
              "Se o seu crítico interno fosse um personagem de um livro, como ele seria? Qual o nome dele?",
            placeholder: "Descrição do personagem...",
          },
        ],
      },
      {
        id: "s2-fpi",
        titulo: "A Voz do Carcereiro",
        descricao:
          "Conhecer o crítico interno que mantém as portas trancadas.",
        exercicios: [
          {
            id: "ex1-s2-fpi",
            titulo: "Dando Rosto à Voz",
            descricao: "Personificando o crítico interno.",
            instrucao:
              "Se a voz que mais te julga fosse uma pessoa, quem ela seria? Descreva sua aparência, idade, tom de voz e a frase que ela mais repete dentro de você.",
            placeholder: "Essa voz se parece com...",
          },
          {
            id: "ex2-s2-fpi",
            titulo: "A Origem do Carcereiro",
            descricao: "Investigando de onde veio essa voz.",
            instrucao:
              "Quando foi a primeira vez que você ouviu essa voz? Quem na sua história disse algo parecido? Escreva sem censura.",
            placeholder: "A primeira vez foi quando...",
          },
          {
            id: "ex3-s2-fpi",
            titulo: "Carta ao Carcereiro",
            descricao: "Dialogando com o que aprisiona.",
            instrucao:
              "Escreva uma carta curta para essa voz interna. Não para destruí-la — para entendê-la. Comece com: 'Eu te escuto, mas...'",
            placeholder: "Eu te escuto, mas...",
          },
        ],
      },
    ],
  },
  {
    id: "fase-3",
    numero: 3,
    titulo: "Reprogramação",
    descricao:
      "Criando novos caminhos neurais e emocionais através da intenção poética.",
    cor: "emerald",
    sessoes: [
      {
        id: "s1-f3",
        titulo: "Novas Narrativas",
        descricao: "Reescrevendo a história que você conta para si mesmo.",
        objetivo: "escrita",
        exercicios: [
          {
            id: "ex1-s1-f3",
            titulo: "O Verso de Poder",
            descricao: "Criando uma afirmação poética.",
            instrucao: "Transforme um medo seu em uma metáfora de força.",
            placeholder:
              "Ex: Meu medo é um muro, minha coragem é a hera que o escala.",
          },
        ],
      },
      {
        id: "s3-fpi",
        titulo: "A Fenda na Parede",
        descricao:
          "Descobrir as pequenas frestas por onde a luz já entra.",
        exercicios: [
          {
            id: "ex1-s3-fpi",
            titulo: "Os Momentos de Liberdade",
            descricao: "Resgatando memórias de leveza.",
            instrucao:
              "Lembre-se de 3 momentos da sua vida (recentes ou antigos) em que você se sentiu genuinamente livre. Descreva um deles em detalhe — cheiros, sons, sensações.",
            placeholder: "Eu me senti livre quando...",
          },
          {
            id: "ex2-s3-fpi",
            titulo: "A Pequena Rebelião",
            descricao: "Identificando atos de coragem cotidianos.",
            instrucao:
              "Que pequeno gesto de liberdade você praticou nos últimos 7 dias? Pode ser dizer 'não', escolher um caminho diferente, silenciar quando todos falavam. Honre esse gesto.",
            placeholder: "Meu pequeno ato de liberdade foi...",
          },
          {
            id: "ex3-s3-fpi",
            titulo: "O Verso da Fenda",
            descricao: "Transformando a fresta em poesia.",
            instrucao:
              "Escreva 2 versos curtos que descrevam a fenda na sua parede interior — o lugar por onde a luz já consegue entrar.",
            placeholder: "Há uma fenda em mim,\npor onde...",
          },
        ],
      },
      {
        id: "s4-fpi",
        titulo: "A Chave Esquecida",
        descricao:
          "Recuperar o poder pessoal que sempre esteve com você.",
        exercicios: [
          {
            id: "ex1-s4-fpi",
            titulo: "O Que Eu Já Sei",
            descricao: "Reconhecendo a própria sabedoria.",
            instrucao:
              "Se você fosse seu próprio mentor sábio, que conselho daria a si mesmo agora, sobre a prisão que identificou no Episódio 1?",
            placeholder: "Querido(a) eu, o que precisas ouvir é...",
          },
          {
            id: "ex2-s4-fpi",
            titulo: "O Recurso Invisível",
            descricao: "Mapeando forças internas.",
            instrucao:
              "Liste 3 qualidades suas (coragem, humor, sensibilidade, teimosia...) que podem servir como chave para abrir a porta da sua cela interior.",
            placeholder: "Minhas chaves são...",
          },
          {
            id: "ex3-s4-fpi",
            titulo: "O Ritual da Chave",
            descricao: "Criando um símbolo de poder pessoal.",
            instrucao:
              "Descreva um pequeno gesto físico (tocar o peito, respirar fundo 3x, segurar um objeto) que de hoje em diante será seu lembrete de que a chave está em você.",
            placeholder: "Meu ritual será...",
          },
        ],
      },
    ],
  },
  {
    id: "fase-4",
    numero: 4,
    titulo: "Expansão",
    descricao: "Manifestando sua verdade no mundo. O florescimento da jornada.",
    cor: "rose",
    sessoes: [
      {
        id: "s1-f4",
        titulo: "Viver em Fluxo",
        descricao: "Integrando o aprendizado ao cotidiano.",
        exercicios: [
          {
            id: "ex1-s1-f4",
            titulo: "A Visão do Futuro",
            descricao: "Projetando sua essência expandida.",
            instrucao:
              "Descreva como seria um dia comum vivendo totalmente a partir da sua nova consciência.",
            placeholder: "Ao acordar, eu sinto...",
          },
        ],
      },
      {
        id: "s5-fpi",
        titulo: "O Primeiro Respiro Livre",
        descricao:
          "Atravessar a porta. Dar o primeiro passo do lado de fora.",
        exercicios: [
          {
            id: "ex1-s5-fpi",
            titulo: "A Porta Aberta",
            descricao: "Visualizando a saída.",
            instrucao:
              "Feche os olhos por 2 minutos e imagine a porta da sua cela interior se abrindo lentamente. O que existe do lado de fora? Descreva a paisagem.",
            placeholder: "Do outro lado da porta eu vejo...",
          },
          {
            id: "ex2-s5-fpi",
            titulo: "O Compromisso da Libertação",
            descricao: "Definindo o primeiro passo concreto.",
            instrucao:
              "Que ação concreta, pequena e possível você vai realizar nas próximas 48 horas como primeiro gesto de libertação? Seja específico(a).",
            placeholder: "Nas próximas 48h, eu irei...",
          },
          {
            id: "ex3-s5-fpi",
            titulo: "O Poema da Liberdade",
            descricao: "Selando a jornada com a sua voz.",
            instrucao:
              "Escreva um poema curto (4 a 8 versos) que celebra esse novo começo. Esta é a sua voz livre falando.",
            placeholder: "Hoje eu...",
          },
        ],
      },
    ],
  },
];
