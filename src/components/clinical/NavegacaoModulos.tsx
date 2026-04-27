import React, { useEffect, useState } from 'react';
import { MODULOS } from '@/lib/dados-clinicos';
import { ChevronUp, ChevronDown, List } from 'lucide-react';

/**
 * Navegação flutuante por módulo:
 *  - Mobile: barra horizontal recolhível no topo
 *  - Desktop: rail vertical fixo à esquerda
 *  - Cada item respeita a cor única do módulo (data-module)
 *  - IntersectionObserver destaca o módulo atualmente visível
 */
const NavegacaoModulos: React.FC = () => {
  const [active, setActive] = useState<string>('modulo-1');
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    MODULOS.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Abre o accordion se estiver fechado
    const trigger = el.querySelector<HTMLButtonElement>('[data-state="closed"] button, button[data-state="closed"]');
    trigger?.click();
    setOpenMobile(false);
  };

  const activeIdx = Math.max(0, MODULOS.findIndex((m) => m.id === active));
  const progress = ((activeIdx + 1) / MODULOS.length) * 100;

  return (
    <>
      {/* ─── Desktop: rail vertical fixo ─── */}
      <nav
        aria-label="Navegação entre módulos do P.A.D.H."
        className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 print:hidden"
      >
        <ul className="flex flex-col gap-2 p-2 rounded-2xl glass-morphism shadow-medium">
          {MODULOS.map((m) => {
            const isActive = active === m.id;
            return (
              <li key={m.id} data-module={m.numero} className="module-themed">
                <button
                  type="button"
                  onClick={() => goTo(m.id)}
                  aria-label={`Ir para Módulo ${m.numero} — ${m.titulo} (${m.corNome})`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-module focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive
                      ? 'bg-module-soft pr-4 pl-2 py-2 shadow-module-glow'
                      : 'hover:bg-module-tint p-2'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`shrink-0 rounded-lg flex items-center justify-center font-heading font-bold transition-all ${
                      isActive
                        ? 'w-9 h-9 bg-module text-background ring-2 ring-module/40'
                        : 'w-8 h-8 bg-module/15 text-module border border-module/40 group-hover:bg-module/25'
                    }`}
                  >
                    {m.numero}
                  </span>
                  <span
                    className={`text-xs font-medium whitespace-nowrap overflow-hidden transition-all ${
                      isActive
                        ? 'max-w-[180px] opacity-100 text-foreground'
                        : 'max-w-0 opacity-0 group-hover:max-w-[180px] group-hover:opacity-100 text-muted-foreground'
                    }`}
                  >
                    <span className="block leading-tight">Pilar {m.pilar}</span>
                    <span className="block text-[10px] text-module">{m.corNome}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ─── Mobile/tablet: barra de progresso flutuante ─── */}
      <div className="lg:hidden fixed bottom-4 inset-x-4 z-30 print:hidden">
        <div className="rounded-2xl glass-morphism shadow-strong overflow-hidden">
          {/* Barra resumida sempre visível */}
          <button
            type="button"
            onClick={() => setOpenMobile((v) => !v)}
            aria-expanded={openMobile}
            aria-controls="nav-modulos-grid"
            className="w-full flex items-center gap-3 px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <List className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <div className="flex-1 text-left min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                Módulo {activeIdx + 1} / {MODULOS.length}
              </p>
              <p className="text-xs text-foreground truncate font-medium">
                {MODULOS[activeIdx]?.titulo}
              </p>
            </div>
            {openMobile ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            ) : (
              <ChevronUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            )}
          </button>

          {/* Barra de progresso */}
          <div
            className="h-1 bg-border/40"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso pelos módulos"
          >
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Grid expansível com cores únicas */}
          {openMobile && (
            <ul
              id="nav-modulos-grid"
              className="grid grid-cols-4 gap-2 p-3 border-t border-border/30 animate-fade-in-up"
            >
              {MODULOS.map((m) => {
                const isActive = active === m.id;
                return (
                  <li key={m.id} data-module={m.numero} className="module-themed">
                    <button
                      type="button"
                      onClick={() => goTo(m.id)}
                      aria-label={`Ir para Módulo ${m.numero}: ${m.corNome}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-module focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        isActive
                          ? 'bg-module text-background border-module shadow-module-glow scale-105'
                          : 'bg-module-tint text-module border-module/30 hover:border-module'
                      }`}
                    >
                      <span className="font-heading font-bold text-base leading-none">
                        {m.numero}
                      </span>
                      <span className="text-[9px] font-semibold uppercase tracking-wider opacity-80">
                        {m.pilar}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default NavegacaoModulos;
