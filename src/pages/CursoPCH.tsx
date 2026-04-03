import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Brain, Sparkles, Lightbulb, Heart, Flame, Music, PenTool, Eye, Target, Feather } from 'lucide-react';

import modulo1Img from '@/assets/curso-pch/modulo1-palavras.jpg';
import modulo2Img from '@/assets/curso-pch/modulo2-reestruturacao.jpg';
import modulo3Img from '@/assets/curso-pch/modulo3-linguagem.jpg';
import modulo4Img from '@/assets/curso-pch/modulo4-poemas.jpg';
import modulo5Img from '@/assets/curso-pch/modulo5-avancadas.jpg';
import modulo6Img from '@/assets/curso-pch/modulo6-terapeutica.jpg';
import modulo7Img from '@/assets/curso-pch/modulo7-sessao.jpg';
import modulo8Img from '@/assets/curso-pch/modulo8-exercicios.jpg';

const ModuleImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="rounded-xl overflow-hidden mb-6">
    <img src={src} alt={alt} loading="lazy" width={768} height={512} className="w-full h-48 md:h-56 object-cover" />
  </div>
);

/* ─────────────────────── helpers ─────────────────────── */
const Poem = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div className="poem-block my-6">
    {title && <p className="text-sm font-medium text-primary mb-2">{title}</p>}
    <div className="poem-text text-foreground/80 whitespace-pre-line">{children}</div>
  </div>
);

const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`glass-card rounded-xl p-6 md:p-8 my-6 ${className}`}>{children}</div>
);

const Quote = ({ children }: { children: React.ReactNode }) => (
  <div className="editorial-divider my-8">
    <span className="font-heading italic text-sm md:text-base text-primary/80 text-center">{children}</span>
  </div>
);

const ExerciseStep = ({ step, title, children }: { step: string; title: string; children: React.ReactNode }) => (
  <div className="border-l-2 border-primary/20 pl-4 md:pl-6 my-4">
    <p className="text-primary font-semibold text-sm mb-1">{step}</p>
    <p className="font-heading text-lg text-foreground mb-2">{title}</p>
    <div className="text-muted-foreground text-sm leading-relaxed space-y-2">{children}</div>
  </div>
);

