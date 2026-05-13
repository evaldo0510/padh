import React, { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useParams, useNavigate } from "react-router-dom";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { useJornada } from "@/hooks/useJornada";
import { prefetchRoute } from "@/lib/route-prefetch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, ChevronRight, CheckCircle2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BLOCK_TRANSITION_MS = 450;
const PACING_DELAY_MS = 250;

const SessaoView = () => {
  const { phaseId, sessionId } = useParams();
  const navigate = useNavigate();
  const { saveResponse, completeSession, getResponse, jornada } = useJornada();

  const fase = JORNADA_DATA.find((f) => f.id === phaseId);
  const sessao = fase?.sessoes.find((s) => s.id === sessionId);

  const [currentExIdx, setCurrentExIdx] = useState(() => {
    if (!sessao) return 0;
    // Find first block that is NOT completed
    const firstUncompletedIdx = sessao.blocos.findIndex(
      (b) => !jornada.completedExercises.includes(b.id)
    );
    return firstUncompletedIdx === -1 ? sessao.blocos.length - 1 : firstUncompletedIdx;
  });
  const [response, setResponse] = useState("");
  const [choice, setChoice] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseRemaining, setPauseRemaining] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Lock check
  const isLocked = () => {
    if (!sessao || !fase) return true;
    const allSessions: { id: string }[] = [];
    JORNADA_DATA.forEach((f) => f.sessoes.forEach((s) => allSessions.push(s)));
    const idx = allSessions.findIndex((s) => s.id === sessionId);
    if (idx > 0) return !jornada.completedSessions.includes(allSessions[idx - 1].id);
    return false;
  };

  const currentBlock = sessao?.blocos[currentExIdx];

  // Reset block-specific state on change
  useEffect(() => {
    if (!currentBlock) return;
    if (currentBlock.tipo === "exercise") {
      setResponse(getResponse(currentBlock.id) || "");
    } else {
      setResponse("");
    }
    if (currentBlock.tipo === "choice") {
      const saved = getResponse(currentBlock.id);
      const opts = currentBlock.opcoes || [];
      if (saved) {
        let savedLabels: string[] = [];
        try {
          const parsed = JSON.parse(saved);
          savedLabels = Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
        } catch {
          savedLabels = saved.split(",").map((s) => s.trim()).filter(Boolean);
        }
        // Map labels back to option IDs (fallback: keep raw if no match)
        const ids = savedLabels
          .map((lbl) => opts.find((o) => o.label === lbl)?.id ?? lbl)
          .filter(Boolean);
        setChoice(ids);
      } else {
        setChoice([]);
      }
    } else {
      setChoice([]);
    }
    // Clear pause
    if (pauseIntervalRef.current) clearInterval(pauseIntervalRef.current);
    setIsPaused(false);
    setPauseRemaining(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExIdx, sessao?.id]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      if (pauseIntervalRef.current) clearInterval(pauseIntervalRef.current);
    };
  }, []);

  if (!sessao || !fase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground font-light text-lg">
            Episódio não disponível.
          </p>
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="rounded-full px-8">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  if (isLocked()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Episódio bloqueado</h2>
            <p className="text-muted-foreground font-light">
              Conclua os episódios anteriores para liberar esta vivência.
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="px-8">
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const totalSteps = sessao.blocos.length;
  const progressPercent = ((currentExIdx + 1) / totalSteps) * 100;
  const isLast = currentExIdx === totalSteps - 1;
  const isNearEnd = currentExIdx >= totalSteps - 2;

  // Prefetch next session when near end
  useEffect(() => {
    if (isNearEnd) {
      const next = findNextSession();
      if (next) {
        prefetchRoute(`/jornada/${next.phaseId}/${next.sessionId}`, 'low');
      }
    }
  }, [isNearEnd, sessionId]);

  const findNextSession = () => {
    const all: { phaseId: string; sessionId: string }[] = [];
    JORNADA_DATA.forEach((f) =>
      f.sessoes.forEach((s) => all.push({ phaseId: f.id, sessionId: s.id })),
    );
    const idx = all.findIndex((s) => s.sessionId === sessionId);
    return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  };

  const goToNextSessionOrDashboard = () => {
    const next = findNextSession();
    if (next) navigate(`/jornada/${next.phaseId}/${next.sessionId}`);
    else navigate("/dashboard");
  };

  const advance = () => {
    setIsTransitioning(true);
    transitionTimeoutRef.current = setTimeout(() => {
      if (isLast) {
        completeSession(sessao!.id);
        setIsFinished(true);
      } else {
        setCurrentExIdx((p) => p + 1);
        // pacing pause before showing next
        setTimeout(() => setIsTransitioning(false), PACING_DELAY_MS);
        return;
      }
      setIsTransitioning(false);
    }, BLOCK_TRANSITION_MS);
  };

  const startPause = (seconds = 20) => {
    setIsPaused(true);
    setPauseRemaining(seconds);
    pauseIntervalRef.current = setInterval(() => {
      setPauseRemaining((r) => {
        if (r <= 1) {
          if (pauseIntervalRef.current) clearInterval(pauseIntervalRef.current);
          setIsPaused(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  const handlePrimary = () => {
    if (!currentBlock || isTransitioning) return;

    if (currentBlock.tipo === "exercise") {
      if (!response.trim()) {
        toast.error("Escreva uma resposta para continuar.");
        return;
      }
      saveResponse(currentBlock.id, response);
    }

    if (currentBlock.tipo === "choice") {
      const opts = currentBlock.opcoes || [];
      // Skip validation/save when block is misconfigured (no opcoes)
      if (opts.length > 0) {
        if (choice.length === 0) {
          toast.error("Selecione uma opção para continuar.");
          return;
        }
        const labels = choice.map((id) => opts.find((o) => o.id === id)?.label ?? id);
        saveResponse(currentBlock.id, JSON.stringify(labels));
      }
    }

    advance();
  };

  // Determine block kind for rendering
  type BlockKind = "opening" | "reflection" | "input" | "choice" | "pause";
  const blockKind: BlockKind = ((): BlockKind => {
    if (currentBlock?.tipo === "exercise") return "input";
    if (currentBlock?.tipo === "reflection") return "reflection";
    if (currentBlock?.tipo === "action") return "pause";
    if (currentBlock?.tipo === "choice") return "choice";
    return "opening";
  })();

  const choiceHasOptions =
    blockKind === "choice" && (currentBlock?.opcoes?.length ?? 0) > 0;

  const primaryLabel = isLast
    ? "Finalizar"
    : blockKind === "input"
    ? "Responder"
    : blockKind === "choice" && choiceHasOptions
    ? "Confirmar"
    : "Continuar";

  const primaryDisabled =
    isTransitioning ||
    (blockKind === "input" && !response.trim()) ||
    (blockKind === "choice" && choiceHasOptions && choice.length === 0) ||
    (blockKind === "pause" && isPaused);

  const toggleChoice = (optId: string, multi: boolean) => {
    setChoice((prev) => {
      if (multi) {
        return prev.includes(optId) ? prev.filter((p) => p !== optId) : [...prev, optId];
      }
      return [optId];
    });
  };

  return (
    <PageLayout
      seo={{
        title: `${sessao.titulo} — PCH Player`,
        description: sessao.descricao,
        path: `/jornada/${phaseId}/${sessionId}`,
      }}
      hideHeader
      hideFooter
      hideMobileNav
    >
      <div className="fixed inset-0 bg-[#050505] text-foreground flex flex-col overflow-hidden">
        {/* Top: minimal progress + back */}
        <div className="absolute top-0 left-0 right-0 z-50 pt-safe">
          <div className="h-0.5 w-full bg-white/5">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="px-4 md:px-6 h-12 flex items-center justify-between">
            <button
              onClick={() => navigate("/jornada")}
              className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-xs uppercase tracking-[0.2em] font-medium"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
              {currentExIdx + 1} / {totalSteps}
            </div>
          </div>
        </div>

        {/* Centered content — one block at a time */}
        <main className="flex-1 w-full flex flex-col items-center justify-start md:justify-center px-6 md:px-12 overflow-y-auto scrollbar-hide pb-48 pt-24">
          <AnimatePresence mode="wait">
            {isFinished ? (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl mx-auto text-center space-y-10"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                  <CheckCircle2 className="w-24 h-24 text-primary relative z-10 mx-auto" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                    Vivência Concluída
                  </h2>
                  <p className="text-xl text-white/50 font-light italic">
                    "Cada palavra é um degrau. Você acaba de subir mais um."
                  </p>
                </div>

                <div className="pt-6 flex flex-col gap-4">
                  <Button
                    onClick={goToNextSessionOrDashboard}
                    size="lg"
                    className="h-16 rounded-full text-lg font-bold tracking-widest uppercase bg-primary hover:bg-primary/90 text-white shadow-glow"
                  >
                    Próximo Passo <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/jornada")}
                    className="text-white/40 hover:text-white"
                  >
                    Voltar para a Jornada
                  </Button>
                </div>
              </motion.div>
            ) : !isTransitioning && currentBlock && (
              <motion.div
                key={currentBlock.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-3xl mx-auto text-center space-y-12 md:space-y-16"
              >
                {currentBlock.titulo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="space-y-3"
                  >
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary/60">
                      {sessao.titulo}
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                      {currentBlock.titulo}
                    </h1>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-6"
                >
                  <p
                    className={`mx-auto leading-relaxed font-light ${
                      blockKind === "reflection"
                        ? "text-2xl md:text-3xl text-white/80 italic max-w-2xl"
                        : "text-xl md:text-2xl text-white/60 max-w-2xl"
                    }`}
                  >
                    {currentBlock.conteudo}
                  </p>

                  {currentBlock.instrucao && blockKind === "input" && (
                    <p className="text-xs md:text-sm text-primary font-bold uppercase tracking-[0.3em] max-w-lg mx-auto opacity-80">
                      {currentBlock.instrucao}
                    </p>
                  )}
                </motion.div>

                {/* Input field block */}
                {blockKind === "input" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="pt-4"
                  >
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder={currentBlock.placeholder || "Suas palavras aqui..."}
                      autoFocus
                      rows={4}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-6 text-xl md:text-2xl text-white placeholder:text-white/20 font-light leading-relaxed resize-none focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all duration-500 shadow-2xl appearance-none md:min-h-[200px]"
                    />
                  </motion.div>
                )}

                {/* Multiple choice block — renders real opcoes from data */}
                {blockKind === "choice" && (() => {
                  const opts = currentBlock.opcoes || [];
                  // Friendly fallback when block is misconfigured
                  if (opts.length === 0) {
                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="max-w-md mx-auto pt-4"
                      >
                        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-6 py-5 text-left">
                          <p className="text-xs uppercase tracking-[0.25em] text-amber-400/80 font-semibold mb-2">
                            Bloco indisponível
                          </p>
                          <p className="text-sm text-white/70 font-light leading-relaxed">
                            Este passo de múltipla escolha não possui opções configuradas. Você pode continuar para o próximo bloco.
                          </p>
                        </div>
                      </motion.div>
                    );
                  }

                  // Summary of previously-selected labels (revisit)
                  const selectedLabels = choice
                    .map((id) => opts.find((o) => o.id === id)?.label)
                    .filter((l): l is string => Boolean(l));

                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="flex flex-col gap-3 max-w-md mx-auto pt-4"
                      role={currentBlock.multiSelect ? "group" : "radiogroup"}
                    >
                      {selectedLabels.length > 0 && (
                        <div className="mb-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 text-left">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold mb-1.5">
                            Sua escolha anterior
                          </p>
                          <p className="text-sm text-white/80 font-light">
                            {selectedLabels.join(", ")}
                          </p>
                        </div>
                      )}
                      {opts.map((opt) => {
                        const selected = choice.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            role={currentBlock.multiSelect ? "checkbox" : "radio"}
                            aria-checked={selected}
                            onClick={() => toggleChoice(opt.id, !!currentBlock.multiSelect)}
                            className={`px-6 py-4 rounded-xl border text-left transition-all duration-200 ${
                              selected
                                ? "border-primary bg-primary/10 text-white"
                                : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/5"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                      {currentBlock.multiSelect && (
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 text-center pt-2">
                          Selecione uma ou mais opções
                        </p>
                      )}
                    </motion.div>
                  );
                })()}

                {/* Guided pause block */}
                {blockKind === "pause" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col items-center gap-6 pt-2"
                  >
                    {!isPaused ? (
                      <button
                        onClick={() => startPause(20)}
                        className="text-xs uppercase tracking-[0.3em] text-primary/70 hover:text-primary border border-primary/30 hover:border-primary/60 rounded-full px-6 py-3 transition-all"
                      >
                        Iniciar pausa guiada · 20s
                      </button>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-24 h-24">
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary/30"
                            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-2xl font-light text-white">
                            {pauseRemaining}
                          </div>
                        </div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                          Respire lentamente
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom: fixed navigation bar */}
        <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 md:px-12 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-10 flex justify-center bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent">
          <AnimatePresence>
            {!isTransitioning && !isFinished && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[280px]"
              >
                <Button
                  onClick={handlePrimary}
                  disabled={primaryDisabled}
                  size="lg"
                  className="w-full h-16 rounded-full text-lg font-black tracking-[0.2em] uppercase bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] transition-all active:scale-95 border border-primary/20"
                >
                  {primaryLabel}
                  {isLast ? (
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                  ) : (
                    <ChevronRight className="w-5 h-5 ml-1.5" />
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </footer>

        {/* Subtle ambience */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </PageLayout>
  );
};

export default SessaoView;
