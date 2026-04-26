import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Brain, Target, Wand2, Zap, Eye, BookOpen, Users, ArrowDown, Sparkles } from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  objective: string;
  foundation: string;
  usage: string;
  example: string;
  variations: string;
  exercise: string;
  icon: React.ReactNode;
  color: string;
}

const tools: Tool[] = [
  {
    id: 'poema-funil',
    title: 'Poema-Funil',
    objective: 'Guiar o cliente da superfície da consciência até camadas mais profundas, progressivamente, através de uma estrutura poética hierárquica que conduz naturalmente à introspecção.',
    foundation: 'Baseia-se na indução gradual da hipnose ericksoniana, técnicas de foco progressivo da atenção e no uso da linguagem metafórica para amplificar a ressonância emocional. Incorpora princípios da neuroplasticidade e processamento emocional sequencial.',
    usage: 'Leitura lenta e pausada, com ênfase nos versos-chave, criando um fluxo rítmico que "puxa" para dentro. Utilize respiração consciente entre estrofes. Permita silêncios estratégicos para assimilação. Adaptável para sessões individuais ou em grupo.',
    example: `Começo com o que se vê —
o rosto que espelha o dia,
os olhos que carregam histórias.

Sigo com o que se sente —
o peito que se expande e contrai,
o coração que sussurra verdades.

Termino com o que não se diz —
mas vive esperando voz,
como semente no escuro da terra.`,
    variations: 'Poema-funil invertido para sessões de aterramento e retorno ao presente. Funil temático para trabalhar emoções específicas (medo, culpa, esperança, luto). Funil corporal focando em sensações físicas. Funil temporal explorando passado-presente-futuro.',
    exercise: 'Crie um poema-funil de 3 estrofes sobre um desafio pessoal atual. Comece com aspectos externos visíveis, avance para sensações internas e termine com insights profundos. Leia em voz alta e registre as mudanças de estado emocional.',
    icon: <ArrowDown className="h-6 w-6" />,
    color: 'text-primary'
  },
  {
    id: 'verso-gatilho',
    title: 'Verso-Gatilho',
    objective: 'Criar mantras poéticos personalizados que funcionem como âncoras emocionais instantâneas, ativando recursos internos em momentos de necessidade.',
    foundation: 'Inspirado em condicionamento clássico, técnicas de ancoragem emocional da PNL, neurociência da repetição e poder transformador da linguagem rítmica. Utiliza a associação entre som, significado e estado emocional.',
    usage: 'Co-criação do verso com o cliente, testando ressonância emocional. Repetição consciente 21 dias para fixação neural. Pode ser sussurrado, pensado ou escrito. Associar a gestos ou respiração para intensificar o efeito.',
    example: `"Eu não sou o que me prende,
sou o que se solta depois."

"Minha força não vem do que sei,
mas do que ouso descobrir."

"Cada fim é porta disfarçada
para o que ainda não nasceu."`,
    variations: 'Versos para ansiedade ("Respiro calma, solto a pressa"). Versos para autoestima ("Sou completo em minha imperfeição"). Versos para coragem ("O medo é apenas amor disfarçado"). Versos visuais associados a imagens mentais específicas.',
    exercise: 'Identifique um padrão emocional limitante que se repete em sua vida. Crie um verso-gatilho de 2 linhas que contradiga esse padrão. Repita 5 vezes ao acordar e 5 vezes antes de dormir por uma semana. Documente mudanças percebidas.',
    icon: <Zap className="h-6 w-6" />,
    color: 'text-spiritual-indigo'
  },
  {
    id: 'poemadiagnostico',
    title: 'Poemadiagnóstico',
    objective: 'Mapear o estado emocional e psicológico do cliente através da escolha intuitiva entre poemas cuidadosamente selecionados, revelando aspectos inconscientes do momento presente.',
    foundation: 'Baseado em técnicas projetivas da psicologia, teoria da identificação simbólica, princípios do teste de Rorschach adaptados para linguagem poética e neurociência da tomada de decisão intuitiva.',
    usage: 'Apresentar 5-7 poemas curtos sobre temas diversos. Cliente escolhe o que "mais o escolhe". Explorar as razões da escolha, palavras que mais impactaram e sensações corporais geradas. Usar como ponto de partida para sessão.',
    example: `Conjunto A - Estados Emocionais:

1. "O medo tem pressa de chegar
   mas não sabe partir"

2. "Esperar é plantar em terra
   que ainda não conhecemos"

3. "A mudança chega de chinelos,
   quieta como manhã de domingo"

4. "A raiva é fogo que devora
   quem a alimenta"

5. "A alegria não precisa de motivo,
   apenas de permissão"`,
    variations: 'Poemadiagnóstico temático (relacionamentos, carreira, família). Versão para crianças com linguagem adaptada. Poemas sazonais conectados aos ciclos naturais. Diagnóstico corporal com poemas focados em sensações físicas.',
    exercise: 'Monte seu próprio conjunto de 5 poemas sobre temas que considera importantes. Ofereça para um amigo escolher um e peça para explicar a escolha. Observe padrões entre a escolha e o momento de vida da pessoa.',
    icon: <Eye className="h-6 w-6" />,
    color: 'text-spiritual-violet'
  },
  {
    id: 'metafora-terapeutica',
    title: 'Metáfora Terapêutica',
    objective: 'Construir pontes poéticas entre a experiência atual do cliente e novos paradigmas de compreensão, usando linguagem simbólica para contornar resistências conscientes.',
    foundation: 'Baseada na terapia narrativa, hipnose ericksoniana, arquétipos junguianos e neurociência da linguagem metafórica. A metáfora ativa redes neurais associativas que facilitam insights e mudanças comportamentais.',
    usage: 'Escutar atentamente a linguagem do cliente e construir metáforas personalizadas. Usar elementos da natureza, jornada do herói ou situações familiares. Desenvolver a metáfora ao longo de várias sessões como fio condutor.',
    example: `Para ansiedade:
"Você é o jardineiro de seus pensamentos.
Alguns são ervas daninhas
que crescem sem convite.
Mas você tem as ferramentas:
a atenção é sua pá,
a respiração é sua água,
a compaixão é seu sol."`,
    variations: 'Metáforas da natureza (sementes, estações, rios). Metáforas arquitetônicas (construir, reformar, habitar). Metáforas de viagem (caminho, destino, bagagem). Metáforas artísticas (pintura, música, dança).',
    exercise: 'Pense em um desafio pessoal atual. Crie uma metáfora que o represente usando elementos da natureza. Desenvolva a metáfora explorando diferentes aspectos: clima, estações, crescimento, transformação.',
    icon: <Lightbulb className="h-6 w-6" />,
    color: 'text-spiritual-rose'
  },
  {
    id: 'ritual-poetico',
    title: 'Ritual Poético',
    objective: 'Criar cerimônias simbólicas usando poesia para marcar transições, processar perdas, celebrar conquistas e estabelecer novas intenções de vida.',
    foundation: 'Inspirado em antropologia ritual, psicologia transpessoal, arteterapia e tradições xamânicas adaptadas. O ritual oferece estrutura simbólica para processar mudanças e criar significado.',
    usage: 'Definir intenção clara do ritual. Criar espaço sagrado. Usar elementos simbólicos (vela, água, papel). Incluir momento de escrita, leitura e ação simbólica (queimar, enterrar, soltar). Fechar com integração.',
    example: `Ritual de Liberação:

1. Acender uma vela
2. Escrever em papel:
   "O que carrego que não é meu,
   entrego ao fogo transformador"
3. Queimar o papel
4. Recitar:
   "Sou livre para ser
   quem escolho a cada dia"`,
    variations: 'Ritual de passagem (aniversários, mudanças). Ritual de cura (após perdas, traumas). Ritual de gratidão (conquistas, celebrações). Ritual sazonal (conectar com ciclos naturais). Ritual em grupo para fortalecer vínculos.',
    exercise: 'Identifique algo que deseja transformar em sua vida. Crie um ritual poético simples com três etapas: reconhecimento (o que é), transformação (ação simbólica) e integração (nova intenção). Execute em local significativo para você.',
    icon: <Sparkles className="h-6 w-6" />,
    color: 'text-secondary'
  },
  {
    id: 'dialogo-poetico',
    title: 'Diálogo Poético',
    objective: 'Facilitar conversas internas entre diferentes aspectos da personalidade ou dilemas através da criação de poemas dialogados, promovendo integração e autocompreensão.',
    foundation: 'Baseado na terapia gestalt (técnica da cadeira vazia), análise transacional, trabalho com subpersonalidades e técnicas de diálogo interno. Usa a poesia como mediadora entre aspectos conflitantes.',
    usage: 'Identificar polaridades ou conflitos internos. Dar voz poética a cada lado. Criar diálogo em versos alternados. Buscar síntese ou reconhecimento mútuo. Pode usar visualização ou movimento corporal.',
    example: `Diálogo entre Medo e Coragem:

Medo:
"Eu te protejo dos perigos,
sou guardião da sua vida."

Coragem:
"Eu te mostro novos mundos,
sou porta para o desconhecido."

Síntese:
"Caminhamos juntos agora,
prudência e ousadia em dança."`,
    variations: 'Diálogo entre emoções (tristeza/alegria). Diálogo temporal (criança interior/adulto). Diálogo social (máscaras/essência). Diálogo corporal (partes do corpo que falam). Diálogo com sintomas físicos.',
    exercise: 'Identifique um conflito interno atual. Dê nomes a ambos os lados. Escreva um diálogo poético de 6 versos (3 para cada lado). Leia em voz alta alternando tom de voz. Busque uma síntese final de 2 versos.',
    icon: <Users className="h-6 w-6" />,
    color: 'text-primary'
  },
  {
    id: 'haicai-terapeutico',
    title: 'Haicai Terapêutico',
    objective: 'Utilizar a estrutura concisa do haicai para capturar insights momentâneos, cultivar mindfulness e cristalizar transformações em linguagem essencial.',
    foundation: 'Combina tradição zen do haicai japonês com mindfulness ocidental, terapia cognitiva baseada em atenção plena e neurociência da consciência presente. A brevidade força síntese e clareza.',
    usage: 'Praticar observação atenta do momento presente. Capturar sensações, insights ou estados em formato 5-7-5 sílabas. Usar como abertura/fechamento de sessões. Criar série de haicais para acompanhar processo terapêutico.',
    example: `Sobre ansiedade:
"Respiração vai —
no espaço entre inspiro
e expiro: calma"

Sobre mudança:
"Folha que amarela
ainda nutre a árvore —
fim que alimenta"

Sobre presença:
"Agora é tudo
que tenho e tudo que sou —
suficiente, pleno"`,
    variations: 'Haicai das emoções (um para cada sentimento). Haicai sazonal (conectado às estações). Haicai corporal (sobre sensações físicas). Haicai relacional (sobre vínculos). Haicai de gratidão diária.',
    exercise: 'Durante uma semana, escreva um haicai por dia sobre seu estado emocional matinal. Observe se o ato de sintetizar em 17 sílabas muda sua relação com as emoções. Compile numa sequência e observe padrões.',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'text-spiritual-indigo'
  }
];

