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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border/50 pb-safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <PrefetchLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all duration-300 ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all duration-300 ${active ? 'bg-primary/10 scale-110' : ''}`}>
                {active ? item.activeIcon : item.icon}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${active ? 'opacity-100 translate-y-0' : 'opacity-70'}`}>
                {item.name}
              </span>
              {active && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </PrefetchLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;