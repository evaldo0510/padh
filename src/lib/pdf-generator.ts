import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ModuloClinico } from "./dados-clinicos";
import { AVISO_ETICO } from "./dados-clinicos";

const COLORS = {
  primary: [120, 81, 169] as [number, number, number],
  text: [30, 30, 35] as [number, number, number],
  muted: [110, 110, 120] as [number, number, number],
  accent: [200, 150, 60] as [number, number, number],
  border: [220, 220, 225] as [number, number, number],
};

/** RGB único por módulo — espelha as cores do site (HSL convertido) */
const MODULE_RGB: Record<number, [number, number, number]> = {
  1: [217, 158, 56], // Âmbar dourado
  2: [142, 105, 191], // Violeta profundo
  3: [108, 130, 217], // Índigo místico
  4: [200, 130, 178], // Rosa-malva
  5: [69, 168, 130], // Esmeralda
  6: [217, 113, 70], // Terracota/cobre
  7: [86, 130, 184], // Azul-noite
  8: [232, 187, 76], // Ouro-rosa
};

const PAGE = { w: 210, h: 297, margin: 18 };

function header(
  doc: jsPDF,
  title: string,
  subtitle: string,
  color: [number, number, number] = COLORS.primary,
) {
  doc.setFillColor(...color);
  doc.rect(0, 0, PAGE.w, 24, "F");
  // accent line
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 24, PAGE.w, 0.6, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("P.A.D.H.", PAGE.margin, 11);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Poesia Aplicada ao Desenvolvimento Humano", PAGE.margin, 17);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(subtitle.toUpperCase(), PAGE.w - PAGE.margin, 11, {
    align: "right",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(title, PAGE.w - PAGE.margin, 17, { align: "right" });

  doc.setTextColor(...COLORS.text);
}

function footer(doc: jsPDF) {
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...COLORS.border);
    doc.line(PAGE.margin, PAGE.h - 18, PAGE.w - PAGE.margin, PAGE.h - 18);
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.muted);
    const lines = doc.splitTextToSize(AVISO_ETICO, PAGE.w - PAGE.margin * 2);
    doc.text(lines, PAGE.margin, PAGE.h - 14);
    doc.text(
      `Página ${i} de ${totalPages}  ·  padhpoesia.lovable.app`,
      PAGE.w - PAGE.margin,
      PAGE.h - 6,
      { align: "right" },
    );
  }
}

function sectionTitle(
  doc: jsPDF,
  y: number,
  label: string,
  color: [number, number, number] = COLORS.primary,
): number {
  doc.setFillColor(...color);
  doc.rect(PAGE.margin, y, 3, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.text);
  doc.text(label, PAGE.margin + 6, y + 4.6);
  return y + 9;
}

function addList(doc: jsPDF, y: number, items: string[], bullet = "•"): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.text);
  for (const item of items) {
    if (y > PAGE.h - 30) {
      doc.addPage();
      y = 32;
    }
    const lines = doc.splitTextToSize(
      `${bullet}  ${item}`,
      PAGE.w - PAGE.margin * 2 - 4,
    );
    doc.text(lines, PAGE.margin + 2, y);
    y += lines.length * 4.6 + 1.5;
  }
  return y + 2;
}

function addParagraph(
  doc: jsPDF,
  y: number,
  text: string,
  italic = false,
): number {
  doc.setFont("helvetica", italic ? "italic" : "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.text);
  const lines = doc.splitTextToSize(text, PAGE.w - PAGE.margin * 2);
  if (y + lines.length * 4.6 > PAGE.h - 25) {
    doc.addPage();
    y = 32;
  }
  doc.text(lines, PAGE.margin, y);
  return y + lines.length * 4.6 + 3;
}

function addPoemBlock(
  doc: jsPDF,
  y: number,
  titulo: string,
  texto: string,
): number {
  if (y > PAGE.h - 60) {
    doc.addPage();
    y = 32;
  }
  doc.setFillColor(248, 245, 240);
  doc.setDrawColor(...COLORS.accent);
  const lines = doc.splitTextToSize(texto, PAGE.w - PAGE.margin * 2 - 10);
  const blockH = 14 + lines.length * 5;
  doc.roundedRect(PAGE.margin, y, PAGE.w - PAGE.margin * 2, blockH, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.accent);
  doc.text(titulo.toUpperCase(), PAGE.margin + 5, y + 6);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);
  doc.text(lines, PAGE.margin + 5, y + 12);
  return y + blockH + 5;
}

