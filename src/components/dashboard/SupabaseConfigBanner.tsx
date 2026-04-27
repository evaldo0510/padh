import React from 'react';
import { AlertCircle, Database, Settings, ShieldAlert, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { supabaseConfig } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

const SupabaseConfigBanner = () => {
  if (supabaseConfig.isConfigured) return null;

  return (
    <Alert variant="destructive" className="mb-8 border-2 border-red-500/20 bg-red-50/50 dark:bg-red-950/10 backdrop-blur-sm">
      <ShieldAlert className="h-5 w-5" />
      <AlertTitle className="font-bold flex items-center gap-2">
        Configuração do Banco de Dados Pendente
      </AlertTitle>
      <AlertDescription className="mt-2 space-y-4">
        <p className="text-sm">
          O sistema de persistência na nuvem (Supabase) não está configurado. O progresso será salvo <strong>apenas localmente</strong> neste navegador.
        </p>
        
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

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" asChild className="bg-background">
            <Link to="/diagnosticos" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Ver Diagnósticos
            </Link>
          </Button>
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <WifiOff className="h-4 w-4" /> Modo Offline Ativo
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SupabaseConfigBanner;