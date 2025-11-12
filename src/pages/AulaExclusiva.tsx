import React from 'react';
import { Play, Users, Clock, Target, BookOpen, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AulaExclusiva = () => {
  const objetivos = [
    "Compreender as principais áreas cerebrais ativadas pela leitura poética",
    "Relacionar essas áreas com os efeitos terapêuticos da Poesia Cognitiva Hipnótica (PCH)",
    "Explorar a leitura como um fenômeno multissensorial e simbólico",
    "Aprender a desenhar estrategicamente poemas para fins terapêuticos",
    "Vivenciar uma leitura poética com foco em introspecção, emoção e insight"
  ];

  const partes = [
    {
      titulo: "Anatomia Poética do Cérebro",
      duracao: "15 min",
      descricao: "Viagem pelas áreas cerebrais ativadas durante a leitura poética",
      conteudo: [
        "Área de Broca e Wernicke – Linguagem e Compreensão",
        "Sistema Límbico – Emoções",
        "Córtex Pré-Frontal – Reflexão e Reinterpretação",
        "Rede do Modo Padrão (Default Mode Network)"
      ]
    },
    {
      titulo: "O Que a Ciência Já Sabia",
      duracao: "10 min",
      descricao: "Fundamentos científicos da neuroestética e psicolinguística",
      conteudo: [
        "Estudos com fMRI sobre leitura poética",
        "Neuroestética e resposta à beleza",
        "Metáforas como estruturas cognitivas fundamentais",
        "Citações de Lakoff, Oliver Sacks e outros"
      ]
    },
    {
      titulo: "Leitura como Experiência Multissensorial",
      duracao: "15 min",
      descricao: "Vivência prática com poema terapêutico",
      conteudo: [
        "Recitação de poema com análise em tempo real",
        "Identificação de imagens visuais evocadas",
        "Reconhecimento de emoções emergentes",
        "Ativação das diferentes áreas cerebrais"
      ]
    },
    {
      titulo: "Aplicações Terapêuticas do Mapa",
      duracao: "15 min",
      descricao: "Como construir poemas com intenção terapêutica",
      conteudo: [
        "Zona Cerebral → Estilo de Verso → Efeito Terapêutico",
        "Exemplos práticos de versos direcionados",
        "Exercício de criação poética direcionada",
        "Construção colaborativa de versos terapêuticos"
      ]
    },
    {
      titulo: "Vivência Guiada",
      duracao: "10 min",
      descricao: "Experiência prática de leitura terapêutica",
      conteudo: [
        "Respiração consciente preparatória",
        "Leitura guiada de poema terapêutico",
        "Registro de imagens, emoções e insights",
        "Transformação da experiência em mini poema",
        "Compartilhamento opcional"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spiritual opacity-20" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <Play className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-spiritual-violet to-secondary bg-clip-text text-transparent">
              Aula Exclusiva
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              O Mapa Cerebral do Leitor Poético
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Módulo: Neurociência da Leitura Terapêutica
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Clock className="mr-2 h-4 w-4" />
                60 minutos
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Users className="mr-2 h-4 w-4" />
                Teórico-vivencial
              </Badge>
            </div>
            <Button size="lg" className="bg-spiritual-violet hover:bg-spiritual-violet/90">
              <Play className="mr-2 h-5 w-5" />
              Assistir Aula
            </Button>
          </div>
        </div>
      </section>

      {/* Introdução */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Abertura Narrada */}
          <Card className="border-spiritual-violet/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2 text-spiritual-violet">
                🎬 Introdução Narrada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-spiritual-violet/10 to-primary/10 p-6 rounded-lg">
                <p className="italic text-lg leading-relaxed">
                  "Feche os olhos por um instante... imagine que cada verso que você lê é uma chave. Mas onde essas chaves se encaixam? No corpo? Na mente? Ou talvez... no mapa oculto da sua própria alma?"
                </p>
              </div>
              <p className="mt-4 text-muted-foreground">
                Nesta aula, mergulharemos num território onde a neurociência encontra a metáfora, e onde a leitura se revela não como um ato passivo, mas como uma intervenção delicada no tecido neural da consciência. Descobriremos como a poesia age como agente neuroplástico, redesenhando a mente com símbolos.
              </p>
            </CardContent>
          </Card>

          {/* Objetivos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                <Target className="h-6 w-6" />
                Objetivos da Aula
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {objetivos.map((objetivo, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{objetivo}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Estrutura da Aula */}
          <div>
            <h2 className="text-3xl font-heading font-bold text-center mb-8">
              Estrutura da Aula
            </h2>
            <div className="space-y-6">
              {partes.map((parte, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="px-3 py-1">
                            Parte {index + 1}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {parte.duracao}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-heading">
                          {parte.titulo}
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">
                          {parte.descricao}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold mb-3">Conteúdo:</h4>
                      <ul className="space-y-1">
                        {parte.conteudo.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Encerramento */}
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2 text-primary">
                🧩 Encerramento Reflexivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <blockquote className="text-lg italic text-center py-4 border-l-4 border-primary pl-4">
                  "Ler poesia não é ler palavras. É ler a si mesmo num espelho feito de símbolos."
                </blockquote>
                <div className="space-y-3">
                  <p className="font-semibold">Reflexões propostas:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Qual parte do seu cérebro você mais usa para se esconder de si mesmo?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>E se o verso for o bisturi mais gentil que o inconsciente aceita?</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center mt-6">
                  <p className="text-lg text-spiritual-violet italic">
                    "Agora que você conhece o mapa... que tal escrever o caminho?"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="bg-spiritual-violet hover:bg-spiritual-violet/90 mr-4">
              <Play className="mr-2 h-5 w-5" />
              Assistir Aula Completa
            </Button>
            <Button variant="outline" size="lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Baixar Material de Apoio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AulaExclusiva;