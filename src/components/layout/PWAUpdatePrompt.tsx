import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { APP_VERSION } from "@/lib/changelog";
import { reportPWAEvent, PWAUpdateTrace } from "@/lib/pwa-metrics";
import { pwaDebugLog, verifyNetworkFirstAtRuntime } from "@/lib/pwa-debug";

// Module-level reload lock — prevents duplicate reloads when several
// update notifications fire in quick succession (multiple tabs, retries, etc.)
const RELOAD_LOCK_KEY = "pwa_reload_lock";
const RELOAD_LOCK_TTL_MS = 10_000;

function acquireReloadLock(reason: string): boolean {
  try {
    const now = Date.now();
    const raw = sessionStorage.getItem(RELOAD_LOCK_KEY);
    if (raw) {
      const ts = parseInt(raw, 10);
      if (!Number.isNaN(ts) && now - ts < RELOAD_LOCK_TTL_MS) {
        pwaDebugLog("reload_blocked_duplicate", reason, { lockAgeMs: now - ts });
        return false;
      }
    }
    sessionStorage.setItem(RELOAD_LOCK_KEY, String(now));
    return true;
  } catch {
    return true;
  }
}

/**
 * Detects new service worker versions and shows a non-blocking banner
 * inviting the user to refresh. Skips activation in Lovable preview iframes.
 */
const PWAUpdatePrompt = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const traceRef = useRef<PWAUpdateTrace>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if we just reloaded after an update
    const pendingTrace = sessionStorage.getItem("pwa_pending_trace");
    if (pendingTrace) {
      try {
        const trace = JSON.parse(pendingTrace) as PWAUpdateTrace;
        trace.app_ready = Date.now();
        if (trace.download_start) {
          trace.total_duration_ms = trace.app_ready - trace.download_start;
        }
        reportPWAEvent("update_trace", "success", { trace });
        sessionStorage.removeItem("pwa_pending_trace");
        console.log("PWA: Update trace reported", trace);
      } catch (e) {
        console.error("PWA: Failed to parse pending trace", e);
      }
    }

    // Test mode
    (window as any).__TRIGGER_PWA_UPDATE__ = () => {
      traceRef.current.download_start = Date.now();
      setNeedRefresh(true);
    };

    if (!("serviceWorker" in navigator)) return;

    const isInIframe = (() => {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    })();
    const isEditorPreview =
      window.location.hostname.includes("id-preview--") ||
      window.location.hostname.includes("lovableproject.com") ||
      isInIframe;

    if (isEditorPreview) return;

    const onControllerChange = () => {
      traceRef.current.reload_triggered = Date.now();
      sessionStorage.setItem("pwa_pending_trace", JSON.stringify(traceRef.current));
      console.log("PWA: New Service Worker activated. Reloading...");
      
      // Notify user before reload
      toast.success("Sistema atualizado! Recarregando para aplicar mudanças...", {
        duration: 2000,
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;
      setRegistration(reg);

      if (reg.waiting) {
        traceRef.current.install_completed = Date.now();
        console.log("PWA: Found waiting worker. Auto-activating...");
        reg.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      reg.addEventListener("updatefound", () => {
        traceRef.current.download_start = Date.now();
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            traceRef.current.install_completed = Date.now();
            console.log("PWA: New version installed. Auto-activating...");
            // Auto skip waiting → triggers controllerchange → auto reload
            newWorker.postMessage({ type: "SKIP_WAITING" });
            reportPWAEvent("update_found");
          }
        });
      });

      // Poll for updates more aggressively (every 15s)
      const interval = setInterval(() => reg.update().catch(() => {}), 15_000);
      return () => clearInterval(interval);
    });

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  const handleUpdate = () => {
    traceRef.current.activation_start = Date.now();
    reportPWAEvent("update_activated", "success", { method: "manual_force" });
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    } else {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 240 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[92%] md:w-auto"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-4 rounded-2xl border border-primary/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Nova versão disponível</p>
                <Link
                  to="/changelog"
                  onClick={() => setNeedRefresh(false)}
                  className="text-xs text-primary/80 hover:text-primary inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
                >
                  <FileText className="w-3 h-3" /> Ver o que mudou ({APP_VERSION})
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                onClick={handleUpdate}
                className="btn-primary h-9 px-4 text-xs font-bold uppercase tracking-wider"
              >
                Atualizar
              </Button>
              <button
                onClick={() => setNeedRefresh(false)}
                className="text-white/30 hover:text-white/70 transition-colors p-1"
                aria-label="Dispensar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAUpdatePrompt;
