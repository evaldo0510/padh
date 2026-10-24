# Arquitetura de agentes e produção de conteúdo do PADH

## Objetivo

Criar uma linha de produção editorial assistida por IA para a Poesia Cognitiva Hipnótica (PCH) e o PADH, sem delegar decisões clínicas, publicações ou permissões sensíveis a agentes autônomos. O diferencial deve vir da curadoria autoral, dos materiais originais, da organização pedagógica, da transparência das referências e da validação contínua — não de promessas de exclusividade mundial que ainda não tenham sido demonstradas.

## O que entra no repositório agora

Esta documentação estabelece a arquitetura e os critérios para integrar ferramentas externas. Não instala nem hospeda Dify, CrewAI ou LangGraph dentro do frontend React. São serviços/frameworks separados, com dependências, custos operacionais, atualizações e requisitos de segurança próprios.

## Ferramentas avaliadas

| Projeto | Uso sugerido no PADH | Licença e observação |
| --- | --- | --- |
| [Dify](https://github.com/langgenius/dify) | Protótipo visual de fluxos, base de conhecimento/RAG e revisão de material com fontes. | A licença é a Dify Open Source License, baseada em Apache 2.0 com condições adicionais. Rever o texto da licença antes de redistribuir ou oferecer serviço. |
| [CrewAI](https://github.com/crewAIInc/crewAI) | Orquestrar papéis editoriais especializados e tarefas estruturadas. | MIT; framework Python. Usar para protótipos controlados, não para autorizar publicação automática. |
| [LangGraph](https://github.com/langchain-ai/langgraph) | Fluxos com estado, pontos de aprovação humana, retentativas e trilha de auditoria. | MIT; existe também implementação JS/TS. Bom candidato quando o fluxo precisar de maior controle. |

Links e licenças foram consultados em 2026-10-24. Revalidar licença, versão, requisitos e segurança antes de instalar em produção.

## Arquitetura recomendada

1. **PADH web (React/Vite):** apresenta conteúdos públicos, área de membros, cursos e vídeos. Não guarda chaves privadas de modelos nem credenciais dos agentes.
2. **API de conteúdo (backend separado):** autentica chamadas, valida permissões, aplica limites e registra execuções. Só deve ser criada após decidir hospedagem, autenticação de serviço e orçamento.
3. **Orquestrador de agentes:** começar com Dify para validar o processo editorial. Se forem necessárias regras mais específicas, avaliar CrewAI ou LangGraph. Não instalar os três de início.
4. **Base de conhecimento:** documentos próprios aprovados, bibliografia verificável, metadados de fonte e versões. A recuperação deve priorizar as fontes cadastradas, e não a memória livre do modelo.
5. **Revisão humana obrigatória:** rascunhos ficam em estado pendente. Apenas pessoa autorizada pode aprovar e publicar.
6. **Catálogo de cursos/vídeos:** cada aula deve ter título, descrição, módulo, nível de acesso, URL/arquivo, legenda/transcrição, autor, estado editorial e referências quando houver afirmações factuais.
7. **Auditoria:** registrar quem solicitou, fontes recuperadas, versão do prompt/modelo, resultado da revisão, aprovação e versão publicada. Não registrar dados sensíveis de pacientes nos prompts.

## Papéis sugeridos para os agentes

- **Pesquisador bibliográfico:** encontra referências primárias, DOI/URL, autoria, ano, tipo de estudo e limitações. Não pode inventar dados bibliográficos.
- **Redator pedagógico:** transforma conteúdo aprovado em explicações, exercícios e materiais originais, preservando a distinção entre evidência, hipótese, metáfora e proposta autoral.
- **Revisor científico:** verifica se cada afirmação empírica é sustentada pela fonte citada, se a conclusão não excede os resultados e se há fontes divergentes.
- **Revisor de segurança e ética:** procura promessas de cura, diagnóstico informal, causalidade não demonstrada, instruções de risco e linguagem que substitua cuidado profissional.
- **Editor de estilo e originalidade:** verifica clareza, redundância, tom e semelhanças excessivas; não certifica originalidade absoluta nem faz afirmações de “único no mundo”.
- **Aprovador humano:** revisa a ficha de fontes, as limitações e o texto final antes de publicar.

## Política obrigatória de referências

1. Toda afirmação específica, contestável, estatística, clínica, histórica ou sobre eficácia deve ter fonte adequada, próxima da afirmação.
2. Preferir artigo original, revisão sistemática, diretriz profissional, documento institucional ou livro acadêmico identificável. Uma página comercial não deve fundamentar alegação de eficácia.
3. Informar autores, título, ano, periódico/editora e DOI/URL quando disponíveis. Distinguir publicação revisada por pares de preprint, opinião, material didático ou fonte secundária.
4. Conferir se a fonte realmente existe e se apoia a afirmação. Não inventar DOI, página, autores, título, resultado ou citação textual.
5. Indicar quando a evidência é preliminar, indireta, mista ou insuficiente. Ausência de fonte não prova que algo é falso; significa que a afirmação não deve ser apresentada como fato estabelecido.
6. Distinguir claramente: **evidência publicada**, **interpretação**, **hipótese de trabalho**, **metáfora poética** e **proposta original do PADH**.
7. Conteúdo original do PADH deve ter autoria, data, versão e histórico de revisão. Referências teóricas não devem ser usadas para insinuar que a metodologia inteira foi validada quando o estudo avaliou apenas um componente relacionado.
8. Não apresentar poesia, metáforas ou exercícios como diagnóstico, tratamento comprovado ou substituto de avaliação e acompanhamento profissional.
9. Respeitar direitos autorais: citar e resumir com atribuição; não importar livros, poemas ou cursos protegidos para a base de conhecimento sem permissão/licença apropriada.
10. Em conteúdo clínico, pedir revisão de profissional qualificado antes da publicação. A IA auxilia a redação, não assume responsabilidade clínica.

## Ciclo de publicação

`proposta → busca de fontes → rascunho → checagem de cada afirmação → revisão ética/segurança → aprovação humana → publicação versionada → revisão periódica`

Estados mínimos: `draft`, `needs_sources`, `in_review`, `approved`, `published`, `needs_update`, `rejected`.

## Critérios de aceitação antes de ligar agentes ao PADH

- Nenhuma chave de API exposta em variáveis `VITE_*` ou no bundle do navegador.
- Autorização validada no servidor; conteúdo privado e material de pacientes não enviado a terceiros sem base legal, consentimento e avaliação de privacidade.
- Fontes persistidas como dados estruturados, com URL/DOI e data de consulta.
- Aprovação humana obrigatória; agentes não podem publicar, mudar papéis de usuário ou editar políticas de acesso.
- Testes para referências inexistentes, afirmações sem fonte, prompt injection em documentos recuperados, vazamento de segredos e acesso indevido.
- Orçamento, limites de uso, logs com retenção definida e mecanismo para desligar o serviço.
- Licenças de cada dependência e modelo verificadas para o uso pretendido.

## Próximos passos de engenharia

1. Concluir e validar autenticação e autorização de membros/admin.
2. Criar no backend um catálogo de conteúdo com metadados de autoria, fontes, versão e estado editorial.
3. Prototipar um fluxo Dify com documentos não sensíveis e bibliografia pública.
4. Avaliar qualidade com um conjunto de exemplos revisados por humano e medir precisão de citações antes de qualquer uso de produção.
5. Integrar o PADH à API do fluxo com permissões mínimas; manter publicação e administração fora do alcance autônomo dos agentes.
