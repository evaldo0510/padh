# Revisão visual e funcional — 24/10/2026

## Escopo e preservação

Inspeção estática das páginas e componentes, apoiada nos relatórios AUDIT/A11Y, QA mobile, documentação PWA/Web Vitals, workflows e testes existentes. O estado inicial de trabalho estava limpo. Alterações anteriores e arquivos gerados da integração foram preservados. Nenhuma migration, alteração de credenciais, poema, currículo, rota ou URL foi executada.

## Correções

- Lucide permanece a família de ícones de interface. Foram encontradas 128 referências de importação e nenhuma biblioteca concorrente. O símbolo Google é uma marca, não um ícone genérico.
- Definidos os tamanhos antes ausentes de `spiritual-icon` (16px), `sm` (14px) e `lg` (24px); alinhamento e espessura consistentes. Dez emojis usados como ícones isolados foram substituídos nas áreas terapêuticas do curso e de Poesia Hipnótica. Emojis em poemas e textos autorais foram preservados.
- Rótulos de leitura e retorno no celular, fechamento em português com área de toque adequada, ações de cards visíveis também ao receber foco e foco global por teclado.
- A pena/folha já existente em `Logo` foi preservada, sem criação de marca ou slogan. Removidos texto microscópico, filtros e ring animado; aumentado o eixo dourado. Cabeçalho, rodapé, menus, login, splash, variantes feather e ícones favicon/PWA compartilham esse desenho. Os ícones maskable mantêm o desenho na área segura. Variantes flow/glow continuam decorativas, com IDs SVG únicos.
- Fontes já declaradas Playfair Display/Source Sans 3 passaram a ser carregadas; cores de controles, campos, badges e navegação usam tokens com suporte a tema claro/escuro.
- Corrigida sobreposição entre cabeçalho e barra de retorno no celular, título redundante de navegação e ausência de main na home pública.
- Corrigido estouro de largura na Formação, botões longos dos módulos e lista teórica de Encenação Poética, sem mudar suas palavras.
- A apresentação de boas-vindas não bloqueia mais login ou páginas públicas: permanece nas entradas autenticadas de início/jornada. OAuth retorna pela página pública de login, preservando o destino solicitado.
- Corrigido seletor e espera de redirecionamento no setup de autenticação dos testes.

## Verificações comprovadas

- Lint: zero erros; 105 avisos preexistentes mantidos.
- Typecheck/build automáticos: última entrada `build OK`; erro intermediário de narrowing corrigido antes de finalizar.
- Jornada: quatro fases e 18 sessões válidas. Currículo: oito módulos únicos em quatro etapas, links complementares válidos.
- Verificação sintática do service worker: passou.
- Playwright: dez testes passaram, em desktop e celular, cobrindo rotas públicas/protegidas, primeira visita do login, Tab/Shift+Tab, Enter no menu e restauração de foco.
- A versão JS do Playwright solicitava Chromium não instalado. Sem instalar dependências, a execução foi adaptada somente em `/tmp` para conectar ao Chromium já disponível. Configuração do projeto intacta.
- Navegador com sessão real: próxima prática abriu a fase/sessão correta; módulo 1 abriu autenticado; conta sem papel admin foi redirecionada. Nenhum exercício foi concluído. Desktop 1280×1800 e celular 390×844 verificados, incluindo tema claro e ausência de overflow nas páginas amostradas.
- Scan básico de segurança: nenhum problema encontrado; não equivale a análise profunda completa.
- Diff completo revisado contra o estado anterior às alterações desta revisão, sem erros de whitespace.

## Limitações e pendências

- Auditoria estática cobriu os usos de ícones; inspeção visual dinâmica foi amostral, não cada estado de todas as páginas.
- A conta disponível não é administradora: conteúdo interno do painel não foi validado autenticado como admin; sua proteção foi verificada.
- Login com senha, criação de conta e consentimento Google não foram concluídos por ausência de credenciais de teste; sessão autenticada disponível foi usada no restante.
- Suíte integral antiga não executada: depende de credenciais e inclui testes de produção/cache e referências desatualizadas de sessões; não afirmar aprovação global dessa suíte.
- PWA instalado, atualização entre versões e cache em produção exigem publicação concluída.
- Há links sociais `#` e contato sem confirmação no rodapé, imagem externa apresentada como autor na Formação e cartões administrativos sem ação. Não foram inventados destinos, fotos ou funcionalidades para preencher esses pontos.
- Ainda existem estilos legados e classes sem token em páginas específicas. A revisão segura não foi uma migração visual ampla.
- Primeira publicação solicitada: endereço respondeu HTTP 200 e HTML incluiu as fontes desta revisão. Correção residual de Encenação Poética aplicada depois exige nova publicação; resultado final deve ser confirmado separadamente.

## Arquivos alterados

`AGENTS.md`, `roadmap.md`, `index.html`, `src/index.css`; layouts Header/MobileNav/NavigationSheet/PageHeader/PageLayout/SplashScreen; UI Logo/PCHSymbol/StreamingCard/badge/button/dialog/input/sheet/text-reader/textarea/theme-toggle; UserWorkspace, PCHWelcome, FormacaoStudySignup; páginas CursoPCH/Formacao/Index/LoginPage/PoesiaHipnotica/ModuloFormacao; testes auth.setup e interface-review; `public/padh-mark.svg`, favicon SVG/PNG, logo-pwa.svg, pch-logo.svg e PNGs 32/48/96/180/192/512, apple-touch-icon e ícones PWA 192/512/maskable; este relatório.