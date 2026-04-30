import { supabase } from "@/integrations/supabase/client";
import { APP_VERSION } from "./changelog";

export type PWAEventType = "install" | "update_found" | "update_activated" | "error" | "offline";

export const reportPWAEvent = async (
  eventType: PWAEventType,
  status: "success" | "fail" = "success",
  details: any = {}
) => {
  try {
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
    console.error("Failed to report PWA event:", err);
  }
};
