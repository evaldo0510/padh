import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Target, Feather, Brain, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TheoreticalSections = () => {
  const ferramentas = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Livro-Curso",
      desc: "Mergulhe na teoria e prática da PCH com exercícios guiados.",
      link: "/livro-curso",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Formação PCH",
      desc: "Capacitação completa para terapeutas e educadores.",
      link: "/formacao",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Curso PCH",
      desc: "O manual técnico completo da metodologia e neurociência.",
      link: "/curso-padh",
    },
    {
      icon: <Feather className="w-5 h-5" />,
      title: "8 Ferramentas",
      desc: "Do Poema-Funil à Poesia Hipnótica — 8 instrumentos vivos.",
      link: "/ferramentas",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Mapa Cerebral",
      desc: "Descubra como cada verso ativa áreas específicas do cérebro.",
      link: "/mapa-cerebral",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Aula Exclusiva",
      desc: "Uma aula teórico-vivencial sobre neurociência da leitura.",
      link: "/aula-exclusiva",
    },
  ];

  return (
    <div className="space-y-24 animate-fade-in">
      {/* 0. Fundamentação Teórica */}
      <section className="space-y-10">
        <div className="flex flex-col gap-1.5 px-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">Fundamentação Teórica</h2>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30">O embasamento científico da PCH</p>
        </div>
        
        <div className="glass-card p-8 md:p-12 bg-white/[0.02] border-white/5 space-y-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">Neurociência e Poesia</h3>
              <p className="text-white/60 leading-relaxed font-light">
                A Poesia Cognitiva Hipnótica (PCH) baseia-se em estudos de neuroestética que demonstram como a linguagem metafórica ativa áreas do córtex pré-frontal e do sistema límbico simultaneamente. Esta ativação dupla permite que a "lógica emocional" seja processada de forma mais eficaz do que através do discurso racional puro.
              </p>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 italic text-sm text-white/50">
                "A metáfora não é apenas um ornamento da linguagem, mas uma ferramenta fundamental da mente para organizar a experiência subjetiva."
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">O Fenômeno Hipnótico</h3>
              <p className="text-white/60 leading-relaxed font-light">
                Utilizamos a Hipnose Ericksoniana como base para a comunicação com o inconsciente. Através de padrões de linguagem permissivos e sugestões indiretas inseridas nos versos, contornamos o "fator crítico" da mente consciente, permitindo que as sementes da mudança emocional germinem em solo fértil.
              </p>
              <ul className="space-y-3">
                {[
                  "Acesso ao estado de fluxo (Flow)",
                  "Redução do ruído mental cognitivo",
                  "Ancoragem de novos estados emocionais",
                  "Ressignificação simbólica de traumas"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-white/40 font-bold uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Metodologia */}
      <section className="space-y-10">
        <div className="flex flex-col gap-1.5 px-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">A Metodologia</h2>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30">Os 3 Pilares da PCH</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Poesia", c: "O uso da palavra como som, ritmo e imagem para acessar o sentir.", p: "P" },
            { t: "Cognitiva", c: "Ressignificação de crenças e padrões mentais através da metáfora.", p: "C" },
            { t: "Hipnótica", c: "Condução à libertação emocional através da linguagem sugestiva.", p: "H" }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 space-y-4 bg-white/[0.02] border-white/5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm border border-primary/20">
                {item.p}
              </div>
              <h4 className="text-xl font-bold text-white">{item.t}</h4>
              <p className="text-sm text-white/40 leading-relaxed font-light">{item.c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Ferramentas */}
      <section className="space-y-10">
        <div className="flex flex-col gap-1.5 px-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">Explore Ferramentas</h2>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30">Caminhos de acesso ao interior</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ferramentas.map((tool, i) => (
            <Link key={i} to={tool.link} className="group">
              <Card className="h-full border-white/5 hover:border-primary/30 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.04]">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-primary/10">
                    {tool.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{tool.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed font-light line-clamp-2">{tool.desc}</p>
                  </div>
                  <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors pt-2">
                    Acessar <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Ciência */}
      <section className="space-y-10">
        <div className="flex flex-col gap-1.5 px-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">Ciência & Poesia</h2>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30">Fundamentos da neurociência</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Neurociência", desc: "Leitura poética estimula áreas cerebrais fundamentais." },
            { title: "Hipnose", desc: "Abordagem ericksoniana para transformação profunda." },
            { title: "Narrativa", desc: "Transformar relatos de vida em poesia curativa." },
            { title: "Linguística", desc: "Metáforas como estruturas fundamentais do pensamento." },
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 space-y-3 bg-white/[0.02] border-white/5">
              <h4 className="font-bold text-primary">{item.title}</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Guia de Jornada */}
      <section className="space-y-10">
        <div className="flex flex-col gap-1.5 px-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">Guia de Jornada</h2>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30">Escolha seu nível de aprofundamento</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Livro-Curso", subtitle: "A Experiência Pessoal", desc: "Ideal para autotransformação e vivência prática.", link: "/livro-curso" },
            { title: "Curso PCH", subtitle: "O Manual Técnico", desc: "Base teórica e o 'como fazer' da metodologia.", link: "/curso-padh", highlight: true },
            { title: "Formação", subtitle: "Nível Profissional", desc: "Capacitação para terapeutas com certificação.", link: "/formacao" },
          ].map((item, i) => (
            <div key={i} className={`p-10 rounded-[2rem] border-2 transition-all duration-500 ${item.highlight ? 'bg-primary/5 border-primary/20 scale-105 shadow-glow' : 'bg-white/[0.02] border-white/5 opacity-60'}`}>
              <div className="mb-6">
                <h3 className="text-2xl font-black tracking-tighter text-white">{item.title}</h3>
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{item.subtitle}</p>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-light mb-8">{item.desc}</p>
              <Link to={item.link}>
                <button className={`w-full py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all ${item.highlight ? 'bg-primary text-white hover:bg-primary/80' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                  Explorar
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TheoreticalSections;