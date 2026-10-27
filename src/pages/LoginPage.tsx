import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/ui/Logo';
import {  BookOpenCheck, DoorOpen, KeyRound } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Keep auth callbacks on the canonical production domain, even when users open an old deployment.
const AUTH_CANONICAL_ORIGIN = 'https://padhpoesia.vercel.app';


const getSafeReturnPath = (value: unknown): string | null => {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\')
  ) {
    return null;
  }

  try {
    const target = new URL(value, window.location.origin);
    if (target.origin !== window.location.origin || target.pathname === '/login') {
      return null;
    }
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return null;
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>(() =>
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const requestedNext = getSafeReturnPath(searchParams.get('next'));
  const stateFrom = (location.state as { from?: unknown } | null)?.from;
  const from = requestedNext ?? getSafeReturnPath(stateFrom) ?? '/dashboard';

  useEffect(() => {
    const requestedMode = new URLSearchParams(location.search).get('mode');
    if (requestedMode === 'signup' || requestedMode === 'signin') {
      setMode(requestedMode);
    }
  }, [location.search]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(from, { replace: true });
    });
  }, [navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setConfirmationEmail('');
    setIsLoading(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: AUTH_CANONICAL_ORIGIN + from,
            data: { name },
          },
        });
        if (error) throw error;

        if (data.session) {
          toast.success('Conta criada!', { description: 'Seu estudo vai continuar de onde pediu.' });
          navigate(from, { replace: true });
        } else {
          setConfirmationEmail(email);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Bem-vindo de volta!');
        navigate(from, { replace: true });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Verifique seus dados e tente novamente.';
      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setFormError('');
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${AUTH_CANONICAL_ORIGIN}/login?next=${encodeURIComponent(from)}`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Não foi possível entrar com Google. Tente novamente.';
      setFormError(message);
      setIsGoogleLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((current) => current === 'signin' ? 'signup' : 'signin');
    setFormError('');
    setConfirmationEmail('');
  };

  return (
    <PageLayout
      seo={{ title: 'Acesso — P.A.D.H.', description: 'Crie sua conta ou entre para acessar os estudos PCH.', path: '/login' }}
      currentPage="Acesso"
      hideMobileNav
    >
      <div className="container mx-auto flex justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Logo size="lg" />
            </div>
            <h1 className="text-3xl font-heading font-bold">Acesse os estudos PCH</h1>
            <p className="mt-2 text-muted-foreground">Crie uma conta ou entre para continuar na página de estudo escolhida.</p>
          </div>

          <Card className="border-primary/10 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="spiritual-icon spiritual-icon-lg" aria-hidden="true" />
                {mode === 'signup' ? 'Criar conta' : 'Entrar'}
              </CardTitle>
              <CardDescription>
                {mode === 'signup'
                  ? 'A conta PADH é gratuita. Depois do cadastro, você seguirá para o conteúdo solicitado.'
                  : 'Acesse com seu e-mail ou Google para continuar seus estudos.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formError && (
                <p role="alert" aria-live="assertive" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {formError}
                </p>
              )}
              {confirmationEmail && (
                <p role="status" aria-live="polite" className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-relaxed text-foreground">
                  Cadastro iniciado para <strong>{confirmationEmail}</strong>. Confirme o e-mail, se solicitado pelo sistema, e depois entre novamente para continuar na página de estudo.
                </p>
              )}

              <Button
                type="button"
                variant="outline"
                className="mb-4 w-full gap-2"
                onClick={handleGoogle}
                disabled={isGoogleLoading || isLoading}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
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
                    <Input id="name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{mode === 'signup' ? 'Crie uma senha' : 'Senha'}</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    minLength={6}
                    aria-describedby={mode === 'signup' ? 'password-hint' : undefined}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {mode === 'signup' && <p id="password-hint" className="text-xs text-muted-foreground">Use pelo menos 6 caracteres.</p>}
                </div>
                <Button type="submit" className="w-full gap-2 py-6" disabled={isLoading || isGoogleLoading}>
                  {isLoading ? 'Aguarde...' : mode === 'signup' ? 'Criar conta e continuar' : 'Entrar e continuar'}
                  {!isLoading && <DoorOpen className="spiritual-icon" aria-hidden="true" />}
                </Button>
              </form>

              <div className="mt-6 border-t border-primary/5 pt-6 text-center">
                <Button variant="link"
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {mode === 'signin' ? (
                    <>Ainda não tem conta? <span className="font-bold text-primary">Criar agora</span></>
                  ) : (
                    <>Já tem conta? <span className="font-bold text-primary">Entrar</span></>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <p className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <BookOpenCheck className="h-3 w-3" aria-hidden="true" /> Sua trilha de estudos continua após o acesso.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
