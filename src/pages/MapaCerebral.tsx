import React from 'react';
import { Brain, Eye, Heart, Lightbulb, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import PageHeader from '@/components/layout/PageHeader';

const MapaCerebral = () => {
  const areasCerebrais = [
    {
      nome: "Área de Broca e Wernicke",
      icon: <Zap className="h-6 w-6" />,
      funcao: "Linguagem e Compreensão",
      descricao: "São as regiões do cérebro associadas à compreensão e expressão verbal. Quando o leitor encontra uma metáfora, o cérebro tenta decodificá-la como um puzzle emocional.",
      efeito: "Estimula o pensamento simbólico, desenvolve a tolerância à ambiguidade e exercita a mente na 'arte de não entender tudo e mesmo assim sentir'.",
      cor: "text-blue-500"
    },
    {
      nome: "Córtex Visual e Área de Imagem Mental",
      icon: <Eye className="h-6 w-6" />,
      funcao: "Visualização e Imaginação",
      descricao: "Ao ler 'a saudade dorme na rede do peito', o cérebro ativa áreas ligadas à visualização, como se visse a cena. Isso envolve o córtex occipital e parietal.",
      efeito: "A poesia cria imagens mentais vívidas, úteis para acessar conteúdos inconscientes de forma indireta.",
      cor: "text-green-500"
    },
    {
      nome: "Sistema Límbico",
      icon: <Heart className="h-6 w-6" />,
      funcao: "Emoções",
      descricao: "Poemas ativam a amígdala, o hipocampo e o córtex orbitofrontal, centros das emoções e da memória. Metáforas emocionais podem provocar respostas fisiológicas reais.",
      efeito: "Permite a reexperiência emocional segura de memórias, favorecendo o processamento afetivo (base da psicoterapia eficaz).",
      cor: "text-red-500"
    },
    {
      nome: "Córtex Pré-Frontal",
      icon: <Lightbulb className="h-6 w-6" />,
      funcao: "Reflexão e Reinterpretação",
      descricao: "Esta área se envolve na integração do simbólico com o lógico. Quando o leitor encontra um verso que toca uma dor antiga, ele pode reescrever internamente sua narrativa.",
      efeito: "Abre espaço para novos significados, ressignificação simbólica e insight terapêutico.",
      cor: "text-purple-500"
    },
    {
      nome: "Rede do Modo Padrão",
      icon: <Brain className="h-6 w-6" />,
      funcao: "Default Mode Network",
      descricao: "Ativada no repouso mental, devaneios, imaginação. Poesia contemplativa, abstrata, com repetições suaves e ritmo sonoro estimula essa rede.",
      efeito: "A poesia bem conduzida leva o cliente a um estado semelhante à leve hipnose, onde é mais fácil acessar memórias e promover transformações.",
      cor: "text-indigo-500"
    }
  ];

  const aplicacoesTerapeuticas = [
    {
      zona: "Límbico",
      estilo: "Metáforas emocionais, imagens sensoriais",
      efeito: "Desbloqueio afetivo, resgate de memórias"
    },
    {
      zona: "Pré-frontal",
      estilo: "Paradoxos, perguntas, ironia sutil",
      efeito: "Insight, reorganização de crenças"
    },
    {
      zona: "Modo Padrão",
      estilo: "Versos circulares, pausas, musicalidade",
      efeito: "Relaxamento, criatividade, devaneio"
    },
    {
      zona: "Broca/Wernicke",
      estilo: "Rupturas sintáticas, tempos verbais",
      efeito: "Flexibilidade cognitiva, ressignificação"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader currentPage="Mapa Cerebral" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spiritual opacity-20" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-spiritual-violet to-secondary bg-clip-text text-transparent">
              Mapa Cerebral
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              O Mapa Cerebral do Leitor Poético
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Uma representação simbólico-científica dos caminhos neuronais ativados pela poesia quando esta é lida de maneira terapêutica, introspectiva ou estética.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* O que é o Mapa Cerebral */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-heading flex items-center gap-2">
                🧭 O que é o Mapa Cerebral do Leitor Poético?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-4">
                Imagine um cérebro em modo de leitura poética como um palco iluminado onde emoção, linguagem e imagem dançam de mãos dadas. Esse conceito une neurociência, psicologia cognitiva, linguagem simbólica e a abordagem da Poesia Cognitiva Hipnótica (PCH).
              </p>
              <div className="bg-gradient-to-r from-spiritual-violet/10 to-primary/10 p-6 rounded-lg text-center">
                <p className="italic text-lg">
                  A alma tem razões que o cérebro pode explicar —<br />
                  se soubermos escutar os dois em uníssono.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Áreas Cerebrais */}
          <div>
            <h2 className="text-3xl font-heading font-bold text-center mb-8">
              🧠 Áreas Cerebrais Ativadas Durante a Leitura Poética
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {areasCerebrais.map((area, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={area.cor}>
                        {area.icon}
                      </div>
                      <div>
                        <div className="text-lg font-heading">{area.nome}</div>
                        <div className="text-sm text-muted-foreground font-normal">{area.funcao}</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {area.descricao}
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-semibold text-sm mb-2">🧠 Efeito:</p>
                      <p className="text-sm">{area.efeito}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Aplicações Terapêuticas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-heading flex items-center gap-2">
                🌿 Aplicação no Atendimento Terapêutico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">
                Por que isso importa para o terapeuta-poeta? Porque entender o mapa é como saber onde plantar cada verso:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-4 text-left">Zona Cerebral</th>
                      <th className="border border-border p-4 text-left">Estilo de Verso</th>
                      <th className="border border-border p-4 text-left">Efeito Terapêutico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aplicacoesTerapeuticas.map((app, index) => (
                      <tr key={index} className="hover:bg-muted/20">
                        <td className="border border-border p-4 font-semibold">{app.zona}</td>
                        <td className="border border-border p-4 text-muted-foreground">{app.estilo}</td>
                        <td className="border border-border p-4">{app.efeito}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                <p className="font-semibold">Orientações práticas:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Se você quer ativar <strong>reflexão</strong> → trabalhe com ambiguidade controlada e metáforas complexas (pré-frontal).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Se quer desbloquear <strong>emoções</strong> → use imagens sensoriais ligadas à memória afetiva (sistema límbico).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Se deseja facilitar o <strong>insight</strong> → proponha pausas, devaneios e perguntas-poemas (modo padrão).</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Base Científica */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                🧬 Base Científica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">O conceito do mapa cerebral do leitor poético encontra raízes em:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Neuroestética</strong> (Ramachandran, Zeki)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Psicolinguística</strong> (Lakoff & Johnson, "Metáforas da Vida Cotidiana")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Neurociência da Leitura</strong> (Dehaene, "O Cérebro Leitor")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Poesia e Emoção</strong> (Paul Zak, estudos com ocitocina e empatia poética)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Psicologia Simbólica</strong> (Jung, Hillman, Assagioli)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Reflexão Final */}
          <Card className="border-spiritual-violet/50">
            <CardContent className="text-center py-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-heading text-spiritual-violet">
                  🌌 O Leitor Poético é um Navegador Interno
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Ao ler poesia, não estamos só decifrando versos — estamos reencenando vivências emocionais em teatro simbólico interno.
                </p>
                <p className="text-lg">
                  Por isso, na PCH, o leitor não é um "paciente", mas um <strong>viajante lírico</strong>.
                </p>
                <p className="italic text-spiritual-violet">
                  Seu mapa cerebral é também um mapa da alma.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MapaCerebral;