import React from "react";
import { Anchor, Brain, BookOpen, Lightbulb, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import toolImage from "@/assets/tool-verso-gatilho.jpg";
import { pagesSEO } from "@/lib/seo-config";
import ScientificValidation from "@/components/sections/ScientificValidation";
const VersoGatilho = () => {
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);
  const versosPorTema = [
    {
      tema: "Ansiedade",
      verso: '"Eu não sou o que me aperta.\nSou o que respira depois."',
    },
    {
      tema: "Autocobrança",
      verso:
        '"Se eu fosse tão cruel com os outros\nquanto sou comigo, ninguém ficaria."',
    },
    {
      tema: "Coragem",
      verso:
        '"A porta nunca esteve trancada.\nEu só estava acostumado à cela."',
    },
    {
      tema: "Recomeço",
      verso: '"Não é o fim — é o chão onde nascem raízes novas."',
    },
  ];
  return (
    <PageLayout seo={pagesSEO.versoGatilho} currentPage="Verso-Gatilho">
      {" "}
      {/* Hero */}
      <section className="relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-glow" />{" "}
        <div className="relative container mx-auto px-6 py-20 text-center">
          {" "}
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            {" "}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
              {" "}
              <Anchor className="spiritual-icon spiritual-icon-sm" /> Ferramenta
              2 — P.A.D.H.{" "}
            </div>{" "}
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              {" "}
              Verso-<span className="text-primary italic">Gatilho</span>{" "}
            </h1>{" "}
            <p className="text-xl text-muted-foreground mb-2 font-medium">
              A Palavra-Chave que Liberta
            </p>{" "}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {" "}
              Uma âncora emocional rápida — um verso curto e memorável que
              funciona como um botão de emergência emocional, um
              microtransplante de consciência.{" "}
            </p>{" "}
            <div className="mx-auto w-full max-w-md mt-6 mb-4">
              {" "}
              <img
                src={toolImage}
                alt="Verso-Gatilho — âncora emocional poética"
                className="w-full rounded-xl shadow-lg opacity-80"
              />{" "}
            </div>{" "}
            <div className="poem-block max-w-sm mx-auto mt-4">
              {" "}
              <p className="poem-text text-foreground/80">
                "Eu não sou o que me prende,
                <br /> sou o que se solta depois."{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Objetivo e Modo de Uso */}
      <section className="py-20 border-t border-border/30">
        {" "}
        <div
          ref={contentAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            contentAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
            <Card className="border-border/50 mb-8">
              {" "}
              <CardHeader>
                {" "}
                <CardTitle className="text-2xl font-heading flex items-center gap-3">
                  {" "}
                  <Brain className="spiritual-icon spiritual-icon-xl text-primary" />{" "}
                  Objetivo Terapêutico{" "}
                </CardTitle>{" "}
              </CardHeader>{" "}
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                {" "}
                <p>
                  {" "}
                  Criar uma{" "}
                  <strong className="text-foreground">
                    âncora emocional positiva e rápida
                  </strong>
                  . Um verso curto e memorável que funcione como um botão de
                  emergência emocional. É como uma vacina verbal contra o
                  pânico, a paralisia ou a autoacusação.{" "}
                </p>{" "}
                <p>
                  {" "}
                  Atua como um{" "}
                  <strong className="text-foreground">
                    microtransplante de consciência
                  </strong>
                  , que o cliente carrega consigo para momentos difíceis.{" "}
                </p>{" "}
              </CardContent>{" "}
            </Card>{" "}
            <Card className="border-border/50 mb-8">
              {" "}
              <CardHeader>
                {" "}
                <CardTitle className="text-2xl font-heading flex items-center gap-3">
                  {" "}
                  <BookOpen className="spiritual-icon spiritual-icon-xl text-primary" />{" "}
                  Modo de Uso Prático{" "}
                </CardTitle>{" "}
              </CardHeader>{" "}
              <CardContent className="space-y-6">
                {" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    1. Criação Personalizada (sessão ao vivo)
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {" "}
                    Durante a escuta empática, quando o cliente disser algo que
                    revele força, clareza ou libertação, o terapeuta pode
                    interromper suavemente e propor:{" "}
                  </p>{" "}
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg mt-3">
                    {" "}
                    <p className="poem-text text-sm text-muted-foreground italic">
                      "Espere... isso que você acabou de dizer… podemos
                      transformar num verso seu?"{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    2. Biblioteca Terapêutica
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    Acervo de versos-gatilho organizados por tema: ansiedade,
                    luto, autoestima, raiva, solidão, recomeços.{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    3. Entrega Simbólica
                  </h4>{" "}
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Escrito à mão
                      num cartão com arte visual
                    </li>{" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Enviado por
                      áudio com trilha sutil
                    </li>{" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Inserido como
                      papel dobrado numa caixinha de emergência emocional
                    </li>{" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Usado como
                      imagem de fundo no celular
                    </li>{" "}
                  </ul>{" "}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Exemplos por Tema */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-warm" />{" "}
        <div
          ref={examplesAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            examplesAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
            <div className="text-center mb-12">
              {" "}
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">
                Exemplos
              </p>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Versos-Gatilho por Tema
              </h2>{" "}
            </div>{" "}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {" "}
              {versosPorTema.map((item, i) => (
                <Card key={i} className="border-border/50">
                  {" "}
                  <CardContent className="p-5">
                    {" "}
                    <span className="text-xs uppercase tracking-widest text-primary font-medium">
                      {item.tema}
                    </span>{" "}
                    <div className="poem-block mt-3">
                      {" "}
                      <p className="poem-text text-sm text-foreground/80 whitespace-pre-line">
                        {item.verso}
                      </p>{" "}
                    </div>{" "}
                  </CardContent>{" "}
                </Card>
              ))}
            </div>{" "}
            {/* Exemplo de sessão */}
            <Card className="border-primary/20 bg-primary/[0.02]">
              {" "}
              <CardContent className="p-6">
                {" "}
                <h4 className="font-heading font-semibold text-foreground mb-4">
                  Exemplo de Sessão com Verso-Gatilho
                </h4>{" "}
                <div className="space-y-3 text-sm text-muted-foreground">
                  {" "}
                  <p>
                    <strong className="text-foreground">Cliente:</strong>"Eu
                    sempre me saboto. Quando algo começa a dar certo, eu mesma
                    atrapalho."
                  </p>{" "}
                  <p>
                    <strong className="text-foreground">Terapeuta:</strong>"O
                    que você diria pra essa parte sua que atrapalha?"
                  </p>{" "}
                  <p>
                    <strong className="text-foreground">Cliente:</strong>
                    "Talvez... 'eu sei que você só quer me proteger, mas eu
                    cresci'."
                  </p>{" "}
                  <p>
                    <strong className="text-foreground">Terapeuta:</strong>
                    "Podemos transformar isso num verso que te acompanhe?"
                  </p>{" "}
                  <div className="poem-block mt-3">
                    {" "}
                    <p className="poem-text text-foreground/80 italic">
                      "Eu cresci. E agora me protejo com liberdade."
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Técnicas de Ancoragem */}
      <section className="py-20 border-t border-border/30">
        {" "}
        <div
          ref={theoryAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            theoryAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
            <div className="text-center mb-12">
              {" "}
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">
                Técnicas
              </p>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Ancoragem & Fundamentos
              </h2>{" "}
            </div>{" "}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {" "}
              {[
                {
                  icon: <Zap className="spiritual-icon spiritual-icon-lg" />,
                  title: "Repetição Verbal",
                  desc: "Recitar o verso 3 vezes ao acordar, como mantra.",
                },
                {
                  icon: <Anchor className="spiritual-icon spiritual-icon-lg" />,
                  title: "Respiração Associada",
                  desc: "Inspirar com a primeira parte, expirar com a segunda.",
                },
                {
                  icon: (
                    <Lightbulb className="spiritual-icon spiritual-icon-lg" />
                  ),
                  title: "Ancoragem Corporal",
                  desc: "Escrever na pele, tocar o peito ao dizer o verso, colar no espelho.",
                },
              ].map((item, i) => (
                <Card key={i} className="border-border/50">
                  {" "}
                  <CardContent className="p-5 text-center space-y-2">
                    {" "}
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto">
                      {item.icon}
                    </div>{" "}
                    <h4 className="font-heading font-semibold text-foreground text-sm">
                      {item.title}
                    </h4>{" "}
                    <p className="text-xs text-muted-foreground">
                      {item.desc}
                    </p>{" "}
                  </CardContent>{" "}
                </Card>
              ))}
            </div>{" "}
            <Card className="border-border/50">
              {" "}
              <CardHeader>
                {" "}
                <CardTitle className="text-xl font-heading">
                  Fundamentos Teóricos
                </CardTitle>{" "}
              </CardHeader>{" "}
              <CardContent>
                {" "}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Baseado na
                    técnica da{" "}
                    <strong className="text-foreground">âncora verbal</strong>{" "}
                    da PNL.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Inspiração nas{" "}
                    <strong className="text-foreground">
                      afirmações curativas
                    </strong>{" "}
                    do método Louise Hay.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Atua como
                    recurso de{" "}
                    <strong className="text-foreground">
                      autossugestão poética
                    </strong>
                    , usando estética simbólica para fixar conteúdo emocional.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Aproxima-se da{" "}
                    <strong className="text-foreground">
                      reprogramação cognitiva
                    </strong>{" "}
                    pela linguagem afetiva.
                  </li>{" "}
                </ul>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Exercício Prático */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-mesh" />{" "}
        <div className="relative container mx-auto px-6">
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
            <div className="text-center mb-12">
              {" "}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
                {" "}
                <Zap className="spiritual-icon spiritual-icon-sm" /> Pratique
                Agora{" "}
              </div>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Crie seu Verso-Gatilho Pessoal
              </h2>{" "}
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Siga este roteiro para descobrir e construir o verso que vai te
                acompanhar nos momentos difíceis.
              </p>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              <Card className="border-border/50">
                {" "}
                <CardContent className="p-6">
                  {" "}
                  <div className="flex items-start gap-4">
                    {" "}
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold shrink-0">
                      1
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Identifique o Momento-Gatilho
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Pense num momento recorrente em que você se paralisa,
                        entra em pânico ou se sabota. Qual é a frase interna que
                        aparece? Escreva-a sem filtro.
                      </p>{" "}
                      <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg mt-3">
                        {" "}
                        <p className="text-xs text-muted-foreground italic">
                          Exemplos:"Eu nunca vou conseguir." /"Todo mundo vai me
                          julgar." /"Não sou digno disso."
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>{" "}
              <Card className="border-border/50">
                {" "}
                <CardContent className="p-6">
                  {" "}
                  <div className="flex items-start gap-4">
                    {" "}
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold shrink-0">
                      2
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Encontre a Verdade Oposta
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Agora pergunte:{" "}
                        <strong className="text-foreground">
                          "O que é verdade sobre mim que essa voz não quer que
                          eu saiba?"
                        </strong>{" "}
                        Escreva a resposta mais honesta que vier.
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>{" "}
              <Card className="border-border/50">
                {" "}
                <CardContent className="p-6">
                  {" "}
                  <div className="flex items-start gap-4">
                    {" "}
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold shrink-0">
                      3
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Transforme em Verso
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Condense essa verdade em{" "}
                        <strong className="text-foreground">
                          1 a 2 linhas poéticas
                        </strong>
                        . Use imagem, metáfora ou ritmo. Teste dizer em voz alta
                        — deve provocar um arrepio ou um suspiro.
                      </p>{" "}
                      <div className="grid sm:grid-cols-2 gap-3">
                        {" "}
                        <div className="p-3 rounded-lg border border-border/30 bg-card/50">
                          {" "}
                          <p className="text-xs text-muted-foreground mb-1">
                            Frase bruta:
                          </p>{" "}
                          <p className="text-sm text-foreground/70 italic">
                            "Eu sou forte mesmo quando tenho medo."
                          </p>{" "}
                        </div>{" "}
                        <div className="p-3 rounded-lg border border-primary/20 bg-primary/[0.02]">
                          {" "}
                          <p className="text-xs text-primary mb-1">
                            Verso-gatilho:
                          </p>{" "}
                          <p className="text-sm text-foreground/80 italic">
                            "Tremo, mas não paro. Sou trovão antes da chuva."
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>{" "}
              <Card className="border-border/50">
                {" "}
                <CardContent className="p-6">
                  {" "}
                  <div className="flex items-start gap-4">
                    {" "}
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold shrink-0">
                      4
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Ritualize e Ancore
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Escolha como esse verso vai viver com você:
                      </p>{" "}
                      <ul className="space-y-1.5 text-sm text-muted-foreground mt-2">
                        {" "}
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>Escreva à
                          mão num papel bonito e cole no espelho
                        </li>{" "}
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>Grave um
                          áudio seu lendo o verso com emoção
                        </li>{" "}
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>Associe ao
                          gesto de tocar o peito com a mão direita
                        </li>{" "}
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>Recite 3x
                          toda manhã, respirando entre cada repetição
                        </li>{" "}
                      </ul>{" "}
                    </div>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>{" "}
            </div>{" "}
            <Card className="border-primary/20 bg-primary/[0.02] mt-8">
              {" "}
              <CardContent className="p-6">
                {" "}
                <h4 className="font-heading font-semibold text-foreground mb-3">
                  🏥 Banco de Versos-Gatilho Extras
                </h4>{" "}
                <div className="grid sm:grid-cols-2 gap-3">
                  {" "}
                  {[
                    {
                      tema: "Luto",
                      verso:
                        '"Chorar não é fraqueza — é o rio lavando a pedra."',
                    },
                    {
                      tema: "Solidão",
                      verso:
                        '"Estou só, mas não vazio. Sou caverna com eco de mar."',
                    },
                    {
                      tema: "Autoestima",
                      verso:
                        '"Meu valor não precisa de plateia. Brilho mesmo no escuro."',
                    },
                    {
                      tema: "Perdão",
                      verso:
                        '"Te perdoei não por você — mas pra devolver o espaço que era meu."',
                    },
                    {
                      tema: "Medo do futuro",
                      verso: '"O amanhã não me deve nada. Hoje já é bastante."',
                    },
                    {
                      tema: "Culpa",
                      verso:
                        '"Errei. E o erro não me define — me ensina a pedir de volta."',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-border/30 bg-card/50"
                    >
                      {" "}
                      <span className="text-xs uppercase tracking-widest text-primary font-medium">
                        {item.tema}
                      </span>{" "}
                      <p className="poem-text text-sm text-foreground/80 mt-2 whitespace-pre-line">
                        {item.verso}
                      </p>{" "}
                    </div>
                  ))}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <ScientificValidation tool="verso-gatilho" />{" "}
    </PageLayout>
  );
};
export default VersoGatilho;
