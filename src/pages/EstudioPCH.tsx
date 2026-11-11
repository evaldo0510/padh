import React, { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ArrowRight, Brain, BookOpen, CirclePause, CirclePlay,
  Clock3, Eye, FlaskConical, Headphones, Lightbulb, RotateCcw,
  Sparkles, VolumeX,
} from "lucide-react";

type Scene = {
  title: string;
  eyebrow: string;
  duration: number;
  narration: string;
  takeaway: string;
  kind: "opening" | "verse" | "network" | "responses" | "science" | "closing";
};

const scenes: Scene[] = [
  {
    title: "Como a leitura poética acontece?",
    eyebrow: "01 · ABERTURA",
    duration: 8,
    narration: "A leitura de um poema não acontece em um único lugar do cérebro. Ela pode envolver diferentes processos em diálogo.",
    takeaway: "A poesia não tem um único botão cerebral.",
    kind: "opening",
  },
  {
    title: "Texto, contexto e repertório",
    eyebrow: "02 · O VERSO",
    duration: 12,
    narration: "“Deixei a janela aberta para o dia entrar.” Para construir sentido, relacionamos palavras, contexto e repertório pessoal.",
    takeaway: "O sentido também nasce do encontro entre texto e leitor.",
    kind: "verse",
  },
  {
    title: "Processos em diálogo",
    eyebrow: "03 · UMA REDE",
    duration: 28,
    narration: "Linguagem, memória, atenção, imaginação e emoção podem participar da leitura. A contribuição de cada processo varia conforme a tarefa, a pessoa e o contexto.",
    takeaway: "Este é um mapa didático de processos, não um mapa anatômico.",
    kind: "network",
  },
  {
    title: "Cada leitor pode responder de um jeito",
    eyebrow: "04 · SINGULARIDADE",
    duration: 20,
    narration: "A palavra janela pode lembrar uma casa, uma viagem, a luz ou o silêncio. Também pode não despertar uma associação específica. Todas essas respostas são possíveis.",
    takeaway: "Associação pessoal não é prova de uma verdade escondida nem diagnóstico.",
    kind: "responses",
  },
  {
    title: "O que a ciência permite afirmar?",
    eyebrow: "05 · RESPONSABILIDADE",
    duration: 14,
    narration: "Metáfora didática não é evidência de pesquisa. Associação não é causalidade. Atividade cerebral, por si só, não comprova efeito terapêutico.",
    takeaway: "Precisão científica também é saber onde a afirmação termina.",
    kind: "science",
  },
  {
    title: "Um mapa de processos e perguntas",
    eyebrow: "06 · FECHAMENTO",
    duration: 8,
    narration: "A proposta é observar a experiência com curiosidade, respeitar a singularidade de cada leitor e reconhecer os limites do conhecimento científico.",
    takeaway: "Não é um mapa anatômico do cérebro.",
    kind: "closing",
  },
];

const processItems = [
  { label: "Linguagem", detail: "Palavras e significados", color: "border-cyan-400/50 bg-cyan-400/10" },
  { label: "Memória", detail: "Conhecimentos e lembranças", color: "border-violet-400/50 bg-violet-400/10" },
  { label: "Atenção", detail: "Seleção de detalhes", color: "border-amber-400/50 bg-amber-400/10" },
  { label: "Imaginação", detail: "Possibilidades e cenários", color: "border-rose-400/50 bg-rose-400/10" },
  { label: "Emoção", detail: "Respostas individuais", color: "border-emerald-400/50 bg-emerald-400/10" },
];

const responseItems = ["CASA", "VIAGEM", "LUZ", "SILÊNCIO", "NENHUMA"];

