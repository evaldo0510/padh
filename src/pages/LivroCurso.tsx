import React from 'react';
import { BookOpen, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PageLayout from '@/components/layout/PageLayout';
import { pagesSEO } from '@/lib/seo-config';
import TextReader from '@/components/ui/text-reader';

const LivroCurso = () => {
  return (
    <PageLayout seo={pagesSEO.livroCurso} currentPage="Livro-Curso">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Livro-Curso P.A.D.H.</p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
              Poesia Aplicada ao <span className="text-primary italic">Desenvolvimento Humano</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              O fio dourado que tece a jornada de autoconhecimento e transformação 
              através do poder da palavra poética aplicada à terapia.
            </p>
            <div className="poem-block max-w-md mx-auto my-8">
              <p className="poem-text text-sm text-muted-foreground">
                Quando se olha no espelho, o que é que você vê?<br />
                Eu vi grades onde havia janelas.<br />
                Até que um verso abriu a porta<br />
                que eu mesmo havia trancado por dentro.
              </p>
              <cite className="text-xs text-primary/70 mt-2 block not-italic">— Prisão Interior</cite>
            </div>
            <div className="flex justify-center gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore o Livro-Curso
              </Button>
              <TextReader
                text="Ferramentas para a Poesia Cognitiva Hipnótica. O fio dourado que tece a jornada de autoconhecimento e transformação através do poder da palavra poética aplicada à terapia. Já te disse, a liberdade interior não é um lugar, é um estado onde a mente encontra a poesia que a liberta."
                label="Ouvir Narração"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introdução */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Introdução Visionária</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Este livro-curso é um convite para o mergulho profundo — no consciente e no inconsciente — 
                usando a poesia como farol e a ciência como âncora. Nas páginas que seguem, revelamos 
                as chaves e os segredos para que sua voz interna se transforme numa melodia de mudança, 
                cura e expansão.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Diferente de um manual técnico comum, este livro-curso foi concebido como uma 
                <strong className="text-foreground"> experiência imersiva</strong>. Cada capítulo combina 
                fundamentos teóricos com exercícios práticos, poemas terapêuticos e espaços de reflexão, 
                criando um percurso que transforma o leitor enquanto o instrui.
              </p>
            </CardContent>
          </Card>

          {/* Capítulo 1 */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-heading">
                Capítulo 1 — O que é a Poesia Cognitiva Hipnótica?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                  1.1 O Encontro da Palavra com o Inconsciente
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Aqui nasce a travessia. A Poesia Cognitiva Hipnótica (PCH) é mais que técnica: 
                  é poética aplicada à escuta clínica, é linguagem simbólica que se infiltra pelas 
                  frestas da lógica e toca camadas esquecidas do ser.
                </p>
                <p className="mb-4 text-muted-foreground">A PCH une três rios fundamentais:</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { emoji: '🌊', title: 'Poesia Terapêutica', desc: 'Ressignifica sentidos pela beleza e ritmo das palavras.' },
                    { emoji: '🧠', title: 'Psicologia Cognitiva', desc: 'Identifica e transforma padrões de pensamento limitantes.' },
                    { emoji: '🌀', title: 'Hipnose Ericksoniana', desc: 'Convida o inconsciente a cocriar soluções de cura.' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/50">
                      <div className="text-2xl mb-2">{item.emoji}</div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="poem-block my-6">
                  <p className="poem-text text-sm text-muted-foreground">
                    A poesia toca onde a fala falha.<br />
                    A hipnose abre o portão dos porões.<br />
                    A cognição redesenha o mapa interno.
                  </p>
                </div>
              </div>

              <Separator className="bg-border/30" />

              <div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                  1.2 A Linguagem que Sussurra para Dentro
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Na PCH, as palavras são sementes de metáforas férteis. Ao contrário da linguagem 
                  imperativa que ordena, trabalhamos com <strong className="text-foreground">linguagem evocativa</strong> — 
                  aquela que abre espaço para o sentir, que convida ao invés de comandar.
                </p>
                <div className="bg-primary/5 border border-primary/10 p-5 rounded-lg mb-4">
                  <p className="text-sm font-medium text-primary mb-2">Exemplo prático:</p>
                  <p className="poem-text text-sm text-muted-foreground">
                    "Talvez… …se você fechasse os olhos…<br />
                    …e deixasse esse verso cair…<br />
                    …como gota dentro de um poço…<br />
                    …o que escutaria de volta?"
                  </p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🧠 O cérebro não resiste a lacunas — ele completa automaticamente.</p>
                  <p>🌀 O inconsciente adora imagens — processa metáforas como experiências reais.</p>
                  <p>💬 A mente se rende à sugestão poética — porque não a percebe como ordem.</p>
                </div>
              </div>

              <Separator className="bg-border/30" />

              <div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                  1.3 Os Mecanismos Neurais da Poesia
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Quando lemos poesia de forma terapêutica, ativamos uma cascata neural única. 
                  Estudos de neuroimagem (fMRI) mostram que a leitura poética ativa simultaneamente 
                  áreas de processamento linguístico, emocional e sensorial — criando uma experiência 
                  que é, literalmente, mais profunda que a leitura de prosa.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A metáfora poética ativa o <strong className="text-foreground">córtex sensorial</strong> como se 
                  a experiência fosse real. Quando lemos "a saudade dorme na rede do peito", nosso cérebro 
                  não apenas compreende — ele <em>sente</em> a rede, o peito, o peso da saudade. 
                  É essa capacidade de criar experiências sensoriais através de palavras que torna 
                  a PCH uma ferramenta terapêutica tão poderosa.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Exercício */}
          <Card className="border-primary/20 bg-primary/[0.02]">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary">
                Exercício Prático 1 — Descobrindo a PCH em Si
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-4 text-foreground">
                Objetivo: Sentir na pele a potência simbólica da linguagem poética.
              </p>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium mb-2 text-foreground">Instruções:</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Respire fundo e leia lentamente o poema abaixo, permitindo que cada verso 
                    reverbere antes de passar ao próximo:
                  </p>
                </div>
                <div className="poem-block bg-primary/5 p-6 rounded-lg">
                  <p className="poem-text text-foreground">
                    Entre um pensamento e outro...<br />
                    mora um silêncio que me escuta.<br />
                    Talvez eu seja ele…<br />
                    …e não o que penso.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-foreground">Agora, reflita:</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>→ Onde este poema te levou? Que paisagem interna surgiu?</li>
                    <li>→ Qual parte de você foi tocada — mente, peito, memória?</li>
                    <li>→ Se esse poema fosse um lugar, que lugar seria?</li>
                    <li>→ Que sensação corporal emergiu durante a leitura?</li>
                  </ul>
                  <p className="text-xs text-primary/70 mt-3">
                    Anote suas respostas. Use como ponto de partida para sua prática terapêutica.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview próximos capítulos */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Próximos Capítulos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                O Livro-Curso continua com aprofundamentos progressivos nas ferramentas e técnicas da PCH:
              </p>
              <div className="space-y-3">
                {[
                  'Capítulo 2 — As 7 Ferramentas da PCH: Do Poema-Funil ao Haicai Terapêutico',
                  'Capítulo 3 — Neurociência da Leitura Poética: O Mapa Cerebral do Leitor',
                  'Capítulo 4 — O Protocolo P.A.D.H. na Prática Clínica',
                  'Capítulo 5 — Construindo Sessões Terapêuticas com Poesia',
                  'Capítulo 6 — Rituais Poéticos e Cerimônias de Transformação',
                  'Capítulo 7 — Estudos de Caso e Relatos de Experiência',
                ].map((cap, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border/20 last:border-0">
                    <span className="text-primary text-sm font-medium">{String(i + 2).padStart(2, '0')}</span>
                    <span className="text-sm text-muted-foreground">{cap}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
};

export default LivroCurso;
