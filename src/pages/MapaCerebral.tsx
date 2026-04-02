import React from 'react';
import { Brain, Eye, Heart, Lightbulb, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/layout/PageHeader';
import { usePageLoading } from '@/hooks/usePageLoading';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import SEOHead from '@/components/seo/SEOHead';
import { pagesSEO } from '@/lib/seo-config';

const MapaCerebral = () => {
  const isLoading = usePageLoading(500);
  if (isLoading) return <PageSkeleton />;

  const areasCerebrais = [
    {
      nome: "Área de Broca e Wernicke",
      icon: <Zap className="h-5 w-5" />,
      funcao: "Linguagem e Compreensão",
      descricao: "Regiões associadas à compreensão e expressão verbal. Quando o leitor encontra uma metáfora, o cérebro tenta decodificá-la como um puzzle emocional.",
      efeito: "Estimula pensamento simbólico, desenvolve tolerância à ambiguidade e exercita a mente na 'arte de não entender tudo e mesmo assim sentir'."
    },
    {
      nome: "Córtex Visual e Imagem Mental",
      icon: <Eye className="h-5 w-5" />,
      funcao: "Visualização e Imaginação",
      descricao: "Ao ler 'a saudade dorme na rede do peito', o cérebro ativa áreas ligadas à visualização, como se visse a cena. Envolve o córtex occipital e parietal.",
      efeito: "A poesia cria imagens mentais vívidas, úteis para acessar conteúdos inconscientes de forma indireta."
    },
    {
      nome: "Sistema Límbico",
      icon: <Heart className="h-5 w-5" />,
      funcao: "Emoções",
      descricao: "Poemas ativam amígdala, hipocampo e córtex orbitofrontal — centros das emoções e memória. Metáforas emocionais provocam respostas fisiológicas reais.",
      efeito: "Permite reexperiência emocional segura de memórias, favorecendo processamento afetivo — base da psicoterapia eficaz."
    },
    {
      nome: "Córtex Pré-Frontal",
      icon: <Lightbulb className="h-5 w-5" />,
      funcao: "Reflexão e Reinterpretação",
      descricao: "Integra o simbólico com o lógico. Quando o leitor encontra um verso que toca uma dor antiga, ele pode reescrever internamente sua narrativa.",
      efeito: "Abre espaço para novos significados, ressignificação simbólica e insight terapêutico."
    },
    {
      nome: "Rede do Modo Padrão",
      icon: <Brain className="h-5 w-5" />,
      funcao: "Default Mode Network",
      descricao: "Ativada no repouso mental, devaneios e imaginação. Poesia contemplativa com repetições suaves e ritmo sonoro estimula essa rede.",
      efeito: "Leva a um estado semelhante à leve hipnose, onde é mais fácil acessar memórias e promover transformações."
    }
  ];

  const aplicacoes = [
    { zona: "Sistema Límbico", estilo: "Metáforas emocionais, imagens sensoriais", efeito: "Desbloqueio afetivo, resgate de memórias" },
    { zona: "Córtex Pré-frontal", estilo: "Paradoxos, perguntas, ironia sutil", efeito: "Insight, reorganização de crenças" },
    { zona: "Rede do Modo Padrão", estilo: "Versos circulares, pausas, musicalidade", efeito: "Relaxamento, criatividade, devaneio" },
    { zona: "Broca / Wernicke", estilo: "Rupturas sintáticas, tempos verbais", efeito: "Flexibilidade cognitiva, ressignificação" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Mapa Cerebral" />
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Neurociência & Poesia</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              O Mapa Cerebral do <span className="text-primary italic">Leitor Poético</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Uma representação simbólico-científica dos caminhos neuronais ativados pela poesia 
              quando lida de maneira terapêutica, introspectiva ou estética.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Introdução */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Imagine um cérebro em modo de leitura poética como um palco iluminado 
              onde emoção, linguagem e imagem dançam de mãos dadas. Este conceito une 
              neurociência, psicologia cognitiva e a abordagem da Poesia Cognitiva Hipnótica.
            </p>
            <div className="poem-block text-left max-w-sm mx-auto">
              <p className="poem-text text-sm text-muted-foreground">
                A alma tem razões que o cérebro pode explicar —<br />
                se soubermos escutar os dois em uníssono.
              </p>
            </div>
          </div>

          {/* Áreas Cerebrais */}
          <div>
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2 font-medium">Neuroanatomia Poética</p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Áreas Cerebrais Ativadas</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {areasCerebrais.map((area, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {area.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground text-sm">{area.nome}</h3>
                        <p className="text-xs text-muted-foreground">{area.funcao}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.descricao}</p>
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary font-medium">Efeito: </span>{area.efeito}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Aplicações */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Aplicação no Atendimento Terapêutico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Entender o mapa cerebral é como saber onde plantar cada verso. O terapeuta-poeta 
                pode direcionar sua intervenção com precisão:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-3 font-heading font-semibold text-foreground">Zona Cerebral</th>
                      <th className="text-left p-3 font-heading font-semibold text-foreground">Estilo de Verso</th>
                      <th className="text-left p-3 font-heading font-semibold text-foreground">Efeito Terapêutico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aplicacoes.map((app, i) => (
                      <tr key={i} className="border-b border-border/20 last:border-0">
                        <td className="p-3 text-foreground font-medium">{app.zona}</td>
                        <td className="p-3 text-muted-foreground">{app.estilo}</td>
                        <td className="p-3 text-muted-foreground">{app.efeito}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 pt-4">
                <p className="text-sm font-medium text-foreground">Orientações práticas:</p>
                {[
                  { icon: <Target className="h-4 w-4" />, text: 'Para ativar reflexão → trabalhe com ambiguidade controlada e metáforas complexas (pré-frontal).' },
                  { icon: <Heart className="h-4 w-4" />, text: 'Para desbloquear emoções → use imagens sensoriais ligadas à memória afetiva (sistema límbico).' },
                  { icon: <Lightbulb className="h-4 w-4" />, text: 'Para facilitar insight → proponha pausas, devaneios e perguntas-poemas (modo padrão).' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Base Científica */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading">Base Científica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">O conceito do mapa cerebral encontra raízes em:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { area: 'Neuroestética', ref: 'Ramachandran, Zeki' },
                  { area: 'Psicolinguística', ref: 'Lakoff & Johnson' },
                  { area: 'Neurociência da Leitura', ref: 'Dehaene' },
                  { area: 'Poesia e Emoção', ref: 'Paul Zak (ocitocina)' },
                  { area: 'Psicologia Simbólica', ref: 'Jung, Hillman' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item.area}</span>
                    <span className="text-muted-foreground">— {item.ref}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reflexão */}
          <div className="text-center py-8 space-y-4">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              O Leitor Poético é um Navegador Interno
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ao ler poesia, não estamos só decifrando versos — estamos reencenando 
              vivências emocionais em teatro simbólico interno. Na PCH, o leitor não é 
              um "paciente", mas um <strong className="text-foreground">viajante lírico</strong>.
            </p>
            <p className="poem-text text-primary text-sm">
              Seu mapa cerebral é também um mapa da alma.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MapaCerebral;
