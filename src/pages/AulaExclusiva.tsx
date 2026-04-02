import React from 'react';
import { Play, Clock, Target, BookOpen, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import SEOHead from '@/components/seo/SEOHead';
import { pagesSEO } from '@/lib/seo-config';

const AulaExclusiva = () => {
  const isLoading = usePageLoading(500);
  if (isLoading) return <PageSkeleton />;

  const partes = [
    {
      titulo: "Anatomia Poética do Cérebro",
      duracao: "15 min",
      descricao: "Viagem pelas áreas cerebrais ativadas durante a leitura poética",
      conteudo: ["Área de Broca e Wernicke", "Sistema Límbico — Emoções", "Córtex Pré-Frontal — Reflexão", "Rede do Modo Padrão (Default Mode Network)"]
    },
    {
      titulo: "O Que a Ciência Já Sabia",
      duracao: "10 min",
      descricao: "Fundamentos científicos da neuroestética e psicolinguística",
      conteudo: ["Estudos com fMRI sobre leitura poética", "Neuroestética e resposta à beleza", "Metáforas como estruturas cognitivas", "Lakoff, Oliver Sacks e outros"]
    },
    {
      titulo: "Leitura como Experiência Multissensorial",
      duracao: "15 min",
      descricao: "Vivência prática com poema terapêutico e análise em tempo real",
      conteudo: ["Recitação de poema com análise neural", "Imagens visuais evocadas", "Emoções emergentes", "Ativação das áreas cerebrais"]
    },
    {
      titulo: "Aplicações Terapêuticas do Mapa",
      duracao: "15 min",
      descricao: "Como construir poemas com intenção terapêutica precisa",
      conteudo: ["Zona Cerebral → Estilo de Verso → Efeito", "Exemplos práticos de versos direcionados", "Exercício de criação poética", "Construção colaborativa de versos"]
    },
    {
      titulo: "Vivência Guiada",
      duracao: "10 min",
      descricao: "Experiência prática de leitura terapêutica com registro de insights",
      conteudo: ["Respiração consciente preparatória", "Leitura guiada de poema terapêutico", "Registro de imagens e emoções", "Transformação em mini poema"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Aula Exclusiva" />
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Módulo Especial</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              O Mapa Cerebral do <span className="text-primary italic">Leitor Poético</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Neurociência da Leitura Terapêutica — Aula Teórico-Vivencial
            </p>
            <div className="flex justify-center gap-3 mb-8">
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/20">
                <Clock className="mr-1.5 h-3.5 w-3.5" />
                60 minutos
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/20">
                Teórico-vivencial
              </Badge>
            </div>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
              <Play className="mr-2 h-5 w-5" />
              Assistir Aula
            </Button>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introdução Narrada */}
          <Card className="border-primary/20 bg-primary/[0.02]">
            <CardContent className="p-8">
              <div className="poem-block">
                <p className="poem-text text-base text-foreground/90 leading-relaxed">
                  "Feche os olhos por um instante... imagine que cada verso que você lê 
                  é uma chave. Mas onde essas chaves se encaixam? No corpo? Na mente? 
                  Ou talvez... no mapa oculto da sua própria alma?"
                </p>
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Nesta aula, mergulharemos num território onde a neurociência encontra a metáfora, 
                e onde a leitura se revela não como um ato passivo, mas como uma intervenção 
                delicada no tecido neural da consciência. Descobriremos como a poesia age como 
                agente neuroplástico, redesenhando a mente com símbolos.
              </p>
            </CardContent>
          </Card>

          {/* Objetivos */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Objetivos da Aula
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {[
                  "Compreender as principais áreas cerebrais ativadas pela leitura poética",
                  "Relacionar essas áreas com os efeitos terapêuticos da PCH",
                  "Explorar a leitura como um fenômeno multissensorial e simbólico",
                  "Aprender a desenhar estrategicamente poemas para fins terapêuticos",
                  "Vivenciar uma leitura poética com foco em introspecção e insight"
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Estrutura */}
          <div>
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2 font-medium">Programa</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Estrutura da Aula</h2>
            </div>
            <div className="space-y-4">
              {partes.map((parte, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-heading text-lg font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-semibold text-foreground">{parte.titulo}</h3>
                          <Badge variant="outline" className="text-xs border-primary/20 text-muted-foreground">
                            {parte.duracao}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{parte.descricao}</p>
                        <div className="flex flex-wrap gap-2">
                          {parte.conteudo.map((item, j) => (
                            <span key={j} className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Encerramento */}
          <div className="text-center py-8 space-y-6">
            <div className="poem-block text-left max-w-md mx-auto">
              <p className="poem-text text-base text-foreground/90">
                "Ler poesia não é ler palavras.<br />
                É ler a si mesmo num espelho<br />
                feito de símbolos."
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                Qual parte do seu cérebro você mais usa para se esconder de si mesmo?
              </p>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                E se o verso for o bisturi mais gentil que o inconsciente aceita?
              </p>
            </div>
            <p className="poem-text text-primary text-sm">
              "Agora que você conhece o mapa... que tal escrever o caminho?"
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
              <Play className="mr-2 h-5 w-5" />
              Assistir Aula Completa
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/5">
              <BookOpen className="mr-2 h-5 w-5" />
              Baixar Material de Apoio
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AulaExclusiva;
