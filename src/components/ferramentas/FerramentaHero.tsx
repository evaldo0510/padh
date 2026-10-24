import React from "react";
import type { LucideIcon } from "lucide-react";

interface FerramentaHeroProps {
  /** Ícone exibido no badge */
  icon: LucideIcon;
  /** Texto do badge (ex: "Ferramenta 1 — P.A.D.H.") */
  badgeLabel: React.ReactNode;
  /** Título principal (h1) — aceita ReactNode para permitir <span> destacado */
  title: React.ReactNode;
  /** Subtítulo em destaque logo abaixo do título */
  subtitle: string;
  /** Descrição longa da ferramenta */
  description: React.ReactNode;
  /** Imagem opcional da ferramenta */
  image?: { src: string; alt: string };
  /** Bloco de poema/citação opcional */
  poem?: React.ReactNode;
  /** Aplica itálico no bloco de poema */
  poemItalic?: boolean;
}

/**
 * Hero compartilhado das páginas de ferramentas P.A.D.H.
 * Centraliza a estrutura visual repetida entre `src/pages/ferramentas/*`.
 * Não altera comportamento, rotas ou SEO — apenas dedup layout.
 */
const FerramentaHero: React.FC<FerramentaHeroProps> = ({
  icon: Icon,
  badgeLabel,
  title,
  subtitle,
  description,
  image,
  poem,
  poemItalic = false,
}) => {
  const imageWrapperClass = poem
    ? "mx-auto w-full max-w-md mt-6 mb-4"
    : "mx-auto w-full max-w-md mt-6";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-glow" />
      <div className="relative container mx-auto px-6 py-20 text-center">
        <div className="animate-fade-in-up max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Icon className="w-6 h-6" aria-hidden="true" />
            {badgeLabel}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-2 font-medium">
            {subtitle}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
          {image && (
            <div className={imageWrapperClass}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-xl shadow-lg opacity-80"
              />
            </div>
          )}
          {poem && (
            <div className="poem-block max-w-sm mx-auto mt-4">
              <p
                className={`poem-text text-foreground/80${poemItalic ? " italic" : ""}`}
              >
                {poem}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FerramentaHero;
