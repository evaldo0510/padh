import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell, PieChart, Pie
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  RefreshCw,
  Smartphone,
  Globe
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const AdminPWAHealth = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["pwa-health-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pwa_health_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="p-8 text-center">Carregando métricas...</div>;

  // Process data for charts
  const typeCounts = events?.reduce((acc: any, curr) => {
    acc[curr.event_type] = (acc[curr.event_type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(typeCounts || {}).map(([name, value]) => ({ name, value }));

  const timelineData = events?.reduce((acc: any, curr) => {
    const date = new Date(curr.created_at).toLocaleDateString();
    const existing = acc.find((d: any) => d.date === date);
    if (existing) {
      existing.count += 1;
      existing[curr.event_type] = (existing[curr.event_type] || 0) + 1;
    } else {
      acc.push({ date, count: 1, [curr.event_type]: 1 });
    }
    return acc;
  }, []).reverse();

  const COLORS = ['#8B5CF6', '#F59E0B', '#10B981', '#EF4444', '#3B82F6'];

  return (
    <PageLayout 
      seo={{ title: "PWA Health Metrics — PADH", description: "Monitoramento de saúde do PWA", path: "/admin/pwa-health" }}
      currentPage="PWA Health"
    >
      <div className="container mx-auto px-6 py-12 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Saúde do PWA</h1>
            <p className="text-muted-foreground mt-2">Monitoramento em tempo real de instalações e atualizações.</p>
          </div>
          <Badge variant="outline" className="px-4 py-1 text-sm gap-2">
            <Activity className="w-4 h-4 text-primary animate-pulse" /> Live Metrics
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Instalações</CardTitle>
              <Download className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{typeCounts?.install || 0}</div>
              <p className="text-xs text-muted-foreground">Total detectado</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Updates Detectados</CardTitle>
              <RefreshCw className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{typeCounts?.update_found || 0}</div>
              <p className="text-xs text-muted-foreground">Novas versões servidas</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Atualização</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeCounts?.update_found ? Math.round((typeCounts.update_activated / typeCounts.update_found) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Conversão de click no banner</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Erros SW</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{typeCounts?.error || 0}</div>
              <p className="text-xs text-muted-foreground">Falhas no service worker</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Over Time */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Atividade PWA (Últimos Dias)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="count" name="Total" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="update_found" name="Updates" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="update_trace" name="Traces" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribution by Type */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Distribuição de Eventos</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Average Update Timing */}
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Tempo Médio de Atualização (ms)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={events?.filter(e => e.event_type === 'update_trace' && (e.details as any)?.trace?.total_duration_ms).slice(0, 20)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="created_at" tickFormatter={(v) => new Date(v).toLocaleTimeString()} stroke="rgba(255,255,255,0.4)" fontSize={10} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <Tooltip 
                    labelFormatter={(v) => new Date(v).toLocaleString()}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <Bar dataKey="details.trace.total_duration_ms" name="Duração Total" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events List */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Logs Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events?.slice(0, 10).map((event) => (
                <div key={event.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      event.event_type === 'error' ? 'bg-destructive/10 text-destructive' :
                      event.event_type === 'update_activated' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {event.event_type === 'install' && <Smartphone className="w-4 h-4" />}
                      {event.event_type === 'update_found' && <RefreshCw className="w-4 h-4" />}
                      {event.event_type === 'update_activated' && <CheckCircle2 className="w-4 h-4" />}
                      {event.event_type === 'error' && <AlertTriangle className="w-4 h-4" />}
                      {event.event_type === 'offline' && <Globe className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{event.event_type.replace('_', ' ').toUpperCase()}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        {event.version} • {new Date(event.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] hidden md:inline-flex">
                    {event.user_agent?.split(') ')[0]?.split(' (')[1] || 'Unknown Device'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminPWAHealth;
