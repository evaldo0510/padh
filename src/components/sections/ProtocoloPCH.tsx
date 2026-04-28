import React from "react";
import {
  Stethoscope,
  Search,
  Compass,
  ShieldCheck,
  AlertCircle,
  ClipboardList,
} from "lucide-react";
interface ProtocoloPCHProps {
  modulo: string;
  foco: string;
  sinais: string[];
  aplicacao: string[];
  indicacoes: string[];
  cuidados?: string[];
}
/** * Bloco de Protocolo Clínico — apresenta como aplicar a PCH dentro do P.A.D.H. * Usa a variável CSS `--module` herdada do container `module-themed[data-module="N"]`. */ const ProtocoloPCH: React.FC<
  ProtocoloPCHProps
> = ({ modulo, foco, sinais, aplicacao, indicacoes, cuidados }) => {
  return (
    <div className="mt-10 pt-8 border-t-2 border-module/40">
      {" "}
      {/* Cabeçalho do Protocolo */}
      <div className="flex items-start gap-3 mb-6">
        {" "}
        <div className="w-12 h-12 rounded-xl bg-module-soft flex items-center justify-center shrink-0 mt-1">
          {" "}
          <Stethoscope className="spiritual-icon spiritual-icon-xl text-module" />{" "}
        </div>{" "}
        <div>
          {" "}
          <p className="text-xs uppercase tracking-[0.18em] text-module font-semibold mb-1">
            {" "}
            Protocolo Clínico PCH no P.A.D.H. · {modulo}
          </p>{" "}
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            {" "}
            Como Usar na Prática Clínica{" "}
          </h3>{" "}
          <p className="text-sm text-muted-foreground mt-2 italic">
            {" "}
            Foco: {foco}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid md:grid-cols-2 gap-5">
        {" "}
        {/* Sinais & Diagnóstico */}
        <div className="rounded-xl border border-module bg-module-tint p-5">
          {" "}
          <div className="flex items-center gap-2 mb-3">
            {" "}
            <Search className="spiritual-icon text-module" />{" "}
            <h4 className="font-heading font-semibold text-foreground">
              {" "}
              Identificação Emocional & Mental{" "}
            </h4>{" "}
          </div>{" "}
          <p className="text-xs text-muted-foreground mb-3">
            {" "}
            Sinais que esta etapa ajuda o terapeuta a identificar:{" "}
          </p>{" "}
          <ul className="space-y-2">
            {" "}
            {sinais.map((s, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
              >
                {" "}
                <span className="text-module mt-1.5 shrink-0">◦</span>{" "}
                <span>{s}</span>{" "}
              </li>
            ))}
          </ul>{" "}
        </div>{" "}
        {/* Aplicação Prática */}
        <div className="rounded-xl border border-module bg-module-tint p-5">
          {" "}
          <div className="flex items-center gap-2 mb-3">
            {" "}
            <ClipboardList className="spiritual-icon text-module" />{" "}
            <h4 className="font-heading font-semibold text-foreground">
              {" "}
              Aplicação Passo a Passo{" "}
            </h4>{" "}
          </div>{" "}
          <ol className="space-y-2.5">
            {" "}
            {aplicacao.map((a, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex gap-2.5 leading-relaxed"
              >
                {" "}
                <span className="shrink-0 w-5 h-5 rounded-full bg-module-soft text-module text-xs font-bold flex items-center justify-center mt-0.5">
                  {" "}
                  {i + 1}
                </span>{" "}
                <span>{a}</span>{" "}
              </li>
            ))}
          </ol>{" "}
        </div>{" "}
        {/* Indicações */}
        <div className="rounded-xl border border-module bg-module-tint p-5">
          {" "}
          <div className="flex items-center gap-2 mb-3">
            {" "}
            <Compass className="spiritual-icon text-module" />{" "}
            <h4 className="font-heading font-semibold text-foreground">
              {" "}
              Indicações Terapêuticas{" "}
            </h4>{" "}
          </div>{" "}
          <ul className="space-y-2">
            {" "}
            {indicacoes.map((ind, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
              >
                {" "}
                <span className="text-module mt-1.5 shrink-0">▸</span>{" "}
                <span>{ind}</span>{" "}
              </li>
            ))}
          </ul>{" "}
        </div>{" "}
        {/* Cuidados Éticos — sempre âmbar para sinalizar atenção universal */}
        {cuidados && cuidados.length > 0 && (
          <div className="rounded-xl border border-spiritual-amber/30 bg-spiritual-amber/[0.05] p-5">
            {" "}
            <div className="flex items-center gap-2 mb-3">
              {" "}
              <ShieldCheck className="spiritual-icon text-spiritual-amber" />{" "}
              <h4 className="font-heading font-semibold text-foreground">
                {" "}
                Cuidados Éticos & Contraindicações{" "}
              </h4>{" "}
            </div>{" "}
            <ul className="space-y-2">
              {" "}
              {cuidados.map((c, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
                >
                  {" "}
                  <AlertCircle className="spiritual-icon spiritual-icon-sm text-spiritual-amber mt-0.5 shrink-0" />{" "}
                  <span>{c}</span>{" "}
                </li>
              ))}
            </ul>{" "}
          </div>
        )}
      </div>{" "}
    </div>
  );
};
export default ProtocoloPCH;
