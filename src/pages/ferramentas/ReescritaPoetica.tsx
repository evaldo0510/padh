import React from "react";
import { FilePenLine, RefreshCw, Brain, BookOpen, Sparkles } from "lucide-react";
import FerramentaHero from "@/components/ferramentas/FerramentaHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import toolImage from "@/assets/tool-reescrita.jpg";
import { pagesSEO } from "@/lib/seo-config";
import ScientificValidation from "@/components/sections/ScientificValidation";
const ReescritaPoetica = () => {
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);
  return (
    <PageLayout seo={pagesSEO.reescritaPoetica} currentPage="Reescrita Poética">
      {" "}
      <FerramentaHero
        icon={FilePenLine}
        badgeLabel="Ferramenta 6 — P.A.D.H."
        title={
          <>
            Reescrita{" "}
            <span className="text-primary italic">Poética de Narrativas</span>
          </>
        }
        subtitle="O Alquimista do Passado"
        description="Transformar o que doeu em algo que dança na página — reconfigurar memórias difíceis através da linguagem simbólica e ressignificadora."
        image={{
          src: toolImage,
          alt: "Reescrita Poética — alquimia de narrativas",
        }}
      />{" "}
      {/* Objetivo e Modo de Uso */}
      <section className="py-20 border-t border-border/30">
        {" "}
        <div
          ref={contentAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${contentAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
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
                  Reconfigurar memórias difíceis, experiências bloqueantes ou
                  traumas pessoais, traduzindo-os em{" "}
                  <strong className="text-foreground">
                    {" "}
                    linguagem simbólica, estética e emocionalmente
                    ressignificadora
                  </strong>
                  .{" "}
                </p>{" "}
                <p>
                  {" "}
                  O foco não é apagar o vivido — é{" "}
                  <strong className="text-foreground">
                    reescrever o lugar interno que ele ocupa
                  </strong>
                  .{" "}
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
                  Como Funciona{" "}
                </CardTitle>{" "}
              </CardHeader>{" "}
              <CardContent className="space-y-6">
                {" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    1. Escolha do Episódio-Chave
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    O cliente traz uma história que o afeta — algo que marcou,
                    que trava, que ecoa. Pode ser algo grande ou cotidiano.{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    2. Escuta com Olhos de Metáfora
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground mb-2">
                    Durante a narrativa, o terapeuta escuta imagens simbólicas
                    ocultas:
                  </p>{" "}
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {[
                      "Um vazio?",
                      "Um abandono?",
                      "Uma repetição?",
                      "Um gesto não dito?",
                    ].map((q, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-md bg-primary/5 border border-primary/10 text-muted-foreground"
                      >
                        {q}
                      </span>
                    ))}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    3. Tradução Poética Guiada
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground mb-3">
                    {" "}
                    Convide o cliente a escrever essa história como se fosse um
                    poema —{" "}
                    <em>
                      não como aconteceu, mas como a alma dele gostaria de
                      contar
                    </em>
                    .{" "}
                  </p>{" "}
                  <div className="space-y-2">
                    {" "}
                    {[
                      '"Se essa dor fosse um lugar, como seria?"',
                      '"E se ela falasse, o que diria?"',
                      '"Qual verso poderia nascer dessa cicatriz?"',
                    ].map((q, i) => (
                      <div
                        key={i}
                        className="bg-primary/5 border border-primary/10 p-3 rounded-lg"
                      >
                        {" "}
                        <p className="poem-text text-sm text-muted-foreground italic">
                          {q}
                        </p>{" "}
                      </div>
                    ))}
                  </div>{" "}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Exemplo */}
      <section className="py-20 border-t border-border/30 relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-warm" />{" "}
        <div
          ref={examplesAnim.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${examplesAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
            <div className="text-center mb-12">
              {" "}
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">
                Exemplo Real
              </p>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                A Alquimia em Ação
              </h2>{" "}
            </div>{" "}
            <div className="grid md:grid-cols-2 gap-6">
              {" "}
              <Card className="border-border/50">
                {" "}
                <CardContent className="p-6">
                  {" "}
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    História Original
                  </span>{" "}
                  <p className="text-muted-foreground mt-3 italic">
                    "Meu pai me abandonou. Nunca mais falou comigo."
                  </p>{" "}
                </CardContent>{" "}
              </Card>{" "}
              <Card className="border-primary/20 bg-primary/[0.02]">
                {" "}
                <CardContent className="p-6">
                  {" "}
                  <span className="text-xs uppercase tracking-widest text-primary font-medium">
                    Reescrita Poética
                  </span>{" "}
                  <div className="poem-block mt-3">
                    {" "}
                    <p className="poem-text text-foreground/80">
                      {" "}
                      Fiquei com os espaços vazios
                      <br /> que ele não soube preencher.
                      <br /> Hoje, sou o arquiteto do abrigo
                      <br /> que ele nunca foi.{" "}
                    </p>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>{" "}
            </div>{" "}
            <div className="mt-6">
              {" "}
              <Card className="border-border/50">
                {" "}
                <CardContent className="p-6">
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-3">
                    Segundo Exemplo
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong className="text-foreground">História:</strong>"Minha
                    mãe nunca me escutou."
                  </p>{" "}
                  <div className="poem-block">
                    {" "}
                    <p className="poem-text text-foreground/80">
                      {" "}
                      Gritei tantos silêncios que aprendi a conversar com o eco.
                      <br /> Hoje, me escuto — e isso basta para ser
                      inteiro.{" "}
                    </p>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Fundamentos */}
      <section className="py-20 border-t border-border/30">
        {" "}
        <div
          ref={theoryAnim.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${theoryAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
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
                    <span className="text-primary mt-1">•</span>
                    <strong className="text-foreground">
                      Terapia Narrativa
                    </strong>{" "}
                    (Michael White) — reconfigurar a história de vida.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <strong className="text-foreground">
                      Biblioterapia e arteterapia simbólica
                    </strong>{" "}
                    — cura pela leitura e escrita.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <strong className="text-foreground">
                      Reframing cognitivo (TCC)
                    </strong>{" "}
                    — mudar o enquadramento mental.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <strong className="text-foreground">
                      Psicopoética e semiótica do afeto
                    </strong>{" "}
                    — linguagem como agente transformador.
                  </li>{" "}
                </ul>{" "}
                <div className="poem-block mt-6 text-center">
                  {" "}
                  <p className="poem-text text-foreground/80">
                    "Você não muda o que viveu,
                    <br /> mas muda o lugar de onde conta."{" "}
                  </p>{" "}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Exercício Prático Guiado */}
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
                <Sparkles className="spiritual-icon spiritual-icon-sm" />{" "}
                Pratique Agora{" "}
              </div>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Exercício: Reescreva sua História
              </h2>{" "}
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Transforme uma memória dolorosa em poesia curativa — passo a
                passo.
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
                        Escolha a Memória
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Pense numa experiência que ainda ecoa dentro de você —
                        algo que te marcou, que te trava ou que reaparece em
                        momentos inesperados. Escreva-a em 3-5 frases simples,
                        como se contasse a um amigo.
                      </p>{" "}
                      <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg mt-3">
                        {" "}
                        <p className="text-xs text-muted-foreground italic">
                          💡 Não precisa ser um trauma grande. Pode ser um
                          gesto, uma frase ouvida na infância, uma ausência que
                          doeu.
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
                        Extraia as Metáforas Ocultas
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Releia o que escreveu e responda:
                      </p>{" "}
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {" "}
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>"Se essa
                          dor fosse um{" "}
                          <strong className="text-foreground">lugar</strong>,
                          como seria?" (ex: um quarto trancado, um deserto, uma
                          tempestade)
                        </li>{" "}
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>"Se ela
                          fosse um{" "}
                          <strong className="text-foreground">objeto</strong>,
                          qual seria?" (ex: uma corrente, um espelho quebrado,
                          um relógio parado)
                        </li>{" "}
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">→</span>"Se ela
                          pudesse{" "}
                          <strong className="text-foreground">falar</strong>, o
                          que diria?" (ex:"Ninguém vem","Você não
                          merecia","Cuidado")
                        </li>{" "}
                      </ul>{" "}
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
                        Reescreva como Poema
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Agora, conte essa mesma história{" "}
                        <strong className="text-foreground">
                          não como aconteceu, mas como sua alma gostaria de
                          contá-la
                        </strong>
                        . Use as metáforas que descobriu. Mude o desfecho. Dê
                        poder ao protagonista (você).
                      </p>{" "}
                      <div className="grid md:grid-cols-2 gap-4">
                        {" "}
                        <div className="p-4 rounded-lg border border-border/50">
                          {" "}
                          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
                            Memória original
                          </p>{" "}
                          <p className="text-sm text-foreground/70 italic">
                            "Minha professora disse na frente de todos que eu
                            nunca ia conseguir nada."
                          </p>{" "}
                        </div>{" "}
                        <div className="p-4 rounded-lg border border-primary/20 bg-primary/[0.02]">
                          {" "}
                          <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">
                            Reescrita poética
                          </p>{" "}
                          <div className="poem-block">
                            {" "}
                            <p className="poem-text text-sm text-foreground/80">
                              {" "}
                              Plantaram uma pedra onde deveria haver semente.
                              <br /> Mas eu cresci mesmo assim —<br /> raiz
                              torta, flor teimosa,
                              <br /> jardim que ninguém planejou
                              <br /> mas que o mundo precisava ver.{" "}
                            </p>{" "}
                          </div>{" "}
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
                        Leitura Ritual
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Leia seu poema em voz alta. Se possível, grave. Depois
                        ouça como se fosse outra pessoa te contando essa
                        história. Note:{" "}
                        <strong className="text-foreground">
                          a dor ainda está lá, mas agora ela tem beleza. E a
                          beleza muda tudo.
                        </strong>
                      </p>{" "}
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
                  📚 Mais Exemplos de Reescrita
                </h4>{" "}
                <div className="space-y-4">
                  {" "}
                  {[
                    {
                      antes: '"Meu ex me humilhou em público."',
                      depois:
                        '"Fui exposto como ferida aberta —\nmas a cicatriz virou mapa.\nHoje sei exatamente onde\nnão quero voltar."',
                    },
                    {
                      antes: '"Perdi meu emprego e me senti um fracasso."',
                      depois:
                        '"A porta fechou com tanto barulho\nque por um momento esqueci:\neu tenho mãos que abrem janelas\ne asas que não precisam de chão."',
                    },
                    {
                      antes: "\"Nunca recebi um 'eu te amo' dos meus pais.\"",
                      depois:
                        "\"Cresci no silêncio —\ne do silêncio fiz linguagem.\nHoje digo 'eu te amo' em voz alta,\nporque sei o peso de quem nunca ouviu.\"",
                    },
                  ].map((item, i) => (
                    <div key={i} className="grid sm:grid-cols-2 gap-3">
                      {" "}
                      <div className="p-3 rounded-lg border border-border/30 bg-card/50">
                        {" "}
                        <p className="text-xs text-muted-foreground mb-1">
                          Antes:
                        </p>{" "}
                        <p className="text-sm text-foreground/70 italic">
                          {item.antes}
                        </p>{" "}
                      </div>{" "}
                      <div className="p-3 rounded-lg border border-primary/20 bg-primary/[0.02]">
                        {" "}
                        <p className="text-xs text-primary mb-1">
                          Reescrita:
                        </p>{" "}
                        <p className="poem-text text-sm text-foreground/80 whitespace-pre-line">
                          {item.depois}
                        </p>{" "}
                      </div>{" "}
                    </div>
                  ))}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Validação Científica */}
      
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-medium">Prática ampliada</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Aprofundamento: reescrever sem apagar a experiência</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">A reescrita poética oferece outra forma de narrar uma situação. Não exige transformar dor em algo positivo, perdoar alguém ou chegar a uma conclusão definitiva. O texto original pode continuar válido.</p>
            </div>
            <div className="space-y-5">
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">1. Escolha o que deseja trabalhar</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Selecione uma situação que se sinta confortável para escrever. Prefira um recorte específico e atual. Não é necessário narrar detalhes íntimos nem revisitar uma lembrança intensa.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">2. Registre a primeira versão</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Escreva de modo simples: “O que aconteceu foi…”; “O que senti foi…”; “O que ainda não compreendo é…”. Separe fatos observáveis, sentimentos e interpretações. Não precisa rimar nem ficar bonito.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">3. Encontre uma imagem alternativa</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Escolha uma metáfora que represente a experiência hoje: uma estrada interrompida, uma casa em reforma, uma janela entreaberta. Pergunte: “O que esta imagem acrescenta?” e “O que ela não consegue explicar?”. A metáfora é uma possibilidade, não uma explicação literal.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">4. Escreva uma segunda versão</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Experimente completar: “Naquele momento eu via…”; “Hoje também consigo considerar…”; “Ainda é difícil…”; “O que está ao meu alcance agora é…”. Mantenha a dificuldade quando ela continua presente. Reescrever não significa negar nem minimizar o que aconteceu.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">5. Feche com uma escolha realista</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">Leia as duas versões e pergunte: “Qual representa melhor o que sei hoje?”; “Que frase quero guardar?”; “Existe um passo pequeno e viável?”. Você pode escolher não agir ainda, guardar apenas uma linha ou encerrar sem conclusão.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Exemplo breve</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">Primeira versão: “Errei e estraguei tudo.”{"\n"}Nova versão: “Uma coisa não saiu como eu esperava. Posso reconhecer o impacto sem transformar esse erro na definição de quem sou. Vou escolher o que consigo reparar.”</p>
              </article>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-4">A atividade é de expressão e reflexão pessoal; não garante mudança emocional nem substitui apoio profissional. Se escrever aumentar o desconforto, pare e escolha uma forma de cuidado que pareça segura.</p>
          </div>
        </div>
      </section>
 
      <ScientificValidation tool="reescrita-poetica" />{" "}
    </PageLayout>
  );
};
export default ReescritaPoetica;
