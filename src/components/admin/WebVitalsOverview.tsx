import React, { useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Activity, ArrowUpRight, AlertTriangle } from "lucide-react";
import {
  ADMIN_RANGE_PRESETS,
  ADMIN_RANGE_DEFAULT,
  type AdminRangePreset,
} from "@/lib/admin-filters";

type MetricName = "LCP" | "CLS" | "INP" | "FCP" | "TTFB";

interface Row {
  created_at: string;
  metric_name: MetricName;
  metric_value: number;
  metric_rating: "good" | "needs-improvement" | "poor" | null;
  session_id: string | null;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

/**
 * Painel operacional resumido: filtro global (7/30/90) + evolução diária.
 * Reusa a mesma query RLS-protegida da página /admin/web-vitals.
 */
const WebVitalsOverview: React.FC = () => {
  const [days, setDays] = useState<AdminRangePreset>(ADMIN_RANGE_DEFAULT);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-overview-web-vitals", days],
    queryFn: async () => {
      const since = new Date(
        Date.now() - Number(days) * 24 * 60 * 60 * 1000,
      ).toISOString();
      const { data, error } = await supabase
        .from("web_vitals")
        .select("created_at, metric_name, metric_value, metric_rating, session_id")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);
      if (error) throw error;
      return (data ?? []) as Row[];
    },
    refetchInterval: 60_000,
    placeholderData: keepPreviousData,
  });

  const stats = useMemo(() => {
    const rows = data ?? [];
    const sessions = new Set<string>();
    const byMetric: Record<MetricName, number[]> = {
      LCP: [], CLS: [], INP: [], FCP: [], TTFB: [],
    };
    const ratings = { good: 0, "needs-improvement": 0, poor: 0 };
    const daily: Record<
      string,
      { date: string; LCP: number[]; INP: number[]; TTFB: number[] }
    > = {};

    for (const r of rows) {
      if (r.session_id) sessions.add(r.session_id);
      byMetric[r.metric_name]?.push(r.metric_value);
      if (r.metric_rating) ratings[r.metric_rating]++;
      const day = r.created_at.slice(0, 10);
      const b = daily[day] || (daily[day] = { date: day, LCP: [], INP: [], TTFB: [] });
      if (r.metric_name === "LCP") b.LCP.push(r.metric_value);
      if (r.metric_name === "INP") b.INP.push(r.metric_value);
      if (r.metric_name === "TTFB") b.TTFB.push(r.metric_value);
    }

    const dailyRows = Object.values(daily)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => ({
        date: d.date.slice(5),
        LCP: Math.round(median(d.LCP)),
        INP: Math.round(median(d.INP)),
        TTFB: Math.round(median(d.TTFB)),
      }));

    return {
      total: rows.length,
      sessions: sessions.size,
      goodPct: rows.length ? Math.round((ratings.good / rows.length) * 100) : 0,
      poorPct: rows.length ? Math.round((ratings.poor / rows.length) * 100) : 0,
      dailyRows,
    };
  }, [data]);

  return (
    <Card className="border-primary/20 bg-card/50 overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Activity className="w-5 h-5 text-primary" /> Web Vitals — Operacional
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={days} onValueChange={(v) => setDays(v as AdminRangePreset)}>
              <SelectTrigger className="w-[170px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ADMIN_RANGE_PRESETS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link to="/admin/web-vitals">
                Detalhes <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle className="w-4 h-4" />
            Falha ao carregar métricas: {(error as Error).message}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Eventos" value={isLoading ? "…" : String(stats.total)} />
          <Stat label="Sessões" value={isLoading ? "…" : String(stats.sessions)} />
          <Stat
            label="Good"
            value={isLoading ? "…" : `${stats.goodPct}%`}
            tone="good"
          />
          <Stat
            label="Poor"
            value={isLoading ? "…" : `${stats.poorPct}%`}
            tone="poor"
          />
        </div>

        <div className="h-[260px]">
          {stats.dailyRows.length === 0 && !isLoading ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
              Sem dados no período selecionado.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.dailyRows}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="LCP" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="INP" stroke="#F59E0B" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="TTFB" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Stat: React.FC<{ label: string; value: string; tone?: "good" | "poor" }> = ({
  label,
  value,
  tone,
}) => (
  <div className="p-4 rounded-xl border border-border bg-background">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
    <div
      className={
        "text-2xl font-bold mt-1 " +
        (tone === "good" ? "text-emerald-500" : tone === "poor" ? "text-destructive" : "")
      }
    >
      {value}
    </div>
  </div>
);

export default WebVitalsOverview;
