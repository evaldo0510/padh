import React from 'react';
import { BookOpen, Brain, PenTool, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import toolImage from '@/assets/tool-caderno-voz.jpg';

const CadernoVozInterna = () => {
  const isLoading = usePageLoading(500);
  const contentAnim = useScrollAnimation(0.15);
  const stimuliAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);

  if (isLoading) return <PageSkeleton />;

  const estimulos = [
    { emocao: 'Medo', estimulo: '"Fingi que estava tudo bem... e quase acreditei."' },
    { emocao: 'Raiva', estimulo: '"Há um grito que mora no meu sorriso."' },
    { emocao: 'Amor', estimulo: '"Te perdoei, mas me esqueci de avisar meu coração."' },
    { emocao: 'Cansaço', estimulo: '"Estou tão cansado que até meu sono está dormindo."' },
    { emocao: 'Esperança', estimulo: '"Ainda acredito no impossível — com um pouco de raiva."' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Caderno de Voz Interna" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <PenTool className="h-3.5 w-3.5" />
              Ferramenta 4 — P.A.D.H.
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Caderno de <span className="text-primary italic">Voz Interna Poética</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 font-medium">O Diário Onde a Alma Gagueja Verdade</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Transformar o cliente em autor de sua própria escuta — a escrita como oráculo 
              e ferramenta de autoconhecimento profundo.
            </p>
            <div className="mx-auto w-full max-w-md mt-6">
              <img src={toolImage} alt="Caderno de Voz Interna — diário poético" className="w-full rounded-xl shadow-lg opacity-80" />
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
                  Permitir que o cliente <strong className="text-foreground">acesse, registre e se reconecte com suas vozes internas</strong>, 
                  emoções ambíguas e desejos não nomeados através de uma escrita livre, guiada por estímulos poéticos.
                </p>
                <p>
                  É um processo de <strong className="text-foreground">diálogo interno mediado pela metáfora</strong>, 
                  onde o sujeito pode escrever, responder, brigar e acolher suas próprias partes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-heading flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Como Funciona na Prática
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">1. Estímulo Poético Inicial</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    O terapeuta oferece uma frase-poema, um verso inacabado, ou um verso contraditório como disparador:
                  </p>
                  <div className="space-y-2">
                    {[
                      '"Sinto falta do que ainda nem vivi."',
                      '"Tenho medo de melhorar."',
                      '"Sou eu... ou só uma versão de mim que não quero mais vestir?"',
                    ].map((v, i) => (
                      <div key={i} className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                        <p className="poem-text text-sm text-muted-foreground italic">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">2. Instrução Terapêutica</h4>
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      "A partir desse verso, escreva por 5 a 10 minutos como se você estivesse escutando 
                      uma parte de si mesma te contando algo. Não corrija, não censure, não revise. 
                      Apenas escute e escreva."
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">3. Reflexão</h4>
                  <p className="text-sm text-muted-foreground">
                    Após o tempo, o cliente comenta sobre <strong className="text-foreground">o que foi surpreendente</strong>, 
                    qual parte parecia mais autêntica, o que ficou por dizer.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">4. Retorno Criativo</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Um poema finalizado</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Uma carta para si mesmo</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Um exercício de performance (ler em voz alta)</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Uma devolutiva ilustrada (desenho, colagem)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Estímulos */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={stimuliAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            stimuliAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Biblioteca</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Estímulos Poéticos</h2>
            </div>

            <div className="space-y-3">
              {estimulos.map((item, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-5 flex items-start gap-4">
                    <span className="text-xs uppercase tracking-widest text-primary font-medium min-w-[80px]">{item.emocao}</span>
                    <p className="poem-text text-sm text-foreground/80 italic">{item.estimulo}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 poem-block text-center">
              <p className="poem-text text-foreground/80">
                "O que você escreveu hoje…<br />
                é o que seu silêncio gritou por anos?"
              </p>
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
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Fundamentos Teóricos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Dialoga com a técnica de <strong className="text-foreground">escrita automática de Freud e Breton</strong>, mas com direção terapêutica.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Baseado no <strong className="text-foreground">Modelo dos Estados do Ego</strong> (Análise Transacional): cada parte que emerge é uma subpersonalidade.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Favorece o <strong className="text-foreground">processo de integração emocional</strong>, ao dar palavra e forma ao que é silenciado.</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Inspiração em práticas de <strong className="text-foreground">journaling terapêutico</strong>, com ênfase poética, simbólica, imagética.</li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                { title: 'Entre sessões', desc: 'Como tarefa poética para continuar o processo.' },
                { title: 'Momentos de crise', desc: 'Como ancoragem escrita em emergências emocionais.' },
                { title: 'Transição de ciclos', desc: 'Luto, término, recomeço — rituais de passagem.' },
                { title: 'Adolescentes', desc: 'Libera a expressão sem precisar falar diretamente.' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/50">
                  <h4 className="font-heading font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
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

export default CadernoVozInterna;
