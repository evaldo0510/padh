import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { MODULOS } from '@/lib/dados-clinicos';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  BookOpen, 
  Target, 
  Clock, 
  ChevronRight, 
  PlayCircle, 
  Lock, 
  CheckCircle2,
  Library,
  Sparkles,
  LayoutDashboard,
  Calendar,
  RefreshCw,
  Bell,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WeeklySchedule from '@/components/dashboard/WeeklySchedule';
import ReviewSection from '@/components/dashboard/ReviewSection';
import ProgressReportExport from '@/components/dashboard/ProgressReportExport';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import ResponseHistory from '@/components/dashboard/ResponseHistory';
import SupabaseConfigBanner from '@/components/dashboard/SupabaseConfigBanner';

import { useJornada } from '@/hooks/useJornada';
import { JORNADA_DATA } from '@/lib/jornada-data';

const Dashboard = () => {
  const { jornada } = useJornada();
  const { progress, isModuleUnlocked } = useCourseProgress();
  const navigate = useNavigate();

  const completedCount = progress.completedModules.length;
  const totalCount = MODULOS.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);

  const nextModule = MODULOS.find(m => !progress.completedModules.includes(m.id));

  const diagnosisLabel = progress.diagnosisResult || "Não realizado";

  return (
    <PageLayout
      seo={{
        title: 'Dashboard do Aluno — P.A.D.H.',
        description: 'Acompanhe seu progresso e trilha de aprendizado.',
        path: '/dashboard',
      }}
      currentPage="Dashboard"
    >
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <LayoutDashboard className="h-3 w-3" />
              Painel do Aluno
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Sua Jornada <span className="text-primary italic">P.A.D.H.</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Trilha: <span className="font-semibold text-foreground">{diagnosisLabel}</span>
              {!progress.diagnosisResult && (
                <Link to="/diagnostico" className="ml-2 text-primary hover:underline flex-inline items-center gap-1">
                  (Fazer diagnóstico agora <Sparkles className="h-3 w-3 inline" />)
                </Link>
              )}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <NotificationCenter />
            <Button asChild variant="outline" className="gap-2">
              <Link to="/recursos-clinicos"><Library className="h-4 w-4" /> Biblioteca</Link>
            </Button>
            <Button asChild className="gap-2">
              <Link to="/curso-padh"><PlayCircle className="h-4 w-4" /> Continuar</Link>
            </Button>
          </div>
        </div>

        {/* Export and Schedule Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/10 bg-primary/[0.02]">
              <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-heading font-bold mb-1">Exportar Evolução</h3>
                  <p className="text-sm text-muted-foreground">Gere um relatório detalhado da sua jornada P.A.D.H. em PDF.</p>
                </div>
                <ProgressReportExport />
              </CardContent>
            </Card>
            
            <ReviewSection />
            <ResponseHistory />
          </div>
          
          <div>
            <WeeklySchedule />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" /> Progresso Geral
              </CardDescription>
              <CardTitle className="text-3xl font-bold">{percentComplete}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={percentComplete} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">{completedCount} de {totalCount} módulos concluídos</p>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Próximo Módulo
              </CardDescription>
              <CardTitle className="text-xl font-bold truncate">
                {nextModule ? nextModule.titulo : "Tudo concluído!"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                {nextModule ? `Pilar ${nextModule.pilar}: ${nextModule.pilarNome}` : "Parabéns, você completou o curso!"}
              </p>
              {nextModule && (
                <Button variant="secondary" size="sm" className="w-full" onClick={() => navigate('/curso-padh')}>
                  Ir para o módulo
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Último Acesso
              </CardDescription>
              <CardTitle className="text-xl font-bold">
                {progress.lastAccessedModule ? MODULOS.find(m => m.id === progress.lastAccessedModule)?.titulo : "Hoje"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">Continue de onde você parou para manter o ritmo.</p>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/curso-padh')}>
                Retomar aula
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/10 bg-primary/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-primary" /> Jornada Terapêutica
              </CardDescription>
              <CardTitle className="text-xl font-bold">
                {JORNADA_DATA.find(f => f.id === jornada.currentPhaseId)?.titulo || "Não iniciada"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                {jornada.completedExercises.length} exercícios realizados na sua jornada de transformação.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate('/diagnostico-jornada')}>
                  Refazer Diagnóstico
                </Button>
                <Button size="sm" className="flex-1 gap-2 shadow-glow" onClick={() => navigate('/jornada')}>
                  Continuar de onde parei <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Trilha de Aprendizado
          </h2>
          <div className="space-y-4">
            {MODULOS.map((modulo, index) => {
              const isCompleted = progress.completedModules.includes(modulo.id);
              const isUnlocked = isModuleUnlocked(index);
              const activitiesCount = progress.completedActivities[modulo.id]?.length || 0;
              const totalActivities = modulo.atividades.length;
              const modulePercent = Math.round((activitiesCount / totalActivities) * 100);
              
              return (
                <div 
                  key={modulo.id}
                  className={`flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-6 rounded-2xl border transition-all ${
                    isCompleted 
                      ? 'bg-primary/5 border-primary/20' 
                      : isUnlocked 
                        ? 'bg-card border-border hover:border-primary/40' 
                        : 'bg-muted/50 border-border opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      isCompleted ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold truncate ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {modulo.titulo}
                        </h3>
                        {!isUnlocked && <Lock className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Pilar {modulo.pilar} · {modulo.pilarNome}</p>
                        {isUnlocked && !isCompleted && (
                          <p className="text-[10px] text-primary font-bold">{activitiesCount} de {totalActivities} etapas concluídas</p>
                        )}
                      </div>
                      {isUnlocked && !isCompleted && (
                        <Progress value={modulePercent} className="h-1 mt-2 max-w-[200px]" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-4 md:mt-0">
                    {isUnlocked ? (
                      <Button variant={isCompleted ? "ghost" : "outline"} size="sm" asChild className="w-full md:w-auto">
                        <Link to="/curso-padh">
                          {isCompleted ? "Revisar" : "Continuar"}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground px-3 py-1 bg-muted rounded-full w-full md:w-auto text-center">
                        Bloqueado
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
