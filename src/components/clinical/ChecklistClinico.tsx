import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardCheck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ModuloClinico } from '@/lib/dados-clinicos';

interface Props {
  modulo: ModuloClinico;
}

interface ChecklistState {
  sinais: Record<number, boolean>;
  contencao: 'baixo' | 'moderado' | 'alto' | '';
  rapport: number;
  indicacoesOk: boolean | null;
  contraindicacoesOk: boolean | null;
  proximoPasso: string;
  teoricoAtivado: string;
}

const initial = (): ChecklistState => ({
  sinais: {},
  contencao: '',
  rapport: 0,
  indicacoesOk: null,
  contraindicacoesOk: null,
  proximoPasso: '',
  teoricoAtivado: '',
});

const ChecklistClinico: React.FC<Props> = ({ modulo }) => {
  const storageKey = `padh-checklist-${modulo.id}`;
  const [state, setState] = useState<ChecklistState>(initial);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setState(JSON.parse(saved));
    } catch { /* ignore */ }
  }, [storageKey]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state, storageKey]);

  const reset = () => setState(initial());

  return (
    <div className="rounded-xl border border-secondary/20 bg-secondary/[0.03] p-5 mb-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
            <ClipboardCheck className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-secondary font-semibold">Checklist Clínico Rápido</p>
            <h4 className="font-heading font-semibold text-foreground">Antes de aplicar a intervenção</h4>
            <p className="text-xs text-muted-foreground mt-1">Marque os itens observáveis. Salvo automaticamente.</p>
          </div>
        </div>
        <Button size="sm" variant="ghost" onClick={reset} className="gap-1 text-xs h-8">
          <RotateCcw className="h-3 w-3" /> Limpar
        </Button>
      </div>

      <div className="space-y-4 text-sm">
        {/* Sinais */}
        <div>
          <p className="font-medium text-foreground mb-2">1. Sinais presentes</p>
          <div className="space-y-1.5">
            {modulo.checklistSinais.map((sinal, i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer hover:text-foreground transition-colors">
                <Checkbox
                  checked={!!state.sinais[i]}
                  onCheckedChange={(v) => setState(s => ({ ...s, sinais: { ...s.sinais, [i]: !!v } }))}
                  className="mt-0.5"
                />
                <span className="text-muted-foreground">{sinal}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Contenção */}
        <div>
          <p className="font-medium text-foreground mb-2">2. Nível de contenção emocional</p>
          <div className="flex gap-2 flex-wrap">
            {(['baixo', 'moderado', 'alto'] as const).map(n => (
              <button
                key={n}
                onClick={() => setState(s => ({ ...s, contencao: n }))}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  state.contencao === n
                    ? 'bg-secondary text-secondary-foreground border-secondary'
                    : 'bg-background border-border text-muted-foreground hover:border-secondary/40'
                }`}
              >
                {n.charAt(0).toUpperCase() + n.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Rapport */}
        <div>
          <p className="font-medium text-foreground mb-2">3. Estado de rapport (1–5)</p>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setState(s => ({ ...s, rapport: n }))}
                className={`w-9 h-9 rounded-md text-sm font-semibold border transition-colors ${
                  state.rapport === n
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Indicações / contraindicações */}
        <div className="grid sm:grid-cols-2 gap-3">
          {([
            ['indicacoesOk', '4. Indicações respeitadas?'],
            ['contraindicacoesOk', '5. Contraindicações verificadas?'],
          ] as const).map(([key, label]) => (
            <div key={key}>
              <p className="font-medium text-foreground mb-1.5 text-xs">{label}</p>
              <div className="flex gap-1.5">
                {[true, false].map(v => (
                  <button
                    key={String(v)}
                    onClick={() => setState(s => ({ ...s, [key]: v }) as ChecklistState)}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                      state[key] === v
                        ? v ? 'bg-primary/15 text-primary border-primary/40' : 'bg-destructive/10 text-destructive border-destructive/30'
                        : 'bg-background border-border text-muted-foreground'
                    }`}
                  >
                    {v ? 'Sim' : 'Não'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Teórico ativado */}
        <div>
          <p className="font-medium text-foreground mb-2">6. Referencial teórico ativado nesta sessão</p>
          <div className="flex gap-2 flex-wrap">
            {modulo.teoricos.map(t => (
              <button
                key={t.nome}
                onClick={() => setState(s => ({ ...s, teoricoAtivado: t.nome }))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  state.teoricoAtivado === t.nome
                    ? 'bg-primary/15 text-primary border-primary/40'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {t.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Próximo passo */}
        <div>
          <p className="font-medium text-foreground mb-2">7. Próximo passo definido</p>
          <textarea
            value={state.proximoPasso}
            onChange={(e) => setState(s => ({ ...s, proximoPasso: e.target.value }))}
            placeholder="Ex.: Aplicar Verso-Gatilho na próxima sessão, validar tarefa de casa…"
            rows={2}
            className="w-full text-sm px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ChecklistClinico;
