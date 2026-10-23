# Auditoria Geral P.A.D.H. — Fase 1 (somente diagnóstico)

Nenhum arquivo foi alterado. Este documento é o relatório; aprovar significa apenas autorizar a escolha da Etapa 1 do plano (G).

## A. Resumo executivo
- Base sólida: rotas admin protegidas por papel, RPCs admin com checagem interna, CI com lint/typecheck/build, PWA com NetworkFirst para páginas.
- 1 falha crítica comprovada: a compra feita pelo app não é gravada (o banco recusa a gravação pelo navegador).
- Voz Interior/Google Live com microfone: não existe no código atual (nenhum uso de microfone ou de chave Google encontrado).
- Risco alto: cor do app instalado (roxo) diverge da marca; páginas de diagnóstico técnico expostas a qualquer usuário logado.

## B. Inventário (fato, lido em App.tsx e navigation.ts)
- Públicas: /, /livro-curso, /formacao, /formacao/modulo/:id, /mapa-cerebral, /aula-exclusiva, /sobre, /contato, /curso-padh, /ferramentas + 8 ferramentas, 8 páginas /venda/*, /fundamentacao, /ciencia-da-poesia, /combo-padh, /prontuario-pch, /prisao-interior, /planos, /explorar, /changelog, /offline, /diagnostico-jornada, /biblioteca-exercicios, /login, /diagnostico.
- Privadas (login): /recursos-clinicos, /meu-produto, /consciencia/historico, /jornada, /jornada/:phaseId/:sessionId, /dashboard, /diagnosticos, /configurar-supabase, /ui-guide.
- Admin (papel admin): /admin, /admin/web-vitals, /admin/pwa-health, /admin/pwa-diagnostics.
- Menu: 7 seções (Início, Jornadas, Ferramentas PCH, Biblioteca, Formação com 8 módulos, Minha Evolução, Perfil).
- Backend: 1 função (ingest-telemetry); 11 tabelas com RLS.
- Testes: 6 specs Playwright (a11y, auth, fundamentação, PWA x3); nenhum teste unitário.

## C/D. Achados

| # | Sev. | Achado | Evidência | Impacto |
|---|---|---|---|---|
| 1 | Crítico | Compra não é registrada | `useAuth.ts:89-124` faz upsert em `purchases`; política nega INSERT/UPDATE | Usuário "paga" e não recebe acesso; erro só no console |
| 2 | Alto | /diagnosticos, /configurar-supabase e /ui-guide abertas a qualquer logado | App.tsx sem `requireAdmin` | Telas técnicas visíveis a alunos |
| 3 | Alto | Cor do app instalado roxa (#8B5CF6), fundo branco | vite.config.ts manifest | Fere identidade Navy/Gold e o tema escuro padrão |
| 4 | Médio | /prontuario-pch é pública | App.tsx sem ProtectedRoute | Hipótese: se salvar dados, falha sem login |
| 5 | Médio | Registro do SW via `useRegisterSW` sem as barreiras de preview completas | PWAPrompt.tsx; guarda só em main.tsx (não cobre `preview--`, `beta.lovable.dev`, `?sw=off`) | Risco de conteúdo velho em pré-visualização |
| 6 | Médio | Dívidas já documentadas pendentes | docs/AUDIT.md (arquivos >600 linhas, DailyHabitSection), docs/A11Y.md (C7, headings, foco, h-screen) | Manutenção e acessibilidade |
| 7 | Baixo | 101 avisos de lint (`any`) com regra relaxada | eslint.config.js | Tipos frágeis |
| 8 | Baixo | CI de PWA depende de segredos de teste no GitHub | pwa-checks.yml | Não verificável daqui |

Não verificado (exigiria execução/alteração): Lighthouse/Web Vitals reais, PWA instalado em celular, conteúdo completo de cada módulo, resultado atual do scanner de segurança, workflows no GitHub.
Voz Interior/Google Live: comprovado que não há implementação; nenhuma credencial exposta encontrada no código (apenas chave pública do backend, que é permitida).

## E. Recomendações (impacto/risco/custo)
1. Mover a gravação da compra para uma função no servidor (corrige #1; também evita que o próprio usuário se libere acesso).
2. Exigir admin em /diagnosticos, /configurar-supabase, /ui-guide.
3. Ajustar cores do manifesto para a marca.
4. Decidir se /prontuario-pch deve exigir login.
5. Centralizar registro do SW num único módulo com todas as barreiras.
6. Seguir docs/A11Y.md (C7 em diante).

## F. Dependências e regressões
- #1 depende de um provedor de pagamento real; sem ele, a função só simula. Pode afetar MeuProduto, ProtectedRoute requireProduct.
- #3 exige reinstalar o app para quem já instalou.
- #5 pode mudar o aviso de atualização (testes pwa-*.spec.ts cobrem).

## G. Plano incremental (uma tarefa por etapa, cada uma aguarda aprovação)
1. Compra via servidor (#1).
2. Proteger rotas técnicas (#2).
3. Cores do manifesto (#3).
4. Prontuário: login sim/não (#4).
5. Registro único do SW (#5).
6. Acessibilidade C7.
7. Definir escopo da Voz Interior (feature nova, se desejada).

## H. Intocáveis
Conteúdo de jornadas, módulos, ferramentas e textos; design system e tipografia; RPCs admin e políticas já corrigidas; `ingest-telemetry`; arquivos gerados do backend; rotas existentes e URLs publicadas.
