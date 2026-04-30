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
import { TrendingUp, CheckCircle2, History, Activity, Download, Filter, Search, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ProgressPanel: React.FC = () => {
  const { jornada } = useJornada();
  const [checkinHistory, setCheckinHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: checkins } = await supabase
        .from("daily_checkins")
        .select("checkin_date, mood")
        .eq("user_id", user.id)
        .order("checkin_date", { ascending: true })
        .limit(30);

      if (checkins) {
        setCheckinHistory(checkins.map(c => ({
          date: new Date(c.checkin_date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          activity: 1
        })));
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const journeyProgressData = JORNADA_DATA.map(fase => {
    const totalSessions = fase.sessoes.length;
    const completedSessions = fase.sessoes.filter(s => jornada.completedSessions.includes(s.id)).length;
    return {
      name: fase.titulo,
      completed: completedSessions,
      total: totalSessions,
      percent: Math.round((completedSessions / totalSessions) * 100)
    };
  });

  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#F43F5E'];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold tracking-tighter text-white">Evolução da Jornada</h2>
        <p className="text-white/40 font-light text-lg tracking-wide uppercase text-[10px] font-black tracking-[0.4em]">Seu progresso clínico em dados.</p>
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
              <BarChart data={journeyProgressData} layout="vertical">
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
                  {journeyProgressData.map((entry, index) => (
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
          { label: 'Fases Iniciadas', value: journeyProgressData.filter(f => f.completed > 0).length, icon: TrendingUp, color: 'text-rose-400' }
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
    </div>
  );
};

export default ProgressPanel;