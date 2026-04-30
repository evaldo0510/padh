import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { APP_VERSION } from "@/lib/changelog";
import { reportPWAEvent } from "@/lib/pwa-metrics";

/**
 * Detects new service worker versions and shows a non-blocking banner
 * inviting the user to refresh. Skips activation in Lovable preview iframes.
 */
const PWAUpdatePrompt = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Test mode
    (window as any).__TRIGGER_PWA_UPDATE__ = () => setNeedRefresh(true);

    if (!("serviceWorker" in navigator)) return;

    const isPreview =
      window.location.hostname.includes("id-preview--") ||
      window.location.hostname.includes("lovableproject.com") ||
      window.location.hostname.includes("lovable.app") ||
      window.self !== window.top;

    if (isPreview) return;

    const onControllerChange = () => {
      // FORCE RELOAD immediately when a new SW takes control.
      console.log("PWA: New Service Worker activated. Reloading...");
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;
      setRegistration(reg);

      // Aggressive Update Check: If waiting, skip immediately.
      if (reg.waiting) {
        console.log("PWA: Found waiting worker. Skipping waiting phase...");
        reg.waiting.postMessage({ type: "SKIP_WAITING" });
        setNeedRefresh(true);
      }

      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.log("PWA: New version installed. Activating now...");
            newWorker.postMessage({ type: "SKIP_WAITING" });
            setNeedRefresh(true);
            reportPWAEvent("update_found");
          }
        });
      });

      // Poll frequently (every 30s) for aggressive freshness.
      const interval = setInterval(() => reg.update().catch(() => {}), 30_000);
      return () => clearInterval(interval);
    });

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  const handleUpdate = () => {
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
