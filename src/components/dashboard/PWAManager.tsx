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

    const handleControllerChange = () => {
      console.log("PWAManager: Controller changed");
      checkSW();
    };
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);
    
    const handlePWAEvent = (e: any) => {
      setLogs(prev => [e.detail, ...prev].slice(0, 50));
    };
    window.addEventListener("pwa-event", handlePWAEvent);

    const loadCaches = async () => {
      try {
        const keys = await caches.keys();
        setCacheKeys(keys);
      } catch (e) {
        console.warn("PWAManager: Failed to load caches", e);
      }
    };
    loadCaches();

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
      window.removeEventListener("pwa-event", handlePWAEvent);
    };
  }, []);

  const handleUpdateCheck = async () => {
    if (!registration) return;
    
    setIsUpdating(true);
    try {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        toast.success("Forçando ativação da nova versão...");
      } else {
        await registration.update();
        toast.info("Buscando atualizações no servidor...");
      }
    } catch (e) {
      toast.error("Falha na comunicação com o Service Worker.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCaches = async () => {
    setIsClearing(true);
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
      setCacheKeys([]);
      toast.success("Cache do navegador limpo.");
    } catch (e) {
      toast.error("Falha ao limpar cache.");
    } finally {
      setIsClearing(false);
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
            variant="default" 
            size="sm" 
            className="btn-primary gap-2 h-11 px-6 font-bold shadow-lg shadow-primary/20"
            onClick={handleUpdateCheck}
            disabled={isUpdating}
          >
            <RefreshCw className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`} />
            {registration?.waiting ? "Atualizar Agora" : "Verificar Updates"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-11 px-6 gap-2 border-white/10 hover:bg-white/5 font-bold"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
            Recarregar UI
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="h-11 px-6 gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/30 font-bold ml-auto"
            onClick={handleClearCaches}
            disabled={isClearing}
          >
            <Trash2 className={`w-4 h-4 ${isClearing ? "animate-spin" : ""}`} />
            Limpar Cache
          </Button>
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
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
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
                          {log.eventType.replace('_', ' ').toUpperCase()}
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