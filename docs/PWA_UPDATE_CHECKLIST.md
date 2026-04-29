# PWA Update — Checklist de Validação em Produção

Use este checklist após cada deploy importante para garantir que usuários
recebem a versão mais recente sem precisar limpar cache manualmente.

## Pré-deploy

- [ ] Atualizei `APP_VERSION` em `src/lib/changelog.ts`
- [ ] Adicionei uma nova entrada no array `CHANGELOG` com data e destaques
- [ ] Verifiquei que `vite.config.ts` mantém `skipWaiting: true` e `clientsClaim: true`
- [ ] HTML/JS/CSS continuam em `NetworkFirst`; só imagens/fontes em `StaleWhileRevalidate`

## Pós-deploy (em produção, NÃO no preview do Lovable)

### 1. Banner aparece
- [ ] Abra o site em uma aba que já tinha sido aberta antes do deploy (sem hard reload)
- [ ] Aguarde até 60s — o `PWAUpdatePrompt` faz polling de update a cada minuto
- [ ] O banner "Nova versão disponível" aparece no canto inferior

### 2. Link de changelog funciona
- [ ] Clique em "Ver o que mudou" no banner
- [ ] A rota `/changelog` abre listando a versão atual no topo
- [ ] Conferir que a versão exibida bate com `APP_VERSION`

### 3. Botão atualiza corretamente
- [ ] Clicar em "Atualizar" no banner
- [ ] O service worker novo assume controle (evento `controllerchange`)
- [ ] A página recarrega automaticamente (1 vez só)
- [ ] Após reload, a UI mostra o conteúdo novo do deploy
- [ ] O banner não reaparece imediatamente

### 4. Recarregamento natural também funciona
- [ ] Em outra aba antiga, faça F5 normal (não Ctrl+Shift+R)
- [ ] HTML é buscado via NetworkFirst → versão nova entra em ≤ 3s
- [ ] JS/CSS bundles trazem hash novo do Vite → sem código stale

### 5. Offline fallback
- [ ] No DevTools → Network, ative "Offline"
- [ ] Navegar para uma rota não cacheada (ex.: `/rota-inexistente-xyz`)
- [ ] A tela `/offline` (ou `Offline.tsx`) aparece com links para rotas públicas
- [ ] Voltar online → recarrega normalmente

### 6. Preview do Lovable (sanity check)
- [ ] Abrir `id-preview--*.lovable.app`
- [ ] Confirmar via DevTools → Application → Service Workers que NENHUM SW está registrado
- [ ] Caches do Workbox não devem existir no Storage

## Falhas conhecidas → ações

| Sintoma | Ação |
|---|---|
| Banner não aparece após 1 min | Verificar console por erro em `serviceWorker.getRegistration()` |
| Página recarrega em loop | Algum outro listener de `controllerchange` está chamando reload — só `PWAUpdatePrompt` deve fazer isso |
| UI continua antiga após atualizar | Confirmar que `cleanupOutdatedCaches: true` está ativo no Workbox |
| Update banner em iframe Lovable | O guard em `main.tsx` deveria suprimir — checar `isPreviewHost` |

## Smoke test rápido (1 min)

1. Abra produção → DevTools → Application → Service Workers → "Update on reload" OFF
2. Faça um deploy trivial (mude um texto visível)
3. Volte à aba sem fechar
4. Aguardar até 60s OU forçar `navigator.serviceWorker.getRegistration().then(r => r.update())` no console
5. Banner deve surgir → clicar Atualizar → texto novo aparece após reload automático
