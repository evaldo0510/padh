import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, CheckCircle2, ChevronRight, MessageSquare, ArrowLeft, History, Bell, BellOff, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const DailyHabitSection: React.FC = () => {
  const navigate = useNavigate();
  const { jornada, saveResponse } = useJornada();
  const [showCheckin, setShowCheckin] = useState(false);
  const [step, setStep] = useState<"mood" | "exercise" | "feedback">("mood");
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("09:00");
  const [showSettings, setShowSettings] = useState(false);

  // Get a daily exercise based on the date
  const getDailyExercise = () => {
    const allExercises = JORNADA_DATA.flatMap(f => f.sessoes.flatMap(s => s.blocos.filter(b => b.tipo === 'exercise')));
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return allExercises[dayOfYear % allExercises.length];
  };

  const dailyExercise = getDailyExercise();
  const todayKey = new Date().toISOString().slice(0, 10);
  const isCompletedToday = jornada.responses.some(r => r.date?.startsWith(todayKey));

  useEffect(() => {
    const fetchReminderSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("reminder_enabled, reminder_time")
          .eq("user_id", user.id)
          .single();
        if (data) {
          setReminderEnabled(data.reminder_enabled || false);
          setReminderTime(data.reminder_time?.slice(0, 5) || "09:00");
        }
      }
    };
    fetchReminderSettings();
  }, []);

  const saveReminderSettings = async (enabled: boolean, time: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ reminder_enabled: enabled, reminder_time: time })
        .eq("user_id", user.id);
      toast.success("Configurações de lembrete atualizadas.");
    }
  };

  const handleStart = () => {
    setStep("mood");
    setShowCheckin(true);
  };

  const getEmotionalFeedback = (userResponse: string) => {
    const text = userResponse.toLowerCase();
    if (text.includes("calma") || text.includes("paz") || text.includes("tranquilo")) {
      return {
        title: "Calma Profunda",
        message: "O silêncio que você encontrou hoje é o seu porto seguro. Leve essa serenidade para o resto do seu dia."
      };
    }
    if (text.includes("medo") || text.includes("coragem") || text.includes("forte") || text.includes("enfrentar")) {
      return {
        title: "Sua Coragem é Poesia",
        message: "Enfrentar o que nos assusta é o ato mais sublime da alma. Você é mais forte do que imagina."
      };
    }
    if (text.includes("triste") || text.includes("sozinho") || text.includes("dor") || text.includes("difícil")) {
      return {
        title: "Acolhimento Sincero",
        message: "Honrar sua dor é o primeiro passo da cura. Sinta-se abraçado por sua própria consciência hoje."
      };
    }
    return {
      title: "Presença Confirmada",
      message: "Cada palavra escrita é um passo em direção à sua verdade. Sua jornada continua florescendo."
    };
  };

  const personalizedFeedback = useMemo(() => getEmotionalFeedback(response), [response, step]);

  const submitMood = async () => {
    if (!mood) {
      toast.error("Por favor, compartilhe como você está se sentindo.");
      return;
    }
    setStep("exercise");
  };

  const submitDailyChallenge = async () => {
    if (!response) {
      toast.error("O exercício é fundamental para o seu progresso.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Save the check-in mood to the new table
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("daily_checkins").upsert({
          user_id: user.id,
          mood: mood,
          checkin_date: todayKey
        }, { onConflict: "user_id,checkin_date" });
      }

      // Save exercise response
      await saveResponse(dailyExercise.id, response);
      
      setStep("feedback");
    } catch (error) {
      console.error("Error submitting daily challenge:", error);
      toast.error("Erro ao salvar seu progresso.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const streak = useMemo(() => {
    const days = new Set(
      (jornada.responses || [])
        .map((r) => (r.date ? r.date.slice(0, 10) : null))
        .filter(Boolean) as string[],
    );
    let s = 0;
    const d = new Date();
    while (true) {
      const key = d.toISOString().slice(0, 10);
      if (days.has(key)) {
        s++;
        d.setDate(d.getDate() - 1);
      } else {
        if (s === 0) {
          d.setDate(d.getDate() - 1);
          if (days.has(d.toISOString().slice(0, 10))) {
            s++;
            d.setDate(d.getDate() - 1);
            continue;
          }
        }
        break;
      }
    }
    return s;
  }, [jornada.responses]);

  return (
    <div className="w-full space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden border-primary/20 bg-primary/5 p-8 md:p-10 relative"
      >
        <div className="absolute top-0 right-0 p-6">
          <div className="flex items-center gap-2 bg-accent-warm/10 border border-accent-warm/20 px-4 py-2 rounded-full">
            <Flame className={`w-5 h-5 ${streak > 0 ? "text-accent-warm animate-pulse" : "text-white/20"}`} />
            <span className="text-sm font-bold text-white">{streak} dias</span>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 p-6 flex gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white/40 hover:text-primary gap-2"
            onClick={() => setShowSettings(true)}
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white/40 hover:text-primary gap-2"
            onClick={() => navigate('/consciencia/historico')}
          >
            <History className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Seu dia de consciência</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white italic">
              {isCompletedToday ? "Concluído com Sucesso" : "O Desafio de Hoje"}
            </h2>
          </div>

          <p className="text-lg text-white/60 font-light leading-relaxed italic">
            {isCompletedToday 
              ? "Você já dedicou um momento para si hoje. O silêncio que você cultivou continua ressoando."
              : "Uma pequena prática para ancorar sua presença e transformar seu estado emocional em 2 minutos."
            }
          </p>

          {!isCompletedToday ? (
            <Button 
              onClick={handleStart}
              className="btn-primary h-14 px-10 text-lg gap-3 group"
            >
              Iniciar Desafio <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <div className="flex items-center gap-3 text-primary font-bold">
              <CheckCircle2 className="w-6 h-6" />
              <span>Sua sequência está segura. Até amanhã!</span>
            </div>
          )}
        </div>
      </motion.div>

      <Dialog open={showCheckin} onOpenChange={setShowCheckin}>
        <DialogContent className="sm:max-w-[600px] bg-slate-900 border-white/10 p-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === "mood" && (
              <motion.div 
                key="mood"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 space-y-8"
              >
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                    <MessageSquare className="text-primary w-8 h-8" />
                    Como você está hoje?
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-white/50 italic">Dê um nome ao seu estado interno neste momento.</p>
                  <Textarea 
                    placeholder="Ex: Me sinto um pouco ansioso, mas presente..."
                    className="bg-white/5 border-white/10 min-h-[120px] text-lg focus:border-primary/50 transition-all"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  />
                  <Button onClick={submitMood} className="w-full btn-primary h-12 text-lg">
                    Continuar
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "exercise" && (
              <motion.div 
                key="exercise"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 space-y-8"
              >
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white/40 hover:text-white -ml-2"
                    onClick={() => setStep("mood")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Editar Check-in
                  </Button>
                </div>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-primary w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Micro Exercício</span>
                  </div>
                  <DialogTitle className="text-3xl font-bold tracking-tight text-white leading-tight">
                    {dailyExercise.titulo}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <p className="text-white/70 text-lg leading-relaxed font-light italic bg-white/5 p-6 rounded-2xl border border-white/5">
                    "{dailyExercise.instrucao}"
                  </p>
                  <Textarea 
                    placeholder={dailyExercise.placeholder || "Sua reflexão..."}
                    className="bg-white/5 border-white/10 min-h-[150px] text-lg focus:border-primary/50 transition-all"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      onClick={submitDailyChallenge} 
                      disabled={isSubmitting}
                      className="btn-primary h-12 text-lg"
                    >
                      {isSubmitting ? "Sincronizando..." : "Concluir Dia"}
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        if (!response) setResponse("Presença confirmada.");
                        submitDailyChallenge();
                      }}
                      disabled={isSubmitting}
                      className="text-white/40 hover:text-white h-12"
                    >
                      Concluir Rápido
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "feedback" && (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center space-y-8"
              >
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto shadow-glow shadow-primary/20">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {personalizedFeedback.title}
                  </h3>
                  <p className="text-white/60 text-lg italic max-w-sm mx-auto">
                    {personalizedFeedback.message}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-accent-warm text-xl font-bold">
                    <Flame className="w-6 h-6" />
                    <span>{streak} dias de clareza</span>
                  </div>
                  <Button onClick={() => setShowCheckin(false)} variant="outline" className="border-white/10 hover:bg-white/5 text-white/50 px-10">
                    Continuar meu Dia
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[400px] bg-slate-900 border-white/10 p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <Bell className="text-primary w-6 h-6" />
              Lembretes Diários
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-white font-medium">Ativar Notificações</p>
                <p className="text-white/40 text-sm">Receba um lembrete no celular.</p>
              </div>
              <Switch 
                checked={reminderEnabled} 
                onCheckedChange={(checked) => {
                  setReminderEnabled(checked);
                  saveReminderSettings(checked, reminderTime);
                }} 
              />
            </div>

            <div className={`space-y-4 transition-opacity ${reminderEnabled ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Horário do Lembrete</p>
              </div>
              <Input 
                type="time" 
                value={reminderTime} 
                onChange={(e) => {
                  setReminderTime(e.target.value);
                  saveReminderSettings(reminderEnabled, e.target.value);
                }}
                className="bg-white/5 border-white/10 text-white text-lg h-12"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSettings(false)} className="w-full btn-primary h-12">
              Salvar e Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyHabitSection;
