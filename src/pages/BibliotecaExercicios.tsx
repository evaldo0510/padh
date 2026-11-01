import React, { useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, PenTool, Search, BookOpen, CheckCircle2, FlaskConical, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BibliotecaExercicios = () => {
  const [search, setSearch] = useState("");

  const allExercises = useMemo(() =>
    JORNADA_DATA.flatMap((fase) =>
      fase.sessoes.flatMap((sessao) =>
        sessao.blocos
          .filter((bloco) => ["exercise", "reflection", "action"].includes(bloco.tipo))
          .map((bloco) => ({
            ...bloco,
            faseId: fase.id,
            faseTitulo: fase.titulo,
            sessaoId: sessao.id,
            sessaoTitulo: sessao.titulo,
            tipoLabel: bloco.tipo === "exercise" ? "Exercício" : bloco.tipo === "reflection" ? "Reflexão" : "Prática",
          })),
      ),
    ), []);

  const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
  const filteredExercises = allExercises.filter((item) =>
    [item.titulo, item.conteudo, item.instrucao, item.faseTitulo, item.sessaoTitulo, item.tipoLabel]
      .filter(Boolean)
      .some((value) => value!.toLocaleLowerCase("pt-BR").includes(normalizedSearch)),
  );

  return (
    <PageLayout
      seo={{
        title: "Biblioteca de Práticas — Curso PCH",
        description: "Acervo pesquisável de exercícios, reflexões e práticas da jornada PCH, com acesso à etapa original de cada atividade.",
        path: "/biblioteca-exercicios",
      }}
      currentPage="Biblioteca"
    >
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-6xl">
        <header className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Library className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold">Biblioteca de Práticas PCH</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Um acervo para encontrar e retomar exercícios, reflexões e práticas. A Biblioteca organiza atividades por tema e etapa; a aula ensina o conteúdo e o Laboratório oferece experiências guiadas.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            <Button asChild variant="outline"><Link to="/aula-exclusiva"><GraduationCap className="h-4 w-4 mr-2" />Aula Exclusiva</Link></Button>
            <Button asChild variant="outline"><Link to="/mapa-cerebral"><FlaskConical className="h-4 w-4 mr-2" />Laboratório Cerebral</Link></Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4" aria-live="polite">
            {filteredExercises.length} {filteredExercises.length === 1 ? "atividade encontrada" : "atividades encontradas"}
          </p>
        </header>

        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por atividade, tema, fase ou sessão..." aria-label="Buscar atividades na biblioteca" className="pl-9" />
        </div>

        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExercises.map((item) => (
              <Link key={item.id + "-" + item.faseId + "-" + item.sessaoId} to={`/jornada/${item.faseId}/${item.sessaoId}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-all group hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded-full">{item.faseTitulo}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><BookOpen className="h-3 w-3" />{item.tipoLabel}</span>
                    </div>
                    <CardTitle className="text-lg font-heading group-hover:text-primary transition-colors">{item.titulo || "Atividade prática"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{item.instrucao || item.conteudo}</p>
                    <p className="mt-4 pt-4 border-t border-primary/5 text-xs text-muted-foreground">Sessão: {item.sessaoTitulo}</p>
                    <p className="mt-3 text-sm font-medium text-primary flex items-center gap-2"><PenTool className="h-4 w-4" /> Abrir atividade</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center space-y-3">
              {search ? <Search className="h-8 w-8 mx-auto text-muted-foreground" /> : <CheckCircle2 className="h-8 w-8 mx-auto text-muted-foreground" />}
              <h2 className="font-semibold text-lg">{search ? "Nenhuma atividade corresponde à busca" : "Nenhuma atividade disponível"}</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {search ? "Tente outro termo ou limpe a busca para ver todas as atividades." : "A jornada ainda não possui blocos práticos publicados. Volte mais tarde."}
              </p>
              {search && <button type="button" onClick={() => setSearch("")} className="text-sm text-primary underline underline-offset-4">Limpar busca</button>}
            </CardContent>
          </Card>
        )}
      </main>
    </PageLayout>
  );
};

export default BibliotecaExercicios;
