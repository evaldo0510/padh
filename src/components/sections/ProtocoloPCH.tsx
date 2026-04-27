import React from 'react';
import { Stethoscope, Search, Compass, ShieldCheck, AlertCircle, ClipboardList } from 'lucide-react';

interface ProtocoloPCHProps {
  /** Nome do módulo (ex.: "Módulo 1") para contextualizar o protocolo */
  modulo: string;
  /** Foco clínico específico deste módulo */
  foco: string;
  /** Sinais emocionais/mentais que esta etapa ajuda a identificar */
  sinais: string[];
  /** Passo a passo de aplicação clínica */
  aplicacao: string[];
  /** Indicações terapêuticas */
  indicacoes: string[];
  /** Cuidados éticos e contraindicações */
  cuidados?: string[];
}

/**
 * Bloco de Protocolo Clínico — apresenta como aplicar a PCH dentro do P.A.D.H.
 * em cada módulo, sem alterar o conteúdo original.
 */
const ProtocoloPCH: React.FC<ProtocoloPCHProps> = ({
  modulo,
  foco,
  sinais,
  aplicacao,
  indicacoes,
  cuidados,
}) => {
  return (
    <div className="mt-10 pt-8 border-t-2 border-primary/15">
      {/* Cabeçalho do Protocolo */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
          <Stethoscope className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-1">
            Protocolo Clínico PCH no P.A.D.H. · {modulo}
          </p>
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Como Usar na Prática Clínica
          </h3>
          <p className="text-sm text-muted-foreground mt-2 italic">
            Foco: {foco}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Sinais & Diagnóstico */}
        <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-4 w-4 text-primary" />
            <h4 className="font-heading font-semibold text-foreground">
              Identificação Emocional & Mental
            </h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Sinais que esta etapa ajuda o terapeuta a identificar:
          </p>
          <ul className="space-y-2">
            {sinais.map((s, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                <span className="text-primary mt-1.5 shrink-0">◦</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Aplicação Prática */}
        <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-5">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList className="h-4 w-4 text-primary" />
            <h4 className="font-heading font-semibold text-foreground">
              Aplicação Passo a Passo
            </h4>
          </div>
          <ol className="space-y-2.5">
            {aplicacao.map((a, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2.5 leading-relaxed">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Indicações */}
        <div className="rounded-xl border border-secondary/20 bg-secondary/[0.04] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="h-4 w-4 text-secondary" />
            <h4 className="font-heading font-semibold text-foreground">
              Indicações Terapêuticas
            </h4>
          </div>
          <ul className="space-y-2">
            {indicacoes.map((ind, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                <span className="text-secondary mt-1.5 shrink-0">▸</span>
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cuidados Éticos */}
        {cuidados && cuidados.length > 0 && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <h4 className="font-heading font-semibold text-foreground">
                Cuidados Éticos & Contraindicações
              </h4>
            </div>
            <ul className="space-y-2">
              {cuidados.map((c, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2 leading-relaxed">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtocoloPCH;
