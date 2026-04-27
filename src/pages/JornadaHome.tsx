import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { JORNADA_DATA } from '@/lib/jornada-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Map, 
  ChevronRight, 
  Lock, 
  CheckCircle2, 
  Library,
  Compass
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const JornadaHome = () => {
  const navigate = useNavigate();
  // Using the existing progress system but we'll need to expand it or create a new one for Jornada
  const { progress } = useCourseProgress();

  return (
    <PageLayout
      seo={{
        title: 'Jornada de Transformação — P.A.D.H.',
        description: 'Sua trilha estruturada de desenvolvimento pessoal e exercícios terapêuticos.',
        path: '/jornada',
      }}
      currentPage="Jornada"
    >
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Compass className="h-3 w-3" />
              Treinamento Terapêutico
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Jornada de <span className="text-primary italic">Transformação</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Quatro fases para o seu despertar e expansão de consciência.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/biblioteca-exercicios"><Library className="h-4 w-4" /> Biblioteca</Link>
            </Button>
            <Button asChild className="gap-2 shadow-glow">
              <Link to="/diagnostico-jornada"><Sparkles className="h-4 w-4" /> Novo Diagnóstico</Link>
            </Button>
          </div>
        </div>

        {/* Journey Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {JORNADA_DATA.map((fase) => {
            const isUnlocked = fase.numero === 1; // For now, just phase 1 unlocked
            
            return (
              <Card 
                key={fase.id} 
                className={`relative overflow-hidden transition-all duration-300 border-primary/10 ${
                  isUnlocked ? 'hover:border-primary/40 hover:-translate-y-1' : 'opacity-70'
                }`}
              >
                <div className={`h-1.5 w-full bg-${fase.cor}-500`} />
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fase {fase.numero}</span>
                    {isUnlocked ? <CheckCircle2 className="h-4 w-4 text-primary opacity-20" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <CardTitle className="font-heading text-xl">{fase.titulo}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{fase.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-tight">
                        <span>Progresso</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-1" />
                    </div>
                    
                    <Button 
                      variant={isUnlocked ? "secondary" : "ghost"} 
                      size="sm" 
                      className="w-full gap-2"
                      disabled={!isUnlocked}
                      onClick={() => navigate(`/jornada/${fase.id}`)}
                    >
                      {isUnlocked ? 'Continuar' : 'Bloqueado'}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Current Focus Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
              <Map className="h-6 w-6 text-primary" />
              Sessões Atuais
            </h2>
            
            <div className="space-y-4">
              {JORNADA_DATA[0].sessoes.map((sessao) => (
                <div 
                  key={sessao.id}
                  className="p-6 rounded-2xl border border-primary/10 bg-card hover:border-primary/30 transition-all group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {sessao.titulo}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{sessao.descricao}</p>
                      <div className="flex gap-2">
                        {sessao.exercicios.map((ex, i) => (
                          <div 
                            key={ex.id}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground group-hover:border-primary/30 transition-colors"
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/jornada/${JORNADA_DATA[0].id}/${sessao.id}`}>Iniciar Sessão</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="border-primary/10 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg font-heading">Status da Jornada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Fase Atual</span>
                  <span className="font-bold">1. Despertar</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Exercícios Totais</span>
                  <span className="font-bold">5</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Concluídos</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="pt-4 border-t border-primary/10">
                   <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                     "Cada passo é uma vitória. Não tenha pressa de chegar, aprecie o processo de se tornar."
                   </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default JornadaHome;
