import React, { useState } from 'react';
import { Eye, ArrowRight, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const poemas = [
  {
    id: 'medo',
    tema: 'Medo',
    verso: 'Guardo embaixo da língua\no grito que nunca saiu.\nTenho medo do eco —\ndo que ele pode acordar.',
    diagnostico: 'Você carrega emoções silenciadas. Há algo que precisa ser dito, mas o medo do impacto mantém tudo preso. Seu inconsciente pede permissão para falar.',
    cor: 'from-red-500/20 to-orange-500/10',
    borda: 'border-red-400/30',
  },
  {
    id: 'espera',
    tema: 'Espera',
    verso: 'Tenho um relógio que não marca horas —\nsó silêncios acumulados.\nEspero algo que já veio,\nmas não reconheci.',
    diagnostico: 'Você está em estado de suspensão emocional — entre o passado e o futuro, mas sem presença. Algo já chegou à sua vida, mas a ansiedade da espera impede de enxergar.',
    cor: 'from-blue-500/20 to-indigo-500/10',
    borda: 'border-blue-400/30',
  },
  {
    id: 'mudanca',
    tema: 'Mudança',
    verso: 'Troquei a gaiola aberta\npelo vento que ainda me assusta.\nNão sei se estou voando\nou apenas caindo bonito.',
    diagnostico: 'Você está em transição. Já fez a escolha de mudar, mas ainda não confia no processo. O novo assusta porque não tem paredes — e a liberdade, às vezes, parece queda.',
    cor: 'from-emerald-500/20 to-teal-500/10',
    borda: 'border-emerald-400/30',
  },
];

const PoemadiagnosticoInterativo = () => {
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [revelado, setRevelado] = useState(false);

  const poemaEscolhido = poemas.find(p => p.id === selecionado);

  const resetar = () => {
    setSelecionado(null);
    setRevelado(false);
  };

  return (
    <section className="py-20 border-t border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 gradient-warm" />
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-4">
              <Eye className="h-3.5 w-3.5" />
              Experiência Interativa
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Qual poema te <span className="text-primary italic">escolhe</span> hoje?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Não pense. Leia os três poemas abaixo e sinta qual deles fala por você neste momento.
            </p>
          </div>

          {/* Poemas */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {poemas.map((poema) => (
              <button
                key={poema.id}
                onClick={() => { setSelecionado(poema.id); setRevelado(false); }}
                className="text-left w-full"
              >
                <Card className={`h-full transition-all duration-500 cursor-pointer ${
                  selecionado === poema.id 
                    ? `${poema.borda} ring-2 ring-primary/30 scale-[1.02]` 
                    : 'border-border/50 hover:border-primary/20'
                } ${selecionado && selecionado !== poema.id ? 'opacity-40' : ''}`}>
                  <CardContent className="p-5">
                    <span className="text-xs uppercase tracking-widest text-primary font-medium">{poema.tema}</span>
                    <div className="mt-3 poem-block">
                      <p className="poem-text text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                        {poema.verso}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>

          {/* Resultado */}
          {selecionado && !revelado && (
            <div className="text-center animate-fade-in-up">
              <Button onClick={() => setRevelado(true)} size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
                Revelar meu espelho emocional
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {revelado && poemaEscolhido && (
            <div className="animate-fade-in-up">
              <Card className={`${poemaEscolhido.borda} bg-gradient-to-br ${poemaEscolhido.cor} backdrop-blur-sm`}>
                <CardContent className="p-8 text-center space-y-4">
                  <p className="text-sm uppercase tracking-widest text-primary font-medium">
                    Você escolheu: {poemaEscolhido.tema}
                  </p>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    Seu Espelho Emocional
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                    {poemaEscolhido.diagnostico}
                  </p>
                  <div className="poem-block max-w-sm mx-auto mt-4">
                    <p className="poem-text text-sm text-foreground/70 italic">
                      "O poema que te escolhe revela o que a razão ainda nega."
                    </p>
                  </div>
                  <Button variant="outline" onClick={resetar} className="mt-4 border-primary/30 text-foreground hover:bg-primary/5">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Experimentar novamente
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PoemadiagnosticoInterativo;
