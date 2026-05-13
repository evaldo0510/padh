import { test, expect } from '@playwright/test';

test.describe('Acessibilidade E2E - Fundamentação', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/fundamentacao');
    // Espera o conteúdo carregar
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('deve garantir foco visível e ordem de tabulação correta', async ({ page }) => {
    // 1. O primeiro elemento focado deve ser o botão "Voltar" (ou o primeiro link/botão na página)
    await page.keyboard.press('Tab');
    
    // O botão voltar é o primeiro botão na página FundamentacaoTeorica
    const backButton = page.getByRole('button', { name: 'Voltar' });
    await expect(backButton).toBeFocused();
    
    // 2. Tabula para os itens do índice
    const indexItems = [
      'Fundamentação',
      'Metodologia',
      'Ferramentas',
      'Ciência & Poesia',
      'Guia de Jornada'
    ];

    for (const label of indexItems) {
      await page.keyboard.press('Tab');
      const button = page.getByRole('button', { name: label, exact: true });
      await expect(button).toBeFocused();
      
      // Verifica se há indicação visual de foco (ring do Tailwind)
      await expect(button).toHaveClass(/focus-visible:ring-primary/);
      
      // Valida que o outline padrão foi removido para usar o ring customizado
      await expect(button).toHaveCSS('outline-style', 'none');
      
      // Verifica se o box-shadow foi aplicado (não deve ser 'none')
      const boxShadow = await button.evaluate((el) => window.getComputedStyle(el).boxShadow);
      expect(boxShadow).not.toBe('none');
    }
  });

  test('deve atualizar o item ativo via teclado sem flicker ao navegar no índice', async ({ page }) => {
    const indexItems = [
      { id: 'theory-intro', label: 'Fundamentação' },
      { id: 'methodology-pillars', label: 'Metodologia' },
      { id: 'clinical-tools', label: 'Ferramentas' },
      { id: 'science-neuro', label: 'Ciência & Poesia' },
      { id: 'journey-guide', label: 'Guia de Jornada' }
    ];

    // Navega até o segundo item usando Tab
    await page.keyboard.press('Tab'); // Voltar
    await page.keyboard.press('Tab'); // Fundamentação
    await page.keyboard.press('Tab'); // Metodologia
    
    const methodologyButton = page.getByRole('button', { name: 'Metodologia', exact: true });
    await expect(methodologyButton).toBeFocused();
    
    // Ativa via teclado (Enter)
    await page.keyboard.press('Enter');
    
    // Verifica se a seção correta ficou visível e o botão está marcado como ativo (bg-primary)
    const methodologySection = page.locator('#methodology-pillars');
    await expect(methodologySection).toBeInViewport();
    
    // O item ativo deve mudar para Metodologia
    await expect(methodologyButton).toHaveClass(/bg-primary/);
    
    // Volta para o primeiro item via teclado
    await page.keyboard.press('Shift+Tab');
    const introButton = page.getByRole('button', { name: 'Fundamentação', exact: true });
    await expect(introButton).toBeFocused();
    await page.keyboard.press('Space');
    
    const introSection = page.locator('#theory-intro');
    await expect(introSection).toBeInViewport();
    await expect(introButton).toHaveClass(/bg-primary/);
  });

  test('deve garantir que links de ferramentas são acessíveis via teclado', async ({ page }) => {
    // Avança até a seção de ferramentas
    const toolsButton = page.getByRole('button', { name: 'Ferramentas', exact: true });
    await toolsButton.click();
    await expect(page.locator('#clinical-tools')).toBeInViewport();

    // Tabula através dos cards de ferramentas
    // Como os cards são <Link> (que são <a>), eles devem ser focáveis
    // Precisamos de alguns tabs para chegar neles
    // Tab order: Voltar -> Índice (5 botões) -> Cards de Ferramentas
    
    // Vamos usar um seletor mais direto para focar o primeiro card de ferramenta
    const firstTool = page.locator('a[href="/livro-curso"]').first();
    
    // Alternativamente, podemos simular o scroll e ver se o foco flui
    // Mas para teste de ordem de tabulação, o ideal é contar os tabs ou usar focus() inicial
    await firstTool.focus();
    await expect(firstTool).toBeFocused();
    
    await page.keyboard.press('Tab');
    const secondTool = page.locator('a[href="/formacao"]').first();
    await expect(secondTool).toBeFocused();
  });
});
