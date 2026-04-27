import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  ShieldAlert, 
  Wifi, 
  WifiOff,
  Server,
  Lock
} from 'lucide-react';
import { supabaseConfig, supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const DiagnosticsPage = () => {
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const runConnectivityCheck = async () => {
    setChecking(true);
    setStatus('idle');
    setErrorDetails(null);

    try {
      if (!supabaseConfig.isConfigured) {
        throw new Error("Variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontradas.");
      }

      const { data, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      setStatus('success');
      toast.success("Conectividade validada com sucesso!");
    } catch (err: any) {
      console.error("Erro no diagnóstico:", err);
      setStatus('error');
      setErrorDetails(err.message || "Erro desconhecido ao tentar conectar ao Supabase.");
      toast.error("Falha na conectividade");
    } finally {
      setChecking(false);
    }
  };

  return (
    <PageLayout
      seo={{
        title: 'Diagnósticos de Sistema — P.A.D.H.',
        description: 'Verifique o status da sua conexão e sincronização.',
        path: '/diagnosticos',
      }}
      currentPage="Configurações"
    >
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Diagnósticos de Sistema</h1>
          <p className="text-muted-foreground">Verifique a saúde da plataforma e conectividade com o banco de dados.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Supabase Status */}
          <Card className={!supabaseConfig.isConfigured ? "border-red-200" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" /> Supabase Config
                  </CardTitle>
                  <CardDescription>Status das variáveis de ambiente</CardDescription>
                </div>
                {!supabaseConfig.isConfigured ? (
                  <ShieldAlert className="h-6 w-6 text-red-500" />
                ) : (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">URL:</span>
                  <span className={supabaseConfig.url ? "text-green-600 font-mono" : "text-red-500 font-bold"}>
                    {supabaseConfig.url ? "Configurada" : "Ausente"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Anon Key:</span>
                  <span className={supabaseConfig.anonKey ? "text-green-600 font-mono" : "text-red-500 font-bold"}>
                    {supabaseConfig.anonKey ? "Configurada" : "Ausente"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connectivity Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" /> Conectividade Real
              </CardTitle>
              <CardDescription>Teste de resposta do servidor</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              {status === 'idle' && (
                <div className="text-center">
                  <WifiOff className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Aguardando teste</p>
                </div>
              )}
              {status === 'success' && (
                <div className="text-center">
                  <Wifi className="h-10 w-10 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-green-600 font-medium">Conectado ao Cloud</p>
                </div>
              )}
              {status === 'error' && (
                <div className="text-center">
                  <XCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-red-600 font-medium">Falha na Conexão</p>
                </div>
              )}
              <Button 
                onClick={runConnectivityCheck} 
                disabled={checking}
                className="mt-6 w-full gap-2"
                variant={status === 'error' ? 'destructive' : 'default'}
              >
                {checking ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                {checking ? "Verificando..." : "Testar Conexão"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {errorDetails && (
          <Card className="mb-8 border-red-200 bg-red-50/50 dark:bg-red-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-700 dark:text-red-400">
                <ShieldAlert className="h-4 w-4" /> Detalhes do Erro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-mono text-red-600 dark:text-red-300 break-all">{errorDetails}</p>
            </CardContent>
          </Card>
        )}

        {/* Offline Mode Info */}
        <Card className="border-primary/10 bg-primary/[0.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WifiOff className="h-5 w-5 text-primary" /> Sincronização e Modo Offline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Atualmente, a plataforma está operando em <strong>Modo de Persistência Local</strong>.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Seu progresso é salvo instantaneamente no LocalStorage do seu navegador.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>As respostas dos exercícios e diagnóstico estão seguras neste dispositivo.</span>
              </li>
              <li className="flex gap-2 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Sem o Supabase configurado, os dados não serão sincronizados entre diferentes computadores ou celulares.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DiagnosticsPage;