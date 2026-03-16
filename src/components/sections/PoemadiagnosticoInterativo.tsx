import React, { useState, useMemo } from 'react';
import { Eye, ArrowRight, RotateCcw, Shuffle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const todosPoemas = [
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
  {
    id: 'solidao',
    tema: 'Solidão',
    verso: 'Tenho gente ao redor\ne um deserto por dentro.\nMinha solidão não é falta de alguém —\né sobra de mim sem destino.',
    diagnostico: 'Você sente um vazio que não se preenche com presença alheia. Sua solidão é existencial — um chamado para se encontrar consigo mesmo antes de se entregar ao outro.',
    cor: 'from-slate-500/20 to-zinc-500/10',
    borda: 'border-slate-400/30',
  },
  {
    id: 'gratidao',
    tema: 'Gratidão',
    verso: 'Hoje acordei e o sol\nnão pediu licença para entrar.\nEntendi que a vida\ntambém chega sem convite — e fica.',
    diagnostico: 'Você está num momento de abertura e reconhecimento. Há uma parte sua que já começou a acolher o que é, sem exigir que fosse diferente. A gratidão é seu portal de presença.',
    cor: 'from-amber-500/20 to-yellow-500/10',
    borda: 'border-amber-400/30',
  },
  {
    id: 'renascimento',
    tema: 'Renascimento',
    verso: 'Morri tantas vezes por dentro\nque já perdi a conta das cinzas.\nMas hoje acordei com sementes\nonde antes só havia ferida.',
    diagnostico: 'Você está emergindo de um ciclo de dor. Algo novo começa a brotar — não apesar da ferida, mas a partir dela. Seu inconsciente reconhece que transformação nasce do que dói.',
    cor: 'from-violet-500/20 to-purple-500/10',
    borda: 'border-violet-400/30',
  },
  {
    id: 'luto',
    tema: 'Luto',
    verso: 'Carrego um nome que não posso chamar\nsem que o peito se parta ao meio.\nA saudade não diminui —\napenas aprende a respirar baixo.',
    diagnostico: 'Você está processando uma perda que ainda pulsa. O luto não acabou — ele apenas mudou de forma. Seu inconsciente pede espaço para honrar o que foi, sem pressa de seguir em frente.',
    cor: 'from-gray-500/20 to-stone-500/10',
    borda: 'border-gray-400/30',
  },
  {
    id: 'coragem',
    tema: 'Coragem',
    verso: 'Não é que o medo tenha ido embora —\né que aprendi a tremer de pé.\nCoragem não é ausência de abismo.\nÉ saltar sabendo que o chão é incerto.',
    diagnostico: 'Você está num momento de enfrentamento. Algo dentro de você já decidiu avançar, mesmo sem garantias. Sua coragem não nega o medo — ela o atravessa.',
    cor: 'from-orange-500/20 to-red-500/10',
    borda: 'border-orange-400/30',
  },
  {
    id: 'perdao',
    tema: 'Perdão',
    verso: 'Devolvi a pedra que guardava\npara atirar em quem me feriu.\nMinhas mãos, agora vazias,\nfinalmente podem abraçar.',
    diagnostico: 'Você está num processo de soltar o peso da mágoa. O perdão que emerge não é esquecimento — é a decisão de não carregar mais o que o outro deixou. Suas mãos querem ser livres.',
    cor: 'from-rose-500/20 to-pink-500/10',
    borda: 'border-rose-400/30',
  },
];

function embaralhar<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const PoemadiagnosticoInterativo = () => {
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [revelado, setRevelado] = useState(false);
  const [seed, setSeed] = useState(0);

  const poemas = useMemo(() => embaralhar(todosPoemas).slice(0, 3), [seed]);
  const poemaEscolhido = poemas.find(p => p.id === selecionado);

  const resetar = () => {
    setSelecionado(null);
    setRevelado(false);
    setSeed(s => s + 1);
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
                    <Shuffle className="mr-2 h-4 w-4" />
                    Novos poemas
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
