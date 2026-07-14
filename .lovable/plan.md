# Reorganização da Navegação

Reorganizar a navegação da área logada em 6 seções com submenus, sem remover páginas, sem alterar rotas e sem tocar em lógica de negócio.

## Estrutura final

```
1. Início          → /dashboard
2. Jornadas        → /jornada  (+ submenus por fase)
3. Ferramentas PCH → /ferramentas  (+ submenus)
4. Biblioteca      → /explorar  (+ submenus)
5. Minha Evolução  → /dashboard#progresso  (+ submenus)
6. Perfil          → /perfil  (+ submenus)
```

Admin permanece separado, acessível só para admins, agrupado em Dashboard / Conteúdo / Usuários / Relatórios / Sistema.

## Mapa Menu → Submenu → Rota existente

**Início**
- Dashboard → `/dashboard`
- Continuar jornada → `continuePath` (dinâmico via `useJornada`)
- Prática de hoje → `/dashboard` (âncora)

**Jornadas** (fases de `JORNADA_DATA`)
- Despertar / Sombra / Reprogramação / Expansão → `/jornada` (filtrado por fase)
- Hábitos Diários → `/dashboard` (seção hábitos)

**Ferramentas PCH**
- Índice → `/ferramentas`
- Poema-diagnóstico → `/ferramentas/poemadiagnostico`
- Poema-Funil → `/ferramentas/poema-funil`
- Verso-Gatilho → `/ferramentas/verso-gatilho`
- Reescrita Poética → `/ferramentas/reescrita-poetica`
- Encenação Poética → `/ferramentas/encenacao-poetica`
- Poesia Hipnótica → `/ferramentas/poesia-hipnotica`
- Ritual do Silêncio → `/ferramentas/ritual-silencio`
- Caderno da Voz Interna → `/ferramentas/caderno-voz-interna`

**Biblioteca**
- Explorar → `/explorar`
- Fundamentação Teórica → `/fundamentacao`
- Recursos Clínicos → `/recursos-clinicos`
- Biblioteca de Exercícios → `/biblioteca-exercicios`
- Ciência & Poesia → `/ciencia-poesia`
- Mapa Cerebral → `/mapa-cerebral`
- Aula Exclusiva → `/aula-exclusiva`
- Livro do Curso → `/livro-curso`

**Minha Evolução**
- Progresso → `/dashboard`
- Prontuário → `/prontuario`
- Histórico de Consciência → `/consciencia-historico`
- Diagnóstico → `/diagnostico`
- Diagnóstico Jornada → `/diagnostico-jornada`

**Perfil**
- Meu Produto → `/meu-produto`
- Planos → `/planos`
- Sobre → `/sobre`
- Contato → `/contato`
- Changelog → `/changelog`
- Config → `/config`
- Sair → logout

Comunidade fica **oculta** até existir (nenhum item no menu).

## Implementação (frontend apenas)

1. **Novo componente `AppSidebar.tsx`** (desktop, ≥`lg`) usando shadcn `Sidebar` com `collapsible="icon"`. 6 grupos com submenus expansíveis. Highlight ativo via `useLocation`. Marca fase ativa com `defaultOpen` quando a rota bate.

2. **Novo componente `MobileMenuSheet.tsx`** — Sheet lateral disparado por um botão hamburger no `MobileNav`, contendo as 6 seções + submenus. O `MobileNav` bottom-bar continua com 4 atalhos rápidos (Início, Jornada, Ferramentas, Perfil), mas ganha um 5º item "Menu" que abre o Sheet completo.

3. **`Header.tsx`** — adicionar `SidebarTrigger` visível em desktop; preservar botão "Continuar jornada" e progresso.

4. **`App.tsx`** — envolver rotas logadas em `SidebarProvider` + `AppSidebar` para exibir sidebar apenas em rotas autenticadas. Páginas públicas (landing, login, vendas) não recebem sidebar.

5. **Fonte única `src/lib/navigation.ts`** — definir a estrutura das 6 seções + submenus como dado, consumida por `AppSidebar` e `MobileMenuSheet` (evita duplicação).

## Não faz parte

- Não renomeia páginas nem altera conteúdo.
- Não cria rotas novas (submenus apontam para rotas já existentes).
- Não remove `MobileNav` bottom bar; apenas adiciona acesso ao menu completo.
- Não mexe em Admin nesta rodada (posso fazer em rodada separada se quiser).
- Não implementa Comunidade (oculta).

## Validação

- `bun run build` passa.
- Todas as rotas atuais continuam acessíveis via novo menu.
- Mobile: bottom nav + sheet funcionam; desktop: sidebar colapsável funciona.
- Highlight de rota ativa correto em cada nível.

Confirma para eu executar? Se quiser Admin junto, ou ajustes na divisão de submenus, me diga antes.
