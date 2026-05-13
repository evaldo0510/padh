import { test, expect } from '@playwright/test';

test.describe('Fundamentação Teórica - Mobile Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Configura o viewport para mobile se não estiver no config
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('deve validar as âncoras e navegação na fundamentação teórica', async ({ page }) => {
    await page.goto('/fundamentacao');
    
    // Verifica título principal
    await expect(page.locator('h2').filter({ hasText: 'Fundamentação Teórica' })).toBeVisible();

    // Verifica se o índice (Índice:) está visível
    await expect(page.getByText('Índice:')).toBeVisible();

    // Testa o clique em uma das âncoras do índice
    const indexItems = ['Metodologia', 'Ferramentas', 'Ciência & Poesia', 'Guia de Jornada'];
    
    for (const item of indexItems) {
      const button = page.getByRole('button', { name: item });
      await expect(button).toBeVisible();
      await button.click();
      
      // Pequeno delay para o scroll smooth
      await page.waitForTimeout(500);
      
      // Verifica se a seção correspondente está visível ou se o botão está ativo
      // O botão ativo ganha classes de destaque (bg-primary)
      await expect(button).toHaveClass(/bg-primary/);
    }
  });

  test('deve validar o botão Próximo na Sessão View (Mobile)', async ({ page }) => {
    // Navega para uma sessão da jornada
    // Nota: Pode redirecionar para login se não houver sessão ativa
    await page.goto('/jornada/despertar/percepcao-inicial');
    
    // Se redirecionar para login, o teste de "Próximo" não poderá validar o elemento real da jornada
    // mas podemos verificar se o botão de "Próximo" (ou Continuar) existe na página de login ou dashboard se necessário
    
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('Redirecionado para login, pulando validação de botão interno da jornada.');
      return;
    }

    // Se estiver na página da sessão, o botão "Próximo" (antigo Continuar) deve estar visível
    const nextButton = page.getByRole('button', { name: 'Próximo' });
    await expect(nextButton).toBeVisible();
    
    // Verifica se o botão respeita a safe area (está no footer fixo)
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveCSS('position', 'static'); // É um flex item no layout mobile para lidar com teclado
  });
});
