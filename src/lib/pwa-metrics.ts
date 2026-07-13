import { APP_VERSION } from "./changelog";

export type PWAEventType = 
  | "install" 
  | "update_found" 
  | "update_activated" 
  | "error" 
  | "offline" 
  | "update_trace";

export interface PWAUpdateTrace {
  download_start?: number;
  install_completed?: number;
  activation_start?: number;
  reload_triggered?: number;
  app_ready?: number;
  total_duration_ms?: number;
}

export const reportPWAEvent = async (
  eventType: PWAEventType,
  status: "success" | "fail" = "success",
  details: any = {}
) => {
  // Dispatch local event for UI monitoring
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("pwa-event", { 
      detail: { eventType, status, details, timestamp: new Date().toISOString() } 
    }));
  }

  // Silent in dev
  if (import.meta.env.DEV) return;
  
  try {
    const { supabase } = await import("@/integrations/supabase/client");

    // Envio via edge function pública (aceita anônimos, insere com service_role)
    const { error } = await supabase.functions.invoke("ingest-telemetry", {
      body: {
        kind: "pwa_event",
        events: [
          {
            event_type: eventType,
            status,
            version: APP_VERSION,
            user_agent: navigator.userAgent,
            details: {
              ...details,
              url: window.location.href,
              timestamp: new Date().toISOString(),
            },
          },
        ],
      },
    });
    if (error) {
      console.warn("PWA Metrics: ingest-telemetry error", eventType, error);
    }
  } catch (err) {
    console.warn("PWA Metrics: failed to report event", eventType, err);
  }
};