/* ─────────── PDF DO TERAPEUTA ─────────── */
export function gerarPDFTerapeuta(modulo: ModuloClinico) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const cor = MODULE_RGB[modulo.numero] ?? COLORS.primary;
  header(doc, modulo.titulo, `Módulo ${modulo.numero} · Terapeuta`, cor);

  let y = 32;
  // Tag de cor do módulo
  doc.setFillColor(...cor);
  doc.circle(PAGE.margin + 2, y - 1, 1.6, "F");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.muted);
  doc.text(`${modulo.corNome} — ${modulo.corSimbolo}`, PAGE.margin + 6, y);
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.text);
  doc.text(`Pilar ${modulo.pilar} — ${modulo.pilarNome}`, PAGE.margin, y);
  y += 7;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.muted);
  y = addParagraph(doc, y, `Foco clínico: ${modulo.foco}`, true);

  y = sectionTitle(
    doc,
    y + 2,
    "1. SINAIS — Identificação Emocional & Mental",
    cor,
  );
  y = addList(doc, y, modulo.sinais);

  y = sectionTitle(doc, y, "2. APLICAÇÃO — Passo a Passo Clínico", cor);
  y = addList(
    doc,
    y,
    modulo.aplicacao.map((a, i) => `Passo ${i + 1}. ${a}`),
    "",
  );

  y = sectionTitle(doc, y, "3. INDICAÇÕES TERAPÊUTICAS", cor);
  y = addList(doc, y, modulo.indicacoes, "▸");

  y = sectionTitle(
    doc,
    y,
    "4. CUIDADOS ÉTICOS & CONTRAINDICAÇÕES",
    COLORS.accent,
  );
  y = addList(doc, y, modulo.cuidados, "⚠");

  y = sectionTitle(doc, y, "5. FUNDAMENTAÇÃO TEÓRICA", cor);
  autoTable(doc, {
    startY: y,
    head: [["Teórico", "Obra", "Contribuição"]],
    body: modulo.teoricos.map((t) => [t.nome, t.obra ?? "—", t.contribuicao]),
    theme: "grid",
    headStyles: { fillColor: cor, textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 8.5, textColor: COLORS.text },
    margin: { left: PAGE.margin, right: PAGE.margin },
    styles: { cellPadding: 2.5 },
  });
  y = (doc as any).lastAutoTable.finalY + 6;

  y = sectionTitle(doc, y, "6. ANOTAÇÕES CLÍNICAS DA SESSÃO", cor);
  doc.setDrawColor(...COLORS.border);
  for (let i = 0; i < 6; i++) {
    if (y > PAGE.h - 30) {
      doc.addPage();
      y = 32;
    }
    doc.line(PAGE.margin, y + 5, PAGE.w - PAGE.margin, y + 5);
    y += 8;
  }

  footer(doc);
  doc.save(`PADH_Terapeuta_M${modulo.numero}_${slug(modulo.titulo)}.pdf`);
}

