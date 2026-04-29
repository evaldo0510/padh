import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { CHANGELOG, APP_VERSION } from "@/lib/changelog";

const Changelog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Helmet>
        <title>Changelog — P.A.D.H.</title>
        <meta name="description" content="Histórico de atualizações e melhorias da plataforma P.A.D.H." />
      </Helmet>
      <div className="streaming-container pt-10 space-y-12 max-w-3xl">
        <header className="space-y-6">
          <Link to="/" className="text-white/40 hover:text-white text-sm inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Changelog</p>
            <h1 className="text-5xl font-bold tracking-tighter text-white italic">O que há de novo</h1>
            <p className="text-white/50">Versão atual: <span className="font-mono text-primary">{APP_VERSION}</span></p>
          </div>
        </header>

        <ol className="space-y-10 border-l border-white/10 pl-8">
          {CHANGELOG.map((entry, i) => (
            <motion.li
              key={entry.version}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[42px] top-2 w-3 h-3 rounded-full bg-primary shadow-glow shadow-primary/40" />
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="text-xl font-bold text-white font-mono">{entry.version}</h2>
                <span className="text-xs text-white/30">{entry.date}</span>
              </div>
              <ul className="space-y-2">
                {entry.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-white/70 leading-relaxed">
                    <Sparkles className="w-4 h-4 text-primary/60 shrink-0 mt-1" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Changelog;