const EstudioPCH = () => {
  const [activeScene, setActiveScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const scene = scenes[activeScene];
  const totalDuration = scenes.reduce((sum, item) => sum + item.duration, 0);
  const elapsed = useMemo(
    () => scenes.slice(0, activeScene).reduce((sum, item) => sum + item.duration, 0),
    [activeScene],
  );
  const progress = Math.round((elapsed / totalDuration) * 100);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (activeScene >= scenes.length - 1) {
        setPlaying(false);
      } else {
        setActiveScene((current) => current + 1);
      }
    }, scene.duration * 1000);
    return () => window.clearTimeout(timer);
  }, [playing, activeScene, scene.duration]);

  const goTo = (index: number) => {
    setActiveScene(Math.max(0, Math.min(scenes.length - 1, index)));
  };

  const renderVisual = () => {
    switch (scene.kind) {
      case "opening":
        return (
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 py-12 text-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 p-7 text-primary"><Brain className="h-16 w-16" /></div>
            <p className="text-xl font-semibold md:text-2xl">Uma experiência, diferentes processos.</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">Leitura</Badge><Badge variant="outline">Contexto</Badge><Badge variant="outline">Sentido</Badge>
            </div>
          </div>
        );
      case "verse":
        return (
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-7 py-12 text-center">
            <BookOpen className="h-9 w-9 text-primary" />
            <blockquote className="font-serif text-3xl leading-relaxed md:text-5xl">“Deixei a janela aberta<br /><span className="text-primary">para o dia entrar.”</span></blockquote>
            <div className="grid w-full gap-3 text-left sm:grid-cols-3">
              {["Palavras", "Contexto", "Repertório"].map((item) => <div key={item} className="rounded-xl border bg-card p-3 text-center text-sm font-medium">{item}</div>)}
            </div>
          </div>
        );
      case "network":
        return (
          <div className="mx-auto grid max-w-3xl gap-3 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {processItems.map((item, index) => (
              <div key={item.label} className={`rounded-2xl border p-5 text-center transition-all duration-500 ${item.color} ${index === activeScene % processItems.length ? "scale-[1.03] shadow-lg" : ""}`}>
                <Sparkles className="mx-auto mb-2 h-6 w-6" />
                <p className="font-semibold">{item.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
              </div>
            ))}
            <div className="flex items-center justify-center rounded-2xl border border-dashed p-5 text-center text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
              Processos que podem interagir — sem correspondência anatômica individual.
            </div>
          </div>
        );
      case "responses":
        return (
          <div className="mx-auto max-w-2xl py-10 text-center">
            <Eye className="mx-auto mb-4 h-10 w-10 text-primary" />
            <p className="mb-7 text-3xl font-bold tracking-[0.2em]">JANELA</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {responseItems.map((item) => <div key={item} className="rounded-xl border bg-card px-4 py-5 text-sm font-semibold">{item}</div>)}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Nenhuma associação específica também é uma resposta válida.</p>
          </div>
        );
      case "science":
        return (
          <div className="mx-auto grid max-w-3xl gap-4 py-10 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6">
              <Lightbulb className="mb-4 h-8 w-8 text-amber-500" />
              <h3 className="mb-2 text-lg font-bold">Metáfora didática</h3>
              <p className="text-sm text-muted-foreground">Ajuda a comunicar uma ideia. Não substitui dados ou método.</p>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
              <FlaskConical className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-bold">Evidência de pesquisa</h3>
              <p className="text-sm text-muted-foreground">Depende de método, dados, análise e limites explícitos.</p>
            </div>
            <p className="text-center text-sm font-semibold md:col-span-2">Associação ≠ causalidade</p>
          </div>
        );
      case "closing":
        return (
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 py-14 text-center">
            <div className="rounded-full bg-primary/10 p-6 text-primary"><Brain className="h-14 w-14" /></div>
            <p className="text-2xl font-bold md:text-3xl">Um mapa de processos e perguntas.</p>
            <p className="text-muted-foreground">Não é um mapa anatômico do cérebro.</p>
          </div>
        );
    }
  };

  return (
    <PageLayout
      seo={{
        title: "Estúdio PCH — Aula 05",
        description: "Experiência audiovisual interativa sobre leitura poética, processos cognitivos e limites da evidência científica.",
        path: "/estudio-pch",
      }}
      currentPage="Estúdio PCH"
      parentPage={{ name: "Aulas e vídeos", path: "/videos" }}
    >
      <section className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge className="mb-3">PRÉVIA INTERATIVA · SEM ÁUDIO</Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Estúdio PCH</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Aula 05 · Anatomia poética do cérebro: uma rede em diálogo.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="h-4 w-4" /> 90 segundos</div>
        </div>

        <Card className="overflow-hidden border-primary/20">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/30 px-4 py-3">
            <span className="text-xs font-semibold tracking-widest text-primary">{scene.eyebrow}</span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><VolumeX className="h-4 w-4" /> Narração ainda não aprovada</span>
          </div>
          <CardContent className="min-h-[390px] px-5 py-4 md:px-10">
            <div className="mb-3 text-center text-sm text-muted-foreground">{scene.title}</div>
            {renderVisual()}
            <div className="mx-auto max-w-3xl rounded-xl border border-primary/20 bg-primary/5 p-4 text-center text-sm font-medium">{scene.takeaway}</div>
          </CardContent>
          <div className="border-t bg-muted/20 p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Etapa {activeScene + 1} de {scenes.length}</span><span>{elapsed}s / {totalDuration}s</span>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" aria-label="Voltar etapa" onClick={() => { setPlaying(false); goTo(activeScene - 1); }} disabled={activeScene === 0}><ArrowLeft className="h-4 w-4" /></Button>
                <Button onClick={() => activeScene === scenes.length - 1 ? (goTo(0), setPlaying(true)) : setPlaying((value) => !value)} className="gap-2">
                  {playing ? <><CirclePause className="h-4 w-4" /> Pausar</> : <><CirclePlay className="h-4 w-4" /> {activeScene === scenes.length - 1 ? "Recomeçar" : "Reproduzir"}</>}
                </Button>
                <Button variant="outline" size="icon" aria-label="Avançar etapa" onClick={() => { setPlaying(false); goTo(activeScene + 1); }} disabled={activeScene === scenes.length - 1}><ArrowRight className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Reiniciar apresentação" onClick={() => { setPlaying(false); goTo(0); }}><RotateCcw className="h-4 w-4" /></Button>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowTranscript((value) => !value)} className="gap-2">
                <Headphones className="h-4 w-4" /> {showTranscript ? "Ocultar roteiro" : "Ver roteiro"}
              </Button>
            </div>
          </div>
        </Card>

        {showTranscript && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Roteiro da etapa</CardTitle>
              <CardDescription>Texto preparado para futura gravação de voz humana ou teste de voz pt-BR.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{scene.narration}</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 rounded-2xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Nota de produção:</strong> esta é uma prévia interativa visual. O áudio está desativado intencionalmente. A cena não representa regiões anatômicas nem demonstra efeito terapêutico.
        </div>
      </section>
    </PageLayout>
  );
};

export default EstudioPCH;
