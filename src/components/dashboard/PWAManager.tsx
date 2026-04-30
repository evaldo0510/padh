import React, { useEffect, useState } from "react";
import { 
  ShieldCheck, RefreshCw, Trash2, Activity, 
  CheckCircle2, AlertCircle, Info, Database,
  Smartphone, HardDrive
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface PWAEvent {
  eventType: string;
  status: string;
  details: any;
  timestamp: string;
}

export const PWAManager: React.FC = () => {
  const [swStatus, setSwStatus] = useState<string>("Detectando...");
  const [swState, setSwState] = useState<string | null>(null);
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [logs, setLogs] = useState<PWAEvent[]>([]);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

    checkSW();

    // Listen for state changes
    const handleStateChange = () => checkSW();
    navigator.serviceWorker.addEventListener("controllerchange", handleStateChange);
    
    // Listen for custom PWA events from pwa-metrics
    const handlePWAEvent = (e: any) => {
      setLogs(prev => [e.detail, ...prev].slice(0, 50));
    };
    window.addEventListener("pwa-event", handlePWAEvent);

    const loadCaches = async () => {
      const keys = await caches.keys();
      setCacheKeys(keys);
    };
    loadCaches();

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", handleStateChange);
      window.removeEventListener("pwa-event", handlePWAEvent);
    };
  }, []);

  const handleUpdateNow = async () => {
    if (!registration?.waiting) {
      setIsUpdating(true);
      try {
        await registration?.update();
        toast.info("Buscando atualizações...");
      } catch (e) {
        toast.error("Falha ao buscar atualização.");
      } finally {
        setIsUpdating(false);
      }
      return;
    }

    setIsUpdating(true);
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    toast.success("Forçando ativação da nova versão...");
    // The controllerchange event will trigger a reload via PWAUpdatePrompt
  };

  const handleClearCaches = async () => {
    setIsClearing(true);
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
      setCacheKeys([]);
      toast.success("Cache limpo com sucesso.");
      
      // Also unregister SW to force a clean slate if needed
      // but usually just clearing cache is enough for "manual clear"
    } catch (e) {
      toast.error("Falha ao limpar cache.");
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">Segurança & PWA</CardTitle>
          </div>
          <CardDescription>Gerencie a integridade e atualizações do seu aplicativo.</CardDescription>
        </div>
        <Badge variant={swStatus === "Ativado" ? "secondary" : "outline"} className="gap-1.5 h-6">
          <Activity className={`w-3 h-3 ${swStatus === "Ativado" ? "animate-pulse" : ""}`} />
          {swStatus}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estado</span>
              <Smartphone className="w-3.5 h-3.5 text-primary/40" />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${swState === 'activated' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
              <span className="text-sm font-medium capitalize">{swState || 'Detectando'}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cache</span>
              <HardDrive className="w-3.5 h-3.5 text-primary/40" />
            </div>
            <div className="text-sm font-medium">
              {cacheKeys.length} buckets ativos
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ação Pendente</span>
              <Info className="w-3.5 h-3.5 text-primary/40" />
            </div>
            <div className="text-sm font-medium">
              {registration?.waiting ? "Atualização pronta" : "Sistema em dia"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="default" 
            size="sm" 
            className="btn-primary gap-2 h-10 px-6"
            onClick={handleUpdateNow}
            disabled={isUpdating}
          >
            <RefreshCw className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`} />
            Atualizar Agora
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 px-6 gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/30"
            onClick={handleClearCaches}
            disabled={isClearing}
          >
            <Trash2 className={`w-4 h-4 ${isClearing ? "animate-spin" : ""}`} />
            Limpar Cache
          </Button>
        </div>

        {/* Event Logs */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Logs de Atividade</h4>
            {logs.length > 0 && (
               <Badge variant="outline" className="text-[8px] h-4">Live</Badge>
            )}
          </div>
          
          <ScrollArea className="h-48 w-full rounded-xl border border-white/5 bg-black/40 p-4">
            <div className="space-y-4">
              {logs.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center gap-2 text-muted-foreground italic text-center">
                  <Activity className="w-8 h-8 opacity-10" />
                  <p className="text-[10px] uppercase tracking-widest">Aguardando eventos...</p>
                </div>
              ) : (
                logs.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={`${log.timestamp}-${i}`} 
                    className="flex gap-4 items-start text-[11px] group border-b border-white/5 pb-3 last:border-0"
                  >
                    <span className="text-white/20 whitespace-nowrap pt-1 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold transition-colors ${
                          log.status === 'success' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {log.eventType.replace('_', ' ').toUpperCase()}
                        </span>
                        <Badge variant="outline" className="text-[8px] h-3.5 px-1 uppercase">
                          {log.status}
                        </Badge>
                      </div>
                      {log.details && (
                        <p className="text-[10px] text-muted-foreground leading-tight line-clamp-1">
                          {JSON.stringify(log.details)}
                        </p>
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