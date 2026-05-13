import { test, expect } from '@playwright/test';

test.describe('PCH Mobile E2E - Fundamentação & Jornada', () => {
  
  test.beforeEach(async ({ page }) => {
    // Garantir que não fomos redirecionados para o login devido a falha no storageState
    await page.goto('/fundamentacao');
    await expect(page).not.toHaveURL(/\/login/);
  });

  test('deve validar todas as âncoras do índice', async ({ page }) => {
    // A página já foi carregada no beforeEach
    
    // Captura de tela inicial (etapa-chave)
    await page.screenshot({ path: 'test-results/fundamentacao-inicio.png' });

    const indexItems = [
      { id: 'theory-intro', label: 'Fundamentação' },
      { id: 'methodology-pillars', label: 'Metodologia' },
      { id: 'clinical-tools', label: 'Ferramentas' },
      { id: 'science-neuro', label: 'Ciência & Poesia' },
      { id: 'journey-guide', label: 'Guia de Jornada' },
    ];

    for (const item of indexItems) {
      const button = page.getByRole('button', { name: item.label, exact: true });
      
      // Clica na âncora
      await button.click();
      
      // Valida que o scroll levou à seção correta sem usar timeouts fixos
      const section = page.locator(`#${item.id}`);
      await expect(section).toBeInViewport();
      
      // Valida que o botão de índice está destacado (IntersectionObserver)
      await expect(button).toHaveClass(/bg-primary/);
    }
  });

  test('deve verificar visibilidade da barra fixa no índice com teclado simulado', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Teste exclusivo para mobile');
    
    // Simula a abertura do teclado reduzindo a altura do viewport
    const originalViewport = page.viewportSize()!;
    await page.setViewportSize({ 
      width: originalViewport.width, 
      height: Math.floor(originalViewport.height * 0.5) 
    });

    // Verifica se a barra de índice (sticky) ainda está visível
    const indexNav = page.locator('nav.sticky');
    await expect(indexNav).toBeVisible();
    
    // Captura evidência
    await page.screenshot({ path: `test-results/index-keyboard-${page.context().browser()?.browserType().name()}.png` });
  });

  test('deve verificar visibilidade do botão Próximo com teclado aberto em protected route', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Teste exclusivo para mobile');

    // Navega para uma sessão da jornada que tenha campo de texto
    await page.goto('/jornada/despertar/percepcao-inicial');
    
    // Verifica que não foi para o login (storageState check)
    await expect(page).not.toHaveURL(/\/login/);
    
    // Localiza o campo de resposta
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();
    
    // Simula a abertura do teclado
    const originalViewport = page.viewportSize()!;
    await page.setViewportSize({ 
      width: originalViewport.width, 
      height: Math.floor(originalViewport.height * 0.5) 
    });

    // Captura de tela com teclado "aberto"
    await page.screenshot({ path: `test-results/keyboard-open-jornada-${page.context().browser()?.browserType().name()}.png` });

    // Verifica se o botão "Próximo" ainda está visível e clicável
    const nextButton = page.getByRole('button', { name: 'Próximo' });
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
  });

  test('deve validar navegação via botão Próximo até conclusão', async ({ page }) => {
    await page.goto('/jornada/despertar/percepcao-inicial');
    await expect(page).not.toHaveURL(/\/login/);
    
    for (let i = 0; i < 2; i++) {
      const nextButton = page.getByRole('button', { name: 'Próximo' });
      await expect(nextButton).toBeVisible();
      
      const textarea = page.locator('textarea');
      if (await textarea.isVisible()) {
        await textarea.fill('Teste de validação automatizada');
      }
      
      await nextButton.click();
      await page.waitForTimeout(500);
    }
    
    await page.screenshot({ path: 'test-results/jornada-avanco.png' });
  });
});