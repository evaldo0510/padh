import React from 'react';
import { BookOpen, Mail, Instagram, Youtube, Heart, Feather } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PrefetchLink from './PrefetchLink';

const Footer = () => {
  const footerAnim = useScrollAnimation(0.1);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Livro-Curso', path: '/livro-curso' },
    { name: 'Formação PCH', path: '/formacao' },
    { name: 'Ferramentas P.A.D.H.', path: '/ferramentas' },
  ];

  const toolLinks = [
    { name: 'Mapa Cerebral', path: '/mapa-cerebral' },
    { name: 'Aula Exclusiva', path: '/aula-exclusiva' },
    { name: 'Contato', path: '/contato' },
  ];

  const socials = [
    { icon: <Instagram className="h-4 w-4" />, label: 'Instagram', href: '#' },
    { icon: <Youtube className="h-4 w-4" />, label: 'YouTube', href: '#' },
    { icon: <Mail className="h-4 w-4" />, label: 'E-mail', href: 'mailto:contato@padh.com.br' },
  ];

  return (
    <footer className="border-t border-border/30 mt-12">
      <div
        ref={footerAnim.ref}
        className={`container mx-auto px-6 py-16 transition-all duration-1000 ${
          footerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Main grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <span className="font-heading font-bold text-foreground text-lg tracking-wide">P.A.D.H.</span>
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

            {/* Contact / Creator */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">Criador</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Evaldo PCH Master</strong> — especialista em Poesia Cognitiva Hipnótica, integrando poesia, psicologia e neurociência.
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

          {/* Bottom */}
          <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} P.A.D.H. — Evaldo PCH Master. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Feito com <Heart className="h-3 w-3 text-spiritual-rose" /> e poesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
