import React from 'react';
import { GraduationCap, Clock, Users, BookOpen, Brain, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';

const Formacao = () => {
  const isLoading = usePageLoading(500);
  if (isLoading) return <PageSkeleton />;

  const modulos = [
    {
      numero: 1,
      titulo: "Poema-Funil: A Jornada do Olhar ao Invisível",
      duracao: "60 min",
      descricao: "Aulão teórico-vivencial com metáforas, imagens mentais, exemplos poéticos e vivência guiada.",
      topicos: ["Fundamento teórico do Poema-Funil", "Base neuropsicológica", "Estrutura e técnica de construção", "Exercício guiado", "Aplicações terapêuticas"]
    },
    {
      numero: 2,
      titulo: "Neurociência, Emoção e Hipnose",
      duracao: "60 min",
      descricao: "Como o cérebro dança com a metáfora — da ativação neural ao transe leve.",
      topicos: ["Ativação neural pela poesia", "Estados de transe leve e profundidade emocional", "O poder sugestivo dos ritmos e imagens", "Induções poéticas sutis", "Vivência com feedback emocional"]
    },
    {
      numero: 3,
      titulo: "A Estrutura P.A.D.H.",
      duracao: "60 min",
      descricao: "O mapa da atuação terapêutica poética: Preparação – Aplicação – Desenvolvimento – Hibridização.",
      topicos: ["Criação de ambiente interno e externo", "Aplicação sensorial (voz, ritmo, silêncio)", "Registro, eco e ancoragem dos poemas", "Integração com outras terapias", "Criação de ritual personalizado"]
    },
    {
      numero: 4,
      titulo: "As Ferramentas da PCH — Parte 1",
      duracao: "60 min",
      descricao: "Poemas como técnicas: Poema-funil, Verso-gatilho e Poemadiagnóstico.",
      topicos: ["Poema-funil (imersão gradual)", "Verso-gatilho (âncoras emocionais)", "Poemadiagnóstico (projeção e escolha)", "Roda de escuta + aplicação prática"]
    },
    {
      numero: 5,
      titulo: "As Ferramentas da PCH — Parte 2",
      duracao: "60 min",
      descricao: "Escrita terapêutica profunda e técnicas avançadas de intervenção poética.",
      topicos: ["Caderno de Voz Interna Poética", "Encenação Poética Interna", "Reescrita Poética de Narrativas", "Escrita em dupla de poema-dramatização"]
    },
    {
      numero: 6,
      titulo: "Finalização, Ritualização e Acompanhamento",
      duracao: "60 min",
      descricao: "Encerramentos terapêuticos, integração e continuidade do trabalho com PCH.",
      topicos: ["Ritual do Silêncio Poético", "Séries de atendimento com PCH", "Adaptação para diferentes públicos", "Projeto terapêutico final e certificação"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Formação em PCH" />
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Formação Profissional</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              Formação em <span className="text-primary italic">Poesia Cognitiva Hipnótica</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
              Capacitação completa para terapeutas, psicólogos e educadores que desejam 
              utilizar a poesia como ferramenta de intervenção emocional e cognitiva.
            </p>
            <div className="poem-block max-w-sm mx-auto mb-8">
              <p className="poem-text text-sm text-muted-foreground">
                A arte de transformar palavras<br />
                em portais de liberdade interior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {[
              { icon: <Clock className="h-6 w-6 text-primary" />, label: 'Duração', value: '6 semanas — 30 horas' },
              { icon: <Users className="h-6 w-6 text-primary" />, label: 'Público', value: 'Terapeutas, psicólogos, artistas e cuidadores' },
              { icon: <GraduationCap className="h-6 w-6 text-primary" />, label: 'Certificação', value: 'Formação Completa em PCH' },
            ].map((item, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-5 text-center space-y-2">
                  <div className="flex justify-center">{item.icon}</div>
                  <h3 className="font-heading font-semibold text-foreground">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Objetivo */}
          <Card className="mb-16 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Objetivo da Formação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Capacitar profissionais a utilizar a poesia como ferramenta hipnótica de intervenção 
                emocional e cognitiva, unindo metáforas, técnicas de hipnose leve e práticas narrativas. 
                Ao final, o aluno será capaz de planejar e conduzir sessões terapêuticas completas 
                usando o protocolo P.A.D.H., criando poemas terapêuticos personalizados e aplicando 
                as 7 ferramentas da PCH com segurança e sensibilidade.
              </p>
            </CardContent>
          </Card>

          {/* Módulos */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2 font-medium">Programa</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Módulos da Formação</h2>
            </div>
            <div className="space-y-4">
              {modulos.map((modulo) => (
                <Card key={modulo.numero} className="border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-heading text-lg font-bold flex-shrink-0">
                        {modulo.numero}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-semibold text-foreground">{modulo.titulo}</h3>
                          <Badge variant="outline" className="text-xs border-primary/20 text-muted-foreground">
                            {modulo.duracao}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{modulo.descricao}</p>
                        <div className="flex flex-wrap gap-2">
                          {modulo.topicos.map((topico, j) => (
                            <span key={j} className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
                              {topico}
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

          {/* Materiais */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Materiais Incluídos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {[
                    "Apostila completa com espaço para reflexão",
                    "Áudios guiados com leitura de indução poética",
                    "Cartas poéticas — mini baralho simbólico",
                    "Diário de Poesia Terapêutica",
                    "Certificado de Formação em PCH"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Formato</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {[
                    { icon: <Brain className="h-4 w-4" />, text: "Aulas síncronas + grupo de suporte" },
                    { icon: <Target className="h-4 w-4" />, text: "Exercícios práticos entre encontros" },
                    { icon: <Users className="h-4 w-4" />, text: "Plantões poéticos para dúvidas e prática" },
                    { icon: <GraduationCap className="h-4 w-4" />, text: "Sessão de leitura pública final" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark px-8">
              <GraduationCap className="mr-2 h-5 w-5" />
              Inscrever-se na Formação
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Formacao;
