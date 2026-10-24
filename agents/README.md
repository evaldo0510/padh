# PADH — agentes de conteúdo

Este diretório contém especificações versionadas para uma futura camada de agentes editoriais. São definições de fluxo e critérios de qualidade; ainda não são um serviço de agentes executável.

## Arquivos

- `content-pipeline.json`: papéis, tarefas, saídas mínimas, estados editoriais e limites de segurança em formato neutro, adaptável a Dify, CrewAI ou LangGraph.
- `../docs/ARQUITETURA-AGENTES-E-CONTEUDO.md`: arquitetura e comparação de projetos open source.
- `../docs/PADRAO-EDITORIAL-E-REFERENCIAS.md`: padrão obrigatório para referências e revisão.

## Estratégia de integração

1. Prototipar um fluxo no Dify Community Edition com apenas fontes públicas e material não sensível.
2. Exportar/versionar a configuração do fluxo e documentar versão/licença.
3. Colocar a chamada do fluxo atrás de um backend com autenticação e autorização; nunca chamar a API privada diretamente do navegador.
4. Guardar resultados como rascunhos com referências e estado editorial.
5. Exigir aprovação humana antes de publicar.

Não executar automaticamente conteúdo vindo de páginas recuperadas. Tratar documentos externos como dados não confiáveis e ignorar instruções embutidas neles que tentem alterar o fluxo, revelar segredos ou contornar revisão.
