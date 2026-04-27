/**
 * Dados clínicos estruturados de cada módulo do PCH/P.A.D.H.
 * Fonte única de verdade para PDFs, checklists, fluxograma e prontuário.
 * Sempre conectando a teóricos fundadores.
 */

export interface TeoricoRef {
  nome: string;
  obra?: string;
  contribuicao: string;
}

export interface ModuloClinico {
  id: string;
  numero: number;
  titulo: string;
  pilar: 'P' | 'A' | 'D' | 'H';
  pilarNome: string;
  /** Nome poético da identidade cromática deste módulo */
  corNome: string;
  /** Significado simbólico da cor escolhida */
  corSimbolo: string;
  foco: string;
  sinais: string[];
  aplicacao: string[];
  indicacoes: string[];
  cuidados: string[];
  /** Tarefas terapêuticas para o paciente levar para casa */
  tarefasPaciente: string[];
  /** Poema-prescrição entregue ao paciente */
  poemaPrescricao?: { titulo: string; texto: string };
  /** Teóricos integrados (sempre conectar conteúdo à teoria) */
  teoricos: TeoricoRef[];
  /** Checklist clínico rápido específico do módulo */
  checklistSinais: string[];
  /** Atividades/Etapas para progresso granular */
  atividades: Array<{ id: string; label: string }>;
  /** Tempo estimado em minutos para conclusão */
  tempoEstimado: number;
}

