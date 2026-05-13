import { PCHObjectiveId } from "@/types/objectives";

export type BlocoTipo = "text" | "reflection" | "exercise" | "action" | "choice";

export interface BlocoOpcao {
  id: string;
  label: string;
}

export interface Bloco {
  id: string;
  tipo: BlocoTipo;
  titulo?: string;
  conteudo: string;
  instrucao?: string;
  placeholder?: string;
  imagem?: string;
  opcoes?: BlocoOpcao[];
  multiSelect?: boolean;
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
  resultados?: string[];
}

export const JORNADA_DATA: FaseJornada[] = [
  {
    id: "despertar",
    numero: 1,
    titulo: "Despertar",
    descricao: "O início da consciência. Percebendo os padrões automáticos e despertando a presença.",
    cor: "amber",
    resultados: ["Consciência dos padrões", "Redução da reatividade", "Mapeamento mental"],
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
    descricao: "Transformar consciência em novas respostas internas. Interrompendo padrões e criando novas escolhas.",
    cor: "emerald",
    sessoes: [
      {
        id: "interrupcao-automato",
        titulo: "Interrupção",
        descricao: "Quebrando o piloto automático.",
        blocos: [
          {
            id: "rp-m1-b1",
            tipo: "text",
            titulo: "O Padrão",
            conteudo: "Você não muda o padrão enquanto responde no automático. A mudança exige uma quebra na continuidade do hábito.",
          },
          {
            id: "rp-m1-b2",
            tipo: "exercise",
            titulo: "Observação Atenta",
            conteudo: "Identifique o gatilho da reação.",
            instrucao: "Hoje, observe o momento exato em que você reage sem pensar. O que disparou essa resposta?",
            placeholder: "O gatilho foi...",
          },
          {
            id: "rp-m1-b3",
            tipo: "exercise",
            titulo: "A Pausa Sagrada",
            conteudo: "Criar um espaço entre estímulo e resposta.",
            instrucao: "Antes de reagir novamente a um gatilho, pare por 3 segundos. O que você sentiu nesse breve silêncio?",
            placeholder: "Durante a pausa, percebi...",
          },
          {
            id: "rp-m1-b4",
            tipo: "reflection",
            titulo: "Insight",
            conteudo: "A pausa é o primeiro espaço de mudança. É onde o seu 'eu consciente' retoma o controle.",
          }
        ],
      },
      {
        id: "escolha-consciente",
        titulo: "Escolha Consciente",
        descricao: "Substituir reação por escolha.",
        blocos: [
          {
            id: "rp-m2-b1",
            tipo: "text",
            titulo: "O Espaço de Liberdade",
            conteudo: "Entre o estímulo e a resposta... existe um espaço. Nesse espaço reside sua liberdade e o poder de escolher sua resposta.",
          },
          {
            id: "rp-m2-b2",
            tipo: "exercise",
            titulo: "A Nova Resposta",
            conteudo: "Experimentar um caminho diferente.",
            instrucao: "Em uma situação hoje, escolha responder de forma diferente do habitual. O que você escolheu fazer?",
            placeholder: "Eu escolhi responder...",
          },
          {
            id: "rp-m2-b3",
            tipo: "exercise",
            titulo: "Registro de Rota",
            conteudo: "Ancorar a nova escolha.",
            instrucao: "O que você fez de diferente e como se sentiu ao não seguir o script antigo?",
            placeholder: "A diferença foi... e me senti...",
          },
          {
            id: "rp-m2-b4",
            tipo: "reflection",
            titulo: "Evolução",
            conteudo: "Pequenas escolhas constroem novas direções. Você está redesenhando seu mapa interno.",
          }
        ],
      },
      {
        id: "nova-linguagem-interna",
        titulo: "Nova Linguagem Interna",
        descricao: "Transformar o diálogo interno.",
        blocos: [
          {
            id: "rp-m3-b1",
            tipo: "text",
            titulo: "O Verbo Criador",
            conteudo: "A forma como você fala consigo molda o que você sente. Suas palavras internas são sementes de realidade.",
          },
          {
            id: "rp-m3-b2",
            tipo: "exercise",
            titulo: "Auditória Interna",
            conteudo: "Capturar o crítico.",
            instrucao: "Identifique uma frase negativa que você repete internamente com frequência.",
            placeholder: "A frase é: '...'",
          },
          {
            id: "rp-m3-b3",
            tipo: "exercise",
            titulo: "Alquimia do Verbo",
            conteudo: "Reescrever a narrativa.",
            instrucao: "Reescreva essa frase de forma mais consciente, construtiva e poética.",
            placeholder: "Minha nova frase é...",
          },
          {
            id: "rp-m3-b4",
            tipo: "reflection",
            titulo: "Caminhos Mentais",
            conteudo: "Palavras internas criam caminhos mentais. Ao mudar a fala, você muda o destino do pensamento.",
          }
        ],
      },
      {
        id: "reacao-emocional",
        titulo: "Reação Emocional",
        descricao: "Regular respostas emocionais.",
        blocos: [
          {
            id: "rp-m4-b1",
            tipo: "text",
            titulo: "Sentir vs. Agir",
            conteudo: "Você não controla o que sente... mas pode escolher o que faz com isso. Sentir é inevitável, reagir é opcional.",
          },
          {
            id: "rp-m4-b2",
            tipo: "exercise",
            titulo: "O Surfista das Emoções",
            conteudo: "Observar a onda sem se afogar.",
            instrucao: "Quando uma emoção intensa surgir hoje, apenas observe-a no corpo sem agir imediatamente.",
            placeholder: "A emoção foi... e eu senti no corpo em...",
          },
          {
            id: "rp-m4-b3",
            tipo: "exercise",
            titulo: "Percepção de Fluxo",
            conteudo: "Notar a impermanência.",
            instrucao: "O que mudou ao não reagir? Como a emoção se transformou enquanto você apenas a observava?",
            placeholder: "Ao não reagir, percebi que...",
          },
          {
            id: "rp-m4-b4",
            tipo: "reflection",
            titulo: "Soberania",
            conteudo: "Sentir não obriga a agir. Você acaba de conquistar um território de soberania emocional.",
          }
        ],
      },
      {
        id: "novo-comportamento",
        titulo: "Novo Comportamento",
        descricao: "Criar ação prática diferente.",
        blocos: [
          {
            id: "rp-m5-b1",
            tipo: "text",
            titulo: "Ação Consciente",
            conteudo: "Consciência sem ação volta ao padrão antigo. A verdadeira reprogramação se consolida no movimento físico.",
          },
          {
            id: "rp-m5-b2",
            tipo: "exercise",
            titulo: "O Alvo",
            conteudo: "Escolher o ponto de mudança.",
            instrucao: "Escolha um comportamento específico que você quer mudar hoje (ex: uma resposta ríspida, um hábito de procrastinar).",
            placeholder: "Quero mudar o comportamento de...",
          },
          {
            id: "rp-m5-b3",
            tipo: "exercise",
            titulo: "O Ato de Coragem",
            conteudo: "Executar o novo.",
            instrucao: "Execute uma pequena ação diferente da habitual. Descreva o que você fez.",
            placeholder: "Eu agi de forma diferente ao...",
          },
          {
            id: "rp-m5-b4",
            tipo: "reflection",
            titulo: "Início",
            conteudo: "A mudança começa no pequeno. Um passo diferente já altera toda a trilha futura.",
          }
        ],
      },
      {
        id: "repeticao-consciente",
        titulo: "Repetição Consciente",
        descricao: "Fixar o novo padrão.",
        blocos: [
          {
            id: "rp-m6-b1",
            tipo: "text",
            titulo: "A Trilha no Bosque",
            conteudo: "O que se repete se fortalece. Cada repetição do novo comportamento é um golpe de machado na mata fechada abrindo caminho.",
          },
          {
            id: "rp-m6-b2",
            tipo: "exercise",
            titulo: "Consistência",
            conteudo: "Reafirmar a escolha.",
            instrucao: "Repita conscientemente o novo comportamento hoje, mesmo que pareça forçado no início.",
            placeholder: "Repeti o ato de... por X vezes.",
          },
          {
            id: "rp-m6-b3",
            tipo: "exercise",
            titulo: "Registro de Força",
            conteudo: "Medir a resistência.",
            instrucao: "Como foi repetir? Sentiu menos resistência do que na primeira vez?",
            placeholder: "Desta vez, a sensação foi...",
          },
          {
            id: "rp-m6-b4",
            tipo: "reflection",
            titulo: "Estabilidade",
            conteudo: "Repetição cria estabilidade. Você está transformando um esforço em uma nova natureza.",
          }
        ],
      },
      {
        id: "consolidacao-interna",
        titulo: "Consolidação",
        descricao: "Ancorar a mudança interna.",
        blocos: [
          {
            id: "rp-m7-b1",
            tipo: "text",
            titulo: "Metamorfose",
            conteudo: "Você não é mais o mesmo que começou. As células da sua consciência se reorganizaram ao redor de novas escolhas.",
          },
          {
            id: "rp-m7-b2",
            tipo: "exercise",
            titulo: "Retrospectiva",
            conteudo: "Honrar o percurso.",
            instrucao: "O que mudou em você até aqui? Olhe para o seu 'eu' de sete dias atrás.",
            placeholder: "Percebo que mudei em...",
          },
          {
            id: "rp-m7-b3",
            tipo: "exercise",
            titulo: "Ancoragem",
            conteudo: "Fixar a bandeira.",
            instrucao: "Qual novo comportamento ou resposta interna você já consegue manter com naturalidade?",
            placeholder: "Hoje já é natural para mim...",
          },
          {
            id: "rp-m7-b4",
            tipo: "reflection",
            titulo: "Infinito",
            conteudo: "Mudança não é um evento. É um processo que você já iniciou e que não tem mais volta. Bem-vindo à sua nova versão.",
          }
        ],
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
  {
    id: "expansao",
    numero: 4,
    titulo: "Expansão",
    descricao: "Manifestando sua verdade no mundo. O florescimento da jornada, consolidando identidade e propósito.",
    cor: "rose",
    sessoes: [
      {
        id: "identidade-expandida",
        titulo: "Identidade Expandida",
        descricao: "Consolidando o novo 'eu' consciente.",
        blocos: [
          {
            id: "ex-m1-b1",
            tipo: "text",
            titulo: "O Novo Eu",
            conteudo: "Você não é mais quem costumava ser. A expansão começa quando você habita plenamente a sua nova pele mental, sem pedir desculpas por sua evolução.",
          },
          {
            id: "ex-m1-b2",
            tipo: "exercise",
            titulo: "Auto-Definição",
            conteudo: "Nomear a nova versão de si mesmo.",
            instrucao: "Escreva três adjetivos que definem quem você é hoje, que não faziam parte do seu vocabulário há um mês.",
            placeholder: "Eu sou...",
          },
          {
            id: "ex-m1-b3",
            tipo: "reflection",
            titulo: "Soberania",
            conteudo: "A soberania interior é o ato de decidir o próprio valor sem depender do espelho do outro. Como é a sensação de ser o autor da própria história?",
          }
        ],
      },
      {
        id: "proposito-pratico",
        titulo: "Propósito Prático",
        descricao: "Transformando valores em ações reais.",
        blocos: [
          {
            id: "ex-m2-b1",
            tipo: "text",
            titulo: "Ação no Mundo",
            conteudo: "Propósito não é um destino distante, é a bússola que orienta cada passo hoje. É onde seus talentos encontram as necessidades da vida.",
          },
          {
            id: "ex-m2-b2",
            tipo: "exercise",
            titulo: "O Chamado",
            conteudo: "Identificar onde você quer atuar.",
            instrucao: "Qual área da sua vida (trabalho, família, comunidade) mais precisa da sua nova versão hoje?",
            placeholder: "A área é...",
          },
          {
            id: "ex-m2-b3",
            tipo: "exercise",
            titulo: "O Primeiro Movimento",
            conteudo: "Planejar a ação real.",
            instrucao: "Descreva uma ação concreta que você fará nas próximas 24 horas para manifestar seu propósito nessa área.",
            placeholder: "Amanhã eu vou...",
          }
        ],
      },
      {
        id: "consistencia-fluxo",
        titulo: "Consistência e Fluxo",
        descricao: "Mantendo a chama acesa no cotidiano.",
        blocos: [
          {
            id: "ex-m3-b1",
            tipo: "text",
            titulo: "A Manutenção do Verbo",
            conteudo: "O fluxo é mantido pela consistência das pequenas escolhas. Não é sobre grandes saltos, mas sobre nunca deixar de caminhar.",
          },
          {
            id: "ex-m3-b2",
            tipo: "exercise",
            titulo: "Ritual de Ancoragem",
            conteudo: "Criar uma rotina de presença.",
            instrucao: "Escolha uma palavra-chave para ser sua âncora diária. Qual será o sinal (ex: ao acordar, ao beber água) que te lembrará dessa palavra?",
            placeholder: "Minha palavra é... e meu sinal é...",
          },
          {
            id: "ex-m3-b3",
            tipo: "reflection",
            titulo: "O Fluxo",
            conteudo: "A vida flui quando paramos de lutar contra a correnteza e começamos a ajustar as velas. Você está pronto para navegar?",
          }
        ],
      },
      {
        id: "legado-impacto",
        titulo: "Legado e Impacto",
        descricao: "A marca que deixamos nos outros.",
        blocos: [
          {
            id: "ex-m4-b1",
            tipo: "text",
            titulo: "Eco Poético",
            conteudo: "Sua transformação ecoa. Quando você muda, o sistema ao seu redor é obrigado a se reorganizar. Seu maior legado é a sua própria presença.",
          },
          {
            id: "ex-m4-b2",
            tipo: "exercise",
            titulo: "Servir com Versos",
            conteudo: "Identificar o impacto positivo.",
            instrucao: "Como a sua mudança pode beneficiar alguém próximo a você hoje? O que você pode oferecer sem esforço?",
            placeholder: "Eu posso oferecer...",
          },
          {
            id: "ex-m4-b3",
            tipo: "reflection",
            titulo: "A Marca",
            conteudo: "O que você gostaria que as pessoas sentissem quando estivessem em sua presença daqui para frente?",
          }
        ],
      },
      {
        id: "integracao-estilo-vida",
        titulo: "Estilo de Vida PADH",
        descricao: "Viver em estado de poesia cognitiva.",
        blocos: [
          {
            id: "ex-m5-b1",
            tipo: "text",
            titulo: "O Fechamento do Círculo",
            conteudo: "O PADH deixa de ser um método e se torna sua lente. Você agora vê poesia na neurociência e ciência na sensibilidade.",
          },
          {
            id: "ex-m5-b2",
            tipo: "exercise",
            titulo: "O Manifesto",
            conteudo: "Sua declaração de liberdade.",
            instrucao: "Escreva seu manifesto pessoal de expansão. Use frases curtas, no presente, que comecem com 'Eu escolho...'.",
            placeholder: "Eu escolho...",
          },
          {
            id: "ex-m5-b3",
            tipo: "reflection",
            titulo: "Plenitude",
            conteudo: "A jornada termina, mas o caminho continua. Sinta a gratidão por cada fenda que permitiu a luz entrar. Você é a expansão.",
          }
        ],
      }
    ],
  },
];