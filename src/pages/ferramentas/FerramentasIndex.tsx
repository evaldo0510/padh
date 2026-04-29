import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Feather,
  Anchor,
  Eye,
  PenTool,
  Drama,
  RefreshCw,
  Flame,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { pagesSEO } from "@/lib/seo-config";
const FerramentasIndex = () => {
  const toolsAnim = useScrollAnimation(0.15);
  const ferramentas = [
    {
      numero: 1,
      icon: <Feather className="spiritual-icon spiritual-icon-lg" />,
      titulo: "Poema-Funil",
      subtitulo: "A Espiral da Palavra que Desce",
      descricao:
        "Induzir uma jornada interna progressiva, do externo ao mais profundo. Pré-transe poético que ativa o hemisfério direito do cérebro.",
      verso:
        '"Começo com o que se vê. Sigo com o que se sente. Termino com o que não se diz."',
      link: "/ferramentas/poema-funil",
    },
    {
      numero: 2,
      icon: <Anchor className="spiritual-icon spiritual-icon-lg" />,
      titulo: "Verso-Gatilho",
      subtitulo: "A Palavra-Chave que Liberta",
      descricao:
        "Criar uma âncora emocional rápida — um verso memorável que funciona como botão de emergência emocional.",
      verso: '"Eu não sou o que me prende, sou o que se solta depois."',
      link: "/ferramentas/verso-gatilho",
    },
    {
      numero: 3,
      icon: <Eye className="spiritual-icon spiritual-icon-lg" />,
      titulo: "Poemadiagnóstico",
      subtitulo: "O Espelho Emocional",
      descricao:
        "Identificar a paisagem emocional do cliente por meio da escolha espontânea entre poemas — o inconsciente revela sem constrangimento.",
      verso: '"Qual desses poemas te escolhe hoje?"',
      link: "/ferramentas/poemadiagnostico",
    },
    {
      numero: 4,
      icon: <PenTool className="spiritual-icon spiritual-icon-lg" />,
      titulo: "Caderno de Voz Interna",
      subtitulo: "O Diário do Oráculo",
      descricao:
        "Transformar o cliente em autor de sua própria escuta. Escrita livre guiada por estímulos poéticos como ferramenta de autoconhecimento.",
      verso: '"O que você escreveu hoje é o que seu silêncio gritou por anos?"',
      link: "/ferramentas/caderno-voz-interna",
    },
    {
      numero: 5,
      icon: <Drama className="spiritual-icon spiritual-icon-lg" />,
      titulo: "Encenação Poética Interna",
      subtitulo: "O Teatro dos Eus",
      descricao:
        "Colocar partes internas em cena, permitindo que dialoguem, briguem e se escutem através de poemas-diálogo.",
      verso:
        '"— Eu quero sair. — E se for pior lá fora? — E se for melhor e eu nunca souber?"',
      link: "/ferramentas/encenacao-poetica",
    },
    {
      numero: 6,
      icon: <RefreshCw className="spiritual-icon spiritual-icon-lg" />,
      titulo: "Reescrita Poética de Narrativas",
      subtitulo: "O Alquimista do Passado",
      descricao:
        "Modificar narrativas traumáticas traduzindo-as em linguagem simbólica e ressignificadora. A dor não é negada — é alquimizada.",
      verso: '"Fiquei com os espaços vazios que ele não soube preencher."',
      link: "/ferramentas/reescrita-poetica",
    },
    {
      numero: 7,
      icon: <Flame className="spiritual-icon spiritual-icon-lg" />,
      titulo: "Ritual do Silêncio Poético",
      subtitulo: "A Vela que Fecha a Caverna",
      descricao:
        "Fechar sessões com sacralidade — criar uma impressão emocional duradoura que ritualiza o processo terapêutico.",
      verso:
        '"Se uma só palavra tua pudesse morar em mim, qual você deixaria?"',
      link: "/ferramentas/ritual-silencio",
    },
    {
      numero: 8,
      icon: <Sparkles className="spiritual-icon spiritual-icon-lg" />,
      titulo: "Poesia Hipnótica",
      subtitulo: "O Poder das Palavras",
      descricao:
        "A PCH combina linguagem sugestiva, metáforas e afirmações para reformular padrões mentais limitantes e estimular mudanças emocionais positivas.",
      verso:
        '"Combinando a palavra com intenção e ritmo, criamos um espaço para o florescimento de novas possibilidades."',
      link: "/ferramentas/poesia-hipnotica",
    },
  ];
  return (
    <PageLayout seo={pagesSEO.ferramentas} currentPage="Ferramentas P.A.D.H.">
      {" "}
      {/* Hero */}
      <section className="relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-glow" />{" "}
        <div className="relative container mx-auto px-6 py-20 text-center">
          {" "}
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            {" "}
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">
              8 Instrumentos Vivos
            </p>{" "}
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              {" "}
              Ferramentas{" "}
              <span className="text-primary italic">P.A.D.H.</span>{" "}
            </h1>{" "}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
              {" "}
              Cada ferramenta é um nome simbólico, um objetivo terapêutico, um
              modo de uso prático — instrumentos vivos como arquétipos em ação
              dentro da alma do leitor-terapeuta.{" "}
            </p>{" "}
            <div className="poem-block max-w-md mx-auto">
              {" "}
              <p className="poem-text text-sm text-muted-foreground">
                {" "}
                A arte de transformar palavras
                <br /> em portais de liberdade interior.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Lista de Ferramentas */}
      <section className="section-padding border-t border-border/20">
        {" "}
        <div
          ref={toolsAnim.ref}
          className={`container mx-auto px-6 md:px-8 transition-all duration-1000 ${
            toolsAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {" "}
          <div className="max-w-4xl mx-auto space-y-5">
            {" "}
            {ferramentas.map((tool) => (
              <Link key={tool.numero} to={tool.link} className="block group">
                {" "}
                <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-medium">
                  {" "}
                  <CardContent className="p-6">
                    {" "}
                    <div className="flex items-start gap-5">
                      {" "}
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        {" "}
                        {tool.icon}
                      </div>{" "}
                      <div className="flex-1 min-w-0">
                        {" "}
                        <div className="flex items-center gap-3 mb-1">
                          {" "}
                          <span className="text-xs text-primary font-medium">
                            #{tool.numero}
                          </span>{" "}
                          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {" "}
                            {tool.titulo}
                          </h3>{" "}
                        </div>{" "}
                        <p className="text-sm text-primary/70 mb-2 italic">
                          {tool.subtitulo}
                        </p>{" "}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {tool.descricao}
                        </p>{" "}
                        <div className="poem-block py-2">
                          {" "}
                          <p className="poem-text text-xs text-muted-foreground italic">
                            {tool.verso}
                          </p>{" "}
                        </div>{" "}
                        <div className="flex items-center text-sm text-primary/70 group-hover:text-primary transition-colors mt-3">
                          {" "}
                          Explorar ferramenta{" "}
                          <ArrowRight className="ml-1 spiritual-icon spiritual-icon-sm group-hover:translate-x-1 transition-transform" />{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </CardContent>{" "}
                </Card>{" "}
              </Link>
            ))}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Como Usar */}
      <section className="section-padding border-t border-border/20 relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 gradient-warm" />{" "}
        <div className="relative container mx-auto px-6 md:px-8">
          {" "}
          <div className="max-w-3xl mx-auto text-center">
            {" "}
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">
              Aplicação
            </p>{" "}
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
              Como Usar as Ferramentas?
            </h2>{" "}
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {" "}
              {[
                "Em sessões únicas, como ponto de virada",
                "Em jornadas com 6 a 12 encontros",
                "Em oficinas, cursos e atendimentos em grupo",
                "Em livros, diários e caixinhas de cartas poéticas",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-card/50"
                >
                  {" "}
                  <span className="text-primary font-bold text-lg">
                    {i + 1}
                  </span>{" "}
                  <p className="text-sm text-muted-foreground">{item}</p>{" "}
                </div>
              ))}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </PageLayout>
  );
};
export default FerramentasIndex;
