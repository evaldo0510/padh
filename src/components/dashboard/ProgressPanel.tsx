import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, CheckCircle2, History, Activity, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProgressReportExport from "./ProgressReportExport";

const ProgressPanel: React.FC = () => {
  const { jornada } = useJornada();
  const [checkinHistory, setCheckinHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from("daily_checkins")
        .select("checkin_date, mood, note")
        .eq("user_id", user.id)
        .order("checkin_date", { ascending: true });

      if (dateFilter === "week") {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        query = query.gte("checkin_date", lastWeek.toISOString().split('T')[0]);
      } else if (dateFilter === "month") {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        query = query.gte("checkin_date", lastMonth.toISOString().split('T')[0]);
      }

      const { data: checkins } = await query;

      if (checkins) {
        setCheckinHistory(checkins.map(c => ({
          ...c,
          date: new Date(c.checkin_date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          activity: 1
        })));
      }
      setLoading(false);
    };
    fetchStats();
  }, [dateFilter]);

  const filteredJourneyData = useMemo(() => {
    let data = JORNADA_DATA;
    
    if (phaseFilter !== "all") {
      data = data.filter(f => f.id === phaseFilter);
    }

    return data.map(fase => {
      const totalSessions = fase.sessoes.length;
      let completedSessions = fase.sessoes.filter(s => jornada.completedSessions.includes(s.id)).length;
      
      return {
        name: fase.titulo,
        completed: completedSessions,
        total: totalSessions,
        percent: Math.round((completedSessions / totalSessions) * 100)
      };
    }).filter(f => {
      if (statusFilter === "completed") return f.percent === 100;
      if (statusFilter === "in_progress") return f.percent > 0 && f.percent < 100;
      if (statusFilter === "not_started") return f.percent === 0;
      return true;
    });
  }, [phaseFilter, statusFilter, jornada.completedSessions]);

  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#F43F5E'];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold tracking-tighter text-white">Evolução da Jornada</h2>
          <p className="text-white/40 font-light text-lg tracking-wide uppercase text-[10px] font-black tracking-[0.4em]">Seu progresso clínico em dados.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Período de Atividade</label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="bg-background/50 border-white/10 text-white h-10">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todo o histórico</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Filtrar por Fase</label>
          <Select value={phaseFilter} onValueChange={setPhaseFilter}>
            <SelectTrigger className="bg-background/50 border-white/10 text-white h-10">
              <SelectValue placeholder="Selecione a fase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as fases</SelectItem>
              {JORNADA_DATA.map(f => (
                <SelectItem key={f.id} value={f.id}>{f.titulo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Status de Conclusão</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-background/50 border-white/10 text-white h-10">
              <SelectValue placeholder="Status de conclusão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              <SelectItem value="completed">Concluídas</SelectItem>
              <SelectItem value="in_progress">Em andamento</SelectItem>
              <SelectItem value="not_started">Não iniciadas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <Card className="glass-card bg-white/5 border-white/5 p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-white flex items-center gap-3 text-xl tracking-tight">
              <Activity className="w-5 h-5 text-primary" />
              Constância de Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={checkinHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#8B5CF6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="#8B5CF6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Journey Progress Bar Chart */}
        <Card className="glass-card bg-white/5 border-white/5 p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-white flex items-center gap-3 text-xl tracking-tight">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Conclusão por Fase
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredJourneyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.6)" 
                  fontSize={12} 
                  width={100}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="percent" radius={[0, 4, 4, 0]} barSize={20}>
                  {filteredJourneyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Check-ins Totais', value: checkinHistory.length, icon: History, color: 'text-primary' },
          { label: 'Sessões Concluídas', value: jornada.completedSessions.length, icon: CheckCircle2, color: 'text-emerald-400' },
          { label: 'Exercícios Feitos', value: jornada.responses.length, icon: Activity, color: 'text-amber-400' },
          { label: 'Fases Iniciadas', value: filteredJourneyData.filter(f => f.completed > 0).length, icon: TrendingUp, color: 'text-rose-400' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="glass-card p-6 bg-white/5 border-white/5 flex flex-col items-center text-center space-y-2"
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mb-1`} />
            <span className="text-2xl font-black text-white">{stat.value}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="pt-10 border-t border-white/5">
        <div className="flex flex-col gap-6">
           <div className="space-y-1">
             <h3 className="text-xl font-bold tracking-tight text-white">Relatórios e Exportação</h3>
             <p className="text-sm text-white/40 font-light">Baixe seu histórico completo para acompanhamento clínico ou pessoal.</p>
           </div>
           <ProgressReportExport />
        </div>
      </div>
    </div>
  );
};

export default ProgressPanel;