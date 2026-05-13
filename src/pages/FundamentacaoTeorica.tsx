import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import TheoreticalSections from "@/components/dashboard/TheoreticalSections";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FundamentacaoTeorica = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      seo={{
        title: "Fundamentação Teórica — PCH",
        description: "Conheça a base científica, neurocientífica e fenomenológica da Poesia Cognitiva Hipnótica.",
        path: "/fundamentacao",
      }}
      currentPage="Teoria"
    >
      <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32">
        <div className="streaming-container">
          <Button 
            variant="ghost" 
            className="mb-8 text-white/40 hover:text-white gap-2 px-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <TheoreticalSections />
        </div>
      </div>
    </PageLayout>
  );
};

export default FundamentacaoTeorica;
