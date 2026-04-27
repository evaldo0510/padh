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
        <Button size="sm" variant="outline" onClick={handleTerapeuta} className="gap-2">
          <Stethoscope className="h-3.5 w-3.5" /> PDF Terapeuta
        </Button>
        <Button size="sm" variant="outline" onClick={handlePaciente} className="gap-2">
          <User className="h-3.5 w-3.5" /> PDF Paciente
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border-2 border-dashed border-primary/25 bg-primary/[0.02] p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <FileDown className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground text-base">Versões Imprimíveis</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Baixe os protocolos em PDF para usar em consulta ou entregar ao paciente.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Button onClick={handleTerapeuta} variant="default" className="gap-2">
          <Stethoscope className="h-4 w-4" /> PDF do Terapeuta
        </Button>
        <Button onClick={handlePaciente} variant="secondary" className="gap-2">
          <User className="h-4 w-4" /> PDF do Paciente
        </Button>
      </div>
    </div>
  );
};

export default BotaoImprimirPDF;
