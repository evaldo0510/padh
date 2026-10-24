import React from "react";
import { ScanSearch, Search, Brain, BookOpen, Eye } from "lucide-react";
import FerramentaHero from "@/components/ferramentas/FerramentaHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PoemadiagnosticoInterativo from "@/components/sections/PoemadiagnosticoInterativo";
import toolImage from "@/assets/tool-poemadiagnostico.jpg";
import { pagesSEO } from "@/lib/seo-config";
import ScientificValidation from "@/components/sections/ScientificValidation";
const Poemadiagnostico = () => {
  const contentAnim = useScrollAnimation(0.15);
  const examplesAnim = useScrollAnimation(0.15);
  const theoryAnim = useScrollAnimation(0.15);
  return (
    <PageLayout seo={pagesSEO.poemadiagnostico} currentPage="Poemadiagnóstico">
      {" "}
      <FerramentaHero
        icon={ScanSearch}
        badgeLabel="Ferramenta 3 — P.A.D.H."
        title={
          <>
            Poema<span className="text-primary italic">diagnóstico</span>
          </>
        }
        subtitle="O Espelho Emocional"
        description="Uma experiência de leitura e auto-observação: escolha um poema, perceba o que chamou sua atenção e explore os sentidos que ele desperta em você. A escolha não revela automaticamente estados inconscientes nem substitui avaliação clínica."
        image={{
          src: toolImage,
          alt: "Poemadiagnóstico — espelho emocional através da poesia",
        }}
        poem={<>"Qual desses poemas te escolhe hoje?"</>}
        poemItalic
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
                  Ajudar o cliente a{" "}
                  <strong className="text-foreground">
                    reconhecer sua paisagem emocional atual
                  </strong>{" "}
                  por meio da identificação espontânea com um poema. Não é o
                  cliente que escolhe o poema —{" "}
                  <em> é o poema que escolhe ele</em>.{" "}
                </p>{" "}
                <p>
                  {" "}
                  Convida a pessoa a observar se{" "}
                  <strong className="text-foreground">
                    alguma imagem, palavra ou lembrança faz sentido para sua experiência
                  </strong>
                  , abrindo um canal legítimo e simbólico para a escuta.{" "}
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
                    1. Apresente 3 a 5 mini poemas curtos
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    Máximo de 6 versos cada, com linguagens simbólicas
                    distintas: medo, tempo/espera, mudança, pertencimento.{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    2. Pergunta-Chave
                  </h4>{" "}
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
                    {" "}
                    <p className="poem-text text-sm text-muted-foreground italic">
                      "Qual desses te escolhe hoje?"
                      <br />{" "}
                      <span className="text-xs">
                        (Use esse verbo — te <strong>escolhe</strong>. Isso
                        evita a racionalização.)
                      </span>{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    3. Exploração Terapêutica
                  </h4>{" "}
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {" "}
                    <li>→ O que mais te tocou nesse poema?</li>{" "}
                    <li>
                      → Que associação ou lembrança esse poema desperta em você, se alguma?
                    </li>{" "}
                    <li>→ Que parte sua falou mais alto nessa escolha?</li>{" "}
                  </ul>{" "}
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
                Exemplo Real
              </p>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Kit Poemadiagnóstico
              </h2>{" "}
            </div>{" "}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {" "}
              {[
                {
                  tema: "Medo",
                  verso: '"Guardo embaixo da língua\no grito que nunca saiu."',
                },
                {
                  tema: "Espera",
                  verso:
                    '"Tenho um relógio que não marca horas —\nsó silêncios acumulados."',
                },
                {
                  tema: "Mudança",
                  verso:
                    '"Troquei a gaiola aberta\npelo vento que ainda me assusta."',
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-border/50 hover:border-primary/20 transition-colors"
                >
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
            <Card className="border-primary/20 bg-primary/[0.02]">
              {" "}
              <CardContent className="p-6">
                {" "}
                <h4 className="font-heading font-semibold text-foreground mb-3">
                  Caso Prático
                </h4>{" "}
                <p className="text-sm text-muted-foreground mb-3">
                  {" "}
                  <strong className="text-foreground">
                    O cliente escolhe o poema 2 (Espera)
                  </strong>{" "}
                  e diz:{" "}
                </p>{" "}
                <p className="text-sm text-muted-foreground italic mb-4">
                  "Esse é exatamente o que sinto. Como se tudo estivesse parado,
                  mas dentro de mim tem uma fila enorme de coisas
                  esperando."{" "}
                </p>{" "}
                <p className="text-sm text-muted-foreground">
                  {" "}
                  <strong className="text-foreground">Diagnóstico:</strong> O
                  cliente está em estado de suspensão emocional, entre o passado
                  e o futuro — mas sem presença.{" "}
                </p>{" "}
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
          className={`container mx-auto px-6 transition-all duration-1000 ${
            theoryAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
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
                    <span className="text-primary mt-1">•</span>Baseia-se na{" "}
                    <strong className="text-foreground">
                      identificação simbólica possível
                    </strong>
                    : o cliente lê algo externo e, ao se identificar, revela seu
                    estado interno.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Inspiração nos{" "}
                    <strong className="text-foreground">
                      Testes Projetivos Literários
                    </strong>
                    , semelhantes ao TAT, mas com linguagem poética.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Dialoga com as
                    ideias de{" "}
                    <strong className="text-foreground">
                      resposta emocional imediata
                    </strong>{" "}
                    na arte, como defendia Carl Jung.
                  </li>{" "}
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>Atua no{" "}
                    <strong className="text-foreground">sistema límbico</strong>
                    , que responde mais rapidamente à metáfora do que à
                    explicação racional.
                  </li>{" "}
                </ul>{" "}
              </CardContent>{" "}
            </Card>{" "}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {" "}
              {[
                "Primeira sessão terapêutica: excelente abertura emocional não invasiva.",
                "Sessões de grupo: cada pessoa escolhe em silêncio, depois compartilha.",
                "Oficinas de escrita terapêutica: serve como ativador de temas.",
                "Atendimentos online: poemas enviados por WhatsApp ou email em formato carrossel.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-3 rounded-lg border border-border/50 bg-card/50"
                >
                  {" "}
                  <Search className="spiritual-icon text-primary mt-0.5 flex-shrink-0" />{" "}
                  <p className="text-xs text-muted-foreground">{item}</p>{" "}
                </div>
              ))}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <PoemadiagnosticoInterativo /> {/* Guia de Interpretação */}
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
                <Eye className="spiritual-icon spiritual-icon-sm" />{" "}
                Aprofundamento{" "}
              </div>{" "}
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Guia de Interpretação Terapêutica
              </h2>{" "}
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Como ler as escolhas do cliente e transformá-las em insights
                para a sessão.
              </p>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              {[
                {
                  escolha: "Cliente escolhe poemas sobre solidão/vazio",
                  leitura:
                    'Possível estado de desconexão emocional — pode estar se sentindo invisível ou não pertencente. Explore:"De que tipo de presença você sente falta?"',
                  caminho:
                    "Trabalho com pertencimento, vínculo e autovalidação.",
                },
                {
                  escolha: "Cliente escolhe poemas sobre raiva/fogo",
                  leitura:
                    'Energia reprimida que precisa de expressão. A raiva muitas vezes esconde mágoa não processada. Explore:"O que essa raiva está protegendo?"',
                  caminho:
                    "Encenação Poética (Ferramenta 5) para dar voz à raiva de forma segura.",
                },
                {
                  escolha: "Cliente escolhe poemas sobre natureza/renascimento",
                  leitura:
                    'Momento de transição ou desejo de mudança. O cliente já sente o impulso mas talvez não confie nele. Explore:"Que parte sua já está brotando?"',
                  caminho:
                    "Reescrita Poética (Ferramenta 6) para narrativas de transformação.",
                },
                {
                  escolha: 'Cliente diz"nenhum me escolheu"',
                  leitura:
                    'Pode indicar resistência, desconfiança do processo, ou estado de anestesia emocional — todos são dados valiosos. Explore:"Que tipo de poema você escreveria para si mesmo agora?"',
                  caminho:
                    "Caderno de Voz Interna (Ferramenta 4) para desbloqueio gradual.",
                },
              ].map((item, i) => (
                <Card key={i} className="border-border/50">
                  {" "}
                  <CardContent className="p-6 space-y-3">
                    {" "}
                    <h4 className="font-heading font-semibold text-foreground text-sm">
                      {item.escolha}
                    </h4>{" "}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.leitura}
                    </p>{" "}
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                      {" "}
                      <p className="text-xs text-primary font-medium">
                        Próximo passo:{" "}
                        <span className="text-muted-foreground font-normal">
                          {item.caminho}
                        </span>
                      </p>{" "}
                    </div>{" "}
                  </CardContent>{" "}
                </Card>
              ))}
            </div>{" "}
            <Card className="border-primary/20 bg-primary/[0.02] mt-8">
              {" "}
              <CardContent className="p-6">
                {" "}
                <h4 className="font-heading font-semibold text-foreground mb-3">
                  🎴 Kit Expandido: Mais Poemas-Diagnósticos
                </h4>{" "}
                <div className="grid sm:grid-cols-2 gap-4">
                  {" "}
                  {[
                    {
                      tema: "Culpa",
                      verso:
                        '"Carrego uma mala\ncom roupas de quem não sou mais.\nMas não consigo largar."',
                    },
                    {
                      tema: "Pertencimento",
                      verso:
                        '"Tenho um lugar à mesa\nmas ninguém me serviu o prato.\nComo de pé, no corredor."',
                    },
                    {
                      tema: "Liberdade",
                      verso:
                        '"A porta estava aberta o tempo todo.\nMas meus pés aprenderam a ficar."',
                    },
                    {
                      tema: "Amor-próprio",
                      verso:
                        '"Me olhei no espelho\ne pela primeira vez\nnão pedi desculpa."',
                    },
                    {
                      tema: "Cansaço existencial",
                      verso:
                        '"Estou tão cansado\nque até meu silêncio faz barulho."',
                    },
                    {
                      tema: "Esperança cautelosa",
                      verso:
                        '"Acendo a vela\ncom a mão que já se queimou.\nMas acendo."',
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
      
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-medium">Prática ampliada</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Aprofundamento: escuta sem rótulos</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">Use os poemas como convites à auto-observação, nunca como teste que revela uma verdade escondida. A escolha pertence à pessoa e pode mudar de um dia para outro.</p>
            </div>
            <div className="space-y-5">
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">1. Antes da escolha</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">Convide a pessoa a ler os poemas sem procurar a resposta certa. Pergunte: “Qual imagem ficou com você?”; “O que chamou sua atenção: uma palavra, uma cena ou o ritmo?”; “Algum poema não combina com você hoje?”.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">2. Da imagem à experiência</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">Explore uma situação concreta e recente: “Em que momento essa imagem pareceu familiar?”; “Que emoção você reconhece — se alguma?”; “O que você precisa que seja ouvido agora?”. A pessoa pode responder “não sei”, escolher outro poema ou não compartilhar.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">3. Transformar em cuidado possível</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">Convide a completar: “A imagem que levo é…”; “Ela me faz pensar em…”; “Hoje, um passo pequeno e possível seria…”. O passo deve ser escolhido pela própria pessoa e pode ser apenas descansar, observar ou conversar com alguém de confiança.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Exemplo de leitura aberta</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">Poema: “Tenho um relógio que não marca horas — só silêncios acumulados.” Pergunta: “O que essa imagem significa para você?”. Uma pessoa pode pensar em espera; outra, em tranquilidade; outra pode não se identificar. Não atribua significado sem perguntar.</p>
              </article>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-4">Importante: esta ferramenta apoia reflexão e expressão pessoal; não produz diagnóstico clínico, não comprova causas inconscientes e não substitui avaliação profissional.</p>
          </div>
        </div>
      </section>
      

      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-medium">Roteiro para facilitadores</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Como conduzir uma leitura sem transformar poesia em teste</h2>
            <p className="mt-4 mb-8 text-muted-foreground leading-relaxed">O poema pode abrir uma conversa, mas não comprova personalidade, trauma, intenção ou diagnóstico. A interpretação pertence à pessoa que lê e pode permanecer em aberto.</p>
            <div className="space-y-5">
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">1. Apresente o enquadramento</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Diga: “Vou oferecer algumas imagens poéticas. Não existe resposta certa, e elas não são um teste. Você pode escolher uma, trocar de ideia ou não participar.”</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">2. Observe a escolha sem pontuar</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Pergunte qual palavra, ritmo ou imagem chamou atenção. Não atribua significado fixo a uma escolha e não compare respostas entre pessoas como se fossem resultados padronizados.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">3. Explore com permissão</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Antes de aprofundar, pergunte: “Você gostaria de falar sobre isso ou prefere ficar na imagem?”. Use perguntas abertas; evite sugerir que a pessoa esteja escondendo algo ou que a poesia revele uma verdade que ela desconhece.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">4. Encerre com escolha e contexto</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Convide a pessoa a completar: “O que levo desta leitura é…” ou “Prefiro deixar esta imagem em aberto”. Se surgir uma necessidade concreta, conversem sobre opções realistas e apoio adequado, sem transformar a resposta em diagnóstico.</p>
              </article>
              <article className="rounded-xl border border-border/50 bg-card/60 p-5 md:p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Exemplo de pergunta não indutiva</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Diante do verso “A janela guarda um pedaço do céu”, pergunte “Que associações aparecem para você, se alguma?”. Evite afirmar “Você escolheu isso porque se sente preso”. A primeira pergunta abre possibilidades; a segunda impõe uma explicação.</p>
              </article>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-4">Registre apenas o necessário, com consentimento e respeito à privacidade. Em contexto profissional, siga os deveres éticos e os limites de atuação aplicáveis; a ferramenta não substitui instrumentos validados nem avaliação clínica.</p>
          </div>
        </div>
      </section>

      <ScientificValidation tool="poemadiagnostico" />{" "}
    </PageLayout>
  );
};
export default Poemadiagnostico;
