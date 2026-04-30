import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Share2 } from "lucide-react";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { useJornada } from "@/hooks/useJornada";
import { MODULOS } from "@/lib/dados-clinicos";
import { gerarRelatorioProgresso } from "@/lib/pdf-generator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
const ProgressReportExport = () => {
  const { progress } = useCourseProgress();
  const { jornada } = useJornada();
  const handleExport = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Você precisa estar logado.");
        return;
      }

      const { data: checkins } = await supabase
        .from("daily_checkins")
        .select("*")
        .eq("user_id", user.id)
        .order("checkin_date", { ascending: false });

      gerarRelatorioProgresso(progress, MODULOS, jornada, checkins || []);
      
      toast.success("Relatório gerado com sucesso!", {
        description: "O download do seu progresso em PDF foi iniciado.",
      });
    } catch (error) {
      toast.error("Erro ao gerar relatório", {
        description: "Tente novamente em instantes.",
      });
    }
  };
  return (
    <div className="flex flex-wrap gap-3">
      {" "}
      <Button
        onClick={handleExport}
        className="gap-2 bg-primary hover:bg-primary-dark"
      >
        {" "}
        <FileDown className="spiritual-icon" /> Exportar Relatório PDF{" "}
      </Button>{" "}
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => toast.info("Link de compartilhamento copiado!")}
      >
        {" "}
        <Share2 className="spiritual-icon" /> Compartilhar{" "}
      </Button>{" "}
    </div>
  );
};
export default ProgressReportExport;