export const MODULOS: ModuloClinico[] = [
  {
    id: 'modulo-1',
    numero: 1,
    corNome: 'Âmbar dourado',
    corSimbolo: 'Luz da escuta — a palavra como faísca de consciência.',
    titulo: 'Base Teórica — O Poder das Palavras',
    pilar: 'P',
    pilarNome: 'Poesia (Escuta)',
    foco: 'Escutar como o paciente usa as palavras revela a estrutura do seu sofrimento.',
    sinais: [
      'Vocabulário marcado por absolutos ("sempre", "nunca", "ninguém") — pensamento dicotômico.',
      'Uso recorrente de metáforas de prisão, peso ou queda — somatização e desesperança.',
      'Pobreza descritiva ao falar de emoções (alexitimia) — dificuldade de mentalização.',
      'Discurso fragmentado, sem nexo temporal — indício de trauma não integrado.',
      'Palavras de auto-desqualificação repetidas ("sou burro", "não sirvo") — crenças nucleares ativas.',
    ],
    aplicacao: [
      'Anote em sessão 5 a 7 palavras-chave que o paciente repete espontaneamente.',
      'Devolva essas palavras em forma de pergunta poética: "O que mora dentro desse \'sempre\'?"',
      'Convide o paciente a substituir uma palavra rígida por uma imagem (ex.: "vazio" → "lago seco").',
      'Construa juntos um mini-verso de 2 linhas usando a nova imagem.',
      'Registre o verso no prontuário como linha de base do trabalho semântico.',
    ],
    indicacoes: [
      'Ansiedade generalizada com discurso ruminativo.',
      'Depressão leve a moderada com auto-crítica acentuada.',
      'Pacientes em fase inicial de psicoterapia, ainda com defesas racionais altas.',
      'Trabalho com adolescentes que resistem à linguagem clínica direta.',
    ],
    cuidados: [
      'Evitar metáforas impostas pelo terapeuta — devem emergir do material do paciente.',
      'Em quadros psicóticos, manter linguagem concreta e evitar duplos sentidos.',
      'Não usar como substituto de avaliação diagnóstica formal.',
    ],
    tarefasPaciente: [
      'Anote durante a semana 5 palavras que você mais repetiu falando ou pensando.',
      'Para cada palavra, escreva uma imagem que ela evoca (sem julgamento).',
      'Crie 2 versos curtos com a imagem mais marcante.',
      'Leia esses 2 versos em voz alta toda manhã, antes de pegar o celular.',
    ],
    poemaPrescricao: {
      titulo: 'A Palavra que me Habita',
      texto: `Há uma palavra que eu repito\nsem perceber, como quem respira.\nHoje eu paro. Escuto.\nE pergunto: o que ela quer me dizer?\nTalvez não seja prisão —\ntalvez seja porta.`,
    },
    teoricos: [
      { nome: 'Jacques Lacan', obra: 'Função e Campo da Fala (1953)', contribuicao: 'O significante-mestre que se repete revela a estrutura do desejo inconsciente.' },
      { nome: 'Sigmund Freud', obra: 'A Psicopatologia da Vida Cotidiana (1901)', contribuicao: 'Atos falhos e lapsos de linguagem como porta de acesso ao inconsciente.' },
      { nome: 'Lev Vygotsky', obra: 'Pensamento e Linguagem (1934)', contribuicao: 'A palavra estrutura o pensamento — mudar a palavra reorganiza a cognição.' },
    ],
    checklistSinais: [
      'Discurso com absolutos ("sempre/nunca")',
      'Metáforas de prisão, peso, queda',
      'Alexitimia (dificuldade nomear emoções)',
      'Auto-desqualificação verbal',
      'Discurso fragmentado',
    ],
    atividades: [
      { id: 'teoria', label: 'Estudo da Base Teórica' },
      { id: 'escuta', label: 'Prática de Escuta Ativa' },
      { id: 'checklist', label: 'Checklist de Sinais' }
    ],
    tempoEstimado: 45,
  },
  {
    id: 'modulo-2',
    numero: 2,
    corNome: 'Violeta profundo',
    corSimbolo: 'Transformação alquímica — onde a crença vira liberdade.',
    titulo: 'Reestruturação de Crenças',
    pilar: 'A',
    pilarNome: 'Aplicada (Reestruturação)',
    foco: 'Reestruturar crenças nucleares limitantes através do contraste poético entre voz crítica e voz libertadora.',
    sinais: [
      'Crenças centrais identificáveis: "não sou suficiente", "não mereço", "preciso ser perfeito".',
      'Distorções cognitivas: catastrofização, leitura mental, personalização.',
      'Padrões de auto-sabotagem cíclicos em diferentes áreas da vida.',
      'Conflito interno entre desejo e permissão.',
      'Reações desproporcionais a gatilhos específicos (esquema ativado).',
    ],
    aplicacao: [
      'Mapeie a crença nuclear usando a técnica da seta descendente clássica.',
      'Peça ao paciente para nomear as duas vozes internas (crítica e libertadora).',
      'Escreva juntos um poema-diálogo de 8 a 12 versos contrastando ambas.',
      'Faça o paciente ler em voz alta primeiro a voz crítica, depois a libertadora.',
      'Observe respiração e postura — registre mudanças somáticas no prontuário.',
      'Defina como tarefa: ler o verso libertador 2x ao dia por 21 dias.',
    ],
    indicacoes: [
      'Transtornos de personalidade com esquemas rígidos.',
      'TOC com pensamentos intrusivos auto-críticos.',
      'Burnout e síndrome do impostor.',
      'Pós-tratamento de depressão para prevenção de recaída.',
    ],
    cuidados: [
      'Não confrontar a voz crítica abruptamente em pacientes com história de abuso.',
      'Em transtorno bipolar, evitar ativação excessiva — preferir tom contemplativo.',
      'Validar antes de reestruturar — a crença teve função protetiva no passado.',
    ],
    tarefasPaciente: [
      'Identifique sua crença mais limitante e escreva-a sem censura.',
      'Crie a frase inversa, fortalecedora, no presente afirmativo.',
      'Componha um poema curto (4-8 versos) que faça a ponte entre as duas.',
      'Leia o poema em voz alta 2x ao dia por 21 dias seguidos.',
    ],
    poemaPrescricao: {
      titulo: 'Duas Vozes',
      texto: `Dentro de mim, duas vozes ecoam:\numa que prende, outra que liberta.\nA voz que liberta é mais serena —\nporque a verdade fala baixo,\nmas ressoa fundo.`,
    },
    teoricos: [
      { nome: 'Aaron T. Beck', obra: 'Cognitive Therapy of Depression (1979)', contribuicao: 'Crenças nucleares e esquemas disfuncionais como base do sofrimento psíquico.' },
      { nome: 'Albert Ellis', obra: 'Reason and Emotion in Psychotherapy (1962)', contribuicao: 'Disputa cognitiva (TREC) — crenças irracionais geram emoções perturbadoras.' },
      { nome: 'Jean Piaget', obra: 'A Construção do Real na Criança (1937)', contribuicao: 'Esquemas mentais como estruturas que assimilam e acomodam a experiência.' },
    ],
    checklistSinais: [
      'Crença nuclear identificada',
      'Distorções cognitivas presentes',
      'Auto-sabotagem cíclica',
      'Reação desproporcional a gatilho',
      'Conflito desejo × permissão',
    ],
    atividades: [
      { id: 'mapeamento', label: 'Mapeamento de Crenças' },
      { id: 'dialogo', label: 'Poema-Diálogo' },
      { id: 'reestruturacao', label: 'Aplicação da Reestruturação' }
    ],
    tempoEstimado: 60,
  },
  {
    id: 'modulo-3',
    numero: 3,
    corNome: 'Índigo místico',
    corSimbolo: 'Transe leve — fronteira entre o consciente e o sonho.',
    titulo: 'Técnicas de Linguagem Hipnótica',
    pilar: 'A',
    pilarNome: 'Aplicada (Indução Leve)',
    foco: 'Induzir estados de transe leve usando linguagem ericksoniana e ritmo poético para acessar o inconsciente terapêutico.',
    sinais: [
      'Hipervigilância e dificuldade de relaxar — sistema nervoso simpático cronicamente ativado.',
      'Insônia inicial ou intermediária com pensamento acelerado.',
      'Dificuldade de acesso a memórias emocionais (defesa intelectual).',
      'Resistência consciente à mudança ("eu sei o que tenho que fazer, mas...").',
      'Bloqueio criativo ou sensação de "cabeça travada".',
    ],
    aplicacao: [
      'Estabeleça pacing inicial: respire no ritmo do paciente por 30 segundos.',
      'Inicie leitura do poema em tom 20% mais lento que sua fala normal.',
      'Use reticências e pausas para criar espaço interno entre os versos.',
      'Insira comandos embutidos: "perceba como…", "permita-se sentir…".',
      'Após o poema, mantenha 1 minuto de silêncio antes de qualquer pergunta.',
    ],
    indicacoes: [
      'Ansiedade com componente somático intenso.',
      'Insônia psicofisiológica e dificuldade de regulação autonômica.',
      'Pacientes hiper-racionais resistentes a abordagens emocionais diretas.',
      'Preparação para sessões de aprofundamento clínico.',
    ],
    cuidados: [
      'Contraindicado em quadros psicóticos ativos e dissociação severa.',
      'Avaliar histórico de transe espontâneo (epilepsia parcial complexa).',
      'Sempre obter consentimento informado para uso de linguagem sugestiva.',
    ],
    tarefasPaciente: [
      'Grave em áudio o poema entregue, na sua própria voz, lendo bem devagar.',
      'Escute antes de dormir, com fones, por 7 noites seguidas.',
      'Anote no diário as sensações ao acordar no dia seguinte.',
    ],
    poemaPrescricao: {
      titulo: 'Respira',
      texto: `Respire… e sinta…\nRespire… e deixe ir…\nRespire… e perceba…\nque a cada momento,\nalgo dentro de você se transforma…\nsuavemente… profundamente…\ncomo ondas no mar…\nsem pressa de chegar.`,
    },
    teoricos: [
      { nome: 'Milton H. Erickson', obra: 'Hypnotic Realities (1976)', contribuicao: 'Linguagem permissiva, metáfora terapêutica e sugestão indireta como ferramentas curativas.' },
      { nome: 'Ernest Rossi', obra: 'The Psychobiology of Mind-Body Healing (1986)', contribuicao: 'Estados de transe modulam genes e plasticidade neural.' },
      { nome: 'Bandler & Grinder', obra: 'Patterns of the Hypnotic Techniques of M. H. Erickson (1975)', contribuicao: 'Modelagem dos padrões linguísticos do Milton-Model — comandos embutidos, ambiguidade.' },
    ],
    checklistSinais: [
      'Hipervigilância autonômica',
      'Insônia com pensamento acelerado',
      'Defesa intelectual alta',
      'Resistência consciente à mudança',
      'Bloqueio criativo',
    ],
  },
  {
    id: 'modulo-4',
    numero: 4,
    corNome: 'Rosa-malva',
    corSimbolo: 'Prescrição amorosa — o cuidado feito verso.',
    titulo: 'Construção de Poemas Hipnóticos',
    pilar: 'A',
    pilarNome: 'Aplicada (Prescrição)',
    foco: 'Construir poemas sugestivos personalizados como prescrição terapêutica adaptada à demanda clínica.',
    sinais: [
      'Demanda específica e bem delimitada (medo de falar em público, perda recente).',
      'Capacidade preservada de imaginar cenas e sentir emoções (mentalização ativa).',
      'Engajamento na aliança terapêutica e abertura para tarefas extra-sessão.',
      'Necessidade de uma "âncora" simbólica entre sessões.',
    ],
    aplicacao: [
      'Escolha o eixo terapêutico (autocompaixão, coragem, perdão, luto, etc.).',
      'Use o vocabulário do próprio paciente colhido nos Módulos 1 e 2.',
      'Estruture: 1 verso de validação + 2 de transição + 2 de expansão.',
      'Termine com um verso aberto que funcione como "porta" para novas significações.',
      'Entregue impresso ou áudio gravado pelo terapeuta na voz lenta e calma.',
      'Solicite registro em diário das sensações após cada leitura.',
    ],
    indicacoes: [
      'Luto complicado em fase de elaboração.',
      'Transtornos de ajustamento e crises situacionais.',
      'Reabilitação emocional pós-término de relacionamento ou demissão.',
      'Apoio a pacientes oncológicos durante tratamento.',
    ],
    cuidados: [
      'Nunca prescrever poema com tom imperativo ("você DEVE…").',
      'Revisar com o paciente antes de finalizar — ele precisa reconhecer-se.',
      'Atualizar a prescrição a cada 4-6 semanas conforme evolução.',
    ],
    tarefasPaciente: [
      'Leia o poema entregue 2x ao dia (manhã e noite) por 21 dias.',
      'Após cada leitura, anote 1 palavra que descreve sua sensação.',
      'Na próxima sessão, traga essas 21 palavras para análise conjunta.',
    ],
    poemaPrescricao: {
      titulo: 'Prescrição em Branco (preencher em sessão)',
      texto: `[Verso de validação personalizado]\n[Verso de transição com vocabulário do paciente]\n[Verso de transição com imagem terapêutica]\n[Verso de expansão futura]\n[Verso aberto — porta]`,
    },
    teoricos: [
      { nome: 'Milton Erickson & Ernest Rossi', obra: 'Hypnotherapy: An Exploratory Casebook (1979)', contribuicao: 'A sugestão indireta personalizada respeita a singularidade do inconsciente do paciente.' },
      { nome: 'António Damásio', obra: 'O Erro de Descartes (1994)', contribuicao: 'Marcadores somáticos: o corpo armazena emoções — a poesia ativa esse arquivo somático.' },
      { nome: 'Nicholas Mazza', obra: 'Poetry Therapy: Theory and Practice (2003)', contribuicao: 'Modelo RES (Receptivo-Expressivo-Simbólico) da poesia como prescrição clínica.' },
    ],
    checklistSinais: [
      'Demanda clínica delimitada',
      'Mentalização preservada',
      'Aliança terapêutica sólida',
      'Necessidade de âncora simbólica',
      'Abertura para homework',
    ],
  },
  {
    id: 'modulo-5',
    numero: 5,
    corNome: 'Esmeralda profunda',
    corSimbolo: 'Jornada do herói — a floresta interior do símbolo.',
    titulo: 'Técnicas Avançadas — Metáforas Curativas',
    pilar: 'D',
    pilarNome: 'Desenvolvimento (Aprofundamento)',
    foco: 'Aplicar técnicas avançadas de indução para aprofundar o estado terapêutico e instalar metáforas curativas duradouras.',
    sinais: [
      'Plateau terapêutico — paciente "estagnado" mesmo com adesão ao processo.',
      'Bloqueios repetitivos no mesmo tema apesar de insights cognitivos.',
      'Resistência inconsciente identificada por sonhos repetitivos ou atos falhos.',
      'Necessidade de aprofundar mudança já iniciada superficialmente.',
    ],
    aplicacao: [
      'Confirme estabilidade emocional antes de aplicar técnicas mais profundas.',
      'Use a "Indução do Caminho" como abertura — 5 minutos de visualização guiada.',
      'Apresente a metáfora central do paciente em formato narrativo poético.',
      'Faça uma sugestão pós-hipnótica simples ancorada em um gesto (ex.: tocar o pulso).',
      'Conduza saída gradual: respiração → consciência corporal → orientação espacial.',
      'Documente literalmente as imagens espontâneas que surgiram durante o transe.',
    ],
    indicacoes: [
      'Pacientes em terapia de longa duração com necessidade de aprofundamento.',
      'Trabalho com self-compassion em traumas de desenvolvimento.',
      'Integração de partes dissociadas (em contexto de IFS ou similares).',
      'Reprocessamento de memórias com componente sensorial intenso.',
    ],
    cuidados: [
      'Exige formação prévia em hipnose clínica e/ou terapias de estados ampliados.',
      'Não aplicar em primeira sessão ou sem mapeamento clínico completo.',
      'Manter supervisão clínica em casos de trauma complexo.',
    ],
    tarefasPaciente: [
      'Toque o pulso (gesto-âncora) 3x ao dia, lembrando da metáfora trabalhada.',
      'Anote sonhos da semana — especialmente os repetidos ou simbólicos.',
      'Reescreva sua "metáfora central" em uma única frase no domingo à noite.',
    ],
    poemaPrescricao: {
      titulo: 'A Jornada',
      texto: `O caminho não termina onde os pés param.\nEle continua dentro.\nE cada passo que você der lá dentro\nse tornará luz aqui fora.`,
    },
    teoricos: [
      { nome: 'Carl Gustav Jung', obra: 'Os Arquétipos e o Inconsciente Coletivo (1959)', contribuicao: 'Símbolos e arquétipos como pontes entre o ego e o Self.' },
      { nome: 'Joseph Campbell', obra: 'O Herói de Mil Faces (1949)', contribuicao: 'Estrutura mítica da Jornada do Herói como mapa de transformação psicológica.' },
      { nome: 'James Hillman', obra: 'Re-Visioning Psychology (1975)', contribuicao: 'Psicologia arquetípica — a alma fala em imagens, não em conceitos.' },
    ],
    checklistSinais: [
      'Plateau terapêutico evidente',
      'Bloqueios temáticos repetitivos',
      'Sonhos recorrentes/atos falhos',
      'Estabilidade emocional confirmada',
      'Mudança superficial precisa aprofundar',
    ],
  },
  {
    id: 'modulo-6',
    numero: 6,
    corNome: 'Terracota & cobre',
    corSimbolo: 'Sentido encarnado — a poesia que vira corpo.',
    titulo: 'Tipos de Poesia Terapêutica',
    pilar: 'D',
    pilarNome: 'Desenvolvimento (Adequação)',
    foco: 'Selecionar o tipo de poesia terapêutica adequado ao quadro clínico e ao momento do tratamento.',
    sinais: [
      'Identificação clara do estágio do processo: abertura, elaboração ou integração.',
      'Quadros mistos exigindo abordagem multimodal (ansiedade + luto).',
      'Necessidade de variar registros (cognitivo, emocional, somático, espiritual).',
      'Pacientes que respondem mais a um tipo específico de linguagem.',
    ],
    aplicacao: [
      'Mapeie o tipo: catártico, contemplativo, mobilizador, integrativo ou ritualístico.',
      'Para abertura: prefira o catártico — autoriza expressão de dor.',
      'Para meio do processo: use o mobilizador — convoca à ação.',
      'Para integração: aplique o ritualístico — sela a transformação.',
      'Combine no máximo 2 tipos por sessão para evitar sobrecarga.',
      'Avalie ao final qual tipo gerou maior ressonância e oriente a continuidade.',
    ],
    indicacoes: [
      'Trabalho com luto em todas as fases.',
      'Recuperação de violência doméstica ou sexual (contexto especializado).',
      'Crises existenciais e busca de sentido.',
      'Acompanhamento espiritual em contextos clínicos.',
    ],
    cuidados: [
      'Evitar poesia mobilizadora em fases agudas de depressão maior.',
      'Em luto recente, não impor poesia integrativa — respeitar o tempo do catártico.',
      'Reconhecer limites: encaminhar quando a demanda é primariamente espiritual.',
    ],
    tarefasPaciente: [
      'Identifique qual tipo de poesia mais te tocou nesta semana.',
      'Escreva (ou copie) um poema desse tipo e leia-o num momento de silêncio.',
      'Traga para a sessão sua reflexão sobre por que ele te tocou.',
    ],
    poemaPrescricao: {
      titulo: 'Sentido',
      texto: `Não é o que aconteceu —\né o sentido que você dá.\nE o sentido que você dá hoje\nnão precisa ser o mesmo de amanhã.`,
    },
    teoricos: [
      { nome: 'Viktor Frankl', obra: 'Em Busca de Sentido (1946)', contribuicao: 'Logoterapia — o sentido como dimensão central da cura psíquica.' },
      { nome: 'James W. Pennebaker', obra: 'Opening Up by Writing It Down (1990)', contribuicao: 'Escrita expressiva regula afeto, fortalece imunidade e reorganiza memória traumática.' },
      { nome: 'Gillie Bolton', obra: 'The Therapeutic Potential of Creative Writing (1999)', contribuicao: 'Escrita criativa como prática reflexiva clínica.' },
    ],
    checklistSinais: [
      'Estágio do processo identificado',
      'Quadro misto multimodal',
      'Necessidade de variar registros',
      'Resposta diferencial a estilos',
      'Tema existencial em emergência',
    ],
  },
  {
    id: 'modulo-7',
    numero: 7,
    corNome: 'Azul-noite ancestral',
    corSimbolo: 'Holding — o colo psíquico que sustenta a mudança.',
    titulo: 'Sessão Terapêutica em 4 Fases (P.A.D.H.)',
    pilar: 'H',
    pilarNome: 'Humano (Integração)',
    foco: 'Conduzir a sessão terapêutica completa em 4 fases (P.A.D.H.) com diagnóstico contínuo e intervenções escalonadas.',
    sinais: [
      'Fase P: paciente chega tenso, defesas altas, discurso superficial.',
      'Fase A: emoção começa a fluir, surgem temas centrais e crenças nucleares.',
      'Fase D: bloqueios afloram — choro, raiva, silêncio prolongado.',
      'Fase H: integração visível — postura muda, voz se firma, olhar se aclara.',
    ],
    aplicacao: [
      'P · Acolhimento (10 min): use poema curto de presença para regular o sistema nervoso.',
      'A · Identificação (15 min): aplique Poemadiagnóstico — escute palavras-chave repetidas.',
      'D · Transformação (15 min): trabalhe com Poema-Funil ou Verso-Gatilho conforme demanda.',
      'H · Ancoragem (10 min): feche com Ritual do Silêncio + carta-poema para casa.',
      'Registre em prontuário: estado inicial, ferramenta aplicada, resposta emocional, tarefa.',
      'Reavalie a cada 4 sessões — ajuste o protocolo conforme a evolução.',
    ],
    indicacoes: [
      'Modelo aplicável a praticamente todos os quadros clínicos com adaptações.',
      'Ideal para sessões de 50 minutos em consultório individual.',
      'Adaptável para grupos terapêuticos (estendendo cada fase em 50%).',
      'Compatível com TCC, psicanálise, gestalt e abordagens humanistas.',
    ],
    cuidados: [
      'Nunca pular a fase P — o aterramento inicial protege o trabalho subsequente.',
      'Não estender a fase D além de 20 minutos sem retomar a ancoragem.',
      'Sempre encerrar com a fase H — paciente não deve sair "aberto".',
    ],
    tarefasPaciente: [
      'Anote em qual fase (P/A/D/H) você se sentiu mais tocado nesta sessão.',
      'Releia a carta-poema entregue todas as noites por 7 dias.',
      'Traga para a próxima sessão: o que mudou no corpo após a leitura?',
    ],
    poemaPrescricao: {
      titulo: 'Quatro Tempos',
      texto: `Há um tempo de chegar (P).\nHá um tempo de olhar (A).\nHá um tempo de transformar (D).\nE há um tempo de habitar o que se tornou (H).`,
    },
    teoricos: [
      { nome: 'Donald Winnicott', obra: 'O Ambiente e os Processos de Maturação (1965)', contribuicao: 'Holding e ambiente facilitador — base para qualquer transformação psíquica.' },
      { nome: 'John Bowlby', obra: 'Apego (1969)', contribuicao: 'Base segura — sem vínculo seguro, não há exploração emocional.' },
      { nome: 'Irvin Yalom', obra: 'Os Desafios da Terapia (2002)', contribuicao: 'Fatores terapêuticos comuns — esperança, universalidade, catarse, integração.' },
    ],
    checklistSinais: [
      'Defesas altas no início (Fase P)',
      'Tema central emerge (Fase A)',
      'Bloqueio aflora (Fase D)',
      'Integração visível (Fase H)',
      'Aliança terapêutica estável',
    ],
  },
  {
    id: 'modulo-8',
    numero: 8,
    corNome: 'Ouro-rosa luminoso',
    corSimbolo: 'Autonomia & flow — o brilho da maturidade poética.',
    titulo: 'Exercícios Práticos Avançados',
    pilar: 'H',
    pilarNome: 'Humano (Autonomia)',
    foco: 'Consolidar autonomia psíquica através de exercícios poéticos avançados de auto-regulação e auto-direcionamento.',
    sinais: [
      'Paciente já demonstra capacidade de auto-observação e nomeação emocional.',
      'Aliança terapêutica madura, com confiança e cooperação ativa.',
      'Capacidade de tolerar emoções difíceis sem desorganização.',
      'Desejo explícito de continuar o processo de forma mais autônoma.',
    ],
    aplicacao: [
      'Apresente o exercício "Diálogo com o Eu Futuro" — paciente escreve carta de seu eu daqui a 5 anos.',
      'Aplique a "Metáfora da Jornada" — paciente desenha/escreve sua jornada simbólica.',
      'Conduza o ritual de "Carta-Semente" — paciente sela um envelope para abrir em 6 meses.',
      'Estabeleça check-ins quinzenais ao invés de semanais.',
      'Construa juntos um "Manual Poético Pessoal" — coletânea de versos-âncora.',
    ],
    indicacoes: [
      'Fase de finalização ou espaçamento de processo terapêutico.',
      'Pacientes em manutenção pós-recuperação de quadros graves.',
      'Trabalho com profissionais da saúde mental (auto-cuidado).',
      'Grupos de terapia avançada e supervisão clínica.',
    ],
    cuidados: [
      'Não confundir autonomia com abandono — manter porta aberta para retorno.',
      'Avaliar prematura idealização de "alta" — pode ser fuga do vínculo.',
      'Garantir que o paciente tem rede de apoio externa estabelecida.',
    ],
    tarefasPaciente: [
      'Escreva uma carta do seu eu de 5 anos no futuro para o eu de hoje.',
      'Crie seu "Manual Poético Pessoal" com 7 versos-âncora.',
      'Sele uma "Carta-Semente" para abrir em 6 meses.',
      'Mantenha o ritual de leitura matinal de um verso-âncora.',
    ],
    poemaPrescricao: {
      titulo: 'Semente',
      texto: `Guarda este verso como semente:\n"A flor que vai nascer já está em mim —\nsó precisa de tempo, terra e coragem para abrir."`,
    },
    teoricos: [
      { nome: 'Albert Bandura', obra: 'Self-Efficacy: The Exercise of Control (1997)', contribuicao: 'Autoeficácia — crença na própria capacidade como motor da mudança.' },
      { nome: 'Mihaly Csikszentmihalyi', obra: 'Flow (1990)', contribuicao: 'Estado de fluxo — engajamento pleno como experiência ótima.' },
      { nome: 'Abraham Maslow', obra: 'Motivation and Personality (1954)', contribuicao: 'Auto-realização como horizonte da maturidade psicológica.' },
    ],
    checklistSinais: [
      'Auto-observação madura',
      'Aliança terapêutica sólida',
      'Tolera emoções difíceis',
      'Desejo de autonomia',
      'Rede de apoio externa ativa',
    ],
  },
];

export const getModulo = (id: string) => MODULOS.find(m => m.id === id);

export const PILARES_INFO = {
  P: { nome: 'Poesia', cor: 'primary', descricao: 'Escutar a linguagem do paciente para mapear seu mundo simbólico.' },
  A: { nome: 'Aplicada', cor: 'secondary', descricao: 'Aplicar técnicas para reestruturar crenças e induzir mudança.' },
  D: { nome: 'Desenvolvimento', cor: 'spiritual-amber', descricao: 'Aprofundar metáforas curativas que reorganizam o inconsciente.' },
  H: { nome: 'Humano', cor: 'primary', descricao: 'Integrar mudanças à identidade e sustentar autonomia psíquica.' },
};

export const AVISO_ETICO =
  'Este material é uma ferramenta de apoio clínico baseada na metodologia P.A.D.H. ' +
  'Não substitui avaliação diagnóstica formal. Uso restrito a profissionais habilitados conforme CFP/CFM.';
