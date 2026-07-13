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
