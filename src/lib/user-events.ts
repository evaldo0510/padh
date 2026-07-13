/**
 * Instrumentação de eventos comportamentais.
 *
 * Grava em public.user_events (fire-and-forget, nunca lança).
 * Também expõe utilitários para funil, retenção D1/D7/D30 e coorte semanal.
 */
import { supabase } from "@/integrations/supabase/client";

export type FunnelStage =
  | "cadastro"
  | "checkin"
  | "bloco"
  | "etapa"
  | "retorno";

export const FUNNEL_STAGES: { key: FunnelStage; label: string }[] = [
  { key: "cadastro", label: "Cadastro" },
  { key: "checkin", label: "Check-in" },
  { key: "bloco", label: "Bloco concluído" },
  { key: "etapa", label: "Etapa avançada" },
  { key: "retorno", label: "Retorno em outro dia" },
];

export type UserEventName =
  | "checkin"
  | "bloco_concluido"
  | "etapa_avancada";

export interface UserEventRow {
  id: string;
  user_id: string;
  event_name: string;
  stage: string | null;
  payload: Record<string, unknown>;
  created_at: string;
}

const STAGE_BY_EVENT: Record<UserEventName, FunnelStage> = {
  checkin: "checkin",
  bloco_concluido: "bloco",
  etapa_avancada: "etapa",
};

/**
 * Registra um evento. Nunca lança — falha silenciosa (best-effort telemetria).
 */
export async function trackEvent(
  event: UserEventName,
  payload: Record<string, unknown> = {},
): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("user_events").insert({
      user_id: user.id,
      event_name: event,
      stage: STAGE_BY_EVENT[event],
      payload,
    });
  } catch (err) {
    // Telemetria não deve quebrar o fluxo do usuário.
    console.warn("[user-events] trackEvent failed", err);
  }
}

// ---------- Analytics (client-side aggregation, admin only) ----------

export interface FunnelBucket {
  stage: FunnelStage;
  label: string;
  users: number;
  conversionFromPrev: number | null; // 0..1
  conversionFromTop: number | null;  // 0..1
}

export interface RetentionKPIs {
  cohortSize: number;
  d1: number;
  d7: number;
  d30: number;
}

export interface CohortRow {
  weekStart: string;    // ISO date (Monday)
  size: number;
  retention: (number | null)[]; // per day offset 0..maxDay
}

const DAY_MS = 86_400_000;

function toDayKey(iso: string): string {
  return iso.slice(0, 10);
}

function mondayOf(d: Date): Date {
  const day = d.getUTCDay();          // 0=Sun..6=Sat
  const diff = (day + 6) % 7;         // days since Monday
  const m = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  m.setUTCDate(m.getUTCDate() - diff);
  return m;
}

/**
 * Constrói o funil Cadastro → Check-in → Bloco → Etapa → Retorno em outro dia.
 *
 * - Cadastro: profiles.created_at dentro da janela.
 * - Retorno: usuário com atividade (checkin OU evento) em >= 2 dias distintos.
 * - Se `filterStage` for informado, restringe a base a usuários que atingiram aquela etapa.
 */
export function buildFunnel(input: {
  profiles: { id: string; created_at: string }[];
  events: UserEventRow[];
  filterStage?: FunnelStage | "all";
}): FunnelBucket[] {
  const { profiles, events } = input;

  const cadastroUsers = new Set(profiles.map((p) => p.id));

  const byStage: Record<FunnelStage, Set<string>> = {
    cadastro: new Set(cadastroUsers),
    checkin: new Set(),
    bloco: new Set(),
    etapa: new Set(),
    retorno: new Set(),
  };

  // dias distintos por usuário para calcular "retorno"
  const daysByUser = new Map<string, Set<string>>();

  for (const e of events) {
    const stage = (e.stage as FunnelStage | null) ?? null;
    if (stage && stage in byStage) byStage[stage].add(e.user_id);
    const set = daysByUser.get(e.user_id) ?? new Set<string>();
    set.add(toDayKey(e.created_at));
    daysByUser.set(e.user_id, set);
  }

  for (const [userId, days] of daysByUser) {
    if (days.size >= 2) byStage.retorno.add(userId);
  }

  const ordered: FunnelStage[] = ["cadastro", "checkin", "bloco", "etapa", "retorno"];
  const top = byStage[ordered[0]].size || 0;

  return ordered.map((key, idx) => {
    const count = byStage[key].size;
    const prev = idx === 0 ? null : byStage[ordered[idx - 1]].size;
    return {
      stage: key,
      label: FUNNEL_STAGES.find((s) => s.key === key)!.label,
      users: count,
      conversionFromPrev: prev && prev > 0 ? count / prev : idx === 0 ? 1 : null,
      conversionFromTop: top > 0 ? count / top : null,
    };
  });
}

