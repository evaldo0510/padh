import React, { useState, useId } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { FileDown, Save, FileText, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { gerarPDFProntuarioBranco } from "@/lib/pdf-generator";
import { toast } from "sonner";
const SINAIS_LINGUAGEM = [
  {
    label: "Atos falhos / lapsos",
    teorico: "Freud",
  },
  {
    label: "Significantes-mestre repetidos",
    teorico: "Lacan",
  },
  {
    label: "Símbolos arquetípicos emergentes",
    teorico: "Jung",
  },
  {
    label: "Padrões de apego no discurso",
    teorico: "Bowlby",
  },
  {
    label: "Distorções cognitivas",
    teorico: "Beck",
  },
  {
    label: "Discurso fragmentado / dissociado",
    teorico: "Janet · Van der Kolk",
  },
  {
    label: "Alexitimia (dificuldade nomear emoções)",
    teorico: "Sifneos",
  },
  {
    label: "Auto-desqualificação verbal recorrente",
    teorico: "Ellis",
  },
];
const PILARES = [
  "P (Poesia/Escuta)",
  "A (Aplicada/Reestruturação)",
  "D (Desenvolvimento/Aprofundamento)",
  "H (Humano/Integração)",
];
const ETICA = [
  "Sigilo preservado",
  "Consentimento informado renovado",
  "Limites profissionais respeitados",
  "Encaminhamento avaliado quando necessário",
  "Registro adequado em prontuário",
];
interface FormState {
  data: string;
  numeroSessao: string;
  iniciaisPaciente: string;
  queixaInicial: string;
  escalaInicial: string;
  sinais: Record<number, boolean>;
  pilares: Record<number, boolean>;
  ferramenta: string;
  passos: string[];
  respostaVerbal: string;
  respostaCorporal: string;
  respostaEmocional: string;
  versoCoCriado: string;
  etica: Record<number, boolean>;
  hipoteseTeorica: string;
  tarefa: string;
  proximosPassos: string;
}
const initial = (): FormState => ({
  data: new Date().toISOString().slice(0, 10),
  numeroSessao: "",
  iniciaisPaciente: "",
  queixaInicial: "",
  escalaInicial: "",
  sinais: {},
  pilares: {},
  ferramenta: "",
  passos: ["", "", "", "", ""],
  respostaVerbal: "",
  respostaCorporal: "",
  respostaEmocional: "",
  versoCoCriado: "",
  etica: {},
  hipoteseTeorica: "",
  tarefa: "",
  proximosPassos: "",
});
const STORAGE_KEY = "padh-prontuario-rascunho";
const Prontuario: React.FC = () => {
  const [form, setForm] = useState<FormState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved)
        return {
          ...initial(),
          ...JSON.parse(saved),
        };
    } catch {
      /* ignore */
    }
    return initial();
  });
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({
      ...f,
      [key]: value,
    }));
  const salvarRascunho = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    toast.success("Rascunho salvo neste navegador.");
  };
  const limpar = () => {
    if (confirm("Limpar todo o prontuário? Esta ação não pode ser desfeita.")) {
      setForm(initial());
      localStorage.removeItem(STORAGE_KEY);
      toast.success("Prontuário limpo.");
    }
  };
  const baixarPDFBranco = () => {
    gerarPDFProntuarioBranco();
    toast.success("PDF do prontuário em branco gerado.");
  };
  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => {
    const generatedId = useId();
    // Localiza o primeiro filho que é um elemento (ignora strings/whitespace)
    // e injeta id para associar ao <label htmlFor>.
    let fieldId = generatedId;
    const enhanced = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      const existingId = (child.props as { id?: string }).id;
      if (existingId) fieldId = existingId;
      return React.cloneElement(child as React.ReactElement<{ id?: string }>, {
        id: fieldId,
      });
    });
    return (
      <div>
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          {label}
        </label>
        {enhanced}
      </div>
    );
  };
  const inputCls =
    "w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30";
  return (
    <PageLayout
      seo={{
        title: "Prontuário PCH — Registro de Sessão Clínica P.A.D.H.",
        description:
          "Template digital e PDF do prontuário PCH para registrar sinais, aplicação, resposta do paciente e cuidados éticos.",
        path: "/prontuario-pch",
      }}
      currentPage="Prontuário PCH"
    >
      {" "}
      <section className="py-12 md:py-20">
        {" "}
        <div className="container mx-auto px-6 max-w-4xl">
          {" "}
          <div className="text-center mb-10">
            {" "}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm mb-4">
              {" "}
              <FileText className="spiritual-icon" /> Prontuário Clínico{" "}
            </div>{" "}
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
              {" "}
              Registro de Sessão{" "}
              <span className="text-primary italic">PCH no P.A.D.H.</span>{" "}
            </h1>{" "}
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {" "}
              Preencha os campos durante ou imediatamente após a sessão. O
              rascunho fica salvo neste navegador. Você também pode baixar o
              template em PDF em branco para imprimir.{" "}
            </p>{" "}
          </div>{" "}
          {/* Botões de ação */}
          <div className="flex flex-wrap gap-3 mb-8 sticky top-20 z-30 bg-background/95 backdrop-blur-sm py-3 rounded-xl border border-border/50 px-4 shadow-sm">
            {" "}
            <Button onClick={salvarRascunho} className="gap-2">
              <Save className="spiritual-icon" /> Salvar rascunho
            </Button>{" "}
            <Button
              onClick={baixarPDFBranco}
              variant="secondary"
              className="gap-2"
            >
              <FileDown className="spiritual-icon" /> Baixar PDF em branco
            </Button>{" "}
            <Button
              onClick={limpar}
              variant="outline"
              className="gap-2 ml-auto"
            >
              <RotateCcw className="spiritual-icon" /> Limpar
            </Button>{" "}
          </div>{" "}
          <div className="space-y-8 glass-card rounded-2xl p-6 md:p-10">
            {" "}
            {/* Identificação */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Identificação
              </h2>{" "}
              <div className="grid sm:grid-cols-3 gap-4">
                {" "}
                <Field label="Data">
                  <input
                    type="date"
                    className={inputCls}
                    value={form.data}
                    onChange={(e) => update("data", e.target.value)}
                  />
                </Field>{" "}
                <Field label="Nº da sessão">
                  <input
                    className={inputCls}
                    value={form.numeroSessao}
                    onChange={(e) => update("numeroSessao", e.target.value)}
                    placeholder="Ex.: 12"
                  />
                </Field>{" "}
                <Field label="Iniciais do paciente">
                  <input
                    className={inputCls}
                    value={form.iniciaisPaciente}
                    onChange={(e) => update("iniciaisPaciente", e.target.value)}
                    placeholder="Ex.: M.S.A."
                  />
                </Field>{" "}
              </div>{" "}
            </section>{" "}
            {/* Queixa atual */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Queixa atual & estado emocional inicial
              </h2>{" "}
              <div className="space-y-3">
                {" "}
                <textarea
                  className={inputCls}
                  rows={3}
                  value={form.queixaInicial}
                  onChange={(e) => update("queixaInicial", e.target.value)}
                  placeholder="Como o paciente chegou? O que trouxe hoje?"
                />{" "}
                <Field label="Escala emocional inicial (0–10)">
                  {" "}
                  <input
                    type="number"
                    min={0}
                    max={10}
                    className={inputCls}
                    value={form.escalaInicial}
                    onChange={(e) => update("escalaInicial", e.target.value)}
                    placeholder="0 = bem · 10 = sofrimento intenso"
                  />{" "}
                </Field>{" "}
              </div>{" "}
            </section>{" "}
            {/* Sinais pela linguagem */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-1 pb-2 border-b border-border/50">
                Sinais observados pela linguagem
              </h2>{" "}
              <p className="text-xs text-muted-foreground mb-4 italic">
                Marque os padrões observados — cada sinal está ancorado em um
                teórico de referência.
              </p>{" "}
              <div className="grid sm:grid-cols-2 gap-2">
                {" "}
                {SINAIS_LINGUAGEM.map((s, i) => (
                  <label
                    key={i}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-primary/[0.03] cursor-pointer"
                  >
                    {" "}
                    <Checkbox
                      checked={!!form.sinais[i]}
                      onCheckedChange={(v) =>
                        update("sinais", {
                          ...form.sinais,
                          [i]: !!v,
                        })
                      }
                      className="mt-0.5"
                    />{" "}
                    <div>
                      {" "}
                      <p className="text-sm text-foreground">{s.label}</p>{" "}
                      <p className="text-xs text-primary italic">
                        {s.teorico}
                      </p>{" "}
                    </div>{" "}
                  </label>
                ))}
              </div>{" "}
            </section>{" "}
            {/* Pilar */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Pilar P.A.D.H. trabalhado
              </h2>{" "}
              <div className="grid sm:grid-cols-2 gap-2">
                {" "}
                {PILARES.map((p, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-primary/[0.03] cursor-pointer"
                  >
                    {" "}
                    <Checkbox
                      checked={!!form.pilares[i]}
                      onCheckedChange={(v) =>
                        update("pilares", {
                          ...form.pilares,
                          [i]: !!v,
                        })
                      }
                    />{" "}
                    <span className="text-sm text-foreground">{p}</span>{" "}
                  </label>
                ))}
              </div>{" "}
            </section>{" "}
            {/* Ferramenta */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Ferramenta aplicada
              </h2>{" "}
              <input
                className={inputCls}
                value={form.ferramenta}
                onChange={(e) => update("ferramenta", e.target.value)}
                placeholder="Ex.: Poema-Funil, Verso-Gatilho, Poemadiagnóstico..."
              />{" "}
            </section>{" "}
            {/* Passo a passo */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Aplicação passo a passo
              </h2>{" "}
              <div className="space-y-2">
                {" "}
                {form.passos.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    {" "}
                    <span className="shrink-0 w-8 h-9 rounded-md bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                      {i + 1}
                    </span>{" "}
                    <input
                      className={inputCls}
                      value={p}
                      onChange={(e) => {
                        const next = [...form.passos];
                        next[i] = e.target.value;
                        update("passos", next);
                      }}
                      placeholder={`Passo ${i + 1}...`}
                    />{" "}
                  </div>
                ))}
              </div>{" "}
            </section>{" "}
            {/* Resposta */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Resposta do paciente
              </h2>{" "}
              <div className="grid md:grid-cols-3 gap-4">
                {" "}
                <Field label="Verbal">
                  <textarea
                    className={inputCls}
                    rows={4}
                    value={form.respostaVerbal}
                    onChange={(e) => update("respostaVerbal", e.target.value)}
                  />
                </Field>{" "}
                <Field label="Corporal">
                  <textarea
                    className={inputCls}
                    rows={4}
                    value={form.respostaCorporal}
                    onChange={(e) => update("respostaCorporal", e.target.value)}
                  />
                </Field>{" "}
                <Field label="Emocional">
                  <textarea
                    className={inputCls}
                    rows={4}
                    value={form.respostaEmocional}
                    onChange={(e) =>
                      update("respostaEmocional", e.target.value)
                    }
                  />
                </Field>{" "}
              </div>{" "}
            </section>{" "}
            {/* Verso co-criado */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Verso/poema co-criado em sessão
              </h2>{" "}
              <textarea
                className={`${inputCls}
font-serif italic`}
                rows={5}
                value={form.versoCoCriado}
                onChange={(e) => update("versoCoCriado", e.target.value)}
                placeholder="Transcreva fielmente o material poético produzido junto com o paciente..."
              />{" "}
            </section>{" "}
            {/* Cuidados éticos */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Cuidados éticos observados (CFP/CFM)
              </h2>{" "}
              <div className="grid sm:grid-cols-2 gap-2">
                {" "}
                {ETICA.map((e, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-primary/[0.03] cursor-pointer"
                  >
                    {" "}
                    <Checkbox
                      checked={!!form.etica[i]}
                      onCheckedChange={(v) =>
                        update("etica", {
                          ...form.etica,
                          [i]: !!v,
                        })
                      }
                    />{" "}
                    <span className="text-sm text-foreground">{e}</span>{" "}
                  </label>
                ))}
              </div>{" "}
            </section>{" "}
            {/* Hipótese teórica */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Hipótese teórica de leitura
              </h2>{" "}
              <textarea
                className={inputCls}
                rows={3}
                value={form.hipoteseTeorica}
                onChange={(e) => update("hipoteseTeorica", e.target.value)}
                placeholder="Como o caso se lê à luz de Freud, Lacan, Jung, Beck, Erickson, Winnicott...?"
              />{" "}
            </section>{" "}
            {/* Tarefa & próximos passos */}
            <section>
              {" "}
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                Continuidade do tratamento
              </h2>{" "}
              <div className="space-y-4">
                {" "}
                <Field label="Tarefa terapêutica entregue ao paciente">
                  <textarea
                    className={inputCls}
                    rows={3}
                    value={form.tarefa}
                    onChange={(e) => update("tarefa", e.target.value)}
                  />
                </Field>{" "}
                <Field label="Próximos passos para a sessão seguinte">
                  <textarea
                    className={inputCls}
                    rows={3}
                    value={form.proximosPassos}
                    onChange={(e) => update("proximosPassos", e.target.value)}
                  />
                </Field>{" "}
              </div>{" "}
            </section>{" "}
            <div className="rounded-xl bg-spiritual-amber/[0.05] border border-spiritual-amber/25 p-4 text-xs text-muted-foreground">
              {" "}
              ⚠ Este registro é uma ferramenta de apoio clínico. Mantenha
              sigilo, não armazene dados identificáveis sem consentimento
              explícito. Para uso institucional, integre ao prontuário oficial
              conforme as normas do CFP/CFM.{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </PageLayout>
  );
};
export default Prontuario;
