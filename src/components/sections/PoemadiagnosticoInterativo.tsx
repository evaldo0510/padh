import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ArrowRight, Shuffle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
const todosPoemas = [
  {
    id: "medo",
    tema: "Medo",
    verso:
      "Guardo embaixo da língua\no grito que nunca saiu.\nTenho medo do eco —\ndo que ele pode acordar.",
    diagnostico:
      "Esse poema pode lembrar momentos em que algo ficou por dizer. Se fizer sentido para você, pergunte: o que eu gostaria de expressar e qual seria uma forma segura de fazê-lo? Se não combinar com sua experiência, deixe essa leitura de lado.",
    cor: "from-red-500/20 to-orange-500/10",
    borda: "border-red-400/30",
  },
  {
    id: "espera",
    tema: "Espera",
    verso:
      "Tenho um relógio que não marca horas —\nsó silêncios acumulados.\nEspero algo que já veio,\nmas não reconheci.",
    diagnostico:
      "A imagem da espera pode convidar você a observar onde sua atenção está hoje: no que já aconteceu, no que ainda não chegou ou no que está disponível agora. Não é uma conclusão sobre seu estado emocional; é uma pergunta para explorar.",
    cor: "from-blue-500/20 to-indigo-500/10",
    borda: "border-blue-400/30",
  },
  {
    id: "mudanca",
    tema: "Mudança",
    verso:
      "Troquei a gaiola aberta\npelo vento que ainda me assusta.\nNão sei se estou voando\nou apenas caindo bonito.",
    diagnostico:
      "Se a imagem da mudança tocar em algo seu, reflita: o que está mudando, o que ainda parece incerto e de que apoio você precisa? Você não precisa estar pronto para tudo nem avançar antes de se sentir seguro.",
    cor: "from-emerald-500/20 to-teal-500/10",
    borda: "border-emerald-400/30",
  },
  {
    id: "solidao",
    tema: "Solidão",
    verso:
      "Tenho gente ao redor\ne um deserto por dentro.\nMinha solidão não é falta de alguém —\né sobra de mim sem destino.",
    diagnostico:
      "O poema distingue estar acompanhado de sentir conexão. Se isso conversar com você, pense em que tipo de vínculo, descanso ou conversa faria diferença. A escolha do poema, sozinha, não define a causa nem a intensidade de uma possível solidão.",
    cor: "from-slate-500/20 to-zinc-500/10",
    borda: "border-slate-400/30",
  },
  {
    id: "gratidao",
    tema: "Gratidão",
    verso:
      "Hoje acordei e o sol\nnão pediu licença para entrar.\nEntendi que a vida\ntambém chega sem convite — e fica.",
    diagnostico:
      "A cena pode despertar atenção para algo simples que você valoriza. Se quiser, nomeie uma coisa concreta que trouxe conforto ou sentido hoje. Você não precisa sentir gratidão quando estiver sofrendo nem usar gratidão para negar dificuldades reais.",
    cor: "from-amber-500/20 to-yellow-500/10",
    borda: "border-amber-400/30",
  },
  {
    id: "renascimento",
    tema: "Renascimento",
    verso:
      "Morri tantas vezes por dentro\nque já perdi a conta das cinzas.\nMas hoje acordei com sementes\nonde antes só havia ferida.",
    diagnostico:
      "A imagem das sementes pode representar a possibilidade de mudança, mas não exige encontrar um lado positivo na dor. Se fizer sentido, pergunte o que você precisa para cuidar de si agora; a recuperação não tem prazo único.",
    cor: "from-violet-500/20 to-purple-500/10",
    borda: "border-violet-400/30",
  },
  {
    id: "luto",
    tema: "Luto",
    verso:
      "Carrego um nome que não posso chamar\nsem que o peito se parta ao meio.\nA saudade não diminui —\napenas aprende a respirar baixo.",
    diagnostico:
      "O poema oferece uma imagem para falar de saudade e perda. Se ela se aproximar da sua experiência, você pode lembrar o que gostaria de preservar dessa relação e de que apoio precisa hoje. Não há uma forma única nem um calendário obrigatório para viver o luto.",
    cor: "from-gray-500/20 to-stone-500/10",
    borda: "border-gray-400/30",
  },
  {
    id: "coragem",
    tema: "Coragem",
    verso:
      "Não é que o medo tenha ido embora —\né que aprendi a tremer de pé.\nCoragem não é ausência de abismo.\nÉ saltar sabendo que o chão é incerto.",
    diagnostico:
      "A imagem pode ajudar a pensar em uma atitude corajosa e realista. Pergunte: qual seria um passo pequeno, possível e seguro? Coragem não significa ignorar riscos nem enfrentar tudo sem apoio.",
    cor: "from-orange-500/20 to-red-500/10",
    borda: "border-orange-400/30",
  },
  {
    id: "perdao",
    tema: "Perdão",
    verso:
      "Devolvi a pedra que guardava\npara atirar em quem me feriu.\nMinhas mãos, agora vazias,\nfinalmente podem abraçar.",
    diagnostico:
      "O poema apresenta uma possibilidade de relação com a mágoa, não uma obrigação de perdoar. Você pode estabelecer limites, buscar reparação ou ainda não estar pronto para decidir. Perdoar não exige retomar contato nem minimizar o que aconteceu.",
    cor: "from-rose-500/20 to-pink-500/10",
    borda: "border-rose-400/30",
  },
];
function embaralhar<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
const PoemadiagnosticoInterativo = () => {
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [revelado, setRevelado] = useState(false);
  const [seed, setSeed] = useState(0);
  const poemas = useMemo(() => embaralhar(todosPoemas).slice(0, 3), [seed]);
  const poemaEscolhido = poemas.find((p) => p.id === selecionado);
  const resetar = () => {
    setSelecionado(null);
    setRevelado(false);
    setSeed((s) => s + 1);
  };
  return (
    <section className="py-20 border-t border-border/30 relative overflow-hidden">
      {" "}
      <div className="absolute inset-0 gradient-warm" /> <FloatingParticles />{" "}
      <div className="relative container mx-auto px-6">
        {" "}
        <div className="max-w-4xl mx-auto">
          {" "}
          <div className="text-center mb-10">
            {" "}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
              {" "}
              <Eye className="spiritual-icon spiritual-icon-sm" /> Experiência
              Interativa{" "}
            </div>{" "}
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              {" "}
              Qual poema te <span className="text-primary italic">
                escolhe
              </span>{" "}
              hoje?{" "}
            </h2>{" "}
            <p className="text-muted-foreground max-w-xl mx-auto">
              {" "}
              Não pense. Leia os três poemas abaixo e sinta qual deles fala por
              você neste momento.{" "}
            </p>{" "}
            <p className="text-xs text-muted-foreground max-w-xl mx-auto mt-3">
              Esta atividade é um exercício de reflexão poética, não um teste psicológico nem um diagnóstico. A escolha pode refletir preferências, lembranças ou o acaso; só você pode dizer o que faz sentido na sua experiência.
            </p>
          </div>{" "}
          {/* Poemas */}
          <AnimatePresence mode="wait">
            {" "}
            <motion.div
              key={seed}
              className="grid sm:grid-cols-3 gap-4 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {" "}
              {poemas.map((poema) => (
                <motion.button
                  key={poema.id}
                  onClick={() => {
                    setSelecionado(poema.id);
                    setRevelado(false);
                  }}
                  className="text-left w-full"
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 24,
                      scale: 0.95,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  {" "}
                  <Card
                    className={`h-full transition-all duration-500 cursor-pointer ${
                      selecionado === poema.id
                        ? `${poema.borda}
ring-2 ring-primary/30`
                        : "border-border/50 hover:border-primary/20"
                    }
${selecionado && selecionado !== poema.id ? "opacity-40" : ""}`}
                  >
                    {" "}
                    <CardContent className="p-5">
                      {" "}
                      <span className="text-xs uppercase tracking-widest text-primary font-medium">
                        {poema.tema}
                      </span>{" "}
                      <div className="mt-3 poem-block">
                        {" "}
                        <p className="poem-text text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                          {" "}
                          {poema.verso}
                        </p>{" "}
                      </div>{" "}
                    </CardContent>{" "}
                  </Card>{" "}
                </motion.button>
              ))}
            </motion.div>{" "}
          </AnimatePresence>{" "}
          {/* Resultado */}
          {selecionado && !revelado && (
            <motion.div
              className="text-center"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              {" "}
              <Button
                onClick={() => setRevelado(true)}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-dark"
              >
                {" "}
                Explorar uma possível leitura{" "}
                <ArrowRight className="ml-2 spiritual-icon" />{" "}
              </Button>{" "}
            </motion.div>
          )}
          {revelado && poemaEscolhido && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {" "}
              <Card
                className={`${poemaEscolhido.borda}
bg-gradient-to-br ${poemaEscolhido.cor}
backdrop-blur-sm`}
              >
                {" "}
                <CardContent className="p-8 text-center space-y-4">
                  {" "}
                  <p className="text-sm uppercase tracking-widest text-primary font-medium">
                    {" "}
                    Você escolheu: {poemaEscolhido.tema}
                  </p>{" "}
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {" "}
                    Uma leitura para refletir{" "}
                  </h3>{" "}
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                    {" "}
                    {poemaEscolhido.diagnostico}
                  </p>{" "}
                  <div className="poem-block max-w-sm mx-auto mt-4">
                    {" "}
                    <p className="poem-text text-sm text-foreground/70 italic">
                      "O poema que te escolhe revela o que a razão ainda
                      nega."{" "}
                    </p>{" "}
                  </div>{" "}
                  <Button
                    variant="outline"
                    onClick={resetar}
                    className="mt-4 border-primary/30 text-foreground hover:bg-primary/5"
                  >
                    {" "}
                    <Shuffle className="mr-2 spiritual-icon" /> Novos
                    poemas{" "}
                  </Button>{" "}
                </CardContent>{" "}
              </Card>{" "}
            </motion.div>
          )}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default PoemadiagnosticoInterativo;
