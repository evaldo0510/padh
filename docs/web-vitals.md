# Web Vitals — coleta em produção

Métricas reais dos usuários (Core Web Vitals) coletadas via pacote
[`web-vitals`](https://github.com/GoogleChrome/web-vitals) e persistidas
na tabela `web_vitals` do backend (Lovable Cloud / Supabase).

## Métricas coletadas

`LCP`, `CLS`, `INP`, `FCP`, `TTFB` — uma vez por sessão de página, quando o
valor final está disponível (padrão do `web-vitals`).

## Onde ficam os dados

Tabela `public.web_vitals`. Campos:

- `metric_name` — LCP / CLS / INP / FCP / TTFB
- `metric_value` — valor bruto (ms para tempo, unitless para CLS)
- `metric_rating` — good / needs-improvement / poor
- `page_url` — apenas origin + pathname (sem query/hash)
- `user_agent` — truncado em 512 chars
- `device_type` — mobile / tablet / desktop / unknown
- `session_id` — id efêmero (sessionStorage), NÃO vincula usuário
- `created_at`

RLS: apenas INSERT público (validado). Leitura só via `service_role`
(edge functions / admin). Nenhum cliente pode ler as métricas.

## Como consultar

Via SQL no backend (service_role). Exemplos:

```sql
-- p75 de LCP por dia (últimos 7 dias)
SELECT date_trunc('day', created_at) AS dia,
       percentile_cont(0.75) WITHIN GROUP (ORDER BY metric_value) AS p75_lcp
FROM public.web_vitals
WHERE metric_name = 'LCP' AND created_at > now() - interval '7 days'
GROUP BY 1 ORDER BY 1;

-- distribuição por rating
SELECT metric_name, metric_rating, count(*)
FROM public.web_vitals
WHERE created_at > now() - interval '24 hours'
GROUP BY 1, 2 ORDER BY 1, 2;
```

## Privacidade

Sem dados pessoais. `session_id` é aleatório por aba e não persiste entre
sessões do navegador. Query string e hash da URL são descartados.

## Falhas

Qualquer erro na coleta ou envio é silenciado — telemetria nunca quebra
o app. A importação do pacote é dinâmica e ocorre após o `load`, então
não afeta o LCP.

## Deduplicação e rate limit

Aplicados no cliente antes do envio (em memória, por aba):

- **Dedup:** cada par `(metric_name, page_url)` é enviado no máximo 1x a cada
  30 s dentro da mesma sessão. Trocar de rota gera novo par e continua sendo
  medido.
- **Rate limit por janela:** máximo 8 eventos por minuto (janela deslizante).
- **Rate limit por sessão:** máximo 60 eventos no total.

Eventos além dos limites são descartados silenciosamente. Nada é persistido
em disco — recarregar a página zera os contadores.

## Fila persistente + backoff exponencial

Todo evento coletado é **enfileirado em `localStorage`** (chave `wv_queue_v1`)
antes de ser enviado. A fila é drenada em lote via `insert([...])`:

- **Retenção:** até 100 eventos (FIFO — descarta os mais antigos ao encher).
- **Backoff:** 2s → 4s → 8s → 16s → 32s → 60s, até 6 tentativas por rodada.
  Após esgotar, os eventos permanecem na fila para a próxima oportunidade.
- **Gatilhos de flush:**
  - nova métrica coletada;
  - inicialização da página (drena o que sobrou da sessão anterior);
  - evento `online` (rede voltou);
  - `visibilitychange → hidden` e `pagehide` (último suspiro antes de fechar).
- **Offline:** se `navigator.onLine === false`, o flush é adiado; nada é
  perdido enquanto houver espaço na fila.

### Por que localStorage e não IndexedDB

Os payloads são pequenos (~200 B cada) e o teto da fila é 60–100 eventos.
`localStorage` é síncrono, dep-free e resolve o caso. IndexedDB só seria
necessário para volumes muito maiores.

## RLS — estado atual

- Nenhuma policy de `SELECT`, `UPDATE` ou `DELETE` → clientes `anon` e
  `authenticated` **não conseguem** ler nem alterar métricas.
- Policy única de `INSERT` com validação de tamanhos e valor mínimo/máximo.
- Leitura só via `service_role` (edge functions, admin, SQL).
