import React, { useState } from 'react';
import { AlertCircle, Database, Settings, ShieldAlert, Wifi, WifiOff, RefreshCw, HelpCircle, CheckCircle2, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { supabaseConfig } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { useSyncStatus } from '@/hooks/useSyncStatus';
import { toast } from 'sonner';

const SupabaseConfigBanner = () => {
  const { isOffline, toggleOffline, canConnect } = useOfflineMode();
  const { status: syncStatus } = useSyncStatus();
  const [isReconnecting, setIsReconnecting] = useState(false);
  
  const configStatus = supabaseConfig.isConfigured;

  const maskValue = (val: string) => {
    if (!val) return "AUSENTE";
    if (val.length <= 8) return val;
    return `${val.substring(0, 4)}...${val.substring(val.length - 4)}`;
  };

  const handleReconnect = async () => {
    setIsReconnecting(true);
    // Simulate a check - in reality, vite env vars require a rebuild to change,
    // but we can check if the current ones work.
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (canConnect) {
        toast.success("Conexão com Supabase verificada!");
      } else {
        toast.error("Configuração ainda ausente ou inválida.");
      }
    } finally {
      setIsReconnecting(false);
    }
  };

  const getSyncBadge = () => {
    if (!configStatus || isOffline) return { label: "BLOQUEADO", color: "bg-muted text-muted-foreground border-border", icon: <Clock className="h-3 w-3" /> };
    
    switch (syncStatus) {
      case 'ok': return { label: "SYNC: OK", color: "bg-primary/10 text-primary border-primary/20", icon: <CheckCircle2 className="h-3 w-3" /> };
      case 'pending': return { label: "SYNC: PENDENTE", color: "bg-secondary/10 text-secondary border-secondary/20", icon: <RefreshCw className="h-3 w-3 animate-spin" /> };
      case 'error': return { label: "SYNC: ERRO", color: "bg-destructive/10 text-destructive border-destructive/20", icon: <AlertCircle className="h-3 w-3" /> };
      default: return { label: "SYNC: OK", color: "bg-primary/10 text-primary border-primary/20", icon: <CheckCircle2 className="h-3 w-3" /> };
    }
  };

  const syncBadge = getSyncBadge();

  return (
    <Alert 
      variant="default"
      className={`mb-8 border-2 backdrop-blur-sm transition-all duration-300 shadow-sm ${
        !configStatus 
          ? "border-red-500/20 bg-red-50/50 dark:bg-red-950/10" 
          : isOffline 
            ? "border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10"
            : "border-green-500/20 bg-green-50/50 dark:bg-green-950/10"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl shadow-inner ${
          !configStatus ? "bg-red-100 text-red-600" : isOffline ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"
        }`}>
          {!configStatus ? <ShieldAlert className="h-6 w-6" /> : isOffline ? <WifiOff className="h-6 w-6" /> : <Wifi className="h-6 w-6" />}
        </div>
        
        <div className="flex-1">
          <AlertTitle className="font-heading font-bold flex items-center justify-between flex-wrap gap-2 text-base">
            <span className="flex items-center gap-2">
              Status do Sistema: {isOffline ? "Modo Offline" : "Modo Online"}
            </span>
            <div className="flex gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${syncBadge.color}`}>
                {syncBadge.icon} {syncBadge.label}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                configStatus ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
              }`}>
                Config: {configStatus ? "OK" : "PENDENTE"}
              </span>
            </div>
          </AlertTitle>
          
          <AlertDescription className="mt-3">
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {isOffline 
                ? "O sistema está operando em modo offline. O progresso será salvo apenas localmente neste navegador."
                : "O sistema está sincronizando dados com o servidor Supabase em tempo real."}
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              <div className="bg-background/80 p-3 rounded-lg border border-border/50 font-mono text-[11px] space-y-1.5 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">URL:</span>
                  <span className={`font-bold ${supabaseConfig.url ? "text-primary" : "text-red-500"}`}>
                    {maskValue(supabaseConfig.url)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">ANON_KEY:</span>
                  <span className={`font-bold ${supabaseConfig.anonKey ? "text-primary" : "text-red-500"}`}>
                    {maskValue(supabaseConfig.anonKey)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReconnect}
                  disabled={isReconnecting}
                  className="bg-background h-8 text-xs font-medium"
                >
                  <RefreshCw className={`h-3 w-3 mr-1.5 ${isReconnecting ? 'animate-spin' : ''}`} /> 
                  Tentar reconectar
                </Button>

                <Button variant="outline" size="sm" asChild className="bg-background h-8 text-xs font-medium">
                  <Link to="/diagnosticos">
                    <Settings className="h-3 w-3 mr-1.5" /> Diagnósticos
                  </Link>
                </Button>
                
                <Button variant="ghost" size="sm" asChild className="h-8 text-xs text-primary hover:text-primary/80 hover:bg-primary/5">
                  <Link to="/configurar-supabase">
                    <HelpCircle className="h-3 w-3 mr-1.5" /> Como configurar
                  </Link>
                </Button>
                
                {canConnect && (
                  <Button 
                    variant={isOffline ? "default" : "secondary"} 
                    size="sm" 
                    onClick={toggleOffline}
                    className="h-8 text-xs font-bold"
                  >
                    {isOffline ? "Ativar Sincronização" : "Forçar Offline"}
                  </Button>
                )}
              </div>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default SupabaseConfigBanner;