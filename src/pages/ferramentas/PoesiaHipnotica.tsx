import React from 'react';
import { Sparkles, Brain, BookOpen, PenTool, MessageCircle, Waves, Eye, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { pagesSEO } from '@/lib/seo-config';

const PoesiaHipnotica = () => {
  const baseAnim = useScrollAnimation(0.15);
  const areasAnim = useScrollAnimation(0.15);
  const pchAnim = useScrollAnimation(0.15);
  const exercicioAnim = useScrollAnimation(0.15);
  const hipnoseAnim = useScrollAnimation(0.15);
  const poemasAnim = useScrollAnimation(0.15);
  const linguagemAnim = useScrollAnimation(0.15);
  const respostasAnim = useScrollAnimation(0.15);
  const fluxoAnim = useScrollAnimation(0.15);
  const mareAnim = useScrollAnimation(0.15);


  return (
    <PageLayout seo={pagesSEO.poesiaHipnotica} currentPage="Poesia Hipnótica">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Poesia Cognitiva Hipnótica
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

    </PageLayout>
  );
};

export default PoesiaHipnotica;
