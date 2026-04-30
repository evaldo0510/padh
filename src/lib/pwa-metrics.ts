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
  // Silent in dev
  if (import.meta.env.DEV) return;
  
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data: { session } } = await supabase.auth.getSession();
    
    await supabase.from("pwa_health_events").insert({
      event_type: eventType,
      status,
      version: APP_VERSION,
      user_id: session?.user?.id,
      user_agent: navigator.userAgent,
      details: {
        ...details,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.warn("PWA Metrics: failed to report event", eventType, err);
  }
};
