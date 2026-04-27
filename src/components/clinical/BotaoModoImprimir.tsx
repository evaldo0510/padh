import React from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Botão flutuante para acionar o modo imprimir.
 * Os estilos @media print em index.css cuidam da limpeza visual e quebra A4.
 */
const BotaoModoImprimir: React.FC = () => {
  const handlePrint = () => {
    // Abre todos os accordions antes de imprimir, para que o conteúdo apareça
    document.querySelectorAll<HTMLButtonElement>('[data-state="closed"]').forEach((el) => {
      if (el.tagName === 'BUTTON') el.click();
    });
    // Pequeno delay para o DOM atualizar
    window.setTimeout(() => window.print(), 250);
  };

  return (
    <Button
      type="button"
      onClick={handlePrint}
      variant="outline"
      size="sm"
      aria-label="Imprimir página completa em formato A4"
      className="fixed bottom-24 right-4 z-30 lg:bottom-6 lg:right-6 gap-2 shadow-medium glass-morphism border-primary/30 hover:border-primary print:hidden"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Imprimir A4</span>
    </Button>
  );
};

export default BotaoModoImprimir;
