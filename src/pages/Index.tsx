import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import {
  scientificStudies,
  getAllCategories,
  getAllYears,
} from "@/lib/scientific-studies";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Sparkles,
  Star,
  Heart,
  Users,
  GraduationCap,
  Feather,
  Quote,
  FlaskConical,
  Target,
} from "lucide-react";
import PoemadiagnosticoInterativo from "@/components/sections/PoemadiagnosticoInterativo";
import { Link, useNavigate } from "react-router-dom";
const heroImage = "/hero-padh.webp";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { usePageLoading } from "@/hooks/usePageLoading";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import SEOHead from "@/components/seo/SEOHead";
import { pagesSEO } from "@/lib/seo-config";
import TextReader from "@/components/ui/text-reader";
import StreamingHome from "@/components/dashboard/StreamingHome";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [session, setSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  
  useEffect(() => {
    let mounted = true;
    
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(session);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const aboutSection = useScrollAnimation(0.15);
  const toolsSection = useScrollAnimation(0.15);
  const pchSection = useScrollAnimation(0.15);
  const scienceSection = useScrollAnimation(0.15);
  const journeySection = useScrollAnimation(0.15);
  const testimonialsSection = useScrollAnimation(0.15);
  
  const ferramentas = [
    {
      icon: <BookOpen className="spiritual-icon spiritual-icon-lg" />,
      title: "Livro-Curso",
      desc: "Mergulhe na teoria e prática da PCH com exercícios guiados que transformam a leitura em experiência terapêutica.",
      link: "/livro-curso",
    },
    {
      icon: <GraduationCap className="spiritual-icon spiritual-icon-lg" />,
      title: "Formação PCH",
      desc: "Capacitação completa para terapeutas e educadores que desejam usar a Poesia Cognitiva Hipnótica.",
      link: "/formacao",
    },
    {
      icon: <Target className="spiritual-icon spiritual-icon-lg" />,
      title: "Curso PCH",
      desc: "O manual técnico completo da metodologia: base teórica, neurociência e os pilares estruturais.",
      link: "/curso-padh",
    },
    {
      icon: <Feather className="spiritual-icon spiritual-icon-lg" />,
      title: "8 Ferramentas PCH",
      desc: "Do Poema-Funil à Poesia Hipnótica — 8 instrumentos vivos para transformação interior através da poesia.",
      link: "/ferramentas",
    },
    {
      icon: <Brain className="spiritual-icon spiritual-icon-lg" />,
      title: "Mapa Cerebral",
      desc: "Descubra como cada verso ativa áreas específicas do cérebro — da amígdala ao córtex pré-frontal.",
      link: "/mapa-cerebral",
    },
    {
      icon: <Star className="spiritual-icon spiritual-icon-lg" />,
      title: "Aula Exclusiva",
      desc: "Uma aula teórico-vivencial sobre a neurociência da leitura terapêutica e a abordagem PCH.",
      link: "/aula-exclusiva",
    },
  ];

  const isLoading = usePageLoading(150);
  if (isLoading || checkingSession) return <PageSkeleton />;

  if (session) {
    return (
      <PageLayout
        seo={{
          title: "Home — Jornada PADH",
          description: "Sua jornada contínua de transformação.",
          path: "/",
        }}
        currentPage="Início"
        showBackButton={false}
        hideHeader={false}
      >
        <div className="min-h-screen bg-[#050505]">
          <StreamingHome />
        </div>
      </PageLayout>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pagesSEO.home.title}
        description={pagesSEO.home.description}
        path={pagesSEO.home.path}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <FloatingParticles />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-glow" />
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative container mx-auto px-6 md:px-8 py-24 z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up space-y-10">
            {/* Hero Image */}
            <div className="mx-auto w-32 h-32 md:w-40 md:h-40 mb-4">
              <img
                src={heroImage}
                alt="PCH — Poesia Cognitiva Hipnótica"
                className="w-full h-full object-contain drop-shadow-lg"
                fetchpriority="high"
                decoding="async"
              />
            </div>
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <Feather className="spiritual-icon spiritual-icon-sm" /> Poesia como ciência da transformação
            </div>
            {/* Title */}
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter">
              <span className="text-foreground">Poesia Cognitiva</span> <br />
              <span className="text-primary italic">Hipnótica (PCH)</span>
            </h1>
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A metodologia <strong className="text-foreground">PCH</strong> une neurociência, hipnose ericksoniana e linguagem simbólica para criar intervenções terapêuticas que transformam o inconsciente através da beleza da palavra.
            </p>
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/diagnostico">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark text-base px-8 shadow-module-glow">
                  Começar Diagnóstico <Sparkles className="ml-2 spiritual-icon" />
                </Button>
              </Link>
              <Link to="/livro-curso">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/30 text-foreground hover:bg-primary/5 text-base px-8">
                  Ver Livro-Curso
                </Button>
              </Link>
              <Link to="/fundamentacao">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-muted-foreground hover:text-primary text-base px-8">
                  <BookOpen className="w-4 h-4 mr-2" /> Fundamentação Teórica
                </Button>
              </Link>
            </div>
            {/* Poem quote */}
            <div className="pt-8 max-w-lg mx-auto">
              <blockquote className="poem-block">
                <p className="poem-text text-base text-muted-foreground">
                  Quando se olha no espelho,
                  <br /> o que é que você vê?
                  <br /> Eu vi a poesia esperando
                  <br /> do outro lado de mim.
                </p>
                <cite className="text-sm text-primary/70 mt-2 block not-italic">
                  — Evaldo de Jesus Santana, Prisão Interior
                </cite>
              </blockquote>
              <TextReader
                text="Quando se olha no espelho, o que é que você vê? Eu vi a poesia esperando do outro lado de mim."
                label="Ouvir Poema"
                className="mt-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Metodologia Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={aboutSection.ref}
          className={`relative container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            aboutSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="section-header">
              <p className="section-label">A Metodologia</p>
              <h2 className="section-title"> Os 3 Pilares da PCH </h2>
              <p className="section-subtitle">Poesia Cognitiva Hipnótica</p>
              <div className="section-divider" />
            </div>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">P</div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">Poesia</h4>
                      <p className="text-sm text-muted-foreground">O uso da palavra como som, ritmo e imagem para acessar o sentir e contornar as defesas racionais.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">C</div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">Cognitiva</h4>
                      <p className="text-sm text-muted-foreground">Ressignificação de crenças e padrões mentais através da metáfora e da ciência da consciência.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">H</div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">Hipnótica</h4>
                      <p className="text-sm text-muted-foreground">Condução à libertação emocional e ao estado de fluxo transformador através da linguagem sugestiva.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                <p className="text-lg text-foreground font-medium mb-4 italic">
                  "A PCH não é apenas uma técnica, é uma forma de ver o mundo através da lente da sensibilidade científica."
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Criada por Evaldo de Jesus Santana, a metodologia une neurociência, hipnose ericksoniana e linguagem simbólica para criar intervenções precisas que transformam o inconsciente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ferramentas Section */}
      <section className="section-padding border-t border-border/20">
        <div
          ref={toolsSection.ref}
          className={`container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            toolsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="section-header">
              <p className="section-label">Explore</p>
              <h2 className="section-title"> Ferramentas PCH </h2>
              <p className="section-subtitle">Cada ferramenta é um caminho diferente de acesso ao interior — da introspecção guiada à neurociência da leitura poética.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
              {ferramentas.map((tool, i) => (
                <Link key={i} to={tool.link} className="group">
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-medium bg-card/50">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
                          {tool.icon}
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{tool.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                      <div className="flex items-center text-sm text-primary/70 group-hover:text-primary transition-colors pt-1">
                        Explorar <ArrowRight className="ml-1 spiritual-icon spiritual-icon-sm group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="section-padding border-t border-border/20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div
          ref={pchSection.ref}
          className={`relative container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            pchSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="section-label">Fundamentos</p>
            <h2 className="section-title"> Onde a Ciência Encontra a Poesia </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left mt-14">
              {[
                { title: "Neurociência", desc: "Leitura poética estimula áreas cerebrais fundamentais favorecendo regulação emocional.", color: "text-spiritual-indigo" },
                { title: "Hipnose Ericksoniana", desc: "Abordagem indireta e metafórica para transformação inconsciente profunda.", color: "text-spiritual-violet" },
                { title: "Terapia Narrativa", desc: "Transformar relatos de vida em poesia curativa que ressignifica a identidade.", color: "text-spiritual-sage" },
                { title: "Linguística Cognitiva", desc: "Metáforas como estruturas fundamentais do pensamento e da consciência.", color: "text-primary" },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6 space-y-3">
                  <h4 className={`font-heading font-semibold ${item.color}`}>{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="section-padding border-t border-border/20 bg-muted/20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="section-header">
              <p className="section-label">Guia de Jornada</p>
              <h2 className="section-title"> Qual o seu Caminho na PCH? </h2>
              <p className="section-subtitle">Descubra qual formato melhor atende ao seu momento atual de transformação.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "Livro-Curso", subtitle: "A Experiência Pessoal", desc: "Ideal para quem busca autotransformação e vivência prática.", link: "/livro-curso", cta: "Começar Vivência", color: "border-spiritual-sage/30" },
                { title: "Curso PCH", subtitle: "O Manual Técnico", desc: "Repositório completo da metodologia, base teórica e 'como fazer'.", link: "/curso-padh", cta: "Explorar Técnica", color: "border-primary/30", highlight: true },
                { title: "Formação PCH", subtitle: "O Nível Profissional", desc: "Capacitação para terapeutas com certificação e prática clínica.", link: "/formacao", cta: "Tornar-se Terapeuta", color: "border-spiritual-indigo/30" },
              ].map((item, i) => (
                <Card key={i} className={`relative h-full flex flex-col border-2 transition-all duration-300 ${item.color} ${item.highlight ? "bg-card shadow-lg md:scale-105 z-10" : "bg-card/50"}`}>
                  {item.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold py-1 px-3 rounded-full">Mais Completo</div>}
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-2xl font-heading font-bold text-foreground">{item.title}</h3>
                      <p className="text-primary text-sm font-medium">{item.subtitle}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed flex-1">{item.desc}</p>
                    <Link to={item.link} className="block mt-auto">
                      <Button className={`w-full ${item.highlight ? "bg-primary hover:bg-primary-dark" : ""}`} variant={item.highlight ? "default" : "outline"}>
                        {item.cta} <ArrowRight className="ml-2 spiritual-icon" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding border-t border-border/20 bg-muted/10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="section-header text-center">
              <p className="section-label">Dúvidas Frequentes</p>
              <h2 className="section-title">Perguntas sobre a PCH</h2>
              <div className="section-divider mx-auto" />
            </div>
            <div className="space-y-6 mt-12">
              {[
                { q: "O que significa PCH?", a: "PCH significa Poesia Cognitiva Hipnótica, uma metodologia que une arte, ciência e transformação inconsciente." },
                { q: "Para quem é indicada?", a: "Terapeutas, educadores e qualquer pessoa em busca de autoconhecimento profundo." },
                { q: "Como funciona na prática?", a: "Utiliza protocolos estruturados como o Poema-Funil e o Verso-Gatilho para induzir estados de mudança." },
              ].map((faq, i) => (
                <div key={i} className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/20 transition-all">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3 flex gap-3">
                    <span className="text-primary">?</span> {faq.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PoemadiagnosticoInterativo />
      
      {/* Final Quote Section */}
      <section className="section-padding border-t border-border/20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 md:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <Feather className="h-8 w-8 text-primary mx-auto opacity-60" />
            <blockquote className="text-2xl md:text-3xl font-heading italic text-foreground/90 leading-relaxed">
              "Não são os muros que nos prendem,<br />são os espelhos que nos mentem.<br />Quando a poesia limpa o vidro,<br />o reflexo finalmente nos reconhece."
            </blockquote>
            <cite className="text-sm text-primary/70 block not-italic">— Evaldo de Jesus Santana, Prisão Interior</cite>
            <div className="pt-4">
              <Link to="/contato">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark px-8">
                  Comece sua Jornada <ArrowRight className="ml-2 spiritual-icon" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden lg:block">
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default Index;