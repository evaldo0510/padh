import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import PrefetchLink from './PrefetchLink';
import logoPadh from '@/assets/logo-padh.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Livro-Curso', path: '/livro-curso' },
    { name: 'Formação PCH', path: '/formacao' },
    { name: 'Curso PCH', path: '/curso-pch' },
    { name: 'Ferramentas', path: '/ferramentas', hasDropdown: true },
    { name: 'Ciência', path: '/ciencia-da-poesia' },
    { name: 'Mapa Cerebral', path: '/mapa-cerebral' },
    { name: 'Aula Exclusiva', path: '/aula-exclusiva' },
    { name: 'Contato', path: '/contato' }
  ];

  const toolLinks = [
    { name: '1. Poema-Funil', path: '/ferramentas/poema-funil' },
    { name: '2. Verso-Gatilho', path: '/ferramentas/verso-gatilho' },
    { name: '3. Poemadiagnóstico', path: '/ferramentas/poemadiagnostico' },
    { name: '4. Caderno de Voz Interna', path: '/ferramentas/caderno-voz-interna' },
    { name: '5. Encenação Poética', path: '/ferramentas/encenacao-poetica' },
    { name: '6. Reescrita Poética', path: '/ferramentas/reescrita-poetica' },
    { name: '7. Ritual do Silêncio', path: '/ferramentas/ritual-silencio' },
    { name: '8. Poesia Hipnótica', path: '/ferramentas/poesia-hipnotica' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isToolsActive = location.pathname.startsWith('/ferramentas');

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-primary/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <PrefetchLink to="/" className="flex items-center gap-2.5 group">
            <img src={logoPadh} alt="P.A.D.H. Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="text-lg font-heading font-bold text-foreground leading-none tracking-wide">
                P.A.D.H.
              </span>
              <span className="text-[10px] text-muted-foreground leading-none tracking-widest uppercase">
                Evaldo PCH Master
              </span>
            </div>
          </PrefetchLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <nav className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <div key={item.path} className="relative" 
                  onMouseEnter={() => item.hasDropdown && setIsToolsOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsToolsOpen(false)}
                >
                  <PrefetchLink
                    to={item.path}
                    className={`relative px-3 py-1.5 text-sm transition-all duration-300 rounded-md inline-flex items-center gap-1 ${
                      (item.hasDropdown ? isToolsActive : isActive(item.path))
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="h-3 w-3" />}
                    {(item.hasDropdown ? isToolsActive : isActive(item.path)) && (
                      <span className="absolute bottom-0 left-3 right-3 h-px bg-primary" />
                    )}
                  </PrefetchLink>

                  {/* Dropdown */}
                  {item.hasDropdown && isToolsOpen && (
                    <div className="absolute top-full left-0 pt-1 z-50">
                      <div className="bg-card border border-border/50 rounded-lg shadow-lg py-2 min-w-[220px]">
                        <PrefetchLink
                          to="/ferramentas"
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors font-medium"
                        >
                          Todas as Ferramentas
                        </PrefetchLink>
                        <div className="h-px bg-border/30 my-1" />
                        {toolLinks.map((tool) => (
                          <PrefetchLink
                            key={tool.path}
                            to={tool.path}
                            className={`block px-4 py-1.5 text-sm transition-colors ${
                              isActive(tool.path)
                                ? 'text-primary bg-primary/5'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                          >
                            {tool.name}
                          </PrefetchLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="ml-3 pl-3 border-l border-border/50">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-8 w-8 p-0"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/30 py-3 animate-fade-in-up max-h-[70vh] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <React.Fragment key={item.path}>
                  <PrefetchLink
                    to={item.path}
                    className={`text-sm py-2 px-3 rounded-md transition-colors ${
                      (item.hasDropdown ? isToolsActive : isActive(item.path))
                        ? 'text-primary bg-primary/5 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                  >
                    {item.name}
                  </PrefetchLink>
                  {item.hasDropdown && (
                    <div className="pl-4 space-y-0.5">
                      {toolLinks.map((tool) => (
                        <PrefetchLink
                          key={tool.path}
                          to={tool.path}
                          className={`block text-xs py-1.5 px-3 rounded-md transition-colors ${
                            isActive(tool.path)
                              ? 'text-primary bg-primary/5'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {tool.name}
                        </PrefetchLink>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
