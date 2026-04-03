import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface ToolSalesLandingProps {
  seo: { title?: string; description: string; path: string };
  icon: React.ReactNode;
  toolNumber: number;
  toolName: string;
  tagline: string;
  heroDescription: string;
  heroVerse: string;
  problemTitle: string;
  problems: string[];
  solutionTitle: string;
  solutionDescription: string;
  benefits: string[];
  howItWorks: { step: string; description: string }[];
  testimonials: Testimonial[];
  bonuses?: string[];
  price: string;
  originalPrice?: string;
  ctaText: string;
  ctaLink: string;
  guarantee?: string;
}

const ToolSalesLanding: React.FC<ToolSalesLandingProps> = ({
  seo,
  icon,
  toolNumber,
  toolName,
  tagline,
  heroDescription,
  heroVerse,
  problemTitle,
  problems,
  solutionTitle,
  solutionDescription,
  benefits,
  howItWorks,
  testimonials,
  bonuses,
  price,
  originalPrice,
  ctaText,
  ctaLink,
  guarantee = '7 dias de garantia incondicional',
}) => {
  const benefitsAnim = useScrollAnimation(0.1);
  const stepsAnim = useScrollAnimation(0.1);
  const testimonialsAnim = useScrollAnimation(0.1);

  const handleCTA = () => {
    window.open(ctaLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <PageLayout seo={seo} currentPage={toolName} showBackButton>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <span className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-widest uppercase">
              {icon}
              Ferramenta #{toolNumber} P.A.D.H.
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
              {toolName}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-display italic">
              {tagline}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {heroDescription}
            </p>
            <blockquote className="border-l-4 border-primary/50 pl-4 italic text-foreground/80 text-lg max-w-xl mx-auto">
              {heroVerse}
            </blockquote>
            <Button variant="premium" size="lg" onClick={handleCTA} className="text-lg px-10 py-6">
              {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-3xl font-bold text-foreground text-center">
              {problemTitle}
            </h2>
            <ul className="space-y-4">
              {problems.map((problem, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-destructive mt-1">✗</span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-primary">
              {solutionTitle}
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              {solutionDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-card/50" ref={benefitsAnim.ref}>
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            O que você vai conquistar
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={benefitsAnim.isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border/50"
              >
                <Check className="h-5 w-5 text-accent-foreground mt-0.5 shrink-0" style={{ color: 'hsl(var(--accent-sage))' }} />
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16" ref={stepsAnim.ref}>
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Como funciona
          </h2>
          <div className="space-y-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={stepsAnim.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{step.step}</h3>
                  <p className="text-muted-foreground mt-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-card/50" ref={testimonialsAnim.ref}>
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            O que dizem sobre esta ferramenta
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsAnim.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="bg-background/50 border-border/50 h-full">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic text-sm">"{t.text}"</p>
                    <div>
                      <p className="text-foreground font-semibold text-sm">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <Card className="bg-gradient-to-b from-card to-background border-primary/30 overflow-hidden">
              <CardContent className="pt-8 pb-8 space-y-6 text-center">
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">Acesso Completo</span>
                  <h3 className="font-display text-2xl font-bold text-foreground">{toolName}</h3>
                </div>

                {bonuses && bonuses.length > 0 && (
                  <div className="space-y-2 text-left">
                    <p className="text-sm text-primary font-semibold">Bônus inclusos:</p>
                    {bonuses.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-3 w-3 text-primary shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-1">
                  {originalPrice && (
                    <p className="text-muted-foreground line-through text-sm">{originalPrice}</p>
                  )}
                  <p className="text-4xl font-bold text-primary">{price}</p>
                  <p className="text-xs text-muted-foreground">pagamento único</p>
                </div>

                <Button variant="premium" size="lg" onClick={handleCTA} className="w-full text-lg py-6">
                  {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>{guarantee}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Acesso imediato após a compra</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ToolSalesLanding;
