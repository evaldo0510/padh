# Dr. Poesia — arquitetura independente de provedor

O Dr. Poesia mantém identidade, regras pedagógicas, autenticação e recuperação de conteúdo no projeto PADH. O provedor de linguagem é uma dependência substituível.

## Configuração atual (NVIDIA)

A configuração padrão permanece NVIDIA, para preservar o comportamento já integrado:

- `AI_PROVIDER=nvidia` (opcional; esse é o padrão)
- `NVIDIA_API_KEY` — segredo armazenado somente no ambiente do servidor
- `NVIDIA_MODEL` — opcional; padrão atual: `nvidia/nemotron-3.5-super-vl-120b-a12b`
- `NVIDIA_API_URL` — opcional; padrão: endpoint NVIDIA Chat Completions

Não coloque chaves em variáveis `VITE_*`, no frontend, no Git ou em mensagens.

## Troca futura para outro provedor compatível

Para um serviço que implemente a API OpenAI Chat Completions:

- `AI_PROVIDER=openai-compatible`
- `AI_BASE_URL` — endpoint completo de Chat Completions
- `AI_MODEL` — identificador do modelo nesse serviço
- `AI_API_KEY` — chave secreta desse serviço

Cadastre essas variáveis como segredos no ambiente de Preview primeiro. Faça um teste autenticado e de resposta antes de alterar Production. Para voltar à NVIDIA, defina `AI_PROVIDER=nvidia` e mantenha `NVIDIA_API_KEY` configurada.

## O que permanece independente

- Prompt de identidade, missão, limites éticos e formato pedagógico do Dr. Poesia.
- Recuperação lexical do acervo PCH e as referências de origem.
- Autenticação Supabase e validação de sessão no servidor.
- Interface e histórico da conversa no cliente.

## Limites desta etapa

O adaptador atual suporta NVIDIA e endpoints OpenAI-compatíveis. Ele não migra automaticamente conversas entre provedores, não replica cotas/créditos e não garante equivalência de qualidade entre modelos. A base de conhecimento conectada continua parcial e contém o Capítulo 5; ampliar o acervo é uma etapa separada.

## Procedimento de renovação da chave NVIDIA

1. Criar/renovar a chave no painel NVIDIA antes da expiração.
2. Atualizar somente o segredo `NVIDIA_API_KEY` no ambiente Vercel de Preview.
3. Fazer uma chamada autenticada de teste.
4. Depois da validação, atualizar Production em uma mudança separada e autorizada.
5. Revogar a chave antiga após confirmar que a nova funciona.

A chave nunca deve ser copiada para o repositório.
