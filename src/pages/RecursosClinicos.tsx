import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { FileText, FileDown, GitBranch, ClipboardCheck, Stethoscope, User, BookOpen } from 'lucide-react';
import { MODULOS } from '@/lib/dados-clinicos';
import { gerarPDFTerapeuta, gerarPDFPaciente, gerarPDFProntuarioBranco } from '@/lib/pdf-generator';
import FluxogramaDecisao from '@/components/clinical/FluxogramaDecisao';
import { toast } from 'sonner';

const RecursosClinicos: React.FC = () => {
  return (
    <PageLayout
      seo={{
        title: 'Recursos Clínicos PCH — PDFs, Prontuário e Fluxograma | P.A.D.H.',
        description: 'Hub central de ferramentas clínicas do PCH: PDFs imprimíveis para terapeuta e paciente, prontuário de sessão, checklists e fluxograma de decisão.',
        path: '/recursos-clinicos',
      }}
      currentPage="Recursos Clínicos"
    >
      <section className="py-12 md:py-20 border-b border-border/30">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm mb-4">
            <Stethoscope className="h-4 w-4" /> Para profissionais habilitados
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Recursos Clínicos <span className="text-primary italic">PCH</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Tudo que você precisa para aplicar o PCH no consultório:
            protocolos imprimíveis, prontuário de sessão, checklists e fluxograma de decisão clínica.
          </p>
        </div>
      </section>

      {/* Grid de recursos principais */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Link to="/prontuario-pch" className="glass-card rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Prontuário de Sessão</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Template digital para registrar sinais, aplicação, resposta do paciente e cuidados éticos.
              </p>
              <span className="text-sm text-primary font-medium">Abrir prontuário →</span>
            </Link>

            <a href="#fluxograma" className="glass-card rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mb-4 group-hover:bg-secondary/25 transition-colors">
                <GitBranch className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Fluxograma de Decisão</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Responda 2 perguntas e descubra qual pilar/módulo aplicar primeiro no PCH.
              </p>
              <span className="text-sm text-secondary font-medium">Usar fluxograma →</span>
            </a>

            <Link to="/curso-padh" className="glass-card rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-spiritual-amber/15 flex items-center justify-center mb-4 group-hover:bg-spiritual-amber/25 transition-colors">
                <ClipboardCheck className="h-6 w-6 text-spiritual-amber" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Checklists Clínicos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Checklist rápido no início de cada módulo: sinais, contenção, próximos passos.
              </p>
              <span className="text-sm text-spiritual-amber font-medium">Ver no curso →</span>
            </Link>
          </div>

          {/* Prontuário em branco */}
          <div className="rounded-2xl border-2 border-dashed border-primary/25 bg-primary/[0.02] p-6 md:p-8 mb-16">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div>
                <h3 className="font-heading font-semibold text-foreground text-xl mb-1">Prontuário em branco (PDF)</h3>
                <p className="text-sm text-muted-foreground">Imprima, leve para o consultório e preencha à mão durante a sessão.</p>
              </div>
              <Button onClick={() => { gerarPDFProntuarioBranco(); toast.success('PDF do prontuário gerado.'); }} className="gap-2 shrink-0">
                <FileDown className="h-4 w-4" /> Baixar PDF
              </Button>
            </div>
          </div>

          {/* Biblioteca de PDFs por módulo */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Biblioteca de PDFs por Módulo
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Cada módulo possui dois PDFs: um para o terapeuta (protocolo completo) e outro para entregar ao paciente.
              </p>
            </div>

            <div className="space-y-3">
              {MODULOS.map(m => (
                <div key={m.id} className="glass-card rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-primary font-medium uppercase tracking-wider">
                        Módulo {m.numero} · Pilar {m.pilar}
                      </p>
                      <h4 className="font-heading font-semibold text-foreground truncate">{m.titulo}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{m.foco}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => { gerarPDFTerapeuta(m); toast.success(`PDF Terapeuta — Módulo ${m.numero}`); }} className="gap-1.5">
                      <Stethoscope className="h-3.5 w-3.5" /> Terapeuta
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { gerarPDFPaciente(m); toast.success(`PDF Paciente — Módulo ${m.numero}`); }} className="gap-1.5">
                      <User className="h-3.5 w-3.5" /> Paciente
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fluxograma */}
          <div id="fluxograma" className="scroll-mt-24">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Fluxograma de Decisão Clínica
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Use antes da intervenção para definir o pilar de entrada com base nos sintomas observáveis.
              </p>
            </div>
            <FluxogramaDecisao />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default RecursosClinicos;
