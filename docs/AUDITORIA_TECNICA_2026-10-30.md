# Auditoria técnica do PADH — 30/10/2026

## Estado e limites

Esta é a primeira linha de base técnica produzida com acesso direto ao GitHub e ao Supabase de produção. O repositório contém 384 entradas, incluindo 260 arquivos de código em `src/`. Foram inspecionados o inventário completo de arquivos, os manifests e workflows, os módulos centrais de autenticação, rotas protegidas, progresso, PWA e Livro-Curso, além do schema público, políticas RLS, privilégios e definições das funções privilegiadas.

**Limite de escopo:** não foi possível fazer leitura semântica linha a linha de todos os 260 arquivos de código nesta execução. Portanto, este documento não declara auditoria integral concluída. Os módulos não inspecionados individualmente permanecem pendentes. Não foram executados testes de browser em dispositivos reais nem testes de isolamento com duas contas.

Nenhuma alteração foi aplicada ao banco de produção. Nenhuma migration foi executada. A abertura do PR iniciou automaticamente uma implantação de preview do Vercel; não houve promoção para produção.

## Resumo executivo

| Área | Evidência | Avaliação |
|---|---|---|
| RLS | 17/17 tabelas/partições do schema `public` com RLS habilitado | Positivo |
| Grants no schema | `CREATE` negado a `anon`, `authenticated` e `PUBLIC` no schema `public` | Positivo |
| SECURITY DEFINER | 6 funções; 5 executáveis por `authenticated`; guardas administrativas presentes nas funções administrativas | Atenção; sem bypass demonstrado |
| Advisors de segurança | 5 avisos de SECURITY DEFINER e 1 aviso de proteção de senha vazada desativada | Aberto |
| Advisors de desempenho | 38 avisos RLS, 5 FKs sem índice, 15 índices sem uso, 11 ocorrências de políticas permissivas múltiplas | Aberto |
| Políticas duplicadas | `daily_checkins`: duas INSERT e duas SELECT equivalentes | Confirmado |
| Autenticação | Logs consultados mostraram eventos de refresh/revogação de token; nenhuma falha explícita na amostra retornada | Inconclusivo |
| CI | Último workflow conhecido no commit de 29/10 concluiu com sucesso | Positivo, mas não cobre segurança |
| Branch principal | `main` sem proteção de branch e sem checks obrigatórios | Alto risco de governança |
| Migrations | 29 arquivos SQL no repositório e 7 versões listadas no histórico do projeto; nomes/versões não coincidem | Divergência a reconciliar |

## Achados e ações

### SEC-01 — Proteção contra senhas vazadas desativada
**Severidade:** Alta.  
O Supabase Security Advisor reporta `auth_leaked_password_protection`. Ativar no Auth e testar cadastro/alteração de senha com senha comprometida em ambiente controlado. Não foi possível alterar esta configuração via as ferramentas disponíveis nesta execução.

### SEC-02 — Funções SECURITY DEFINER acessíveis por authenticated
**Severidade:** Média (superfície privilegiada; exploração não demonstrada).  
As funções `admin_funnel_matrix`, `admin_weekly_cohort`, `get_tables_security`, `has_role` e `is_padh_admin` concedem EXECUTE a `authenticated`. As três funções administrativas verificadas fazem checagem de papel/admin; `has_role` compara o usuário informado com `auth.uid()` e exige e-mail de administrador e papel na tabela; `is_padh_admin` delega a `has_role`. O `search_path` está fixado em `public`, e CREATE no schema público está negado a papéis públicos/autenticados. Não foi demonstrado acesso indevido por usuário comum.
**Ação:** manter guardas, adicionar testes negativos/positivos de RPC e avaliar remover EXECUTE de RPCs administrativas diretas se não forem necessárias no cliente. Não revogar `has_role`/ `is_padh_admin` sem mapear dependências de RLS e frontend.

