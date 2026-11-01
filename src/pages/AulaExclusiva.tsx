import React from "react";
import { BookOpen, Clock, Target, FlaskConical, ArrowRight, Lightbulb, PenLine, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

type LessonPart = {
  number: number;
  title: string;
  duration: string;
  objective: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[]; references?: { label: string; url: string; note: string }[] }[];
  example: { title: string; text: string; analysis: string[] };
  practice: { title: string; instructions: string[]; expected: string };
  reflection: string;
};

const parts: LessonPart[] = [
  {
    number: 1,
    title: "Anatomia poética do cérebro: uma rede em diálogo",
    duration: "15 minutos",
    objective: "Compreender, em linguagem acessível, por que a leitura de um poema pode mobilizar linguagem, atenção, memória, imaginação e emoção ao mesmo tempo.",
    introduction: "Quando uma pessoa lê um poema, não existe um único botão cerebral chamado poesia. A experiência resulta da interação de diferentes processos: reconhecer palavras, compreender relações, acompanhar o ritmo, recuperar lembranças, construir imagens e atribuir sentido ao que foi lido. O chamado mapa cerebral desta aula é, portanto, um mapa de processos e perguntas — não um desenho que localiza cada sentimento em um ponto fixo.",
    sections: [
      {
        heading: "1.1 Linguagem: das palavras ao sentido",
        paragraphs: [
          "A leitura começa com a identificação de sinais escritos e sua relação com sons, palavras e significados. Mas compreender um verso exige mais do que reconhecer o vocabulário. O leitor precisa perceber relações entre as palavras, considerar o contexto e, muitas vezes, lidar com sentidos que não são literais.",
          "Na poesia, a ordem das palavras, a escolha de um verbo, uma quebra de linha ou uma imagem inesperada podem alterar a interpretação. O sentido não está apenas no dicionário: ele também nasce da relação entre texto, contexto e repertório do leitor."
        ],
        bullets: ["A palavra oferece possibilidades de significado.", "O contexto orienta, mas nem sempre encerra a interpretação.", "A ambiguidade pode ser um recurso estético, não um erro a ser eliminado."]
      },
      {
        heading: "1.2 Memória: o encontro entre texto e repertório",
        paragraphs: [
          "Ao ler, o indivíduo pode relacionar uma palavra a experiências anteriores, histórias, lugares, pessoas ou conhecimentos. Essas associações variam de leitor para leitor. A palavra “casa”, por exemplo, pode evocar acolhimento para alguém, distância para outra pessoa ou simplesmente a imagem de uma construção.",
          "Uma lembrança que surge durante a leitura é uma associação pessoal. Ela não prova que o poema revelou uma verdade escondida nem permite concluir, por si só, que existe um conflito psicológico específico."
        ],
        bullets: ["Memória autobiográfica: lembranças relacionadas à própria trajetória.", "Memória semântica: conhecimentos e significados aprendidos.", "Associação: ligação que o leitor estabelece entre o texto e seu repertório."]
      },
      {
        heading: "1.3 Atenção, imaginação e emoção",
        paragraphs: [
          "A atenção seleciona aspectos do texto: uma palavra repetida, uma imagem, uma pausa ou uma mudança de tom. A imaginação pode construir cenas e situações, mas não precisa fazê-lo para que a leitura seja válida. Algumas pessoas visualizam; outras pensam em conceitos, sons, sensações ou não percebem uma resposta marcante.",
          "Emoções podem acompanhar a leitura, mas não são universais nem previsíveis. O mesmo poema pode provocar conforto, estranhamento, indiferença ou lembranças diferentes em pessoas distintas. A postura educativa é acolher a diversidade de respostas, sem induzir o participante a sentir algo determinado."
        ],
        bullets: ["Atenção não é concentração perfeita: pode oscilar.", "Imaginação não é necessariamente visual.", "A ausência de emoção intensa também é uma resposta legítima."]
      },
      {
        heading: "1.4 A rede de modo padrão e a reflexão interna",
        references: [{ label: "Poetic brain: The neural substrates underlying imaginative and philosophical poem reading (Wu et al., 2026)", url: "https://www.nature.com/articles/s41599-026-07217-9", note: "Estudo de neuroimagem sobre leitura imaginativa e filosófica; associações neurais em tarefas experimentais não demonstram efeitos terapêuticos." },{ label: "Neural substrates of ambiguity and beauty in haiku poetry: an fMRI study (2026)", url: "https://pubmed.ncbi.nlm.nih.gov/42729248/", note: "Estudo com 39 participantes sobre ambiguidade, apreciação estética e regiões associadas à rede de modo padrão." },{ label: "The impact of knowledge on poetry composition: An fMRI investigation (2022)", url: "https://pubmed.ncbi.nlm.nih.gov/36399814/", note: "Investiga conectividade funcional durante a composição poética; não demonstra benefício clínico." }],
        paragraphs: [
          "A rede de modo padrão (Default Mode Network, DMN) é um conjunto de regiões que costuma ser estudado em atividades como pensamento autorreferencial, lembranças autobiográficas, imaginação de cenários e reflexão sobre outras pessoas. Ela não é um “centro da poesia” e não trabalha isoladamente.",
          "A leitura pode alternar momentos de foco no texto com momentos de associação e reflexão. A participação de redes cerebrais depende da tarefa, do leitor e do contexto. Por isso, não é correto afirmar que todo poema ativa a DMN da mesma maneira ou que essa atividade comprova um efeito terapêutico."
        ],
        bullets: ["DMN é uma rede distribuída, não uma região única.", "Atividade cerebral não equivale automaticamente a benefício clínico.", "Estudos de grupo não permitem prever a experiência de cada leitor."]
      }
    ],
    example: {
      title: "Exemplo comentado: a palavra “janela”",
      text: "“Deixei a janela aberta para o dia entrar.”",
      analysis: [
        "Sentido literal: uma janela física está aberta.",
        "Possível imagem: luz, ar, paisagem ou movimento.",
        "Possível associação pessoal: uma lembrança de casa, liberdade, espera ou mudança — se isso surgir para o leitor.",
        "Leitura responsável: perguntar “o que essa imagem significa para você?” é diferente de afirmar “janela representa sua necessidade de liberdade”."
      ]
    },
    practice: {
      title: "Prática de observação em três camadas",
      instructions: [
        "Leia o exemplo em voz baixa ou silenciosamente, sem pressa.",
        "Registre uma palavra que chamou sua atenção, caso alguma tenha chamado.",
        "Separe o que está escrito no verso daquilo que você associou pessoalmente.",
        "Anote também se não surgiu imagem, lembrança ou emoção específica."
      ],
      expected: "O objetivo não é produzir uma interpretação profunda. É aprender a distinguir texto, associação e interpretação."
    },
    reflection: "O que veio do poema e o que veio da minha própria história?"
  },
  {
    number: 2,
    title: "O que a ciência investiga — e o que ela não autoriza afirmar",
    duration: "10 minutos",
    objective: "Distinguir observação, hipótese, metáfora didática e evidência científica ao falar sobre poesia e cérebro.",
    introduction: "Uma formação responsável não usa palavras científicas apenas para dar autoridade a uma ideia. Ela explica o que foi observado, como a observação foi feita, quais são os limites do método e até onde a conclusão pode ir.",
    sections: [
      {
        heading: "2.1 Quatro níveis de afirmação",
        references: [{ label: "Identifying the mechanisms of poetry therapy and associated effects on participants (Alfrey et al., 2021)", url: "https://www.sciencedirect.com/science/article/pii/S0197455621000770", note: "Revisão da literatura empírica e modelo EFECT; destaca heterogeneidade e limites da base de evidências." },{ label: "The therapeutic functions of poetry in mental health: a systematic review and meta-analysis (Kassab, Jayatunge & Bou Khalil, 2026)", url: "https://pubmed.ncbi.nlm.nih.gov/41411711/", note: "Metanálise de 15 estudos; resultados promissores em alguns desfechos, mas amostras pequenas, risco de viés e heterogeneidade limitam conclusões." }],
        paragraphs: [
          "Observação: descreve algo que foi registrado. Exemplo: participantes relataram que determinado poema lhes trouxe uma lembrança.",
          "Hipótese: apresenta uma explicação possível que ainda precisa ser testada. Exemplo: certos recursos poéticos podem favorecer associações autobiográficas em algumas condições.",
          "Evidência: resultado obtido por método de pesquisa, com amostra, procedimento e análise descritos. A força da conclusão depende da qualidade do estudo e de sua replicação.",
          "Metáfora pedagógica: imagem usada para facilitar a compreensão. Exemplo: chamar a leitura de “uma ponte entre palavra e memória”. A metáfora ajuda a ensinar, mas não é uma descrição anatômica."
        ]
      },
      {
        heading: "2.2 O que a neuroimagem pode mostrar",
        references: [{ label: "Prosodic recitation training selectively enhances sensorimotor connectivity during poetry reading (Xu, Jia & Zheng, 2026)", url: "https://www.nature.com/articles/s42003-026-10664-4", note: "Estudo longitudinal com 70 participantes sobre recitação prosódica e conectividade sensório-motora; não é ensaio de tratamento." },{ label: "Neural dynamics of aesthetic appreciation: fNIRS evidence from poetry reading (Liu et al., 2026)", url: "https://www.sciencedirect.com/science/article/pii/S1053811926003290", note: "Pesquisa com fNIRS sobre dinâmica neural durante apreciação estética de poesia." }],
        paragraphs: [
          "Técnicas como a ressonância magnética funcional identificam mudanças indiretas associadas à atividade cerebral durante tarefas. Elas ajudam pesquisadores a comparar condições e investigar padrões, mas não leem pensamentos, não revelam automaticamente o significado de uma experiência e não diagnosticam o estado emocional de uma pessoa.",
          "Quando um estudo encontra associação entre uma tarefa e uma rede cerebral, isso não significa que essa rede seja exclusiva da tarefa. Muitas redes participam de diferentes atividades. Também é importante observar o tamanho da amostra, o grupo de comparação, a tarefa utilizada e as limitações descritas pelos autores."
        ],
        bullets: ["Associação não é prova de causa.", "Resultado médio de um grupo não descreve todos os indivíduos.", "Uma imagem cerebral não substitui escuta, contexto ou avaliação profissional."]
      },
      {
        heading: "2.3 Como ler uma afirmação científica",
        paragraphs: [
          "Antes de repetir uma afirmação, procure o estudo original. Verifique autores, ano, periódico, método, participantes e resultado efetivamente medido. Leia também a discussão e as limitações: títulos e resumos podem simplificar o que a pesquisa realmente concluiu.",
          "Desconfie de frases absolutas como “a poesia ativa a área da cura”, “um verso reprograma o cérebro” ou “a leitura elimina traumas”. São formulações fortes que exigiriam evidências específicas e robustas. Não devem ser apresentadas como fatos estabelecidos."
        ]
      },
      {
        heading: "2.4 Da pesquisa à prática educativa",
        references: [{ label: "Journal of Poetry Therapy — escopo e revisão por pares", url: "https://www.tandfonline.com/journals/tjpt20/about-this-journal", note: "Periódico interdisciplinar associado à National Association for Poetry Therapy; publica pesquisas quantitativas e qualitativas, prática, teoria e estudos literários." },{ label: "National Association for Poetry Therapy — Journal of Poetry Therapy", url: "https://poetrytherapy.org/Journal-of-Poetry-Therapy", note: "Página institucional da associação sobre seu periódico." }],
        paragraphs: [
          "A pesquisa pode inspirar perguntas e práticas de leitura, mas uma atividade de formação não se transforma em tratamento clínico só porque utiliza conceitos da neurociência. A prática deve explicitar seu objetivo, respeitar a autonomia e não prometer resultados que não foram demonstrados.",
          "Na PCH, a poesia pode ser apresentada como recurso de linguagem, reflexão e expressão. O uso em contexto clínico exige qualificação compatível, consentimento, avaliação de adequação e respeito às normas profissionais aplicáveis."
        ]
      }
    ],
    example: {
      title: "Como reformular uma frase exagerada",
      text: "Frase imprecisa: “Este poema ativa a área cerebral responsável pela cura emocional.”",
      analysis: [
        "Problema 1: sugere uma área única responsável por um processo complexo.",
        "Problema 2: afirma um efeito cerebral específico sem apresentar estudo que o demonstre.",
        "Problema 3: promete um resultado terapêutico.",
        "Formulação mais responsável: “A leitura deste poema pode convidar à reflexão e suscitar respostas pessoais diferentes. Nesta atividade, vamos observar essas respostas sem presumir um efeito cerebral ou clínico.”"
      ]
    },
    practice: {
      title: "Oficina de rigor: classifique a afirmação",
      instructions: [
        "Escolha uma afirmação sobre poesia, cérebro ou emoção que você já ouviu.",
        "Marque se ela é observação, hipótese, evidência apresentada com fonte ou metáfora.",
        "Pergunte qual dado seria necessário para sustentá-la.",
        "Reescreva a frase de modo proporcional ao que realmente se sabe."
      ],
      expected: "O aluno deve sair sabendo comunicar limites com clareza, sem perder o valor humano da experiência poética."
    },
    reflection: "Estou usando a ciência para esclarecer uma ideia ou apenas para torná-la mais convincente?"
  },
  {
    number: 3,
    title: "Leitura como experiência pessoal e multissensorial",
    duration: "15 minutos",
    objective: "Realizar uma leitura guiada e registrar respostas pessoais sem indução, julgamento ou interpretação automática.",
    introduction: "Um poema não precisa provocar uma emoção intensa para ter valor. A leitura é uma experiência aberta: pode gerar imagens, sons internos, lembranças, perguntas, desconforto, prazer estético ou nenhuma reação marcante. O papel do facilitador é oferecer condições para observar, não determinar o que o participante deve sentir.",
    sections: [
      {
        heading: "3.1 Preparar a leitura",
        paragraphs: [
          "Escolha um lugar em que seja possível ler com tranquilidade. Ajuste a postura e o ritmo de acordo com seu conforto. Não é necessário fechar os olhos, controlar a respiração ou entrar em qualquer estado especial. A pessoa pode ler em silêncio, em voz alta ou acompanhar o texto com os olhos.",
          "Explique que a atividade é voluntária. O participante pode pular perguntas, escolher outro texto ou interromper a prática. Se um conteúdo provocar desconforto, não se deve pressionar a pessoa a continuar nem pedir que revele detalhes íntimos."
        ]
      },
      {
        heading: "3.2 Ler em três passagens",
        paragraphs: [
          "Primeira passagem — compreensão: leia para entender o que o poema apresenta. Quem fala? Que situação aparece? Há mudança entre o início e o final?",
          "Segunda passagem — atenção aos recursos: observe palavras concretas, metáforas, repetições, sonoridade, ritmo, pontuação e pausas. Não procure uma resposta escondida.",
          "Terceira passagem — resposta pessoal: pergunte o que chamou sua atenção, se alguma associação surgiu e o que permaneceu em aberto. “Nada específico” é uma resposta possível."
        ]
      },
      {
        heading: "3.3 Separar sensação, lembrança e interpretação",
        references: [{ label: "Bion e poesia (Paulo Cesar Sandler, 2010)", url: "https://pepsic.bvsalud.org/scielo.php?pid=S0103-58352010000100011&script=sci_arttext", note: "Artigo do Jornal de Psicanálise sobre referências poéticas e literárias na obra e no pensamento de Wilfred Bion." },{ label: "Sobre a linguagem poética e escuta na clínica psicanalítica (Eliane Christo Oliveira, 2021)", url: "https://revistas.pucsp.br/index.php/intercambio/article/view/48522", note: "Discute o uso de versos, rap e canções na fala de pacientes e na escuta clínica." }],
        paragraphs: [
          "Sensação é o que a pessoa percebe no momento: tensão, leveza, calor, inquietação ou ausência de sensação identificável. Lembrança é uma recordação que veio à mente. Interpretação é o significado que a pessoa atribui ao que ocorreu.",
          "Essas dimensões podem se misturar, mas não são a mesma coisa. Um facilitador pode perguntar “você gostaria de falar mais sobre essa associação?”; não deve concluir que uma imagem revela um trauma, uma crença inconsciente ou uma necessidade específica."
        ],
        bullets: ["Descrever: “notei uma imagem de mar”.", "Associar: “isso me lembrou uma viagem”.", "Interpretar: “para mim, o mar representa recomeço”.", "Evitar: “o mar prova que você está reprimindo emoções”."]
      },
      {
        heading: "3.4 Escuta respeitosa e autonomia",
        paragraphs: [
          "Se a leitura for compartilhada em grupo, cada pessoa decide o que deseja contar. Não se exige exposição emocional, leitura pública do texto produzido ou explicação de experiências pessoais. O silêncio também deve ser respeitado.",
          "O facilitador acolhe sem diagnosticar: “obrigado por compartilhar”, “podemos deixar essa parte em aberto” ou “você prefere seguir para outra pergunta?”. A linguagem deve ampliar possibilidades, não conduzir a uma conclusão pronta."
        ]
      }
    ],
    example: {
      title: "Poema breve para a experiência",
      text: "A tarde guarda um silêncio\nna dobra azul da janela;\num pensamento passa devagar\ne deixa luz sobre a mesa.",
      analysis: [
        "Compreensão: o texto constrói uma cena de tarde, silêncio, janela e luz.",
        "Recursos: personificação em “a tarde guarda”, imagem visual em “dobra azul” e movimento em “passa devagar”.",
        "Resposta pessoal: cada leitor pode notar uma palavra diferente, criar imagens distintas ou não sentir uma reação especial.",
        "Limite: nenhuma dessas respostas autoriza uma interpretação clínica automática."
      ]
    },
    practice: {
      title: "Leitura guiada com registro livre",
      instructions: [
        "Leia o poema uma vez para compreender a cena.",
        "Leia novamente e escolha um recurso de linguagem que percebeu.",
        "Registre, se desejar, uma imagem, uma lembrança, uma sensação ou uma pergunta.",
        "Escreva “não surgiu nada específico” se essa for sua experiência.",
        "Finalize com uma frase sobre o que você gostaria de guardar da leitura."
      ],
      expected: "Produzir um registro descritivo e pessoal, sem transformar a atividade em teste psicológico."
    },
    reflection: "Consegui respeitar minha experiência sem tentar fabricar uma emoção ou uma resposta?"
  },
  {
    number: 4,
    title: "Da leitura à criação: metáfora, ritmo, pausa e escolha",
    duration: "15 minutos",
    objective: "Experimentar recursos poéticos e compreender como escolhas de linguagem alteram o sentido e a experiência de leitura.",
    introduction: "A escrita poética é também um trabalho de escolha. Uma imagem pode tornar uma ideia mais concreta; um verbo pode mudar a direção de uma frase; uma pausa pode criar expectativa; uma repetição pode produzir ênfase. Não existe fórmula que garanta uma reação emocional, mas existem recursos que podem ser estudados e usados com intenção estética e comunicativa.",
    sections: [
      {
        heading: "4.1 Metáfora: aproximar campos de sentido",
        references: [{ label: "Towards psychoanalytic contribution to linguistic metaphor theory (Tair Caspi, 2018)", url: "https://pubmed.ncbi.nlm.nih.gov/33951787/", note: "Discute contribuições de Klein, Winnicott e Ogden para dimensões afetivas e intersubjetivas da metáfora; é trabalho teórico." },{ label: "Experiencing language: some thoughts on poetry and psychoanalysis (A. A. Jones, 1997)", url: "https://pubmed.ncbi.nlm.nih.gov/9385659/", note: "Reflete sobre ritmo, som, imagem e escuta na relação entre poesia e psicanálise." }],
        paragraphs: [
          "A metáfora aproxima elementos de campos diferentes para produzir uma nova compreensão. Dizer “carrego uma pedra no peito” pode expressar peso emocional sem afirmar que existe uma pedra física. O leitor interpreta a imagem com apoio do contexto e de seu repertório.",
          "Uma metáfora eficaz não precisa ser complicada. Ela precisa servir ao sentido que o autor deseja construir. Na revisão, pergunte se a imagem esclarece, surpreende ou confunde de maneira intencional."
        ]
      },
      {
        heading: "4.2 Ritmo e pausa: organizar a experiência do texto",
        paragraphs: [
          "O ritmo pode surgir do tamanho dos versos, da pontuação, da repetição, da sonoridade e da alternância entre frases longas e curtas. Uma quebra de linha pode destacar uma palavra ou criar uma suspensão. A pausa é um recurso de composição, não uma técnica que controla obrigatoriamente o estado mental do leitor.",
          "Leia o mesmo texto de duas maneiras: em fluxo contínuo e respeitando as quebras de linha. Observe o que muda na ênfase, na clareza e na musicalidade."
        ]
      },
      {
        heading: "4.3 Repetição e contraste",
        paragraphs: [
          "A repetição pode reforçar uma ideia, criar unidade ou mostrar insistência. O contraste aproxima elementos diferentes — luz e sombra, partida e chegada, silêncio e ruído — para ampliar o campo de interpretação.",
          "Use esses recursos com propósito. Repetir uma palavra sem função pode enfraquecer o texto; repetir com intenção pode criar uma estrutura memorável."
        ]
      },
      {
        heading: "4.4 Revisão: preservar a voz de quem escreve",
        paragraphs: [
          "A primeira versão serve para colocar ideias no papel. A revisão permite observar precisão, ritmo, coerência e autenticidade. Não é necessário transformar toda escrita em poema rimado nem substituir a linguagem cotidiana por palavras rebuscadas.",
          "Na proposta PCH, a linguagem deve respeitar o repertório e a autoria da pessoa. O facilitador pode oferecer alternativas, mas não deve tomar posse do texto nem impor uma interpretação como se fosse a única correta."
        ]
      },
      {
        heading: "4.5 Diálogo com a psicanálise: criação, brincar, símbolo e palavra",
        paragraphs: [
          "A psicanálise oferece leituras teóricas importantes para pensar a criação e a linguagem, mas essas formulações pertencem a tradições conceituais específicas. Elas não devem ser apresentadas como resultados de neurociência nem como comprovação experimental de que escrever poesia produz determinado efeito.",
          "Em Escritores criativos e devaneio (1908), Sigmund Freud aproxima a atividade imaginativa do escritor do brincar infantil e examina como fantasias e desejos podem participar da criação literária. Trata-se de uma hipótese metapsicológica sobre a criação, não de uma regra para interpretar a biografia ou o inconsciente de quem escreve.",
          "Donald W. Winnicott, em O brincar e a realidade (1971), desenvolve a ideia de espaço potencial e relaciona brincar, criatividade e experiência cultural. Essa contribuição permite pensar a escrita como experiência criativa em uma área intermediária entre realidade compartilhada e mundo subjetivo; não autoriza concluir que todo texto seja um objeto transicional.",
          "Wilfred Bion dedicou atenção à experiência emocional, à capacidade de pensar e à transformação de experiências. A literatura psicanalítica também investiga relações entre sua obra e a poesia. É importante distinguir o pensamento original de Bion das leituras posteriores feitas por comentadores.",
          "Na prática PCH, esses autores podem inspirar perguntas sobre imaginação, simbolização, linguagem e criação. O facilitador, porém, não deve usar um poema isolado para diagnosticar conflitos inconscientes, reconstruir traumas ou afirmar o significado definitivo de um símbolo."
        ],
        references: [
          { label: "Creative Writers and Day-Dreaming (Sigmund Freud, 1908)", url: "https://www.lutecium.org/ftp/Freud/pdf/1908_creative_writers_and_day_dreaming.pdf", note: "Texto clássico em que Freud examina relações entre brincar, fantasia e criação literária." },
          { label: "Playing and Reality (D. W. Winnicott, 1971) — capítulo sobre objetos e fenômenos transicionais", url: "https://www.mit.edu/~allanmc/winnicott1.pdf", note: "Texto de Winnicott sobre fenômenos transicionais; a aplicação à poesia é diálogo conceitual, não equivalência literal." },
          { label: "Bion e poesia (Paulo Cesar Sandler, 2010)", url: "https://pepsic.bvsalud.org/scielo.php?pid=S0103-58352010000100011&script=sci_arttext", note: "Estudo secundário sobre referências poéticas e literárias identificadas na obra de Bion." },
          { label: "Sobre a linguagem poética e escuta na clínica psicanalítica (Eliane Christo Oliveira, 2021)", url: "https://revistas.pucsp.br/index.php/intercambio/article/view/48522", note: "Artigo brasileiro que articula linguagem poética, escuta clínica e referências a Freud e Lacan." }
        ]
      }
    ],
    example: {
      title: "Duas versões, dois efeitos de linguagem",
      text: "Versão A: “Estou triste e sinto falta de alguém.”\nVersão B: “A cadeira vazia ainda conhece o teu nome.”",
      analysis: [
        "A versão A comunica diretamente uma emoção e uma ausência.",
        "A versão B transforma a ausência em imagem concreta e personifica a cadeira.",
        "Nenhuma versão é superior em todas as situações: a escolha depende da intenção, do público e do contexto.",
        "A imagem poética não comprova um estado psicológico; ela oferece uma forma de expressar uma experiência."
      ]
    },
    practice: {
      title: "Laboratório de reescrita em quatro movimentos",
      instructions: [
        "Escreva uma frase direta sobre uma experiência cotidiana, sem expor algo que não queira compartilhar.",
        "Transforme um elemento da frase em imagem concreta ou metáfora.",
        "Crie uma segunda versão usando uma pausa ou quebra de linha intencional.",
        "Leia as versões e escolha a que melhor comunica sua intenção. Explique sua escolha."
      ],
      expected: "Ao final, o aluno terá duas ou três versões do mesmo conteúdo e saberá explicar as escolhas de linguagem."
    },
    reflection: "A imagem que criei representa o que desejo comunicar ou está apenas enfeitando a frase?"
  },
  {
    number: 5,
    title: "Vivência integrada e aplicação responsável",
    duration: "10 minutos",
    objective: "Integrar leitura, observação, escrita e revisão em uma sequência simples, com atenção à autonomia e aos limites de atuação.",
    introduction: "Nesta etapa, os conhecimentos anteriores se encontram em uma prática curta. A proposta não é produzir uma transformação obrigatória nem avaliar a profundidade emocional de ninguém. O objetivo é experimentar um percurso de leitura e criação, observar o processo e identificar o que pode ser aprimorado.",
    sections: [
      {
        heading: "5.1 Sequência de aplicação",
        paragraphs: [
          "Acolhimento e escolha: apresente o objetivo, explique que a participação é voluntária e permita que a pessoa escolha participar, observar ou não realizar a atividade.",
          "Leitura: ofereça um poema breve e dê tempo suficiente para a compreensão. Evite explicar o significado antes da leitura individual.",
          "Observação: convide o participante a identificar uma palavra, imagem, recurso ou pergunta que tenha chamado sua atenção. Não pressione por lembranças ou relatos íntimos.",
          "Criação: proponha uma escrita breve inspirada em um recurso do poema. A pessoa decide o tema, a extensão e o que deseja compartilhar.",
          "Fechamento: convide a pessoa a registrar o que aprendeu sobre sua própria linguagem e pergunte se deseja guardar, revisar ou descartar o texto."
        ]
      },
      {
        heading: "5.2 Perguntas que facilitam sem induzir",
        paragraphs: [
          "Perguntas abertas preservam a autonomia: “O que você percebeu?”, “Qual palavra escolheu?”, “O que gostaria de mudar no texto?” e “Há algo que prefere deixar em branco?”.",
          "Evite perguntas que já carregam uma interpretação: “Quem te abandonou?”, “Que trauma está por trás disso?” ou “Você percebeu que precisa perdoar?”. A pergunta do facilitador não deve empurrar o participante para uma narrativa que ele não escolheu."
        ]
      },
      {
        heading: "5.3 Limites, segurança e encaminhamento",
        paragraphs: [
          "Uma atividade de leitura e escrita não substitui psicoterapia, avaliação psicológica, atendimento médico ou cuidado especializado. Se surgir sofrimento intenso, risco ou necessidade que ultrapasse o escopo da atividade, interrompa a proposta com respeito e siga os procedimentos adequados de proteção e encaminhamento.",
          "Não prometa cura, desbloqueio emocional, reprogramação cerebral ou resolução de trauma. Não use a produção escrita como diagnóstico. Registre apenas o necessário, proteja a privacidade e obtenha consentimento para qualquer compartilhamento.",
          "Em contexto profissional, a aplicação deve respeitar a formação, a competência, as normas da profissão e a legislação aplicável. A supervisão é importante quando a atividade integra um trabalho clínico."
        ],
        bullets: ["Consentimento e possibilidade real de recusa.", "Privacidade e cuidado com os registros.", "Sem diagnóstico por poema.", "Sem promessa de resultado terapêutico.", "Encaminhamento quando a demanda ultrapassar a competência do facilitador."]
      },
      {
        heading: "5.4 Como avaliar a aprendizagem",
        references: [{ label: "Poetry Therapy: Theory and Practice, 3rd edition (Nicholas F. Mazza, 2022)", url: "https://www.routledge.com/Poetry-Therapy-Theory-and-Practice/Mazza/p/book/9781003022640", note: "Obra de referência que apresenta o modelo RES: receptivo/prescritivo, expressivo/criativo e simbólico/cerimonial." },{ label: "Poetry therapy: An investigation of a multidimensional clinical model (Mazza & Hayton, 2013)", url: "https://www.sciencedirect.com/science/article/pii/S0197455612001505", note: "Estudo sobre a estrutura do modelo RES e seu uso para descrever métodos baseados nas artes da linguagem." },{ label: "Nicholas Mazza — perfil acadêmico e publicações selecionadas", url: "https://csw.fsu.edu/person/nicholas-mazza", note: "Perfil institucional da Florida State University com trajetória acadêmica e bibliografia." }],
        paragraphs: [
          "A avaliação desta aula é formativa. O aluno demonstra aprendizagem quando consegue descrever recursos de linguagem, distinguir observação de interpretação, reconhecer limites das afirmações científicas e conduzir uma atividade sem induzir respostas.",
          "O critério não é a intensidade da emoção relatada nem a qualidade literária do poema. O critério é a clareza do raciocínio, o respeito à autonomia e a capacidade de justificar escolhas."
        ]
      }
    ],
    example: {
      title: "Modelo de fechamento respeitoso",
      text: "“Você pode guardar o texto, modificá-lo ou deixá-lo aqui. Não existe uma resposta certa para esta experiência. Se quiser, compartilhe apenas o que considera confortável. O que você aprendeu sobre as palavras que escolheu?”",
      analysis: [
        "Devolve escolha ao participante.",
        "Não atribui significado psicológico ao texto.",
        "Valoriza o processo de escrita, não uma suposta transformação obrigatória.",
        "Abre espaço para reflexão sem exigir exposição."
      ]
    },
    practice: {
      title: "Plano de aplicação em uma página",
      instructions: [
        "Defina o público e o contexto em que a atividade será realizada.",
        "Escolha um poema adequado ao público e explique por que o escolheu.",
        "Escreva uma instrução de leitura e duas perguntas abertas.",
        "Defina como a pessoa poderá recusar, pausar ou encerrar a atividade.",
        "Planeje um fechamento que não prometa resultados e respeite a privacidade."
      ],
      expected: "Um plano breve, claro e seguro, pronto para ser revisado antes de qualquer aplicação."
    },
    reflection: "Minha condução amplia a autonomia do participante ou tenta conduzi-lo a uma conclusão que eu escolhi?"
  }
];

