import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { FileText, FileDown, GitBranch, ClipboardCheck, Stethoscope, User, BookOpen, PenTool, Sparkles, LayoutDashboard } from 'lucide-react';
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
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Link to="/dashboard" className="glass-card rounded-2xl p-6 border-primary/20 bg-primary/5 hover:border-primary/40 hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Painel do Aluno</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Acompanhe sua trilha de aprendizado e progresso nos módulos.
              </p>
              <span className="text-sm text-primary font-medium">Ver progresso →</span>
            </Link>

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
              <p className="text-muted-foreground max-w-xl mx-auto mb-5">
                Cada módulo tem identidade cromática própria — uma paleta única conectada pela mesma temperatura espiritual.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {MODULOS.map(m => (
                  <div key={m.id} data-module={m.numero} className="module-themed flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-module-soft border border-module/20">
                    <span className="w-2 h-2 rounded-full bg-module shadow-module-glow" />
                    <span className="text-[11px] font-medium text-foreground/80">M{m.numero}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {MODULOS.map(m => (
                <div
                  key={m.id}
                  data-module={m.numero}
                  className="module-themed glass-card rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 border border-module/30 hover:border-module/60 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-module-soft flex items-center justify-center shrink-0 ring-1 ring-module/20">
                      <BookOpen className="h-5 w-5 text-module" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-module font-bold uppercase tracking-[0.2em]">
                        Módulo {m.numero} · Pilar {m.pilar} · {m.corNome}
                      </p>
                      <h4 className="font-heading font-semibold text-foreground truncate">{m.titulo}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 italic">{m.corSimbolo}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => { gerarPDFTerapeuta(m); toast.success(`PDF Terapeuta — Módulo ${m.numero}`); }} className="gap-1.5 border-module hover:bg-module-soft hover:text-module">
                      <Stethoscope className="h-3.5 w-3.5" /> Terapeuta
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { gerarPDFPaciente(m); toast.success(`PDF Paciente — Módulo ${m.numero}`); }} className="gap-1.5 border-module hover:bg-module-soft hover:text-module">
                      <User className="h-3.5 w-3.5" /> Paciente
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Ferramentas */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Ferramentas de Intervenção
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Acesse as ferramentas práticas para aplicação direta nas sessões.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Poema-Funil', path: '/ferramentas/poema-funil', icon: Sparkles },
                { name: 'Verso-Gatilho', path: '/ferramentas/verso-gatilho', icon: PenTool },
                { name: 'Poemadiagnóstico', path: '/ferramentas/poemadiagnostico', icon: Stethoscope },
                { name: 'Voz Interna', path: '/ferramentas/caderno-voz-interna', icon: BookOpen },
                { name: 'Encenação Poética', path: '/ferramentas/encenacao-poetica', icon: User },
                { name: 'Reescrita Poética', path: '/ferramentas/reescrita-poetica', icon: GitBranch },
                { name: 'Ritual do Silêncio', path: '/ferramentas/ritual-silencio', icon: ClipboardCheck },
                { name: 'Poesia Hipnótica', path: '/ferramentas/poesia-hipnotica', icon: Brain },
              ].map((tool, idx) => (
                <Link 
                  key={idx} 
                  to={tool.path}
                  className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02] transition-all flex flex-col items-center text-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <tool.icon className="h-5 w-5 text-primary/70" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{tool.name}</span>
                </Link>
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
