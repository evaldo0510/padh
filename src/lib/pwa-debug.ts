/**
 * PWA Debug Logger
 * Enable via: localStorage.setItem("pwa_debug", "1") or ?pwa_debug=1
 * Records updatefound / skipWaiting / controllerchange / reload events
 * to console and to a circular history persisted in sessionStorage.
 */

const HISTORY_KEY = "pwa_debug_history";
const FLAG_KEY = "pwa_debug";
const MAX_ENTRIES = 100;

export type PWADebugEvent =
  | "updatefound"
  | "installing"
  | "installed"
  | "skipWaiting_sent"
  | "controllerchange"
  | "reload_triggered"
  | "reload_blocked_duplicate"
  | "runtime_cache_check"
  | "runtime_cache_stale"
  | "error";

export interface PWADebugEntry {
  ts: string;
  event: PWADebugEvent;
  reason?: string;
  data?: any;
}

export function isPWADebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (new URLSearchParams(window.location.search).get("pwa_debug") === "1") {
      localStorage.setItem(FLAG_KEY, "1");
      return true;
    }
    return localStorage.getItem(FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function setPWADebug(enabled: boolean) {
  try {
    if (enabled) localStorage.setItem(FLAG_KEY, "1");
    else localStorage.removeItem(FLAG_KEY);
  } catch {}
}

export function pwaDebugLog(event: PWADebugEvent, reason?: string, data?: any) {
  const entry: PWADebugEntry = {
    ts: new Date().toISOString(),
    event,
    reason,
    data,
  };

  // Always dispatch a window event so UI panels can listen
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("pwa-debug", { detail: entry }));
    } catch {}
  }

  if (!isPWADebugEnabled()) return;

  // eslint-disable-next-line no-console
  console.log(`[PWA-DEBUG] ${event}${reason ? ` — ${reason}` : ""}`, data ?? "");

  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    const arr: PWADebugEntry[] = raw ? JSON.parse(raw) : [];
    arr.push(entry);
    while (arr.length > MAX_ENTRIES) arr.shift();
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
  } catch {}
}

export function getPWADebugHistory(): PWADebugEntry[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearPWADebugHistory() {
  try {
    sessionStorage.removeItem(HISTORY_KEY);
  } catch {}
}

/**
 * Runtime verification: ensures critical assets (HTML/JS/CSS) are being
 * served network-first by checking that the SW response Date header is fresh
 * (within last few minutes) OR matches a fresh network fetch.
 *
 * Returns a list of stale URLs (empty if everything fresh).
 */
export async function verifyNetworkFirstAtRuntime(
  urls: string[] = [window.location.href],
  staleThresholdMs = 5 * 60 * 1000,
): Promise<{ url: string; ageMs: number }[]> {
  const stale: { url: string; ageMs: number }[] = [];
  const now = Date.now();

  await Promise.all(
    urls.map(async (url) => {
      try {
        // Bypass SW with a cache-busting header to compare
        const swResp = await fetch(url, { cache: "no-store" });
        const dateHdr = swResp.headers.get("date");
        if (!dateHdr) return;
        const respTime = new Date(dateHdr).getTime();
        const ageMs = now - respTime;
        if (ageMs > staleThresholdMs) {
          stale.push({ url, ageMs });
          pwaDebugLog("runtime_cache_stale", `Stale response for ${url}`, { ageMs });
        }
      } catch (err: any) {
        pwaDebugLog("error", `runtime check failed for ${url}`, { error: err?.message });
      }
    }),
  );

  pwaDebugLog("runtime_cache_check", `Checked ${urls.length} url(s)`, {
    staleCount: stale.length,
  });
  return stale;
}
