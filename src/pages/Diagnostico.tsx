import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Heart, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    id: 1,
    text: "Qual é o seu principal objetivo ao utilizar a metodologia P.A.D.H.?",
    options: [
      { label: "Autoconhecimento e desenvolvimento pessoal", value: "pessoal", score: { P: 2, A: 1 } },
      { label: "Aplicação clínica em pacientes", value: "clinico", score: { A: 2, D: 1 } },
      { label: "Aprofundamento técnico e científico", value: "tecnico", score: { D: 2, H: 1 } },
      { label: "Exploração criativa e artística", value: "criativo", score: { P: 2, H: 1 } },
    ]
  },
  {
    id: 2,
    text: "Qual destas áreas você sente mais necessidade de trabalhar no momento?",
    options: [
      { label: "Linguagem e forma de se expressar", value: "linguagem", score: { P: 3 } },
      { label: "Crenças limitantes e padrões repetitivos", value: "crenças", score: { A: 3 } },
      { label: "Conexão com o inconsciente e intuição", value: "inconsciente", score: { D: 3 } },
      { label: "Propósito e identidade profunda", value: "identidade", score: { H: 3 } },
    ]
  },
  {
    id: 3,
    text: "Como você descreveria sua experiência com hipnose ou meditação?",
    options: [
      { label: "Iniciante, estou começando agora", value: "iniciante", score: { P: 1, A: 1 } },
      { label: "Pratico ocasionalmente", value: "intermediario", score: { A: 1, D: 1 } },
      { label: "Tenho experiência e busco técnicas avançadas", value: "avançado", score: { D: 2, H: 1 } },
      { label: "Sou profissional da área", value: "profissional", score: { D: 1, H: 2 } },
    ]
  }
];

const Diagnostico = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResult, setShowResult] = useState(false);
  const { setDiagnosis } = useCourseProgress();
  const navigate = useNavigate();

  const handleSelect = (questionId: number, option: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => calculateResult(), 300);
    }
  };

  const calculateResult = () => {
    const scores = { P: 0, A: 0, D: 0, H: 0 };
    Object.values(answers).forEach(ans => {
      Object.entries(ans.score).forEach(([key, val]) => {
        scores[key as keyof typeof scores] += val as number;
      });
    });

    // Find highest score
    const result = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    
    let path = "";
    switch(result) {
      case 'P': path = "Trilha da Expressão (Foco no Pilar Poesia)"; break;
      case 'A': path = "Trilha da Transformação (Foco no Pilar Aplicada)"; break;
      case 'D': path = "Trilha do Profundo (Foco no Pilar Desenvolvimento)"; break;
      case 'H': path = "Trilha da Maestria (Foco no Pilar Humano)"; break;
    }

    setDiagnosis(path, scores);
    setShowResult(true);
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  if (showResult) {
    return (
      <PageLayout 
        seo={{ title: 'Resultado do Diagnóstico — P.A.D.H.', description: 'Veja sua trilha de aprendizado personalizada.', path: '/diagnostico' }}
        currentPage="Diagnóstico Inicial"
      >
        <div className="container mx-auto px-6 py-20 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 rounded-3xl border border-primary/20"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold mb-4">Diagnóstico Concluído!</h1>
            <p className="text-muted-foreground mb-8">
              Com base nas suas respostas, identificamos que a melhor jornada para você neste momento é a:
            </p>
            <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-heading font-bold text-primary">
                {useCourseProgress().progress.diagnosisResult}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Preparamos seu Dashboard personalizado com os conteúdos mais relevantes para o seu perfil.
            </p>
            <Button onClick={() => navigate('/dashboard')} className="w-full py-6 text-lg gap-2">
              Acessar Meu Dashboard <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      seo={{ title: 'Diagnóstico Inicial — P.A.D.H.', description: 'Descubra sua trilha de aprendizado personalizada na metodologia P.A.D.H.', path: '/diagnostico' }}
      currentPage="Diagnóstico Inicial"
    >
      <div className="container mx-auto px-6 py-20 max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Diagnóstico de Jornada P.A.D.H.</h1>
          <p className="text-muted-foreground">Responda algumas perguntas para personalizarmos sua experiência.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Pergunta {currentStep + 1} de {QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-primary/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl font-heading leading-tight">
                  {QUESTIONS[currentStep].text}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid gap-4">
                {QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(QUESTIONS[currentStep].id, option)}
                    className={`text-left p-4 rounded-xl border transition-all hover:border-primary hover:bg-primary/5 group ${
                      answers[QUESTIONS[currentStep].id]?.value === option.value
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-border group-hover:border-primary flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <span className="font-medium text-foreground">{option.label}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-3 w-3" />
            Sua jornada será construída com base nestas escolhas.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Diagnostico;
