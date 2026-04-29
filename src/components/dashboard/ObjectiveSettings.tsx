import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PCH_OBJECTIVES } from "@/types/objectives";
import { useProfile } from "@/hooks/useProfile";
import { Target, Check, RefreshCw, Database, Monitor, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ObjectiveSettings: React.FC = () => {
  const { profile, toggleObjective, loading, isUpdating, forceSync, source, lastSync } = useProfile();

  if (loading) return <div className="animate-pulse h-48 bg-white/5 rounded-2xl" />;

  const isSyncing = source === "syncing" || isUpdating;

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Foco da Jornada</CardTitle>
          </div>
          <CardDescription>
            Escolha um ou mais objetivos principais para personalizar sua trilha.
          </CardDescription>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground cursor-help">
                  {source === "database" ? (
                    <>
                      <Database className="w-3 h-3 text-emerald-400" />
                      Sincronizado
                    </>
                  ) : source === "syncing" ? (
                    <>
                      <RefreshCw className="w-3 h-3 text-primary animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Monitor className="w-3 h-3 text-amber-400" />
                      Local
                    </>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-popover border-border p-3 max-w-xs">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span className="font-bold">Status de Sincronização</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {source === "database" 
                      ? "Seus dados estão seguros na nuvem e disponíveis em qualquer dispositivo." 
                      : "Seu objetivo está salvo apenas neste navegador. Faça login para sincronizar."}
                  </p>
                  {lastSync && (
                    <div className="pt-1 text-[10px] text-primary/70">
                      Última atualização: {format(lastSync, "HH:mm:ss", { locale: ptBR })}
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => forceSync()}
            disabled={isSyncing}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {isUpdating && (
          <div className="absolute inset-0 z-10 bg-background/20 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
             <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}
        
        {PCH_OBJECTIVES.map((obj) => {
          const isActive = profile?.objectives?.includes(obj.id);
          return (
            <div
              key={obj.id}
              onClick={() => !isSyncing && toggleObjective(obj.id)}
              className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 group ${
                isActive 
                  ? "bg-primary/10 border-primary ring-1 ring-primary" 
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
              } ${isSyncing ? "opacity-50 cursor-wait" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-background/50 ${obj.color}`}>
                  <obj.icon className="w-5 h-5" />
                </div>
                {isActive && (
                  <div className="bg-primary rounded-full p-1">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div>
                <h4 className={`font-bold transition-colors ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                  {obj.label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
