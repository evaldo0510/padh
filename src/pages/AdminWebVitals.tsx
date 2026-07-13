import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Gauge,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  AlertTriangle,
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

type MetricName = "LCP" | "CLS" | "INP" | "FCP" | "TTFB";
type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";
type Rating = "good" | "needs-improvement" | "poor" | null;

interface WebVital {
  id: string;
  created_at: string;
  metric_name: MetricName;
  metric_value: number;
  metric_rating: Rating;
  page_url: string | null;
  device_type: DeviceType | null;
  session_id: string | null;
}

const METRICS: MetricName[] = ["LCP", "CLS", "INP", "FCP", "TTFB"];
const RANGES = [
  { value: "1", label: "Últimas 24h" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
];
const DEVICE_FILTERS: Array<{ value: string; label: string }> = [
  { value: "all", label: "Todos dispositivos" },
  { value: "mobile", label: "Mobile" },
  { value: "tablet", label: "Tablet" },
  { value: "desktop", label: "Desktop" },
];
const RATING_COLORS: Record<string, string> = {
  good: "#10B981",
  "needs-improvement": "#F59E0B",
  poor: "#EF4444",
};
const DEVICE_COLORS = ["#8B5CF6", "#F59E0B", "#10B981", "#EF4444"];

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(
    sorted.length - 1,
    Math.floor((p / 100) * sorted.length),
  );
  return sorted[idx];
}

function formatMetric(name: MetricName, value: number): string {
  if (name === "CLS") return value.toFixed(3);
  return `${Math.round(value)} ms`;
}

