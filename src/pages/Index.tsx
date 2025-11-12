import React from 'react';
import { Lightbulb, Star } from 'lucide-react';
import { FerramentasPADH } from '@/components/sections/FerramentasPADH';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0 gradient-glow" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spiritual-violet/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-6 py-32 text-center z-10">
          <div className="animate-fade-in-up space-y-8">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border-glow">
                <Lightbulb className="h-4 w-4 text-primary animate-glow-pulse" />
                <span className="text-sm font-medium text-foreground/90">Transformação & Autoconhecimento</span>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-7xl md:text-9xl font-heading font-bold mb-6 leading-tight">
              <span className="inline-block glow-text bg-gradient-to-r from-primary via-spiritual-violet to-secondary bg-clip-text text-transparent animate-gradient">
                Ferramentas P.A.D.H.
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-3xl text-foreground/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              <span className="font-semibold text-primary">Protocolo Avançado de Desenvolvimento Humano</span>
              <br />
              <span className="text-lg md:text-xl text-muted-foreground mt-2 block">
                Técnicas integradas para transformação pessoal através da consciência expandida
              </span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-300 shadow-glow hover:shadow-strong hover:scale-105">
                <span className="relative z-10">Explorar Ferramentas</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity blur" />
              </button>
              
              <button className="px-8 py-4 rounded-full glass-card border-glow text-foreground font-semibold text-lg hover:bg-white/5 transition-all duration-300">
                Saiba Mais
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">7+</div>
                <div className="text-sm text-muted-foreground">Ferramentas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Científico</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-spiritual-violet mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Potencial</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-gentle-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative container mx-auto px-6 py-24">
        <div className="absolute inset-0 gradient-glow opacity-30 -z-10" />
        <FerramentasPADH />
      </section>

      {/* Footer */}
      <footer className="relative mt-32 border-t border-border/50 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="relative container mx-auto px-6 py-16 text-center">
          <div className="space-y-8">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="relative">
                <Star className="h-8 w-8 text-primary animate-gentle-bounce" />
                <div className="absolute inset-0 h-8 w-8 text-primary animate-glow-pulse opacity-50" />
              </div>
              <h3 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                P.A.D.H.
              </h3>
              <div className="relative">
                <Star className="h-8 w-8 text-secondary animate-gentle-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-0 h-8 w-8 text-secondary animate-glow-pulse opacity-50" />
              </div>
            </div>
            
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Protocolo Avançado de Desenvolvimento Humano - Uma metodologia integrada para o crescimento pessoal 
              e desenvolvimento da consciência através de técnicas científicas e práticas transformadoras.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-4 rounded-xl hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🧠</div>
                <div className="text-sm font-medium text-foreground/80">Neuroplasticidade</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🌟</div>
                <div className="text-sm font-medium text-foreground/80">Consciência Expandida</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">📖</div>
                <div className="text-sm font-medium text-foreground/80">Crescimento Pessoal</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">💜</div>
                <div className="text-sm font-medium text-foreground/80">Transformação Interior</div>
              </div>
            </div>
            
            <div className="pt-8 mt-8 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                © 2024 P.A.D.H. - Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;