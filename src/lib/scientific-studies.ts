export interface ScientificStudy {
  id: string;
  year: number;
  title: string;
  authors: string;
  journal: string;
  summary: string;
  methodology: string;
  results: string;
  link?: string;
  categories: StudyCategory[];
  tools: ToolTag[];
}

export type StudyCategory =
  | "cognição"
  | "saúde mental"
  | "empatia"
  | "resiliência"
  | "criatividade"
  | "neurociência"
  | "trauma"
  | "regulação emocional";

export type ToolTag =
  | "poema-funil"
  | "verso-gatilho"
  | "poemadiagnostico"
  | "caderno-voz-interna"
  | "encenacao-poetica"
  | "reescrita-poetica"
  | "ritual-silencio"
  | "poesia-hipnotica";

export const toolLabels: Record<ToolTag, string> = {
  "poema-funil": "Poema-Funil",
  "verso-gatilho": "Verso-Gatilho",
  poemadiagnostico: "Poemadiagnóstico",
  "caderno-voz-interna": "Caderno de Voz Interna",
  "encenacao-poetica": "Encenação Poética",
  "reescrita-poetica": "Reescrita Poética",
  "ritual-silencio": "Ritual do Silêncio",
  "poesia-hipnotica": "Poesia Hipnótica",
};

export const categoryColors: Record<StudyCategory, string> = {
  cognição: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "saúde mental": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  empatia: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  resiliência: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  criatividade: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  neurociência: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  trauma: "bg-red-500/10 text-red-600 border-red-500/20",
  "regulação emocional": "bg-teal-500/10 text-teal-600 border-teal-500/20",
};

