import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  Flame,
  Target,
  GraduationCap,
  Feather,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Compass,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useJornada } from "@/hooks/useJornada";
import { useAuth } from "@/hooks/useAuth";
import { useNavBadges } from "@/hooks/useNavBadges";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Button } from "@/components/ui/button";
import PrefetchLink from "@/components/layout/PrefetchLink";
import GlobalProgressBar from "./GlobalProgressBar";
import JourneyPhases from "@/components/jornada/JourneyPhases";

const greetingByHour = () => {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
};

const SHORTCUTS = [
  {
    to: "/jornada",
    label: "Continuar Jornada",
    desc: "Retome de onde parou",
    icon: Compass,
  },
  {
    to: "/ferramentas",
    label: "Ferramentas PCH",
    desc: "8 instrumentos vivos",
    icon: Feather,
  },
  {
    to: "/formacao",
    label: "Formação",
    desc: "Módulos técnicos",
    icon: GraduationCap,
  },
  {
    to: "/biblioteca",
    label: "Biblioteca",
    desc: "Exercícios e leituras",
    icon: BookOpen,
  },
  {
    to: "/dashboard",
    label: "Minha Evolução",
    desc: "Métricas e histórico",
    icon: TrendingUp,
  },
  {
    to: "/prontuario-pch",
    label: "Prontuário PCH",
    desc: "Ferramenta clínica",
    icon: Target,
  },
];

const UserWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jornada, nextSession } = useJornada();
  const badges = useNavBadges();

  const totalProgress = useMemo(() => {
    const total = JORNADA_DATA.reduce((acc, f) => acc + f.sessoes.length, 0);
    const done = jornada.completedSessions?.length || 0;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [jornada.completedSessions]);

  const firstName =
    user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "viajante";

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-32 overflow-x-hidden">
      <div className="streaming-container pt-8 md:pt-14 space-y-12 md:space-y-16">
        {/* Saudação */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2"
        >
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-primary/70">
            {greetingByHour()}
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.95]">
            Olá,{" "}
            <span className="text-primary italic capitalize">{firstName}</span>
          </h1>
          <p className="text-sm md:text-base text-white/50 max-w-xl">
            Seu espaço pessoal na jornada PCH. Continue de onde parou ou explore
            um novo caminho.
          </p>
        </motion.header>

        {/* Métricas rápidas */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-3 md:gap-4"
          aria-label="Suas métricas"
        >
          <StatCard
            icon={<Flame className="w-4 h-4" />}
            label="Sequência"
            value={`${badges.streak}`}
            suffix={badges.streak === 1 ? "dia" : "dias"}
            accent
          />
          <StatCard
            icon={<Sparkles className="w-4 h-4" />}
            label="Jornada"
            value={`${badges.jornadasPercent}%`}
          />
          <StatCard
            icon={<GraduationCap className="w-4 h-4" />}
            label="Formação"
            value={`${badges.formacaoCompleted}/${badges.formacaoTotal}`}
          />
        </motion.section>

        {/* Próxima prática */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionHeader
            eyebrow="Próxima prática"
            title={nextSession ? "Continue de onde parou" : "Jornada concluída"}
          />
          <div className="glass-card p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            {nextSession ? (
              <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70">
                    {nextSession.faseTitulo || nextSession.phaseId}
                  </p>
                  <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
                    {nextSession.titulo}
                  </h3>
                  {nextSession.descricao && (
                    <p className="text-sm text-white/50 line-clamp-2">
                      {nextSession.descricao}
                    </p>
                  )}
                </div>
                <Button
                  size="lg"
                  asChild
                  className="btn-primary h-14 px-8 rounded-full shrink-0 shadow-[0_0_40px_rgba(234,179,8,0.25)] hover:shadow-[0_0_60px_rgba(234,179,8,0.4)] transition-shadow"
                >
                  <PrefetchLink
                    to={`/jornada/${nextSession.phaseId || nextSession.faseId}/${nextSession.sessionId || nextSession.sessaoId}`}
                    aria-label={`Continuar: ${nextSession.titulo}`}
                  >
                    <Play className="w-5 h-5 fill-current mr-2" />
                    <span className="font-black uppercase tracking-wider text-sm">
                      {nextSession.isRecommended ? "Iniciar" : "Continuar"}
                    </span>
                  </PrefetchLink>
                </Button>
              </div>
            ) : (
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                    Você completou todas as fases atuais
                  </h3>
                  <p className="text-sm text-white/50">
                    Revise seus insights ou explore ferramentas complementares.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/10 text-white hover:bg-white/5"
                >
                  <Link to="/dashboard">
                    Ver evolução <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </motion.section>

        {/* Atalhos */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionHeader
            eyebrow="Atalhos"
            title="Para onde você quer ir?"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {SHORTCUTS.map((s) => {
              const Icon = s.icon;
              return (
                <PrefetchLink
                  key={s.to}
                  to={s.to}
                  className="group glass-card p-5 md:p-6 flex flex-col gap-3 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-white tracking-tight">
                      {s.label}
                    </p>
                    <p className="text-xs text-white/40">{s.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all mt-auto" />
                </PrefetchLink>
              );
            })}
          </div>
        </motion.section>

        {/* Progresso */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionHeader
            eyebrow="Progresso"
            title={`${totalProgress}% da trilha concluída`}
          />
          <div className="glass-card p-6 md:p-10">
            <GlobalProgressBar />
          </div>
        </motion.section>

        {/* Fases */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SectionHeader
            eyebrow="Fases"
            title="Sua jornada estruturada"
          />
          <JourneyPhases completedSessions={jornada.completedSessions} />
        </motion.section>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ eyebrow: string; title: string }> = ({
  eyebrow,
  title,
}) => (
  <div className="flex flex-col gap-1.5 mb-6 md:mb-8">
    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30 px-1">
      {eyebrow}
    </p>
    <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white px-1">
      {title}
    </h2>
  </div>
);

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
}> = ({ icon, label, value, suffix, accent }) => (
  <div className="glass-card p-4 md:p-5 flex flex-col gap-2">
    <div
      className={`flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] ${accent ? "text-accent-warm" : "text-white/40"}`}
    >
      {icon}
      <span>{label}</span>
    </div>
    <div className="flex items-baseline gap-1.5">
      <span className="text-2xl md:text-4xl font-black tracking-tighter text-white tabular-nums">
        {value}
      </span>
      {suffix && (
        <span className="text-xs text-white/40 font-medium">{suffix}</span>
      )}
    </div>
  </div>
);

export default UserWorkspace;