/* ─────────── PDF DO PACIENTE ─────────── */
export function gerarPDFPaciente(modulo: ModuloClinico) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const cor = MODULE_RGB[modulo.numero] ?? COLORS.primary;
  header(doc, modulo.titulo, `Módulo ${modulo.numero} · Para você`, cor);

  let y = 32;
  doc.setFillColor(...cor);
  doc.circle(PAGE.margin + 2, y - 1, 1.6, "F");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.muted);
  doc.text(`${modulo.corNome} — ${modulo.corSimbolo}`, PAGE.margin + 6, y);
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...COLORS.text);
  doc.text("Sua Prática Poética", PAGE.margin, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.muted);
  y = addParagraph(
    doc,
    y,
    "Este material foi criado especialmente para você dar continuidade ao trabalho iniciado em sessão. " +
      "Não há pressa. Não há resposta certa. Apenas presença.",
  );

  if (modulo.poemaPrescricao) {
    y = addPoemBlock(
      doc,
      y,
      `Poema-prescrição: ${modulo.poemaPrescricao.titulo}`,
      modulo.poemaPrescricao.texto,
    );
  }

  y = sectionTitle(doc, y + 2, "Suas Práticas para a Semana", cor);
  y = addList(
    doc,
    y,
    modulo.tarefasPaciente.map((t, i) => `${i + 1}. ${t}`),
    "",
  );

  y = sectionTitle(doc, y, "Diário de Sensações", cor);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);
  y = addParagraph(
    doc,
    y,
    "Após cada prática, escreva 1 palavra que descreva a sensação.",
    true,
  );

  doc.setDrawColor(...COLORS.border);
  for (let dia = 1; dia <= 7; dia++) {
    if (y > PAGE.h - 30) {
      doc.addPage();
      y = 32;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.text);
    doc.text(`Dia ${dia}:`, PAGE.margin, y);
    doc.line(PAGE.margin + 14, y, PAGE.w - PAGE.margin, y);
    y += 8;
  }

  y += 2;
  if (y > PAGE.h - 40) {
    doc.addPage();
    y = 32;
  }
  doc.setFillColor(245, 240, 250);
  doc.roundedRect(PAGE.margin, y, PAGE.w - PAGE.margin * 2, 22, 2, 2, "F");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.primary);
  doc.text(
    `"A poesia é onde a alma aprende a respirar." — leve esta frase com você.`,
    PAGE.w / 2,
    y + 12,
    { align: "center", maxWidth: PAGE.w - PAGE.margin * 2 - 8 },
  );

  footer(doc);
  doc.save(`PADH_Paciente_M${modulo.numero}_${slug(modulo.titulo)}.pdf`);
}

