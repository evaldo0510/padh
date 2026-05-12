import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { MODULOS, PILARES_INFO } from "./dados-clinicos";

// Extend jsPDF with autotable types
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateCurriculumPDF = () => {
  const doc = new jsPDF();
  const primaryColor = [188, 143, 143]; // RosyBrown matches roughly the primary theme
  
  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Grade Curricular: Formacao em PCH", 105, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Poesia Cognitiva Hipnotica - Metodologia P.A.D.H.", 105, 30, { align: "center" });

  // Summary of Pillars
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Os 4 Pilares da Metodologia", 14, 55);

  const pillarsTable = Object.entries(PILARES_INFO).map(([key, info]) => [
    key,
    info.nome,
    info.descricao
  ]);

  doc.autoTable({
    startY: 60,
    head: [["Pilar", "Nome", "Descricao"]],
    body: pillarsTable,
    theme: "grid",
    headStyles: { fillColor: primaryColor },
  });

  // Modules Detail
  let currentY = (doc as any).lastAutoTable.finalY + 20;
  
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Estrutura dos Modulos", 14, currentY);
  currentY += 10;

  const modulesTable = MODULOS.map(m => [
    `Modulo ${m.numero}`,
    m.titulo,
    m.foco,
    `${m.tempoEstimado} min`
  ]);

  doc.autoTable({
    startY: currentY,
    head: [["N", "Titulo", "Foco do Aprendizado", "Duracao"]],
    body: modulesTable,
    theme: "striped",
    headStyles: { fillColor: primaryColor },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 45 },
      2: { cellWidth: 90 },
      3: { cellWidth: 30 }
    }
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      "Evaldo de Jesus Santana - Formacao Profissional PCH",
      105,
      285,
      { align: "center" }
    );
  }

  doc.save("Grade-Curricular-Formacao-PCH.pdf");
};
