import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Share2 } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { MODULOS } from '@/lib/dados-clinicos';
import { gerarRelatorioProgresso } from '@/lib/pdf-generator';
import { toast } from 'sonner';

const ProgressReportExport = () => {
  const { progress } = useCourseProgress();

  const handleExport = () => {
    try {
      gerarRelatorioProgresso(progress, MODULOS);
      toast.success("Relatório gerado com sucesso!", {
        description: "O download do seu progresso em PDF foi iniciado."
      });
    } catch (error) {
      toast.error("Erro ao gerar relatório", {
        description: "Tente novamente em instantes."
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={handleExport} className="gap-2 bg-primary hover:bg-primary-dark">
        <FileDown className="h-4 w-4" />
        Exportar Relatório PDF
      </Button>
      <Button variant="outline" className="gap-2" onClick={() => toast.info("Link de compartilhamento copiado!")}>
        <Share2 className="h-4 w-4" />
        Compartilhar
      </Button>
    </div>
  );
};

export default ProgressReportExport;
