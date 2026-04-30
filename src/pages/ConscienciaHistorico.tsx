import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ChevronLeft, Calendar, MessageSquare, Sparkles, Flame, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CheckinHistory {
  checkin_date: string;
  mood: string;
  exercise_id?: string;
  response?: string;
  exercise_title?: string;
}

const ConscienciaHistorico: React.FC = () => {
  const navigate = useNavigate();
  const { jornada } = useJornada();
  const [history, setHistory] = useState<CheckinHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesSearch = 
        item.mood.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (item.response?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (item.exercise_title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      
      const matchesMood = moodFilter === "all" || item.mood.toLowerCase().includes(moodFilter.toLowerCase());
      
      return matchesSearch && matchesMood;
    });
  }, [history, searchTerm, moodFilter]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch checkins
      const { data: checkins } = await supabase
        .from("daily_checkins")
        .select("*")
        .eq("user_id", user.id)
        .order("checkin_date", { ascending: false });

      if (checkins) {
        const allExercises = JORNADA_DATA.flatMap(f => f.sessoes.flatMap(s => s.blocos.filter(b => b.tipo === 'exercise')));
        
        const historyData = checkins.map(c => {
          // Find the response for this date
          const response = jornada.responses.find(r => r.date?.startsWith(c.checkin_date));
          const exercise = allExercises.find(e => e.id === response?.exerciseId);

          return {
            checkin_date: c.checkin_date,
            mood: c.mood,
            exercise_id: response?.exerciseId,
            response: response?.response,
            exercise_title: exercise?.titulo
          };
        });
        setHistory(historyData);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [jornada.responses]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="streaming-container pt-10 space-y-10">
        <header className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-white/60 hover:text-white gap-2 px-0"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-5 h-5" /> Voltar
          </Button>
          <div className="text-right">
            <h1 className="text-3xl font-bold tracking-tighter text-white">Histórico de Consciência</h1>
            <p className="text-white/40 text-sm">Sua jornada de autodescoberta dia após dia.</p>
          </div>
        </header>

        {loading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-8 h-40 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="glass-card p-12 text-center space-y-4">
            <Calendar className="w-12 h-12 text-white/20 mx-auto" />
            <h3 className="text-xl font-bold text-white">Nenhum registro ainda</h3>
            <p className="text-white/40 max-w-xs mx-auto">Comece seu desafio diário para ver seu histórico crescer aqui.</p>
            <Button onClick={() => navigate('/')} className="btn-primary">Ir para a Home</Button>
          </div>
        ) : (
          <div className="grid gap-8">
            {history.map((item, index) => (
              <motion.div 
                key={item.checkin_date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card overflow-hidden border-white/5"
              >
                <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-white/80">
                      {format(new Date(item.checkin_date + 'T12:00:00'), "EEEE, d 'de' MMMM", { locale: ptBR })}
                    </span>
                  </div>
                  {item.response && (
                    <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                      <Flame className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-wider">Concluído</span>
                    </div>
                  )}
                </div>
                
                <div className="p-8 grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-white/30" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Estado Emocional</p>
                    </div>
                    <p className="text-lg text-white font-light italic leading-relaxed">
                      "{item.mood}"
                    </p>
                  </div>

                  {item.response && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary/40" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">
                          Micro Exercício: {item.exercise_title}
                        </p>
                      </div>
                      <p className="text-base text-white/70 leading-relaxed font-light">
                        {item.response}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConscienciaHistorico;
