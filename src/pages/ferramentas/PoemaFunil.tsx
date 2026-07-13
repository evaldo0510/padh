import React from "react";
import { Feather, Brain, BookOpen, Lightbulb, Music } from "lucide-react";
import FerramentaHero from "@/components/ferramentas/FerramentaHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import toolImage from "@/assets/tool-poema-funil.jpg";
import { pagesSEO } from "@/lib/seo-config";
import ScientificValidation from "@/components/sections/ScientificValidation";
const PoemaFunil = () => {
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);
  return (
    <PageLayout seo={pagesSEO.poemaFunil} currentPage="Poema-Funil">
      {" "}
      <FerramentaHero
        icon={Feather}
        badgeLabel="Ferramenta 1 — P.A.D.H."
        title={
          <>
            Poema-<span className="text-primary italic">Funil</span>
          </>
        }
        subtitle="A Espiral da Palavra que Desce"
        description="O convite poético para o mergulho interior — induzir o cliente a abandonar a superfície e descer pelas camadas internas do ser."
        image={{
          src: toolImage,
          alt: "Poema-Funil — espiral descendente de palavras",
        }}
        poem={
          <>
            Comece com os olhos:
            <br /> veja o chão, o corpo, o mundo.
            <br />
            <br /> Desça para os sentidos:
            <br /> onde a respiração toca a alma.
            <br />
            <br /> Desça mais — onde mora o que não tem palavras.
            <br /> Ali, onde você escuta o que nunca ousou dizer.
            <br /> Ali é onde vamos começar.
          </>
        }
      />{" "}
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
                  Induzir o cliente a sair da superfície do discurso racional e
                  descer pelas escadas simbólicas da sensorialidade, da emoção e
                  do inconsciente. O poema-funil atua como uma{" "}
                  <strong className="text-foreground">
                    {" "}
                    espiral de descida
                  </strong>
                  : começa com imagens concretas, passa por sentimentos e
                  termina em símbolos ou silêncios.{" "}
                </p>{" "}
                <p>
                  {" "}
                  Ele prepara o campo psíquico para o trabalho terapêutico. É um{" "}
                  <strong className="text-foreground">
                    pré-transe poético
                  </strong>
                  , onde o hemisfério direito do cérebro (intuitivo,
                  associativo) se torna mais ativo.{" "}
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
                    1. Leitura Guiada
                  </h4>{" "}
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Com voz calma,
                      lenta, respeitando pausas naturais e pequenos silêncios
                      entre versos.
                    </li>{" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Pode-se usar
                      música instrumental ao fundo (muito sutil).
                    </li>{" "}
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>Ideal para
                      início de sessões, meditações ou rodas terapêuticas.
                    </li>{" "}
                  </ul>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    2. Escrita Criativa Inspirada
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground mb-3">
                    Após a leitura, o terapeuta pode propor:
                  </p>{" "}
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
                    {" "}
                    <p className="poem-text text-sm text-muted-foreground italic">
                      "Escreva agora um pequeno poema que comece com 'Vejo...',
                      depois 'Sinto...', e depois 'Desejo...'."{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    3. Técnica do Tripé
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground mb-3">
                    Um modelo de poema-funil segue esta tríade:
                  </p>{" "}
                  <div className="grid sm:grid-cols-3 gap-3">
                    {" "}
                    {[
                      {
                        label: "Imagem externa",
                        desc: "Sensorial — o que se vê",
                      },
                      {
                        label: "Estado interno",
                        desc: "Emocional — o que se sente",
                      },
                      {
                        label: "Símbolo oculto",
                        desc: "Inconsciente — o que habita",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-border/50 bg-card/50 text-center"
                      >
                        {" "}
                        <p className="text-sm font-semibold text-foreground mb-1">
                          {item.label}
                        </p>{" "}
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
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
      {/* Exemplos */}
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
                Aplicação Real
              </p>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Exemplos de Poema-Funil
              </h2>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              <Card className="border-border/50">
                {" "}
                <CardContent className="p-6">
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-3">
                    Exemplo — Tripé Poético
                  </h4>{" "}
                  <div className="poem-block">
                    {" "}
                    <p className="poem-text text-foreground/80">
                      {" "}
                      Vejo folhas dançando na calçada,
                      <br /> Sinto meu peito apertado feito botão fechado,
                      <br /> Sou um jardim esperando alguém para chover.{" "}
                    </p>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>{" "}
              <div className="grid md:grid-cols-3 gap-4">
                {" "}
                {[
                  {
                    title: "Sessão Individual",
                    desc: "Leia o poema-funil no início da sessão com um cliente ansioso. Ele respira mais devagar, fecha os olhos, e a conversa posterior flui com mais conexão.",
                  },
                  {
                    title: "Oficina em Grupo",
                    desc: 'No início de um grupo de autoconhecimento, o poema-funil é usado como"meditação poética". Cada pessoa depois escreve um poema inspirado no que sentiu.',
                  },
                  {
                    title: "Ritual de Transição",
                    desc: "Pode-se usar um poema-funil no fechamento de processos terapêuticos longos como símbolo de encerramento e travessia.",
                  },
                ].map((item, i) => (
                  <Card key={i} className="border-border/50">
                    {" "}
                    <CardContent className="p-5">
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2 text-sm">
                        {item.title}
                      </h4>{" "}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>{" "}
                    </CardContent>{" "}
                  </Card>
                ))}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Fundamentos */}
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
                Fundamentos
              </p>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Base Teórica
              </h2>{" "}
            </div>{" "}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {" "}
              {[
                {
                  title: "Milton Erickson",
                  desc: "Baseado na ideia de indução hipnótica indireta.",
                },
                {
                  title: "Carl Jung",
                  desc: "Atua como ativador da imaginação simbólica.",
                },
                {
                  title: "Winnicott",
                  desc: 'Funciona como"dispositivo transicional" — um objeto-poema que leva do real ao simbólico.',
                },
              ].map((item, i) => (
                <Card key={i} className="border-border/50">
                  {" "}
                  <CardContent className="p-5">
                    {" "}
                    <h4 className="font-heading font-semibold text-primary mb-2 text-sm">
                      {item.title}
                    </h4>{" "}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>{" "}
                  </CardContent>{" "}
                </Card>
              ))}
            </div>{" "}
            <Card className="border-primary/20 bg-primary/[0.02]">
              {" "}
              <CardContent className="p-6">
                {" "}
                <div className="flex items-center gap-2 mb-4">
                  {" "}
                  <Lightbulb className="spiritual-icon spiritual-icon-lg text-primary" />{" "}
                  <h4 className="font-heading font-semibold text-foreground">
                    Dica Extra
                  </h4>{" "}
                </div>{" "}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {" "}
                  Crie uma{" "}
                  <strong className="text-foreground">
                    playlist de poemas-funil
                  </strong>{" "}
                  e deixe o cliente escolher o"poço" que quer visitar naquele
                  dia. Versos-padrão para personalizar:{" "}
                </p>{" "}
                <div className="poem-block mt-4">
                  {" "}
                  <p className="poem-text text-sm text-muted-foreground">
                    "Começo com o que se vê…"
                    <br />
                    "Desço pelo que me move…"
                    <br />
                    "Chego onde nada tem nome, mas tudo faz sentido."{" "}
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
                <Lightbulb className="spiritual-icon spiritual-icon-sm" />{" "}
                Pratique Agora{" "}
              </div>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Exercício Guiado: Crie seu Poema-Funil
              </h2>{" "}
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Siga os passos abaixo para criar seu próprio poema-funil e
                vivenciar a espiral de descida interior.
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
                        Preparação do Ambiente
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Encontre um lugar silencioso. Sente-se confortavelmente,
                        feche os olhos por 30 segundos e respire profundamente
                        três vezes. Permita que o ambiente externo se dissolva
                        gradualmente.
                      </p>{" "}
                      <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg mt-3">
                        {" "}
                        <p className="text-xs text-muted-foreground italic">
                          💡 Dica: Se possível, coloque uma música instrumental
                          suave ao fundo — piano, violoncelo ou sons da natureza
                          funcionam bem.
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
                        Camada 1 — O Mundo Externo (Visão)
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Abra os olhos e observe seu entorno. Escolha um elemento
                        concreto que você vê — uma folha, uma sombra, uma luz.
                        Escreva 2 versos começando com{" "}
                        <strong className="text-foreground">"Vejo..."</strong>
                      </p>{" "}
                      <div className="poem-block">
                        {" "}
                        <p className="poem-text text-sm text-foreground/60 italic">
                          {" "}
                          Exemplo:"Vejo a luz que entra pela janela / como uma
                          mão estendida que não pede nada."{" "}
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
                      3
                    </div>{" "}
                    <div>
                      {" "}
                      <h4 className="font-heading font-semibold text-foreground mb-2">
                        Camada 2 — O Mundo Interno (Sentir)
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Feche os olhos novamente. Escaneie seu corpo: onde há
                        tensão? Onde há calor? Que emoção habita ali? Escreva 2
                        versos começando com{" "}
                        <strong className="text-foreground">"Sinto..."</strong>
                      </p>{" "}
                      <div className="poem-block">
                        {" "}
                        <p className="poem-text text-sm text-foreground/60 italic">
                          {" "}
                          Exemplo:"Sinto meu peito como porta entreaberta /
                          esperando alguém que talvez já entrou."{" "}
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
                        Camada 3 — O Símbolo Oculto (Ser)
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Sem pensar, complete:{" "}
                        <strong className="text-foreground">
                          "No fundo, eu sou..."
                        </strong>{" "}
                        ou{" "}
                        <strong className="text-foreground">
                          "Ali onde mora..."
                        </strong>{" "}
                        — deixe o inconsciente falar. Não edite.
                      </p>{" "}
                      <div className="poem-block">
                        {" "}
                        <p className="poem-text text-sm text-foreground/60 italic">
                          {" "}
                          Exemplo:"Ali onde mora o que não tem nome / encontro a
                          coragem de ser inteiro."{" "}
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
                        Integração — Leitura em Voz Alta
                      </h4>{" "}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Leia seu poema completo em voz alta, lentamente, com
                        pausas entre cada camada. Observe: como o corpo reage?
                        Que parte do poema provoca mais ressonância? Essa é a
                        sua porta de entrada para o trabalho terapêutico.
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
                  📝 Variações para o Terapeuta
                </h4>{" "}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <strong className="text-foreground">
                      Com casais:
                    </strong>{" "}
                    Cada um escreve seu poema-funil e depois leem um para o
                    outro — revelando paisagens internas compartilhadas.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <strong className="text-foreground">
                      Com adolescentes:
                    </strong>{" "}
                    Use imagens (fotos, ilustrações) como ponto de partida para
                    a Camada 1 — facilita a entrada.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <strong className="text-foreground">Em grupo:</strong> Faça
                    uma"descida coletiva" — cada participante contribui com um
                    verso para cada camada, criando um poema-funil colaborativo.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <strong className="text-foreground">
                      Versão rápida (3 min):
                    </strong>{" "}
                    Um verso por camada. Ideal para aberturas de sessão quando o
                    tempo é curto.
                  </li>{" "}
                </ul>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <ScientificValidation tool="poema-funil" />{" "}
    </PageLayout>
  );
};
export default PoemaFunil;
