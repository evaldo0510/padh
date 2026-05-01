import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import PrefetchLink from './PrefetchLink';
import Logo from '@/components/ui/Logo';
import { supabase } from '@/integrations/supabase/client';
import { supabaseConfig } from '@/integrations/supabase/config';
import { useJornada } from '@/hooks/useJornada';
import { JORNADA_DATA } from '@/lib/jornada-data';
import { toast } from 'sonner';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { jornada } = useJornada();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const simulated = localStorage.getItem('padh_simulated_user');
      if (simulated) return setIsLoggedIn(true);
      if (supabaseConfig.isConfigured) {
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
      }
    };
    checkAuth();

    if (supabaseConfig.isConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
        setIsLoggedIn(!!session || !!localStorage.getItem('padh_simulated_user'));
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('padh_simulated_user');
    if (supabaseConfig.isConfigured) await supabase.auth.signOut();
    setIsLoggedIn(false);
    toast.success('Sessão encerrada.');
    navigate('/');
  };

  // Compute journey progress (day + percentage)
  const { dayLabel, percent, continueHref } = useMemo(() => {
    const allSessions = JORNADA_DATA.flatMap((f) => f.sessoes);
    const total = allSessions.length || 1;
    const done = jornada.completedSessions?.length || 0;
    const pct = Math.min(100, Math.round((done / total) * 100));
    const day = Math.min(total, done + 1);

    // Find next pending session for "Continuar"
    const nextSession = allSessions.find((s) => !jornada.completedSessions?.includes(s.id));
    const href = nextSession ? `/jornada/${nextSession.id}` : '/jornada';

    return { dayLabel: `Dia ${day}`, percent: pct, continueHref: href };
  }, [jornada.completedSessions]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/60'
          : 'bg-background/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-14 gap-3">
          {/* LEFT — Logo */}
          <PrefetchLink to="/" className="flex items-center gap-2 group shrink-0">
            <Logo size="sm" className="w-8 h-8" />
            <span className="hidden sm:inline text-base font-heading font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              PADH
            </span>
          </PrefetchLink>

          {/* CENTER — Primary action */}
          <div className="flex justify-center">
            {isLoggedIn ? (
              <Button
                size="sm"
                className="h-9 px-4 md:px-5 rounded-full font-medium gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                asChild
              >
                <Link to={continueHref}>
                  <span className="hidden xs:inline sm:inline">Continuar jornada</span>
                  <span className="xs:hidden sm:hidden">Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                className="h-9 px-5 rounded-full font-medium gap-2"
                asChild
              >
                <Link to="/jornada">
                  Começar jornada
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>

          {/* RIGHT — Progress + profile */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {isLoggedIn && (
              <div
                className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-full bg-muted/40 border border-border/40"
                aria-label={`Progresso: ${dayLabel}, ${percent} por cento`}
              >
                <span className="text-xs font-medium text-foreground tabular-nums">
                  {dayLabel}
                </span>
                <span className="w-px h-3 bg-border/60" />
                <div className="flex items-center gap-1.5">
                  <div className="w-12 h-1 rounded-full bg-border/60 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-primary tabular-nums">
                    {percent}%
                  </span>
                </div>
              </div>
            )}

            <ThemeToggle />

            {isLoggedIn ? (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 rounded-full bg-primary/10 hover:bg-primary/20"
                  asChild
                  aria-label="Minha área"
                >
                  <Link to="/dashboard">
                    <User className="w-4 h-4 text-primary" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex h-9 w-9 p-0 rounded-full text-muted-foreground hover:text-destructive"
                  onClick={handleLogout}
                  aria-label="Sair"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="ghost" className="h-9" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
