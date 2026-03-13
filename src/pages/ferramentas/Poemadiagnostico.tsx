import React from 'react';
import { Search, Brain, BookOpen, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';

const Poemadiagnostico = () => {
  const isLoading = usePageLoading(500);
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Poemadiagnóstico" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Eye className="h-3.5 w-3.5" />
              Ferramenta 3 — P.A.D.H.
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Poema<span className="text-primary italic">diagnóstico</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 font-medium">O Espelho Emocional</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A imagem emocional que escolhe por ele — permitindo que o inconsciente fale 
              por preferências poéticas, revelando estados internos que a razão ainda nega.
            </p>
            <div className="poem-block max-w-sm mx-auto mt-8">
              <p className="poem-text text-foreground/80 italic">
                "Qual desses poemas te escolhe hoje?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivo e Modo de Uso */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={contentAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            contentAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
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
                  Ajudar o cliente a <strong className="text-foreground">reconhecer sua paisagem emocional atual</strong> por 
                  meio da identificação espontânea com um poema. Não é o cliente que escolhe o poema — 
                  <em> é o poema que escolhe ele</em>.
                </p>
                <p>
                  Permite que <strong className="text-foreground">partes internas inconscientes se manifestem sem constrangimento</strong>, 
                  abrindo um canal legítimo e simbólico para a escuta.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-heading flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Modo de Uso Prático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">1. Apresente 3 a 5 mini poemas curtos</h4>
                  <p className="text-sm text-muted-foreground">
                    Máximo de 6 versos cada, com linguagens simbólicas distintas: medo, tempo/espera, mudança, pertencimento.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">2. Pergunta-Chave</h4>
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
                    <p className="poem-text text-sm text-muted-foreground italic">
                      "Qual desses te escolhe hoje?"<br />
                      <span className="text-xs">(Use esse verbo — te <strong>escolhe</strong>. Isso evita a racionalização.)</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">3. Exploração Terapêutica</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>→ O que mais te tocou nesse poema?</li>
                    <li>→ O que você acha que esse poema revela sobre você agora?</li>
                    <li>→ Que parte sua falou mais alto nessa escolha?</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exemplos */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={examplesAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            examplesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Exemplo Real</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Kit Poemadiagnóstico</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { tema: 'Medo', verso: '"Guardo embaixo da língua\no grito que nunca saiu."' },
                { tema: 'Espera', verso: '"Tenho um relógio que não marca horas —\nsó silêncios acumulados."' },
                { tema: 'Mudança', verso: '"Troquei a gaiola aberta\npelo vento que ainda me assusta."' },
              ].map((item, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-5">
                    <span className="text-xs uppercase tracking-widest text-primary font-medium">{item.tema}</span>
                    <div className="poem-block mt-3">
                      <p className="poem-text text-sm text-foreground/80 whitespace-pre-line">{item.verso}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary/20 bg-primary/[0.02]">
              <CardContent className="p-6">
                <h4 className="font-heading font-semibold text-foreground mb-3">Caso Prático</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">O cliente escolhe o poema 2 (Espera)</strong> e diz:
                </p>
                <p className="text-sm text-muted-foreground italic mb-4">
                  "Esse é exatamente o que sinto. Como se tudo estivesse parado, mas dentro de mim tem uma fila enorme de coisas esperando."
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Diagnóstico:</strong> O cliente está em estado de suspensão emocional, 
                  entre o passado e o futuro — mas sem presença.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fundamentos */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={theoryAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            theoryAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Fundamentos Teóricos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Baseia-se na <strong className="text-foreground">projeção simbólica</strong>: o cliente lê algo externo e, ao se identificar, revela seu estado interno.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Inspiração nos <strong className="text-foreground">Testes Projetivos Literários</strong>, semelhantes ao TAT, mas com linguagem poética.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Dialoga com as ideias de <strong className="text-foreground">resposta emocional imediata</strong> na arte, como defendia Carl Jung.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Atua no <strong className="text-foreground">sistema límbico</strong>, que responde mais rapidamente à metáfora do que à explicação racional.</li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                'Primeira sessão terapêutica: excelente abertura emocional não invasiva.',
                'Sessões de grupo: cada pessoa escolhe em silêncio, depois compartilha.',
                'Oficinas de escrita terapêutica: serve como ativador de temas.',
                'Atendimentos online: poemas enviados por WhatsApp ou email em formato carrossel.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border/50 bg-card/50">
                  <Search className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Poemadiagnostico;
