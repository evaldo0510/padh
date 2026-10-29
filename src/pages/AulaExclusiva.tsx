import React from "react";
import { BookOpen, Clock, Target, Brain, FlaskConical, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { pagesSEO } from "@/lib/seo-config";
import { Link } from "react-router-dom";

const partes = [
  { numero: 1, titulo: "Anatomia poética do cérebro", duracao: "15 min", objetivo: "Conhecer sistemas envolvidos na linguagem, memória, emoção e imaginação.", atividades: ["Linguagem e compreensão", "Memória e associações", "Imaginação e processamento emocional"], pergunta: "Que imagem ou palavra ficou na sua atenção durante a leitura?" },
  { numero: 2, titulo: "O que a ciência investiga", duracao: "10 min", objetivo: "Diferenciar achados de pesquisa, hipóteses e metáforas usadas para ensinar.", atividades: ["Neuroestética e psicolinguística", "Estudos de leitura e metáfora", "Limites de estudos de neuroimagem"], pergunta: "O que é evidência e o que é uma interpretação possível?" },
  { numero: 3, titulo: "Leitura como experiência multissensorial", duracao: "15 min", objetivo: "Observar as respostas pessoais que podem surgir ao ler um poema.", atividades: ["Leitura lenta de um poema", "Imagens mentais e sensações", "Registro sem julgamento"], pergunta: "O que você percebeu em si, sem precisar explicar ou provar?" },
  { numero: 4, titulo: "Aplicações à criação poética", duracao: "15 min", objetivo: "Experimentar escolhas de linguagem sem prometer efeitos cerebrais ou terapêuticos específicos.", atividades: ["Metáforas e imagens sensoriais", "Ritmo, pausa e repetição", "Escrita e revisão de versos"], pergunta: "Que mudança acontece no sentido do poema quando você altera uma palavra?" },
  { numero: 5, titulo: "Vivência guiada", duracao: "10 min", objetivo: "Integrar leitura, reflexão e escrita breve respeitando os próprios limites.", atividades: ["Pausa confortável e opcional", "Leitura de um poema curto", "Registro de uma percepção e criação de versos"], pergunta: "Que frase você deseja levar desta experiência?" },
];

const AulaExclusiva = () => (
  <PageLayout
    seo={{ title: "Aula Exclusiva — Mapa Cerebral do Leitor Poético | Curso PCH", description: "Aula teórico-vivencial de 65 minutos sobre leitura poética, linguagem, emoção e imaginação, com distinção entre evidências científicas e metáforas pedagógicas.", path: "/aula-exclusiva" }}
    currentPage="Aula Exclusiva"
  >
    <main className="container mx-auto max-w-5xl px-4 sm:px-6 py-10 md:py-16 space-y-10">
      <header className="text-center max-w-3xl mx-auto space-y-5">
        <Badge variant="outline">Curso PCH · Aula teórico-vivencial</Badge>
        <h1 className="text-3xl md:text-5xl font-heading font-bold">O Mapa Cerebral do <span className="text-primary italic">Leitor Poético</span></h1>
        <p className="text-lg text-muted-foreground">Uma aula para explorar como linguagem, memória, emoção e imaginação participam da leitura — sem reduzir experiências humanas a um mapa cerebral fixo.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="secondary" className="px-3 py-1"><Clock className="h-4 w-4 mr-1 inline" />65 minutos</Badge>
          <Badge variant="secondary" className="px-3 py-1"><BookOpen className="h-4 w-4 mr-1 inline" />5 etapas</Badge>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild><a href="#roteiro">Começar aula <ArrowRight className="h-4 w-4 ml-2" /></a></Button>
          <Button asChild variant="outline"><Link to="/mapa-cerebral">Ir para o Laboratório Cerebral <FlaskConical className="h-4 w-4 ml-2" /></Link></Button>
        </div>
      </header>

      <Card className="border-primary/20">
        <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Objetivos de aprendizagem</CardTitle></CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Reconhecer que a leitura envolve redes distribuídas, e não uma única área para cada emoção.</li>
            <li>Observar imagens mentais, associações e respostas subjetivas sem tratá-las como diagnóstico.</li>
            <li>Experimentar recursos poéticos como metáfora, ritmo, pausa e repetição.</li>
            <li>Distinguir conhecimento científico, hipótese interpretativa e metáfora didática.</li>
          </ul>
        </CardContent>
      </Card>

      <section id="roteiro" className="space-y-5 scroll-mt-8">
        <div className="space-y-2"><p className="text-sm uppercase tracking-widest text-primary font-semibold">Roteiro da aula</p><h2 className="text-2xl md:text-3xl font-heading font-bold">Cinco etapas, 65 minutos</h2><p className="text-muted-foreground">Leia cada etapa em sequência. As perguntas são convites à reflexão, não avaliações clínicas.</p></div>
        {partes.map((parte) => (
          <Card key={parte.numero} id={`etapa-${parte.numero}`} className="scroll-mt-8">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">{parte.numero}</div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2"><h3 className="font-heading text-lg font-semibold">{parte.titulo}</h3><Badge variant="outline">{parte.duracao}</Badge></div>
                  <p className="text-sm text-muted-foreground">{parte.objetivo}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">{parte.atividades.map((atividade) => <li key={atividade} className="rounded-lg bg-muted/50 p-3 text-sm">{atividade}</li>)}</ul>
                  <p className="border-l-2 border-primary pl-3 text-sm"><strong>Pergunta de reflexão:</strong> {parte.pergunta}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="bg-muted/30">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-heading font-bold flex items-center gap-2"><Brain className="h-5 w-5 text-primary" />Nota de rigor científico</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">A leitura poética pode envolver processos de linguagem, memória, atenção, imaginação e emoção, mas as respostas variam entre pessoas e contextos. Não há base para afirmar que um verso ativa de modo previsível uma região específica ou garante desbloqueio emocional, hipnose ou resultado terapêutico. O “mapa” desta aula é um recurso pedagógico, não uma ferramenta de diagnóstico.</p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild><Link to="/mapa-cerebral">Praticar no Laboratório Cerebral <ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
        <Button asChild variant="outline"><Link to="/biblioteca-exercicios">Consultar Biblioteca de Exercícios</Link></Button>
      </div>
    </main>
  </PageLayout>
);

export default AulaExclusiva;
