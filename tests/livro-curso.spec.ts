import { test, expect, type Page } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

const TEST_USER_ID = '00000000-0000-4000-8000-000000000001';

const ensureLocalTestTarget = () => {
  const target = process.env.TARGET_URL ?? 'http://localhost:8080';
  if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(target)) {
    throw new Error('A sessão sintética deste teste só pode ser usada contra um servidor local.');
  }
};

const getLocalSupabaseConfig = () => {
  const envUrl = process.env.VITE_SUPABASE_URL;
  if (!envUrl) throw new Error('Defina VITE_SUPABASE_URL para executar a sessão sintética local.');
  const url = new URL(envUrl);
  return { origin: url.origin, projectId: process.env.VITE_SUPABASE_PROJECT_ID ?? url.hostname.split('.')[0] };
};

async function installLocalSupabaseMocks(page: Page) {
  const supabase = getLocalSupabaseConfig();
  const completed = new Set<string>();
  const user = {
    id: TEST_USER_ID,
    aud: 'authenticated',
    role: 'authenticated',
    email: 'padh-local-test@example.invalid',
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: {},
    identities: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  await page.route(`${supabase.origin}/**`, async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    };

    if (method === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: corsHeaders, body: '' });
      return;
    }

    if (url.pathname.endsWith('/auth/v1/user')) {
      await route.fulfill({ status: 200, contentType: 'application/json', headers: corsHeaders, body: JSON.stringify(user) });
      return;
    }

    if (url.pathname.endsWith('/rest/v1/padh_livro_curso_progress')) {
      if (method === 'GET') {
        const rows = [...completed].map((chapter_id) => ({ chapter_id }));
        await route.fulfill({ status: 200, contentType: 'application/json', headers: corsHeaders, body: JSON.stringify(rows) });
        return;
      }
      if (method === 'POST') {
        const body = request.postDataJSON() as { chapter_id?: string } | Array<{ chapter_id?: string }>;
        for (const row of Array.isArray(body) ? body : [body]) {
          if (row.chapter_id) completed.add(row.chapter_id);
        }
        await route.fulfill({ status: 204, headers: corsHeaders, body: '' });
        return;
      }
      if (method === 'DELETE') {
        const chapterFilter = url.searchParams.get('chapter_id')?.replace(/^eq\./, '');
        if (chapterFilter) completed.delete(chapterFilter);
        await route.fulfill({ status: 204, headers: corsHeaders, body: '' });
        return;
      }
    }

    await route.fulfill({ status: 200, contentType: 'application/json', headers: corsHeaders, body: '[]' });
  });

  await page.goto('/');
  await page.evaluate(({ projectId, supabaseOrigin, sessionUser }) => {
    const now = Math.floor(Date.now() / 1000);
    const encode = (value: unknown) => btoa(JSON.stringify(value)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const accessToken = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: sessionUser.id, aud: 'authenticated', role: 'authenticated', email: sessionUser.email, exp: now + 3600, iat: now, iss: `${supabaseOrigin}/auth/v1` })}.local-test-signature`;
    const session = {
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: now + 3600,
      refresh_token: 'local-playwright-test-refresh-token',
      user: sessionUser,
    };
    localStorage.setItem(`sb-${projectId}-auth-token`, JSON.stringify(session));
  }, { projectId: supabase.projectId, supabaseOrigin: supabase.origin, sessionUser: user });
  await page.reload();
}

test('Livro-Curso preserva o redirecionamento de visitante sem sessão', async ({ page }) => {
  await page.goto('/livro-curso');
  await expect(page).toHaveURL(/\/login\?mode=signup/);
});

test('Livro-Curso preserva o currículo, exibe o Capítulo 5 integral e sincroniza progresso via Supabase', async ({ page }) => {
  ensureLocalTestTarget();
  await installLocalSupabaseMocks(page);

  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/livro-curso');
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Poesia Cognitivo-Hipnótica', exact: true })).toBeVisible();
  const openingPoem = page.locator('.poem-text');
  await expect(openingPoem.locator('br')).toHaveCount(3);

  const chapters = [
    { title: '1.1. Uma definição de trabalho', bulletOnly: '1.5. Princípios éticos essenciais' },
    { title: '2.1. O texto como registro, não como veredito', bulletOnly: '2.2. Quatro camadas de leitura' },
    { title: '3.1. Por que metáforas importam', bulletOnly: '3.4. Como formular e avaliar uma metáfora' },
    { title: '4.1. Autocuidado sem cobrança de desempenho', bulletOnly: '4.2. Ritual breve em cinco movimentos' },
    { title: '5.1. O cérebro não lê poesia em uma única região', bulletOnly: '5.2. Cinco processos para observar durante a leitura' },
  ];
  const chapterButtons = page.locator('#trilha-aprendizado').getByRole('button', { name: /Capítulo [1-5] —/ });
  await expect(chapterButtons).toHaveCount(chapters.length);

  for (const [index, chapter] of chapters.entries()) {
    const button = chapterButtons.nth(index);
    const sectionHeading = page.getByRole('heading', { name: chapter.title, exact: true });
    const chapterId = `capitulo-${index + 1}`;
    await expect(button).toHaveAttribute('id', `chapter-trigger-${chapterId}`);
    await expect(button).toHaveAttribute('aria-controls', `chapter-content-${chapterId}`);
    if ((await button.getAttribute('aria-expanded')) !== 'true') await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    const chapterPanel = page.locator(`#chapter-content-${chapterId}`);
    await expect(chapterPanel).toHaveAttribute('role', 'region');
    await expect(chapterPanel).toHaveAttribute('aria-labelledby', `chapter-trigger-${chapterId}`);
    await expect(sectionHeading).toBeVisible();
    await expect(page.getByRole('heading', { name: chapter.bulletOnly, exact: true })).toBeVisible();

    if (index === 4) {
      const chapter5 = page.locator('#chapter-content-capitulo-5');
      await expect(page.getByRole('heading', { name: '5.14. Roteiro de aula — Mapa Cerebral do Leitor Poético (65 minutos)', exact: true })).toBeVisible();
      const fullText = chapter5.locator('#capitulo5-texto-integral');
      await chapter5.getByText('Leitura integral enviada pelo autor — aprofundamento do Capítulo 5').click();
      await expect(fullText.getByRole('heading', { name: 'Introdução — O que acontece quando um poema encontra você?' })).toBeVisible();
      const sectionTitles = [
        '5.1 — O que é o mapa cerebral do leitor poético?',
        '5.2 — Atenção: a porta de entrada da leitura',
        '5.3 — Emoção e corpo: sentir não é o mesmo que compreender',
        '5.4 — Memória e associação: por que um verso pode despertar uma história?',
        '5.5 — Imaginação: criar possibilidades sem confundi-las com fatos',
        '5.6 — Interpretação: transformar palavras em significado',
        '5.7 — Ritmo, repetição e pausa: o tempo também participa da leitura',
        '5.8 — O ciclo da leitura poética: um mapa para refletir',
        '5.9 — Cartografia de um poema: exercício prático de leitura consciente',
        '5.10 — O que a ciência permite afirmar — e o que ainda não podemos concluir',
        '5.11 — Como utilizar o mapa na prática da PCH',
        '5.12 — Acessibilidade, autonomia e cuidado com o leitor',
        '5.13 — Síntese: ler poesia é construir caminhos de sentido',
      ];
      for (const title of sectionTitles) {
        await expect(fullText.getByRole('heading', { name: title, exact: true })).toBeVisible();
      }
      await expect(fullText.locator('h3').filter({ hasText: /^5\.\d{1,2}\s+—/ })).toHaveCount(13);
      await expect(fullText.getByRole('heading', { name: '5.13 — Síntese: ler poesia é construir caminhos de sentido' })).toBeVisible();
      await expect(fullText.getByRole('heading', { name: 'PRÁTICA GUIADA — CARTOGRAFIA DE UM POEMA' })).toBeVisible();
      await expect(fullText.getByRole('heading', { name: 'EXERCÍCIO DE FIXAÇÃO' })).toBeVisible();
      await expect(fullText.getByText('Resposta correta: C.', { exact: true }).first()).toBeVisible();
      await expect(fullText.getByRole('heading', { name: 'REFLEXÃO FINAL' })).toBeVisible();
      await expect(fullText.getByRole('heading', { name: 'REFERÊNCIAS PARA APROFUNDAMENTO' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Ouvir narração' })).toBeVisible();

      await chapter5.getByRole('button', { name: 'Marcar capítulo como concluído', exact: true }).click();
      await expect(chapter5.getByRole('button', { name: 'Marcar como não concluído', exact: true })).toBeVisible();
      await page.reload();
      await expect(page).not.toHaveURL(/\/login/);
      await expect(page.getByText('1 de 5 capítulos concluídos')).toBeVisible();
      await expect(page.locator('#chapter-content-capitulo-5').getByRole('button', { name: 'Marcar como não concluído', exact: true })).toBeVisible();
    }

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(sectionHeading).toBeHidden();
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionHeading).toBeVisible();
  }

  await page.locator('#chapter-content-capitulo-1').getByRole('button', { name: 'Próximo capítulo' }).click();
  await expect(chapterButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');
  await expect(chapterButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#chapter-content-capitulo-2').getByRole('button', { name: 'Capítulo anterior' }).click();
  await expect(chapterButtons.nth(0)).toHaveAttribute('aria-expanded', 'true');

  await page.goto('/mapa-cerebral');
  await expect(page.getByRole('heading', { name: 'Laboratório Cerebral', exact: false })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'O Mapa Cerebral do Leitor Poético' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Referências comentadas' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Zeman, Milton, Smith & Rylance \(2013\)/ })).toBeVisible();
  await expect(page.getByText(/Estudo de fMRI que comparou a leitura de poesia e prosa/)).toBeVisible();
  await expect(page.getByRole('heading', { name: '1. Observe sem procurar uma resposta certa' })).toBeVisible();
  await page.getByRole('button', { name: /Próxima etapa/ }).click();
  await expect(page.getByRole('heading', { name: '2. Transforme a percepção em linguagem' })).toBeVisible();
  await expect(page.getByLabel('Seu poema (opcional)')).toBeVisible();
  await page.getByRole('button', { name: /Próxima etapa/ }).click();
  await expect(page.getByRole('heading', { name: '3. Registre o que você leva' })).toBeVisible();
  await expect(page.getByLabel('Sua reflexão final (opcional)')).toBeVisible();
  await expect(page.getByText('Áreas Cerebrais Ativadas', { exact: true })).toHaveCount(0);
  await expect(page.getByText(/Desbloqueio afetivo|ressignificação simbólica|estado semelhante à leve hipnose/i)).toHaveCount(0);
  await page.setViewportSize({ width: 320, height: 800 });
  await expect(page.getByText('Seguir', { exact: true })).toBeVisible();
  await expect(page.locator('nav a[aria-label="Continuar"]')).toHaveAttribute('aria-label', 'Continuar');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.getByText('Ocorreu um erro inesperado ao carregar esta página.')).toHaveCount(0);
  expect(pageErrors).toEqual([]);
});
