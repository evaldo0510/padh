import { test, expect } from '@playwright/test';

// Este teste explicitamente NÃO usa o storageState global para simular uma sessão expirada ou usuário deslogado
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Auth Expiration / Redirection', () => {
  
  test('deve redirecionar para login ao tentar acessar rota protegida sem autenticação', async ({ page }) => {
    // Tenta acessar uma rota que sabemos ser protegida (ProtectedRoute)
    await page.goto('/jornada');
    
    // Deve ser redirecionado para a página de login
    await expect(page).toHaveURL(/\/login/);
    
    // Verifica se a mensagem de feedback (opcional) está visível
    // Se o seu app mostra "Faça login para continuar", podemos validar aqui
    
    await page.screenshot({ path: 'test-results/auth-redirect-login.png' });
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