/**
 * Retenção D1/D7/D30 a partir dos profiles (data de entrada = created_at)
 * e de qualquer atividade em user_events + daily_checkins.
 * Um usuário é "retido em Dn" se teve atividade num dia com offset n em relação ao cadastro.
 */
export function computeRetention(input: {
  profiles: { id: string; created_at: string }[];
  activityDaysByUser: Map<string, Set<string>>;
}): RetentionKPIs {
  const { profiles, activityDaysByUser } = input;
  let d1 = 0, d7 = 0, d30 = 0;
  const cohortSize = profiles.length;

  for (const p of profiles) {
    const days = activityDaysByUser.get(p.id);
    if (!days) continue;
    const start = new Date(p.created_at);
    const startKey = toDayKey(p.created_at);
    const dayAt = (offset: number) => {
      const d = new Date(start.getTime() + offset * DAY_MS);
      return toDayKey(d.toISOString());
    };
    // "retido em Dn" = teve atividade em qualquer dia >= startKey e no offset exato
    if (days.has(dayAt(1))) d1++;
    if (days.has(dayAt(7))) d7++;
    if (days.has(dayAt(30))) d30++;
    void startKey;
  }

  return {
    cohortSize,
    d1: cohortSize ? d1 / cohortSize : 0,
    d7: cohortSize ? d7 / cohortSize : 0,
    d30: cohortSize ? d30 / cohortSize : 0,
  };
}

/**
 * Coorte semanal: linha = semana de cadastro (segunda-feira UTC),
 * coluna = dia D0..Dmax, valor = % de retidos.
 */
export function buildCohort(input: {
  profiles: { id: string; created_at: string }[];
  activityDaysByUser: Map<string, Set<string>>;
  maxDay: number; // ex.: 30
}): CohortRow[] {
  const { profiles, activityDaysByUser, maxDay } = input;
  const byWeek = new Map<string, { users: string[]; starts: Map<string, string> }>();

  for (const p of profiles) {
    const start = new Date(p.created_at);
    const week = toDayKey(mondayOf(start).toISOString());
    const entry = byWeek.get(week) ?? { users: [], starts: new Map() };
    entry.users.push(p.id);
    entry.starts.set(p.id, p.created_at);
    byWeek.set(week, entry);
  }

  const rows: CohortRow[] = [];
  const weeks = Array.from(byWeek.keys()).sort();
  for (const week of weeks) {
    const { users, starts } = byWeek.get(week)!;
    const retention: (number | null)[] = [];
    for (let offset = 0; offset <= maxDay; offset++) {
      let retained = 0;
      for (const uid of users) {
        const days = activityDaysByUser.get(uid);
        if (!days) continue;
        const start = new Date(starts.get(uid)!);
        const key = toDayKey(new Date(start.getTime() + offset * DAY_MS).toISOString());
        if (days.has(key)) retained++;
      }
      retention.push(users.length ? retained / users.length : null);
    }
    rows.push({ weekStart: week, size: users.length, retention });
  }
  return rows;
}

/**
 * Junta user_events + daily_checkins num Map<user_id, Set<dayKey>>.
 */
export function mergeActivityDays(inputs: {
  events: { user_id: string; created_at: string }[];
  checkins: { user_id: string; checkin_date: string }[];
}): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  const add = (uid: string, day: string) => {
    const s = map.get(uid) ?? new Set<string>();
    s.add(day);
    map.set(uid, s);
  };
  for (const e of inputs.events) add(e.user_id, toDayKey(e.created_at));
  for (const c of inputs.checkins) add(c.user_id, c.checkin_date.slice(0, 10));
  return map;
}
