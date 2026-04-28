import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Feather, Sparkles, ArrowRight, LogIn } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/dashboard';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(from, { replace: true });
    });
  }, [navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + from,
            data: { name },
          },
        });
        if (error) throw error;
        toast.success('Conta criada!', { description: 'Bem-vindo à plataforma.' });
        navigate(from, { replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Bem-vindo de volta!');
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      toast.error(mode === 'signup' ? 'Erro ao criar conta' : 'Erro ao entrar', {
        description: error.message || 'Verifique seus dados.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin + from,
      });
      if (result.error) throw result.error;
      if (result.redirected) return; // browser will redirect
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error('Erro com Google', { description: error.message || 'Tente novamente.' });
      setIsGoogleLoading(false);
    }
  };

  return (
    <PageLayout
      seo={{ title: 'Login — P.A.D.H.', description: 'Acesse sua área exclusiva.', path: '/login' }}
      currentPage="Acesso"
    >
      <div className="container mx-auto px-6 py-20 flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Feather className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold">Portal do Aluno</h1>
            <p className="text-muted-foreground mt-2">Continue sua jornada de transformação.</p>
          </div>

          <Card className="border-primary/10 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="spiritual-icon spiritual-icon-lg" />
                {mode === 'signup' ? 'Criar conta' : 'Entrar'}
              </CardTitle>
              <CardDescription>
                {mode === 'signup'
                  ? 'Crie sua conta gratuita para começar.'
                  : 'Acesse com seu e-mail ou Google.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 mb-4"
                onClick={handleGoogle}
                disabled={isGoogleLoading || isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {isGoogleLoading ? 'Conectando...' : 'Continuar com Google'}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou com e-mail</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full py-6 gap-2" disabled={isLoading || isGoogleLoading}>
                  {isLoading ? 'Acessando...' : mode === 'signup' ? 'Criar conta' : 'Entrar na Plataforma'}
                  {!isLoading && <ArrowRight className="spiritual-icon" />}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-primary/5 text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {mode === 'signin' ? (
                    <>Ainda não tem conta? <span className="text-primary font-bold">Criar agora</span></>
                  ) : (
                    <>Já tem conta? <span className="text-primary font-bold">Entrar</span></>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <p className="text-[10px] text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Sua jornada poética começa aqui.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
