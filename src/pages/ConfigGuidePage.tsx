import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy, ExternalLink, Info, Code } from 'lucide-react';
import { toast } from 'sonner';

const ConfigGuidePage = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

  const envExample = `VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`;

  return (
    <PageLayout
      seo={{
        title: 'Como Configurar o Supabase — P.A.D.H.',
        description: 'Guia passo a passo para configurar seu banco de dados Supabase.',
        path: '/configurar-supabase',
      }}
      currentPage="Ajuda"
    >
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Como Configurar o Supabase</h1>
          <p className="text-lg text-muted-foreground">Siga estes passos simples para ativar a sincronização em nuvem e persistência multi-dispositivo.</p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <section className="relative pl-10 border-l-2 border-primary/20">
            <div className="absolute left-[-17px] top-0 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
            <h2 className="text-2xl font-bold mb-4">Crie um projeto no Supabase</h2>
            <p className="text-muted-foreground mb-4">
              Acesse <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">supabase.com <ExternalLink className="h-3 w-3" /></a>, faça login e crie um novo projeto. É gratuito para começar.
            </p>
          </section>

          {/* Step 2 */}
          <section className="relative pl-10 border-l-2 border-primary/20">
            <div className="absolute left-[-17px] top-0 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
            <h2 className="text-2xl font-bold mb-4">Obtenha suas credenciais</h2>
            <p className="text-muted-foreground mb-4">
              No painel do seu projeto Supabase, vá em <strong>Project Settings</strong> {'>'} <strong>API</strong>. Você precisará de dois valores:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Project URL</span>
                  <p className="text-sm text-muted-foreground">O endereço base do seu banco de dados.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Anon Public Key</span>
                  <p className="text-sm text-muted-foreground">A chave pública para acesso via cliente.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Step 3 */}
          <section className="relative pl-10 border-l-2 border-primary/20">
            <div className="absolute left-[-17px] top-0 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
            <h2 className="text-2xl font-bold mb-4">Configure no Lovable</h2>
            <p className="text-muted-foreground mb-4">
              Abra a aba <strong>Settings</strong> no Lovable e adicione estas duas variáveis de ambiente:
            </p>
            
            <Card className="bg-slate-950 text-slate-50 border-slate-800 overflow-hidden mb-6">
              <CardHeader className="py-3 px-4 border-b border-slate-800 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-mono flex items-center gap-2">
                  <Code className="h-3 w-3" /> Exemplo .env
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800" onClick={() => copyToClipboard(envExample)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap">
                  {envExample}
                </pre>
              </CardContent>
            </Card>

            <Alert className="bg-blue-50/50 border-blue-100 dark:bg-blue-950/10 dark:border-blue-900">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                Dica: Após adicionar as variáveis, o Lovable pode levar alguns segundos para reiniciar o ambiente de desenvolvimento.
              </AlertDescription>
            </Alert>
          </section>

          {/* Step 4 */}
          <section className="relative pl-10">
            <div className="absolute left-[-17px] top-0 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
            <h2 className="text-2xl font-bold mb-4">Execute as Migrações SQL</h2>
            <p className="text-muted-foreground mb-4">
              Para que o progresso seja salvo corretamente, você precisa criar as tabelas no seu banco de dados Supabase. Vá em <strong>SQL Editor</strong> e execute:
            </p>
            
            <Card className="bg-slate-950 text-slate-50 border-slate-800 overflow-hidden">
              <CardContent className="p-4">
                <pre className="text-[10px] font-mono leading-tight whitespace-pre-wrap text-emerald-400">
{`create table user_progress (
  user_id uuid references auth.users not null primary key,
  progress_data jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table course_progress (
  user_id uuid references auth.users not null primary key,
  progress_data jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar RLS
alter table user_progress enable row level security;
alter table course_progress enable row level security;

-- Políticas de acesso
create policy "Users can view own progress" on user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on user_progress for update using (auth.uid() = user_id);`}
                </pre>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t flex justify-center">
          <Button size="lg" onClick={() => window.history.back()} className="rounded-full px-8">
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ConfigGuidePage;
