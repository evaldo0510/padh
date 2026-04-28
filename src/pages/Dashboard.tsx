import React, { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { MODULOS } from "@/lib/dados-clinicos";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  CircleDashed,
  Circle,
  RefreshCw,
  ArrowDownUp,
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
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";

type EpisodeProgressRow = {
  session_id: string;
  phase_id: string;
  status: string;
  completed_at: string | null;
  updated_at?: string | null;
};

type FilterMode = "all" | "completed" | "in_progress" | "not_started";
type SortMode = "default" | "status" | "recent";
const PAGE_SIZE = 8;

const Dashboard = () => {
  const { jornada } = useJornada();
  const { progress, isModuleUnlocked } = useCourseProgress();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const [remoteProgress, setRemoteProgress] = useState<EpisodeProgressRow[]>([]);
  const [filter, setFilter] = useState<FilterMode>("all");
  const [sort, setSort] = useState<SortMode>("default");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);
  const [totalRemote, setTotalRemote] = useState<number | null>(null);
  const [lastSyncAt, setLastSyncAt] = useState<Date | null>(null);
  const [recentlyChanged, setRecentlyChanged] = useState<Set<string>>(new Set());
  const prevSnapshotRef = React.useRef<Map<string, string>>(new Map());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clear "navigating" state whenever the user lands back on this route
  useEffect(() => {
    setNavigatingTo(null);
    toast.dismiss("nav-toast");
  }, [location.pathname]);

  // Optimized fetch — server-side filter, sort, and pagination
  const loadProgress = React.useCallback(
    async (silent = false) => {
      if (!isAuthenticated || !user) {
        setRemoteProgress([]);
        setTotalRemote(null);
        setLoadingProgress(false);
        setProgressError(null);
        return;
      }
      if (!silent) setLoadingProgress(true);
      setProgressError(null);
      try {
        let query = supabase
          .from("episode_progress")
          .select("session_id,phase_id,status,completed_at,updated_at", { count: "exact" })
          .eq("user_id", user.id);
        if (filter === "completed") query = query.eq("status", "completed");
        else if (filter === "in_progress") query = query.eq("status", "in_progress");
        // Sort server-side when possible
        if (sort === "recent") query = query.order("updated_at", { ascending: false });
        else if (sort === "status") query = query.order("status", { ascending: true });
        else query = query.order("phase_id", { ascending: true }).order("session_id", { ascending: true });
        // Server-side pagination only when filter targets remote-only statuses
        const useServerPagination = filter === "completed" || filter === "in_progress";
        if (useServerPagination) {
          query = query.range(0, visibleCount - 1);
        }
        const { data, error, count } = await query;
        if (error) throw error;
        if (data) {
          setRemoteProgress(data as EpisodeProgressRow[]);
          setTotalRemote(typeof count === "number" ? count : null);

          // Detect recently changed sessions (status diff vs previous snapshot)
          const newChanged = new Set<string>();
          const newSnap = new Map<string, string>();
          (data as EpisodeProgressRow[]).forEach((r) => {
            newSnap.set(r.session_id, r.status);
            const prev = prevSnapshotRef.current.get(r.session_id);
            if (prev !== undefined && prev !== r.status) newChanged.add(r.session_id);
          });
          prevSnapshotRef.current = newSnap;
          if (newChanged.size > 0) {
            setRecentlyChanged((prev) => {
              const next = new Set(prev);
              newChanged.forEach((id) => next.add(id));
              return next;
            });
            // Auto-clear glow after 4s
            window.setTimeout(() => {
              setRecentlyChanged((prev) => {
                const next = new Set(prev);
                newChanged.forEach((id) => next.delete(id));
                return next;
              });
            }, 4000);
          }

          setLastSyncAt(new Date());
        }
      } catch (e: any) {
        console.error("loadProgress error", e);
        setProgressError(e?.message || "Falha ao carregar progresso.");
      } finally {
        setLoadingProgress(false);
      }
    },
    [isAuthenticated, user, filter, sort, visibleCount],
  );

  useEffect(() => {
    let cancelled = false;
    loadProgress().catch(() => {
      if (!cancelled) setLoadingProgress(false);
    });
    return () => {
      cancelled = true;
    };
  }, [loadProgress]);

  // Realtime: refresh on any change to this user's episode_progress
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const channel = supabase
      .channel(`dashboard-progress-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "episode_progress", filter: `user_id=eq.${user.id}` },
        () => loadProgress(true),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, user, loadProgress]);

  const handleReload = async () => {
    setReloading(true);
    await loadProgress(true);
    setReloading(false);
    toast.success("Progresso atualizado.");
  };

  const goTo = (path: string, label: string) => {
    setNavigatingTo(path);
    toast.loading(`Abrindo ${label}...`, { id: "nav-toast", duration: 1200 });
    // Safety: clear flag if route doesn't change for any reason
    window.setTimeout(() => setNavigatingTo(null), 1500);
    navigate(path);
  };

  const scrollToHistory = () => {
    document.getElementById("episode-history")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogout = async () => {
    await signOut();
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
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-primary"
                onClick={scrollToHistory}
              >
                <Clock className="w-4 h-4" /> Episódios
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={navigatingTo === "/planos"}
                className="gap-2 text-muted-foreground hover:text-primary"
                onClick={() => goTo("/planos", "Planos")}
              >
                <CreditCard className="w-4 h-4" /> Planos
              </Button>
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={navigatingTo === "/meu-produto"}
                  className="gap-2 text-muted-foreground hover:text-primary"
                  onClick={() => goTo("/meu-produto", "Meu Produto")}
                >
                  <ShoppingBag className="w-4 h-4" /> Meu Produto
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-primary"
                  onClick={() => goTo("/login", "Entrar")}
                >
                  <ShoppingBag className="w-4 h-4" /> Entrar
                </Button>
              )}
              {isAuthenticated && (
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" /> Sair
                </Button>
              )}
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
          <EpisodeHistorySection
            navigate={navigate}
            jornada={jornada}
            remoteProgress={remoteProgress}
            isAuthenticated={isAuthenticated}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            visibleCount={visibleCount}
            setVisibleCount={setVisibleCount}
            loading={loadingProgress}
            reloading={reloading}
            onReload={handleReload}
          />

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

// ===== Episode History (with summary, filters, sort, pagination) =====
interface EpisodeHistoryProps {
  navigate: ReturnType<typeof useNavigate>;
  jornada: ReturnType<typeof useJornada>["jornada"];
  remoteProgress: EpisodeProgressRow[];
  isAuthenticated: boolean;
  filter: FilterMode;
  setFilter: (f: FilterMode) => void;
  sort: SortMode;
  setSort: (s: SortMode) => void;
  visibleCount: number;
  setVisibleCount: (n: number) => void;
  loading: boolean;
  reloading: boolean;
  onReload: () => void;
}

const STATUS_ORDER: Record<FilterMode, number> = {
  in_progress: 0,
  not_started: 1,
  completed: 2,
  all: 3,
};

const EpisodeHistorySection: React.FC<EpisodeHistoryProps> = ({
  navigate,
  jornada,
  remoteProgress,
  isAuthenticated,
  filter,
  setFilter,
  sort,
  setSort,
  visibleCount,
  setVisibleCount,
  loading,
  reloading,
  onReload,
}) => {
  // Build a flat list of all episodes with their computed status + last activity
  const allEpisodes = useMemo(() => {
    const remoteByid = new Map<string, EpisodeProgressRow>();
    remoteProgress.forEach((r) => remoteByid.set(r.session_id, r));

    return JORNADA_DATA.flatMap((fase, fi) =>
      fase.sessoes.map((s, idx) => {
        const remote = remoteByid.get(s.id);
        const localDone = jornada.completedSessions.includes(s.id);
        const done = remote?.status === "completed" || localDone;

        const sessionResponses = s.exercicios.filter((ex) =>
          jornada.responses.some((r) => r.exerciseId === ex.id),
        );
        const inProgress =
          !done &&
          (remote?.status === "in_progress" || sessionResponses.length > 0);

        const lastResp = jornada.responses
          .filter((r) => s.exercicios.some((ex) => ex.id === r.exerciseId))
          .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

        const status: FilterMode = done
          ? "completed"
          : inProgress
            ? "in_progress"
            : "not_started";

        // Last activity: prefer remote completed_at/updated_at, then local response date
        const lastActivity =
          remote?.completed_at ||
          remote?.updated_at ||
          lastResp?.date ||
          null;

        return {
          fase,
          fi,
          sessao: s,
          idx,
          status,
          done,
          inProgress,
          lastResp,
          lastActivity,
        };
      }),
    );
  }, [jornada, remoteProgress]);

  const summary = useMemo(() => {
    const total = allEpisodes.length;
    const completed = allEpisodes.filter((e) => e.status === "completed").length;
    const in_progress = allEpisodes.filter((e) => e.status === "in_progress").length;
    const not_started = total - completed - in_progress;
    return { total, completed, in_progress, not_started };
  }, [allEpisodes]);

  const sorted = useMemo(() => {
    const list = [...allEpisodes];
    if (sort === "status") {
      list.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
    } else if (sort === "recent") {
      list.sort((a, b) => {
        if (!a.lastActivity && !b.lastActivity) return 0;
        if (!a.lastActivity) return 1;
        if (!b.lastActivity) return -1;
        return a.lastActivity < b.lastActivity ? 1 : -1;
      });
    }
    return list;
  }, [allEpisodes, sort]);

  const filtered = useMemo(
    () => (filter === "all" ? sorted : sorted.filter((e) => e.status === filter)),
    [sorted, filter],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visible.length < filtered.length;

  const filters: { key: FilterMode; label: string; count: number }[] = [
    { key: "all", label: "Todos", count: summary.total },
    { key: "completed", label: "Concluídos", count: summary.completed },
    { key: "in_progress", label: "Em andamento", count: summary.in_progress },
    { key: "not_started", label: "Pendentes", count: summary.not_started },
  ];

  return (
    <section id="episode-history" className="container mx-auto px-6 md:px-12 py-8 scroll-mt-32">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-2xl md:text-3xl font-heading font-black flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary" /> Histórico por Episódio
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReload}
            disabled={reloading || loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${reloading ? "animate-spin" : ""}`} />
            Recarregar progresso
          </Button>
          <Button asChild variant="link" className="text-primary">
            <Link to="/meu-produto">
              Ver tudo <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {loading ? (
          <>
            <SummarySkeleton />
            <SummarySkeleton />
            <SummarySkeleton />
            <SummarySkeleton />
          </>
        ) : (
          <>
            <SummaryCard icon={<CheckCircle2 className="w-4 h-4" />} label="Concluídos" value={summary.completed} accent="primary" />
            <SummaryCard icon={<CircleDashed className="w-4 h-4" />} label="Em andamento" value={summary.in_progress} accent="amber" />
            <SummaryCard icon={<Circle className="w-4 h-4" />} label="Pendentes" value={summary.not_started} accent="muted" />
            <SummaryCard icon={<Trophy className="w-4 h-4" />} label="Total" value={summary.total} accent="muted" />
          </>
        )}
      </div>

      {!isAuthenticated && !loading && (
        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 mb-4">
          Você está vendo dados locais. Faça login para sincronizar seu progresso na nuvem.
        </div>
      )}

      {/* Filter chips + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                filter === f.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card/50 text-muted-foreground border-white/5 hover:border-primary/30"
              }`}
            >
              {f.label} <span className="opacity-70 ml-1">({f.count})</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <ArrowDownUp className="w-3.5 h-3.5 text-muted-foreground" />
          <label htmlFor="ep-sort" className="text-muted-foreground">Ordenar:</label>
          <select
            id="ep-sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortMode);
              setVisibleCount(PAGE_SIZE);
            }}
            className="bg-card/50 border border-white/10 rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="default">Padrão (jornada)</option>
            <option value="status">Por status</option>
            <option value="recent">Última resposta</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <EpisodeRowSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-muted-foreground text-center py-8 bg-card/30 rounded-xl">
          Nenhum episódio neste filtro.
        </div>
      ) : (
        <div className="grid gap-3">
          {visible.map(({ fase, sessao, idx, done, inProgress, lastResp }) => (
            <div
              key={`${fase.id}-${sessao.id}`}
              className="bg-card/50 hover:bg-card border border-white/5 rounded-xl p-4 flex items-start gap-4 transition-colors cursor-pointer"
              onClick={() => navigate(`/jornada/${fase.id}/${sessao.id}`)}
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
                    <Badge variant="outline" className="text-[10px]">
                      Em andamento
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      <Lock className="w-3 h-3 mr-1" /> Não iniciado
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold mt-1 truncate">{sessao.titulo}</h3>
                {lastResp && (
                  <p className="mt-2 text-xs text-muted-foreground italic line-clamp-2">
                    "{lastResp.response}"
                  </p>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
            </div>
          ))}
        </div>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}>
            Carregar mais ({filtered.length - visible.length})
          </Button>
        </div>
      )}
    </section>
  );
};

const SummarySkeleton: React.FC = () => (
  <div className="bg-card/50 border border-white/5 rounded-xl p-4 animate-pulse">
    <div className="h-3 w-20 bg-muted/40 rounded" />
    <div className="h-7 w-10 bg-muted/40 rounded mt-3" />
  </div>
);

const EpisodeRowSkeleton: React.FC = () => (
  <div className="bg-card/40 border border-white/5 rounded-xl p-4 flex items-start gap-4 animate-pulse">
    <div className="w-10 h-7 bg-muted/40 rounded shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-1/3 bg-muted/40 rounded" />
      <div className="h-4 w-2/3 bg-muted/40 rounded" />
      <div className="h-3 w-full bg-muted/30 rounded" />
    </div>
  </div>
);

const SummaryCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  accent: "primary" | "amber" | "muted";
}> = ({ icon, label, value, accent }) => {
  const accentClass =
    accent === "primary"
      ? "text-primary"
      : accent === "amber"
        ? "text-amber-400"
        : "text-muted-foreground";
  return (
    <div className="bg-card/50 border border-white/5 rounded-xl p-4">
      <div className={`flex items-center gap-2 text-xs uppercase tracking-wider ${accentClass}`}>
        {icon} {label}
      </div>
      <div className="text-2xl font-black mt-2">{value}</div>
    </div>
  );
};

export default Dashboard;
