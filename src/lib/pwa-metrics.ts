import { APP_VERSION } from "./changelog";

export type PWAEventType = "install" | "update_found" | "update_activated" | "error" | "offline";

export const reportPWAEvent = async (
  eventType: PWAEventType,
  status: "success" | "fail" = "success",
  details: any = {}
) => {
  // Silent in dev
  if (import.meta.env.DEV) return;
  
  try {
    // Dynamically import supabase to avoid circular dependencies if any
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
    // Use standard console so it shows up in logs without circular dep issues
    console.warn("PWA Metrics: failed to report event", eventType, err);
  }
};
