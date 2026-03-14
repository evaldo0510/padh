import React from 'react';
import { RefreshCw, Brain, BookOpen, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import toolImage from '@/assets/tool-reescrita.jpg';

const ReescritaPoetica = () => {
  const isLoading = usePageLoading(500);
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Reescrita Poética" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <RefreshCw className="h-3.5 w-3.5" />
              Ferramenta 6 — P.A.D.H.
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Reescrita <span className="text-primary italic">Poética de Narrativas</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 font-medium">O Alquimista do Passado</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Transformar o que doeu em algo que dança na página — reconfigurar memórias difíceis 
              através da linguagem simbólica e ressignificadora.
            </p>
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
                  Reconfigurar memórias difíceis, experiências bloqueantes ou traumas pessoais, traduzindo-os em 
                  <strong className="text-foreground"> linguagem simbólica, estética e emocionalmente ressignificadora</strong>.
                </p>
                <p>
                  O foco não é apagar o vivido — é <strong className="text-foreground">reescrever o lugar interno que ele ocupa</strong>.
                </p>
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
                  <h4 className="font-heading font-semibold text-foreground mb-2">1. Escolha do Episódio-Chave</h4>
                  <p className="text-sm text-muted-foreground">
                    O cliente traz uma história que o afeta — algo que marcou, que trava, que ecoa. 
                    Pode ser algo grande ou cotidiano.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">2. Escuta com Olhos de Metáfora</h4>
                  <p className="text-sm text-muted-foreground mb-2">Durante a narrativa, o terapeuta escuta imagens simbólicas ocultas:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Um vazio?', 'Um abandono?', 'Uma repetição?', 'Um gesto não dito?'].map((q, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 rounded-md bg-primary/5 border border-primary/10 text-muted-foreground">{q}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">3. Tradução Poética Guiada</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Convide o cliente a escrever essa história como se fosse um poema — <em>não como aconteceu, 
                    mas como a alma dele gostaria de contar</em>.
                  </p>
                  <div className="space-y-2">
                    {[
                      '"Se essa dor fosse um lugar, como seria?"',
                      '"E se ela falasse, o que diria?"',
                      '"Qual verso poderia nascer dessa cicatriz?"',
                    ].map((q, i) => (
                      <div key={i} className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                        <p className="poem-text text-sm text-muted-foreground italic">{q}</p>
                      </div>
                    ))}
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
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Exemplo Real</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">A Alquimia em Ação</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">História Original</span>
                  <p className="text-muted-foreground mt-3 italic">"Meu pai me abandonou. Nunca mais falou comigo."</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/[0.02]">
                <CardContent className="p-6">
                  <span className="text-xs uppercase tracking-widest text-primary font-medium">Reescrita Poética</span>
                  <div className="poem-block mt-3">
                    <p className="poem-text text-foreground/80">
                      Fiquei com os espaços vazios<br />
                      que ele não soube preencher.<br />
                      Hoje, sou o arquiteto do abrigo<br />
                      que ele nunca foi.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-3">Segundo Exemplo</h4>
                  <p className="text-sm text-muted-foreground mb-3"><strong className="text-foreground">História:</strong> "Minha mãe nunca me escutou."</p>
                  <div className="poem-block">
                    <p className="poem-text text-foreground/80">
                      Gritei tantos silêncios que aprendi a conversar com o eco.<br />
                      Hoje, me escuto — e isso basta para ser inteiro.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fundamentos */}
      <section className="py-20 border-t border-border/30">
        <div ref={theoryAnim.ref} className={`container mx-auto px-6 transition-all duration-1000 ${theoryAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Fundamentos Teóricos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><strong className="text-foreground">Terapia Narrativa</strong> (Michael White) — reconfigurar a história de vida.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><strong className="text-foreground">Biblioterapia e arteterapia simbólica</strong> — cura pela leitura e escrita.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><strong className="text-foreground">Reframing cognitivo (TCC)</strong> — mudar o enquadramento mental.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><strong className="text-foreground">Psicopoética e semiótica do afeto</strong> — linguagem como agente transformador.</li>
                </ul>
                <div className="poem-block mt-6 text-center">
                  <p className="poem-text text-foreground/80">
                    "Você não muda o que viveu,<br />
                    mas muda o lugar de onde conta."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReescritaPoetica;
