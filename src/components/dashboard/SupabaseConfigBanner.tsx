import React from 'react';
import { AlertCircle, Database, Settings, ShieldAlert, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { supabaseConfig } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useOfflineMode } from '@/hooks/useOfflineMode';

const SupabaseConfigBanner = () => {
  const { isOffline, toggleOffline, canConnect } = useOfflineMode();
  
  const statusColor = isOffline ? "amber" : "green";
  const configStatus = supabaseConfig.isConfigured;

  return (
    <Alert 
      variant="default"
      className={`mb-8 border-2 backdrop-blur-sm transition-all duration-300 ${
        !configStatus 
          ? "border-red-500/20 bg-red-50/50 dark:bg-red-950/10" 
          : isOffline 
            ? "border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10"
            : "border-green-500/20 bg-green-50/50 dark:bg-green-950/10"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${
          !configStatus ? "bg-red-100 text-red-600" : isOffline ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"
        }`}>
          {!configStatus ? <ShieldAlert className="h-5 w-5" /> : isOffline ? <WifiOff className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
        </div>
        
        <div className="flex-1">
          <AlertTitle className="font-bold flex items-center justify-between flex-wrap gap-2">
            <span className="flex items-center gap-2">
              Status do Sistema: {isOffline ? "Modo Offline" : "Modo Online"}
            </span>
            <div className="flex gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                configStatus ? "bg-green-100/50 border-green-200 text-green-700" : "bg-red-100/50 border-red-200 text-red-700"
              }`}>
                Config: {configStatus ? "OK" : "PENDENTE"}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                isOffline ? "bg-amber-100/50 border-amber-200 text-amber-700" : "bg-green-100/50 border-green-200 text-green-700"
              }`}>
                Conexão: {isOffline ? "OFFLINE" : "ONLINE"}
              </span>
            </div>
          </AlertTitle>
          
          <AlertDescription className="mt-2">
            <p className="text-sm text-muted-foreground mb-4">
              {isOffline 
                ? "O sistema está operando em modo offline. O progresso será salvo apenas localmente neste navegador até que a sincronização seja reativada."
                : "O sistema está sincronizando dados com o servidor Supabase em tempo real."}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="bg-background/50 p-3 rounded border border-border font-mono text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">VITE_SUPABASE_URL:</span>
                  <span className={`font-bold ${supabaseConfig.url ? "text-green-600" : "text-red-500"}`}>
                    {supabaseConfig.url ? "✓ PRESENTE" : "✗ AUSENTE"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">VITE_SUPABASE_ANON_KEY:</span>
                  <span className={`font-bold ${supabaseConfig.anonKey ? "text-green-600" : "text-red-500"}`}>
                    {supabaseConfig.anonKey ? "✓ PRESENTE" : "✗ AUSENTE"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <Button variant="outline" size="sm" asChild className="bg-background h-8 text-xs">
                  <Link to="/diagnosticos" className="flex items-center gap-1">
                    <Settings className="h-3 w-3" /> Diagnósticos
                  </Link>
                </Button>
                
                {canConnect ? (
                  <Button 
                    variant={isOffline ? "default" : "secondary"} 
                    size="sm" 
                    onClick={toggleOffline}
                    className="h-8 text-xs flex items-center gap-1"
                  >
                    {isOffline ? (
                      <><Wifi className="h-3 w-3" /> Reativar Online</>
                    ) : (
                      <><WifiOff className="h-3 w-3" /> Forçar Offline</>
                    )}
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" disabled className="h-8 text-xs flex items-center gap-1 opacity-50">
                    <Database className="h-3 w-3" /> Configuração necessária para sincronizar
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

export default SupabaseConfigBanner;