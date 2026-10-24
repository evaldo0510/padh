import React, { useState } from "react";
import {
  GraduationCap,
  BookOpenCheck,
  Timer,
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
  Search,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import { pagesSEO } from "@/lib/seo-config";
import { MODULOS, PILARES_INFO } from "@/lib/dados-clinicos";
import { COMPLEMENTOS_ESTUDO_PCH, ETAPAS_ESTUDO_PCH } from "@/lib/estudo-curricular";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FormacaoStudySignup } from "@/components/sales/FormacaoStudySignup";
import { generateCurriculumPDF } from "@/lib/pdf-utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Formacao = () => {
  const navigate = useNavigate();
  const heroSection = useScrollAnimation(0.1);
  const pillarsSection = useScrollAnimation(0.15);
  const curriculumSection = useScrollAnimation(0.1);
  const teacherSection = useScrollAnimation(0.15);
  const [faqSearch, setFaqSearch] = useState("");
  const { progress } = useCourseProgress();
  const completedModulesCount = MODULOS.filter((modulo) =>
    progress.completedModules.includes(modulo.id),
  ).length;
  const curriculumProgress = Math.round(
    (completedModulesCount / MODULOS.length) * 100,
  );

  const faqs = [
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
    },
    {
      q: "Existe algum pré-requisito técnico?",
      a: "Apenas o desejo de aprofundar na sensibilidade humana e na ciência da palavra. Todo o embasamento técnico é fornecido durante o curso."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <PageLayout seo={pagesSEO.formacao} currentPage="Formação em PCH">
      {/* Hero Section */}
      <section className="relative py-20 md:py-20 lg:py-24 overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Formação em <span className="text-primary italic">PCH</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
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
            <Button size="lg" onClick={() => navigate("/planos?product=formacao")} className="px-8 bg-primary hover:bg-primary/90 text-white rounded-full group shadow-lg shadow-primary/20">
              Quero ser um Terapeuta PCH <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={generateCurriculumPDF} className="px-8 rounded-full border-primary/20 hover:bg-primary/5">
              <Download className="w-4 h-4 mr-2" /> Baixar Grade Curricular
            </Button>
            <Button size="lg" variant="ghost" asChild className="px-8 rounded-full">
              <a href="#trilha-pch">Explorar trilha de estudos <ArrowRight className="ml-2 w-4 h-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* Os 4 Pilares P.A.D.H. */}
      <section className="py-24 lg:py-20 bg-muted/30 border-y border-border/20">
        <div 
          ref={pillarsSection.ref}
          className={`container mx-auto px-6 max-w-6xl lg:max-w-5xl transition-all duration-1000 ${
            pillarsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">A Metodologia</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Os 4 Pilares <span className="text-primary italic">P.A.D.H.</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A estrutura clínica que sustenta a transformação profunda através da palavra.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(PILARES_INFO).map(([key, info]) => (
              <div key={key} className="glass-card p-8 lg:p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all group">
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

      {/* Study Path and Curriculum Section */}
      <section id="trilha-pch" className="py-24 lg:py-20 scroll-mt-24">
        <div 
          ref={curriculumSection.ref}
          className={`container mx-auto px-6 max-w-6xl lg:max-w-5xl transition-all duration-1000 ${
            curriculumSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Trilha de estudos profissional</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Do fundamento à <span className="text-primary italic">integração</span></h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">Os oito módulos mantêm seus nomes e números originais, agora agrupados em etapas para mostrar como os temas se complementam. Esta é uma ordem didática sugerida; os dados dos módulos não declaram pré-requisitos formais entre eles.</p>
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

          <div className="mb-10 rounded-2xl border border-primary/15 bg-primary/[0.03] p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <p className="font-semibold">Progresso da sua formação</p>
              <p className="text-sm text-muted-foreground">{completedModulesCount} de {MODULOS.length} módulos concluídos · {curriculumProgress}%</p>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Progresso da formação PCH"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={curriculumProgress}
            >
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${curriculumProgress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-3">O progresso é salvo neste navegador e não sincroniza entre dispositivos.</p>
          </div>

          <div className="space-y-10">
            {ETAPAS_ESTUDO_PCH.map((etapa) => {
              const modulosDaEtapa = etapa.moduleIds
                .map((moduleId) => MODULOS.find((modulo) => modulo.id === moduleId))
                .filter((modulo): modulo is (typeof MODULOS)[number] => Boolean(modulo));
              const concluidosNaEtapa = modulosDaEtapa.filter((modulo) =>
                progress.completedModules.includes(modulo.id),
              ).length;

              return (
                <section key={etapa.numero} aria-labelledby={`etapa-pch-${etapa.numero}`} className="rounded-3xl border border-border/50 bg-muted/10 p-5 md:p-8 lg:p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge className="bg-primary/10 text-primary border-none">Etapa {etapa.numero}</Badge>
                        <span className="text-xs text-muted-foreground">{concluidosNaEtapa}/{modulosDaEtapa.length} concluídos</span>
                      </div>
                      <h3 id={`etapa-pch-${etapa.numero}`} className="text-2xl md:text-3xl font-heading font-bold">{etapa.titulo}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-3">{etapa.descricao}</p>
                      {etapa.nota && <p className="text-xs text-muted-foreground leading-relaxed mt-3 border-l-2 border-primary/40 pl-3">{etapa.nota}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {modulosDaEtapa.map((modulo) => {
                      const relacionados = (COMPLEMENTOS_ESTUDO_PCH[modulo.id] ?? [])
                        .map((moduleId) => MODULOS.find((item) => item.id === moduleId))
                        .filter((item): item is (typeof MODULOS)[number] => Boolean(item));
                      const isCompleted = progress.completedModules.includes(modulo.id);

                      return (
                        <Link key={modulo.id} to={`/formacao/modulo/${modulo.id}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
                          <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden bg-card/70 backdrop-blur-sm h-full">
                            <CardHeader className="pb-4 relative">
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-8xl lg:text-7xl font-heading font-bold">{modulo.numero}</span>
                              </div>
                              <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold gap-2"><BookOpenCheck className="w-5 h-5" aria-hidden="true" />Módulo {modulo.numero}</Badge>
                                <div className="flex items-center gap-3">
                                  {isCompleted && <span className="text-xs text-primary font-medium inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Concluído</span>}
                                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider"><Timer className="w-4 h-4" aria-hidden="true" /> {modulo.tempoEstimado} min</div>
                                </div>
                              </div>
                              <CardTitle className="text-2xl font-heading group-hover:text-primary transition-colors">{modulo.titulo}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                              <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4">“{modulo.foco}”</p>
                              <div>
                                <h4 className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><Sparkles className="w-3 h-3 text-primary" /> O que você vai aprender</h4>
                                <ul className="grid grid-cols-1 gap-2">
                                  {modulo.atividades.map((atividade) => (
                                    <li key={atividade.id} className="text-xs text-muted-foreground flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-primary/60 shrink-0" />{atividade.label}</li>
                                  ))}
                                </ul>
                              </div>
                              {relacionados.length > 0 && (
                                <p className="text-xs text-muted-foreground border-t border-border/50 pt-4">
                                  <span className="font-semibold text-foreground">Complementa:</span> {relacionados.map((item) => `Módulo ${item.numero} — ${item.titulo}`).join(" · ")}
                                </p>
                              )}
                              <div className="pt-1 flex justify-end">
                                <span className="text-xs text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Estudar módulo <ArrowRight className="w-3 h-3" /></span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/40 p-5">
            <div>
              <p className="font-semibold">Quer consultar o guia técnico completo?</p>
              <p className="text-sm text-muted-foreground mt-1">A Formação profissional, a Jornada pessoal e as Ferramentas permanecem em áreas distintas.</p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/curso-padh"><BookOpen className="w-4 h-4 mr-2" />Abrir guia técnico</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Teacher Profile */}
      <section className="py-24 lg:py-20 bg-muted/30 relative overflow-hidden">
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

      {/* Study account entry */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="min-w-0 space-y-8">
              <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight">Sua trilha de estudos começa <span className="text-primary italic">aqui</span>.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Conheça a estrutura dos oito módulos e, quando quiser aprofundar, crie uma conta no PADH para abrir o conteúdo de estudo completo.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="font-medium">Oito módulos organizados em sequência didática</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="font-medium">Pré-requisitos e complementos indicados ao longo da trilha</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="font-medium">Conta gratuita para entrar nos módulos de estudo</p>
                </div>
              </div>
            </div>
            <FormacaoStudySignup />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Perguntas <span className="text-primary italic">Frequentes</span></h2>
            <p className="text-muted-foreground mb-8">Tire suas dúvidas sobre a Formação em PCH.</p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                aria-label="Buscar dúvida"
                placeholder="Buscar dúvida..." 
                className="pl-10 h-12 bg-muted/50 border-border/50 focus:border-primary/50"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
              />
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-2xl px-6 bg-card/30 overflow-hidden">
                <AccordionTrigger className="text-left font-heading font-bold text-lg hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
            {filteredFaqs.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Nenhuma pergunta encontrada para sua busca.</p>
            )}
          </Accordion>
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
            <Button size="lg" onClick={() => navigate("/planos?product=formacao")} className="max-w-full h-auto min-h-14 whitespace-normal px-6 md:px-12 py-5 text-base md:text-xl bg-primary hover:bg-primary/90 text-primary-foreground rounded-full group shadow-2xl shadow-primary/20 transition-all">
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
