import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PCHSymbol from "@/components/ui/PCHSymbol";
import { Helmet } from "react-helmet-async";

const STORAGE_KEY = "pch_onboarding_seen_v1";

const steps = [
  {
    variant: "glow" as const,
    eyebrow: "Bem-vindo",
    title: "Você chegou.",
    body: "Respire. Aqui o tempo desacelera. A PCH é um espaço onde a palavra reencontra a sua função mais antiga: curar.",
  },
  {
    variant: "flow" as const,
    eyebrow: "O método",
    title: "Poesia · Cognição · Hipnose",
    body: "Três movimentos integrados que conduzem você do ruído à clareza, da clareza à transformação.",
  },
  {
    variant: "feather" as const,
    eyebrow: "Sua jornada",
    title: "Comece quando estiver pronto.",
    body: "Cada exercício é um pequeno ritual. Cada palavra escrita, um passo. O caminho se faz no andar.",
  },
];

const PCHWelcome: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    onComplete?.();
    navigate("/jornada");
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else finish();
  };

  const skip = () => finish();

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-hidden">
      <Helmet>
        <title>Boas-vindas — PCH</title>
      </Helmet>

      {/* Ambient violet/gold gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(265_45%_18%/0.6),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,hsl(42_65%_22%/0.25),transparent_55%)]" />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5 z-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <PCHSymbol variant="feather" size="sm" />
          <span>PCH</span>
        </div>
        <button
          onClick={skip}
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
        >
          Pular
        </button>
      </div>

      {/* Content */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center max-w-xl"
          >
            <div className="mb-10">
              <PCHSymbol variant={current.variant} size="xl" animated />
            </div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-primary/80 mb-4">
              {current.eyebrow}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-foreground leading-tight mb-6">
              {current.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
              {current.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-28 flex items-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Ir para passo ${i + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                i === step
                  ? "w-10 bg-primary"
                  : "w-6 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <Button
            onClick={next}
            size="lg"
            className="min-w-[220px] tracking-wide"
          >
            {step < steps.length - 1 ? "Continuar" : "Iniciar minha jornada"}
          </Button>
        </div>
      </div>
    </div>
  );
};

/** Hook + auto-mount wrapper that shows the welcome only on first visit. */
export const PCHWelcomeGate: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {}
  }, []);
  if (!show) return null;
  return <PCHWelcome onComplete={() => setShow(false)} />;
};

export default PCHWelcome;
