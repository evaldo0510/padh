# Lighthouse Reports

Relatórios gerados por `npm run lighthouse:mobile` / `npm run lighthouse:desktop`.

## Como rodar

```bash
# URL padrão: https://padhpoesia.lovable.app
npm run lighthouse:mobile
npm run lighthouse:desktop

# URL customizada (preview, localhost, etc)
LH_URL=http://localhost:8080 npm run lighthouse:mobile

# Marcar como baseline vs pós-otimização
LH_LABEL=before npm run lighthouse:mobile
LH_LABEL=after  npm run lighthouse:mobile
```

Cada execução gera dois arquivos em `lighthouse-reports/`:

- `<label>-<preset>-<timestamp>.html` — relatório visual
- `<label>-<preset>-<timestamp>.json` — dados brutos para comparação

## Fluxo recomendado

1. Rodar baseline agora (`LH_LABEL=before` mobile + desktop).
2. Aplicar otimizações uma a uma.
3. Rodar `LH_LABEL=after` para comparar Performance, LCP, TTFB, CLS, INP.

## Requisitos

- Node 18+
- Chrome/Chromium instalado localmente (Lighthouse baixa via `npx`).
- Não roda em CI da Lovable — execute localmente na sua máquina.
