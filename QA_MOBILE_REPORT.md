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
  - [x] Âncoras ajustadas com `scroll-mt` para não ficarem ocultas sob o cabeçalho.
  - [x] Layout em grid responsivo: 1 coluna no mobile, 2 ou 3 colunas no desktop.

### 3. Responsividade Geral
- **Checklist:**
  - [x] Textos de reflexão ajustam o tamanho da fonte (`text-2xl` a `text-5xl`).
  - [x] Sem transbordamento horizontal (scroll lateral bloqueado).
  - [x] Imagens de Hero e Badges redimensionadas corretamente.

---

## 📋 Evidências de Teste

> **Botão Próximo (Mobile):** Validado que o elemento `<footer />` utiliza `flex-col` dentro de um container `fixed inset-0`, garantindo que o `flex-1` do conteúdo principal empurre o botão para a base visível do viewport, independente do tamanho da tela.
> 
> **Âncoras do Índice:** Testado o salto suave (smooth scroll) entre "Metodologia" e "Ciência", com validação visual do estado ativo no menu superior.

---
**Responsável pelo QA:** Agent Lovable AI
