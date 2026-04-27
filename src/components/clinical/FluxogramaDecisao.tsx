import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GitBranch, AlertTriangle, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

type Sintoma = 'rigido' | 'crencas' | 'racional' | 'trauma' | 'vazio' | 'integracao';

interface Resultado {
  pilar: 'P' | 'A' | 'D' | 'H';
  modulo: string;
  ferramenta: string;
  teorico: string;
  leitura: string;
  link: string;
}

const RESULTADOS: Record<Sintoma, Resultado> = {
  rigido: {
    pilar: 'P',
    modulo: 'Módulo 1 — O Poder das Palavras',
    ferramenta: 'Escuta semântica + Poemadiagnóstico',
    teorico: 'Lacan & Freud',
    leitura: 'Os significantes-mestre repetidos revelam a estrutura do desejo. Comece pela escuta da fala plena.',
    link: '/curso-padh#modulo-1',
  },
  crencas: {
    pilar: 'A',
    modulo: 'Módulo 2 — Reestruturação de Crenças',
    ferramenta: 'Diálogo de duas vozes + Poema-Funil',
    teorico: 'Aaron Beck & Albert Ellis',
    leitura: 'Mapeie a crença nuclear pela seta descendente. Valide a função protetiva antes de reestruturar.',
    link: '/curso-padh#modulo-2',
  },
  racional: {
    pilar: 'A',
    modulo: 'Módulos 3-4 — Linguagem Hipnótica',
    ferramenta: 'Verso-Gatilho + Poesia Hipnótica',
    teorico: 'Milton Erickson',
    leitura: 'Pacientes hiper-racionais respondem à sugestão indireta. Use linguagem permissiva e ritmo lento.',
    link: '/curso-padh#modulo-3',
  },
  trauma: {
    pilar: 'D',
    modulo: 'Módulo 5 — Metáforas Curativas',
    ferramenta: 'Metáfora da Jornada + Reescrita Poética',
    teorico: 'Jung, Janet & Van der Kolk',
    leitura: 'Trauma é fragmentação. Use imagens arquetípicas integradoras. Confirme estabilidade antes de aprofundar.',
    link: '/curso-padh#modulo-5',
  },
  vazio: {
    pilar: 'D',
    modulo: 'Módulo 6 — Poesia Terapêutica',
    ferramenta: 'Poesia ritualística + Ritual do Silêncio',
    teorico: 'Viktor Frankl & Hillman',
    leitura: 'O vazio existencial é busca de sentido. A poesia ritualística cria espaço de mistério e logos.',
    link: '/curso-padh#modulo-6',
  },
  integracao: {
    pilar: 'H',
    modulo: 'Módulos 7-8 — Sessão integrada e Autonomia',
    ferramenta: 'Sessão P.A.D.H. completa + Manual Poético Pessoal',
    teorico: 'Winnicott, Bowlby & Maslow',
    leitura: 'Integração exige holding seguro. Construa autonomia sem cortar o vínculo abruptamente.',
    link: '/curso-padh#modulo-7',
  },
};

const SINTOMAS: { key: Sintoma; label: string; descricao: string }[] = [
  { key: 'rigido', label: 'Discurso rígido & absoluto', descricao: '"sempre", "nunca", "ninguém" — pensamento dicotômico.' },
  { key: 'crencas', label: 'Crenças nucleares disfuncionais', descricao: '"não sou suficiente", auto-sabotagem cíclica.' },
  { key: 'racional', label: 'Defesas racionais altas', descricao: 'Hiper-controle, intelectualização, dificuldade de sentir.' },
  { key: 'trauma', label: 'Trauma fragmentado', descricao: 'Discurso descontínuo, dissociação, memórias intrusivas.' },
  { key: 'vazio', label: 'Vazio existencial', descricao: 'Sensação de falta de sentido, anedonia, busca espiritual.' },
  { key: 'integracao', label: 'Necessidade de integração', descricao: 'Insights já ocorreram, falta consolidar identidade.' },
];

