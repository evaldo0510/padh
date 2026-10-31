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

### ENV-02 — Referência do Supabase CLI aponta para projeto antigo
**Severidade:** Alta de governança/configuração.  
`supabase/config.toml` aponta para o projeto `zaijcanyfgwsvgkbaybm`, enquanto o projeto de produção auditado é `njbgkrgynskcbwomipua`. As variáveis da Vercel (Production, Preview e Development) apontam para o projeto atual, então não há evidência de que o frontend publicado esteja usando o projeto antigo. Entretanto, comandos Supabase CLI executados a partir deste repositório podem selecionar o projeto antigo por padrão.
**Ação:** não executar `supabase db push`, deploy de Edge Functions ou migrations até reconciliar a referência, os 29 arquivos SQL e as 7 versões registradas no projeto atual. Não alteramos `project_id` nesta etapa para evitar direcionar migrations legadas diretamente à produção.

### OBS-01 — Pipeline de Web Vitals/PWA não está implantado no Supabase atual
**Severidade:** Média funcional/observabilidade.  
O projeto atual não lista Edge Functions implantadas. As tabelas `web_vitals` e `pwa_health_events` existem, mas ambas têm zero registros. O frontend chama `supabase.functions.invoke('ingest-telemetry')` para enviar essas métricas. Isso indica que a coleta não está chegando ao banco de produção atual.
**Ação:** reconciliar o destino do CLI e a implantação da função. Não implantar automaticamente, pois o código atual ainda precisa de endurecimento de segurança (SEC-06).

### SEC-06 — Endpoint de telemetria com superfície de abuso se implantado
**Severidade:** Média (função não implantada no projeto atual; risco latente).  
O código `supabase/functions/ingest-telemetry/index.ts` usa credencial `service_role` para gravar telemetria, aceita lotes de até 50 eventos e mantém rate limit em memória por instância. Não há limite explícito de bytes do corpo e o objeto `details` não tem limite de tamanho/estrutura. O rate limit por instância não é global nem durável; múltiplas instâncias podem multiplicar a capacidade de ingestão. O comentário pressupõe `verify_jwt=false`, mas `supabase/config.toml` não declara configuração explícita para essa função.
**Impacto potencial:** ingestão abusiva, crescimento de tabelas, consumo de recursos e custo de banco; não foi identificada capacidade de leitura de dados privados nessa função.
**Correção proposta antes de deploy:** limite de corpo (por exemplo, 32 KB), allowlist de campos em `details`, limite serializado por evento, limite de lote, rate limit durável/compartilhado, validação de origem e IP confiável, e configuração explícita de autenticação. Testar payload gigante, lote máximo, flood distribuído e rejeição de campos não permitidos.

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


### REPO-03 — Vulnerabilidades no lockfile (remediação parcial concluída)
**Severidade inicial:** Alta. **Status atual:** sem vulnerabilidades altas detectadas pelo gate; alertas moderados/baixos permanecem.

O primeiro `npm audit` reportou **30 vulnerabilidades: 2 high, 26 moderate e 2 low**. As duas vulnerabilidades altas identificadas foram:
- **Vite 5.4.21:** GHSA-587h-7wmj-h5pm, falha no `launch-editor` em Windows que permitia contornar a verificação de existência de arquivo; versão corrigida a partir de Vite 6.4.4.
- **Zod 3.25.76:** GHSA-mrhx-c7xc-m3w5, consumo excessivo de memória em validação de arrays sem limite; versão corrigida indicada a partir de Zod 4.6.6. O projeto não tinha importações diretas de Zod no código-fonte, então a dependência direta foi removida em vez de migrar a API.

**Correções aplicadas nesta branch:**
- Atualizado Vite para `^6.4.4`; o lockfile resolveu Vite 6.4.5.
- Removido Zod não utilizado.
- Removido `lovable-tagger`, que era usado somente como plugin de desenvolvimento do Vite; a configuração agora não depende desse plugin legado.
- Regenerado `package-lock.json` e aplicadas correções transitivas sem `npm audit fix --force`.

**Verificação:** o workflow isolado executou com sucesso `npm audit --audit-level=high`, lint, TypeScript, testes de invariantes da Jornada, Study e progresso do Livro-Curso, além do build de produção. Após a remediação, o relatório mostrou **25 vulnerabilidades: 23 moderate e 2 low; zero high**. Permanecem alertas moderados, entre eles deepmerge (prototype poisoning), glob, PostCSS e React Router. Não foram forçadas atualizações major para eliminar esses alertas. Uma tentativa isolada de migrar React Router para v7 provocou falha de build e foi revertida; a versão 6 permanece pendente de mitigação/upgrade compatível.

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
