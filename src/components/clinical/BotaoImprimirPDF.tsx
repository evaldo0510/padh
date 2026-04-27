import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, User, Stethoscope } from 'lucide-react';
import { gerarPDFTerapeuta, gerarPDFPaciente } from '@/lib/pdf-generator';
import type { ModuloClinico } from '@/lib/dados-clinicos';
import { toast } from 'sonner';

interface Props {
  modulo: ModuloClinico;
  variant?: 'inline' | 'card';
}

const BotaoImprimirPDF: React.FC<Props> = ({ modulo, variant = 'card' }) => {
  const handleTerapeuta = () => {
    try {
      gerarPDFTerapeuta(modulo);
      toast.success('PDF do Terapeuta gerado!', { description: `Módulo ${modulo.numero} — pronto para usar em consulta.` });
    } catch {
      toast.error('Erro ao gerar PDF.');
    }
  };

  const handlePaciente = () => {
    try {
      gerarPDFPaciente(modulo);
      toast.success('PDF do Paciente gerado!', { description: 'Pronto para entregar ao paciente.' });
    } catch {
      toast.error('Erro ao gerar PDF.');
    }
  };

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={handleTerapeuta} className="gap-2 border-module hover:bg-module-soft hover:text-module">
          <Stethoscope className="h-3.5 w-3.5" /> PDF Terapeuta
        </Button>
        <Button size="sm" variant="outline" onClick={handlePaciente} className="gap-2 border-module hover:bg-module-soft hover:text-module">
          <User className="h-3.5 w-3.5" /> PDF Paciente
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border-2 border-dashed border-module bg-module-tint p-5 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-module-soft flex items-center justify-center shrink-0">
          <FileDown className="h-5 w-5 text-module" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-module font-bold mb-1">Para Imprimir</p>
          <h4 className="font-heading font-semibold text-foreground text-base md:text-lg">
            Versões Imprimíveis em PDF
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Baixe os protocolos para usar em consulta ou entregar ao paciente.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Button onClick={handleTerapeuta} className="gap-2 bg-module text-background hover:opacity-90 border-0 shadow-module-glow">
          <Stethoscope className="h-4 w-4" /> PDF do Terapeuta
        </Button>
        <Button onClick={handlePaciente} variant="outline" className="gap-2 border-module text-foreground hover:bg-module-soft hover:text-module">
          <User className="h-4 w-4" /> PDF do Paciente
        </Button>
      </div>
    </div>
  );
};

export default BotaoImprimirPDF;
