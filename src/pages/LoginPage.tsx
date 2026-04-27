import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Feather, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabaseConfig } from '@/integrations/supabase/client';
import { ShieldAlert } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating login for demo purposes
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Bem-vindo de volta!", {
        description: "Você acessou sua conta com sucesso."
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <PageLayout
      seo={{
        title: 'Login — P.A.D.H.',
        description: 'Acesse sua área exclusiva de treinamento terapêutico.',
        path: '/login',
      }}
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
              <CardTitle>Entrar</CardTitle>
              <CardDescription>Use seu e-mail e senha cadastrados.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
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
                  <div className="flex justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <button type="button" className="text-xs text-primary hover:underline">Esqueceu a senha?</button>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full py-6 gap-2" disabled={isLoading}>
                  {isLoading ? 'Acessando...' : 'Entrar na Plataforma'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-primary/5 text-center">
                <p className="text-sm text-muted-foreground">
                  Ainda não tem uma conta?{' '}
                  <Link to="/formacao" className="text-primary font-bold hover:underline">
                    Conhecer Formação
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 flex justify-center">
            <p className="text-[10px] text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              Sua jornada poética começa aqui.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
