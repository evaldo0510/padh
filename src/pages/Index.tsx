import React from 'react';
import { Lightbulb, Star } from 'lucide-react';
import { FerramentasPADH } from '@/components/sections/FerramentasPADH';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spiritual opacity-20" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-spiritual-violet to-secondary bg-clip-text text-transparent">
              Ferramentas P.A.D.H.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Protocolo Avançado de Desenvolvimento Humano - Técnicas integradas para transformação pessoal e autoconhecimento
            </p>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-spiritual-violet/10 text-spiritual-violet border border-spiritual-violet/20">
                <Lightbulb className="h-6 w-6" />
                <span className="font-medium text-lg">Portal de Transformação Interior</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12">
        <FerramentasPADH />
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Star className="h-6 w-6 text-spiritual-violet animate-gentle-bounce" />
            <h3 className="text-2xl font-heading font-bold text-primary">P.A.D.H.</h3>
            <Star className="h-6 w-6 text-spiritual-violet animate-gentle-bounce" />
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Protocolo Avançado de Desenvolvimento Humano - Uma metodologia integrada para o crescimento pessoal 
            e desenvolvimento da consciência através de técnicas científicas e práticas espirituais.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>🧠 Neuroplasticidade</span>
            <span>🌟 Desenvolvimento Consciencial</span>
            <span>📖 Crescimento Pessoal</span>
            <span>💜 Transformação Interior</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;