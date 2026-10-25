# PCH Fixer Agent

O PCH Fixer é um agente de manutenção para o P.A.D.H. Ele usa a ação oficial `openai/codex-action` para investigar falhas e preparar correções revisáveis. O agente **não faz merge nem deploy automático**.

## Ativação necessária no GitHub

Um administrador do repositório precisa configurar:

1. Em **Settings → Secrets and variables → Actions → Secrets**, adicionar `OPENAI_API_KEY` com uma chave de API OpenAI válida. Essa chave é separada da assinatura do ChatGPT e pode gerar cobrança de API.
2. Em **Settings → Secrets and variables → Actions → Variables**, criar `PCH_FIXER_ENABLED` com o valor `true`.
3. Confirmar que GitHub Actions está habilitado e que a política do repositório permite os workflows usados.

Não coloque a chave no código, nos arquivos do projeto, em issues, nem em mensagens de commit.

## Como funciona

- **Automático:** quando o workflow `CI` falha em uma execução originada da branch `main`, o agente é acionado para diagnosticar a falha e tentar uma correção.
- **Manual:** em **Actions → PCH Fixer Agent → Run workflow**, executado na branch `main`.
- O agente instala dependências, inspeciona o projeto, tenta executar os checks relevantes e prepara um patch.
- Uma etapa separada aplica o patch e abre um **rascunho de pull request** para revisão humana.
- Se não houver correção, o relatório é publicado como artefato da execução. Se a correção não passar pelos checks, ela não deve ser considerada validada.
- Execuções originadas de pull requests externos não acionam o agente, evitando expor a chave a código não confiável.

## Segurança e limites

- O agente não recebe permissão para gravar diretamente na branch principal.
- O patch é uma proposta: revise o diff, o relatório e os resultados de CI antes de aprovar.
- O agente não deve reduzir testes, remover regras de segurança nem alterar dados de produção para “fazer passar”.
- A API key precisa de orçamento e limites de uso apropriados na plataforma OpenAI.
- A primeira execução deve ser supervisionada. A qualidade da correção depende dos testes existentes e da capacidade de reproduzir o defeito.

## Diagnóstico atual

O repositório já possui um workflow CI com lint, TypeScript, testes de invariantes de jornada e currículo, e build. O PCH Fixer reaproveita essas verificações; ele não substitui a CI.
