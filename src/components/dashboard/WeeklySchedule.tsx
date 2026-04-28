import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { MODULOS } from "@/lib/dados-clinicos";
import { useCourseProgress } from "@/hooks/useCourseProgress";
const WeeklySchedule = () => {
  const { progress } = useCourseProgress();
  /* Find current/next module */ const nextModuleIndex = MODULOS.findIndex(
    (m) => !progress.completedModules.includes(m.id),
  );
  const currentModule =
    nextModuleIndex !== -1 ? MODULOS[nextModuleIndex] : null;
  if (!currentModule) {
    return (
      <Card className="border-primary/10 bg-primary/5">
        {" "}
        <CardContent className="pt-6 text-center">
          {" "}
          <p className="text-sm font-medium text-primary">
            🎉 Você concluiu todos os módulos!
          </p>{" "}
          <p className="text-xs text-muted-foreground mt-1">
            Aproveite a área de revisão para revisitar seus conteúdos favoritos.
          </p>{" "}
        </CardContent>{" "}
      </Card>
    );
  }
  const days = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  /* Simple logic: split module activities across days or suggest focus */ return (
    <Card className="border-primary/10">
      {" "}
      <CardHeader className="pb-3">
        {" "}
        <CardTitle className="text-lg flex items-center gap-2">
          {" "}
          <Calendar className="spiritual-icon spiritual-icon-lg text-primary" />{" "}
          Cronograma Semanal{" "}
        </CardTitle>{" "}
        <CardDescription>
          Baseado na sua trilha: {progress.diagnosisResult || "Geral"}
        </CardDescription>{" "}
      </CardHeader>{" "}
      <CardContent className="space-y-4">
        {" "}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          {" "}
          <div className="flex items-center justify-between mb-2">
            {" "}
            <span className="text-xs font-bold text-primary uppercase">
              Foco da Semana
            </span>{" "}
            <span className="text-[10px] flex items-center gap-1 text-muted-foreground">
              {" "}
              <Clock className="h-3 w-3" /> ~{currentModule.tempoEstimado}
              min totais{" "}
            </span>{" "}
          </div>{" "}
          <h4 className="font-heading font-semibold text-sm">
            {currentModule.titulo}
          </h4>{" "}
        </div>{" "}
        <div className="space-y-2">
          {" "}
          {currentModule.atividades.slice(0, 3).map((atv, i) => (
            <div key={atv.id} className="flex items-center gap-3 text-sm">
              {" "}
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-[10px] font-bold text-secondary">
                {" "}
                {days[i].slice(0, 3)}
              </div>{" "}
              <div className="flex-1 min-w-0">
                {" "}
                <p className="truncate font-medium text-xs">{atv.label}</p>{" "}
                <p className="text-[10px] text-muted-foreground">
                  Sugerido:{" "}
                  {Math.round(
                    currentModule.tempoEstimado /
                      currentModule.atividades.length,
                  )}
                  min
                </p>{" "}
              </div>{" "}
              <ArrowRight className="h-3 w-3 text-muted-foreground" />{" "}
            </div>
          ))}
        </div>{" "}
      </CardContent>{" "}
    </Card>
  );
};
export default WeeklySchedule;
