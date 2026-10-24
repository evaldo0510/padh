import React, { useMemo, useState } from 'react';
import { Home, BookOpen, User, Play, Menu as MenuIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PrefetchLink from './PrefetchLink';
import { motion } from 'framer-motion';
import { useJornada } from '@/hooks/useJornada';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { ChevronDown } from 'lucide-react';
import { NAV_SECTIONS } from '@/lib/navigation';

const MobileNav = () => {
  const location = useLocation();
  const { nextSession, continuePath } = useJornada();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(() => {
    return [
      {
        name: 'Início',
        path: '/',
        icon: <Home className="w-5 h-5" />,
        activeIcon: <Home className="w-5 h-5 fill-primary" />,
      },
      {
        name: 'Teoria',
        path: '/fundamentacao',
        icon: <BookOpen className="w-5 h-5" />,
        activeIcon: <BookOpen className="w-5 h-5 fill-primary" />,
      },
      {
        name: nextSession ? 'Continuar' : 'Jornada',
        path: continuePath,
        icon: <Play className="w-5 h-5" />,
        activeIcon: <Play className="w-5 h-5 fill-primary" />,
        match: (pathname: string) => pathname.startsWith('/jornada'),
      },
      {
        name: 'Área',
        path: '/dashboard',
        icon: <User className="w-5 h-5" />,
        activeIcon: <User className="w-5 h-5 fill-primary" />,
      },
    ];
  }, [nextSession, continuePath]);

  const isActive = (item: any) => {
    const currentPath = location.pathname;
    if (item.match) return item.match(currentPath);
    if (item.path === '/') return currentPath === '/';
    return currentPath === item.path || currentPath.startsWith(item.path + '/');
  };

  const isSectionActive = (section: (typeof NAV_SECTIONS)[number]) =>
    section.items.some(
      (it) => location.pathname === it.path || location.pathname.startsWith(it.path + '/'),
    );

  return (
    <>
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-50 bg-background/95 backdrop-blur-2xl border border-border rounded-[2rem] pb-safe shadow-2xl overflow-hidden active:scale-[0.98] transition-transform duration-200">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto relative z-10 px-2">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <div key={item.path} className="flex-1 h-full">
                <PrefetchLink
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex flex-col items-center justify-center gap-1.5 h-full transition-all duration-500 py-2 ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`transition-all duration-500 ${active ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
                    {active ? item.activeIcon : item.icon}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-500 ${active ? 'opacity-100' : 'opacity-100'}`}>
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
          {/* Menu completo */}
          <div className="flex-1 h-full">
            <Button variant="ghost"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu completo"
              className="relative flex flex-col items-center justify-center gap-1.5 h-full w-full transition-all duration-500 py-2 text-muted-foreground hover:text-foreground"
            >
              <MenuIcon className="w-5 h-5" />
              <span className="text-[9px] font-black uppercase tracking-[0.15em] opacity-100">
                Menu
              </span>
            </Button>
          </div>
        </div>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          className="w-[320px] sm:w-[380px] overflow-y-auto bg-background/95 backdrop-blur-2xl border-l border-border"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-left"><Logo size="sm" />Navegação</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-1">
            {NAV_SECTIONS.map((section) => {
              const Icon = section.icon;
              const active = isSectionActive(section);
              return (
                <Collapsible key={section.id} defaultOpen={active}>
                  <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-accent transition-colors">
                    <span className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-semibold ${active ? 'text-primary' : 'text-foreground'}`}>
                        {section.label}
                      </span>
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="ml-7 mt-1 mb-2 flex flex-col gap-0.5 border-l border-border pl-3">
                      {section.items.map((item) => {
                        const itemActive =
                          location.pathname === item.path ||
                          location.pathname.startsWith(item.path + '/');
                        return (
                          <li key={item.path}>
                            <PrefetchLink
                              to={item.path}
                              onClick={() => setMenuOpen(false)}
                              className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                                itemActive
                                  ? 'text-primary bg-primary/10 font-medium'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              }`}
                            >
                              {item.label}
                            </PrefetchLink>
                          </li>
                        );
                      })}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
