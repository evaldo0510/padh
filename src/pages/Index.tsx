import React from 'react';
import { scientificStudies, getAllCategories, getAllYears } from '@/lib/scientific-studies';
import { ArrowRight, BookOpen, Brain, Sparkles, Star, Heart, Users, GraduationCap, Feather, Quote, FlaskConical, Target } from 'lucide-react';
import PoemadiagnosticoInterativo from '@/components/sections/PoemadiagnosticoInterativo';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-padh.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FloatingParticles } from '@/components/effects/FloatingParticles';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import SEOHead from '@/components/seo/SEOHead';
import { pagesSEO } from '@/lib/seo-config';
import TextReader from '@/components/ui/text-reader';

const Index = () => {
  const aboutSection = useScrollAnimation(0.15);
  const toolsSection = useScrollAnimation(0.15);
  const pchSection = useScrollAnimation(0.15);
  const scienceSection = useScrollAnimation(0.15);
  const journeySection = useScrollAnimation(0.15);
  const testimonialsSection = useScrollAnimation(0.15);
  const isLoading = usePageLoading(150);

  if (isLoading) return <PageSkeleton />;

  const ferramentas = [
      {
        icon: <BookOpen className="h-5 w-5" />,
        title: 'Livro-Curso',
        desc: 'Mergulhe na teoria e prática da PCH com exercícios guiados que transformam a leitura em experiência terapêutica.',
        link: '/livro-curso',
      },
      {
        icon: <GraduationCap className="h-5 w-5" />,
        title: 'Formação em PCH',
        desc: 'Capacitação completa para terapeutas e educadores que desejam usar poesia como ferramenta clínica.',
        link: '/formacao',
      },
      {
        icon: <Target className="h-5 w-5" />,
        title: 'Curso PCH (Técnica)',
        desc: 'O manual técnico completo da metodologia: base teórica, neurociência e protocolos passo a passo.',
        link: '/curso-pch',
      },
      {
        icon: <Feather className="h-5 w-5" />,
        title: '7 Ferramentas P.A.D.H.',
        desc: 'Do Poema-Funil ao Ritual do Silêncio Poético — 7 instrumentos vivos para transformação interior.',
        link: '/ferramentas',
      },
      {
        icon: <Brain className="h-5 w-5" />,
        title: 'Mapa Cerebral',
        desc: 'Descubra como cada verso ativa áreas específicas do cérebro — da amígdala ao córtex pré-frontal.',
        link: '/mapa-cerebral',
      },
      {
        icon: <Star className="h-5 w-5" />,
        title: 'Aula Exclusiva',
        desc: 'Uma aula teórico-vivencial sobre a neurociência da leitura terapêutica e o mapa cerebral.',
        link: '/aula-exclusiva',
      },
    ];


  return (
    <div className="min-h-screen bg-background">
      <SEOHead description={pagesSEO.home.description} path={pagesSEO.home.path} />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <FloatingParticles />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-glow" />
        
        {/* Subtle orbs */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        
        <div className="relative container mx-auto px-6 md:px-8 py-24 z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up space-y-10">
            {/* Hero Image */}
            <div className="mx-auto w-32 h-32 md:w-40 md:h-40 mb-4">
              <img src={heroImage} alt="P.A.D.H. — Pena dourada transformando-se em conexões neurais" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <Feather className="h-3.5 w-3.5" />
              Poesia como ciência da transformação
            </div>
            
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold leading-[0.95] tracking-tight">
              <span className="text-foreground">Poesia Aplicada ao</span>
              <br />
              <span className="text-primary italic">Desenvolvimento Humano</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A <strong className="text-foreground">Poesia Cognitiva Hipnótica</strong> une neurociência, 
              hipnose ericksoniana e linguagem simbólica para criar intervenções terapêuticas 
              que transformam o inconsciente através da beleza da palavra.
            </p>
            
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/livro-curso">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark text-base px-8">
                  Iniciar Jornada
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/formacao">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/30 text-foreground hover:bg-primary/5 text-base px-8">
                  Conhecer a Formação
                </Button>
              </Link>
            </div>

            {/* Poem quote */}
            <div className="pt-8 max-w-lg mx-auto">
              <blockquote className="poem-block">
                <p className="poem-text text-base text-muted-foreground">
                  Quando se olha no espelho,<br />
                  o que é que você vê?<br />
                  Eu vi a poesia esperando<br />
                  do outro lado de mim.
                </p>
                <cite className="text-sm text-primary/70 mt-2 block not-italic">— Evaldo de Jesus Santana, Prisão Interior</cite>
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

      {/* O que é a P.A.D.H. */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={aboutSection.ref}
          className={`relative container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="section-header">
              <p className="section-label">Sobre a Metodologia</p>
              <h2 className="section-title">
                O que é a Poesia Cognitiva Hipnótica?
              </h2>
              <div className="section-divider" />
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A <strong className="text-foreground">PCH</strong> é uma abordagem inovadora criada por Evaldo de Jesus Santana 
                  que utiliza a poesia como instrumento terapêutico — não apenas como expressão artística, 
                  mas como <em>intervenção neurológica precisa</em>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Ao combinar os ritmos e metáforas da poesia com princípios da hipnose ericksoniana 
                  e da neurociência cognitiva, a PCH cria um caminho de acesso ao inconsciente 
                  que contorna as defesas racionais e permite transformações profundas.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  O protocolo <strong className="text-foreground">P.A.D.H.</strong> (Preparação – Aplicação – 
                  Desenvolvimento – Hibridização) estrutura esse processo em etapas claras, 
                  oferecendo ao terapeuta-poeta um mapa preciso de atuação.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Heart className="h-5 w-5 text-spiritual-rose" />, title: 'Poesia Terapêutica', text: 'Ressignifica sentidos através da beleza e do poder simbólico das palavras.' },
                  { icon: <Brain className="h-5 w-5 text-spiritual-indigo" />, title: 'Neurociência Aplicada', text: 'Cada verso ativa redes neurais específicas — da amígdala ao córtex pré-frontal.' },
                  { icon: <Sparkles className="h-5 w-5 text-primary" />, title: 'Hipnose Ericksoniana', text: 'Linguagem indireta e metafórica que convida o inconsciente a cocriar soluções.' },
                ].map((item, i) => (
                  <Card key={i} className="border-border/50 bg-card/50">
                    <CardContent className="flex gap-4 p-5">
                      <div className="mt-0.5">{item.icon}</div>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ferramentas */}
      <section className="section-padding border-t border-border/20">
        <div
          ref={toolsSection.ref}
          className={`container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            toolsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="section-header">
              <p className="section-label">Explore</p>
              <h2 className="section-title">
                Ferramentas P.A.D.H.
              </h2>
              <p className="section-subtitle">
                Cada ferramenta é um caminho diferente de acesso ao interior — da introspecção guiada 
                à neurociência da leitura poética.
              </p>
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
                        <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                      <div className="flex items-center text-sm text-primary/70 group-hover:text-primary transition-colors pt-1">
                        Explorar <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* A Ciência por Trás */}
      <section className="section-padding border-t border-border/20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div
          ref={pchSection.ref}
          className={`relative container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            pchSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="section-label">Fundamentos</p>
            <h2 className="section-title">
              Onde a Ciência Encontra a Poesia
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left mt-14">
              {[
                { title: 'Neurociência', desc: 'Leitura poética estimula córtex pré-frontal, amígdala e hipocampo — favorecendo regulação emocional e neuroplasticidade.', color: 'text-spiritual-indigo' },
                { title: 'Hipnose Ericksoniana', desc: 'Abordagem indireta e metafórica: terreno fértil para transformação inconsciente e cocriação de soluções.', color: 'text-spiritual-violet' },
                { title: 'Terapia Narrativa', desc: 'O poder das histórias pessoais — transformar relatos de vida em poesia curativa que ressignifica identidade.', color: 'text-spiritual-sage' },
                { title: 'Linguística Cognitiva', desc: 'Metáforas como estruturas cognitivas fundamentais — Lakoff, Johnson e o poder dos signos e símbolos.', color: 'text-primary' },
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

      {/* Base Científica — Destaque */}
      <section className="section-padding border-t border-border/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />
        <div className="absolute top-1/3 left-[5%] w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-[8%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div
          ref={scienceSection.ref}
          className={`relative container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            scienceSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              <FlaskConical className="h-3.5 w-3.5" />
              Base Científica
            </div>
            <h2 className="section-title">
              Poesia que a <span className="text-primary italic">Ciência</span> Comprova
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {scientificStudies.length}+ estudos publicados em revistas como <em>Science</em>, <em>WHO</em> e <em>NeuroImage</em> validam 
              o poder terapêutico da poesia — e fundamentam cada ferramenta P.A.D.H.
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mb-10">
              {[
                { value: `${scientificStudies.length}+`, label: 'Estudos Publicados', sub: 'em revistas internacionais' },
                { value: `${getAllCategories().length}`, label: 'Categorias Científicas', sub: 'de neurociência a resiliência' },
                { value: `${Math.min(...getAllYears())}–${Math.max(...getAllYears())}`, label: 'Período de Pesquisa', sub: `${Math.max(...getAllYears()) - Math.min(...getAllYears())} anos de evidências` },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-xl text-center space-y-2">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-primary">{stat.value}</p>
                  <p className="text-sm font-medium text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>

            <Link to="/ciencia-da-poesia">
              <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/5 px-8">
                Explorar os Estudos Científicos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Qual o seu caminho? - Comparativo */}
      <section className="section-padding border-t border-border/20 bg-muted/20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="section-header">
              <p className="section-label">Guia de Jornada</p>
              <h2 className="section-title">
                Qual o seu <span className="text-primary italic">Caminho</span> na PCH?
              </h2>
              <p className="section-subtitle">
                Embora compartilhem a mesma essência, cada formato oferece uma profundidade diferente. 
                Descubra qual deles melhor atende ao seu momento atual.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Livro-Curso",
                  subtitle: "A Experiência Pessoal",
                  desc: "Ideal para quem busca autotransformação. Um guia prático de exercícios para vivenciar a PCH na própria pele.",
                  features: ["Exercícios Guiados", "Poemas Terapêuticos", "Foco em Autoconhecimento"],
                  link: "/livro-curso",
                  cta: "Começar Vivência",
                  color: "border-spiritual-sage/30"
                },
                {
                  title: "Curso PCH",
                  subtitle: "O Manual Técnico",
                  desc: "O repositório completo da metodologia. Base teórica profunda, neurociência e o 'como fazer' detalhado.",
                  features: ["Base Teórica Completa", "Neurociência Aplicada", "Técnicas de Linguagem"],
                  link: "/curso-pch",
                  cta: "Explorar Técnica",
                  color: "border-primary/30",
                  highlight: true
                },
                {
                  title: "Formação PCH",
                  subtitle: "O Nível Profissional",
                  desc: "Capacitação para terapeutas e educadores. Inclui certificação, supervisão e prática clínica avançada.",
                  features: ["Certificação Profissional", "Supervisão e Prática", "Protocolos de Atendimento"],
                  link: "/formacao",
                  cta: "Tornar-se Terapeuta",
                  color: "border-spiritual-indigo/30"
                }
              ].map((item, i) => (
                <Card key={i} className={`relative h-full flex flex-col border-2 transition-all duration-300 ${item.color} ${item.highlight ? 'bg-card shadow-lg md:scale-105 z-10' : 'bg-card/50'}`}>
                  {item.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold py-1 px-3 rounded-full">
                      Mais Completo
                    </div>
                  )}
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-2xl font-heading font-bold text-foreground">{item.title}</h3>
                      <p className="text-primary text-sm font-medium">{item.subtitle}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed flex-1">
                      {item.desc}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {item.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-foreground/80">
                          <Sparkles className="h-3 w-3 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to={item.link} className="block mt-auto">
                      <Button className={`w-full ${item.highlight ? 'bg-primary hover:bg-primary-dark' : 'variant-outline border-primary/20 hover:bg-primary/5'}`} variant={item.highlight ? 'default' : 'outline'}>
                        {item.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center">
              <h4 className="font-heading font-semibold text-foreground mb-2">💡 Dica de Mestre: A Jornada Integrada</h4>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Para não perder nada, muitos alunos optam pelo <strong className="text-foreground">Combo P.A.D.H.</strong> onde iniciam pela vivência do Livro-Curso, 
                estudam a técnica no Curso PCH e finalizam com a certificação na Formação.{' '}
                <Link to="/combo-padh" className="text-primary hover:underline font-medium">Conheça o Combo P.A.D.H. →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jornada de Transformação (Original) */}
      <section className="py-24 border-t border-border/30">
        <div
          ref={journeySection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            journeySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Metodologia</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              As 4 Fases do P.A.D.H.
            </h2>
            <p className="text-muted-foreground mb-12 max-w-xl mx-auto">

              O protocolo estrutura a intervenção poético-terapêutica em quatro fases claras e progressivas.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                { letter: 'P', name: 'Preparação', desc: 'Criar ambiente seguro, estabelecer rapport e definir intenções claras para a sessão. Avaliar estado emocional e configurar o espaço para a experiência.' },
                { letter: 'A', name: 'Aplicação', desc: 'Uso ativo das ferramentas P.A.D.H. com timing adequado, atenção às respostas verbais e não-verbais, e flexibilidade responsiva.' },
                { letter: 'D', name: 'Desenvolvimento', desc: 'Aprofundamento da experiência, registro de insights, ancoragem dos estados emocionais alcançados e criação de novos significados.' },
                { letter: 'H', name: 'Hibridização', desc: 'Integração com outras abordagens terapêuticas, criação de rituais de continuidade e estabelecimento de práticas para o cotidiano.' },
              ].map((phase, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl border border-border/50 bg-card/30">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-heading text-2xl font-bold flex-shrink-0">
                    {phase.letter}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">{phase.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div
          ref={testimonialsSection.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            testimonialsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Testemunhos</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Vozes Transformadas
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Quem experimenta a Poesia Cognitiva Hipnótica carrega consigo uma marca silenciosa de mudança.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  text: 'Depois de uma sessão com PCH, eu senti que algo dentro de mim se reorganizou. Não foi uma terapia comum — foi como se a poesia tivesse conversado diretamente com a parte de mim que eu escondia.',
                  name: 'Marina S.',
                  role: 'Psicóloga clínica',
                },
                {
                  text: 'A formação em PCH mudou minha forma de atender. Hoje uso poesia nos meus atendimentos e os resultados são incomparáveis. Os pacientes se abrem de maneira que eu nunca vi antes.',
                  name: 'Dr. Rafael M.',
                  role: 'Terapeuta e formando em PCH',
                },
                {
                  text: 'Li o livro-curso numa fase muito difícil da minha vida. Cada capítulo parecia escrito para mim. A poesia chegou onde anos de terapia convencional não conseguiram chegar.',
                  name: 'Carla T.',
                  role: 'Leitora e praticante',
                },
                {
                  text: 'O Mapa Cerebral foi uma revelação. Entender como cada verso ativa áreas do meu cérebro me deu uma nova perspectiva sobre o que significa "ler com o corpo inteiro".',
                  name: 'Prof. Luciana B.',
                  role: 'Educadora e pesquisadora',
                },
                {
                  text: 'Participei da aula exclusiva e foi transformador. A experiência vivencial da PCH transcende qualquer explicação teórica — você precisa sentir para compreender.',
                  name: 'André K.',
                  role: 'Estudante de psicologia',
                },
                {
                  text: 'A hibridização da PCH com a minha prática de meditação criou uma sinergia que eu não esperava. Meus alunos relatam experiências mais profundas e duradouras.',
                  name: 'Mestra Helena R.',
                  role: 'Instrutora de meditação',
                },
              ].map((t, i) => (
                <Card key={i} className="border-border/50 bg-card/50 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <Quote className="h-5 w-5 text-primary/40" />
                    <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                    <div className="pt-2 border-t border-border/30">
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PoemadiagnosticoInterativo />

      {/* Poem CTA */}
      <section className="py-24 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <Feather className="h-8 w-8 text-primary mx-auto opacity-60" />
            <blockquote className="text-2xl md:text-3xl font-heading italic text-foreground/90 leading-relaxed">
              "Não são os muros que nos prendem,<br />
              são os espelhos que nos mentem.<br />
              Quando a poesia limpa o vidro,<br />
              o reflexo finalmente nos reconhece."
            </blockquote>
            <cite className="text-sm text-primary/70 block not-italic">— Evaldo de Jesus Santana, Prisão Interior</cite>
            <div className="pt-4">
              <Link to="/contato">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark px-8">
                  Comece sua Jornada
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
