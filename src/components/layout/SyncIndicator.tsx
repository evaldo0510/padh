import React, { useState, useEffect } from "react";
import { RefreshCw, CheckCircle2, AlertCircle, CloudOff } from "lucide-react";
import { useSyncStatus } from "@/hooks/useSyncStatus";
import { cn } from "@/lib/utils";

const SyncIndicator = ({ className }: { className?: string }) => {
  const { status } = useSyncStatus();
  const [visible, setVisible] = useState(false);
  const [lastStatus, setLastStatus] = useState(status);

  useEffect(() => {
    if (status === "pending") {
      setVisible(true);
    } else if (status === "error") {
      setVisible(true);
    } else if (status === "ok") {
      // Only show "Sincronizado" if we were previously pending or error
      if (lastStatus === "pending" || lastStatus === "error") {
        setVisible(true);
        const timer = setTimeout(() => {
          setVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setVisible(false);
      }
    } else if (status === "blocked") {
      setVisible(true);
    }
    setLastStatus(status);
  }, [status, lastStatus]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2 py-1 rounded-md text-[10px] font-bold transition-all duration-500 animate-in fade-in slide-in-from-top-1",
        status === "pending" && "text-primary bg-primary/10",
        status === "ok" && "text-green-400 bg-green-400/10",
        status === "error" && "text-red-400 bg-red-400/10",
        status === "blocked" && "text-amber-400 bg-amber-400/10",
        className
      )}
    >
      {status === "pending" && <RefreshCw className="w-3 h-3 animate-spin" />}
      {status === "ok" && <CheckCircle2 className="w-3 h-3" />}
      {status === "error" && <AlertCircle className="w-3 h-3" />}
      {status === "blocked" && <CloudOff className="w-3 h-3" />}
      
      <span className="uppercase tracking-widest whitespace-nowrap">
        {status === "pending" && "Sincronizando..."}
        {status === "ok" && "Sincronizado"}
        {status === "error" && "Falha na sincronização"}
        {status === "blocked" && "Modo Offline"}
      </span>
    </div>
  );
};

export default SyncIndicator;
