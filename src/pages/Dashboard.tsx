import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Brain, History, Compass, LogOut, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { jornada } = useJornada();
  const [responsesCount, setResponsesCount] = useState<number | null>(null);
  const [statsError, setStatsError] = useState(false);
  const completedSessions = jornada?.completedSessions ?? [];
  const totalSessions = JORNADA_DATA.reduce((sum, phase) => sum + phase.sessoes.length, 0);
  const completedCount = completedSessions.length;
  const progressPercent = totalSessions > 0
    ? Math.min(100, Math.round((completedCount / totalSessions) * 100))
    : 0;

  const currentPhase = useMemo(() => {
    return JORNADA_DATA.find((phase) =>
      !phase.sessoes.every((session) => completedSessions.includes(session.id))
    ) ?? JORNADA_DATA[JORNADA_DATA.length - 1] ?? null;
  }, [completedSessions]);

  useEffect(() => {
    let active = true;
    const loadResponses = async () => {
      if (!user?.id) {
        if (active) setResponsesCount(0);
        return;
      }
      const { count, error } = await supabase
        .from("exercise_responses")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      if (!active) return;
      if (error) {
        setStatsError(true);
        setResponsesCount(null);
      } else {
        setResponsesCount(count ?? 0);
      }
    };
    void loadResponses();
    return () => { active = false; };
  }, [user?.id]);

  const handleSignOut = async () => {
    await signOut();
    window.location.assign("/");
  };

  const quickLinks = [
    { title: "Continuar o Curso PCH", description: "Retome seus estudos e avance pelas aulas.", to: "/curso-padh", icon: BookOpen },
    { title: "Dr. Poesia", description: "Tire dúvidas e aprofunde os conceitos da PCH.", to: "/dr-poesia", icon: Brain },
    { title: "Minha Jornada", description: "Acesse as etapas e acompanhe sua evolução.", to: "/jornada", icon: Sparkles },
    { title: "Explorar conteúdos", description: "Encontre materiais e ferramentas de aprendizagem.", to: "/explorar", icon: Compass },
    { title: "Histórico", description: "Consulte seus registros e respostas anteriores.", to: "/consciencia/historico", icon: History },
  ];

  return (
    <PageLayout
      seo={{ title: "Minha Área — Curso PCH", description: "Área do aluno: estudos, progresso e ferramentas PCH.", path: "/dashboard" }}
      currentPage="Minha Área"
    >
      <section className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12 space-y-8">
        <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Área do aluno</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Bem-vindo{user?.name ? `, ${user.name}` : ""}.</h1>
            <p className="text-sm text-muted-foreground">Este é seu espaço de aprendizagem e acompanhamento no Curso PCH.</p>
            {user?.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2 self-start md:self-center">
            <LogOut className="h-4 w-4" /> Sair da conta
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Progresso da jornada</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{progressPercent}%</div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progressPercent}%` }} /></div>
              <p className="mt-2 text-xs text-muted-foreground">{completedCount} de {totalSessions} etapas concluídas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Etapa atual</CardTitle></CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{currentPhase?.titulo ?? "Jornada disponível"}</p>
              <p className="mt-2 text-xs text-muted-foreground">Continue de onde parou, no seu ritmo.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Respostas registradas</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{responsesCount === null ? "—" : responsesCount}</div>
              <p className="mt-2 text-xs text-muted-foreground">{statsError ? "Não foi possível carregar este indicador agora." : "Exercícios e reflexões salvos na sua conta."}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Acesse sua aprendizagem</h2>
            <p className="text-sm text-muted-foreground">As ferramentas do aluno ficam aqui. A administração do sistema tem uma área separada.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map(({ title, description, to, icon: Icon }) => (
              <Link key={to} to={to} className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary">Acessar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
