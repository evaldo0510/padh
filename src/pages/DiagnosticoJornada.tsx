import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJornada } from "@/hooks/useJornada";
const QUESTIONS = [
  {
    id: 1,
    text: "Como você se sente em relação aos seus padrões de pensamento atuais?",
    options: [
      {
        label:
          "Sinto que estou no 'piloto automático' na maior parte do tempo.",
        phase: "fase-1",
      },
      {
        label: "Estou começando a notar padrões, mas ainda me sinto preso.",
        phase: "fase-1",
      },
      {
        label: "Tenho clareza dos meus padrões, mas não sei como mudá-los.",
        phase: "fase-2",
      },
      {
        label: "Já estou trabalhando ativamente em mudanças internas.",
        phase: "fase-3",
      },
    ],
  },
  {
    id: 2,
    text: "Qual a sua relação com seus medos e 'partes sombrias'?",
    options: [
      {
        label: "Prefiro não olhar para isso no momento.",
        phase: "fase-1",
      },
      {
        label: "Sinto que algo me bloqueia, mas não sei o que é.",
        phase: "fase-2",
      },
      {
        label: "Estou pronto para enfrentar e integrar minhas sombras.",
        phase: "fase-2",
      },
      {
        label: "Já integrei muito do que antes me assustava.",
        phase: "fase-4",
      },
    ],
  },
  {
    id: 3,
    text: "O quanto você acredita na sua capacidade de reescrever sua própria história?",
    options: [
      {
        label: "Acho que as coisas são como são e pouco pode mudar.",
        phase: "fase-1",
      },
      {
        label: "Gostaria de acreditar, mas sinto muita resistência.",
        phase: "fase-2",
      },
      {
        label: "Acredito e estou buscando as ferramentas para isso.",
        phase: "fase-3",
      },
      {
        label: "Já estou vivendo uma nova narrativa que eu mesmo criei.",
        phase: "fase-4",
      },
    ],
  },
];
const DiagnosticoJornada = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultPhase, setResultPhase] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setPhase } = useJornada();
  const handleSelect = (phase: string) => {
    const newAnswers = [...answers, phase];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      /* Calculate most frequent phase */ const counts: Record<string, number> =
        {};
      newAnswers.forEach((p) => (counts[p] = (counts[p] || 0) + 1));
      const winner = Object.entries(counts).reduce((a, b) =>
        a[1] > b[1] ? a : b,
      )[0];
      setResultPhase(winner);
    }
  };
  const startJourney = () => {
    if (resultPhase) {
      setPhase(resultPhase);
      navigate("/jornada");
    }
  };
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  return (
    <PageLayout
      seo={{
        title: "Diagnóstico da Jornada — P.A.D.H.",
        description: "Descubra por onde começar sua jornada de transformação.",
        path: "/diagnostico-jornada",
      }}
      currentPage="Diagnóstico"
    >
      {" "}
      <div className="container mx-auto px-6 py-20 max-w-2xl">
        {" "}
        {!resultPhase ? (
          <>
            {" "}
            <div className="text-center mb-12">
              {" "}
              <h1 className="text-3xl font-heading font-bold mb-4">
                Mapeamento Inicial
              </h1>{" "}
              <p className="text-muted-foreground">
                Responda com sinceridade para encontrarmos seu ponto de partida
                ideal.
              </p>{" "}
            </div>{" "}
            <div className="mb-8">
              {" "}
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-muted-foreground">
                {" "}
                <span>
                  Passo {step + 1}
                  de {QUESTIONS.length}
                </span>{" "}
                <span>{Math.round(progress)}%</span>{" "}
              </div>{" "}
              <Progress value={progress} className="h-1.5" />{" "}
            </div>{" "}
            <AnimatePresence mode="wait">
              {" "}
              <motion.div
                key={step}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                className="space-y-4"
              >
                {" "}
                <Card className="border-primary/10 shadow-lg">
                  {" "}
                  <CardHeader className="bg-primary/5">
                    {" "}
                    <CardTitle className="text-xl font-heading leading-tight">
                      {" "}
                      {QUESTIONS[step].text}
                    </CardTitle>{" "}
                  </CardHeader>{" "}
                  <CardContent className="pt-6 grid gap-3">
                    {" "}
                    {QUESTIONS[step].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(opt.phase)}
                        className="text-left p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group flex items-center gap-4"
                      >
                        {" "}
                        <div className="w-8 h-8 rounded-full border border-border group-hover:border-primary/30 flex items-center justify-center shrink-0 font-bold text-xs text-muted-foreground group-hover:text-primary">
                          {" "}
                          {idx + 1}
                        </div>{" "}
                        <span className="text-sm font-medium">
                          {opt.label}
                        </span>{" "}
                      </button>
                    ))}
                  </CardContent>{" "}
                </Card>{" "}
              </motion.div>{" "}
            </AnimatePresence>{" "}
          </>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="text-center"
          >
            {" "}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              {" "}
              <Compass className="h-10 w-10 text-primary" />{" "}
            </div>{" "}
            <h2 className="text-3xl font-heading font-bold mb-4">
              Seu Caminho está Traçado
            </h2>{" "}
            <p className="text-muted-foreground mb-8">
              {" "}
              Com base nas suas respostas, sugerimos que sua jornada comece
              na:{" "}
            </p>{" "}
            <div className="p-8 rounded-3xl border border-primary/20 bg-primary/5 mb-8">
              {" "}
              <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                {" "}
                {resultPhase === "fase-1" && "Fase 1: Despertar"}
                {resultPhase === "fase-2" && "Fase 2: Encontro com a Sombra"}
                {resultPhase === "fase-3" && "Fase 3: Reprogramação"}
                {resultPhase === "fase-4" && "Fase 4: Expansão"}
              </h3>{" "}
              <p className="text-sm text-muted-foreground italic">
                "O momento ideal para começar é exatamente onde você se encontra
                agora."{" "}
              </p>{" "}
            </div>{" "}
            <Button
              onClick={startJourney}
              size="lg"
              className="w-full py-7 text-lg gap-2 shadow-glow"
            >
              {" "}
              Acessar Minha Jornada{" "}
              <ArrowRight className="spiritual-icon spiritual-icon-lg" />{" "}
            </Button>{" "}
          </motion.div>
        )}
      </div>{" "}
    </PageLayout>
  );
};
export default DiagnosticoJornada;
