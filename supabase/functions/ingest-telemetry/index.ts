// Edge function pública para ingestão de telemetria (web_vitals + pwa_health_events).
// - verify_jwt=false (default Lovable): aceita anônimos.
// - Insere via service_role, contornando RLS que exige authenticated.
// - Valida payload, sanitiza tamanhos e aplica rate-limit em memória por IP.
// - Nunca lança em direção ao cliente: sempre 200/400/429/500 curtos.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// -------- Rate limit por IP (in-memory, por isolate) --------
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 60; // 60 eventos/min por IP
const ipHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = ipHits.get(ip) ?? [];
  const kept = arr.filter((t) => now - t < RATE_WINDOW_MS);
  if (kept.length >= RATE_MAX_PER_WINDOW) {
    ipHits.set(ip, kept);
    return true;
  }
  kept.push(now);
  ipHits.set(ip, kept);
  return false;
}

// -------- Validação --------
const METRIC_NAMES = new Set(["LCP", "CLS", "INP", "FCP", "TTFB"]);
const RATINGS = new Set(["good", "needs-improvement", "poor"]);
const PWA_EVENTS = new Set([
  "install",
  "update_found",
  "update_activated",
  "error",
  "offline",
  "update_trace",
]);

function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  return v.slice(0, max);
}

function isFiniteNumber(v: unknown, min: number, max: number): boolean {
  return typeof v === "number" && Number.isFinite(v) && v >= min && v < max;
}

type WebVitalRow = {
  metric_name: string;
  metric_value: number;
  metric_rating: string | null;
  page_url: string | null;
  user_agent: string | null;
  device_type: string | null;
  session_id: string | null;
};

function parseWebVital(input: any): WebVitalRow | { error: string } {
  if (!input || typeof input !== "object") return { error: "invalid_payload" };
  if (!METRIC_NAMES.has(input.metric_name)) return { error: "invalid_metric_name" };
  if (!isFiniteNumber(input.metric_value, 0, 600_000)) return { error: "invalid_metric_value" };
  const rating =
    input.metric_rating == null
      ? null
      : RATINGS.has(input.metric_rating)
        ? input.metric_rating
        : null;
  return {
    metric_name: input.metric_name,
    metric_value: Number(input.metric_value.toFixed(3)),
    metric_rating: rating,
    page_url: str(input.page_url, 2048),
    user_agent: str(input.user_agent, 512),
    device_type: str(input.device_type, 32),
    session_id: str(input.session_id, 128),
  };
}

type PwaEventRow = {
  event_type: string;
  status: string | null;
  version: string | null;
  user_agent: string | null;
  details: Record<string, unknown>;
  user_id: string | null;
};

function parsePwaEvent(input: any): PwaEventRow | { error: string } {
  if (!input || typeof input !== "object") return { error: "invalid_payload" };
  if (!PWA_EVENTS.has(input.event_type)) return { error: "invalid_event_type" };
  const status =
    typeof input.status === "string" && (input.status === "success" || input.status === "fail")
      ? input.status
      : null;
  const details =
    input.details && typeof input.details === "object" && !Array.isArray(input.details)
      ? input.details
      : {};
  return {
    event_type: input.event_type,
    status,
    version: str(input.version, 64),
    user_agent: str(input.user_agent, 512),
    details: details as Record<string, unknown>,
    user_id: null, // ingestão pública nunca confia em user_id do cliente
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ error: "rate_limited" }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const kind = body?.kind;
  const events: any[] = Array.isArray(body?.events) ? body.events : [];
  if (events.length === 0 || events.length > 50) {
    return new Response(JSON.stringify({ error: "invalid_batch" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    if (kind === "web_vital") {
      const parsed: WebVitalRow[] = [];
      for (const e of events) {
        const r = parseWebVital(e);
        if ("error" in r) continue; // descarta item inválido, mas segue com o resto
        parsed.push(r);
      }
      if (parsed.length === 0) {
        return new Response(JSON.stringify({ error: "no_valid_events" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await admin.from("web_vitals").insert(parsed);
      if (error) {
        console.error("[ingest-telemetry] web_vitals insert failed", error);
        return new Response(JSON.stringify({ error: "insert_failed" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ inserted: parsed.length }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (kind === "pwa_event") {
      const parsed: PwaEventRow[] = [];
      for (const e of events) {
        const r = parsePwaEvent(e);
        if ("error" in r) continue;
        parsed.push(r);
      }
      if (parsed.length === 0) {
        return new Response(JSON.stringify({ error: "no_valid_events" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await admin.from("pwa_health_events").insert(parsed);
      if (error) {
        console.error("[ingest-telemetry] pwa_health_events insert failed", error);
        return new Response(JSON.stringify({ error: "insert_failed" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ inserted: parsed.length }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "invalid_kind" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[ingest-telemetry] unexpected", err);
    return new Response(JSON.stringify({ error: "internal" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
