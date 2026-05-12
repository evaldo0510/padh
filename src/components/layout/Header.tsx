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
  const { jornada, nextSession } = useJornada();

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

    const href = nextSession 
      ? `/jornada/${nextSession.phaseId}/${nextSession.sessionId}` 
      : '/jornada';

    return { dayLabel: `Dia ${day}`, percent: pct, continueHref: href };
  }, [jornada.completedSessions, nextSession]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-white/5'
          : 'bg-background/40 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-14 gap-4">
          {/* LEFT — Logo */}
          <PrefetchLink to="/" className="flex items-center gap-2 group shrink-0">
            <Logo size="sm" className="w-8 h-8" />
            <span className="hidden sm:inline text-sm font-bold tracking-tight text-white/90 group-hover:text-primary transition-colors">
              P.A.D.H.
            </span>
          </PrefetchLink>

          {/* CENTER — Primary action */}
          <div className="flex justify-center">
            {isLoggedIn ? (
              <Button
                size="sm"
                className="h-9 px-5 rounded-full font-bold gap-2 bg-primary text-white hover:bg-primary/90 shadow-glow"
                asChild
              >
                <Link to={continueHref}>
                  <span className="hidden xs:inline">Continuar jornada</span>
                  <span className="xs:hidden">Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                className="h-9 px-6 rounded-full font-bold gap-2 shadow-glow"
                asChild
              >
                <Link to="/jornada">
                  Começar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>

          {/* RIGHT — Progress + profile */}
          <div className="flex items-center gap-2 shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div
                  className="hidden lg:flex items-center gap-3 px-4 h-9 rounded-full bg-white/5 border border-white/10"
                >
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    {dayLabel}
                  </span>
                  <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 rounded-full hover:bg-white/10 bg-white/5 border border-white/10"
                  asChild
                >
                  <Link to="/dashboard">
                    <User className="w-4 h-4 text-white/80" />
                  </Link>
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="ghost" className="h-9 px-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white" asChild>
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
