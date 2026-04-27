import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useJornada } from '@/hooks/useJornada';
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
  Compass,
  PlayCircle,
  RefreshCw,
  Database,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const JornadaHome = () => {
  const navigate = useNavigate();
  const { jornada, isSyncing, hasConfig } = useJornada();

  // Logic to find next available session
  const findNextSession = () => {
    for (const fase of JORNADA_DATA) {
      for (const sessao of fase.sessoes) {
        if (!jornada.completedSessions.includes(sessao.id)) {
          return { faseId: fase.id, sessaoId: sessao.id, titulo: sessao.titulo };
        }
      }
    }
    return null;
  };

  const nextSession = findNextSession();
  const completedSessionsCount = jornada.completedSessions.length;
  const totalSessionsCount = JORNADA_DATA.reduce((acc, f) => acc + f.sessoes.length, 0);
  const totalProgress = Math.round((completedSessionsCount / totalSessionsCount) * 100);

  const completedSessionsData = JORNADA_DATA.flatMap(f => 
    f.sessoes.filter(s => jornada.completedSessions.includes(s.id)).map(s => ({ ...s, faseId: f.id }))
  );

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
        {/* DB Sync Status */}
        {!hasConfig && (
          <Alert variant="destructive" className="mb-8 border-amber-500/50 bg-amber-500/5 text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Modo Offline</AlertTitle>
            <AlertDescription className="text-xs">
              Conecte o Supabase para sincronizar seu progresso entre dispositivos. Seu progresso atual está salvo localmente.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Compass className="h-3 w-3" />
              Treinamento Terapêutico
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Jornada de <span className="text-primary italic">Transformação</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/biblioteca-exercicios"><Library className="h-4 w-4" /> Biblioteca</Link>
            </Button>
            {isSyncing && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
                <Database className="h-3 w-3" /> Sincronizando...
              </div>
            )}
          </div>
        </div>

        {/* Smart Hero Section */}
        <Card className="mb-12 border-primary/20 bg-primary/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-32 h-32" />
          </div>
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  {nextSession ? 'Continuar de onde parou' : 'Jornada Concluída!'}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {nextSession 
                    ? `Sua próxima etapa é a sessão "${nextSession.titulo}". Mantenha o ritmo para aprofundar seu processo.` 
                    : 'Você completou todas as etapas da jornada. Sinta-se à vontade para revisar qualquer sessão na área abaixo.'}
                </p>
                {nextSession && (
                  <Button size="lg" onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)} className="gap-3 shadow-glow group">
                    <PlayCircle className="h-5 w-5" /> 
                    Iniciar {nextSession.titulo}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-primary">Progresso Geral da Jornada</span>
                  <span className="text-2xl font-black">{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-3" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  {completedSessionsCount} de {totalSessionsCount} sessões finalizadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Map */}
        <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          Mapa da Jornada
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {JORNADA_DATA.map((fase, idx) => {
            const isFirst = idx === 0;
            const prevFase = JORNADA_DATA[idx - 1];
            // Unlocked if first or all sessions in previous fase are completed
            const prevFaseDone = prevFase ? prevFase.sessoes.every(s => jornada.completedSessions.includes(s.id)) : true;
            const isUnlocked = isFirst || prevFaseDone;
            
            const faseSessions = fase.sessoes;
            const faseCompleted = faseSessions.filter(s => jornada.completedSessions.includes(s.id)).length;
            const fasePercent = Math.round((faseCompleted / faseSessions.length) * 100);

            return (
              <Card 
                key={fase.id} 
                className={`relative overflow-hidden transition-all duration-300 border-primary/10 ${
                  isUnlocked ? 'hover:border-primary/40' : 'opacity-70'
                }`}
              >
                <div className={`h-1.5 w-full bg-${fase.cor}-500`} />
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fase {fase.numero}</span>
                    {isUnlocked ? <CheckCircle2 className={`h-4 w-4 ${fasePercent === 100 ? 'text-primary' : 'text-primary/20'}`} /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <CardTitle className="font-heading text-lg">{fase.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={fasePercent} className="h-1" />
                    <Button 
                      variant={isUnlocked ? "ghost" : "ghost"} 
                      size="sm" 
                      className="w-full gap-2 text-xs"
                      disabled={!isUnlocked}
                      onClick={() => {
                        const firstIncomplete = fase.sessoes.find(s => !jornada.completedSessions.includes(s.id)) || fase.sessoes[0];
                        navigate(`/jornada/${fase.id}/${firstIncomplete.id}`);
                      }}
                    >
                      {isUnlocked ? (fasePercent === 100 ? 'Revisar' : 'Continuar') : 'Bloqueado'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Review Section */}
        {completedSessionsCount > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Área de Revisão
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedSessionsData.map((sessao) => (
                <div 
                  key={sessao.id}
                  className="p-5 rounded-xl border border-primary/5 bg-card hover:bg-primary/[0.02] transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-sm truncate group-hover:text-primary transition-colors">
                      {sessao.titulo}
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase">Fase {sessao.id.split('-')[1]}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => navigate(`/jornada/${sessao.faseId}/${sessao.id}`)}>
                    <RefreshCw className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
};

export default JornadaHome;
