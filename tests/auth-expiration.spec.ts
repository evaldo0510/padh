import { test, expect } from '@playwright/test';

// Este teste explicitamente NÃO usa o storageState global para simular uma sessão expirada ou usuário deslogado
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Auth Expiration / Redirection', () => {
  
  test('deve redirecionar para login ao tentar acessar rota protegida (cold start) sem autenticação', async ({ page }) => {
    // Tenta acessar uma rota protegida diretamente (Deep Link)
    await page.goto('/jornada');
    
    // Deve ser redirecionado para a página de login
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: 'test-results/cold-start-auth-redirect.png' });
  });

  test('deve permitir acesso à rota pública e redirecionar somente ao tentar rota protegida após logout', async ({ page }) => {
    // 1. Acesso inicial à rota pública (mesmo sem cookies)
    await page.goto('/fundamentacao');
    await expect(page).toHaveURL(/\/fundamentacao/);
    
    // 2. Tenta navegar para uma rota protegida via clique ou redirecionamento manual
    await page.goto('/jornada');
    await expect(page).toHaveURL(/\/login/);
    
    // 3. Volta para pública e deve funcionar
    await page.goto('/fundamentacao');
    await expect(page).toHaveURL(/\/fundamentacao/);

    await page.screenshot({ path: 'test-results/logout-selective-redirect.png' });
  });

  test('deve permitir acesso à rota pública mesmo sem autenticação', async ({ page }) => {
    // Rota pública
    await page.goto('/fundamentacao');
    
    // Não deve ser redirecionado
    await expect(page).toHaveURL(/\/fundamentacao/);
    await expect(page).not.toHaveURL(/\/login/);
    
    await page.screenshot({ path: 'test-results/public-route-no-auth.png' });
  });
});