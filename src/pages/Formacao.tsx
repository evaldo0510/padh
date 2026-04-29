import React from "react";
import {
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Brain,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { pagesSEO } from "@/lib/seo-config";

const Formacao = () => {
  const modulos = [
    {
      numero: 1,
      titulo: "Poema-Funil: A Jornada do Olhar ao Invisível",
      duracao: "60 min",
      descricao: "Aulão teórico-vivencial com metáforas, imagens mentais, exemplos poéticos e vivência guiada.",
      topicos: [
        "Fundamento teórico do Poema-Funil",
        "Base neuropsicológica",
        "Estrutura e técnica de construção",
        "Exercício guiado",
        "Aplicações terapêuticas",
      ],
    },
    {
      numero: 2,
      titulo: "Neurociência, Emoção e Hipnose",
      duracao: "60 min",
      descricao: "Como o cérebro dança com a metáfora — da ativação neural ao transe leve.",
      topicos: [
        "Ativação neural pela poesia",
        "Estados de transe leve e profundidade emocional",
        "O poder sugestivo dos ritmos e imagens",
        "Induções poéticas sutis",
        "Vivência com feedback emocional",
      ],
    },
    {
      numero: 3,
      titulo: "A Estrutura PCH",
      duracao: "60 min",
      descricao: "O mapa da atuação terapêutica poética: Poesia – Cognitiva – Hipnótica.",
      topicos: [
        "O poder da palavra e ressignificação",
        "Aplicação estratégica das ferramentas",
        "Aprofundamento e ancoragem de insights",
        "Foco no desenvolvimento integral do ser",
        "Criação de ritual personalizado",
      ],
    },
    {
      numero: 4,
      titulo: "As Ferramentas da PCH — Parte 1",
      duracao: "60 min",
      descricao: "Poemas como técnicas: Poema-funil, Verso-gatilho e Poemadiagnóstico.",
      topicos: [
        "Poema-funil (imersão gradual)",
        "Verso-gatilho (âncoras emocionais)",
        "Poemadiagnóstico (projeção e escolha)",
        "Roda de escuta + aplicação prática",
      ],
    },
    {
      numero: 5,
      titulo: "As Ferramentas da PCH — Parte 2",
      duracao: "60 min",
      descricao: "Escrita terapêutica profunda e técnicas avançadas de intervenção poética.",
      topicos: [
        "Caderno de Voz Interna Poética",
        "Encenação Poética Interna",
        "Reescrita Poética de Narrativas",
        "Escrita em dupla de poema-dramatização",
      ],
    },
    {
      numero: 6,
      titulo: "Finalização, Ritualização e Acompanhamento",
      duracao: "60 min",
      descricao: "Encerramentos terapêuticos, integração e continuidade do trabalho com PCH.",
      topicos: [
        "Ritual do Silêncio Poético",
        "Séries de atendimento com PCH",
        "Adaptação para diferentes públicos",
        "Projeto terapêutico final e certificação",
      ],
    },
  ];

  return (
    <PageLayout seo={pagesSEO.formacao} currentPage="Formação em PCH">
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5">
            Certificação Profissional
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
            Formação em <span className="text-primary italic">PCH</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Capacitação completa para terapeutas, psicólogos e educadores que desejam dominar a Poesia Cognitiva Hipnótica.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="spiritual-icon spiritual-icon-sm text-primary" />
              <span>Carga horária: 12h</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="spiritual-icon spiritual-icon-sm text-primary" />
              <span>Aulas em grupo e supervisão</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="spiritual-icon spiritual-icon-sm text-primary" />
              <span>Certificado incluso</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulos.map((modulo) => (
              <Card key={modulo.numero} className="border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                      Módulo {modulo.numero}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{modulo.duracao}</span>
                  </div>
                  <CardTitle className="text-xl font-heading">{modulo.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{modulo.descricao}</p>
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">Tópicos principais:</p>
                    <ul className="space-y-2">
                      {modulo.topicos.map((topico, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <Target className="spiritual-icon spiritual-icon-xs text-primary" />
                          {topico}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Brain className="spiritual-icon spiritual-icon-sm" /> Público-Alvo
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Quem pode se tornar um Terapeuta PCH?</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left mb-12">
            {[
              "Psicólogos e Psicanalistas",
              "Terapeutas Holísticos",
              "Educadores e Pedagogos",
              "Profissionais de RH e Coaching",
              "Arteterapeutas",
              "Buscadores de Autoconhecimento",
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen className="spiritual-icon spiritual-icon-sm" />
                </div>
                <span className="text-sm font-medium">{p}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="px-12 bg-primary hover:bg-primary-dark">
            Fazer Inscrição Agora
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Formacao;