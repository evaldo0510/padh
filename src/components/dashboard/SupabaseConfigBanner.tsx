import React from 'react';
import { AlertCircle, Database, Settings, ShieldAlert, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { supabaseConfig } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useOfflineMode } from '@/hooks/useOfflineMode';

const SupabaseConfigBanner = () => {
  const { isOffline, toggleOffline, canConnect } = useOfflineMode();
  
  // If configured and not forcing offline, don't show the warning banner
  if (supabaseConfig.isConfigured && !isOffline) return null;

  return (
    <Alert 
      variant={isOffline && supabaseConfig.isConfigured ? "default" : "destructive"} 
      className={`mb-8 border-2 backdrop-blur-sm ${
        isOffline && supabaseConfig.isConfigured 
          ? "border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10" 
          : "border-red-500/20 bg-red-50/50 dark:bg-red-950/10"
      }`}
    >
      {isOffline ? <WifiOff className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
      <AlertTitle className="font-bold flex items-center gap-2">
        {isOffline && supabaseConfig.isConfigured 
          ? "Modo Offline Ativado Manualmente" 
          : "Configuração do Banco de Dados Pendente"}
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-4">
        <p className="text-sm">
          {isOffline 
            ? "O sistema está operando em modo offline. O progresso será salvo apenas localmente neste navegador até que a sincronização seja reativada."
            : "O sistema de persistência na nuvem (Supabase) não está configurado. O progresso será salvo apenas localmente neste navegador."}
        </p>
        
        {!supabaseConfig.isConfigured && (
          <div className="bg-background/50 p-3 rounded border border-red-200 dark:border-red-900/30 font-mono text-xs space-y-1">
            <div className="flex justify-between">
              <span>VITE_SUPABASE_URL:</span>
              <span className={supabaseConfig.url ? "text-green-600" : "text-red-500"}>
                {supabaseConfig.url ? "Detectada" : "AUSENTE"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>VITE_SUPABASE_ANON_KEY:</span>
              <span className={supabaseConfig.anonKey ? "text-green-600" : "text-red-500"}>
                {supabaseConfig.anonKey ? "Detectada" : "AUSENTE"}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" asChild className="bg-background">
            <Link to="/diagnosticos" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Ver Diagnósticos
            </Link>
          </Button>
          
          {canConnect && (
            <Button 
              variant={isOffline ? "default" : "secondary"} 
              size="sm" 
              onClick={toggleOffline}
              className="flex items-center gap-2"
            >
              {isOffline ? (
                <><Wifi className="h-4 w-4" /> Reativar Sincronização</>
              ) : (
                <><WifiOff className="h-4 w-4" /> Ativar Modo Offline</>
              )}
            </Button>
          )}
          
          {!canConnect && (
            <Button variant="secondary" size="sm" disabled className="flex items-center gap-2 opacity-70">
              <WifiOff className="h-4 w-4" /> Modo Offline Obrigatório
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SupabaseConfigBanner;