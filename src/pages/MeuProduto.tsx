import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, PlayCircle, Lock, ArrowRight, ShoppingBag, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth, PRODUCT_PRISAO_INTERIOR } from "@/hooks/useAuth";
import { usePurchase } from "@/hooks/usePurchase";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";

const MeuProduto: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { purchase, hasAccess, loading } = usePurchase(PRODUCT_PRISAO_INTERIOR);
  const { jornada } = useJornada();

  const fase = JORNADA_DATA.find((f) => f.id === "fase-prisao-interior");
  const totalSessoes = fase?.sessoes.length || 0;
  const concluidas = fase?.sessoes.filter((s) => jornada.completedSessions.includes(s.id)).length || 0;
  const pct = totalSessoes ? Math.round((concluidas / totalSessoes) * 100) : 0;

  return (
    <PageLayout
      seo={{ title: "Meu Produto — P.A.D.H.", description: "Status da sua compra e progresso.", path: "/meu-produto" }}
      currentPage="Meu Produto"
    >
      <div className="container mx-auto px-6 py-16 max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">Meu Produto</h1>
          <p className="text-muted-foreground">Olá, {user?.name || "aluno"}.</p>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> Prisão Interior — Jornada
              </CardTitle>
              {hasAccess ? (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Ativo
                </Badge>
              ) : (
                <Badge variant="outline">Não adquirido</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {loading ? (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            ) : hasAccess && purchase ? (
              <>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Plano</div>
                    <div className="font-bold capitalize">{purchase.plan}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Comprado em</div>
                    <div className="font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {new Date(purchase.created_at).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Validade</div>
                    <div className="font-bold">
                      {purchase.expires_at ? new Date(purchase.expires_at).toLocaleDateString("pt-BR") : "Vitalício"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso da jornada</span>
                    <span className="font-bold">{concluidas}/{totalSessoes} episódios</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>

                <Button onClick={() => navigate("/jornada")} className="w-full sm:w-auto gap-2">
                  <PlayCircle className="w-4 h-4" /> Acessar Prisão Interior
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Você ainda não tem acesso à jornada. Veja os planos disponíveis para começar.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => navigate("/planos")} className="gap-2">
                    Ver planos <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/prisao-interior")}>
                    Saber mais
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {hasAccess && fase && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Histórico por episódio</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border/50">
              {fase.sessoes.map((s, idx) => {
                const done = jornada.completedSessions.includes(s.id);
                const sessionResponses = s.blocos.filter(b => b.tipo === 'exercise').filter((ex) =>
                  jornada.responses.some((r) => r.exerciseId === ex.id),
                );
                const inProgress = !done && sessionResponses.length > 0;
                const lastResp = jornada.responses
                  .filter((r) => s.blocos.filter(b => b.tipo === 'exercise').some((ex) => ex.id === r.exerciseId))
                  .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

                return (
                  <div key={s.id} className="py-4 flex items-start gap-4">
                    <div className="text-2xl font-heading font-black text-primary/30 w-10 text-center">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold">{s.titulo}</h3>
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
                      {lastResp && (
                        <div className="mt-2 text-xs">
                          <div className="text-muted-foreground mb-1">Última resposta salva:</div>
                          <div className="bg-muted/40 rounded-lg p-3 text-foreground/80 italic line-clamp-3">
                            "{lastResp.response}"
                          </div>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/jornada/${fase.id}/${s.id}`)}>
                      {done ? "Revisar" : inProgress ? "Continuar" : "Iniciar"}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default MeuProduto;