### SEC-03 — Função de auditoria sem trigger associado
**Severidade:** Média.  
A função `log_security_violation()` existe como SECURITY DEFINER, mas a consulta de triggers do schema público não encontrou trigger associado. A função, portanto, não está registrando violações por trigger no estado observado.
**Ação:** confirmar se a auditoria de violações é requisito. Se for, desenhar trigger específico e testar em branch isolada; se não for, documentar a função como legado e removê-la somente após análise de dependências.

### SEC-04 — Arquivo .env versionado e configuração local obsoleta
**Severidade:** Média de higiene/configuração; sem evidência de exposição de segredo de servidor.  
O `.env` rastreado continha somente variáveis `VITE_` (URL, project ID e publishable/anon key), sem `service_role` na versão atual. Porém, o projeto Supabase indicado nele era `zaijcanyfgwsvgkbaybm`, diferente do projeto de produção auditado (`njbgkrgynskcbwomipua`). Isso poderia direcionar ambientes locais para um backend antigo. A inspeção das variáveis Vercel, sem descriptografar segredos, confirmou `VITE_SUPABASE_URL` apontando para `https://njbgkrgynskcbwomipua.supabase.co` e a publishable key criptografada nos alvos production, preview e development, sem sinalização de segurança. Portanto, não há evidência de que a configuração atual da Vercel esteja apontando para o projeto antigo.
**Ação:** remover o `.env` do controle de versão (feito nesta branch), manter apenas `.env.example` e criar `.env.local` localmente com a configuração correta. A remoção do último commit não apaga versões anteriores do histórico; não foi feito scan completo do histórico Git nesta execução.

### SEC-05 — Proteção da branch main ausente
**Severidade:** Alta.  
O endpoint de branch informa `protected=false`; não há revisão obrigatória nem checks obrigatórios.
**Ação:** ativar proteção de `main`, exigir PR, CI e revisão, bloquear force-push e exclusão. A ferramenta conectada permite leitura, mas não oferece alteração da regra de proteção nesta execução.

### PERF-01 — Otimização de 38 políticas RLS
**Severidade:** Média.  
O Advisor recomenda encapsular chamadas como `auth.uid()` em subconsulta escalar `(select auth.uid())` para evitar avaliação por linha. Aplicar por migration depois de validar cada expressão `USING`/ `WITH CHECK` e comparar os resultados de autorização.

### PERF-02 — Cinco FKs sem índice de cobertura
**Severidade:** Média.  
Candidatas reportadas: `padh_agent_runs.requested_by`, `padh_content.created_by`, `padh_content.updated_by`, `padh_courses.created_by` e `padh_lesson_progress.lesson_id`. A consulta de índices confirma que não há índice de prefixo cobrindo essas colunas nas tabelas citadas.
**Ação:** criar índices após conferir cardinalidade, workload e custo de escrita.

### PERF-03 — Políticas permissivas duplicadas
**Severidade:** Média.  
`daily_checkins` possui duas políticas equivalentes de INSERT e duas de SELECT. `user_events` possui políticas separadas de SELECT para proprietário e administrador; essa combinação parece intencional (OR), não duplicação literal.
**Ação:** consolidar apenas as duplicadas de `daily_checkins`, mantendo exatamente o mesmo predicado e roles. Testar proprietário, outro usuário, anon e administrador.

### PERF-04 — Índices reportados como não utilizados
**Severidade:** Baixa / requer contexto.  
O Advisor reporta 15 índices sem uso registrado. Isso não prova que sejam desnecessários: estatísticas podem ter sido reiniciadas e consultas pouco frequentes podem depender deles.
**Ação:** observar período representativo, revisar `pg_stat_user_indexes` e planos de consulta antes de qualquer remoção. Nenhum índice foi removido.

