import React from "react";
import { Palette, BookMarked } from "lucide-react";
import type { ModuloClinico } from "@/lib/dados-clinicos";
interface Props {
  modulo: ModuloClinico;
}
/** * Legenda clínica que explica o significado da cor do módulo * e orienta o terapeuta sobre como interpretar essa cor no prontuário. */ const LegendaCromatica: React.FC<
  Props
> = ({ modulo }) => {
  return (
    <aside
      role="note"
      aria-label={`Legenda cromática do Módulo ${modulo.numero}
— ${modulo.corNome}`}
      className="rounded-2xl border border-module/40 bg-module-tint p-5 md:p-6 mb-6 print:break-inside-avoid"
    >
      {" "}
      <div className="flex items-start gap-4">
        {" "}
        {/* Swatch de cor — referência visual */}
        <div className="shrink-0 flex flex-col items-center gap-2">
          {" "}
          <div
            aria-hidden="true"
            className="w-14 h-14 rounded-xl bg-module ring-2 ring-module/40 ring-offset-2 ring-offset-background shadow-module-glow flex items-center justify-center"
          >
            {" "}
            <Palette className="spiritual-icon spiritual-icon-xl text-background" />{" "}
          </div>{" "}
          <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-module text-center">
            {" "}
            M{modulo.numero}
          </span>{" "}
        </div>{" "}
        <div className="flex-1 min-w-0">
          {" "}
          <p className="text-[10px] uppercase tracking-[0.22em] text-module font-bold mb-1">
            {" "}
            Identidade Cromática{" "}
          </p>{" "}
          <h4 className="font-heading font-semibold text-foreground text-base md:text-lg leading-snug">
            {" "}
            {modulo.corNome}
          </h4>{" "}
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed italic">
            {" "}
            {modulo.corSimbolo}
          </p>{" "}
          {/* Como interpretar no prontuário */}
          <div className="mt-4 pt-4 border-t border-module/20">
            {" "}
            <div className="flex items-start gap-2.5">
              {" "}
              <BookMarked
                className="spiritual-icon text-module shrink-0 mt-0.5"
                aria-hidden="true"
              />{" "}
              <div className="text-xs text-foreground/80 leading-relaxed">
                {" "}
                <strong className="text-module font-semibold">
                  No prontuário:
                </strong>{" "}
                marque sessões com este módulo usando o código{" "}
                <code className="px-1.5 py-0.5 rounded bg-module-soft text-module font-mono text-[11px] font-semibold">
                  {" "}
                  M{modulo.numero}·{modulo.pilar}
                </code>{" "}
                e a tag <em className="text-foreground">"{modulo.corNome}"</em>.
                Use a cor como referência visual rápida para localizar, ao
                folhear o histórico, em que pilar ({modulo.pilarNome}) o
                paciente esteve trabalhando.{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </aside>
  );
};
export default LegendaCromatica;
