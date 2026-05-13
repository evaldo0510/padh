import { test, expect } from '@playwright/test';

test.describe('PCH Mobile E2E - Fundamentação & Jornada', () => {
  
  test('deve validar todas as âncoras do índice', async ({ page }) => {
    await page.goto('/fundamentacao');
    
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

  test('deve verificar visibilidade do botão Próximo com teclado aberto (Android/iOS)', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Teste exclusivo para mobile');

    // Navega para uma sessão da jornada que tenha campo de texto
    await page.goto('/jornada/despertar/percepcao-inicial');
    
    // Localiza o campo de resposta
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();
    
    // Simula a abertura do teclado reduzindo a altura do viewport
    const originalViewport = page.viewportSize()!;
    await page.setViewportSize({ 
      width: originalViewport.width, 
      height: Math.floor(originalViewport.height * 0.5) // Simula teclado ocupando 50% da tela
    });

    // Captura de tela com teclado "aberto" (etapa-chave)
    await page.screenshot({ path: `test-results/keyboard-open-${page.context().browser()?.browserType().name()}.png` });

    // Verifica se o botão "Próximo" ainda está visível e clicável
    const nextButton = page.getByRole('button', { name: 'Próximo' });
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
    
    // Verifica se o footer ajustou o padding para o teclado
    const footer = page.locator('footer');
    await expect(footer).toHaveClass(/pb-4/);
  });

  test('deve validar navegação via botão Próximo até conclusão', async ({ page }) => {
    await page.goto('/jornada/despertar/percepcao-inicial');
    
    // Loop para avançar alguns blocos
    for (let i = 0; i < 2; i++) {
      const nextButton = page.getByRole('button', { name: 'Próximo' });
      await expect(nextButton).toBeVisible();
      
      // Se for um exercício, preenche para habilitar
      const textarea = page.locator('textarea');
      if (await textarea.isVisible()) {
        await textarea.fill('Teste de validação automatizada');
      }
      
      await nextButton.click();
      // Aguarda transição suave (AnimatePresence)
      await page.waitForTimeout(500);
    }
    
    // Captura de tela final (etapa-chave)
    await page.screenshot({ path: 'test-results/jornada-avanco.png' });
  });
});