import { useEffect, useState, useCallback, useRef } from "react";

const FAIL_KEY = "padh_sw_fail_counters";
const MSG_LOG_KEY = "padh_sw_message_log";
const ROLLBACK_THRESHOLD = 3; // failures within window
const FAIL_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

export interface SWMessageLog {
  timestamp: string;
  direction: "out" | "in";
  type: string;
  payload?: any;
  status?: "success" | "fail" | "timeout";
}

export interface FailCounters {
  comm: number;
  timeout: number;
  activation: number;
  lastFailureAt?: number;
  failuresInWindow: number;
}

const emptyCounters: FailCounters = { comm: 0, timeout: 0, activation: 0, failuresInWindow: 0 };

const loadCounters = (): FailCounters => {
  try {
    const raw = localStorage.getItem(FAIL_KEY);
    if (!raw) return { ...emptyCounters };
    return { ...emptyCounters, ...JSON.parse(raw) };
  } catch { return { ...emptyCounters }; }
};

const saveCounters = (c: FailCounters) => {
  try { localStorage.setItem(FAIL_KEY, JSON.stringify(c)); } catch {}
};

const loadMessageLog = (): SWMessageLog[] => {
  try {
    const raw = localStorage.getItem(MSG_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveMessageLog = (log: SWMessageLog[]) => {
  try { localStorage.setItem(MSG_LOG_KEY, JSON.stringify(log.slice(0, 200))); } catch {}
};

export const usePWADiagnostics = () => {
  const [counters, setCounters] = useState<FailCounters>(loadCounters);
  const [messageLog, setMessageLog] = useState<SWMessageLog[]>(loadMessageLog);
  const countersRef = useRef(counters);
  countersRef.current = counters;

  const logMessage = useCallback((entry: Omit<SWMessageLog, "timestamp">) => {
    const next: SWMessageLog = { timestamp: new Date().toISOString(), ...entry };
    setMessageLog(prev => {
      const updated = [next, ...prev].slice(0, 200);
      saveMessageLog(updated);
      return updated;
    });
  }, []);

  const recordFailure = useCallback((kind: "comm" | "timeout" | "activation", details?: any) => {
    const now = Date.now();
    const prev = countersRef.current;
    const withinWindow = prev.lastFailureAt && (now - prev.lastFailureAt) < FAIL_WINDOW_MS;
    const next: FailCounters = {
      ...prev,
      [kind]: prev[kind] + 1,
      lastFailureAt: now,
      failuresInWindow: withinWindow ? prev.failuresInWindow + 1 : 1,
    };
    setCounters(next);
    saveCounters(next);
    logMessage({ direction: "in", type: `FAILURE_${kind.toUpperCase()}`, status: "fail", payload: details });
  }, [logMessage]);

  const resetCounters = useCallback(() => {
    setCounters({ ...emptyCounters });
    saveCounters({ ...emptyCounters });
  }, []);

  const clearMessageLog = useCallback(() => {
    setMessageLog([]);
    saveMessageLog([]);
  }, []);

  // Auto-decay window
  useEffect(() => {
    const timer = setInterval(() => {
      const c = countersRef.current;
      if (c.lastFailureAt && Date.now() - c.lastFailureAt > FAIL_WINDOW_MS && c.failuresInWindow > 0) {
        const reset = { ...c, failuresInWindow: 0 };
        setCounters(reset);
        saveCounters(reset);
      }
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const shouldRecommendRollback = counters.failuresInWindow >= ROLLBACK_THRESHOLD;

  return {
    counters,
    messageLog,
    logMessage,
    recordFailure,
    resetCounters,
    clearMessageLog,
    shouldRecommendRollback,
    threshold: ROLLBACK_THRESHOLD,
  };
};
