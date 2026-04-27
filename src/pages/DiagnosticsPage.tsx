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
  Lock,
  User,
  Trash2
} from 'lucide-react';
import { supabaseConfig, supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { useNavigate, Link } from 'react-router-dom';

const DiagnosticsPage = () => {
  const { isOffline, toggleOffline, canConnect } = useOfflineMode();
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [simulatedUser, setSimulatedUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('padh_simulated_user');
    if (saved) setSimulatedUser(JSON.parse(saved));
  }, []);

  const clearSimulatedSession = () => {
    localStorage.removeItem('padh_simulated_user');
    setSimulatedUser(null);
    toast.success("Sessão simulada removida.");
  };

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
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm p-2 bg-muted/30 rounded border border-border/50">
                  <span className="text-muted-foreground font-medium">VITE_SUPABASE_URL:</span>
                  <span className={supabaseConfig.url ? "text-primary font-mono text-[10px]" : "text-red-500 font-bold"}>
                    {supabaseConfig.url ? `${supabaseConfig.url.substring(0, 15)}...${supabaseConfig.url.substring(supabaseConfig.url.length - 5)}` : "Ausente"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-muted/30 rounded border border-border/50">
                  <span className="text-muted-foreground font-medium">VITE_SUPABASE_ANON_KEY:</span>
                  <span className={supabaseConfig.anonKey ? "text-primary font-mono text-[10px]" : "text-red-500 font-bold"}>
                    {supabaseConfig.anonKey ? `${supabaseConfig.anonKey.substring(0, 5)}...${supabaseConfig.anonKey.substring(supabaseConfig.anonKey.length - 5)}` : "Ausente"}
                  </span>
                </div>
                {!supabaseConfig.isConfigured && (
                  <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary text-xs">
                    <Link to="/configurar-supabase">Ver guia de configuração</Link>
                  </Button>
                )}
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
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <WifiOff className="h-5 w-5 text-primary" /> Sincronização e Modo Offline
              </CardTitle>
              <Button 
                variant={isOffline ? "destructive" : "outline"} 
                size="sm" 
                onClick={toggleOffline}
                disabled={!canConnect}
              >
                {isOffline ? "Desativar Modo Offline" : "Ativar Modo Offline"}
              </Button>
            </div>
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

        {/* Session Diagnostics */}
        <Card className="mt-8 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Sessão Atual
            </CardTitle>
            <CardDescription>Status da autenticação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {simulatedUser ? (
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-bold">Modo Simulado Ativo</p>
                  <p className="text-xs text-muted-foreground">{simulatedUser.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={clearSimulatedSession} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-2" /> Limpar
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">Nenhuma sessão simulada encontrada.</p>
            )}
            
            {canConnect && (
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/login')}>
                Verificar Login Real
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DiagnosticsPage;