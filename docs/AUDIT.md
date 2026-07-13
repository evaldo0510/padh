# Auditoria Técnica — READ-ONLY

Escopo: 201 arquivos `.ts/.tsx` em `src/`, 42.360 linhas. Nenhum arquivo funcional foi alterado.

Data: 2026-07-13
Categorias: Duplicação · Arquivos grandes · Estados complexos · Imports mortos · Padrões · Performance · Acessibilidade
Severidades: 🔴 Crítico · 🟠 Alto · 🟡 Médio · ⚪ Baixo

---

## 1. Duplicação

- 🔴 **`src/pages/ferramentas/*.tsx`** (8 arquivos: PoemaFunil, RitualSilencio, PoesiaHipnotica, VersoGatilho, EncenacaoPoetica, ReescritaPoetica, Poemadiagnostico, CadernoVozInterna) — mesmo esqueleto copiado (hero com badge "Ferramenta N — P.A.D.H.", `<h1>`, tagline, imagem, `ScientificValidation`, `PageLayout`), só mudam textos e ícone. Ex.: `PoemaFunil.tsx:9-40` ≈ `RitualSilencio.tsx:9-40`. → extrair `FerramentaLandingLayout` (análogo ao já existente `ToolSalesLanding` das páginas de venda).
- 🟠 Chamadas repetidas com mesmo shape para `episode_progress` em `src/hooks/useJornada.ts:96, 148, 262, 268, 315-316, 365, 372` — 4 upserts quase idênticos no mesmo hook. → extrair `upsertEpisodeProgress()` / `upsertExerciseResponse()` privadas ao hook.
- 🟡 `src/pages/venda/*.tsx` (9 arquivos) já usam `ToolSalesLanding` — bom. Mas cada página ainda tem o objeto de config inline extenso. → mover configs para `src/lib/sales-content.ts`, deixando a página só `<ToolSalesLanding {...content.poemaFunil} />`.
- 🟡 `findPhaseForSession` / `findPhaseForExercise` (`useJornada.ts:43,49`) fazem lookup linear em `JORNADA_DATA`; lógica análoga também em `JourneyPhases.tsx` e `jornada-data.ts`. → centralizar em `src/lib/jornada-helpers.ts`.
- ⚪ Lógica de streak/formatação de data espalhada entre `DailyHabitSection.tsx`, `GlobalProgressBar.tsx` e `changelog.ts` sem util único. → consolidar em `src/lib/date-utils.ts`.

---

## 2. Arquivos grandes demais (>400 linhas)

| Arquivo | Linhas | Sugestão de split |
|---|---:|---|
| `src/pages/ferramentas/PoesiaHipnotica.tsx` | 2336 | seções (hero, teoria, exemplos, exercícios) → subcomponentes |
| `src/pages/CursoPCH.tsx` | 2306 | mover currículo estático para `src/lib/curso-pch-data.ts` |
| `src/lib/scientific-studies.ts` | 910 | dividir por área temática |
| `src/components/dashboard/DailyHabitSection.tsx` | 773 | `HabitCheckinDialog`, `ReminderSettings`, `ReminderDebugPanel` |
| `src/components/ui/sidebar.tsx` | 769 | shadcn, aceitável — separar primitives vs. provider |
| `src/components/sections/FolheandoFe.tsx` | 762 | extrair form de check-in e listagem |
| `src/components/dashboard/PWAManager.tsx` | 740 | SW / update prompt / telemetria em hooks separados |
| `src/lib/dados-clinicos.ts` | 693 | dividir por categoria clínica |
| `src/lib/pdf-generator.ts` | 655 | por tipo de relatório |
| `src/lib/jornada-data.ts` | 654 | por fase (`fase-1.ts` …) |
| `src/pages/Sobre.tsx` | 643 | blocos estáticos como componentes |
| `src/pages/ferramentas/VersoGatilho.tsx` | 621 | ver item 1 |
| `src/pages/ferramentas/PoemaFunil.tsx` | 609 | idem |
| `src/App.tsx` | 606 | mover rotas para `src/routes.tsx` |
| `src/pages/SessaoView.tsx` | 585 | player/áudio, exercícios, navegação separados |
| `src/pages/ferramentas/ReescritaPoetica.tsx` | 578 | ver item 1 |
| `src/pages/ferramentas/EncenacaoPoetica.tsx` | 562 | idem |
| `src/pages/ComboPADH.tsx` | 533 | extrair seções de oferta |
| `src/pages/ferramentas/RitualSilencio.tsx` | 530 | ver item 1 |
| `src/integrations/supabase/types.ts` | 527 | auto-gerado, manter |
| `src/pages/ferramentas/CadernoVozInterna.tsx` | 523 | ver item 1 |
| `src/pages/Prontuario.tsx` | 504 | tabela de eventos + geração de PDF |
| `src/pages/AdminWebVitals.tsx` | 499 | gráficos em componentes |
| `src/pages/ferramentas/Poemadiagnostico.tsx` | 479 | ver item 1 |
| `src/components/sections/FerramentasPADH.tsx` | 479 | extrair card de ferramenta |
| `src/components/sales/ToolSalesLanding.tsx` | 457 | Hero/Problem/Solution/CTA |
| `src/hooks/useJornada.ts` | 450 | ver item 3 |
| `src/pages/Index.tsx` | 444 | seções da home em componentes |

+11 arquivos entre 350–400 linhas.

---

## 3. Estados complexos

- 🔴 **`DailyHabitSection.tsx:20-47`** — **11 `useState`** no mesmo componente misturando checkin, reminders, teste de notificação e diagnóstico de SW. → separar em `useHabitCheckin`, `useReminderSettings`, `useNotificationDebug` (ou `useReducer`).
- 🟠 **`SessaoView.tsx`** — 7 `useState` controlando fluxo de sessão/exercícios/áudio numa página. → extrair `useSessionPlayer`.
- 🟠 **`PWAManager.tsx`** (740 linhas) — mistura SW messages, cache manifest, diagnóstico de versão, telemetria e UI de update prompt. → dividir em `usePWAStatus`, `usePWATelemetry` + componente puro.
- 🟡 **`useJornada.ts`** (450 linhas) — fetch inicial, cache em `localStorage`, fila de sync offline e mutações de progresso num único hook. → `useJornadaLocalCache`, `useJornadaSync`, `useJornadaMutations`.
- 🟡 **`LoginPage.tsx`** — 5 `useState` sem `react-hook-form` (que já é dependência do projeto). → padronizar.
- ⚪ `ProgressPanel.tsx` (4 `useState`) e `admin/BehaviorAnalytics.tsx` (3 `useState` + fetch manual + `as any`) — candidatos a `useQuery`.

---

## 4. Imports desnecessários / mortos

- 🟡 **`package.json`**: dependência `pdfkit` (^0.18.0) **não aparece em nenhum arquivo de `src/`** (`grep -rl pdfkit src` = 0). Geração de PDF usa `jspdf`/`jspdf-autotable`. → remover se não for usada em edge functions/scripts.
- ⚪ Dependências de baixo uso (1 arquivo cada, apenas dentro de `src/components/ui/*`): `react-resizable-panels`, `vaul`, `embla-carousel-react`, `input-otp`, `cmdk`, `react-day-picker`. → confirmar via build+bundle analyzer se `carousel.tsx`, `drawer.tsx`, `resizable.tsx`, `input-otp.tsx`, `command.tsx`, `calendar.tsx` são renderizados em alguma rota; se não, remover componente + dependência.
- ⚪ `data?: any` em `usePWADiagnostics.ts:28`, `pwa-debug.ts:28` — tipos não fechados dificultam detectar uso real de campos.

> Ícones `lucide-react` importados e não usados **não** foram varridos automaticamente: a config atual de ESLint não expôs `@typescript-eslint/no-unused-vars` no ambiente da auditoria. Rodar `bun run lint` localmente fecha essa lacuna com precisão.

---

## 5. Inconsistências de padrão

- 🟠 **Data-fetching**: 4 arquivos usam `useQuery` (`admin/WebVitalsOverview.tsx`, `hooks/useIsAdmin.ts`, `pages/AdminPWAHealth.tsx`, `pages/AdminWebVitals.tsx`) vs. **42 arquivos** com fetch manual em `useEffect` (`useJornada.ts`, `useProfile.ts`, `admin/BehaviorAnalytics.tsx`, `Prontuario.tsx`, etc.). `@tanstack/react-query` já está instalado e configurado. → padronizar em `useQuery`/`useMutation`.
- 🟠 **`any`/`as any`** em 63 ocorrências, concentradas em: `PWAManager.tsx` (9×, linhas 21, 133, 152, 160, 165, 234, 276, 303, 339, 382, 432), `pdf-generator.ts` (220, 453-456, 519, 524, 566, 619), `pdf-utils.ts` (8, 50, 79), `admin/BehaviorAnalytics.tsx` (106-108, 122, 147), `usePWADiagnostics.ts:28,86`, `useAuth.ts:17`, `JourneyHero.tsx:10`, `MobileNav.tsx:44`, `FolheandoFe.tsx:613`, `web-vitals.ts:33`, `pwa-debug.ts:28,51,122`, `pwa-metrics.ts:23`. → tipar SW messages e `doc.lastAutoTable` (jspdf-autotable).
- 🟠 **Cores hardcoded** fora do design system (`text-white`, `bg-black`, `bg-[#...]`): **238 ocorrências**. → migrar progressivamente para tokens semânticos (`text-foreground`, `bg-background`, etc.).
- 🟡 `console.log/error/warn` em 21 arquivos fora de PWA/health (intencionais): `admin/BehaviorAnalytics.tsx`, `sales/FormacaoLeadForm.tsx`, `sections/BibliotecaDigital.tsx`, `useAuth.ts`, `useJornada.ts`, `Admin.tsx`, `Contato.tsx`, `DiagnosticsPage.tsx`, `Index.tsx`, `NotFound.tsx`, `ProfileProvider.tsx`, `main.tsx`. → remover ou usar logger condicionado a `import.meta.env.DEV`.
- ⚪ Export pattern está consistente entre `venda/*` e `ferramentas/*` (todos `export default`) — não é um problema real.

