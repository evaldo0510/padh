import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { 
  Wind, Brain, PenTool, Sparkles, 
  Search, Heart, Shield, Compass,
  ChevronRight, ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { id: 'ansiedade', label: 'Ansiedade', icon: Wind, color: 'bg-blue-500/20 text-blue-400', desc: 'Práticas para calma e presença.' },
  { id: 'foco', label: 'Foco', icon: Brain, color: 'bg-amber-500/20 text-amber-400', desc: 'Clareza mental e concentração.' },
  { id: 'escrita', label: 'Escrita', icon: PenTool, color: 'bg-purple-500/20 text-purple-400', desc: 'Cura através da palavra.' },
  { id: 'reprogramacao', label: 'Identidade', icon: Sparkles, color: 'bg-emerald-500/20 text-emerald-400', desc: 'Fortalecimento do eu.' },
  { id: 'espiritualidade', label: 'Espiritual', icon: Heart, color: 'bg-rose-500/20 text-rose-400', desc: 'Conexão com o sagrado.' },
  { id: 'coragem', label: 'Coragem', icon: Shield, color: 'bg-orange-500/20 text-orange-400', desc: 'Enfrentamento de medos.' },
];

const Explorar = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      seo={{
        title: "Explorar — PCH",
        description: "Descubra novas práticas e categorias terapêuticas.",
        path: "/explorar",
      }}
      currentPage="Explorar"
      showBackButton={false}
      hideHeader
    >
      <div className="streaming-container py-24 space-y-16 min-h-screen">
        <header className="max-w-2xl space-y-6">
           <Badge variant="outline" className="border-primary/20 text-primary py-1 px-4 uppercase tracking-[0.2em] font-black text-[10px] rounded-full">
              Catálogo Completo
           </Badge>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">Explorar</h1>
           <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Buscar por sentimento, prática ou ferramenta..." 
                className="h-16 pl-16 bg-white/5 border-white/5 rounded-2xl text-lg focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all"
              />
           </div>
        </header>

        <section className="space-y-8">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold tracking-tight">Categorias em Destaque</h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card p-8 flex flex-col justify-between h-64 cursor-pointer group"
                  onClick={() => navigate('/jornada')}
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-4 rounded-2xl ${cat.color}`}>
                       <cat.icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{cat.label}</h3>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{cat.desc}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        <section className="space-y-8">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">Coleções Originais</h2>
              </div>
              <button className="text-xs font-black uppercase tracking-[0.2em] text-primary hover:underline">Ver Todas</button>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: 'Ritual do Amanhã', items: '12 sessões', color: 'bg-blue-500' },
                { title: 'Sombra e Luz', items: '8 sessões', color: 'bg-purple-500' },
                { title: 'Voz Interior', items: '15 sessões', color: 'bg-amber-500' },
                { title: 'Travessia Poética', items: '10 sessões', color: 'bg-emerald-500' },
              ].map((coll, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-[3/4] relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5"
                >
                   <div className={`absolute inset-0 opacity-20 ${coll.color}`} />
                   <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                   <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{coll.items}</span>
                      <h4 className="text-xl font-bold text-white leading-tight">{coll.title}</h4>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Explorar;
