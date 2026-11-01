import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, ShieldEllipsis, ShieldAlert, CircleCheckBig, DatabaseZap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WebVitalsOverview from "@/components/admin/WebVitalsOverview";
import BehaviorAnalytics from "@/components/admin/BehaviorAnalytics";

interface TableSecurity {
  tablename: string;
  rowsecurity: boolean;
  policies: string[];
}

const Admin = () => {
  const [securityStatus, setSecurityStatus] = useState<TableSecurity[]>([]);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkSecurity = async () => {
      try {
        const { data: tables, error: tableError } = await supabase.rpc('get_tables_security' as any);

        if (tableError) throw tableError;
        if (!mounted) return;

        setSecurityStatus((tables as TableSecurity[] | null) ?? []);
        setSecurityError(null);
      } catch (error) {
        console.error("Error fetching security status", error);
        if (mounted) {
          setSecurityStatus([]);
          setSecurityError("Não foi possível consultar o estado real das políticas RLS. Nenhum status de segurança será presumido.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void checkSecurity();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageLayout
      seo={{
        title: "Admin — P.A.D.H.",
        description: "Painel administrativo e auditoria de segurança.",
        path: "/admin",
      }}
      currentPage="Admin"
      loadingDelay={0}
    >
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Painel Administrativo
            </h1>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-2 px-3 py-1">
              <ShieldCheck className="w-3 h-3" /> Área administrativa
            </Badge>
          </div>

          <div className="grid gap-8">
            <WebVitalsOverview />
            <BehaviorAnalytics />

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShieldEllipsis className="w-5 h-5 text-primary" /> Auditoria de Segurança (RLS)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Verificação automática de Row Level Security (RLS) e isolamento de dados por usuário.
                  </p>

                  {loading ? (
                    <p>Carregando status de segurança...</p>
                  ) : securityError ? (
                    <div role="status" className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-700 dark:text-amber-300">
                      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{securityError}</span>
                    </div>
                  ) : securityStatus.length === 0 ? (
                    <p role="status" className="text-sm text-muted-foreground">
                      A consulta não retornou tabelas para exibição. Isso não representa uma confirmação de segurança.
                    </p>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {securityStatus.map((table) => (
                        <div key={table.tablename} className="p-4 rounded-xl border border-border bg-background flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <DatabaseZap className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-bold text-sm">{table.tablename}</div>
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                {table.policies.length} políticas retornadas
                              </div>
                            </div>
                          </div>
                          {table.rowsecurity ? (
                            <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] uppercase">
                              <CircleCheckBig className="w-3 h-3" /> RLS ativo
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-500 font-bold text-[10px] uppercase">
                              <ShieldAlert className="w-3 h-3" /> RLS inativo
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border/50 bg-card">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">Conteúdo</h3>
                  <Badge variant="outline">Em desenvolvimento</Badge>
                </div>
                <p className="text-sm text-muted-foreground">A gestão de jornadas e episódios ainda não está disponível neste painel.</p>
              </div>
              <div className="p-6 rounded-xl border border-border/50 bg-card">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">Usuários</h3>
                  <Badge variant="outline">Em desenvolvimento</Badge>
                </div>
                <p className="text-sm text-muted-foreground">A consulta administrativa de alunos e progresso ainda não está disponível neste painel.</p>
              </div>
              <div className="p-6 rounded-xl border border-border/50 bg-card">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">Vendas</h3>
                  <Badge variant="outline">Em desenvolvimento</Badge>
                </div>
                <p className="text-sm text-muted-foreground">As métricas financeiras e a gestão de planos ainda não estão disponíveis neste painel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Admin;