const methodology = [
  {
    title: 'Poesia',
    description: 'A base simbólica da nossa metodologia. O uso da palavra como ferramenta de acesso ao inconsciente.',
    details: 'Uso de linguagem metafórica e rítmica para contornar defesas conscientes e estabelecer rapport profundo com o simbólico.',
    icon: <Target className="h-8 w-8" />,
    color: 'bg-primary/10 text-primary'
  },
  {
    title: 'Aplicada',
    description: 'Uso estratégico das ferramentas P.A.D.H. com timing adequado e flexibilidade responsiva.',
    details: 'Seleção da ferramenta ideal (como Poema-Funil ou Verso-Gatilho) para o momento específico da sessão e necessidade do cliente.',
    icon: <Wand2 className="h-8 w-8" />,
    color: 'bg-spiritual-violet/10 text-spiritual-violet'
  },
  {
    title: 'Desenvolvimento',
    description: 'Aprofundamento da experiência poética e ancoragem dos novos significados alcançados.',
    details: 'Observação da ressonância das palavras e como novos mapas mentais começam a surgir a partir da experiência vivida.',
    icon: <Sparkles className="h-8 w-8" />,
    color: 'bg-secondary/10 text-secondary'
  },
  {
    title: 'Humano',
    description: 'Foco na evolução integral do ser e integração das mudanças à identidade e ao cotidiano.',
    details: 'Consolidação da autonomia emocional e garantia de que as transformações se tornem parte integrante da vida do cliente.',
    icon: <BookOpen className="h-8 w-8" />,
    color: 'bg-spiritual-indigo/10 text-spiritual-indigo'
  }
];

