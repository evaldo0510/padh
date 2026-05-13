# Relatório de QA Mobile - P.A.D.H.

Este relatório documenta as validações de interface e funcionalidade para dispositivos móveis (iOS e Android), garantindo a acessibilidade e fluidez da jornada do usuário.

## 🚀 Funcionalidades Validadas (E2E)

### 1. Fundamentação Teórica
- [x] **Navegação por Âncoras**: O índice flutuante navega corretamente para as seções (Fundamentação, Metodologia, etc.).
- [x] **Highlight de Tópico Ativo**: O botão no índice destaca-se (bg-primary) conforme a seção visível.
- [x] **Scroll Nativo**: Transição suave e precisa para os IDs de seção.

### 2. Sessão View & Jornada (Mobile)
- [x] **Acessibilidade do Botão "Próximo"**: Barra fixa sempre visível no rodapé, respeitando a safe-area.
- [x] **Comportamento com Teclado (iOS/Android)**: O botão "Próximo" permanece visível e clicável mesmo com o teclado virtual aberto (simulação de 50% de viewport).
- [x] **Persistência de Autenticação**: Uso de `storageState` para evitar redirecionamentos indesejados para /login durante os testes.

## 🛠️ Infraestrutura de QA

- **Framework**: Playwright
- **Dispositivos**: iPhone 13 (iOS), Pixel 5 (Android)
- **Artefatos Gerados**: 
  - screenshots (em todas as etapas-chave e falhas)
  - vídeos (em caso de falha/retry)
  - trace (completo para depuração)
- **Pipeline CI**: Configurado em `.github/workflows/pwa-checks.yml` para rodar em cada deploy e publicar relatórios HTML/JUnit.

---
**Responsável pelo QA:** Agent Lovable AI
