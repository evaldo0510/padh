import { test, expect } from '@playwright/test';

test.describe('Acessibilidade Avançada E2E - Fundamentação', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/fundamentacao');
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('deve alternar foco visual (ring) entre mouse e teclado corretamente', async ({ page }) => {
    const introButton = page.getByRole('button', { name: 'Fundamentação', exact: true });
    
    // 1. Clique com o mouse não deve mostrar o ring de focus-visible
    await introButton.click();
    
    // Verifica se o foco está no elemento, mas o focus-visible não está ativo
    // No Playwright, não há um seletor nativo para :focus-visible, 
    // mas podemos verificar se as propriedades do 'ring' (box-shadow) estão presentes.
    // O Tailwind aplica o ring apenas em focus-visible.
    let boxShadow = await introButton.evaluate((el) => window.getComputedStyle(el).boxShadow);
    // Se o clique foi com mouse, o box-shadow não deve ser o do ring (que geralmente tem valores específicos)
    // Na verdade, o Tailwind focus-visible:ring-2 adiciona box-shadow apenas no estado :focus-visible.
    expect(boxShadow).toBe('none');

    // 2. Navegação via Tab deve mostrar o ring
    await page.keyboard.press('Tab'); // Supondo que o foco vá para o próximo ou volte
    await page.keyboard.press('Shift+Tab'); // Volta para o botão anterior
    await introButton.focus(); // Força foco via script simula teclado em muitos ambientes
    
    // Para garantir simulação de teclado real:
    await page.keyboard.press('Tab'); // Move foco para fora
    await page.keyboard.press('Shift+Tab'); // Move foco de volta via teclado
    
    await expect(introButton).toBeFocused();
    boxShadow = await introButton.evaluate((el) => window.getComputedStyle(el).boxShadow);
    expect(boxShadow).not.toBe('none');
  });

  test('deve percorrer a ordem de tabulação completa sem saltos', async ({ page }) => {
    // Ordem esperada: Voltar -> Índice (5 itens) -> Ferramentas (6 links) -> Caminhos (3 links)
    const expectedOrder = [
      { role: 'button', name: 'Voltar' },
      { role: 'button', name: 'Fundamentação' },
      { role: 'button', name: 'Metodologia' },
      { role: 'button', name: 'Ferramentas' },
      { role: 'button', name: 'Ciência & Poesia' },
      { role: 'button', name: 'Guia de Jornada' },
      { role: 'link', name: 'Livro-Curso' },
      { role: 'link', name: 'Formação PCH' },
      { role: 'link', name: 'Curso PCH' },
      { role: 'link', name: '8 Ferramentas' },
      { role: 'link', name: 'Mapa Cerebral' },
      { role: 'link', name: 'Aula Exclusiva' },
      { role: 'link', name: 'Ver Detalhes', count: 0 }, // Primeiro botão de Detalhes
      { role: 'link', name: 'Ver Detalhes', count: 1 }, // Segundo
      { role: 'link', name: 'Ver Detalhes', count: 2 }, // Terceiro
    ];

    for (const item of expectedOrder) {
      await page.keyboard.press('Tab');
      let locator;
      if ('count' in item) {
        locator = page.getByRole(item.role as any, { name: item.name }).nth(item.count);
      } else {
        locator = page.getByRole(item.role as any, { name: item.name, exact: true });
      }
      await expect(locator).toBeFocused();
    }
  });

  test('deve atualizar aria-current corretamente ao navegar pelo índice', async ({ page }) => {
    const methodologyButton = page.getByRole('button', { name: 'Metodologia', exact: true });
    const introButton = page.getByRole('button', { name: 'Fundamentação', exact: true });

    // Inicialmente a fundamentação é a ativa
    await expect(introButton).toHaveAttribute('aria-current', 'true');
    await expect(methodologyButton).not.toHaveAttribute('aria-current', 'true');

    // Navega para Metodologia via Tab + Enter
    await page.keyboard.press('Tab'); // Voltar
    await page.keyboard.press('Tab'); // Fundamentação
    await page.keyboard.press('Tab'); // Metodologia
    await page.keyboard.press('Enter');

    // Agora Metodologia deve ser aria-current
    await expect(methodologyButton).toHaveAttribute('aria-current', 'true');
    await expect(introButton).not.toHaveAttribute('aria-current', 'true');
    
    // Volta via teclado
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Space');
    await expect(introButton).toHaveAttribute('aria-current', 'true');
  });

  test('deve validar estilos de foco visível em diferentes viewports', async ({ page }) => {
    const viewports = [
      { width: 1280, height: 720 }, // Desktop
      { width: 375, height: 812 }   // Mobile
    ];

    const targetButton = page.getByRole('button', { name: 'Metodologia', exact: true });

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await targetButton.focus();
      
      // Verifica se o ring de foco mantém as propriedades visuais
      const style = await targetButton.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return {
          boxShadow: s.boxShadow,
          outline: s.outlineStyle,
          borderRadius: s.borderRadius
        };
      });

      expect(style.outline).toBe('none');
      expect(style.boxShadow).not.toBe('none');
      // No Tailwind, o ring-offset cria uma separação. Validamos que o shadow é robusto.
      expect(style.boxShadow).toContain('rgb(139, 92, 246)'); // Cor primária
      
      await page.screenshot({ 
        path: `test-results/focus-styles-${vp.width}x${vp.height}.png`,
        fullPage: false 
      });
    }
  });
});
