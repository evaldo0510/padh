import React, { useEffect, useState, useCallback } from "react";
import {
  ShieldCheck, RefreshCw, Trash2, Activity,
  AlertCircle, Info, Smartphone, HardDrive,
  Undo2, FileSearch, Tag, Clock, Download, Zap, WifiOff, Link as LinkIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { APP_VERSION } from "@/lib/changelog";
import { reportPWAEvent } from "@/lib/pwa-metrics";
import { usePWADiagnostics } from "@/hooks/usePWADiagnostics";

interface PWAEvent {
  eventType: string;
  status: string;
  details: any;
  timestamp: string;
}

interface PrecacheFile {
  url: string;
  revision: string | null;
}

interface PrecacheSnapshot {
  builtAt: string;
  version: string;
  files: PrecacheFile[];
}

interface PrecacheDiff {
  added: PrecacheFile[];
  removed: PrecacheFile[];
  changed: { url: string; from: string | null; to: string | null }[];
}

const SNAPSHOT_KEY = "padh_precache_snapshot";

export const PWAManager: React.FC = () => {
  const [swStatus, setSwStatus] = useState<string>("Detectando...");
  const [swState, setSwState] = useState<string | null>(null);
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [logs, setLogs] = useState<PWAEvent[]>([]);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [swVersion, setSwVersion] = useState<string | null>(null);
  const [swBuiltAt, setSwBuiltAt] = useState<string | null>(null);
  const [commError, setCommError] = useState<string | null>(null);
  const [precacheDiff, setPrecacheDiff] = useState<PrecacheDiff | null>(null);
  const [previousSnapshot, setPreviousSnapshot] = useState<PrecacheSnapshot | null>(null);
  const [currentSnapshot, setCurrentSnapshot] = useState<PrecacheSnapshot | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [offlineTest, setOfflineTest] = useState<{ status: "idle" | "running" | "ok" | "fail"; message?: string }>({ status: "idle" });

  const { counters, recordFailure, resetCounters, shouldRecommendRollback, threshold, logMessage } = usePWADiagnostics();

  // Communicate with SW with timeout protection
  const askSW = useCallback(<T,>(type: string, responseType: string, timeoutMs = 5000): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (!navigator.serviceWorker?.controller) {
        reject(new Error("Service Worker controller indisponível"));
        return;
      }
      const channel = new MessageChannel();
      const timer = setTimeout(() => {
        reject(new Error(`Timeout aguardando ${responseType}`));
      }, timeoutMs);

      channel.port1.onmessage = (e) => {
        if (e.data?.type === responseType) {
          clearTimeout(timer);
          resolve(e.data as T);
        }
      };

      // Use postMessage with port to receive a direct response
      navigator.serviceWorker.controller.postMessage({ type }, [channel.port2]);

      // Also listen via global SW message events as fallback
      const onGlobalMsg = (event: MessageEvent) => {
        if (event.data?.type === responseType) {
          clearTimeout(timer);
          navigator.serviceWorker.removeEventListener("message", onGlobalMsg);
          resolve(event.data as T);
        }
      };
      navigator.serviceWorker.addEventListener("message", onGlobalMsg);
      setTimeout(() => navigator.serviceWorker.removeEventListener("message", onGlobalMsg), timeoutMs + 100);
    });
  }, []);

  const computeDiff = (prev: PrecacheSnapshot | null, curr: PrecacheSnapshot): PrecacheDiff => {
    const prevMap = new Map((prev?.files ?? []).map(f => [f.url, f.revision]));
    const currMap = new Map(curr.files.map(f => [f.url, f.revision]));
    const added: PrecacheFile[] = [];
    const removed: PrecacheFile[] = [];
    const changed: { url: string; from: string | null; to: string | null }[] = [];

    currMap.forEach((rev, url) => {
      if (!prevMap.has(url)) added.push({ url, revision: rev });
      else if (prevMap.get(url) !== rev) changed.push({ url, from: prevMap.get(url) ?? null, to: rev });
    });
    prevMap.forEach((rev, url) => {
      if (!currMap.has(url)) removed.push({ url, revision: rev });
    });
    return { added, removed, changed };
  };

  const loadPrecacheManifest = useCallback(async () => {
    try {
      const resp: any = await askSW("GET_PRECACHE_MANIFEST", "PRECACHE_MANIFEST_RESPONSE");
      const snapshot: PrecacheSnapshot = {
        builtAt: resp.builtAt,
        version: resp.version,
        files: resp.files || [],
      };
      setCurrentSnapshot(snapshot);

      const stored = localStorage.getItem(SNAPSHOT_KEY);
      const prev: PrecacheSnapshot | null = stored ? JSON.parse(stored) : null;
      setPreviousSnapshot(prev);

      if (!prev || prev.version !== snapshot.version) {
        const diff = computeDiff(prev, snapshot);
        setPrecacheDiff(diff);
        localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
      } else {
        setPrecacheDiff({ added: [], removed: [], changed: [] });
      }
    } catch (e: any) {
      console.warn("PWAManager: failed to load precache manifest", e);
    }
  }, [askSW]);

  const loadSwVersion = useCallback(async () => {
    try {
      logMessage({ direction: "out", type: "GET_SW_VERSION" });
      const resp: any = await askSW("GET_SW_VERSION", "SW_VERSION_RESPONSE", 4000);
      logMessage({ direction: "in", type: "SW_VERSION_RESPONSE", payload: { version: resp.version }, status: "success" });
      setSwVersion(resp.version);
      setSwBuiltAt(resp.builtAt);
      setCommError(null);
    } catch (e: any) {
      const msg = e?.message || "Falha na comunicação com o Service Worker";
      setCommError(msg);
      const kind = msg.toLowerCase().includes("timeout") ? "timeout" : "comm";
      recordFailure(kind, { context: "GET_SW_VERSION", message: msg });
      reportPWAEvent("error", "fail", { context: "GET_SW_VERSION", message: msg });
    }
  }, [askSW, logMessage, recordFailure]);

  const handleSimulateUpdate = async () => {
    setIsSimulating(true);
    const startSnapshot = currentSnapshot?.version;
    toast.info("Simulando atualização do Service Worker...");
    logMessage({ direction: "out", type: "SIMULATE_UPDATE" });

    let controllerChanged = false;
    const onChange = () => { controllerChanged = true; };
    navigator.serviceWorker.addEventListener("controllerchange", onChange);

    try {
      // 1. force update check
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) throw new Error("Sem registration");
      await reg.update();

      // 2. if new worker waiting -> skip waiting
      if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });

      // 3. wait up to 6s for controllerchange
      await new Promise((resolve) => setTimeout(resolve, 6000));

      // 4. re-fetch precache and validate
      await loadPrecacheManifest();
      await loadSwVersion();
      const endSnapshot = currentSnapshot?.version;
      const versionChanged = startSnapshot && endSnapshot && startSnapshot !== endSnapshot;

      if (controllerChanged || versionChanged) {
        toast.success(`Validação OK: ${controllerChanged ? "controller trocado" : ""}${versionChanged ? " · precache mudou" : ""}`);
        reportPWAEvent("update_activated", "success", { context: "simulate_update" });
      } else {
        toast.warning("Sem nova versão disponível no servidor — simulação completou sem trocas.");
      }
    } catch (e: any) {
      toast.error("Falha na simulação: " + (e?.message || "erro"));
      recordFailure("comm", { context: "simulate_update", message: e?.message });
    } finally {
      navigator.serviceWorker.removeEventListener("controllerchange", onChange);
      setIsSimulating(false);
    }
  };

  const handleExportSnapshot = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      appVersion: APP_VERSION,
      swVersion,
      swBuiltAt,
      currentSnapshot,
      previousSnapshot,
      precacheDiff,
      counters,
      cacheKeys,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `padh-pwa-snapshot-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Snapshot exportado.");
  };

  const handleOfflineTest = async () => {
    setOfflineTest({ status: "running" });
    try {
      // Validate critical precached assets are reachable from cache
      const targets = ["/", "/index.html", "/offline"];
      const results: { url: string; ok: boolean }[] = [];
      for (const url of targets) {
        const match = await caches.match(url);
        results.push({ url, ok: !!match });
      }
      const allOk = results.every(r => r.ok);
      const failed = results.filter(r => !r.ok).map(r => r.url);
      if (allOk) {
        setOfflineTest({ status: "ok", message: `Todos os ${targets.length} ativos críticos estão em cache.` });
        toast.success("App pronto para uso offline.");
      } else {
        setOfflineTest({ status: "fail", message: `Faltando em cache: ${failed.join(", ")}` });
        toast.warning("Alguns ativos críticos não estão em cache.");
      }
    } catch (e: any) {
      setOfflineTest({ status: "fail", message: e?.message || "Erro" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      setSwStatus("Não suportado");
      return;
    }

    const checkSW = async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      setRegistration(reg || null);
      if (!reg) {
        setSwStatus("Não registrado");
        return;
      }
      const activeWorker = reg.active || reg.waiting || reg.installing;
      setSwState(activeWorker?.state || "desconhecido");
      setSwStatus(reg.active ? "Ativado" : reg.waiting ? "Aguardando" : "Instalando");
    };

    checkSW().then(() => {
      // Defer asks slightly to ensure controller is ready
      setTimeout(() => {
        loadSwVersion();
        loadPrecacheManifest();
      }, 500);
    });

    const handleControllerChange = () => checkSW();
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    const handlePWAEvent = (e: any) => {
      setLogs(prev => [e.detail, ...prev].slice(0, 50));
    };
    window.addEventListener("pwa-event", handlePWAEvent);

    const loadCaches = async () => {
      try { setCacheKeys(await caches.keys()); } catch {}
    };
    loadCaches();

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
      window.removeEventListener("pwa-event", handlePWAEvent);
    };
  }, [loadSwVersion, loadPrecacheManifest]);

  const handleUpdateCheck = async () => {
    if (!registration) {
      toast.error("Service Worker não registrado.");
      return;
    }
    setIsUpdating(true);
    let activated = false;
    const onActivated = () => { activated = true; };
    navigator.serviceWorker.addEventListener("controllerchange", onActivated);

    // Timeout watcher: warn user if activation doesn't happen
    const activationTimeout = setTimeout(() => {
      if (!activated) {
        toast.warning("A nova versão demorou para ativar. Tente recarregar a página manualmente.", { duration: 6000 });
        recordFailure("activation", { context: "activation_timeout" });
        reportPWAEvent("error", "fail", { context: "activation_timeout" });
      }
    }, 8000);

    try {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        toast.success("Forçando ativação da nova versão...");
      } else {
        await registration.update();
        toast.info("Buscando atualizações no servidor...");
      }
    } catch (e: any) {
      toast.error("Falha na comunicação com o Service Worker.");
      setCommError(e?.message || "Erro desconhecido");
      recordFailure("comm", { context: "update_check", message: e?.message });
      reportPWAEvent("error", "fail", { context: "update_check", message: e?.message });
    } finally {
      setTimeout(() => {
        clearTimeout(activationTimeout);
        navigator.serviceWorker.removeEventListener("controllerchange", onActivated);
        setIsUpdating(false);
      }, 9000);
    }
  };

  const handleClearCaches = async () => {
    setIsClearing(true);
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
      setCacheKeys([]);
      toast.success("Cache do navegador limpo.");
    } catch {
      toast.error("Falha ao limpar cache.");
    } finally {
      setIsClearing(false);
    }
  };

  const handleRollback = async () => {
    if (!confirm("Reverter para a versão anterior do Service Worker? A página será recarregada e os caches atuais serão limpos.")) return;
    setIsReverting(true);
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      // Restore previous snapshot reference (for diagnostics)
      if (previousSnapshot) {
        localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(previousSnapshot));
      } else {
        localStorage.removeItem(SNAPSHOT_KEY);
      }
      reportPWAEvent("update_activated", "fail", { context: "rollback_triggered" });
      toast.success("Service Worker desregistrado. Recarregando...");
      setTimeout(() => window.location.reload(), 800);
    } catch (e: any) {
      toast.error("Falha ao reverter: " + (e?.message || "erro"));
      setIsReverting(false);
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl font-bold tracking-tight">Painel de Integridade PWA</CardTitle>
          </div>
          <CardDescription className="text-xs uppercase tracking-widest font-bold text-white/40">Status do Sistema & Versão</CardDescription>
        </div>
        <Badge variant={swStatus === "Ativado" ? "secondary" : "outline"} className="gap-1.5 h-7 px-3">
          <Activity className={`w-3.5 h-3.5 ${swStatus === "Ativado" ? "animate-pulse" : ""}`} />
          {swStatus}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Communication error banner */}
        {commError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl border border-destructive/40 bg-destructive/10 flex items-start gap-3"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-bold text-destructive">Falha na comunicação com o Service Worker</p>
              <p className="text-xs text-destructive/80">{commError}</p>
              <Button size="sm" variant="outline" className="mt-2 h-8 text-xs border-destructive/30" onClick={loadSwVersion}>
                Tentar novamente
              </Button>
            </div>
          </motion.div>
        )}

        {/* Rollback recommendation */}
        {shouldRecommendRollback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl border-2 border-amber-500/50 bg-amber-500/10 flex items-start gap-3 shadow-lg shadow-amber-500/10"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1 space-y-2">
              <p className="text-sm font-bold text-amber-300">
                Rollback recomendado — {counters.failuresInWindow} falhas detectadas (limite: {threshold})
              </p>
              <p className="text-xs text-amber-200/80">
                O Service Worker apresentou múltiplas falhas em curto período (comm: {counters.comm}, timeout: {counters.timeout}, ativação: {counters.activation}). Considere reverter para a versão anterior.
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" className="h-8 bg-amber-500 hover:bg-amber-400 text-black font-bold" onClick={handleRollback}>
                  <Undo2 className="w-3.5 h-3.5 mr-1.5" /> Reverter Agora
                </Button>
                <Button size="sm" variant="outline" className="h-8 border-amber-500/30 text-amber-300" onClick={resetCounters}>
                  Ignorar e zerar
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Failure counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Falhas Comm", value: counters.comm, tone: "text-red-400" },
            { label: "Timeouts", value: counters.timeout, tone: "text-amber-400" },
            { label: "Ativação", value: counters.activation, tone: "text-orange-400" },
            { label: "Janela 5min", value: counters.failuresInWindow, tone: counters.failuresInWindow >= threshold ? "text-red-500" : "text-emerald-400" },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className={`text-2xl font-bold font-mono ${s.tone}`}>{s.value}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Versão do App</span>
              <Tag className="w-4 h-4 text-primary" />
            </div>
            <div className="text-lg font-bold font-mono">{APP_VERSION}</div>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Service Worker / Cache</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs font-bold font-mono break-all text-emerald-300">
              {swVersion || (commError ? "—" : "Carregando...")}
            </div>
            {swBuiltAt && (
              <div className="text-[10px] text-muted-foreground">
                Compilado: {new Date(swBuiltAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 group hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Service Worker</span>
              <Smartphone className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${swState === 'activated' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'} animate-pulse`} />
              <span className="text-sm font-bold capitalize">{swState || 'Detectando...'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 group hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cache de Ativos</span>
              <HardDrive className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
            </div>
            <div className="text-sm font-bold flex items-center gap-2">
              {cacheKeys.length} <span className="text-xs font-normal text-muted-foreground">buckets ativos</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 group hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status Global</span>
              <Info className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
            </div>
            <div className="text-sm font-bold">
              {registration?.waiting ? "Update Pendente" : "Versão Recente"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="default" size="sm"
            className="btn-primary gap-2 h-11 px-6 font-bold shadow-lg shadow-primary/20"
            onClick={handleUpdateCheck} disabled={isUpdating}
          >
            <RefreshCw className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`} />
            {registration?.waiting ? "Atualizar Agora" : "Verificar Updates"}
          </Button>

          <Button variant="outline" size="sm"
            className="h-11 px-6 gap-2 border-white/10 hover:bg-white/5 font-bold"
            onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" /> Recarregar UI
          </Button>

          <Button variant="outline" size="sm"
            className="h-11 px-6 gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-bold"
            onClick={handleRollback} disabled={isReverting}>
            <Undo2 className={`w-4 h-4 ${isReverting ? "animate-spin" : ""}`} />
            Reverter SW
          </Button>

          <Button variant="outline" size="sm"
            className="h-11 px-6 gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/30 font-bold ml-auto"
            onClick={handleClearCaches} disabled={isClearing}>
            <Trash2 className={`w-4 h-4 ${isClearing ? "animate-spin" : ""}`} />
            Limpar Cache
          </Button>
        </div>

        {/* Precache Diff */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <FileSearch className="w-3.5 h-3.5" /> Mudanças no Precache
            </h4>
            {currentSnapshot && (
              <span className="text-[10px] text-muted-foreground font-mono">
                {currentSnapshot.files.length} arquivos · {new Date(currentSnapshot.builtAt).toLocaleString()}
              </span>
            )}
          </div>

          {!precacheDiff ? (
            <div className="text-xs text-muted-foreground italic p-4 rounded-xl bg-white/5">
              Carregando manifesto...
            </div>
          ) : precacheDiff.added.length === 0 && precacheDiff.removed.length === 0 && precacheDiff.changed.length === 0 ? (
            <div className="text-xs text-muted-foreground italic p-4 rounded-xl bg-white/5">
              Nenhuma alteração desde o último snapshot.
            </div>
          ) : (
            <ScrollArea className="h-44 w-full rounded-2xl border border-white/5 bg-black/40 p-4">
              <div className="space-y-3 text-[11px] font-mono">
                {precacheDiff.added.map((f, i) => (
                  <div key={`a-${i}`} className="flex gap-2"><span className="text-emerald-400 font-bold">+ ADD</span><span className="text-white/70 break-all">{f.url}</span></div>
                ))}
                {precacheDiff.changed.map((f, i) => (
                  <div key={`c-${i}`} className="flex gap-2"><span className="text-amber-400 font-bold">~ MOD</span><span className="text-white/70 break-all">{f.url}</span></div>
                ))}
                {precacheDiff.removed.map((f, i) => (
                  <div key={`r-${i}`} className="flex gap-2"><span className="text-red-400 font-bold">- DEL</span><span className="text-white/50 break-all">{f.url}</span></div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Event Logs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Fluxo de Eventos (Live Log)</h4>
            {logs.length > 0 && (
              <Badge variant="outline" className="text-[9px] h-5 px-2 bg-primary/5 text-primary border-primary/20 font-bold">SISTEMA ATIVO</Badge>
            )}
          </div>

          <ScrollArea className="h-56 w-full rounded-2xl border border-white/5 bg-black/40 p-4 shadow-inner">
            <div className="space-y-4">
              {logs.length === 0 ? (
                <div className="h-44 flex flex-col items-center justify-center gap-4 text-muted-foreground italic text-center opacity-40">
                  <Activity className="w-10 h-10 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Aguardando interação do sistema...</p>
                </div>
              ) : (
                logs.map((log, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    key={`${log.timestamp}-${i}`}
                    className="flex gap-4 items-start text-[11px] group border-b border-white/5 pb-4 last:border-0"
                  >
                    <span className="text-white/20 whitespace-nowrap pt-1 font-mono text-[10px]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-black tracking-wider transition-colors ${
                          log.status === 'success' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {log.eventType.replace(/_/g, ' ').toUpperCase()}
                        </span>
                        <Badge variant="outline" className={`text-[8px] h-4 px-1.5 font-bold border-none bg-white/5 ${
                          log.status === 'success' ? 'text-emerald-500' : 'text-amber-500'
                        }`}>
                          {log.status.toUpperCase()}
                        </Badge>
                      </div>
                      {log.details && (
                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-white/40 break-all leading-tight">
                          {JSON.stringify(log.details)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
