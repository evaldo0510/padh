import React from 'react';
import { GraduationCap, Clock, Users, BookOpen, Brain, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Formacao = () => {
  const modulos = [
    {
      numero: 1,
      titulo: "Poema-Funil: A Jornada do Olhar ao Invisível",
      duracao: "60 minutos",
      descricao: "Aulão teórico-vivencial com metáforas, imagens mentais, exemplos poéticos e vivência guiada.",
      topicos: [
        "Fundamento teórico do Poema-Funil",
        "Base neuropsicológica",
        "Estrutura e técnica de construção",
        "Exercício guiado",
        "Aplicações terapêuticas"
      ]
    },
    {
      numero: 2,
      titulo: "Neurociência, Emoção e Hipnose",
      duracao: "60 minutos",
      descricao: "Como o cérebro dança com a metáfora",
      topicos: [
        "Ativação neural pela poesia",
        "Estados de transe leve e profundidade emocional",
        "O poder sugestivo dos ritmos e imagens",
        "Como criar induções poéticas sutilmente",
        "Vivência prática com feedback emocional"
      ]
    },
    {
      numero: 3,
      titulo: "A Estrutura PADH",
      duracao: "60 minutos",
      descricao: "O mapa da atuação terapêutica poética (Preparação – Aplicação – Desenvolvimento – Hibridização)",
      topicos: [
        "Criação de ambiente interno e externo",
        "Aplicação sensorial (voz, ritmo, silêncio)",
        "Registro, eco e ancoragem dos poemas",
        "Integração com outras terapias",
        "Criação de ritual personalizado"
      ]
    },
    {
      numero: 4,
      titulo: "As Ferramentas da PCH – Parte 1",
      duracao: "60 minutos",
      descricao: "Poemas como técnicas",
      topicos: [
        "Poema-funil (imersão gradual)",
        "Verso-gatilho (âncoras emocionais)",
        "Poemadiagnóstico (projeção e escolha emocional)",
        "Roda de escuta + aplicação entre os alunos"
      ]
    },
    {
      numero: 5,
      titulo: "As Ferramentas da PCH – Parte 2",
      duracao: "60 minutos",
      descricao: "Escrita terapêutica profunda",
      topicos: [
        "Caderno de Voz Interna Poética",
        "Encenação Poética Interna",
        "Reescrita Poética de Narrativas",
        "Escrita em dupla de poema-dramatização"
      ]
    },
    {
      numero: 6,
      titulo: "Finalização, Ritualização e Acompanhamento",
      duracao: "60 minutos",
      descricao: "Encerramentos, integração e continuidade",
      topicos: [
        "Ritual do Silêncio Poético",
        "Criando séries de atendimento com PCH",
        "Adaptação para diferentes públicos",
        "Projeto terapêutico final"
      ]
    }
  ];

  const materiais = [
    "Apostila completa (com espaço para reflexão)",
    "Áudios guiados com leitura de indução poética",
    "Cartas poéticas (mini baralho simbólico)",
    "Diário de Poesia Terapêutica (impressão opcional)",
    "Certificado final"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spiritual opacity-20" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-spiritual-violet to-secondary bg-clip-text text-transparent">
              Formação em PCH
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Poesia Cognitiva Hipnótica
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto italic">
              "A arte de transformar palavras em portais de liberdade interior"
            </p>
          </div>
        </div>
      </section>

      {/* Informações Gerais */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Duração</h3>
                  <p className="text-muted-foreground">6 semanas</p>
                  <p className="text-sm text-muted-foreground">30 horas</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Público-Alvo</h3>
                  <p className="text-muted-foreground text-sm">Terapeutas, psicólogos, artistas e cuidadores</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Certificação</h3>
                  <p className="text-muted-foreground text-sm">Formação Completa em PCH</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Objetivo */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                🎯 Objetivo Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Capacitar terapeutas, psicólogos, artistas e cuidadores a utilizar a poesia como ferramenta hipnótica de intervenção emocional e cognitiva, unindo metáforas, técnicas de hipnose leve e práticas narrativas.
              </p>
            </CardContent>
          </Card>

          {/* Módulos */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-heading font-bold text-center mb-8">
              Módulos da Formação
            </h2>
            {modulos.map((modulo) => (
              <Card key={modulo.numero} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          Módulo {modulo.numero}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {modulo.duracao}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-heading">
                        {modulo.titulo}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">
                        {modulo.descricao}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3">Conteúdo programático:</h4>
                    <ul className="space-y-1">
                      {modulo.topicos.map((topico, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary">•</span>
                          {topico}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Materiais */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                🎓 Materiais de Apoio Incluídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {materiais.map((material, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Formato */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                💬 Formato da Formação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Aulas síncronas + grupo de suporte no WhatsApp/Telegram</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Exercícios práticos entre os encontros</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Plantões poéticos para dúvidas ou leituras em grupo</span>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Sessão de leitura pública final (online ou presencial)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="bg-spiritual-violet hover:bg-spiritual-violet/90">
              <GraduationCap className="mr-2 h-5 w-5" />
              Inscrever-se na Formação
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formacao;