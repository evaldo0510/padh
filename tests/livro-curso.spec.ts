import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test.use({ storageState: { cookies: [], origins: [] } });

const ensureLocalTestTarget = () => {
  const target = process.env.TARGET_URL ?? 'http://localhost:8080';
  if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(target)) {
    throw new Error('A sessão sintética deste teste só pode ser usada contra um servidor local.');
  }
};

const getLocalSupabaseProjectRef = () => {
  const envUrl = process.env.VITE_SUPABASE_URL ?? readFileSync(resolve(process.cwd(), '.env'), 'utf8')
    .split(/\r?\n/)
    .find((line) => line.trim().startsWith('VITE_SUPABASE_URL='))
    ?.split('=').slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  if (!envUrl) throw new Error('VITE_SUPABASE_URL ausente no ambiente local de teste.');
  return new URL(envUrl).hostname.split('.')[0];
};

test('Livro-Curso preserva o redirecionamento de visitante sem sessão', async ({ page }) => {
  await page.goto('/livro-curso');
  await expect(page).toHaveURL(/\/login\?mode=signup/);
});

test('Livro-Curso renderiza e permite abrir/fechar todos os capítulos em sessão de teste local', async ({ page }) => {
  ensureLocalTestTarget();

  // Sessão sintética local, sem credenciais reais ou chamadas de autenticação a contas de alunos.
  await page.goto('/');
  const projectRef = getLocalSupabaseProjectRef();
  await page.evaluate((ref) => {
    const now = Math.floor(Date.now() / 1000);
    const encode = (value: unknown) => btoa(JSON.stringify(value)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const accessToken = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: '00000000-0000-4000-8000-000000000001', aud: 'authenticated', role: 'authenticated', email: 'padh-local-test@example.invalid', exp: now + 3600, iat: now, iss: `https://${ref}.supabase.co/auth/v1` })}.local-test-signature`;
    const session = {
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: now + 3600,
      refresh_token: 'local-playwright-test-refresh-token',
      user: {
        id: '00000000-0000-4000-8000-000000000001',
        aud: 'authenticated',
        role: 'authenticated',
        email: 'padh-local-test@example.invalid',
        app_metadata: { provider: 'email', providers: ['email'] },
        user_metadata: {},
        identities: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };
    localStorage.setItem(`sb-${ref}-auth-token`, JSON.stringify(session));
  }, projectRef);
  await page.reload();

  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/livro-curso');
  await expect(page).not.toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Poesia Cognitivo-Hipnótica', exact: true })).toBeVisible();

  const chapters = [
    { title: '1.1. Uma definição de trabalho', bulletOnly: '1.5. Princípios éticos essenciais' },
    { title: '2.1. O texto como registro, não como veredito', bulletOnly: '2.2. Quatro camadas de leitura' },
    { title: '3.1. Por que metáforas importam', bulletOnly: '3.4. Como formular e avaliar uma metáfora' },
    { title: '4.1. Autocuidado sem cobrança de desempenho', bulletOnly: '4.2. Ritual breve em cinco movimentos' },
    { title: '5.1 — O que é o mapa cerebral do leitor poético?', bulletOnly: '5.13 — Síntese: ler poesia é construir caminhos de sentido' },
  ];
  const chapterButtons = page.locator('#trilha-aprendizado').getByRole('button', { name: /Capítulo [1-5] —/ });
  await expect(chapterButtons).toHaveCount(chapters.length);

  for (const [index, chapter] of chapters.entries()) {
    const button = chapterButtons.nth(index);
    const sectionHeading = page.getByRole('heading', { name: chapter.title, exact: true });

    if ((await button.getAttribute('aria-expanded')) !== 'true') {
      await button.click();
    }
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionHeading).toBeVisible();
    await expect(page.getByRole('heading', { name: chapter.bulletOnly, exact: true })).toBeVisible();

    if (index === 4) {
      const chapter5Headings = page.locator('#chapter-content-capitulo-5 article h3');
      await expect(chapter5Headings.filter({ hasText: /^5\.\d+ —/ })).toHaveCount(13);
      await expect(page.getByRole('heading', { name: 'PRÁTICA GUIADA — CARTOGRAFIA DE UM POEMA', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'EXERCÍCIO DE FIXAÇÃO', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'REFLEXÃO FINAL', exact: true })).toBeVisible();
      await expect(page.getByText('Resposta correta: C.', { exact: true }).first()).toBeVisible();
      await expect(page.getByRole('button', { name: 'Ouvir capítulo 5' })).toBeVisible();

      const chapter5Region = page.locator('#chapter-content-capitulo-5');
      await chapter5Region.getByRole('button', { name: 'Marcar capítulo como concluído', exact: true }).click();
      await expect(chapter5Region.getByRole('button', { name: 'Marcar como não concluído', exact: true })).toBeVisible();
      await expect.poll(() => page.evaluate(() => localStorage.getItem('padh-livro-curso-progress:00000000-0000-4000-8000-000000000001'))).toContain('capitulo-5');
      await page.reload();
      await expect(page).not.toHaveURL(/\/login/);
      await page.getByRole('button', { name: /Capítulo 5 —/ }).click();
      await expect(page.locator('#chapter-content-capitulo-5').getByRole('button', { name: 'Marcar como não concluído', exact: true })).toBeVisible();
      await expect(page.getByText('1 de 5 capítulos concluídos')).toBeVisible();
    }

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(sectionHeading).toBeHidden();
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionHeading).toBeVisible();
  }

  await page.goto('/mapa-cerebral');
  await expect(page.getByRole('heading', { name: 'O Mapa Cerebral do Leitor Poético' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Um mapa de leitura, não de regiões cerebrais' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Referências comentadas' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Texto integral no PubMed Central' }).first()).toBeVisible();
  await expect(page.getByText('Áreas Cerebrais Ativadas', { exact: true })).toHaveCount(0);
  await expect(page.getByText(/Desbloqueio afetivo|ressignificação simbólica|estado semelhante à leve hipnose/i)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await expect(page.getByText('Ocorreu um erro inesperado ao carregar esta página.')).toHaveCount(0);
  expect(pageErrors).toEqual([]);
});
