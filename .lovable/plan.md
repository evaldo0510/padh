
# Plano: Ferramentas Clínicas Avançadas para o Curso PCH/P.A.D.H.

## Visão Geral
Vou expandir a página `/curso-padh` adicionando 4 grandes recursos clínicos, sempre conectando o conteúdo aos teóricos fundadores (Freud, Jung, Lacan, Erickson, Bowlby, Frankl, Beck, Damásio) para dar consistência acadêmica.

---

## 1. Versões Imprimíveis em PDF (Protocolos + Exercícios por Módulo)

**Implementação:**
- Criar utilitário `src/lib/pdf-generator.ts` usando `jspdf` + `jspdf-autotable` (geração 100% client-side, sem backend).
- Criar componente `BotaoImprimirPDF.tsx` que aparecerá em cada módulo do curso.
- Cada PDF gerado conterá:
  - Cabeçalho com logo P.A.D.H. e nome do módulo
  - Protocolo clínico (sinais, aplicação, indicações, cuidados éticos)
  - **Fundamentação teórica** ligando ao teórico (ex.: Módulo 1 → Lacan e a "fala plena"; Módulo 4 → Erickson e linguagem hipnótica)
  - Exercícios práticos para o paciente levar para casa (em formato de "tarefas terapêuticas")
  - Espaço em branco para anotações
  - Rodapé com aviso ético

**Dois tipos de PDF por módulo:**
1. **PDF do Terapeuta** — protocolo completo, com hipóteses diagnósticas
2. **PDF do Paciente** — exercícios simplificados, poemas guia e prescrição poética

---

## 2. Template de Registro de Sessão (Prontuário PCH)

**Novo componente:** `src/components/clinical/PromtuarioSessao.tsx`

Será uma página dedicada em `/prontuario-pch` (acessível também como botão de download na página do curso).

**Estrutura do prontuário (também exportável em PDF):**
- **Identificação:** data, número da sessão, paciente (iniciais)
- **Queixa atual & estado emocional inicial** (escala 0-10)
- **Sinais observados pela linguagem** (checklist com hipóteses ligadas a:
  - Freud — atos falhos, lapsos
  - Lacan — significantes-mestre repetidos
  - Jung — símbolos arquetípicos emergentes
  - Bowlby — padrões de apego no discurso)
- **Pilar P.A.D.H. trabalhado na sessão** (P/A/D/H — checkbox)
- **Ferramenta aplicada** (Poema-Funil, Verso-Gatilho, etc.)
- **Aplicação passo a passo** (campos numerados 1-5)
- **Resposta do paciente:** verbal, corporal, emocional
- **Verso/poema co-criado em sessão** (campo aberto)
- **Cuidados éticos observados** (CFP / CFM checklist)
- **Hipótese teórica de leitura** (campo conectando à teoria)
- **Tarefa terapêutica** (homework poético)
- **Próximos passos**

---

## 3. Checklist Clínico Rápido (no início de cada módulo)

**Novo componente:** `src/components/clinical/ChecklistClinico.tsx`

Será inserido **no topo** de cada AccordionContent dos 8 módulos (sem alterar conteúdo existente).

**Estrutura do checklist (interativo + imprimível):**
- ☐ **Sinais presentes** (3-5 marcáveis, específicos do módulo)
- ☐ **Nível de contenção emocional** (Baixo / Moderado / Alto — radio)
- ☐ **Estado de rapport** (1-5)
- ☐ **Indicações respeitadas?** (sim/não)
- ☐ **Contraindicações verificadas?** (sim/não)
- ☐ **Próximo passo definido?** (campo aberto)
- ☐ **Referencial teórico ativado** (ex.: "Estou usando a escuta lacaniana?" / "Estou aplicando metáfora ericksoniana?")

O estado é salvo em `localStorage` para que o terapeuta não perca o preenchimento.

---

## 4. Fluxograma de Decisão Interativo

**Novo componente:** `src/components/clinical/FluxogramaDecisao.tsx`

Posicionado logo após a tabela de "Como Identificar Problemas" no topo da página.

**Funcionamento (decision tree interativa):**
- **Pergunta 1:** O paciente está em crise aguda (ideação suicida, surto)?
  - Sim → Bloco vermelho: "PCH não é primeira linha. Encaminhar para atendimento de urgência. Ler Frankl sobre sentido em situações-limite."
  - Não → próxima pergunta