/* ─────────── PDF DO PRONTUÁRIO EM BRANCO ─────────── */
export function gerarPDFProntuarioBranco() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  header(doc, "Prontuário PCH — Registro de Sessão", "Prontuário Clínico");

  let y = 32;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("Registro de Sessão Terapêutica — PCH no P.A.D.H.", PAGE.margin, y);
  y += 9;

  const linha = (label: string, alturaLinhas = 1) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.text);
    doc.text(label, PAGE.margin, y);
    y += 4.5;
    doc.setDrawColor(...COLORS.border);
    for (let i = 0; i < alturaLinhas; i++) {
      doc.line(PAGE.margin, y, PAGE.w - PAGE.margin, y);
      y += 6;
    }
    y += 2;
    if (y > PAGE.h - 30) {
      doc.addPage();
      y = 32;
    }
  };

  linha(
    "Data:                                  Nº da Sessão:                    Iniciais do paciente:",
  );
  linha("Queixa atual & estado emocional inicial (escala 0–10):", 2);

  y = sectionTitle(doc, y, "Sinais Observados pela Linguagem (marcar ☐)");
  const sinaisLinguagem = [
    "Atos falhos / lapsos (Freud) — significantes inesperados",
    "Significantes-mestre repetidos (Lacan)",
    "Símbolos arquetípicos emergentes (Jung)",
    "Padrões de apego no discurso (Bowlby)",
    "Distorções cognitivas (Beck)",
    "Discurso fragmentado (trauma — Janet/Van der Kolk)",
    "Alexitimia (dificuldade nomear emoções)",
    "Auto-desqualificação verbal recorrente",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  for (const s of sinaisLinguagem) {
    doc.rect(PAGE.margin, y - 3, 3, 3);
    doc.text(s, PAGE.margin + 5, y);
    y += 5.5;
  }
  y += 2;

  y = sectionTitle(doc, y, "Pilar P.A.D.H. trabalhado nesta sessão");
  doc.setFont("helvetica", "normal");
  [
    "☐ P (Poesia/Escuta)",
    "☐ A (Aplicada/Reestruturação)",
    "☐ D (Desenvolvimento/Aprofundamento)",
    "☐ H (Humano/Integração)",
  ].forEach((p, i) => {
    doc.text(p, PAGE.margin + (i % 2) * 90, y + Math.floor(i / 2) * 6);
  });
  y += 16;

  linha(
    "Ferramenta aplicada (Poema-Funil, Verso-Gatilho, Poemadiagnóstico, etc.):",
  );

  y = sectionTitle(doc, y, "Aplicação Passo a Passo (1 a 5)");
  for (let i = 1; i <= 5; i++) linha(`${i}.`);

  if (y > PAGE.h - 80) {
    doc.addPage();
    y = 32;
  }
  y = sectionTitle(doc, y, "Resposta do Paciente");
  linha("Verbal:", 2);
  linha("Corporal:", 2);
  linha("Emocional:", 2);

  if (y > PAGE.h - 60) {
    doc.addPage();
    y = 32;
  }
  linha("Verso/poema co-criado em sessão:", 4);

  y = sectionTitle(
    doc,
    y,
    "Cuidados Éticos Observados (CFP/CFM)",
    COLORS.accent,
  );
  [
    "☐ Sigilo preservado",
    "☐ Consentimento informado renovado",
    "☐ Limites profissionais respeitados",
    "☐ Encaminhamento avaliado quando necessário",
    "☐ Registro adequado em prontuário",
  ].forEach((c) => {
    doc.text(c, PAGE.margin, y);
    y += 5.5;
  });
  y += 3;

  if (y > PAGE.h - 60) {
    doc.addPage();
    y = 32;
  }
  linha(
    "Hipótese teórica de leitura (Freud / Lacan / Jung / Beck / Erickson / outro):",
    3,
  );
  linha("Tarefa terapêutica entregue ao paciente:", 2);
  linha("Próximos passos para a sessão seguinte:", 2);

  footer(doc);
  doc.save("PADH_Prontuario_PCH_Sessao.pdf");
}

