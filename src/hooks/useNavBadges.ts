import { useMemo } from "react";
import { useJornada } from "./useJornada";
import { useCourseProgress } from "./useCourseProgress";
import { JORNADA_DATA } from "@/lib/jornada-data";

const FORMACAO_MODULE_IDS = [
  "modulo-1",
  "modulo-2",
  "modulo-3",
  "modulo-4",
  "modulo-5",
  "modulo-6",
  "modulo-7",
  "modulo-8",
];

export interface NavBadges {
  jornadasPercent: number;
  formacaoCompleted: number;
  formacaoTotal: number;
  streak: number;
}

/**
 * Indicadores discretos para o menu:
 * - Jornadas: % de sessões concluídas
 * - Formação: X/8 módulos concluídos
 * - Minha Evolução: sequência de dias com resposta
 */
export const useNavBadges = (): NavBadges => {
  const { jornada } = useJornada();
  const { progress } = useCourseProgress();

  return useMemo(() => {
    const totalSessions = JORNADA_DATA.reduce(
      (acc, f) => acc + f.sessoes.length,
      0,
    );
    const doneSessions = jornada.completedSessions.length;
    const jornadasPercent =
      totalSessions > 0 ? Math.round((doneSessions / totalSessions) * 100) : 0;

    const formacaoCompleted = progress.completedModules.filter((id) =>
      FORMACAO_MODULE_IDS.includes(id),
    ).length;

    // Streak: dias consecutivos com pelo menos 1 resposta
    const days = new Set(
      (jornada.responses || [])
        .map((r) => (r.date ? r.date.slice(0, 10) : null))
        .filter(Boolean) as string[],
    );
    let streak = 0;
    const d = new Date();
    // permite começar contando por ontem se hoje ainda não teve resposta
    if (!days.has(d.toISOString().slice(0, 10))) {
      d.setDate(d.getDate() - 1);
    }
    while (days.has(d.toISOString().slice(0, 10))) {
      streak++;
      d.setDate(d.getDate() - 1);
    }

    return {
      jornadasPercent,
      formacaoCompleted,
      formacaoTotal: FORMACAO_MODULE_IDS.length,
      streak,
    };
  }, [jornada.completedSessions, jornada.responses, progress.completedModules]);
};
