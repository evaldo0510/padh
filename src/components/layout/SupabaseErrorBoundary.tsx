import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { ShieldAlert, RefreshCw, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class SupabaseErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("SupabaseErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const isSupabaseError = 
        this.state.error?.message?.toLowerCase().includes('supabase') || 
        this.state.error?.stack?.toLowerCase().includes('supabase');

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-heading font-bold">Ops! Algo deu errado</h1>
              <p className="text-muted-foreground">
                {isSupabaseError 
                  ? "Detectamos um problema na comunicação com o banco de dados. Isso pode ser devido a configurações ausentes ou falha na rede."
                  : "Ocorreu um erro inesperado ao carregar esta página."}
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 bg-muted rounded-lg text-left overflow-auto max-h-32">
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Tentar Novamente
              </Button>
              
              <Button variant="outline" asChild className="w-full gap-2">
                <Link to="/diagnosticos">
                  <Settings className="h-4 w-4" /> Abrir Diagnósticos
                </Link>
              </Button>

              <Button variant="ghost" asChild className="w-full">
                <Link to="/">Voltar para o Início</Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.children;
  }
}

export default SupabaseErrorBoundary;