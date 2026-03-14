import React from 'react';
import { Flame, Brain, BookOpen, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import toolImage from '@/assets/tool-ritual-silencio.jpg';

const RitualSilencio = () => {
  const isLoading = usePageLoading(500);
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Ritual do Silêncio" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Flame className="h-3.5 w-3.5" />
              Ferramenta 7 — P.A.D.H.
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Ritual do <span className="text-primary italic">Silêncio Poético</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 font-medium">A Vela que Fecha a Caverna</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Onde a poesia vira altar e o silêncio vira resposta — encerrar sessões com sacralidade, 
              criando uma impressão emocional duradoura.
            </p>
            <div className="poem-block max-w-sm mx-auto mt-8">
              <p className="poem-text text-foreground/80">
                "Se uma só palavra tua pudesse morar em mim,<br />
                qual você deixaria?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivo e Modo de Uso */}
      <section className="py-20 border-t border-border/30">
        <div ref={contentAnim.ref} className={`container mx-auto px-6 transition-all duration-1000 ${contentAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-heading flex items-center gap-3">
                  <Brain className="h-6 w-6 text-primary" />
                  Objetivo Terapêutico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Encerrar sessões de forma ritualística, simbólica e emocionalmente significativa. 
                  O foco não é entender, mas <strong className="text-foreground">guardar</strong>. 
                  Não é falar mais, é <strong className="text-foreground">ecoar por dentro</strong>.
                </p>
                <div className="poem-block">
                  <p className="poem-text text-foreground/80 text-sm">
                    Um verso vira relicário.<br />
                    Uma pausa vira revelação.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-heading flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Como Funciona
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">1. Leitura Final</h4>
                  <p className="text-sm text-muted-foreground">
                    Um poema curto ou verso forte que resuma ou honre a jornada feita naquela sessão — 
                    pode ser do próprio cliente, escolhido por você, ou uma frase espontânea transformada poeticamente.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">2. Duas Perguntas que Abrem o Eco Interno</h4>
                  <div className="space-y-2">
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                      <p className="poem-text text-sm text-muted-foreground italic">"Qual palavra ecoa mais em você agora?"</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                      <p className="poem-text text-sm text-muted-foreground italic">"Se você tivesse que guardar um verso como relicário, qual seria?"</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Essas perguntas não exigem resposta imediata. Às vezes, o cliente apenas fecha os olhos. 
                    Às vezes, responde com lágrima.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">3. Um Minuto de Silêncio Consciente</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Silêncio não como falta de som, mas como <strong className="text-foreground">presença de sentido</strong>.
                  </p>
                  <div className="poem-block">
                    <p className="poem-text text-sm text-foreground/80">
                      O terapeuta se cala.<br />
                      O cliente respira.<br />
                      O poema segue vivo ali,<br />
                      mesmo sem ser lido de novo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exemplo */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div ref={examplesAnim.ref} className={`relative container mx-auto px-6 transition-all duration-1000 ${examplesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Exemplo</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Encerramento de Sessão</h2>
            </div>

            <Card className="border-primary/20 bg-primary/[0.02] mb-8">
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Você termina uma sessão onde o cliente falou de recomeços difíceis. Lê, então, o verso:
                </p>
                <div className="poem-block">
                  <p className="poem-text text-foreground/80">
                    "Todo fim é apenas uma curva<br />
                    de onde a alma reaprende a caminhar."
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">Depois pergunta:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="italic">— Qual palavra ficou em você?</li>
                  <li className="italic">— Se esse verso fosse uma chave, o que ele abriria em você hoje?</li>
                </ul>
                <p className="text-sm text-muted-foreground font-medium">E então... silêncio.</p>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                '"Nem tudo precisa de resposta. Às vezes, só de espaço."',
                '"O silêncio também fala. E a poesia o entende."',
                '"Respire esse verso como quem guarda um segredo sagrado."',
                '"Essa palavra te escolheu hoje. Cuide dela até que ela floresça."',
              ].map((frase, i) => (
                <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/50">
                  <p className="poem-text text-sm text-muted-foreground italic">{frase}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fundamentos */}
      <section className="py-20 border-t border-border/30">
        <div ref={theoryAnim.ref} className={`container mx-auto px-6 transition-all duration-1000 ${theoryAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Fundamentos & Aplicações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Cria <strong className="text-foreground">memória emocional</strong> associada ao conteúdo da sessão.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Estimula o sistema límbico a associar o processo a <strong className="text-foreground">acolhimento, profundidade e segurança</strong>.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Gera <strong className="text-foreground">impressão psíquica duradoura</strong>, como uma marca simbólica.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Usa elementos de <strong className="text-foreground">ritualização</strong> (logoterapia, psicodrama, constelação familiar, neuropsicologia).</li>
                </ul>
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  {[
                    'Encerramentos de ciclos terapêuticos',
                    'Fechamento de vivências em grupo',
                    'Rituais de passagem (luto, separação, alta)',
                    'Sessões com alta carga emocional',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-border/30 bg-card/50">
                      <Flame className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="poem-block text-center">
              <p className="poem-text text-foreground/80">
                A terapia não termina quando a sessão acaba.<br />
                Ela continua onde o silêncio ecoa…<br />
                … e a poesia vela por dentro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RitualSilencio;
