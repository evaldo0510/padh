import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ModuloClinico } from "@/lib/dados-clinicos";
interface Props {
  modulo: ModuloClinico;
}
interface ChecklistState {
  sinais: Record<number, boolean>;
  contencao: "baixo" | "moderado" | "alto" | "";
  rapport: number;
  indicacoesOk: boolean | null;
  contraindicacoesOk: boolean | null;
  proximoPasso: string;
  teoricoAtivado: string;
}
const initial = (): ChecklistState => ({
  sinais: {},
  contencao: "",
  rapport: 0,
  indicacoesOk: null,
  contraindicacoesOk: null,
  proximoPasso: "",
  teoricoAtivado: "",
});
const ChecklistClinico: React.FC<Props> = ({ modulo }) => {
  const storageKey = `padh-checklist-${modulo.id}`;
  const [state, setState] = useState<ChecklistState>(initial);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setState(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, [storageKey]);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, storageKey]);
  const reset = () => setState(initial());
  return (
    <div className="rounded-2xl border border-module bg-module-tint p-5 md:p-6 mb-6 shadow-module-glow">
      {" "}
      <div className="flex items-start justify-between gap-3 mb-5">
        {" "}
        <div className="flex items-start gap-3">
          {" "}
          <div className="w-11 h-11 rounded-xl bg-module-soft flex items-center justify-center shrink-0">
            {" "}
            <ClipboardCheck className="spiritual-icon spiritual-icon-lg text-module" />{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="text-[10px] uppercase tracking-[0.2em] text-module font-bold">
              Pré-Sessão
            </p>{" "}
            <h4 className="font-heading font-semibold text-foreground text-base md:text-lg">
              {" "}
              Checklist Clínico Rápido{" "}
            </h4>{" "}
            <p className="text-xs text-muted-foreground mt-0.5">
              {" "}
              Marque antes de aplicar a intervenção. Salvo automaticamente.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <Button
          size="sm"
          variant="ghost"
          onClick={reset}
          className="gap-1 text-xs h-8 shrink-0"
        >
          {" "}
          <RotateCcw className="h-3 w-3" /> Limpar{" "}
        </Button>{" "}
      </div>{" "}
      <div className="space-y-5 text-sm">
        {" "}
        {/* Sinais */}
        <div>
          {" "}
          <p className="font-medium text-foreground mb-2.5">
            1. Sinais presentes
          </p>{" "}
          <div className="space-y-1.5">
            {" "}
            {modulo.checklistSinais.map((sinal, i) => (
              <label
                key={i}
                className="flex items-start gap-2.5 cursor-pointer hover:text-foreground transition-colors p-1 rounded"
              >
                {" "}
                <Checkbox
                  checked={!!state.sinais[i]}
                  onCheckedChange={(v) =>
                    setState((s) => ({
                      ...s,
                      sinais: {
                        ...s.sinais,
                        [i]: !!v,
                      },
                    }))
                  }
                  className="mt-0.5 border-module data-[state=checked]:bg-module data-[state=checked]:text-background"
                />{" "}
                <span className="text-muted-foreground leading-relaxed">
                  {sinal}
                </span>{" "}
              </label>
            ))}
          </div>{" "}
        </div>{" "}
        <div className="grid sm:grid-cols-2 gap-5">
          {" "}
          {/* Contenção */}
          <div>
            {" "}
            <p className="font-medium text-foreground mb-2">
              2. Nível de contenção
            </p>{" "}
            <div className="flex gap-1.5 flex-wrap">
              {" "}
              {(["baixo", "moderado", "alto"] as const).map((n) => (
                <button
                  key={n}
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      contencao: n,
                    }))
                  }
                  className={`flex-1 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all ${
                    state.contencao === n
                      ? "bg-module text-background border-module-strong shadow-module-glow"
                      : "bg-background border-border text-muted-foreground hover:border-module"
                  }`}
                >
                  {" "}
                  {n.charAt(0).toUpperCase() + n.slice(1)}
                </button>
              ))}
            </div>{" "}
          </div>{" "}
          {/* Rapport */}
          <div>
            {" "}
            <p className="font-medium text-foreground mb-2">
              3. Rapport (1–5)
            </p>{" "}
            <div className="flex gap-1.5">
              {" "}
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      rapport: n,
                    }))
                  }
                  className={`flex-1 h-9 rounded-md text-sm font-semibold border transition-all ${
                    state.rapport === n
                      ? "bg-module text-background border-module-strong shadow-module-glow"
                      : "bg-background border-border text-muted-foreground hover:border-module"
                  }`}
                >
                  {" "}
                  {n}
                </button>
              ))}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Indicações / contraindicações */}
        <div className="grid sm:grid-cols-2 gap-3">
          {" "}
          {(
            [
              ["indicacoesOk", "4. Indicações respeitadas?"],
              ["contraindicacoesOk", "5. Contraindicações verificadas?"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              {" "}
              <p className="font-medium text-foreground mb-1.5 text-xs">
                {label}
              </p>{" "}
              <div className="flex gap-1.5">
                {" "}
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() =>
                      setState(
                        (s) =>
                          ({
                            ...s,
                            [key]: v,
                          }) as ChecklistState,
                      )
                    }
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                      state[key] === v
                        ? v
                          ? "bg-module-soft text-module border-module-strong"
                          : "bg-destructive/10 text-destructive border-destructive/30"
                        : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    {" "}
                    {v ? "✓ Sim" : "✗ Não"}
                  </button>
                ))}
              </div>{" "}
            </div>
          ))}
        </div>{" "}
        {/* Teórico ativado */}
        <div>
          {" "}
          <p className="font-medium text-foreground mb-2">
            6. Referencial teórico ativado
          </p>{" "}
          <div className="flex gap-1.5 flex-wrap">
            {" "}
            {modulo.teoricos.map((t) => (
              <button
                key={t.nome}
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    teoricoAtivado: t.nome,
                  }))
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  state.teoricoAtivado === t.nome
                    ? "bg-module-soft text-module border-module-strong"
                    : "bg-background border-border text-muted-foreground hover:border-module"
                }`}
              >
                {" "}
                {t.nome}
              </button>
            ))}
          </div>{" "}
        </div>{" "}
        {/* Próximo passo */}
        <div>
          {" "}
          <p className="font-medium text-foreground mb-2">
            7. Próximo passo definido
          </p>{" "}
          <textarea
            value={state.proximoPasso}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                proximoPasso: e.target.value,
              }))
            }
            placeholder="Ex.: Aplicar Verso-Gatilho na próxima sessão, validar tarefa de casa…"
            rows={2}
            className="w-full text-sm px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ring-module resize-none"
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ChecklistClinico;
