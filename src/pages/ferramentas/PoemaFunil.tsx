import React from 'react';
import { Feather, Brain, BookOpen, Lightbulb, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import toolImage from '@/assets/tool-poema-funil.jpg';
import { pagesSEO } from '@/lib/seo-config';

const PoemaFunil = () => {
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);


  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={pagesSEO.poemaFunil.title} description={pagesSEO.poemaFunil.description} path={pagesSEO.poemaFunil.path} />
      <Header />
      <PageHeader currentPage="Poema-Funil" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Feather className="h-3.5 w-3.5" />
              Ferramenta 1 — P.A.D.H.
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Poema-<span className="text-primary italic">Funil</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 font-medium">A Espiral da Palavra que Desce</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              O convite poético para o mergulho interior — induzir o cliente a abandonar a superfície 
              e descer pelas camadas internas do ser.
            </p>
            <div className="mx-auto w-full max-w-md mt-6 mb-4">
              <img src={toolImage} alt="Poema-Funil — espiral descendente de palavras" className="w-full rounded-xl shadow-lg opacity-80" />
            </div>
            <div className="poem-block max-w-sm mx-auto mt-4">
              <p className="poem-text text-foreground/80">
                Comece com os olhos:<br />
                veja o chão, o corpo, o mundo.<br /><br />
                Desça para os sentidos:<br />
                onde a respiração toca a alma.<br /><br />
                Desça mais — onde mora o que não tem palavras.<br />
                Ali, onde você escuta o que nunca ousou dizer.<br />
                Ali é onde vamos começar.
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
                  Induzir o cliente a sair da superfície do discurso racional e descer pelas escadas 
                  simbólicas da sensorialidade, da emoção e do inconsciente. O poema-funil atua como uma 
                  <strong className="text-foreground"> espiral de descida</strong>: começa com imagens concretas, 
                  passa por sentimentos e termina em símbolos ou silêncios.
                </p>
                <p>
                  Ele prepara o campo psíquico para o trabalho terapêutico. É um <strong className="text-foreground">pré-transe poético</strong>, 
                  onde o hemisfério direito do cérebro (intuitivo, associativo) se torna mais ativo.
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
                  <h4 className="font-heading font-semibold text-foreground mb-2">1. Leitura Guiada</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Com voz calma, lenta, respeitando pausas naturais e pequenos silêncios entre versos.</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Pode-se usar música instrumental ao fundo (muito sutil).</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Ideal para início de sessões, meditações ou rodas terapêuticas.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">2. Escrita Criativa Inspirada</h4>
                  <p className="text-sm text-muted-foreground mb-3">Após a leitura, o terapeuta pode propor:</p>
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
                    <p className="poem-text text-sm text-muted-foreground italic">
                      "Escreva agora um pequeno poema que comece com 'Vejo...', depois 'Sinto...', e depois 'Desejo...'."
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">3. Técnica do Tripé</h4>
                  <p className="text-sm text-muted-foreground mb-3">Um modelo de poema-funil segue esta tríade:</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Imagem externa', desc: 'Sensorial — o que se vê' },
                      { label: 'Estado interno', desc: 'Emocional — o que se sente' },
                      { label: 'Símbolo oculto', desc: 'Inconsciente — o que habita' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg border border-border/50 bg-card/50 text-center">
                        <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
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
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Aplicação Real</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Exemplos de Poema-Funil</h2>
            </div>

            <div className="space-y-6">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-3">Exemplo — Tripé Poético</h4>
                  <div className="poem-block">
                    <p className="poem-text text-foreground/80">
                      Vejo folhas dançando na calçada,<br />
                      Sinto meu peito apertado feito botão fechado,<br />
                      Sou um jardim esperando alguém para chover.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Sessão Individual', desc: 'Leia o poema-funil no início da sessão com um cliente ansioso. Ele respira mais devagar, fecha os olhos, e a conversa posterior flui com mais conexão.' },
                  { title: 'Oficina em Grupo', desc: 'No início de um grupo de autoconhecimento, o poema-funil é usado como "meditação poética". Cada pessoa depois escreve um poema inspirado no que sentiu.' },
                  { title: 'Ritual de Transição', desc: 'Pode-se usar um poema-funil no fechamento de processos terapêuticos longos como símbolo de encerramento e travessia.' },
                ].map((item, i) => (
                  <Card key={i} className="border-border/50">
                    <CardContent className="p-5">
                      <h4 className="font-heading font-semibold text-foreground mb-2 text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Fundamentos</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Base Teórica</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Milton Erickson', desc: 'Baseado na ideia de indução hipnótica indireta.' },
                { title: 'Carl Jung', desc: 'Atua como ativador da imaginação simbólica.' },
                { title: 'Winnicott', desc: 'Funciona como "dispositivo transicional" — um objeto-poema que leva do real ao simbólico.' },
              ].map((item, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-5">
                    <h4 className="font-heading font-semibold text-primary mb-2 text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary/20 bg-primary/[0.02]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h4 className="font-heading font-semibold text-foreground">Dica Extra</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Crie uma <strong className="text-foreground">playlist de poemas-funil</strong> e deixe o cliente 
                  escolher o "poço" que quer visitar naquele dia. Versos-padrão para personalizar:
                </p>
                <div className="poem-block mt-4">
                  <p className="poem-text text-sm text-muted-foreground">
                    "Começo com o que se vê…"<br />
                    "Desço pelo que me move…"<br />
                    "Chego onde nada tem nome, mas tudo faz sentido."
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

export default PoemaFunil;