---

## 6. Performance / re-render (apenas apontamento)

- 🟡 **Nenhum uso de `React.memo`** no projeto (`grep -rl "React.memo\|memo(" src` = 0), incluindo `ToolSalesLanding.tsx` (457 linhas, usado por 8 páginas) e cards de `FerramentasPADH.tsx`.
- 🟡 98 `onClick={() => ...}` inline e 19 `style={{...}}` inline — novas referências a cada render, quebram memoização downstream se aplicada.
- ⚪ Páginas admin (`AdminWebVitals.tsx`, `AdminPWAHealth.tsx`, `admin/WebVitalsOverview.tsx`) sem compartilhar `queryKey` — refetch duplicado ao navegar.

---

## 7. Acessibilidade / semântica

- ⚪ Nenhum `<div onClick>` encontrado — bom.
- ⚪ 13 `<img` "sem alt" na mesma linha são todos falso positivo (alt na linha seguinte).
- 🟡 25 `<button>` sem `aria-label` na mesma linha; muitos têm filho textual (aceitável), mas botões só-com-ícone em `PWAManager.tsx` e `Header.tsx` merecem checagem manual.
- ⚪ `Diagnostico.tsx:216,264` têm 2 `<h1>` em ramos condicionais mutuamente exclusivos — não coexistem no DOM.
- ⚪ `formacao/ModuloFormacao.tsx` também reportado com 2 `<h1>` — não verificado se são condicionais; checar em 2 min.

---

## Top 10 dívidas técnicas — priorizadas

| # | Item | Severidade | Local |
|---:|---|---|---|
| 1 | Duplicação estrutural das 8 páginas de `ferramentas/*` | 🔴 | `src/pages/ferramentas/*.tsx` |
| 2 | `DailyHabitSection.tsx` com 11 `useState` misturando 4 responsabilidades | 🔴 | `src/components/dashboard/DailyHabitSection.tsx:20-47` |
| 3 | 4 upserts idênticos em `useJornada.ts` sem util | 🟠 | `src/hooks/useJornada.ts:96-372` |
| 4 | 238 cores hardcoded fora do design system | 🟠 | todo `src/` |
| 5 | 63 usos de `any`/`as any` concentrados em PWA e PDF | 🟠 | `PWAManager.tsx`, `pdf-generator.ts`, `pdf-utils.ts` |
| 6 | Inconsistência de data-fetching (4 `useQuery` vs 42 fetch manual) | 🟠 | vários |
| 7 | Arquivos com >2000 linhas (`PoesiaHipnotica.tsx`, `CursoPCH.tsx`) | 🟠 | `src/pages/ferramentas/PoesiaHipnotica.tsx`, `src/pages/CursoPCH.tsx` |
| 8 | `PWAManager.tsx` mistura 4 responsabilidades em 740 linhas | 🟠 | `src/components/dashboard/PWAManager.tsx` |
| 9 | `console.log/error` residual em 12+ arquivos de produção | 🟡 | vários |
| 10 | Dependência `pdfkit` aparentemente não usada em `src/` | 🟡 | `package.json` |

---

## Perguntas em aberto

- **Lint de imports/exports mortos**: rodar `bun run lint` localmente (config completa do projeto) para varredura precisa de ícones lucide não usados.
- **Dependências realmente órfãs**: confirmar via `vite build` + bundle analyzer se `carousel/drawer/resizable/input-otp/command/calendar` estão em rotas ativas.
- **`formacao/ModuloFormacao.tsx`** — checar se os 2 `<h1>` são condicionais como em `Diagnostico.tsx`.

---

## Como usar este relatório

Cada item lista **arquivo:linha** e **recomendação**. Nada foi alterado.
Próximo passo sugerido: você aprova quais dos "Top 10" viram tarefa. Recomendo começar pelo item **#1** (extrair `FerramentaLandingLayout`) — alto ganho de manutenção, risco baixo (páginas isoladas, sem lógica compartilhada).