export const FerramentasPADH = () => {
  const [selectedTool, setSelectedTool] = useState<Tool>(tools[0]);
  const [reflectionText, setReflectionText] = useState('');

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="gradient-spiritual text-white border-0 shadow-strong">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 animate-gentle-bounce" />
          </div>
          <CardTitle className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Ferramentas P.A.D.H.
          </CardTitle>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Poesia como Agente de Desenvolvimento Humano - Metodologia científica para transformação através da palavra
          </p>
        </CardHeader>
      </Card>

      {/* Fundamentação Teórica */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-2xl font-heading flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-spiritual-indigo" />
            Fundamentação Teórica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-primary">Neurociência</h4>
              <p className="text-sm text-muted-foreground">
                A leitura poética estimula o córtex pré-frontal, amígdala e hipocampo, favorecendo regulação emocional.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-spiritual-violet">Hipnose Ericksoniana</h4>
              <p className="text-sm text-muted-foreground">
                Abordagem indireta e metafórica, terreno fértil para a transformação através da poesia.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-spiritual-indigo">Terapia Narrativa</h4>
              <p className="text-sm text-muted-foreground">
                Resgata o poder das histórias pessoais, transformando relatos em poesia curativa.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-secondary">Linguística</h4>
              <p className="text-sm text-muted-foreground">
                Signos, símbolos e metáforas como gatilhos cognitivos e emocionais profundos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metodologia P.A.D.H. */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-2xl font-heading flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Metodologia P.A.D.H.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((phase, index) => (
              <div key={index} className={`p-6 rounded-lg ${phase.color} text-center space-y-3`}>
                <div className="flex justify-center">
                  {phase.icon}
                </div>
                <h4 className="text-xl font-heading font-bold">{phase.title}</h4>
                <p className="text-sm opacity-80">{phase.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Tools Navigation */}
        <Card className="lg:col-span-1 glass-morphism border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-heading flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-spiritual-violet" />
              Ferramentas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={selectedTool.id === tool.id ? 'default' : 'ghost'}
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => setSelectedTool(tool)}
              >
                <div className="flex items-center gap-3">
                  <div className={tool.color}>
                    {tool.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{tool.title}</div>
                  </div>
                </div>
              </Button>
            ))}
            <div className="mt-6 p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground text-center">
              <p>Mais ferramentas P.A.D.H. disponíveis na versão completa</p>
            </div>
          </CardContent>
        </Card>

        {/* Tool Details */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={selectedTool.color}>
                  {selectedTool.icon}
                </div>
                <CardTitle className="text-3xl font-heading">{selectedTool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Objetivo */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Objetivo
                </h4>
                <p className="text-muted-foreground bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                  {selectedTool.objective}
                </p>
              </div>

              {/* Fundamentação */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-spiritual-indigo flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Fundamentação
                </h4>
                <p className="text-muted-foreground bg-spiritual-indigo/5 p-4 rounded-lg border-l-4 border-spiritual-indigo">
                  {selectedTool.foundation}
                </p>
              </div>

              {/* Modo de Uso */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-spiritual-violet flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Modo de Uso
                </h4>
                <p className="text-muted-foreground bg-spiritual-violet/5 p-4 rounded-lg border-l-4 border-spiritual-violet">
                  {selectedTool.usage}
                </p>
              </div>

              {/* Exemplo */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-secondary flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Exemplo Prático
                </h4>
                <div className="bg-secondary/5 p-6 rounded-lg border-l-4 border-secondary">
                  <blockquote className="poem-text text-foreground">
                    {selectedTool.example}
                  </blockquote>
                </div>
              </div>

              {/* Variações */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-spiritual-rose flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Variações
                </h4>
                <p className="text-muted-foreground bg-spiritual-rose/5 p-4 rounded-lg border-l-4 border-spiritual-rose">
                  {selectedTool.variations}
                </p>
              </div>

              {/* Exercício */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Exercício Prático
                </h4>
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary space-y-4">
                  <p className="text-muted-foreground">{selectedTool.exercise}</p>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sua prática:</label>
                    <Textarea
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="Pratique a ferramenta aqui e registre suas observações..."
                      className="min-h-[120px] resize-none"
                    />
                    <Button className="mt-4" size="sm">
                      Salvar Prática
                    </Button>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};