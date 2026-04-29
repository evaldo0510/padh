import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PCH_OBJECTIVES } from "@/types/objectives";
import { useProfile } from "@/hooks/useProfile";
import { 
  Target, Check, RefreshCw, Database, Monitor, 
  HelpCircle, Loader2, History, Trash2, 
  ArrowRight, Settings2, Zap, Hand, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const ObjectiveSettings: React.FC = () => {
  const { 
    profile, toggleObjective, loading, isUpdating, 
    forceSync, source, lastSync, applyMode, 
    toggleApplyMode, applyChanges, history, clearHistory 
  } = useProfile();

  const [showHistory, setShowHistory] = useState(false);

  if (loading) return <div className="animate-pulse h-48 bg-white/5 rounded-2xl" />;

  const isSyncing = source === "syncing" || isUpdating;

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden relative">
      <AnimatePresence>
        {isUpdating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-background/60 backdrop-blur-md flex flex-col items-center justify-center gap-4"
          >
             <div className="relative">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <Target className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
             </div>
             <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary animate-pulse">Recalibrando Jornada...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <CardHeader className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Foco da Jornada</CardTitle>
          </div>
          <CardDescription>
            Customize sua trilha. Selecione múltiplos objetivos se desejar.
          </CardDescription>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Apply Mode Toggle */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 shadow-sm">
            <div className="flex items-center gap-2 min-w-[70px]">
              {applyMode === 'auto' ? <Zap className="w-3 h-3 text-primary" /> : <Hand className="w-3 h-3 text-muted-foreground" />}
              <Label htmlFor="apply-mode" className="text-[10px] font-bold uppercase tracking-wider cursor-pointer">
                {applyMode === 'auto' ? 'Auto' : 'Manual'}
              </Label>
            </div>
            <Switch 
              id="apply-mode"
              checked={applyMode === 'auto'} 
              onCheckedChange={(val) => toggleApplyMode(val ? 'auto' : 'manual')}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground cursor-help">
                  {source === "database" ? (
                    <>
                      <Database className="w-3 h-3 text-emerald-400" />
                      Sincronizado
                    </>
                  ) : (
                    <>
                      <Monitor className="w-3 h-3 text-amber-400" />
                      Local
                    </>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-popover border-border p-3 max-w-xs shadow-2xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span className="font-bold text-xs text-foreground">Informações de Dados</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {source === "database" 
                      ? "Dados na nuvem. Acessíveis em qualquer dispositivo." 
                      : "Salvo localmente. Faça login para proteção permanente."}
                  </p>
                  {lastSync && (
                    <div className="pt-1 text-[10px] text-primary/70">
                      Sync: {format(lastSync, "HH:mm:ss", { locale: ptBR })}
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 rounded-lg p-0 relative"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="w-4 h-4 text-muted-foreground" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border border-background" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 rounded-lg p-0"
              onClick={() => forceSync()}
              disabled={isSyncing}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {PCH_OBJECTIVES.map((obj) => {
            const isActive = profile?.objectives?.includes(obj.id);
            return (
              <motion.div
                key={obj.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => !isSyncing && toggleObjective(obj.id)}
                className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 group ${
                  isActive 
                    ? "bg-primary/10 border-primary ring-1 ring-primary shadow-glow shadow-primary/5" 
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                } ${isSyncing ? "opacity-50 cursor-wait" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-background/50 ${obj.color}`}>
                    <obj.icon className="w-5 h-5" />
                  </div>
                  {isActive && (
                    <div className="bg-primary rounded-full p-1 shadow-lg">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className={`font-bold text-sm transition-colors ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                    {obj.label}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                    {obj.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {applyMode === 'manual' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
               <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3 text-xs">
                     <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Settings2 className="w-4 h-4 text-primary animate-pulse" />
                     </div>
                     <span className="font-medium text-foreground">Configurações pendentes</span>
                  </div>
                  <Button size="sm" onClick={applyChanges} disabled={isSyncing} className="gap-2 rounded-full h-9 px-6 font-bold shadow-lg shadow-primary/20">
                     Aplicar <ArrowRight className="w-3 h-3" />
                  </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showHistory && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/5 space-y-4">
                 <div className="flex items-center justify-between">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sessões de Sincronização</h5>
                    <Button variant="ghost" size="sm" onClick={clearHistory} className="h-7 text-[9px] gap-1.5 hover:text-destructive hover:bg-destructive/5 rounded-full px-3 transition-colors">
                       <Trash2 className="w-3.5 h-3.5" /> Limpar Logs
                    </Button>
                 </div>
                 
                 <ScrollArea className="h-48 w-full rounded-xl border border-white/5 bg-black/40 p-4">
                    <div className="space-y-4">
                       {history.length === 0 ? (
                         <div className="h-40 flex items-center justify-center text-[10px] text-muted-foreground italic uppercase tracking-widest animate-pulse">Vazio</div>
                       ) : history.map((log, i) => (
                         <div key={i} className="flex gap-4 items-start text-[11px] group">
                            <span className="text-white/20 whitespace-nowrap pt-1 font-mono">
                               {format(log.timestamp, "HH:mm:ss")}
                            </span>
                            <div className="space-y-1.5 flex-1">
                               <div className="flex items-center gap-2">
                                  <span className="font-bold text-foreground group-hover:text-primary transition-colors">{log.action}</span>
                                  <Badge variant="outline" className={`text-[8px] h-4 py-0 leading-none uppercase tracking-tighter ${
                                    log.source === 'database' ? 'border-emerald-500/20 text-emerald-400' : 'border-amber-500/20 text-amber-400'
                                  }`}>
                                     via {log.source}
                                  </Badge>
                               </div>
                               <div className="flex gap-1.5 flex-wrap">
                                  {log.objectives.map(o => (
                                    <span key={o} className="text-[9px] text-primary/60 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/10 font-medium">
                                       {o}
                                    </span>
                                  ))}
                                  {log.objectives.length === 0 && <span className="text-[9px] text-white/20 italic">Limpeza efetuada</span>}
                                </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </ScrollArea>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