/* ─────────────────────── page ─────────────────────── */
const CursoPCH = () => {
  return (
    <PageLayout
      seo={{
        title: 'Curso PCH — Poesia Cognitiva Hipnótica',
        description: 'Guia completo do curso de Poesia Cognitiva Hipnótica: base teórica, exercícios de reestruturação de crenças, técnicas de linguagem hipnótica, sessão terapêutica em 4 fases e exercícios práticos.',
        path: '/curso-pch',
      }}
      currentPage="Curso PCH"
    >
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-glow" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            Guia Completo do Curso
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
            Poesia Cognitiva{' '}
            <span className="text-primary italic">Hipnótica</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Um guia completo com base teórica, exercícios práticos, técnicas avançadas e um modelo de sessão terapêutica em 4 fases.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Accordion type="multiple" className="space-y-4">

            {/* ══════════════ MÓDULO 1 ══════════════ */}
            <AccordionItem value="modulo-1" className="glass-card rounded-xl border-primary/10 px-6">
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">Módulo 1</p>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Base Teórica — O Poder das Palavras</h2>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ModuleImage src={modulo1Img} alt="O Poder das Palavras — livro aberto com luz cósmica" />
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>A palavra tem um impacto profundo na psique humana, sendo a principal ferramenta da terapia. Quando usada com propósito e poesia, ela pode reestruturar pensamentos e emoções, proporcionando novas percepções e caminhos para a transformação interior.</p>
                  <p>A palavra bem utilizada influencia emoções, crenças e até reconfigura padrões mentais. Seja na hipnoterapia, na PNL, na psicologia ou na meditação guiada, a forma como nos expressamos pode gerar profundas mudanças internas.</p>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Áreas Terapêuticas Relacionadas</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3"><span className="text-primary shrink-0">🌀</span><span><strong className="text-foreground">Hipnose e PNL</strong> – Utilizam sugestões verbais para reprogramar padrões inconscientes e estimular mudanças positivas.</span></li>
                      <li className="flex items-start gap-3"><span className="text-primary shrink-0">🧠</span><span><strong className="text-foreground">Psicoterapia</strong> – A palavra auxilia no autoconhecimento, na ressignificação e na cura emocional.</span></li>
                      <li className="flex items-start gap-3"><span className="text-primary shrink-0">🧘‍♂️</span><span><strong className="text-foreground">Mindfulness e Meditação</strong> – Afirmações e mantras promovem equilíbrio emocional e conexão interior.</span></li>
                      <li className="flex items-start gap-3"><span className="text-primary shrink-0">📖</span><span><strong className="text-foreground">Terapia Narrativa</strong> – Reescrever histórias pessoais transforma a forma de viver a própria trajetória.</span></li>
                      <li className="flex items-start gap-3"><span className="text-primary shrink-0">✍️</span><span><strong className="text-foreground">Escrita Terapêutica</strong> – Escrever pensamentos e emoções auxilia no processamento emocional e na redução do estresse.</span></li>
                    </ul>
                  </SectionCard>

                  <Quote>"Combinando a palavra com intenção e ritmo, criamos um espaço para o florescimento de novas possibilidades." 🌱</Quote>

                  <h3 className="text-lg font-heading font-semibold text-foreground">✨ Poesia Cognitiva Hipnótica (PCH)</h3>
                  <p>A PCH é uma ferramenta poderosa para ressignificar crenças e estimular mudanças emocionais positivas. Com base na Terapia Cognitivo-Comportamental (TCC), combina linguagem sugestiva, metáforas e afirmações para reformular padrões mentais limitantes.</p>

                  <SectionCard>
                    <h4 className="font-heading font-semibold text-foreground mb-3">💡 Como aplicar a PCH para transformar crenças?</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-primary font-medium text-sm mb-1">🔹 1. Identificação da Crença Limitante:</p>
                        <p className="italic">"Eu não sou capaz o suficiente."</p>
                      </div>
                      <div>
                        <p className="text-primary font-medium text-sm mb-1">🔹 2. Nova Narrativa Expansiva:</p>
                        <p className="italic">"Assim como o sol nasce todos os dias sem esforço, minha força se renova a cada novo amanhecer. Mesmo que nuvens o cubram por instantes, sua luz continua brilhando além delas. E, assim como o sol, minha essência é constante, minha capacidade é real, e cada novo dia é uma oportunidade para brilhar ainda mais."</p>
                      </div>
                      <div>
                        <p className="text-primary font-medium text-sm mb-1">🔹 3. Estruturação em Poema Hipnótico:</p>
                        <Poem>{`"Por tanto tempo duvidei de mim,
Como se o vento pudesse parar o mar.
Mas agora percebo...
Cada desafio que enfrento é uma onda...
E eu aprendi a surfar."`}</Poem>
                      </div>
                    </div>
                  </SectionCard>

                  <h3 className="text-lg font-heading font-semibold text-foreground">🧠 Exemplo Prático de Reestruturação</h3>
                  <p><strong className="text-foreground">Antes:</strong> "Eu não sou bom o suficiente, sempre me comparo aos outros."</p>
                  <p><strong className="text-foreground">Depois:</strong> "Meu valor não depende da comparação, mas do meu próprio crescimento."</p>

                  <Poem title='Poema Terapêutico — "O Caminho é Meu"'>{`Por tanto tempo, olhei para o lado,
buscando no outro o que já era meu.
Mas agora percebo, com olhos despertos,
que sempre fui eu… sempre fui eu.

Cada passo, um traço da minha história,
sem pressa, sem medo de ser.
Não há destino, não há comparações,
apenas a jornada… apenas viver.

Sou rio que aprende o próprio curso,
vento que dança sem se prender.
Não preciso ser melhor que ninguém,
apenas melhor do que fui ao nascer.

E assim caminho, leve e inteiro,
sabendo que sou e sempre serei.
Minha verdade, minha essência,
meu próprio rumo, que hoje encontrei.`}</Poem>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ══════════════ MÓDULO 2 ══════════════ */}
            <AccordionItem value="modulo-2" className="glass-card rounded-xl border-primary/10 px-6">
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <PenTool className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">Módulo 2</p>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Exercícios de Reestruturação de Crenças</h2>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ModuleImage src={modulo2Img} alt="Reestruturação de Crenças — borboleta emergindo de casulo" />
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <h3 className="text-lg font-heading font-semibold text-foreground">🔹 Exercício 1: Identificação e Ressignificação</h3>
                  <p>🎯 <strong className="text-foreground">Objetivo:</strong> Tornar consciente uma crença negativa e iniciar o processo de mudança.</p>

                  <ExerciseStep step="Passo 1" title="Identifique sua crença limitante">
                    <p>Exemplos: "Eu não sou bom o suficiente." / "As pessoas sempre me abandonam." / "Nunca consigo o que quero."</p>
                    <p className="mt-2">Perguntas para reflexão:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Essa crença veio de uma experiência?</li>
                      <li>Você ouviu isso de alguém?</li>
                      <li>Desde quando ela está presente?</li>
                    </ul>
                    <p className="mt-2 italic border-l-2 border-primary/30 pl-3">"Minha crença limitante é ___. Ela surgiu quando ___ e me faz acreditar que ___."</p>
                  </ExerciseStep>

                  <ExerciseStep step="Passo 2" title="Impacto na sua vida">
                    <p>Reflexões: Como essa crença me faz sentir? O que ela me impede de fazer? Como afeta minha autoestima e relações?</p>
                    <p className="mt-2 italic border-l-2 border-primary/30 pl-3">"Quando essa crença surge, eu sinto ___ e acabo fazendo ___. Isso me impede de ___."</p>
                  </ExerciseStep>

                  <ExerciseStep step="Passo 3" title="Crie uma nova crença fortalecedora">
                    <p>Transforme a crença negativa em uma afirmação positiva e realista.</p>
                    <div className="mt-2 space-y-2">
                      <p>❌ "Eu não sou bom o suficiente." → ✅ "Eu estou em constante evolução e sou capaz."</p>
                      <p>❌ "As pessoas me abandonam." → ✅ "Eu atraio conexões verdadeiras e sou digno de amor."</p>
                      <p>❌ "Nunca consigo o que quero." → ✅ "Cada esforço me aproxima da realização dos meus objetivos."</p>
                    </div>
                  </ExerciseStep>

                  <ExerciseStep step="Passo 4" title="Transforme em Poema Hipnótico">
                    <p>Use a nova crença como base para escrever um poema que ressignifique a dor.</p>
                    <Poem title="Exemplo: Da Sombra para a Luz">{`Por muito tempo acreditei
que não era o bastante.
Mas hoje percebo…
cada cicatriz conta uma história,
e cada história é um passo adiante.

Eu sou rio, e não pedra.
Eu fluo, e não paro.
E quando o medo tenta me deter,
eu me lembro… sou onda,
e meu destino é o mar.`}</Poem>
                  </ExerciseStep>

                  <h3 className="text-lg font-heading font-semibold text-foreground mt-8">🔹 Exercício 2: Diálogo Interior com a Crença</h3>
                  <p>🎯 <strong className="text-foreground">Objetivo:</strong> Criar um diálogo entre a parte que acredita na limitação e a parte que busca libertação.</p>

                  <SectionCard>
                    <p className="text-foreground font-medium mb-3">Exemplo de Diálogo:</p>
                    <div className="space-y-3 text-sm">
                      <p><strong className="text-destructive/80">Voz da Crença:</strong> "Você nunca vai conseguir. Já tentou antes e falhou."</p>
                      <p><strong className="text-primary">Voz da Transformação:</strong> "Eu posso ter caído antes, mas cada vez aprendi algo novo. E agora sei que tenho mais força do que antes."</p>
                      <p><strong className="text-destructive/80">Voz da Crença:</strong> "E se falhar de novo?"</p>
                      <p><strong className="text-primary">Voz da Transformação:</strong> "Falhar é parte do caminho. Não significa que eu sou fraco. Significa que estou tentando."</p>
                    </div>
                  </SectionCard>

                  <Poem title="Poema gerado pelo diálogo">{`Dentro de mim, duas vozes ecoam:
uma que prende, outra que liberta.
A primeira grita que não sou capaz,
a segunda sussurra que o caminho é certo.

E, ao ouvir as duas, percebo:
a voz que liberta é mais serena.
Ela não precisa gritar para ser ouvida,
porque a verdade fala baixo,
mas ressoa fundo.`}</Poem>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ══════════════ MÓDULO 3 ══════════════ */}
            <AccordionItem value="modulo-3" className="glass-card rounded-xl border-primary/10 px-6">
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">Módulo 3</p>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Técnicas de Linguagem Hipnótica</h2>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ModuleImage src={modulo3Img} alt="Linguagem Hipnótica — cérebro feito de luz e palavras" />
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">1️⃣ Afirmações Ocultas (Embedded Commands)</h3>
                    <p className="mb-3">São comandos sutis inseridos dentro de frases maiores, direcionando o inconsciente sem que a pessoa perceba conscientemente.</p>
                    <p className="text-primary font-medium text-sm mb-2">Como funciona?</p>
                    <ul className="space-y-2 text-sm">
                      <li>• A sugestão principal é camuflada dentro de uma frase aparentemente comum.</li>
                      <li>• O inconsciente absorve a mensagem sem resistência.</li>
                    </ul>
                    <p className="text-primary font-medium text-sm mt-4 mb-2">Exemplos:</p>
                    <ul className="space-y-2 text-sm italic">
                      <li>🔹 "Enquanto você <strong className="text-foreground">respira profundamente</strong>, pode perceber como seu corpo começa a <strong className="text-foreground">relaxar naturalmente</strong>."</li>
                      <li>🔹 "Talvez você não perceba agora, mas aos poucos começa a <strong className="text-foreground">sentir mais confiança</strong>."</li>
                      <li>🔹 "Cada vez que você ouve essas palavras, algo dentro de você <strong className="text-foreground">se fortalece</strong>."</li>
                    </ul>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">2️⃣ Ambiguidade Positiva</h3>
                    <p className="mb-3">Frases que podem ser interpretadas de mais de uma maneira, permitindo que o inconsciente escolha o significado mais útil.</p>
                    <p className="text-primary font-medium text-sm mb-2">Exemplos:</p>
                    <ul className="space-y-2 text-sm italic">
                      <li>🔹 "Você pode <strong className="text-foreground">deixar ir</strong> aquilo que já não precisa carregar." (soltar uma emoção, uma crença ou um hábito)</li>
                      <li>🔹 "À medida que avança, <strong className="text-foreground">a mudança acontece</strong>, no ritmo certo para você."</li>
                      <li>🔹 "A mudança acontece no momento certo, e talvez esse momento seja agora."</li>
                    </ul>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">3️⃣ Repetição e Ritmo</h3>
                    <p className="mb-3">Usar repetição de palavras ou estruturas para aprofundar o impacto emocional e induzir estados de relaxamento.</p>
                    <Poem title="Exemplo de Poesia com Repetição">{`Respire… e sinta…
Respire… e deixe ir…
Respire… e perceba…
que a cada momento,
algo dentro de você se transforma…
suavemente… profundamente…
como ondas no mar… sem pressa de chegar.`}</Poem>
                  </SectionCard>

                  <Poem title="Poema Hipnótico — Sussurros do Inconsciente">{`E se cada suspiro trouxesse um segredo?
E se o silêncio guardasse respostas?

Agora… enquanto sente o tempo desacelerar…
algo dentro de você se transforma…

Como folhas ao vento… que dançam sem esforço…
Como um rio que encontra seu próprio caminho…

Talvez… agora… você perceba…
que já está mudando… sem precisar tentar…

A cada batida do coração…
um novo espaço se abre…

O velho se dissolve… o novo floresce…
e tudo simplesmente… acontece…`}</Poem>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ══════════════ MÓDULO 4 ══════════════ */}
            <AccordionItem value="modulo-4" className="glass-card rounded-xl border-primary/10 px-6">
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Feather className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">Módulo 4</p>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Modelos de Poemas Sugestivos</h2>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ModuleImage src={modulo4Img} alt="Modelos de Poemas — pessoa no topo da montanha ao nascer do sol" />
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <Poem title="🌊 Superação — Fluir e Crescer">{`As marés já mudaram tantas vezes…
e cada onda soube aonde chegar.
Algumas se desfizeram na areia,
outras seguiram sem hesitar.

Assim como a árvore que solta suas folhas,
você também se renova ao passar.
Cada passo, cada instante,
tece um novo despertar.`}</Poem>

                  <Poem title="🌿 Aceitação — A Dança da Vida">{`Nem tudo precisa de resposta…
Nem tudo precisa de ação.
Às vezes, a maior conquista
é simplesmente aceitar o que vem…
sem luta, sem resistência,
apenas fluindo, como a correnteza de um rio.`}</Poem>

                  <Poem title="🔥 Confiança — A Chama Interior">{`Dentro de você, uma chama arde…
suave, constante, inabalável.
Ela não depende de aplausos,
nem de aprovação.
Ela apenas brilha…
porque é a sua essência.`}</Poem>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">✍️ Exercício: Crie seu próprio poema sugestivo</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Escolha um tema emocional (medo, confiança, esperança, aceitação).</li>
                      <li>Identifique uma metáfora da natureza que represente esse tema.</li>
                      <li>Escreva 4 a 8 versos usando linguagem suave e pausas naturais.</li>
                      <li>Leia em voz alta, sentindo o ritmo e o impacto das palavras.</li>
                    </ol>
                  </SectionCard>

                  <Poem title="💧 Perdão — A Chuva que Lava">{`Carreguei essa pedra por tanto tempo
que esqueci como era andar sem peso.
Mas hoje, olho pra ela e percebo…
não era minha. Nunca foi.

Solto o que não me pertence.
Deixo a chuva lavar o que ficou.
E quando o chão secar,
plantarei algo que cresça com raízes minhas.`}</Poem>

                  <Poem title="🌙 Autocompaixão — O Abraço Noturno">{`Quando a noite chega e o barulho cessa,
eu me encontro comigo sem plateia.
E ali, sem máscara, sem pressa,
me abraço como quem cuida de uma vela.

Frágil, sim. Mas ainda acesa.
E isso já é o suficiente
para iluminar o próximo passo.`}</Poem>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">🔑 Dicas para Poemas Sugestivos Eficazes</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-foreground">Use "você" ou "eu" de forma alternada</strong> — "você" cria distanciamento seguro; "eu" cria identificação direta.</li>
                      <li>• <strong className="text-foreground">Inclua comandos embutidos</strong> — frases como "perceba como", "sinta agora", "permita-se" ativam o inconsciente.</li>
                      <li>• <strong className="text-foreground">Termine com expansão</strong> — o último verso deve abrir, não fechar. Deixe espaço para o leitor respirar.</li>
                      <li>• <strong className="text-foreground">Respeite o ritmo</strong> — versos curtos criam tensão; versos longos criam acolhimento. Alterne conforme o efeito desejado.</li>
                      <li>• <strong className="text-foreground">Teste em voz alta</strong> — se tropeçar na leitura, simplifique. O poema terapêutico deve fluir como respiração.</li>
                    </ul>
                  </SectionCard>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ══════════════ MÓDULO 5 ══════════════ */}
            <AccordionItem value="modulo-5" className="glass-card rounded-xl border-primary/10 px-6">
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">Módulo 5</p>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Técnicas Avançadas — Metáforas, Pacing e Leading</h2>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ModuleImage src={modulo5Img} alt="Técnicas Avançadas — ondas do oceano com notas musicais" />
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">🎯 Técnica da Palavra-Gatilho — Ancorando Emoções</h3>
                    <p className="mb-4">Utilizar uma palavra ou frase como âncora para ativar emoções positivas e fortalecer crenças construtivas.</p>
                    <ol className="list-decimal pl-5 space-y-3 text-sm">
                      <li><strong className="text-foreground">Escolha uma palavra ou frase</strong> que represente a qualidade que deseja cultivar: "Confiança", "Crescimento", "Liberdade", "Eu sou mais forte a cada dia".</li>
                      <li><strong className="text-foreground">Repita todos os dias</strong> — pela manhã, durante pausas, ou antes de dormir. Em voz alta ou mentalmente.</li>
                      <li><strong className="text-foreground">Escreva em lugares visíveis</strong> — mesa de trabalho, espelho, celular.</li>
                      <li><strong className="text-foreground">Observe as mudanças</strong> — perceba como ela se torna um gatilho para ativar emoções de confiança e força.</li>
                    </ol>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">2️⃣ Uso de Metáforas — Imagens Mentais Poderosas</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm mb-4">
                      <li>Escolha um desafio pessoal (medo de mudanças, falta de confiança, etc.).</li>
                      <li>Crie uma metáfora — um elemento da natureza ou objeto que simbolize o que sente.</li>
                      <li>Transforme em uma história de crescimento — mostre como supera obstáculos.</li>
                    </ol>
                    <p className="text-sm"><strong className="text-foreground">Exemplo:</strong> Desafio: Falta de confiança → Metáfora: "A pequena semente teme crescer, mas quando se abre à luz, ela se transforma em uma árvore forte."</p>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">3️⃣ Pacing e Leading — Validando e Conduzindo</h3>
                    <p className="mb-4">Técnica de conectar-se ao estado atual da pessoa (pacing) e conduzi-la suavemente a um novo estado (leading).</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-primary font-medium text-sm mb-1">Exercício de Relaxamento:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                          <li><strong className="text-foreground">Estado Atual:</strong> "Você está sentado ou deitado agora, talvez em um lugar confortável, com seus pés apoiados no chão."</li>
                          <li><strong className="text-foreground">Descrição Neutra:</strong> "Enquanto você respira, talvez perceba o movimento suave de sua barriga subindo e descendo."</li>
                          <li><strong className="text-foreground">Estado Desejado:</strong> "E talvez, à medida que sua respiração se aprofunda, você comece a perceber uma sensação de leveza, se espalhando por seu corpo."</li>
                        </ol>
                      </div>

                      <Poem title="Poesia do Relaxamento">{`Agora, sente o apoio sob seus pés,
O toque suave do ambiente ao redor,
A respiração que flui, calmamente,
Sem pressa, como um suave sopro de vento.

Cada inspiração, uma onda serena,
Cada expiração, um alívio que chega,
E, enquanto o corpo se entrega ao descanso,
As tensões se dissolvem, suavemente,
Como a areia sendo levada pelo mar.

Permita-se ser envolvido por essa calma,
Onde o peso do mundo já não existe,
E no seu coração, um suspiro de alívio,
Como se cada respiração fosse a chave
Para um estado profundo de serenidade.`}</Poem>

                      <Poem title="Poesia da Confiança">{`Você já enfrentou muitos desafios,
Momentos que pediram coragem e força,
E, cada vez que a vida testou sua resistência,
Você se levantou, com mais determinação.

Agora, ao olhar para o futuro,
Talvez uma sensação de confiança comece a crescer,
Tranquila e silenciosa, dentro de você,
Sabendo que, com cada passo, você se torna mais forte,
Mais preparado para o que está por vir.

O caminho à frente se abre,
E você segue, não com medo, mas com fé,
Com a certeza de que, a cada passo dado,
Está cada vez mais próximo de alcançar a sua essência.`}</Poem>
                    </div>
                  </SectionCard>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ══════════════ MÓDULO 6 ══════════════ */}
            <AccordionItem value="modulo-6" className="glass-card rounded-xl border-primary/10 px-6">
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Eye className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">Módulo 6</p>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Poesia Terapêutica — Tipos e Aplicações</h2>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ModuleImage src={modulo6Img} alt="Poesia Terapêutica — flor de lótus em luz dourada" />
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">2.1 Poesia de Ressignificação</h3>
                    <p className="mb-2"><strong className="text-foreground">Objetivo:</strong> Reformular pensamentos automáticos negativos em uma perspectiva mais saudável.</p>
                    <Poem>{`"A sombra sempre me seguiu,
como se fosse parte de mim.
Mas quando me virei para a luz,
percebi… ela estava atrás de mim, não à frente.
E à minha frente, sempre houve caminho."`}</Poem>
                    <p className="text-sm mt-2">✅ Técnicas: Metáfora da sombra e da luz + Reenquadramento + Mudança de foco.</p>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">2.2 Poesia de Integração (Aceitação e Resiliência)</h3>
                    <p className="mb-2"><strong className="text-foreground">Objetivo:</strong> Ajudar na aceitação de experiências difíceis, promovendo equilíbrio emocional.</p>
                    <Poem>{`"Cada cicatriz na árvore conta uma história.
Não apaga o vento que soprou, nem a tempestade que passou.
Mas é exatamente isso que a fortalece.
E assim, aprendo a me amar, com tudo que sou."`}</Poem>
                    <p className="text-sm mt-2">✅ Técnicas: Metáfora da resiliência + Ressignificação da dor + Conclusão empoderadora.</p>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">2.3 Poesia de Futuro Positivo (Visualização)</h3>
                    <p className="mb-2"><strong className="text-foreground">Objetivo:</strong> Criar imagens mentais que direcionam para um futuro mais leve e esperançoso.</p>
                    <Poem>{`"Lá na frente, um novo amanhecer espera.
As cores que ainda não vi já existem.
A estrada se desenha sob meus pés a cada passo.
E quando percebo, já estou mais longe do que imaginei."`}</Poem>
                    <p className="text-sm mt-2">✅ Técnicas: Visualização do futuro + Metáforas de movimento + Mudança de percepção do tempo.</p>
                  </SectionCard>

                  <h3 className="text-lg font-heading font-semibold text-foreground">3. Exercícios Avançados de Escrita Terapêutica</h3>

                  <SectionCard>
                    <h4 className="font-heading font-semibold text-foreground mb-3">3.1 Transformação de Narrativa</h4>
                    <p className="mb-2">Reescreva um evento doloroso como se fosse uma história de superação.</p>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Descreva o evento original brevemente.</li>
                      <li>Reescreva-o com foco no aprendizado e crescimento.</li>
                      <li>Finalize com uma afirmação de poder pessoal.</li>
                    </ol>
                  </SectionCard>

                  <SectionCard>
                    <h4 className="font-heading font-semibold text-foreground mb-3">3.2 Carta ao Eu do Futuro</h4>
                    <p className="mb-2">Escreva uma carta para a versão de si mesmo daqui a 5 anos.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>O que você gostaria de dizer a essa pessoa?</li>
                      <li>Que conquistas espera ter alcançado?</li>
                      <li>Que medos espera ter superado?</li>
                    </ul>
                  </SectionCard>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ══════════════ MÓDULO 7 ══════════════ */}
            <AccordionItem value="modulo-7" className="glass-card rounded-xl border-primary/10 px-6">
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">Módulo 7</p>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Sessão Terapêutica PCH em 4 Fases</h2>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ModuleImage src={modulo7Img} alt="Sessão em 4 Fases — círculos de luz interconectados" />
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <SectionCard className="border-l-4 border-l-primary/40">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary font-bold text-lg">Fase 1</span>
                      <h3 className="text-lg font-heading font-semibold text-foreground">Acolhimento e Conexão (10 min)</h3>
                    </div>
                    <p className="mb-3"><strong className="text-foreground">Objetivo:</strong> Criar espaço de confiança e presença.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Respiração guiada para ancorar no momento presente.</li>
                      <li>• Leitura de um poema de acolhimento para abrir o espaço emocional.</li>
                      <li>• Pergunta inicial: "O que traz você aqui hoje?"</li>
                    </ul>
                    <Poem title="Poema de Acolhimento">{`Aqui, neste espaço, você é bem-vindo.
Não há julgamento, não há pressa.
Apenas o som da sua voz,
o ritmo da sua respiração,
e a certeza de que, agora, este momento é seu.`}</Poem>
                  </SectionCard>

                  <SectionCard className="border-l-4 border-l-secondary/40">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-secondary font-bold text-lg">Fase 2</span>
                      <h3 className="text-lg font-heading font-semibold text-foreground">Identificação e Expressão (15 min)</h3>
                    </div>
                    <p className="mb-3"><strong className="text-foreground">Objetivo:</strong> Dar voz às emoções reprimidas e torná-las conscientes.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Escrita terapêutica: "Agora escreva uma conversa curta entre você e sua emoção."</li>
                      <li>• Espelhamento: repetir frases transformadoras conectando fala à respiração.</li>
                      <li>• Exemplos: "Eu sou maior do que qualquer emoção passageira." / "Eu acolho o que sinto sem medo."</li>
                    </ul>
                  </SectionCard>

                  <SectionCard className="border-l-4 border-l-primary/40">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary font-bold text-lg">Fase 3</span>
                      <h3 className="text-lg font-heading font-semibold text-foreground">Transformação e Sugestão Positiva (15 min)</h3>
                    </div>
                    <p className="mb-3"><strong className="text-foreground">Objetivo:</strong> Substituir padrões limitantes por novas narrativas fortalecedoras.</p>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>• <strong className="text-foreground">Reestruturação Cognitiva:</strong> reescrever o desfecho de experiências difíceis.</li>
                      <li>• <strong className="text-foreground">Mantra Pessoal:</strong> formular uma frase curta e poderosa de transformação.</li>
                      <li>• <strong className="text-foreground">Gesto Associado:</strong> simbolizar o ato de deixar ir (abrir as mãos, suspiro profundo).</li>
                      <li>• <strong className="text-foreground">Visualização:</strong> imaginar vivendo a nova história criada.</li>
                    </ul>
                    <Poem title="Poema de Transformação">{`"O medo dizia que eu não poderia seguir,
Mas percebi…
O medo não tem pernas.
Ele apenas fala, mas sou eu quem decide caminhar.

Cada passo que dou é uma escolha.
E a cada escolha, um novo caminho se desenha.
O medo pode olhar, mas nunca guiar."`}</Poem>
                  </SectionCard>

                  <SectionCard className="border-l-4 border-l-secondary/40">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-secondary font-bold text-lg">Fase 4</span>
                      <h3 className="text-lg font-heading font-semibold text-foreground">Ancoragem e Fechamento (10 min)</h3>
                    </div>
                    <p className="mb-3"><strong className="text-foreground">Objetivo:</strong> Criar um símbolo interno para fixar o aprendizado.</p>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>• <strong className="text-foreground">Palavra-chave como Âncora:</strong> "Força", "Paz", "Confiança", "Fluir".</li>
                      <li>• <strong className="text-foreground">Âncora Musical:</strong> música que evoca a sensação de transformação.</li>
                      <li>• <strong className="text-foreground">Ritual Pessoal:</strong> acender uma vela, respirar profundamente, mentalizar o mantra.</li>
                    </ul>
                    <Poem title="Poema Final de Ancoragem">{`"Feche os olhos e veja...
Uma chama acendendo dentro de você.
Ela brilha suave, mas firme.
A cada respiração, ela cresce, aquece, fortalece.

E quando abrir os olhos, essa luz continuará ali.
Não porque foi dada a você...
Mas porque sempre esteve dentro de você."`}</Poem>
                    <p className="text-sm mt-4 italic text-primary/80">🎭 Sugestão: Pedir que coloquem a mão no peito e perguntar: "O que essa chama representa para você?"</p>
                  </SectionCard>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ══════════════ MÓDULO 8 ══════════════ */}
            <AccordionItem value="modulo-8" className="glass-card rounded-xl border-primary/10 px-6">
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">Módulo 8</p>
                    <h2 className="text-xl font-heading font-semibold text-foreground">Exercícios Práticos — Reescrevendo sua História</h2>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <ModuleImage src={modulo8Img} alt="Exercícios Práticos — mão escrevendo poesia à luz de vela" />
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>Os seguintes exercícios foram desenvolvidos para ajudar você a acessar suas emoções, ressignificar desafios e criar uma nova narrativa para sua vida. Pegue um caderno, encontre um espaço tranquilo e mergulhe na experiência.</p>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">1. Escrevendo a Carta para o Medo</h3>
                    <p className="mb-3">O objetivo é externalizar o medo, torná-lo algo tangível. Escrevendo uma carta, você cria um distanciamento saudável.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-foreground">Escreva sobre o início do medo:</strong> Quando surgiu? Na infância? Em um evento específico?</li>
                      <li>• <strong className="text-foreground">Dê ao medo uma forma:</strong> Uma sombra? Uma figura? Tem cor, cheiro, sensação física?</li>
                      <li>• <strong className="text-foreground">Questionamentos profundos:</strong> "O que você tem me mostrado? Que crenças antigas está tentando manter vivas?"</li>
                    </ul>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">2. Respondendo ao Medo como Mentor Sábio</h3>
                    <p className="mb-3">Escreva de um lugar de sabedoria e compaixão, representando sua sabedoria interior.</p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong className="text-foreground">Reconheça a função:</strong> "Querido medo, entendo que está aqui para me proteger."</li>
                      <li>• <strong className="text-foreground">Crie uma metáfora:</strong> "Você é a sombra que me lembra da luz que posso acender dentro de mim."</li>
                      <li>• <strong className="text-foreground">Explique a transformação:</strong> "Você não precisa mais me dominar. Agora, é um sinal de alerta e não uma prisão."</li>
                    </ul>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">3. Perceba a Diferença e a Ressignificação</h3>
                    <p>Após escrever ambas as cartas, entre em contato com as vozes internas: a voz do medo (autoritária, frágil, repetitiva) e a voz da sabedoria (calma, centrada, confiável).</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
                      <li>Quais vozes você tem escutado mais?</li>
                      <li>Onde na sua vida o medo se tornou protagonista?</li>
                      <li>Onde a sabedoria foi silenciada?</li>
                    </ul>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">4. Prática de Expressão e Visualização</h3>
                    <p className="mb-3">Use visualizações para fortalecer a transformação.</p>
                    <p className="text-sm italic border-l-2 border-primary/30 pl-3">Imagine-se em um campo, cercado por uma névoa escura (o medo). Quando você respira profundamente, essa névoa começa a se dissipar, revelando um campo vasto e brilhante à sua frente — as novas possibilidades sem o peso do medo.</p>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">5. Ritual de Ressignificação com Palavras e Gestos</h3>
                    <p>Escolha uma palavra como "coragem", "transformação" ou "liberdade". A cada vez que usá-la, será um lembrete do seu poder interior. Um gesto simples — abrir os braços, palmas das mãos — ajuda o corpo a lembrar a nova realidade que está criando.</p>
                  </SectionCard>

                  <SectionCard>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Exercício 2: Metáfora da Jornada</h3>
                    <ExerciseStep step="1️⃣" title="Imagine sua Vida como uma Jornada">
                      <p>Escolha uma imagem simbólica: um rio, uma estrada, o voo de um pássaro. Sinta o que ela representa — calma, liberdade, incerteza?</p>
                    </ExerciseStep>
                    <ExerciseStep step="2️⃣" title="Descreva os Desafios">
                      <p>Quais obstáculos surgiram nessa jornada? Como você os enfrentou ou está enfrentando?</p>
                    </ExerciseStep>
                  </SectionCard>

                  <Quote>Este exercício não termina no papel. É um processo contínuo de transformação. Cada vez que o medo se apresentar, lembre-se da sua carta de sabedoria e se conecte com a visão mais elevada que você já criou.</Quote>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* CTA final */}
          <div className="text-center mt-16 py-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm mb-4">
              <Flame className="h-4 w-4" />
              Continue sua jornada
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Pronto para <span className="text-primary italic">transformar</span> sua prática?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Explore as ferramentas P.A.D.H. e aprofunde-se na formação completa de Poesia Cognitiva Hipnótica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/ferramentas" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Explorar Ferramentas
              </a>
              <a href="/formacao" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary/20 text-foreground hover:bg-primary/5 transition-colors">
                Formação PCH
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CursoPCH;
