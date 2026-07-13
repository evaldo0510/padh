/**
 * Coleta contínua de Core Web Vitals (LCP, CLS, INP, FCP, TTFB) e envio
 * assíncrono para a tabela `web_vitals` no backend (Lovable Cloud).
 *
 * Princípios:
 * - Não bloqueia render (import dinâmico, executado após load).
 * - Não coleta dados pessoais: apenas URL da página, user-agent e um
 *   session_id efêmero (sessionStorage).
 * - Falhas silenciosas: nenhum erro de rede/telemetria pode quebrar o app.
 * - Usa navigator.sendBeacon quando possível para não atrasar navegação.
 */
import { supabase } from "@/integrations/supabase/client";

type MetricName = "LCP" | "CLS" | "INP" | "FCP" | "TTFB";

interface WebVitalPayload {
  metric_name: MetricName;
  metric_value: number;
  metric_rating: "good" | "needs-improvement" | "poor" | null;
  page_url: string;
  user_agent: string;
  device_type: "mobile" | "tablet" | "desktop" | "unknown";
  session_id: string;
}

const SESSION_KEY = "wv_session_id";

function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id =
      (crypto as any)?.randomUUID?.() ??
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return "no-session";
  }
}

function getDeviceType(): WebVitalPayload["device_type"] {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

function sanitizeUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.origin}${u.pathname}`;
  } catch {
    return url.slice(0, 2048);
  }
}

async function sendVital(payload: WebVitalPayload): Promise<void> {
  try {
    await supabase.from("web_vitals").insert(payload);
  } catch {
    // silêncio proposital — telemetria não pode derrubar o app
  }
}

let started = false;

export function initWebVitals(): void {
  if (started) return;
  started = true;
  if (typeof window === "undefined") return;

  // Executa após o carregamento inicial para não competir com o LCP.
  const start = () => {
    import("web-vitals")
      .then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
        const sessionId = getSessionId();
        const deviceType = getDeviceType();
        const userAgent = (navigator.userAgent || "").slice(0, 512);

        const report = (metric: {
          name: MetricName;
          value: number;
          rating?: "good" | "needs-improvement" | "poor";
        }) => {
          const payload: WebVitalPayload = {
            metric_name: metric.name,
            metric_value: Number(metric.value.toFixed(3)),
            metric_rating: metric.rating ?? null,
            page_url: sanitizeUrl(window.location.href),
            user_agent: userAgent,
            device_type: deviceType,
            session_id: sessionId,
          };
          void sendVital(payload);
        };

        onLCP(report as any);
        onCLS(report as any);
        onINP(report as any);
        onFCP(report as any);
        onTTFB(report as any);
      })
      .catch(() => {
        // pacote falhou ao carregar — ignora
      });
  };

  if (document.readyState === "complete") {
    setTimeout(start, 0);
  } else {
    window.addEventListener("load", () => setTimeout(start, 0), { once: true });
  }
}
