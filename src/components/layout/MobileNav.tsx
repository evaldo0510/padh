import React, { useMemo } from 'react';
import { Home, BookOpen, User, Play } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PrefetchLink from './PrefetchLink';
import { motion } from 'framer-motion';
import { useJornada } from '@/hooks/useJornada';

const MobileNav = () => {
  const location = useLocation();
  const { nextSession } = useJornada();
  
  const navItems = useMemo(() => {
    const continuePath = nextSession 
      ? `/jornada/${nextSession.phaseId}/${nextSession.sessionId}` 
      : '/jornada';

    return [
      { 
        name: 'Início', 
        path: '/', 
        icon: <Home className="w-5 h-5" />,
        activeIcon: <Home className="w-5 h-5 fill-primary" />
      },
      { 
        name: nextSession ? 'Continuar' : 'Jornada', 
        path: continuePath, 
        icon: nextSession ? <Play className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />,
        activeIcon: nextSession ? <Play className="w-5 h-5 fill-primary" /> : <BookOpen className="w-5 h-5 fill-primary" />,
        // Custom isActive for session routes
        match: (pathname: string) => pathname.startsWith('/jornada')
      },
      { 
        name: 'Área', 
        path: '/dashboard', 
        icon: <User className="w-5 h-5" />,
        activeIcon: <User className="w-5 h-5 fill-primary" />
      },
    ];
  }, [nextSession]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto relative z-10">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <div key={item.path} className="flex-1 h-full">
              <PrefetchLink
                to={item.path}
                className={`relative flex flex-col items-center justify-center gap-1 h-full transition-all duration-300 ${
                  active ? 'text-primary' : 'text-white/40'
                }`}
              >
                <div className={`transition-all duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
                  {active ? item.activeIcon : item.icon}
                </div>
                <span className={`text-[8px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}>
                  {item.name}
                </span>
                {active && (
                  <motion.span 
                    layoutId="active-tab-dot"
                    className="absolute bottom-2 w-1 h-1 rounded-full bg-primary shadow-glow shadow-primary/40" 
                  />
                )}
              </PrefetchLink>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;