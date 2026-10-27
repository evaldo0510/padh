# PADH — Auditoria técnica contínua

- **Status:** NÃO APROVADO — AINDA HÁ PENDÊNCIAS
- **Data da coleta:** 2026-10-27
- **Escopo desta rodada:** repositório GitHub `evaldo0510/padh`, PR #7 / branch `agent/pch-fixer-audit`, tabelas/políticas/funções do projeto Supabase `njbgkrgynskcbwomipua`.
- **Limite importante:** esta rodada não inspecionou cada arquivo do repositório nem executou a suíte local completa. Não declarar auditoria integral concluída.

## Evidências coletadas

| ID | Gravidade | Área | Evidência | Estado |
|---|---|---|---|---|
| DB-001 | Média | RLS / desempenho | `public.daily_checkins` tinha políticas permissivas duplicadas para INSERT e SELECT: `Users can create their own check-ins` + `Users can insert their own checkins`; `Users can view their own check-ins` + `Users can view their own checkins`. Os predicados verificados eram equivalentes (`auth.uid() = user_id`). | Correção proposta em migração; não aplicada no banco de produção e ainda requer CI/revisão. |
| DB-002 | Média | RLS / desempenho | Alertas anteriores do Supabase Advisor indicam 34 políticas com avaliação repetida de `auth.uid()` (`auth_rls_initplan`). | Aberto; requer inventário das políticas afetadas e correção individual com testes. |
| DB-003 | Média | Índices | Advisor indicou 5 chaves estrangeiras sem índice: `padh_agent_runs.requested_by`, `padh_content.created_by`, `padh_content.updated_by`, `padh_courses.created_by`, `padh_lesson_progress.lesson_id`. | Aberto; avaliar consultas e criar índices em migração revisável. |
| SEC-001 | Alta | Funções privilegiadas | Cinco funções SECURITY DEFINER executáveis por `authenticated`: `admin_funnel_matrix`, `admin_weekly_cohort`, `get_tables_security`, `has_role`, `is_padh_admin`. As definições consultadas fazem verificação de administrador em funções de administração; a função `has_role` limita o usuário consultado ao próprio `auth.uid()` e ao e-mail configurado, além da role. | Revisão de escopo/EXECUTE pendente; não alterar permissões sem verificar todos os chamadores. |
| SEC-002 | Média | Supabase Auth | Advisor indicou proteção contra senhas comprometidas desativada. | Aberto; configuração hospedada não foi alterada. |
| APP-001 | Média | OAuth | `LoginPage.tsx` na branch do PR direciona o callback do domínio legado `padh-two.vercel.app` para `padhpoesia.vercel.app`. Preview Vercel foi sinalizado READY e `/login` respondeu HTTP 200 em checagem anterior. | Parcialmente verificado; o round-trip real Google OAuth e a allowlist/Site URL do Supabase não foram validados. |
| APP-002 | Média | Estado do administrador | Diff do PR substitui o fallback de configuração de e-mail em `useIsAdmin.ts` por um e-mail fixo no código. | Revisar antes do merge: não há evidência nesta rodada de que fixar o e-mail em código seja necessário; preservar configuração explícita e garantir autorização no banco. |
| CI-001 | Alta | Pipeline | O PR acrescenta `npm audit --audit-level=high`, lint, TypeScript, testes de invariantes de jornada/currículo e build ao CI. O status consultado para o SHA do PR retornou apenas um check Vercel com sucesso; não foi possível confirmar resultados dos comandos de CI. | Verificação pendente. |
| AGENT-001 | Alta | Automação | PR #7 está aberto como draft. O workflow PCH Fixer exige variável `PCH_FIXER_ENABLED=true` e segredo `OPENAI_API_KEY`; não há evidência de execução do agente nem confirmação de ativação dessas configurações. | Bloqueado por configuração/execução não confirmada. |

## Inventário parcial

### Consultado nesta rodada
- Metadados e diff do PR #7, incluindo os 12 arquivos alterados.
- `package.json`: scripts de lint/build, testes `test:jornada`, `test:study`, `test:pwa`, `test:smoke` e Lighthouse.
- Workflow `.github/workflows/ci.yml`.
- Workflow `.github/workflows/pch-fixer-agent.yml` via diff do PR.
- Migração proposta `supabase/migrations/20261027030000_optimize_daily_checkins_rls.sql`.
- Estrutura de tabelas (RLS habilitada nas tabelas retornadas), histórico de migrações e políticas de `daily_checkins`, `user_events`, `padh_agent_runs`, `profiles`, `purchases`, `padh_content`, `padh_courses`, `padh_lessons`, `padh_lesson_progress`.
- Definições das funções públicas SECURITY DEFINER.
- Contagem de linhas em `profiles` e `user_events`; os resultados não fornecem evidência suficiente para validar persistência real de um usuário final.

### Não inspecionado / não verificado
- Todos os arquivos e todas as rotas/componentes individualmente.
- Execução local integral de `npm ci`, `npm audit`, lint, ambos os typechecks, testes, Playwright, smoke tests e build.
- Console/network do navegador em cada rota e em dispositivo móvel.
- Cadastro real, confirmação de e-mail, login com senha, recuperação de conta, login Google completo, logout e sessão expirada.
- Persistência de perfil/progresso usando uma conta de teste controlada.
- Definições completas de políticas de todas as tabelas, buckets/storage e grants fora do conjunto consultado.
- Configurações hospedadas de OAuth, allowlist/Site URL e proteção de senha comprometida.
- Auditoria completa de segredos/histórico Git e variáveis do ambiente Vercel/GitHub.

## Próximas ações técnicas
1. Confirmar e registrar os resultados reais do CI do PR antes de aceitar qualquer correção.
2. Rever o diff completo e corrigir alterações não justificadas ou riscos introduzidos.
3. Auditar as demais políticas RLS por tabela, incluindo roles, `USING` e `WITH CHECK`; não executar mudanças em massa.
4. Adicionar índices para FKs somente após conferir consultas e uso, em migração separada.
5. Rever EXECUTE/SECURITY DEFINER por função e por chamador; não remover acesso necessário à aplicação.
6. Executar os testes do repositório e os fluxos críticos em navegador; registrar comando, resultado e limitações.
7. Validar o round-trip OAuth e configuração do Supabase antes de marcar o redirecionamento como resolvido.

## Regra de encerramento
A auditoria permanece **NÃO APROVADO — AINDA HÁ PENDÊNCIAS**. Uma alteração no GitHub ou um preview READY não equivale a correção verificada em produção. Não foi aplicada migração ao banco de produção, nem foi feito merge/deploy.
