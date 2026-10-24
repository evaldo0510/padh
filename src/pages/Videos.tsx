import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, BookOpen, GraduationCap, LockKeyhole, Video } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tracks = [
  { title: 'Fundamentos da PCH', description: 'Aulas introdutórias sobre conceitos, linguagem e uso responsável da metodologia.', icon: BookOpen },
  { title: 'Demonstrações das ferramentas', description: 'Vídeos demonstrativos para acompanhar a aplicação das ferramentas passo a passo.', icon: PlayCircle },
  { title: 'Formação por módulos', description: 'Aulas organizadas por módulo, com materiais de apoio e espaço para ampliar a trilha.', icon: GraduationCap },
];

const Videos = () => (
  <PageLayout seo={{ title: 'Aulas e vídeos — P.A.D.H.', description: 'Área de membros para aulas em vídeo, trilhas de estudo e materiais complementares da PCH.', path: '/videos' }} currentPage='Aulas e vídeos' parentPage={{ name: 'Dashboard', path: '/dashboard' }}>
    <section className='py-10 md:py-16'><div className='container mx-auto max-w-6xl px-6'>
      <div className='mb-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-7 md:p-10'>
        <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-semibold text-primary'><Video className='h-4 w-4' /> ÁREA DE MEMBROS</div>
        <h1 className='mb-4 text-3xl font-bold md:text-5xl'>Aprenda no seu ritmo, aula por aula.</h1>
        <p className='max-w-2xl leading-relaxed text-muted-foreground'>Este espaço reúne a estrutura para aulas gravadas, demonstrações práticas, trilhas por módulo e materiais complementares. Os vídeos serão disponibilizados aqui conforme forem adicionados ao catálogo.</p>
        <div className='mt-6 flex flex-wrap gap-3'><Button asChild><Link to='/formacao'>Explorar a formação</Link></Button><Button asChild variant='outline'><Link to='/curso-padh'>Abrir guia de estudo</Link></Button></div>
      </div>
      <h2 className='mb-2 text-2xl font-bold'>Trilhas de vídeo</h2><p className='mb-6 text-sm text-muted-foreground'>A estrutura está preparada para receber links ou arquivos de vídeo e aulas por módulo. Nenhum vídeo é apresentado como publicado até que seja cadastrado.</p>
      <div className='grid gap-5 md:grid-cols-3'>{tracks.map((track) => { const Icon = track.icon; return <Card key={track.title} className='h-full border-border/70'><CardHeader><div className='mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary'><Icon className='h-5 w-5' /></div><CardTitle>{track.title}</CardTitle><CardDescription>{track.description}</CardDescription></CardHeader><CardContent><div className='mb-4 flex items-center gap-2 text-xs text-muted-foreground'><LockKeyhole className='h-3.5 w-3.5' /> Estrutura pronta para receber vídeos</div><div className='flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground'><PlayCircle className='h-8 w-8 opacity-60' /><span className='text-xs'>Vídeos serão adicionados aqui</span></div></CardContent></Card>; })}</div>
      <p className='mt-8 rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground'>Esta etapa cria a área e a navegação. Para publicar aulas reais, será necessário cadastrar os links ou arquivos dos vídeos e definir se cada aula é acessível a todos os membros ou a uma turma específica.</p>
    </div></section>
  </PageLayout>
);
export default Videos;
