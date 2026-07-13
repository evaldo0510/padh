import React from "react";
import { Flame, Brain, BookOpen, Volume2 } from "lucide-react";
import FerramentaHero from "@/components/ferramentas/FerramentaHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import toolImage from "@/assets/tool-ritual-silencio.jpg";
import { pagesSEO } from "@/lib/seo-config";
import ScientificValidation from "@/components/sections/ScientificValidation";
const RitualSilencio = () => {
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);
  return (
    <PageLayout seo={pagesSEO.ritualSilencio} currentPage="Ritual do Silêncio">
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
              <Flame className="spiritual-icon spiritual-icon-sm" /> Ferramenta
              7 — P.A.D.H.{" "}
            </div>{" "}
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              {" "}
              Ritual do{" "}
              <span className="text-primary italic">Silêncio Poético</span>{" "}
            </h1>{" "}
            <p className="text-xl text-muted-foreground mb-2 font-medium">
              A Vela que Fecha a Caverna
            </p>{" "}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {" "}
              Onde a poesia vira altar e o silêncio vira resposta — encerrar
              sessões com sacralidade, criando uma impressão emocional
              duradoura.{" "}
            </p>{" "}
            <div className="mx-auto w-full max-w-md mt-6 mb-4">
              {" "}
              <img
                src={toolImage}
                alt="Ritual do Silêncio — vela na caverna"
                className="w-full rounded-xl shadow-lg opacity-80"
              />{" "}
            </div>{" "}
            <div className="poem-block max-w-sm mx-auto mt-4">
              {" "}
              <p className="poem-text text-foreground/80">
                "Se uma só palavra tua pudesse morar em mim,
                <br /> qual você deixaria?"{" "}
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
                  Encerrar sessões de forma ritualística, simbólica e
                  emocionalmente significativa. O foco não é entender, mas{" "}
                  <strong className="text-foreground">guardar</strong>. Não é
                  falar mais, é{" "}
                  <strong className="text-foreground">ecoar por dentro</strong>
                  .{" "}
                </p>{" "}
                <div className="poem-block">
                  {" "}
                  <p className="poem-text text-foreground/80 text-sm">
                    {" "}
                    Um verso vira relicário.
                    <br /> Uma pausa vira revelação.{" "}
                  </p>{" "}
                </div>{" "}
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
                    1. Leitura Final
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    Um poema curto ou verso forte que resuma ou honre a jornada
                    feita naquela sessão — pode ser do próprio cliente,
                    escolhido por você, ou uma frase espontânea transformada
                    poeticamente.{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    2. Duas Perguntas que Abrem o Eco Interno
                  </h4>{" "}
                  <div className="space-y-2">
                    {" "}
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                      {" "}
                      <p className="poem-text text-sm text-muted-foreground italic">
                        "Qual palavra ecoa mais em você agora?"
                      </p>{" "}
                    </div>{" "}
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                      {" "}
                      <p className="poem-text text-sm text-muted-foreground italic">
                        "Se você tivesse que guardar um verso como relicário,
                        qual seria?"
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <p className="text-xs text-muted-foreground mt-2">
                    {" "}
                    Essas perguntas não exigem resposta imediata. Às vezes, o
                    cliente apenas fecha os olhos. Às vezes, responde com
                    lágrima.{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    3. Um Minuto de Silêncio Consciente
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground mb-3">
                    {" "}
                    Silêncio não como falta de som, mas como{" "}
                    <strong className="text-foreground">
                      presença de sentido
                    </strong>
                    .{" "}
                  </p>{" "}
                  <div className="poem-block">
                    {" "}
                    <p className="poem-text text-sm text-foreground/80">
                      {" "}
                      O terapeuta se cala.
                      <br /> O cliente respira.
                      <br /> O poema segue vivo ali,
                      <br /> mesmo sem ser lido de novo.{" "}
                    </p>{" "}
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
                Exemplo
              </p>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Encerramento de Sessão
              </h2>{" "}
            </div>{" "}
            <Card className="border-primary/20 bg-primary/[0.02] mb-8">
              {" "}
              <CardContent className="p-6 space-y-4">
                {" "}
                <p className="text-sm text-muted-foreground">
                  {" "}
                  Você termina uma sessão onde o cliente falou de recomeços
                  difíceis. Lê, então, o verso:{" "}
                </p>{" "}
                <div className="poem-block">
                  {" "}
                  <p className="poem-text text-foreground/80">
                    "Todo fim é apenas uma curva
                    <br /> de onde a alma reaprende a caminhar."{" "}
                  </p>{" "}
                </div>{" "}
                <p className="text-sm text-muted-foreground">
                  Depois pergunta:
                </p>{" "}
                <ul className="text-sm text-muted-foreground space-y-1">
                  {" "}
                  <li className="italic">— Qual palavra ficou em você?</li>{" "}
                  <li className="italic">
                    — Se esse verso fosse uma chave, o que ele abriria em você
                    hoje?
                  </li>{" "}
                </ul>{" "}
                <p className="text-sm text-muted-foreground font-medium">
                  E então... silêncio.
                </p>{" "}
              </CardContent>{" "}
            </Card>{" "}
            <div className="grid sm:grid-cols-2 gap-4">
              {" "}
              {[
                '"Nem tudo precisa de resposta. Às vezes, só de espaço."',
                '"O silêncio também fala. E a poesia o entende."',
                '"Respire esse verso como quem guarda um segredo sagrado."',
                '"Essa palavra te escolheu hoje. Cuide dela até que ela floresça."',
              ].map((frase, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-border/50 bg-card/50"
                >
                  {" "}
                  <p className="poem-text text-sm text-muted-foreground italic">
                    {frase}
                  </p>{" "}
                </div>
              ))}
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
            <Card className="border-border/50 mb-8">
              {" "}
              <CardHeader>
                {" "}
                <CardTitle className="text-xl font-heading">
                  Fundamentos & Aplicações
                </CardTitle>{" "}
              </CardHeader>{" "}
              <CardContent className="space-y-4">
                {" "}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Cria{" "}
                    <strong className="text-foreground">
                      memória emocional
                    </strong>{" "}
                    associada ao conteúdo da sessão.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Estimula o
                    sistema límbico a associar o processo a{" "}
                    <strong className="text-foreground">
                      acolhimento, profundidade e segurança
                    </strong>
                    .
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Gera{" "}
                    <strong className="text-foreground">
                      impressão psíquica duradoura
                    </strong>
                    , como uma marca simbólica.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Usa elementos de{" "}
                    <strong className="text-foreground">ritualização</strong>{" "}
                    (logoterapia, psicodrama, constelação familiar,
                    neuropsicologia).
                  </li>{" "}
                </ul>{" "}
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  {" "}
                  {[
                    "Encerramentos de ciclos terapêuticos",
                    "Fechamento de vivências em grupo",
                    "Rituais de passagem (luto, separação, alta)",
                    "Sessões com alta carga emocional",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border/30 bg-card/50"
                    >
                      {" "}
                      <Flame className="spiritual-icon text-primary flex-shrink-0" />{" "}
                      <p className="text-xs text-muted-foreground">
                        {item}
                      </p>{" "}
                    </div>
                  ))}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
            <div className="poem-block text-center">
              {" "}
              <p className="poem-text text-foreground/80">
                {" "}
                A terapia não termina quando a sessão acaba.
                <br /> Ela continua onde o silêncio ecoa…
                <br /> … e a poesia vela por dentro.{" "}
              </p>{" "}
            </div>{" "}
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
                <Volume2 className="spiritual-icon spiritual-icon-sm" />{" "}
                Pratique Agora{" "}
              </div>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Exercício: Seu Ritual Pessoal de Silêncio
              </h2>{" "}
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Crie um fechamento poético para qualquer momento de transição —
                sessão, dia, ciclo ou despedida.
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
                        Escolha o Verso-Relicário
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Pense no que você viveu hoje — ou na semana. Qual foi o
                        momento mais significativo? Condense-o num único verso
                        que você gostaria de guardar como lembrança.
                      </p>{" "}
                      <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg mt-3">
                        {" "}
                        <p className="text-xs text-muted-foreground italic">
                          Exemplo:"Hoje descobri que chorar é regar." /"O abraço
                          que dei em mim mesmo bastou." /"Silêncio também é
                          resposta — e às vezes a melhor."
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
                        A Pergunta-Eco
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Faça a si mesmo uma das perguntas abaixo e{" "}
                        <strong className="text-foreground">
                          não responda imediatamente
                        </strong>{" "}
                        — apenas deixe a pergunta ecoar:
                      </p>{" "}
                      <div className="space-y-2">
                        {" "}
                        {[
                          '"Qual palavra me acompanhou hoje?"',
                          '"O que meu silêncio disse que minha boca não conseguiu?"',
                          '"Se eu pudesse guardar um único instante de hoje, qual seria?"',
                          '"Que verso nasceria do que senti agora?"',
                        ].map((p, i) => (
                          <div
                            key={i}
                            className="bg-primary/5 border border-primary/10 p-3 rounded-lg"
                          >
                            {" "}
                            <p className="poem-text text-sm text-muted-foreground italic">
                              {p}
                            </p>{" "}
                          </div>
                        ))}
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
                      3
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        O Minuto Sagrado
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Feche os olhos. Respire fundo 3 vezes. Recite o verso
                        escolhido mentalmente. Depois, fique em silêncio por 60
                        segundos — sem pressa, sem objetivo. Apenas{" "}
                        <strong className="text-foreground">
                          esteja presente com o que ficou
                        </strong>
                        .
                      </p>{" "}
                      <div className="poem-block">
                        {" "}
                        <p className="poem-text text-sm text-foreground/80">
                          {" "}
                          O silêncio não é vazio —<br /> é o espaço onde o verso
                          continua crescendo
                          <br /> mesmo depois de ser dito.{" "}
                        </p>{" "}
                      </div>{" "}
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
                  🕯️ Formatos de Ritual para Terapeutas
                </h4>{" "}
                <div className="grid sm:grid-cols-2 gap-3">
                  {" "}
                  {[
                    {
                      nome: "Ritual da Vela",
                      desc: 'Acenda uma vela no início da sessão. No encerramento, leia o verso e apague a vela — o verso"fica aceso" no interno.',
                    },
                    {
                      nome: "Ritual do Papel Dobrado",
                      desc: "O verso é escrito num papel que o cliente dobra e leva consigo — um relicário portátil de significado.",
                    },
                    {
                      nome: "Ritual do Eco",
                      desc: "Terapeuta e cliente leem o verso juntos, alternando frases. O último verso é dito em uníssono, depois silêncio.",
                    },
                    {
                      nome: "Ritual da Última Palavra",
                      desc: 'O terapeuta pergunta:"Qual é a última palavra que você quer levar desta sessão?" — e ela se torna o verso-semente da próxima.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-border/30 bg-card/50"
                    >
                      {" "}
                      <h5 className="font-heading font-semibold text-foreground text-sm mb-1">
                        {item.nome}
                      </h5>{" "}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>{" "}
                    </div>
                  ))}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <ScientificValidation tool="ritual-silencio" />{" "}
    </PageLayout>
  );
};
export default RitualSilencio;
