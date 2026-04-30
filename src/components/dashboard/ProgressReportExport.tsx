import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Share2, FileSpreadsheet } from "lucide-react";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { useJornada } from "@/hooks/useJornada";
import { MODULOS } from "@/lib/dados-clinicos";
import { gerarRelatorioProgresso } from "@/lib/pdf-generator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

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

  const exportCSV = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: checkins } = await supabase
        .from("daily_checkins")
        .select("checkin_date, mood, note")
        .eq("user_id", user.id)
        .order("checkin_date", { ascending: false });

      if (!checkins || checkins.length === 0) {
        toast.error("Sem dados de check-in para exportar.");
        return;
      }

      const headers = ["Data", "Humor", "Notas"];
      const rows = checkins.map(c => [c.checkin_date, c.mood, c.note || ""]);
      const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
      
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `historico_checkin_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Histórico exportado (CSV).");
    } catch (e) {
      toast.error("Erro ao exportar CSV.");
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={handleExport}
        className="gap-2 bg-primary hover:bg-primary-dark"
      >
        <FileDown className="spiritual-icon" /> PDF Completo
      </Button>
      <Button
        variant="outline"
        onClick={exportCSV}
        className="gap-2 border-white/10"
      >
        <FileSpreadsheet className="spiritual-icon" /> CSV Check-ins
      </Button>
      <Button
        variant="outline"
        className="gap-2 border-white/10"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.info("Link de compartilhamento copiado!");
        }}
      >
        <Share2 className="spiritual-icon" /> Compartilhar
      </Button>
    </div>
  );
};

export default ProgressReportExport;