### APP-01 — Progresso do Curso PCH em armazenamento local
**Severidade:** Média funcional.  
`useCourseProgress.ts` persiste `padh_course_progress` somente em `localStorage`. Já `LivroCurso.tsx` usa a tabela `padh_livro_curso_progress` no Supabase. São mecanismos distintos; o progresso gerido pelo primeiro hook não é sincronizado entre dispositivos/contas.
**Ação:** mapear todos os consumidores de `useCourseProgress` e decidir quais dados devem ser locais/offline e quais precisam persistir no servidor. Não migrar dados sem especificação e teste de reconciliação.

### APP-02 — Tipagem permissiva em autenticação
**Severidade:** Baixa.  
`useAuth.ts` usa `session: any`; a interface de sessão do SDK Supabase permite tipagem explícita. Há logs de erro no hook, mas sem política central de logging.
**Ação:** tipar com `Session | null` e padronizar logs sem incluir tokens ou dados pessoais.

### APP-03 — Recuperação de erro no LoginPage
**Severidade:** Baixa / teste pendente.  
O efeito que consulta `supabase.auth.getSession()` redireciona quando há sessão, mas não trata rejeição inesperada da Promise. A implementação principal de `useAuth` já possui `catch/finally`.
**Ação:** adicionar tratamento de falha e teste para sessão indisponível; validar os fluxos de signup, confirmação de e-mail, Google OAuth e retorno seguro `next` em browser real.

### APP-04 — Progresso do Livro-Curso
**Severidade:** Baixa / testes insuficientes.  
O componente consulta o usuário autenticado, filtra por `user_id`, usa chave de conflito `user_id,chapter_id` e mantém o estado visual inalterado quando uma gravação falha. O teste existente é estático e declara expressamente que não é integração live.
**Ação:** adicionar E2E real: marcar/desmarcar, sair/entrar, recarregar e confirmar isolamento entre duas contas; testar capítulos 1 a 5 na UI.

### REPO-01 — Cobertura de segurança automatizada ausente
**Severidade:** Média.  
Os dois workflows existentes cobrem lint, typecheck, invariantes, build e smoke/E2E pós-deploy; não há workflow dedicado de análise de dependências e CodeQL.
**Ação nesta branch:** adicionar auditoria de dependências e CodeQL. Os resultados devem ser avaliados antes de integrar.

### REPO-02 — Lockfiles de mais de um gerenciador
**Severidade:** Baixa.  
Há `package-lock.json`, `bun.lock` e `bun.lockb`; CI e README usam npm. Isso pode gerar resoluções divergentes se os arquivos não forem mantidos em sincronia.
**Ação:** definir npm como gerenciador canônico (se confirmado) e remover lockfiles Bun apenas após confirmar que não existe fluxo de build dependente deles.

## Autenticação — evidência limitada

A amostra de `auth_logs` e `auth_audit_logs` retornou eventos de `token_refreshed` e `token_revoked`, incluindo sessões em Chrome desktop e Chrome Android, com status HTTP 200 no endpoint de token. A amostra não retornou tentativas de login com erro, mas contém poucos eventos e não permite concluir que não houve falhas. Não houve teste manual em Safari/iPhone nesta execução.

## Migrations — divergência a reconciliar

O repositório contém 29 arquivos em `supabase/migrations`; o histórico do projeto lista 7 versões, com identificadores diferentes. Isso pode decorrer de baseline/consolidação, migrations antigas ou divergência real. Não se deve aplicar automaticamente os arquivos pendentes nem editar `schema_migrations`. Próxima etapa: comparar cada migration com o schema efetivo e produzir mapa de equivalência antes de qualquer DDL.

## Plano de correção e testes

1. Proteger `main` no GitHub e habilitar leaked password protection no Auth.
2. Rodar scan de dependências e CodeQL; corrigir CVEs confirmados.
3. Testar RPCs administrativas com usuário comum e administrador.
4. Criar ambiente Supabase isolado antes de qualquer migration de RLS/índices/políticas.
5. Reconciliar os 29 arquivos SQL com as 7 versões aplicadas.
6. Implementar E2E de auth e progresso com duas contas.
7. Reexecutar Advisors e comparar snapshots.

