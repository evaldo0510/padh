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
    ],
  },
];
