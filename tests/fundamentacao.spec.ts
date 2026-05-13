import { test, expect } from '@playwright/test';

test.describe('PCH Mobile E2E - Fundamentação & Jornada', () => {
  
  test.beforeEach(async ({ page }) => {
    // Garantir que não fomos redirecionados para o login devido a falha no storageState
    await page.goto('/fundamentacao');
    await expect(page).not.toHaveURL(/\/login/);
  });

  test('deve validar todas as âncoras do índice em ambas as direções', async ({ page }) => {
    const indexItems = [
      { id: 'theory-intro', label: 'Fundamentação' },
      { id: 'methodology-pillars', label: 'Metodologia' },
      { id: 'clinical-tools', label: 'Ferramentas' },
      { id: 'science-neuro', label: 'Ciência & Poesia' },
      { id: 'journey-guide', label: 'Guia de Jornada' },
    ];

    // 1. Percorre avançando
    for (const item of indexItems) {
      const button = page.getByRole('button', { name: item.label, exact: true });
      await button.click();
      
      const section = page.locator(`#${item.id}`);
      await expect(section).toBeInViewport();
      await expect(button).toHaveClass(/bg-primary/);
      
      // Pequena espera para garantir estabilidade do estado ativo (evitar flicker)
      await page.waitForTimeout(200);
      await expect(button).toHaveClass(/bg-primary/);
    }

    // 2. Percorre voltando
    for (const item of [...indexItems].reverse()) {
      const button = page.getByRole('button', { name: item.label, exact: true });
      await button.click();
      
      const section = page.locator(`#${item.id}`);
      await expect(section).toBeInViewport();
      await expect(button).toHaveClass(/bg-primary/);
      
      await page.waitForTimeout(200);
      await expect(button).toHaveClass(/bg-primary/);
    }
  });

  test('deve verificar visibilidade da barra fixa no índice com diferentes alturas de teclado', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Teste exclusivo para mobile');
    
    const indexNav = page.locator('nav.sticky');
    const heights = [0.7, 0.5, 0.4]; // Diferentes simulações de teclado

    const originalViewport = page.viewportSize()!;

    for (const factor of heights) {
      await page.setViewportSize({ 
        width: originalViewport.width, 
        height: Math.floor(originalViewport.height * factor) 
      });

      // Validação via Bounding Box para garantir que está dentro do viewport visível
      const box = await indexNav.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(Math.floor(originalViewport.height * factor));
      
      await expect(indexNav).toBeVisible();
      await page.screenshot({ path: `test-results/index-keyboard-${factor}-${page.context().browser()?.browserType().name()}.png` });
    }
    
    // Restaura o viewport
    await page.setViewportSize(originalViewport);
  });

  test('deve verificar visibilidade do botão Próximo com teclado aberto em protected route', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Teste exclusivo para mobile');

    await page.goto('/jornada/despertar/percepcao-inicial');
    await expect(page).not.toHaveURL(/\/login/);
    
    const originalViewport = page.viewportSize()!;
    await page.setViewportSize({ 
      width: originalViewport.width, 
      height: Math.floor(originalViewport.height * 0.5) 
    });

    const nextButton = page.getByRole('button', { name: 'Próximo' });
    await expect(nextButton).toBeVisible();
    
    // Validação de viewport baseada em Bounding Box
    const box = await nextButton.boundingBox();
    expect(box).not.toBeNull();
    // O botão deve estar na parte inferior, mas visível dentro da altura reduzida
    expect(box!.y + box!.height).toBeLessThanOrEqual(Math.floor(originalViewport.height * 0.5));
    expect(box!.y).toBeGreaterThan(0);

    await expect(nextButton).toBeEnabled();
    await page.screenshot({ path: `test-results/keyboard-next-button-${page.context().browser()?.browserType().name()}.png` });
    
    await page.setViewportSize(originalViewport);
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