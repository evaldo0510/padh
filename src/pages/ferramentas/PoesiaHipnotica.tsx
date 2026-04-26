import React from 'react';
import { Sparkles, Brain, BookOpen, PenTool, MessageCircle, Waves, Eye, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { pagesSEO } from '@/lib/seo-config';
import ScientificValidation from '@/components/sections/ScientificValidation';

const PoesiaHipnotica = () => {
  const baseAnim = useScrollAnimation(0.15);
  const areasAnim = useScrollAnimation(0.15);
  const pchAnim = useScrollAnimation(0.15);
  const exercicioAnim = useScrollAnimation(0.15);
  const hipnoseAnim = useScrollAnimation(0.15);
  const poemasAnim = useScrollAnimation(0.15);
  const linguagemAnim = useScrollAnimation(0.15);
  const respostasAnim = useScrollAnimation(0.15);
  const exercicioFocoAnim = useScrollAnimation(0.15);
  const fluxoAnim = useScrollAnimation(0.15);
  const mareAnim = useScrollAnimation(0.15);
  const metaforasAnim = useScrollAnimation(0.15);
  const pacingAnim = useScrollAnimation(0.15);


  return (
    <PageLayout seo={pagesSEO.poesiaHipnotica} currentPage="Poesia Hipnótica">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Poesia Aplicada ao Desenvolvimento Humano
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Poesia <span className="text-primary italic">Hipnótica</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 font-medium">O Poder das Palavras</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A palavra tem um impacto profundo na psique humana, sendo a principal ferramenta da terapia.
              Quando usada com propósito e poesia, ela pode reestruturar pensamentos e emoções,
              proporcionando novas percepções e caminhos para a transformação interior.
            </p>
          </div>
        </div>
      </section>

      {/* Base Teórica */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={baseAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            baseAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Base Teórica</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                O Poder das Palavras na Transformação Psicológica
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                A palavra bem utilizada influencia emoções, crenças e até reconfigura padrões mentais.
                Seja na hipnoterapia, na PNL, na psicologia ou na meditação guiada, a forma como nos
                expressamos pode gerar profundas mudanças internas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas Terapêuticas */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={areasAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            areasAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium text-center">Conexões</p>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Áreas Terapêuticas Relacionadas
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🌀', titulo: 'Hipnose e PNL', desc: 'Utilizam sugestões verbais para reprogramar padrões inconscientes e estimular mudanças positivas.' },
                { icon: '🧠', titulo: 'Psicoterapia', desc: 'A palavra auxilia no autoconhecimento, na ressignificação e na cura emocional.' },
                { icon: '🧘‍♂️', titulo: 'Mindfulness e Meditação', desc: 'Afirmações e mantras promovem equilíbrio emocional e conexão interior.' },
                { icon: '📖', titulo: 'Terapia Narrativa', desc: 'Reescrever histórias pessoais transforma a forma de viver a própria trajetória.' },
                { icon: '✍️', titulo: 'Escrita Terapêutica', desc: 'Escrever pensamentos e emoções auxilia no processamento emocional e na redução do estresse.' },
              ].map((area, i) => (
                <Card key={i} className="border-border/50 bg-card/80">
                  <CardContent className="p-5">
                    <span className="text-2xl mb-2 block">{area.icon}</span>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{area.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="poem-block max-w-lg mx-auto mt-8">
              <p className="poem-text text-sm text-muted-foreground italic text-center">
                "Combinando a palavra com intenção e ritmo, criamos um espaço para o florescimento de novas possibilidades." 🌱
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PCH - Poesia Cognitiva Hipnótica */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={pchAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            pchAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                PCH
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Poesia Cognitiva <span className="text-primary italic">Hipnótica</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                A PCH é uma ferramenta poderosa para ressignificar crenças e estimular mudanças emocionais positivas.
                Com base na Terapia Cognitivo-Comportamental (TCC), combina linguagem sugestiva, metáforas e afirmações
                para reformular padrões mentais limitantes.
              </p>
            </div>

            <h3 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
              💡 Como aplicar a PCH para transformar crenças?
            </h3>

            <div className="space-y-5">
              <Card className="border-primary/20 bg-card/80">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-2">🔹 1. Identificação da Crença Limitante</h4>
                  <p className="text-muted-foreground text-sm italic">"Eu não sou capaz o suficiente."</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/80">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-2">🔹 2. Nova Narrativa Expansiva</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    "Assim como o sol nasce todos os dias sem esforço, minha força se renova a cada novo amanhecer.
                    Mesmo que nuvens o cubram por instantes, sua luz continua brilhando além delas. E, assim como o sol,
                    minha essência é constante, minha capacidade é real, e cada novo dia é uma oportunidade para brilhar ainda mais."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-card/80">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-3">🔹 3. Estruturação em Poema Hipnótico</h4>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80">
                      Por tanto tempo duvidei de mim,<br />
                      Como se o vento pudesse parar o mar.<br />
                      Mas agora percebo...<br />
                      Cada desafio que enfrento é uma onda...<br />
                      E eu aprendi a surfar.
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Esse método permite que a mente absorva novas possibilidades de forma natural e envolvente,
                    fortalecendo pensamentos positivos e reequilibrando emoções.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Exemplo Prático */}
            <div className="mt-10">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
                🧠 Exemplo Prático de Reestruturação
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <Card className="border-red-400/20 bg-red-500/5">
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-widest text-red-400 font-medium mb-2">Antes</p>
                    <p className="text-sm text-foreground/80 italic">
                      "Eu não sou bom o suficiente, sempre me comparo aos outros."
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-emerald-400/20 bg-emerald-500/5">
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-widest text-emerald-400 font-medium mb-2">Depois</p>
                    <p className="text-sm text-foreground/80 italic">
                      "Meu valor não depende da comparação, mas do meu próprio crescimento."
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-primary/20 bg-card/80">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-4">Poema Terapêutico — "O Caminho é Meu"</h4>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Por tanto tempo, olhei para o lado,<br />
                      buscando no outro o que já era meu.<br />
                      Mas agora percebo, com olhos despertos,<br />
                      que sempre fui eu… sempre fui eu.<br /><br />
                      Cada passo, um traço da minha história,<br />
                      sem pressa, sem medo de ser.<br />
                      Não há destino, não há comparações,<br />
                      apenas a jornada… apenas viver.<br /><br />
                      Sou rio que aprende o próprio curso,<br />
                      vento que dança sem se prender.<br />
                      Não preciso ser melhor que ninguém,<br />
                      apenas melhor do que fui ao nascer.<br /><br />
                      E assim caminho, leve e inteiro,<br />
                      sabendo que sou e sempre serei.<br />
                      Minha verdade, minha essência,<br />
                      meu próprio rumo, que hoje encontrei.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Exercício de PCH */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={exercicioAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            exercicioAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                <PenTool className="h-3.5 w-3.5" />
                Exercícios
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Exercícios de Poesia Cognitiva Hipnótica
              </h2>
              <p className="text-muted-foreground">Para Reestruturação de Crenças</p>
            </div>

            <Card className="border-primary/20 bg-card/80">
              <CardHeader>
                <CardTitle className="text-primary font-heading">
                  🔹 Exercício 1: Identificação e Ressignificação da Crença Limitante
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  🎯 Objetivo: Tornar consciente uma crença negativa e iniciar o processo de mudança.
                </p>
              </CardHeader>
              <CardContent className="space-y-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="passo1">
                    <AccordionTrigger className="text-foreground font-medium">
                      Passo 1: Identifique sua crença limitante
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Exemplos:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• "Eu não sou bom o suficiente."</li>
                        <li>• "As pessoas sempre me abandonam."</li>
                        <li>• "Nunca consigo o que quero."</li>
                      </ul>
                      <p className="text-sm text-muted-foreground font-medium mt-3">Perguntas para reflexão:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Essa crença veio de uma experiência?</li>
                        <li>• Você ouviu isso de alguém?</li>
                        <li>• Desde quando ela está presente?</li>
                      </ul>
                      <div className="poem-block mt-3">
                        <p className="poem-text text-sm text-foreground/70 italic">
                          Escreva: "Minha crença limitante é ________________.<br />
                          Ela surgiu quando _______________ e me faz acreditar que _______________."
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="passo2">
                    <AccordionTrigger className="text-foreground font-medium">
                      Passo 2: Impacto na sua vida
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm text-muted-foreground font-medium">Reflexões:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Como essa crença me faz sentir?</li>
                        <li>• O que ela me impede de fazer?</li>
                        <li>• Como afeta minha autoestima e relações?</li>
                      </ul>
                      <div className="poem-block mt-3">
                        <p className="poem-text text-sm text-foreground/70 italic">
                          Escreva: "Quando essa crença surge, eu sinto ______________ e acabo fazendo _______________.<br />
                          Isso me impede de _______________."
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="passo3">
                    <AccordionTrigger className="text-foreground font-medium">
                      Passo 3: Desafiando a crença
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-sm text-muted-foreground font-medium">Perguntas:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Já viveu algo que contradiz essa crença?</li>
                        <li>• Conhece alguém que superou isso?</li>
                        <li>• O que diria a um amigo que pensa assim?</li>
                      </ul>
                      <div className="poem-block mt-3">
                        <p className="poem-text text-sm text-foreground/70 italic">
                          Escreva: "Essa crença não é 100% verdadeira porque _______________."
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="passo4">
                    <AccordionTrigger className="text-foreground font-medium">
                      Passo 4: Transformação
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg border border-red-400/20 bg-red-500/5">
                          <p className="text-xs uppercase tracking-widest text-red-400 font-medium mb-1">Antes</p>
                          <p className="text-sm text-foreground/80 italic">"Eu nunca termino nada do que começo."</p>
                        </div>
                        <div className="p-3 rounded-lg border border-emerald-400/20 bg-emerald-500/5">
                          <p className="text-xs uppercase tracking-widest text-emerald-400 font-medium mb-1">Depois</p>
                          <p className="text-sm text-foreground/80 italic">"Cada passo que dou me aproxima da conclusão. Eu sou capaz."</p>
                        </div>
                      </div>
                      <div className="poem-block mt-3">
                        <p className="poem-text text-sm text-foreground/70 italic">
                          Escreva: "A partir de agora, escolho acreditar que _______________."
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="passo5">
                    <AccordionTrigger className="text-foreground font-medium">
                      Passo 5: Poema Terapêutico
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="poem-block">
                        <p className="poem-text text-sm text-foreground/80">
                          Eu pensava que o erro era o fim,<br />
                          Mas agora vejo que ele é caminho.<br />
                          A cada tropeço, um novo aprendizado,<br />
                          E sigo adiante, mais forte, inspirado.
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Crie o seu: Use metáforas, emoção e visualizações transformadoras.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="passo6">
                    <AccordionTrigger className="text-foreground font-medium">
                      Passo 6: Âncora de Reforço
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          Escreva a nova crença e o poema em um post-it.
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          Grave um áudio lendo com emoção e ouça todos os dias.
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          Crie um gesto ou objeto que simbolize sua nova crença.
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        Este exercício promove uma reprogramação emocional profunda, usando escrita terapêutica
                        e elementos da Poesia Cognitiva Hipnótica para transformar crenças limitantes em fortalezas internas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hipnose Conversacional */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={hipnoseAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            hipnoseAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                <MessageCircle className="h-3.5 w-3.5" />
                Hipnose Conversacional
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Hipnose Conversacional e <span className="text-primary italic">PCH</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                A hipnose conversacional é uma abordagem sutil e eficaz para acessar estados profundos da mente
                sem a necessidade de um transe formal. Ao usar padrões de linguagem sugestivos, metáforas e
                estrutura narrativa, é possível influenciar a percepção e facilitar mudanças positivas.
              </p>
              <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
                No contexto da Poesia Cognitiva Hipnótica (PCH), a hipnose conversacional é aplicada através de
                frases cuidadosamente construídas, estimulando associações mentais e emocionais que promovem
                novas formas de pensar e sentir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Poemas PCH */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={poemasAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            poemasAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium text-center">
              Poesia Cognitiva Hipnótica (PCH)
            </p>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Poemas Hipnóticos
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Durma Profundamente */}
              <Card className="border-indigo-400/20 bg-indigo-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-3">✨ Durma Profundamente</h4>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Talvez agora… bem de mansinho…<br />
                      o sono chegue… leve… sozinho…<br />
                      como brisa que dança no mar,<br />
                      te embala, te envolve… te faz flutuar.<br /><br />
                      A respiração… tão calma e serena,<br />
                      desliza no tempo… macia… amena…<br />
                      como nuvens que tocam o céu,<br />
                      suaves, douradas… num sonho fiel.<br /><br />
                      E à medida que os olhos se fecham,<br />
                      a mente repousa… os medos se afastam…<br />
                      um véu de estrelas começa a brilhar,<br />
                      trazendo a paz… para te aconchegar.<br /><br />
                      Então… deixe-se ir… sem pressa, sem medo…<br />
                      na onda do sono… num doce segredo…<br />
                      pois agora… profundamente… enfim,<br />
                      o descanso te abraça… e mora em ti.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Pare de se Preocupar */}
              <Card className="border-sky-400/20 bg-sky-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-3">✨ Pare de se Preocupar</h4>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Enquanto você lê… devagar… sem pressa,<br />
                      um alívio suave… dentro de ti começa.<br />
                      As nuvens se afastam… o peso se vai,<br />
                      e tudo se torna um pouco mais leve… mais paz.<br /><br />
                      As preocupações… soltas ao vento,<br />
                      se desmancham no tempo… como um momento.<br />
                      Nada precisa ser tão urgente,<br />
                      pois a vida flui… calma… presente.<br /><br />
                      Então respire… sinta… perceba,<br />
                      que a leveza já se enreda<br />
                      nos cantos da alma… como brisa no ar,<br />
                      trazendo descanso… pra te acalmar.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Sinta-se Confiante */}
              <Card className="border-amber-400/20 bg-amber-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-3">✨ Sinta-se Confiante Agora</h4>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Pode ser interessante… apenas notar,<br />
                      como algo em ti… começa a mudar.<br />
                      Sem esforço… sem pressa… sem medo,<br />
                      um brilho desperta… num doce segredo.<br /><br />
                      É como uma chama… que dança e aquece,<br />
                      crescendo… radiante… intensa e leve.<br />
                      Segurança que vem… de dentro pra fora,<br />
                      te envolve… te ergue… e brilha agora.<br /><br />
                      E à medida que sente… essa força surgir,<br />
                      percebe que sempre… esteve aí.<br />
                      Confiante… presente… inteiro… capaz,<br />
                      caminha seguro… sem olhar para trás.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Esqueça os Problemas */}
              <Card className="border-teal-400/20 bg-teal-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-3">✨ Esqueça os Problemas por um Momento</h4>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Talvez… só por um instante,<br />
                      tudo fique leve… flutuante…<br />
                      e os problemas… tão insistentes,<br />
                      se tornem nuvens… indiferentes.<br /><br />
                      Lá no alto… eles seguem sem rumo,<br />
                      desmancham-se… num sopro, num sumo.<br />
                      Enquanto aqui… no agora… em ti,<br />
                      só há espaço… para se sentir.<br /><br />
                      Leve… tranquilo… presente no ar,<br />
                      como a brisa… a te embalar.<br />
                      E nesse momento… sem nada pesar,<br />
                      a paz te encontra… sem precisar buscar.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Visualize um Futuro Positivo */}
              <Card className="border-violet-400/20 bg-violet-500/5 md:col-span-2">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-3">✨ Visualize um Futuro Positivo</h4>
                  <div className="poem-block max-w-lg mx-auto">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      À medida que a mente… flui devagar,<br />
                      um novo horizonte… começa a brilhar.<br />
                      Cores suaves… formas nascendo,<br />
                      um futuro bonito… já se estendendo.<br /><br />
                      Talvez você veja… talvez só sinta,<br />
                      mas algo desperta… cresce… infinita.<br />
                      Como um sonho… pronto a florescer,<br />
                      cheio de luz… pronto a acontecer.<br /><br />
                      Passo a passo… semeando esperança,<br />
                      o amanhã se ergue… dança… avança.<br />
                      E, nesse instante… pode perceber,<br />
                      o melhor do futuro… já vive em você.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-6 italic">
              A hipnose conversacional na PCH permite que a mente aceite mudanças de forma natural,
              criando novas conexões emocionais e cognitivas.
            </p>
          </div>
        </div>
      </section>

      {/* Linguagem Indireta e Sugestões Implícitas */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={linguagemAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            linguagemAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                <Waves className="h-3.5 w-3.5" />
                Linguagem Indireta
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Linguagem Indireta e <span className="text-primary italic">Sugestões Implícitas</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Poemas construídos com padrões de linguagem indireta que ativam o inconsciente 
                através de sugestões implícitas, ritmo e metáforas sensoriais.
              </p>
            </div>

            <div className="space-y-6">
              {/* 1 - Durma */}
              <Card className="border-indigo-400/20 bg-indigo-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-1">1️⃣ "Durma profundamente."</h4>
                  <div className="poem-block mt-3">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Talvez agora… sem perceber,<br />
                      o corpo relaxe… sem nada querer.<br />
                      Um suspiro leve… um ritmo sereno,<br />
                      o sono chegando… macio… supremo.<br /><br />
                      Sem esforço… sem pressa… sem medo,<br />
                      apenas se entregue… ao doce enredo.<br />
                      Como a noite abraça o mar,<br />
                      o descanso vem… pra te embalar.<br /><br />
                      Os pensamentos… vão se afastando,<br />
                      como folhas ao vento… flutuando…<br />
                      e, num instante… sem notar,<br />
                      você já dorme… a sonhar.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 2 - Preocupar */}
              <Card className="border-sky-400/20 bg-sky-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-1">2️⃣ "Pare de se preocupar."</h4>
                  <div className="poem-block mt-3">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Pode ser interessante… apenas notar,<br />
                      como a mente aprende… a se acalmar.<br />
                      Pouco a pouco… sem precisar correr,<br />
                      as preocupações… começam a ceder.<br /><br />
                      Como folhas soltas… que o vento carrega,<br />
                      os medos se vão… sem deixar entrega.<br />
                      Apenas o agora… tranquilo… presente,<br />
                      envolve seu ser… suavemente.<br /><br />
                      Respire… sinta… deixe fluir,<br />
                      a paz já existe… dentro de ti.<br />
                      E, enquanto tudo se aquieta no ar,<br />
                      a calma te abraça… sem precisar chamar.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 3 - Confiante */}
              <Card className="border-amber-400/20 bg-amber-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-1">3️⃣ "Sinta-se confiante agora."</h4>
                  <div className="poem-block mt-3">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      E à medida que o ar… entra e sai,<br />
                      algo em você… cresce e se refaz.<br />
                      Uma força serena… que se expande,<br />
                      como fogo que aquece… e nunca se apaga.<br /><br />
                      Talvez já sinta… talvez apenas note,<br />
                      mas a confiança… brilha… e sobe.<br />
                      Segura… firme… presente em ti,<br />
                      como um sol que nasce… e não tem fim.<br /><br />
                      A cada instante… ela se fortalece,<br />
                      a dúvida some… a certeza aparece.<br />
                      E agora… com passos seguros no chão,<br />
                      você avança… guiado pelo coração.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 4 - Problemas */}
              <Card className="border-teal-400/20 bg-teal-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-1">4️⃣ "Esqueça os problemas por um momento."</h4>
                  <div className="poem-block mt-3">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      É curioso… como sem esforço algum,<br />
                      a mente flutua… suave… comum.<br />
                      Como nuvens que seguem… sem rumo, sem pressa,<br />
                      deixando o céu… mais claro… sem pressa.<br /><br />
                      Os problemas… tão distantes agora,<br />
                      perdem o peso… se vão… lá fora.<br />
                      E nesse instante… só o presente existe,<br />
                      leve… tranquilo… tão simples… tão livre.<br /><br />
                      Respire… sinta… deixe passar,<br />
                      como ondas no mar… sem precisar segurar.<br />
                      Pois a paz já habita… bem dentro de ti,<br />
                      e sempre que quiser… pode voltar aqui.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 5 - Futuro */}
              <Card className="border-violet-400/20 bg-violet-500/5">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-primary mb-1">5️⃣ "Visualize um futuro positivo."</h4>
                  <div className="poem-block mt-3">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      E, enquanto sua mente se abre para sonhar,<br />
                      você percebe… um futuro a se desenhar.<br />
                      Inspiração flui… como uma luz crescente,<br />
                      tornando o amanhã… mais claro… mais presente.<br /><br />
                      As possibilidades surgem… tão vivas, tão reais,<br />
                      como um quadro pintado… em cores especiais.<br />
                      Cada passo seu… é mais firme, mais certo,<br />
                      e o futuro se forma… de um jeito mais perto.<br /><br />
                      Com confiança, você vê… tudo acontecer,<br />
                      um caminho brilhante… para seguir e crescer.<br />
                      E à medida que a imagem ganha vida em ti,<br />
                      o futuro inspirador já mora aqui.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Exemplos de Respostas */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={respostasAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            respostasAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                <Eye className="h-3.5 w-3.5" />
                Exemplos
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                💡 Exemplos de Respostas
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Variações poéticas das mesmas sugestões, demonstrando a flexibilidade da linguagem indireta.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              <AccordionItem value="resp1" className="border border-border/50 rounded-xl px-4 bg-card/50">
                <AccordionTrigger className="text-foreground font-heading font-medium">
                  1️⃣ Durma profundamente — Variação
                </AccordionTrigger>
                <AccordionContent>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Pode ser interessante perceber como, pouco a pouco,<br />
                      seus olhos ficam mais pesados…<br />
                      e o sono chega naturalmente,<br />
                      como uma brisa suave… sem pressa, sem rastro.<br /><br />
                      A cada respiração… mais leve… mais tranquilo,<br />
                      o corpo se solta… num ritmo sereno e divino.<br />
                      E o mundo ao redor… vai se tornando distante,<br />
                      enquanto você se entrega… ao descanso constante.<br /><br />
                      Com cada batida do coração… mais profundo,<br />
                      o sono vem… levando você ao fundo.<br />
                      E no silêncio suave… tudo se acalma,<br />
                      você está em paz… no abraço da alma.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="resp2" className="border border-border/50 rounded-xl px-4 bg-card/50">
                <AccordionTrigger className="text-foreground font-heading font-medium">
                  2️⃣ Pare de se preocupar — Variação
                </AccordionTrigger>
                <AccordionContent>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      Talvez você note que algumas preocupações<br />
                      já começam a se dissolver,<br />
                      quase sem esforço… como névoa ao amanhecer,<br />
                      desaparecendo, deixando espaço para a paz.<br /><br />
                      O peso se esvai… e tudo fica mais leve,<br />
                      como se o vento levasse embora o que não serve.<br />
                      Cada pensamento que se solta… mais tranquilo,<br />
                      deixa um vazio preenchido por um sereno brilho.<br /><br />
                      E, à medida que tudo se afasta,<br />
                      você percebe como a paz se instala…<br />
                      suave, silenciosa, preenchendo o espaço,<br />
                      até que a mente se acalme, sem nenhum embaraço.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="resp3" className="border border-border/50 rounded-xl px-4 bg-card/50">
                <AccordionTrigger className="text-foreground font-heading font-medium">
                  3️⃣ Sinta-se confiante agora — Variação
                </AccordionTrigger>
                <AccordionContent>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      À medida que respira fundo,<br />
                      pode sentir uma confiança crescendo suavemente<br />
                      dentro de você…<br />
                      como uma chama que se acende, forte e constante.<br /><br />
                      A cada inspiração… ela cresce,<br />
                      se espalha pelo corpo… e se fortalece.<br />
                      E, no exalar… você sente mais firme,<br />
                      como raízes profundas… que jamais se calam.<br /><br />
                      Essa confiança… iluminando o caminho,<br />
                      como farol na neblina… suave, mas certeiro.<br />
                      Dentro de você… ela é imensa e segura,<br />
                      pronta para guiar… cada passo com ternura.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="resp4" className="border border-border/50 rounded-xl px-4 bg-card/50">
                <AccordionTrigger className="text-foreground font-heading font-medium">
                  4️⃣ Esqueça os problemas — Variação
                </AccordionTrigger>
                <AccordionContent>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      De alguma forma, sua mente já está encontrando<br />
                      um espaço de tranquilidade…<br />
                      onde os problemas parecem menores,<br />
                      como sombras que se afastam com a luz do dia.<br /><br />
                      A calma se espalha… serena e vasta,<br />
                      e o peso dos pensamentos… aos poucos, se esvai.<br />
                      No silêncio interno… tudo se organiza,<br />
                      e o que antes parecia pesado… agora se suaviza.<br /><br />
                      A luz que cresce… dissipa o que incomoda,<br />
                      trazendo clareza, levando a escuridão.<br />
                      E nesse espaço de paz… você encontra o equilíbrio,<br />
                      onde os problemas não têm mais poder… apenas espaço para a solução.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="resp5" className="border border-border/50 rounded-xl px-4 bg-card/50">
                <AccordionTrigger className="text-foreground font-heading font-medium">
                  5️⃣ Visualize um futuro positivo — Variação
                </AccordionTrigger>
                <AccordionContent>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                      E, conforme se permite imaginar possibilidades,<br />
                      talvez um cenário positivo já esteja se formando em sua mente…<br />
                      pleno de esperança… claro e inspirador,<br />
                      como uma jornada nova… pronta para ser vivida.<br /><br />
                      A cada visão, o caminho se abre,<br />
                      cheio de luz, de oportunidades e de calma.<br />
                      Cada passo dado na mente… é um passo no futuro,<br />
                      um futuro brilhante, cheio de aventura e de cura.<br /><br />
                      E ao ver esse cenário, tão pleno e vasto,<br />
                      você se sente renovado… com o coração mais alto.<br />
                      Como um novo começo, que se revela com suavidade,<br />
                      pronto para ser vivido, com confiança e liberdade.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Exercícios de Foco, Criatividade, Confiança e Superação */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={exercicioFocoAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            exercicioFocoAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                <Brain className="h-3.5 w-3.5" />
                Exercícios Práticos
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Exercícios de <span className="text-primary italic">Indução Poética</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estruturas de 3 etapas — do estado atual ao estado desejado — seguidas de poemas completos de indução.
              </p>
            </div>

            <div className="space-y-8">
              {/* Foco e Criatividade */}
              <Card className="border-emerald-400/20 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">🎯 Exercício de Foco e Criatividade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Enquanto você lê, pode estar absorvendo as palavras que surgem à sua frente, 
                        percebendo cada detalhe das frases que se formam."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Sua mente pode estar fluindo junto com as ideias, talvez um pequeno pensamento 
                        passando por sua mente aqui e ali, enquanto você segue no seu próprio ritmo."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Foco e Criatividade</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E, enquanto segue explorando essas palavras, talvez note como sua mente começa a se expandir, 
                        trazendo novas ideias, novas conexões, como se sua criatividade estivesse florescendo, 
                        de forma simples e natural."
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-heading font-semibold text-foreground mb-3">Poesia do Foco e Criatividade</h4>
                    <div className="poem-block">
                      <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                        Enquanto você lê,<br />
                        Percebe cada palavra que se desenha à sua frente,<br />
                        Absorvendo, com calma, os detalhes que formam o sentido,<br />
                        Como se cada frase fosse uma porta a ser aberta.<br /><br />
                        Sua mente flui suavemente,<br />
                        Pensamentos surgem e passam,<br />
                        Como nuvens que se movem no céu,<br />
                        E, sem pressa, você segue o ritmo do seu próprio tempo.<br /><br />
                        E, à medida que explora essas palavras,<br />
                        Talvez sinta sua mente se expandir,<br />
                        Novas ideias começando a se formar,<br />
                        Novas conexões se entrelaçando,<br />
                        Como florescendo naturalmente,<br />
                        A criatividade se abre como uma flor ao sol,<br />
                        De forma simples e fluida, sem esforço.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Confiança e Superação */}
              <Card className="border-amber-400/20 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">💪 Exercício de Confiança e Superação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Você já percorreu um longo caminho, superando momentos que exigiram força, 
                        superando desafios que pareciam intransponíveis."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Cada passo que você deu te trouxe até aqui, e talvez, ao olhar para trás, 
                        você perceba o quanto se fortaleceu com cada experiência que viveu."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Confiança</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E, ao olhar para o que está à frente, talvez sinta uma sensação crescente de confiança, 
                        sabendo que, com cada novo desafio, você tem as ferramentas e a força para superá-lo, 
                        com mais sabedoria e preparação do que nunca."
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-heading font-semibold text-foreground mb-3">Poesia da Confiança e Superação</h4>
                    <div className="poem-block">
                      <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                        Você já percorreu um longo caminho,<br />
                        Superando os momentos que exigiram toda a sua força,<br />
                        Superando desafios que, a princípio, pareciam intransponíveis,<br />
                        E, mesmo quando o peso parecia demais, você seguiu em frente.<br /><br />
                        Cada passo que você deu te trouxe até aqui,<br />
                        E, ao olhar para trás, talvez perceba a quantidade de forças que despertaram em você,<br />
                        Como se cada experiência fosse uma escada,<br />
                        Te levando a um novo patamar, mais forte, mais preparado.<br /><br />
                        Agora, ao olhar para o futuro,<br />
                        Talvez sinta uma confiança crescente dentro de si,<br />
                        Sabendo que, com cada novo desafio,<br />
                        Você tem todas as ferramentas e toda a força para superá-lo,<br />
                        Com mais sabedoria, mais leveza, mais coragem,<br />
                        Mais preparado do que jamais imaginou ser.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Relaxamento e Paz Interior */}
              <Card className="border-indigo-400/20 bg-indigo-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">🧘 Exercício de Relaxamento e Paz Interior</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Neste momento, enquanto você lê estas palavras, pode notar que seu corpo ainda carrega 
                        tensões do dia, talvez nos ombros, no peito ou na mente — pequenas marcas do ritmo acelerado."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E, conforme os olhos percorrem cada linha, talvez perceba que a respiração já começa 
                        a desacelerar, como se o corpo soubesse, por instinto, que este é um momento de pausa."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Relaxamento e Paz</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E, sem precisar fazer nada, talvez note como uma onda suave de tranquilidade começa 
                        a se espalhar pelo corpo, dissolvendo tensões, trazendo uma paz profunda que já existia 
                        dentro de você, apenas esperando ser redescoberta."
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-heading font-semibold text-foreground mb-3">Poesia do Relaxamento e Paz Interior</h4>
                    <div className="poem-block">
                      <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                        Enquanto você lê… devagar… sem pressa,<br />
                        algo dentro de ti… suavemente começa.<br />
                        Uma onda macia… que desce e aquece,<br />
                        dissolvendo o que pesa… tudo que endurece.<br /><br />
                        Os ombros se soltam… a mandíbula relaxa,<br />
                        o peito se abre… como flor que se encaixa.<br />
                        Cada respiração… mais lenta… mais plena,<br />
                        como o mar que retorna… à areia serena.<br /><br />
                        E nesse silêncio… tão suave… tão seu,<br />
                        a paz se revela… no espaço que nasceu.<br />
                        Não há nada a fazer… nada a resolver,<br />
                        apenas estar… apenas ser… e florescer.<br /><br />
                        E talvez perceba… com olhos fechados ou não,<br />
                        que a tranquilidade sempre morou no coração.<br />
                        Esperando… paciente… como estrela no céu,<br />
                        pronta a brilhar… no instante que é seu.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Autoestima e Amor-Próprio */}
              <Card className="border-rose-400/20 bg-rose-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">❤️ Exercício de Autoestima e Amor-Próprio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Quantas vezes você já olhou para si mesmo e viu apenas o que faltava? 
                        Quantas vezes a voz interior repetiu que você não era suficiente?"
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Mas talvez, ao refletir com mais calma, você perceba que há uma história mais ampla — 
                        feita de pequenas vitórias, de momentos de coragem silenciosa, de vezes em que você 
                        seguiu em frente mesmo sem aplausos."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Autoestima</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E, enquanto essas memórias emergem, talvez sinta um calor gentil se espalhando pelo peito — 
                        um reconhecimento profundo de que você é digno de amor, começando pelo seu próprio, 
                        como uma semente que finalmente encontra a luz."
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-heading font-semibold text-foreground mb-3">Poesia da Autoestima e Amor-Próprio</h4>
                    <div className="poem-block">
                      <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                        Por tempo demais… você buscou lá fora,<br />
                        o que sempre morou… bem dentro, agora.<br />
                        Uma luz que brilha… mesmo escondida,<br />
                        esperando ser vista… sendo sua vida.<br /><br />
                        Cada cicatriz… conta uma história,<br />
                        de quem não desistiu… mesmo sem glória.<br />
                        Cada passo dado… mesmo vacilante,<br />
                        foi prova de força… firme e constante.<br /><br />
                        Então olhe-se agora… com olhos de ternura,<br />
                        como quem abraça… a própria criatura.<br />
                        Você não precisa ser perfeito para merecer,<br />
                        basta ser quem é… basta existir… basta ser.<br /><br />
                        E nesse abraço interno… suave e profundo,<br />
                        nasce o amor-próprio… que transforma o mundo.<br />
                        Não o amor que grita… mas o que sussurra,<br />
                        "Você é suficiente"… e a alma murmura.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gratidão e Presença */}
              <Card className="border-teal-400/20 bg-teal-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">🙏 Exercício de Gratidão e Presença</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "No ritmo acelerado dos dias, é fácil esquecer o que já se tem. 
                        A mente corre para o próximo problema, para a próxima tarefa, 
                        e o presente se torna apenas passagem."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Mas neste instante, algo curioso acontece: ao parar para ler estas palavras, 
                        você já está praticando presença. Já está aqui, inteiro, 
                        mesmo que não tenha percebido."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Gratidão e Presença</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E, ao perceber que está presente, talvez sinta uma gratidão silenciosa nascer — 
                        pela respiração que acontece sem esforço, pelo corpo que sustenta, 
                        pela vida que insiste em florescer, mesmo nos dias mais cinzentos."
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-heading font-semibold text-foreground mb-3">Poesia da Gratidão e Presença</h4>
                    <div className="poem-block">
                      <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                        Pare… apenas um instante… e perceba,<br />
                        o milagre silencioso… que nunca se encerra.<br />
                        O ar que entra… sem que você peça,<br />
                        o coração que bate… mesmo quando a mente tropeça.<br /><br />
                        Há tanto a agradecer… que passa despercebido,<br />
                        como o chão que sustenta… cada passo vivido.<br />
                        A luz que nasce… mesmo após a tempestade,<br />
                        a mão que ampara… na escuridão da saudade.<br /><br />
                        E aqui… agora… neste exato momento,<br />
                        você é presença… é vida… é alento.<br />
                        Não ontem… não amanhã… mas agora, aqui,<br />
                        inteiro… presente… como nunca se sentiu.<br /><br />
                        Então respire fundo… e deixe a gratidão chegar,<br />
                        não como obrigação… mas como o mar a abraçar a areia.<br />
                        Suave… constante… sem precisar explicar,<br />
                        apenas sentir… que a vida é boa… e é inteira.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Uso de Metáforas */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={metaforasAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            metaforasAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                <BookOpen className="h-3.5 w-3.5" />
                Metáforas
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                2️⃣ Uso de Metáforas — <span className="text-primary italic">Criando Imagens Mentais Poderosas</span>
              </h2>
            </div>

            <Card className="border-primary/20 bg-card/80">
              <CardHeader>
                <CardTitle className="font-heading text-primary">📜 Exercício de Metáforas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Escolha um desafio pessoal</p>
                    <p className="text-sm text-foreground/80">
                      Algo que você enfrenta no momento, como medo de mudanças, falta de confiança, 
                      ou dificuldades em seguir em frente.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Crie uma metáfora para esse desafio</p>
                    <p className="text-sm text-foreground/80">
                      Pense em um elemento da natureza, um objeto ou uma situação que simbolize o que você sente.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Transforme em história de crescimento</p>
                    <p className="text-sm text-foreground/80">
                      Mostre como esse elemento supera obstáculos e encontra um caminho para se fortalecer.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-heading font-semibold text-foreground mb-2">💡 Exemplo — Desafio: Falta de confiança</h4>
                  <div className="poem-block mb-4">
                    <p className="poem-text text-sm text-primary italic">
                      "A pequena semente teme crescer, mas quando se abre à luz, ela se transforma em uma árvore forte."
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="historia-crescimento" className="border border-border/50 rounded-xl px-4 bg-card/50">
                      <AccordionTrigger className="text-foreground font-heading font-medium">
                        📖 História de Crescimento Aprofundada
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
                          <p>
                            No início, a semente repousava em silêncio na terra, sentindo-se segura na escuridão. 
                            A segurança da terra fria e úmida a fazia questionar: <em>Será que sou capaz de crescer 
                            além disso?</em> O medo de não ser forte o suficiente para enfrentar a vastidão do mundo 
                            a paralisava. Ela não sabia o que a luz do sol poderia trazer, mas sentia a pressão do 
                            crescimento como algo inevitável.
                          </p>
                          <p>
                            Um dia, a terra começou a ceder levemente, e uma pequena fissura apareceu na casca da semente. 
                            A luz do sol, suave e constante, tocou a parte mais sensível dela. Um tremor de receio a percorreu. 
                            <em>E se eu me quebrar?</em> pensou a semente. Mas, sem escolha, ela se abriu, expondo-se à 
                            imensidão do desconhecido.
                          </p>
                          <p>
                            A princípio, o medo a acompanhou. Cada pequena mudança era uma luta. A semente percebeu que, 
                            à medida que se desafiava a sair mais, um novo tipo de força começava a emergir. Suas raízes, 
                            que antes estavam aprisionadas no chão, começaram a se esticar, explorando o espaço, em busca 
                            de mais nutrientes, mais energia. Elas perceberam que a escuridão que as envolvia não era algo 
                            a temer, mas algo a ser superado. Quanto mais profundas suas raízes ficavam, mais sua confiança 
                            aumentava.
                          </p>
                          <p>
                            O tronco, inicialmente frágil, começou a se fortalecer. A cada ventania que o fazia balançar, 
                            ele aprendeu a se curvar sem quebrar, a ser flexível diante dos desafios. O medo ainda estava 
                            lá, mas agora ele não era mais o inimigo, mas algo que fazia parte do processo de crescimento. 
                            À medida que os galhos se estendiam, eles se desafiavam a alcançar o céu, a crescer ainda mais, 
                            a se expandir para além do que era confortável.
                          </p>
                          <p>
                            E, com o tempo, o que antes parecia um simples broto tornou-se uma árvore imponente. Suas folhas 
                            agora ofereciam sombra, e suas raízes, que haviam superado o medo e o desconhecido, se estendiam 
                            em busca de ainda mais conexão com a terra. A árvore, agora forte e confiante, sabia que todo o 
                            processo de superação havia sido fundamental para alcançar sua grandeza. Ela aprendeu que a 
                            confiança não estava em ser imune ao medo, mas em saber que, ao enfrentá-lo, poderia crescer 
                            ainda mais.
                          </p>
                        </div>
                        <div className="poem-block mt-4">
                          <p className="poem-text text-sm text-primary/80 italic">
                            Reflexão: Assim como a árvore, você pode se permitir crescer, sabendo que cada passo, 
                            por menor que pareça, é uma vitória. Não há necessidade de se preocupar com o tamanho 
                            do seu medo, mas de se concentrar no fato de que, ao enfrentá-lo, você encontrará a 
                            força para alcançar novos horizontes.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pacing e Leading */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={pacingAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            pacingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                <MessageCircle className="h-3.5 w-3.5" />
                Pacing &amp; Leading
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                3️⃣ Pacing e Leading — <span className="text-primary italic">Validando e Conduzindo</span>
              </h2>
            </div>

            <div className="space-y-8">
              {/* Exercício de Relaxamento */}
              <Card className="border-indigo-400/20 bg-indigo-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">🧘 Exercício de Relaxamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Você está sentado ou deitado agora, talvez em um lugar confortável, com seus pés apoiados 
                        no chão e sua respiração fluindo naturalmente."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Enquanto você respira, talvez perceba o movimento suave de sua barriga subindo e descendo, 
                        sentindo o peso do seu corpo se entregando ao apoio que o sustenta."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Relaxamento</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E talvez, à medida que sua respiração se aprofunda, você comece a perceber uma sensação 
                        de leveza, se espalhando por seu corpo, relaxando os músculos, suavemente, a cada expiração... 
                        de modo tranquilo e confortável."
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-heading font-semibold text-foreground mb-3">Poesia do Relaxamento</h4>
                    <div className="poem-block">
                      <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                        Agora, sente o apoio sob seus pés,<br />
                        O toque suave do ambiente ao redor,<br />
                        A respiração que flui, calmamente,<br />
                        Sem pressa, como um suave sopro de vento.<br /><br />
                        Cada inspiração, uma onda serena,<br />
                        Cada expiração, um alívio que chega,<br />
                        E, enquanto o corpo se entrega ao descanso,<br />
                        As tensões se dissolvem, suavemente,<br />
                        Como a areia sendo levada pelo mar.<br /><br />
                        Os músculos relaxam, um por um,<br />
                        Como se o tempo desacelerasse,<br />
                        E em cada parte de você, uma paz sutil,<br />
                        Como um rio tranquilo, fluindo sem fim.<br /><br />
                        Permita-se ser envolvido por essa calma,<br />
                        Onde o peso do mundo já não existe,<br />
                        E no seu coração, um suspiro de alívio,<br />
                        Como se cada respiração fosse a chave<br />
                        Para um estado profundo de serenidade.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exercício de Foco e Criatividade */}
              <Card className="border-emerald-400/20 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">✨ Exercício de Foco e Criatividade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Enquanto você lê estas palavras, sua mente vai naturalmente processando as ideias 
                        que estão sendo apresentadas."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Cada frase se encaixa em seu ritmo de leitura, talvez sua atenção se focando agora 
                        em uma ideia ou em uma sensação de curiosidade que surge."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Foco e Criatividade</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E, enquanto você segue, talvez perceba como novas ideias começam a se formar de maneira clara, 
                        inspirando uma sensação de fluidez e criatividade em seu pensamento."
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-heading font-semibold text-foreground mb-3">Poesia do Foco e Criatividade</h4>
                    <div className="poem-block">
                      <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                        Enquanto você lê estas palavras,<br />
                        Sua mente começa a absorver, de maneira natural,<br />
                        Cada ideia que se apresenta,<br />
                        Fazendo-se parte de um todo que começa a se formar.<br /><br />
                        Cada frase flui suavemente,<br />
                        Como um rio que segue seu curso sem pressa,<br />
                        E talvez, no ritmo dessa leitura,<br />
                        Uma sensação de curiosidade desperte,<br />
                        Guiando sua atenção para novos horizontes.<br /><br />
                        E à medida que você avança,<br />
                        Novas ideias começam a surgir,<br />
                        Como sementes que germinam em um solo fértil,<br />
                        E, com cada pensamento, sua mente se expande,<br />
                        Inspirando uma nova onda de criatividade,<br />
                        Fluindo com facilidade, como se nunca tivesse parado.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exercício de Confiança */}
              <Card className="border-amber-400/20 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">💪 Exercício de Confiança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Você já enfrentou muitos momentos desafiadores ao longo da vida, superando situações 
                        que pediram de você coragem e determinação."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Esses desafios, cada um de sua maneira, ajudaram a moldar a pessoa forte que você é hoje. 
                        E, ao olhar para trás, talvez perceba o quanto você cresceu e aprendeu com cada um desses momentos."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Confiança</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E agora, ao olhar para o futuro, talvez comece a sentir uma confiança tranquila, sabendo que, 
                        com cada passo que você der, está cada vez mais preparado para seguir em frente, sempre mais forte 
                        e mais confiante."
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-heading font-semibold text-foreground mb-3">Poesia da Confiança</h4>
                    <div className="poem-block">
                      <p className="poem-text text-sm text-foreground/80 leading-relaxed">
                        Você já enfrentou muitos desafios,<br />
                        Momentos que pediram coragem e força,<br />
                        E, cada vez que a vida testou sua resistência,<br />
                        Você se levantou, com mais determinação.<br /><br />
                        Esses momentos, com suas dificuldades,<br />
                        Moldaram a pessoa forte que você é hoje,<br />
                        Cada experiência, cada luta,<br />
                        Fez você crescer, aprender e se reinventar.<br /><br />
                        Agora, ao olhar para o futuro,<br />
                        Talvez uma sensação de confiança comece a crescer,<br />
                        Tranquila e silenciosa, dentro de você,<br />
                        Sabendo que, com cada passo, você se torna mais forte,<br />
                        Mais preparado para o que está por vir.<br /><br />
                        O caminho à frente se abre,<br />
                        E você segue, não com medo, mas com fé,<br />
                        Com a certeza de que, a cada passo dado,<br />
                        Está cada vez mais próximo de alcançar a sua essência.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exercício de Relaxamento 2 */}
              <Card className="border-sky-400/20 bg-sky-500/5">
                <CardHeader>
                  <CardTitle className="font-heading text-primary">🌊 Exercício de Relaxamento Profundo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">1️⃣ Estado Atual Comum</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Agora, você pode estar sentado confortavelmente, com os pés firmemente apoiados no chão, 
                        talvez sentindo o toque do ambiente ao seu redor."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">2️⃣ Descrição Neutra</p>
                      <p className="text-sm text-foreground/80 italic">
                        "Enquanto respira naturalmente, você pode notar a sensação da sua respiração fluindo, 
                        o ritmo suave que vai e vem, calmamente, sem pressa."
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">3️⃣ Estado Desejado — Relaxamento</p>
                      <p className="text-sm text-foreground/80 italic">
                        "E, à medida que você continua respirando, talvez sinta como, a cada expiração, seu corpo vai 
                        ficando mais relaxado, mais solto, como se cada parte de você estivesse se entregando ao conforto 
                        e à paz que o envolve."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* No Fluxo do Agora */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={fluxoAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            fluxoAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Experiência Imersiva
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              No Fluxo do Agora
            </h2>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <div className="poem-block">
                  <p className="poem-text text-foreground/80 leading-loose">
                    E enquanto lê estas palavras...<br />
                    talvez perceba como cada som, cada pausa...<br />
                    vai criando um espaço dentro de você...<br /><br />
                    Um espaço onde o tempo desacelera...<br />
                    e tudo que parecia distante se torna acessível...<br />
                    como um rio que flui suavemente para o mar...<br /><br />
                    E pode ser interessante notar...<br />
                    como sua respiração se torna mais leve...<br />
                    e seu corpo encontra um jeito natural de relaxar...<br /><br />
                    Porque a mudança acontece...<br />
                    não quando se força...<br />
                    mas quando se permite fluir...<br /><br />
                    E quem sabe...<br />
                    agora, ou em breve...<br />
                    você já esteja sentindo essa transformação...<br />
                    crescendo silenciosamente dentro de você...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Maré da Transformação */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={mareAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            mareAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Waves className="h-3.5 w-3.5" />
              Encerramento
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              🌊 Maré da Transformação 🌊
            </h2>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8">
                <div className="poem-block">
                  <p className="poem-text text-foreground/80 leading-relaxed">
                    E se agora… enquanto lê essas palavras…<br />
                    algo dentro de você começasse a mudar?<br />
                    Como a brisa que dança sobre o oceano,<br />
                    suave… mas sempre em movimento.<br /><br />
                    Talvez você perceba… ou talvez apenas sinta…<br />
                    que cada respiro traz uma nova possibilidade.<br />
                    E, sem precisar forçar, sem precisar entender…<br />
                    seu coração já sabe o caminho.<br /><br />
                    Assim como a maré… que leva o que já não serve,<br />
                    e traz o novo… no tempo certo.<br />
                    Agora… talvez sem pressa…<br />
                    você possa apenas permitir… e fluir.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ScientificValidation tool="poesia-hipnotica" />
    </PageLayout>
  );
};

export default PoesiaHipnotica;
