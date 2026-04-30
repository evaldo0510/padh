import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Download, RefreshCw, Database, MessageSquare, ArrowRight, ArrowLeft, FlaskConical, WifiOff, Undo2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { usePWADiagnostics } from "@/hooks/usePWADiagnostics";

const SNAPSHOT_KEY = "padh_precache_snapshot";

const AdminPWADiagnostics: React.FC = () => {
  const { messageLog, counters, clearMessageLog, resetCounters, threshold, offlineHistory, rollbackHistory } = usePWADiagnostics();
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [cacheStats, setCacheStats] = useState<{ name: string; entries: number }[]>([]);

  const loadCaches = async () => {
    if (!("caches" in window)) return;
    const keys = await caches.keys();
    setCacheKeys(keys);
    const stats = await Promise.all(keys.map(async (name) => {
      const c = await caches.open(name);
      const reqs = await c.keys();
      return { name, entries: reqs.length };
    }));
    setCacheStats(stats);
  };

  useEffect(() => { loadCaches(); }, []);

  const handleClearAll = async () => {
    if (!confirm("Limpar todos os caches?")) return;
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    toast.success("Todos os caches foram limpos.");
    loadCaches();
  };

  const handleTestPrecache = async () => {
    if (!navigator.serviceWorker?.controller) {
      toast.error("Service Worker não está controlando esta página.");
      return;
    }
    try {
      const ch = new MessageChannel();
      const result = await new Promise<any>((resolve, reject) => {
        const t = setTimeout(() => reject(new Error("Timeout")), 4000);
        ch.port1.onmessage = (e) => { clearTimeout(t); resolve(e.data); };
        navigator.serviceWorker.controller!.postMessage({ type: "GET_PRECACHE_MANIFEST" }, [ch.port2]);
      });
      toast.success(`Precache OK: ${result.files?.length ?? 0} arquivos versionados.`);
    } catch (e: any) {
      toast.error("Falha no precache: " + e.message);
    }
  };

  const handleExportLog = () => {
    const snapshot = localStorage.getItem(SNAPSHOT_KEY);
    const payload = {
      exportedAt: new Date().toISOString(),
      counters,
      messageLog,
      cacheStats,
      precacheSnapshot: snapshot ? JSON.parse(snapshot) : null,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `padh-pwa-diagnostics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageLayout
      seo={{ title: "Diagnóstico PWA — PADH", description: "Diagnóstico avançado do Service Worker e cache.", path: "/admin/pwa-diagnostics" }}
      currentPage="Diagnóstico PWA"
    >
      <div className="container mx-auto px-6 py-12 space-y-8 max-w-6xl">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Diagnóstico PWA</h1>
            <p className="text-muted-foreground mt-2">Histórico de mensagens, status do cache e ações de manutenção.</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/admin/pwa-health">← Voltar ao Painel de Saúde</Link>
          </Button>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Falhas Comm", value: counters.comm },
            { label: "Timeouts", value: counters.timeout },
            { label: "Falhas Ativação", value: counters.activation },
            { label: `Janela 5min / ${threshold}`, value: counters.failuresInWindow, alert: counters.failuresInWindow >= threshold },
          ].map(c => (
            <Card key={c.label} className={c.alert ? "border-destructive/50 bg-destructive/5" : "bg-card/50"}>
              <CardContent className="pt-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className={`text-3xl font-bold mt-1 ${c.alert ? "text-destructive" : ""}`}>{c.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><FlaskConical className="w-5 h-5 text-primary" /> Ações de manutenção</CardTitle>
            <CardDescription>Execute testes e operações sobre o Service Worker e os caches.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={handleTestPrecache} className="gap-2"><RefreshCw className="w-4 h-4" /> Testar Precache</Button>
            <Button onClick={handleClearAll} variant="destructive" className="gap-2"><Trash2 className="w-4 h-4" /> Limpar Caches</Button>
            <Button onClick={handleExportLog} variant="outline" className="gap-2"><Download className="w-4 h-4" /> Exportar log JSON</Button>
            <Button onClick={() => { clearMessageLog(); toast.success("Log limpo."); }} variant="outline">Limpar Log</Button>
            <Button onClick={() => { resetCounters(); toast.success("Contadores zerados."); }} variant="outline">Zerar Contadores</Button>
          </CardContent>
        </Card>

        {/* Latest offline + rollback history */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><WifiOff className="w-5 h-5 text-emerald-500" /> Último Teste Offline</CardTitle>
              <CardDescription>{offlineHistory.length} verificações registradas.</CardDescription>
            </CardHeader>
            <CardContent>
              {offlineHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Nenhum teste offline executado ainda.</p>
              ) : (
                <>
                  <div className={`p-3 rounded-lg border mb-3 ${offlineHistory[0].status === "ok" ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {offlineHistory[0].status === "ok"
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        : <XCircle className="w-4 h-4 text-red-500" />}
                      <span className="font-bold text-sm uppercase tracking-wider">{offlineHistory[0].status}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{new Date(offlineHistory[0].timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{offlineHistory[0].message}</p>
                  </div>
                  <ScrollArea className="h-32">
                    <div className="space-y-1.5 text-xs">
                      {offlineHistory.slice(1).map((e, i) => (
                        <div key={i} className="flex items-center gap-2 p-1.5 border-b border-border/30">
                          <Badge variant={e.status === "ok" ? "secondary" : "destructive"} className="text-[9px] h-4 px-1.5">{e.status}</Badge>
                          <span className="text-muted-foreground text-[10px]">{new Date(e.timestamp).toLocaleString()}</span>
                          <span className="truncate flex-1 text-muted-foreground">{e.message}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Undo2 className="w-5 h-5 text-amber-500" /> Histórico de Rollbacks</CardTitle>
              <CardDescription>{rollbackHistory.length} reversões registradas.</CardDescription>
            </CardHeader>
            <CardContent>
              {rollbackHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Nenhum rollback executado.</p>
              ) : (
                <ScrollArea className="h-48">
                  <div className="space-y-2 text-xs">
                    {rollbackHistory.map((r, i) => (
                      <div key={i} className="p-2 rounded border bg-muted/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={r.reason === "auto_recommended" ? "destructive" : "secondary"} className="text-[9px] h-4 px-1.5">{r.reason}</Badge>
                          <span className="text-muted-foreground text-[10px]">{new Date(r.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="font-mono text-[10px] text-muted-foreground break-all">
                          De: {r.fromVersion || "—"} → Para: {r.toVersion || "fresca"}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Cache status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Database className="w-5 h-5 text-primary" /> Status do Cache</CardTitle>
            <CardDescription>{cacheKeys.length} buckets de cache ativos.</CardDescription>
          </CardHeader>
          <CardContent>
            {cacheStats.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Nenhum cache disponível.</p>
            ) : (
              <div className="space-y-2">
                {cacheStats.map(s => (
                  <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 text-sm">
                    <span className="font-mono text-xs break-all">{s.name}</span>
                    <Badge variant="secondary">{s.entries} entradas</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message log */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" /> Histórico de Mensagens SW</CardTitle>
            <CardDescription>Últimas {messageLog.length} comunicações (entrada/saída).</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full rounded-lg border bg-muted/10 p-3">
              {messageLog.length === 0 ? (
                <p className="text-sm text-muted-foreground italic text-center py-12">Nenhuma mensagem registrada ainda.</p>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {messageLog.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded border-b border-border/30">
                      <span className="text-muted-foreground whitespace-nowrap text-[10px]">
                        {new Date(m.timestamp).toLocaleTimeString()}
                      </span>
                      {m.direction === "out" ? (
                        <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      ) : (
                        <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{m.type}</span>
                          {m.status && (
                            <Badge variant={m.status === "success" ? "secondary" : "destructive"} className="text-[9px] h-4 px-1.5">
                              {m.status}
                            </Badge>
                          )}
                        </div>
                        {m.payload && (
                          <pre className="text-[10px] text-muted-foreground mt-1 break-all whitespace-pre-wrap">{JSON.stringify(m.payload)}</pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminPWADiagnostics;
