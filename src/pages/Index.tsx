import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Feather,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { usePageLoading } from "@/hooks/usePageLoading";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import SEOHead from "@/components/seo/SEOHead";
import { pagesSEO } from "@/lib/seo-config";
import TextReader from "@/components/ui/text-reader";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/ui/Logo";

const DeferredPageLayout = lazy(() => import("@/components/layout/PageLayout"));
const DeferredUserWorkspace = lazy(() => import("@/components/dashboard/UserWorkspace"));
const DeferredFloatingParticles = lazy(() =>
  import("@/components/effects/FloatingParticles").then(({ FloatingParticles }) => ({
    default: FloatingParticles,
  })),
);

const DEBUG_FLICKER = import.meta.env.DEV;
const flickerLog = (label: string, extra?: Record<string, unknown>) => {
  if (!DEBUG_FLICKER) return;
  console.log(
    `[flicker] +${Math.round(performance.now())}ms · ${label}`,
    extra ?? "",
  );
};

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    flickerLog("Index mount · checkingSession=true → render PageSkeleton");
    let mounted = true;

    const checkSession = async () => {
      const t0 = performance.now();
      try {
        const { data: { session } } = await supabase.auth.getSession();
        flickerLog("getSession resolved", {
          ms: Math.round(performance.now() - t0),
          hasSession: !!session,
        });
        if (mounted) {
          setSession(session);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        if (mounted) {
          setCheckingSession(false);
          flickerLog("checkingSession=false → will render PageLayout/UserWorkspace or public Home");
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      flickerLog("onAuthStateChange", { event: _event, hasSession: !!session });
      if (mounted) {
        setSession(session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (checkingSession || session) return;

    const canUseDecorativeMotion =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canUseDecorativeMotion) return;

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const revealOnDesktop = () => {
      if (
        window.matchMedia("(min-width: 768px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setShowParticles(true);
      }
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(revealOnDesktop, { timeout: 2500 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(revealOnDesktop, 1800);
    return () => window.clearTimeout(handle);
  }, [checkingSession, session]);


  const isLoading = usePageLoading(150);
  if (checkingSession) return <PageSkeleton />;

  if (session) {
    return (
      <DeferredPageLayout
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
          <DeferredUserWorkspace />
        </div>
      </DeferredPageLayout>
    );
  }

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pagesSEO.home.title}
        description={pagesSEO.home.description}
        path={pagesSEO.home.path}
      />
      <Header />
      <main>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {showParticles && (
          <Suspense fallback={null}>
            <DeferredFloatingParticles />
          </Suspense>
        )}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-glow" />
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative container mx-auto px-6 md:px-8 py-24 z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up space-y-10">
            {/* Selected PADH brand mark */}
            <div className="mx-auto w-32 h-32 md:w-40 md:h-40 mb-4 flex items-center justify-center drop-shadow-lg" aria-label="PADH — Poesia Aplicada ao Desenvolvimento Humano">
              <Logo size="xl" className="w-full h-full" />
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
              O <strong className="text-foreground">PADH</strong> organiza o estudo da metodologia <strong className="text-foreground">PCH</strong> em uma trilha progressiva, com fundamentos, práticas e módulos conectados.
            </p>
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark text-base px-8 shadow-module-glow">
                <Link to="/login?mode=signup&next=%2Fformacao%2Fmodulo%2Fmodulo-1">
                  Criar conta e iniciar os estudos <GraduationCap className="ml-2 spiritual-icon" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-primary/30 text-foreground hover:bg-primary/5 text-base px-8">
                <Link to="/formacao">
                  Ver a trilha de módulos
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              A estrutura é pública; o conteúdo completo abre após criar conta.
            </p>
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

      {/* Public preview: deeper study is available after account access */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 gradient-warm" />
        <div className="relative container mx-auto max-w-6xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label">Comece por aqui</p>
            <h2 className="section-title">Uma amostra. Um caminho para aprofundar.</h2>
            <p className="section-subtitle mt-4">Conheça os fundamentos da Poesia Cognitiva Hipnótica e explore uma trilha de estudos que conecta linguagem, reflexão e prática. Os materiais completos, exercícios guiados e ferramentas detalhadas ficam na área de membros.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="glass-card rounded-2xl border border-border/50 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><BookOpen className="h-5 w-5" /></div>
              <h3 className="mb-2 text-lg font-semibold">Fundamentos</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">Uma visão inicial dos conceitos, da estrutura de estudo e dos cuidados de aplicação.</p>
            </div>
            <div className="glass-card rounded-2xl border border-border/50 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Feather className="h-5 w-5" /></div>
              <h3 className="mb-2 text-lg font-semibold">Ferramentas poéticas</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">Conheça as propostas e seus objetivos. Os roteiros completos e exercícios ficam reservados aos membros.</p>
            </div>
            <div className="glass-card rounded-2xl border border-border/50 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><GraduationCap className="h-5 w-5" /></div>
              <h3 className="mb-2 text-lg font-semibold">Cursos e vídeos</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">Acesse a trilha de formação e acompanhe conteúdos complementares na área de membros.</p>
            </div>
          </div>
          <div className="mt-10 rounded-3xl border border-primary/20 bg-card/70 p-8 text-center md:p-12">
            <h3 className="text-2xl font-bold md:text-3xl">Quer acessar o conteúdo completo?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Crie sua conta gratuita ou entre na sua conta para continuar o estudo, acessar as ferramentas e acompanhar a formação.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg"><Link to="/login?mode=signup">Criar minha conta <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/login">Já tenho conta — entrar</Link></Button>
            </div>
          </div>
        </div>
      </section>
      </main>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
};

export default Index;
