import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, PenTool, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
const BibliotecaExercicios = () => {
  /* Extract all exercises from all phases */ const allExercises =
    JORNADA_DATA.flatMap((fase) =>
      fase.sessoes.flatMap((sessao) =>
        sessao.blocos.filter(b => b.tipo === 'exercise').map((ex) => ({
          ...ex,
          faseId: fase.id,
          faseTitulo: fase.titulo,
          sessaoId: sessao.id,
          sessaoTitulo: sessao.titulo,
        })),
      ),
    );
  return (
    <PageLayout
      seo={{
        title: "Biblioteca de Exercícios — P.A.D.H.",
        description: "Explore todos os exercícios terapêuticos de forma livre.",
        path: "/biblioteca-exercicios",
      }}
      currentPage="Biblioteca"
    >
      {" "}
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {" "}
        <div className="text-center mb-12">
          {" "}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            {" "}
            <Library className="h-8 w-8 text-primary" />{" "}
          </div>{" "}
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Biblioteca de Exercícios
          </h1>{" "}
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            {" "}
            Acesse qualquer ferramenta de transformação a qualquer momento.
            Ideal para revisão ou práticas pontuais.{" "}
          </p>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {allExercises.map((ex) => (
            <Link key={ex.id} to={`/jornada/${ex.faseId}/${ex.sessaoId}`}>
              {" "}
              <Card className="h-full border-primary/10 hover:border-primary/30 transition-all group hover:-translate-y-1">
                {" "}
                <CardHeader className="pb-3">
                  {" "}
                  <div className="flex justify-between items-start mb-2">
                    {" "}
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                      {" "}
                      {ex.faseTitulo}
                    </span>{" "}
                    <PenTool className="spiritual-icon text-muted-foreground opacity-20 group-hover:opacity-100 transition-opacity" />{" "}
                  </div>{" "}
                  <CardTitle className="text-lg font-heading group-hover:text-primary transition-colors">
                    {" "}
                    {ex.titulo}
                  </CardTitle>{" "}
                </CardHeader>{" "}
                <CardContent>
                  {" "}
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {" "}
                    {ex.descricao}
                  </p>{" "}
                  <div className="mt-4 pt-4 border-t border-primary/5">
                    {" "}
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                      Sessão: {ex.sessaoTitulo}
                    </p>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>{" "}
            </Link>
          ))}
        </div>{" "}
      </div>{" "}
    </PageLayout>
  );
};
export default BibliotecaExercicios;
