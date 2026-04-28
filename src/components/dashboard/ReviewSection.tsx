import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, RefreshCw, ChevronRight } from "lucide-react";
import { MODULOS } from "@/lib/dados-clinicos";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const ReviewSection = () => {
  const { progress } = useCourseProgress();
  const completedModules = MODULOS.filter((m) =>
    progress.completedModules.includes(m.id),
  );
  if (completedModules.length === 0) return null;
  return (
    <div className="space-y-6">
      {" "}
      <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
        {" "}
        <RefreshCw className="spiritual-icon spiritual-icon-xl text-primary" />{" "}
        Área de Revisão{" "}
      </h2>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {" "}
        {completedModules.map((m) => (
          <Card
            key={m.id}
            className="border-primary/10 hover:border-primary/30 transition-all overflow-hidden group"
          >
            {" "}
            <div className="h-2 w-full bg-module" data-module={m.numero} />{" "}
            <CardContent className="p-5 flex items-center justify-between gap-4">
              {" "}
              <div className="flex items-center gap-4">
                {" "}
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  {" "}
                  <BookOpen className="spiritual-icon spiritual-icon-lg" />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-sm group-hover:text-primary transition-colors">
                    {m.titulo}
                  </h4>{" "}
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Módulo {m.numero}· {m.corNome}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <Button variant="ghost" size="sm" asChild>
                {" "}
                <Link to="/curso-padh" className="p-0 h-auto">
                  {" "}
                  <ChevronRight className="spiritual-icon spiritual-icon-lg" />{" "}
                </Link>{" "}
              </Button>{" "}
            </CardContent>{" "}
          </Card>
        ))}
      </div>{" "}
    </div>
  );
};
export default ReviewSection;