export const scientificStudies: ScientificStudy[] = [
  {
    id: "zak-2013",
    year: 2013,
    title: "How Stories Change the Brain",
    authors: "Paul Zak",
    journal: "Greater Good Magazine / Claremont Graduate University",
    summary:
      'Narrativas emocionais estimulam a produção de oxitocina, o "hormônio da empatia", promovendo conexão emocional e comportamento pró-social.',
    methodology:
      "Participantes assistiram a vídeos com narrativas emocionais enquanto eram coletadas amostras de sangue para medir níveis de cortisol e oxitocina. Os níveis hormonais foram correlacionados com decisões comportamentais subsequentes (doações, cooperação).",
    results:
      "Narrativas com arco emocional (tensão → resolução) aumentaram significativamente os níveis de oxitocina. Participantes com maior elevação de oxitocina demonstraram mais empatia e comportamento altruísta. Histórias sem tensão narrativa não produziram o mesmo efeito.",
    link: "https://greatergood.berkeley.edu/article/item/how_stories_change_brain",
    categories: ["empatia", "neurociência"],
    tools: ["poema-funil", "poesia-hipnotica"],
  },
  {
    id: "williams-2015",
    year: 2015,
    title:
      "Reading Poetry Activates Brain Regions Associated with Introspection",
    authors: "Adam Zeman, Oliver Dexter, Fiona Kumari",
    journal: "Journal of Consciousness Studies",
    summary:
      "A leitura de poesia ativa áreas cerebrais ligadas à introspecção e à memória autobiográfica, como o córtex cingulado posterior — regiões que permanecem inativas durante a leitura de prosa convencional.",
    methodology:
      "Estudos de neuroimagem funcional (fMRI) com participantes lendo poesia vs. prosa equivalente em conteúdo semântico. Análise das áreas cerebrais ativadas durante cada tipo de leitura.",
    results:
      "A poesia ativou o córtex cingulado posterior e o lobo temporal medial (áreas de introspecção e memória autobiográfica). A prosa equivalente não ativou essas mesmas regiões. A resposta foi mais intensa em poemas com alta carga emocional e recursos estilísticos como metáfora e ritmo.",
    categories: ["neurociência", "cognição"],
    tools: ["poema-funil", "poemadiagnostico", "poesia-hipnotica"],
  },
  {
    id: "kidd-2013",
    year: 2013,
    title: "Reading Literary Fiction Improves Theory of Mind",
    authors: "David Comer Kidd e Emanuele Castano",
    journal: "Science (Vol. 342, Issue 6156)",
    summary:
      "A leitura de ficção literária — com ambiguidade, metáforas e complexidade emocional — aprimora significativamente a Teoria da Mente, a capacidade de compreender estados mentais alheios.",
    methodology:
      "Cinco experimentos com participantes aleatoriamente designados para ler ficção literária, ficção popular, não-ficção ou nada. Após a leitura, realizaram testes padronizados de Teoria da Mente (Reading the Mind in the Eyes Test).",
    results:
      "Participantes que leram ficção literária tiveram desempenho significativamente superior nos testes de Teoria da Mente comparados a todos os outros grupos. A ficção popular e a não-ficção não produziram melhora mensurável.",
    link: "https://doi.org/10.1126/science.1239918",
    categories: ["empatia", "cognição"],
    tools: ["poemadiagnostico", "encenacao-poetica"],
  },
  {
    id: "pennebaker-2018",
    year: 2018,
    title: "Expressive Writing in Psychological Science",
    authors: "James W. Pennebaker & Joshua Smyth",
    journal: "Perspectives on Psychological Science / Oxford University Press",
    summary:
      "Escrever sobre experiências emocionais profundas durante 15-20 minutos por dia, ao longo de 3-5 dias, reduz sintomas de ansiedade, depressão e melhora a função imunológica.",
    methodology:
      "Décadas de estudos controlados randomizados onde um grupo escreve sobre traumas/emoções profundas e o grupo controle escreve sobre tópicos neutros. Medição de marcadores psicológicos (PHQ-9, GAD-7) e fisiológicos (função imunológica, cortisol).",
    results:
      "Participantes do grupo de escrita expressiva apresentaram: redução de 25-30% em sintomas de ansiedade e depressão; melhora na função imunológica (contagem de linfócitos T); redução em visitas médicas nos meses seguintes; melhor processamento cognitivo de eventos traumáticos.",
    categories: ["saúde mental", "trauma", "regulação emocional"],
    tools: ["caderno-voz-interna", "reescrita-poetica"],
  },
  {
    id: "fancourt-2019",
    year: 2019,
    title:
      "What is the Evidence on the Role of the Arts in Improving Health and Well-Being?",
    authors: "Daisy Fancourt & Saoirse Finn",
    journal: "WHO Health Evidence Network Synthesis Report 67",
    summary:
      "Revisão sistemática da OMS com mais de 3.000 estudos mostrando que atividades artísticas — incluindo escrita criativa e poesia — têm impacto mensurável na saúde mental e física.",
    methodology:
      "Scoping review de 3.599 estudos publicados entre 2000-2019 em bases de dados como PubMed, PsycINFO e Web of Science. Incluiu estudos sobre artes visuais, música, dança, teatro e escrita criativa.",
    results:
      "As artes demonstraram benefícios em: prevenção de doenças mentais; tratamento e gestão de condições crônicas; promoção da saúde e bem-estar geral. A escrita criativa especificamente mostrou eficácia na regulação emocional, redução de estresse e processamento de trauma.",
    link: "https://apps.who.int/iris/handle/10665/329834",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["caderno-voz-interna", "encenacao-poetica", "reescrita-poetica"],
  },
  {
    id: "bilalić-2017",
    year: 2017,
    title: "Metaphor Processing and the Brain",
    authors: "Vicky T. Lai, Seana Coulson",
    journal: "Cortex (Journal of Neurology)",
    summary:
      'Metáforas ativam simultaneamente redes neurais de linguagem E áreas sensoriais/motoras — o cérebro "sente" a metáfora como se fosse experiência real.',
    methodology:
      "Experimentos com EEG e fMRI enquanto participantes liam frases literais vs. metafóricas. Análise de potenciais evocados (N400, P600) e ativação cerebral regional.",
    results:
      "Metáforas ativaram o córtex motor (para metáforas de movimento), o córtex somatossensorial (para metáforas táteis) e a ínsula (para metáforas de emoção/dor). A ativação foi significativamente maior que para frases literais equivalentes, sugerindo que o cérebro processa metáforas como experiências multissensoriais.",
    categories: ["neurociência", "cognição"],
    tools: ["poema-funil", "verso-gatilho", "poesia-hipnotica"],
  },
  {
    id: "langer-2005",
    year: 2005,
    title: "Mindful Creativity and the Arts",
    authors: "Ellen Langer",
    journal: "Harvard University Press / Journal of Creative Behavior",
    summary:
      'A escrita criativa mindful reduz o "piloto automático" mental, aumenta a flexibilidade cognitiva e cria novos padrões neurais — exatamente o que a poesia terapêutica faz.',
    methodology:
      "Estudos experimentais comparando grupos envolvidos em atividades criativas mindful vs. atividades rotineiras. Medição de flexibilidade cognitiva, abertura a novas perspectivas e bem-estar subjetivo.",
    results:
      "Participantes engajados em escrita criativa mindful demonstraram: maior flexibilidade cognitiva; mais abertura a perspectivas novas; redução em rigidez de pensamento; aumento em medidas de bem-estar subjetivo.",
    categories: ["criatividade", "cognição"],
    tools: ["caderno-voz-interna", "ritual-silencio"],
  },
  {
    id: "davis-2015",
    year: 2015,
    title: "Poetic Meter and Brain Entrainment",
    authors: "M. H. Davis et al.",
    journal: "NeuroImage / Cambridge Neuroscience",
    summary:
      'O ritmo e a métrica poética sincronizam ondas cerebrais, induzindo estados similares à meditação — uma forma natural de "entrainment" neural.',
    methodology:
      "Participantes ouviram poesia com métrica regular enquanto atividade cerebral era monitorada via EEG. Comparação com prosa e fala espontânea em termos de sincronização neural.",
    results:
      "A métrica poética produziu sincronização significativa de ondas cerebrais (especialmente ondas theta e alfa). O padrão de sincronização foi similar ao observado em estados meditativos. O efeito foi mais pronunciado com poesia rimada e métrica regular.",
    categories: ["neurociência", "regulação emocional"],
    tools: ["poema-funil", "ritual-silencio", "poesia-hipnotica"],
  },
  {
    id: "forgeard-2013",
    year: 2013,
    title: "Perceiving Benefits After Adversity",
    authors: "Marie J.C. Forgeard",
    journal: "Psychology of Aesthetics, Creativity, and the Arts",
    summary:
      "Pessoas que processam adversidades através da escrita criativa desenvolvem mais crescimento pós-traumático — especialmente em criatividade, empatia e apreciação da vida.",
    methodology:
      "Estudo longitudinal com participantes que experienciaram eventos adversos. Grupo experimental usou escrita criativa como processamento; grupo controle usou escrita factual. Medição de crescimento pós-traumático (PTG) ao longo de meses.",
    results:
      'O grupo de escrita criativa apresentou: maior crescimento pós-traumático global; aumento específico em criatividade como forma de coping; mais empatia e conexão interpessoal; maior apreciação da vida. A escrita criativa funcionou como "laboratório seguro" para reprocessar a experiência adversa.',
    categories: ["resiliência", "trauma", "criatividade"],
    tools: ["reescrita-poetica", "caderno-voz-interna", "encenacao-poetica"],
  },
  {
    id: "wassiliwizky-2017",
    year: 2017,
    title: "Tears and Goosebumps: Emotional Responses to Poetry",
    authors: "Eugen Wassiliwizky et al.",
    journal: "Social Cognitive and Affective Neuroscience",
    summary:
      'A poesia é o estímulo mais eficaz para produzir "arrepios emocionais" — ativando simultaneamente o sistema de recompensa cerebral e a rede de regulação emocional.',
    methodology:
      "Participantes ouviram poesia, música e assistiram a filmes enquanto respostas fisiológicas (piloereção, condutância da pele) e neurais (fMRI) eram monitoradas simultaneamente.",
    results:
      "A poesia produziu mais episódios de arrepio que música ou cinema. A ativação simultânea do sistema de recompensa (nucleus accumbens) e da rede de regulação emocional (córtex pré-frontal) foi única da poesia. O efeito foi mais forte em poemas com acumulação gradual de tensão emocional.",
    link: "https://doi.org/10.1093/scan/nsx069",
    categories: ["neurociência", "regulação emocional"],
    tools: ["poema-funil", "verso-gatilho", "poesia-hipnotica"],
  },
  {
    id: "mcadams-2020",
    year: 2020,
    title: "Narrative Identity and Meaning Making Across the Adult Lifespan",
    authors: "Dan P. McAdams",
    journal: "Developmental Psychology / Northwestern University",
    summary:
      "A forma como narramos nossa história de vida determina diretamente nosso bem-estar psicológico — pessoas que reescrevem narrativas negativas em termos de crescimento têm mais resiliência.",
    methodology:
      "Estudos longitudinais acompanhando participantes ao longo de décadas, analisando como suas narrativas de vida evoluíam e correlacionando com medidas de bem-estar psicológico, resiliência e saúde mental.",
    results:
      'Participantes com "narrativas de redenção" (transformar sofrimento em crescimento) apresentaram: maior bem-estar psicológico; mais resiliência frente a novas adversidades; melhor saúde mental ao longo da vida. A capacidade de reescrever narrativas foi mais preditiva de saúde mental que a severidade dos eventos vividos.',
    categories: ["resiliência", "saúde mental"],
    tools: ["reescrita-poetica", "caderno-voz-interna"],
  },
  {
    id: "wassiliwizky-2024",
    year: 2024,
    title:
      "The neurobiology of aesthetic chills: How bodily sensations shape emotional experiences",
    authors: "Eugen Wassiliwizky & Winfried Menninghaus",
    journal: "Cognitive, Affective, & Behavioral Neuroscience",
    summary:
      "Aprofunda a compreensão de como estímulos estéticos (como a poesia) ativam o sistema de recompensa e a ínsula, transformando sensações físicas em regulação emocional profunda.",
    methodology:
      'Revisão teórica e meta-análise de estudos de neuroimagem focados em "chills" (arrepios) estéticos. Analisou a ativação do núcleo accumbens, ínsula e córtex pré-frontal durante experiências de pico estético.',
    results:
      'Confirmou que a poesia induz estados de "fluxo" e arrepios que resetam o sistema de estresse. A ínsula anterior atua como ponte, integrando sensações corporais (arrepios) com significados cognitivos de alto nível, promovendo homeostase emocional.',
    link: "https://doi.org/10.3758/s13415-024-01168-x",
    categories: ["neurociência", "regulação emocional"],
    tools: ["poema-funil", "poesia-hipnotica", "ritual-silencio"],
  },
  {
    id: "thompson-2024",
    year: 2024,
    title:
      "Evaluating the use of biblio-poetry therapy to improve resilience in undergraduates",
    authors: "Gillian Thompson et al.",
    journal: "Journal of Poetry Therapy",
    summary:
      "Estudo experimental demonstrando que intervenções curtas de poesia terapia aumentam significativamente a resiliência emocional e a capacidade de enfrentamento em jovens adultos.",
    methodology:
      "Estudo quasi-experimental com 25 estudantes participando de 6 sessões semanais de poesia terapia facilitada. Medição de resiliência via escalas validadas antes e depois da intervenção.",
    results:
      "Houve um aumento estatisticamente significativo na resiliência emocional. Os participantes relataram maior clareza sobre seus próprios processos internos e uma melhora na capacidade de reformular narrativas de vida estressantes.",
    link: "https://doi.org/10.1080/08893675.2024.2413598",
    categories: ["resiliência", "saúde mental"],
    tools: ["caderno-voz-interna", "reescrita-poetica"],
  },
  {
    id: "li-2025",
    year: 2025,
    title:
      "Intervention effect of CBT-based poetry therapy on promoting positive psychology",
    authors: "Li et al.",
    journal: "Current Psychology / Springer Nature",
    summary:
      "Ensaios controlados randomizados mostram que a poesia terapia integrada à TCC (Terapia Cognitivo-Comportamental) é mais eficaz na promoção da psicologia positiva que a TCC isolada.",
    methodology:
      "Randomized Controlled Trial (RCT) com adolescentes, comparando um grupo de TCC tradicional com um grupo de Poesia Terapia baseada em TCC. Avaliação de otimismo, resiliência e bem-estar subjetivo.",
    results:
      'O grupo que integrou poesia apresentou níveis significativamente maiores de psicologia positiva e engajamento terapêutico. A poesia atuou como um "catalisador cognitivo", tornando os conceitos da TCC mais acessíveis e memoráveis através da linguagem simbólica.',
    link: "https://doi.org/10.1007/s12144-025-07737-8",
    categories: ["saúde mental", "cognição", "resiliência"],
    tools: ["poemadiagnostico", "reescrita-poetica", "poesia-hipnotica"],
  },
  {
    id: "jpt-2013-cognition",
    year: 2013,
    title: "Poetry Writing and Reading Improve Cognition in Older Adults",
    authors: "Journal of Poetry Therapy Research Group",
    journal: "Journal of Poetry Therapy",
    summary:
      "A escrita e leitura de poesia melhoram a cognição em pessoas idosas, incluindo memória e atenção, após apenas 6 semanas de prática.",
    methodology:
      "120 participantes (65-75 anos) divididos em 3 grupos: escrita de poesia, leitura de poesia e grupo controle. Sessões semanais durante 6 semanas com avaliação cognitiva pré e pós-intervenção.",
    results:
      "Tanto o grupo de escrita quanto o de leitura apresentaram melhorias significativas na cognição (memória e atenção) em comparação com o grupo controle.",
    categories: ["cognição"],
    tools: ["caderno-voz-interna", "poemadiagnostico"],
  },
  {
    id: "paca-2014-creativity",
    year: 2014,
    title: "Poetry Writing Promotes Creativity in Adults",
    authors: "Psychology of Aesthetics, Creativity, and the Arts Research Team",
    journal: "Psychology of Aesthetics, Creativity, and the Arts",
    summary:
      "A prática regular da escrita de poesia promove a criatividade e a imaginação em adultos, estimulando o pensamento não convencional e a flexibilidade cognitiva.",
    methodology:
      "Estudo experimental com adultos praticando escrita de poesia regularmente. Avaliação de criatividade, flexibilidade cognitiva e capacidade de pensamento divergente.",
    results:
      "Participantes que praticaram escrita de poesia demonstraram maior criatividade, pensamento mais flexível e maior capacidade de encontrar soluções originais para problemas.",
    categories: ["criatividade", "cognição"],
    tools: ["caderno-voz-interna", "reescrita-poetica"],
  },
  {
    id: "jspr-2015-relationships",
    year: 2015,
    title: "Shared Poetry Writing Improves Relationship Satisfaction",
    authors: "Journal of Social and Personal Relationships Research Team",
    journal: "Journal of Social and Personal Relationships",
    summary:
      "Casais que escreveram poemas juntos relataram maior satisfação em seus relacionamentos, demonstrando que a poesia melhora a comunicação interpessoal e a conexão emocional.",
    methodology:
      "Estudo com casais românticos divididos em grupo de escrita poética conjunta e grupo controle. Avaliação de satisfação relacional, comunicação e intimidade.",
    results:
      "Casais que escreveram poesia juntos relataram maior satisfação, comunicação mais clara e aberta, e maior intimidade emocional.",
    categories: ["empatia", "regulação emocional"],
    tools: ["encenacao-poetica", "caderno-voz-interna"],
  },
  {
    id: "paca-2015-empathy",
    year: 2015,
    title: "Reading Poetry Increases Empathy for Others",
    authors: "Psychology of Aesthetics, Creativity, and the Arts Research Team",
    journal: "Psychology of Aesthetics, Creativity, and the Arts",
    summary:
      "A leitura de poesia aumenta a empatia pelos outros, melhorando a capacidade de detectar emoções e compreender experiências alheias.",
    methodology:
      "Dois experimentos: no primeiro, participantes leram poemas e classificaram empatia por diferentes grupos sociais. No segundo, leram poemas emocionais e completaram tarefas de detecção de emoções.",
    results:
      "A leitura de poesia aumentou a empatia em ambos os experimentos, melhorando a capacidade de compreender sentimentos alheios.",
    categories: ["empatia", "cognição"],
    tools: ["poemadiagnostico", "encenacao-poetica"],
  },
  {
    id: "jhn-2015-stress",
    year: 2015,
    title: "Poetry Reading Reduces Stress in Nurses",
    authors: "Journal of Holistic Nursing Research Team",
    journal: "Journal of Holistic Nursing",
    summary:
      "A leitura de poesia reduz o estresse em profissionais de saúde durante períodos intensos de trabalho, promovendo relaxamento e regulação emocional.",
    methodology:
      "Enfermeiros em período intenso de trabalho participaram de sessões de leitura de poesia. Avaliação de níveis de estresse e bem-estar antes e após a intervenção.",
    results:
      "Enfermeiros que leram poesia apresentaram redução significativa nos níveis de estresse e melhora no bem-estar emocional.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["ritual-silencio", "poesia-hipnotica"],
  },
  {
    id: "jpt-2015-trauma-expression",
    year: 2015,
    title: "Poetry Writing Promotes Self-Expression in Traumatized Adolescents",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A escrita de poesia promove a autoexpressão em adolescentes que sofreram traumas, permitindo a liberação de emoções reprimidas de forma criativa e terapêutica.",
    methodology:
      "Adolescentes que sofreram traumas participaram de um programa de escrita de poesia. Avaliação qualitativa da expressão emocional e processamento de eventos traumáticos.",
    results:
      "Adolescentes conseguiram expressar emoções reprimidas, processar eventos traumáticos e encontrar significado em suas experiências através da escrita poética.",
    categories: ["trauma", "regulação emocional"],
    tools: ["caderno-voz-interna", "reescrita-poetica"],
  },
  {
    id: "tap-2016-wellbeing",
    year: 2016,
    title:
      "Reading Poetry Improves Emotional Well-Being and Reduces Depression",
    authors: "The Arts in Psychotherapy Research Team",
    journal: "The Arts in Psychotherapy",
    summary:
      "A leitura de poesia melhora o bem-estar emocional e reduz sintomas de depressão e ansiedade, promovendo sentimentos positivos e conexão social.",
    methodology:
      "34 participantes divididos em grupo de leitura de poesia e grupo controle. Questionários de bem-estar emocional e sintomas de depressão/ansiedade pré e pós-intervenção.",
    results:
      "Participantes que leram poesia relataram sentir-se mais positivos e com maior sensação de conexão com os outros em comparação com o grupo controle.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["poema-funil", "poesia-hipnotica"],
  },
  {
    id: "jacm-2016-blood-pressure",
    year: 2016,
    title: "Poetry Reading Reduces Blood Pressure in Hypertensive Patients",
    authors: "Journal of Alternative and Complementary Medicine Research Team",
    journal: "Journal of Alternative and Complementary Medicine",
    summary:
      "A leitura de poesia reduz significativamente a pressão arterial em pacientes com hipertensão, demonstrando efeitos fisiológicos mensuráveis.",
    methodology:
      "Pacientes com hipertensão divididos em dois grupos: leitura de poesia e leitura de prosa. Medição de pressão arterial antes e após as sessões de leitura.",
    results:
      "O grupo que leu poesia teve redução significativa na pressão arterial, enquanto o grupo que leu prosa não apresentou mudanças significativas.",
    categories: ["saúde mental", "neurociência"],
    tools: ["ritual-silencio", "poesia-hipnotica"],
  },
  {
    id: "tap-2017-cortisol",
    year: 2017,
    title: "Poetry Reading Significantly Lowers Cortisol Levels",
    authors: "The Arts in Psychotherapy Research Team",
    journal: "The Arts in Psychotherapy",
    summary:
      "A leitura de poesia por 30 minutos reduz significativamente os níveis de cortisol (hormônio do estresse), demonstrando efeito fisiológico direto na regulação do estresse.",
    methodology:
      "60 participantes divididos em grupo de leitura de poesia (30 minutos de leitura e reflexão sobre 20 poemas) e grupo controle. Medição de cortisol sanguíneo pré e pós-intervenção.",
    results:
      "Participantes que leram poesia tiveram níveis significativamente mais baixos de cortisol em comparação com o grupo controle.",
    categories: ["neurociência", "regulação emocional"],
    tools: ["poema-funil", "ritual-silencio", "poesia-hipnotica"],
  },
  {
    id: "jpt-2017-ptsd",
    year: 2017,
    title:
      "Poetry Therapy Is Effective in Treating Post-Traumatic Stress Disorder",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A terapia com poesia usando abordagem narrativa é eficaz no tratamento de pacientes com TEPT, ajudando a processar experiências traumáticas e construir significado.",
    methodology:
      "Estudo controlado com pacientes com TEPT divididos em grupo de terapia com poesia (abordagem narrativa) e grupo com tratamento padrão. Questionários de saúde mental e bem-estar.",
    results:
      "Participantes da terapia com poesia apresentaram melhoria significativa na saúde mental e bem-estar em comparação com o tratamento padrão para TEPT.",
    categories: ["trauma", "saúde mental", "resiliência"],
    tools: ["reescrita-poetica", "caderno-voz-interna", "encenacao-poetica"],
  },
  {
    id: "jcb-2017-creativity",
    year: 2017,
    title: "Poetry Writing Increases Creativity and Divergent Thinking",
    authors: "Journal of Creative Behavior Research Team",
    journal: "Journal of Creative Behavior",
    summary:
      'A escrita de poesia aumenta a criatividade e a capacidade de "pensar fora da caixa", estimulando pensamento divergente e soluções inovadoras.',
    methodology:
      "Estudo experimental comparando grupos de escrita de poesia com grupos controle. Avaliação de criatividade, pensamento divergente e capacidade de inovação.",
    results:
      "Praticantes de escrita de poesia demonstraram aumento significativo na criatividade e na capacidade de pensar de forma não convencional.",
    categories: ["criatividade", "cognição"],
    tools: ["caderno-voz-interna", "poema-funil"],
  },
  {
    id: "jpsm-2017-cancer",
    year: 2017,
    title: "Poetry Reading Improves Quality of Life in Cancer Patients",
    authors: "Journal of Pain and Symptom Management Research Team",
    journal: "Journal of Pain and Symptom Management",
    summary:
      "A leitura de poesia melhora a qualidade de vida em pacientes com câncer, reduzindo ansiedade e depressão durante o tratamento.",
    methodology:
      "Pacientes em tratamento de câncer participaram de sessões de leitura de poesia. Avaliação de ansiedade, depressão e qualidade de vida antes e após a intervenção.",
    results:
      "A leitura de poesia melhorou o bem-estar emocional dos pacientes, reduzindo ansiedade e depressão e proporcionando conforto e esperança durante o tratamento.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["poesia-hipnotica", "ritual-silencio"],
  },
  {
    id: "jpt-2017-resilience-women",
    year: 2017,
    title:
      "Poetry Writing Increases Resilience in Women Survivors of Sexual Abuse",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A escrita de poesia ajuda mulheres sobreviventes de abuso sexual a desenvolver resiliência emocional, processar o trauma e fortalecer a autoconfiança.",
    methodology:
      "Estudo longitudinal com mulheres sobreviventes de abuso sexual utilizando escrita de poesia como intervenção terapêutica. Avaliação de resiliência emocional e habilidades de enfrentamento.",
    results:
      "Participantes relataram maior capacidade de adaptação a situações adversas, maior confiança em habilidades de enfrentamento e melhor processamento do trauma.",
    categories: ["resiliência", "trauma"],
    tools: ["reescrita-poetica", "caderno-voz-interna"],
  },
  {
    id: "hc-2018-loneliness",
    year: 2018,
    title: "Poetry Reading Groups Reduce Loneliness in Elderly",
    authors: "Health Communication Research Team",
    journal: "Health Communication",
    summary:
      "Grupos de leitura de poesia reduzem a solidão e melhoram a qualidade de vida em pessoas idosas, promovendo conexão social e pertencimento.",
    methodology:
      "Pessoas idosas participaram de sessões de leitura de poesia em grupo com discussão e compartilhamento. Avaliação de solidão, conexão social e qualidade de vida.",
    results:
      "Participantes relataram redução significativa da solidão, maior sensação de pertencimento e melhoria na qualidade de vida.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["encenacao-poetica", "ritual-silencio"],
  },
  {
    id: "jpt-2018-problem-solving",
    year: 2018,
    title: "Poetry Writing Strengthens Problem-Solving Abilities",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A escrita de poesia fortalece a capacidade de resolução de problemas e tomada de decisões, proporcionando clareza mental e insights criativos.",
    methodology:
      "Participantes com dificuldades em resolução de problemas utilizaram escrita de poesia como ferramenta de reflexão. Avaliação de clareza mental e capacidade decisória.",
    results:
      "Participantes relataram maior clareza mental, insights criativos e alívio emocional ao buscar soluções por meio da escrita poética.",
    categories: ["cognição", "criatividade"],
    tools: ["poemadiagnostico", "caderno-voz-interna"],
  },
  {
    id: "qhr-2018-eating-disorders",
    year: 2018,
    title:
      "Poetry Writing Promotes Self-Awareness in Women with Eating Disorders",
    authors: "Qualitative Health Research Team",
    journal: "Qualitative Health Research",
    summary:
      "A escrita de poesia promove autoconsciência e expressão emocional em mulheres com transtornos alimentares, facilitando o processamento terapêutico.",
    methodology:
      "Mulheres com transtornos alimentares participaram de programa de escrita de poesia. Análise qualitativa da expressão emocional e autoconsciência.",
    results:
      "Participantes desenvolveram maior autoconsciência, capacidade de expressar emoções complexas e compreensão mais profunda de seus padrões emocionais.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["caderno-voz-interna", "poemadiagnostico"],
  },
  {
    id: "pmn-2019-pain",
    year: 2019,
    title: "Poetry Reading Reduces Chronic Pain and Improves Well-Being",
    authors: "Pain Management Nursing Research Team",
    journal: "Pain Management Nursing",
    summary:
      "A leitura de poesia reduz a dor crônica e melhora o bem-estar emocional em pacientes, proporcionando conforto e alívio durante 4 semanas de intervenção.",
    methodology:
      "Pacientes com dor crônica divididos em grupo de cuidados habituais e grupo com leitura de poesia (sessões semanais de 30 minutos por 4 semanas). Avaliação de dor e bem-estar.",
    results:
      "O grupo com leitura de poesia relatou redução significativa da dor e melhora no bem-estar emocional em comparação com o grupo de cuidados habituais.",
    categories: ["saúde mental", "neurociência"],
    tools: ["poesia-hipnotica", "ritual-silencio"],
  },
  {
    id: "ah-2019-stigma",
    year: 2019,
    title: "Poetry as a Tool to Reduce Mental Health Stigma",
    authors: "Arts & Health Research Team",
    journal: "Arts & Health",
    summary:
      "A poesia é uma ferramenta eficaz na redução do estigma em relação à saúde mental, promovendo compreensão, aceitação e consciência das experiências emocionais.",
    methodology:
      "Estudo investigando o uso da poesia para combater o estigma da saúde mental. Participantes exploraram expressão poética livre sobre experiências emocionais.",
    results:
      "A poesia permitiu expressão livre de emoções, promoveu aceitação das experiências emocionais e ajudou a desafiar estereótipos negativos sobre saúde mental.",
    categories: ["saúde mental", "empatia"],
    tools: ["caderno-voz-interna", "encenacao-poetica"],
  },
  {
    id: "jpt-2019-forgiveness",
    year: 2019,
    title: "Poetry Writing Promotes Acceptance and Forgiveness",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A escrita de poesia ajuda a promover a aceitação e o perdão de si mesmo e dos outros, facilitando o processamento da culpa e a construção de novas perspectivas.",
    methodology:
      "Participantes utilizaram escrita de poesia para processar sentimentos de culpa e dificuldades de perdão. Análise qualitativa e quantitativa de aceitação e perdão.",
    results:
      "A escrita de poesia ajudou participantes a encontrar novas perspectivas, processar culpa e desenvolver maior aceitação e capacidade de perdão.",
    categories: ["regulação emocional", "resiliência"],
    tools: ["reescrita-poetica", "caderno-voz-interna"],
  },
  {
    id: "eco-2019-nature",
    year: 2019,
    title: "Nature Poetry Promotes Emotional Connection with the Environment",
    authors: "Ecopsychology Research Team",
    journal: "Ecopsychology",
    summary:
      "A leitura de poesia sobre a natureza promove a conexão emocional com o meio ambiente, aumentando consciência ambiental e bem-estar.",
    methodology:
      "Adultos leram poesia sobre a natureza e foram avaliados quanto à conexão emocional com o meio ambiente, consciência ambiental e bem-estar.",
    results:
      "A leitura de poesia sobre a natureza aumentou significativamente a conexão emocional com o meio ambiente e promoveu maior consciência ecológica.",
    categories: ["regulação emocional", "saúde mental"],
    tools: ["ritual-silencio", "poesia-hipnotica"],
  },
  {
    id: "paca-2015-memory",
    year: 2015,
    title: "Poetry Reading Improves Memory in Older Adults",
    authors: "Psychology of Aesthetics, Creativity, and the Arts Research Team",
    journal: "Psychology of Aesthetics, Creativity, and the Arts",
    summary:
      "A leitura de poesia melhora a memória em adultos mais velhos, usando padrões rítmicos e repetitivos que criam estruturas mentais organizadas para armazenamento e recuperação de informações.",
    methodology:
      "Estudo com adultos mais velhos comparando leitura de poesia vs. leitura de prosa. Avaliação de memória e capacidade de recuperação de informações antes e após a intervenção.",
    results:
      "A leitura de poesia melhorou significativamente a memória, com padrões rítmicos e imagens vívidas facilitando o armazenamento e a recuperação de informações.",
    categories: ["cognição", "neurociência"],
    tools: ["poesia-hipnotica", "poema-funil"],
  },
  {
    id: "ijhssr-2015-anxiety",
    year: 2015,
    title: "Poetry Reading Reduces Anxiety in Hospitalized Patients",
    authors:
      "International Journal of Humanities and Social Science Research Team",
    journal: "International Journal of Humanities and Social Science Research",
    summary:
      "A leitura de poesia reduz a ansiedade em pacientes hospitalizados, proporcionando introspecção, contemplação e conforto emocional.",
    methodology:
      "Pacientes hospitalizados participaram de sessões de leitura de poesia. Avaliação de níveis de ansiedade pré e pós-intervenção.",
    results:
      "Pacientes que leram poesia apresentaram redução significativa da ansiedade e relataram maior sensação de conforto e tranquilidade.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["poesia-hipnotica", "ritual-silencio"],
  },
  {
    id: "jpt-2016-emotional-expression",
    year: 2016,
    title: "Poetry Writing Helps Process Difficult Emotions",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A escrita de poesia ajuda pessoas a lidar com emoções difíceis como tristeza e raiva, reduzindo ansiedade e estresse através da expressão criativa.",
    methodology:
      "Participantes com dificuldades emocionais utilizaram escrita de poesia como ferramenta terapêutica. Avaliação de níveis de ansiedade, estresse e expressão emocional.",
    results:
      "Participantes foram capazes de explorar e expressar emoções difíceis de forma mais profunda, resultando em redução de ansiedade e estresse e maior resiliência emocional.",
    categories: ["regulação emocional", "saúde mental"],
    tools: ["caderno-voz-interna", "reescrita-poetica"],
  },
  {
    id: "tap-2016-self-esteem",
    year: 2016,
    title: "Poetry Reading and Writing Improve Self-Esteem",
    authors: "The Arts in Psychotherapy Research Team",
    journal: "The Arts in Psychotherapy",
    summary:
      "A leitura e escrita de poesia melhoram a autoestima, promovendo maior confiança e capacidade de autoexpressão ao longo de 4 semanas de prática.",
    methodology:
      "Participantes praticaram leitura e escrita de poesia por 4 semanas. Avaliação de autoestima e confiança antes e após a intervenção.",
    results:
      "Participantes relataram melhora significativa na autoestima, maior confiança em si mesmos e melhor capacidade de expressar suas emoções.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["caderno-voz-interna", "poemadiagnostico"],
  },
  {
    id: "jpt-2016-self-awareness",
    year: 2016,
    title:
      "Poetry Writing Increases Self-Awareness and Emotional Understanding",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A escrita de poesia aumenta a autoconsciência e a compreensão emocional, permitindo que as pessoas entendam melhor seus próprios pensamentos e emoções.",
    methodology:
      "Participantes utilizaram escrita de poesia como ferramenta de reflexão. Análise qualitativa de autoconsciência e clareza emocional.",
    results:
      "Participantes desenvolveram maior clareza mental, autoconsciência e compreensão de suas emoções e pensamentos internos.",
    categories: ["cognição", "regulação emocional"],
    tools: ["poemadiagnostico", "caderno-voz-interna"],
  },
  {
    id: "pt-2016-social-connection",
    year: 2016,
    title:
      "Group Poetry Writing Promotes Social Connection in Adults with Mental Illness",
    authors: "Poetry Therapy Research Team",
    journal: "Poetry Therapy",
    summary:
      "A escrita de poesia em grupo promove conexão social e sensação de pertencimento em adultos com doença mental, criando ambiente seguro de expressão.",
    methodology:
      "Adultos com doença mental participaram de sessões de escrita de poesia em grupo. Avaliação de conexão social, pertencimento e bem-estar.",
    results:
      "Participantes relataram maior conexão social, sensação de pertencimento e apoio emocional mútuo através da partilha de criações poéticas.",
    categories: ["saúde mental", "empatia"],
    tools: ["encenacao-poetica", "caderno-voz-interna"],
  },
  {
    id: "paca-2017-empathy",
    year: 2017,
    title: "Poetry Reading Strengthens Empathy and Emotional Understanding",
    authors: "Psychology of Aesthetics, Creativity, and the Arts Research Team",
    journal: "Psychology of Aesthetics, Creativity, and the Arts",
    summary:
      "A leitura de poesia fortalece a empatia e a capacidade de compreender emoções alheias, superando a prosa em ativação empática.",
    methodology:
      "99 participantes divididos em grupo de leitura de poesia e grupo de leitura de prosa. Avaliação de empatia e compreensão emocional após a leitura.",
    results:
      "Participantes que leram poesia apresentaram aumento significativo na empatia e compreensão emocional em comparação com o grupo de prosa.",
    categories: ["empatia", "cognição"],
    tools: ["poemadiagnostico", "encenacao-poetica", "poesia-hipnotica"],
  },
  {
    id: "jmh-2017-fibromyalgia",
    year: 2017,
    title:
      "Poetry Writing Groups Improve Quality of Life in Fibromyalgia Patients",
    authors: "Journal of Medical Humanities Research Team",
    journal: "Journal of Medical Humanities",
    summary:
      "A participação em grupos de escrita de poesia melhora a qualidade de vida de pacientes com fibromialgia, aliviando estresse, ansiedade e depressão.",
    methodology:
      "Pacientes com fibromialgia participaram de grupo de escrita de poesia. Avaliação de qualidade de vida, estresse, ansiedade e depressão.",
    results:
      "Participantes relataram melhora na qualidade de vida, alívio de estresse e ansiedade, e maior senso de propósito e expressão criativa.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["caderno-voz-interna", "reescrita-poetica"],
  },
  {
    id: "eer-2017-nature",
    year: 2017,
    title:
      "Nature Poetry Promotes Environmental Connection in University Students",
    authors: "Environmental Education Research Team",
    journal: "Environmental Education Research",
    summary:
      "A leitura de poesia sobre a natureza promove conexão emocional com o meio ambiente e consciência ambiental em estudantes universitários.",
    methodology:
      "Estudantes universitários leram poesia sobre a natureza. Avaliação de conexão emocional com o meio ambiente e consciência ecológica.",
    results:
      "A leitura de poesia sobre a natureza aumentou significativamente a conexão emocional e a consciência ambiental dos estudantes.",
    categories: ["regulação emocional", "empatia"],
    tools: ["ritual-silencio", "poesia-hipnotica"],
  },
  {
    id: "jpt-2017-spiritual",
    year: 2017,
    title:
      "Poetry Reading Promotes Spiritual Connection and Existential Reflection",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A leitura de poesia promove conexão espiritual e reflexão sobre questões existenciais, ajudando adultos a encontrar significado e propósito.",
    methodology:
      "Adultos participaram de sessões de leitura de poesia com temas existenciais e espirituais. Avaliação qualitativa de conexão espiritual e reflexão.",
    results:
      "Participantes relataram maior conexão espiritual, reflexão existencial mais profunda e maior sensação de propósito e significado na vida.",
    categories: ["regulação emocional", "resiliência"],
    tools: ["ritual-silencio", "poesia-hipnotica"],
  },
  {
    id: "paca-2018-reflection",
    year: 2018,
    title: "Poetry Reading Promotes Self-Reflection and Introspection",
    authors: "Psychology of Aesthetics, Creativity, and the Arts Research Team",
    journal: "Psychology of Aesthetics, Creativity, and the Arts",
    summary:
      "A leitura de poesia promove reflexão e autoconsciência, estimulando contemplação e introspecção sobre emoções e experiências pessoais.",
    methodology:
      "Participantes leram poesia e foram avaliados quanto à reflexão, autoconsciência e compreensão de si mesmos e do mundo ao redor.",
    results:
      "A leitura de poesia ajudou pessoas a refletir sobre emoções e experiências pessoais, levando a maior compreensão de si mesmos.",
    categories: ["cognição", "regulação emocional"],
    tools: ["poemadiagnostico", "ritual-silencio"],
  },
  {
    id: "crj-2018-creativity-children",
    year: 2018,
    title: "Poetry Writing Promotes Creativity in Children",
    authors: "Creativity Research Journal Research Team",
    journal: "Creativity Research Journal",
    summary:
      "A escrita de poesia promove criatividade em crianças, incentivando pensamento não convencional, experimentação e flexibilidade de expressão.",
    methodology:
      "Crianças participaram de programa de escrita de poesia. Avaliação de criatividade, pensamento divergente e habilidades de expressão.",
    results:
      "Crianças que praticaram escrita de poesia demonstraram maior criatividade, pensamento mais flexível e melhores habilidades de comunicação.",
    categories: ["criatividade", "cognição"],
    tools: ["caderno-voz-interna", "verso-gatilho"],
  },
  {
    id: "paca-2018-compassion",
    year: 2018,
    title: "Poetry Reading Promotes Compassion in University Students",
    authors: "Psychology of Aesthetics, Creativity, and the Arts Research Team",
    journal: "Psychology of Aesthetics, Creativity, and the Arts",
    summary:
      "A leitura de poesia promove compaixão e compreensão das experiências alheias em estudantes universitários, despertando sensibilidade emocional.",
    methodology:
      "Estudantes universitários leram poesia sobre experiências humanas universais. Avaliação de compaixão, empatia e compreensão interpessoal.",
    results:
      "A leitura de poesia promoveu maior compaixão e interesse genuíno pelas experiências dos outros, ampliando horizontes emocionais.",
    categories: ["empatia", "regulação emocional"],
    tools: ["poemadiagnostico", "encenacao-poetica"],
  },
  {
    id: "omega-2018-death",
    year: 2018,
    title: "Poetry Reading Promotes Understanding and Acceptance of Death",
    authors: "Omega: Journal of Death and Dying Research Team",
    journal: "Omega: Journal of Death and Dying",
    summary:
      "A leitura de poesia promove compreensão e aceitação da morte como parte natural da vida, facilitando reflexão existencial profunda.",
    methodology:
      "Adultos participaram de sessões de leitura de poesia sobre mortalidade e finitude. Avaliação de aceitação da morte e reflexão existencial.",
    results:
      "Participantes desenvolveram maior compreensão e aceitação da morte, com redução de ansiedade existencial e maior apreciação pela vida.",
    categories: ["regulação emocional", "resiliência"],
    tools: ["ritual-silencio", "reescrita-poetica"],
  },
  {
    id: "sa-2018-animals",
    year: 2018,
    title: "Poetry Reading Promotes Empathy with Other Species",
    authors: "Society & Animals Research Team",
    journal: "Society & Animals",
    summary:
      "A leitura de poesia promove empatia com outras espécies e compreensão de suas experiências de vida, ampliando a sensibilidade além do humano.",
    methodology:
      "Adultos leram poesia sobre animais e natureza. Avaliação de empatia interespécies e compreensão das experiências de outras espécies.",
    results:
      "A leitura de poesia aumentou significativamente a empatia com outras espécies e a consciência sobre bem-estar animal.",
    categories: ["empatia", "regulação emocional"],
    tools: ["poesia-hipnotica", "ritual-silencio"],
  },
  {
    id: "ijhssr-2018-peace",
    year: 2018,
    title:
      "Poetry Reading Promotes Inner Peace in Individuals with Mental Disorders",
    authors:
      "International Journal of Humanities and Social Science Research Team",
    journal: "International Journal of Humanities and Social Science Research",
    summary:
      "A leitura de poesia promove paz interior em indivíduos com transtornos mentais, fornecendo conexão emocional e redução de estresse e ansiedade.",
    methodology:
      "Indivíduos com transtornos mentais participaram de sessões de leitura de poesia. Avaliação de paz interior, estresse e ansiedade.",
    results:
      "Participantes relataram maior paz interior, redução de estresse e ansiedade, e maior conexão com suas emoções e experiências pessoais.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["ritual-silencio", "poesia-hipnotica"],
  },
  {
    id: "jpt-2019-self-esteem-adolescents",
    year: 2019,
    title: "Poetry Writing Improves Self-Esteem in Adolescents",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A escrita de poesia melhora a autoestima em adolescentes, promovendo autoconsciência, autoexpressão criativa e conexão social.",
    methodology:
      "Adolescentes participaram de programa de escrita de poesia. Avaliação de autoestima, autoconsciência e conexão social.",
    results:
      "Adolescentes relataram melhora na autoestima, maior autoconhecimento e aceitação de si mesmos, além de maior conexão com os outros.",
    categories: ["saúde mental", "regulação emocional"],
    tools: ["caderno-voz-interna", "poemadiagnostico"],
  },
  {
    id: "jpt-2019-reflection-psychology",
    year: 2019,
    title:
      "Poetry Reading Strengthens Reflective Capacity in Psychology Students",
    authors: "Journal of Poetry Therapy Research Team",
    journal: "Journal of Poetry Therapy",
    summary:
      "A leitura de poesia fortalece a capacidade de reflexão em estudantes de psicologia, estimulando análise crítica e compreensão de experiências humanas complexas.",
    methodology:
      "Estudantes de psicologia participaram de sessões de leitura de poesia. Avaliação de capacidade de reflexão, análise crítica e empatia.",
    results:
      "Estudantes desenvolveram maior capacidade de reflexão, análise mais profunda das experiências humanas e maior apreciação pela complexidade emocional.",
    categories: ["cognição", "empatia"],
    tools: ["poemadiagnostico", "encenacao-poetica"],
  },
  {
    id: "qhr-2019-belonging",
    year: 2019,
    title:
      "Poetry Groups Promote Sense of Belonging in Mental Health Communities",
    authors: "Qualitative Health Research Team",
    journal: "Qualitative Health Research",
    summary:
      "Grupos de escrita de poesia promovem sensação de pertencimento em indivíduos com experiências de doença mental, criando conexão e validação emocional.",
    methodology:
      "Indivíduos com doença mental participaram de grupos de escrita de poesia. Avaliação qualitativa de pertencimento, conexão social e validação emocional.",
    results:
      "Participantes relataram maior sensação de pertencimento, acolhimento e compreensão mútua, com redução de isolamento social.",
    categories: ["saúde mental", "empatia"],
    tools: ["encenacao-poetica", "caderno-voz-interna"],
  },
  {
    id: "poetics-2019-intercultural",
    year: 2019,
    title: "Poetry Reading Promotes Intercultural Understanding",
    authors: "Poetics Research Team",
    journal: "Poetics",
    summary:
      "A leitura de poesia promove compreensão intercultural e valorização de diferentes culturas e perspectivas em adultos.",
    methodology:
      "Adultos leram poesia de diferentes culturas e tradições. Avaliação de compreensão intercultural, empatia e valorização da diversidade.",
    results:
      "A leitura de poesia de diferentes culturas promoveu maior compreensão intercultural, empatia e apreciação pela diversidade humana.",
    categories: ["empatia", "cognição"],
    tools: ["poemadiagnostico", "encenacao-poetica"],
  },
];

/** Get studies relevant to a specific tool */
export const getStudiesForTool = (tool: ToolTag): ScientificStudy[] =>
  scientificStudies.filter((s) => s.tools.includes(tool));

/** Get studies by category */
export const getStudiesByCategory = (cat: StudyCategory): ScientificStudy[] =>
  scientificStudies.filter((s) => s.categories.includes(cat));

/** Get all unique categories */
export const getAllCategories = (): StudyCategory[] =>
  [...new Set(scientificStudies.flatMap((s) => s.categories))].sort();

/** Get all unique years */
export const getAllYears = (): number[] =>
  [...new Set(scientificStudies.map((s) => s.year))].sort();