const FluxogramaDecisao: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [crise, setCrise] = useState<boolean | null>(null);
  const [sintoma, setSintoma] = useState<Sintoma | null>(null);

  const reset = () => {
    setStep(0);
    setCrise(null);
    setSintoma(null);
  };

  const resultado = sintoma ? RESULTADOS[sintoma] : null;

  return (
    <div className="rounded-2xl border border-primary/15 bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <GitBranch className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-1">
            Fluxograma de Decisão Clínica
          </p>
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Qual pilar usar primeiro no PCH?
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5">
            Responda 2 perguntas e receba a recomendação baseada nos sintomas observáveis.
          </p>
        </div>
        {step > 0 && (
          <Button size="sm" variant="ghost" onClick={reset} className="gap-1 text-xs">
            <RotateCcw className="h-3 w-3" /> Reiniciar
          </Button>
        )}
      </div>

      {/* Etapa 0 — Crise aguda */}
      {step === 0 && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <p className="font-heading font-semibold text-foreground text-lg">
            1. O paciente está em crise aguda?
          </p>
          <p className="text-sm text-muted-foreground -mt-2">
            (ideação suicida ativa, surto psicótico, dissociação severa, abstinência aguda)
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => { setCrise(true); setStep(2); }}
              className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-4 text-left hover:border-destructive/60 transition-colors group"
            >
              <p className="font-heading font-semibold text-destructive mb-1">Sim, em crise</p>
              <p className="text-xs text-muted-foreground">Receber orientação de encaminhamento.</p>
            </button>
            <button
              onClick={() => { setCrise(false); setStep(1); }}
              className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-left hover:border-primary/60 transition-colors group"
            >
              <p className="font-heading font-semibold text-primary mb-1">Não, estável</p>
              <p className="text-xs text-muted-foreground">Seguir para mapeamento dos sintomas.</p>
            </button>
          </div>
        </div>
      )}

      {/* Etapa 1 — Sintoma predominante */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <p className="font-heading font-semibold text-foreground text-lg">
            2. Qual o sintoma predominante observado?
          </p>
          <p className="text-sm text-muted-foreground -mt-2">
            Escolha o padrão mais marcante na fala e no comportamento.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SINTOMAS.map(s => (
              <button
                key={s.key}
                onClick={() => { setSintoma(s.key); setStep(2); }}
                className="rounded-xl border border-border bg-background p-4 text-left hover:border-primary/50 hover:bg-primary/[0.02] transition-all group"
              >
                <p className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {s.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.descricao}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Etapa 2 — Resultado */}
      {step === 2 && crise === true && (
        <div className="rounded-xl border-2 border-destructive/40 bg-destructive/5 p-5 animate-in fade-in duration-300">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-bold text-destructive text-lg mb-2">
                PCH não é a primeira linha em crise aguda
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>▸ Encaminhar para <strong>atendimento psiquiátrico de urgência</strong> (CAPS, pronto-socorro psiquiátrico).</li>
                <li>▸ Acionar rede de apoio familiar e contatos de emergência.</li>
                <li>▸ <strong>CVV: 188</strong> (24h, gratuito) para suporte imediato.</li>
                <li>▸ Após estabilização, retomar PCH gradualmente — ler <em>Frankl</em> sobre sentido em situações-limite.</li>
                <li>▸ Documentar tudo no prontuário com data, hora e medidas tomadas.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {step === 2 && resultado && (
        <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/[0.05] to-secondary/[0.03] p-5 md:p-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              Pilar {resultado.pilar}
            </span>
            <ArrowRight className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{resultado.modulo}</span>
          </div>

          <h4 className="font-heading text-xl font-semibold text-foreground mb-4">
            Recomendação clínica
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 pb-3 border-b border-border/50">
              <span className="text-xs uppercase tracking-wider text-primary font-semibold sm:w-32 shrink-0">Ferramenta</span>
              <span className="text-foreground">{resultado.ferramenta}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 pb-3 border-b border-border/50">
              <span className="text-xs uppercase tracking-wider text-primary font-semibold sm:w-32 shrink-0">Base teórica</span>
              <span className="text-foreground italic">{resultado.teorico}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
              <span className="text-xs uppercase tracking-wider text-primary font-semibold sm:w-32 shrink-0">Leitura clínica</span>
              <span className="text-muted-foreground leading-relaxed">{resultado.leitura}</span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-border/50">
            <Button asChild size="sm" className="gap-2">
              <Link to={resultado.link}>
                <BookOpen className="h-4 w-4" /> Abrir {resultado.modulo}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FluxogramaDecisao;
