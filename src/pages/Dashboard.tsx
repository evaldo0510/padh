import React, { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  TrendingUp,
  User,
  History,
  Target,
  Trophy,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { motion } from "framer-motion";
import SyncStatusIndicator from "@/components/dashboard/SyncStatusIndicator";
import GlobalProgressBar from "@/components/dashboard/GlobalProgressBar";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import { ObjectiveSettings } from "@/components/dashboard/ObjectiveSettings";
import { PWAManager } from "@/components/dashboard/PWAManager";
import ProgressPanel from "@/components/dashboard/ProgressPanel";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { jornada } = useJornada();
  const { progress } = useCourseProgress();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();

  const [responsesCount, setResponsesCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      const { count } = await supabase
        .from("exercise_responses")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      setResponsesCount(count || 0);
    };
    fetchStats();
  }, [user]);

  const completedSessionsCount = jornada.completedSessions?.length || 0;
  const totalSessionsCount = JORNADA_DATA.reduce((acc, f) => acc + f.sessoes.length, 0);
  const totalProgress = Math.round((completedSessionsCount / totalSessionsCount) * 100);

  const currentPhase = useMemo(() => {
    for (const fase of JORNADA_DATA) {
      const allCompleted = fase.sessoes.every(s => jornada.completedSessions.includes(s.id));
      if (!allCompleted) return fase;
    }
    return JORNADA_DATA[JORNADA_DATA.length - 1];
  }, [jornada.completedSessions]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Sessão encerrada.");
    navigate("/");
  };

  return (
    <PageLayout
      seo={{
        title: "Minha Área — P.A.D.H.",
        description: "Acompanhe seu progresso e evolução na jornada.",
        path: "/dashboard",
      }}
      hideHeader
    >
      <div className="flex flex-col min-h-screen bg-[#050505]">
        {/* Profile Header */}
        <section className="relative w-full py-16 md:py-24 streaming-container">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center gap-8"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-glow">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Minha Área</h1>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest px-3">Membro Original</Badge>
                  <span className="text-white/30 text-xs font-medium">{user?.email}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Action Toolbar */}
        <div className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-xl border-y border-white/5 py-4">
           <div className="streaming-container flex justify-between items-center">
              <div className="flex gap-4 items-center">
                 <SyncStatusIndicator />
                 <NotificationCenter />
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full text-white/40 hover:text-destructive hover:bg-destructive/5 transition-all font-bold uppercase tracking-widest text-[10px] h-9 px-5 gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-3.5 h-3.5" /> Sair
              </Button>
           </div>
        </div>

        {/* Dashboard Grid */}
        <section className="streaming-container py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Stats & Controls */}
            <div className="lg:col-span-2 space-y-12">
               <ObjectiveSettings />
               <PWAManager />
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="glass-card p-8 bg-white/[0.02] border-white/5">
                   <div className="flex items-center gap-3 mb-6">
                      <History className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold">Histórico</h3>
                   </div>
                   <p className="text-sm text-white/40 leading-relaxed font-light mb-6">
                     Reveja suas respostas e insights coletados durante as sessões da jornada.
                   </p>
                   <Button variant="outline" className="w-full rounded-full border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]" asChild>
                     <Link to="/consciencia/historico">Ver Histórico Completo</Link>
                   </Button>
                 </Card>

                 <Card className="glass-card p-8 bg-white/[0.02] border-white/5">
                   <div className="flex items-center gap-3 mb-6">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold">Diagnóstico</h3>
                   </div>
                   <p className="text-sm text-white/40 leading-relaxed font-light mb-6">
                     Seu perfil atual guia as recomendações. Refaça para atualizar sua trilha.
                   </p>
                   <Button variant="outline" className="w-full rounded-full border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]" asChild>
                     <Link to="/diagnostico">Refazer Diagnóstico</Link>
                   </Button>
                 </Card>
                </div>

                <ProgressPanel />
            </div>
            
            {/* Summary Panel */}
            <div className="space-y-8">
               <Card className="glass-card p-10 border-white/5 bg-primary/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Trophy className="w-32 h-32 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" /> Performance
                  </h3>
                  
                  <div className="space-y-10 relative z-10">
                    <GlobalProgressBar />
                    
                    <div className="grid grid-cols-1 gap-4">
                       <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                          <div className="space-y-0.5">
                             <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Fase Atual</span>
                             <span className="block text-lg font-bold text-white leading-none">{currentPhase.titulo}</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                             <span className="text-primary font-black text-xs">{currentPhase.numero}</span>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                             <span className="block text-3xl font-black text-white">{completedSessionsCount}</span>
                             <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">Episódios</span>
                          </div>
                          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                             <span className="block text-3xl font-black text-white">{responsesCount}</span>
                             <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">Insights</span>
                          </div>
                       </div>
                    </div>
                  </div>
               </Card>

               <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                 <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Acesso Rápido</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Explorar', 'Biblioteca', 'Planos', 'Suporte'].map(tag => (
                      <button key={tag} className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[9px] font-bold uppercase tracking-[0.1em] text-white/40 hover:bg-primary/10 hover:text-primary transition-all">
                        {tag}
                      </button>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Dashboard;