const AulaExclusiva = () => (
  <PageLayout
    seo={{
      title: "Aula Exclusiva — O Mapa Cerebral do Leitor Poético | Curso PCH",
      description: "Aula aprofundada sobre linguagem, memória, atenção, imaginação, emoção, leitura poética, rigor científico e aplicação responsável.",
      path: "/aula-exclusiva"
    }}
    currentPage="Aula Exclusiva"
  >
    <main className="container mx-auto max-w-5xl px-4 sm:px-6 py-10 md:py-16 space-y-10">
      <header className="text-center max-w-3xl mx-auto space-y-5">
        <Badge variant="outline">Curso PCH · Aula especial aprofundada</Badge>
        <h1 className="text-3xl md:text-5xl font-heading font-bold">O Mapa Cerebral do <span className="text-primary italic">Leitor Poético</span></h1>
        <p className="text-lg text-muted-foreground">Uma jornada didática pela relação entre palavra, memória, atenção, imaginação e emoção — da leitura à criação poética, com rigor científico e respeito à experiência individual.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="secondary" className="px-3 py-1"><Clock className="h-4 w-4 mr-1 inline" />65 minutos de percurso orientado</Badge>
          <Badge variant="secondary" className="px-3 py-1"><BookOpen className="h-4 w-4 mr-1 inline" />5 unidades aprofundadas</Badge>
          <Badge variant="secondary" className="px-3 py-1"><PenLine className="h-4 w-4 mr-1 inline" />5 práticas de aprendizagem</Badge>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild><a href="#conteudo">Começar a estudar <ArrowRight className="h-4 w-4 ml-2" /></a></Button>
          <Button asChild variant="outline"><Link to="/mapa-cerebral">Abrir Laboratório Cerebral <FlaskConical className="h-4 w-4 ml-2" /></Link></Button>
        </div>
      </header>

      <Card className="border-primary/20">
        <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />O que você vai aprender</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          {[
            ["Compreender", "Como linguagem, atenção, memória, imaginação e emoção participam da leitura."],
            ["Diferenciar", "Evidência científica, hipótese, observação e metáfora pedagógica."],
            ["Experimentar", "Uma leitura guiada com registro pessoal, sem respostas obrigatórias."],
            ["Criar", "Metáforas, ritmos, pausas e revisões com intenção comunicativa."],
            ["Aplicar", "Uma sequência de leitura e escrita que respeita autonomia e contexto."],
            ["Reconhecer limites", "O que uma atividade poética pode oferecer e o que não deve prometer."]
          ].map(([title, description]) => <div key={title} className="rounded-xl bg-muted/40 p-4"><p className="font-semibold mb-1">{title}</p><p className="text-sm text-muted-foreground">{description}</p></div>)}
        </CardContent>
      </Card>

      <section id="conteudo" className="space-y-5 scroll-mt-8">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold">Conteúdo da aula</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Cinco unidades para estudar e praticar</h2>
          <p className="text-muted-foreground">Abra cada unidade para acessar a explicação completa, o exemplo comentado, a atividade e a pergunta de reflexão. Você pode estudar no seu ritmo.</p>
        </div>
        <Accordion type="multiple" className="space-y-3">
          {parts.map((part) => (
            <AccordionItem key={part.number} value={String(part.number)} id={`unidade-${part.number}`} className="border rounded-xl px-4 md:px-6 bg-card">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-start gap-4 text-left">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">{part.number}</div>
                  <div className="space-y-1">
                    <p className="font-heading text-base md:text-lg font-semibold">{part.title}</p>
                    <p className="text-xs md:text-sm text-muted-foreground font-normal">{part.duration} · {part.objective}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 space-y-6">
                <p className="text-base leading-relaxed text-foreground/90">{part.introduction}</p>
                {part.sections.map((section, index) => (
                  <section key={section.heading} className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><span className="text-primary text-sm">{part.number}.{index + 1}</span>{section.heading}</h3>
                    {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex} className="text-sm md:text-base leading-relaxed text-muted-foreground">{paragraph}</p>)}
                    {section.bullets && <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                    {section.references && <div className="rounded-lg border bg-muted/20 p-4 space-y-3"><p className="text-xs uppercase tracking-wider font-semibold text-primary">Referências para aprofundamento</p>{section.references.map((reference) => <div key={reference.label} className="space-y-1"><a href={reference.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary underline underline-offset-4">{reference.label}</a><p className="text-xs leading-relaxed text-muted-foreground">{reference.note}</p></div>)}</div>}
                  </section>
                ))}
                <Card className="bg-muted/30 border-border/70">
                  <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" />{part.example.title}</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <p className="whitespace-pre-line font-heading text-base md:text-lg leading-relaxed">{part.example.text}</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">{part.example.analysis.map((item) => <li key={item}>{item}</li>)}</ul>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><PenLine className="h-4 w-4 text-primary" />{part.practice.title}</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">{part.practice.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol>
                    <p className="text-sm rounded-lg bg-primary/5 p-3"><strong>Resultado esperado:</strong> {part.practice.expected}</p>
                  </CardContent>
                </Card>
                <div className="rounded-lg border-l-2 border-primary pl-4 py-1">
                  <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Pergunta para reflexão</p>
                  <p className="text-sm md:text-base italic">{part.reflection}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" />Síntese e verificação da aprendizagem</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">Ao concluir, verifique se você consegue explicar os pontos abaixo com suas próprias palavras. A aprendizagem não depende de decorar termos: depende de compreender e aplicar os conceitos com responsabilidade.</p>
          {[
            "A leitura poética envolve processos distribuídos; não existe um único “centro da poesia”.",
            "Uma associação pessoal não é diagnóstico nem prova de um conteúdo inconsciente.",
            "Uma hipótese ou metáfora não deve ser apresentada como evidência científica.",
            "Recursos como metáfora, ritmo e pausa alteram a construção do texto, mas não garantem uma resposta emocional.",
            "Uma prática responsável oferece escolha, preserva privacidade e não promete cura."
          ].map((item) => <div key={item} className="flex gap-3 items-start"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><p className="text-sm">{item}</p></div>)}
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" />Nota de rigor científico e responsabilidade</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>O “Mapa Cerebral do Leitor Poético” é um recurso didático para organizar processos que podem participar da leitura. Não é um mapa anatômico completo, instrumento de avaliação, diagnóstico ou protocolo clínico validado.</p>
          <p>As respostas à poesia variam entre pessoas e situações. A atividade pode favorecer expressão, elaboração de ideias e reflexão, mas esta aula não afirma que um poema ativa uma região específica de forma previsível nem que garante desbloqueio emocional, hipnose ou resultado terapêutico.</p>
          <p>O conteúdo educacional não substitui formação profissional, supervisão, avaliação ou atendimento especializado. Qualquer aplicação em contexto clínico deve respeitar competência, consentimento, privacidade e normas profissionais.</p>
          <p>Para aprofundar a leitura crítica de pesquisas, consulte a seção <Link to="/ciencia-da-poesia" className="text-primary underline underline-offset-4">Ciência da Poesia</Link> e verifique sempre as fontes originais, seus métodos e limitações.</p>
        </CardContent>
      </Card>

      <div className="rounded-2xl border border-primary/20 p-6 md:p-8 text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center"><Sparkles className="h-6 w-6 text-primary" /></div>
        <h2 className="text-xl md:text-2xl font-heading font-bold">Da compreensão à experiência</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Agora que você estudou os conceitos, avance para o laboratório. Lá você poderá realizar uma leitura, registrar percepções e experimentar a criação de versos com autonomia.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild><Link to="/mapa-cerebral">Ir para o Laboratório Cerebral <ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
          <Button asChild variant="outline"><Link to="/biblioteca-exercicios">Abrir Biblioteca de Exercícios</Link></Button>
          <Button asChild variant="outline"><Link to="/formacao">Voltar à Formação</Link></Button>
        </div>
      </div>
    </main>
  </PageLayout>
);

export default AulaExclusiva;
