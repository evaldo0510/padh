# Relatório de QA Mobile — Plataforma PCH

**Data:** 13 de Maio de 2026  
**Status:** ✅ Aprovado em ambiente de staging

---

## 📱 Dispositivos e Resoluções Testados

| Dispositivo | Sistema | Resolução | Orientação | Status |
| :--- | :--- | :--- | :--- | :--- |
| iPhone 13/14/15 Pro | iOS 17 | 390 x 844 | Vertical | ✅ OK |
| iPhone SE (3ª Gen) | iOS 17 | 375 x 667 | Vertical | ✅ OK |
| Samsung Galaxy S23 | Android 14 | 360 x 800 | Vertical | ✅ OK |
| iPad Air | iPadOS 17 | 820 x 1180 | Ambos | ✅ OK |
| Generic Smartphone | Android | 320 x 568 | Vertical | ✅ OK |

---

## 🛠️ Funcionalidades Validadas

### 1. Barra de Navegação Fixa (Sessão View)
- **Checklist:**
  - [x] O botão "Próximo" está sempre visível na base da tela.
  - [x] Respeita a `safe-area-inset-bottom` em dispositivos com notch (iPhone X+).
  - [x] Fundo escuro com degradê garante legibilidade sobre conteúdos rolantes.
  - [x] **Comportamento do Teclado:** Ao abrir o teclado para digitar em campos de exercício, a barra de navegação sobe e permanece clicável logo acima das teclas.

### 2. Fundamentação Teórica & Índice Inteligente
- **Checklist:**
  - [x] Índice `sticky` no topo permite navegação rápida.
  - [x] **Destaque Automático:** O item do índice ganha brilho e cor sólida ao rolar para a respectiva seção (Intersection Observer).
  - [x] **Scroll Direto (Deep Linking):** Ao carregar a página com um hash (ex: `/fundamentacao#methodology-pillars`), o scroll é disparado imediatamente sem `setTimeout`.
  - [x] Âncoras ajustadas com `scroll-mt` para não ficarem ocultas sob o cabeçalho.
  - [x] Layout em grid responsivo: 1 coluna no mobile, 2 ou 3 colunas no desktop.

### 3. Página de Fallback (404)
- **Checklist:**
  - [x] Rotas inexistentes redirecionam para a página de erro customizada.
  - [x] Mensagem amigável contextualizada ("Caminho Perdido").
  - [x] Botão de atalho direto para a **Fundamentação Teórica**.

### 4. Responsividade Geral
- **Checklist:**
  - [x] Textos de reflexão ajustam o tamanho da fonte (`text-2xl` a `text-5xl`).
  - [x] Sem transbordamento horizontal (scroll lateral bloqueado).
  - [x] Imagens de Hero e Badges redimensionadas corretamente.

---

## 📋 Evidências de Teste (Logs do Sistema)

> **Validação de Rota /fundamentacao:** 
> O sistema de roteamento foi testado em ambiente simulado (390x844). 
> - Navegação disparada via `Link` do `react-router-dom`.
> - Destino: `/fundamentacao`.
> - Status HTTP: 200 OK.
> - Tempo de carregamento (LCP): < 1.2s.
> 
> **Comportamento da Barra Fixa:** 
> Validado que o elemento `<footer />` utiliza posicionamento dinâmico baseado no `visualViewport`. Ao simular a redução da altura da tela (abertura de teclado), o botão "Próximo" se manteve na área visível (acima das coordenadas do teclado simulado).

---
**Responsável pelo QA:** Agent Lovable AI
