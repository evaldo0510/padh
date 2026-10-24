import { useEffect, useState } from "react";
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
  FUNNEL_STAGES,
  FunnelStage,
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

interface RetentionSummaryRpc {
  cohort_size: number;
  d1: number | null;
  d7: number | null;
  d30: number | null;
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
  const [retentionSummary, setRetentionSummary] = useState<RetentionSummaryRpc | null>(null);
  const [retentionSummaryLoading, setRetentionSummaryLoading] = useState(true);
  const [cohort, setCohort] = useState<CohortRow[]>([]);
  const [cohortLoading, setCohortLoading] = useState(true);
  const [funnel, setFunnel] = useState<FunnelBucket[]>([]);
  const [funnelLoading, setFunnelLoading] = useState(true);

  const maxDay = Math.min(Number(range), 30);

  // O servidor devolve somente agregados; nenhum perfil, identificador ou nota individual
  // de check-in é lido pelo navegador para montar estes indicadores.
  useEffect(() => {
    let cancelled = false;
    async function loadRetentionSummary() {
      setRetentionSummaryLoading(true);
      const since = new Date(Date.now() - Number(range) * DAY_MS).toISOString();
      const { data, error } = await supabase.rpc("admin_retention_summary", {
        _since: since,
        _stage: stage === "all" ? null : stage,
      });
      if (cancelled) return;
      if (error) {
        console.error("[admin_retention_summary]", error);
        setRetentionSummary(null);
      } else {
        setRetentionSummary(data?.[0] ?? null);
      }
      setRetentionSummaryLoading(false);
    }
    void loadRetentionSummary();
    return () => { cancelled = true; };
  }, [range, stage]);

  // Coorte semanal calculada no banco via RPC (SECURITY DEFINER, gate admin).
  useEffect(() => {
    let cancelled = false;
    async function loadCohort() {
      setCohortLoading(true);
      const days = Number(range);
      const since = new Date(Date.now() - days * DAY_MS).toISOString();
      const { data, error } = await supabase.rpc("admin_weekly_cohort", {
        _since: since,
        _max_day: maxDay,
        _stage: stage === "all" ? null : stage,
      });
      if (cancelled) return;
      if (error) {
        console.error("[admin_weekly_cohort]", error);
        setCohort([]);
      } else {
        setCohort(cohortRowsFromRpc(data || []));
      }
      setCohortLoading(false);
    }
    loadCohort();
    return () => { cancelled = true; };
  }, [range, stage, maxDay]);

  // Funil calculado no banco via RPC (SECURITY DEFINER, gate admin).
  useEffect(() => {
    let cancelled = false;
    async function loadFunnel() {
      setFunnelLoading(true);
      const days = Number(range);
      const since = new Date(Date.now() - days * DAY_MS).toISOString();
      const { data, error } = await supabase.rpc("admin_funnel_matrix", {
        _since: since,
        _stage: stage === "all" ? null : stage,
      });
      if (cancelled) return;
      if (error) {
        console.error("[admin_funnel_matrix]", error);
        setFunnel([]);
      } else {
        setFunnel(funnelFromRpc(data || []));
      }
      setFunnelLoading(false);
    }
    loadFunnel();
    return () => { cancelled = true; };
  }, [range, stage]);


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
            <KpiTile label="Coorte" value={retentionSummaryLoading ? "…" : String(retentionSummary?.cohort_size ?? 0)} suffix="usuários" />
            <KpiTile label="D1" value={retentionSummaryLoading ? "…" : fmtNullablePct(retentionSummary?.d1)} />
            <KpiTile label="D7" value={retentionSummaryLoading ? "…" : fmtNullablePct(retentionSummary?.d7)} />
            <KpiTile label="D30" value={retentionSummaryLoading ? "…" : fmtNullablePct(retentionSummary?.d30)} />
          </div>
          <p className="text-xs text-muted-foreground">
            Dn considera atividade no respectivo dia após o cadastro e apenas contas que já alcançaram esse dia. O cálculo é agregado no banco.
          </p>
        </section>

        {/* Funil */}
        <section aria-labelledby="funil-title" className="space-y-3">
          <h3 id="funil-title" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Funil de conversão
          </h3>
          {funnelLoading ? (
            <p className="text-sm text-muted-foreground">Carregando funil…</p>
          ) : funnel.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sem dados no período selecionado.</p>
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
            Cada célula = percentual das contas daquele coorte que já alcançaram Dn e tiveram atividade nesse dia.
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

function FunnelRow({ row, maxUsers }: { row: FunnelBucket; maxUsers: number }) {
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

function fmtNullablePct(v: number | null | undefined): string {
  return v == null ? "—" : fmtPct(Number(v));
}
