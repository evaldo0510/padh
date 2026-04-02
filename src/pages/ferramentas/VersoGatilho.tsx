import React from 'react';
import { Anchor, Brain, BookOpen, Lightbulb, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import toolImage from '@/assets/tool-verso-gatilho.jpg';
import SEOHead from '@/components/seo/SEOHead';
import { pagesSEO } from '@/lib/seo-config';

const VersoGatilho = () => {
  const isLoading = usePageLoading(500);
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);

  if (isLoading) return <PageSkeleton />;

  const versosPorTema = [
    { tema: 'Ansiedade', verso: '"Eu não sou o que me aperta.\nSou o que respira depois."' },
    { tema: 'Autocobrança', verso: '"Se eu fosse tão cruel com os outros\nquanto sou comigo, ninguém ficaria."' },
    { tema: 'Coragem', verso: '"A porta nunca esteve trancada.\nEu só estava acostumado à cela."' },
    { tema: 'Recomeço', verso: '"Não é o fim — é o chão onde nascem raízes novas."' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Verso-Gatilho" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Anchor className="h-3.5 w-3.5" />
              Ferramenta 2 — P.A.D.H.
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Verso-<span className="text-primary italic">Gatilho</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 font-medium">A Palavra-Chave que Liberta</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Uma âncora emocional rápida — um verso curto e memorável que funciona como um 
              botão de emergência emocional, um microtransplante de consciência.
            </p>
            <div className="mx-auto w-full max-w-md mt-6 mb-4">
              <img src={toolImage} alt="Verso-Gatilho — âncora emocional poética" className="w-full rounded-xl shadow-lg opacity-80" />
            </div>
            <div className="poem-block max-w-sm mx-auto mt-4">
              <p className="poem-text text-foreground/80">
                "Eu não sou o que me prende,<br />
                sou o que se solta depois."
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
                  Criar uma <strong className="text-foreground">âncora emocional positiva e rápida</strong>. 
                  Um verso curto e memorável que funcione como um botão de emergência emocional. 
                  É como uma vacina verbal contra o pânico, a paralisia ou a autoacusação.
                </p>
                <p>
                  Atua como um <strong className="text-foreground">microtransplante de consciência</strong>, 
                  que o cliente carrega consigo para momentos difíceis.
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
                  <h4 className="font-heading font-semibold text-foreground mb-2">1. Criação Personalizada (sessão ao vivo)</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Durante a escuta empática, quando o cliente disser algo que revele força, clareza ou libertação, 
                    o terapeuta pode interromper suavemente e propor:
                  </p>
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg mt-3">
                    <p className="poem-text text-sm text-muted-foreground italic">
                      "Espere... isso que você acabou de dizer… podemos transformar num verso seu?"
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">2. Biblioteca Terapêutica</h4>
                  <p className="text-sm text-muted-foreground">
                    Acervo de versos-gatilho organizados por tema: ansiedade, luto, autoestima, raiva, solidão, recomeços.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">3. Entrega Simbólica</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Escrito à mão num cartão com arte visual</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Enviado por áudio com trilha sutil</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Inserido como papel dobrado numa caixinha de emergência emocional</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Usado como imagem de fundo no celular</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exemplos por Tema */}
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
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Exemplos</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Versos-Gatilho por Tema</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {versosPorTema.map((item, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-5">
                    <span className="text-xs uppercase tracking-widest text-primary font-medium">{item.tema}</span>
                    <div className="poem-block mt-3">
                      <p className="poem-text text-sm text-foreground/80 whitespace-pre-line">{item.verso}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Exemplo de sessão */}
            <Card className="border-primary/20 bg-primary/[0.02]">
              <CardContent className="p-6">
                <h4 className="font-heading font-semibold text-foreground mb-4">Exemplo de Sessão com Verso-Gatilho</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Cliente:</strong> "Eu sempre me saboto. Quando algo começa a dar certo, eu mesma atrapalho."</p>
                  <p><strong className="text-foreground">Terapeuta:</strong> "O que você diria pra essa parte sua que atrapalha?"</p>
                  <p><strong className="text-foreground">Cliente:</strong> "Talvez... 'eu sei que você só quer me proteger, mas eu cresci'."</p>
                  <p><strong className="text-foreground">Terapeuta:</strong> "Podemos transformar isso num verso que te acompanhe?"</p>
                  <div className="poem-block mt-3">
                    <p className="poem-text text-foreground/80 italic">"Eu cresci. E agora me protejo com liberdade."</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Técnicas de Ancoragem */}
      <section className="py-20 border-t border-border/30">
        <div
          ref={theoryAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            theoryAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Técnicas</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Ancoragem & Fundamentos</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: <Zap className="h-5 w-5" />, title: 'Repetição Verbal', desc: 'Recitar o verso 3 vezes ao acordar, como mantra.' },
                { icon: <Anchor className="h-5 w-5" />, title: 'Respiração Associada', desc: 'Inspirar com a primeira parte, expirar com a segunda.' },
                { icon: <Lightbulb className="h-5 w-5" />, title: 'Ancoragem Corporal', desc: 'Escrever na pele, tocar o peito ao dizer o verso, colar no espelho.' },
              ].map((item, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-5 text-center space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto">{item.icon}</div>
                    <h4 className="font-heading font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Fundamentos Teóricos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Baseado na técnica da <strong className="text-foreground">âncora verbal</strong> da PNL.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Inspiração nas <strong className="text-foreground">afirmações curativas</strong> do método Louise Hay.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Atua como recurso de <strong className="text-foreground">autossugestão poética</strong>, usando estética simbólica para fixar conteúdo emocional.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Aproxima-se da <strong className="text-foreground">reprogramação cognitiva</strong> pela linguagem afetiva.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VersoGatilho;
