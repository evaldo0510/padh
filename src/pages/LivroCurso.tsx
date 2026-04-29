import React from "react";
import { BookOpen, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/layout/PageLayout";
import { pagesSEO } from "@/lib/seo-config";
import TextReader from "@/components/ui/text-reader";

const LivroCurso = () => {
  return (
    <PageLayout seo={pagesSEO.livroCurso} currentPage="Livro-Curso">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">
              Livro-Curso PCH
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
              Poesia Cognitiva <span className="text-primary italic">Hipnótica</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              O fio dourado que tece a jornada de autoconhecimento e transformação através do poder da palavra poética aliada à neurociência e hipnose.
            </p>
            <div className="poem-block max-w-md mx-auto my-8">
              <p className="poem-text text-sm text-muted-foreground">
                Quando se olha no espelho, o que é que você vê?
                <br /> Eu vi grades onde havia janelas.
                <br /> Até que um verso abriu a porta
                <br /> que eu mesmo havia trancado por dentro.
              </p>
              <cite className="text-xs text-primary/70 mt-2 block not-italic">
                — Prisão Interior
              </cite>
            </div>
            <div className="flex justify-center gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
                <BookOpen className="mr-2 spiritual-icon spiritual-icon-lg" /> Explore o Livro-Curso
              </Button>
              <TextReader
                text="O fio dourado que tece a jornada de autoconhecimento e transformação através do poder da palavra poética aliada à neurociência e hipnose. A liberdade interior não é um lugar, é um estado onde a mente encontra a poesia que a liberta."
                label="Ouvir Narração"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introdução */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Introdução Visionária</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Este livro-curso é um convite para o mergulho profundo — no consciente e no inconsciente — usando a poesia como farol e a ciência como âncora. Nas páginas que seguem, revelamos as chaves e os segredos para que sua voz interna se transforme numa melodia de mudança, cura e expansão.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Diferente de um manual técnico comum, este livro-curso foi concebido como uma <strong className="text-foreground">experiência imersiva</strong>. Cada capítulo combina fundamentos teóricos com exercícios práticos na metodologia PCH.
              </p>
            </CardContent>
          </Card>

          {/* Sumário */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-semibold px-4 border-l-4 border-primary/40">Trilha de Aprendizado</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Capítulo 1 — O que é a Poesia Cognitiva Hipnótica", desc: "A base teórica e o despertar do olhar simbólico." },
                { title: "Capítulo 2 — A Escrita como Espelho", desc: "Como usar o papel para refletir a alma e identificar padrões." },
                { title: "Capítulo 3 — Metáforas e Neurociência", desc: "A conexão biológica entre o verso e a mudança emocional." },
                { title: "Capítulo 4 — A Prática do Autocuidado Poético", desc: "Séries de exercícios para o equilíbrio diário." },
              ].map((chap, i) => (
                <div key={i} className="p-5 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-colors">
                  <h4 className="font-heading font-medium text-foreground mb-2">{chap.title}</h4>
                  <p className="text-sm text-muted-foreground">{chap.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border/30" />

          {/* Call to Action Final */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-heading font-bold mb-4">Pronto para começar sua transformação?</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Adquira agora o acesso completo ao Livro-Curso PCH e inicie sua jornada.</p>
            <Button size="lg" className="px-12 bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20">
              Quero Acesso Vitalício
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default LivroCurso;