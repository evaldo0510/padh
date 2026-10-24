import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MODULOS, PILARES_INFO } from "@/lib/dados-clinicos";
import { COMPLEMENTOS_ESTUDO_PCH, getEtapaEstudoPCH, NOTAS_ESTUDO_PCH } from "@/lib/estudo-curricular";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import PageLayout from "@/components/layout/PageLayout";
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  Brain, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ModuloFormacao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, completeModule } = useCourseProgress();
  const modulo = MODULOS.find(m => m.id === id) || MODULOS.find(m => m.numero === Number(id));

  if (!modulo) {
    return (
      <PageLayout 
        seo={{ 
          title: "Módulo não encontrado", 
          description: "O módulo solicitado não pôde ser localizado.",
          path: "/formacao/modulo-not-found"
        }}
        currentPage="Módulo não encontrado"
      >
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Módulo não encontrado</h1>
          <Button asChild>
            <Link to="/formacao">Voltar para a Formação</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const pilar = PILARES_INFO[modulo.pilar];
  const etapa = getEtapaEstudoPCH(modulo.id);
  const isCompleted = progress.completedModules.includes(modulo.id);
  const isReadyToComplete =
    modulo.numero === 1 ||
    progress.completedModules.includes(`modulo-${modulo.numero - 1}`);
  const complementos = (COMPLEMENTOS_ESTUDO_PCH[modulo.id] ?? [])
    .map((moduleId) => MODULOS.find((item) => item.id === moduleId))
    .filter((item): item is (typeof MODULOS)[number] => Boolean(item));
  const moduloAnterior = MODULOS.find((item) => item.numero === modulo.numero - 1);
  const proximoModulo = MODULOS.find(m => m.numero === modulo.numero + 1);

  return (
    <PageLayout 
      seo={{ 
        title: `Módulo ${modulo.numero}: ${modulo.titulo} | Formação PCH`,
        description: modulo.foco,
        path: `/formacao/modulo/${modulo.id}`
      }}
      currentPage={`Módulo ${modulo.numero}: ${modulo.titulo}`}
    >
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-6">
          <Button variant="ghost" onClick={() => navigate("/formacao")} className="mb-8 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar para a Formação
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-none text-sm px-4">Módulo {modulo.numero}</Badge>
                <Badge variant="outline" className="text-xs uppercase tracking-widest">{modulo.pilarNome}</Badge>
                {etapa && <Badge variant="secondary" className="text-xs">Etapa {etapa.numero}: {etapa.titulo}</Badge>}
              </div>
              <p className="text-xs text-muted-foreground">Pilar {modulo.pilar} · {pilar.nome}</p>
              <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                {modulo.titulo}
              </h1>
              <p className="text-xl text-muted-foreground italic leading-relaxed">
                "{modulo.foco}"
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Identidade do módulo:</span> {modulo.corNome} — {modulo.corSimbolo}
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">{modulo.tempoEstimado} minutos de estudo</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="font-medium">Certificação Inclusa</span>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant={isCompleted || !isReadyToComplete ? "outline" : "default"}
                  disabled={isCompleted || !isReadyToComplete}
                  onClick={() => completeModule(modulo.id)}
                  className="h-auto min-h-14 whitespace-normal px-4 py-4 rounded-full"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  {isCompleted
                    ? "Módulo concluído"
                    : isReadyToComplete
                      ? "Marcar módulo como concluído"
                      : `Conclua o Módulo ${modulo.numero - 1} antes de registrar este`}
                </Button>
                <Button asChild size="lg" variant="outline" className="h-auto min-h-14 whitespace-normal px-4 py-4 rounded-full">
                  <Link to="/curso-padh">
                    Abrir guia técnico completo <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
              {!isCompleted && !isReadyToComplete && moduloAnterior && (
                <p className="text-sm text-muted-foreground">
                  Você pode estudar este conteúdo agora; para registrar a conclusão em sequência, comece pelo{" "}
                  <Link className="font-semibold text-primary underline underline-offset-4" to={`/formacao/modulo/${moduloAnterior.id}`}>
                    Módulo {moduloAnterior.numero}: {moduloAnterior.titulo}
                  </Link>.
                </p>
              )}
            </div>

            <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden sticky top-24">
              <CardHeader className="bg-primary/5 pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-5 h-5 text-primary" /> Roteiro de estudo
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {modulo.atividades.map((atv) => (
                  <div key={atv.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{atv.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-bold flex items-center gap-3">
                  <Brain className="w-6 h-6 text-primary" /> Fundamentação Científica
                </h3>
                <div className="space-y-4">
                  {modulo.teoricos.map((t, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                      <p className="font-bold text-foreground">{t.nome}</p>
                      <p className="text-xs text-primary mb-2 italic">{t.obra}</p>
                      <p className="text-sm text-muted-foreground">{t.contribuicao}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-bold flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" /> Aplicação Clínica
                </h3>
                <ul className="space-y-3">
                  {modulo.aplicacao.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-bold flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" /> Sinais e mapa de observação
                </h3>
                <ul className="space-y-3">
                  {modulo.sinais.map((sinal, i) => (
                    <li key={`sinal-${i}`} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                      {sinal}
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl border border-border/50 bg-muted/30 p-5">
                  <h4 className="font-semibold mb-3">Checklist do módulo</h4>
                  <ul className="space-y-2">
                    {modulo.checklistSinais.map((item, i) => (
                      <li key={`check-${i}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6 p-8 rounded-3xl bg-primary/5 border border-primary/10">
                <h3 className="text-2xl font-heading font-bold flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-primary" /> Cuidados e Ética
                </h3>
                <ul className="space-y-4">
                  {modulo.cuidados.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed italic">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-1" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-bold flex items-center gap-3">
                  <Star className="w-6 h-6 text-primary" /> Indicações Clínicas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {modulo.indicacoes.map((ind, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-none">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-6 rounded-3xl border border-border/50 bg-muted/30 p-6 md:p-8">
                <h3 className="text-2xl font-heading font-bold flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" /> Tarefas sugeridas ao paciente
                </h3>
                <ul className="space-y-3">
                  {modulo.tarefasPaciente.map((tarefa, i) => (
                    <li key={`tarefa-${i}`} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-primary">{i + 1}.</span>{tarefa}
                    </li>
                  ))}
                </ul>
              </div>

              {modulo.poemaPrescricao && (
                <div className="space-y-4 rounded-3xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8">
                  <h3 className="text-2xl font-heading font-bold">Poema-prescrição: {modulo.poemaPrescricao.titulo}</h3>
                  <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{modulo.poemaPrescricao.texto}</p>
                </div>
              )}

              {NOTAS_ESTUDO_PCH[modulo.id] && (
                <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Nota de estudo:</span> {NOTAS_ESTUDO_PCH[modulo.id]}
                </div>
              )}

              {complementos.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-bold">Módulos complementares</h3>
                  <p className="text-xs text-muted-foreground">Conexões temáticas sugeridas; não representam pré-requisitos formais.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {complementos.map((item) => (
                      <Link key={item.id} to={`/formacao/modulo/${item.id}`} className="rounded-xl border border-border/50 p-4 hover:border-primary/30 transition-colors">
                        <span className="block text-[10px] uppercase tracking-wider text-primary font-bold">Módulo {item.numero}</span>
                        <span className="block font-semibold text-sm mt-1">{item.titulo}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {proximoModulo && (
                <Card className="border-primary/20 bg-primary/5 overflow-hidden group">
                  <CardContent className="p-8 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Próximo Módulo</p>
                      <h4 className="text-xl font-heading font-bold">{proximoModulo.titulo}</h4>
                    </div>
                    <Button variant="ghost" asChild className="p-0 hover:bg-transparent group-hover:translate-x-2 transition-transform">
                      <Link to={`/formacao/modulo/${proximoModulo.id}`}>
                        <ArrowRight className="w-8 h-8 text-primary" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ModuloFormacao;
