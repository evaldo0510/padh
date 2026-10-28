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
  ];
  const chapterButtons = page.locator('#trilha-aprendizado').getByRole('button', { name: /Capítulo [1-4]/ });
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

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(sectionHeading).toBeHidden();

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(sectionHeading).toBeVisible();
  }

  await expect(page.getByText('Ocorreu um erro inesperado ao carregar esta página.')).toHaveCount(0);
  expect(pageErrors).toEqual([]);
});
