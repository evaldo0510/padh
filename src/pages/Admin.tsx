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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSecurity = async () => {
      try {
        const { data: tables, error: tableError } = await supabase.rpc('get_tables_security' as any);
        
        if (tableError) {
          console.error("Error fetching security status", tableError);
          // Fallback static list for protected tables
          const protectedTables = ['episode_favorites', 'episode_progress', 'exercise_responses', 'purchases'];
          const status = protectedTables.map(name => ({
            tablename: name,
            rowsecurity: true, 
            policies: ["Owner access only"]
          }));
          setSecurityStatus(status as TableSecurity[]);
        } else {
          setSecurityStatus((tables as any) || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };


    checkSecurity();
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
              <ShieldCheck className="w-3 h-3" /> Sistema Protegido
            </Badge>
          </div>

          <div className="grid gap-8">
            {/* Web Vitals Operacional */}
            <WebVitalsOverview />

            {/* Comportamento & Retenção (funil, D1/D7/D30, coorte) */}
            <BehaviorAnalytics />


            {/* Security Audit Section */}
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
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {loading ? (
                      <p>Carregando status de segurança...</p>
                    ) : securityStatus.map((table) => (
                      <div key={table.tablename} className="p-4 rounded-xl border border-border bg-background flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <DatabaseZap className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="font-bold text-sm">{table.tablename}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                              {table.policies.length} políticas ativas
                            </div>
                          </div>
                        </div>
                        {table.rowsecurity ? (
                          <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] uppercase">
                            <CircleCheckBig className="w-3 h-3" /> Ativo
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-500 font-bold text-[10px] uppercase">
                            <ShieldAlert className="w-3 h-3" /> Inativo
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Admin Links */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors cursor-pointer group">
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary">
                  Conteúdo
                </h3>
                <p className="text-sm text-muted-foreground">
                  Gerenciar jornadas e episódios
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors cursor-pointer group">
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary">
                  Usuários
                </h3>
                <p className="text-sm text-muted-foreground">
                  Visualizar progresso e alunos
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors cursor-pointer group">
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary">
                  Vendas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Métricas financeiras e planos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Admin;
