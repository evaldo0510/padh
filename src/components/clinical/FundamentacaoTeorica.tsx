import React from "react";
import { BookMarked, Quote } from "lucide-react";
import type { TeoricoRef } from "@/lib/dados-clinicos";
interface Props {
  teoricos: TeoricoRef[];
  pilar: string;
  corNome?: string;
  corSimbolo?: string;
}
const FundamentacaoTeorica: React.FC<Props> = ({
  teoricos,
  pilar,
  corNome,
  corSimbolo,
}) => {
  return (
    <div className="mt-6 rounded-2xl border border-module bg-gradient-to-br from-module-soft to-transparent p-5 md:p-7">
      {" "}
      <div className="flex items-start gap-3 mb-5">
        {" "}
        <div className="w-11 h-11 rounded-xl bg-module-soft flex items-center justify-center shrink-0">
          {" "}
          <BookMarked className="spiritual-icon spiritual-icon-lg text-module" />{" "}
        </div>{" "}
        <div className="flex-1">
          {" "}
          <p className="text-[10px] uppercase tracking-[0.22em] text-module font-bold mb-1">
            {" "}
            Fundamentação Teórica · Pilar {pilar}
          </p>{" "}
          <h4 className="font-heading font-semibold text-foreground text-lg">
            {" "}
            Conexões com a tradição clínica{" "}
          </h4>{" "}
          {corNome && corSimbolo && (
            <p className="text-xs text-muted-foreground mt-1.5 italic flex items-center gap-1.5">
              {" "}
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-module shadow-module-glow" />{" "}
              <span>
                <strong className="text-foreground/80 not-italic">
                  {corNome}
                </strong>{" "}
                — {corSimbolo}
              </span>{" "}
            </p>
          )}
        </div>{" "}
      </div>{" "}
      <div className="space-y-3">
        {" "}
        {teoricos.map((t, i) => (
          <div
            key={i}
            className="rounded-xl bg-card border border-border p-4 hover:border-module transition-colors group"
          >
            {" "}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1.5">
              {" "}
              <Quote className="spiritual-icon spiritual-icon-sm text-module opacity-60 group-hover:opacity-100 transition-opacity" />{" "}
              <span className="font-heading font-semibold text-foreground">
                {t.nome}
              </span>{" "}
              {t.obra && (
                <span className="text-xs italic text-muted-foreground">
                  — {t.obra}
                </span>
              )}
            </div>{" "}
            <p className="text-sm text-muted-foreground leading-relaxed pl-5">
              {t.contribuicao}
            </p>{" "}
          </div>
        ))}
      </div>{" "}
    </div>
  );
};
export default FundamentacaoTeorica;