- **Pergunta 2:** Qual o sintoma predominante observado?
  - Discurso rígido, absoluto → **Pilar P (M1)** — escuta semântica, base lacaniana
  - Crenças nucleares disfuncionais → **Pilar A (M2)** — reestruturação, base de Beck + Erickson
  - Defesas racionais altas → **Pilar A (M3-M4)** — linguagem hipnótica, base de Erickson
  - Trauma fragmentado → **Pilar D (M5)** — metáforas integradoras, base de Janet/Van der Kolk
  - Vazio existencial → **Pilar D (M6)** — poesia ritualística, base de Frankl/Jung
  - Necessidade de integração → **Pilar H (M7-M8)** — autonomia psíquica, base de Winnicott
- **Resultado:** card colorido com pilar recomendado + ferramenta + leitura teórica sugerida

**Tecnologia:** state machine simples com `useState`, sem libs externas.

---

## 5. Conexão Teórica Integrada (em TODOS os módulos)

Adicionarei um **novo card** chamado `<FundamentacaoTeorica />` ao final de cada módulo (sem remover conteúdo), conectando explicitamente:

| Módulo | Teóricos integrados |
|--------|-----|
| M1 — Poder das Palavras | **Lacan** (significante), **Freud** (associação livre), **Vygotsky** (linguagem e pensamento) |
| M2 — Reestruturação | **Aaron Beck** (TCC), **Albert Ellis** (TREC), **Piaget** (esquemas) |
| M3 — Linguagem Hipnótica | **Milton Erickson** (metáfora terapêutica), **Bandler & Grinder** (PNL) |
| M4 — Poemas Hipnóticos | **Erickson + Rossi** (sugestão indireta), **Damásio** (marcadores somáticos) |
| M5 — Técnicas Avançadas | **Jung** (arquétipos), **Joseph Campbell** (jornada do herói), **Hillman** (psicologia arquetípica) |
| M6 — Poesia Terapêutica | **Frankl** (logoterapia), **Pennebaker** (escrita expressiva), **Bolton** (poetry therapy) |
| M7 — Sessão em 4 Fases | **Winnicott** (holding), **Bowlby** (base segura), **Yalom** (fatores terapêuticos) |
| M8 — Exercícios Práticos | **Bandura** (autoeficácia), **Csikszentmihalyi** (flow), **Maslow** (auto-realização) |

---

## 6. Página Dedicada de Recursos Clínicos

**Nova rota:** `/recursos-clinicos`
- Hub centralizado com:
  - Download de todos os PDFs (terapeuta + paciente)
  - Acesso ao prontuário em branco
  - Acesso ao fluxograma standalone
  - Biblioteca de checklists por módulo
- Adicionar link no menu (Header) e no Footer

---

## Arquivos a Criar
1. `src/lib/pdf-generator.ts` — utilitário de geração PDF
2. `src/components/clinical/BotaoImprimirPDF.tsx`
3. `src/components/clinical/PromtuarioSessao.tsx`
4. `src/components/clinical/ChecklistClinico.tsx`
5. `src/components/clinical/FluxogramaDecisao.tsx`
6. `src/components/clinical/FundamentacaoTeorica.tsx`
7. `src/pages/RecursosClinicos.tsx`
8. `src/pages/Prontuario.tsx`
9. `src/lib/dados-clinicos.ts` — dados estruturados de cada módulo (sinais, teóricos, etc.)

## Arquivos a Modificar (apenas adições, sem remover conteúdo)
1. `src/pages/CursoPCH.tsx` — inserir Checklist no topo + Fundamentação Teórica + Botão PDF em cada módulo
2. `src/App.tsx` — adicionar rotas novas
3. `src/components/layout/Header.tsx` — link "Recursos Clínicos"
4. `src/components/layout/Footer.tsx` — link "Recursos Clínicos"
5. `src/lib/seo-config.ts` — SEO das novas páginas

## Dependência
- `jspdf` e `jspdf-autotable` (instalar via npm/bun)

---

## Aviso Ético
Todos os PDFs e prontuários incluirão rodapé:
> "Este material é uma ferramenta de apoio clínico baseada na metodologia P.A.D.H. Não substitui avaliação diagnóstica formal. Uso restrito a profissionais habilitados conforme CFP/CFM."