/* ─────────── PDF DO RELATÓRIO DE PROGRESSO ─────────── */
export function gerarRelatorioProgresso(
  progressData: any,
  modulos: ModuloClinico[],
  jornadaProgress?: any,
) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  header(doc, "Relatório de Evolução P.A.D.H.", "Progresso do Aluno");

  let y = 32;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Relatório de Jornada Terapêutica", PAGE.margin, y);
  y += 10;

  y = sectionTitle(doc, y, "1. PERFIL E DIAGNÓSTICO");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Trilha Sugerida: ${progressData.diagnosisResult || "Não realizada"}`,
    PAGE.margin,
    y,
  );
  y += 6;
  if (jornadaProgress) {
    doc.text(
      `Fase Atual da Jornada: ${jornadaProgress.currentPhaseId}`,
      PAGE.margin,
      y,
    );
    y += 6;
  }
  doc.text(
    `Data de Emissão: ${new Date().toLocaleDateString()}`,
    PAGE.margin,
    y,
  );
  y += 10;

  // Jornada por Fase
  if (jornadaProgress) {
    y = sectionTitle(doc, y, "2. STATUS DA JORNADA POR FASE");
    const fases = [
      { id: "fase-1", titulo: "Despertar" },
      { id: "fase-2", titulo: "Encontro com a Sombra" },
      { id: "fase-3", titulo: "Reprogramação" },
      { id: "fase-4", titulo: "Expansão" },
    ];

    const faseBody = fases.map((f) => {
      const isCurrent = jornadaProgress.currentPhaseId === f.id;
      const isDone =
        (jornadaProgress.completedSessions || []).length > 0 && !isCurrent;
      return [
        f.titulo,
        isCurrent ? "EM ANDAMENTO" : isDone ? "CONCLUÍDA" : "BLOQUEADA",
      ];
    });

    autoTable(doc, {
      startY: y,
      head: [["Fase", "Status"]],
      body: faseBody,
      theme: "grid",
      headStyles: { fillColor: COLORS.primary },
      margin: { left: PAGE.margin, right: PAGE.margin },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  if (jornadaProgress && (jornadaProgress.responses || []).length > 0) {
    y = sectionTitle(doc, y, "3. REFLEXÕES E RESPOSTAS DETALHADAS");
    jornadaProgress.responses.forEach((r: any) => {
      if (y > PAGE.h - 40) {
        doc.addPage();
        y = 32;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(
        `Exercício: ${r.exerciseId} (${r.date.split("T")[0]})`,
        PAGE.margin,
        y,
      );
      y += 5;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      const lines = doc.splitTextToSize(
        `"${r.response}"`,
        PAGE.w - PAGE.margin * 2,
      );
      doc.text(lines, PAGE.margin, y);
      y += lines.length * 4 + 6;
    });
    y += 6;
  }

  y = sectionTitle(doc, y, "4. PROGRESSO DO CURSO TÉCNICO");
  const totalModulos = modulos.length;
  const concluidos = (progressData.completedModules || []).length;
  const percent = Math.round((concluidos / totalModulos) * 100);

  doc.setFillColor(240, 240, 240);
  doc.rect(PAGE.margin, y, PAGE.w - PAGE.margin * 2, 8, "F");
  doc.setFillColor(...COLORS.primary);
  doc.rect(
    PAGE.margin,
    y,
    (PAGE.w - PAGE.margin * 2) * (percent / 100),
    8,
    "F",
  );
  y += 14;
  doc.setFontSize(10);
  doc.text(
    `${percent}% dos módulos concluídos (${concluidos} de ${totalModulos})`,
    PAGE.margin,
    y,
  );
  y += 10;

  y = sectionTitle(doc, y, "5. DETALHAMENTO DOS MÓDULOS");

  const body = modulos.map((m) => {
    const isCompleted = (progressData.completedModules || []).includes(m.id);
    const activities = (progressData.completedActivities[m.id] || []).length;
    const totalActivities = (m.atividades || []).length;
    return [
      `M${m.numero}`,
      m.titulo,
      isCompleted ? "CONCLUÍDO" : `${activities}/${totalActivities} etapas`,
      isCompleted
        ? "100%"
        : `${Math.round((activities / totalActivities) * 100)}%`,
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [["Nº", "Título do Módulo", "Etapas", "Progresso"]],
    body: body,
    theme: "striped",
    headStyles: { fillColor: COLORS.primary, textColor: 255 },
    bodyStyles: { fontSize: 9 },
    margin: { left: PAGE.margin, right: PAGE.margin },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  if (y > PAGE.h - 40) {
    doc.addPage();
    y = 32;
  }

  y = sectionTitle(doc, y, "6. PRÓXIMOS PASSOS");
  const nextModule = modulos.find(
    (m) => !(progressData.completedModules || []).includes(m.id),
  );
  if (nextModule) {
    y = addParagraph(
      doc,
      y,
      `Continuar jornada técnica em: "${nextModule.titulo}".`,
    );
  } else {
    y = addParagraph(
      doc,
      y,
      "Parabéns! Você concluiu todos os módulos técnicos da formação.",
    );
  }

  footer(doc);
  doc.save("Relatorio_Evolucao_PADH.pdf");
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
