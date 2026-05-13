import React from "react";
import {
  CloudOff,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useSyncStatus } from "@/hooks/useSyncStatus";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { supabaseConfig } from "@/integrations/supabase/config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SyncStatusIndicator = () => {
  const { isOffline } = useOfflineMode();
  const { status } = useSyncStatus();

  const getStatusConfig = () => {
    if (!supabaseConfig.isConfigured || isOffline) {
      return {
        icon: <CloudOff className="w-3.5 h-3.5 text-muted-foreground" />,
        text: !supabaseConfig.isConfigured
          ? "Nuvem não configurada"
          : "Modo Offline",
        color: "text-muted-foreground",
      };
    }

    switch (status) {
      case "pending":
        return {
          icon: <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />,
          text: "Sincronizando...",
          color: "text-primary",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-3.5 h-3.5 text-destructive" />,
          text: "Falha na sincronização",
          color: "text-destructive",
        };
      case "ok":
      default:
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />,
          text: "Dados sincronizados",
          color: "text-green-500",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm cursor-help transition-all hover:bg-white/[0.08]">
            {config.icon}
            <span className={`text-[10px] font-bold uppercase tracking-wider ${config.color} hidden xs:inline`}>
              {config.text}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs bg-black/90 border-white/10 text-white">
          {isOffline
            ? "O progresso está sendo salvo apenas localmente."
            : status === "error" 
            ? "Houve um erro ao sincronizar. Tentaremos novamente em breve." 
            : "Seus dados estão sincronizados com a nuvem."}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SyncStatusIndicator;
