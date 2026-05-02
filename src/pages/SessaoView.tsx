import React, { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useParams, useNavigate } from "react-router-dom";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { useJornada } from "@/hooks/useJornada";
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

  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [response, setResponse] = useState("");
  const [choice, setChoice] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseRemaining, setPauseRemaining] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    setChoice(null);
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
        goToNextSessionOrDashboard();
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

    advance();
  };

  // Determine block kind for rendering
  type BlockKind = "opening" | "reflection" | "input" | "choice" | "pause";
  const blockKind: BlockKind =
    currentBlock?.tipo === "exercise"
      ? "input"
      : currentBlock?.tipo === "reflection"
      ? "reflection"
      : currentBlock?.tipo === "action"
      ? "pause"
      : "opening";

  const primaryLabel = isLast
    ? "Finalizar"
    : blockKind === "input"
    ? "Responder"
    : "Continuar";

  const primaryDisabled =
    isTransitioning ||
    (blockKind === "input" && !response.trim()) ||
    (blockKind === "pause" && isPaused);

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
      <div className="fixed inset-0 bg-background text-foreground flex flex-col overflow-hidden">
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
        <main className="flex-1 flex items-center justify-center px-6 md:px-12">
          <AnimatePresence mode="wait">
            {!isTransitioning && currentBlock && (
              <motion.div
                key={currentBlock.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl mx-auto text-center space-y-10 md:space-y-14"
              >
                {currentBlock.titulo && (
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white"
                  >
                    {currentBlock.titulo}
                  </motion.h1>
                )}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.7 }}
                  className={`mx-auto leading-relaxed font-light ${
                    blockKind === "reflection"
                      ? "text-xl md:text-2xl text-white/70 italic max-w-xl"
                      : "text-lg md:text-xl text-white/60 max-w-xl"
                  }`}
                >
                  {currentBlock.conteudo}
                </motion.p>

                {currentBlock.instrucao && blockKind === "input" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-sm md:text-base text-primary/80 font-medium max-w-lg mx-auto"
                  >
                    {currentBlock.instrucao}
                  </motion.p>
                )}

                {/* Input field block */}
                {blockKind === "input" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="pt-2"
                  >
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder={currentBlock.placeholder || "Suas palavras aqui..."}
                      autoFocus
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-base md:text-lg text-white placeholder:text-white/25 font-light leading-relaxed resize-none focus:outline-none focus:border-primary/40 focus:bg-white/[0.07] transition-all duration-300"
                    />
                  </motion.div>
                )}

                {/* Multiple choice block (graceful — used if future data adds opcoes) */}
                {blockKind === "choice" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col gap-3 max-w-md mx-auto pt-4"
                  >
                    {(["Sim", "Não", "Talvez"]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setChoice(opt)}
                        className={`px-6 py-4 rounded-xl border text-left transition-all duration-200 ${
                          choice === opt
                            ? "border-primary bg-primary/10 text-white"
                            : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/5"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}

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

        {/* Bottom: single primary action */}
        <footer className="px-6 md:px-12 pb-10 md:pb-12 pt-4 flex justify-center">
          <AnimatePresence>
            {!isTransitioning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button
                  onClick={handlePrimary}
                  disabled={primaryDisabled}
                  size="lg"
                  className="min-w-[220px] h-14 rounded-full text-base font-medium tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all"
                >
                  {primaryLabel}
                  {isLast ? (
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                  ) : (
                    <ChevronRight className="w-5 h-5 ml-1" />
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
