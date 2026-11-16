import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, ShieldEllipsis, ShieldAlert, CircleCheckBig, DatabaseZap, LayoutDashboard, Activity, Gauge, ArrowLeft, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WebVitalsOverview from "@/components/admin/WebVitalsOverview";
import BehaviorAnalytics from "@/components/admin/BehaviorAnalytics";

interface TableSecurity { tablename: string; rowsecurity: boolean; policies: string[]; }

const adminLinks = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { to: "/admin/web-vitals", label: "Desempenho", icon: Gauge },
  { to: "/admin/pwa-health", label: "Saúde do PWA", icon: Activity },
  { to: "/admin/pwa-diagnostics", label: "Diagnóstico PWA", icon: ShieldCheck },
];

export default function Admin() {
  const [securityStatus, setSecurityStatus] = useState<TableSecurity[]>([]);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const checkSecurity = async () => {
      try {
        const { data, error } = await supabase.rpc("get_tables_security" as any);
        if (error) throw error;
        if (mounted) { setSecurityStatus((data as TableSecurity[] | null) ?? []); setSecurityError(null); }
      } catch (error) {
        console.error("Erro ao consultar segurança", error);
        if (mounted) {
          setSecurityStatus([]);
          setSecurityError("Não foi possível consultar as políticas RLS. O painel não presumirá que a segurança está ativa.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void checkSecurity();
    return () => { mounted = false; };
  }, []);

  return (
    <PageLayout
      seo={{ title: "Administração — Curso PCH", description: "Área administrativa independente do site e da área do aluno.", path: "/admin" }}
      hideHeader hideMobileNav hideFooter loadingDelay={0}
    >
      <div className="min-h-dvh bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div>
              <div><p className="font-bold">PCH · Administração</p><p className="text-xs text-muted-foreground">Ambiente restrito de gestão</p></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-accent"><BookOpen className="h-4 w-4" /> Área do aluno</Link>
              <Link to="/" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-accent"><ArrowLeft className="h-4 w-4" /> Site público</Link>
            </div>
          </div>
          <nav className="container mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 md:px-6" aria-label="Navegação administrativa">
            {adminLinks.map(({ to, label, icon: Icon }) => <Link key={to} to={to} aria-current={to === "/admin" ? "page" : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${to === "/admin" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}><Icon className="h-4 w-4" />{label}</Link>)}
          </nav>
        </header>

        <main className="container mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Painel de controle</p><h1 className="mt-1 text-3xl font-bold">Visão geral administrativa</h1><p className="mt-2 text-sm text-muted-foreground">Monitoramento técnico e segurança do ambiente PCH.</p></div>
            <Badge variant="outline" className="gap-2 border-primary/30 px-3 py-2 text-primary"><ShieldCheck className="h-4 w-4" /> Acesso administrativo</Badge>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <WebVitalsOverview />
            <BehaviorAnalytics />
          </div>

          <Card>
            <CardHeader className="border-b border-border bg-muted/30"><CardTitle className="flex items-center gap-2"><ShieldEllipsis className="h-5 w-5 text-primary" /> Auditoria de segurança (RLS)</CardTitle></CardHeader>
            <CardContent className="p-6">
              <p className="mb-5 text-sm text-muted-foreground">Verificação das políticas de Row Level Security e isolamento de dados por usuário.</p>
              {loading ? <p className="text-sm text-muted-foreground">Consultando o banco de dados…</p> : securityError ? (
                <div role="status" className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-700"><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />{securityError}</div>
              ) : securityStatus.length === 0 ? (
                <p role="status" className="text-sm text-muted-foreground">A consulta não retornou tabelas. Isso não confirma nem invalida a segurança.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {securityStatus.map((table) => <div key={table.tablename} className="flex items-center justify-between gap-3 rounded-xl border border-border p-4"><div className="flex items-center gap-3"><DatabaseZap className="h-4 w-4 text-muted-foreground" /><div><p className="text-sm font-semibold">{table.tablename}</p><p className="text-xs text-muted-foreground">{table.policies?.length ?? 0} políticas retornadas</p></div></div>{table.rowsecurity ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600"><CircleCheckBig className="h-3.5 w-3.5" /> RLS ativo</span> : <span className="inline-flex items-center gap-1 text-xs font-semibold text-destructive"><ShieldAlert className="h-3.5 w-3.5" /> RLS inativo</span>}</div>)}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card><CardContent className="p-5"><div className="mb-2 flex items-center gap-2 font-semibold"><BookOpen className="h-4 w-4 text-primary" /> Conteúdo</div><p className="text-sm text-muted-foreground">A gestão editorial e de aulas será habilitada nesta área quando os módulos administrativos estiverem implementados.</p><Badge className="mt-3" variant="outline">Em evolução</Badge></CardContent></Card>
            <Card><CardContent className="p-5"><div className="mb-2 flex items-center gap-2 font-semibold"><Users className="h-4 w-4 text-primary" /> Usuários</div><p className="text-sm text-muted-foreground">A gestão de contas e acompanhamento de alunos permanece separada dos dados pessoais exibidos na área do aluno.</p><Badge className="mt-3" variant="outline">Em evolução</Badge></CardContent></Card>
            <Card><CardContent className="p-5"><div className="mb-2 flex items-center gap-2 font-semibold"><Activity className="h-4 w-4 text-primary" /> Operação</div><p className="text-sm text-muted-foreground">Acompanhe desempenho, saúde do PWA e diagnósticos pelos atalhos administrativos acima.</p><Badge className="mt-3" variant="outline">Disponível parcialmente</Badge></CardContent></Card>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
