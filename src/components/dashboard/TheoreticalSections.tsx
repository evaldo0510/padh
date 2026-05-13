import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Target, Feather, Brain, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TheoreticalSections = () => {
  const indexItems = [
    { id: "theory-intro", label: "Fundamentação" },
    { id: "methodology-pillars", label: "Metodologia" },
    { id: "clinical-tools", label: "Ferramentas" },
    { id: "science-neuro", label: "Ciência & Poesia" },
    { id: "journey-guide", label: "Guia de Jornada" },
  ];

  const ferramentas = [
// ... keep existing code
    {
      icon: <Star className="w-5 h-5" />,
      title: "Aula Exclusiva",
      desc: "Uma aula teórico-vivencial sobre neurociência da leitura.",
      link: "/aula-exclusiva",
    },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="space-y-32 animate-fade-in" id="theoretical-foundations">
      {/* Table of Contents / Index */}
      <nav className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 py-4 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
        <div className="flex items-center gap-4 md:justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 whitespace-nowrap">Índice:</span>
          {indexItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-primary transition-colors whitespace-nowrap border border-white/5 hover:border-primary/20 px-3 py-1.5 rounded-full"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 0. Fundamentação Teórica */}
      <section id="theory-intro" className="space-y-12 scroll-mt-40">
        <div className="flex flex-col gap-2 px-1">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Fundamentação Teórica</h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary/60">O embasamento científico e fenomenológico da PCH</p>
        </div>
        
        <div className="space-y-12">
          <div className="glass-card p-8 md:p-16 bg-white/[0.02] border-white/5 space-y-10">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-primary tracking-tight">Neurociência e Poesia</h3>
                  <p className="text-lg text-white/60 leading-relaxed font-light">
                    A Poesia Cognitiva Hipnótica (PCH) baseia-se em estudos de neuroestética que demonstram como a linguagem metafórica ativa áreas do córtex pré-frontal e do sistema límbico simultaneamente. Esta ativação permite que a "lógica emocional" seja processada de forma mais eficaz do que através do discurso racional puro.
                  </p>
                </div>
                
                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 italic text-lg text-white/50 relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">"</span>
                  A metáfora não é apenas um ornamento da linguagem, mas uma ferramenta fundamental da mente para organizar a experiência subjetiva. É através da imagem que o cérebro traduz o indizível em sentido.
                </div>
                
                <p className="text-white/40 leading-relaxed">
                  Pesquisas recentes indicam que a leitura de poesia estimula o "Default Mode Network" (DMN), associado à introspecção e à construção do self, favorecendo processos de cura emocional profunda e autoconhecimento.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-primary tracking-tight">O Fenômeno Hipnótico</h3>
                  <p className="text-lg text-white/60 leading-relaxed font-light">
                    Utilizamos a Hipnose Ericksoniana como base para a comunicação com o inconsciente. Através de padrões de linguagem permissivos e sugestões indiretas inseridas nos versos, contornamos o "fator crítico" da mente consciente.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { t: "Flow State", d: "Acesso ao estado de fluxo onde a cura ocorre naturalmente." },
                    { t: "Sugestão Indireta", d: "Uso de metáforas que o inconsciente absorve sem resistência." },
                    { t: "Ancoragem", d: "Fixação de novos estados emocionais positivos através de gatilhos verbais." },
                    { t: "Ressignificação", d: "Mudança do peso emocional de memórias passadas via linguagem simbólica." }
                  ].map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                      <h4 className="text-sm font-black uppercase tracking-widest text-primary/80">{item.t}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Metodologia */}
      <section id="methodology-pillars" className="space-y-12 scroll-mt-40">
        <div className="flex flex-col gap-2 px-1">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">A Metodologia</h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary/60">Os 3 Pilares Estruturais da PCH</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            { t: "Poesia", c: "O uso da palavra como som, ritmo e imagem para acessar o sentir e contornar as defesas racionais do ego.", p: "P", color: "from-purple-500/20 to-transparent" },
            { t: "Cognitiva", c: "Ressignificação de crenças e padrões mentais através da ciência da consciência e da reestruturação semântica.", p: "C", color: "from-blue-500/20 to-transparent" },
            { t: "Hipnótica", c: "Condução à libertação emocional e ao transe terapêutico através da linguagem sugestiva e rítmica.", p: "H", color: "from-emerald-500/20 to-transparent" }
          ].map((item, i) => (
            <div key={i} className={`glass-card p-10 space-y-6 bg-gradient-to-br ${item.color} border-white/5 relative overflow-hidden group`}>
              <div className="absolute -right-4 -bottom-4 text-[12rem] font-black text-white/[0.02] select-none group-hover:text-white/[0.04] transition-colors">{item.p}</div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl border border-primary/20 relative z-10">
                {item.p}
              </div>
              <div className="space-y-3 relative z-10">
                <h4 className="text-2xl font-bold text-white tracking-tight">{item.t}</h4>
                <p className="text-white/50 leading-relaxed font-light">{item.c}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Ferramentas */}
      <section id="clinical-tools" className="space-y-12 scroll-mt-40">
        <div className="flex flex-col gap-2 px-1">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Instrumentos Clínicos</h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary/60">8 Ferramentas vivas para aplicação prática</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ferramentas.map((tool, i) => (
            <Link key={i} to={tool.link} className="group">
              <Card className="h-full border-white/5 hover:border-primary/30 transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.04] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                <CardContent className="p-10 space-y-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700 border border-primary/10 shadow-lg shadow-primary/5">
                    {tool.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">{tool.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed font-light line-clamp-3">{tool.desc}</p>
                  </div>
                  <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 group-hover:text-primary transition-colors pt-4 border-t border-white/5">
                    Explorar Método <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Ciência */}
      <section id="science-neuro" className="space-y-12 scroll-mt-40">
        <div className="flex flex-col gap-2 px-1">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Ciência & Poesia</h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary/60">A base acadêmica e os estudos da consciência</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Neuroestética", desc: "Como o cérebro processa o belo e a harmonia rítmica." },
            { title: "Psicologia Cognitiva", desc: "Mapas mentais e a reestruturação da percepção de realidade." },
            { title: "Linguística", desc: "A semântica das emoções e o poder evocativo do vocabulário." },
            { title: "Fenomenologia", desc: "A experiência subjetiva do ser através da palavra viva." },
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 space-y-4 bg-white/[0.02] border-white/5 hover:border-primary/20 transition-colors">
              <h4 className="text-lg font-bold text-primary tracking-tight">{item.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Guia de Jornada */}
      <section id="journey-guide" className="space-y-12 scroll-mt-40">
        <div className="flex flex-col gap-2 px-1">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Caminhos de Estudo</h2>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary/60">Escolha como aprofundar seu conhecimento na PCH</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-10">
          {[
            { title: "Livro-Curso", subtitle: "Experiência Pessoal", desc: "A porta de entrada para quem busca vivenciar o método na própria vida.", link: "/livro-curso" },
            { title: "Curso PCH", subtitle: "Manual do Método", desc: "O repositório técnico definitivo para entender a mecânica da PCH.", link: "/curso-padh", highlight: true },
            { title: "Formação", subtitle: "Profissional", desc: "Capacitação clínica para quem deseja ser um facilitador da metodologia.", link: "/formacao" },
          ].map((item, i) => (
            <div key={i} className={`p-12 rounded-[2.5rem] border-2 transition-all duration-700 ${item.highlight ? 'bg-primary/5 border-primary/20 scale-105 shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)]' : 'bg-white/[0.01] border-white/5 opacity-60 hover:opacity-100 hover:border-white/10'}`}>
              <div className="mb-8">
                <h3 className="text-3xl font-black tracking-tighter text-white">{item.title}</h3>
                <p className="text-primary text-xs font-black uppercase tracking-[0.2em] mt-1">{item.subtitle}</p>
              </div>
              <p className="text-white/40 leading-relaxed font-light mb-10 text-lg">{item.desc}</p>
              <Link to={item.link}>
                <button className={`w-full py-4 rounded-full font-black uppercase tracking-widest text-[11px] transition-all shadow-xl active:scale-95 ${item.highlight ? 'bg-primary text-white hover:bg-primary/80' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                  Ver Detalhes
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