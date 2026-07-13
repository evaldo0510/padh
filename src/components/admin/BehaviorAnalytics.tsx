import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import {
  ADMIN_RANGE_DEFAULT,
  ADMIN_RANGE_PRESETS,
  AdminRangePreset,
  isAdminRangePreset,
} from "@/lib/admin-filters";
import {
  computeRetention,
  FUNNEL_STAGES,
  FunnelStage,
  mergeActivityDays,
  UserEventRow,
  CohortRow,
} from "@/lib/user-events";
import { Users, TrendingUp, Filter } from "lucide-react";

const DAY_MS = 86_400_000;

type StageFilter = "all" | FunnelStage;

interface CohortRpcRow {
  week_start: string;
  cohort_size: number;
  day_offset: number;
  retained: number;
  retention: number | null;
}

function cohortRowsFromRpc(rows: CohortRpcRow[]): CohortRow[] {
  const byWeek = new Map<string, CohortRow>();
  let maxOffset = 0;
  for (const r of rows) maxOffset = Math.max(maxOffset, r.day_offset);
  for (const r of rows) {
    let row = byWeek.get(r.week_start);
    if (!row) {
      row = { weekStart: r.week_start, size: r.cohort_size, retention: Array(maxOffset + 1).fill(null) };
      byWeek.set(r.week_start, row);
    }
    row.retention[r.day_offset] = r.retention == null ? null : Number(r.retention);
  }
  return Array.from(byWeek.values()).sort((a, b) => a.weekStart.localeCompare(b.weekStart));
}

interface FunnelRpcRow {
  stage: string;
  stage_order: number;
  users: number;
  conversion_from_prev: number | null;
  conversion_from_top: number | null;
}

interface FunnelBucket {
  stage: string;
  label: string;
  users: number;
  conversionFromPrev: number | null;
  conversionFromTop: number | null;
}

function funnelFromRpc(rows: FunnelRpcRow[]): FunnelBucket[] {
  const labelBy = new Map(FUNNEL_STAGES.map((s) => [s.key as string, s.label]));
  return [...rows]
    .sort((a, b) => a.stage_order - b.stage_order)
    .map((r) => ({
      stage: r.stage,
      label: labelBy.get(r.stage) ?? r.stage,
      users: r.users,
      conversionFromPrev: r.conversion_from_prev == null ? null : Number(r.conversion_from_prev),
      conversionFromTop: r.conversion_from_top == null ? null : Number(r.conversion_from_top),
    }));
}

export default function BehaviorAnalytics() {
  const [range, setRange] = useState<AdminRangePreset>(ADMIN_RANGE_DEFAULT);
  const [stage, setStage] = useState<StageFilter>("all");
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<{ id: string; created_at: string }[]>([]);
  const [events, setEvents] = useState<UserEventRow[]>([]);
  const [checkins, setCheckins] = useState<{ user_id: string; checkin_date: string }[]>([]);
  const [cohort, setCohort] = useState<CohortRow[]>([]);
  const [cohortLoading, setCohortLoading] = useState(true);
  const [funnel, setFunnel] = useState<FunnelBucket[]>([]);
  const [funnelLoading, setFunnelLoading] = useState(true);

  const maxDay = Math.min(Number(range), 30);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const days = Number(range);
      const since = new Date(Date.now() - days * DAY_MS).toISOString();

      const [profRes, evRes, ciRes] = await Promise.all([
        supabase.from("profiles").select("id, created_at").gte("created_at", since),
        supabase.from("user_events").select("id, user_id, event_name, stage, payload, created_at").gte("created_at", since),
        supabase.from("daily_checkins").select("user_id, checkin_date").gte("checkin_date", since.slice(0, 10)),
      ]);

      if (cancelled) return;
      setProfiles((profRes.data as any) || []);
      setEvents(((evRes.data as any) || []).map((e: any) => ({ ...e, payload: e.payload ?? {} })));
      setCheckins((ciRes.data as any) || []);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [range]);

  // Coorte semanal calculada no banco via RPC (SECURITY DEFINER, gate admin).
  useEffect(() => {
    let cancelled = false;
    async function loadCohort() {
      setCohortLoading(true);
      const days = Number(range);
      const since = new Date(Date.now() - days * DAY_MS).toISOString();
      const { data, error } = await (supabase as any).rpc("admin_weekly_cohort", {
        _since: since,
        _max_day: maxDay,
        _stage: stage === "all" ? null : stage,
      });
      if (cancelled) return;
      if (error) {
        console.error("[admin_weekly_cohort]", error);
        setCohort([]);
      } else {
        setCohort(cohortRowsFromRpc((data as CohortRpcRow[]) || []));
      }
      setCohortLoading(false);
    }
    loadCohort();
    return () => { cancelled = true; };
  }, [range, stage, maxDay]);

  const filteredProfiles = useMemo(() => {
    if (stage === "all") return profiles;
    const stageUsers = new Set(
      stage === "cadastro"
        ? profiles.map((p) => p.id)
        : events.filter((e) => e.stage === stage).map((e) => e.user_id),
    );
    return profiles.filter((p) => stageUsers.has(p.id));
  }, [profiles, events, stage]);

  const funnel = useMemo(
    () => buildFunnel({ profiles: filteredProfiles, events, filterStage: stage }),
    [filteredProfiles, events, stage],
  );

  const activityDays = useMemo(
    () => mergeActivityDays({ events, checkins }),
    [events, checkins],
  );

  const retention = useMemo(
    () => computeRetention({ profiles: filteredProfiles, activityDaysByUser: activityDays }),
    [filteredProfiles, activityDays],
  );


  return (
    <Card className="border-primary/20 bg-card/50 overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="w-5 h-5 text-primary" />
            Comportamento & Retenção
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Filter className="w-3.5 h-3.5" /> Etapa
            </div>
            <Select value={stage} onValueChange={(v) => setStage(v as StageFilter)}>
              <SelectTrigger className="h-8 w-[180px] text-xs" aria-label="Filtrar por etapa">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as etapas</SelectItem>
                {FUNNEL_STAGES.map((s) => (
                  <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={range} onValueChange={(v) => isAdminRangePreset(v) && setRange(v)}>
              <SelectTrigger className="h-8 w-[160px] text-xs" aria-label="Filtrar período">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ADMIN_RANGE_PRESETS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* KPIs de Retenção */}
        <section aria-labelledby="retencao-title" className="space-y-3">
          <h3 id="retencao-title" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Users className="w-4 h-4" /> Retenção do coorte
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiTile label="Coorte" value={String(retention.cohortSize)} suffix="usuários" />
            <KpiTile label="D1" value={fmtPct(retention.d1)} />
            <KpiTile label="D7" value={fmtPct(retention.d7)} />
            <KpiTile label="D30" value={fmtPct(retention.d30)} />
          </div>
          <p className="text-xs text-muted-foreground">
            Retido em Dn = teve check-in ou evento no dia n após o cadastro. Baseado em <code>profiles.created_at</code>.
          </p>
        </section>

        {/* Funil */}
        <section aria-labelledby="funil-title" className="space-y-3">
          <h3 id="funil-title" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Funil de conversão
          </h3>
          {loading ? (
            <p className="text-sm text-muted-foreground">Carregando…</p>
          ) : (
            <div className="space-y-2">
              {funnel.map((row) => (
                <FunnelRow key={row.stage} row={row} maxUsers={funnel[0]?.users || 1} />
              ))}
            </div>
          )}
        </section>

        {/* Coorte semanal */}
        <section aria-labelledby="coorte-title" className="space-y-3">
          <h3 id="coorte-title" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Coorte semanal × Dias
          </h3>
          {cohortLoading ? (
            <p className="text-sm text-muted-foreground">Carregando coorte…</p>
          ) : cohort.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sem coortes no período selecionado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left p-2 font-medium">Semana</th>
                    <th className="text-right p-2 font-medium">N</th>
                    {Array.from({ length: maxDay + 1 }, (_, i) => (
                      <th key={i} className="text-center p-2 font-medium">D{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cohort.map((c) => (
                    <tr key={c.weekStart} className="border-t border-border/50">
                      <td className="p-2 font-medium whitespace-nowrap">{c.weekStart}</td>
                      <td className="p-2 text-right text-muted-foreground">{c.size}</td>
                      {c.retention.map((v, i) => (
                        <td
                          key={i}
                          className="p-2 text-center"
                          style={{
                            backgroundColor: v == null
                              ? "transparent"
                              : `hsl(var(--primary) / ${Math.max(0.05, v * 0.6)})`,
                          }}
                          title={v == null ? "s/ dados" : `${(v * 100).toFixed(0)}%`}
                        >
                          {v == null ? "—" : `${Math.round(v * 100)}%`}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Cada célula = % do coorte de cadastro daquela semana com atividade no dia Dn.
          </p>
        </section>
      </CardContent>
    </Card>
  );
}

function KpiTile({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-background">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
      {suffix && <div className="text-[10px] text-muted-foreground">{suffix}</div>}
    </div>
  );
}

function FunnelRow({ row, maxUsers }: { row: ReturnType<typeof buildFunnel>[number]; maxUsers: number }) {
  const width = maxUsers > 0 ? Math.max(4, (row.users / maxUsers) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 text-sm font-medium shrink-0">{row.label}</div>
      <div className="flex-1 h-8 rounded bg-muted/40 overflow-hidden relative">
        <div
          className="h-full bg-primary/70 transition-all"
          style={{ width: `${width}%` }}
        />
        <div className="absolute inset-0 flex items-center px-2 text-xs font-medium">
          {row.users} usuários
        </div>
      </div>
      <div className="w-32 text-right text-xs text-muted-foreground shrink-0">
        {row.conversionFromPrev == null
          ? "—"
          : <Badge variant="outline" className="text-[10px]">{fmtPct(row.conversionFromPrev)} vs anterior</Badge>}
      </div>
    </div>
  );
}

function fmtPct(v: number): string {
  return `${(v * 100).toFixed(1)}%`;
}
