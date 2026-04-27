import React from 'react';
import { Mail, Instagram, Youtube, Heart, Feather } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PrefetchLink from './PrefetchLink';
import Logo from '@/components/ui/Logo';

const Footer = () => {
...
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4 group">
                <Logo />
                <span className="font-heading font-bold text-foreground text-lg tracking-wide group-hover:text-primary transition-colors">P.A.D.H.</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Poesia Aplicada ao Desenvolvimento Humano — neurociência, hipnose e linguagem simbólica a serviço da transformação interior.
              </p>
              {/* Socials */}
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">Navegação</h4>
              <nav className="space-y-2.5">
                {navLinks.map((item) => (
                  <PrefetchLink
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </PrefetchLink>
                ))}
              </nav>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">Ferramentas</h4>
              <nav className="space-y-2.5">
                {toolLinks.map((item) => (
                  <PrefetchLink
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </PrefetchLink>
                ))}
              </nav>
            </div>

            {/* Resources / NAPT */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">Recursos</h4>
              <nav className="space-y-2.5">
                {resourceLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-border/10">
                <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">Criador</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Evaldo de Jesus Santana</strong> — especialista em Poesia Aplicada ao Desenvolvimento Humano.
                </p>
                <PrefetchLink
                  to="/sobre"
                  className="inline-flex items-center gap-1 text-sm text-primary/70 hover:text-primary mt-3 transition-colors"
                >
                  <Feather className="h-3.5 w-3.5" />
                  Conheça a história
                </PrefetchLink>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} P.A.D.H. — Evaldo de Jesus Santana. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground">
              Criado por <PrefetchLink to="/admin" className="text-foreground font-medium hover:text-foreground no-underline" style={{ textDecoration: 'none' }}>Evaldo de Jesus Santana</PrefetchLink>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