const AdminWebVitals: React.FC = () => {
  const [days, setDays] = useState("7");
  const [device, setDevice] = useState("all");

  const { data: rows, isLoading, error } = useQuery({
    queryKey: ["web-vitals-admin", days, device],
    queryFn: async () => {
      const since = new Date(
        Date.now() - Number(days) * 24 * 60 * 60 * 1000,
      ).toISOString();

      let query = supabase
        .from("web_vitals")
        .select(
          "id, created_at, metric_name, metric_value, metric_rating, page_url, device_type, session_id",
        )
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);

      if (device !== "all") query = query.eq("device_type", device);

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as WebVital[];
    },
    refetchInterval: 60_000,
  });

  const stats = useMemo(() => {
    const list = rows ?? [];
    const byMetric: Record<MetricName, number[]> = {
      LCP: [],
      CLS: [],
      INP: [],
      FCP: [],
      TTFB: [],
    };
    const ratings: Record<string, number> = {
      good: 0,
      "needs-improvement": 0,
      poor: 0,
    };
    const byDevice: Record<string, number> = {};
    const daily: Record<
      string,
      { date: string; LCP: number[]; CLS: number[]; INP: number[]; TTFB: number[] }
    > = {};
    const sessions = new Set<string>();

    for (const r of list) {
      byMetric[r.metric_name]?.push(r.metric_value);
      if (r.metric_rating) ratings[r.metric_rating] = (ratings[r.metric_rating] || 0) + 1;
      const dev = r.device_type || "unknown";
      byDevice[dev] = (byDevice[dev] || 0) + 1;
      if (r.session_id) sessions.add(r.session_id);

      const day = r.created_at.slice(0, 10);
      const bucket =
        daily[day] ||
        (daily[day] = { date: day, LCP: [], CLS: [], INP: [], TTFB: [] });
      if (r.metric_name === "LCP") bucket.LCP.push(r.metric_value);
      if (r.metric_name === "CLS") bucket.CLS.push(r.metric_value);
      if (r.metric_name === "INP") bucket.INP.push(r.metric_value);
      if (r.metric_name === "TTFB") bucket.TTFB.push(r.metric_value);
    }

    const dailyRows = Object.values(daily)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => ({
        date: d.date.slice(5),
        LCP: Math.round(median(d.LCP)),
        CLS: Number(median(d.CLS).toFixed(3)),
        INP: Math.round(median(d.INP)),
        TTFB: Math.round(median(d.TTFB)),
      }));

    return {
      total: list.length,
      sessions: sessions.size,
      ratings,
      byDevice,
      dailyRows,
      summary: METRICS.map((m) => ({
        name: m,
        p50: byMetric[m].length ? median(byMetric[m]) : 0,
        p75: byMetric[m].length ? percentile(byMetric[m], 75) : 0,
        p95: byMetric[m].length ? percentile(byMetric[m], 95) : 0,
        count: byMetric[m].length,
      })),
    };
  }, [rows]);

  const ratingData = Object.entries(stats.ratings)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));
  const deviceData = Object.entries(stats.byDevice).map(([name, value]) => ({
    name,
    value,
  }));

  if (isLoading) {
    return <div className="p-8 text-center">Carregando métricas…</div>;
  }

  return (
    <PageLayout
      seo={{
        title: "Web Vitals — Admin PADH",
        description: "Painel administrativo de Web Vitals reais dos usuários.",
        path: "/admin/web-vitals",
      }}
      currentPage="Web Vitals"
    >
      <div className="container mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Web Vitals</h1>
            <p className="text-muted-foreground mt-2">
              Experiência real de LCP, CLS, INP, FCP e TTFB coletada dos
              visitantes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={days} onValueChange={setDays}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RANGES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEVICE_FILTERS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="px-3 py-1 gap-2">
              <Activity className="w-4 h-4 text-primary animate-pulse" /> Live
            </Badge>
          </div>
        </div>

        {error && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="py-4 flex items-center gap-3 text-destructive">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">
                Falha ao carregar métricas: {(error as Error).message}
              </span>
            </CardContent>
          </Card>
        )}

        {/* Volume + sessões */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos</CardTitle>
              <Layers className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Total no período</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões</CardTitle>
              <Gauge className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sessions}</div>
              <p className="text-xs text-muted-foreground">Únicas (session_id)</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ratings good</CardTitle>
              <Monitor className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.total
                  ? Math.round(((stats.ratings.good || 0) / stats.total) * 100)
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.ratings.good || 0} de {stats.total} eventos
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ratings poor</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.total
                  ? Math.round(((stats.ratings.poor || 0) / stats.total) * 100)
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.ratings.poor || 0} eventos ruins
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Resumo por métrica */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Percentis por métrica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground border-b border-white/10">
                  <tr>
                    <th className="text-left py-2 pr-4">Métrica</th>
                    <th className="text-right py-2 pr-4">Amostras</th>
                    <th className="text-right py-2 pr-4">p50</th>
                    <th className="text-right py-2 pr-4">p75</th>
                    <th className="text-right py-2">p95</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.summary.map((s) => (
                    <tr key={s.name} className="border-b border-white/5 last:border-0">
                      <td className="py-2 pr-4 font-medium">{s.name}</td>
                      <td className="py-2 pr-4 text-right">{s.count}</td>
                      <td className="py-2 pr-4 text-right">
                        {formatMetric(s.name, s.p50)}
                      </td>
                      <td className="py-2 pr-4 text-right">
                        {formatMetric(s.name, s.p75)}
                      </td>
                      <td className="py-2 text-right">
                        {formatMetric(s.name, s.p95)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tendências diárias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Tendência diária (mediana)</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.dailyRows}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <Legend />
                  <Line type="monotone" dataKey="LCP" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="INP" stroke="#F59E0B" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="TTFB" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>CLS diário (mediana)</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.dailyRows}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <Bar dataKey="CLS" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Distribuições */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Distribuição por rating</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {ratingData.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem dados no período.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ratingData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                      {ratingData.map((entry) => (
                        <Cell key={entry.name} fill={RATING_COLORS[entry.name] || "#666"} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> / <Tablet className="w-4 h-4" /> /{" "}
                <Monitor className="w-4 h-4" />
                Volume por dispositivo
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {deviceData.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem dados no período.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                      {deviceData.map((entry, i) => (
                        <Cell key={entry.name} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminWebVitals;
