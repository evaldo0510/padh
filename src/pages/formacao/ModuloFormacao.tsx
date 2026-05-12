import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MODULOS, getModulo, PILARES_INFO } from "@/lib/dados-clinicos";
import PageLayout from "@/components/layout/PageLayout";
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  Brain, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ModuloFormacao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const modulo = MODULOS.find(m => m.id === id) || MODULOS.find(m => m.numero === Number(id));

  if (!modulo) {
    return (
      <PageLayout currentPage="Módulo não encontrado">
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
  const proximoModulo = MODULOS.find(m => m.numero === modulo.numero + 1);

  return (
    <PageLayout currentPage={`Módulo ${modulo.numero}: ${modulo.titulo}`}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-6">
          <Button variant="ghost" onClick={() => navigate("/formacao")} className="mb-8 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Voltar para a Formação
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-none text-sm px-4">Módulo {modulo.numero}</Badge>
                <Badge variant="outline" className="text-xs uppercase tracking-widest">{pilar.nome}</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                {modulo.titulo}
              </h1>
              <p className="text-xl text-muted-foreground italic leading-relaxed">
                "{modulo.foco}"
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

              <div className="pt-8">
                <Button size="lg" className="px-12 h-14 text-lg rounded-full shadow-lg shadow-primary/20">
                  Matricular-se neste Módulo <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden sticky top-24">
              <CardHeader className="bg-primary/5 pb-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="w-5 h-5 text-primary" /> Objetivos de Aprendizado
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
