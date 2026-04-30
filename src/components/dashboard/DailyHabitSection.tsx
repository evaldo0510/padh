import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, CheckCircle2, ChevronRight, MessageSquare, ArrowLeft, History, Bell, BellOff, Clock, Activity, FileSpreadsheet, Terminal, Download } from "lucide-react";
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
  const [note, setNote] = useState("");
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("09:00");
  const [showSettings, setShowSettings] = useState(false);
  const [customMessage, setCustomMessage] = useState("Hora de reconectar consigo mesmo. Vamos praticar?");
  const [testStatus, setTestStatus] = useState<"idle" | "sending" | "delivered">("idle");
  const [continuousTest, setContinuousTest] = useState(false);
  const [deliveryCount, setDeliveryCount] = useState(0);
  const [reminderHistory, setReminderHistory] = useState<{date: string, type: string}[]>([]);
  const [fromReminderId, setFromReminderId] = useState<string | null>(null);

  // Get a daily exercise based on the date
  const getDailyExercise = () => {
    const allExercises = JORNADA_DATA.flatMap(f => f.sessoes.flatMap(s => s.blocos.filter(b => b.tipo === 'exercise')));
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return allExercises[dayOfYear % allExercises.length];
  };

  const dailyExercise = getDailyExercise();
  const todayKey = new Date().toISOString().slice(0, 10);
  const isCompletedToday = jornada.responses.some(r => r.date?.startsWith(todayKey));
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }

    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === 'TEST_CONFIRMATION') {
        setTestStatus('delivered');
        setTimeout(() => setTestStatus('idle'), 3000);
        setReminderHistory(prev => [{date: new Date().toISOString(), type: 'Test Single'}, ...prev].slice(0, 5));
      }
      if (event.data?.type === 'TEST_COUNT_UPDATE') {
        setDeliveryCount(event.data.count);
        setReminderHistory(prev => [{date: new Date().toISOString(), type: `Continuous #${event.data.count}`}, ...prev].slice(0, 5));
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleSWMessage);
    }

    // Auto-open checkin if coming from notification
    const params = new URLSearchParams(window.location.search);
    const rid = params.get('rid');
    if (params.get('from_notification') === 'true' && !isCompletedToday) {
       setShowCheckin(true);
       if (rid) setFromReminderId(rid);
    }

    const fetchReminderSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("reminder_enabled, reminder_time, reminder_message")
          .eq("user_id", user.id)
          .single();
        if (data) {
          setReminderEnabled(data.reminder_enabled || false);
          setReminderTime(data.reminder_time?.slice(0, 5) || "09:00");
          setCustomMessage(data.reminder_message || "Hora de reconectar consigo mesmo. Vamos praticar?");
        }
      }
    };
    fetchReminderSettings();
  }, []);

  // Effect to check and trigger local notifications
  useEffect(() => {
    if (!reminderEnabled || notificationPermission !== "granted") return;

    const checkNotification = () => {
      const now = new Date();
      // Use local date for "once a day" logic to avoid timezone jumps
      const today = now.toLocaleDateString('sv'); // sv format is YYYY-MM-DD
      const lastNotified = localStorage.getItem('padh_last_notified_date');
      
      // Check if already notified today
      if (lastNotified === today) return;

      const [targetHours, targetMinutes] = reminderTime.split(':').map(Number);
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      // Trigger if current time matches target time (exact minute)
      if (currentHours === targetHours && currentMinutes === targetMinutes && !isCompletedToday) {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          // If SW is available, it's better to show via registration
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification("Lembrete PADH", {
              body: customMessage,
              icon: "/pwa-192x192.png",
              tag: 'daily-reminder',
              requireInteraction: true
            });
          });
        } else {
          // Fallback to simple notification
          new Notification("Lembrete PADH", {
            body: customMessage,
            icon: "/pwa-192x192.png",
            tag: 'daily-reminder',
            requireInteraction: true
          });
        }
        
        localStorage.setItem('padh_last_notified_date', today);
      }
    };

    // Check every 30 seconds to be precise enough but avoid battery drain
    const interval = setInterval(checkNotification, 30000);
    checkNotification(); // Initial check

    return () => clearInterval(interval);
  }, [reminderEnabled, reminderTime, customMessage, notificationPermission, isCompletedToday]);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Este navegador não suporta notificações.");
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    
    if (permission === "granted") {
      // Try to register periodic sync if supported
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if ('periodicSync' in registration) {
          try {
            await (registration as any).periodicSync.register('daily-reminder', {
              minInterval: 24 * 60 * 60 * 1000, // Once a day
            });
          } catch (e) {
            console.error("Periodic sync registration failed:", e);
          }
        }
      }
      toast.success("Notificações ativadas!");
    } else {
      toast.error("Permissão de notificação negada.");
    }
  };

  const saveReminderSettings = async (enabled: boolean, time: string, message: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ reminder_enabled: enabled, reminder_time: time, reminder_message: message })
        .eq("user_id", user.id);
      
      // Notify Service Worker
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SET_REMINDER',
          enabled,
          time,
          message
        });
      }
      
      toast.success("Configurações de lembrete atualizadas.");
    }
  };

  const handleTestNotification = () => {
    if (notificationPermission !== "granted") {
      requestPermission();
      return;
    }

    setTestStatus('sending');
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'TEST_NOTIFICATION',
        config: {
          time: reminderTime,
          message: customMessage
        }
      });
      toast.success("Solicitação de teste enviada!");
    } else {
      // Fallback
      new Notification(`Teste PADH [Agendado: ${reminderTime}]`, {
        body: customMessage,
        icon: "/pwa-192x192.png"
      });
      setTestStatus('delivered');
      setTimeout(() => setTestStatus('idle'), 3000);
      setReminderHistory(prev => [{date: new Date().toISOString(), type: 'Test (Fallback)'}, ...prev].slice(0, 5));
    }
  };

  const toggleContinuousTest = () => {
    const newState = !continuousTest;
    setContinuousTest(newState);
    if (!newState) setDeliveryCount(0);
    
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: newState ? 'START_CONTINUOUS_TEST' : 'STOP_CONTINUOUS_TEST',
        config: { message: customMessage }
      });
      toast.info(newState ? "Teste contínuo iniciado (30s)." : "Teste contínuo parado.");
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
          note: note,
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
                    className="bg-white/5 border-white/10 min-h-[80px] text-lg focus:border-primary/50 transition-all mb-4"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  />
                  <p className="text-white/30 text-xs uppercase tracking-widest font-black mb-2">Registro Detalhado (Opcional)</p>
                  <Textarea 
                    placeholder="O que mais está na sua mente agora?"
                    className="bg-white/5 border-white/10 min-h-[100px] focus:border-primary/50 transition-all mb-4"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
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
                  {fromReminderId && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 py-1 px-3 rounded-full inline-block mt-2">
                       ✓ Marcado do lembrete de hoje
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-accent-warm text-xl font-bold">
                    <Flame className="w-6 h-6" />
                    <span>{streak} dias de clareza</span>
                  </div>
                  <Button onClick={() => { setShowCheckin(false); setFromReminderId(null); }} variant="outline" className="border-white/10 hover:bg-white/5 text-white/50 px-10">
                    Continuar meu Dia
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[440px] bg-slate-950 border-white/10 p-8 shadow-2xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <Bell className="text-primary w-6 h-6" />
              Lembretes Diários
            </DialogTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestNotification}
              disabled={testStatus !== 'idle'}
              className={`border-primary/20 text-primary hover:bg-primary/10 h-8 min-w-[100px] transition-all ${
                testStatus === 'delivered' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : ''
              }`}
            >
              {testStatus === 'idle' && "Testar Agora"}
              {testStatus === 'sending' && "Enviando..."}
              {testStatus === 'delivered' && "Recebido ✓"}
            </Button>
          </DialogHeader>
          <div className="py-6 space-y-8 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Resumo da Agenda</h4>
              <p className="text-white text-sm">
                Disparo diário às <span className="font-bold">{reminderTime}</span> ({Intl.DateTimeFormat().resolvedOptions().timeZone})
              </p>
              <p className="text-white/40 text-[10px] mt-1 italic">"{customMessage}"</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-white font-medium">Ativar Lembretes</p>
                <p className="text-white/40 text-sm">Receba um alerta no seu navegador.</p>
              </div>
              <Switch 
                checked={reminderEnabled} 
                onCheckedChange={(checked) => {
                  if (checked && notificationPermission !== "granted") {
                    requestPermission();
                  }
                  setReminderEnabled(checked);
                  saveReminderSettings(checked, reminderTime, customMessage);
                }} 
              />
            </div>

            <div className={`space-y-6 transition-opacity ${reminderEnabled ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Horário</p>
                  </div>
                  <Input 
                    type="time" 
                    value={reminderTime} 
                    onChange={(e) => {
                      setReminderTime(e.target.value);
                      saveReminderSettings(reminderEnabled, e.target.value, customMessage);
                    }}
                    className="bg-white/5 border-white/10 text-white text-lg h-12"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Contínuo</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={toggleContinuousTest}
                    className={`w-full h-12 border-white/10 ${continuousTest ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' : 'text-white/40'}`}
                  >
                    {continuousTest ? `Parar (${deliveryCount})` : "Iniciar 30s"}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Mensagem de Incentivo</p>
                </div>
                <Textarea 
                  value={customMessage} 
                  onChange={(e) => {
                    setCustomMessage(e.target.value);
                  }}
                  onBlur={() => saveReminderSettings(reminderEnabled, reminderTime, customMessage)}
                  className="bg-white/5 border-white/10 text-white min-h-[80px] focus:border-primary/50 transition-all"
                  placeholder="Ex: Hora da sua dose diária de poesia..."
                />
              </div>

              {reminderHistory.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-white/30" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Histórico de Alertas</p>
                  </div>
                  <div className="space-y-2">
                    {reminderHistory.map((h, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] text-white/40 bg-white/5 p-2 rounded-lg">
                        <span>{h.type}</span>
                        <span>{new Date(h.date).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
