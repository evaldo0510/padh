import React from "react";
import { MessagesSquare, Drama, Brain, BookOpen, MessageSquare } from "lucide-react";
import FerramentaHero from "@/components/ferramentas/FerramentaHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import toolImage from "@/assets/tool-encenacao.jpg";
import { pagesSEO } from "@/lib/seo-config";
import ScientificValidation from "@/components/sections/ScientificValidation";
const EncenacaoPoetica = () => {
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);
  return (
    <PageLayout seo={pagesSEO.encenacaoPoetica} currentPage="Encenação Poética">
      {" "}
      <FerramentaHero
        icon={MessagesSquare}
        badgeLabel="Ferramenta 5 — P.A.D.H."
        title={
          <>
            Encenação{" "}
            <span className="text-primary italic">Poética Interna</span>
          </>
        }
        subtitle="O Teatro dos Eus"
        description="Quando o Eu vira uma conversa entre eus — dar forma, voz e argumento às subpersonalidades internas, promovendo consciência e diálogo entre partes conflitantes."
        image={{
          src: toolImage,
          alt: "Encenação Poética — teatro dos eus",
        }}
        poem={
          <>
            — Eu quero sair.
            <br /> — E se for pior lá fora?
            <br /> — E se for melhor e eu nunca souber?
          </>
        }
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
                  Permitir ao cliente{" "}
                  <strong className="text-foreground">
                    dar forma, voz e argumento às suas subpersonalidades
                    internas
                  </strong>
                  , promovendo consciência e diálogo entre suas partes
                  conflitantes.{" "}
                </p>{" "}
                <p>
                  {" "}
                  É o encontro entre o{" "}
                  <strong className="text-foreground">
                    drama interno e a linguagem simbólica
                  </strong>
                  , onde o cliente se escuta em voz alta escrevendo o que antes
                  apenas sentia em silêncio.{" "}
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
                    1. Escolha de Partes Internas
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground mb-3">
                    O terapeuta ajuda o cliente a identificar partes em
                    conflito:
                  </p>{" "}
                  <div className="grid sm:grid-cols-2 gap-2">
                    {" "}
                    {[
                      "O que quer ir × o que tem medo",
                      "O que perdoa × o que guarda mágoa",
                      "O que age × o que procrastina",
                      "O que grita × o que silencia",
                      "O que cuida dos outros × o que nunca foi cuidado",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded bg-card/50 border border-border/30"
                      >
                        {" "}
                        <MessageSquare className="spiritual-icon spiritual-icon-sm text-primary flex-shrink-0" />{" "}
                        {item}
                      </div>
                    ))}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    2. Recursos Dramáticos
                  </h4>{" "}
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Cada"voz" pode
                      ter um{" "}
                      <strong className="text-foreground">
                        nome simbólico
                      </strong>{" "}
                      (ex:"A controladora","A que chora escondido")
                    </li>{" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Sugira uma{" "}
                      <strong className="text-foreground">
                        cor, lugar ou metáfora
                      </strong>{" "}
                      para cada voz (ex:"A vermelha vive no peito. A azul mora
                      no silêncio da nuca.")
                    </li>{" "}
                  </ul>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    3. Acordo Poético
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground mb-3">
                    Peça para concluir com um verso de integração:
                  </p>{" "}
                  <div className="poem-block">
                    {" "}
                    <p className="poem-text text-sm text-foreground/80 italic">
                      "Mesmo sem saber tudo, seguimos juntos — um passo cada
                      um."
                      <br />
                      "Decidi levar todas comigo — até as que não cabem."{" "}
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
                Encenação Compacta
              </h2>{" "}
            </div>{" "}
            <Card className="border-primary/20 bg-primary/[0.02] mb-8">
              {" "}
              <CardContent className="p-6">
                {" "}
                <div className="poem-block">
                  {" "}
                  <p className="poem-text text-foreground/80">
                    {" "}
                    — Eu sou a que sonha.
                    <br />
                    <br /> — E eu a que diz 'deixa pra lá'.
                    <br />
                    <br /> — Mas eu, que ninguém escuta, sou a que carrega as
                    chaves.{" "}
                  </p>{" "}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
            <Card className="border-border/50">
              {" "}
              <CardContent className="p-6">
                {" "}
                <h4 className="font-heading font-semibold text-foreground mb-3">
                  Exemplo Expandido
                </h4>{" "}
                <div className="poem-block">
                  {" "}
                  <p className="poem-text text-sm text-foreground/80">
                    {" "}
                    — Eu que tenho medo de tentar
                    <br /> — E eu que quero tudo de uma vez
                    <br /> — Se vocês pararem de brigar, talvez eu consiga andar
                    <br /> — Mas e se der errado?
                    <br /> — Mas e se eu nunca tentar?
                    <br /> — Vamos dar um passo só — juntas. Só um.{" "}
                  </p>{" "}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
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
                  Fundamentos Teóricos
                </CardTitle>{" "}
              </CardHeader>{" "}
              <CardContent>
                {" "}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {" "}
                  <li>
                    <span className="text-primary mr-2" aria-hidden="true">•</span>Inspirado nos{" "}
                    <strong className="text-foreground">Estados do Ego</strong>{" "}
                    (Análise Transacional),{" "}
                    <strong className="text-foreground">IFS</strong> (Internal
                    Family Systems) e{" "}
                    <strong className="text-foreground">
                      Psicodrama Poético
                    </strong>{" "}
                    (Moreno).
                  </li>{" "}
                  <li>
                    <span className="text-primary mr-2" aria-hidden="true">•</span>Trabalha a{" "}
                    <strong className="text-foreground">
                      autonomia emocional
                    </strong>{" "}
                    e o respeito interno: cada parte tem sua verdade.
                  </li>{" "}
                  <li>
                    <span className="text-primary mr-2" aria-hidden="true">•</span>Reduz a{" "}
                    <strong className="text-foreground">
                      autocrítica paralisante
                    </strong>
                    , permitindo que a dúvida dialogue com o desejo.
                  </li>{" "}
                </ul>{" "}
              </CardContent>{" "}
            </Card>{" "}
            <div className="poem-block text-center">
              {" "}
              <p className="poem-text text-foreground/80">
                "Talvez, no fundo, você não esteja em conflito...
                <br /> — está apenas em assembleia."{" "}
              </p>{" "}
            </div>{" "}
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
                <Drama className="spiritual-icon spiritual-icon-sm" /> Pratique
                Agora{" "}
              </div>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Exercício: Monte sua Encenação
              </h2>{" "}
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Dê voz às suas partes internas e descubra o que elas têm a dizer
                umas às outras.
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
                        Identifique o Conflito
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Pense numa decisão difícil, num sentimento ambíguo ou
                        numa paralisia recorrente. Pergunte-se:{" "}
                        <strong className="text-foreground">
                          "Quais vozes estão brigando dentro de mim?"
                        </strong>
                      </p>{" "}
                      <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg mt-3">
                        {" "}
                        <p className="text-xs text-muted-foreground italic">
                          Exemplos: Querer mudar × medo de perder o conhecido /
                          Perdoar × manter a mágoa como proteção / Descansar ×
                          sentir culpa por parar
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
                        Nomeie os Personagens
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Dê um nome simbólico a cada voz. Atribua uma cor, um
                        lugar no corpo e uma metáfora:
                      </p>{" "}
                      <div className="grid sm:grid-cols-2 gap-3">
                        {" "}
                        <div className="p-3 rounded-lg border border-border/30 bg-card/50">
                          {" "}
                          <p className="text-sm text-foreground/80">
                            <strong>A Guardiã</strong> — vermelha, mora no peito
                          </p>{" "}
                          <p className="text-xs text-muted-foreground italic mt-1">
                            "Sou o muro que te protegeu quando ninguém mais
                            estava."
                          </p>{" "}
                        </div>{" "}
                        <div className="p-3 rounded-lg border border-border/30 bg-card/50">
                          {" "}
                          <p className="text-sm text-foreground/80">
                            <strong>A Sonhadora</strong> — azul, mora nos olhos
                          </p>{" "}
                          <p className="text-xs text-muted-foreground italic mt-1">
                            "Sou a janela que você trancou, mas a vista ainda
                            está lá."
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
                      3
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Escreva o Diálogo Poético
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Deixe as vozes conversarem em versos. Não censure —
                        permita que a conversa flua com emoção e honestidade:
                      </p>{" "}
                      <div className="poem-block">
                        {" "}
                        <p className="poem-text text-sm text-foreground/80">
                          {" "}
                          — Eu te protegi a vida inteira.
                          <br /> — Mas me prendeu no mesmo gesto.
                          <br /> — Só queria que não doesse.
                          <br /> — Doeu de qualquer jeito. Mas calada.{" "}
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
                      4
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Escreva o Acordo Final
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Após o diálogo, convide uma{" "}
                        <strong className="text-foreground">
                          terceira voz
                        </strong>{" "}
                        — a voz integradora — para propor um pacto:
                      </p>{" "}
                      <div className="poem-block">
                        {" "}
                        <p className="poem-text text-sm text-foreground/80 italic">
                          "Vamos caminhar juntas — não como antes, / mas como
                          quem aprende a dividir o peso / e a beleza de ser duas
                          num só corpo."{" "}
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
                      5
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Performance (Opcional)
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Leia o diálogo em voz alta, mudando de tom para cada
                        personagem. Se estiver em sessão, o terapeuta pode ler
                        uma das vozes. A leitura corporificada amplifica o
                        impacto emocional.
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
                  📋 Temas Comuns para Encenação
                </h4>{" "}
                <div className="grid sm:grid-cols-2 gap-3">
                  {" "}
                  {[
                    {
                      conflito: "Perfeccionismo × Autocompaixão",
                      pergunta: '"E se eu pudesse errar e ainda ser amado?"',
                    },
                    {
                      conflito: "Criança Interior × Adulto",
                      pergunta: '"Quem cuida de quem cuida de todo mundo?"',
                    },
                    {
                      conflito: "Razão × Intuição",
                      pergunta:
                        '"O que seu corpo sabe que sua mente ainda não aceita?"',
                    },
                    {
                      conflito: "Presente × Passado",
                      pergunta:
                        '"O que você diria à versão de si que mais sofreu?"',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-border/30 bg-card/50"
                    >
                      {" "}
                      <p className="text-sm font-semibold text-foreground mb-1">
                        {item.conflito}
                      </p>{" "}
                      <p className="text-xs text-muted-foreground italic">
                        {item.pergunta}
                      </p>{" "}
                    </div>
                  ))}
                </div>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-medium">Prática ampliada</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Aprofundamento: dar forma simbólica sem inventar fatos</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">A encenação poética usa personagens, objetos ou metáforas para expressar perspectivas. Não é reconstrução fiel de acontecimentos nem exige representar experiências sensíveis.</p>
            </div>
            <div className="space-y-5">
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">1. Escolha uma forma segura</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">Escolha um objeto, elemento da natureza ou personagem fictício — por exemplo, uma ponte, uma árvore ou uma pequena lanterna. Evite cenas que não queira revisitar.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">2. Dê voz a três perspectivas</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">Opcionalmente, escreva: “A parte de mim que sente diz…”; “A parte que precisa de cuidado pede…”; “Minha voz de hoje responde…”. Trate cada fala como uma possibilidade de escrita, não como uma verdade oculta.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">3. Faça perguntas abertas</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">“O que essa personagem quer comunicar?”; “O que ela não sabe ainda?”; “Que limite precisa ser respeitado?”; “Que outra resposta seria possível?”. Não force reconciliação, perdão ou conclusão positiva.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">4. Feche a cena</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">Escreva uma última fala que reconheça a escolha presente: “Por agora, posso…”. A ação pode ser pequena, adiada ou nenhuma. Depois, volte ao ambiente e deixe a personagem no papel.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Exemplo breve</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">A Ponte: “Não prometo que o caminho será fácil; ofereço apenas um lugar para começar.” A Pessoa: “Hoje, começo por olhar, sem obrigação de atravessar.”</p>
              </article>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-4">Não use a atividade para induzir lembranças, afirmar fatos sobre o passado ou interpretar personagens como partes clínicas diagnosticáveis. A participação e a profundidade são sempre opcionais.</p>
          </div>
        </div>
      </section>
      
      <ScientificValidation tool="encenacao-poetica" />{" "}
    </PageLayout>
  );
};
export default EncenacaoPoetica;
