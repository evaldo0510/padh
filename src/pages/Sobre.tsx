import React from "react";
import {
  BookOpen,
  Brain,
  Heart,
  Sparkles,
  Star,
  Award,
  Users,
  Feather,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import capaPrisaoInterior from "@/assets/capa-prisao-interior.jpg";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { pagesSEO } from "@/lib/seo-config";
const Sobre = () => {
  const originSection = useScrollAnimation(0.15);
  const journeySection = useScrollAnimation(0.15);
  const pillarsSection = useScrollAnimation(0.15);
  const missionSection = useScrollAnimation(0.15);
  return (
    <PageLayout seo={pagesSEO.sobre} currentPage="Sobre">
      {" "}
      {/* Hero — Evaldo de Jesus Santana */}
      <section className="relative py-20 overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-hero" />{" "}
        <div className="absolute inset-0 gradient-glow" />{" "}
        <div className="absolute top-1/3 left-[15%] w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />{" "}
        <div className="relative container mx-auto px-6 z-10">
          {" "}
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            {" "}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              {" "}
              <Star className="spiritual-icon spiritual-icon-sm spiritual-icon" />{" "}
              A origem de uma metodologia transformadora{" "}
            </div>{" "}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold leading-[0.95] tracking-tight">
              {" "}
              <span className="text-foreground">Evaldo de Jesus</span>{" "}
              <span className="text-primary italic">Santana</span>{" "}
            </h1>{" "}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {" "}
              Criador da{" "}
              <strong className="text-foreground">
                Poesia Cognitiva Hipnótica
              </strong>{" "}
              e da Poesia Aplicada ao Desenvolvimento Humano — uma ponte entre
              ciência, espiritualidade e a arte ancestral da palavra.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* A História */}
      <section className="section-padding border-t border-border/20">
        {" "}
        <div
          ref={originSection.ref}
          className={`container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            originSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
            <div className="section-header">
              {" "}
              <p className="section-label">A Gênese</p>{" "}
              <h2 className="section-title"> De onde nasce a PCH? </h2>{" "}
              <div className="section-divider" />{" "}
            </div>{" "}
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              {" "}
              <p className="text-lg">
                {" "}
                A Poesia Cognitiva Hipnótica não nasceu numa universidade, nem
                numa clínica convencional. Nasceu nas páginas de um livro
                chamado{" "}
                <strong className="text-foreground italic">
                  Prisão Interior
                </strong>{" "}
                — o primeiro livro de Evaldo, escrito como um grito silencioso
                de quem precisava nomear o que não cabia em palavras
                comuns.{" "}
              </p>{" "}
              <p>
                {" "}
                Foi ali, entre versos que brotavam da própria dor, que uma
                pergunta começou a pulsar com insistência:{" "}
                <em className="text-foreground">
                  "Quando se olha no espelho, o que é que você vê?"
                </em>{" "}
                Essa pergunta — aparentemente simples — tornou-se o fio condutor
                de toda a metodologia. Porque Evaldo percebeu que a maioria das
                pessoas não se vê de verdade. Vê máscaras, expectativas,
                feridas, rótulos. E foi na poesia que ele encontrou o espelho
                capaz de devolver ao leitor uma imagem mais profunda — a imagem
                que mora por trás da prisão interior.{" "}
              </p>{" "}
              <blockquote className="poem-block my-8">
                {" "}
                <p className="poem-text text-foreground/80">
                  {" "}
                  Quando se olha no espelho,
                  <br /> o que é que você vê?
                  <br /> Eu vi grades onde havia janelas,
                  <br /> vi muros onde havia caminhos.
                  <br /> Até que um verso abriu a porta
                  <br /> que eu mesmo havia trancado por dentro.{" "}
                </p>{" "}
                <cite className="text-sm text-primary/70 mt-3 block not-italic">
                  — Evaldo de Jesus Santana, Prisão Interior
                </cite>{" "}
              </blockquote>{" "}
              <p>
                {" "}
                O livro{" "}
                <strong className="text-foreground">
                  Prisão Interior
                </strong>{" "}
                revelou algo que Evaldo ainda não tinha nome para descrever: os
                versos que ele escrevia para se libertar produziam efeitos
                semelhantes aos descritos pela neurociência e pela hipnose
                clínica. As palavras não apenas expressavam — elas{" "}
                <em>transformavam</em>.{" "}
              </p>{" "}
              <p>
                {" "}
                Durante anos de prática em atendimentos terapêuticos, Evaldo
                observou que seus clientes reagiam de maneira profundamente
                diferente quando a intervenção incluía poesia. Não era apenas
                relaxamento — era <em>reorganização interna</em>. Os relatos se
                repetiam:"Senti como se alguém falasse diretamente com meu
                inconsciente","As palavras entraram onde minha resistência não
                deixava ninguém passar."{" "}
              </p>{" "}
              <p>
                {" "}
                Foi então que começou o trabalho de sistematização. Evaldo
                mergulhou na{" "}
                <strong className="text-foreground">
                  {" "}
                  neurociência da linguagem
                </strong>
                , estudou os mecanismos da hipnose ericksoniana e investigou as
                raízes da terapia poética moderna — reconhecendo o legado de
                organizações pioneiras como a{" "}
                <strong className="text-foreground">
                  NAPT (National Association for Poetry Therapy)
                </strong>
                , fundada em 1980 nos EUA, que formalizou o uso da poesia como
                instrumento de cura.{" "}
              </p>{" "}
              <p>
                {" "}
                A PCH, no entanto, vai além ao integrar a{" "}
                <strong className="text-foreground">
                  {" "}
                  neuroplasticidade
                </strong>{" "}
                e a cognição profunda. A leitura poética estimula
                simultaneamente o{" "}
                <strong className="text-foreground">
                  córtex pré-frontal
                </strong>{" "}
                (pensamento reflexivo), a{" "}
                <strong className="text-foreground">amígdala</strong>{" "}
                (processamento emocional), o{" "}
                <strong className="text-foreground">hipocampo</strong> (memória
                e reconsolidação) e o{" "}
                <strong className="text-foreground"> córtex insular</strong>{" "}
                (consciência interoceptiva). Nenhuma outra forma de linguagem
                ativa tantas áreas simultaneamente com tanta suavidade.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Livro Prisão Interior */}
      <section className="section-padding border-t border-border/20 relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent" />{" "}
        <div className="relative container mx-auto px-6 md:px-8">
          {" "}
          <div className="max-w-5xl mx-auto">
            {" "}
            <div className="section-header">
              {" "}
              <p className="section-label">Onde Tudo Começou</p>{" "}
              <h2 className="section-title"> Prisão Interior </h2>{" "}
              <div className="section-divider" />{" "}
            </div>{" "}
            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
              {" "}
              {/* Book Cover */}
              <div className="flex justify-center">
                {" "}
                <div className="relative group">
                  {" "}
                  <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl group-hover:bg-primary/15 transition-all duration-500" />{" "}
                  <img
                    src={capaPrisaoInterior}
                    alt="Capa do livro Prisão Interior por Evaldo de Jesus Santana"
                    className="relative w-64 md:w-72 rounded-lg shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                    width={640}
                    height={960}
                  />{" "}
                </div>{" "}
              </div>{" "}
              {/* Synopsis */}
              <div className="space-y-6">
                {" "}
                <h3 className="text-2xl font-heading font-semibold text-foreground">
                  {" "}
                  O livro que deu origem à Poesia Cognitiva Hipnótica{" "}
                </h3>{" "}
                <p className="text-muted-foreground leading-relaxed">
                  {" "}
                  <strong className="text-foreground italic">
                    Prisão Interior
                  </strong>{" "}
                  é o primeiro livro de Evaldo de Jesus Santana — um mergulho
                  corajoso nas grades invisíveis que construímos dentro de nós
                  mesmos. Escrito como um ato de libertação pessoal, cada poema
                  é uma chave que abre uma porta diferente do labirinto
                  interior.{" "}
                </p>{" "}
                <p className="text-muted-foreground leading-relaxed">
                  {" "}
                  Foi nestas páginas que nasceu a pergunta que mudaria tudo:{" "}
                  <em className="text-foreground">
                    "Quando se olha no espelho, o que é que você vê?"
                  </em>{" "}
                  — a semente que germinaria na metodologia P.A.D.H. e em toda a
                  Poesia Cognitiva Hipnótica.{" "}
                </p>{" "}
                <p className="text-muted-foreground leading-relaxed">
                  {" "}
                  O livro explora temas como autoengano, medo, liberdade,
                  identidade e o poder transformador da palavra poética —
                  revelando que a maior prisão não tem muros: mora nos
                  pensamentos que repetimos sem questionar.{" "}
                </p>{" "}
                <blockquote className="poem-block">
                  {" "}
                  <p className="poem-text text-foreground/80">
                    {" "}
                    Não são os muros que nos prendem,
                    <br /> são os espelhos que nos mentem.
                    <br /> Quando a poesia limpa o vidro,
                    <br /> o reflexo finalmente nos reconhece.{" "}
                  </p>{" "}
                  <cite className="text-sm text-primary/70 mt-3 block not-italic">
                    — Evaldo de Jesus Santana, Prisão Interior
                  </cite>{" "}
                </blockquote>{" "}
                <div className="flex flex-wrap gap-3 pt-2">
                  {" "}
                  <a
                    href="https://www.amazon.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary-dark"
                    >
                      {" "}
                      <ShoppingCart className="mr-2 spiritual-icon" /> Adquirir
                      o Livro{" "}
                    </Button>{" "}
                  </a>{" "}
                  <Link to="/livro-curso">
                    {" "}
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/30 text-foreground hover:bg-primary/5"
                    >
                      {" "}
                      Conhecer o Livro-Curso PCH{" "}
                      <ArrowRight className="ml-2 spiritual-icon" />{" "}
                    </Button>{" "}
                  </Link>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Jornada Cronológica */}
      <section className="section-padding border-t border-border/20 relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-mesh" />{" "}
        <div
          ref={journeySection.ref}
          className={`relative container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            journeySection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
            <div className="section-header">
              {" "}
              <p className="section-label">Trajetória</p>{" "}
              <h2 className="section-title"> Uma jornada de dedicação </h2>{" "}
              <div className="section-divider" />{" "}
            </div>{" "}
            <div className="space-y-5">
              {" "}
              {[
                {
                  icon: (
                    <Feather className="spiritual-icon spiritual-icon-lg" />
                  ),
                  title: "Primeiras Escritas Terapêuticas",
                  desc: "Evaldo começa a usar poesia nos atendimentos, percebendo que versos escritos com intencionalidade provocam mudanças emocionais profundas nos clientes.",
                },
                {
                  icon: <Brain className="spiritual-icon spiritual-icon-lg" />,
                  title: "Fundamentação Neurocientífica",
                  desc: "Estudo aprofundado em neurociência cognitiva, hipnose ericksoniana e linguística — conectando os efeitos observados com evidências científicas sobre processamento linguístico e neuroplasticidade.",
                },
                {
                  icon: (
                    <BookOpen className="spiritual-icon spiritual-icon-lg" />
                  ),
                  title: "Nascimento da PCH",
                  desc: "Sistematização formal da Poesia Cognitiva Hipnótica como metodologia — unindo poesia, cognição e hipnose num modelo replicável e ensinável.",
                },
                {
                  icon: <Award className="spiritual-icon spiritual-icon-lg" />,
                  title: "Criação do P.A.D.H.",
                  desc: "Desenvolvimento da Poesia Aplicada ao Desenvolvimento Humano em suas 4 fases fundamentais.",
                },
                {
                  icon: <Users className="spiritual-icon spiritual-icon-lg" />,
                  title: "Formação de Novos Terapeutas-Poetas",
                  desc: "Lançamento da Formação em PCH, capacitando psicólogos, terapeutas e educadores a utilizar a poesia como ferramenta clínica rigorosa e transformadora.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 p-6 rounded-xl border border-border/50 bg-card/30 group hover:border-primary/20 transition-all duration-300"
                >
                  {" "}
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/15 transition-colors spiritual-icon">
                    {" "}
                    {item.icon}
                  </div>{" "}
                  <div>
                    {" "}
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>{" "}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>{" "}
                  </div>{" "}
                </div>
              ))}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Metodologia PCH */}
      <section className="section-padding border-t border-border/20 bg-primary/[0.01]">
        {" "}
        <div className="container mx-auto px-6 md:px-8">
          {" "}
          <div className="max-w-4xl mx-auto">
            {" "}
            <div className="section-header">
              {" "}
              <p className="section-label">Metodologia</p>{" "}
              <h2 className="section-title"> A Essência PCH </h2>{" "}
              <p className="section-subtitle italic">
                "Poesia Cognitiva Hipnótica" — uma jornada
                estruturada em três pilares fundamentais para a transformação
                da consciência.{" "}
              </p>{" "}
            </div>{" "}
            <div className="grid md:grid-cols-3 gap-6">
              {" "}
              {[
                {
                  phase: "P: Poesia",
                  title: "O Meio Sensível",
                  desc: "O uso da palavra como som, ritmo e imagem para acessar o sentir. Através de poemas de 'aterramento', preparamos o terreno da consciência para receber a mudança, contornando as defesas racionais.",
                },
                {
                  phase: "C: Cognitiva",
                  title: "A Racionalidade Poética",
                  desc: "A transição da arte pura para a reestruturação mental. O foco na expansão da consciência e na resiliência, onde novos significados brotam a partir das metáforas instaladas no inconsciente.",
                },
                {
                  phase: "H: Hipnótica",
                  title: "A Libertação Integral",
                  desc: "O estado de fluxo e a hipnose ericksoniana a serviço da cura. A fase de integração onde a nova percepção é incorporada à identidade, promovendo autonomia e evolução pessoal.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="glass-card p-8 rounded-2xl space-y-4 border border-primary/10 hover:border-primary/30 transition-all group"
                >
                  {" "}
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    {" "}
                    {step.phase}
                  </div>{" "}
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {" "}
                    {step.title}
                  </h3>{" "}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {" "}
                    {step.desc}
                  </p>{" "}
                </div>
              ))}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="section-padding border-t border-border/20">
        {" "}
        <div
          ref={pillarsSection.ref}
          className={`container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            pillarsSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {" "}
          <div className="max-w-5xl mx-auto">
            {" "}
            <div className="section-header">
              {" "}
              <p className="section-label">Filosofia</p>{" "}
              <h2 className="section-title"> Pilares da Visão de Evaldo </h2>{" "}
              <div className="section-divider" />{" "}
            </div>{" "}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {" "}
              {[
                {
                  icon: (
                    <Heart className="spiritual-icon spiritual-icon-xl spiritual-icon" />
                  ),
                  title: "A Dor como Portal",
                  desc: "O sofrimento não é um inimigo a ser eliminado, mas um mensageiro que carrega convites de transformação. A PCH ensina a escutar esses convites.",
                },
                {
                  icon: (
                    <Sparkles className="spiritual-icon spiritual-icon-xl spiritual-icon" />
                  ),
                  title: "Beleza como Cura",
                  desc: "A experiência estética reorganiza o sistema nervoso. A beleza da poesia não é acessório — é o princípio ativo da intervenção terapêutica.",
                },
                {
                  icon: (
                    <Brain className="spiritual-icon spiritual-icon-xl spiritual-icon" />
                  ),
                  title: "Ciência e Alma",
                  desc: "Rigor científico e sensibilidade espiritual não são opostos. A PCH navega com pés na neurociência e olhos na transcendência.",
                },
                {
                  icon: (
                    <BookOpen className="spiritual-icon spiritual-icon-xl spiritual-icon" />
                  ),
                  title: "Palavra como Remédio",
                  desc: "Cada palavra carrega uma frequência, uma intenção, um potencial de cura. A escolha precisa de cada termo é um ato de responsabilidade terapêutica.",
                },
                {
                  icon: (
                    <Users className="spiritual-icon spiritual-icon-xl spiritual-icon" />
                  ),
                  title: "Democratizar a Profundidade",
                  desc: "A transformação interior não deve ser privilégio de poucos. A PCH cria pontes para que qualquer pessoa possa acessar seu potencial mais profundo.",
                },
                {
                  icon: (
                    <Feather className="spiritual-icon spiritual-icon-xl spiritual-icon" />
                  ),
                  title: "O Inconsciente como Coautor",
                  desc: "O terapeuta-poeta não impõe — convida. O inconsciente do leitor é coautor da experiência, completando os sentidos que os versos sugerem.",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-border/50 bg-card/50 hover:border-primary/20 transition-all duration-300"
                >
                  {" "}
                  <CardContent className="p-6 space-y-4">
                    {" "}
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                      {" "}
                      {item.icon}
                    </div>{" "}
                    <h4 className="font-heading font-semibold text-foreground text-lg">
                      {item.title}
                    </h4>{" "}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>{" "}
                  </CardContent>{" "}
                </Card>
              ))}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Missão e Visão */}
      <section className="section-padding border-t border-border/20 relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-glow" />{" "}
        <div
          ref={missionSection.ref}
          className={`relative container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            missionSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {" "}
          <div className="max-w-3xl mx-auto text-center space-y-12">
            {" "}
            <div>
              {" "}
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">
                Missão
              </p>{" "}
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                "Devolver à humanidade o direito de se curar pela beleza."{" "}
              </h2>{" "}
              <p className="text-muted-foreground leading-relaxed">
                {" "}
                Evaldo acredita que a poesia é a forma mais antiga e mais
                sofisticada de terapia da alma. Sua missão é devolver essa
                ferramenta ao mundo — agora com a precisão da ciência moderna e
                a profundidade da tradição espiritual.{" "}
              </p>{" "}
            </div>{" "}
            <blockquote className="poem-block text-left max-w-lg mx-auto">
              {" "}
              <p className="poem-text text-foreground/80">
                {" "}
                Não escrevo versos para impressionar.
                <br /> Escrevo para que algo dentro de quem lê
                <br /> se lembre de que já sabia voar.{" "}
              </p>{" "}
              <cite className="text-sm text-primary/70 mt-3 block not-italic">
                — Evaldo de Jesus Santana
              </cite>{" "}
            </blockquote>{" "}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              {" "}
              <Link to="/formacao">
                {" "}
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark px-8"
                >
                  {" "}
                  Formação em PCH{" "}
                  <ArrowRight className="ml-2 spiritual-icon" />{" "}
                </Button>{" "}
              </Link>{" "}
              <Link to="/contato">
                {" "}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-primary/30 text-foreground hover:bg-primary/5 px-8"
                >
                  {" "}
                  Entre em Contato{" "}
                </Button>{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Valores e Ética */}
      <section className="section-padding border-t border-border/20 bg-secondary/[0.02]">
        {" "}
        <div className="container mx-auto px-6 md:px-8">
          {" "}
          <div className="max-w-4xl mx-auto text-center">
            {" "}
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-12">
              Compromisso com o Rigor e a Sensibilidade
            </h3>{" "}
            <div className="grid sm:grid-cols-3 gap-8 text-left">
              {" "}
              {[
                {
                  title: "Rigor Científico",
                  desc: "Baseamos nossas práticas em estudos de neurociência e linguística cognitiva para garantir eficácia e segurança.",
                },
                {
                  title: "Respeito ao Inconsciente",
                  desc: "Nossa abordagem é não-invasiva, honrando o tempo e os portais simbólicos de cada indivíduo.",
                },
                {
                  title: "Beleza Ética",
                  desc: "Acreditamos que a estética poética é um direito humano e um caminho legítimo de saúde integral.",
                },
              ].map((v, i) => (
                <div key={i} className="space-y-3">
                  {" "}
                  <div className="w-10 h-px bg-primary/40 mb-4" />{" "}
                  <h4 className="font-heading font-semibold text-primary">
                    {v.title}
                  </h4>{" "}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>{" "}
                </div>
              ))}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </PageLayout>
  );
};
export default Sobre;
