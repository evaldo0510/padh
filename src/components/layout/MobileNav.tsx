import React, { useMemo } from 'react';
import { Home, BookOpen, User, Play } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PrefetchLink from './PrefetchLink';
import { motion } from 'framer-motion';
import { useJornada } from '@/hooks/useJornada';

const MobileNav = () => {
  const location = useLocation();
  const { nextSession, continuePath } = useJornada();
  
  const navItems = useMemo(() => {

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

  const isActive = (item: any) => {
    const currentPath = location.pathname;
    if (item.match) return item.match(currentPath);
    if (item.path === '/') return currentPath === '/';
    return currentPath === item.path || currentPath.startsWith(item.path + '/') || (item.path.startsWith('/jornada') && currentPath.startsWith('/jornada'));
  };

  return (
    <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-50 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-3xl pb-safe shadow-2xl overflow-hidden">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto relative z-10 px-4">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <div key={item.path} className="flex-1 h-full">
              <PrefetchLink
                to={item.path}
                className={`relative flex flex-col items-center justify-center gap-1.5 h-full transition-all duration-500 ${
                  active ? 'text-primary' : 'text-white/30'
                }`}
              >
                <div className={`transition-all duration-500 ${active ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
                  {active ? item.activeIcon : item.icon}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}>
                  {item.name}
                </span>
                
                {active && (
                  <motion.div 
                    layoutId="active-nav-glow"
                    className="absolute -top-1 w-12 h-1 bg-primary rounded-full shadow-glow" 
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