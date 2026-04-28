import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { MODULOS } from "@/lib/dados-clinicos";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  Info,
  Plus,
  ChevronRight,
  Library,
  Compass,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Trophy,
  Target,
  Clock,
  CreditCard,
  ShoppingBag,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import NetflixCarousel from "@/components/ui/NetflixCarousel";
import StreamingCard from "@/components/ui/StreamingCard";
import SupabaseConfigBanner from "@/components/dashboard/SupabaseConfigBanner";
import SyncStatusIndicator from "@/components/dashboard/SyncStatusIndicator";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { supabaseConfig } from "@/integrations/supabase/config";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { jornada } = useJornada();
  const { progress, isModuleUnlocked } = useCourseProgress();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sim = !!localStorage.getItem("padh_simulated_user");
    setIsAuthed(sim);
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthed(!!session || !!localStorage.getItem("padh_simulated_user"));
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthed(!!session || !!localStorage.getItem("padh_simulated_user"));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const goTo = (path: string, label: string) => {
    setNavigatingTo(path);
    toast.loading(`Abrindo ${label}...`, { id: "nav-toast", duration: 1500 });
    navigate(path);
  };

  const scrollToHistory = () => {
    document.getElementById("episode-history")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogout = async () => {
    localStorage.removeItem("padh_simulated_user");
    if (supabaseConfig.isConfigured) {
      await supabase.auth.signOut();
    }
    toast.success("Sessão encerrada.");
    navigate("/");
  };

  const findNextSession = () => {
    for (const fase of JORNADA_DATA) {
      for (const sessao of fase.sessoes) {
        if (!jornada.completedSessions.includes(sessao.id)) {
          return {
            faseId: fase.id,
            sessaoId: sessao.id,
            titulo: sessao.titulo,
            descricao: sessao.descricao,
            faseTitulo: fase.titulo,
            faseNumero: fase.numero
          };
        }
      }
    }
    return null;
  };

  const nextSession = findNextSession();
  const featured = nextSession || {
    titulo: "Jornada Concluída!",
    descricao: "Você completou todas as etapas principais. Que tal revisar suas ferramentas favoritas?",
    faseTitulo: "Plenitude",
    faseId: "",
    sessaoId: ""
  };

  const diagnosisLabel = progress.diagnosisResult || "Não realizado";

  return (
    <PageLayout
      seo={{
        title: "Home — P.A.D.H. Streaming",
        description: "Explore sua jornada terapêutica como uma série de transformação.",
        path: "/dashboard",
      }}
    >
      <div className="flex flex-col min-h-screen bg-background -mt-16">
        {/* Hero Banner */}
        <section className="relative w-full aspect-[21/9] min-h-[500px] flex items-center overflow-hidden">
          {/* Background Image / Gradient */}
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
             <div className="absolute inset-0 bg-primary/5 animate-pulse" />
             <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-secondary/10 flex items-center justify-center opacity-40">
                <div className="text-[20vw] font-heading font-black opacity-5 select-none tracking-tighter">P.A.D.H.</div>
             </div>
          </div>

          <div className="relative z-20 container mx-auto px-6 md:px-12 pt-20">
             <div className="max-w-2xl space-y-6 animate-fade-in-up">
                <div className="flex items-center gap-3">
                   <Badge variant="spiritual" className="spiritual-chip-amber px-3 py-1 gap-2">
                      <Sparkles className="w-3 h-3" /> Original P.A.D.H.
                   </Badge>
                   {featured.faseTitulo && (
                     <span className="text-sm font-bold text-primary tracking-widest uppercase">
                        {featured.faseTitulo}
                     </span>
                   )}
                </div>
                
                <h1 className="text-4xl md:text-7xl font-heading font-black text-white leading-[0.9] tracking-tighter">
                   {featured.titulo}
                </h1>
                
                <p className="text-lg text-muted-foreground line-clamp-3 max-w-lg leading-relaxed">
                   {featured.descricao}
                </p>

                <div className="flex items-center gap-4 pt-4">
                   <Button 
                    size="lg" 
                    className="gap-2 px-8 h-12 text-lg shadow-xl"
                    onClick={() => featured.faseId && navigate(`/jornada/${featured.faseId}/${featured.sessaoId}`)}
                   >
                      <Play className="w-5 h-5 fill-current" /> Assistir Agora
                   </Button>
                   <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-2 px-8 h-12 text-lg bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/10"
                   >
                      <Info className="w-5 h-5" /> Mais Informações
                   </Button>
                </div>
             </div>
          </div>
        </section>

        {/* Floating Toolbar (Discreet) */}
        <div className="sticky top-16 z-40 w-full px-6 md:px-12 py-4 flex justify-between items-center bg-background/0 transition-all duration-300">
           <div className="flex gap-4 items-center">
              <SyncStatusIndicator />
              <NotificationCenter />
           </div>
           <div className="flex gap-2 md:gap-4 flex-wrap">
              <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white">
                <Link to="/recursos-clinicos"><Library className="w-4 h-4" /> Biblioteca</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                <Link to="/planos"><CreditCard className="w-4 h-4" /> Planos</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                <Link to="/meu-produto"><ShoppingBag className="w-4 h-4" /> Meu Produto</Link>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
                <LogOut className="w-4 h-4" /> Sair
              </Button>
           </div>
        </div>

        {/* Content Rows */}
        <div className="space-y-8 pb-20 -mt-20 md:-mt-32 relative z-30">
          
          {/* Row: Meus Favoritos */}
          {jornada.favorites && jornada.favorites.length > 0 && (
            <NetflixCarousel title="Minha Lista">
               {jornada.favorites.map((favId) => {
                 // Try to find if it's a tool or a session
                 const isTool = favId.startsWith('/');
                 const sessao = JORNADA_DATA.flatMap(f => f.sessoes).find(s => s.id === favId);
                 
                 if (isTool) {
                    const toolName = favId.split('/').pop()?.replace(/-/g, ' ');
                    return (
                      <StreamingCard 
                        key={favId}
                        title={toolName || "Ferramenta"}
                        subtitle="Ferramenta"
                        onClick={() => navigate(favId)}
                        type="episode"
                      />
                    );
                 }
                 
                 if (sessao) {
                    const fase = JORNADA_DATA.find(f => f.sessoes.some(s => s.id === sessao.id));
                    return (
                      <StreamingCard 
                        key={favId}
                        title={sessao.titulo}
                        subtitle={fase?.titulo}
                        onClick={() => navigate(`/jornada/${fase?.id}/${sessao.id}`)}
                        type="series"
                      />
                    );
                 }
                 
                 return null;
               })}
            </NetflixCarousel>
          )}

          {/* Row: Continuar de Onde Parei */}
          {nextSession && (
            <NetflixCarousel title="Continuar de Onde Parei">
               <StreamingCard 
                title={nextSession.titulo}
                subtitle={`Fase ${nextSession.faseNumero}: ${nextSession.faseTitulo}`}
                progress={jornada.completedExercises.length > 0 ? 35 : 0} // Simulated progress
                onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}
                type="series"
               />
               {/* Show a few more from history if they exist */}
            </NetflixCarousel>
          )}

          {/* Row: Jornadas Terapêuticas (Séries) */}
          <NetflixCarousel title="Jornadas de Transformação">
             {JORNADA_DATA.map((fase, idx) => {
               const isUnlocked = idx === 0 || JORNADA_DATA[idx-1].sessoes.every(s => jornada.completedSessions.includes(s.id));
               const completed = fase.sessoes.filter(s => jornada.completedSessions.includes(s.id)).length;
               const percent = Math.round((completed / fase.sessoes.length) * 100);
               
               return (
                 <StreamingCard 
                  key={fase.id}
                  title={fase.titulo}
                  subtitle={`Temporada ${fase.numero}`}
                  progress={percent}
                  isLocked={!isUnlocked}
                  isCompleted={percent === 100}
                  onClick={() => {
                    const next = fase.sessoes.find(s => !jornada.completedSessions.includes(s.id)) || fase.sessoes[0];
                    navigate(`/jornada/${fase.id}/${next.id}`);
                  }}
                  type="series"
                 />
               );
             })}
          </NetflixCarousel>

          {/* Row: Módulos de Formação (Educação) */}
          <NetflixCarousel title="Formação P.A.D.H. (Expertise)">
             {MODULOS.map((modulo, idx) => {
               const isUnlocked = isModuleUnlocked(idx);
               const isCompleted = progress.completedModules.includes(modulo.id);
               const activitiesCount = progress.completedActivities[modulo.id]?.length || 0;
               const percent = Math.round((activitiesCount / modulo.atividades.length) * 100);

               return (
                 <StreamingCard 
                  key={modulo.id}
                  title={modulo.titulo}
                  subtitle={`Pilar ${modulo.pilar}: ${modulo.pilarNome}`}
                  progress={percent}
                  isLocked={!isUnlocked}
                  isCompleted={isCompleted}
                  onClick={() => navigate("/curso-padh")}
                  type="series"
                 />
               );
             })}
          </NetflixCarousel>

          {/* Row: Ferramentas (Shorts) */}
          <NetflixCarousel title="Ferramentas Rápidas (Intervenções)">
             {[
               { title: "Poema-Funil", path: "/ferramentas/poema-funil", tag: "Foco" },
               { title: "Verso-Gatilho", path: "/ferramentas/verso-gatilho", tag: "Ação" },
               { title: "Poemadiagnóstico", path: "/ferramentas/poemadiagnostico", tag: "Insights" },
               { title: "Voz Interna", path: "/ferramentas/caderno-voz-interna", tag: "Reflexão" },
               { title: "Encenação Poética", path: "/ferramentas/encenacao-poetica", tag: "Corpo" },
               { title: "Ritual do Silêncio", path: "/ferramentas/ritual-silencio", tag: "Paz" },
               { title: "Poesia Hipnótica", path: "/ferramentas/poesia-hipnotica", tag: "Transe" },
             ].map((tool, idx) => (
               <StreamingCard 
                key={idx}
                title={tool.title}
                subtitle={tool.tag}
                onClick={() => navigate(tool.path)}
                type="episode"
               />
             ))}
          </NetflixCarousel>

          {/* Episode History — per-episode status & last response */}
          <section className="container mx-auto px-6 md:px-12 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-heading font-black flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" /> Histórico por Episódio
              </h2>
              <Button asChild variant="link" className="text-primary">
                <Link to="/meu-produto">Ver tudo <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="grid gap-3">
              {JORNADA_DATA.flatMap((fase) =>
                fase.sessoes.map((s, idx) => {
                  const done = jornada.completedSessions.includes(s.id);
                  const sessionResponses = s.exercicios.filter((ex) =>
                    jornada.responses.some((r) => r.exerciseId === ex.id),
                  );
                  const inProgress = !done && sessionResponses.length > 0;
                  const lastResp = jornada.responses
                    .filter((r) => s.exercicios.some((ex) => ex.id === r.exerciseId))
                    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

                  return (
                    <div
                      key={`${fase.id}-${s.id}`}
                      className="bg-card/50 hover:bg-card border border-white/5 rounded-xl p-4 flex items-start gap-4 transition-colors cursor-pointer"
                      onClick={() => navigate(`/jornada/${fase.id}/${s.id}`)}
                    >
                      <div className="text-xl font-heading font-black text-primary/40 w-10 text-center shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs uppercase tracking-wider text-muted-foreground">
                            {fase.titulo}
                          </span>
                          {done ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Concluído
                            </Badge>
                          ) : inProgress ? (
                            <Badge variant="outline" className="text-[10px]">Em andamento</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] text-muted-foreground">
                              <Lock className="w-3 h-3 mr-1" /> Não iniciado
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-bold mt-1 truncate">{s.titulo}</h3>
                        {lastResp && (
                          <p className="mt-2 text-xs text-muted-foreground italic line-clamp-2">
                            "{lastResp.response}"
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                    </div>
                  );
                }),
              )}
            </div>
          </section>

          {/* User Stats & Info Section (Bottom) */}
          <section className="container mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                   <Trophy className="w-5 h-5 text-primary" /> Meu Desempenho
                </h3>
                <div className="bg-card p-6 rounded-2xl border border-white/5 space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Progresso Geral</span>
                      <span className="text-2xl font-black text-primary">{Math.round((progress.completedModules.length / MODULOS.length) * 100)}%</span>
                   </div>
                   <Progress value={(progress.completedModules.length / MODULOS.length) * 100} className="h-2" />
                   <p className="text-xs text-muted-foreground">
                      {progress.completedModules.length} de {MODULOS.length} módulos de formação concluídos.
                   </p>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                   <Target className="w-5 h-5 text-primary" /> Trilhas & Diagnósticos
                </h3>
                <div className="bg-card p-6 rounded-2xl border border-white/5 space-y-2">
                   <div className="text-sm font-bold text-white">Perfil: {diagnosisLabel}</div>
                   <p className="text-xs text-muted-foreground leading-relaxed">
                      Seu perfil atual define as recomendações automáticas da plataforma.
                   </p>
                   <Button variant="link" className="p-0 h-auto text-primary text-xs" onClick={() => navigate("/diagnostico")}>
                      Refazer Diagnóstico <ChevronRight className="w-3 h-3 ml-1" />
                   </Button>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                   <Compass className="w-5 h-5 text-primary" /> Sistema
                </h3>
                <SupabaseConfigBanner />
             </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
