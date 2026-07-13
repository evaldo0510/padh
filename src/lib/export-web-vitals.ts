/**
 * Exportação dos dados agregados do painel Web Vitals para CSV/PDF.
 *
 * Segurança: a rota /admin/web-vitals já exige `requireAdmin` (checagem via
 * user_roles + has_role). Nenhum dado extra é buscado aqui — reutilizamos os
 * agregados que o painel já calculou a partir de uma query RLS-protegida.
 */
import { toast } from "sonner";

export interface ExportSummaryRow {
  name: string;
  count: number;
  p50: number;
  p75: number;
  p95: number;
}

export interface ExportDailyRow {
  date: string;
  LCP: number;
  CLS: number;
  INP: number;
  TTFB: number;
}

export interface ExportPayload {
  generatedAt: Date;
  windowDays: string;
  device: string;
  totalEvents: number;
  totalSessions: number;
  summary: ExportSummaryRow[];
  daily: ExportDailyRow[];
}

function csvEscape(v: string | number): string {
  const s = String(v ?? "");
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows: (string | number)[][]): string {
  return rows.map((r) => r.map(csvEscape).join(",")).join("\n");
}

function download(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function fileStamp(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(
    d.getHours(),
  )}${pad(d.getMinutes())}`;
}

export function exportWebVitalsCsv(p: ExportPayload): void {
  try {
    const meta = [
      ["Relatório", "Web Vitals — PADH"],
      ["Gerado em", p.generatedAt.toISOString()],
      ["Janela (dias)", p.windowDays],
      ["Device", p.device],
      ["Eventos", p.totalEvents],
      ["Sessões únicas", p.totalSessions],
      [],
      ["Resumo por métrica (p50 / p75 / p95)"],
      ["Metric", "Amostras", "p50", "p75", "p95"],
      ...p.summary.map((s) => [s.name, s.count, s.p50, s.p75, s.p95]),
      [],
      ["Agregado diário (mediana)"],
      ["Data", "LCP (ms)", "CLS", "INP (ms)", "TTFB (ms)"],
      ...p.daily.map((d) => [d.date, d.LCP, d.CLS, d.INP, d.TTFB]),
    ];
    const blob = new Blob([toCsv(meta as (string | number)[][])], {
      type: "text/csv;charset=utf-8",
    });
    download(blob, `web-vitals-${fileStamp(p.generatedAt)}.csv`);
    toast.success("CSV exportado.");
  } catch (e) {
    console.error(e);
    toast.error("Falha ao exportar CSV.");
  }
}

export async function exportWebVitalsPdf(p: ExportPayload): Promise<void> {
  try {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginX = 40;
    let y = 48;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Web Vitals — Relatório", marginX, y);
    y += 22;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = [
      `Gerado em: ${p.generatedAt.toLocaleString("pt-BR")}`,
      `Janela: últimos ${p.windowDays} dia(s)   ·   Device: ${p.device}`,
      `Eventos: ${p.totalEvents}   ·   Sessões únicas: ${p.totalSessions}`,
    ];
    lines.forEach((l) => {
      doc.text(l, marginX, y);
      y += 14;
    });

    y += 8;
    autoTable(doc, {
      startY: y,
      head: [["Métrica", "Amostras", "p50", "p75", "p95"]],
      body: p.summary.map((s) => [
        s.name,
        s.count,
        s.name === "CLS" ? s.p50.toFixed(3) : Math.round(s.p50),
        s.name === "CLS" ? s.p75.toFixed(3) : Math.round(s.p75),
        s.name === "CLS" ? s.p95.toFixed(3) : Math.round(s.p95),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [30, 41, 59] },
    });

    const afterSummaryY =
      ((doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
        ?.finalY ?? y) + 20;

    autoTable(doc, {
      startY: afterSummaryY,
      head: [["Data", "LCP (ms)", "CLS", "INP (ms)", "TTFB (ms)"]],
      body: p.daily.map((d) => [d.date, d.LCP, d.CLS, d.INP, d.TTFB]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [30, 41, 59] },
    });

    doc.save(`web-vitals-${fileStamp(p.generatedAt)}.pdf`);
    toast.success("PDF exportado.");
  } catch (e) {
    console.error(e);
    toast.error("Falha ao exportar PDF.");
  }
}
