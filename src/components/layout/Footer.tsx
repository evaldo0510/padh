import React from 'react';
import { Mail, Instagram, Youtube, Heart, Feather } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PrefetchLink from './PrefetchLink';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  const footerAnim = useScrollAnimation(0.1);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Livro-Curso', path: '/livro-curso' },
    { name: 'Formação P.A.D.H.', path: '/formacao' },
    { name: 'Ferramentas P.A.D.H.', path: '/ferramentas' },
    { name: 'Mapa Cerebral', path: '/mapa-cerebral' },
    { name: 'Curso P.A.D.H.', path: '/curso-padh' },
    { name: 'Aula Exclusiva', path: '/aula-exclusiva' },
    { name: 'Ciência da Poesia', path: '/ciencia-da-poesia' },
    { name: 'Contato', path: '/contato' },
  ];

  const toolLinks = [
    { name: 'Poema-Funil', path: '/ferramentas/poema-funil' },
    { name: 'Verso-Gatilho', path: '/ferramentas/verso-gatilho' },
    { name: 'Poemadiagnóstico', path: '/ferramentas/poemadiagnostico' },
    { name: 'Caderno de Voz Interna', path: '/ferramentas/caderno-voz-interna' },
    { name: 'Encenação Poética', path: '/ferramentas/encenacao-poetica' },
    { name: 'Reescrita Poética', path: '/ferramentas/reescrita-poetica' },
    { name: 'Ritual do Silêncio', path: '/ferramentas/ritual-silencio' },
    { name: 'Poesia Hipnótica', path: '/ferramentas/poesia-hipnotica' },
  ];

  const resourceLinks = [
    { name: 'NAPT (Poetry Therapy)', href: 'https://poetrytherapy.org/', external: true },
    { name: 'Journal of Poetry Therapy', href: 'https://www.tandfonline.com/journals/tjpt20', external: true },
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
              <div className="flex items-center gap-3 mb-6 group transition-all duration-300">
                <Logo size="md" />
                <div className="flex flex-col justify-center">
                  <span className="font-heading font-black text-foreground text-xl tracking-tighter group-hover:text-primary transition-colors">P.A.D.H.</span>
                  <span className="text-[9px] text-primary/80 leading-none font-bold uppercase tracking-wider mt-1">Poesia Aplicada</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Poesia Aplicada ao Desenvolvimento Humano — neurociência, hipnose e linguagem simbólica a serviço da transformation interior.
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