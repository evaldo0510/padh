import React from 'react';
import { BookOpen, Brain, Heart, Sparkles, Star, Award, Users, Feather, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { pagesSEO } from '@/lib/seo-config';

const Sobre = () => {
  const originSection = useScrollAnimation(0.15);
  const journeySection = useScrollAnimation(0.15);
  const pillarsSection = useScrollAnimation(0.15);
  const missionSection = useScrollAnimation(0.15);

  return (
    <PageLayout seo={pagesSEO.sobre} currentPage="Sobre">

      {/* Hero — Evaldo PCH Master */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-glow" />
        <div className="absolute top-1/3 left-[15%] w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />

        <div className="relative container mx-auto px-6 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <Star className="h-3.5 w-3.5" />
              A origem de uma metodologia transformadora
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold leading-[0.95] tracking-tight">
              <span className="text-foreground">Evaldo</span>{' '}
              <span className="text-primary italic">PCH Master</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Criador da <strong className="text-foreground">Poesia Cognitiva Hipnótica</strong> e da 
              Poesia Aplicada ao Desenvolvimento Humano — uma ponte entre ciência, 
              espiritualidade e a arte ancestral da palavra.
            </p>
          </div>
        </div>
      </section>

      {/* A História */}
      <section className="py-24 border-t border-border/30">
        <div
          ref={originSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            originSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">A Gênese</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
                De onde nasce a PCH?
              </h2>
              <div className="w-16 h-px bg-primary/40 mx-auto" />
            </div>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                A Poesia Cognitiva Hipnótica não nasceu numa universidade, nem numa clínica convencional. 
                Nasceu no <strong className="text-foreground">encontro entre a dor e a beleza</strong> — 
                no momento em que Evaldo percebeu que os versos que escrevia para lidar com suas próprias 
                sombras produziam efeitos semelhantes aos descritos pela neurociência e pela hipnose clínica.
              </p>

              <p>
                Durante anos de prática em atendimentos terapêuticos, Evaldo observou que seus clientes 
                reagiam de maneira profundamente diferente quando a intervenção incluía poesia. Não era 
                apenas relaxamento — era <em>reorganização interna</em>. Os relatos se repetiam: 
                "Senti como se alguém falasse diretamente com meu inconsciente", "As palavras entraram 
                onde minha resistência não deixava ninguém passar."
              </p>

              <blockquote className="poem-block my-8">
                <p className="poem-text text-foreground/80">
                  Eu não escolhi a poesia.<br />
                  Ela me encontrou numa noite escura,<br />
                  sentada entre os escombros<br />
                  do que eu achava que era minha verdade.<br />
                  E quando falou, falou sem palavras —<br />
                  apenas com o silêncio entre os versos.
                </p>
                <cite className="text-sm text-primary/70 mt-3 block not-italic">— Evaldo PCH Master</cite>
              </blockquote>

              <p>
                Foi então que começou o trabalho de sistematização. Evaldo mergulhou na 
                <strong className="text-foreground"> neurociência da linguagem</strong>, estudou os mecanismos 
                da hipnose ericksoniana, investigou como metáforas ativam redes neurais específicas, 
                e descobriu que a poesia — quando construída com intencionalidade terapêutica — 
                age como um <strong className="text-foreground">agente neuroplástico</strong>.
              </p>

              <p>
                A leitura poética estimula simultaneamente o <strong className="text-foreground">córtex pré-frontal</strong> 
                (pensamento reflexivo), a <strong className="text-foreground">amígdala</strong> (processamento emocional), 
                o <strong className="text-foreground">hipocampo</strong> (memória e reconsolidação) e o 
                <strong className="text-foreground"> córtex insular</strong> (consciência interoceptiva). 
                Nenhuma outra forma de linguagem ativa tantas áreas simultaneamente com tanta suavidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jornada Cronológica */}
      <section className="py-24 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div
          ref={journeySection.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            journeySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Trajetória</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Uma jornada de dedicação
              </h2>
              <div className="w-16 h-px bg-primary/40 mx-auto" />
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Feather className="h-5 w-5" />,
                  title: 'Primeiras Escritas Terapêuticas',
                  desc: 'Evaldo começa a usar poesia nos atendimentos, percebendo que versos escritos com intencionalidade provocam mudanças emocionais profundas nos clientes.',
                },
                {
                  icon: <Brain className="h-5 w-5" />,
                  title: 'Fundamentação Neurocientífica',
                  desc: 'Estudo aprofundado em neurociência cognitiva, hipnose ericksoniana e linguística — conectando os efeitos observados com evidências científicas sobre processamento linguístico e neuroplasticidade.',
                },
                {
                  icon: <BookOpen className="h-5 w-5" />,
                  title: 'Nascimento da PCH',
                  desc: 'Sistematização formal da Poesia Cognitiva Hipnótica como metodologia — unindo poesia, cognição e hipnose num modelo replicável e ensinável.',
                },
                {
                  icon: <Award className="h-5 w-5" />,
                  title: 'Criação do P.A.D.H.',
                  desc: 'Desenvolvimento da Poesia Aplicada ao Desenvolvimento Humano em suas 4 fases: Preparação, Aplicação, Desenvolvimento e Hibridização.',
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: 'Formação de Novos Terapeutas-Poetas',
                  desc: 'Lançamento da Formação em PCH, capacitando psicólogos, terapeutas e educadores a utilizar a poesia como ferramenta clínica rigorosa e transformadora.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-6 rounded-xl border border-border/50 bg-card/30 group hover:border-primary/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilares Filosóficos */}
      <section className="py-24 border-t border-border/30">
        <div
          ref={pillarsSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            pillarsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Filosofia</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Pilares da Visão de Evaldo
              </h2>
              <div className="w-16 h-px bg-primary/40 mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Heart className="h-6 w-6 text-spiritual-rose" />,
                  title: 'A Dor como Portal',
                  desc: 'O sofrimento não é um inimigo a ser eliminado, mas um mensageiro que carrega convites de transformação. A PCH ensina a escutar esses convites.',
                },
                {
                  icon: <Sparkles className="h-6 w-6 text-primary" />,
                  title: 'Beleza como Cura',
                  desc: 'A experiência estética reorganiza o sistema nervoso. A beleza da poesia não é acessório — é o princípio ativo da intervenção terapêutica.',
                },
                {
                  icon: <Brain className="h-6 w-6 text-spiritual-indigo" />,
                  title: 'Ciência e Alma',
                  desc: 'Rigor científico e sensibilidade espiritual não são opostos. A PCH navega com pés na neurociência e olhos na transcendência.',
                },
                {
                  icon: <BookOpen className="h-6 w-6 text-spiritual-sage" />,
                  title: 'Palavra como Remédio',
                  desc: 'Cada palavra carrega uma frequência, uma intenção, um potencial de cura. A escolha precisa de cada termo é um ato de responsabilidade terapêutica.',
                },
                {
                  icon: <Users className="h-6 w-6 text-spiritual-violet" />,
                  title: 'Democratizar a Profundidade',
                  desc: 'A transformação interior não deve ser privilégio de poucos. A PCH cria pontes para que qualquer pessoa possa acessar seu potencial mais profundo.',
                },
                {
                  icon: <Feather className="h-6 w-6 text-spiritual-amber" />,
                  title: 'O Inconsciente como Coautor',
                  desc: 'O terapeuta-poeta não impõe — convida. O inconsciente do leitor é coautor da experiência, completando os sentidos que os versos sugerem.',
                },
              ].map((item, i) => (
                <Card key={i} className="border-border/50 bg-card/50 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h4 className="font-heading font-semibold text-foreground text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-24 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div
          ref={missionSection.ref}
          className={`relative container mx-auto px-6 transition-all duration-1000 ${
            missionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3 font-medium">Missão</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                "Devolver à humanidade o direito de se curar pela beleza."
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Evaldo acredita que a poesia é a forma mais antiga e mais sofisticada de terapia da alma. 
                Sua missão é devolver essa ferramenta ao mundo — agora com a precisão da ciência moderna e 
                a profundidade da tradição espiritual.
              </p>
            </div>

            <blockquote className="poem-block text-left max-w-lg mx-auto">
              <p className="poem-text text-foreground/80">
                Não escrevo versos para impressionar.<br />
                Escrevo para que algo dentro de quem lê<br />
                se lembre de que já sabia voar.
              </p>
              <cite className="text-sm text-primary/70 mt-3 block not-italic">— Evaldo PCH Master</cite>
            </blockquote>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/formacao">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark px-8">
                  Formação em PCH
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contato">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/30 text-foreground hover:bg-primary/5 px-8">
                  Entre em Contato
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default Sobre;
