import React from 'react';
import { BookMarked } from 'lucide-react';
import type { TeoricoRef } from '@/lib/dados-clinicos';

interface Props {
  teoricos: TeoricoRef[];
  pilar: string;
}

const FundamentacaoTeorica: React.FC<Props> = ({ teoricos, pilar }) => {
  return (
    <div className="mt-6 rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.03] to-secondary/[0.02] p-5 md:p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <BookMarked className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-1">
            Fundamentação Teórica · Pilar {pilar}
          </p>
          <h4 className="font-heading font-semibold text-foreground text-lg">
            Conexões com a tradição clínica
          </h4>
          <p className="text-xs text-muted-foreground mt-1.5 italic">
            Toda intervenção do P.A.D.H. ancora-se em teóricos consolidados.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {teoricos.map((t, i) => (
          <div
            key={i}
            className="rounded-lg bg-card border border-border/50 p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1.5">
              <span className="font-heading font-semibold text-foreground">{t.nome}</span>
              {t.obra && (
                <span className="text-xs italic text-muted-foreground">— {t.obra}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.contribuicao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundamentacaoTeorica;
