import React from 'react';
import { BookOpen, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import PageHeader from '@/components/layout/PageHeader';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';

const LivroCurso = () => {
  const isLoading = usePageLoading(600);
  if (isLoading) return <PageSkeleton />;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Livro-Curso" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spiritual opacity-20" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-spiritual-violet to-secondary bg-clip-text text-transparent">
              Livro-Curso
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Ferramentas P.A.D.H. para a Poesia Cognitiva Hipnótica
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              O fio dourado que tece a jornada de autoconhecimento e transformação através do poder da palavra.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Button size="lg" className="bg-spiritual-violet hover:bg-spiritual-violet/90">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore o Livro-Curso
              </Button>
              <Button variant="outline" size="lg">
                <Volume2 className="mr-2 h-5 w-5" />
                Ouvir
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introdução Visionária */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                📜 Introdução Visionária
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-muted-foreground italic mb-4">
                Já te disse, a liberdade interior não é um lugar, é um estado onde a mente encontra a poesia que a liberta.
              </p>
              <p>
                Aqui, nas páginas que seguem, vamos revelar as chaves e os segredos para que tua voz interna se transforme numa melodia de mudança, cura e expansão.
              </p>
              <p>
                Este livro-curso é um convite para o mergulho profundo — no consciente e no inconsciente — usando a poesia como farol, e a ciência como âncora.
              </p>
            </CardContent>
          </Card>

          {/* Capítulo 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-heading flex items-center gap-2">
                🌟 Capítulo 1 — O que é a Poesia Cognitiva Hipnótica?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">1.1 Introdução à PCH – O Encontro da Palavra com o Inconsciente</h3>
                <p className="text-muted-foreground mb-4">
                  Aqui nasce a travessia. A Poesia Cognitiva Hipnótica (PCH) é mais que técnica: é poética aplicada à escuta clínica, é linguagem simbólica que se infiltra pelas frestas da lógica e toca camadas esquecidas do ser.
                </p>
                <p className="mb-4">A PCH une três rios:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span>🌊</span>
                    <span><strong>Poesia terapêutica</strong>, que ressignifica sentidos pela beleza.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🧠</span>
                    <span><strong>Psicologia cognitiva</strong>, que identifica padrões de pensamento.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🌀</span>
                    <span><strong>Hipnose ericksoniana</strong>, que convida o inconsciente a cocriar soluções.</span>
                  </li>
                </ul>
                <div className="italic text-center my-6 space-y-1">
                  <p>A poesia toca onde a fala falha.</p>
                  <p>A hipnose abre o portão dos porões.</p>
                  <p>A cognição redesenha o mapa interno.</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-3">1.2 A Linguagem que Sussurra para Dentro</h3>
                <p className="text-muted-foreground mb-4">
                  Na PCH, as palavras são como sementes de metáforas férteis. Ao contrário da linguagem imperativa, que ordena, aqui trabalhamos com linguagem evocativa – aquela que abre espaço para o sentir.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">Exemplo prático:</p>
                  <p className="italic">
                    "Talvez… …se você fechasse os olhos… …e deixasse esse verso cair… …como gota dentro de um poço… …o que escutaria de volta?"
                  </p>
                </div>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span>🧠</span>
                    <span>O cérebro não resiste a lacunas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🌀</span>
                    <span>O inconsciente adora imagens.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>💬</span>
                    <span>A mente se rende à sugestão poética.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Exercício Prático */}
          <Card className="border-spiritual-violet/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2 text-spiritual-violet">
                🔍 Exercício Prático 1 – Descobrindo a PCH em Si
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-4">Objetivo: Sentir na pele a potência simbólica da linguagem poética.</p>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Instruções:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Respire fundo e leia lentamente o poema abaixo:</li>
                  </ol>
                </div>
                <div className="bg-gradient-to-r from-spiritual-violet/10 to-primary/10 p-6 rounded-lg text-center">
                  <p className="italic text-lg leading-relaxed">
                    Entre um pensamento e outro...<br />
                    mora um silêncio que me escuta.<br />
                    Talvez eu seja ele…<br />
                    …e não o que penso.
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">Agora, responda:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Onde este poema te levou?</li>
                    <li>Qual parte de você foi tocada?</li>
                    <li>Se esse poema fosse um lugar, que lugar seria?</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-3">
                    Anote. Use como ponto de partida em sua sessão.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LivroCurso;