## Regra de publicação

Nenhuma migration de produção, alteração de RLS, revogação de privilégios ou remoção de índices deve ser aplicada sem ambiente isolado, testes de autorização e aprovação do diff. O merge no `main` pode disparar deploy automático pelo Vercel; somente alterações aprovadas e verificadas devem ser integradas.


### REPO-03 — Vulnerabilidades no lockfile (npm audit)
**Severidade:** Alta / bloqueador de merge.  
O novo workflow executou `npm ci` e `npm audit --audit-level=high`; a primeira execução falhou com **30 vulnerabilidades reportadas: 2 high, 26 moderate e 2 low**. O relatório identifica `zod <4.6.6` (GHSA-mrhx-c7xc-m3w5), vulnerável a consumo descontrolado de memória na validação de arrays sem limite; a versão corrigida indicada pelo advisory é 4.6.6 ou superior. Também identifica `deepmerge 4.2.0–4.3.1` (GHSA-gcqx-w48m-w2h4), com prototype poisoning e sem versão corrigida publicada no advisory consultado. Outros pacotes transitivos reportados incluem `esbuild`, `glob`, `minimatch`, `postcss-selector-parser` e `react-router`.
**Impacto:** risco de indisponibilidade por validação de payloads excessivos em Zod; risco de integridade em contextos que mesclem objetos controlados pelo atacante com deepmerge; demais alertas exigem avaliar se o código vulnerável é alcançável em produção ou apenas em tooling.
**Correção proposta:** atualizar Zod para versão corrigida e verificar compatibilidade da API; mapear todas as cópias transitivas; atualizar a cadeia Vite/Workbox e React Router em etapas; documentar deepmerge enquanto não houver correção upstream e verificar se permanece somente em dependências de build. Não executar `npm audit fix --force`: o log propõe mudanças major (Vite 8, React Router 7, Zod 4 e versões incompatíveis de plugins) sem prova de compatibilidade.
**Teste:** repetir `npm ci`, `npm audit --audit-level=high`, lint, typecheck, invariantes, build e E2E; comparar bundle e fluxos de autenticação.
**Evidência:** execução GitHub Actions Security no commit `a14567780537b58674cd64faee0f6f93085d8228`, job Dependency vulnerability audit, falha por exit code 1. O segundo run para o head atualizado ainda estava em execução no momento do registro.

### PERF-05 — Bundle principal acima de 500 kB
**Severidade:** Média.  
O build Preview do Vercel concluiu com sucesso, mas Vite alertou que há chunks maiores que 500 kB após minificação. Também apontou que `src/integrations/supabase/client.ts` é importado dinamicamente por `pwa-metrics.ts`, mas estaticamente por diversos componentes/hooks/páginas; por isso, o import dinâmico não separa o cliente Supabase em outro chunk.
**Impacto:** maior transferência inicial, parsing e execução de JavaScript; possível aumento de LCP/INP em dispositivos móveis e conexões lentas.
**Correção proposta:** medir o tamanho dos chunks e rotas; separar dependências pesadas por rota e evitar import dinâmico contraditório; não aumentar apenas `chunkSizeWarningLimit` para ocultar o alerta.
**Teste:** comparar bundle analyzer, Lighthouse/Web Vitals e carregamento de rotas principais em mobile.

### SUPPLY-01 — Scripts de instalação e configuração npm
**Severidade:** Baixa / revisão de supply chain.  
O build Vercel emitiu aviso de quatro pacotes com scripts de instalação ainda não aprovados por `allowScripts` (`@swc/core`, `core-js`, `esbuild@0.21.5` e `esbuild@0.25.0`) e aviso de configuração npm desconhecida `cache-dir`.
**Ação:** revisar a origem e necessidade de cada script antes de aprová-lo; identificar a origem da configuração `cache-dir` e removê-la ou substituí-la por opção suportada. Não aprovar scripts automaticamente.
