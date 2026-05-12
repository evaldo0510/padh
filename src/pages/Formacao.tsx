import React from "react";
import {
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Brain,
  Target,
  CheckCircle2,
  Award,
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { pagesSEO } from "@/lib/seo-config";
import { MODULOS, PILARES_INFO } from "@/lib/dados-clinicos";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Formacao = () => {
  const heroSection = useScrollAnimation(0.1);
  const pillarsSection = useScrollAnimation(0.15);
  const curriculumSection = useScrollAnimation(0.1);
  const teacherSection = useScrollAnimation(0.15);

  return (
    <PageLayout seo={pagesSEO.formacao} currentPage="Formação em PCH">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-glow" />
        <div 
          ref={heroSection.ref}
          className={`container mx-auto px-6 relative z-10 text-center max-w-4xl transition-all duration-1000 ${
            heroSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 px-4 py-1 animate-pulse">
            <Award className="w-3 h-3 mr-2" /> Certificação Profissional Nível Especialista
          </Badge>
          <h1 className="text-4xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
            Formação em <span className="text-primary italic">PCH</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Domine a <strong className="text-foreground">Poesia Cognitiva Hipnótica</strong> e transforme sua prática clínica com a metodologia que une neurociência e arte.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium mb-12">
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <Clock className="w-4 h-4 text-primary" />
              <span>Carga horária: 40h+</span>
            </div>
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <Users className="w-4 h-4 text-primary" />
              <span>Mentoria Individual e em Grupo</span>
            </div>
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span>Certificado de Terapeuta PCH</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 text-white rounded-full group shadow-lg shadow-primary/20">
              Quero ser um Terapeuta PCH <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 rounded-full border-primary/20 hover:bg-primary/5">
              Baixar Grade Curricular
            </Button>
          </div>
        </div>
      </section>

      {/* Os 4 Pilares P.A.D.H. */}
      <section className="py-24 bg-muted/30 border-y border-border/20">
        <div 
          ref={pillarsSection.ref}
          className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 ${
            pillarsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">A Metodologia</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Os 4 Pilares <span className="text-primary italic">P.A.D.H.</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A estrutura clínica que sustenta a transformação profunda através da palavra.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(PILARES_INFO).map(([key, info]) => (
              <div key={key} className="glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {key}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{info.nome}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{info.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24">
        <div 
          ref={curriculumSection.ref}
          className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 ${
            curriculumSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Currículo Profissional</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold">Grade <span className="text-primary italic">Curricular</span></h2>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/40" />
                <span>8 Módulos</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-secondary/20 border border-secondary/40" />
                <span>Base Científica</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {MODULOS.map((modulo) => (
              <Card key={modulo.id} className="border-border/50 hover:border-primary/20 transition-all duration-300 group overflow-hidden bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-8xl font-heading font-bold">{modulo.numero}</span>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold">
                      Módulo {modulo.numero}
                    </Badge>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider">
                      <Clock className="w-3 h-3" /> {modulo.tempoEstimado} min
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-heading group-hover:text-primary transition-colors">{modulo.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4">
                    "{modulo.foco}"
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-primary" /> O que você vai aprender
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {modulo.atividades.slice(0, 3).map((atv) => (
                          <li key={atv.id} className="text-xs text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary/60 shrink-0" />
                            {atv.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border/30">
                      <h4 className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <Brain className="w-3 h-3 text-primary" /> Base Teórica
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {modulo.teoricos.map((teorico, idx) => (
                          <Badge key={idx} variant="outline" className="text-[10px] border-primary/10 bg-primary/[0.02]">
                            {teorico.nome}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Profile */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div 
          ref={teacherSection.ref}
          className={`container mx-auto px-6 max-w-5xl relative z-10 transition-all duration-1000 ${
            teacherSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
                  alt="Evaldo de Jesus Santana" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-8 glass-card rounded-2xl border border-primary/20 hidden md:block animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Fundador</p>
                    <p className="text-lg font-heading font-bold">Evaldo Santana</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1">Seu Mentor</Badge>
              <h2 className="text-3xl md:text-5xl font-heading font-bold">Evaldo de Jesus <span className="text-primary italic">Santana</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Psicanalista, Hipnoterapeuta e Escritor. Criador da Metodologia PCH, Evaldo dedica sua vida a construir pontes entre a neurociência moderna e a sensibilidade poética.
              </p>
              <div className="space-y-4">
                {[
                  "Autor do Best-seller Prisão Interior",
                  "Mais de 15 anos de prática clínica",
                  "Especialista em Hipnose Ericksoniana",
                  "Pioneiro em Poesia Cognitiva no Brasil"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild variant="link" className="text-primary p-0 h-auto group text-lg">
                <Link to="/sobre">
                  Conheça a história completa <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits / Public Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
            <ShieldCheck className="w-4 h-4" /> Por que se tornar um Terapeuta PCH?
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 leading-tight">Uma ferramenta <span className="text-primary italic">diferenciada</span> no mercado de saúde mental</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: Zap,
                title: "Impacto Imediato",
                desc: "Técnicas que acessam o inconsciente rapidamente, acelerando os resultados terapêuticos."
              },
              {
                icon: Target,
                title: "Rigor Científico",
                desc: "Metodologia embasada em neurociência e nas principais escolas de psicologia do mundo."
              },
              {
                icon: Sparkles,
                title: "Arte e Sensibilidade",
                desc: "Diferencial humanístico que gera uma aliança terapêutica profunda e inabalável."
              },
              {
                icon: ShieldCheck,
                title: "Protocolos Seguros",
                desc: "Passo a passo clínico detalhado para manejar casos complexos com segurança e ética."
              },
              {
                icon: Users,
                title: "Comunidade VIP",
                desc: "Acesso a um grupo exclusivo de profissionais para troca de experiências e supervisão."
              },
              {
                icon: GraduationCap,
                title: "Certificação Oficial",
                desc: "Selo de qualidade PCH reconhecido pela comunidade brasileira de hipnoterapia."
              }
            ].map((benefit, i) => (
              <div key={i} className="space-y-4 p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Vozes da <span className="text-primary italic">Transformação</span></h2>
            <p className="text-muted-foreground">O que dizem os profissionais que já aplicam a PCH em seus consultórios.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dra. Clarice Mendes",
                role: "Psicóloga Clínica",
                text: "A PCH mudou minha forma de atender. Pacientes que estavam estagnados há meses voltaram a fluir através das metáforas poéticas. É revolucionário.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
              },
              {
                name: "Marcos Oliveira",
                role: "Hipnoterapeuta",
                text: "O rigor científico aliado à sensibilidade da poesia cria uma ferramenta de intervenção única. A formação é profunda e extremamente prática.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
              },
              {
                name: "Juliana Costa",
                role: "Arteterapeuta",
                text: "Encontrei na PCH a ponte que faltava entre a técnica e a alma. Evaldo é um mestre generoso e a metodologia é um divisor de águas.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
              }
            ].map((t, i) => (
              <Card key={i} className="border-none shadow-xl bg-background/50 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Star className="w-12 h-12 text-primary fill-primary" />
                </div>
                <CardContent className="p-0 space-y-6">
                  <p className="text-muted-foreground italic leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-primary">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Perguntas <span className="text-primary italic">Frequentes</span></h2>
            <p className="text-muted-foreground">Tire suas dúvidas sobre a Formação em PCH.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "Preciso ser psicólogo para fazer a formação?",
                a: "Não obrigatoriamente. A formação é aberta a terapeutas, educadores, coaches e profissionais que trabalham com desenvolvimento humano. No entanto, o uso clínico rigoroso deve respeitar as regulamentações de cada conselho profissional."
              },
              {
                q: "Como funciona a certificação?",
                a: "Após concluir os 8 módulos e realizar as atividades práticas supervisionadas, você receberá o certificado digital de Especialista em Poesia Cognitiva Hipnótica (PCH)."
              },
              {
                q: "As aulas são gravadas ou ao vivo?",
                a: "A formação combina aulas gravadas de alta qualidade (teoria) com encontros de mentoria e supervisão ao vivo (prática) com o Evaldo Santana."
              },
              {
                q: "Quanto tempo tenho acesso ao curso?",
                a: "O acesso à plataforma e a todos os materiais de apoio é vitalício, permitindo que você revise o conteúdo sempre que precisar."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/30">
                <h3 className="font-heading font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-primary/5 rounded-[4rem] mx-6" />
        <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-8 rotate-3 shadow-xl shadow-primary/30">
            <Star className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Pronto para dar o <span className="text-primary italic">próximo passo</span>?</h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            As vagas para a próxima turma da Formação em PCH são limitadas para garantir a qualidade da supervisão e mentoria.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Button size="lg" className="px-12 py-8 text-xl bg-primary hover:bg-primary/90 text-white rounded-full group shadow-2xl shadow-primary/20 scale-105 hover:scale-110 transition-all">
              Garantir minha vaga na Formação <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Pagamento 100% seguro • Acesso vitalício aos materiais
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Formacao;
