import React from 'react';
import { Home, Compass, BookOpen, User, Search, Feather } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PrefetchLink from './PrefetchLink';

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Início', 
      path: '/', 
      icon: <Home className="w-5 h-5" />,
      activeIcon: <Home className="w-5 h-5 fill-primary" />
    },
    { 
      name: 'Explorar', 
      path: '/explorar', 
      icon: <Compass className="w-5 h-5" />,
      activeIcon: <Compass className="w-5 h-5 fill-primary" />
    },
    { 
      name: 'Jornada', 
      path: '/jornada', 
      icon: <BookOpen className="w-5 h-5" />,
      activeIcon: <BookOpen className="w-5 h-5 fill-primary" />
    },
    { 
      name: 'Ferramentas', 
      path: '/ferramentas', 
      icon: <Feather className="w-5 h-5" />,
      activeIcon: <Feather className="w-5 h-5 fill-primary" />
    },
    { 
      name: 'Área', 
      path: '/dashboard', 
      icon: <User className="w-5 h-5" />,
      activeIcon: <User className="w-5 h-5 fill-primary" />
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <PrefetchLink
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className={`transition-all duration-300 ${active ? 'scale-110 -translate-y-1' : 'scale-100'}`}>
                {active ? item.activeIcon : item.icon}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}>
                {item.name}
              </span>
              {active && (
                <motion.span 
                  layoutId="active-tab-dot"
                  className="absolute bottom-2 w-1 h-1 rounded-full bg-primary shadow-glow shadow-primary/40" 
                />
              )}
            </PrefetchLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;